
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComprehensiveSystemCheck } from '@/components/admin/ComprehensiveSystemCheck'
import { SystemHealthDashboard } from '@/components/admin/SystemHealthDashboard'
import { GlobalThreatIntelligence } from '@/components/security/GlobalThreatIntelligence'
import { UltimateSecurityWall } from '@/components/security/UltimateSecurityWall'
import { CrossPlatformCompatibility } from '@/components/CrossPlatformCompatibility'
import { DownloadManager } from '@/components/downloads/DownloadManager'

const ComprehensiveStatus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 Harmony of Gaia - Complete System Status
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Fast Growing Stable Ship - Complete Review & Global Command Center
          </p>
          <p className="text-sm text-green-400 mt-2">
            🚀 All Systems Operational - Ready for Global Launch & Market Success
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              📋 System Overview
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              💚 Health Dashboard
            </TabsTrigger>
            <TabsTrigger value="global" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🌍 Global Intel
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              🛡️ Ultimate Security
            </TabsTrigger>
            <TabsTrigger value="platform" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              📱 Platform Support
            </TabsTrigger>
            <TabsTrigger value="downloads" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              📥 Downloads & Stores
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <ComprehensiveSystemCheck />
          </TabsContent>
          
          <TabsContent value="health" className="space-y-6 mt-6">
            <SystemHealthDashboard />
          </TabsContent>
          
          <TabsContent value="global" className="space-y-6 mt-6">
            <GlobalThreatIntelligence />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 mt-6">
            <UltimateSecurityWall />
          </TabsContent>
          
          <TabsContent value="platform" className="space-y-6 mt-6">
            <CrossPlatformCompatibility />
          </TabsContent>
          
          <TabsContent value="downloads" className="space-y-6 mt-6">
            <DownloadManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ComprehensiveStatus
