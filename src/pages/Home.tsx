
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, Heart, Zap, Users, Shield, Gamepad2, Wallet, Eye, Image } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'
import { GAIA_TOKEN } from '@/constants/gaia'
import { WalletConnectionModal } from '@/components/wallet/WalletConnectionModal'
import { SitePreviewModal } from '@/components/ui/SitePreviewModal'

const Home = () => {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
                🌍 Welcome to GAiA
              </CardTitle>
              <p className="text-center text-2xl text-muted-foreground">
                {GAIA_TOKEN.BRAND_STATEMENT}
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <Badge className="bg-green-600 text-lg px-6 py-2">
                  Official GAiA Token Platform
                </Badge>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Button 
                    onClick={() => setShowWalletModal(true)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-12"
                  >
                    <Wallet className="h-5 w-5 mr-2" />
                    Connect Wallet
                  </Button>
                  <Button 
                    onClick={() => setShowPreviewModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12"
                  >
                    <Image className="h-5 w-5 mr-2" />
                    Preview Site
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 h-12">
                    <Gamepad2 className="h-5 w-5 mr-2" />
                    Start Gaming
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Globe className="h-6 w-6" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every transaction contributes to real-world environmental restoration projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Gamepad2 className="h-6 w-6" />
                  Gaming Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Play games, earn tokens, and compete in tournaments while helping the planet.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Shield className="h-6 w-6" />
                  Quantum Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced quantum-level security protocols protect your assets and transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Heart className="h-6 w-6" />
                  Community Driven
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join a global community united in environmental restoration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Zap className="h-6 w-6" />
                  Instant Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn GAiA tokens instantly through various platform activities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-500/30 bg-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-400">
                  <Users className="h-6 w-6" />
                  Global Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with like-minded individuals from around the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <WalletConnectionModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
      
      <SitePreviewModal 
        isOpen={showPreviewModal} 
        onClose={() => setShowPreviewModal(false)} 
      />
    </div>
  )
}

export default Home
