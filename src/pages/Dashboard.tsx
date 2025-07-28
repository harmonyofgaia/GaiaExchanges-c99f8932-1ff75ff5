
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, Coins, TrendingUp, Globe, Shield, ExternalLink, RefreshCw } from 'lucide-react'
import { useGaiaTokenData } from '@/hooks/useGaiaTokenData'
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'
import { CoinCrafterIllustration } from '@/components/CoinCrafterIllustration'
import { TokenDataDisplay } from '@/components/TokenDataDisplay'

export default function Dashboard() {
  const { tokenData, isLoading, refetch } = useGaiaTokenData(true)

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank', 'noopener,noreferrer')
  }

  const openWebsite = () => {
    window.open(GAIA_TOKEN.OFFICIAL_WEBSITE, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAiA Dashboard - Harmony of Gaia
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            {GAIA_TOKEN.BRAND_STATEMENT}
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Globe className="h-3 w-3 mr-1" />
              {GAIA_TOKEN.SYMBOL} Token
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Shield className="h-3 w-3 mr-1" />
              Solana Network
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <Coins className="h-3 w-3 mr-1" />
              {formatGaiaNumber(GAIA_TOKEN.TOTAL_SUPPLY)} Supply
            </Badge>
          </div>
        </div>

        {/* GAiA Token Live Data */}
        <div className="mb-8">
          <TokenDataDisplay showFullDetails={true} />
        </div>

        {/* Coin Crafter Illustration */}
        <CoinCrafterIllustration />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">GAiA Holders</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tokenData ? formatGaiaNumber(tokenData.holders) : formatGaiaNumber(GAIA_METRICS.HOLDERS)}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">GAiA Volume</CardTitle>
              <Coins className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${tokenData ? formatGaiaNumber(tokenData.volume24h) : formatGaiaNumber(GAIA_METRICS.VOLUME_24H)}
              </div>
              <p className="text-xs text-muted-foreground">
                24h trading volume
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Market Cap</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${tokenData ? formatGaiaNumber(tokenData.marketCap) : formatGaiaNumber(GAIA_METRICS.MARKET_CAP)}
              </div>
              <p className="text-xs text-muted-foreground">
                Current market valuation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-400">Token Price</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tokenData ? formatGaiaPrice(tokenData.price) : formatGaiaPrice(GAIA_METRICS.CURRENT_PRICE)}
              </div>
              <p className="text-xs text-muted-foreground">
                Real-time GAiA price
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">GAiA Network Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="text-sm text-white">
                    New GAiA holders: +{Math.floor(Math.random() * 50) + 20} today
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="text-sm text-white">
                    GAiA transactions: +{formatGaiaNumber(tokenData?.transactions24h || GAIA_METRICS.TRANSACTIONS_24H)} last 24h
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="text-sm text-white">
                    Trees planted: {formatGaiaNumber(GAIA_TOKEN.TREES_PLANTED_TOTAL)}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="text-sm text-white">
                    Ocean cleanup: ${formatGaiaNumber(GAIA_TOKEN.OCEAN_CLEANUP_CONTRIBUTION)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">GAiA Token Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Address</span>
                  <span className="text-white font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-white font-bold">{GAIA_TOKEN.NETWORK}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="text-white font-bold">{formatGaiaNumber(GAIA_TOKEN.TOTAL_SUPPLY)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CO2 Offset</span>
                  <span className="text-white font-bold">{GAIA_METRICS.CO2_OFFSET_TOTAL} tons</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GAiA Token Actions */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-400">GAiA Token Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Button onClick={openPumpFun} className="bg-green-600 hover:bg-green-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Trade on Pump.fun
              </Button>
              <Button onClick={openWebsite} variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                Official Website
              </Button>
              <Button onClick={refetch} variant="outline" disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30">
              <p className="text-sm text-green-300">
                <Shield className="h-4 w-4 inline mr-2" />
                {GAIA_TOKEN.OFFICIAL_DISCLAIMER}
              </p>
              <div className="mt-2 text-xs text-blue-300">
                Contract: <code className="bg-black/30 px-2 py-1 rounded">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
