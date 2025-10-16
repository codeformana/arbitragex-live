# ArbitrageX Backend

Node.js/Express backend API for the ArbitrageX DeFi arbitrage trading platform.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io for real-time updates
- Ethers.js for blockchain interaction
- JWT for authentication
- Winston for logging

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Redis (optional)

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env` and configure:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/arbitragex
JWT_SECRET=your_secret_here
WEB3_PROVIDER=your_provider_url
```

### Development

```bash
npm run dev
```

Server runs on http://localhost:3001

### Seed Database

```bash
npm run seed
```

### Simulate Trades

```bash
npm run simulate
```

## API Endpoints

### Arbitrage
- `GET /api/arbitrage/opportunities` - Get arbitrage opportunities
- `GET /api/arbitrage/stats` - Get statistics
- `POST /api/arbitrage/execute` - Execute arbitrage trade

### Users
- `GET /api/users/:address` - Get user profile
- `GET /api/users/:address/portfolio` - Get user portfolio
- `GET /api/users/:address/trades` - Get user trades

### Trades
- `GET /api/trades` - Get all trades
- `GET /api/trades/:id` - Get trade by ID
- `GET /api/trades/leaderboard/top` - Get leaderboard

### Pools
- `GET /api/pools` - Get all pools
- `GET /api/pools/:id` - Get pool details
- `GET /api/pools/:id/stats` - Get pool statistics

## WebSocket Events

- `connection` - Client connected
- `subscribe:trades` - Subscribe to trade updates
- `new-trade` - New trade executed

## Project Structure

```
src/
├── controllers/    # Request handlers
├── routes/        # API routes
├── models/        # Database models
├── services/      # Business logic
├── middleware/    # Express middleware
├── utils/         # Utility functions
├── config/        # Configuration files
└── scripts/       # Utility scripts
```

## License

MIT
