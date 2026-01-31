// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title TransparencyOracleVerifier
 * @notice Verifies cryptographic signatures from the BCTE Off-Chain Intelligence Layer.
 * @dev Uses ECDSA to ensure risk scores and execution data are signed by the authorized backend.
 */
contract TransparencyOracleVerifier {
    address public oracleAddress;

    constructor(address _oracleAddress) {
        require(_oracleAddress != address(0), "Invalid oracle address");
        oracleAddress = _oracleAddress;
    }

    /**
     * @notice Verifies that the provided risk data was signed by the BCTE Oracle.
     * @param _hash The hash of the data (intentId + score + ...).
     * @param _signature The signature provided by the off-chain agent.
     * @return bool True if valid, False otherwise.
     */
    function verifySignature(bytes32 _hash, bytes memory _signature) public view returns (bool) {
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(_hash);
        address signer = recoverSigner(ethSignedMessageHash, _signature);
        return signer == oracleAddress;
    }

    function getEthSignedMessageHash(bytes32 _messageHash) internal pure returns (bytes32) {
        /*
        Signature is produced by signing a keccak256 hash with the following format:
        "\x19Ethereum Signed Message:\n32" + hash
        */
        return keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
        );
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
        internal
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "Invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
