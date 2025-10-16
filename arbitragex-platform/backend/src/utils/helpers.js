// Format currency
exports.formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Format percentage
exports.formatPercentage = (value) => {
  return `${(value * 100).toFixed(2)}%`;
};

// Calculate profit
exports.calculateProfit = (inputAmount, outputAmount, gasCost = 0) => {
  return outputAmount - inputAmount - gasCost;
};

// Calculate ROI
exports.calculateROI = (profit, investment) => {
  return (profit / investment) * 100;
};

// Validate Ethereum address
exports.isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Generate random string
exports.generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Sleep/delay function
exports.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Retry async function
exports.retry = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await exports.sleep(delay);
    }
  }
};

// Parse error message
exports.parseError = (error) => {
  if (error.response) {
    return error.response.data.message || error.message;
  }
  return error.message || 'Unknown error';
};
