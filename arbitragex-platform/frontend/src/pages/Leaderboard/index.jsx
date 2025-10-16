import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, FaMedal, FaAward, FaCoins, FaChartLine, FaUsers,
  FaCrown, FaStar, FaFire, FaRocket
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import LiveTradesWidget from '../../components/LiveTradesWidget';
import './Leaderboard.css';

const Leaderboard = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [timeFilter, setTimeFilter] = useState('all-time'); // all-time, monthly, weekly

  // Dynamic state that updates regularly
  const [poolStats, setPoolStats] = useState({
    totalInvestors: 47,
    totalPoolValue: 642850,
    totalDeposits: 555422,
    totalProfit: 87428,
    avgROI: 11.90
  });

  // Generate top investors by deposit amount (will be updated dynamically)
  // Total deposits from all 47 investors ≈ $555,422 (Company seed: $25,000 separate)
  // With profits, current pool is $642,850
  const [topInvestors, setTopInvestors] = useState([
    { rank: 1, address: '0x742d...89AF', depositAmount: 52800, currentValue: 59126.40, profit: 6326.40, roi: 11.98, trades: 1134, joinDate: '87 days ago' },
    { rank: 2, address: '0x8A3f...2B1C', depositAmount: 38500, currentValue: 42735.00, profit: 4235.00, roi: 11.00, trades: 987, joinDate: '102 days ago' },
    { rank: 3, address: '0x5D91...7E4F', depositAmount: 31200, currentValue: 34632.00, profit: 3432.00, roi: 11.00, trades: 856, joinDate: '95 days ago' },
    { rank: 4, address: '0x3C2B...4A92', depositAmount: 27600, currentValue: 30360.00, profit: 2760.00, roi: 10.00, trades: 743, joinDate: '78 days ago' },
    { rank: 5, address: '0x9F82...1D3E', depositAmount: 24800, currentValue: 27032.00, profit: 2232.00, roi: 9.00, trades: 682, joinDate: '91 days ago' },
    { rank: 6, address: '0x4E71...8C5D', depositAmount: 21500, currentValue: 23220.00, profit: 1720.00, roi: 8.00, trades: 625, joinDate: '105 days ago' },
    { rank: 7, address: '0x7B6A...2F93', depositAmount: 19200, currentValue: 20544.00, profit: 1344.00, roi: 7.00, trades: 578, joinDate: '82 days ago' },
    { rank: 8, address: '0x1A9C...6E47', depositAmount: 17800, currentValue: 18958.00, profit: 1158.00, roi: 6.51, trades: 512, joinDate: '115 days ago' },
    { rank: 9, address: '0x6D5F...3B82', depositAmount: 16400, currentValue: 17384.00, profit: 984.00, roi: 6.00, trades: 478, joinDate: '68 days ago' },
    { rank: 10, address: '0x2C8E...9A14', depositAmount: 15000, currentValue: 15900.00, profit: 900.00, roi: 6.00, trades: 442, joinDate: '73 days ago' },
    { rank: 11, address: '0xF91D...5C67', depositAmount: 13800, currentValue: 14628.00, profit: 828.00, roi: 6.00, trades: 407, joinDate: '59 days ago' },
    { rank: 12, address: '0xE45B...7F21', depositAmount: 12600, currentValue: 13356.00, profit: 756.00, roi: 6.00, trades: 379, joinDate: '96 days ago' },
    { rank: 13, address: '0xB72A...4D86', depositAmount: 11500, currentValue: 12190.00, profit: 690.00, roi: 6.00, trades: 344, joinDate: '84 days ago' },
    { rank: 14, address: '0x8C3D...1E59', depositAmount: 10200, currentValue: 10812.00, profit: 612.00, roi: 6.00, trades: 318, joinDate: '51 days ago' },
    { rank: 15, address: '0x4F91...8B3A', depositAmount: 9500, currentValue: 10070.00, profit: 570.00, roi: 6.00, trades: 293, joinDate: '107 days ago' },
  ]);

  // Update investors' profits and pool stats regularly (every 30 mins to 4 hours)
  useEffect(() => {
    const updateStats = () => {
      // Update each investor's profit, current value, and ROI
      setTopInvestors(prevInvestors => 
        prevInvestors.map(investor => {
          // Bigger profit increase since updates are infrequent (0.5% to 2% of deposited amount)
          const profitIncrease = (Math.random() * 0.015 + 0.005) * investor.depositAmount;
          const newProfit = investor.profit + profitIncrease;
          const newCurrentValue = investor.depositAmount + newProfit;
          const newROI = ((newProfit / investor.depositAmount) * 100).toFixed(2);
          
          return {
            ...investor,
            profit: parseFloat(newProfit.toFixed(2)),
            currentValue: parseFloat(newCurrentValue.toFixed(2)),
            roi: parseFloat(newROI)
          };
        })
      );

      // Update pool stats
      setPoolStats(prev => {
        const profitIncrease = Math.random() * 3000 + 1500; // $1,500-$4,500 increase (bigger since infrequent)
        const newTotalProfit = prev.totalProfit + profitIncrease;
        const newTotalPoolValue = prev.totalDeposits + newTotalProfit;
        const newAvgROI = ((newTotalProfit / prev.totalDeposits) * 100).toFixed(2);

        return {
          ...prev,
          totalProfit: parseFloat(newTotalProfit.toFixed(2)),
          totalPoolValue: parseFloat(newTotalPoolValue.toFixed(2)),
          avgROI: parseFloat(newAvgROI)
        };
      });

      // Schedule next update (30 minutes to 4 hours)
      // 30 min = 1,800,000ms, 4 hours = 14,400,000ms
      const nextInterval = Math.random() * 12600000 + 1800000; // Random between 30min-4hr
      setTimeout(updateStats, nextInterval);
    };

    // Start updating after initial delay (30 minutes to 1 hour)
    const initialDelay = Math.random() * 1800000 + 1800000; // 30min-1hr
    const timeout = setTimeout(updateStats, initialDelay);
    return () => clearTimeout(timeout);
  }, []);

  // Very slowly update member count (1-6 hours between new members)
  useEffect(() => {
    const updateMembers = () => {
      setPoolStats(prev => {
        // 50% chance to increase by 1 investor when this runs
        const random = Math.random();
        let change = 0;
        if (random > 0.5) {
          change = 1; // New investor joins!
        }

        return {
          ...prev,
          totalInvestors: prev.totalInvestors + change
        };
      });

      // Schedule next member update (1 hour to 6 hours)
      // 1 hour = 3,600,000ms, 6 hours = 21,600,000ms
      const nextInterval = Math.random() * 18000000 + 3600000; // Random 1-6 hours
      setTimeout(updateMembers, nextInterval);
    };

    // Start updating members after 1-3 hours
    const initialDelay = Math.random() * 7200000 + 3600000; // 1-3 hours
    const timeout = setTimeout(updateMembers, initialDelay);
    return () => clearTimeout(timeout);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaCrown className="rank-icon gold" />;
      case 2:
        return <FaMedal className="rank-icon silver" />;
      case 3:
        return <FaMedal className="rank-icon bronze" />;
      default:
        return <span className="rank-number">#{rank}</span>;
    }
  };

  return (
    <div className="leaderboard-page-modern">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="leaderboard-container">
        {/* Header */}
        <motion.div 
          className="leaderboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="page-title">
              <FaTrophy /> Top Investors Leaderboard
            </h1>
            <p className="page-subtitle">Highest deposited amounts in the arbitrage pool</p>
          </div>
        </motion.div>

        {/* Pool Overview Stats */}
        <div className="pool-overview-stats" ref={ref1}>
          {[
            { icon: <FaUsers />, label: 'Total Investors', value: poolStats.totalInvestors, color: '#6366f1' },
            { icon: <FaCoins />, label: 'Pool Value', value: poolStats.totalPoolValue, prefix: '$', color: '#10b981' },
            { icon: <FaChartLine />, label: 'Total Deposits', value: poolStats.totalDeposits, prefix: '$', color: '#f59e0b' },
            { icon: <FaRocket />, label: 'Avg ROI', value: poolStats.avgROI, suffix: '%', color: '#ec4899' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card-leaderboard glass-card"
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
                      <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 2 : 0} duration={2} separator="," />
                      {stat.suffix}
                    </>
                  )}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top 3 Podium */}
        <motion.div 
          className="podium-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="podium-container">
            {/* 2nd Place */}
            <motion.div 
              className="podium-item second glass-card"
              whileHover={{ y: -10 }}
            >
              <div className="podium-rank">
                <FaMedal className="rank-medal silver-medal" />
                <span>2nd</span>
              </div>
              <div className="podium-address">{topInvestors[1].address}</div>
              <div className="podium-amount">${topInvestors[1].depositAmount.toLocaleString()}</div>
              <div className="podium-profit positive">+${topInvestors[1].profit.toLocaleString()}</div>
              <div className="podium-roi">{topInvestors[1].roi}% ROI</div>
            </motion.div>

            {/* 1st Place */}
            <motion.div 
              className="podium-item first glass-card"
              whileHover={{ y: -10 }}
            >
              <div className="podium-rank">
                <FaCrown className="rank-crown" />
                <span>1st</span>
              </div>
              <div className="podium-address">{topInvestors[0].address}</div>
              <div className="podium-amount">${topInvestors[0].depositAmount.toLocaleString()}</div>
              <div className="podium-profit positive">+${topInvestors[0].profit.toLocaleString()}</div>
              <div className="podium-roi">{topInvestors[0].roi}% ROI</div>
              <FaStar className="star-decoration" />
            </motion.div>

            {/* 3rd Place */}
            <motion.div 
              className="podium-item third glass-card"
              whileHover={{ y: -10 }}
            >
              <div className="podium-rank">
                <FaMedal className="rank-medal bronze-medal" />
                <span>3rd</span>
              </div>
              <div className="podium-address">{topInvestors[2].address}</div>
              <div className="podium-amount">${topInvestors[2].depositAmount.toLocaleString()}</div>
              <div className="podium-profit positive">+${topInvestors[2].profit.toLocaleString()}</div>
              <div className="podium-roi">{topInvestors[2].roi}% ROI</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Leaderboard Table */}
        <motion.div 
          className="leaderboard-table-section glass-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3><FaFire /> Complete Rankings</h3>
          <div className="table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Wallet Address</th>
                  <th>Deposited</th>
                  <th>Current Value</th>
                  <th>Profit</th>
                  <th>ROI</th>
                </tr>
              </thead>
              <tbody>
                {topInvestors.map((investor, index) => (
                  <motion.tr
                    key={investor.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <td className="rank-cell">
                      {getRankIcon(investor.rank)}
                    </td>
                    <td className="address-cell">
                      <span className="wallet-address">{investor.address}</span>
                    </td>
                    <td className="amount-cell">
                      <strong>${investor.depositAmount.toLocaleString()}</strong>
                    </td>
                    <td className="amount-cell">
                      ${investor.currentValue.toLocaleString()}
                    </td>
                    <td className="profit-cell positive">
                      +${investor.profit.toLocaleString()}
                    </td>
                    <td className="roi-cell">
                      <span className="roi-badge positive">{investor.roi}%</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Live Trades Widget */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <LiveTradesWidget title="LIVE POOL ACTIVITY" showStats={true} />
        </motion.div>

        {/* Join CTA */}
        <motion.div 
          className="join-cta glass-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2>Join the Top Investors</h2>
          <p>Start earning passive income from automated arbitrage trading</p>
          <button className="btn-gradient-primary btn-large">
            <FaRocket /> Connect Wallet & Invest
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
