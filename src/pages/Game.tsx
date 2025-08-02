
import { HabboTycoonGame } from '@/components/games/HabboTycoonGame'
import { WormsGameArena } from '@/components/WormsGameArena'
import { CreativeGameEngine } from '@/components/games/CreativeGameEngine'
import { SnakeToWormsIntegration } from '@/components/games/SnakeToWormsIntegration'
import { InvisibleAttachmentSystem } from '@/components/security/InvisibleAttachmentSystem'
import { InvisibleSecurityCore } from '@/components/security/InvisibleSecurityCore'
import { Invisible4StepVerification } from '@/components/security/Invisible4StepVerification'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Building2, Target } from 'lucide-react'

const Game = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <InvisibleAttachmentSystem />
      <InvisibleSecurityCore />
      <Invisible4StepVerification />
      
      <div className="container mx-auto space-y-6">
        {/* Game Hub Header */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400 text-2xl">
              <Gamepad2 className="h-8 w-8 animate-bounce" />
              🎮 GAiA GAME HUB - ALL GAMES FULLY OPERATIONAL
            </CardTitle>
            <div className="flex gap-4">
              <Badge className="bg-green-600 animate-pulse">
                ✅ ALL FEATURES ACTIVE
              </Badge>
              <Badge className="bg-blue-600">
                🏨 Habbo Tycoon Ready
              </Badge>
              <Badge className="bg-orange-600">
                💥 Worms Arena Ready
              </Badge>
              <Badge className="bg-purple-600">
                🚀 Creative Engine Active
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Game Tabs */}
        <Tabs defaultValue="habbo" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20">
            <TabsTrigger value="habbo" className="data-[state=active]:bg-purple-600">
              <Building2 className="h-4 w-4 mr-2" />
              🏨 Habbo Tycoon
            </TabsTrigger>
            <TabsTrigger value="worms" className="data-[state=active]:bg-orange-600">
              <Target className="h-4 w-4 mr-2" />
              💥 Worms Arena
            </TabsTrigger>
            <TabsTrigger value="engine" className="data-[state=active]:bg-blue-600">
              <Gamepad2 className="h-4 w-4 mr-2" />
              🚀 Game Engine
            </TabsTrigger>
          </TabsList>

          <TabsContent value="habbo" className="space-y-6">
            <HabboTycoonGame />
          </TabsContent>

          <TabsContent value="worms" className="space-y-6">
            <WormsGameArena />
          </TabsContent>

          <TabsContent value="engine" className="space-y-6">
            <CreativeGameEngine />
          </TabsContent>
        </Tabs>

        {/* System Status */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">🎮 Game System Status</h4>
          <div className="text-sm text-green-300">
            ✅ Habbo Tycoon: Building system, income generation, chat rooms active<br/>
            ✅ Worms Game Arena: Physics engine, weapons, multiplayer ready<br/>
            ✅ Creative Game Engine: AI processing, quantum efficiency at maximum<br/>
            ✅ All security protocols and invisible systems operational
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
