
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UltimateAdminSuite } from '@/components/admin/UltimateAdminSuite'
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

export default function Admin() {
  return (
    <div className="container mx-auto p-4 space-y-4 max-w-full overflow-x-hidden">
      <div className="text-center mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          🚀 GAiA ADMIN CONTROL CENTER
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground">
          Ultimate administrative suite for GAiA ecosystem management
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-1 h-auto p-1 text-xs">
          <TabsTrigger value="overview" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🏠</span>
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
          <TabsTrigger value="videos" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>📹</span>
              <span className="hidden sm:inline">Video Control</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
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

          <TabsContent value="videos" className="mt-0">
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">📹 Video Upload Control Center</h3>
              <p className="text-muted-foreground mb-4">
                All video submissions are now controlled through the admin panel. 
                Only administrators can approve, reject, and manage video content.
              </p>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2">Current Status</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">23</div>
                    <div className="text-sm text-muted-foreground">Pending Review</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">187</div>
                    <div className="text-sm text-muted-foreground">Approved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">12</div>
                    <div className="text-sm text-muted-foreground">Rejected</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
