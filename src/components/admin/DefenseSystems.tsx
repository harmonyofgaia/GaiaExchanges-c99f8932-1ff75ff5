import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PhantomRecoveryEngine } from './PhantomRecoveryEngine'
import { QuantumEncryptedCommunications } from './QuantumEncryptedCommunications'
import { UltimateSecuritySuite } from './UltimateSecuritySuite'
import { AIDefenseAnimals } from './AIDefenseAnimals'
import { DefenseCreatureArmy } from './DefenseCreatureArmy'
import { ImmortalDefenseCore } from './ImmortalDefenseCore'
import { UltimateDefensiveBarrier } from './UltimateDefensiveBarrier'
import { InvisibleTrackingDashboard } from './InvisibleTrackingDashboard'
import { GhostAnimalArmyOrchestrator } from './GhostAnimalArmyOrchestrator'
import { ComprehensiveDefenseOverview } from './ComprehensiveDefenseOverview'
import { MasterDefenseOrchestrator } from './MasterDefenseOrchestrator'
import { DragonAIDefense } from './DragonAIDefense'
import { PhoenixGuardian } from './PhoenixGuardian'
import { KoalaAIEngine } from './KoalaAIEngine'
import { Shield, Zap, Lock, Activity, Eye, Crown, Heart, Target, Users, Ghost, Brain, Flame, Skull } from 'lucide-react'

