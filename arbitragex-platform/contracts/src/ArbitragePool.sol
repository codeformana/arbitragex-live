// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ArbitragePool is Ownable, ReentrancyGuard {
    IERC20 public immutable token;
    
    uint256 public totalShares;
    uint256 public totalDeposits;
    uint256 public performanceFee = 2000; // 20% in basis points
    uint256 public managementFee = 200;   // 2% in basis points
    uint256 public constant BASIS_POINTS = 10000;
    
    mapping(address => uint256) public shares;
    mapping(address => uint256) public deposits;
    
    address public executor;
    bool public paused;
    
    event Deposit(address indexed user, uint256 amount, uint256 shares);
    event Withdraw(address indexed user, uint256 amount, uint256 shares);
    event ProfitDistributed(uint256 amount);
    event FeeCollected(uint256 amount);
    
    modifier onlyExecutor() {
        require(msg.sender == executor, "Not authorized");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Pool is paused");
        _;
    }
    
    constructor(address _token, address _executor) {
        token = IERC20(_token);
        executor = _executor;
    }
    
    function deposit(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        
        uint256 sharesToMint;
        if (totalShares == 0) {
            sharesToMint = amount;
        } else {
            sharesToMint = (amount * totalShares) / totalDeposits;
        }
        
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        shares[msg.sender] += sharesToMint;
        deposits[msg.sender] += amount;
        totalShares += sharesToMint;
        totalDeposits += amount;
        
        emit Deposit(msg.sender, amount, sharesToMint);
    }
    
    function withdraw(uint256 shareAmount) external nonReentrant {
        require(shareAmount > 0, "Share amount must be greater than 0");
        require(shares[msg.sender] >= shareAmount, "Insufficient shares");
        
        uint256 withdrawAmount = (shareAmount * totalDeposits) / totalShares;
        
        shares[msg.sender] -= shareAmount;
        totalShares -= shareAmount;
        totalDeposits -= withdrawAmount;
        
        require(token.transfer(msg.sender, withdrawAmount), "Transfer failed");
        
        emit Withdraw(msg.sender, withdrawAmount, shareAmount);
    }
    
    function distributeProfit(uint256 profit) external onlyExecutor {
        uint256 fee = (profit * performanceFee) / BASIS_POINTS;
        uint256 netProfit = profit - fee;
        
        totalDeposits += netProfit;
        
        require(token.transfer(owner(), fee), "Fee transfer failed");
        
        emit ProfitDistributed(netProfit);
        emit FeeCollected(fee);
    }
    
    function getShareValue() public view returns (uint256) {
        if (totalShares == 0) return 0;
        return (totalDeposits * 1e18) / totalShares;
    }
    
    function getUserValue(address user) public view returns (uint256) {
        if (shares[user] == 0) return 0;
        return (shares[user] * totalDeposits) / totalShares;
    }
    
    function setExecutor(address _executor) external onlyOwner {
        executor = _executor;
    }
    
    function setPerformanceFee(uint256 _fee) external onlyOwner {
        require(_fee <= 5000, "Fee too high"); // Max 50%
        performanceFee = _fee;
    }
    
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }
    
    function emergencyWithdraw(address _token, uint256 amount) external onlyOwner {
        IERC20(_token).transfer(owner(), amount);
    }
}
