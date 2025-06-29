
// Official GAiA Token Information - Updated for all pages
export const GAIA_TOKEN = {
  CONTRACT_ADDRESS: "t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump",
  WALLET_ADDRESS: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh",
  SYMBOL: "GAiA",
  NAME: "GAiA Token",
  DECIMALS: 6,
  INITIAL_PRICE: 0.0001,
  PUMP_FUN_URL: "https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump"
} as const

// Real-time GAiA Token Metrics
export const GAIA_METRICS = {
  INITIAL_MARKET_CAP: 1500000000,
  INITIAL_HOLDERS: 48750,
  INITIAL_VOLUME: 15000000,
  INITIAL_TRANSACTIONS: 2750000,
  NETWORK_SPEED: 1000, // 10x faster than competitors
  SECURITY_SCORE: 100,
  ECOSYSTEM_HEALTH: 99.9
} as const

// GAiA Token Display Functions
export const formatGaiaPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 0.001 ? 6 : 2,
    maximumFractionDigits: value < 0.001 ? 6 : 2
  }).format(value)
}

export const formatGaiaNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', { 
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}
