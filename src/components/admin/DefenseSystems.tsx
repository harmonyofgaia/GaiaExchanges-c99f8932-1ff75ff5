import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ComprehensiveDefenseOverview } from './ComprehensiveDefenseOverview'
import { DragonAIDefense } from './DragonAIDefense'
import { AIDefenseAnimals } from './AIDefenseAnimals'
import UltimateSecurity from './UltimateSecurity'
import { ImmortalDefenseCore } from './ImmortalDefenseCore'
import { UltimateDefensiveBarrier } from './UltimateDefensiveBarrier'
import { Shield, Zap, Lock, Activity, Eye, Crown, Heart, Target, Users, Ghost, Brain, Flame, Skull } from 'lucide-react'

export function DefenseSystems() {
  const defenseLayerCount = 15 // Count of active defense layers

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-5 w-5" />
            🛡️ Defense Systems - Ultimate Protection Matrix
          </CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <Badge className="bg-green-600">All Defenses Active</Badge>
            <Badge className="bg-blue-600">Quantum Protected</Badge>
            <Badge className="bg-red-600">Threat Detection</Badge>
            <Badge className="bg-orange-600">Auto-Recovery</Badge>
            <Badge className="bg-purple-600">Immortal Core</Badge>
            <Badge className="bg-pink-600">Invisible Shield</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{defenseLayerCount}</div>
              <p className="text-sm text-muted-foreground">Defense Layers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <p className="text-sm text-muted-foreground">Protection Level</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">0</div>
              <p className="text-sm text-muted-foreground">Active Threats</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <p className="text-sm text-muted-foreground">Recovery Capacity</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">100+</div>
              <p className="text-sm text-muted-foreground">Defense Animals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">999M+</div>
              <p className="text-sm text-muted-foreground">Defense Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        {/* Core Defense Systems */}
        <div className="space-y-2">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-xs px-2">
              <Shield className="h-3 w-3" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="comprehensive" className="flex items-center gap-1 text-xs px-2">
              <Brain className="h-3 w-3" />
              Defense Overview
            </TabsTrigger>
            <TabsTrigger value="dragon" className="flex items-center gap-1 text-xs px-2">
              <Flame className="h-3 w-3" />
              Dragon AI
            </TabsTrigger>
            <TabsTrigger value="animals" className="flex items-center gap-1 text-xs px-2">
              <Heart className="h-3 w-3" />
              AI Animals
            </TabsTrigger>
            <TabsTrigger value="immortal" className="flex items-center gap-1 text-xs px-2">
              <Zap className="h-3 w-3" />
              Immortal Core
            </TabsTrigger>
            <TabsTrigger value="ultimate" className="flex items-center gap-1 text-xs px-2">
              <Lock className="h-3 w-3" />
              Ultimate Security
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border-red-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-red-400">🛡️ Active Defense Layers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">{defenseLayerCount}</div>
                <p className="text-xs text-muted-foreground">Multi-layer Protection</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-red-600">Quantum</Badge>
                  <Badge className="text-xs bg-red-600">AI-Powered</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-orange-400">🔥 Dragon AI Defense</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">99.9%</div>
                <p className="text-xs text-muted-foreground">Threat Elimination</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-orange-600">Fire Breath</Badge>
                  <Badge className="text-xs bg-orange-600">AI Tactics</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-green-400">🐾 AI Defense Animals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">14</div>
                <p className="text-xs text-muted-foreground">Active AI Guardians</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-green-600">Cyber Animals</Badge>
                  <Badge className="text-xs bg-green-600">AI Powered</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-yellow-400">⚡ Immortal Defense Core</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">∞</div>
                <p className="text-xs text-muted-foreground">Infinite Protection</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-yellow-600">Immortal</Badge>
                  <Badge className="text-xs bg-yellow-600">Self-Healing</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comprehensive" className="space-y-6">
          <ComprehensiveDefenseOverview />
        </TabsContent>

        <TabsContent value="dragon" className="space-y-6">
          <DragonAIDefense />
        </TabsContent>

        <TabsContent value="animals" className="space-y-6">
          <AIDefenseAnimals />
        </TabsContent>

        <TabsContent value="immortal" className="space-y-6">
          <ImmortalDefenseCore />
        </TabsContent>

        <TabsContent value="ultimate" className="space-y-6">
          <UltimateSecurity />
        </TabsContent>
      </Tabs>
    </div>
  )
}