

export const GAIA_TOKEN = {
  // Official GAiA Token Addresses - CORRECTED
  WALLET_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  CONTRACT_ADDRESS: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  SYMBOL: 'GAiA',
  NAME: 'GAiA Token - Harmony of Culture',
  DECIMALS: 9,
  NETWORK: 'Solana',
  PUMP_FUN_URL: 'https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  OFFICIAL_WEBSITE: 'https://www.gaiaexchanges.net',
  
  // Token Metrics - UPDATED
  TOTAL_SUPPLY: 1000000000000, // 1 Trillion tokens
  BURNED_TOKENS: 0,
  CIRCULATING_SUPPLY: 1000000000000,
  INITIAL_PRICE: 0.000125, // Corrected price
  
  // Tokenomics
  BURN_RATE: 0, // 0% burn rate
  REFLECTION_RATE: 0, // 0% reflection
  LIQUIDITY_POOL: 100, // 100% liquidity locked
  
  // Environmental Impact
  CARBON_OFFSET_PER_TRANSACTION: 0.001, // kg CO2
  TREES_PLANTED_TOTAL: 50000,
  OCEAN_CLEANUP_CONTRIBUTION: 25000, // USD
  
  // Brand messaging - CORRECTED
  BRAND_STATEMENT: 'We Are a Strong Creative Open Minded Circuit To Happiness - Seeds Will form in to Music',
  OFFICIAL_DISCLAIMER: 'This is the ONLY official GAiA Token. Contract: t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
}

export const GAIA_METRICS = {
  CURRENT_PRICE: 0.000125, // USD - CORRECTED
  MARKET_CAP: 125000, // USD - CORRECTED
  VOLUME_24H: 8750000, // USD
  HOLDERS: 12450, // CORRECTED
  TRANSACTIONS_24H: 45780,
  
  // System metrics
  NETWORK_SPEED: 2500,
  SECURITY_SCORE: 95,
  ECOSYSTEM_HEALTH: 98,
  DRAGON_POWER: 99,
  
  // Environmental Metrics
  CO2_OFFSET_TOTAL: 500, // tons
  RENEWABLE_ENERGY_PROJECTS: 25,
  BIODIVERSITY_PROJECTS: 15,
  WATER_CONSERVATION_PROJECTS: 30,
  
  // Missing Initial Values - Added for compatibility
  INITIAL_TRANSACTIONS: 45780,
  INITIAL_HOLDERS: 12450,
  INITIAL_MARKET_CAP: 125000,
  INITIAL_VOLUME: 8750000,
}

// Utility functions
export const formatGaiaPrice = (price: number): string => {
  return `$${price.toFixed(6)}`
}

export const formatGaiaNumber = (num: number): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
  return num.toString()
}

