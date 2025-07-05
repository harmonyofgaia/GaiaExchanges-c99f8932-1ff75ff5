
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SearchAndTrack } from '@/components/search/SearchAndTrack'
import { GoogleAuthEnhanced } from '@/components/google/GoogleAuthEnhanced'
import { SecureVaultSystem } from '@/components/SecureVaultSystem'
import { QuantumAdminDashboard } from './QuantumAdminDashboard'
import { SelfTrainingAnimal } from '@/components/security/SelfTrainingAnimal'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { InvisibleAvatarTrainer } from '@/components/security/InvisibleAvatarTrainer'
import { ImmortalDefenseCore } from '@/components/security/ImmortalDefenseCore'
import { AdminDashboard as TrackingDashboard } from '@/components/tracking/AdminDashboard'

export function AdminDashboardTabs() {
  const immortalDefense = ImmortalDefenseCore()

  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="search">Search & Track</TabsTrigger>
        <TabsTrigger value="vault">Vault System</TabsTrigger>
        <TabsTrigger value="google">Google Auth</TabsTrigger>
        <TabsTrigger value="quantum">Quantum Core</TabsTrigger>
        <TabsTrigger value="animals">Self-Training</TabsTrigger>
        <TabsTrigger value="dragon">Eternal Dragon</TabsTrigger>
        <TabsTrigger value="defense">Immortal Defense</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="space-y-6">
        <TrackingDashboard />
      </TabsContent>

      <TabsContent value="search" className="space-y-6">
        <SearchAndTrack />
      </TabsContent>

      <TabsContent value="vault" className="space-y-6">
        <SecureVaultSystem />
      </TabsContent>

      <TabsContent value="google" className="space-y-6">
        <GoogleAuthEnhanced />
      </TabsContent>

      <TabsContent value="quantum" className="space-y-6">
        <QuantumAdminDashboard />
      </TabsContent>

      <TabsContent value="animals" className="space-y-6">
        <SelfTrainingAnimal />
        <InvisibleAvatarTrainer />
      </TabsContent>

      <TabsContent value="dragon" className="space-y-6">
        <EternalDragonDisplay />
      </TabsContent>

      <TabsContent value="defense" className="space-y-6">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-400 mb-4">
              🔥 IMMORTAL DEFENSE SYSTEM STATUS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
                <div className="text-2xl font-bold text-red-400">
                  {immortalDefense.immortalAnimals.length}
                </div>
                <div className="text-sm text-muted-foreground">Immortal Animals</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-500/30">
                <div className="text-2xl font-bold text-orange-400">
                  {immortalDefense.defenseMetrics.combinedPowerLevel.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Combined Power</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-400">
                  {immortalDefense.defenseMetrics.evolutionRate.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Evolution Rate</div>
              </div>
              <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">
                  {immortalDefense.defenseMetrics.threatsDestroyed}
                </div>
                <div className="text-sm text-muted-foreground">Threats Destroyed</div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
