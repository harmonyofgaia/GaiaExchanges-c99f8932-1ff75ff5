
export const GAIA_TOKEN = {
  CONTRACT_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  WALLET_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  SYMBOL: 'GAiA',
  NAME: 'Harmony of Gaia',
  DECIMALS: 9,
  INITIAL_PRICE: 0.000125,
  PUMP_FUN_URL: 'https://pump.fun/5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  NETWORK: 'Solana',
  BRAND_STATEMENT: 'Harmony of Culture - Environmental Impact Through Gaming',
  OFFICIAL_DISCLAIMER: 'Official GAiA Token - Beware of imposters and fake tokens',
  GOOGLE_PLATFORM_ANNOUNCEMENT: 'Available on major exchanges and gaming platforms',
  EXCHANGE_PLATFORM_NOTICE: 'Trade only through verified exchanges',
  SOCIAL_MEDIA_CORRECTION: 'Follow official channels only for authentic updates'
}

export const GAIA_METRICS = {
  totalSupply: 1000000000,
  circulatingSupply: 847329156,
  marketCap: 2470000,
  volume24h: 156789,
  holders: 15247,
  burnedTokens: 152670844,
  // Additional properties that components are expecting
  INITIAL_TRANSACTIONS: 245876,
  INITIAL_HOLDERS: 15247,
  INITIAL_MARKET_CAP: 2470000,
  INITIAL_VOLUME: 156789,
  INITIAL_PRICE: 0.000125,
  NETWORK_SPEED: 2500,
  SECURITY_SCORE: 99.8,
  ECOSYSTEM_HEALTH: 97.5,
  DRAGON_POWER: 100
}

export const formatGaiaPrice = (price: number): string => {
  if (price >= 1) {
    return `$${price.toFixed(2)}`
  }
  return `$${price.toFixed(8)}`
}

export const formatGaiaNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`
  }
  return num.toFixed(2)
}
