
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Wallet, 
  Gamepad2, 
  TrendingUp, 
  Shield, 
  Zap,
  Globe,
  Heart,
  Leaf
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice } from '@/constants/gaia'
import HoverSidebar from '@/components/HoverSidebar'

const Home = () => {
  const [currentPrice, setCurrentPrice] = useState(GAIA_TOKEN.INITIAL_PRICE)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.000005
        return Math.max(0.00001, prev + change)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
                🌍 HARMONY OF GAIA
              </CardTitle>
              <p className="text-center text-2xl text-muted-foreground">
                {GAIA_TOKEN.BRAND_STATEMENT}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{formatGaiaPrice(currentPrice)}</div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                </div>
                <div className="p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{GAIA_METRICS.holders.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Holders</div>
                </div>
                <div className="p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">${(GAIA_METRICS.marketCap / 1000000).toFixed(2)}M</div>
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                </div>
                <div className="p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{(GAIA_METRICS.burnedTokens / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Burned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link to="/wallet">
              <Card className="border-green-500/30 bg-green-900/20 hover:bg-green-900/30 transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">GAiA Wallet</p>
                      <p className="text-xl font-bold text-green-400">Secure Storage</p>
                    </div>
                    <Wallet className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/gaming">
              <Card className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Gaming Universe</p>
                      <p className="text-xl font-bold text-purple-400">Play & Earn</p>
                    </div>
                    <Gamepad2 className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/exchange">
              <Card className="border-blue-500/30 bg-blue-900/20 hover:bg-blue-900/30 transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">GAiA Exchange</p>
                      <p className="text-xl font-bold text-blue-400">Trade Now</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin">
              <Card className="border-red-500/30 bg-red-900/20 hover:bg-red-900/30 transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Admin Panel</p>
                      <p className="text-xl font-bold text-red-400">Full Control</p>
                    </div>
                    <Shield className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Globe className="h-6 w-6" />
                  Global Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Environmental restoration through gaming and blockchain technology.
                </p>
                <Progress value={87} className="h-2" />
                <p className="text-sm text-cyan-400 mt-2">87% of fees go to environmental projects</p>
              </CardContent>
            </Card>

            <Card className="border-pink-500/30 bg-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-400">
                  <Heart className="h-6 w-6" />
                  Community First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Building a sustainable future through community-driven initiatives.
                </p>
                <Badge className="bg-pink-600">15,247 Active Members</Badge>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/30 bg-emerald-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Leaf className="h-6 w-6" />
                  Eco Gaming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Every game session contributes to real-world environmental restoration.
                </p>
                <Badge className="bg-emerald-600">152M Trees Planted</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
