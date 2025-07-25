
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateSecurity } from './UltimateSecurity'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { AIDefenseAnimals } from './AIDefenseAnimals'
import { DefenseCreatureArmy } from './DefenseCreatureArmy'
import { ImmortalDefenseCore } from '@/components/security/ImmortalDefenseCore'
import { UltimateDefensiveBarrier } from '@/components/security/UltimateDefensiveBarrier'
import { BreachSimulation } from './BreachSimulation'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="control" className="w-full">
      <TabsList className="grid w-full grid-cols-9">
        <TabsTrigger value="control">Control Center</TabsTrigger>
        <TabsTrigger value="security">Security Suite</TabsTrigger>
        <TabsTrigger value="ai-animals">🛡️ AI Animals</TabsTrigger>
        <TabsTrigger value="creature-army">⚔️ Army</TabsTrigger>
        <TabsTrigger value="immortal-core">♾️ Immortal</TabsTrigger>
        <TabsTrigger value="defense-barrier">🔮 Barrier</TabsTrigger>
        <TabsTrigger value="breach-sim">🚨 Breach Sim</TabsTrigger>
        <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        <TabsTrigger value="recovery">Recovery Portal</TabsTrigger>
      </TabsList>

      <TabsContent value="control" className="space-y-6">
        <AdminControlSystem />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <UltimateSecurity />
      </TabsContent>

      <TabsContent value="ai-animals" className="space-y-6">
        <AIDefenseAnimals />
      </TabsContent>

      <TabsContent value="creature-army" className="space-y-6">
        <DefenseCreatureArmy />
      </TabsContent>

      <TabsContent value="immortal-core" className="space-y-6">
        <ImmortalDefenseCore />
      </TabsContent>

      <TabsContent value="defense-barrier" className="space-y-6">
        <UltimateDefensiveBarrier />
      </TabsContent>

      <TabsContent value="breach-sim" className="space-y-6">
        <BreachSimulation />
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
