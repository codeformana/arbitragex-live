module.exports = {
  provider: process.env.WEB3_PROVIDER || 'wss://mainnet.infura.io/ws/v3/',
  privateKey: process.env.PRIVATE_KEY || '',
  gasLimit: parseInt(process.env.GAS_LIMIT) || 300000,
  gasPriceMultiplier: parseFloat(process.env.GAS_PRICE_MULTIPLIER) || 1.2,
  confirmations: parseInt(process.env.CONFIRMATIONS) || 2,
};
