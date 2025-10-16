const logger = require('../utils/logger');

class RiskManager {
  constructor(config = {}) {
    this.maxTradeSize = config.maxTradeSize || 10000;
    this.maxDailyLoss = config.maxDailyLoss || 1000;
    this.maxSlippage = config.maxSlippage || 0.05; // 5%
    this.minProfitPercent = config.minProfitPercent || 0.5;
    
    this.dailyProfit = 0;
    this.dailyLoss = 0;
    this.tradeHistory = [];
  }

  assessRisk(opportunity) {
    const risks = [];
    
    // Check trade size
    if (opportunity.amount > this.maxTradeSize) {
      risks.push({
        level: 'high',
        type: 'trade_size',
        message: `Trade size exceeds maximum: ${opportunity.amount} > ${this.maxTradeSize}`,
      });
    }
    
    // Check daily loss limit
    if (this.dailyLoss >= this.maxDailyLoss) {
      risks.push({
        level: 'critical',
        type: 'daily_loss',
        message: `Daily loss limit reached: ${this.dailyLoss}`,
      });
    }
    
    // Check profit percentage
    if (opportunity.profitPercent < this.minProfitPercent) {
      risks.push({
        level: 'medium',
        type: 'low_profit',
        message: `Profit percentage too low: ${opportunity.profitPercent}%`,
      });
    }
    
    // Check slippage
    const estimatedSlippage = this.estimateSlippage(opportunity);
    if (estimatedSlippage > this.maxSlippage) {
      risks.push({
        level: 'high',
        type: 'high_slippage',
        message: `Estimated slippage too high: ${estimatedSlippage * 100}%`,
      });
    }
    
    return {
      approved: risks.filter(r => r.level === 'critical').length === 0,
      risks,
    };
  }

  estimateSlippage(opportunity) {
    // Mock slippage estimation
    return Math.random() * 0.03; // 0-3%
  }

  recordTrade(trade, result) {
    const record = {
      timestamp: new Date(),
      trade,
      result,
    };
    
    this.tradeHistory.push(record);
    
    if (result.success && result.profit > 0) {
      this.dailyProfit += result.profit;
    } else if (result.loss) {
      this.dailyLoss += result.loss;
    }
    
    logger.info(`Trade recorded - Daily P/L: +${this.dailyProfit.toFixed(2)} / -${this.dailyLoss.toFixed(2)}`);
  }

  resetDailyStats() {
    this.dailyProfit = 0;
    this.dailyLoss = 0;
    logger.info('Daily stats reset');
  }

  getStats() {
    return {
      dailyProfit: this.dailyProfit,
      dailyLoss: this.dailyLoss,
      netProfit: this.dailyProfit - this.dailyLoss,
      totalTrades: this.tradeHistory.length,
    };
  }
}

module.exports = RiskManager;
