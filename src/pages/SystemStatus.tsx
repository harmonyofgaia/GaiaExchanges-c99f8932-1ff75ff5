
import { CrossPlatformCompatibility } from '@/components/CrossPlatformCompatibility'
import { DAppSystemMonitor } from '@/components/DAppSystemMonitor'
import { TokenManagement } from '@/components/admin/TokenManagement'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const SystemStatus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            DApp System Control Center
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Maximum Supply Protocol + Universal Platform Compatibility + Real-time System Monitoring
          </p>
          <p className="text-sm text-green-400 mt-2">
            🚀 Quantum-Scale Token Supply Management & Cross-Platform Optimization
          </p>
        </div>

        <Tabs defaultValue="token-management" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="token-management" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              ∞ Token Supply Management
            </TabsTrigger>
            <TabsTrigger value="compatibility" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🌐 Platform Compatibility
            </TabsTrigger>
            <TabsTrigger value="system-monitor" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              📊 System Monitor
            </TabsTrigger>
          </TabsList>
          
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
