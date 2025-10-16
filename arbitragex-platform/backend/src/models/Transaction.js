const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'trade', 'fee'],
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  pool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pool',
  },
  amount: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  network: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending',
  },
  blockNumber: {
    type: Number,
  },
  gasUsed: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

transactionSchema.index({ user: 1, timestamp: -1 });
transactionSchema.index({ hash: 1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
