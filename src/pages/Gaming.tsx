
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Shield, 
  Zap, 
  Star,
  Sword,
  Crown,
  Target,
  Flame,
  TreePine,
  Mountain,
  Waves,
  MessageCircle,
  Globe
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { EnhancedGamingLayout } from '@/components/EnhancedGamingLayout'
import { GamingNFTMarketplace } from '@/components/GamingNFTMarketplace'
import { VirtualWorldCanvas } from '@/components/virtualworld/VirtualWorldCanvas'
import { GameChatSystem } from '@/components/virtualworld/GameChatSystem'
import { LandscapeMarketplace } from '@/components/virtualworld/LandscapeMarketplace'
import { WormsGameArena } from '@/components/WormsGameArena'
import { QuantumEvolutionMonitor } from '@/components/security/QuantumEvolutionMonitor'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

const Gaming = () => {
  const [activeTab, setActiveTab] = useState<string>('arena')
  const [currentLandscape, setCurrentLandscape] = useState<string>('🌊 Ocean Paradise')
  const [activeUsers] = useState<number>(1847)
  const [playerStats, setPlayerStats] = useState({
    level: 47,
    experience: 2847,
    nextLevelExp: 3500,
    gaiaPower: 1250,
    landscapesOwned: 8,
    battlesWon: 156,
    battlesTotal: 203,
    tokensEarned: 15420,
    environmentalImpact: 847
  })

  const handleQuickBattle = () => {
    toast.success('🥊 Battle Started!', {
      description: 'Entering quick battle arena with GAIA power boost',
      duration: 3000
    })
  }

  const handleJoinTournament = () => {
    toast.success('🏆 Tournament Registration', {
      description: 'You have been registered for the next GAIA tournament',
      duration: 3000
    })
  }

  const handleLandscapeChange = (landscape: string) => {
    setCurrentLandscape(landscape)
    toast.success('🌍 Landscape Changed!', {
      description: `Now exploring: ${landscape}`,
      duration: 2000
    })
  }

  const handleLandscapePurchase = (landscape: string) => {
    setPlayerStats(prev => ({
      ...prev,
      landscapesOwned: prev.landscapesOwned + 1,
      tokensEarned: prev.tokensEarned - 50,
      environmentalImpact: prev.environmentalImpact + 25
    }))
    toast.success('🛒 Landscape Purchased!', {
      description: `${landscape} added to your collection!`,
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            🎮 GAIA GAMING METAVERSE
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Epic gaming experiences with dragon-powered security, virtual worlds, and GAIA token rewards
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 max-w-2xl mx-auto mb-6">
            <div className="text-sm text-green-400">
              <strong>Powered by GAIA:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
            </div>
            <div className="text-sm text-blue-400 mt-1">
              <strong>Wallet:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.WALLET_ADDRESS}</code>
            </div>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-purple-600 text-white">
              <Shield className="h-3 w-3 mr-1" />
              Dragon Protected
            </Badge>
            <Badge className="bg-blue-600 text-white">
              <Zap className="h-3 w-3 mr-1" />
              Real-time Gaming
            </Badge>
            <Badge className="bg-green-600 text-white">
              <Users className="h-3 w-3 mr-1" />
              {activeUsers} Players Online
            </Badge>
            <Badge className="bg-orange-600 text-white">
              <Globe className="h-3 w-3 mr-1" />
              Virtual Worlds
            </Badge>
          </div>
        </div>

        {/* Player Stats Dashboard */}
        <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Crown className="h-6 w-6" />
              Player Dashboard - Harmony Warrior
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{playerStats.level}</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{playerStats.gaiaPower}</div>
                <div className="text-sm text-muted-foreground">GAIA Power</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{playerStats.landscapesOwned}</div>
                <div className="text-sm text-muted-foreground">Landscapes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{playerStats.tokensEarned}</div>
                <div className="text-sm text-muted-foreground">Tokens Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{Math.round((playerStats.battlesWon / playerStats.battlesTotal) * 100)}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Experience Progress</span>
                <span>{playerStats.experience} / {playerStats.nextLevelExp}</span>
              </div>
              <Progress value={(playerStats.experience / playerStats.nextLevelExp) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Dragon Evolution Monitor */}
        <div className="mb-8">
          <QuantumEvolutionMonitor />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'arena' ? 'default' : 'outline'}
            onClick={() => setActiveTab('arena')}
            className={activeTab === 'arena' ? 'bg-purple-600' : ''}
          >
            <Gamepad2 className="h-4 w-4 mr-2" />
            Gaming Arena
          </Button>
          <Button
            variant={activeTab === 'virtualworld' ? 'default' : 'outline'}
            onClick={() => setActiveTab('virtualworld')}
            className={activeTab === 'virtualworld' ? 'bg-green-600' : ''}
          >
            <Globe className="h-4 w-4 mr-2" />
            Virtual World
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'default' : 'outline'}
            onClick={() => setActiveTab('chat')}
            className={activeTab === 'chat' ? 'bg-blue-600' : ''}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Live Chat
          </Button>
          <Button
            variant={activeTab === 'games' ? 'default' : 'outline'}
            onClick={() => setActiveTab('games')}
            className={activeTab === 'games' ? 'bg-red-600' : ''}
          >
            <Target className="h-4 w-4 mr-2" />
            Classic Games
          </Button>
          <Button
            variant={activeTab === 'marketplace' ? 'default' : 'outline'}
            onClick={() => setActiveTab('marketplace')}
            className={activeTab === 'marketplace' ? 'bg-orange-600' : ''}
          >
            <Star className="h-4 w-4 mr-2" />
            NFT Marketplace
          </Button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'arena' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-purple-500/30 bg-purple-900/20 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Gamepad2 className="h-6 w-6" />
                  🥊 Gaia Fighter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Epic fighting game with environmental warriors and GAIA rewards
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Reward Pool:</span>
                    <span className="text-green-400">500-2000 GAIA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Players Online:</span>
                    <span className="text-blue-400">1,247</span>
                  </div>
                </div>
                <Link to="/gaia-fighter-game">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Play Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Trophy className="h-6 w-6" />
                  🏆 Tournament Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Compete in global tournaments for massive GAIA rewards
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Next Tournament:</span>
                    <span className="text-yellow-400">2 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Prize Pool:</span>
                    <span className="text-green-400">50,000 GAIA</span>
                  </div>
                </div>
                <Button onClick={handleJoinTournament} className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Tournament
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Target className="h-6 w-6" />
                  ⚡ Quick Battle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Jump into instant battles with other players
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Avg Battle Time:</span>
                    <span className="text-blue-400">3-5 min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Win Rewards:</span>
                    <span className="text-green-400">50-200 GAIA</span>
                  </div>
                </div>
                <Button onClick={handleQuickBattle} className="w-full bg-green-600 hover:bg-green-700">
                  Quick Battle
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-900/20 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <TreePine className="h-6 w-6" />
                  🏗️ Landscape Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create custom landscapes for battles and exploration
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Your Landscapes:</span>
                    <span className="text-purple-400">{playerStats.landscapesOwned}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Building Tools:</span>
                    <span className="text-cyan-400">7 Available</span>
                  </div>
                </div>
                <Link to="/landscape-builder">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Build Landscape
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 bg-red-900/20 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Flame className="h-6 w-6" />
                  🐉 Virtual World
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore immersive virtual environments with live chat
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Online Users:</span>
                    <span className="text-blue-400">{activeUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current World:</span>
                    <span className="text-green-400">{currentLandscape}</span>
                  </div>
                </div>
                <Button onClick={() => setActiveTab('virtualworld')} className="w-full bg-red-600 hover:bg-red-700">
                  Enter Virtual World
                </Button>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/30 bg-cyan-900/20 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Sword className="h-6 w-6" />
                  🎯 Enhanced Gaming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Advanced gaming features with blockchain integration
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>NFT Rewards:</span>
                    <span className="text-purple-400">Available</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Blockchain:</span>
                    <span className="text-green-400">Integrated</span>
                  </div>
                </div>
                <Button onClick={() => setActiveTab('marketplace')} className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Explore Features
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'virtualworld' && (
          <div className="space-y-6">
            <VirtualWorldCanvas 
              currentLandscape={currentLandscape}
              onLandscapeChange={handleLandscapeChange}
            />
            <LandscapeMarketplace onPurchase={handleLandscapePurchase} />
          </div>
        )}

        {activeTab === 'chat' && (
          <GameChatSystem activeUsers={activeUsers} />
        )}

        {activeTab === 'games' && (
          <div className="space-y-6">
            <WormsGameArena />
            
            {/* Snake Game Placeholder */}
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  🐍 GAIA Snake Game - Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🐍</div>
                  <p className="text-muted-foreground mb-4">
                    Classic Snake game with GAIA token rewards and environmental themes
                  </p>
                  <Button disabled className="bg-green-600 opacity-50">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'marketplace' && <GamingNFTMarketplace />}
      </div>
    </div>
  )
}

export default Gaming
