import { UltimateAdminSuite } from './UltimateAdminSuite'
import { TaskTracker } from '@/components/TaskTracker'
import { GaiaPrivateBlockchain } from './GaiaPrivateBlockchain'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DefenseCreatureArmy } from './DefenseCreatureArmy'
import { SearchTrackingSuite } from './SearchTrackingSuite'
import { EntertainmentRewardsHub } from './EntertainmentRewardsHub'

export function AdminDashboardTabs() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="blockchain">Private Blockchain</TabsTrigger>
          <TabsTrigger value="creatures">Defense Army</TabsTrigger>
          <TabsTrigger value="search">Search & Track</TabsTrigger>
          <TabsTrigger value="entertainment">Shows & Rewards</TabsTrigger>
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

        <TabsContent value="creatures" className="space-y-6">
          {/* Defense Creature Army */}
          <DefenseCreatureArmy />
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          {/* Search & Tracking Systems */}
          <SearchTrackingSuite />
        </TabsContent>

        <TabsContent value="entertainment" className="space-y-6">
          {/* Entertainment & Rewards Hub */}
          <EntertainmentRewardsHub />
        </TabsContent>

        <TabsContent value="suite" className="space-y-6">
          {/* Ultimate Admin Suite */}
          <UltimateAdminSuite />
        </TabsContent>
      </Tabs>
    </div>
  )
}
