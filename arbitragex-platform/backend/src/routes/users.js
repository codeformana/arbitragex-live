const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Get user profile
router.get('/:address', userController.getUserProfile);

// Get user portfolio
router.get('/:address/portfolio', userController.getUserPortfolio);

// Get user trades
router.get('/:address/trades', userController.getUserTrades);

// Update user settings
router.put('/:address/settings', authenticate, userController.updateSettings);

module.exports = router;
