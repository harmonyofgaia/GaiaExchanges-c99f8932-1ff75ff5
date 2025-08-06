// GAIA Token Configuration
export const GAIA_TOKEN = {
  symbol: 'GAIA',
  name: 'Gaia Exchange Token',
  decimals: 18,
  totalSupply: 1000000000, // 1 billion tokens
  
  // Official GAiA Token Addresses
  WALLET_ADDRESS: 'ERS1S7HqgSEh6edNVQzq2eZWSCw3jprJELHvLZ4LAzeY',
  CONTRACT_ADDRESS: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  
  // Legacy support
  address: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  icon: '🌍'
}

// Token Distribution
export const TOKEN_DISTRIBUTION = {
  ecosystem: 0.40, // 40% - Ecosystem development
  team: 0.15,      // 15% - Team allocation
  advisors: 0.05,  // 5% - Advisors
  community: 0.20, // 20% - Community rewards
  liquidity: 0.15, // 15% - Liquidity pool
  treasury: 0.05   // 5% - Treasury reserve
}

// Staking Rewards
export const STAKING_CONFIG = {
  minStakeAmount: 100,
  maxStakeAmount: 1000000,
  rewardRate: 0.08, // 8% APY
  lockPeriods: {
    flexible: 0,    // No lock
    month3: 90,     // 3 months
    month6: 180,    // 6 months
    year1: 365      // 1 year
  }
}