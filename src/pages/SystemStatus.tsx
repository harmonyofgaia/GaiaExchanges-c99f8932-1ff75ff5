
import { CrossPlatformCompatibility } from '@/components/CrossPlatformCompatibility'
import { DAppSystemMonitor } from '@/components/DAppSystemMonitor'
import { TokenManagement } from '@/components/admin/TokenManagement'
import { QuantumAdminDashboard } from '@/components/admin/QuantumAdminDashboard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const SystemStatus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌌 Quantum System Control Center
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Ultimate Quantum Security + Maximum Performance + Universal Compatibility + Real-time Monitoring
          </p>
          <p className="text-sm text-green-400 mt-2">
            🚀 All 71 Quantum Enhancement Tasks Active - Quantum Gaia Token Future Ready
          </p>
        </div>

        <Tabs defaultValue="quantum-admin" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="quantum-admin" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🌌 Quantum Admin
            </TabsTrigger>
            <TabsTrigger value="token-management" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              ∞ Token Supply
            </TabsTrigger>
            <TabsTrigger value="compatibility" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🌐 Platform Compatibility
            </TabsTrigger>
            <TabsTrigger value="system-monitor" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              📊 System Monitor
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="quantum-admin" className="space-y-6 mt-6">
            <QuantumAdminDashboard />
          </TabsContent>
          
          <TabsContent value="token-management" className="space-y-6 mt-6">
            <TokenManagement />
          </TabsContent>
          
          <TabsContent value="compatibility" className="space-y-6 mt-6">
            <CrossPlatformCompatibility />
          </TabsContent>
          
          <TabsContent value="system-monitor" className="space-y-6 mt-6">
            <DAppSystemMonitor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SystemStatus
