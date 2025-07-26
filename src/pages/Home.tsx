
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

        {/* Our Mission Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-green-400 mb-4 flex items-center justify-center gap-3">
                <Globe className="h-8 w-8" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Gaia Exchanges is pioneering the future of sustainable Web3 technology. We create a harmonious ecosystem 
                where environmental consciousness meets cutting-edge blockchain innovation, empowering communities to build 
                a greener, more equitable digital world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                    <Leaf className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Environmental Stewardship</h3>
                  <p className="text-gray-400 text-sm text-center">
                    Every transaction contributes to carbon offset and environmental restoration projects worldwide.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                    <Zap className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Technological Innovation</h3>
                  <p className="text-gray-400 text-sm text-center">
                    Quantum-resistant security and next-generation blockchain infrastructure for the future.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                    <Shield className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Community Empowerment</h3>
                  <p className="text-gray-400 text-sm text-center">
                    Democratizing access to sustainable finance and environmental project funding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                Quantum Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Military-grade quantum-resistant encryption and multi-layer security protocols protecting your digital assets.
              </p>
              <Button 
                variant="outline" 
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
                onClick={() => navigate('/security')}
              >
                Security Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Projects Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              Current Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our active environmental and technological initiatives making a real-world impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Leaf className="h-6 w-6" />
                  Seed Splitter Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Global seed distribution network promoting biodiversity and sustainable agriculture through community partnerships.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-500/50">
                    Agriculture & Biodiversity
                  </Badge>
                  <span className="text-green-400 text-sm font-semibold">Active</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  Railing Energy System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Revolutionary railway-based renewable energy generation system transforming transportation infrastructure.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-500/50">
                    Renewable Energy
                  </Badge>
                  <span className="text-blue-400 text-sm font-semibold">Development</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Globe className="h-6 w-6" />
                  Ocean Restoration Initiative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Comprehensive marine ecosystem restoration using advanced biotechnology and AI-driven monitoring systems.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 border-purple-500/50">
                    Marine Conservation
                  </Badge>
                  <span className="text-purple-400 text-sm font-semibold">Pilot Phase</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-green-500/50 text-green-400 hover:bg-green-500/20"
              onClick={() => navigate('/green-investments')}
            >
              Explore All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Upcoming Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Upcoming Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The future of Gaia Exchanges - innovative features coming soon to revolutionize sustainable Web3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  AI-Powered Eco Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Advanced AI system for real-time environmental impact analysis and optimization recommendations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Carbon footprint prediction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Smart project recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Impact visualization dashboard</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-300 border-cyan-500/50">
                    {getCurrentQuarterAndYear()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Globe className="h-6 w-6" />
                  Cross-Chain Bridge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Seamless interoperability between major blockchains with our quantum-secure bridge technology.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Ethereum & Polygon support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Lightning-fast transactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Zero-knowledge proofs</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 border-purple-500/50">
                    {getCurrentQuarterAndYear()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Leaf className="h-6 w-6" />
                  Carbon Credit Marketplace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Decentralized marketplace for verified carbon credits with transparent tracking and automated offsetting.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Verified credit sourcing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Automated offset matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Impact transparency</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-500/50">
                    {getNextQuarter()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Quantum Security Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Next-generation quantum-resistant encryption protecting your assets against future quantum computing threats.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Post-quantum cryptography</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Hardware security modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Biometric authentication</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary" className="bg-yellow-900/50 text-yellow-300 border-yellow-500/50">
                    {getCurrentQuarterAndYear()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Environmental Impact Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Environmental Impact
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable change for our planet - tracking our collective environmental contribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center gap-2 text-lg">
                  <Leaf className="h-5 w-5" />
                  Trees Planted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  50,000+
                </div>
                <div className="text-green-400 text-sm">Across 15 countries</div>
                <div className="mt-2 text-xs text-gray-400">
                  Each transaction plants a tree
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-400 flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5" />
                  Ocean Cleanup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  25 tons
                </div>
                <div className="text-blue-400 text-sm">Plastic removed</div>
                <div className="mt-2 text-xs text-gray-400">
                  Marine ecosystem restoration
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-400 flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5" />
                  Renewable Energy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  1.2 MW
                </div>
                <div className="text-purple-400 text-sm">Solar capacity funded</div>
                <div className="mt-2 text-xs text-gray-400">
                  Clean energy projects
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-900/30 to-green-900/30 border-teal-500/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-teal-400 flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5" />
                  Wildlife Protected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  5,000
                </div>
                <div className="text-teal-400 text-sm">Hectares preserved</div>
                <div className="mt-2 text-xs text-gray-400">
                  Biodiversity conservation
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400 text-center flex items-center justify-center gap-3">
                <Globe className="h-8 w-8" />
                Our Commitment to Planet Earth
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-300 mb-6 max-w-4xl mx-auto">
                Every transaction on Gaia Exchanges contributes to verified environmental projects. We're not just carbon neutral - 
                we're carbon negative, actively removing CO2 from the atmosphere while building the future of sustainable finance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-sm text-gray-400">Carbon Negative Operations</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Environmental Monitoring</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">∞</div>
                  <div className="text-sm text-gray-400">Commitment to Sustainability</div>
                </div>
              </div>
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
