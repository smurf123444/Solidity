pragma solidity 0.5.13;
contract Test {

    function encodeNumbers(uint256 a, uint256 b, uint256 c) external pure returns(uint128) {

        uint256 encoded = (a << 102);

        encoded |= (b << 51);

        encoded |= (c);

        return uint128(encoded);

    }


    function decodeNumber(uint256 encoded) public pure returns (uint256 a, uint256 b, uint256 c) {

        a = encoded >> (51 * 2);

        b = (encoded >> 51) & (1 << 51) - 1;

        c = encoded & (1 << 51) - 1;

        return(a,b,c);

    }

}
