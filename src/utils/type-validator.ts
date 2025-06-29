
// TypeScript validation utility for GAiA system
import { MetricsData, GaiaTokenConfig, TokenData } from '@/types/gaia-types'

export class TypeValidator {
  static validateMetrics(metrics: Partial<MetricsData>): string[] {
    const errors: string[] = []
    const requiredFields: (keyof MetricsData)[] = [
      'INITIAL_PRICE',
      'INITIAL_HOLDERS', 
      'INITIAL_MARKET_CAP',
      'INITIAL_VOLUME',
      'INITIAL_TRANSACTIONS',
      'NETWORK_SPEED',
      'SECURITY_SCORE',
      'ECOSYSTEM_HEALTH',
      'DRAGON_POWER'
    ]

    requiredFields.forEach(field => {
      if (!(field in metrics)) {
        errors.push(`Missing required field: ${field}`)
      } else if (typeof metrics[field] !== 'number') {
        errors.push(`Field ${field} must be a number, got ${typeof metrics[field]}`)
      }
    })

    return errors
  }

  static validateTokenConfig(config: Partial<GaiaTokenConfig>): string[] {
    const errors: string[] = []
    const requiredStringFields: (keyof Pick<GaiaTokenConfig, 'NAME' | 'SYMBOL' | 'CONTRACT_ADDRESS' | 'WALLET_ADDRESS' | 'PUMP_FUN_URL' | 'NETWORK'>)[] = [
      'NAME',
      'SYMBOL', 
      'CONTRACT_ADDRESS',
      'WALLET_ADDRESS',
      'PUMP_FUN_URL',
      'NETWORK'
    ]

    requiredStringFields.forEach(field => {
      if (!(field in config)) {
        errors.push(`Missing required field: ${field}`)
      } else if (typeof config[field] !== 'string') {
        errors.push(`Field ${field} must be a string, got ${typeof config[field]}`)
      }
    })

    if (!('INITIAL_PRICE' in config)) {
      errors.push('Missing required field: INITIAL_PRICE')
    } else if (typeof config.INITIAL_PRICE !== 'number') {
      errors.push(`Field INITIAL_PRICE must be a number, got ${typeof config.INITIAL_PRICE}`)
    }

    return errors
  }

  static logValidationErrors(component: string, errors: string[]): void {
    if (errors.length > 0) {
      console.error(`🚨 TypeScript validation errors in ${component}:`)
      errors.forEach(error => console.error(`  - ${error}`))
    } else {
      console.log(`✅ ${component}: All type validations passed`)
    }
  }
}
