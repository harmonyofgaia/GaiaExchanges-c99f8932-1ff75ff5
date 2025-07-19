
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
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
          <TabsTrigger value="overview">🏠 Overview</TabsTrigger>
          <TabsTrigger value="notifications">🔔 Notifications</TabsTrigger>
          <TabsTrigger value="github">📱 GitHub</TabsTrigger>
          <TabsTrigger value="tokens">🔥 Token Burn</TabsTrigger>
          <TabsTrigger value="wallets">💰 Wallets</TabsTrigger>
          <TabsTrigger value="media">📸 Media</TabsTrigger>
          <TabsTrigger value="intelligence">🧠 Intelligence</TabsTrigger>
          <TabsTrigger value="koala">🐨 Koala AI</TabsTrigger>
          <TabsTrigger value="dragon">🐉 Dragon AI</TabsTrigger>
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
      </Tabs>
    </div>
  )
}
