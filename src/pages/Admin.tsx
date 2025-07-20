
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
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          🚀 GAiA ADMIN CONTROL CENTER
        </h1>
        <p className="text-xl text-muted-foreground">
          Ultimate administrative suite for GAiA ecosystem management
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 xl:grid-cols-12 gap-1 h-auto p-1">
          <TabsTrigger value="overview" className="text-xs p-2">🏠 Overview</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs p-2">🔔 Notifications</TabsTrigger>
          <TabsTrigger value="github" className="text-xs p-2">📱 GitHub</TabsTrigger>
          <TabsTrigger value="tokens" className="text-xs p-2">🔥 Token Burn</TabsTrigger>
          <TabsTrigger value="wallets" className="text-xs p-2">💰 Wallets</TabsTrigger>
          <TabsTrigger value="media" className="text-xs p-2">📸 Media</TabsTrigger>
          <TabsTrigger value="intelligence" className="text-xs p-2">🧠 Intelligence</TabsTrigger>
          <TabsTrigger value="koala" className="text-xs p-2">🐨 Koala AI</TabsTrigger>
          <TabsTrigger value="dragon" className="text-xs p-2">🐉 Dragon AI</TabsTrigger>
          <TabsTrigger value="phoenix" className="text-xs p-2">🦅 Phoenix Guardian</TabsTrigger>
          <TabsTrigger value="psycho" className="text-xs p-2">🔮 Psychohistory</TabsTrigger>
          <TabsTrigger value="videos" className="text-xs p-2">📹 Video Control</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <UltimateAdminSuite />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationController />
        </TabsContent>

        <TabsContent value="github">
          <GitHubIntegrationSuite />
        </TabsContent>

        <TabsContent value="tokens">
          <TokenBurnController />
        </TabsContent>

        <TabsContent value="wallets">
          <WalletEngineAdmin />
        </TabsContent>

        <TabsContent value="media">
          <AdminMediaLibrary />
        </TabsContent>

        <TabsContent value="intelligence">
          <UltimateIntelligenceHub />
        </TabsContent>

        <TabsContent value="koala">
          <KoalaAIEngine />
        </TabsContent>

        <TabsContent value="dragon">
          <DragonAIDefense />
        </TabsContent>

        <TabsContent value="phoenix">
          <PhoenixGuardian />
        </TabsContent>

        <TabsContent value="psycho">
          <PsychohistoricalEngine />
        </TabsContent>

        <TabsContent value="videos">
          <div className="text-center p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">📹 Video Upload Control Center</h3>
            <p className="text-muted-foreground">
              All video submissions are now controlled through the admin panel. 
              Only administrators can approve, reject, and manage video content.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
