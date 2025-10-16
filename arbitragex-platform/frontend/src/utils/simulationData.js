// Generate random number in range
export const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Generate random token pair
export const randomTokenPair = () => {
  const tokens = ['ETH', 'USDC', 'USDT', 'DAI', 'WBTC', 'MATIC'];
  const token1 = tokens[Math.floor(Math.random() * tokens.length)];
  let token2;
  do {
    token2 = tokens[Math.floor(Math.random() * tokens.length)];
  } while (token2 === token1);
  return `${token1}/${token2}`;
};

// Generate random DEX
export const randomDex = () => {
  const dexes = ['Uniswap', 'SushiSwap', 'PancakeSwap', 'TraderJoe', 'QuickSwap'];
  return dexes[Math.floor(Math.random() * dexes.length)];
};

// Generate random network
export const randomNetwork = () => {
  const networks = ['Ethereum', 'Polygon', 'BSC', 'Avalanche'];
  return networks[Math.floor(Math.random() * networks.length)];
};

// Generate mock trade
export const generateMockTrade = () => {
  const profit = randomInRange(50, 5000);
  const profitPercent = randomInRange(0.5, 15);
  
  return {
    id: `trade-${Date.now()}-${Math.random()}`,
    timestamp: Date.now() - Math.floor(Math.random() * 3600000),
    pair: randomTokenPair(),
    dexA: randomDex(),
    dexB: randomDex(),
    network: randomNetwork(),
    amount: randomInRange(1000, 50000),
    profit: profit,
    profitPercent: profitPercent / 100,
    status: 'success',
    txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
  };
};

// Generate multiple mock trades
export const generateMockTrades = (count = 10) => {
  return Array.from({ length: count }, generateMockTrade);
};

// Generate mock stats
export const generateMockStats = () => {
  return {
    totalProfit: randomInRange(50000, 500000),
    totalTrades: Math.floor(randomInRange(1000, 10000)),
    successRate: randomInRange(85, 98),
    avgProfit: randomInRange(100, 1000),
    activeStrategies: Math.floor(randomInRange(3, 8)),
    totalInvested: randomInRange(1000000, 5000000),
  };
};

// Generate mock price data
export const generateMockPriceData = (points = 20) => {
  const data = [];
  let price = randomInRange(1500, 2000);
  
  for (let i = 0; i < points; i++) {
    price += randomInRange(-50, 50);
    data.push({
      timestamp: Date.now() - (points - i) * 300000,
      price: price,
    });
  }
  
  return data;
};

// Generate mock leaderboard
export const generateMockLeaderboard = (count = 10) => {
  return Array.from({ length: count }, (_, index) => ({
    rank: index + 1,
    address: `0x${Math.random().toString(16).substr(2, 40)}`,
    totalProfit: randomInRange(10000, 100000),
    trades: Math.floor(randomInRange(100, 1000)),
    winRate: randomInRange(70, 95),
    roi: randomInRange(20, 200),
  }));
};

// Simulate live trade stream
export const simulateLiveTradeStream = (callback, interval = 3000) => {
  const streamInterval = setInterval(() => {
    callback(generateMockTrade());
  }, interval);
  
  return () => clearInterval(streamInterval);
};