export function DefenseSystems() {
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
              <div className="text-2xl font-bold text-red-400">15</div>
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
        {/* First Row - Core Defense Systems */}
        <div className="space-y-2">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-xs px-2">
              <Shield className="h-3 w-3" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="comprehensive" className="flex items-center gap-1 text-xs px-2">
              <Brain className="h-3 w-3" />
              Master Plan
            </TabsTrigger>
            <TabsTrigger value="orchestrator" className="flex items-center gap-1 text-xs px-2">
              <Skull className="h-3 w-3" />
              Orchestrator
            </TabsTrigger>
            <TabsTrigger value="animals" className="flex items-center gap-1 text-xs px-2">
              <Heart className="h-3 w-3" />
              AI Animals
            </TabsTrigger>
            <TabsTrigger value="army" className="flex items-center gap-1 text-xs px-2">
              <Crown className="h-3 w-3" />
              Army
            </TabsTrigger>
            <TabsTrigger value="ghost" className="flex items-center gap-1 text-xs px-2">
              <Ghost className="h-3 w-3" />
              Ghost Army
            </TabsTrigger>
          </TabsList>
          
          {/* Second Row - Specialized Defense Systems */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="immortal" className="flex items-center gap-1 text-xs px-2">
              <Zap className="h-3 w-3" />
              Immortal
            </TabsTrigger>
            <TabsTrigger value="barrier" className="flex items-center gap-1 text-xs px-2">
              <Target className="h-3 w-3" />
              Barrier
            </TabsTrigger>
            <TabsTrigger value="dragon" className="flex items-center gap-1 text-xs px-2">
              <Flame className="h-3 w-3" />
              Dragon AI
            </TabsTrigger>
            <TabsTrigger value="phoenix" className="flex items-center gap-1 text-xs px-2">
              <Activity className="h-3 w-3" />
              Phoenix
            </TabsTrigger>
            <TabsTrigger value="koala" className="flex items-center gap-1 text-xs px-2">
              <Brain className="h-3 w-3" />
              Koala AI
            </TabsTrigger>
            <TabsTrigger value="invisible" className="flex items-center gap-1 text-xs px-2">
              <Eye className="h-3 w-3" />
              Invisible
            </TabsTrigger>
          </TabsList>
          
          {/* Third Row - Advanced Systems */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3">
            <TabsTrigger value="quantum" className="flex items-center gap-1 text-xs px-2">
              <Lock className="h-3 w-3" />
              Quantum
            </TabsTrigger>
            <TabsTrigger value="phantom" className="flex items-center gap-1 text-xs px-2">
              <Activity className="h-3 w-3" />
              Phantom
            </TabsTrigger>
            <TabsTrigger value="ultimate" className="flex items-center gap-1 text-xs px-2">
              <Users className="h-3 w-3" />
              Ultimate
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border-red-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-red-400">👑 Master Defense Orchestrator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">∞</div>
                <p className="text-xs text-muted-foreground">Quantum Mastermind Power</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-red-600">Ultimate</Badge>
                  <Badge className="text-xs bg-red-600">Supreme</Badge>
                  <Badge className="text-xs bg-red-600">Untraceable</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-900/20 to-violet-900/20 border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-purple-400">👻 Ghost Animal Army</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">50+</div>
                <p className="text-xs text-muted-foreground">Invisible Operatives</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-purple-600">Stealth</Badge>
                  <Badge className="text-xs bg-purple-600">Auto-Attack</Badge>
                  <Badge className="text-xs bg-purple-600">Counter</Badge>
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
                  <Badge className="text-xs bg-orange-600">Quantum</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-yellow-400">🔥 Phoenix Guardian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">∞</div>
                <p className="text-xs text-muted-foreground">Resurrection Power</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-yellow-600">Immortal</Badge>
                  <Badge className="text-xs bg-yellow-600">Rebirth</Badge>
                  <Badge className="text-xs bg-yellow-600">Fire</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-green-400">🐨 AI Defense Animals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">14</div>
                <p className="text-xs text-muted-foreground">Active AI Guardians</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-green-600">Cyber Koala</Badge>
                  <Badge className="text-xs bg-green-600">Dragon AI</Badge>
                  <Badge className="text-xs bg-green-600">Phoenix</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-blue-400">🧠 Koala AI Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">100+</div>
                <p className="text-xs text-muted-foreground">AI Neural Networks</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-blue-600">Machine Learning</Badge>
                  <Badge className="text-xs bg-blue-600">Adaptive</Badge>
                  <Badge className="text-xs bg-blue-600">Supreme</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 border-pink-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-pink-400">👑 Defense Creature Army</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-400">14</div>
                <p className="text-xs text-muted-foreground">Legendary Creatures</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-pink-600">Alpha Dragon</Badge>
                  <Badge className="text-xs bg-pink-600">King Lion</Badge>
                  <Badge className="text-xs bg-pink-600">Sky Eagle</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-yellow-400">⚡ Immortal Defense Core</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">11</div>
                <p className="text-xs text-muted-foreground">Eternal Protectors</p>
                <div className="flex gap-1 mt-2">
                  <Badge className="text-xs bg-yellow-600">Shadow Dragon</Badge>
                  <Badge className="text-xs bg-yellow-600">Phoenix Eternal</Badge>
                  <Badge className="text-xs bg-yellow-600">Leviathan</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comprehensive" className="space-y-6">
          <ComprehensiveDefenseOverview />
        </TabsContent>

        <TabsContent value="orchestrator" className="space-y-6">
          <MasterDefenseOrchestrator />
        </TabsContent>

        <TabsContent value="ghost" className="space-y-6">
          <GhostAnimalArmyOrchestrator />
        </TabsContent>

        <TabsContent value="dragon" className="space-y-6">
          <DragonAIDefense />
        </TabsContent>

        <TabsContent value="phoenix" className="space-y-6">
          <PhoenixGuardian />
        </TabsContent>

        <TabsContent value="koala" className="space-y-6">
          <KoalaAIEngine />
        </TabsContent>

        <TabsContent value="animals" className="space-y-6">
          <AIDefenseAnimals />
        </TabsContent>

        <TabsContent value="army" className="space-y-6">
          <DefenseCreatureArmy />
        </TabsContent>

        <TabsContent value="immortal" className="space-y-6">
          <ImmortalDefenseCore />
        </TabsContent>

        <TabsContent value="barrier" className="space-y-6">
          <UltimateDefensiveBarrier />
        </TabsContent>

        <TabsContent value="invisible" className="space-y-6">
          <InvisibleTrackingDashboard />
        </TabsContent>

        <TabsContent value="phantom" className="space-y-6">
          <PhantomRecoveryEngine />
        </TabsContent>

        <TabsContent value="quantum" className="space-y-6">
          <QuantumEncryptedCommunications />
        </TabsContent>

        <TabsContent value="ultimate" className="space-y-6">
          <UltimateSecuritySuite />
        </TabsContent>
      </Tabs>
    </div>
  )
}