// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

// Application Constants
export const APP_NAME = 'ArbitrageX';
export const APP_VERSION = '1.0.0';

// Blockchain Networks
export const NETWORKS = {
  ETHEREUM: {
    chainId: 1,
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  POLYGON: {
    chainId: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  },
  BSC: {
    chainId: 56,
    name: 'BSC',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  },
  AVALANCHE: {
    chainId: 43114,
    name: 'Avalanche',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: 'https://snowtrace.io',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
  },
};

// DEX Names
export const DEXES = {
  UNISWAP: 'Uniswap',
  SUSHISWAP: 'SushiSwap',
  PANCAKESWAP: 'PancakeSwap',
  TRADERJOE: 'TraderJoe',
  QUICKSWAP: 'QuickSwap',
};

// Trade Status
export const TRADE_STATUS = {
  PENDING: 'pending',
  EXECUTING: 'executing',
  SUCCESS: 'success',
  FAILED: 'failed',
};

// Time Intervals
export const UPDATE_INTERVALS = {
  PRICES: 5000, // 5 seconds
  TRADES: 10000, // 10 seconds
  STATS: 30000, // 30 seconds
};

// Pagination
export const ITEMS_PER_PAGE = 20;

// Fee Structure
export const FEE_STRUCTURE = {
  PLATFORM_FEE: 0.02, // 2%
  PERFORMANCE_FEE: 0.2, // 20%
  GAS_BUFFER: 1.2, // 20% buffer
};
