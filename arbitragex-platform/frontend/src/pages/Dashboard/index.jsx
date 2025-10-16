import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, FaWallet, FaBolt, FaFire, FaArrowUp, FaArrowDown,
  FaEthereum, FaExchangeAlt, FaCheckCircle, FaClock, FaUsers,
  FaCoins, FaRocket, FaShieldAlt, FaTrophy, FaCircle, FaSignOutAlt,
  FaExternalLinkAlt, FaCopy, FaPlus, FaMinus, FaPercent
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useTrades } from '../../context/TradesContext';
import LiveTradesWidget from '../../components/LiveTradesWidget';
import './Dashboard.css';

const Dashboard = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Pool Stats (Global - visible to everyone)
  // Logic: Company started with $25,000 seed. 47 investors joined with average ~$12,000 each
  // Total Pool = Company Seed ($25,000) + Investor Contributions (~$564,000) = $589,000
  // With profits earned over time, current pool is larger
  const poolStats = {
    totalPoolSize: 642850, // $642,850 total pool (company seed + 47 investors + profits)
    activeInvestors: 47,
    totalTrades: 1847,
    poolProfitToday: 5142.30,
    poolProfitTotal: 87428.50, // Total profits earned since launch
    averageAPY: 18.4,
    successRate: 94.2
  };

  // User Stats (Only visible when wallet connected)
  // User invested $15,000 which is ~2.33% of $642,850 pool
  const [userStats, setUserStats] = useState({
    depositedAmount: 15000,
    currentValue: 16784.50,
    totalProfit: 1784.50,
    profitPercentage: 11.90,
    poolShare: 2.33, // 15000/642850 * 100 = 2.33%
    claimableProfit: 1606.05, // After 10% commission (1784.50 - 178.45)
    commission: 178.45 // 10% of 1784.50
  });

  // Use global trades from context
  const { visibleTrades, allTrades } = useTrades();

  // User's personal trade history - calculate user's share of profits
  const userTradeHistory = allTrades.slice(0, 10).map(trade => ({
    ...trade,
    userProfit: trade.isProfit 
      ? ((trade.profitValue * 0.9 * userStats.poolShare) / 100).toFixed(2) // 90% after commission, proportional to pool share
      : ((trade.profitValue * 0.001 * userStats.poolShare) / 100).toFixed(2) // 0.1% volume fee share on losses
  }));

  const maxDeposit = poolStats.totalPoolSize * 0.5; // 50% of pool
  const availableToDeposit = maxDeposit - userStats.depositedAmount;

  // Simulate wallet connection
  const connectWallet = () => {
    // In production, use Web3/ethers.js to connect actual wallet
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setWalletAddress(mockAddress);
    setWalletConnected(true);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount < 10) {
      alert('Minimum deposit is $10');
      return;
    }
    if (amount > availableToDeposit) {
      alert(`Maximum deposit is $${availableToDeposit.toFixed(2)} (50% of pool size)`);
      return;
    }
    alert(`Depositing $${amount}... (Demo mode - no actual transaction)`);
    setShowDepositModal(false);
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > userStats.currentValue) {
      alert('Insufficient balance');
      return;
    }
    alert(`Withdrawing $${amount}... (Demo mode - no actual transaction)`);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // If wallet not connected, show connection screen
  if (!walletConnected) {
    return (
      <div className="dashboard-page-modern">
        <div className="animated-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="dashboard-container">
          {/* Pool Overview - Visible to everyone */}
          <motion.div 
            className="public-pool-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="page-title">Arbitrage Pool Dashboard</h1>
            <p className="page-subtitle">Join the pool to start earning from automated arbitrage trading</p>

            <div className="pool-stats-grid">
              {[
                { icon: <FaCoins />, label: 'Total Pool Size', value: poolStats.totalPoolSize, prefix: '$', color: '#10b981' },
                { icon: <FaUsers />, label: 'Active Investors', value: poolStats.activeInvestors, color: '#6366f1' },
                { icon: <FaChartLine />, label: 'Total Trades', value: poolStats.totalTrades, color: '#f59e0b' },
                { icon: <FaRocket />, label: 'Success Rate', value: poolStats.successRate, suffix: '%', color: '#ec4899' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card-dashboard glass-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">{stat.label}</p>
                    <h3 className="stat-value" style={{ color: stat.color }}>
                      {stat.prefix}
                      <CountUp end={stat.value} decimals={0} duration={2} />
                      {stat.suffix}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect Wallet Prompt */}
          <motion.div 
            className="wallet-connect-prompt glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FaWallet className="wallet-icon-large" />
            <h2>Connect Your Wallet</h2>
            <p>Connect your wallet to view your personal dashboard, deposit funds, and track your earnings</p>
            <button onClick={connectWallet} className="btn-gradient-primary btn-large">
              <FaWallet /> Connect Wallet
            </button>
            <div className="wallet-info">
              <p><strong>Min Deposit:</strong> $10</p>
              <p><strong>Max Deposit:</strong> ${maxDeposit.toLocaleString()} (50% of pool)</p>
              <p><strong>Commission:</strong> 10% on profits</p>
            </div>
          </motion.div>

          {/* Live Trades - Global Widget */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <LiveTradesWidget title="POOL LIVE TRADES" showStats={true} />
          </motion.div>
        </div>
      </div>
    );
  }

  // Connected wallet view - Personal dashboard
  return (
    <div className="dashboard-page-modern">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="dashboard-container">
        {/* Header with wallet info */}
        <motion.div 
          className="dashboard-header-wallet"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="page-title">My Dashboard</h1>
            <div className="wallet-address-display">
              <FaWallet /> {formatAddress(walletAddress)}
              <button onClick={() => copyToClipboard(walletAddress)} className="btn-icon-small">
                <FaCopy />
              </button>
            </div>
          </div>
          <button onClick={disconnectWallet} className="btn-disconnect">
            <FaSignOutAlt /> Disconnect
          </button>
        </motion.div>

        {/* User Stats */}
        <div className="user-stats-grid" ref={ref1}>
          {[
            { icon: <FaCoins />, label: 'My Deposit', value: userStats.depositedAmount, prefix: '$', color: '#6366f1' },
            { icon: <FaChartLine />, label: 'Current Value', value: userStats.currentValue, prefix: '$', color: '#10b981' },
            { icon: <FaRocket />, label: 'Total Profit', value: userStats.totalProfit, prefix: '$', color: '#f59e0b', change: `+${userStats.profitPercentage}%` },
            { icon: <FaPercent />, label: 'Pool Share', value: userStats.poolShare, suffix: '%', color: '#ec4899' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card-user glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value" style={{ color: stat.color }}>
                  {inView1 && (
                    <>
                      {stat.prefix}
                      <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 2 : 0} duration={2} />
                      {stat.suffix}
                    </>
                  )}
                </h3>
                {stat.change && <span className="stat-change positive">{stat.change}</span>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="action-buttons-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button onClick={() => setShowDepositModal(true)} className="btn-action-primary">
            <FaPlus /> Deposit Funds
          </button>
          <button onClick={() => setShowWithdrawModal(true)} className="btn-action-secondary">
            <FaMinus /> Withdraw
          </button>
        </motion.div>

        {/* Earnings Breakdown */}
        <motion.div 
          className="earnings-breakdown glass-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3><FaCoins /> Earnings Breakdown</h3>
          <div className="earnings-grid">
            <div className="earning-item">
              <span>Gross Profit</span>
              <strong className="positive">${userStats.totalProfit.toFixed(2)}</strong>
            </div>
            <div className="earning-item">
              <span>Platform Commission (10%)</span>
              <strong className="negative">-${userStats.commission.toFixed(2)}</strong>
            </div>
            <div className="earning-item highlight">
              <span>Claimable Profit</span>
              <strong className="positive">${userStats.claimableProfit.toFixed(2)}</strong>
            </div>
          </div>
          <button className="btn-claim">
            <FaCheckCircle /> Claim Profit
          </button>
        </motion.div>

        {/* Global Live Trades Widget */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <LiveTradesWidget title="REAL-TIME POOL TRADES" showStats={true} />
        </motion.div>

        {/* User Trade History */}
        <motion.div 
          className="user-trades glass-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3><FaExchangeAlt /> My Share of Recent Trades</h3>
          <div className="trades-table">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Chain</th>
                  <th>Pool Profit</th>
                  <th>My Share ({userStats.poolShare}%)</th>
                  <th>TX Hash</th>
                </tr>
              </thead>
              <tbody>
                {userTradeHistory.map((trade, index) => (
                  <motion.tr
                    key={trade.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td><strong>{trade.description}</strong></td>
                    <td><span className="chain-badge-small">{trade.chain}</span></td>
                    <td className={trade.isProfit ? 'positive' : 'negative'}>
                      {trade.profit}
                    </td>
                    <td className={trade.isProfit ? 'positive' : 'negative'}>
                      {trade.isProfit ? '+' : ''}${trade.userProfit}
                    </td>
                    <td>
                      <div className="tx-hash-cell">
                        <a 
                          href={trade.explorerUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="tx-hash-link"
                          title="Click to verify on blockchain explorer"
                        >
                          {trade.txHash ? `${trade.txHash.substring(0, 10)}...${trade.txHash.substring(trade.txHash.length - 8)}` : 'N/A'}
                          <FaExternalLinkAlt style={{ marginLeft: '5px', fontSize: '10px' }} />
                        </a>
                        <button onClick={() => copyToClipboard(trade.txHash)} className="btn-icon-tiny">
                          <FaCopy />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Deposit Modal */}
      <AnimatePresence>
        {showDepositModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDepositModal(false)}
          >
            <motion.div 
              className="modal-content glass-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Deposit Funds</h2>
              <div className="modal-info">
                <p><strong>Min:</strong> $10</p>
                <p><strong>Available to deposit:</strong> ${availableToDeposit.toLocaleString()}</p>
              </div>
              <input
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="modal-input"
                min="10"
                max={availableToDeposit}
              />
              <div className="modal-buttons">
                <button onClick={handleDeposit} className="btn-gradient-primary">
                  <FaPlus /> Deposit
                </button>
                <button onClick={() => setShowDepositModal(false)} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWithdrawModal(false)}
          >
            <motion.div 
              className="modal-content glass-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Withdraw Funds</h2>
              <div className="modal-info">
                <p><strong>Available balance:</strong> ${userStats.currentValue.toLocaleString()}</p>
              </div>
              <input
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="modal-input"
                max={userStats.currentValue}
              />
              <div className="modal-buttons">
                <button onClick={handleWithdraw} className="btn-gradient-primary">
                  <FaMinus /> Withdraw
                </button>
                <button onClick={() => setShowWithdrawModal(false)} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
