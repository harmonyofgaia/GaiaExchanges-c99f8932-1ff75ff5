
export const GAIA_TOKEN = {
  // Official GAiA Token Addresses
  WALLET_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  CONTRACT_ADDRESS: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  FEE_COLLECTION_WALLET: 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7',
  COMMUNITY_VAULT_WALLET: '6DAj3dhtwBDv3HY3UYw1ykjHGRLTU7yMKQmCn8bNoTpW',
  SYMBOL: 'GAiA',
  NAME: 'GAiA Token - Harmony of Culture',
  DECIMALS: 9,
  NETWORK: 'Solana',
  PLATFORM: 'Pump.fun',
  PUMP_FUN_URL: 'https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  OFFICIAL_WEBSITE: 'https://www.gaiaexchanges.net',
  
  // Token Metrics
  TOTAL_SUPPLY: 1000000000000, // 1 Trillion tokens
  BURNED_TOKENS: 0,
  CIRCULATING_SUPPLY: 1000000000000,
  INITIAL_PRICE: 0.0001, 
  
  // Tokenomics
  BURN_RATE: 0, // 0% burn rate
  REFLECTION_RATE: 0, // 0% reflection
  LIQUIDITY_POOL: 100, // 100% liquidity locked
  
  // Environmental Impact
  CARBON_OFFSET_PER_TRANSACTION: 0.001, // kg CO2
  TREES_PLANTED_TOTAL: 50000,
  OCEAN_CLEANUP_CONTRIBUTION: 25000, // USD
  
  // Brand messaging
  BRAND_STATEMENT: 'We Are a Strong Creative Open Minded Circuit To Happiness - Seeds Will form in to Music',
  DISCLAIMER: 'This is the ONLY official GAiA Token. Verify contract address before trading.',
}

export const GAIA_METRICS = {
  CURRENT_PRICE: 0.0001, // USD
  MARKET_CAP: 100000, // USD
  VOLUME_24H: 50000, // USD
  HOLDERS: 10000,
  TRANSACTIONS_24H: 5000,
  
  // Added for compatibility
  INITIAL_PRICE: 0.0001,
  INITIAL_HOLDERS: 10000,
  INITIAL_MARKET_CAP: 100000,
  INITIAL_VOLUME: 50000,
  INITIAL_TRANSACTIONS: 5000,
  NETWORK_SPEED: 2500,
  SECURITY_SCORE: 95,
  ECOSYSTEM_HEALTH: 98,
  DRAGON_POWER: 99,
  
  // Environmental Metrics
  CO2_OFFSET_TOTAL: 500, // tons
  RENEWABLE_ENERGY_PROJECTS: 25,
  BIODIVERSITY_PROJECTS: 15,
  WATER_CONSERVATION_PROJECTS: 30,
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
