// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MockDexRouter
 * @notice Simplistic mock for testing swap simulations.
 */
contract MockDexRouter {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts) {
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        amounts[path.length - 1] = amountOutMin;
        return amounts;
    }
}
