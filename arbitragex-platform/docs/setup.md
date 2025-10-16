# Setup Guide

## Prerequisites

- Node.js 18+ and npm
- MongoDB
- MetaMask or compatible Web3 wallet
- Git

## Installation Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd arbitragex-platform
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm run install:all
```

Or install individually:

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install

# Contracts
cd contracts && npm install

# Bot
cd arbitrage-bot && npm install
```

### 3. Configure Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
VITE_INFURA_ID=your_infura_id
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/arbitragex
JWT_SECRET=your_secret_key
WEB3_PROVIDER=your_provider_url
```

### 4. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 mongo:7.0

# Or use local MongoDB installation
mongod
```

### 5. Seed Database (Optional)

```bash
cd backend
npm run seed
```

### 6. Start Development Servers

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 3 - Bot (Optional):
```bash
cd arbitrage-bot
npm run dev
```

### 7. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health: http://localhost:3001/health

## Smart Contract Setup

### 1. Compile Contracts

```bash
cd contracts
npm run compile
```

### 2. Deploy Contracts (Testnet)

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

### 3. Verify Contracts

```bash
npm run verify -- --network <network-name>
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify port 27017 is available

### Port Already in Use
- Frontend: Change port in vite.config.js
- Backend: Change PORT in .env

### MetaMask Connection Issues
- Ensure MetaMask is installed
- Check network configuration
- Clear browser cache

## Development Tools

### Recommended VS Code Extensions
- ESLint
- Prettier
- Solidity
- MongoDB for VS Code

### Browser Extensions
- MetaMask
- React Developer Tools

## Next Steps

- Read the [Architecture](architecture.md) documentation
- Review the [API Documentation](api.md)
- Check out [Deployment Guide](deployment.md)
