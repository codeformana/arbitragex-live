# ArbitrageX Frontend

React-based frontend for the ArbitrageX DeFi arbitrage trading platform.

## Tech Stack

- React 18
- Vite
- React Router
- Ethers.js
- Chart.js
- Tailwind CSS
- Socket.io Client

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env` and configure:

```
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
VITE_INFURA_ID=your_infura_id
```

### Development

```bash
npm run dev
```

Runs on http://localhost:3000

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── contexts/      # React contexts
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── styles/        # Global styles
└── assets/        # Static assets
```

## Features

- Wallet connection (MetaMask, WalletConnect)
- Real-time trading dashboard
- Trade simulation
- Leaderboard
- ROI Calculator
- Multi-chain support

## License

MIT
