
import { ParabolicAIThinking } from './ParabolicAIThinking'
import { AutonomousMastermind } from './AutonomousMastermind'
import { DefenseCreatureArmy } from './DefenseCreatureArmy'
import { SearchTrackingSuite } from './SearchTrackingSuite'
import { EntertainmentRewardsHub } from './EntertainmentRewardsHub'
import { AutonomousSystemTracker } from './AutonomousSystemTracker'
import { AdvancedAdminControl } from './AdvancedAdminControl'
import { PredictiveOptimization } from './PredictiveOptimization'

export function RefactoredAdminTools() {
  return (
    <div className="space-y-8">
      {/* Phase 1: Core Autonomous Engine */}
      <AutonomousSystemTracker />
      
      {/* Phase 2 & 3: Advanced Admin Control */}
      <AdvancedAdminControl />
      
      {/* Phase 4: Predictive Optimization */}
      <PredictiveOptimization />
      
      {/* Enhanced Original Components */}
      <ParabolicAIThinking />
      <AutonomousMastermind />
      <DefenseCreatureArmy />
      <SearchTrackingSuite />
      <EntertainmentRewardsHub />
    </div>
  )
}
