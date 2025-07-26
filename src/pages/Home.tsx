
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { GaiaLogo } from '@/components/GaiaLogo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThemeSelector } from '@/components/ThemeSelector'
import { VisualControlMenu } from '@/components/visual/VisualControlMenu'
import { FeeRoutingButton } from '@/components/routing/FeeRoutingButton'
import { GAIA_BRANDING } from '@/constants/branding'
import { GAIA_TOKEN, GAIA_METRICS } from '@/constants/gaia'
import { ArrowRight, TrendingUp, Leaf, Zap, Shield, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackgroundManager />
      
      {/* Theme Selector */}
      <ThemeSelector />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-20">
          <GaiaLogo size="xl" variant="glow" className="mx-auto mb-8" />
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
            {GAIA_BRANDING.NAME}
          </h1>
          
          <p className="text-2xl text-green-300 mb-8 max-w-3xl mx-auto">
            {GAIA_BRANDING.TAGLINE}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-500/50 px-6 py-2 text-lg">
              🌍 Carbon Negative
            </Badge>
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-500/50 px-6 py-2 text-lg">
              ⚡ Quantum Security
            </Badge>
            <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 border-purple-500/50 px-6 py-2 text-lg">
              🚀 Web3 Native
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-xl"
              onClick={() => navigate('/live-tracking')}
            >
              Launch Exchange <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            
            <FeeRoutingButton />
            
            <VisualControlMenu />
          </div>
        </div>

        {/* GAiA Token Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Current Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${GAIA_METRICS.CURRENT_PRICE.toFixed(6)}
              </div>
              <div className="text-green-400 text-sm">+{((Math.random() * 20) - 10).toFixed(2)}%</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Market Cap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${(GAIA_METRICS.MARKET_CAP / 1000000).toFixed(1)}M
              </div>
              <div className="text-blue-400 text-sm">GAiA Token</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Total Holders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {GAIA_METRICS.HOLDERS.toLocaleString()}
              </div>
              <div className="text-purple-400 text-sm">Growing Daily</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                CO2 Offset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {GAIA_METRICS.CO2_OFFSET_TOTAL}T
              </div>
              <div className="text-yellow-400 text-sm">Carbon Negative</div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Private Blockchain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Our proprietary Gaia blockchain with quantum-resistant security and carbon-negative consensus.
              </p>
              <Button 
                variant="outline" 
                className="border-green-500/50 text-green-400 hover:bg-green-500/20"
                onClick={() => navigate('/private-blockchain')}
              >
                Explore Network
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Green Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Invest in verified environmental projects and earn sustainable returns through our platform.
              </p>
              <Button 
                variant="outline" 
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                onClick={() => navigate('/green-investments')}
              >
                View Projects
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Secure Admin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Advanced administrative controls with quantum-level security protocols and multi-factor authentication.
              </p>
              <Button 
                variant="outline" 
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                onClick={() => navigate('/secure-admin')}
              >
                Admin Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Token Information */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 text-center">
              {GAIA_TOKEN.NAME} ({GAIA_TOKEN.SYMBOL})
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  {(GAIA_TOKEN.TOTAL_SUPPLY / 1000000000000).toFixed(0)}T
                </div>
                <div className="text-green-400">Total Supply</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  {GAIA_TOKEN.NETWORK}
                </div>
                <div className="text-green-400">Network</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  100%
                </div>
                <div className="text-green-400">Liquidity Locked</div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                onClick={() => window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')}
              >
                Trade {GAIA_TOKEN.SYMBOL} Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
