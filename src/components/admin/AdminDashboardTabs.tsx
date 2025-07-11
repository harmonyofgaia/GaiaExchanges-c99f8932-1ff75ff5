
import { UltimateAdminSuite } from './UltimateAdminSuite'
import { TaskTracker } from '@/components/TaskTracker'
import { GaiaPrivateBlockchain } from './GaiaPrivateBlockchain'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DefenseCreatureArmy } from './DefenseCreatureArmy'
import { SearchTrackingSuite } from './SearchTrackingSuite'
import { EntertainmentRewardsHub } from './EntertainmentRewardsHub'
import { ParabolicAIThinking } from './ParabolicAIThinking'
import { AutonomousMastermind } from './AutonomousMastermind'
import { UltimateAdminControls } from './UltimateAdminControls'
import { SelfTrainingKoalaAI } from './SelfTrainingKoalaAI'

export function AdminDashboardTabs() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="ai-engine">🧠 AI Engine</TabsTrigger>
          <TabsTrigger value="blockchain">Private Blockchain</TabsTrigger>
          <TabsTrigger value="creatures">Defense Army</TabsTrigger>
          <TabsTrigger value="search">Search & Track</TabsTrigger>
          <TabsTrigger value="entertainment">Shows & Rewards</TabsTrigger>
          <TabsTrigger value="godfather">👑 Godfather</TabsTrigger>
          <TabsTrigger value="suite">Ultimate Suite</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Task Tracker Overview */}
          <TaskTracker />
        </TabsContent>

        <TabsContent value="ai-engine" className="space-y-6">
          {/* AI Engine Control Center */}
          <div className="grid gap-6">
            <ParabolicAIThinking />
            <AutonomousMastermind />
            <SelfTrainingKoalaAI />
          </div>
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

        <TabsContent value="godfather" className="space-y-6">
          {/* Ultimate Admin Controls */}
          <UltimateAdminControls />
        </TabsContent>

        <TabsContent value="suite" className="space-y-6">
          {/* Ultimate Admin Suite */}
          <UltimateAdminSuite />
        </TabsContent>
      </Tabs>
    </div>
  )
}
