import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { GlowingText } from '@/components/ui/glowing-text'

// Import all the new gaming components
import { BattleRoyaleMode } from '@/components/gaming/BattleRoyaleMode'
import { AIFighterCompanion } from '@/components/gaming/AIFighterCompanion'
import { TournamentSystem } from '@/components/gaming/TournamentSystem'
import { RealWorldImpactTracker } from '@/components/gaming/RealWorldImpactTracker'
import { QuickActionBar } from '@/components/gaming/QuickActionBar'

// Keep existing components
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
  Target,
  Brain,
  Globe,
  Heart,
  Rocket,
  Flame
} from 'lucide-react'

const Gaming = () => {
  const [showIntro, setShowIntro] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'arena' | 'battle-royale' | 'tournaments' | 'ai-companion' | 'impact' | 'modes' | 'marketplace'>('arena')
  const navigate = useNavigate()

  const handleStartIntro = () => {
    setShowIntro(true)
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
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
      {/* Quick Action Bar */}
      <QuickActionBar />
      
      <div className="container mx-auto px-4 py-6 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            🎮 HARMONY GAMING HUB
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The ultimate gaming experience powered by GAIA tokens. Battle worldwide, earn rewards, and heal the planet through revolutionary gameplay.
          </p>
          
          {/* Revolutionary Gaming Statement */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg text-purple-300 mb-2">
              "Will bark its way true barriers of many projects and will rise and shine in an{' '}
              <GlowingText 
                text="OPEN MINDED SPACE" 
                glowColor="rgb(34, 197, 94)"
                className="font-bold text-xl"
              />
              "
            </p>
            <div className="text-sm text-cyan-300 mt-4 border-t border-cyan-500/20 pt-4">
              🚀 <strong>The gaming revolution is complete!</strong> Your platform now offers experiences that no other gaming platform can match. 
              We stay ahead by monitoring all gaming platforms daily, making our system better, faster, and stronger - 
              creating gaming for a whole new era! 🌟
            </div>
          </div>
          
          {/* Enhanced Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button onClick={handleStartIntro} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Play className="h-5 w-5 mr-2" />
              🎬 Watch Game Intro
            </Button>
            <Button onClick={handlePlayGaiaFighter} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
              <Target className="h-5 w-5 mr-2" />
              ⚔️ Play GAIA Fighter
            </Button>
            <Button 
              onClick={() => setSelectedTab('battle-royale')}
              className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700"
            >
              <Crown className="h-5 w-5 mr-2" />
              👑 Battle Royale (100 Players)
            </Button>
            <Button 
              onClick={() => setSelectedTab('ai-companion')}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
            >
              <Brain className="h-5 w-5 mr-2" />
              🤖 AI Companion
            </Button>
          </div>
        </div>

        {/* Game Status */}
        <GameStatusIndicator />

        {/* Gaming Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
            <CardContent className="pt-6 text-center">
              <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-400">47,523</div>
              <div className="text-sm text-muted-foreground">Total Players</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50">
            <CardContent className="pt-6 text-center">
              <Flame className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-400">125K</div>
              <div className="text-sm text-muted-foreground">Battles Fought</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
            <CardContent className="pt-6 text-center">
              <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-400">15,420</div>
              <div className="text-sm text-muted-foreground">GAIA for Environment</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50">
            <CardContent className="pt-6 text-center">
              <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-yellow-400">892</div>
              <div className="text-sm text-muted-foreground">Champions</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50">
            <CardContent className="pt-6 text-center">
              <Globe className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-cyan-400">15,847</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Navigation Tabs */}
        <Card className="bg-gradient-to-br from-gray-900/50 to-blue-900/30 border-2 border-blue-500/50">
          <CardHeader>
            <div className="flex flex-wrap justify-center gap-2">
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
                onClick={() => setSelectedTab('battle-royale')}
                className={`${
                  selectedTab === 'battle-royale' 
                    ? 'bg-gradient-to-r from-red-600 to-orange-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Crown className="h-4 w-4 mr-2" />
                👑 Battle Royale
                <Badge className="ml-2 bg-red-600 text-white animate-pulse">NEW</Badge>
              </Button>
              <Button
                onClick={() => setSelectedTab('tournaments')}
                className={`${
                  selectedTab === 'tournaments' 
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Trophy className="h-4 w-4 mr-2" />
                🏆 Tournaments
                <Badge className="ml-2 bg-yellow-600 text-white">15 Live</Badge>
              </Button>
              <Button
                onClick={() => setSelectedTab('ai-companion')}
                className={`${
                  selectedTab === 'ai-companion' 
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Brain className="h-4 w-4 mr-2" />
                🤖 AI Companion
                <Badge className="ml-2 bg-purple-600 text-white animate-pulse">AI</Badge>
              </Button>
              <Button
                onClick={() => setSelectedTab('impact')}
                className={`${
                  selectedTab === 'impact' 
                    ? 'bg-gradient-to-r from-green-600 to-blue-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Globe className="h-4 w-4 mr-2" />
                🌍 Impact Tracker
              </Button>
              <Button
                onClick={() => setSelectedTab('modes')}
                className={`${
                  selectedTab === 'modes' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Zap className="h-4 w-4 mr-2" />
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
                <Star className="h-4 w-4 mr-2" />
                🏪 NFT Marketplace
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedTab === 'arena' && <EnhancedGamingLayout />}
            {selectedTab === 'battle-royale' && <BattleRoyaleMode />}
            {selectedTab === 'tournaments' && <TournamentSystem />}
            {selectedTab === 'ai-companion' && <AIFighterCompanion />}
            {selectedTab === 'impact' && <RealWorldImpactTracker />}
            {selectedTab === 'modes' && <EnhancedGamingModes />}
            {selectedTab === 'marketplace' && <GamingNFTMarketplace />}
          </CardContent>
        </Card>

        {/* Revolutionary Gaming Features */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold text-purple-400 mb-4">
              🚀 REVOLUTIONARY GAMING FEATURES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-red-900/30 rounded border border-red-500/20">
                <Crown className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-red-400">Battle Royale 100</div>
                <div className="text-sm text-muted-foreground">Ultimate survival combat</div>
              </div>
              <div className="p-4 bg-cyan-900/30 rounded border border-cyan-500/20">
                <Brain className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-cyan-400">AI Companion</div>
                <div className="text-sm text-muted-foreground">Personal fighting coach</div>
              </div>
              <div className="p-4 bg-green-900/30 rounded border border-green-500/20">
                <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-green-400">Real World Impact</div>
                <div className="text-sm text-muted-foreground">Gaming heals the planet</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              Experience the future of gaming where every action creates real environmental change, 
              AI companions learn from your style, and 100-player battles test ultimate survival skills.
            </p>
            <div className="flex justify-center items-center gap-2 text-sm text-green-300">
              <Rocket className="h-4 w-4" />
              <span>🎵 "Seeds Will Form Into Music" - Revolutionary Gaming Evolution! 🎵</span>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info - Enhanced Environmental Gaming Impact */}
        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-2">🌍 Environmental Gaming Revolution</h3>
            <p className="text-muted-foreground mb-4">
              Every battle fought, every tournament won, and every token earned contributes to massive environmental restoration projects worldwide.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-green-300">
                <Heart className="h-4 w-4 inline mr-1" />
                🌱 Trees Planted: 15,847
              </div>
              <div className="text-blue-300">
                <Globe className="h-4 w-4 inline mr-1" />
                🌊 Ocean Cleanup: 12,450kg
              </div>
              <div className="text-orange-300">
                <Flame className="h-4 w-4 inline mr-1" />
                🔥 Carbon Offset: 2,847 tons
              </div>
              <div className="text-purple-300">
                <Star className="h-4 w-4 inline mr-1" />
                🦋 Animals Protected: 892
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Gaming
