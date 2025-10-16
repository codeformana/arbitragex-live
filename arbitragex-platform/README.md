# ArbitrageX Platform

A comprehensive DeFi arbitrage trading platform with automated strategies, real-time monitoring, and multi-chain support.

## Overview

ArbitrageX is a full-stack arbitrage trading platform that enables users to:
- Execute automated arbitrage trades across multiple DEXs
- Monitor real-time price differences
- Invest in managed arbitrage pools
- Track performance and ROI
- Compete on leaderboards

## Project Structure

```
arbitragex-platform/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express API server
├── contracts/         # Solidity smart contracts
├── arbitrage-bot/     # Automated trading bot
├── docs/             # Documentation
├── scripts/          # Utility scripts
└── config/           # Configuration files
```

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Ethers.js
- Chart.js
- Socket.io Client

### Backend
- Node.js & Express
- MongoDB
- Socket.io
- Ethers.js
- JWT Authentication

### Smart Contracts
- Solidity 0.8.19
- Hardhat
- OpenZeppelin

### Bot
- Node.js
- Ethers.js
- Multi-chain support

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- MetaMask or Web3 wallet

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd arbitragex-platform
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Install contracts dependencies
cd ../contracts && npm install

# Install bot dependencies
cd ../arbitrage-bot && npm install
```

3. Configure environment variables
```bash
# Copy .env.example to .env in each directory
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

4. Start development servers

Terminal 1 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm run dev
```

Terminal 3 - Bot (optional):
```bash
cd arbitrage-bot
npm run dev
```

## Features

### Core Features
- ⚡ Real-time arbitrage detection
- 🔄 Automated trade execution
- 📊 Interactive dashboard
- 💰 Investment pools
- 🏆 Leaderboard
- 📈 ROI calculator
- 🔒 Secure wallet integration

### Supported Networks
- Ethereum
- Polygon
- Binance Smart Chain
- Avalanche

### Supported DEXs
- Uniswap
- SushiSwap
- PancakeSwap
- TraderJoe
- QuickSwap

## Documentation

See the `/docs` directory for detailed documentation:
- [Architecture](docs/architecture.md)
- [API Reference](docs/api.md)
- [Setup Guide](docs/setup.md)
- [Deployment](docs/deployment.md)

## Development

### Testing

Frontend:
```bash
cd frontend && npm test
```

Backend:
```bash
cd backend && npm test
```

Contracts:
```bash
cd contracts && npm test
```

### Building

Frontend:
```bash
cd frontend && npm run build
```

Backend is deployed as-is (no build step needed).

Contracts:
```bash
cd contracts && npm run compile
```

## Deployment

See [deployment.md](docs/deployment.md) for detailed deployment instructions.

## Security

- Smart contracts audited by [Auditor Name]
- Bug bounty program active
- Regular security updates

## Contributing

Contributions are welcome! Please read our contributing guidelines first.

## License

MIT License - see LICENSE file for details

## Support

- Documentation: [docs/](docs/)
- Issues: GitHub Issues
- Discord: [Community Link]
- Email: support@arbitragex.io

## Roadmap

- [ ] Additional DEX integrations
- [ ] Layer 2 support (Arbitrum, Optimism)
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Automated strategy marketplace
- [ ] API for third-party integrations

## Acknowledgments

Built with open-source technologies and inspired by the DeFi community.
