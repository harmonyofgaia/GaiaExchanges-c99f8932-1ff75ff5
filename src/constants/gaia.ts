
export const GAIA_TOKEN = {
  CONTRACT_ADDRESS: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  WALLET_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  SYMBOL: 'GAiA',
  NAME: 'Harmony of Gaia',
  DECIMALS: 9,
  NETWORK: 'Solana',
  DESCRIPTION: 'The revolutionary token powering the Harmony of Gaia ecosystem with real environmental impact',
  INITIAL_PRICE: 0.000125,
  PUMP_FUN_URL: `https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump`
}

export const GAIA_METRICS = {
  TOTAL_SUPPLY: 100000000,
  CIRCULATING_SUPPLY: 85750000,
  BURN_RATE: 3.5,
  REINVEST_RATE: 4.2,
  SECURITY_LEVEL: 98.7,
  DRAGON_POWER: 150,
  ENVIRONMENTAL_IMPACT: 97.8,
  INITIAL_VOLUME: 8750000,
  INITIAL_HOLDERS: 12450,
  INITIAL_TRANSACTIONS: 45780,
  INITIAL_MARKET_CAP: 278687500,
  SECURITY_SCORE: 98.7,
  ECOSYSTEM_HEALTH: 96.8,
  NETWORK_SPEED: 2500
}

export const formatGaiaPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 6,
    maximumFractionDigits: 6
  }).format(price)
}

export const formatGaiaNumber = (number: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number)
}
