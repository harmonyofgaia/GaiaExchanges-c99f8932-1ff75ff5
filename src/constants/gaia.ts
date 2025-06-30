
// OFFICIAL GAiA TOKEN CONSTANTS
// IMPORTANT: We are GAiA Token by Harmony of Gaia - NOT GAIA Everworld!

export const GAIA_TOKEN = {
  // Official GAiA Token Information
  NAME: 'GAiA Token',
  SYMBOL: 'GAiA',
  FULL_NAME: 'GAiA Token - Harmony of Gaia',
  
  // Official Addresses - VERIFIED AND CORRECT
  WALLET_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  CONTRACT_ADDRESS: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  
  // Network Information
  NETWORK: 'Solana',
  PLATFORM: 'Pump.fun',
  
  // Project Information
  PROJECT_NAME: 'Harmony of Gaia',
  POWERED_BY: 'Culture of Harmony',
  OFFICIAL_WEBSITE: 'https://www.gaiaexchanges.net',
  
  // IMPORTANT DISCLAIMER
  DISCLAIMER: 'GAiA Token is NOT associated with GAIA Everworld. We are a completely separate and independent project.',
  
  // Brand Identity
  BRAND_COLORS: {
    PRIMARY: '#10b981', // Green
    SECONDARY: '#3b82f6', // Blue  
    ACCENT: '#8b5cf6', // Purple
    WARNING: '#f59e0b', // Orange
  },
  
  // Token Economics
  DECIMALS: 9,
  TOTAL_SUPPLY: 1000000000, // 1 Billion
  INITIAL_PRICE: 0.00012345,
  
  // Features
  FEATURES: [
    'Environmental Impact',
    'Community Driven',
    'Transparent Operations',
    'Global Conservation',
    'Wildlife Protection',
    'Ocean Cleanup',
    'Reforestation Projects'
  ]
} as const

// GAIA METRICS - Initial values for the system
export const GAIA_METRICS = {
  INITIAL_PRICE: 0.00012345,
  INITIAL_HOLDERS: 1247,
  INITIAL_MARKET_CAP: 123450,
  INITIAL_VOLUME: 847000,
  INITIAL_TRANSACTIONS: 2847,
  NETWORK_SPEED: 99.7,
  SECURITY_SCORE: 100,
  ECOSYSTEM_HEALTH: 98.9,
  DRAGON_POWER: 99.9
} as const

// Helper functions for formatting
export const formatGaiaPrice = (price: number): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    console.warn('⚠️ Invalid price value provided to formatGaiaPrice:', price)
    return '$0.00000000'
  }
  return `$${price.toFixed(8)}`
}

export const formatGaiaNumber = (number: number): string => {
  if (typeof number !== 'number' || isNaN(number)) {
    console.warn('⚠️ Invalid number value provided to formatGaiaNumber:', number)
    return '0'
  }
  return number.toLocaleString()
}

// BRAND VERIFICATION - ENSURE NO CONFUSION
export const BRAND_CLARIFICATION = {
  WE_ARE: 'GAiA Token - Harmony of Gaia Projects - Culture of Harmony',
  WE_ARE_NOT: 'GAIA Everworld (coinmarketcap.com/currencies/gaia-everworld/)',
  OUR_WALLET: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  OUR_CONTRACT: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  VERIFICATION_DATE: '2024-12-30',
  OFFICIAL_STATEMENT: 'GAiA Token operates independently and has no affiliation with any other GAIA-named projects.'
} as const
