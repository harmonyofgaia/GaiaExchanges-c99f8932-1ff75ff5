
import { 
  TokenData, 
  MetricsData, 
  GaiaTokenConfig,
  formatGaiaPrice as safeFormatGaiaPrice,
  formatGaiaNumber as safeFormatGaiaNumber 
} from '@/types/gaia-types'
import { TypeValidator } from '@/utils/type-validator'

// Use the safe formatting functions from types
export const formatGaiaPrice = safeFormatGaiaPrice
export const formatGaiaNumber = safeFormatGaiaNumber

// Properly typed GAiA token configuration
export const GAIA_TOKEN: GaiaTokenConfig = {
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

// Properly typed metrics with validation
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

// Runtime validation with logging
const tokenConfigErrors = TypeValidator.validateTokenConfig(GAIA_TOKEN)
TypeValidator.logValidationErrors('GAIA_TOKEN', tokenConfigErrors)

const metricsErrors = TypeValidator.validateMetrics(GAIA_METRICS)
TypeValidator.logValidationErrors('GAIA_METRICS', metricsErrors)

// Export types for components to use
export type { TokenData, MetricsData, GaiaTokenConfig }
