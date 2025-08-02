// Example: Connect to Ethereum using ethers.js
import { ethers } from 'ethers';

export function getProvider() {
  return new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_URL);
}

export async function getBlockNumber() {
  const provider = getProvider();
  return provider.getBlockNumber();
}

// Example usage: await getBlockNumber();
