// Calculate profit from arbitrage
exports.calculateProfit = (buyPrice, sellPrice, amount, fees = 0) => {
  const revenue = sellPrice * amount;
  const cost = buyPrice * amount;
  const profit = revenue - cost - fees;
  return profit;
};

// Calculate profit percentage
exports.calculateProfitPercent = (buyPrice, sellPrice) => {
  return ((sellPrice - buyPrice) / buyPrice) * 100;
};

// Calculate optimal trade size
exports.calculateOptimalTradeSize = (liquidity, maxTradeSize) => {
  const optimalSize = liquidity * 0.05; // 5% of liquidity
  return Math.min(optimalSize, maxTradeSize);
};

// Estimate slippage
exports.estimateSlippage = (tradeSize, liquidity) => {
  return (tradeSize / liquidity) * 0.5; // Simplified slippage model
};

// Calculate gas cost in USD
exports.calculateGasCost = (gasUsed, gasPrice, ethPrice) => {
  const gasCostEth = (gasUsed * gasPrice) / 1e9;
  return gasCostEth * ethPrice;
};

// Calculate ROI
exports.calculateROI = (profit, investment) => {
  return (profit / investment) * 100;
};

// Validate trade profitability after gas
exports.isProfitable = (profit, gasCost, minProfitThreshold = 0) => {
  const netProfit = profit - gasCost;
  return netProfit > minProfitThreshold;
};
