import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins, FaPercentage, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import './FeeStructure.css';

const FeeStructure = () => {
  return (
    <div className="fee-structure-page">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="fee-content">
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">
            <FaCoins /> Fee Structure
          </h1>
          <p className="page-subtitle">Transparent and fair pricing for all investors</p>
        </motion.div>

        <div className="fee-cards">
          <motion.div
            className="fee-card glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="fee-icon success">
              <FaChartLine />
            </div>
            <h2>Profitable Trades</h2>
            <div className="fee-amount">10%</div>
            <p>We charge 10% commission only on profitable trades</p>
            <div className="example">
              <strong>Example:</strong>
              <p>Pool profit: $1,000</p>
              <p>Your 5% share: $50</p>
              <p>Commission (10%): $5</p>
              <p className="highlight">You keep: $45</p>
            </div>
          </motion.div>

          <motion.div
            className="fee-card glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="fee-icon warning">
              <FaPercentage />
            </div>
            <h2>Losing Trades</h2>
            <div className="fee-amount">0.1%</div>
            <p>On losing trades, we charge just 0.1% of trade volume</p>
            <div className="example">
              <strong>Example:</strong>
              <p>Trade volume: $10,000</p>
              <p>Trade loss: $100</p>
              <p>Volume fee (0.1%): $10</p>
              <p className="highlight">Your share: proportional to pool %</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="fee-info glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>
            <FaShieldAlt /> Our Promise
          </h2>
          <ul>
            <li>✅ No hidden fees</li>
            <li>✅ No deposit fees</li>
            <li>✅ No withdrawal fees</li>
            <li>✅ No monthly subscription</li>
            <li>✅ We only profit when you profit</li>
          </ul>
        </motion.div>

        <motion.div
          className="investment-limits glass-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Investment Limits</h2>
          <div className="limits-grid">
            <div className="limit-item">
              <h3>Minimum Deposit</h3>
              <p className="limit-value">$10</p>
              <p className="limit-desc">Low barrier to entry for all investors</p>
            </div>
            <div className="limit-item">
              <h3>Maximum Deposit</h3>
              <p className="limit-value">50% of Pool</p>
              <p className="limit-desc">Currently: $321,425 (pool: $642,850)</p>
            </div>
            <div className="limit-item">
              <h3>Withdrawal</h3>
              <p className="limit-value">Anytime</p>
              <p className="limit-desc">No lock-up periods or penalties</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeeStructure;
