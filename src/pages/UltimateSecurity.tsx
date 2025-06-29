
import { UltimateSecurityWall } from '@/components/security/UltimateSecurityWall'
import { ComprehensiveSecurityMonitor } from '@/components/security/ComprehensiveSecurityMonitor'
import { UltraSecureCloudVault } from '@/components/security/UltraSecureCloudVault'
import { CloudRecoverySystem } from '@/components/security/CloudRecoverySystem'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { WiFiNetworkProtection } from '@/components/security/WiFiNetworkProtection'
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
            Exotically Dangerous Hard Defensive System - Always 2 Steps Ahead
          </p>
          <p className="text-sm text-red-400 mt-2">
            🔒 Waterclosed • Counter-Attack Ready • IP Banning • System Lockdown • Quantum-Resistant • WiFi Protected
          </p>
        </div>

        <Tabs defaultValue="fortress" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-black/50 backdrop-blur-md border border-red-500/20">
            <TabsTrigger value="fortress" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              🛡️ Security Wall
            </TabsTrigger>
            <TabsTrigger value="monitor" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              📊 Monitor
            </TabsTrigger>
            <TabsTrigger value="wifi-protection" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              📶 WiFi Shield
            </TabsTrigger>
            <TabsTrigger value="cloud-vault" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🔒 Cloud Vault
            </TabsTrigger>
            <TabsTrigger value="recovery-system" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🔄 Recovery System
            </TabsTrigger>
            <TabsTrigger value="admin-recovery" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🔑 Admin Recovery
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fortress" className="space-y-6 mt-6">
            <UltimateSecurityWall />
          </TabsContent>
          
          <TabsContent value="monitor" className="space-y-6 mt-6">
            <ComprehensiveSecurityMonitor />
          </TabsContent>
          
          <TabsContent value="wifi-protection" className="space-y-6 mt-6">
            <WiFiNetworkProtection />
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
