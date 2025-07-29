
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, ExternalLink, RefreshCw, Users, Coins } from 'lucide-react'
import { useGaiaTokenData } from '@/hooks/useGaiaTokenData'
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'

interface TokenDataDisplayProps {
  showFullDetails?: boolean
  autoRefresh?: boolean
}

export function TokenDataDisplay({ showFullDetails = false, autoRefresh = false }: TokenDataDisplayProps) {
  const { tokenData, isLoading, hasRealData, refetch } = useGaiaTokenData(autoRefresh)

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank', 'noopener,noreferrer')
  }

  const openWebsite = () => {
    window.open(GAIA_TOKEN.OFFICIAL_WEBSITE, '_blank', 'noopener,noreferrer')
  }

  // Use token data or fallback to constants
  const displayData = tokenData || {
    price: GAIA_METRICS.CURRENT_PRICE,
    volume24h: GAIA_METRICS.VOLUME_24H,
    marketCap: GAIA_METRICS.MARKET_CAP,
    priceChange24h: 5.2,
    holders: GAIA_METRICS.HOLDERS,
    transactions24h: GAIA_METRICS.TRANSACTIONS_24H,
    lastUpdated: new Date(),
    isLive: false,
    burnRate: 0,
    totalBurned: 0,
    circulatingSupply: GAIA_TOKEN.CIRCULATING_SUPPLY
  }

  if (isLoading) {
    return (
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardContent className="pt-6">
          <div className="text-center text-green-400">Loading GAiA token data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-green-400">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6" />
            🚀 LIVE GAiA Token Data - Harmony of Gaia
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${hasRealData ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
              {hasRealData ? '🟢 LIVE' : '📊 SIMULATED'}
            </Badge>
            <Button onClick={refetch} variant="outline" size="sm" disabled={isLoading}>
              <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={openPumpFun} variant="outline" size="sm">
              <ExternalLink className="h-3 w-3 mr-1" />
              Trade GAiA
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-900/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {formatGaiaPrice(displayData.price)}
            </div>
            <div className="text-sm text-muted-foreground">GAiA Price</div>
          </div>
          
          <div className="text-center p-4 bg-blue-900/30 rounded-lg">
            <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
              displayData.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {displayData.priceChange24h >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              {displayData.priceChange24h >= 0 ? '+' : ''}{displayData.priceChange24h.toFixed(2)}%
            </div>
            <div className="text-sm text-muted-foreground">24h Change</div>
          </div>
          
          <div className="text-center p-4 bg-purple-900/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">
              ${formatGaiaNumber(displayData.volume24h)}
            </div>
            <div className="text-sm text-muted-foreground">24h Volume</div>
          </div>
          
          <div className="text-center p-4 bg-orange-900/30 rounded-lg">
            <div className="text-2xl font-bold text-orange-400">
              ${formatGaiaNumber(displayData.marketCap)}
            </div>
            <div className="text-sm text-muted-foreground">Market Cap</div>
          </div>
        </div>

        {showFullDetails && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-cyan-900/20 rounded-lg">
                <div className="text-lg font-bold text-cyan-400 flex items-center justify-center gap-2">
                  <Users className="h-5 w-5" />
                  {formatGaiaNumber(displayData.holders)}
                </div>
                <div className="text-xs text-muted-foreground">GAiA Holders</div>
              </div>
              
              <div className="text-center p-3 bg-yellow-900/20 rounded-lg">
                <div className="text-lg font-bold text-yellow-400">{formatGaiaNumber(displayData.transactions24h)}</div>
                <div className="text-xs text-muted-foreground">24h Transactions</div>
              </div>
              
              <div className="text-center p-3 bg-pink-900/20 rounded-lg">
                <div className="text-lg font-bold text-pink-400">
                  {formatGaiaNumber(displayData.circulatingSupply)}
                </div>
                <div className="text-xs text-muted-foreground">Circulating Supply</div>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Button onClick={openWebsite} variant="outline" className="border-blue-500/30 text-blue-400">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official GAiA Website
              </Button>
            </div>
          </>
        )}

        <div className="mt-4 text-center text-xs text-muted-foreground space-y-1">
          <div>Last updated: {displayData.lastUpdated.toLocaleTimeString()}</div>
          <div>Contract: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20)}...</div>
          <div>Network: {GAIA_TOKEN.NETWORK} | Official GAiA Token - Harmony of Gaia</div>
          <div className="text-green-400 font-semibold">{GAIA_TOKEN.BRAND_STATEMENT}</div>
        </div>
      </CardContent>
    </Card>
  )
}
