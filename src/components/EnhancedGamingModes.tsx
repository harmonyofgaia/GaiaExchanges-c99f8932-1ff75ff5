
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Crown, 
  Heart, 
  Skull, 
  Baby, 
  Users, 
  Zap,
  Flame,
  Star,
  Moon,
  Sun,
  Target
} from 'lucide-react'
import { toast } from 'sonner'

export function EnhancedGamingModes() {
  const [activeMode, setActiveMode] = useState('Normal')
  const [selectedStyle, setSelectedStyle] = useState('Default')

  const gamingModes = [
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

  const gameStyles = [
    {
      id: 'default',
      name: 'Default Style',
      description: 'Classic gaming experience with balanced elements',
      effects: ['Standard Physics', 'Normal Graphics', 'Balanced Audio'],
      color: 'bg-gray-600'
    },
    {
      id: 'neon',
      name: 'Neon Cyberpunk',
      description: 'Electric neon colors with cyberpunk aesthetics',
      effects: ['Neon Glow', 'Digital Rain', 'Synthwave Audio'],
      color: 'bg-cyan-600'
    },
    {
      id: 'nature',
      name: 'Nature Harmony',
      description: 'Organic themes with natural elements',
      effects: ['Particle Leaves', 'Forest Sounds', 'Earth Tones'],
      color: 'bg-green-600'
    },
    {
      id: 'space',
      name: 'Cosmic Adventure',
      description: 'Space exploration with stellar effects',
      effects: ['Star Particles', 'Galaxy Backgrounds', 'Cosmic Audio'],
      color: 'bg-purple-600'
    },
    {
      id: 'underwater',
      name: 'Ocean Depths',
      description: 'Underwater coral reef themes',
      effects: ['Bubble Effects', 'Wave Motion', 'Ocean Sounds'],
      color: 'bg-blue-600'
    },
    {
      id: 'matrix',
      name: 'Matrix Code',
      description: 'Digital matrix with falling code rain',
      effects: ['Code Rain', 'Digital Glitch', 'Electronic Beats'],
      color: 'bg-green-500'
    },
    {
      id: 'fire',
      name: 'Infernal Flames',
      description: 'Fire and lava themed environment',
      effects: ['Flame Particles', 'Heat Waves', 'Epic Battle Music'],
      color: 'bg-red-600'
    },
    {
      id: 'ice',
      name: 'Frozen Crystal',
      description: 'Ice and crystal themed world',
      effects: ['Ice Crystals', 'Frost Effects', 'Ambient Chimes'],
      color: 'bg-cyan-400'
    }
  ]

  const activateMode = (mode: any) => {
    setActiveMode(mode.name)
    toast.success(`🎮 ${mode.name} Activated!`, {
      description: `${mode.description} - Power Level: ${mode.powerLevel}%`,
      duration: 5000
    })
  }

  const selectStyle = (style: any) => {
    setSelectedStyle(style.name)
    toast.success(`🎨 ${style.name} Applied!`, {
      description: style.description,
      duration: 3000
    })
  }

  return (
    <div className="space-y-8">
      {/* Gaming Modes Selection */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2 text-center justify-center">
            <Gamepad2 className="h-6 w-6" />
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

      {/* Style Selection Column */}
      <Card className="bg-gradient-to-br from-cyan-900/30 to-green-900/30 border-2 border-cyan-500/50">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2 text-center justify-center">
            <Star className="h-6 w-6" />
            🎨 GAME STYLE SELECTION - VISUAL EXPERIENCE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gameStyles.map((style) => (
              <Card key={style.id} className={`${style.color}/20 border-2 border-gray-500/30 hover:scale-105 transition-transform cursor-pointer`}>
                <CardContent className="p-4 space-y-3">
                  <div className="text-center">
                    <div className={`w-16 h-16 ${style.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                      <Sun className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-white">{style.name}</h4>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">{style.description}</p>

                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-center text-muted-foreground">Visual Effects:</div>
                    {style.effects.map((effect, index) => (
                      <div key={index} className="text-xs bg-black/30 p-1 rounded text-center">
                        {effect}
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => selectStyle(style)}
                    className={`w-full ${style.color} hover:opacity-80 text-white font-bold text-xs py-2`}
                  >
                    <Target className="h-3 w-3 mr-1" />
                    APPLY STYLE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-cyan-900/30 to-green-900/30 p-4 rounded-lg border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">🎨 Active Style:</h3>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {selectedStyle}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
