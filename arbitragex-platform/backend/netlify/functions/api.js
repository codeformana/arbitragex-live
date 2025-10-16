const express = require('express');
const serverless = require('serverless-http');

// Import routes
const arbitrageRoutes = require('../../src/routes/arbitrage');
const usersRoutes = require('../../src/routes/users');
const tradesRoutes = require('../../src/routes/trades');
const poolsRoutes = require('../../src/routes/pools');
const blockchainRoutes = require('../../src/routes/blockchain');
const errorHandler = require('../../src/middleware/errorHandler');

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['https://your-app.netlify.app', 'http://localhost:3000', 'http://localhost:4173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'Netlify',
    timestamp: new Date().toISOString(),
    realBlockchain: true,
    message: 'ArbitrageX API running on Netlify Functions'
  });
});

// Routes
app.use('/arbitrage', arbitrageRoutes);
app.use('/users', usersRoutes);
app.use('/trades', tradesRoutes);
app.use('/pools', poolsRoutes);
app.use('/blockchain', blockchainRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'ArbitrageX API on Netlify',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      blockchain: '/api/blockchain/realtime',
      stats: '/api/blockchain/stats/live',
      arbitrage: '/api/arbitrage/opportunities'
    }
  });
});

// Error handling
app.use(errorHandler);

// Export for Netlify Functions
module.exports.handler = serverless(app);