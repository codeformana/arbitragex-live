// API Response Codes
exports.STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// Blockchain Networks
exports.NETWORKS = {
  ETHEREUM: 'ethereum',
  POLYGON: 'polygon',
  BSC: 'bsc',
  AVALANCHE: 'avalanche',
};

// DEX Names
exports.DEXES = {
  UNISWAP: 'uniswap',
  SUSHISWAP: 'sushiswap',
  PANCAKESWAP: 'pancakeswap',
  TRADERJOE: 'traderjoe',
  QUICKSWAP: 'quickswap',
};

// Trade Status
exports.TRADE_STATUS = {
  PENDING: 'pending',
  EXECUTING: 'executing',
  SUCCESS: 'success',
  FAILED: 'failed',
};

// Pool Status
exports.POOL_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CLOSED: 'closed',
};

// Transaction Types
exports.TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  TRADE: 'trade',
  FEE: 'fee',
};

// Fee Structure
exports.FEES = {
  PERFORMANCE_FEE: 0.2, // 20%
  MANAGEMENT_FEE: 0.02, // 2%
  PLATFORM_FEE: 0.01, // 1%
};

// Rate Limits
exports.RATE_LIMITS = {
  API_CALLS_PER_MINUTE: 60,
  TRADES_PER_HOUR: 100,
};
