const User = require('../models/User');
const Pool = require('../models/Pool');
const Trade = require('../models/Trade');

const seedUsers = async () => {
  const users = [
    {
      address: '0x742d35cc6634c0532925a3b844bc9e7595f0beb1',
      role: 'admin',
      stats: {
        totalTrades: 500,
        totalProfit: 50000,
        winRate: 0.95,
      },
    },
    {
      address: '0x3cd751e6b0078be393132286c442345e5dc49699',
      role: 'user',
      stats: {
        totalTrades: 250,
        totalProfit: 25000,
        winRate: 0.92,
      },
    },
  ];

  try {
    await User.insertMany(users);
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedPools = async () => {
  const pools = [
    {
      name: 'ETH-USDC Arbitrage Pool',
      contractAddress: '0x' + '0'.repeat(40),
      network: 'ethereum',
      description: 'Automated arbitrage trading between major DEXs',
      totalValueLocked: 1000000,
      apy: 45.5,
      minInvestment: 100,
      maxInvestment: 100000,
      status: 'active',
    },
    {
      name: 'Multi-Chain Arbitrage Pool',
      contractAddress: '0x' + '1'.repeat(40),
      network: 'polygon',
      description: 'Cross-chain arbitrage opportunities',
      totalValueLocked: 2500000,
      apy: 38.2,
      minInvestment: 500,
      maxInvestment: 250000,
      status: 'active',
    },
  ];

  try {
    await Pool.insertMany(pools);
    console.log('Pools seeded successfully');
  } catch (error) {
    console.error('Error seeding pools:', error);
  }
};

const seedDatabase = async () => {
  console.log('Seeding database...');
  
  await seedUsers();
  await seedPools();
  
  console.log('Database seeded successfully');
};

// Run if called directly
if (require.main === module) {
  const { connectDatabase, disconnectDatabase } = require('../utils/database');
  
  connectDatabase()
    .then(() => seedDatabase())
    .then(() => disconnectDatabase())
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = seedDatabase;
