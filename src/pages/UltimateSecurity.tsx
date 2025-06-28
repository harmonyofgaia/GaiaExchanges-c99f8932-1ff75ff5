
import { UltimateSecurityWall } from '@/components/security/UltimateSecurityWall'
import { ComprehensiveSecurityMonitor } from '@/components/security/ComprehensiveSecurityMonitor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const UltimateSecurity = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/10 to-orange-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            ULTIMATE SECURITY FORTRESS
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            World's Most Advanced Security System - Always 2 Steps Ahead
          </p>
          <p className="text-sm text-red-400 mt-2">
            🔒 Unbreachable • Self-Learning • Quantum-Resistant • Future-Proof
          </p>
        </div>

        <Tabs defaultValue="fortress" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/50 backdrop-blur-md border border-red-500/20">
            <TabsTrigger value="fortress" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              🛡️ Ultimate Security Wall
            </TabsTrigger>
            <TabsTrigger value="monitor" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              📊 Comprehensive Monitor
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fortress" className="space-y-6 mt-6">
            <UltimateSecurityWall />
          </TabsContent>
          
          <TabsContent value="monitor" className="space-y-6 mt-6">
            <ComprehensiveSecurityMonitor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UltimateSecurity
