import React from 'react';
import { motion } from 'framer-motion';
import { FaNetworkWired, FaEthereum } from 'react-icons/fa';
import { SiPolygon, SiBinance } from 'react-icons/si';
import './SupportedChains.css';

const SupportedChains = () => {
  const chains = [
    { name: 'Ethereum', symbol: 'ETH', icon: <FaEthereum />, dexs: 'Uniswap, SushiSwap, Curve, Balancer', color: '#627EEA' },
    { name: 'Polygon', symbol: 'MATIC', icon: <SiPolygon />, dexs: 'QuickSwap, SushiSwap, Curve', color: '#8247E5' },
    { name: 'BNB Chain', symbol: 'BNB', icon: <SiBinance />, dexs: 'PancakeSwap, BiSwap, ApeSwap', color: '#F3BA2F' },
    { name: 'Arbitrum', symbol: 'ARB', dexs: 'Uniswap V3, SushiSwap, Camelot', color: '#28A0F0' },
    { name: 'Optimism', symbol: 'OP', dexs: 'Uniswap V3, Velodrome, Curve', color: '#FF0420' },
    { name: 'Avalanche', symbol: 'AVAX', dexs: 'TraderJoe, Pangolin, Curve', color: '#E84142' },
    { name: 'Base', symbol: 'BASE', dexs: 'Uniswap V3, Aerodrome, BaseSwap', color: '#0052FF' },
    { name: 'zkSync Era', symbol: 'zkSync', dexs: 'SyncSwap, Mute, Velocore', color: '#4E529A' },
    { name: 'Linea', symbol: 'Linea', dexs: 'Velocore, Lynex, Nile', color: '#61DFFF' },
    { name: 'Scroll', symbol: 'Scroll', dexs: 'Zebra, Ambient, Scroll Swap', color: '#FFEEDA' },
    { name: 'Mantle', symbol: 'MNT', dexs: 'Agni Finance, FusionX, Merchant Moe', color: '#000000' },
    { name: 'Fantom', symbol: 'FTM', dexs: 'SpookySwap, SpiritSwap, Curve', color: '#1969FF' }
  ];

  return (
    <div className="chains-page">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="chains-content">
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">
            <FaNetworkWired /> Supported Chains & DEXs
          </h1>
          <p className="page-subtitle">Trading across 12+ EVM chains and 200+ decentralized exchanges</p>
        </motion.div>

        <div className="chains-grid">
          {chains.map((chain, index) => (
            <motion.div
              key={index}
              className="chain-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="chain-icon" style={{ color: chain.color }}>
                {chain.icon || <FaNetworkWired />}
              </div>
              <h3>{chain.name}</h3>
              <p className="chain-symbol">{chain.symbol}</p>
              <div className="chain-dexs">
                <strong>DEXs:</strong>
                <p>{chain.dexs}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="info-section glass-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Why Multi-Chain?</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>🌐 More Opportunities</h3>
              <p>Access arbitrage opportunities across multiple blockchains simultaneously</p>
            </div>
            <div className="info-item">
              <h3>⚡ Lower Fees</h3>
              <p>Utilize L2 chains with significantly lower gas costs</p>
            </div>
            <div className="info-item">
              <h3>🔄 Cross-Chain Arbitrage</h3>
              <p>Exploit price differences between the same asset on different chains</p>
            </div>
            <div className="info-item">
              <h3>🛡️ Risk Diversification</h3>
              <p>Spread trades across multiple networks for better risk management</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportedChains;
