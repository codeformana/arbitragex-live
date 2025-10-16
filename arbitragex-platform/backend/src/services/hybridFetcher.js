// HYBRID: Real TX Hashes + Simulated Arbitrage Data
// This fetches REAL transaction hashes from blockchain, then simulates arbitrage profits
const axios = require('axios');

// Your API keys
const API_KEYS = {
  etherscan: ['15T1YAIJSKANV1NI2FWFVHDTIY4F7I2KRP', 'NKV4VRJUAVXCRGFA7P9ASGZSHXGZN9PC62', 'GSBB9NWNMQH6UKHNFQFXR2SER9S4N3B1NJ'],
  bscscan: ['DDPQWV49CT4NYMD312DNZ3JRJ7HQ6W66WH', 'Y7MSSPZSR9EI1Z8GUK6K45XZM9J4DNF6HR'],
  polygonscan: ['3UNE1M2YA8GIKHRAKBK3W5QVYIDM349F8U', '9D8IB1D4UVVN29RWC6WMXHQ82YNYKRJEMT']
};

let keyIndex = { eth: 0, bsc: 0, poly: 0 };

// Rotate API keys to avoid rate limits
function getNextKey(chain) {
  const keys = API_KEYS[chain];
  const key = keys[keyIndex[chain]];
  keyIndex[chain] = (keyIndex[chain] + 1) % keys.length;
  return key;
}

// Fetch real transactions and convert to arbitrage format
async function fetchHybridTrades() {
  const allTrades = [];
  const tokens = ['ETH', 'USDC', 'USDT', 'DAI', 'WBTC', 'BNB', 'MATIC'];
  
  try {
    // Ethereum - Uniswap V3
    console.log('📡 Fetching Ethereum transactions...');
    const ethTxs = await fetchChainTransactions(
      'https://api.etherscan.io/api',
      '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      getNextKey('etherscan')
    );
    
    ethTxs.forEach((tx, i) => {
      const token1 = tokens[i % tokens.length];
      const token2 = tokens[(i + 1) % tokens.length];
      const profit = (Math.random() * (i % 2 === 0 ? 3.5 : -0.7) + (i % 2 === 0 ? 0.5 : 0)).toFixed(2);
      
      allTrades.push({
        id: `eth-real-${tx.hash.substr(0, 10)}`,
        description: `${token1}/${token2}: Uniswap V3 arbitrage`,
        profit: `${parseFloat(profit) >= 0 ? '+' : ''}${profit}%`,
        profitValue: parseFloat(profit),
        isProfit: parseFloat(profit) >= 0,
        chain: 'Ethereum',
        dex: 'Uniswap V3',
        txHash: tx.hash, // ✅ REAL TX HASH
        timestamp: parseInt(tx.timeStamp) * 1000,
        blockNumber: tx.blockNumber,
        explorerUrl: `https://etherscan.io/tx/${tx.hash}`,
        isRealBlockchain: true
      });
    });
    console.log(`✅ Ethereum: ${ethTxs.length} real TX hashes`);
    
  } catch (error) {
    console.error('❌ Ethereum fetch error:', error.message);
  }

  try {
    // BSC - PancakeSwap
    console.log('📡 Fetching BSC transactions...');
    const bscTxs = await fetchChainTransactions(
      'https://api.bscscan.com/api',
      '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      getNextKey('bscscan')
    );
    
    bscTxs.forEach((tx, i) => {
      const token1 = tokens[i % tokens.length];
      const token2 = tokens[(i + 2) % tokens.length];
      const profit = (Math.random() * (i % 3 === 0 ? 2.8 : -0.5) + (i % 3 === 0 ? 0.4 : 0)).toFixed(2);
      
      allTrades.push({
        id: `bsc-real-${tx.hash.substr(0, 10)}`,
        description: `${token1}/${token2}: PancakeSwap arbitrage`,
        profit: `${parseFloat(profit) >= 0 ? '+' : ''}${profit}%`,
        profitValue: parseFloat(profit),
        isProfit: parseFloat(profit) >= 0,
        chain: 'BSC',
        dex: 'PancakeSwap',
        txHash: tx.hash, // ✅ REAL TX HASH
        timestamp: parseInt(tx.timeStamp) * 1000,
        blockNumber: tx.blockNumber,
        explorerUrl: `https://bscscan.com/tx/${tx.hash}`,
        isRealBlockchain: true
      });
    });
    console.log(`✅ BSC: ${bscTxs.length} real TX hashes`);
    
  } catch (error) {
    console.error('❌ BSC fetch error:', error.message);
  }

  try {
    // Polygon - QuickSwap
    console.log('📡 Fetching Polygon transactions...');
    const polyTxs = await fetchChainTransactions(
      'https://api.polygonscan.com/api',
      '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
      getNextKey('polygonscan')
    );
    
    polyTxs.forEach((tx, i) => {
      const token1 = tokens[i % tokens.length];
      const token2 = tokens[(i + 3) % tokens.length];
      const profit = (Math.random() * (i % 2 === 0 ? 2.2 : -0.6) + (i % 2 === 0 ? 0.3 : 0)).toFixed(2);
      
      allTrades.push({
        id: `poly-real-${tx.hash.substr(0, 10)}`,
        description: `${token1}/${token2}: QuickSwap arbitrage`,
        profit: `${parseFloat(profit) >= 0 ? '+' : ''}${profit}%`,
        profitValue: parseFloat(profit),
        isProfit: parseFloat(profit) >= 0,
        chain: 'Polygon',
        dex: 'QuickSwap',
        txHash: tx.hash, // ✅ REAL TX HASH
        timestamp: parseInt(tx.timeStamp) * 1000,
        blockNumber: tx.blockNumber,
        explorerUrl: `https://polygonscan.com/tx/${tx.hash}`,
        isRealBlockchain: true
      });
    });
    console.log(`✅ Polygon: ${polyTxs.length} real TX hashes`);
    
  } catch (error) {
    console.error('❌ Polygon fetch error:', error.message);
  }

  console.log(`\n🎉 TOTAL: ${allTrades.length} trades with REAL verifiable TX hashes!\n`);
  return allTrades;
}

// Helper function to fetch transactions from a chain
async function fetchChainTransactions(apiUrl, contractAddress, apiKey) {
  try {
    // Use API v2 format for Etherscan
    const isEtherscan = apiUrl.includes('etherscan.io');
    const url = isEtherscan 
      ? `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${contractAddress}&page=1&offset=15&sort=desc&apikey=${apiKey}`
      : apiUrl;
    
    const params = isEtherscan ? {} : {
      module: 'account',
      action: 'txlist',
      address: contractAddress,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 15,
      sort: 'desc',
      apikey: apiKey
    };

    const response = await axios.get(url, { params, timeout: 8000 });

    if (response.data && response.data.status === '1' && Array.isArray(response.data.result)) {
      // Filter successful transactions only
      return response.data.result.filter(tx => tx.isError === '0' && tx.txreceipt_status === '1').slice(0, 10);
    }
    
    console.log(`API response: status=${response.data?.status}, message=${response.data?.message}`);
    return [];
  } catch (error) {
    console.error(`API error: ${error.message}`);
    return [];
  }
}

module.exports = { fetchHybridTrades };
