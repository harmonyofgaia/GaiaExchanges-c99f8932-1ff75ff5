
// Type validation utility for GAiA system
export class TypeValidator {
  static validateTokenConfig(config: Record<string, unknown>): string[] {
    const errors: string[] = []
    
    if (!config.CONTRACT_ADDRESS || typeof config.CONTRACT_ADDRESS !== 'string') {
      errors.push('CONTRACT_ADDRESS must be a valid string')
    }
    
    if (!config.WALLET_ADDRESS || typeof config.WALLET_ADDRESS !== 'string') {
      errors.push('WALLET_ADDRESS must be a valid string')
    }
    
    if (!config.SYMBOL || typeof config.SYMBOL !== 'string') {
      errors.push('SYMBOL must be a valid string')
    }
    
    if (!config.NAME || typeof config.NAME !== 'string') {
      errors.push('NAME must be a valid string')
    }
    
    if (typeof config.INITIAL_PRICE !== 'number' || config.INITIAL_PRICE <= 0) {
      errors.push('INITIAL_PRICE must be a positive number')
    }
    
    return errors
  }
  
  static validateMetrics(metrics: Record<string, unknown>): string[] {
    const errors: string[] = []
    
    const requiredNumbers = [
      'totalSupply', 'circulatingSupply', 'marketCap', 'volume24h', 
      'holders', 'burnedTokens', 'INITIAL_TRANSACTIONS', 'INITIAL_HOLDERS',
      'INITIAL_MARKET_CAP', 'INITIAL_VOLUME', 'NETWORK_SPEED', 
      'SECURITY_SCORE', 'ECOSYSTEM_HEALTH'
    ]
    
    for (const field of requiredNumbers) {
      if (typeof metrics[field] !== 'number') {
        errors.push(`${field} must be a number`)
      }
    }
    
    return errors
  }
  
  static logValidationErrors(context: string, errors: string[]): void {
    console.error(`❌ ${context} validation failed:`)
    errors.forEach(error => console.error(`  - ${error}`))
  }
}
