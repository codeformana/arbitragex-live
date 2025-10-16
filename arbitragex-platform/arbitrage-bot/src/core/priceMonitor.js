const logger = require('../utils/logger');
const EventEmitter = require('events');

class PriceMonitor extends EventEmitter {
  constructor() {
    super();
    this.prices = new Map();
    this.isRunning = false;
    this.updateInterval = null;
  }

  async start() {
    logger.info('Starting Price Monitor...');
    this.isRunning = true;
    
    // Start monitoring prices
    this.updateInterval = setInterval(() => {
      this.updatePrices();
    }, 5000);
    
    logger.info('Price Monitor started');
  }

  stop() {
    this.isRunning = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    logger.info('Price Monitor stopped');
  }

  async updatePrices() {
    try {
      const tokens = ['ETH', 'WBTC', 'USDC', 'USDT', 'DAI'];
      const dexes = ['Uniswap', 'SushiSwap', 'PancakeSwap'];
      
      for (const token of tokens) {
        for (const dex of dexes) {
          const key = `${token}-${dex}`;
          const price = Math.random() * 2000 + 1000;
          
          const oldPrice = this.prices.get(key);
          this.prices.set(key, price);
          
          if (oldPrice && Math.abs(price - oldPrice) / oldPrice > 0.01) {
            this.emit('price-change', {
              token,
              dex,
              oldPrice,
              newPrice: price,
              change: ((price - oldPrice) / oldPrice) * 100,
            });
          }
        }
      }
    } catch (error) {
      logger.error('Error updating prices:', error);
    }
  }

  getPrice(token, dex) {
    return this.prices.get(`${token}-${dex}`);
  }

  comparePrices(token, dexA, dexB) {
    const priceA = this.getPrice(token, dexA);
    const priceB = this.getPrice(token, dexB);
    
    if (!priceA || !priceB) return null;
    
    return {
      token,
      dexA: { name: dexA, price: priceA },
      dexB: { name: dexB, price: priceB },
      diff: Math.abs(priceA - priceB),
      diffPercent: (Math.abs(priceA - priceB) / Math.min(priceA, priceB)) * 100,
    };
  }
}

module.exports = PriceMonitor;
