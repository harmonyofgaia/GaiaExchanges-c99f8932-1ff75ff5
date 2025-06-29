
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { AdminOnlyAccess } from '@/components/security/AdminOnlyAccess'
import { WorldwideDefenseMonitor } from '@/components/security/WorldwideDefenseMonitor'
import { AdminOverview } from '@/components/admin/AdminOverview'
import { SystemControlCenter } from '@/components/admin/SystemControlCenter'
import { BrandClarificationManager } from '@/components/admin/BrandClarificationManager'
import { CompletionTaskManager } from '@/components/admin/CompletionTaskManager'
import { MasterDefenseOrchestrator } from '@/components/admin/MasterDefenseOrchestrator'
import { Advanced3DDesigner } from '@/components/admin/Advanced3DDesigner'
import { GlobalInternetOpsCenter } from '@/components/admin/GlobalInternetOpsCenter'
import { ParabolicAIThinking } from '@/components/admin/ParabolicAIThinking'

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            🌍 HARMONY OF GAIA ULTIMATE ADMIN CONTROL CENTER
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            GAiA Token (NOT GAIA Everworld) • Culture of Harmony • Quantum Security • Global Operations
          </p>
          <p className="text-lg text-green-400 mt-2">
            🎵 "Dreams Come True Through Ultimate Digital Power" - Protected By Invisible Operations 🎵
          </p>
        </div>

        <AdminProtectedRoute>
          <AdminOnlyAccess>
            <Tabs defaultValue="parabolic-ai" className="w-full">
              <TabsList className="grid w-full grid-cols-10 bg-black/50 backdrop-blur-md border border-green-500/20 text-xs">
                <TabsTrigger value="parabolic-ai" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  🧠 Parabolic AI
                </TabsTrigger>
                <TabsTrigger value="3d-designer" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  🎨 3D Designer
                </TabsTrigger>
                <TabsTrigger value="global-ops" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                  🌐 Global Ops
                </TabsTrigger>
                <TabsTrigger value="brand-clarification" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                  🚨 Brand Clarity
                </TabsTrigger>
                <TabsTrigger value="completion-tasks" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  📋 Tasks
                </TabsTrigger>
                <TabsTrigger value="master-defense" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  👑 Defense
                </TabsTrigger>
                <TabsTrigger value="worldwide-defense" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                  🌍 Worldwide
                </TabsTrigger>
                <TabsTrigger value="overview" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                  📊 Overview
                </TabsTrigger>
                <TabsTrigger value="system" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  🛡️ System
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="parabolic-ai" className="space-y-6 mt-6">
                <ParabolicAIThinking />
              </TabsContent>
              
              <TabsContent value="3d-designer" className="space-y-6 mt-6">
                <Advanced3DDesigner />
              </TabsContent>
              
              <TabsContent value="global-ops" className="space-y-6 mt-6">
                <GlobalInternetOpsCenter />
              </TabsContent>
              
              <TabsContent value="brand-clarification" className="space-y-6 mt-6">
                <BrandClarificationManager />
              </TabsContent>
              
              <TabsContent value="completion-tasks" className="space-y-6 mt-6">
                <CompletionTaskManager />
              </TabsContent>
              
              <TabsContent value="master-defense" className="space-y-6 mt-6">
                <MasterDefenseOrchestrator />
              </TabsContent>
              
              <TabsContent value="worldwide-defense" className="space-y-6 mt-6">
                <WorldwideDefenseMonitor />
              </TabsContent>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                <AdminOverview />
              </TabsContent>
              
              <TabsContent value="system" className="space-y-6 mt-6">
                <SystemControlCenter />
              </TabsContent>
            </Tabs>
          </AdminOnlyAccess>
        </AdminProtectedRoute>
      </div>
    </div>
  )
}

export default Admin
