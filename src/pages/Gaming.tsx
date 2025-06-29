
import { EnhancedGamingModes } from '@/components/EnhancedGamingModes'
import { LiveAnimalNFTs } from '@/components/LiveAnimalNFTs'
import { SnakeWormsIntegration } from '@/components/SnakeWormsIntegration'
import { GlobalAnnouncement } from '@/components/GlobalAnnouncement'
import { EnhancedAnimatedBackground } from '@/components/ui/enhanced-animated-background'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  Trophy,
  Users,
  Zap,
  Flame,
  Crown,
  Shield,
  Star
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { GAIA_TOKEN } from '@/constants/gaia'

const Gaming = () => {
  return (
    <div className="min-h-screen relative">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <GlobalAnnouncement />
        
        {/* Gaming Header */}
        <Card className="mb-12 border-4 border-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-gradient-to-br from-purple-900/30 to-red-900/30">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              🎮 HARMONY OF GAIA GAMING ARENA
            </CardTitle>
            <p className="text-center text-2xl text-muted-foreground">
              Epic battles, environmental impact, and GAiA token rewards
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
                <Trophy className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-yellow-400">∞</div>
                <div className="text-sm text-muted-foreground">Tournaments</div>
              </div>
              <div className="p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
                <Users className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="text-2xl font-bold text-green-400">87K+</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </div>
              <div className="p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
                <Flame className="h-8 w-8 mx-auto text-orange-400 mb-2" />
                <div className="text-2xl font-bold text-orange-400">2.5M</div>
                <div className="text-sm text-muted-foreground">Tokens Burned</div>
              </div>
              <div className="p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
                <Crown className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-sm text-muted-foreground">Dragon Protected</div>
              </div>
            </div>
            
            <div className="mt-6 text-center space-y-2">
              <div className="text-sm text-green-400">
                <strong>GAiA Contract:</strong> <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <div className="text-sm text-blue-400">
                <strong>Wallet:</strong> <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">{GAIA_TOKEN.WALLET_ADDRESS}</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/gaia-fighter-game">
            <Card className="border-2 border-red-500/50 hover:border-red-500 transition-all hover:scale-105 cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="text-6xl mb-4">⚔️</div>
                <h3 className="text-xl font-bold text-red-400 mb-2">GAiA Fighter</h3>
                <p className="text-muted-foreground">Epic battle arena with environmental warriors</p>
                <Badge className="bg-red-600 text-white mt-2">
                  <Zap className="h-3 w-3 mr-1" />
                  Play Now
                </Badge>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/artist-streaming">
            <Card className="border-2 border-purple-500/50 hover:border-purple-500 transition-all hover:scale-105 cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">Artist Streaming</h3>
                <p className="text-muted-foreground">Live shows and creative content</p>
                <Badge className="bg-purple-600 text-white mt-2">
                  <Star className="h-3 w-3 mr-1" />
                  Stream Live
                </Badge>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/virtual-world">
            <Card className="border-2 border-green-500/50 hover:border-green-500 transition-all hover:scale-105 cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Virtual World</h3>
                <p className="text-muted-foreground">Explore infinite GAiA landscapes</p>
                <Badge className="bg-green-600 text-white mt-2">
                  <Shield className="h-3 w-3 mr-1" />
                  Explore
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Gaming Components */}
        <div className="space-y-12">
          <EnhancedGamingModes />
          <LiveAnimalNFTs />
          <SnakeWormsIntegration />
        </div>
      </div>
    </div>
  )
}

export default Gaming
