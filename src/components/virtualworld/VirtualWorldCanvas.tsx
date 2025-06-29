
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TreePine, 
  Fish, 
  Mountain, 
  Waves, 
  Sun, 
  Moon, 
  Cloud, 
  Snowflake,
  Flame,
  Coins,
  Gamepad2
} from 'lucide-react'

interface VirtualWorldCanvasProps {
  currentLandscape: string
  onLandscapeChange: (landscape: string) => void
}

export function VirtualWorldCanvas({ currentLandscape, onLandscapeChange }: VirtualWorldCanvasProps) {
  const [tokensBurned, setTokensBurned] = useState(0)
  const [animalsHelped, setAnimalsHelped] = useState(0)
  const [weatherEffect, setWeatherEffect] = useState('sunny')

  const landscapes = [
    { name: '🌊 Ocean Paradise with Token Burning', icon: Waves, theme: 'blue' },
    { name: '🏔️ Mountain Summit Adventure', icon: Mountain, theme: 'green' },
    { name: '🌲 Enchanted Forest', icon: TreePine, theme: 'emerald' },
    { name: '🔥 Volcanic Token Burning Realm', icon: Flame, theme: 'red' },
    { name: '❄️ Arctic Crystal World', icon: Snowflake, theme: 'cyan' },
    { name: '🌅 Sunrise Valley', icon: Sun, theme: 'yellow' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherEffect(prev => {
        const effects = ['sunny', 'cloudy', 'rainy', 'snowy']
        return effects[Math.floor(Math.random() * effects.length)]
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleLandscapeChange = (landscape: string) => {
    onLandscapeChange(landscape)
    setTokensBurned(prev => prev + 5)
    setAnimalsHelped(prev => prev + 2)
  }

  return (
    <div className="space-y-6">
      {/* Main Canvas Area */}
      <Card className="relative min-h-[400px] overflow-hidden border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-center text-purple-400">
            🌍 Virtual World Canvas - Current: {currentLandscape}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating coins animation */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${10 + (i * 7)}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              >
                <Coins className="h-6 w-6 text-yellow-400/60" />
              </div>
            ))}
            
            {/* Weather effects */}
            {weatherEffect === 'rainy' && (
              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-8 bg-blue-400/30 animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            )}
            
            {weatherEffect === 'snowy' && (
              <div className="absolute inset-0">
                {Array.from({ length: 15 }).map((_, i) => (
                  <Snowflake
                    key={i}
                    className="absolute h-4 w-4 text-white/40 animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Central Gaming Area */}
          <div className="relative z-10 text-center space-y-4">
            <div className="text-8xl animate-pulse">🌍</div>
            <div className="text-xl text-muted-foreground">
              Interactive Virtual Environment
            </div>
            <div className="flex justify-center gap-4">
              <Badge className="bg-green-600 text-white">
                <Flame className="h-3 w-3 mr-1" />
                {tokensBurned} Tokens Burned
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <Fish className="h-3 w-3 mr-1" />
                {animalsHelped} Animals Helped
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Landscape Selection */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            🎮 Choose Your Adventure Landscape
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {landscapes.map((landscape, index) => {
              const Icon = landscape.icon
              return (
                <Button
                  key={index}
                  onClick={() => handleLandscapeChange(landscape.name)}
                  className={`h-20 bg-gradient-to-r from-${landscape.theme}-600 to-${landscape.theme}-700 hover:from-${landscape.theme}-700 hover:to-${landscape.theme}-800 text-white`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="h-6 w-6" />
                    <span className="text-sm">{landscape.name}</span>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
