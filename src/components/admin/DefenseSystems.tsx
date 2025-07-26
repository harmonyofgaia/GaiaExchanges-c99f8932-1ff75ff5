import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PhantomRecoveryEngine } from './PhantomRecoveryEngine'
import { QuantumEncryptedCommunications } from './QuantumEncryptedCommunications'
import { UltimateSecuritySuite } from './UltimateSecuritySuite'
import { Shield, Zap, Lock, Activity } from 'lucide-react'

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
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">3</div>
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
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="phantom" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="phantom" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Phantom Recovery
          </TabsTrigger>
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Quantum Communications
          </TabsTrigger>
          <TabsTrigger value="ultimate" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Ultimate Security
          </TabsTrigger>
        </TabsList>

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