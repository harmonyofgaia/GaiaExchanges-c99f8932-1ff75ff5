
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Sword, 
  Shield, 
  Crown,
  Heart,
  Music,
  Palette,
  Rocket,
  TreePine,
  Wind,
  Sparkles,
  Brain,
  Users,
  MapPin,
  Timer,
  Skull,
  Baby,
  Flame,
  Moon
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function Gaming() {
  const [selectedTab, setSelectedTab] = useState('arcade')

  const classicGameModes = [
    {
      id: 'emo',
      name: '😔 Emo Mode',
      description: 'Express deep emotions through dark, atmospheric gameplay',
      icon: Heart,
      difficulty: 'Medium',
      players: '1-4',
      color: 'bg-gray-600'
    },
    {
      id: 'party',
      name: '🎉 Party Mode',
      description: 'Chaotic multiplayer fun with mini-games and challenges',
      icon: Sparkles,
      difficulty: 'Easy',
      players: '4-8',
      color: 'bg-pink-600'
    },
    {
      id: 'rhythm',
      name: '🎵 Rhythm Mode',
      description: 'Musical gameplay synchronized with GAiA soundtracks',
      icon: Music,
      difficulty: 'Hard',
      players: '1-2',
      color: 'bg-purple-600'
    },
    {
      id: 'artistic',
      name: '🎨 Artistic Mode', 
      description: 'Creative expression through digital art and design',
      icon: Palette,
      difficulty: 'Easy',
      players: '1+',
      color: 'bg-orange-600'
    },
    {
      id: 'space',
      name: '🚀 Space Adventure',
      description: 'Explore the cosmos in epic space exploration missions',
      icon: Rocket,
      difficulty: 'Hard',
      players: '1-6',
      color: 'bg-blue-600'
    },
    {
      id: 'zen',
      name: '🧘 Zen Mode',
      description: 'Peaceful, meditative gameplay for relaxation',
      icon: Wind,
      difficulty: 'Easy',
      players: '1',
      color: 'bg-green-600'
    },
    {
      id: 'daemon',
      name: '👹 Daemon Mode',
      description: 'Unleash dark powers and conquer with shadow abilities',
      icon: Flame,
      difficulty: 'EXTREME',
      players: '1-2',
      color: 'bg-red-800'
    },
    {
      id: 'god',
      name: '👑 God Mode',
      description: 'Divine powers to create and destroy worlds',
      icon: Crown,
      difficulty: 'LEGENDARY',
      players: '1',
      color: 'bg-yellow-600'
    },
    {
      id: 'child',
      name: '👶 Child Mode',
      description: 'Pure innocence with unlimited curiosity and wonder',
      icon: Baby,
      difficulty: 'BEGINNER',
      players: '1+',
      color: 'bg-pink-400'
    },
    {
      id: 'adult',
      name: '👤 Adult Mode',
      description: 'Balanced wisdom and strength for responsible power',
      icon: Users,
      difficulty: 'MEDIUM',
      players: '1-4',
      color: 'bg-blue-600'
    },
    {
      id: 'devil',
      name: '💀 Devil Mode',
      description: 'Manipulate reality with cunning and temptation',
      icon: Skull,
      difficulty: 'NIGHTMARE',
      players: '1-2',
      color: 'bg-purple-800'
    },
    {
      id: 'highemo',
      name: '🌙 High Emo Mode',
      description: 'Transcendent emotional state with ethereal abilities',
      icon: Moon,
      difficulty: 'ULTRA',
      players: '1',
      color: 'bg-indigo-800'
    }
  ]

  const arcadeGames = [
    {
      name: 'GAiA Defender',
      description: 'Defend the planet from environmental threats',
      icon: Shield,
      players: '1-2',
      highScore: '125,420'
    },
    {
      name: 'Eco Warriors',
      description: 'Team up to restore damaged ecosystems',
      icon: TreePine,
      players: '2-4',
      highScore: '98,750'
    },
    {
      name: 'Quantum Puzzler',
      description: 'Solve mind-bending quantum physics puzzles',
      icon: Brain,
      players: '1',
      highScore: '87,340'
    },
    {
      name: 'Harmony Racer',
      description: 'Race through musical landscapes',
      icon: Zap,
      players: '1-8',
      highScore: '156,890'
    }
  ]

  const tournamentData = [
    {
      name: 'Weekly Emo Championship',
      prize: '50,000 GAIA',
      participants: 247,
      timeLeft: '2d 14h',
      status: 'Active'
    },
    {
      name: 'Monthly Party Royale',
      prize: '100,000 GAIA',
      participants: 1249,
      timeLeft: '18d 7h',
      status: 'Registration Open'
    },
    {
      name: 'Rhythm Master Series',
      prize: '25,000 GAIA',
      participants: 89,
      timeLeft: '5d 22h',
      status: 'Active'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-green-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">
              🎮 GAiA Gaming Universe
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Experience all classic game modes • Compete in tournaments • Earn GAiA tokens
            </p>
          </CardHeader>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="arcade">🕹️ Arcade Games</TabsTrigger>
            <TabsTrigger value="classic">🎭 Classic Modes</TabsTrigger>
            <TabsTrigger value="tournaments">🏆 Tournaments</TabsTrigger>
            <TabsTrigger value="leaderboard">📊 Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="classic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classicGameModes.map((mode) => {
                const Icon = mode.icon
                
                return (
                  <Card key={mode.id} className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-all">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full ${mode.color} flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-center text-purple-400">{mode.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center mb-4">
                        {mode.description}
                      </p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <Badge className="bg-blue-600">{mode.difficulty}</Badge>
                        <Badge className="bg-green-600">{mode.players} Players</Badge>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Gamepad2 className="h-4 w-4 mr-2" />
                        Play {mode.name}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="arcade" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {arcadeGames.map((game, index) => {
                const Icon = game.icon
                
                return (
                  <Card key={index} className="border-green-500/30 bg-green-900/20">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-green-400">{game.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{game.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Players: </span>
                          <span className="text-white">{game.players}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">High Score: </span>
                          <span className="text-yellow-400">{game.highScore}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Target className="h-4 w-4 mr-2" />
                        Play Now
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="tournaments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournamentData.map((tournament, index) => (
                <Card key={index} className="border-yellow-500/30 bg-yellow-900/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-6 w-6 text-yellow-400" />
                      <CardTitle className="text-yellow-400">{tournament.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prize Pool:</span>
                        <span className="text-green-400 font-bold">{tournament.prize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Participants:</span>
                        <span className="text-blue-400">{tournament.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time Left:</span>
                        <span className="text-orange-400">{tournament.timeLeft}</span>
                      </div>
                      <Badge className={tournament.status === 'Active' ? 'bg-green-600' : 'bg-blue-600'}>
                        {tournament.status}
                      </Badge>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                      <Crown className="h-4 w-4 mr-2" />
                      {tournament.status === 'Active' ? 'Join Tournament' : 'Register Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Star className="h-6 w-6" />
                  Global Leaderboard - Top Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: 'EcoMaster2024', score: '2,547,890', mode: 'Emo Mode', badge: '👑' },
                    { rank: 2, name: 'GreenWarrior', score: '2,234,567', mode: 'Party Mode', badge: '🥈' },
                    { rank: 3, name: 'RhythmKing', score: '1,987,543', mode: 'Rhythm Mode', badge: '🥉' },
                    { rank: 4, name: 'ArtisticSoul', score: '1,876,432', mode: 'Artistic Mode', badge: '⭐' },
                    { rank: 5, name: 'SpaceExplorer', score: '1,654,321', mode: 'Space Adventure', badge: '🌟' }
                  ].map((player) => (
                    <div key={player.rank} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{player.badge}</div>
                        <div>
                          <div className="font-bold text-cyan-400">#{player.rank} {player.name}</div>
                          <div className="text-sm text-muted-foreground">Best in: {player.mode}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">{player.score}</div>
                        <div className="text-sm text-muted-foreground">Total Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-green-500/10 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">🎮 Gaming Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-bold text-green-400">🏆 Classic Game Modes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Emo Mode - Express deep emotions</li>
                <li>• Party Mode - Chaotic multiplayer fun</li>
                <li>• Rhythm Mode - Musical gameplay</li>
                <li>• Artistic Mode - Creative expression</li>
                <li>• Space Adventure - Cosmic exploration</li>
                <li>• Zen Mode - Peaceful relaxation</li>
                <li>• Daemon Mode - Dark shadow powers</li>
                <li>• God Mode - Divine abilities</li>
                <li>• Child Mode - Innocent wonder</li>
                <li>• Adult Mode - Balanced wisdom</li>
                <li>• Devil Mode - Cunning manipulation</li>
                <li>• High Emo Mode - Transcendent state</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-blue-400">🎯 Gaming Rewards</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Earn GAiA tokens for gameplay</li>
                <li>• Tournament prize pools</li>
                <li>• Achievement rewards</li>
                <li>• Leaderboard bonuses</li>
                <li>• Special event prizes</li>
                <li>• NFT gaming rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
