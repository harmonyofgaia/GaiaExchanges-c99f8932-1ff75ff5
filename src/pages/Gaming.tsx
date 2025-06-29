
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
  Globe,
  Puzzle,
  Apple
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { EnhancedGamingLayout } from '@/components/EnhancedGamingLayout'
import { GamingNFTMarketplace } from '@/components/GamingNFTMarketplace'
import { VirtualWorldCanvas } from '@/components/virtualworld/VirtualWorldCanvas'
import { GameChatSystem } from '@/components/virtualworld/GameChatSystem'
import { LandscapeMarketplace } from '@/components/virtualworld/LandscapeMarketplace'
import { WormsGameArena } from '@/components/WormsGameArena'
import { QuantumEvolutionMonitor } from '@/components/security/QuantumEvolutionMonitor'
import { SnakeGame } from '@/components/SnakeGame'
import { TetrisGame } from '@/components/TetrisGame'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

const Gaming = () => {
  const [activeTab, setActiveTab] = useState<string>('games-hub')
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

  const gameCategories = [
    { id: 'games-hub', label: '🎮 Games Hub', icon: <Gamepad2 className="h-4 w-4" /> },
    { id: 'snake', label: '🐍 Snake', icon: <Apple className="h-4 w-4" /> },
    { id: 'tetris', label: '🧩 Tetris', icon: <Puzzle className="h-4 w-4" /> },
    { id: 'worms-arena', label: '🪱 Worms Arena', icon: <Target className="h-4 w-4" /> },
    { id: 'virtual-world', label: '🌍 Virtual World', icon: <Globe className="h-4 w-4" /> },
    { id: 'landscapes', label: '🏔️ Landscapes', icon: <Mountain className="h-4 w-4" /> },
    { id: 'nft-marketplace', label: '💎 NFT Market', icon: <Star className="h-4 w-4" /> },
    { id: 'chat-system', label: '💬 Social Hub', icon: <MessageCircle className="h-4 w-4" /> },
    { id: 'enhanced-gaming', label: '⚔️ Battle Arena', icon: <Sword className="h-4 w-4" /> }
  ]

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
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {gameCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeTab === category.id ? "default" : "outline"}
              className={`${activeTab === category.id ? 'bg-purple-600' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Game Content */}
        <div className="space-y-8">
          {activeTab === 'games-hub' && (
            <div className="space-y-6">
              <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400 text-center">🎮 GAIA GAMES HUB</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-green-900/30 rounded-lg border border-green-500/20 text-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveTab('snake')}>
                      <Apple className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-400 mb-2">🐍 Snake Game</h3>
                      <p className="text-muted-foreground">Classic snake with GAIA rewards</p>
                    </div>
                    <div className="p-6 bg-blue-900/30 rounded-lg border border-blue-500/20 text-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveTab('tetris')}>
                      <Puzzle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-blue-400 mb-2">🧩 Tetris</h3>
                      <p className="text-muted-foreground">Block puzzle with token rewards</p>
                    </div>
                    <div className="p-6 bg-orange-900/30 rounded-lg border border-orange-500/20 text-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveTab('worms-arena')}>
                      <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-orange-400 mb-2">🪱 Worms Arena</h3>
                      <p className="text-muted-foreground">Strategic battle game</p>
                    </div>
                    <div className="p-6 bg-cyan-900/30 rounded-lg border border-cyan-500/20 text-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveTab('virtual-world')}>
                      <Globe className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">🌍 Virtual World</h3>
                      <p className="text-muted-foreground">Explore infinite metaverse</p>
                    </div>
                    <div className="p-6 bg-pink-900/30 rounded-lg border border-pink-500/20 text-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveTab('landscapes')}>
                      <Mountain className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-pink-400 mb-2">🏔️ Landscapes</h3>
                      <p className="text-muted-foreground">Buy and explore worlds</p>
                    </div>
                    <div className="p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/20 text-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveTab('enhanced-gaming')}>
                      <Sword className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-yellow-400 mb-2">⚔️ Battle Arena</h3>
                      <p className="text-muted-foreground">Epic PvP battles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-500/30 bg-green-900/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Trophy className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-400 mb-4">Quick Battle</h3>
                      <p className="text-muted-foreground mb-4">Jump into instant action with other players</p>
                      <Button onClick={handleQuickBattle} className="bg-green-600 hover:bg-green-700">
                        <Flame className="h-4 w-4 mr-2" />
                        Start Battle
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/30 bg-blue-900/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Crown className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-blue-400 mb-4">Tournament</h3>
                      <p className="text-muted-foreground mb-4">Compete for GAIA token prizes</p>
                      <Button onClick={handleJoinTournament} className="bg-blue-600 hover:bg-blue-700">
                        <Star className="h-4 w-4 mr-2" />
                        Join Tournament
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'snake' && <SnakeGame />}
          {activeTab === 'tetris' && <TetrisGame />}
          {activeTab === 'worms-arena' && <WormsGameArena />}
          {activeTab === 'virtual-world' && (
            <VirtualWorldCanvas 
              currentLandscape={currentLandscape}
              onLandscapeChange={handleLandscapeChange}
            />
          )}
          {activeTab === 'landscapes' && (
            <LandscapeMarketplace onPurchase={handleLandscapePurchase} />
          )}
          {activeTab === 'nft-marketplace' && <GamingNFTMarketplace />}
          {activeTab === 'chat-system' && <GameChatSystem activeUsers={activeUsers} />}
          {activeTab === 'enhanced-gaming' && <EnhancedGamingLayout />}
        </div>
      </div>
    </div>
  )
}

export default Gaming
