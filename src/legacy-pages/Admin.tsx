import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import Navbar from '@/components/Navbar'

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-4 space-y-4 max-w-full overflow-x-hidden">
        <div className="text-center mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            🚀 GAiA ADMIN CONTROL CENTER
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Ultimate administrative suite for GAiA ecosystem management
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-16 gap-1 h-auto p-1 text-xs">
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
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <SecurityDashboard />
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
      </div>
    </div>
  )
}
