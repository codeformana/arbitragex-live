const Trade = require('../models/Trade');
const { generateRandomString } = require('../utils/helpers');

const generateMockTrade = () => {
  const pairs = ['ETH/USDC', 'WBTC/USDT', 'MATIC/USDC', 'AVAX/USDT'];
  const dexes = ['Uniswap', 'SushiSwap', 'PancakeSwap', 'QuickSwap'];
  const networks = ['ethereum', 'polygon', 'bsc', 'avalanche'];
  
  const inputAmount = Math.random() * 10000 + 1000;
  const outputAmount = inputAmount * (1 + Math.random() * 0.1);
  const profit = outputAmount - inputAmount;
  
  return {
    txHash: `0x${generateRandomString(64)}`,
    user: `0x${generateRandomString(40)}`,
    tokenPair: pairs[Math.floor(Math.random() * pairs.length)],
    dexA: dexes[Math.floor(Math.random() * dexes.length)],
    dexB: dexes[Math.floor(Math.random() * dexes.length)],
    network: networks[Math.floor(Math.random() * networks.length)],
    inputAmount,
    outputAmount,
    profit,
    profitPercent: (profit / inputAmount) * 100,
    gasUsed: Math.floor(Math.random() * 200000 + 100000),
    gasCost: Math.random() * 50 + 10,
    status: 'success',
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  };
};

const simulateTrades = async (count = 100) => {
  console.log(`Generating ${count} mock trades...`);
  
  const trades = [];
  for (let i = 0; i < count; i++) {
    trades.push(generateMockTrade());
  }
  
  try {
    // If using MongoDB, uncomment:
    // await Trade.insertMany(trades);
    console.log(`Successfully created ${count} mock trades`);
    return trades;
  } catch (error) {
    console.error('Error creating mock trades:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  simulateTrades(100)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { simulateTrades, generateMockTrade };
