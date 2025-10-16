const express = require('express');
const router = express.Router();
const poolController = require('../controllers/poolController');

// Get all pools
router.get('/', poolController.getAllPools);

// Get pool by ID
router.get('/:id', poolController.getPoolById);

// Get pool statistics
router.get('/:id/stats', poolController.getPoolStats);

// Get pool participants
router.get('/:id/participants', poolController.getPoolParticipants);

module.exports = router;
