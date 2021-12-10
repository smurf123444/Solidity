// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.6.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/cryptography/MerkleProof.sol";
import "./interfaces/IMerkleDistributor.sol";

contract Globals {
        
    /*  Claim             (auto-generated event)

        uint40            timestamp       -->  data0 [ 39:  0]
        bytes20  indexed  btcAddr
        uint56            rawSatoshis     -->  data0 [ 95: 40]
        uint56            adjSatoshis     -->  data0 [151: 96]
        address  indexed  claimToAddr
        uint8             claimFlags      -->  data0 [159:152]
        uint72            claimedHearts   -->  data0 [231:160]
        address  indexed  referrerAddr
        address           senderAddr      -->  data1 [159:  0]
    */
    event Claim(
        uint256 data0,
        uint256 data1,
        address indexed claimToAddr,
        address indexed referrerAddr
    );

    /*  ClaimAssist       (auto-generated event)

        uint40            timestamp       -->  data0 [ 39:  0]
        bytes20           btcAddr         -->  data0 [199: 40]
        uint56            rawSatoshis     -->  data0 [255:200]
        uint56            adjSatoshis     -->  data1 [ 55:  0]
        address           claimToAddr     -->  data1 [215: 56]
        uint8             claimFlags      -->  data1 [223:216]
        uint72            claimedHearts   -->  data2 [ 71:  0]
        address           referrerAddr    -->  data2 [231: 72]
        address  indexed  senderAddr
    */
    event ClaimAssist(
        uint256 data0,
        uint256 data1,
        uint256 data2,
        address indexed senderAddr
    );


    struct GlobalsCache {
        // 1
        uint256 _lockedHeartsTotal;
        uint256 _nextStakeSharesTotal;
        uint256 _shareRate;
        uint256 _stakePenaltyTotal;
        // 2
        uint256 _dailyDataCount;
        uint256 _stakeSharesTotal;
        uint40 _latestStakeId;
        uint256 _unclaimedSatoshisTotal;
        uint256 _claimedSatoshisTotal;
        uint256 _claimedBtcAddrCount;
        //
        uint256 _currentDay;
    }

    struct GlobalsStore {
        // 1
        uint72 lockedHeartsTotal;
        uint72 nextStakeSharesTotal;
        uint40 shareRate;
        uint72 stakePenaltyTotal;
        // 2
        uint16 dailyDataCount;
        uint72 stakeSharesTotal;
        uint40 latestStakeId;
        uint128 claimStats;
    }

    GlobalsStore public globals;

}
contract MerkleDistributor is Globals, IMerkleDistributor{

    address public immutable override token;
    bytes32 public immutable override merkleRoot;

    // This is a packed array of booleans.
    mapping(uint256 => uint256) private claimedBitMap;



    function isClaimed(uint256 index) public view override returns (bool) {
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
}


contract Airdrop is  MerkleDistributor{
    
    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata merkleProof, address referrerAddr) external override returns (uint256) {
        
        require(!isClaimed(index), 'MerkleDistributor: Drop already claimed.');

        // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(index, account, amount));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), 'MerkleDistributor: Invalid proof.');

        // Mark it claimed and send the token.
        _setClaimed(index);
        //require(IERC20(token).transfer(account, amount), 'MerkleDistributor: Transfer failed.');

        emit Claimed(index, account, amount);
        uint256 autoStakeDays = 350;

        return(_chrisClaimSync(uint256 amount, address account, uint256 autoStakeDays, address referrerAddr))
    }


    function _chrisClaim(
        GlobalsCache memory g,
        uint256 amount,
        address account,
        uint256 autoStakeDays,
        address referrerAddr
    )
        private
        returns (uint256 totalClaimedHearts)
    {
        /* Allowed only during the claim phase */
        require(g._currentDay >= CLAIM_PHASE_START_DAY, "HEX: Claim phase has not yet started");
        require(g._currentDay < CLAIM_PHASE_END_DAY, "HEX: Claim phase has ended");


        /* Check if log data needs to be updated */
        _dailyDataUpdateAuto(g);

        /* Sanity check */
        require(
            g._claimedBtcAddrCount < CLAIMABLE_BTC_ADDR_COUNT,
            "HEX: CHK: _claimedBtcAddrCount"
        );

        (uint256 adjSatoshis, uint256 claimedHearts, uint256 claimBonusHearts) = _calcClaimValues(
            g,
            rawSatoshis
        );

        /* Increment claim count to track viral rewards */
        g._claimedBtcAddrCount++;

        totalClaimedHearts = _remitBonuses(
            claimToAddr,
            rawAmount,
            adjAmount,
            claimedHearts,
            claimBonusHearts,
            referrerAddr
        );

        /* Auto-stake a percentage of the successful claim */
        uint256 autoStakeHearts = totalClaimedHearts * AUTO_STAKE_CLAIM_PERCENT / 100;
        _stakeStart(g, autoStakeHearts, autoStakeDays, true);

        /* Mint remaining claimed Hearts to claim address */
        _mint(claimToAddr, totalClaimedHearts - autoStakeHearts);
         return  totalClaimedHearts;
    }

    function _chrisClaimSync(
        uint256 rawSatoshis,
        address claimToAddr,
        uint256 autoStakeDays,
        address referrerAddr
    )
        private
        returns (uint256 totalClaimedHearts)
    {
        GlobalsCache memory g;
        GlobalsCache memory gSnapshot;
        _globalsLoad(g, gSnapshot);
/*
        GlobalsCache memory g,
        uint256 index,
        uint256 amount,
        address account,
        uint256 autoStakeDays,
        address referrerAddr
*/
        totalClaimedHearts = _chrisClaim(
            g,
            amount,
            account,
            autoStakeDays,
            referrerAddr
        );

        _globalsSync(g, gSnapshot);

        return totalClaimedHearts;
    }


    function _remitBonuses(
        address claimToAddr,
        uint256 rawAmount,
        uint256 adjAmount,
        uint256 claimedHearts,
        uint256 claimBonusHearts,
        address referrerAddr
    )
        private
        returns (uint256 totalClaimedHearts)
    {
        totalClaimedHearts = claimedHearts + claimBonusHearts;

        uint256 originBonusHearts = claimBonusHearts;

        if (referrerAddr == address(0)) {
            /* No referrer */
            _emitClaim(
                claimToAddr,
                rawAmount,
                adjAmount,
                totalClaimedHearts,
                referrerAddr
            );
        } else {
            /* Referral bonus of 10% of total claimed Hearts to claimer */
            uint256 referralBonusHearts = totalClaimedHearts / 10;

            totalClaimedHearts += referralBonusHearts;

            /* Then a cumulative referrer bonus of 20% to referrer */
            uint256 referrerBonusHearts = totalClaimedHearts / 5;

            originBonusHearts += referralBonusHearts + referrerBonusHearts;

            if (referrerAddr == claimToAddr) {
                /* Self-referred */
                totalClaimedHearts += referrerBonusHearts;
                _emitClaim(
                   claimToAddr,
                   rawAmount,
                   adjAmount,
                   totalClaimedHearts,
                   referrerAddr
                );
            } else {
                /* Referred by different address */
                _emitClaim(
                   claimToAddr,
                   rawAmount,
                   adjAmount,
                   totalClaimedHearts,
                   referrerAddr
                );
                _mint(referrerAddr, referrerBonusHearts);
            }
        }

        _mint(ORIGIN_ADDR, originBonusHearts);

        return totalClaimedHearts;
    }



    function _emitClaim(
        address claimToAddr,
        bytes20 btcAddr,
        uint8 claimFlags,
        uint256 rawSatoshis,
        uint256 adjSatoshis,
        uint256 claimedHearts,
        address referrerAddr
    )
        private
    {
        emit Claim( // (auto-generated event)
            uint256(uint40(block.timestamp))
                | (uint256(uint56(rawSatoshis)) << 40)
                | (uint256(uint56(adjSatoshis)) << 96)
                | (uint256(claimFlags) << 152)
                | (uint256(uint72(claimedHearts)) << 160),
            uint256(uint160(msg.sender)),
            btcAddr,
            claimToAddr,
            referrerAddr
        );

        if (claimToAddr == msg.sender) {
            return;
        }

        emit ClaimAssist( // (auto-generated event)
            uint256(uint40(block.timestamp))
                | (uint256(uint160(btcAddr)) << 40)
                | (uint256(uint56(rawSatoshis)) << 200),
            uint256(uint56(adjSatoshis))
                | (uint256(uint160(claimToAddr)) << 56)
                | (uint256(claimFlags) << 216),
            uint256(uint72(claimedHearts))
                | (uint256(uint160(referrerAddr)) << 72),
            msg.sender
        );
    }







    function _calcClaimValues(GlobalsCache memory g, uint256 rawSatoshis)
        private
        pure
        returns (uint256 adjSatoshis, uint256 claimedHearts, uint256 claimBonusHearts)
    {
        /* Apply Silly Whale reduction */
        adjSatoshis = _adjustSillyWhale(rawSatoshis);
        require(
            g._claimedSatoshisTotal + adjSatoshis <= CLAIMABLE_SATOSHIS_TOTAL,
            "HEX: CHK: _claimedSatoshisTotal"
        );
        g._claimedSatoshisTotal += adjSatoshis;

        uint256 daysRemaining = CLAIM_PHASE_END_DAY - g._currentDay;

        /* Apply late-claim reduction */
        adjSatoshis = _adjustLateClaim(adjSatoshis, daysRemaining);
        g._unclaimedSatoshisTotal -= adjSatoshis;

        /* Convert to Hearts and calculate speed bonus */
        claimedHearts = adjSatoshis * HEARTS_PER_SATOSHI;
        claimBonusHearts = _calcSpeedBonus(claimedHearts, daysRemaining);

        return (adjSatoshis, claimedHearts, claimBonusHearts);
    }





        function _adjustSillyWhale(uint256 rawSatoshis)
        private
        pure
        returns (uint256)
    {
        if (rawSatoshis < 1000e8) {
            /* For < 1,000 BTC: no penalty */
            return rawSatoshis;
        }
        if (rawSatoshis >= 10000e8) {
            /* For >= 10,000 BTC: penalty is 75%, leaving 25% */
            return rawSatoshis / 4;
        }
        /*
            For 1,000 <= BTC < 10,000: penalty scales linearly from 50% to 75%

            penaltyPercent  = (btc - 1000) / (10000 - 1000) * (75 - 50) + 50
                            = (btc - 1000) / 9000 * 25 + 50
                            = (btc - 1000) / 360 + 50

            appliedPercent  = 100 - penaltyPercent
                            = 100 - ((btc - 1000) / 360 + 50)
                            = 100 - (btc - 1000) / 360 - 50
                            = 50 - (btc - 1000) / 360
                            = (18000 - (btc - 1000)) / 360
                            = (18000 - btc + 1000) / 360
                            = (19000 - btc) / 360

            adjustedBtc     = btc * appliedPercent / 100
                            = btc * ((19000 - btc) / 360) / 100
                            = btc * (19000 - btc) / 36000

            adjustedSat     = 1e8 * adjustedBtc
                            = 1e8 * (btc * (19000 - btc) / 36000)
                            = 1e8 * ((sat / 1e8) * (19000 - (sat / 1e8)) / 36000)
                            = 1e8 * (sat / 1e8) * (19000 - (sat / 1e8)) / 36000
                            = (sat / 1e8) * 1e8 * (19000 - (sat / 1e8)) / 36000
                            = (sat / 1e8) * (19000e8 - sat) / 36000
                            = sat * (19000e8 - sat) / 36000e8
        */
        return rawSatoshis * (19000e8 - rawSatoshis) / 36000e8;
    }

    /**
     * @dev Apply late-claim adjustment to scale claim to zero by end of claim phase
     * @param adjSatoshis Adjusted BTC address balance in Satoshis (after Silly Whale)
     * @param daysRemaining Number of reward days remaining in claim phase
     * @return Adjusted BTC address balance in Satoshis (after Silly Whale and Late-Claim)
     */
    function _adjustLateClaim(uint256 adjSatoshis, uint256 daysRemaining)
        private
        pure
        returns (uint256)
    {
        /*
            Only valid from CLAIM_PHASE_DAYS to 1, and only used during that time.

            adjustedSat = sat * (daysRemaining / CLAIM_PHASE_DAYS) * 100%
                        = sat *  daysRemaining / CLAIM_PHASE_DAYS
        */
        return adjSatoshis * daysRemaining / CLAIM_PHASE_DAYS;
    }

    /**
     * @dev Calculates speed bonus for claiming earlier in the claim phase
     * @param claimedHearts Hearts claimed from adjusted BTC address balance Satoshis
     * @param daysRemaining Number of claim days remaining in claim phase
     * @return Speed bonus in Hearts
     */
    function _calcSpeedBonus(uint256 claimedHearts, uint256 daysRemaining)
        private
        pure
        returns (uint256)
    {
        /*
            Only valid from CLAIM_PHASE_DAYS to 1, and only used during that time.
            Speed bonus is 20% ... 0% inclusive.

            bonusHearts = claimedHearts  * ((daysRemaining - 1)  /  (CLAIM_PHASE_DAYS - 1)) * 20%
                        = claimedHearts  * ((daysRemaining - 1)  /  (CLAIM_PHASE_DAYS - 1)) * 20/100
                        = claimedHearts  * ((daysRemaining - 1)  /  (CLAIM_PHASE_DAYS - 1)) / 5
                        = claimedHearts  *  (daysRemaining - 1)  / ((CLAIM_PHASE_DAYS - 1)  * 5)
        */
        return claimedHearts * (daysRemaining - 1) / ((CLAIM_PHASE_DAYS - 1) * 5);
    }

    constructor(address token_, bytes32 merkleRoot_) public {
        token = token_;
        merkleRoot = merkleRoot_;
    }
}






