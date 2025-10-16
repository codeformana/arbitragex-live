// Real Blockchain Data Routes - ARBITRAGE ONLY
const express = require('express');
const router = express.Router();
const { fetchRealArbitrageOpportunities } = require('../services/arbitrageDetector');
const { fetchHybridTrades } = require('../services/rpcFetcher'); // Fallback

// Cache for blockchain data - ACCUMULATE trades, don't replace
let cachedTrades = [];
let lastUpdate = null;
let isUpdating = false;
const MAX_TRADES = 200; // Keep last 200 transactions

// Update blockchain data - ADD new ARBITRAGE opportunities to existing ones
async function updateBlockchainData() {
  if (isUpdating) return;
  
  isUpdating = true;
  console.log('🔄 Scanning for REAL arbitrage opportunities...');
  
  try {
    let newTrades = await fetchRealArbitrageOpportunities();
    
    // Fallback: if no arbitrage found, use regular TX detection
    if (newTrades.length === 0) {
      console.log('⚠️ No arbitrage found, using TX-based arbitrage detection...');
      newTrades = await fetchHybridTrades();
    }
    
    if (newTrades.length > 0) {
      // Add new trades to the beginning of the array (most recent first)
      cachedTrades = [...newTrades, ...cachedTrades];
      
      // Keep only the most recent MAX_TRADES transactions
      if (cachedTrades.length > MAX_TRADES) {
        cachedTrades = cachedTrades.slice(0, MAX_TRADES);
      }
      
      lastUpdate = new Date();
      console.log(`✅ Added ${newTrades.length} NEW arbitrage opportunities. Total: ${cachedTrades.length} at ${lastUpdate.toLocaleTimeString()}`);
    } else {
      console.log(`⏳ No arbitrage opportunities found. Total cached: ${cachedTrades.length}`);
    }
  } catch (error) {
    console.error('❌ Error updating blockchain data:', error.message);
  } finally {
    isUpdating = false;
  }
}

// Initial fetch
updateBlockchainData();

// Auto-update every 15 seconds to catch new blocks faster
setInterval(updateBlockchainData, 15000);

// Get all real-time blockchain trades
router.get('/realtime', (req, res) => {
  res.json({
    success: true,
    trades: cachedTrades,
    totalTrades: cachedTrades.length,
    lastUpdate,
    isReal: true,
    message: 'Real blockchain transactions from Ethereum, Polygon, BSC, Arbitrum, and Base'
  });
});

// Get random subset of trades
router.get('/random/:count', (req, res) => {
  const count = Math.min(parseInt(req.params.count) || 3, cachedTrades.length);
  const shuffled = [...cachedTrades].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  
  res.json({
    success: true,
    trades: selected,
    count: selected.length,
    isReal: true
  });
});

// Get trades by chain
router.get('/chain/:chain', (req, res) => {
  const { chain } = req.params;
  const filtered = cachedTrades.filter(t => 
    t.chain.toLowerCase() === chain.toLowerCase()
  );
  
  res.json({
    success: true,
    chain,
    trades: filtered,
    count: filtered.length
  });
});

// Get statistics
router.get('/stats/live', (req, res) => {
  const profitable = cachedTrades.filter(t => t.isProfit).length;
  const totalTrades = cachedTrades.length;
  const successRate = totalTrades > 0 ? ((profitable / totalTrades) * 100).toFixed(1) : 0;
  
  const avgProfit = profitable > 0 
    ? (cachedTrades.filter(t => t.isProfit).reduce((sum, t) => sum + t.profitValue, 0) / profitable).toFixed(2)
    : 0;

  const chainCounts = {};
  cachedTrades.forEach(t => {
    chainCounts[t.chain] = (chainCounts[t.chain] || 0) + 1;
  });

  res.json({
    success: true,
    totalTrades,
    profitableTrades: profitable,
    losingTrades: totalTrades - profitable,
    successRate: parseFloat(successRate),
    avgProfit: parseFloat(avgProfit),
    chainDistribution: chainCounts,
    lastUpdate,
    isReal: true
  });
});

// Force update (for testing)
router.post('/update', async (req, res) => {
  if (isUpdating) {
    return res.json({ success: false, message: 'Update already in progress' });
  }
  
  await updateBlockchainData();
  res.json({ success: true, message: 'Update completed', totalTrades: cachedTrades.length });
});

module.exports = router;
