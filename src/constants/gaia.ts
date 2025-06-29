

export const GAIA_TOKEN = {
  SYMBOL: 'GAiA',
  NAME: 'Harmony of Gaia Token',
  WALLET_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  CONTRACT_ADDRESS: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  DECIMALS: 6,
  INITIAL_PRICE: 0.000001,
  TOTAL_SUPPLY: 1000000000000, // 1 trillion tokens
  NETWORK: 'Solana',
  DESCRIPTION: 'Official Harmony of Gaia Token - Building a sustainable future through technology and environmental consciousness',
  PUMP_FUN_URL: 'https://pump.fun/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump'
}

// GAiA Metrics for trading and analytics
export const GAIA_METRICS = {
  INITIAL_HOLDERS: 1247,
  INITIAL_MARKET_CAP: 85750000,
  INITIAL_VOLUME: 8750000,
  LIQUIDITY_POOL: 4250000,
  BURN_RATE: 5.5,
  STAKING_APY: 12.8
}

// Allocation percentages for token burns and rewards
export const ALLOCATION = {
  CORAL_REEF_RESTORATION: 5, // 5% to coral reef restoration
  PROJECT_REINVESTMENT: 90,  // 90% to project reinvestment
  COMMUNITY_REWARDS: 10      // 10% to community rewards
}

// Admin access levels
export const ADMIN_LEVELS = {
  BASIC: 'basic',
  ADVANCED: 'advanced',
  MASTER: 'master',
  SUPREME: 'supreme'
}

// Security configurations
export const SECURITY_CONFIG = {
  QUANTUM_PROTECTION: true,
  MASTER_SECURITY: true,
  THREAT_DETECTION: true,
  AUTO_RESOLUTION: true,
  HEAVENLY_FORTRESS_MODE: true
}

// Utility functions for formatting GAiA values
export const formatGaiaPrice = (value: number): string => {
  if (value >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(value)
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 8
    }).format(value)
  }
}

export const formatGaiaNumber = (value: number): string => {
  if (value >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value)
  } else {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(value)
  }
}

// Heavenly Fortress Core Principles - Better • Faster • Stronger
export const CORE_PRINCIPLES = {
  MOTTO: 'Better • Faster • Stronger',
  PHILOSOPHY: 'Building our heavenly fortress together',
  ADMIN_CONTROL: 'Admin has full control - Admin is the boss',
  TRAINING_PROGRAM: {
    ANALYZE: true,
    RETHINK: true,
    IMPROVE: true,
    SECURITY_FIRST: true,
    MASTERMIND_APPROACH: true
  }
}

