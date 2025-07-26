import { GAIA_TOKEN } from '@/constants/gaia'
import { useGaiaTokenData } from '@/hooks/useGaiaTokenData'
import { Coins } from 'lucide-react'

interface GAiATokenIntegrationProps {
  showPrice?: boolean
  showBalance?: boolean
  compact?: boolean
  className?: string
}

export function GAiATokenIntegration({ 
  showPrice = true, 
  showBalance = false, 
  compact = false,
  className = "" 
}: GAiATokenIntegrationProps) {
  const { tokenData, isLoading } = useGaiaTokenData()

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 text-xs ${className}`}>
        <Coins className="h-3 w-3 text-primary" />
        <span className="text-primary font-medium">{GAIA_TOKEN.SYMBOL}</span>
        {showPrice && tokenData && (
          <span className="text-muted-foreground">
            ${tokenData.price.toFixed(6)}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`border border-primary/30 rounded-lg p-3 bg-primary/5 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Coins className="h-5 w-5 text-primary" />
          <div>
            <div className="font-semibold text-primary">{GAIA_TOKEN.NAME}</div>
            <div className="text-xs text-muted-foreground">{GAIA_TOKEN.SYMBOL}</div>
          </div>
        </div>
        
        {showPrice && (
          <div className="text-right">
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : tokenData ? (
              <>
                <div className="font-semibold text-primary">
                  ${tokenData.price.toFixed(6)}
                </div>
                <div className="text-xs text-muted-foreground">
                  24h Vol: ${tokenData.volume24h?.toLocaleString()}
                </div>
              </>
            ) : (
              <div className="font-semibold text-primary">
                ${GAIA_TOKEN.INITIAL_PRICE.toFixed(6)}
              </div>
            )}
          </div>
        )}
      </div>
      
      {showBalance && (
        <div className="mt-2 pt-2 border-t border-primary/20">
          <div className="text-sm text-muted-foreground">
            Network: {GAIA_TOKEN.NETWORK}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {GAIA_TOKEN.BRAND_STATEMENT}
          </div>
        </div>
      )}
    </div>
  )
}