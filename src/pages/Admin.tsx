
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { SystemControlCenter } from '@/components/admin/SystemControlCenter'
import { QuantumAdminDashboard } from '@/components/admin/QuantumAdminDashboard'
import { WebsiteHostingManager } from '@/components/WebsiteHostingManager'
import { EnhancedArtworkCloud } from '@/components/creative/EnhancedArtworkCloud'
import { FeatureStatusChecker } from '@/components/admin/FeatureStatusChecker'
import { MissingFeaturesChecker } from '@/components/admin/MissingFeaturesChecker'
import { MasterArtworkGenerator } from '@/components/admin/MasterArtworkGenerator'
import { GamingNFTMarketplace } from '@/components/GamingNFTMarketplace'
import { WormsGameArena } from '@/components/WormsGameArena'
import { GameDevelopmentCloud } from '@/components/admin/GameDevelopmentCloud'
import { UserManagementSystem } from '@/components/admin/UserManagementSystem'
import { SecureConnectionManager } from '@/components/admin/SecureConnectionManager'
import { QuantumBlockchainCore } from '@/components/quantum/QuantumBlockchainCore'
import { LiveBlockchainViewer } from '@/components/admin/LiveBlockchainViewer'
import { GlobalMarketingEngine } from '@/components/marketing/GlobalMarketingEngine'

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            🌍 HARMONY OF GAIA ADMIN CONTROL CENTER
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Complete System Management • Neural Security • Global Reach • Perfect Harmony
          </p>
          <p className="text-lg text-green-400 mt-2">
            🎵 "Seeds Will Form Into Music" - Together We Make The World A Better Place 🎵
          </p>
        </div>

        <AdminProtectedRoute>
          <Tabs defaultValue="user-management" className="w-full">
            <TabsList className="grid w-full grid-cols-12 bg-black/50 backdrop-blur-md border border-green-500/20">
              <TabsTrigger value="user-management" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                👥 User Control
              </TabsTrigger>
              <TabsTrigger value="live-blockchain" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                ⚡ Live Blockchain
              </TabsTrigger>
              <TabsTrigger value="architek-blockchain" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                🔗 Architek Network
              </TabsTrigger>
              <TabsTrigger value="secure-connections" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                🛡️ Secure Matrix
              </TabsTrigger>
              <TabsTrigger value="marketing-engine" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
                🚀 Marketing Engine
              </TabsTrigger>
              <TabsTrigger value="game-cloud" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
                🎮 Game Cloud
              </TabsTrigger>
              <TabsTrigger value="neural-art" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                🧠 Neural Art
              </TabsTrigger>
              <TabsTrigger value="gaming" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                🎮 Gaming NFTs
              </TabsTrigger>
              <TabsTrigger value="audit" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                🔍 Feature Audit
              </TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                🛡️ System
              </TabsTrigger>
              <TabsTrigger value="quantum" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                ⚡ Quantum
              </TabsTrigger>
              <TabsTrigger value="hosting" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                🌐 Hosting
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="user-management" className="space-y-6 mt-6">
              <UserManagementSystem />
            </TabsContent>
            
            <TabsContent value="live-blockchain" className="space-y-6 mt-6">
              <LiveBlockchainViewer />
            </TabsContent>
            
            <TabsContent value="architek-blockchain" className="space-y-6 mt-6">
              <QuantumBlockchainCore />
            </TabsContent>
            
            <TabsContent value="secure-connections" className="space-y-6 mt-6">
              <SecureConnectionManager />
            </TabsContent>
            
            <TabsContent value="marketing-engine" className="space-y-6 mt-6">
              <GlobalMarketingEngine />
            </TabsContent>
            
            <TabsContent value="game-cloud" className="space-y-6 mt-6">
              <GameDevelopmentCloud />
            </TabsContent>
            
            <TabsContent value="neural-art" className="space-y-6 mt-6">
              <MasterArtworkGenerator />
            </TabsContent>
            
            <TabsContent value="gaming" className="space-y-6 mt-6">
              <GamingNFTMarketplace />
              <WormsGameArena />
            </TabsContent>
            
            <TabsContent value="audit" className="space-y-6 mt-6">
              <MissingFeaturesChecker />
            </TabsContent>
            
            <TabsContent value="system" className="space-y-6 mt-6">
              <SystemControlCenter />
            </TabsContent>
            
            <TabsContent value="quantum" className="space-y-6 mt-6">
              <QuantumAdminDashboard />
            </TabsContent>
            
            <TabsContent value="hosting" className="space-y-6 mt-6">
              <WebsiteHostingManager />
            </TabsContent>
          </Tabs>
        </AdminProtectedRoute>
      </div>
    </div>
  )
}

export default Admin
