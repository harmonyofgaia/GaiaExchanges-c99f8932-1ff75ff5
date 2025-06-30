
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MasterDefenseOrchestrator } from './MasterDefenseOrchestrator'
import { UltimateSecuritySuite } from './UltimateSecuritySuite'
import { UserIsolationSystem } from './UserIsolationSystem'
import { QuantumAdminDashboard } from './QuantumAdminDashboard'
import { TransactionReversalSystem } from './TransactionReversalSystem'
import { GlobalTrackingSystem } from './GlobalTrackingSystem'
import { CrossPlatformCompatibility } from '../CrossPlatformCompatibility'
import { PrivateBlockchainNetwork } from './PrivateBlockchainNetwork'

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-green-900/10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👑</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            HARMONY OF GAIA ADMIN DASHBOARD
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Ultimate Control Center • Dragon Protected • Quantum Secured • Unbreakable
          </p>
        </div>

        <Tabs defaultValue="quantum" className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="quantum">🧠 Quantum Mind</TabsTrigger>
            <TabsTrigger value="defense">🛡️ Master Defense</TabsTrigger>
            <TabsTrigger value="security">👑 Security Suite</TabsTrigger>
            <TabsTrigger value="isolation">🔒 User Control</TabsTrigger>
            <TabsTrigger value="transactions">💰 Fund Protection</TabsTrigger>
            <TabsTrigger value="tracking">🛰️ Global Tracking</TabsTrigger>
            <TabsTrigger value="platform">📱 Platform Support</TabsTrigger>
            <TabsTrigger value="blockchain">🔗 Private Blockchain</TabsTrigger>
          </TabsList>

          <TabsContent value="quantum" className="space-y-6">
            <QuantumAdminDashboard />
          </TabsContent>

          <TabsContent value="defense" className="space-y-6">
            <MasterDefenseOrchestrator />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <UltimateSecuritySuite />
          </TabsContent>

          <TabsContent value="isolation" className="space-y-6">
            <UserIsolationSystem />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionReversalSystem />
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <GlobalTrackingSystem />
          </TabsContent>

          <TabsContent value="platform" className="space-y-6">
            <CrossPlatformCompatibility />
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <PrivateBlockchainNetwork />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
