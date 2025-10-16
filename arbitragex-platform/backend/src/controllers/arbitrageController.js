const arbitrageService = require('../services/arbitrageService');

exports.getOpportunities = async (req, res, next) => {
  try {
    const { network, minProfit } = req.query;
    const opportunities = await arbitrageService.findOpportunities(network, minProfit);
    res.json({ success: true, data: opportunities });
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await arbitrageService.getStatistics();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

exports.getPrices = async (req, res, next) => {
  try {
    const { pairs, network } = req.query;
    const prices = await arbitrageService.getPrices(pairs, network);
    res.json({ success: true, data: prices });
  } catch (error) {
    next(error);
  }
};

exports.executeArbitrage = async (req, res, next) => {
  try {
    const { dexA, dexB, tokenPair, amount } = req.body;
    const result = await arbitrageService.simulateArbitrage({
      dexA,
      dexB,
      tokenPair,
      amount,
    });
    
    // Emit to connected clients
    const io = req.app.get('io');
    io.to('trades').emit('new-trade', result);
    
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const history = await arbitrageService.getTradeHistory(limit, offset);
    res.json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};
