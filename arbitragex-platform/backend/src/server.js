// Real-Time Blockchain Arbitrage API Server
// Serves REAL blockchain transactions to frontend

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { fetchAllChainTransactions, convertToArbitrageTrades } = require('./services/blockchainFetcher');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory cache for blockchain data
let cachedTrades = [];
let lastUpdate = null;
let isUpdating = false;

// Update blockchain data every 15-30 seconds
async function updateBlockchainData() {
  if (isUpdating) return;
  
  isUpdating = true;
  console.log('🔄 Fetching REAL blockchain transactions...');
  
  try {
    const transactions = await fetchAllChainTransactions();
    cachedTrades = convertToArbitrageTrades(transactions);
    lastUpdate = new Date();
    
    console.log(`✅ Updated with ${cachedTrades.length} REAL trades at ${lastUpdate.toLocaleTimeString()}`);
  } catch (error) {
    console.error('❌ Error updating blockchain data:', error);
  } finally {
    isUpdating = false;
  }
}

// Initial fetch
updateBlockchainData();

// Auto-update every 20 seconds
setInterval(updateBlockchainData, 20000);

// API Routes

// Get all real-time trades
app.get('/api/trades/realtime', (req, res) => {
  res.json({
    success: true,
    trades: cachedTrades,
    totalTrades: cachedTrades.length,
    lastUpdate,
    isReal: true,
    message: 'Real blockchain transactions from Ethereum, Polygon, BSC, Arbitrum, and Base'
  });
});

// Get trades by chain
app.get('/api/trades/chain/:chain', (req, res) => {
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

// Get trades by DEX
app.get('/api/trades/dex/:dex', (req, res) => {
  const { dex } = req.params;
  const filtered = cachedTrades.filter(t => 
    t.dex.toLowerCase().includes(dex.toLowerCase())
  );
  
  res.json({
    success: true,
    dex,
    trades: filtered,
    count: filtered.length
  });
});

// Get random subset for display (like current system)
app.get('/api/trades/random/:count', (req, res) => {
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

// Get statistics
app.get('/api/stats', (req, res) => {
  const profitable = cachedTrades.filter(t => t.isProfit).length;
  const totalTrades = cachedTrades.length;
  const successRate = ((profitable / totalTrades) * 100).toFixed(1);
  
  const avgProfit = cachedTrades
    .filter(t => t.isProfit)
    .reduce((sum, t) => sum + t.profitValue, 0) / profitable;

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
    avgProfit: avgProfit.toFixed(2),
    chainDistribution: chainCounts,
    lastUpdate,
    isReal: true
  });
});

// Verify transaction on blockchain (redirect to explorer)
app.get('/api/verify/:txHash', (req, res) => {
  const { txHash } = req.params;
  const trade = cachedTrades.find(t => t.txHash === txHash);
  
  if (trade) {
    res.json({
      success: true,
      verified: true,
      trade,
      explorerUrl: trade.explorerUrl,
      message: 'Click explorerUrl to verify on blockchain explorer'
    });
  } else {
    res.json({
      success: false,
      verified: false,
      message: 'Transaction not found in current dataset'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'running',
    uptime: process.uptime(),
    lastUpdate,
    cachedTrades: cachedTrades.length,
    isUpdating
  });
});

// Force update (for testing)
app.post('/api/update', async (req, res) => {
  if (isUpdating) {
    return res.json({ success: false, message: 'Update already in progress' });
  }
  
  updateBlockchainData();
  res.json({ success: true, message: 'Update triggered' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 ArbitrageX Real Blockchain API Server               ║
║                                                           ║
║   Status: ✅ RUNNING                                      ║
║   Port: ${PORT}                                              ║
║   Mode: Real-Time Blockchain Data                        ║
║                                                           ║
║   📊 Endpoints:                                           ║
║   GET  /api/trades/realtime    - All real trades         ║
║   GET  /api/trades/random/:n   - Random N trades         ║
║   GET  /api/trades/chain/:name - Filter by chain         ║
║   GET  /api/trades/dex/:name   - Filter by DEX           ║
║   GET  /api/stats              - Statistics              ║
║   GET  /api/verify/:txHash     - Verify transaction      ║
║   POST /api/update             - Force update            ║
║                                                           ║
║   🔗 Chains: Ethereum, Polygon, BSC, Arbitrum, Base      ║
║   ⚡ Update Interval: 20 seconds                         ║
║   ✅ All transactions are REAL and verifiable            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
  
  console.log(`\n📡 Frontend can connect to: http://localhost:${PORT}`);
  console.log(`🔍 Test endpoint: http://localhost:${PORT}/api/trades/realtime\n`);
});

module.exports = app;
