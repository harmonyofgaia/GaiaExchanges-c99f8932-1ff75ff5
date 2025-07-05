
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdvancedSearchSystem } from '@/components/search/AdvancedSearchSystem'
import { CommunityVaultSystem } from '@/components/vault/CommunityVaultSystem'
import { GoogleAuthEnhanced } from '@/components/google/GoogleAuthEnhanced'
import { QuantumAdminDashboard } from './QuantumAdminDashboard'
import { SelfTrainingAnimal } from '@/components/security/SelfTrainingAnimal'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { InvisibleAvatarTrainer } from '@/components/security/InvisibleAvatarTrainer'
import { ImmortalDefenseCore } from '@/components/security/ImmortalDefenseCore'
import { UltimateWalletProtection } from '@/components/security/UltimateWalletProtection'
import { AdminDashboard as TrackingDashboard } from '@/components/tracking/AdminDashboard'
import { UserManagementSystemRefactored } from './UserManagementSystemRefactored'

export function AdminDashboardTabs() {
  const immortalDefense = ImmortalDefenseCore()

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-10 text-xs">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="search">Search & Track</TabsTrigger>
        <TabsTrigger value="vault">Community Vault</TabsTrigger>
        <TabsTrigger value="security">Ultimate Security</TabsTrigger>
        <TabsTrigger value="animals">Self-Training</TabsTrigger>
        <TabsTrigger value="dragon">Eternal Dragon</TabsTrigger>
        <TabsTrigger value="avatars">Invisible Avatars</TabsTrigger>
        <TabsTrigger value="defense">Immortal Defense</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="google">Google Auth</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <TrackingDashboard />
        <QuantumAdminDashboard />
      </TabsContent>

      <TabsContent value="search" className="space-y-6">
        <AdvancedSearchSystem />
      </TabsContent>

      <TabsContent value="vault" className="space-y-6">
        <CommunityVaultSystem />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <UltimateWalletProtection />
      </TabsContent>

      <TabsContent value="animals" className="space-y-6">
        <SelfTrainingAnimal />
      </TabsContent>

      <TabsContent value="dragon" className="space-y-6">
        <EternalDragonDisplay />
      </TabsContent>

      <TabsContent value="avatars" className="space-y-6">
        <InvisibleAvatarTrainer />
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
                  {immortalDefense.defenseMetrics.threatsDestroyed.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Threats Destroyed</div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="users" className="space-y-6">
        <UserManagementSystemRefactored />
      </TabsContent>

      <TabsContent value="google" className="space-y-6">
        <GoogleAuthEnhanced />
      </TabsContent>
    </Tabs>
  )
}
