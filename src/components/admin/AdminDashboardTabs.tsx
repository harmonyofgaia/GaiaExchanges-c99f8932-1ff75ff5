
import { UltimateAdminSuite } from './UltimateAdminSuite'
import { TaskTracker } from '@/components/TaskTracker'
import { GaiaPrivateBlockchain } from './GaiaPrivateBlockchain'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function AdminDashboardTabs() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="blockchain">Private Blockchain</TabsTrigger>
          <TabsTrigger value="tasks">Task Tracker</TabsTrigger>
          <TabsTrigger value="suite">Ultimate Suite</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Task Tracker Overview */}
          <TaskTracker />
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          {/* Private Blockchain Network */}
          <GaiaPrivateBlockchain />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          {/* Task Tracker */}
          <TaskTracker />
        </TabsContent>

        <TabsContent value="suite" className="space-y-6">
          {/* Ultimate Admin Suite */}
          <UltimateAdminSuite />
        </TabsContent>
      </Tabs>
    </div>
  )
}
