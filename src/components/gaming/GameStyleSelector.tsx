
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Sun, Target } from 'lucide-react'
import { toast } from 'sonner'

interface GameStyle {
  id: string
  name: string
  description: string
  effects: string[]
  color: string
}

export function GameStyleSelector() {
  const [selectedStyle, setSelectedStyle] = useState('Default')

  const gameStyles: GameStyle[] = [
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

  const selectStyle = (style: GameStyle) => {
    setSelectedStyle(style.name)
    toast.success(`🎨 ${style.name} Applied!`, {
      description: style.description,
      duration: 3000
    })
  }

  return (
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
  )
}
