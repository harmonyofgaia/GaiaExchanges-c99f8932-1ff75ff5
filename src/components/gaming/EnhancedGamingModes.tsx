
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Zap, 
  Shield, 
  Sword, 
  Crown,
  Target,
  Gamepad2
} from 'lucide-react'

export function EnhancedGamingModes() {
  const gameModes = [
    {
      name: '⚔️ Battle Royale',
      description: 'Last player standing in epic battles',
      icon: <Sword className="h-6 w-6" />,
      color: 'from-red-600 to-orange-600',
      players: '100 max',
      difficulty: 'Expert'
    },
    {
      name: '🛡️ Defense Mode',
      description: 'Protect your base from waves of enemies',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-blue-600 to-cyan-600',
      players: '1-4',
      difficulty: 'Medium'
    },
    {
      name: '🎯 Precision Mode',
      description: 'Test your accuracy and timing skills',
      icon: <Target className="h-6 w-6" />,
      color: 'from-green-600 to-emerald-600',
      players: '1-8',
      difficulty: 'Hard'
    },
    {
      name: '👑 King of Hill',
      description: 'Control territory and dominate the map',
      icon: <Crown className="h-6 w-6" />,
      color: 'from-purple-600 to-pink-600',
      players: '2-16',
      difficulty: 'Expert'
    }
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-2 border-orange-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Gamepad2 className="h-6 w-6 animate-bounce" />
            🎮 ENHANCED GAMING MODES
          </CardTitle>
          <div className="text-center">
            <Badge className="bg-green-600 animate-pulse mr-2">
              ✅ ALL MODES ACTIVE
            </Badge>
            <Badge className="bg-blue-600 mr-2">
              🚀 QUANTUM ENHANCED
            </Badge>
            <Badge className="bg-purple-600">
              ⚡ REAL-TIME BATTLES
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gameModes.map((mode, index) => (
              <Card 
                key={index}
                className={`bg-gradient-to-br ${mode.color}/20 border-2 border-opacity-50 hover:scale-105 transition-all duration-300`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <div className="text-white">{mode.icon}</div>
                    {mode.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={`bg-gradient-to-r ${mode.color}`}>
                      👥 {mode.players}
                    </Badge>
                    <Badge className="bg-gray-600">
                      🎯 {mode.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{mode.description}</p>
                  <Button 
                    className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90 text-white font-bold`}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
