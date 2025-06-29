
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { ParabolicCommandCenter } from '@/components/admin/ParabolicCommandCenter'
import { GlobalExchangeIntegration } from '@/components/marketing/GlobalExchangeIntegration'
import { GlobalSatelliteSystem } from '@/components/intelligence/GlobalSatelliteSystem'
import { SelfTrainingAnimal } from '@/components/security/SelfTrainingAnimal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Admin() {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-4">
              👑 GAiA ULTIMATE ADMIN CONTROL CENTER
            </h1>
            <p className="text-gray-300 text-lg">
              Parabolic Universe Access • Global Satellite Control • Exchange Domination • Infinite Power
            </p>
          </div>
          
          <Tabs defaultValue="command" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md border border-purple-500/20">
              <TabsTrigger value="command" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                👑 Parabolic Command
              </TabsTrigger>
              <TabsTrigger value="exchanges" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                🌍 Global Exchanges
              </TabsTrigger>
              <TabsTrigger value="satellites" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                🛰️ Satellite Intelligence
              </TabsTrigger>
              <TabsTrigger value="training" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
                🦁 Self-Training Engine
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="command" className="space-y-6 mt-6">
              <ParabolicCommandCenter />
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
          </Tabs>
        </div>
      </div>
    </AdminProtectedRoute>
  )
}
