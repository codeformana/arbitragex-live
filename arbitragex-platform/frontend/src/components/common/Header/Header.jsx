import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWallet, FaBars, FaTimes, FaRocket } from 'react-icons/fa';
import { useWeb3 } from '../../../contexts/Web3Context';
import { formatAddress } from '../../../utils/formatters';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { account, connectWallet, disconnectWallet, isConnecting, isConnected } = useWeb3();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/calculator', label: 'Calculator' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <motion.header 
      className="header-modern"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-container-modern">
        <Link to="/" className="logo-modern">
          <FaRocket className="logo-icon" />
          <span>ArbitrageX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links-modern desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-modern ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Wallet Connection */}
        <div className="header-actions-modern">
          {isConnected ? (
            <div className="wallet-info-modern">
              <span className="wallet-address-modern">{formatAddress(account)}</span>
              <button onClick={disconnectWallet} className="btn-disconnect-modern">
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="btn-connect-modern"
            >
              <FaWallet />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
