// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './MerkleProof.sol';
import "./Math.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";
import "./interfaces/IStakingToken.sol";
import "./interfaces/IRankedMintingToken.sol";
import "./interfaces/IBurnableToken.sol";
import "./interfaces/IBurnRedeemable.sol";
import "./interfaces/IMerkleDistributor.sol"

contract XENCrypto is Context, IRankedMintingToken, IStakingToken, IBurnableToken, ERC20("LEVIN Crypto", "LEV") {
    using Math for uint256;
    using ABDKMath64x64 for int128;
    using ABDKMath64x64 for uint256;


    mapping(uint256 => uint256) private claimedBitMap;


    function isClaimed(uint256 index) public view returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }

    function _setClaimed(uint256 index) private {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] = claimedBitMap[claimedWordIndex] | (1 << claimedBitIndex);
    }
    

    // INTERNAL TYPE TO DESCRIBE A XEN MINT INFO
    struct MintInfo {
        address user;
        uint256 term;
        uint256 maturityTs;
        bool claimed;
        uint256 amount;
        /*
        uint256 rank;
        uint256 amplifier;
        uint256 eaaRate; */
    }

    // INTERNAL TYPE TO DESCRIBE A XEN STAKE
    struct StakeInfo {
        uint256 term;
        uint256 maturityTs;
        uint256 amount;
        uint256 apy;
    }

    // PUBLIC CONSTANTS
 
    uint256 public constant SECONDS_IN_DAY = 3_600 * 24;
    uint256 public constant DAYS_IN_YEAR = 365;

    uint256 public constant GENESIS_RANK = 1;

    uint256 public constant MIN_TERM = 1 * SECONDS_IN_DAY - 1;
    uint256 public constant MAX_TERM_START = 100 * SECONDS_IN_DAY;
    uint256 public constant MAX_TERM_END = 1_000 * SECONDS_IN_DAY;
