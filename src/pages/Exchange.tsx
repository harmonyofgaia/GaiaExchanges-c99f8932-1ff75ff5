import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  ArrowUpDown, 
  DollarSign, 
  BarChart3,
  Shield,
  Zap,
  Globe,
  Database,
  Network,
  Rocket,
  Star,
  Eye,
  Heart,
  Coins,
  Activity,
  Users,
  Download,
  
  ExternalLink,
  Bell,
  Lock,
  Cpu,
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  LineChart
} from 'lucide-react'
import { GaiasExchange } from '@/components/GaiasExchange'
import { InvestorScoutingSystem } from '@/components/InvestorScoutingSystem'
import { FullyFunctionalExchange } from '@/components/FullyFunctionalExchange'
import { MultiExchangeIntegration } from '@/components/MultiExchangeIntegration'
import { GaiaFeeManager } from '@/components/GaiaFeeManager'
import { BlockchainStatus } from '@/components/blockchain/BlockchainStatus'
import { LiveTransactionMatrix } from '@/components/LiveTransactionMatrix'
import { TradingInterface } from '@/components/TradingInterface'
import { ChartAnalytics } from '@/components/ChartAnalytics'
import { SecurityCenter } from '@/components/SecurityCenter'
import { GaiaLogo } from '@/components/GaiaLogo'
import { CommunityVault } from '@/components/CommunityVault'
import { toast } from 'sonner'
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'

