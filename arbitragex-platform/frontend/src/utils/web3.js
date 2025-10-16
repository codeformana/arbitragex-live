import { ethers } from 'ethers';

// Get provider for specific network
export const getProvider = (networkName) => {
  const rpcUrls = {
    ethereum: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`,
    polygon: 'https://polygon-rpc.com',
    bsc: 'https://bsc-dataseed.binance.org',
    avalanche: 'https://api.avax.network/ext/bc/C/rpc',
  };

  const url = rpcUrls[networkName.toLowerCase()];
  return new ethers.JsonRpcProvider(url);
};

// Get contract instance
export const getContract = (address, abi, signerOrProvider) => {
  return new ethers.Contract(address, abi, signerOrProvider);
};

// Parse transaction error
export const parseTransactionError = (error) => {
  if (error.code === 'ACTION_REJECTED') {
    return 'Transaction rejected by user';
  }
  if (error.code === 'INSUFFICIENT_FUNDS') {
    return 'Insufficient funds for transaction';
  }
  if (error.message.includes('gas')) {
    return 'Gas estimation failed';
  }
  return error.message || 'Transaction failed';
};

// Estimate gas with buffer
export const estimateGasWithBuffer = async (contract, method, args, buffer = 1.2) => {
  const gasEstimate = await contract[method].estimateGas(...args);
  return Math.floor(Number(gasEstimate) * buffer);
};

// Wait for transaction with timeout
export const waitForTransaction = async (provider, txHash, timeout = 60000) => {
  return Promise.race([
    provider.waitForTransaction(txHash),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Transaction timeout')), timeout)
    ),
  ]);
};

// Convert to Wei
export const toWei = (amount, decimals = 18) => {
  return ethers.parseUnits(amount.toString(), decimals);
};

// Convert from Wei
export const fromWei = (amount, decimals = 18) => {
  return ethers.formatUnits(amount, decimals);
};

// Get balance
export const getBalance = async (provider, address) => {
  const balance = await provider.getBalance(address);
  return fromWei(balance);
};

// Get token balance
export const getTokenBalance = async (tokenContract, address) => {
  const balance = await tokenContract.balanceOf(address);
  const decimals = await tokenContract.decimals();
  return fromWei(balance, decimals);
};
