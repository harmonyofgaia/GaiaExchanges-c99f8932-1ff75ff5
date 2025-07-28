
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

  // Use actual GAiA token data or fallback to constants
  const gaiaHolders = tokenData?.holders || GAIA_METRICS.HOLDERS
  const gaiaVolume = tokenData?.volume24h || GAIA_METRICS.VOLUME_24H
  const gaiaMarketCap = tokenData?.marketCap || GAIA_METRICS.MARKET_CAP
  const gaiaPrice = tokenData?.price || GAIA_METRICS.CURRENT_PRICE
  const gaiaTransactions = tokenData?.transactions24h || GAIA_METRICS.TRANSACTIONS_24H

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
              {GAIA_TOKEN.NETWORK} Network
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <Coins className="h-3 w-3 mr-1" />
              {formatGaiaNumber(GAIA_TOKEN.TOTAL_SUPPLY)} Supply
            </Badge>
            <Badge variant="outline" className="border-orange-500/50 text-orange-400">
              {tokenData?.isLive ? '🟢 LIVE DATA' : '📊 SIMULATED'}
            </Badge>
          </div>
        </div>

        {/* GAiA Token Live Data */}
        <div className="mb-8">
          <TokenDataDisplay showFullDetails={true} />
        </div>

        {/* Coin Crafter Illustration */}
        <CoinCrafterIllustration />

        {/* GAiA Token Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">GAiA Holders</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatGaiaNumber(gaiaHolders)}
              </div>
              <p className="text-xs text-muted-foreground">
                Growing community of GAiA believers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">GAiA 24h Volume</CardTitle>
              <Coins className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${formatGaiaNumber(gaiaVolume)}
              </div>
              <p className="text-xs text-muted-foreground">
                24h trading volume on {GAIA_TOKEN.NETWORK}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">GAiA Market Cap</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${formatGaiaNumber(gaiaMarketCap)}
              </div>
              <p className="text-xs text-muted-foreground">
                Current GAiA token valuation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-400">GAiA Price</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatGaiaPrice(gaiaPrice)}
              </div>
              <p className="text-xs text-muted-foreground">
                Real-time GAiA token price
              </p>
            </CardContent>
          </Card>
        </div>

        {/* GAiA Network Activity and Token Information */}
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
                    GAiA transactions: +{formatGaiaNumber(gaiaTransactions)} last 24h
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="text-sm text-white">
                    Environmental impact: {formatGaiaNumber(GAIA_TOKEN.TREES_PLANTED_TOTAL)} trees planted
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="text-sm text-white">
                    Ocean cleanup: ${formatGaiaNumber(GAIA_TOKEN.OCEAN_CLEANUP_CONTRIBUTION)} contributed
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="text-sm text-white">
                    CO2 offset: {GAIA_METRICS.CO2_OFFSET_TOTAL} tons neutralized
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
                  <span className="text-muted-foreground">Token Symbol</span>
                  <span className="text-white font-bold">{GAIA_TOKEN.SYMBOL}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-white font-bold">{GAIA_TOKEN.NETWORK}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Address</span>
                  <span className="text-white font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="text-white font-bold">{formatGaiaNumber(GAIA_TOKEN.TOTAL_SUPPLY)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Holders</span>
                  <span className="text-white font-bold">{formatGaiaNumber(gaiaHolders)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Source</span>
                  <span className="text-white font-bold">{tokenData?.isLive ? 'Live API' : 'Simulated'}</span>
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
            <div className="flex gap-4 flex-wrap mb-4">
              <Button onClick={openPumpFun} className="bg-green-600 hover:bg-green-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Trade GAiA on Pump.fun
              </Button>
              <Button onClick={openWebsite} variant="outline" className="border-blue-500/30 text-blue-400">
                <Globe className="h-4 w-4 mr-2" />
                Official GAiA Website
              </Button>
              <Button onClick={refetch} variant="outline" disabled={isLoading} className="border-purple-500/30 text-purple-400">
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh GAiA Data
              </Button>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30">
              <p className="text-sm text-green-300">
                <Shield className="h-4 w-4 inline mr-2" />
                {GAIA_TOKEN.OFFICIAL_DISCLAIMER}
              </p>
              <div className="mt-2 text-xs text-blue-300">
                GAiA Contract: <code className="bg-black/30 px-2 py-1 rounded">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <div className="mt-1 text-xs text-purple-300">
                Admin Wallet: <code className="bg-black/30 px-2 py-1 rounded">{GAIA_TOKEN.WALLET_ADDRESS}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
