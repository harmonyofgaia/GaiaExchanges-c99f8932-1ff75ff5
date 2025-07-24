import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UltimateAdminSuite } from '@/components/admin/UltimateAdminSuite'
import { MasterAdminControlCenter } from '@/components/admin/MasterAdminControlCenter'
import { DragonAIDefense } from '@/components/admin/DragonAIDefense'
import { KoalaAIEngine } from '@/components/admin/KoalaAIEngine'
import { UltimateIntelligenceHub } from '@/components/admin/UltimateIntelligenceHub'
import { AdminMediaLibrary } from '@/components/admin/AdminMediaLibrary'
import { WalletEngineAdmin } from '@/components/admin/WalletEngineAdmin'
import { TokenBurnController } from '@/components/admin/TokenBurnController'
import { GitHubIntegrationSuite } from '@/components/system/GitHubIntegrationSuite'
import { NotificationController } from '@/components/admin/NotificationController'
import { PsychohistoricalEngine } from '@/components/admin/PsychohistoricalEngine'
import { PhoenixGuardian } from '@/components/admin/PhoenixGuardian'
import { GaiaIATool } from '@/components/admin/GaiaIATool'
import { SecurityDashboard } from '@/components/admin/security/SecurityDashboard'
import { UserManagementSystemRefactored } from '@/components/admin/UserManagementSystemRefactored'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { UltimateSecurityDashboard } from '@/components/security/UltimateSecurityDashboard'
import { PhantomRecoveryEngine } from '@/components/admin/PhantomRecoveryEngine'
import { ThunderstormDefense } from '@/components/admin/ThunderstormDefense'
import { QuantumThunderstormDefense } from '@/components/admin/QuantumThunderstormDefense'
import { UltimateSecurity } from '@/components/admin/UltimateSecurity'
import { SystemHealthDashboard } from '@/components/admin/SystemHealthDashboard'
import { UltimateSecurityCore } from '@/components/admin/UltimateSecurityCore'
import { QuantumSecurityDashboard } from '@/components/security/QuantumSecurityDashboard'
import { DeploymentAutomation } from '@/components/deployment/DeploymentAutomation'
import { EnhancedAdminMenu } from '@/components/admin/EnhancedAdminMenu'
import { AdvancedSecurityCenter } from '@/components/admin/AdvancedSecurityCenter'
import { GlobalCommandCenter } from '@/components/admin/GlobalCommandCenter'
import { AIDefenseAnimals } from '@/components/admin/AIDefenseAnimals'
import { DefenseCreatureArmy } from '@/components/admin/DefenseCreatureArmy'
import { ImmortalDefenseCore } from '@/components/security/ImmortalDefenseCore'
import { UltimateDefensiveBarrier } from '@/components/security/UltimateDefensiveBarrier'

