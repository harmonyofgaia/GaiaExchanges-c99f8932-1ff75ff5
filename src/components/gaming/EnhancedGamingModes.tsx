
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GameModeSelector } from './GameModeSelector'
import { GameStyleSelector } from './GameStyleSelector'
import { Zap, Crown, Sword, Shield, Star, Rocket } from 'lucide-react'

export function EnhancedGamingModes() {
  const gameModes = [
    {
      id: 'tournament',
      name: '🏆 Tournament Mode',
      description: 'Competitive tournaments with global rankings',
      icon: <Crown className="h-6 w-6" />,
      color: 'from-yellow-600 to-orange-600',
      players: '2,847 active'
    },
    {
      id: 'survival',
      name: '🛡️ Survival Mode',
      description: 'Ultimate endurance challenges',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-green-600 to-teal-600',
      players: '1,234 active'
    },
    {
      id: 'blitz',
      name: '⚡ Blitz Mode',
      description: 'Fast-paced lightning rounds',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-purple-600 to-pink-600',
      players: '5,678 active'
    },
    {
      id: 'hardcore',
      name: '⚔️ Hardcore Mode',
      description: 'Maximum difficulty challenges',
      icon: <Sword className="h-6 w-6" />,
      color: 'from-red-600 to-orange-600',
      players: '987 active'
    }
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-2xl">
            <Rocket className="h-8 w-8" />
            🔥 ENHANCED GAMING MODES
          </CardTitle>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-600 animate-pulse">
              ✅ ALL MODES ACTIVE
            </Badge>
            <Badge className="bg-blue-600">
              🎮 Advanced Features
            </Badge>
            <Badge className="bg-purple-600">
              🚀 Quantum Enhanced
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="modes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/20 mb-6">
          <TabsTrigger value="modes" className="data-[state=active]:bg-purple-600">
            <Crown className="h-4 w-4 mr-2" />
            Game Modes
          </TabsTrigger>
          <TabsTrigger value="styles" className="data-[state=active]:bg-blue-600">
            <Star className="h-4 w-4 mr-2" />
            Game Styles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gameModes.map((mode) => (
              <Card key={mode.id} className={`bg-gradient-to-br ${mode.color}/20 border-2 border-opacity-50 hover:scale-105 transition-all`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    {mode.icon}
                    {mode.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={`bg-gradient-to-r ${mode.color}`}>
                      ACTIVE
                    </Badge>
                    <Badge className="bg-blue-600">
                      👥 {mode.players}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{mode.description}</p>
                  <Button className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90 text-white font-bold`}>
                    <Rocket className="h-4 w-4 mr-2" />
                    Enter Mode
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <GameModeSelector />
        </TabsContent>

        <TabsContent value="styles" className="space-y-6">
          <GameStyleSelector />
        </TabsContent>
      </Tabs>

      {/* Enhanced Features Status */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
        <h4 className="font-medium text-purple-400 mb-2">🚀 Enhanced Gaming Features</h4>
        <div className="text-sm text-purple-300">
          ✅ Quantum-enhanced game physics engine<br/>
          ✅ Real-time AI opponent adaptation<br/>
          ✅ Cross-platform synchronization<br/>
          ✅ Advanced analytics and performance tracking<br/>
          ✅ Dynamic difficulty adjustment system
        </div>
      </div>
    </div>
  )
}
