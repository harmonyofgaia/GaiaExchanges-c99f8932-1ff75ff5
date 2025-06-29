
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface TokenData {
  price: number
  marketCap: number
  volume24h: number
  holders: number
  transactions: number
  priceChange24h: number
  isLive: boolean
  lastUpdated: string
  error?: string
}

class GaiaTokenService {
  private static instance: GaiaTokenService
  private cache: TokenData | null = null
  private lastFetch: number = 0
  private readonly CACHE_DURATION = 30000 // 30 seconds

  static getInstance(): GaiaTokenService {
    if (!GaiaTokenService.instance) {
      GaiaTokenService.instance = new GaiaTokenService()
    }
    return GaiaTokenService.instance
  }

  async fetchLiveTokenData(): Promise<TokenData> {
    const now = Date.now()
    
    // Return cached data if still fresh
    if (this.cache && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.cache
    }

    console.log('🔍 Fetching live GAIA token data...')
    console.log('📊 Contract:', GAIA_TOKEN.CONTRACT_ADDRESS)
    console.log('💳 Wallet:', GAIA_TOKEN.WALLET_ADDRESS)
    console.log('🌐 Pump.fun:', GAIA_TOKEN.PUMP_FUN_URL)

    try {
      // Try to fetch from pump.fun API
      const pumpFunData = await this.fetchFromPumpFun()
      if (pumpFunData) {
        this.cache = pumpFunData
        this.lastFetch = now
        return pumpFunData
      }

      // Try alternative sources
      const alternativeData = await this.fetchFromAlternativeSources()
      if (alternativeData) {
        this.cache = alternativeData
        this.lastFetch = now
        return alternativeData
      }

      // If no real data available, return clear error state
      const errorData: TokenData = {
        price: 0,
        marketCap: 0,
        volume24h: 0,
        holders: 0,
        transactions: 0,
        priceChange24h: 0,
        isLive: false,
        lastUpdated: new Date().toISOString(),
        error: 'Token data not available - may not be listed on major exchanges yet'
      }

      this.cache = errorData
      this.lastFetch = now
      return errorData

    } catch (error) {
      console.error('❌ Error fetching GAIA token data:', error)
      
      const errorData: TokenData = {
        price: 0,
        marketCap: 0,
        volume24h: 0,
        holders: 0,
        transactions: 0,
        priceChange24h: 0,
        isLive: false,
        lastUpdated: new Date().toISOString(),
        error: 'Failed to fetch token data - connection error'
      }

      this.cache = errorData
      this.lastFetch = now
      return errorData
    }
  }

  private async fetchFromPumpFun(): Promise<TokenData | null> {
    try {
      // Try to fetch from pump.fun API (if available)
      const response = await fetch(`https://api.pump.fun/token/${GAIA_TOKEN.CONTRACT_ADDRESS}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Pump.fun data received:', data)
        
        return {
          price: data.price || 0,
          marketCap: data.market_cap || 0,
          volume24h: data.volume_24h || 0,
          holders: data.holders || 0,
          transactions: data.transactions || 0,
          priceChange24h: data.price_change_24h || 0,
          isLive: true,
          lastUpdated: new Date().toISOString()
        }
      }
    } catch (error) {
      console.log('⚠️ Pump.fun API not accessible:', error)
    }
    return null
  }

  private async fetchFromAlternativeSources(): Promise<TokenData | null> {
    // Try to fetch from other potential sources
    const sources = [
      `https://api.solscan.io/token/meta?tokenAddress=${GAIA_TOKEN.CONTRACT_ADDRESS}`,
      `https://api.dexscreener.com/latest/dex/tokens/${GAIA_TOKEN.CONTRACT_ADDRESS}`,
    ]

    for (const sourceUrl of sources) {
      try {
        console.log('🔍 Trying alternative source:', sourceUrl)
        const response = await fetch(sourceUrl)
        
        if (response.ok) {
          const data = await response.json()
          console.log('✅ Alternative source data:', data)
          
          // Parse the response based on the source
          if (data && typeof data === 'object') {
            return {
              price: this.extractPrice(data),
              marketCap: this.extractMarketCap(data),
              volume24h: this.extractVolume(data),
              holders: this.extractHolders(data),
              transactions: this.extractTransactions(data),
              priceChange24h: this.extractPriceChange(data),
              isLive: true,
              lastUpdated: new Date().toISOString()
            }
          }
        }
      } catch (error) {
        console.log('⚠️ Alternative source failed:', sourceUrl, error)
      }
    }

    return null
  }

  private extractPrice(data: any): number {
    return data.price || data.priceUsd || data.current_price || 0
  }

  private extractMarketCap(data: any): number {
    return data.marketCap || data.market_cap || data.fdv || 0
  }

  private extractVolume(data: any): number {
    return data.volume24h || data.volume_24h || data.total_volume || 0
  }

  private extractHolders(data: any): number {
    return data.holders || data.holder_count || 0
  }

  private extractTransactions(data: any): number {
    return data.transactions || data.txns24h || data.transaction_count || 0
  }

  private extractPriceChange(data: any): number {
    return data.priceChange24h || data.price_change_24h || data.price_change_percentage_24h || 0
  }

  // Method to validate if we have real data
  hasRealData(): boolean {
    return this.cache !== null && this.cache.isLive && !this.cache.error
  }

  // Get cached data without refetching
  getCachedData(): TokenData | null {
    return this.cache
  }

  // Clear cache to force refresh
  clearCache(): void {
    this.cache = null
    this.lastFetch = 0
  }
}

export const gaiaTokenService = GaiaTokenService.getInstance()
export type { TokenData }