export function SecureAdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-4 max-w-full overflow-x-hidden">
        <div className="text-center mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
            🛡️ SECURE GAIA ADMIN CONTROL CENTER V4 🛡️
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Unified secure administrative suite for complete GAiA ecosystem management
          </p>
          <div className="mt-2 p-2 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-400">
              🔒 All admin features, controls, and dashboards integrated under secure authentication
            </p>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1 h-auto p-1 text-xs">
            <TabsTrigger value="dashboard" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🏠</span>
                <span className="hidden sm:inline">Dashboard</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="defense-animals" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🛡️</span>
                <span className="hidden sm:inline">AI Animals</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="creature-army" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>⚔️</span>
                <span className="hidden sm:inline">Army</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="immortal-core" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>♾️</span>
                <span className="hidden sm:inline">Immortal</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="defense-barrier" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🔮</span>
                <span className="hidden sm:inline">Barrier</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="security" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🔒</span>
                <span className="hidden sm:inline">Security</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="ultimate-security" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🔐</span>
                <span className="hidden sm:inline">Ultimate Sec</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="quantum-security" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>⚛️</span>
                <span className="hidden sm:inline">Quantum Sec</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="thunderstorm" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>⚡</span>
                <span className="hidden sm:inline">Thunderstorm</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="quantum-thunder" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🌩️</span>
                <span className="hidden sm:inline">Q-Thunder</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="phantom-recovery" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>👻</span>
                <span className="hidden sm:inline">Phantom</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="system-health" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>❤️</span>
                <span className="hidden sm:inline">Health</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="users" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>👥</span>
                <span className="hidden sm:inline">Users</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="gaia-ia" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🧠</span>
                <span className="hidden sm:inline">GAIA IA</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="master-control" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>👑</span>
                <span className="hidden sm:inline">Master</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="global-command" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🌍</span>
                <span className="hidden sm:inline">Global</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="overview" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>📊</span>
                <span className="hidden sm:inline">Overview</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🔔</span>
                <span className="hidden sm:inline">Alerts</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="deployment" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🚀</span>
                <span className="hidden sm:inline">Deploy</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="github" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>📱</span>
                <span className="hidden sm:inline">GitHub</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="tokens" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🔥</span>
                <span className="hidden sm:inline">Tokens</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="wallets" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>💰</span>
                <span className="hidden sm:inline">Wallets</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="media" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>📸</span>
                <span className="hidden sm:inline">Media</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🧠</span>
                <span className="hidden sm:inline">Intel</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="koala" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🐨</span>
                <span className="hidden sm:inline">Koala AI</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="dragon" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🐉</span>
                <span className="hidden sm:inline">Dragon AI</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="phoenix" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🦅</span>
                <span className="hidden sm:inline">Phoenix</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="psycho" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🔮</span>
                <span className="hidden sm:inline">Psycho</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="dashboard" className="mt-0">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="defense-animals" className="mt-0">
              <AIDefenseAnimals />
            </TabsContent>

            <TabsContent value="creature-army" className="mt-0">
              <DefenseCreatureArmy />
            </TabsContent>

            <TabsContent value="immortal-core" className="mt-0">
              <div className="space-y-6">
                <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
                  <CardHeader>
                    <CardTitle className="text-purple-400 flex items-center gap-2">
                      ♾️ Immortal Defense Core - Management Interface
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImmortalDefenseCore />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="defense-barrier" className="mt-0">
              <UltimateDefensiveBarrier />
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <SecurityDashboard />
            </TabsContent>

            <TabsContent value="ultimate-security" className="mt-0">
              <UltimateSecurityDashboard />
            </TabsContent>

            <TabsContent value="quantum-security" className="mt-0">
              <QuantumSecurityDashboard />
            </TabsContent>

            <TabsContent value="thunderstorm" className="mt-0">
              <ThunderstormDefense />
            </TabsContent>

            <TabsContent value="quantum-thunder" className="mt-0">
              <QuantumThunderstormDefense />
            </TabsContent>

            <TabsContent value="phantom-recovery" className="mt-0">
              <PhantomRecoveryEngine />
            </TabsContent>

            <TabsContent value="system-health" className="mt-0">
              <SystemHealthDashboard />
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <UserManagementSystemRefactored />
            </TabsContent>

            <TabsContent value="gaia-ia" className="mt-0">
              <GaiaIATool />
            </TabsContent>

            <TabsContent value="master-control" className="mt-0">
              <MasterAdminControlCenter />
            </TabsContent>

            <TabsContent value="global-command" className="mt-0">
              <GlobalCommandCenter />
            </TabsContent>

            <TabsContent value="overview" className="mt-0">
              <UltimateAdminSuite />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <NotificationController />
            </TabsContent>

            <TabsContent value="deployment" className="mt-0">
              <DeploymentAutomation />
            </TabsContent>

            <TabsContent value="github" className="mt-0">
              <GitHubIntegrationSuite />
            </TabsContent>

            <TabsContent value="tokens" className="mt-0">
              <TokenBurnController />
            </TabsContent>

            <TabsContent value="wallets" className="mt-0">
              <WalletEngineAdmin />
            </TabsContent>

            <TabsContent value="media" className="mt-0">
              <AdminMediaLibrary />
            </TabsContent>

            <TabsContent value="intelligence" className="mt-0">
              <UltimateIntelligenceHub />
            </TabsContent>

            <TabsContent value="koala" className="mt-0">
              <KoalaAIEngine />
            </TabsContent>

            <TabsContent value="dragon" className="mt-0">
              <DragonAIDefense />
            </TabsContent>

            <TabsContent value="phoenix" className="mt-0">
              <PhoenixGuardian />
            </TabsContent>

            <TabsContent value="psycho" className="mt-0">
              <PsychohistoricalEngine />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}