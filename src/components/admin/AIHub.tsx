import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KoalaAIEngine } from './KoalaAIEngine'
import { DragonAIDefense } from './DragonAIDefense'
import { UltimateAIEngineSuite } from './UltimateAIEngineSuite'
import { Brain, Shield, Zap, Activity } from 'lucide-react'

export function AIHub() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brain className="h-5 w-5" />
            🧠 AI Hub - Supreme Intelligence Network
          </CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <Badge className="bg-green-600">All AI Systems Online</Badge>
            <Badge className="bg-blue-600">Neural Networks Active</Badge>
            <Badge className="bg-purple-600">Learning Enabled</Badge>
            <Badge className="bg-orange-600">Auto-Evolution</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{activeAIEngines}</div>
              <p className="text-sm text-muted-foreground">AI Engines Active</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <p className="text-sm text-muted-foreground">Learning Capacity</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">99.7%</div>
              <p className="text-sm text-muted-foreground">AI Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">24/7</div>
              <p className="text-sm text-muted-foreground">AI Operations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="koala" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="koala" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            KoalaAI Engine
          </TabsTrigger>
          <TabsTrigger value="dragon" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            DragonAI Defense
          </TabsTrigger>
          <TabsTrigger value="ultimate" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Ultimate AI Suite
          </TabsTrigger>
        </TabsList>

        <TabsContent value="koala" className="space-y-6">
          <KoalaAIEngine />
        </TabsContent>

        <TabsContent value="dragon" className="space-y-6">
          <DragonAIDefense />
        </TabsContent>

        <TabsContent value="ultimate" className="space-y-6">
          <UltimateAIEngineSuite />
        </TabsContent>
      </Tabs>
    </div>
  )
}