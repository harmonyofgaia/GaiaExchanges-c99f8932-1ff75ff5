
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { RefactoredSecuritySuite } from './RefactoredSecuritySuite'
import { UltimateAIEngineSuite } from './UltimateAIEngineSuite'
import { SupremeControlSuite } from './SupremeControlSuite'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="tools" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="tools">🛠️ Admin Tools</TabsTrigger>
        <TabsTrigger value="security">🛡️ Security</TabsTrigger>
        <TabsTrigger value="ai-engine">🌌 Ultimate AI</TabsTrigger>
        <TabsTrigger value="supreme-control">👑 Supreme Control</TabsTrigger>
      </TabsList>

      <TabsContent value="tools" className="space-y-6">
        <RefactoredAdminTools />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <RefactoredSecuritySuite />
      </TabsContent>

      <TabsContent value="ai-engine" className="space-y-6">
        <UltimateAIEngineSuite />
      </TabsContent>

      <TabsContent value="supreme-control" className="space-y-6">
        <SupremeControlSuite />
      </TabsContent>
    </Tabs>
  )
}
