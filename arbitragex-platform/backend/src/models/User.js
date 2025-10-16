const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  nonce: {
    type: String,
    default: () => Math.floor(Math.random() * 1000000).toString(),
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  settings: {
    notifications: {
      type: Boolean,
      default: true,
    },
    autoInvest: {
      type: Boolean,
      default: false,
    },
  },
  stats: {
    totalTrades: {
      type: Number,
      default: 0,
    },
    totalProfit: {
      type: Number,
      default: 0,
    },
    winRate: {
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

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
