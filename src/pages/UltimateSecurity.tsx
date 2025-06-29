import { UltimateSecurityWall } from '@/components/security/UltimateSecurityWall'
import { ComprehensiveSecurityMonitor } from '@/components/security/ComprehensiveSecurityMonitor'
import { UltraSecureCloudVault } from '@/components/security/UltraSecureCloudVault'
import { CloudRecoverySystem } from '@/components/security/CloudRecoverySystem'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { WiFiNetworkProtection } from '@/components/security/WiFiNetworkProtection'
import { AdvancedIPProtection } from '@/components/security/AdvancedIPProtection'
import { UltimateSecurityOrchestrator } from '@/components/security/UltimateSecurityOrchestrator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { UltraFastDatabaseGuard } from '@/components/security/UltraFastDatabaseGuard'
import { DragonSecurityDashboard } from '@/components/security/DragonSecurityDashboard'

const UltimateSecurity = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/10 to-orange-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            🐉 TRAINED DRAGON ULTIMATE SECURITY 🐉
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Unbeatable Quantum Defense • Human + AI Power • Making World Safer
          </p>
          <p className="text-sm text-red-400 mt-2">
            🔒 Dragon Protected • ⚡ Quantum Evolution • 🌍 Worldwide IP Blocking • 👑 Admin Fortress • 💎 Holder Shield • 🧬 Immune System • 🔮 Github+Supabase Merged
          </p>
        </div>

        <Tabs defaultValue="dragon-core" className="w-full">
          <TabsList className="grid w-full grid-cols-10 bg-black/50 backdrop-blur-md border border-red-500/20">
            <TabsTrigger value="dragon-core" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              🐉 Dragon Core
            </TabsTrigger>
            <TabsTrigger value="orchestrator" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              👑 Master Control
            </TabsTrigger>
            <TabsTrigger value="fortress" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              🛡️ Security Wall
            </TabsTrigger>
            <TabsTrigger value="monitor" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              📊 Monitor
            </TabsTrigger>
            <TabsTrigger value="wifi-protection" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              📶 WiFi Shield
            </TabsTrigger>
            <TabsTrigger value="ip-protection" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🌐 IP Quantum
            </TabsTrigger>
            <TabsTrigger value="database-guard" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              💧 Database Guard
            </TabsTrigger>
            <TabsTrigger value="cloud-vault" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🔒 Cloud Vault
            </TabsTrigger>
            <TabsTrigger value="recovery-system" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
              🔄 Recovery System
            </TabsTrigger>
            <TabsTrigger value="admin-recovery" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🔑 Admin Recovery
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dragon-core" className="space-y-6 mt-6">
            <DragonSecurityDashboard />
          </TabsContent>
          
          <TabsContent value="orchestrator" className="space-y-6 mt-6">
            <UltimateSecurityOrchestrator />
          </TabsContent>
          
          <TabsContent value="fortress" className="space-y-6 mt-6">
            <UltimateSecurityWall />
          </TabsContent>
          
          <TabsContent value="monitor" className="space-y-6 mt-6">
            <ComprehensiveSecurityMonitor />
          </TabsContent>
          
          <TabsContent value="wifi-protection" className="space-y-6 mt-6">
            <WiFiNetworkProtection />
          </TabsContent>
          
          <TabsContent value="ip-protection" className="space-y-6 mt-6">
            <AdvancedIPProtection />
          </TabsContent>
          
          <TabsContent value="database-guard" className="space-y-6 mt-6">
            <UltraFastDatabaseGuard />
          </TabsContent>
          
          <TabsContent value="cloud-vault" className="space-y-6 mt-6">
            <UltraSecureCloudVault />
          </TabsContent>
          
          <TabsContent value="recovery-system" className="space-y-6 mt-6">
            <CloudRecoverySystem />
          </TabsContent>
          
          <TabsContent value="admin-recovery" className="space-y-6 mt-6">
            <AdminRecoveryPortal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UltimateSecurity