/*     uint256 public constant TERM_AMPLIFIER = 15;
    uint256 public constant TERM_AMPLIFIER_THRESHOLD = 5_000;
    uint256 public constant REWARD_AMPLIFIER_START = 3_000;
    uint256 public constant REWARD_AMPLIFIER_END = 1;
    uint256 public constant EAA_PM_START = 100;
    uint256 public constant EAA_PM_STEP = 1;
    uint256 public constant EAA_RANK_STEP = 100_000; */
    uint256 public constant WITHDRAWAL_WINDOW_DAYS = 365;
    uint256 public constant MAX_PENALTY_PCT = 99;

    uint256 public constant XEN_MIN_STAKE = 0;

    uint256 public constant XEN_MIN_BURN = 0;

    uint256 public constant XEN_APY_START = 37;
    uint256 public constant XEN_APY_DAYS_STEP = 365;
    uint256 public constant XEN_APY_END = 15;

    string public constant AUTHORS = "@MrJackLevin @lbelyaev faircrypto.org";

    // PUBLIC STATE, READABLE VIA NAMESAKE GETTERS
    bytes32 public immutable merkleRoot;
    uint256 public immutable genesisTs;
    uint256 public globalRank = GENESIS_RANK;
    uint256 public activeMinters;
    uint256 public activeStakes;
    uint256 public totalXenStaked;
    // user address => XEN mint info
    mapping(address => MintInfo) public userMints;
    // user address => XEN stake info
    mapping(address => StakeInfo) public userStakes;
    // user address => XEN burn amount
    mapping(address => uint256) public userBurns;

    // CONSTRUCTOR
    constructor(bytes32 merkleRoot_) {
        genesisTs = block.timestamp;
        merkleRoot = merkleRoot_;
    }

    // PRIVATE METHODS
    /**
     * @dev calculates Withdrawal Penalty depending on lateness
     */
    function _penalty(uint256 secsLate) private pure returns (uint256) {
        // =MIN(2^(daysLate+3)/window-1,99)
        uint256 daysLate = secsLate / SECONDS_IN_DAY;
        if (daysLate > WITHDRAWAL_WINDOW_DAYS - 1) return MAX_PENALTY_PCT;
        uint256 penalty = (uint256(1) << (daysLate + 3)) / WITHDRAWAL_WINDOW_DAYS - 1;
        return Math.min(penalty, MAX_PENALTY_PCT);
    }

    /**
     * @dev calculates net Mint Reward (adjusted for Penalty)
     */
    function _calculateMintReward(
        uint256 term,
        uint256 maturityTs,
        uint256 amount
/*         uint256 amplifier,
        uint256 eeaRate */
    ) private view returns (uint256) {
        uint256 secsLate = block.timestamp - maturityTs;
        uint256 penalty = _penalty(secsLate);
        uint256 reward = amount;
        return (reward * (100 - penalty)) / 100;
    }

    /**
     * @dev cleans up User Mint storage (gets some Gas credit;))
     */
    function _cleanUpUserMint() private {
        delete userMints[_msgSender()];
        activeMinters--;
    }

    /**
     * @dev calculates XEN Stake Reward
     */
    function _calculateStakeReward(
        uint256 amount,
        uint256 term,
        uint256 maturityTs,
        uint256 apy
    ) private view returns (uint256) {
        if (block.timestamp > maturityTs) {
            uint256 rate = (apy * term * 1_000_000) / DAYS_IN_YEAR;
            return (amount * rate) / 100_000_000;
        }
        return 0;
    }

    /**
     * @dev calculates APY (in %)
     */
    function _calculateAPY() private view returns (uint256) {
        uint256 decrease = (block.timestamp - genesisTs) / (SECONDS_IN_DAY * XEN_APY_DAYS_STEP);
        if (XEN_APY_START - XEN_APY_END < decrease) return XEN_APY_END;
        return XEN_APY_START - decrease;
    }

    /**
     * @dev creates User Stake
     */
    function _createStake(uint256 amount, uint256 term) private {
        userStakes[_msgSender()] = StakeInfo({
            term: term,
            maturityTs: block.timestamp + term * SECONDS_IN_DAY,
            amount: amount,
            apy: _calculateAPY()
        });
        activeStakes++;
        totalXenStaked += amount;
    }

    // PUBLIC CONVENIENCE GETTERS


    /**
     * @dev returns User Mint object associated with User account address
     */
    function getUserMint() external view returns (MintInfo memory) {
        return userMints[_msgSender()];
    }

    /**
     * @dev returns XEN Stake object associated with User account address
     */
    function getUserStake() external view returns (StakeInfo memory) {
        return userStakes[_msgSender()];
    }

    /**
     * @dev returns current APY
     */
    function getCurrentAPY() external view returns (uint256) {
        return _calculateAPY();
    }

    // PUBLIC STATE-CHANGING METHODS

    /**
     * @dev accepts User cRank claim provided all checks pass (incl. no current claim exists)
     */
    function claim(uint256 index, address account, uint256 _amount, bytes32[] calldata merkleProof, uint256 _term) external {
        uint256 termSec = term * SECONDS_IN_DAY;
        require(userMints[_msgSender()].rank == 0, "CRank: Mint already in progress");
        require(!isClaimed(index), "MerkleDistributor: Drop already claimed.");
           // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(index, account, amount));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), "MerkleDistributor: Invalid proof.");
        // Mark it claimed.
        _setClaimed(index);
        // create and store new MintInfo
        MintInfo memory mintInfo = MintInfo({
            user: _msgSender(),
            term: _term,
            maturityTs: block.timestamp + termSec,
            claimed: true;
            amount: _amount
        });
        userMints[_msgSender()] = mintInfo;
        activeMinters++;
        emit Claimed(index, account, _amount, _term);
    }

    /**
     * @dev ends minting upon maturity (and within permitted Withdrawal Time Window), gets minted XEN
     */
    function claimMintReward() external {
        MintInfo memory mintInfo = userMints[_msgSender()];
        require(mintInfo.claimed > true, "CRank: No mint exists");
        require(block.timestamp > mintInfo.maturityTs, "CRank: Mint maturity not reached");

        // calculate reward and mint tokens
        uint256 rewardAmount = _calculateMintReward(
            mintInfo.term,
            mintInfo.maturityTs,
            mintInfo.amount
        ) * 1 ether;
        _mint(_msgSender(), rewardAmount);

        _cleanUpUserMint();
        emit MintClaimed(_msgSender(), rewardAmount);
    }

    /**
     * @dev  ends minting upon maturity (and within permitted Withdrawal time Window)
     *       mints XEN coins and splits them between User and designated other address
     */
    function claimMintRewardAndShare(address other, uint256 pct) external {
        MintInfo memory mintInfo = userMints[_msgSender()];
        require(other != address(0), "CRank: Cannot share with zero address");
        require(pct > 0, "CRank: Cannot share zero percent");
        require(pct < 101, "CRank: Cannot share 100+ percent");
        require(mintInfo.claimed > 0, "CRank: No mint exists");
        require(block.timestamp > mintInfo.maturityTs, "CRank: Mint maturity not reached");

        // calculate reward
        uint256 rewardAmount = _calculateMintReward(
            mintInfo.term,
            mintInfo.maturityTs,
            mintInfo.amount
        ) * 1 ether;
        uint256 sharedReward = (rewardAmount * pct) / 100;
        uint256 ownReward = rewardAmount - sharedReward;

        // mint reward tokens
        _mint(_msgSender(), ownReward);
        _mint(other, sharedReward);

        _cleanUpUserMint();
        emit MintClaimed(_msgSender(), rewardAmount);
    }

    /**
     * @dev  ends minting upon maturity (and within permitted Withdrawal time Window)
     *       mints XEN coins and stakes 'pct' of it for 'term'
     */
    function claimMintRewardAndStake(uint256 pct, uint256 term) external {
        MintInfo memory mintInfo = userMints[_msgSender()];
        // require(pct > 0, "CRank: Cannot share zero percent");
        require(pct < 101, "CRank: Cannot share >100 percent");
        require(mintInfo.rank > 0, "CRank: No mint exists");
        require(block.timestamp > mintInfo.maturityTs, "CRank: Mint maturity not reached");

        // calculate reward
        uint256 rewardAmount = _calculateMintReward(
            mintInfo.term,
            mintInfo.maturityTs,
            mintInfo.amount
        ) * 1 ether;
        uint256 stakedReward = (rewardAmount * pct) / 100;
        uint256 ownReward = rewardAmount - stakedReward;

        // mint reward tokens part
        _mint(_msgSender(), ownReward);
        _cleanUpUserMint();
        emit MintClaimed(_msgSender(), rewardAmount);

        // nothing to burn since we haven't minted this part yet
        // stake extra tokens part
        require(stakedReward > XEN_MIN_STAKE, "XEN: Below min stake");
        require(term * SECONDS_IN_DAY > MIN_TERM, "XEN: Below min stake term");
        require(term * SECONDS_IN_DAY < MAX_TERM_END + 1, "XEN: Above max stake term");
        require(userStakes[_msgSender()].amount == 0, "XEN: stake exists");

        _createStake(stakedReward, term);
        emit Staked(_msgSender(), stakedReward, term);
    }

    /**
     * @dev initiates XEN Stake in amount for a term (days)
     */
    function stake(uint256 amount, uint256 term) external {
        require(balanceOf(_msgSender()) >= amount, "XEN: not enough balance");
        require(amount > XEN_MIN_STAKE, "XEN: Below min stake");
        require(term * SECONDS_IN_DAY > MIN_TERM, "XEN: Below min stake term");
        require(term * SECONDS_IN_DAY < MAX_TERM_END + 1, "XEN: Above max stake term");
        require(userStakes[_msgSender()].amount == 0, "XEN: stake exists");

        // burn staked XEN
        _burn(_msgSender(), amount);
        // create XEN Stake
        _createStake(amount, term);
        emit Staked(_msgSender(), amount, term);
    }

    /**
     * @dev ends XEN Stake and gets reward if the Stake is mature
     */
    function withdraw() external {
        StakeInfo memory userStake = userStakes[_msgSender()];
        require(userStake.amount > 0, "XEN: no stake exists");

        uint256 xenReward = _calculateStakeReward(
            userStake.amount,
            userStake.term,
            userStake.maturityTs,
            userStake.apy
        );
        activeStakes--;
        totalXenStaked -= userStake.amount;

        // mint staked XEN (+ reward)
        _mint(_msgSender(), userStake.amount + xenReward);
        emit Withdrawn(_msgSender(), userStake.amount, xenReward);
        delete userStakes[_msgSender()];
    }

    /**
     * @dev burns XEN tokens and creates Proof-Of-Burn record to be used by connected DeFi services
     */
    function burn(address user, uint256 amount) public {
        require(amount > XEN_MIN_BURN, "Burn: Below min limit");
        require(
            IERC165(_msgSender()).supportsInterface(type(IBurnRedeemable).interfaceId),
            "Burn: not a supported contract"
        );

        _spendAllowance(user, _msgSender(), amount);
        _burn(user, amount);
        userBurns[user] += amount;
        IBurnRedeemable(_msgSender()).onTokenBurned(user, amount);
    }
}