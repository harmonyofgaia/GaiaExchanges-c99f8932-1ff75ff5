
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateSecurity } from './UltimateSecurity'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="control" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="control">Control Center</TabsTrigger>
        <TabsTrigger value="security">Security Suite</TabsTrigger>
        <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        <TabsTrigger value="recovery">Recovery Portal</TabsTrigger>
      </TabsList>

      <TabsContent value="control" className="space-y-6">
        <AdminControlSystem />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <UltimateSecurity />
      </TabsContent>

      <TabsContent value="tools" className="space-y-6">
        <RefactoredAdminTools />
      </TabsContent>

      <TabsContent value="recovery" className="space-y-6">
        <AdminRecoveryPortal />
      </TabsContent>
    </Tabs>
  )
}
