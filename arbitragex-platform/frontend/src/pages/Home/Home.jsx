import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaRocket, FaShieldAlt, FaChartLine, FaGlobe, 
  FaBolt, FaLock, FaNetworkWired, FaCheckCircle,
  FaTwitter, FaDiscord, FaGithub, FaTelegram, FaEnvelope
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useTrades } from '../../context/TradesContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { visibleTrades, liveOpportunities, avgProfit, successRate, isRealData } = useTrades();
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="home-page-modern">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-modern">
        <motion.div 
          className="hero-content-modern"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <FaRocket /> Institutional-Grade Pool Investment
          </motion.div>
          
          <h1 className="hero-title-modern">
            Automated Multi-Chain Arbitrage Pool
          </h1>
          
          <p className="hero-subtitle-modern">
            Join our transparent arbitrage pool where earnings are distributed proportionally. 
            Invest alongside others, watch real trades with TX hashes, and earn passive income from automated DeFi arbitrage. 
            <strong> Pool-based. Transparent. Profitable.</strong>
          </p>

          <div className="hero-features-grid">
            <motion.div className="hero-feature" whileHover={{ scale: 1.05 }}>
              <FaBolt className="feature-icon" />
              <div>
                <strong>Instant Execution</strong>
                <span>Trades in under 500ms</span>
              </div>
            </motion.div>
            <motion.div className="hero-feature" whileHover={{ scale: 1.05 }}>
              <FaLock className="feature-icon" />
              <div>
                <strong>Non-Custodial</strong>
                <span>Your funds, your control</span>
              </div>
            </motion.div>
            <motion.div className="hero-feature" whileHover={{ scale: 1.05 }}>
              <FaChartLine className="feature-icon" />
              <div>
                <strong>Proven Returns</strong>
                <span>1.5-3% daily returns</span>
              </div>
            </motion.div>
            <motion.div className="hero-feature" whileHover={{ scale: 1.05 }}>
              <FaGlobe className="feature-icon" />
              <div>
                <strong>Multi-Chain</strong>
                <span>12+ EVM chains 24/7</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              className="btn-gradient-primary"
              onClick={() => navigate('/dashboard')}
            >
              <FaRocket /> Start Earning Today
            </button>
            <button 
              className="btn-glass"
              onClick={() => navigate('/dashboard')}
            >
              View Live Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Dashboard Preview with Rolling Trades */}
        <motion.div 
          className="hero-dashboard-preview"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="dashboard-card glass-card">
            <div className="live-indicator">
              <span className="pulse-dot"></span> REAL BLOCKCHAIN TRADES
              <span className="trade-count">{isRealData ? 'VERIFIED' : 'DEMO'} • {liveOpportunities} live opportunities</span>
            </div>
            {visibleTrades.map((trade, idx) => (
              <motion.div 
                key={trade.id}
                className="trade-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="trade-text">{trade.description}</span>
                <span className={`trade-profit ${trade.isProfit ? (trade.profitValue > 2 ? 'high-profit' : 'positive') : 'negative'}`}>
                  {trade.profit}
                </span>
              </motion.div>
            ))}
            <div className="trade-stats">
              <div className="stat-mini">
                <span>Avg Profit</span>
                <strong className="positive">+{avgProfit}%</strong>
              </div>
              <div className="stat-mini">
                <span>Success Rate</span>
                <strong className="positive">{successRate}%</strong>
              </div>
              <div className="stat-mini blockchain-status">
                <span>{isRealData ? 'Real Blockchain' : 'Demo Mode'}</span>
                <strong className={isRealData ? 'verified' : 'demo'}>
                  {isRealData ? '✓ VERIFIED' : '⚠ DEMO'}
                </strong>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-modern" ref={ref1}>
        <div className="stats-grid-modern">
          {[
            { value: 642.85, suffix: 'K', label: 'Total Pool Value', prefix: '$' },
            { value: 47, suffix: '', label: 'Active Investors', prefix: '' },
            { value: 1847, suffix: '', label: 'Total Trades Executed', prefix: '' },
            { value: 11.9, suffix: '%', label: 'Average ROI', prefix: '' },
            { value: 12, suffix: '', label: 'EVM Chains Supported', prefix: '' },
            { value: 200, suffix: '+', label: 'DEXs Monitored', prefix: '' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card-modern glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)' }}
            >
              <h3 className="stat-value">
                {inView1 && (
                  <>
                    {stat.prefix}
                    <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} duration={2.5} />
                    {stat.suffix}
                  </>
                )}
              </h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-modern" ref={ref2}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0 }}
          animate={inView2 ? { opacity: 1 } : {}}
        >
          <h2 className="section-title">Why ArbitrageX Dominates</h2>
          <p className="section-subtitle">Institutional-grade technology meets user-friendly interface</p>
        </motion.div>

        <div className="features-grid-modern">
          {[
            {
              icon: <FaNetworkWired />,
              title: 'Cross-Chain Intelligence',
              description: 'Our advanced algorithms continuously monitor price discrepancies across 200+ DEXs on 12 EVM-compatible chains. From Ethereum Mainnet to emerging Layer 2 solutions, we never miss a profitable opportunity.',
              color: '#6366f1'
            },
            {
              icon: <FaBolt />,
              title: 'Lightning Execution',
              description: 'With our optimized smart contracts and MEV protection, we execute arbitrage opportunities in under 500ms. Speed is everything in arbitrage trading, and we are built for speed.',
              color: '#8b5cf6'
            },
            {
              icon: <FaShieldAlt />,
              title: 'Smart Risk Management',
              description: 'Every trade undergoes 15-point risk assessment including slippage protection, liquidity verification, and gas optimization. Your capital is protected by institutional-grade risk parameters.',
              color: '#ec4899'
            },
            {
              icon: <FaGlobe />,
              title: 'Community Pool',
              description: 'Combine your capital with other investors to access larger arbitrage opportunities that require significant capital. Higher capital = Higher profits for everyone.',
              color: '#14b8a6'
            },
            {
              icon: <FaChartLine />,
              title: 'Transparent Tracking',
              description: 'Monitor every trade, track your returns, and analyze performance with our comprehensive dashboard. Full transparency, no hidden fees.',
              color: '#f59e0b'
            },
            {
              icon: <FaRocket />,
              title: 'Gas Optimization',
              description: 'Our proprietary gas optimization engine ensures you never overpay for transactions, maximizing your net returns on every trade.',
              color: '#3b82f6'
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card-modern glass-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView2 ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 25px 70px ${feature.color}40`
              }}
            >
              <div className="feature-icon-wrapper" style={{ background: `${feature.color}20` }}>
                <div className="feature-icon-modern" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" ref={ref3}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0 }}
          animate={inView3 ? { opacity: 1 } : {}}
        >
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Start earning in 4 simple steps</p>
        </motion.div>

        <div className="steps-container">
          {[
            {
              step: '01',
              title: 'Connect & Deposit',
              description: 'Connect your Web3 wallet and deposit funds into our non-custodial smart contract. Your assets remain under your control at all times.',
              icon: <FaLock />
            },
            {
              step: '02',
              title: 'Automated Trading',
              description: 'Our AI-powered bots immediately begin scanning for arbitrage opportunities across all connected chains and DEXs.',
              icon: <FaRocket />
            },
            {
              step: '03',
              title: 'Real-Time Execution',
              description: 'When opportunities are detected, our system automatically executes trades with optimal routing and minimum slippage.',
              icon: <FaBolt />
            },
            {
              step: '04',
              title: 'Track & Withdraw',
              description: 'Monitor your growing portfolio in real-time and withdraw your profits anytime with no lock-up periods.',
              icon: <FaChartLine />
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="step-card glass-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={inView3 ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="step-number">{step.step}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" ref={ref4}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0 }}
          animate={inView4 ? { opacity: 1 } : {}}
        >
          <h2 className="section-title">Trusted by Thousands</h2>
          <p className="section-subtitle">Real investors, real results</p>
        </motion.div>

        <div className="testimonials-grid">
          {[
            {
              quote: "I have been using ArbitrageX for 6 months and consistently earn 2-3% monthly returns. The transparency and real-time tracking give me complete peace of mind.",
              author: 'Alex C.',
              role: 'Senior Financial Analyst',
              image: '/images/testimonials/alex.jpg'
            },
            {
              quote: "As someone who has tried manual arbitrage, the automation and multi-chain capabilities of ArbitrageX are game-changing. It is like having a team of professional traders working for you 24/7.",
              author: 'Maria L.',
              role: 'Crypto Investment Specialist',
              image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face'
            },
            {
              quote: "The pool-based approach is brilliant! I can access high-capital arbitrage opportunities that would be impossible individually. My returns have been consistently above 15% annually.",
              author: 'Rex K.',
              role: 'Institutional Trader',
              image: '/images/testimonials/rex.jpg'
            },
            {
              quote: "What impressed me most is the complete transparency. Every trade is visible with blockchain verification. This level of openness is rare in the crypto space.",
              author: 'Chirag P.',
              role: 'Blockchain Developer & Investor',
              image: '/images/testimonials/chirag.jpg'
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView4 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="testimonial-avatar-image">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="avatar-fallback" style={{ display: 'none' }}>
                  {testimonial.author.charAt(0)}
                </div>
              </div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <motion.div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
        </motion.div>

        <div className="faq-grid">
          {[
            {
              q: 'How does the pool-based system work?',
              a: 'Instead of managing individual wallets, all investors contribute to a single arbitrage pool. Your earnings are proportional to your investment percentage. If you own 10% of the pool and it makes $1000 profit, you earn $100 (minus 10% commission).'
            },
            {
              q: 'What are the investment limits?',
              a: 'Minimum deposit is $10. Maximum deposit is 50% of the total pool size. This ensures fair distribution and prevents single-wallet dominance. Current pool size is $642,850 (company seed + 47 active investors + earned profits), so max investment is $321,425 per wallet.'
            },
            {
              q: 'What are the fees?',
              a: 'We charge 10% commission on profitable trades only. On losing trades, we charge just 0.1% of trade volume. Example: Pool profit $1000 = you keep 90% of your share. This ensures we only profit when you profit.'
            },
            {
              q: 'Can I see all trades in real-time?',
              a: 'Yes! Complete transparency. Every arbitrage trade is displayed with transaction hash, DEX route, profit/loss, and blockchain. You can verify each trade on block explorers like Etherscan. Check the Dashboard for live feed.'
            },
            {
              q: 'How are earnings calculated?',
              a: 'Your earnings = (Pool Trade Profit × 90% × Your Pool Share %). If pool makes $2000 and you own 5%, you earn: $2000 × 0.9 × 0.05 = $90. Calculated automatically for every trade.'
            },
            {
              q: 'How do withdrawals work?',
              a: 'Connect your wallet to see your current value (deposit + profits). Click withdraw, enter amount, and funds are sent to your wallet within minutes. No lock-up periods. Withdraw anytime, any amount up to your balance.'
            },
            {
              q: 'Is this custodial or non-custodial?',
              a: 'The pool operates through smart contracts. You deposit into the pool contract, which executes arbitrage trades. While funds are pooled, all transactions are on-chain and transparent. You can withdraw your share anytime.'
            },
            {
              q: 'What chains and DEXs are supported?',
              a: 'We monitor 12+ EVM chains including Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche, and others. We scan 200+ DEXs like Uniswap, SushiSwap, PancakeSwap, QuickSwap, Curve, Balancer for arbitrage opportunities 24/7.'
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="faq-card glass-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="faq-question"><FaCheckCircle /> {faq.q}</h3>
              <p className="faq-answer">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-content glass-card"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Ready to Start Earning?</h2>
          <p className="cta-subtitle">Join 47 active investors already profiting from automated arbitrage pool</p>
          <div className="cta-buttons">
            <button 
              className="btn-gradient-primary"
              onClick={() => navigate('/dashboard')}
            >
              <FaRocket /> Connect Wallet & Join Pool
            </button>
            <button 
              className="btn-glass"
              onClick={() => window.open('https://t.me/your_telegram', '_blank')}
            >
              Schedule Consultation
            </button>
          </div>
          <p className="risk-disclaimer">
            <small>⚠️ Cryptocurrency investments carry significant risk. Arbitrage trading, while lower risk than directional trading, still involves potential loss of capital. Past performance does not guarantee future results. Please invest only what you can afford to lose.</small>
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer-modern">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">ArbitrageX</h3>
            <p className="footer-description">
              Building the future of decentralized finance through AI-powered trading infrastructure. 
              Founded by DeFi veterans and quantitative traders.
            </p>
            <div className="social-icons">
              <a href="https://twitter.com/arbitragex" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
              <a href="https://discord.gg/arbitragex" target="_blank" rel="noopener noreferrer" className="social-icon"><FaDiscord /></a>
              <a href="https://t.me/arbitragex" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTelegram /></a>
              <a href="https://github.com/arbitragex" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub /></a>
              <a href="mailto:contact@arbitragex.com" className="social-icon"><FaEnvelope /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/how-it-works" onClick={(e) => { e.preventDefault(); navigate('/how-it-works'); }}>How It Works</a></li>
              <li><a href="/fee-structure" onClick={(e) => { e.preventDefault(); navigate('/fee-structure'); }}>Fee Structure</a></li>
              <li><a href="/supported-chains" onClick={(e) => { e.preventDefault(); navigate('/supported-chains'); }}>Supported Chains</a></li>
              <li><a href="/dashboard">API Documentation</a></li>
              <li><a href="/dashboard">Bug Bounty Program</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>Terms of Service</a></li>
              <li><a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>Privacy Policy</a></li>
              <li><a href="/risk-disclosure" onClick={(e) => { e.preventDefault(); navigate('/risk-disclosure'); }}>Risk Disclosure</a></li>
              <li><a href="/dashboard">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 ArbitrageX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
