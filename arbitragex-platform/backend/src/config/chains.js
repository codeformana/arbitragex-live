module.exports = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum',
    rpcUrl: process.env.ETHEREUM_RPC || 'https://mainnet.infura.io/v3/',
    wssUrl: process.env.ETHEREUM_WSS || 'wss://mainnet.infura.io/ws/v3/',
    explorer: 'https://etherscan.io',
  },
  polygon: {
    chainId: 137,
    name: 'Polygon',
    rpcUrl: process.env.POLYGON_RPC || 'https://polygon-rpc.com',
    wssUrl: process.env.POLYGON_WSS || 'wss://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
  },
  bsc: {
    chainId: 56,
    name: 'BSC',
    rpcUrl: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org',
    wssUrl: process.env.BSC_WSS || 'wss://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
  },
  avalanche: {
    chainId: 43114,
    name: 'Avalanche',
    rpcUrl: process.env.AVALANCHE_RPC || 'https://api.avax.network/ext/bc/C/rpc',
    wssUrl: process.env.AVALANCHE_WSS || 'wss://api.avax.network/ext/bc/C/ws',
    explorer: 'https://snowtrace.io',
  },
};
