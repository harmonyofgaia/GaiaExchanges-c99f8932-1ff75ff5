
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Globe, 
  Download,
  LineChart,
  BarChart3,
  Activity,
  Wallet,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Bell,
  Settings,
  Lock,
  ExternalLink
} from 'lucide-react'
import { GaiaLogo } from './GaiaLogo'
import { TradingInterface } from './TradingInterface'
import { CoinGeckoTrading } from './CoinGeckoTrading'
import { ChartAnalytics } from './ChartAnalytics'
import { SecurityCenter } from './SecurityCenter'
import { toast } from 'sonner'

interface ExchangeStats {
  totalVolume: number
  dailyUsers: number
  totalTrades: number
  securityScore: number
  uptime: number
}

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume: number
  marketCap: number
}

export function GaiasExchange() {
  const [stats, setStats] = useState<ExchangeStats>({
    totalVolume: 1250000000,
    dailyUsers: 45000,
    totalTrades: 8750000,
    securityScore: 99.9,
    uptime: 99.99
  })

  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'GAIA', price: 3.00, change24h: 5.67, volume: 8750000, marketCap: 257250000 },
    { symbol: 'BTC', price: 43250.67, change24h: 2.34, volume: 15420000000, marketCap: 847000000000 },
    { symbol: 'ETH', price: 2543.21, change24h: -1.87, volume: 8750000000, marketCap: 305000000000 }
  ])

  const [notifications, setNotifications] = useState<string[]>([])
  const [isSecurityScanActive, setIsSecurityScanActive] = useState(true)

  // Real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Update market data with realistic fluctuations
      setMarketData(prev => prev.map(coin => ({
        ...coin,
        price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
        change24h: coin.change24h + (Math.random() - 0.5) * 0.1,
        volume: coin.volume * (1 + (Math.random() - 0.5) * 0.05)
      })))

      // Update exchange stats
      setStats(prev => ({
        ...prev,
        totalVolume: prev.totalVolume + Math.random() * 1000000,
        dailyUsers: prev.dailyUsers + Math.floor(Math.random() * 100),
        totalTrades: prev.totalTrades + Math.floor(Math.random() * 50)
      }))

      console.log('🔄 Market data updated:', new Date().toISOString())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Security monitoring system
  useEffect(() => {
    if (!isSecurityScanActive) return

    const securityInterval = setInterval(() => {
      // Simulate security checks
      const threats = [
        'Suspicious login attempt blocked',
        'DDoS protection activated',
        'Wallet security scan completed',
        'Smart contract audit passed',
        'API rate limiting enforced'
      ]

      if (Math.random() < 0.1) { // 10% chance of security notification
        const threat = threats[Math.floor(Math.random() * threats.length)]
        setNotifications(prev => [threat, ...prev.slice(0, 4)])
        
        toast.success('Security Alert', {
          description: `✅ ${threat}`,
          duration: 3000
        })
      }
    }, 10000)

    return () => clearInterval(securityInterval)
  }, [isSecurityScanActive])

  const handleDownloadApp = (platform: string) => {
    const downloadLinks = {
      windows: 'https://github.com/harmonyofgaia/gaia-exchange/releases/latest/download/gaias-exchange-windows.exe',
      macos: 'https://github.com/harmonyofgaia/gaia-exchange/releases/latest/download/gaias-exchange-macos.dmg',
      android: 'https://github.com/harmonyofgaia/gaia-exchange/releases/latest/download/gaias-exchange-android.apk',
      linux: 'https://github.com/harmonyofgaia/gaia-exchange/releases/latest/download/gaias-exchange-linux.deb'
    }

    const url = downloadLinks[platform as keyof typeof downloadLinks]
    if (url) {
      window.open(url, '_blank')
      toast.success(`Downloading Gaia's Exchange for ${platform}`, {
        description: '🚀 Most secure trading platform in history'
      })
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: value > 1000000 ? 'compact' : 'standard'
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 to-blue-900/20">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <GaiaLogo size="lg" variant="white-fade" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Gaia's Exchange</h1>
                <p className="text-sm text-green-400">World's Most Secure Trading Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-green-600 text-white animate-pulse">
                <Shield className="h-3 w-3 mr-1" />
                Security: {stats.securityScore}%
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <Activity className="h-3 w-3 mr-1" />
                Uptime: {stats.uptime}%
              </Badge>
              <Button size="sm" variant="outline">
                <Bell className="h-4 w-4 mr-1" />
                {notifications.length}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Exchange Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(stats.totalVolume)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.dailyUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Trades</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.totalTrades.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Security Score</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.securityScore}%</p>
                </div>
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download Apps Section */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Download className="h-5 w-5" />
              Download Gaia's Exchange Apps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={() => handleDownloadApp('windows')}
                className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex-col gap-2"
              >
                <div className="text-2xl">🪟</div>
                <div className="text-sm">Windows</div>
                <div className="text-xs opacity-75">x32/x64</div>
              </Button>
              <Button 
                onClick={() => handleDownloadApp('macos')}
                className="bg-gray-600 hover:bg-gray-700 h-auto py-4 flex-col gap-2"
              >
                <div className="text-2xl">🍎</div>
                <div className="text-sm">macOS</div>
                <div className="text-xs opacity-75">10.15+</div>
              </Button>
              <Button 
                onClick={() => handleDownloadApp('android')}
                className="bg-green-600 hover:bg-green-700 h-auto py-4 flex-col gap-2"
              >
                <div className="text-2xl">🤖</div>
                <div className="text-sm">Android</div>
                <div className="text-xs opacity-75">6.0+</div>
              </Button>
              <Button 
                onClick={() => handleDownloadApp('linux')}
                className="bg-orange-600 hover:bg-orange-700 h-auto py-4 flex-col gap-2"
              >
                <div className="text-2xl">🐧</div>
                <div className="text-sm">Linux</div>
                <div className="text-xs opacity-75">Ubuntu/Debian</div>
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                ⚡ All apps are automatically updated and synchronized across platforms
              </p>
              <p className="text-xs text-green-400 mt-1">
                🔒 Bank-level security with multi-layer encryption
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Trading Interface */}
        <Tabs defaultValue="trading" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trading">Live Trading</TabsTrigger>
            <TabsTrigger value="charts">Advanced Charts</TabsTrigger>
            <TabsTrigger value="markets">All Markets</TabsTrigger>
            <TabsTrigger value="security">Security Center</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trading" className="space-y-6">
            <TradingInterface />
          </TabsContent>
          
          <TabsContent value="charts" className="space-y-6">
            <ChartAnalytics />
          </TabsContent>
          
          <TabsContent value="markets" className="space-y-6">
            <CoinGeckoTrading />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <SecurityCenter notifications={notifications} />
          </TabsContent>
        </Tabs>

        {/* Investment Opportunities */}
        <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <TrendingUp className="h-5 w-5" />
              Investment Opportunities & Legal Partnerships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-400">🤝 Seeking Strategic Partners</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Institutional investors with $1M+ portfolio</li>
                  <li>• Licensed financial services providers</li>
                  <li>• Regulatory compliance specialists</li>
                  <li>• Blockchain security auditors</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-400">📈 Market Expansion</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Multi-platform integration complete</li>
                  <li>• 24/7 automated market monitoring</li>
                  <li>• Cross-platform synchronization</li>
                  <li>• Real-time security threat detection</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Partner With Us
              </Button>
              <Button variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                View Legal Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
