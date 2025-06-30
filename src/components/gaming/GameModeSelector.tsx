
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Heart, Skull, Baby, Users, Zap, Flame, Moon } from 'lucide-react'
import { toast } from 'sonner'

interface GameMode {
  id: string
  name: string
  icon: JSX.Element
  description: string
  difficulty: string
  powerLevel: number
  specialAbilities: string[]
  color: string
  textColor: string
}

export function GameModeSelector() {
  const [activeMode, setActiveMode] = useState('Normal')

  const gamingModes: GameMode[] = [
    {
      id: 'daemon',
      name: 'Daemon Mode',
      icon: <Flame className="h-6 w-6" />,
      description: 'Unleash dark powers and conquer with shadow abilities',
      difficulty: 'EXTREME',
      powerLevel: 95,
      specialAbilities: ['Shadow Strike', 'Dark Energy', 'Soul Drain', 'Infernal Rage'],
      color: 'from-red-600 to-black',
      textColor: 'text-red-400'
    },
    {
      id: 'god',
      name: 'God Mode',
      icon: <Crown className="h-6 w-6" />,
      description: 'Divine powers to create and destroy worlds',
      difficulty: 'LEGENDARY',
      powerLevel: 100,
      specialAbilities: ['Divine Intervention', 'World Creation', 'Time Control', 'Infinite Wisdom'],
      color: 'from-yellow-400 to-white',
      textColor: 'text-yellow-400'
    },
    {
      id: 'child',
      name: 'Child Mode',
      icon: <Baby className="h-6 w-6" />,
      description: 'Pure innocence with unlimited curiosity and wonder',
      difficulty: 'BEGINNER',
      powerLevel: 40,
      specialAbilities: ['Wonder Vision', 'Innocent Charm', 'Playful Magic', 'Animal Friendship'],
      color: 'from-pink-400 to-purple-300',
      textColor: 'text-pink-400'
    },
    {
      id: 'adult',
      name: 'Adult Mode',
      icon: <Users className="h-6 w-6" />,
      description: 'Balanced wisdom and strength for responsible power',
      difficulty: 'MEDIUM',
      powerLevel: 70,
      specialAbilities: ['Strategic Planning', 'Leadership', 'Resource Management', 'Diplomatic Solutions'],
      color: 'from-blue-600 to-green-600',
      textColor: 'text-blue-400'
    },
    {
      id: 'devil',
      name: 'Devil Mode',
      icon: <Skull className="h-6 w-6" />,
      description: 'Manipulate reality with cunning and temptation',
      difficulty: 'NIGHTMARE',
      powerLevel: 90,
      specialAbilities: ['Temptation', 'Reality Distortion', 'Mind Control', 'Chaos Creation'],
      color: 'from-purple-800 to-red-900',
      textColor: 'text-purple-400'
    },
    {
      id: 'emo',
      name: 'Emo Mode',
      icon: <Heart className="h-6 w-6" />,
      description: 'Deep emotional connection with melancholic power',
      difficulty: 'HARD',
      powerLevel: 60,
      specialAbilities: ['Emotional Resonance', 'Melancholic Strength', 'Artistic Vision', 'Soul Expression'],
      color: 'from-gray-700 to-black',
      textColor: 'text-gray-400'
    },
    {
      id: 'highemo',
      name: 'High Emo Mode',
      icon: <Moon className="h-6 w-6" />,
      description: 'Transcendent emotional state with ethereal abilities',
      difficulty: 'ULTRA',
      powerLevel: 85,
      specialAbilities: ['Ethereal Form', 'Emotional Tsunami', 'Artistic Mastery', 'Transcendent Vision'],
      color: 'from-indigo-800 to-purple-900',
      textColor: 'text-indigo-400'
    }
  ]

  const activateMode = (mode: GameMode) => {
    setActiveMode(mode.name)
    toast.success(`🎮 ${mode.name} Activated!`, {
      description: `${mode.description} - Power Level: ${mode.powerLevel}%`,
      duration: 5000
    })
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2 text-center justify-center">
          🎮 ULTIMATE GAMING MODES - CHOOSE YOUR POWER
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamingModes.map((mode) => (
            <Card key={mode.id} className={`bg-gradient-to-br ${mode.color}/20 border-2 border-gray-500/30 hover:scale-105 transition-transform cursor-pointer`}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${mode.color}/30`}>
                      {mode.icon}
                    </div>
                    <h3 className={`font-bold ${mode.textColor}`}>{mode.name}</h3>
                  </div>
                  <Badge className={`bg-gradient-to-r ${mode.color} text-white`}>
                    {mode.difficulty}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{mode.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Power Level:</span>
                    <span className={`font-bold ${mode.textColor}`}>{mode.powerLevel}%</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-muted-foreground">Special Abilities:</div>
                    <div className="grid grid-cols-2 gap-1">
                      {mode.specialAbilities.map((ability, index) => (
                        <div key={index} className="text-xs bg-black/30 p-1 rounded text-center">
                          {ability}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => activateMode(mode)}
                  className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-80 text-white font-bold`}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  ACTIVATE {mode.name.toUpperCase()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-2xl font-bold text-purple-400 mb-2">🎮 Currently Active:</h3>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {activeMode}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
