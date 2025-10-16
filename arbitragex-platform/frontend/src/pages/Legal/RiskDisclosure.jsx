import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import './Legal.css';

const RiskDisclosure = () => {
  return (
    <div className="legal-page">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="legal-content">
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">
            <FaExclamationTriangle /> Risk Disclosure
          </h1>
          <p className="page-subtitle">Please read carefully before investing</p>
        </motion.div>

        <motion.div
          className="legal-section glass-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>⚠️ Important Notice</h2>
          <p><strong>Cryptocurrency investments carry significant risk. You should only invest funds you can afford to lose.</strong></p>

          <h2>Market Risks</h2>
          <ul>
            <li>Cryptocurrency markets are highly volatile</li>
            <li>Prices can fluctuate rapidly and unpredictably</li>
            <li>Arbitrage opportunities may not always exist</li>
            <li>Market conditions can change instantly</li>
          </ul>

          <h2>Smart Contract Risks</h2>
          <ul>
            <li>Smart contracts may contain bugs or vulnerabilities</li>
            <li>Third-party DEX contracts are beyond our control</li>
            <li>Blockchain upgrades may affect functionality</li>
            <li>Potential for exploits exists despite audits</li>
          </ul>

          <h2>Trading Risks</h2>
          <ul>
            <li>Not all trades are profitable</li>
            <li>Gas fees can reduce or eliminate profits</li>
            <li>Slippage can occur on large trades</li>
            <li>Network congestion may delay executions</li>
            <li>MEV (Miner Extractable Value) attacks possible</li>
          </ul>

          <h2>Regulatory Risks</h2>
          <ul>
            <li>Cryptocurrency regulations vary by jurisdiction</li>
            <li>Laws may change affecting service availability</li>
            <li>Tax implications depend on your location</li>
            <li>Compliance requirements may evolve</li>
          </ul>

          <h2>Platform Risks</h2>
          <ul>
            <li>Service interruptions may occur</li>
            <li>Bot algorithms may underperform</li>
            <li>Technical issues can affect operations</li>
            <li>Third-party service dependencies</li>
          </ul>

          <h2>No Guarantees</h2>
          <p>Past performance does not guarantee future results. Historical returns shown on our platform are for informational purposes only and should not be considered as investment advice or a guarantee of future performance.</p>

          <h2>Your Responsibility</h2>
          <ul>
            <li>Understand the risks before investing</li>
            <li>Only invest what you can afford to lose</li>
            <li>Conduct your own research (DYOR)</li>
            <li>Consult with financial advisors if needed</li>
            <li>Monitor your investments regularly</li>
          </ul>

          <h2>Acknowledgment</h2>
          <p>By using ArbitrageX, you acknowledge that you have read, understood, and accepted all risks outlined in this disclosure.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default RiskDisclosure;
