
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UltimateAdminSuite } from './UltimateAdminSuite'
import { MasterAdminControlCenter } from './MasterAdminControlCenter'
import { DragonAIDefense } from './DragonAIDefense'
import { KoalaAIEngine } from './KoalaAIEngine'
import { UltimateIntelligenceHub } from './UltimateIntelligenceHub'
import { AdminMediaLibrary } from './AdminMediaLibrary'
import { WalletEngineAdmin } from './WalletEngineAdmin'
import { TokenBurnController } from './TokenBurnController'
import { GitHubIntegrationSuite } from '@/components/system/GitHubIntegrationSuite'
import { NotificationController } from './NotificationController'
import { PsychohistoricalEngine } from './PsychohistoricalEngine'
import { PhoenixGuardian } from './PhoenixGuardian'
import { GaiaIATool } from './GaiaIATool'
import { SecurityDashboard } from './security/SecurityDashboard'
import { UserManagementSystemRefactored } from './UserManagementSystemRefactored'
import { QuantumSecurityDashboard } from '@/components/security/QuantumSecurityDashboard'
import { DeploymentAutomation } from '@/components/deployment/DeploymentAutomation'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-18 gap-1 h-auto p-1 text-xs">
        <TabsTrigger value="dashboard" className="p-2 text-center">
          <div className="flex flex-col items-center">
            <span>🏠</span>
            <span className="hidden sm:inline">Dashboard</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="security" className="p-2 text-center">
          <div className="flex flex-col items-center">
            <span>🛡️</span>
            <span className="hidden sm:inline">Security</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="quantum" className="p-2 text-center">
          <div className="flex flex-col items-center">
            <span>⚛️</span>
            <span className="hidden sm:inline">Quantum</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="deployment" className="p-2 text-center">
          <div className="flex flex-col items-center">
            <span>🚀</span>
            <span className="hidden sm:inline">Deploy</span>
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
            <span className="hidden sm:inline">Master Control</span>
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
            <span className="hidden sm:inline">Notifications</span>
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
            <span className="hidden sm:inline">Token Burn</span>
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
            <span className="hidden sm:inline">Intelligence</span>
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
            <span className="hidden sm:inline">Psychohistory</span>
          </div>
        </TabsTrigger>
      </TabsList>

      <div className="mt-4">
        <TabsContent value="dashboard" className="mt-0">
          <UltimateAdminSuite />
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <SecurityDashboard />
        </TabsContent>

        <TabsContent value="quantum" className="mt-0">
          <QuantumSecurityDashboard />
        </TabsContent>

        <TabsContent value="deployment" className="mt-0">
          <DeploymentAutomation />
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

        <TabsContent value="overview" className="mt-0">
          <UltimateAdminSuite />
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <NotificationController />
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
  )
}
