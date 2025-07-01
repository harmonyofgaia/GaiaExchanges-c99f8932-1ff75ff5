
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, Heart, Zap, Users, Shield, Gamepad2, Video, Palette } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'
import { GAIA_TOKEN } from '@/constants/gaia'
import { AllFeaturesIntegrated } from '@/components/AllFeaturesIntegrated'
import { ComprehensiveSystemIntegration } from '@/components/ComprehensiveSystemIntegration'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
                🌍 Welcome to GAiA - Complete Ecosystem
              </CardTitle>
              <p className="text-center text-2xl text-muted-foreground">
                {GAIA_TOKEN.BRAND_STATEMENT}
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-green-600 text-lg px-6 py-2">Environmental Impact</Badge>
                  <Badge className="bg-blue-600 text-lg px-6 py-2">Gaming Ecosystem</Badge>
                  <Badge className="bg-purple-600 text-lg px-6 py-2">Trading Platform</Badge>
                  <Badge className="bg-orange-600 text-lg px-6 py-2">Media Streaming</Badge>
                  <Badge className="bg-cyan-600 text-lg px-6 py-2">World Creation</Badge>
                  <Badge className="bg-red-600 text-lg px-6 py-2">Quantum Defense</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <Link to="/game">
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-12 w-full">
                      <Gamepad2 className="h-5 w-5 mr-2" />
                      Ultimate Gaming
                    </Button>
                  </Link>
                  <Link to="/coin-crafter">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 w-full">
                      <Zap className="h-5 w-5 mr-2" />
                      Token Crafting
                    </Button>
                  </Link>
                  <Link to="/aura-land-scrapyard">
                    <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 h-12 w-full">
                      <Palette className="h-5 w-5 mr-2" />
                      World Creation
                    </Button>
                  </Link>
                  <Link to="/complete-system-hub">
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 h-12 w-full">
                      <Video className="h-5 w-5 mr-2" />
                      Media Streaming
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Features Integration */}
          <div className="mb-8">
            <AllFeaturesIntegrated />
          </div>

          {/* System Integration Status */}
          <div className="mb-8">
            <ComprehensiveSystemIntegration />
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Globe className="h-6 w-6" />
                  Environmental Revolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Every transaction contributes to real-world environmental restoration projects.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-green-300">• Tree planting initiatives</div>
                  <div className="text-sm text-green-300">• Ocean cleanup projects</div>
                  <div className="text-sm text-green-300">• Wildlife protection programs</div>
                  <div className="text-sm text-green-300">• Carbon offset tracking</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Gamepad2 className="h-6 w-6" />
                  Ultimate Gaming Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Revolutionary games with real environmental impact and token rewards.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-blue-300">• Gaia Fighter Game Pro</div>
                  <div className="text-sm text-blue-300">• Habbo Tycoon simulation</div>
                  <div className="text-sm text-blue-300">• VR world integration</div>
                  <div className="text-sm text-blue-300">• Tournament competitions</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Shield className="h-6 w-6" />
                  Quantum Defense System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Unbreakable security protocols protect your assets and transactions.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-purple-300">• Universal quantum protection</div>
                  <div className="text-sm text-purple-300">• Satellite network security</div>
                  <div className="text-sm text-purple-300">• Self-evolving algorithms</div>
                  <div className="text-sm text-purple-300">• Galaxy-wide monitoring</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Heart className="h-6 w-6" />
                  Community Powered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join a global community united in environmental restoration and innovation.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-orange-300">• Global collaboration</div>
                  <div className="text-sm text-orange-300">• Community rewards</div>
                  <div className="text-sm text-orange-300">• Shared achievements</div>
                  <div className="text-sm text-orange-300">• Collective impact</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Zap className="h-6 w-6" />
                  Instant Rewards & Trading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Earn GAiA tokens instantly through various platform activities and trade seamlessly.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-cyan-300">• Real-time trading platform</div>
                  <div className="text-sm text-cyan-300">• Multi-exchange integration</div>
                  <div className="text-sm text-cyan-300">• Automated trading bots</div>
                  <div className="text-sm text-cyan-300">• Portfolio management</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pink-500/30 bg-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-400">
                  <Users className="h-6 w-6" />
                  Global Media Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Stream, create, and share content while earning rewards and building community.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-pink-300">• Live streaming platform</div>
                  <div className="text-sm text-pink-300">• Content monetization</div>
                  <div className="text-sm text-pink-300">• Creator rewards program</div>
                  <div className="text-sm text-pink-300">• Global audience reach</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ultimate Statement */}
          <Card className="bg-gradient-to-r from-gold-900/20 to-purple-900/20 border-gold-500/30">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-gold-400">
                🌟 A Plan That Humanity Will Never Forget
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-xl text-gold-200 leading-relaxed">
                This platform represents the convergence of every innovative idea, every feature, 
                and every vision we have created together. It's not just a system - it's a 
                <strong> DIGITAL REVOLUTION</strong> that will change how humanity interacts 
                with technology, the environment, and each other.
              </p>
              <div className="text-lg text-gold-300 font-semibold">
                "Seeds Will Form Into Music" - Our Vision Fully Realized
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
