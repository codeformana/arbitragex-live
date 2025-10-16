// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IUniswapV2.sol";

contract ArbitrageExecutor is Ownable, ReentrancyGuard {
    address public pool;
    
    struct ArbitragePath {
        address dexA;
        address dexB;
        address[] pathA;
        address[] pathB;
    }
    
    event ArbitrageExecuted(
        address indexed token0,
        address indexed token1,
        uint256 amountIn,
        uint256 profit
    );
    
    modifier onlyPool() {
        require(msg.sender == pool, "Only pool can call");
        _;
    }
    
    constructor(address _pool) {
        pool = _pool;
    }
    
    function executeArbitrage(
        ArbitragePath memory path,
        uint256 amountIn
    ) external onlyPool nonReentrant returns (uint256) {
        require(amountIn > 0, "Invalid amount");
        
        IERC20 tokenIn = IERC20(path.pathA[0]);
        
        // Get tokens from pool
        require(
            tokenIn.transferFrom(pool, address(this), amountIn),
            "Transfer from pool failed"
        );
        
        // Execute first swap on DEX A
        uint256 amountOut1 = _swapOnDex(path.dexA, path.pathA, amountIn);
        
        // Execute second swap on DEX B
        uint256 amountOut2 = _swapOnDex(path.dexB, path.pathB, amountOut1);
        
        require(amountOut2 > amountIn, "No profit");
        
        uint256 profit = amountOut2 - amountIn;
        
        // Return all tokens to pool
        require(
            tokenIn.transfer(pool, amountOut2),
            "Transfer to pool failed"
        );
        
        emit ArbitrageExecuted(
            path.pathA[0],
            path.pathA[path.pathA.length - 1],
            amountIn,
            profit
        );
        
        return profit;
    }
    
    function _swapOnDex(
        address dex,
        address[] memory path,
        uint256 amountIn
    ) internal returns (uint256) {
        IERC20 tokenIn = IERC20(path[0]);
        
        // Approve DEX to spend tokens
        tokenIn.approve(dex, amountIn);
        
        // Get expected output amount
        uint256[] memory amounts = IUniswapV2Router(dex).getAmountsOut(
            amountIn,
            path
        );
        
        // Execute swap
        uint256[] memory outputAmounts = IUniswapV2Router(dex)
            .swapExactTokensForTokens(
                amountIn,
                amounts[amounts.length - 1] * 95 / 100, // 5% slippage tolerance
                path,
                address(this),
                block.timestamp + 300
            );
        
        return outputAmounts[outputAmounts.length - 1];
    }
    
    function setPool(address _pool) external onlyOwner {
        pool = _pool;
    }
    
    function withdrawToken(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner(), amount);
    }
}
