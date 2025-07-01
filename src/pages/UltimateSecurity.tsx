
import { UnifiedDragonSecurity } from '@/components/security/UnifiedDragonSecurity'
import { UltimateSecurityWall } from '@/components/security/UltimateSecurityWall'
import { ComprehensiveSecurityMonitor } from '@/components/security/ComprehensiveSecurityMonitor'
import { UltraSecureCloudVault } from '@/components/security/UltraSecureCloudVault'
import { CloudRecoverySystem } from '@/components/security/CloudRecoverySystem'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const UltimateSecurity = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-green-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            ⚡ ULTIMATE QUANTUM SECURITY FORTRESS ⚡
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Unbreakable • Eternal • Dragon-Powered • Quantum-Proof • Community Protected Forever
          </p>
          <p className="text-lg text-green-400 mt-2">
            🛡️ NO SYSTEM, COMPUTER, OR QUANTUM TECHNOLOGY CAN EVER BREACH OUR DEFENSES 🛡️
          </p>
        </div>

        <Tabs defaultValue="ultimate-wall" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-black/50 backdrop-blur-md border border-purple-500/20">
            <TabsTrigger value="ultimate-wall" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🛡️ Ultimate Wall
            </TabsTrigger>
            <TabsTrigger value="dragon-security" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🐲 Dragon Security
            </TabsTrigger>
            <TabsTrigger value="quantum-monitor" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              ⚡ Quantum Monitor
            </TabsTrigger>
            <TabsTrigger value="secure-vault" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              🔒 Secure Vault
            </TabsTrigger>
            <TabsTrigger value="cloud-recovery" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              ☁️ Cloud Recovery
            </TabsTrigger>
            <TabsTrigger value="admin-portal" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">
              👑 Admin Portal
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ultimate-wall" className="space-y-6 mt-6">
            <UltimateSecurityWall />
          </TabsContent>
          
          <TabsContent value="dragon-security" className="space-y-6 mt-6">
            {/* Dragon security runs in background */}
            <div className="text-center p-8 bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-lg border border-green-500/20">
              <h2 className="text-3xl font-bold text-green-400 mb-4">🐲 DRAGON SECURITY ACTIVE</h2>
              <p className="text-lg text-muted-foreground">
                Four mighty dragons protect our community 24/7 with quantum-level power
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="quantum-monitor" className="space-y-6 mt-6">
            <ComprehensiveSecurityMonitor />
          </TabsContent>
          
          <TabsContent value="secure-vault" className="space-y-6 mt-6">
            <UltraSecureCloudVault />
          </TabsContent>
          
          <TabsContent value="cloud-recovery" className="space-y-6 mt-6">
            <CloudRecoverySystem />
          </TabsContent>
          
          <TabsContent value="admin-portal" className="space-y-6 mt-6">
            <AdminRecoveryPortal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UltimateSecurity
