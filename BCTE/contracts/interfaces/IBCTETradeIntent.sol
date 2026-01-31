// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IBCTETradeIntent {
    struct TradeIntent {
        address user;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 minAmountOut;
        uint256 riskScore;
        uint256 validUntil;
        bool executed;
    }

    event IntentSubmitted(
        bytes32 indexed intentId, 
        address indexed user, 
        address tokenIn, 
        address tokenOut,
        uint256 amountIn,
        uint256 riskScore
    );

    function submitIntent(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _minAmountOut,
        uint256 _riskScore,
        uint256 _validUntil,
        bytes calldata _signature
    ) external returns (bytes32);
}
