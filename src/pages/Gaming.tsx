
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
  Apple,
  ShoppingCart,
  Package,
  Fish,
  Gem,
  Palette,
  Radio,
  Sparkles
} from 'lucide-react'
import { EnhancedGamingLayout } from '@/components/EnhancedGamingLayout'
import { GamingNFTMarketplace } from '@/components/GamingNFTMarketplace'
import { VirtualWorldCanvas } from '@/components/virtualworld/VirtualWorldCanvas'
import { GameChatSystem } from '@/components/virtualworld/GameChatSystem'
import { LandscapeMarketplace } from '@/components/virtualworld/LandscapeMarketplace'
import { PlayerInventory } from '@/components/virtualworld/PlayerInventory'
import { WormsGameArena } from '@/components/WormsGameArena'
import { QuantumEvolutionMonitor } from '@/components/security/QuantumEvolutionMonitor'
import { SnakeGame } from '@/components/SnakeGame'
import { TetrisGame } from '@/components/TetrisGame'
import { GaiaCloudSystem } from '@/components/GaiaCloudSystem'
import { SnakeWormsIntegration } from '@/components/SnakeWormsIntegration'
import { LiveAnimalNFTs } from '@/components/LiveAnimalNFTs'
import { ArtMarketplace } from '@/components/marketplace/ArtMarketplace'
import { ArtistStreamingPlatform } from '@/components/ArtistStreamingPlatform'
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
    environmentalImpact: 847,
    nftsOwned: 23,
    animalsHelped: 567,
    artworkOwned: 12,
    streamsWatched: 45
  })

  const handleQuickBattle = () => {
    toast.success('🥊 Battle Started!', {
      description: 'Entering quick battle arena with GAiA power boost',
      duration: 3000
    })
  }

  const handleJoinTournament = () => {
    toast.success('🏆 Tournament Registration', {
      description: 'You have been registered for the next GAiA tournament',
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
      description: `${landscape} added to your collection! GAiA tokens burned for environmental impact!`,
      duration: 3000
    })
  }

  const handleNFTPurchase = (nftName: string, price: number) => {
    setPlayerStats(prev => ({
      ...prev,
      nftsOwned: prev.nftsOwned + 1,
      tokensEarned: prev.tokensEarned - price,
      environmentalImpact: prev.environmentalImpact + 10
    }))
    toast.success('🎮 NFT Purchased!', {
      description: `${nftName} added to your collection! GAiA tokens burned!`,
      duration: 3000
    })
  }

  const gameCategories = [
    { id: 'games-hub', label: '🎮 Games Hub', icon: <Gamepad2 className="h-4 w-4" /> },
    { id: 'cloud-system', label: '☁️ Cloud System', icon: <Globe className="h-4 w-4" /> },
    { id: 'snake-worms', label: '🐍⚔️ Snake vs Worms', icon: <Target className="h-4 w-4" /> },
    { id: 'snake', label: '🐍 Snake Classic', icon: <Apple className="h-4 w-4" /> },
    { id: 'tetris', label: '🧩 Tetris', icon: <Puzzle className="h-4 w-4" /> },
    { id: 'worms-arena', label: '🪱 Worms Arena', icon: <Target className="h-4 w-4" /> },
    { id: 'virtual-world', label: '🌍 Virtual World', icon: <Globe className="h-4 w-4" /> },
    { id: 'landscapes', label: '🏔️ Landscape Market', icon: <Mountain className="h-4 w-4" /> },
    { id: 'nft-marketplace', label: '💎 NFT Market', icon: <Star className="h-4 w-4" /> },
    { id: 'animal-nfts', label: '🦋 Live Animal NFTs', icon: <Fish className="h-4 w-4" /> },
    { id: 'art-marketplace', label: '🎨 Art Marketplace', icon: <Palette className="h-4 w-4" /> },
    { id: 'artist-streaming', label: '📺 Artist Streaming', icon: <Radio className="h-4 w-4" /> },
    { id: 'inventory', label: '🎒 Player Inventory', icon: <Package className="h-4 w-4" /> },
    { id: 'chat-system', label: '💬 Social Hub', icon: <MessageCircle className="h-4 w-4" /> },
    { id: 'battle-arena', label: '⚔️ Battle Arena', icon: <Sword className="h-4 w-4" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with Animations */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 rounded-lg blur-3xl" />
          <div className="relative">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-4 animate-pulse">
              🎮 GAiA GAMING METAVERSE
            </h1>
            <p className="text-2xl text-muted-foreground mb-4 animate-fade-in">
              Epic gaming experiences with dragon-powered security, virtual worlds, live animal NFTs, art marketplace, streaming platform, and GAiA token rewards
            </p>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4 max-w-4xl mx-auto mb-6 backdrop-blur-sm">
              <div className="text-sm text-green-400 mb-1">
                <strong>GAiA Token Contract:</strong> <code className="font-mono text-xs bg-black/30 px-2 py-1 rounded">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <div className="text-sm text-blue-400 mb-1">
                <strong>Official Wallet:</strong> <code className="font-mono text-xs bg-black/30 px-2 py-1 rounded">{GAIA_TOKEN.WALLET_ADDRESS}</code>
              </div>
              <div className="text-sm text-purple-400">
                <strong>Token:</strong> {GAIA_TOKEN.NAME} ({GAIA_TOKEN.SYMBOL}) - The One and Only Harmony of Gaia
              </div>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-purple-600 text-white animate-bounce">
                <Shield className="h-3 w-3 mr-1" />
                Dragon Protected
              </Badge>
              <Badge className="bg-blue-600 text-white animate-pulse">
                <Zap className="h-3 w-3 mr-1" />
                Real-time Gaming
              </Badge>
              <Badge className="bg-green-600 text-white animate-bounce" style={{ animationDelay: '0.2s' }}>
                <Users className="h-3 w-3 mr-1" />
                {activeUsers} Players Online
              </Badge>
              <Badge className="bg-orange-600 text-white animate-pulse" style={{ animationDelay: '0.4s' }}>
                <Globe className="h-3 w-3 mr-1" />
                Virtual Worlds + Live NFTs
              </Badge>
              <Badge className="bg-pink-600 text-white animate-bounce" style={{ animationDelay: '0.6s' }}>
                <Palette className="h-3 w-3 mr-1" />
                Art Marketplace + Streaming
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Player Stats Dashboard */}
        <Card className="mb-8 border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Crown className="h-6 w-6 animate-spin" style={{ animationDuration: '3s' }} />
              Player Dashboard - Harmony Warrior
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
              <div className="text-center p-3 bg-purple-900/30 border border-purple-500/20 rounded-lg hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-purple-400">{playerStats.level}</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div className="text-center p-3 bg-green-900/30 border border-green-500/20 rounded-lg hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-green-400">{playerStats.gaiaPower}</div>
                <div className="text-sm text-muted-foreground">GAiA Power</div>
              </div>
              <div className="text-center p-3 bg-blue-900/30 border border-blue-500/20 rounded-lg hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-blue-400">{playerStats.landscapesOwned}</div>
                <div className="text-sm text-muted-foreground">Landscapes</div>
              </div>
              <div className="text-center p-3 bg-yellow-900/30 border border-yellow-500/20 rounded-lg hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-yellow-400">{playerStats.tokensEarned}</div>
                <div className="text-sm text-muted-foreground">GAiA Earned</div>
              </div>
              <div className="text-center p-3 bg-pink-900/30 border border-pink-500/20 rounded-lg hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-pink-400">{playerStats.nftsOwned}</div>
                <div className="text-sm text-muted-foreground">NFTs Owned</div>
              </div>
              <div className="text-center p-3 bg-cyan-900/30 border border-cyan-500/20 rounded-lg hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-cyan-400">{playerStats.animalsHelped}</div>
                <div className="text-sm text-muted-foreground">Animals Helped</div>
              </div>
              <div className="text-center p-3 bg-orange-900/30 border border-orange-500/20 rounded-lg hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-orange-400">{playerStats.artworkOwned}</div>
                <div className="text-sm text-muted-foreground">Artwork Owned</div>
              </div>
              <div className="text-center p-3 bg-indigo-900/30 border border-indigo-500/20 rounded-lg hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-indigo-400">{playerStats.streamsWatched}</div>
                <div className="text-sm text-muted-foreground">Streams Watched</div>
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

        {/* Enhanced Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {gameCategories.map((category, index) => (
            <Button
              key={category.id}
              variant={activeTab === category.id ? "default" : "outline"}
              className={`${activeTab === category.id ? 'bg-purple-600 animate-pulse' : 'hover:scale-105'} transition-all duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
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
              <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-400 text-center text-2xl">
                    🎮 GAiA GAMES HUB - All Your Epic Creations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[
                      { id: 'cloud-system', title: '☁️ Cloud System', desc: 'Make clouds visible and interactive', color: 'cyan', icon: Globe, rewards: 'GAiA Rewards' },
                      { id: 'snake-worms', title: '🐍⚔️ Snake vs Worms', desc: 'Epic live battle integration', color: 'orange', icon: Target, rewards: 'Token Burning' },
                      { id: 'snake', title: '🐍 Snake Classic', desc: 'Classic snake with GAiA rewards', color: 'green', icon: Apple, rewards: 'Environmental Impact' },
                      { id: 'tetris', title: '🧩 Tetris', desc: 'Block puzzle with token rewards', color: 'blue', icon: Puzzle, rewards: 'GAiA Burning' },
                      { id: 'worms-arena', title: '🪱 Worms Arena', desc: 'Strategic battle game', color: 'red', icon: Target, rewards: 'Live Combat' },
                      { id: 'virtual-world', title: '🌍 Virtual World', desc: 'Explore infinite metaverse', color: 'teal', icon: Globe, rewards: 'Animal Walking' },
                      { id: 'animal-nfts', title: '🦋 Live Animal NFTs', desc: 'Real animals with live connections', color: 'pink', icon: Fish, rewards: 'Environmental Aid' },
                      { id: 'nft-marketplace', title: '💎 NFT Marketplace', desc: 'Trade gaming NFTs', color: 'violet', icon: Star, rewards: 'Token Rewards' },
                      { id: 'art-marketplace', title: '🎨 Art Marketplace', desc: 'Buy and sell exclusive artwork', color: 'purple', icon: Palette, rewards: 'Artist Support' },
                      { id: 'artist-streaming', title: '📺 Artist Streaming', desc: 'Live shows with token earnings', color: 'rose', icon: Radio, rewards: 'Live Earnings' },
                      { id: 'landscapes', title: '🏔️ Landscape Market', desc: 'Virtual world environments', color: 'emerald', icon: Mountain, rewards: 'World Building' },
                      { id: 'inventory', title: '🎒 Player Inventory', desc: 'Manage items and achievements', color: 'indigo', icon: Package, rewards: 'Progress Tracking' }
                    ].map((game, index) => (
                      <div 
                        key={game.id}
                        className={`p-6 bg-${game.color}-900/30 rounded-lg border border-${game.color}-500/20 text-center hover:scale-110 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-${game.color}-500/20 animate-fade-in`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => setActiveTab(game.id)}
                      >
                        <game.icon className={`h-12 w-12 text-${game.color}-400 mx-auto mb-4 animate-bounce`} style={{ animationDelay: `${index * 0.2}s` }} />
                        <h3 className={`text-xl font-bold text-${game.color}-400 mb-2`}>{game.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{game.desc}</p>
                        <Badge className="bg-green-600 animate-pulse">{game.rewards}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30 hover:scale-105 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Trophy className="h-16 w-16 text-green-400 mx-auto mb-4 animate-bounce" />
                      <h3 className="text-2xl font-bold text-green-400 mb-4">Quick Battle</h3>
                      <p className="text-muted-foreground mb-4">Jump into instant action with other players and earn GAiA tokens through epic battles</p>
                      <Button onClick={handleQuickBattle} className="bg-green-600 hover:bg-green-700 animate-pulse">
                        <Flame className="h-4 w-4 mr-2" />
                        Start Epic Battle
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 hover:scale-105 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Crown className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">Tournament</h3>
                      <p className="text-muted-foreground mb-4">Compete for massive GAiA token prizes and contribute to environmental impact</p>
                      <Button onClick={handleJoinTournament} className="bg-blue-600 hover:bg-blue-700 animate-pulse" style={{ animationDelay: '0.5s' }}>
                        <Star className="h-4 w-4 mr-2" />
                        Join Championship
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'cloud-system' && <GaiaCloudSystem />}
          {activeTab === 'snake-worms' && <SnakeWormsIntegration />}
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
          {activeTab === 'animal-nfts' && <LiveAnimalNFTs />}
          {activeTab === 'art-marketplace' && <ArtMarketplace />}
          {activeTab === 'artist-streaming' && <ArtistStreamingPlatform />}
          {activeTab === 'inventory' && <PlayerInventory />}
          {activeTab === 'chat-system' && <GameChatSystem activeUsers={activeUsers} />}
          {activeTab === 'battle-arena' && <EnhancedGamingLayout />}
        </div>

        {/* Enhanced GAiA Token Integration Footer */}
        <Card className="mt-8 border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-400 text-center text-2xl">
              🚀 Powered by GAiA Token - Harmony of Gaia Ecosystem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <div className="text-lg text-green-400">
                <strong>Official Contract Address:</strong>
              </div>
              <code className="font-mono text-sm bg-black/30 px-4 py-2 rounded-lg border border-green-500/20 block max-w-2xl mx-auto">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
              <div className="text-lg text-blue-400">
                <strong>Official Wallet Address:</strong>
              </div>
              <code className="font-mono text-sm bg-black/30 px-4 py-2 rounded-lg border border-blue-500/20 block max-w-2xl mx-auto">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
              <div className="text-lg text-purple-400">
                <strong>Token Name:</strong> {GAIA_TOKEN.NAME} ({GAIA_TOKEN.SYMBOL})
              </div>
              <p className="text-muted-foreground mt-4 max-w-4xl mx-auto">
                Every gaming interaction, NFT purchase, art acquisition, stream tip, and marketplace transaction burns GAiA tokens for real environmental impact, 
                wildlife conservation, landscape restoration, and artist support. Join the harmony revolution through gaming and make a genuine difference in the world!
              </p>
              <div className="flex justify-center gap-3 flex-wrap mt-4">
                <Badge className="bg-green-600 text-white animate-pulse">
                  <Flame className="h-3 w-3 mr-1" />
                  Token Burning Active
                </Badge>
                <Badge className="bg-blue-600 text-white animate-pulse" style={{ animationDelay: '0.2s' }}>
                  <Fish className="h-3 w-3 mr-1" />
                  Animal Conservation
                </Badge>
                <Badge className="bg-purple-600 text-white animate-pulse" style={{ animationDelay: '0.4s' }}>
                  <Palette className="h-3 w-3 mr-1" />
                  Artist Support
                </Badge>
                <Badge className="bg-orange-600 text-white animate-pulse" style={{ animationDelay: '0.6s' }}>
                  <TreePine className="h-3 w-3 mr-1" />
                  Environmental Impact
                </Badge>
                <Badge className="bg-pink-600 text-white animate-pulse" style={{ animationDelay: '0.8s' }}>
                  <Radio className="h-3 w-3 mr-1" />
                  Live Streaming
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Gaming
