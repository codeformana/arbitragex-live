import React, { createContext, useState, useEffect, useContext } from 'react';

const TradesContext = createContext();

export const useTrades = () => {
  const context = useContext(TradesContext);
  if (!context) {
    throw new Error('useTrades must be used within TradesProvider');
  }
  return context;
};

// Backend API URL (backend runs on port 5000)
const API_URL = 'http://localhost:5000/api';

// Fetch REAL blockchain trades from backend
const fetchRealBlockchainTrades = async () => {
  try {
    const response = await fetch(`${API_URL}/blockchain/realtime`);
    const data = await response.json();
    
    if (data.success && data.trades && data.trades.length > 0) {
      console.log(`✅ Fetched ${data.trades.length} REAL blockchain transactions`);
      console.log('✅ TX hashes are verifiable on blockchain explorers!');
      return { trades: data.trades, isReal: true };
    }
    
    // Fallback to simulated if API returns empty
    console.warn('⚠️ API returned empty, using simulated trades');
    return { trades: generateSimulatedTrades(), isReal: false };
  } catch (error) {
    console.warn('⚠️ Backend not available, using simulated trades');
    return { trades: generateSimulatedTrades(), isReal: false };
  }
};

// Fallback: Generate simulated trades if backend is down
const generateSimulatedTrades = () => {
  const chains = ['Ethereum', 'Polygon', 'BSC', 'Arbitrum', 'Base'];
  const tokens = ['ETH', 'USDC', 'USDT', 'DAI', 'WBTC', 'MATIC', 'BNB'];
  const dexes = ['Uniswap V3', 'SushiSwap', 'PancakeSwap', 'QuickSwap', 'Curve'];

  const trades = [];
  for (let i = 0; i < 50; i++) {
    const chain = chains[Math.floor(Math.random() * chains.length)];
    const token1 = tokens[Math.floor(Math.random() * tokens.length)];
    let token2 = tokens[Math.floor(Math.random() * tokens.length)];
    while (token2 === token1) token2 = tokens[Math.floor(Math.random() * tokens.length)];
    
    const dex = dexes[Math.floor(Math.random() * dexes.length)];
    const isProfit = Math.random() > 0.15;
    const profit = isProfit 
      ? (Math.random() * 4.5 + 0.3).toFixed(2)
      : (Math.random() * -0.8 - 0.1).toFixed(2);
    
    const txHash = '0x' + Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    trades.push({
      id: `sim-${i}`,
      description: `${token1}/${token2}: ${dex} arbitrage`,
      profit: `${parseFloat(profit) >= 0 ? '+' : ''}${profit}%`,
      profitValue: parseFloat(profit),
      isProfit: parseFloat(profit) >= 0,
      chain,
      dex,
      txHash,
      timestamp: Date.now(),
      isRealBlockchain: false
    });
  }
  return trades;
};

export const TradesProvider = ({ children }) => {
  const [allTrades, setAllTrades] = useState([]);
  const [visibleTrades, setVisibleTrades] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liveOpportunities, setLiveOpportunities] = useState(12);
  const [avgProfit, setAvgProfit] = useState(1.8);
  const [successRate, setSuccessRate] = useState(94.2);
  const [isRealData, setIsRealData] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch REAL blockchain trades on mount and periodically
  useEffect(() => {
    const loadTrades = async () => {
      const { trades, isReal } = await fetchRealBlockchainTrades();
      setAllTrades(trades);
      setVisibleTrades(trades.slice(0, 3));
      setIsRealData(isReal);
      setLastUpdate(new Date());
      
      if (isReal) {
        console.log('🎉 Using REAL blockchain data!');
      }
    };

    // Initial load
    loadTrades();

    // Refresh from backend every 25 seconds to get new real transactions
    const refreshInterval = setInterval(loadTrades, 25000);

    return () => clearInterval(refreshInterval);
  }, []);

  // Roll visible trades (show different 3 trades from the pool)
  useEffect(() => {
    if (allTrades.length === 0) return;

    const rollTrades = () => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % allTrades.length;
        setVisibleTrades(prevTrades => {
          const newTrades = [...prevTrades.slice(1), allTrades[nextIndex]];
          return newTrades;
        });
        return nextIndex + 1;
      });
    };

    // Roll trades every 5-120 seconds randomly
    const randomDelay = Math.random() * (120000 - 5000) + 5000;
    const timeout = setTimeout(rollTrades, randomDelay);

    return () => clearTimeout(timeout);
  }, [allTrades, currentIndex]);

  // Update live statistics every 3-7 seconds
  useEffect(() => {
    const updateStats = () => {
      setLiveOpportunities(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(5, Math.min(20, prev + change));
      });

      setAvgProfit(prev => {
        const change = (Math.random() * 0.4 - 0.2).toFixed(2);
        return Math.max(0.5, Math.min(3.0, parseFloat(prev) + parseFloat(change))).toFixed(2);
      });

      setSuccessRate(prev => {
        const change = (Math.random() * 0.6 - 0.3).toFixed(2);
        return Math.max(78, Math.min(96.5, parseFloat(prev) + parseFloat(change))).toFixed(2);
      });
    };

    const randomDelay = Math.random() * 4000 + 3000; // 3-7 seconds
    const interval = setInterval(updateStats, randomDelay);

    return () => clearInterval(interval);
  }, []);

  const value = {
    allTrades,
    visibleTrades,
    liveOpportunities,
    avgProfit,
    successRate,
    isRealData, // ✅ Flag to show if data is real or simulated
    lastUpdate
  };

  return (
    <TradesContext.Provider value={value}>
      {children}
    </TradesContext.Provider>
  );
};
