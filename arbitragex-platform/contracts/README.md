# ArbitrageX Smart Contracts

Solidity smart contracts for the ArbitrageX platform.

## Contracts

- **ArbitragePool.sol** - Main investment pool contract
- **ArbitrageExecutor.sol** - Executes arbitrage trades
- **TokenVault.sol** - Secure token storage
- **FeeDistributor.sol** - Distributes fees to stakeholders

## Tech Stack

- Solidity 0.8.19
- Hardhat
- OpenZeppelin Contracts
- Ethers.js

## Setup

```bash
npm install
```

## Compile

```bash
npm run compile
```

## Test

```bash
npm run test
```

## Deploy

```bash
npm run deploy -- --network ethereum
```

## Verify

```bash
npm run verify -- --network ethereum
```

## Networks Supported

- Ethereum
- Polygon
- BSC
- Avalanche

## Security

Contracts use OpenZeppelin's audited implementations for:
- Access Control (Ownable)
- Reentrancy Protection
- Safe ERC20 Operations

## License

MIT
