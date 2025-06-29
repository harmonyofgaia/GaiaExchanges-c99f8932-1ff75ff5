
import { useState, useEffect } from 'react'
import { gaiaTokenService, TokenData } from '@/services/gaiaTokenService'
import { toast } from 'sonner'

export function useGaiaTokenData(autoRefresh: boolean = true) {
  const [tokenData, setTokenData] = useState<TokenData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const data = await gaiaTokenService.fetchLiveTokenData()
      setTokenData(data)
      
      if (data.error) {
        setError(data.error)
        console.log('⚠️ GAIA Token Data Warning:', data.error)
      } else if (data.isLive) {
        console.log('✅ GAIA Token Data Updated:', data)
        toast.success('GAIA Token Data Updated', {
          description: `Price: $${data.price.toFixed(6)} | Volume: $${data.volume24h.toLocaleString()}`
        })
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch GAIA token data'
      setError(errorMessage)
      console.error('❌', errorMessage, err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    if (autoRefresh) {
      const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  return {
    tokenData,
    isLoading,
    error,
    refetch: fetchData,
    hasRealData: tokenData?.isLive && !tokenData?.error
  }
}
