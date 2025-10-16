const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const arbitrageRoutes = require('./routes/arbitrage');
const usersRoutes = require('./routes/users');
const tradesRoutes = require('./routes/trades');
const poolsRoutes = require('./routes/pools');
const blockchainRoutes = require('./routes/blockchain'); // ✅ REAL BLOCKCHAIN DATA
const errorHandler = require('./middleware/errorHandler');

console.log('🚀 ArbitrageX Backend (Vercel Serverless)...');

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app', 'https://arbitragex.vercel.app']
    : ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
}));
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    realBlockchain: true,
    message: 'ArbitrageX API is running with real blockchain data'
  });
});

// Routes
app.use('/api/arbitrage', arbitrageRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/trades', tradesRoutes);
app.use('/api/pools', poolsRoutes);
app.use('/api/blockchain', blockchainRoutes); // ✅ REAL BLOCKCHAIN ENDPOINTS

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'ArbitrageX API',
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

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: ['/api/health', '/api/blockchain/realtime', '/api/arbitrage/opportunities']
  });
});

// Export for Vercel
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔗 Real blockchain data: http://localhost:${PORT}/api/blockchain/realtime`);
  });
}