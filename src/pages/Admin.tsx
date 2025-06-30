
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { ParabolicCommandCenter } from '@/components/admin/ParabolicCommandCenter'
import { GlobalExchangeIntegration } from '@/components/marketing/GlobalExchangeIntegration'
import { GlobalSatelliteSystem } from '@/components/intelligence/GlobalSatelliteSystem'
import { SelfTrainingAnimal } from '@/components/security/SelfTrainingAnimal'
import { Advanced3DDesigner } from '@/components/admin/Advanced3DDesigner'
import { MasterplanEngine } from '@/components/admin/MasterplanEngine'
import { QuantumGlobalSearchEngine } from '@/components/admin/QuantumGlobalSearchEngine'
import { BlockchainRollbackManager } from '@/components/admin/BlockchainRollbackManager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Admin() {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-4">
              👑 GAiA ULTIMATE QUANTUM ADMIN CENTER
            </h1>
            <p className="text-gray-300 text-lg">
              20 Quantum Computers • Global Search Engine • Blockchain Rollback • Infinite Power
            </p>
          </div>
          
          <Tabs defaultValue="command" className="w-full">
            <TabsList className="grid w-full grid-cols-8 bg-black/50 backdrop-blur-md border border-purple-500/20">
              <TabsTrigger value="command" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                👑 Command
              </TabsTrigger>
              <TabsTrigger value="quantum-search" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                🔍 Quantum Search
              </TabsTrigger>
              <TabsTrigger value="blockchain" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                🔄 Blockchain
              </TabsTrigger>
              <TabsTrigger value="exchanges" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                🌍 Exchanges
              </TabsTrigger>
              <TabsTrigger value="satellites" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                🛰️ Satellites
              </TabsTrigger>
              <TabsTrigger value="training" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
                🦁 Training
              </TabsTrigger>
              <TabsTrigger value="3d-designer" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">
                🎨 3D Designer
              </TabsTrigger>
              <TabsTrigger value="masterplan" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                🧠 Masterplan
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="command" className="space-y-6 mt-6">
              <ParabolicCommandCenter />
            </TabsContent>
            
            <TabsContent value="quantum-search" className="space-y-6 mt-6">
              <QuantumGlobalSearchEngine />
            </TabsContent>
            
            <TabsContent value="blockchain" className="space-y-6 mt-6">
              <BlockchainRollbackManager />
            </TabsContent>
            
            <TabsContent value="exchanges" className="space-y-6 mt-6">
              <GlobalExchangeIntegration />
            </TabsContent>
            
            <TabsContent value="satellites" className="space-y-6 mt-6">
              <GlobalSatelliteSystem />
            </TabsContent>
            
            <TabsContent value="training" className="space-y-6 mt-6">
              <SelfTrainingAnimal />
            </TabsContent>
            
            <TabsContent value="3d-designer" className="space-y-6 mt-6">
              <Advanced3DDesigner />
            </TabsContent>
            
            <TabsContent value="masterplan" className="space-y-6 mt-6">
              <MasterplanEngine />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminProtectedRoute>
  )
}
