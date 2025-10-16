const express = require('express');
const router = express.Router();
const arbitrageController = require('../controllers/arbitrageController');
const { validate } = require('../middleware/validation');

// Get arbitrage opportunities
router.get('/opportunities', arbitrageController.getOpportunities);

// Get arbitrage statistics
router.get('/stats', arbitrageController.getStats);

// Get price feeds
router.get('/prices', arbitrageController.getPrices);

// Execute arbitrage (simulation)
router.post('/execute', validate('executeArbitrage'), arbitrageController.executeArbitrage);

// Get arbitrage history
router.get('/history', arbitrageController.getHistory);

module.exports = router;
