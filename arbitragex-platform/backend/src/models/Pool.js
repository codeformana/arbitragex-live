const mongoose = require('mongoose');

const poolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contractAddress: {
    type: String,
    required: true,
    unique: true,
  },
  network: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  totalValueLocked: {
    type: Number,
    default: 0,
  },
  apy: {
    type: Number,
    default: 0,
  },
  minInvestment: {
    type: Number,
    required: true,
  },
  maxInvestment: {
    type: Number,
  },
  performanceFee: {
    type: Number,
    default: 0.2, // 20%
  },
  managementFee: {
    type: Number,
    default: 0.02, // 2%
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'closed'],
    default: 'active',
  },
  participants: [{
    address: String,
    amount: Number,
    shares: Number,
    joinedAt: Date,
  }],
  stats: {
    totalTrades: {
      type: Number,
      default: 0,
    },
    successfulTrades: {
      type: Number,
      default: 0,
    },
    totalProfit: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

poolSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Pool', poolSchema);
