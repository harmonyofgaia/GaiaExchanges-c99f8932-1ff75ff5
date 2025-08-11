
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Sword, Shield, Zap, Crown, Trophy, Target } from 'lucide-react'
import { toast } from 'sonner'

export default function GaiaFighter() {
  const [playerLevel, setPlayerLevel] = useState(15)
  const [playerXP, setPlayerXP] = useState(2450)
  const [playerHealth, setPlayerHealth] = useState(100)
  const [playerMana, setPlayerMana] = useState(85)
  const [inBattle, setInBattle] = useState(false)

  const startBattle = (opponent: string) => {
    setInBattle(true)
    toast.success(`⚔️ Battle started against ${opponent}!`, {
      description: 'Prepare your combat strategy',
      duration: 3000
    })
  }

  const fighters = [
    { name: 'Earth Guardian', level: 12, element: 'Earth', difficulty: 'Easy' },
    { name: 'Water Sage', level: 18, element: 'Water', difficulty: 'Medium' },
    { name: 'Fire Dragon', level: 25, element: 'Fire', difficulty: 'Hard' },
    { name: 'Air Elemental', level: 30, element: 'Air', difficulty: 'Expert' }
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
          ⚔️ GAIA FIGHTER PRO
        </h1>
        <p className="text-muted-foreground mt-2">
          Ultimate combat system with global tournaments
        </p>
      </div>

      {/* Player Stats */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Crown className="h-6 w-6" />
            Fighter Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">Level {playerLevel}</div>
              <div className="text-sm text-muted-foreground">Fighter Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{playerXP}</div>
              <div className="text-sm text-muted-foreground">Experience</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Health</span>
                <span className="text-sm">{playerHealth}%</span>
              </div>
              <Progress value={playerHealth} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Mana</span>
                <span className="text-sm">{playerMana}%</span>
              </div>
              <Progress value={playerMana} className="h-2 bg-blue-900" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combat Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-purple-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Target className="h-6 w-6" />
              Combat Arena
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fighters.map((fighter, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-bold">{fighter.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Level {fighter.level} • {fighter.element} • {fighter.difficulty}
                    </div>
                  </div>
                  <Button 
                    onClick={() => startBattle(fighter.name)}
                    disabled={inBattle}
                    variant="outline"
                    size="sm"
                  >
                    <Sword className="h-4 w-4 mr-2" />
                    Challenge
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Trophy className="h-6 w-6" />
              Global Tournament
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <Badge className="bg-yellow-600 mb-4">SEASON 3 ACTIVE</Badge>
                <div className="text-lg font-bold">Current Ranking: #127</div>
                <div className="text-sm text-muted-foreground">out of 15,247 players</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tournament Points</span>
                  <span className="font-bold">1,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Wins This Season</span>
                  <span className="font-bold text-green-400">23</span>
                </div>
                <div className="flex justify-between">
                  <span>Losses This Season</span>
                  <span className="font-bold text-red-400">8</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600">
                <Trophy className="h-4 w-4 mr-2" />
                Enter Tournament
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills & Abilities */}
      <Card className="border-2 border-green-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Zap className="h-6 w-6" />
            Skills & Abilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
              <div className="text-center">
                <Sword className="h-8 w-8 mx-auto text-red-400 mb-2" />
                <div className="font-bold text-red-400">Fire Strike</div>
                <div className="text-sm text-muted-foreground">Level 8</div>
                <div className="text-xs mt-2">Deals 150-200 fire damage</div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="font-bold text-blue-400">Ice Shield</div>
                <div className="text-sm text-muted-foreground">Level 6</div>
                <div className="text-xs mt-2">Absorbs 300 damage</div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <div className="text-center">
                <Zap className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <div className="font-bold text-purple-400">Lightning Bolt</div>
                <div className="text-sm text-muted-foreground">Level 10</div>
                <div className="text-xs mt-2">Instant 250 damage</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
