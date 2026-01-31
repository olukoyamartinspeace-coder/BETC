// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IBCTEOracle {
    function verifySignature(bytes32 _hash, bytes calldata _signature) external view returns (bool);
    function oracleAddress() external view returns (address);
}
