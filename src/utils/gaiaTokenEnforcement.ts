/**
 * GAiA Token Enforcement Utility
 * Ensures only GAiA token (5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh) is used
 * throughout the system as per requirements
 */

import { GAIA_TOKEN } from '@/constants/gaia'

// Official GAiA token addresses
export const OFFICIAL_GAIA_ADDRESS = '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh'
export const LEGACY_GAIA_ADDRESS = 'legacy_gaia_address_for_migration_only'

// Allowed tokens - ONLY GAiA and legacy for migration
export const ALLOWED_TOKENS = {
  'GAiA': {
    address: OFFICIAL_GAIA_ADDRESS,
    symbol: 'GAiA',
    name: 'Harmony of Gaia',
    allowedOperations: ['trade', 'stake', 'transfer', 'burn', 'mint']
  },
  'GAIA': {
    address: LEGACY_GAIA_ADDRESS,
    symbol: 'GAIA',
    name: 'Legacy GAiA (Migration Only)',
    allowedOperations: ['migrate_to_gaia', 'transfer'] // Limited operations
  }
}

/**
 * Validates if a token is allowed in the system
 */
export function validateTokenAddress(address: string, operation?: string): boolean {
  const allowedAddresses = Object.values(ALLOWED_TOKENS).map(token => token.address)
  
  if (!allowedAddresses.includes(address)) {
    console.error(`🚫 BLOCKED: Unauthorized token address ${address}`)
    console.error(`✅ ALLOWED: Only ${OFFICIAL_GAIA_ADDRESS} (GAiA) is permitted`)
    return false
  }
  
  // Check operation permissions
  if (operation) {
    const token = Object.values(ALLOWED_TOKENS).find(t => t.address === address)
    if (token && !token.allowedOperations.includes(operation)) {
      console.error(`🚫 BLOCKED: Operation ${operation} not allowed for token ${token.symbol}`)
      return false
    }
  }
  
  return true
}

/**
 * Validates if a token symbol is allowed
 */
export function validateTokenSymbol(symbol: string, operation?: string): boolean {
  const token = ALLOWED_TOKENS[symbol as keyof typeof ALLOWED_TOKENS]
  
  if (!token) {
    console.error(`🚫 BLOCKED: Unauthorized token symbol ${symbol}`)
    console.error(`✅ ALLOWED: Only GAiA and GAIA (migration) are permitted`)
    return false
  }
  
  if (operation && !token.allowedOperations.includes(operation)) {
    console.error(`🚫 BLOCKED: Operation ${operation} not allowed for token ${symbol}`)
    return false
  }
  
  return true
}

/**
 * Enforces GAiA token only in database operations
 */
export function enforceGaiaTokenOnly(tokenData: any): any {
  if (!tokenData) return tokenData
  
  // If it's an array, filter to only GAiA tokens
  if (Array.isArray(tokenData)) {
    return tokenData.filter(item => {
      const address = item.address || item.wallet_address || item.token_address
      const symbol = item.symbol || item.token_symbol
      
      if (address && !validateTokenAddress(address)) return false
      if (symbol && !validateTokenSymbol(symbol)) return false
      
      return true
    })
  }
  
  // If it's an object, validate its token properties
  if (typeof tokenData === 'object') {
    const address = tokenData.address || tokenData.wallet_address || tokenData.token_address
    const symbol = tokenData.symbol || tokenData.token_symbol
    
    if (address && !validateTokenAddress(address)) {
      console.error('🚫 BLOCKED: Non-GAiA token data rejected')
      return null
    }
    
    if (symbol && !validateTokenSymbol(symbol)) {
      console.error('🚫 BLOCKED: Non-GAiA token symbol rejected')
      return null
    }
  }
  
  return tokenData
}

/**
 * Returns only GAiA token information
 */
export function getOfficialGaiaToken() {
  return {
    ...GAIA_TOKEN,
    address: OFFICIAL_GAIA_ADDRESS,
    enforced: true,
    lastVerified: new Date().toISOString()
  }
}

/**
 * Database query wrapper that enforces GAiA token only
 */
export function createGaiaEnforcedQuery(baseQuery: any) {
  return {
    ...baseQuery,
    // Add filter to only allow GAiA token addresses
    or: [
      { wallet_address: { eq: OFFICIAL_GAIA_ADDRESS } },
      { address: { eq: OFFICIAL_GAIA_ADDRESS } },
      { token_address: { eq: OFFICIAL_GAIA_ADDRESS } },
      { currency: { eq: 'GAiA' } },
      { token_symbol: { eq: 'GAiA' } },
      // Allow legacy GAIA for migration only
      { wallet_address: { eq: LEGACY_GAIA_ADDRESS } },
      { currency: { eq: 'GAIA' } },
      { token_symbol: { eq: 'GAIA' } }
    ]
  }
}

/**
 * Marketing and deployment rule enforcement
 */
export function enforceMarketingGaiaOnly(marketingData: any): any {
  if (!marketingData) return marketingData
  
  // Replace any non-GAiA token references in marketing materials
  let cleanedData = JSON.stringify(marketingData)
    .replace(/\b(BTC|Bitcoin)\b/g, 'GAiA')
    .replace(/\b(ETH|Ethereum)\b/g, 'GAiA')
    .replace(/\b(SOL|Solana)\b/g, 'GAiA')
    .replace(/\b(USDT|USDC|Tether|USD Coin)\b/g, 'GAiA')
    .replace(/\b(ADA|Cardano)\b/g, 'GAiA')
    .replace(/\b(DOT|Polkadot)\b/g, 'GAiA')
    .replace(/\b(LINK|Chainlink)\b/g, 'GAiA')
    .replace(/\b(BNB|Binance)\b/g, 'GAiA')
  
  try {
    return JSON.parse(cleanedData)
  } catch {
    return marketingData
  }
}

// Export enforcement rules for background processes
export const GAIA_ENFORCEMENT_RULES = {
  OFFICIAL_ADDRESS: OFFICIAL_GAIA_ADDRESS,
  ALLOWED_SYMBOLS: ['GAiA', 'GAIA'],
  BLOCKED_SYMBOLS: ['BTC', 'ETH', 'SOL', 'USDT', 'USDC', 'ADA', 'DOT', 'LINK', 'BNB'],
  MIGRATION_ONLY: ['GAIA'],
  MARKETING_ENFORCEMENT: true,
  DATABASE_ENFORCEMENT: true,
  STRICT_MODE: true
}