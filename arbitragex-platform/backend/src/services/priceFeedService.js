class PriceFeedService {
  constructor() {
    this.priceCache = new Map();
    this.cacheExpiry = 10000; // 10 seconds
  }

  async getCurrentPrices(pairs, network = 'ethereum') {
    const prices = {};
    
    if (!pairs) {
      return prices;
    }

    const pairList = Array.isArray(pairs) ? pairs : [pairs];

    for (const pair of pairList) {
      const cacheKey = `${network}:${pair}`;
      const cached = this.priceCache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
        prices[pair] = cached.data;
      } else {
        // Mock price data
        const mockPrice = {
          pair,
          uniswap: Math.random() * 2000 + 1000,
          sushiswap: Math.random() * 2000 + 1000,
          timestamp: new Date(),
        };

        this.priceCache.set(cacheKey, {
          data: mockPrice,
          timestamp: Date.now(),
        });

        prices[pair] = mockPrice;
      }
    }

    return prices;
  }

  async getPriceFromDex(dex, tokenPair, network) {
    // Mock implementation
    return Math.random() * 2000 + 1000;
  }

  async comparePrices(tokenPair, dexes, network) {
    const prices = {};

    for (const dex of dexes) {
      prices[dex] = await this.getPriceFromDex(dex, tokenPair, network);
    }

    return prices;
  }

  clearCache() {
    this.priceCache.clear();
  }
}

module.exports = new PriceFeedService();
