
// Comprehensive TypeScript type definitions for GAiA system
export interface TokenData {
  price: number
  volume24h: number
  marketCap: number
  priceChange24h: number
  holders: number
  transactions24h: number
  lastUpdated: Date
  isLive: boolean
  error?: string
  burnRate: number
  totalBurned: number
  circulatingSupply: number
}

export interface MetricsData {
  INITIAL_PRICE: number
  INITIAL_HOLDERS: number
  INITIAL_MARKET_CAP: number
  INITIAL_VOLUME: number
  INITIAL_TRANSACTIONS: number
  NETWORK_SPEED: number
  SECURITY_SCORE: number
  ECOSYSTEM_HEALTH: number
  DRAGON_POWER: number
}

export interface ExchangeListing {
  url: string
  status: string
  verified: boolean
}

export interface ExchangeListings {
  PUMPFUN: ExchangeListing
  UNISWAP: ExchangeListing
  COINBASE: ExchangeListing
  REVOLUT: ExchangeListing
  ZENGO: ExchangeListing
}

export interface GaiaTokenConfig {
  NAME: string
  SYMBOL: string
  CONTRACT_ADDRESS: string
  WALLET_ADDRESS: string
  PUMP_FUN_URL: string
  INITIAL_PRICE: number
  NETWORK: string
  EXCHANGE_LISTINGS: ExchangeListings
}

// Type guards for runtime validation
export const isValidTokenData = (data: unknown): data is TokenData => {
  const candidate = data as Record<string, unknown>
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof candidate.price === 'number' &&
    typeof candidate.volume24h === 'number' &&
    typeof candidate.marketCap === 'number' &&
    typeof candidate.priceChange24h === 'number' &&
    typeof candidate.holders === 'number' &&
    typeof candidate.transactions24h === 'number' &&
    candidate.lastUpdated instanceof Date &&
    typeof candidate.isLive === 'boolean' &&
    typeof candidate.burnRate === 'number' &&
    typeof candidate.totalBurned === 'number' &&
    typeof candidate.circulatingSupply === 'number'
  )
}

export const isValidMetricsData = (data: unknown): data is MetricsData => {
  const candidate = data as Record<string, unknown>
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof candidate.INITIAL_PRICE === 'number' &&
    typeof candidate.INITIAL_HOLDERS === 'number' &&
    typeof candidate.INITIAL_MARKET_CAP === 'number' &&
    typeof candidate.INITIAL_VOLUME === 'number' &&
    typeof candidate.INITIAL_TRANSACTIONS === 'number' &&
    typeof candidate.NETWORK_SPEED === 'number' &&
    typeof candidate.SECURITY_SCORE === 'number' &&
    typeof candidate.ECOSYSTEM_HEALTH === 'number' &&
    typeof candidate.DRAGON_POWER === 'number'
  )
}

// Helper functions with proper typing
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
