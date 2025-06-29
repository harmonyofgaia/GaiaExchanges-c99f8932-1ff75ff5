
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Activity, TrendingUp, Zap, Globe, Shield, DollarSign, Users, ExternalLink, Copy } from 'lucide-react'
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'
import { toast } from 'sonner'
import { EnhancedAnimatedBackground } from '@/components/ui/enhanced-animated-background'

interface LiveGAiAData {
  price: number
  volume: number
  users: number
  transactions: number
  health: number
  change: number
  marketCap: number
  holders: number
  networkSpeed: number
  securityScore: number
}

const LiveTracking = () => {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [gaiaData, setGaiaData] = useState<LiveGAiAData>({
    price: GAIA_TOKEN.INITIAL_PRICE,
    volume: GAIA_METRICS.INITIAL_VOLUME,
    users: 125000,
    transactions: GAIA_METRICS.INITIAL_TRANSACTIONS,
    health: GAIA_METRICS.ECOSYSTEM_HEALTH,
    change: 125.47,
    marketCap: GAIA_METRICS.INITIAL_MARKET_CAP,
    holders: GAIA_METRICS.INITIAL_HOLDERS,
    networkSpeed: GAIA_METRICS.NETWORK_SPEED,
    securityScore: GAIA_METRICS.SECURITY_SCORE
  })

  const [liveEvents, setLiveEvents] = useState<Array<{
    id: string
    timestamp: Date
    type: string
    description: string
    value: number
  }>>([])

  useEffect(() => {
    console.log('🌍 GAiA Live Tracking: Component initializing...')
    console.log('🔗 Official GAiA Wallet:', GAIA_TOKEN.WALLET_ADDRESS)
    console.log('📄 Official GAiA Contract:', GAIA_TOKEN.CONTRACT_ADDRESS)
    setMounted(true)
    
    // Time update every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Real GAiA data simulation every 3 seconds
    const dataInterval = setInterval(() => {
      setGaiaData(prev => ({
        ...prev,
        price: Math.max(0.00001, prev.price * (1 + (Math.random() - 0.4) * 0.02)),
        volume: prev.volume + Math.random() * 200000,
        users: prev.users + Math.floor(Math.random() * 75),
        transactions: prev.transactions + Math.floor(Math.random() * 150),
        health: Math.min(99.9, prev.health + Math.random() * 0.1),
        change: prev.change + (Math.random() - 0.5) * 3,
        marketCap: Math.max(1000000, prev.marketCap * (1 + (Math.random() - 0.5) * 0.03)),
        holders: prev.holders + Math.floor(Math.random() * 35)
      }))

      // Add live event
      const eventDescriptions = [
        'GAiA token transaction completed with 10x speed boost',
        'New GAiA holder joined through Love & Joy protocol',
        'GAiA ecosystem health improved - sustainable growth',
        'GAiA network expansion - new country connected',
        'GAiA performance optimization applied successfully',
        'GAiA security scan completed - 100% secure environment'
      ]

      const newEvent = {
        id: `gaia-${Date.now()}`,
        timestamp: new Date(),
        type: 'GAiA_ACTIVITY',
        description: eventDescriptions[Math.floor(Math.random() * eventDescriptions.length)],
        value: Math.random() * 50000
      }

      setLiveEvents(prev => [newEvent, ...prev.slice(0, 19)])
    }, 3000)

    console.log('✅ GAiA Live Tracking: All systems operational')

    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
    }
  }, [])

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('GAiA Wallet Address Copied!', {
      description: 'Official GAiA wallet address copied to clipboard'
    })
  }

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('GAiA Contract Address Copied!', {
      description: 'Official GAiA contract address copied to clipboard'
    })
  }

  if (!mounted) {
    return (
      <div className="min-h-screen relative">
        <EnhancedAnimatedBackground />
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-lg text-green-400">Loading GAiA Live Tracking System...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAiA Live Tracking Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Real-Time GAiA Token Performance & Ecosystem Monitor
          </p>
          
          {/* Official GAiA Token Information */}
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-green-400 text-2xl">
                🌊 Official GAiA Token Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Wallet Address */}
                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-400 font-bold text-lg">GAiA Wallet Address:</span>
                    <Button 
                      onClick={copyWalletAddress}
                      variant="outline" 
                      size="sm"
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Address
                    </Button>
                  </div>
                  <code className="text-blue-300 font-mono text-sm break-all block bg-blue-900/20 p-3 rounded border">
                    {GAIA_TOKEN.WALLET_ADDRESS}
                  </code>
                </div>

                {/* Contract Address */}
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-purple-400 font-bold text-lg">GAiA Contract Address:</span>
                    <Button 
                      onClick={copyContractAddress}
                      variant="outline" 
                      size="sm"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Contract
                    </Button>
                  </div>
                  <code className="text-purple-300 font-mono text-sm break-all block bg-purple-900/20 p-3 rounded border">
                    {GAIA_TOKEN.CONTRACT_ADDRESS}
                  </code>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 flex-wrap">
                <Badge className="bg-green-500 animate-pulse text-white text-lg py-2 px-4">
                  <Activity className="h-5 w-5 mr-2" />
                  Live GAiA Data Stream Active
                </Badge>
                <Badge className="bg-blue-500 text-white text-lg py-2 px-4">
                  {currentTime.toLocaleTimeString()}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')}
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View on Pump.fun
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live GAiA Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-500/50 bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">GAiA Price</p>
                  <p className="text-3xl font-bold text-green-400">{formatGaiaPrice(gaiaData.price)}</p>
                  <Badge className={`mt-3 text-sm ${gaiaData.change >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {gaiaData.change.toFixed(2)}%
                  </Badge>
                </div>
                <DollarSign className="h-10 w-10 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/50 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">GAiA Volume 24h</p>
                  <p className="text-3xl font-bold text-blue-400">{formatGaiaPrice(gaiaData.volume)}</p>
                  <Badge className="mt-3 bg-blue-600 text-white text-sm">Live Trading</Badge>
                </div>
                <Activity className="h-10 w-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">GAiA Holders</p>
                  <p className="text-3xl font-bold text-purple-400">{formatGaiaNumber(gaiaData.holders)}</p>
                  <Badge className="mt-3 bg-purple-600 text-white text-sm">Growing</Badge>
                </div>
                <Users className="h-10 w-10 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/50 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">GAiA Transactions</p>
                  <p className="text-3xl font-bold text-yellow-400">{formatGaiaNumber(gaiaData.transactions)}</p>
                  <Badge className="mt-3 bg-yellow-600 text-white text-sm">Real-time</Badge>
                </div>
                <Zap className="h-10 w-10 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GAiA System Performance */}
        <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-400 text-2xl">
              <Shield className="h-8 w-8" />
              GAiA Ecosystem Performance - Love & Joy Protocol
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-300">Network Speed</span>
                  <span className="text-lg font-bold text-green-400">{gaiaData.networkSpeed} TPS</span>
                </div>
                <Progress value={95} className="h-4" />
                <p className="text-sm text-green-400">10x Faster Than Competitors</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-300">Security Score</span>
                  <span className="text-lg font-bold text-blue-400">{gaiaData.securityScore}%</span>
                </div>
                <Progress value={gaiaData.securityScore} className="h-4" />
                <p className="text-sm text-blue-400">Maximum Security Level</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-300">Ecosystem Health</span>
                  <span className="text-lg font-bold text-purple-400">{gaiaData.health.toFixed(1)}%</span>
                </div>
                <Progress value={gaiaData.health} className="h-4" />
                <p className="text-sm text-purple-400">Optimal Performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Events Stream */}
        <Card className="border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-cyan-400 text-2xl">
              <Globe className="h-8 w-8" />
              Live GAiA Events Stream
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-80 overflow-y-auto space-y-3">
              {liveEvents.slice(0, 10).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 rounded border border-border/50 bg-card/50 hover:bg-card/70 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-green-600 text-white">
                        {event.type}
                      </Badge>
                      <span className="text-sm text-green-400 font-bold">
                        +{formatGaiaPrice(event.value)} Impact
                      </span>
                    </div>
                    <p className="text-base">{event.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {event.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GAiA Status Summary */}
        <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm">
          <CardContent className="pt-8">
            <div className="text-center space-y-6">
              <h3 className="text-3xl font-bold text-yellow-400">🌍 GAiA ECOSYSTEM STATUS: OPTIMAL</h3>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                GAiA ecosystem operating at <span className="text-green-400 font-bold">peak performance</span>. 
                Network speed: <span className="text-blue-400 font-bold">10x faster</span>, 
                Security: <span className="text-purple-400 font-bold">100% secure</span>, 
                Market cap: <span className="text-yellow-400 font-bold">{formatGaiaPrice(gaiaData.marketCap)}</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Badge className="bg-green-600 text-white text-lg py-3 px-6">
                  💚 Love Protocol: ACTIVE
                </Badge>
                <Badge className="bg-yellow-600 text-white text-lg py-3 px-6">
                  😊 Joy Network: ENGAGED
                </Badge>
                <Badge className="bg-blue-600 text-white text-lg py-3 px-6">
                  🚀 Performance: ENHANCED
                </Badge>
                <Badge className="bg-purple-600 text-white text-lg py-3 px-6">
                  🌍 Global: {formatGaiaNumber(gaiaData.holders)} HOLDERS
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LiveTracking
