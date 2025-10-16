const ArbitrageEngine = require('./core/arbitrageEngine');
const PriceMonitor = require('./core/priceMonitor');
const config = require('./utils/config');
const logger = require('./utils/logger');

class ArbitrageBot {
  constructor() {
    this.engine = new ArbitrageEngine();
    this.priceMonitor = new PriceMonitor();
    this.isRunning = false;
  }

  async start() {
    try {
      logger.info('Starting Arbitrage Bot...');
      
      await this.engine.initialize();
      await this.priceMonitor.start();
      
      this.isRunning = true;
      logger.info('Arbitrage Bot started successfully');
      
      // Main loop
      this.run();
    } catch (error) {
      logger.error('Failed to start bot:', error);
      process.exit(1);
    }
  }

  async run() {
    while (this.isRunning) {
      try {
        const opportunities = await this.engine.findOpportunities();
        
        if (opportunities.length > 0) {
          logger.info(`Found ${opportunities.length} opportunities`);
          
          for (const opp of opportunities) {
            if (opp.profitPercent > config.minProfitPercent) {
              await this.engine.executeArbitrage(opp);
            }
          }
        }
        
        await this.sleep(config.scanInterval);
      } catch (error) {
        logger.error('Error in main loop:', error);
        await this.sleep(5000);
      }
    }
  }

  stop() {
    this.isRunning = false;
    this.priceMonitor.stop();
    logger.info('Arbitrage Bot stopped');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Start bot
const bot = new ArbitrageBot();

process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down...');
  bot.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down...');
  bot.stop();
  process.exit(0);
});

bot.start();

module.exports = ArbitrageBot;
