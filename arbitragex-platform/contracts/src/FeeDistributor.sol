// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FeeDistributor is Ownable {
    IERC20 public token;
    
    mapping(address => uint256) public shares;
    uint256 public totalShares;
    
    mapping(address => uint256) public pendingRewards;
    uint256 public totalRewards;
    
    event SharesUpdated(address indexed user, uint256 shares);
    event RewardsDistributed(uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    constructor(address _token) {
        token = IERC20(_token);
    }
    
    function setShares(address user, uint256 amount) external onlyOwner {
        totalShares = totalShares - shares[user] + amount;
        shares[user] = amount;
        
        emit SharesUpdated(user, amount);
    }
    
    function distributeRewards(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(totalShares > 0, "No shares");
        
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        
        totalRewards += amount;
        
        emit RewardsDistributed(amount);
    }
    
    function claimRewards() external {
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No rewards to claim");
        
        pendingRewards[msg.sender] = 0;
        
        require(token.transfer(msg.sender, reward), "Transfer failed");
        
        emit RewardsClaimed(msg.sender, reward);
    }
    
    function calculateReward(address user) public view returns (uint256) {
        if (totalShares == 0) return 0;
        return (totalRewards * shares[user]) / totalShares - pendingRewards[user];
    }
}
