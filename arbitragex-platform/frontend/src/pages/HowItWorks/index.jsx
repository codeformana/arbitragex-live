import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaCoins, FaShieldAlt, FaNetworkWired, FaCheckCircle } from 'react-icons/fa';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaCoins />,
      title: 'Join the Pool',
      description: 'Connect your wallet and deposit funds into our shared arbitrage pool. Minimum investment is just $10.',
      details: ['No individual trading required', 'Pool-based investment model', 'Proportional earnings distribution']
    },
    {
      icon: <FaNetworkWired />,
      title: 'Automated Trading',
      description: 'Our advanced bots scan 200+ DEXs across 12+ chains 24/7, identifying profitable arbitrage opportunities.',
      details: ['Real-time price monitoring', 'Cross-chain arbitrage', 'Flash loan optimization']
    },
    {
      icon: <FaChartLine />,
      title: 'Earn Profits',
      description: 'Profits are automatically calculated based on your pool share. All trades are transparent with TX hashes.',
      details: ['Proportional earnings', '10% commission on profits', 'Withdraw anytime']
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure & Transparent',
      description: 'Every trade is recorded on-chain with verifiable transaction hashes. Monitor your earnings in real-time.',
      details: ['Full transparency', 'On-chain verification', 'Real-time dashboard']
    }
  ];

  const howPoolWorks = [
    {
      step: 1,
      title: 'Pool Investment Model',
      content: 'Unlike traditional arbitrage where you need your own capital and technical setup, our pool allows multiple investors to contribute together. Think of it like mining pools in cryptocurrency - stronger together!'
    },
    {
      step: 2,
      title: 'Proportional Earnings',
      content: 'Your earnings are proportional to your investment. If you own 5% of the pool and it makes $1,000 profit, you earn $50 (minus 10% commission = $45). Simple and fair.'
    },
    {
      step: 3,
      title: 'Commission Structure',
      content: 'We charge 10% commission only on profitable trades. On losing trades, we charge just 0.1% of trade volume. This ensures we only profit when you profit.'
    },
    {
      step: 4,
      title: 'Withdrawal Policy',
      content: 'No lock-up periods! Withdraw your funds anytime. Your current value includes your deposited amount plus earned profits (after commission).'
    }
  ];

  return (
    <div className="how-it-works-page">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="how-content">
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">
            <FaRocket /> How ArbitrageX Works
          </h1>
          <p className="page-subtitle">
            Join our automated arbitrage pool and earn passive income from DeFi trading
          </p>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul className="step-details">
                {step.details.map((detail, i) => (
                  <li key={i}>
                    <FaCheckCircle /> {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="pool-explanation"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Understanding the Pool Model</h2>
          <div className="pool-steps">
            {howPoolWorks.map((item, index) => (
              <motion.div
                key={index}
                className="pool-step glass-card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="cta-section"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Earning?</h2>
          <p>Join 47 active investors in our arbitrage pool today</p>
          <button className="btn-gradient-primary" onClick={() => window.location.href = '/dashboard'}>
            <FaRocket /> Connect Wallet & Join Pool
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
