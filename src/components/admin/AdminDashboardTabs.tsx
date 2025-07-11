
import { UltimateAdminSuite } from './UltimateAdminSuite'
import { TaskTracker } from '@/components/TaskTracker'
import { CreatureManagement } from './CreatureManagement'
import { GaiaBlockchain } from '@/components/blockchain/GaiaBlockchain'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function AdminDashboardTabs() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md border border-green-500/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
            🌍 System Overview
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            🔗 Private Blockchain
          </TabsTrigger>
          <TabsTrigger value="creatures" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
            🦁 Creature Army
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
            📋 Task Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <UltimateAdminSuite />
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6 mt-6">
          <GaiaBlockchain />
        </TabsContent>

        <TabsContent value="creatures" className="space-y-6 mt-6">
          <CreatureManagement />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6 mt-6">
          <TaskTracker />
        </TabsContent>
      </Tabs>
    </div>
  )
}