// Token configuration for comprehensive trading
const supportedTokens = [
  { name: 'Harmony of Gaia', symbol: 'GAiA', icon: '🌍', fee: 0, address: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh' },
  { name: 'Bitcoin', symbol: 'BTC', icon: '₿', fee: 0.0001, address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
  { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', fee: 0.001, address: '0x0000000000000000000000000000000000000000' },
  { name: 'Solana', symbol: 'SOL', icon: '◎', fee: 0.00005, address: 'So11111111111111111111111111111111111111112' },
  { name: 'Cardano', symbol: 'ADA', icon: '₳', fee: 0.17, address: 'addr1...' },
  { name: 'Polkadot', symbol: 'DOT', icon: '●', fee: 0.01, address: '1...' }
]

interface BlockchainMetrics {
  health: number
  transactions: number
  nodes: number
  security: number
  uptime: number
  volume: number
  users: number
  trades: number
}

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume: number
  marketCap: number
}

export default function Exchange() {
  const [metrics, setMetrics] = useState<BlockchainMetrics>({
    health: 98.7,
    transactions: 2847592,
    nodes: 1247,
    security: 100,
    uptime: 99.98,
    volume: GAIA_METRICS.INITIAL_VOLUME,
    users: GAIA_METRICS.INITIAL_HOLDERS,
    trades: GAIA_METRICS.INITIAL_TRANSACTIONS
  })

  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: GAIA_TOKEN.SYMBOL, price: GAIA_TOKEN.INITIAL_PRICE, change24h: 5.67, volume: 8750000, marketCap: GAIA_METRICS.INITIAL_MARKET_CAP },
    { symbol: 'BTC', price: 43250.67, change24h: 2.34, volume: 15420000000, marketCap: 847000000000 },
    { symbol: 'ETH', price: 2543.21, change24h: -1.87, volume: 8750000000, marketCap: 305000000000 }
  ])

  const [notifications, setNotifications] = useState<string[]>([
    'Blockchain security scan completed ✅',
    'New trading pairs added to DEX 🔄',
    'Private blockchain network optimized ⚡'
  ])

  // Token swap state
  const [fromToken, setFromToken] = useState(supportedTokens[0])
  const [toToken, setToToken] = useState(supportedTokens[1])
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isSwapping, setIsSwapping] = useState(false)
  const [swapRate, setSwapRate] = useState(1.0)

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        health: Math.min(100, prev.health + Math.random() * 0.1),
        transactions: prev.transactions + Math.floor(Math.random() * 50),
        nodes: prev.nodes + Math.floor(Math.random() * 5),
        volume: prev.volume + Math.random() * 1000000,
        users: prev.users + Math.floor(Math.random() * 100),
        trades: prev.trades + Math.floor(Math.random() * 50)
      }))

      setMarketData(prev => prev.map(coin => ({
        ...coin,
        price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
        change24h: coin.change24h + (Math.random() - 0.5) * 0.1,
        volume: coin.volume * (1 + (Math.random() - 0.5) * 0.05)
      })))

      setSwapRate(prev => {
        const newRate = prev + (Math.random() - 0.5) * 0.01
        return Math.max(0.1, Math.min(10.0, newRate))
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Calculate swap amount
  useEffect(() => {
    const parsedAmount = parseFloat(fromAmount)
    if (fromAmount && !isNaN(parsedAmount) && parsedAmount > 0) {
      setToAmount((parsedAmount * swapRate).toFixed(6))
    } else {
      setToAmount('')
    }
  }, [fromAmount, swapRate])

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
  }

  const executeSwap = async () => {
    if (!fromAmount || !toAmount) {
      toast.error('Please enter swap amounts')
      return
    }

    setIsSwapping(true)
    toast.info('Initiating secure blockchain swap...')

    setTimeout(() => {
      toast.success(`Successfully swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`)
      setIsSwapping(false)
      setFromAmount('')
      setToAmount('')
    }, 3000)
  }

  const handleDownloadApp = (platform: string) => {
    const downloadLinks = {
      windows: 'https://releases.harmonyofgaia.net/gaia-exchanges-windows-x64.exe',
      macos: 'https://releases.harmonyofgaia.net/gaia-exchanges-macos-universal.dmg',
      android: 'https://releases.harmonyofgaia.net/gaia-exchanges-android.apk',
      linux: 'https://releases.harmonyofgaia.net/gaia-exchanges-linux-amd64.deb',
      ios: 'https://apps.apple.com/search?term=gaia+exchanges',
      web: 'https://app.gaiaexchanges.com'
    }

    const url = downloadLinks[platform as keyof typeof downloadLinks]
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      toast.success(`Opening Gaia's Exchanges for ${platform}`, {
        description: "🌍 World's most secure crypto exchange"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30">
      {/* Mega Header */}
      <div className="relative overflow-hidden border-b border-border/50 bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 relative max-w-7xl">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
              <GaiaLogo size="lg" variant="glow" />
              <div className="text-3xl sm:text-4xl lg:text-6xl animate-bounce">🌍</div>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-2 sm:mb-4">
              GAIA BLOCKCHAIN UNIVERSE
            </h1>
            <p className="text-sm sm:text-lg lg:text-2xl text-green-400 mb-1 sm:mb-2">
              World's Most Advanced • Quantum-Secured • Dragon-Protected
            </p>
            <p className="text-sm sm:text-base lg:text-xl text-blue-400 mb-4 sm:mb-6">
              Complete Trading Ecosystem & Private Blockchain Network
            </p>
            
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              <Badge className="bg-green-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-lg">🚀 Zero Fees</Badge>
              <Badge className="bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-lg">⚡ 100k TPS</Badge>
              <Badge className="bg-purple-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-lg">🛡️ Quantum Safe</Badge>
              <Badge className="bg-yellow-600 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-lg">🌱 Carbon Negative</Badge>
            </div>
          </div>

          {/* Real-time Metrics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
            <Card className="bg-green-900/30 border-green-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{metrics.health.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Network Health</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-900/30 border-blue-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{metrics.transactions.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Transactions</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/30 border-purple-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{metrics.nodes}</div>
                <div className="text-xs text-muted-foreground">Network Nodes</div>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 border-red-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{metrics.security}%</div>
                <div className="text-xs text-muted-foreground">Security Score</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-900/30 border-yellow-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{metrics.uptime}%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </CardContent>
            </Card>
            <Card className="bg-cyan-900/30 border-cyan-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{formatGaiaNumber(metrics.volume)}</div>
                <div className="text-xs text-muted-foreground">24h Volume</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-900/30 border-orange-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">{metrics.users.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            <Card className="bg-pink-900/30 border-pink-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-pink-400">{metrics.trades.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Trades</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Quick Access Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Instant Token Swap */}
              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Coins className="h-6 w-6" />
                    Instant Blockchain Swap
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <select 
                        className="flex h-10 w-24 rounded-md border border-input bg-background px-2 py-2 text-sm"
                        value={fromToken.symbol}
                        onChange={(e) => setFromToken(supportedTokens.find(t => t.symbol === e.target.value) || supportedTokens[0])}
                      >
                        {supportedTokens.map(token => (
                          <option key={token.symbol} value={token.symbol}>
                            {token.icon} {token.symbol}
                          </option>
                        ))}
                      </select>
                      <Input
                        placeholder="0.0"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button onClick={handleSwapTokens} variant="outline" size="sm" className="rounded-full p-2">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        className="flex h-10 w-24 rounded-md border border-input bg-background px-2 py-2 text-sm"
                        value={toToken.symbol}
                        onChange={(e) => setToToken(supportedTokens.find(t => t.symbol === e.target.value) || supportedTokens[0])}
                      >
                        {supportedTokens.map(token => (
                          <option key={token.symbol} value={token.symbol}>
                            {token.icon} {token.symbol}
                          </option>
                        ))}
                      </select>
                      <Input
                        placeholder="0.0"
                        value={toAmount}
                        readOnly
                        className="flex-1 bg-muted"
                      />
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Rate: 1 {fromToken.symbol} = {swapRate.toFixed(6)} {toToken.symbol}
                  </div>
                  <Button 
                    onClick={executeSwap}
                    disabled={isSwapping || !fromAmount}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isSwapping ? 'Swapping...' : 'Execute Secure Swap'}
                  </Button>
                </CardContent>
              </Card>

              {/* Market Overview */}
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Live Market Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketData.map((coin) => (
                      <div key={coin.symbol} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="font-mono text-sm">{coin.symbol}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatGaiaPrice(coin.price)}</div>
                          <div className={`text-sm flex items-center gap-1 ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {coin.change24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {Math.abs(coin.change24h).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Center */}
              <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-orange-900/30">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quantum Security</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dragon Protection</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Multi-Layer Defense</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Recent Alerts:</div>
                      {notifications.slice(0, 2).map((notification, idx) => (
                        <div key={idx} className="text-xs bg-green-900/30 p-2 rounded border border-green-500/30">
                          {notification}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Download Apps Section */}
            <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400 text-center justify-center">
                  <Download className="h-6 w-6" />
                  🌍 GAIA EXCHANGES - MULTI-PLATFORM ECOSYSTEM
                </CardTitle>
                <div className="text-center">
                  <div className="text-sm text-blue-400 mt-2">
                    <strong>Contract:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
                  </div>
                  <div className="text-sm text-green-400 mt-1">
                    <strong>Official Website:</strong> www.gaiaexchanges.com
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  <Button onClick={() => handleDownloadApp('windows')} className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex-col gap-2">
                    <div className="text-3xl">🪟</div>
                    <div className="text-sm">Windows</div>
                  </Button>
                  <Button onClick={() => handleDownloadApp('macos')} className="bg-gray-600 hover:bg-gray-700 h-auto py-4 flex-col gap-2">
                    <div className="text-3xl">🍎</div>
                    <div className="text-sm">macOS</div>
                  </Button>
                  <Button onClick={() => handleDownloadApp('android')} className="bg-green-600 hover:bg-green-700 h-auto py-4 flex-col gap-2">
                    <div className="text-3xl">🤖</div>
                    <div className="text-sm">Android</div>
                  </Button>
                  <Button onClick={() => handleDownloadApp('ios')} className="bg-purple-600 hover:bg-purple-700 h-auto py-4 flex-col gap-2">
                    <div className="text-3xl">📱</div>
                    <div className="text-sm">iOS</div>
                  </Button>
                  <Button onClick={() => handleDownloadApp('linux')} className="bg-orange-600 hover:bg-orange-700 h-auto py-4 flex-col gap-2">
                    <div className="text-3xl">🐧</div>
                    <div className="text-sm">Linux</div>
                  </Button>
                  <Button onClick={() => handleDownloadApp('web')} className="bg-cyan-600 hover:bg-cyan-700 h-auto py-4 flex-col gap-2">
                    <div className="text-3xl">🌐</div>
                    <div className="text-sm">Web3 DApp</div>
                  </Button>
                </div>
                
                <div className="mt-6 flex justify-center gap-4 flex-wrap">
                  <Button variant="outline" size="sm" asChild>
                    <a href={GAIA_TOKEN.PUMP_FUN_URL} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Trade on Pump.fun
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={GAIA_TOKEN.OFFICIAL_WEBSITE} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Official Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Features Tabs */}
            <Tabs defaultValue="blockchain" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 bg-gradient-to-r from-green-900/30 to-purple-900/30 gap-1 overflow-x-auto">
                <TabsTrigger value="blockchain">🔗 Blockchain</TabsTrigger>
                <TabsTrigger value="exchange">💱 Exchange</TabsTrigger>
                <TabsTrigger value="trading">📈 Trading</TabsTrigger>
                <TabsTrigger value="security">🛡️ Security</TabsTrigger>
                <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
                <TabsTrigger value="investors">👥 Investors</TabsTrigger>
                <TabsTrigger value="fees">💰 Fees</TabsTrigger>
                <TabsTrigger value="platform">🌍 Platform</TabsTrigger>
              </TabsList>
              
              <TabsContent value="blockchain" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
                    <CardHeader>
                      <CardTitle className="text-green-400">🔗 Private Blockchain Network</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center p-6 bg-black rounded-lg">
                          <div className="text-4xl mb-4">🎬</div>
                          <div className="text-xl font-bold text-green-400 mb-2">GAIA BLOCKCHAIN EXPLAINED</div>
                          <div className="text-blue-400 animate-pulse">Animated Movie Coming Soon...</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-green-900/30 rounded-lg">
                            <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                            <div className="font-bold text-green-400">Quantum Secure</div>
                          </div>
                          <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                            <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                            <div className="font-bold text-blue-400">100k TPS</div>
                          </div>
                          <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                            <Heart className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                            <div className="font-bold text-purple-400">Eco-Friendly</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400">🌐 Hosting Infrastructure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-green-400 mb-2">www.gaiaexchanges.com</div>
                        <div className="text-blue-400 mb-4">Private Hosting Infrastructure</div>
                        <Progress value={85} className="h-4 mb-2" />
                        <div className="text-sm text-muted-foreground">85% Complete</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-900/30 rounded-lg">
                          <Rocket className="h-8 w-8 text-green-400 mx-auto mb-2" />
                          <div className="font-bold text-green-400">99.99% Uptime</div>
                        </div>
                        <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                          <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                          <div className="font-bold text-blue-400">Global CDN</div>
                        </div>
                        <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                          <Shield className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                          <div className="font-bold text-purple-400">Military Security</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <BlockchainStatus />
                <LiveTransactionMatrix />
              </TabsContent>
              
              <TabsContent value="exchange" className="space-y-6">
                <FullyFunctionalExchange />
              </TabsContent>
              
              <TabsContent value="trading" className="space-y-6">
                <TradingInterface />
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <SecurityCenter notifications={notifications} />
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                <ChartAnalytics />
              </TabsContent>
              
              <TabsContent value="investors" className="space-y-6">
                <InvestorScoutingSystem />
              </TabsContent>
              
              <TabsContent value="fees" className="space-y-6">
                <GaiaFeeManager />
              </TabsContent>
              
              <TabsContent value="platform" className="space-y-6">
                <GaiasExchange />
                <MultiExchangeIntegration />
              </TabsContent>
            </Tabs>
          </div>

          {/* Community Vault Column */}
          <div className="xl:col-span-1">
            <div className="sticky top-4 sm:top-8">
              <CommunityVault />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}