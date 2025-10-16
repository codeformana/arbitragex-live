const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  txHash: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
  },
  tokenPair: {
    type: String,
    required: true,
  },
  dexA: {
    type: String,
    required: true,
  },
  dexB: {
    type: String,
    required: true,
  },
  network: {
    type: String,
    required: true,
  },
  inputAmount: {
    type: Number,
    required: true,
  },
  outputAmount: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
  profitPercent: {
    type: Number,
    required: true,
  },
  gasUsed: {
    type: Number,
  },
  gasCost: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['pending', 'executing', 'success', 'failed'],
    default: 'pending',
  },
  errorMessage: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

tradeSchema.index({ user: 1, timestamp: -1 });
tradeSchema.index({ status: 1 });
tradeSchema.index({ network: 1 });

module.exports = mongoose.model('Trade', tradeSchema);
