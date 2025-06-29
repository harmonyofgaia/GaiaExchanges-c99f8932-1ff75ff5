
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedGamingLayout } from '@/components/EnhancedGamingLayout'
import { EnhancedGamingModes } from '@/components/EnhancedGamingModes'
import { GamingNFTMarketplace } from '@/components/GamingNFTMarketplace'
import { GameIntroMovie } from '@/components/gaming/GameIntroMovie'
import { GameStatusIndicator } from '@/components/gaming/GameStatusIndicator'
import { useNavigate } from 'react-router-dom'
import { 
  Gamepad2, 
  Trophy, 
  Crown, 
  Zap, 
  Star,
  Play,
  Users,
  Target
} from 'lucide-react'

const Gaming = () => {
  const [showIntro, setShowIntro] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'arena' | 'modes' | 'marketplace'>('arena')
  const navigate = useNavigate()

  const handleStartIntro = () => {
    setShowIntro(true)
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
    // Could navigate to a specific game or show completion message
  }

  const handleSkipIntro = () => {
    setShowIntro(false)
  }

  const handlePlayGaiaFighter = () => {
    navigate('/gaia-fighter-game')
  }

  if (showIntro) {
    return (
      <GameIntroMovie 
        onComplete={handleIntroComplete}
        onSkip={handleSkipIntro}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-6 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            🎮 HARMONY GAMING HUB
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter the ultimate gaming experience powered by GAIA tokens. Train dragons, battle players worldwide, and earn rewards in our immersive gaming ecosystem.
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button onClick={handleStartIntro} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Play className="h-5 w-5 mr-2" />
              🎬 Watch Game Intro
            </Button>
            <Button onClick={handlePlayGaiaFighter} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
              <Target className="h-5 w-5 mr-2" />
              ⚔️ Play GAIA Fighter
            </Button>
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
              <Users className="h-5 w-5 mr-2" />
              👥 Join Tournament
            </Button>
          </div>
        </div>

        {/* Game Status */}
        <GameStatusIndicator />

        {/* Gaming Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
            <CardContent className="pt-6 text-center">
              <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-400">47,523</div>
              <div className="text-sm text-muted-foreground">Total Players</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50">
            <CardContent className="pt-6 text-center">
              <Zap className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-400">125K</div>
              <div className="text-sm text-muted-foreground">Battles Fought</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
            <CardContent className="pt-6 text-center">
              <Crown className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-400">15,420</div>
              <div className="text-sm text-muted-foreground">GAIA Burned</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50">
            <CardContent className="pt-6 text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-yellow-400">892</div>
              <div className="text-sm text-muted-foreground">Champions</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Card className="bg-gradient-to-br from-gray-900/50 to-blue-900/30 border-2 border-blue-500/50">
          <CardHeader>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setSelectedTab('arena')}
                className={`${
                  selectedTab === 'arena' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                🏟️ Gaming Arena
              </Button>
              <Button
                onClick={() => setSelectedTab('modes')}
                className={`${
                  selectedTab === 'modes' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Crown className="h-4 w-4 mr-2" />
                🎭 Game Modes
              </Button>
              <Button
                onClick={() => setSelectedTab('marketplace')}
                className={`${
                  selectedTab === 'marketplace' 
                    ? 'bg-gradient-to-r from-green-600 to-cyan-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Trophy className="h-4 w-4 mr-2" />
                🏪 NFT Marketplace
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedTab === 'arena' && <EnhancedGamingLayout />}
            {selectedTab === 'modes' && <EnhancedGamingModes />}
            {selectedTab === 'marketplace' && <GamingNFTMarketplace />}
          </CardContent>
        </Card>

        {/* Footer Info */}
        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-2">🌍 Environmental Gaming Impact</h3>
            <p className="text-muted-foreground mb-4">
              Every game played, every battle fought, and every token earned contributes to environmental restoration projects worldwide.
            </p>
            <div className="flex justify-center items-center gap-2 text-sm text-green-300">
              <span>🌱 Trees Planted: 2,847</span>
              <span>•</span>
              <span>🌊 Ocean Cleanup: 1,234kg</span>
              <span>•</span>
              <span>🔥 Carbon Offset: 5.6 tons</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Gaming
