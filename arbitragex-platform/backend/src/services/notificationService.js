class NotificationService {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(userId, callback) {
    this.subscribers.set(userId, callback);
  }

  unsubscribe(userId) {
    this.subscribers.delete(userId);
  }

  async notify(userId, message, type = 'info') {
    const callback = this.subscribers.get(userId);
    
    if (callback) {
      callback({ message, type, timestamp: new Date() });
    }

    // Could also send email, SMS, push notification, etc.
    console.log(`Notification for ${userId}: ${message}`);
  }

  async notifyAll(message, type = 'info') {
    for (const [userId, callback] of this.subscribers.entries()) {
      callback({ message, type, timestamp: new Date() });
    }
  }

  async sendTradeAlert(userId, trade) {
    const message = `New trade executed: ${trade.pair} - Profit: $${trade.profit.toFixed(2)}`;
    await this.notify(userId, message, 'success');
  }

  async sendOpportunityAlert(userId, opportunity) {
    const message = `Arbitrage opportunity detected: ${opportunity.tokenPair} - Est. Profit: $${opportunity.estimatedProfit.toFixed(2)}`;
    await this.notify(userId, message, 'info');
  }

  async sendErrorAlert(userId, error) {
    const message = `Error: ${error.message}`;
    await this.notify(userId, message, 'error');
  }
}

module.exports = new NotificationService();
