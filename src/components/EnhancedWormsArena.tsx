
import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Zap, 
  Shield, 
  Sword, 
  Trophy, 
  Target,
  Crown,
  Coins,
  Activity,
  Users,
  Timer
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN, formatGaiaPrice } from '@/constants/gaia'

interface Worm {
  id: string
  name: string
  level: number
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
  experience: number
  owner: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  abilities: string[]
  tokenValue: number
}

interface BattleResult {
  winner: string
  loser: string
  tokensWon: number
  experienceGained: number
  timestamp: Date
}

interface Tournament {
  id: string
  name: string
  entryFee: number
  prizePool: number
  participants: number
  maxParticipants: number
  status: 'upcoming' | 'active' | 'completed'
  startTime: Date
}

export function EnhancedWormsArena() {
  const [playerWorms, setPlayerWorms] = useState<Worm[]>([])
  const [selectedWorm, setSelectedWorm] = useState<Worm | null>(null)
  const [isInBattle, setIsInBattle] = useState(false)
  const [battleResults, setBattleResults] = useState<BattleResult[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [playerTokens, setPlayerTokens] = useState(15420)
  interface LeaderboardEntry {
    id: string;
    name: string;
    score: number;
    rank: number;
  }
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  const arenaInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    console.log('🪱 ENHANCED WORMS ARENA - BATTLE ROYALE ACTIVE')
    console.log('🏆 Tournament System Engaged')
    console.log('💰 GAiA Token Integration:', GAIA_TOKEN.CONTRACT_ADDRESS)
    console.log('⚡ Real-Time Battles with NFT Rewards')

    // Initialize player worms
    const initializeWorms = () => {
      const worms: Worm[] = [
        {
          id: 'worm-1',
          name: 'Thunder Strike',
          level: 15,
          health: 100,
          maxHealth: 100,
          attack: 85,
          defense: 70,
          speed: 90,
          experience: 2400,
          owner: 'player',
          rarity: 'epic',
          abilities: ['Lightning Bolt', 'Speed Boost', 'Shield Slam'],
          tokenValue: 1500
        },
        {
          id: 'worm-2',
          name: 'Iron Defender',
          level: 12,
          health: 120,
          maxHealth: 120,
          attack: 70,
          defense: 95,
          speed: 60,
          experience: 1800,
          owner: 'player',
          rarity: 'rare',
          abilities: ['Iron Wall', 'Counter Attack', 'Heal'],
          tokenValue: 1200
        }
      ]
      
      setPlayerWorms(worms)
      if (worms.length > 0) {
        setSelectedWorm(worms[0])
      }
    }

    // Initialize tournaments
    const initializeTournaments = () => {
      const tournamentList: Tournament[] = [
        {
          id: 'tournament-1',
          name: 'GAiA Championship',
          entryFee: 500,
          prizePool: 25000,
          participants: 32,
          maxParticipants: 64,
          status: 'active',
          startTime: new Date(Date.now() + 3600000) // 1 hour from now
        },
        {
          id: 'tournament-2',
          name: 'Weekly Brawl',
          entryFee: 100,
          prizePool: 5000,
          participants: 18,
          maxParticipants: 32,
          status: 'upcoming',
          startTime: new Date(Date.now() + 86400000) // 1 day from now
        }
      ]
      
      setTournaments(tournamentList)
    }

    initializeWorms()
    initializeTournaments()

    // Update arena statistics every 5 seconds
    arenaInterval.current = setInterval(() => {
      // Simulate battle activity
      const battleActivity = Math.floor(Math.random() * 10) + 1
      
      if (battleActivity > 7) {
        const opponents = ['Fire Worm', 'Ice Serpent', 'Shadow Crawler', 'Golden Beast']
        const opponent = opponents[Math.floor(Math.random() * opponents.length)]
        
        console.log('⚔️ Battle Notification: New opponent available -', opponent)
        
        if (Math.random() > 0.8) {
          toast.success('🎯 Battle Opportunity!', {
            description: `${opponent} challenges you to battle! Potential reward: ${Math.floor(Math.random() * 500) + 100} GAiA`,
            duration: 4000
          })
        }
      }

      // Update tournament participants
      setTournaments(prev => prev.map(tournament => ({
        ...tournament,
        participants: Math.min(tournament.participants + Math.floor(Math.random() * 3), tournament.maxParticipants)
      })))
    }, 5000)

    return () => {
      if (arenaInterval.current) clearInterval(arenaInterval.current)
    }
  }, [])

  const startBattle = async (opponent: string) => {
    if (!selectedWorm) {
      toast.error('Please select a worm to battle!')
      return
    }

    setIsInBattle(true)
    console.log('⚔️ Battle Starting:', selectedWorm.name, 'vs', opponent)

    try {
      // Simulate battle duration
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const victory = Math.random() > 0.3 // 70% win rate
      const tokensWon = Math.floor(Math.random() * 300) + 50
      const experienceGained = Math.floor(Math.random() * 100) + 25
      
      if (victory) {
        const newResult: BattleResult = {
          winner: selectedWorm.name,
          loser: opponent,
          tokensWon,
          experienceGained,
          timestamp: new Date()
        }
        
        setBattleResults(prev => [newResult, ...prev.slice(0, 9)])
        setPlayerTokens(prev => prev + tokensWon)
        
        // Update worm experience
        setPlayerWorms(prev => prev.map(worm => 
          worm.id === selectedWorm.id 
            ? { ...worm, experience: worm.experience + experienceGained }
            : worm
        ))
        
        toast.success('🏆 Victory!', {
          description: `${selectedWorm.name} won ${tokensWon} GAiA tokens and ${experienceGained} XP!`,
          duration: 5000
        })
      } else {
        toast.error('💔 Defeated', {
          description: `${selectedWorm.name} was defeated by ${opponent}. Better luck next time!`,
          duration: 4000
        })
      }
    } catch (error) {
      toast.error('⚡ Battle Error')
    } finally {
      setIsInBattle(false)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400'
      case 'rare': return 'text-blue-400'
      case 'epic': return 'text-purple-400'
      case 'legendary': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getRarityBadge = (rarity: string) => {
    const colors = {
      common: 'bg-gray-600',
      rare: 'bg-blue-600',
      epic: 'bg-purple-600',
      legendary: 'bg-yellow-600'
    }
    return colors[rarity as keyof typeof colors] || 'bg-gray-600'
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Target className="h-6 w-6" />
            🪱 ENHANCED WORMS ARENA - Battle Royale Championship
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-red-600 animate-pulse">BATTLE ACTIVE</Badge>
            <Badge className="bg-gold-600">NFT REWARDS</Badge>
            <Badge className="bg-green-600">GAiA POWERED</Badge>
            <Badge className="bg-purple-600">TOURNAMENTS</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="battle" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="battle">⚔️ Battle</TabsTrigger>
              <TabsTrigger value="worms">🪱 My Worms</TabsTrigger>
              <TabsTrigger value="tournaments">🏆 Tournaments</TabsTrigger>
              <TabsTrigger value="leaderboard">👑 Leaderboard</TabsTrigger>
              <TabsTrigger value="shop">🏪 Shop</TabsTrigger>
            </TabsList>

            <TabsContent value="battle" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Selected Worm Display */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Your Champion</h3>
                  {selectedWorm ? (
                    <Card className={`border-2 ${selectedWorm.rarity === 'legendary' ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-900/20' : selectedWorm.rarity === 'epic' ? 'border-purple-500/50 bg-gradient-to-br from-purple-900/20' : selectedWorm.rarity === 'rare' ? 'border-blue-500/50 bg-gradient-to-br from-blue-900/20' : 'border-gray-500/50 bg-gradient-to-br from-gray-900/20'}`}>
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          <div className="text-2xl">🪱</div>
                          <h4 className={`text-xl font-bold ${getRarityColor(selectedWorm.rarity)}`}>
                            {selectedWorm.name}
                          </h4>
                          <Badge className={getRarityBadge(selectedWorm.rarity)}>
                            {selectedWorm.rarity.toUpperCase()}
                          </Badge>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Level</div>
                              <div className="font-bold text-yellow-400">{selectedWorm.level}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Health</div>
                              <div className="font-bold text-red-400">{selectedWorm.health}/{selectedWorm.maxHealth}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Attack</div>
                              <div className="font-bold text-orange-400">{selectedWorm.attack}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Defense</div>
                              <div className="font-bold text-blue-400">{selectedWorm.defense}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Experience</div>
                            <Progress value={(selectedWorm.experience % 1000) / 10} className="h-2" />
                            <div className="text-xs text-muted-foreground">{selectedWorm.experience} XP</div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-sm font-medium">Abilities:</div>
                            <div className="flex flex-wrap gap-1">
                              {selectedWorm.abilities.map((ability, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {ability}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center p-8 bg-muted/50 rounded-lg">
                      <div className="text-4xl mb-4">🪱</div>
                      <p className="text-muted-foreground">No worm selected</p>
                    </div>
                  )}
                </div>

                {/* Battle Interface */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Battle Arena</h3>
                  <div className="space-y-3">
                    {['Fire Worm Elite', 'Ice Serpent Champion', 'Shadow Crawler Boss', 'Golden Beast Legend', 'Crystal Armor Giant', 'Lightning Storm Worm'].map((opponent, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-500/20">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {index < 2 ? '🔥' : index < 4 ? '⚡' : '👑'}
                          </div>
                          <div>
                            <div className="font-medium text-white">{opponent}</div>
                            <div className="text-sm text-muted-foreground">
                              Level {15 + index * 2} • Reward: {100 + index * 50} GAiA
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => startBattle(opponent)}
                          disabled={isInBattle || !selectedWorm}
                          className="bg-red-600 hover:bg-red-700"
                          size="sm"
                        >
                          {isInBattle ? (
                            <Timer className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Sword className="h-4 w-4 mr-1" />
                              Battle
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Battle Results */}
              {battleResults.length > 0 && (
                <Card className="border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400">🏆 Recent Battle Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {battleResults.slice(0, 5).map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-green-900/20 rounded border border-green-500/20">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm">
                              <span className="font-medium text-green-400">{result.winner}</span>
                              {' defeated '}
                              <span className="text-red-400">{result.loser}</span>
                            </span>
                          </div>
                          <div className="text-sm text-yellow-400">
                            +{result.tokensWon} GAiA, +{result.experienceGained} XP
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="worms" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Your Worm Collection</h3>
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="font-bold text-yellow-400">{playerTokens.toLocaleString()} GAiA</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {playerWorms.map((worm) => (
                  <Card 
                    key={worm.id} 
                    className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                      selectedWorm?.id === worm.id 
                        ? 'border-green-500 bg-green-900/30' 
                        : `${worm.rarity === 'legendary' ? 'border-yellow-500/50' : worm.rarity === 'epic' ? 'border-purple-500/50' : worm.rarity === 'rare' ? 'border-blue-500/50' : 'border-gray-500/50'}`
                    }`}
                    onClick={() => setSelectedWorm(worm)}
                  >
                    <CardContent className="pt-6">
                      <div className="text-center space-y-3">
                        <div className="text-4xl">🪱</div>
                        <h4 className={`text-lg font-bold ${getRarityColor(worm.rarity)}`}>
                          {worm.name}
                        </h4>
                        <Badge className={getRarityBadge(worm.rarity)}>
                          Level {worm.level} • {worm.rarity.toUpperCase()}
                        </Badge>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="text-red-400">⚔️</div>
                            <div>{worm.attack}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-400">🛡️</div>
                            <div>{worm.defense}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-yellow-400">⚡</div>
                            <div>{worm.speed}</div>
                          </div>
                        </div>

                        <div className="text-sm">
                          <div className="text-muted-foreground">Value</div>
                          <div className="font-bold text-green-400">{worm.tokenValue} GAiA</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tournaments" className="space-y-4">
              <div className="space-y-4">
                {tournaments.map((tournament) => (
                  <Card key={tournament.id} className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-purple-400">{tournament.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Coins className="h-4 w-4" />
                              Entry: {tournament.entryFee} GAiA
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4" />
                              Prize: {tournament.prizePool.toLocaleString()} GAiA
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {tournament.participants}/{tournament.maxParticipants}
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge className={
                            tournament.status === 'active' ? 'bg-green-600 animate-pulse' :
                            tournament.status === 'upcoming' ? 'bg-blue-600' : 'bg-gray-600'
                          }>
                            {tournament.status.toUpperCase()}
                          </Badge>
                          <Button 
                            className="bg-purple-600 hover:bg-purple-700"
                            disabled={tournament.status === 'completed' || playerTokens < tournament.entryFee}
                          >
                            {tournament.status === 'active' ? 'Join Battle' : 'Register'}
                          </Button>
                        </div>
                      </div>
                      <Progress 
                        value={(tournament.participants / tournament.maxParticipants) * 100} 
                        className="mt-4" 
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4">
              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Crown className="h-5 w-5" />
                    🏆 Arena Champions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                    <p className="text-lg">Leaderboard Loading...</p>
                    <p className="text-sm">Battle more to climb the rankings!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shop" className="space-y-4">
              <Card className="border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Coins className="h-5 w-5" />
                    🏪 Worm Shop & Upgrades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <div className="text-4xl mb-4">🏪</div>
                    <p className="text-lg">Shop Coming Soon!</p>
                    <p className="text-sm">Buy new worms, upgrades, and special abilities</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Player Stats Summary */}
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">{playerWorms.length}</div>
              <div className="text-sm text-muted-foreground">Worms Owned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{battleResults.length}</div>
              <div className="text-sm text-muted-foreground">Battles Won</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{playerTokens.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">GAiA Tokens</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {playerWorms.reduce((sum, worm) => sum + worm.tokenValue, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Collection Value</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
