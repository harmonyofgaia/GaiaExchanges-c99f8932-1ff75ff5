
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

export const formatGaiaPrice = (price: number): string => {
  return `$${price.toFixed(8)}`
}

export const formatGaiaNumber = (number: number): string => {
  return number.toLocaleString()
}

export const GAIA_TOKEN = {
  NAME: 'Harmony of Gaia',
  SYMBOL: 'GAiA',
  CONTRACT_ADDRESS: 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  WALLET_ADDRESS: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  PUMP_FUN_URL: 'https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
  INITIAL_PRICE: 0.000125,
  NETWORK: 'Solana',
  EXCHANGE_LISTINGS: {
    PUMPFUN: {
      url: 'https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
      status: 'Live',
      verified: true
    },
    UNISWAP: {
      url: 'https://app.uniswap.org/swap?outputCurrency=t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump',
      status: 'Listed',
      verified: true
    },
    COINBASE: {
      url: 'https://www.coinbase.com/price/harmony-of-gaia',
      status: 'Application Submitted',
      verified: false
    },
    REVOLUT: {
      url: 'https://www.revolut.com/crypto/harmony-of-gaia',
      status: 'Under Review',
      verified: false
    },
    ZENGO: {
      url: 'https://zengo.com/token/harmony-of-gaia',
      status: 'Pending Approval',
      verified: false
    }
  }
}

export const GAIA_METRICS: MetricsData = {
  INITIAL_PRICE: 0.000125,
  INITIAL_HOLDERS: 12345,
  INITIAL_MARKET_CAP: 12345678,
  INITIAL_VOLUME: 3456789,
  INITIAL_TRANSACTIONS: 8947,
  NETWORK_SPEED: 2500,
  SECURITY_SCORE: 99.8,
  ECOSYSTEM_HEALTH: 97.5,
  DRAGON_POWER: 95.2
}
