const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const arbitrageRoutes = require('./routes/arbitrage');
const usersRoutes = require('./routes/users');
const tradesRoutes = require('./routes/trades');
const poolsRoutes = require('./routes/pools');
const blockchainRoutes = require('./routes/blockchain'); // ✅ REAL BLOCKCHAIN DATA
const errorHandler = require('./middleware/errorHandler');

console.log('🚀 Starting ArbitrageX Backend (Demo Mode - No Database Required)...');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make io accessible to routes
app.set('io', io);

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/arbitrage', arbitrageRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/trades', tradesRoutes);
app.use('/api/pools', poolsRoutes);
app.use('/api/blockchain', blockchainRoutes); // ✅ REAL BLOCKCHAIN DATA ENDPOINT

// Error handling
app.use(errorHandler);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('subscribe:trades', () => {
    socket.join('trades');
  });

  socket.on('unsubscribe:trades', () => {
    socket.leave('trades');
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, io };
