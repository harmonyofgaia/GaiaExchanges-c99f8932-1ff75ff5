
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StorageUpgradePanel } from '@/components/storage/StorageUpgradePanel'
import { GameNavigationHub } from '@/components/gaming/GameNavigationHub'
import { GaiaGameHub } from '@/components/gaming/GaiaGameHub'
import { EnhancedGamingModes } from '@/components/gaming/EnhancedGamingModes'
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Zap, 
  Target,
  HardDrive,
  Settings,
  Cpu
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const games = [
  {
    id: 'habbo-tycoon',
    title: 'Habbo Tycoon',
    description: 'Build and manage your virtual hotel empire',
    image: '/placeholder.svg',
    category: 'Strategy',
    players: '1-4',
    difficulty: 'Medium',
    route: '/game'
  },
  {
    id: 'worms-arena',
    title: 'Worms Game Arena',
    description: 'Strategic turn-based combat with explosive weapons',
    image: '/placeholder.svg',
    category: 'Action',
    players: '2-8',
    difficulty: 'Easy',
    route: '/game'
  },
  {
    id: 'creative-engine',
    title: 'Creative Engine',
    description: 'Unleash your creativity with powerful building tools',
    image: '/placeholder.svg',
    category: 'Creative',
    players: '1+',
    difficulty: 'Variable',
    route: '/game'
  },
  {
    id: 'eco-world',
    title: 'Eco World Builder',
    description: 'Create sustainable ecosystems and green cities',
    image: '/placeholder.svg',
    category: 'Simulation',
    players: '1-6',
    difficulty: 'Hard',
    route: '/landscape-builder'
  },
  {
    id: 'blockchain-battles',
    title: 'Blockchain Battles',
    description: 'Strategic NFT-powered combat and trading',
    image: '/placeholder.svg',
    category: 'Strategy',
    players: '2-10',
    difficulty: 'Expert',
    route: '/trading'
  }
]

export default function Gaming() {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('games')

  const handleGameClick = (route: string, gameName: string) => {
    toast.success(`🎮 Launching ${gameName}`, {
      description: 'Game is loading with enhanced storage backend...',
      duration: 3000
    })
    navigate(route)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Gaming Hub Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Gamepad2 className="h-12 w-12 text-green-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🎮 GAIA GAMING HUB
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Experience next-generation gaming with unlimited storage backend
        </p>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Games
          </TabsTrigger>
          <TabsTrigger value="modes" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Game Modes
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Navigation
          </TabsTrigger>
          <TabsTrigger value="hub" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Gaia Hub
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Storage
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-green-500/20 bg-gradient-to-br from-green-900/20 to-blue-900/20">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-green-400">{game.title}</CardTitle>
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      {game.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="h-16 w-16 text-green-400 opacity-50" />
                  </div>
                  <p className="text-muted-foreground text-sm">{game.description}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{game.players}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      <span>{game.difficulty}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    onClick={() => handleGameClick(game.route, game.title)}
                  >
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="modes">
          <EnhancedGamingModes />
        </TabsContent>

        <TabsContent value="navigation">
          <GameNavigationHub />
        </TabsContent>

        <TabsContent value="hub">
          <GaiaGameHub />
        </TabsContent>

        <TabsContent value="storage">
          <StorageUpgradePanel />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Settings className="h-6 w-6" />
                🔧 SYSTEM BACKEND OVERVIEW
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
                  <Cpu className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">100%</div>
                  <div className="text-sm text-muted-foreground">System Integration</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
                  <HardDrive className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">∞</div>
                  <div className="text-sm text-muted-foreground">Storage Scalability</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
                  <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">24/7</div>
                  <div className="text-sm text-muted-foreground">Background Processing</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  🚀 BACKEND SYSTEM CAPABILITIES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-6xl">🔄</div>
                    <div className="font-bold text-yellow-400">AUTO-SCALING</div>
                    <div className="text-sm text-muted-foreground">
                      System automatically scales resources based on demand across all pages
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-6xl">💾</div>
                    <div className="font-bold text-blue-400">UNIFIED STORAGE</div>
                    <div className="text-sm text-muted-foreground">
                      Single storage backend serves all pages with optimized data management
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-purple-900/20 rounded-lg">
                  <div className="text-xl font-bold text-purple-400">
                    🌟 BIGGER SYSTEM BUILDING ENABLED 🌟
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Storage backend now supports unlimited expansion across all platform features
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
