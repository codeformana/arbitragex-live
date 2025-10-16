# ArbitrageX Bot

Automated arbitrage trading bot for DeFi platforms.

## Features

- Multi-chain support (Ethereum, Polygon, BSC, Avalanche)
- Real-time price monitoring
- Automated trade execution
- Risk management
- Configurable strategies

## Setup

```bash
npm install
```

## Configuration

Edit config files in `config/` directory:
- `default.json` - Base configuration
- `development.json` - Development overrides
- `production.json` - Production settings

## Running

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## Architecture

- `core/arbitrageEngine.js` - Main arbitrage logic
- `core/priceMonitor.js` - Price monitoring
- `core/tradeExecutor.js` - Trade execution
- `core/riskManager.js` - Risk management
- `strategies/` - Trading strategies
- `exchanges/` - DEX integrations
- `chains/` - Blockchain integrations

## Risk Management

The bot includes built-in risk management:
- Maximum trade size limits
- Daily loss limits
- Slippage protection
- Gas price monitoring

## License

MIT
