
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GaiaPrivateBlockchain } from './GaiaPrivateBlockchain'
import { RefactoredSecuritySuite } from './RefactoredSecuritySuite'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateCapabilitiesMatrix } from './UltimateCapabilitiesMatrix'
import { ComprehensiveSecurityMonitor } from '@/components/security/ComprehensiveSecurityMonitor'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { ImmortalSecurity } from './ImmortalSecurity'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="blockchain" className="w-full">
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-1">
        <TabsTrigger value="blockchain" className="text-xs">🔗 Blockchain</TabsTrigger>
        <TabsTrigger value="security" className="text-xs">🛡️ Security</TabsTrigger>
        <TabsTrigger value="capabilities" className="text-xs">🌌 Capabilities</TabsTrigger>
        <TabsTrigger value="tools" className="text-xs">🔧 Tools</TabsTrigger>
        <TabsTrigger value="monitoring" className="text-xs">📊 Monitor</TabsTrigger>
        <TabsTrigger value="recovery" className="text-xs">🔑 Recovery</TabsTrigger>
        <TabsTrigger value="immortal" className="text-xs">⚡ Immortal</TabsTrigger>
      </TabsList>
      
      <TabsContent value="blockchain" className="mt-6">
        <GaiaPrivateBlockchain />
      </TabsContent>
      
      <TabsContent value="security" className="mt-6">
        <RefactoredSecuritySuite />
      </TabsContent>

      <TabsContent value="capabilities" className="mt-6">
        <UltimateCapabilitiesMatrix />
      </TabsContent>
      
      <TabsContent value="tools" className="mt-6">
        <RefactoredAdminTools />
      </TabsContent>

      <TabsContent value="monitoring" className="mt-6">
        <ComprehensiveSecurityMonitor />
      </TabsContent>

      <TabsContent value="recovery" className="mt-6">
        <AdminRecoveryPortal />
      </TabsContent>

      <TabsContent value="immortal" className="mt-6">
        <ImmortalSecurity />
      </TabsContent>
    </Tabs>
  )
}
