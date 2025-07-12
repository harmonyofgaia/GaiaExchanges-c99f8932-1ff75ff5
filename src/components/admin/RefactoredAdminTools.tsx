
import { ParabolicAIThinking } from './ParabolicAIThinking'
import { AutonomousMastermind } from './AutonomousMastermind'
import { DefenseCreatureArmy } from './DefenseCreatureArmy'
import { SearchTrackingSuite } from './SearchTrackingSuite'
import { EntertainmentRewardsHub } from './EntertainmentRewardsHub'

export function RefactoredAdminTools() {
  return (
    <div className="space-y-8">
      <ParabolicAIThinking />
      <AutonomousMastermind />
      <DefenseCreatureArmy />
      <SearchTrackingSuite />
      <EntertainmentRewardsHub />
    </div>
  )
}
