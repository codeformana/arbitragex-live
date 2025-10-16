const { ethers } = require('ethers');

class Web3Service {
  constructor() {
    this.providers = {};
    this.initializeProviders();
  }

  initializeProviders() {
    const networks = {
      ethereum: process.env.ETHEREUM_RPC || 'https://mainnet.infura.io/v3/',
      polygon: process.env.POLYGON_RPC || 'https://polygon-rpc.com',
      bsc: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org',
      avalanche: process.env.AVALANCHE_RPC || 'https://api.avax.network/ext/bc/C/rpc',
    };

    for (const [network, url] of Object.entries(networks)) {
      try {
        this.providers[network] = new ethers.JsonRpcProvider(url);
      } catch (error) {
        console.error(`Failed to initialize ${network} provider:`, error);
      }
    }
  }

  getProvider(network = 'ethereum') {
    return this.providers[network];
  }

  async getBlockNumber(network = 'ethereum') {
    const provider = this.getProvider(network);
    return await provider.getBlockNumber();
  }

  async getGasPrice(network = 'ethereum') {
    const provider = this.getProvider(network);
    const feeData = await provider.getFeeData();
    return feeData.gasPrice;
  }

  async getBalance(address, network = 'ethereum') {
    const provider = this.getProvider(network);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async getTokenBalance(tokenAddress, walletAddress, network = 'ethereum') {
    const provider = this.getProvider(network);
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(tokenAddress, abi, provider);
    const balance = await contract.balanceOf(walletAddress);
    return balance.toString();
  }

  async estimateGas(transaction, network = 'ethereum') {
    const provider = this.getProvider(network);
    return await provider.estimateGas(transaction);
  }

  async sendTransaction(signedTx, network = 'ethereum') {
    const provider = this.getProvider(network);
    return await provider.sendTransaction(signedTx);
  }
}

module.exports = new Web3Service();
