const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

// Get all trades
router.get('/', tradeController.getAllTrades);

// Get trade by ID
router.get('/:id', tradeController.getTradeById);

// Get leaderboard
router.get('/leaderboard/top', tradeController.getLeaderboard);

// Get recent trades
router.get('/recent/list', tradeController.getRecentTrades);

module.exports = router;
