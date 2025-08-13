// GAIA Token Configuration
export const GAIA_TOKEN = {
  symbol: 'GAIA',
  name: 'Gaia Exchange Token',
  decimals: 18,
  totalSupply: 1000000000, // 1 billion tokens
  address: '0x0000000000000000000000000000000000000000', // Placeholder address
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