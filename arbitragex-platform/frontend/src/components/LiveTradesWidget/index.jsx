import React from 'react';
import { motion } from 'framer-motion';
import { useTrades } from '../../context/TradesContext';
import './LiveTradesWidget.css';

const LiveTradesWidget = ({ title = "LIVE TRADES", showStats = true, className = "" }) => {
  const { visibleTrades, liveOpportunities, avgProfit, successRate } = useTrades();

  return (
    <div className={`live-trades-widget glass-card ${className}`}>
      <div className="live-indicator">
        <span className="pulse-dot"></span> {title}
        <span className="trade-count">{liveOpportunities} opportunities tracked</span>
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
          <div className="trade-info">
            <span className="trade-text">{trade.description}</span>
            {trade.txHash && trade.explorerUrl && (
              <a 
                href={trade.explorerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="trade-tx-link"
                title="Click to verify on blockchain"
                onClick={(e) => e.stopPropagation()}
              >
                TX: {trade.txHash.substring(0, 8)}...{trade.txHash.substring(trade.txHash.length - 6)}
                <svg className="external-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/>
                </svg>
              </a>
            )}
          </div>
          <span className={`trade-profit ${trade.isProfit ? (trade.profitValue > 2 ? 'high-profit' : 'positive') : 'negative'}`}>
            {trade.profit}
          </span>
        </motion.div>
      ))}
      
      {showStats && (
        <div className="trade-stats">
          <div className="stat-mini">
            <span>Avg Profit</span>
            <strong className="positive">+{avgProfit}%</strong>
          </div>
          <div className="stat-mini">
            <span>Success Rate</span>
            <strong className="positive">{successRate}%</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTradesWidget;
