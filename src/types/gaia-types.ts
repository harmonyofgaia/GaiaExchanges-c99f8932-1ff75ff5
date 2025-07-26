
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
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as any).price === 'number' &&
    typeof (data as any).volume24h === 'number' &&
    typeof (data as any).marketCap === 'number' &&
    typeof (data as any).priceChange24h === 'number' &&
    typeof (data as any).holders === 'number' &&
    typeof (data as any).transactions24h === 'number' &&
    (data as any).lastUpdated instanceof Date &&
    typeof (data as any).isLive === 'boolean' &&
    typeof (data as any).burnRate === 'number' &&
    typeof (data as any).totalBurned === 'number' &&
    typeof (data as any).circulatingSupply === 'number'
  )
}

export const isValidMetricsData = (data: unknown): data is MetricsData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as any).INITIAL_PRICE === 'number' &&
    typeof (data as any).INITIAL_HOLDERS === 'number' &&
    typeof (data as any).INITIAL_MARKET_CAP === 'number' &&
    typeof (data as any).INITIAL_VOLUME === 'number' &&
    typeof (data as any).INITIAL_TRANSACTIONS === 'number' &&
    typeof (data as any).NETWORK_SPEED === 'number' &&
    typeof (data as any).SECURITY_SCORE === 'number' &&
    typeof (data as any).ECOSYSTEM_HEALTH === 'number' &&
    typeof (data as any).DRAGON_POWER === 'number'
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
