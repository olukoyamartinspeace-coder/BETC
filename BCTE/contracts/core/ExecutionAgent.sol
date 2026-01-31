// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../interfaces/IBCTETradeIntent.sol";
import "./TransparencyOracleVerifier.sol";

/**
 * @title ExecutionAgent
 * @notice The on-chain ledger and execution router for BCTE.
 * @dev Implements IBCTETradeIntent and uses signature verification.
 */
contract ExecutionAgent is IBCTETradeIntent, TransparencyOracleVerifier {
    
    // Mapping from IntentID -> TradeIntent
    mapping(bytes32 => TradeIntent) public intents;
    
    event ExecutionCompleted(bytes32 indexed intentId, bytes32 txHash);

    constructor(address _oracleAddress) TransparencyOracleVerifier(_oracleAddress) {}

    /**
     * @notice Submits a trade intent ONLY if it carries a valid Oracle Signature.
     */
    function submitIntent(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _minAmountOut,
        uint256 _riskScore,
        uint256 _validUntil,
        bytes calldata _signature
    ) external override returns (bytes32) {
        require(block.timestamp < _validUntil, "Quote expired");
        require(_riskScore >= 70, "Risk score too low");

        bytes32 messageHash = keccak256(
            abi.encodePacked(msg.sender, _tokenIn, _tokenOut, _amountIn, _riskScore, _validUntil)
        );

        require(verifySignature(messageHash, _signature), "Invalid Oracle Signature");

        bytes32 intentId = messageHash;
        
        intents[intentId] = TradeIntent({
            user: msg.sender,
            tokenIn: _tokenIn,
            tokenOut: _tokenOut,
            amountIn: _amountIn,
            minAmountOut: _minAmountOut,
            riskScore: _riskScore,
            validUntil: _validUntil,
            executed: false
        });

        emit IntentSubmitted(intentId, msg.sender, _tokenIn, _tokenOut, _amountIn, _riskScore);
        return intentId;
    }

    function markExecuted(bytes32 _intentId, bytes32 _txHash) external {
        require(intents[_intentId].user != address(0), "Intent not found");
        require(!intents[_intentId].executed, "already executed");
        intents[_intentId].executed = true;
        emit ExecutionCompleted(_intentId, _txHash);
    }
}
