import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract } from 'react-icons/fa';
import './Legal.css';

const TermsOfService = () => {
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
            <FaFileContract /> Terms of Service
          </h1>
          <p className="page-subtitle">Last updated: October 7, 2025</p>
        </motion.div>

        <motion.div
          className="legal-section glass-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using ArbitrageX platform, you accept and agree to be bound by the terms and provisions of this agreement.</p>

          <h2>2. Description of Service</h2>
          <p>ArbitrageX provides an automated cryptocurrency arbitrage trading pool service. Users contribute funds to a shared pool, and our algorithmic trading system executes arbitrage strategies across multiple decentralized exchanges (DEXs) and blockchain networks.</p>

          <h2>3. Investment Risks</h2>
          <p>You acknowledge that:</p>
          <ul>
            <li>Cryptocurrency trading involves substantial risk of loss</li>
            <li>Past performance does not guarantee future results</li>
            <li>You should only invest funds you can afford to lose</li>
            <li>Arbitrage strategies may result in losses</li>
            <li>Smart contract risks exist</li>
          </ul>

          <h2>4. Fee Structure</h2>
          <p>ArbitrageX charges:</p>
          <ul>
            <li>10% commission on profitable trades</li>
            <li>0.1% of trade volume on losing trades</li>
            <li>No deposit or withdrawal fees</li>
          </ul>

          <h2>5. Investment Limits</h2>
          <p>Minimum investment: $10 USD equivalent</p>
          <p>Maximum investment: 50% of total pool size</p>

          <h2>6. Withdrawals</h2>
          <p>Users may withdraw funds at any time. There are no lock-up periods. Withdrawals are processed within 24-48 hours.</p>

          <h2>7. Liability</h2>
          <p>ArbitrageX is not liable for:</p>
          <ul>
            <li>Trading losses</li>
            <li>Smart contract vulnerabilities</li>
            <li>Network congestion or failures</li>
            <li>Third-party DEX issues</li>
          </ul>

          <h2>8. Termination</h2>
          <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms.</p>

          <h2>9. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with applicable international laws.</p>

          <h2>10. Contact</h2>
          <p>For questions about these Terms, contact us at: legal@arbitragex.com</p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
