
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { ParabolicCommandCenter } from '@/components/admin/ParabolicCommandCenter'
import { GlobalExchangeIntegration } from '@/components/marketing/GlobalExchangeIntegration'
import { GlobalSatelliteSystem } from '@/components/intelligence/GlobalSatelliteSystem'
import { SelfTrainingAnimal } from '@/components/security/SelfTrainingAnimal'
import { Advanced3DDesigner } from '@/components/admin/Advanced3DDesigner'
import { MasterplanEngine } from '@/components/admin/MasterplanEngine'
import { QuantumGlobalSearchEngine } from '@/components/admin/QuantumGlobalSearchEngine'
import { BlockchainRollbackManager } from '@/components/admin/BlockchainRollbackManager'
import { QuantumGlobalCommandCenter } from '@/components/admin/QuantumGlobalCommandCenter'
import { UltimateAdminControls } from '@/components/admin/UltimateAdminControls'
import { QuantumGameInventory } from '@/components/admin/QuantumGameInventory'
import { IntellectualPropertyProtection } from '@/components/legal/IntellectualPropertyProtection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Admin() {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-4">
              👑 GAiA ULTIMATE QUANTUM ADMIN CENTER - GODFATHER MODE
            </h1>
            <p className="text-gray-300 text-lg">
              20 Quantum Computers • Global Search Engine • Ultimate Control • Infinite Power • Gaming Universe
            </p>
          </div>
          
          <Tabs defaultValue="quantum-command" className="w-full">
            <TabsList className="grid w-full grid-cols-11 bg-black/50 backdrop-blur-md border border-purple-500/20 text-xs">
              <TabsTrigger value="quantum-command" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                👑 Quantum Command
              </TabsTrigger>
              <TabsTrigger value="ultimate-controls" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                ⚡ Ultimate Controls
              </TabsTrigger>
              <TabsTrigger value="game-inventory" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                🎮 Game Inventory
              </TabsTrigger>
              <TabsTrigger value="command" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                💻 Command Center
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
              <TabsTrigger value="legal-protection" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                🛡️ Legal Protection
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="quantum-command" className="space-y-6 mt-6">
              <QuantumGlobalCommandCenter />
            </TabsContent>
            
            <TabsContent value="ultimate-controls" className="space-y-6 mt-6">
              <UltimateAdminControls />
            </TabsContent>
            
            <TabsContent value="game-inventory" className="space-y-6 mt-6">
              <QuantumGameInventory />
            </TabsContent>
            
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
            
            <TabsContent value="legal-protection" className="space-y-6 mt-6">
              <IntellectualPropertyProtection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminProtectedRoute>
  )
}
