
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings, Users, Zap } from 'lucide-react'

export function GameModeSelector() {
  const modes = [
    {
      name: 'Solo Campaign',
      description: 'Single player adventure',
      difficulty: 'Medium',
      players: 1,
      status: 'active'
    },
    {
      name: 'Multiplayer Arena',
      description: 'Battle with friends',
      difficulty: 'Hard',
      players: '2-8',
      status: 'active'
    },
    {
      name: 'Co-op Mission',
      description: 'Team up for challenges',
      difficulty: 'Expert',
      players: '2-4',
      status: 'active'
    }
  ]

  return (
    <Card className="border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="text-blue-400">🎮 Game Mode Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modes.map((mode, index) => (
            <div key={index} className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">{mode.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-green-600">{mode.difficulty}</Badge>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 text-sm">{mode.players}</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                <Zap className="h-4 w-4 mr-2" />
                Select Mode
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
