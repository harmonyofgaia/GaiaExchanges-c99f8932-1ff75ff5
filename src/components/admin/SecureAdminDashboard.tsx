
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Lock, Eye, AlertTriangle, Zap, Crown, Activity, Globe, Users, TrendingUp } from 'lucide-react'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { AdminOnlyAccess } from '@/components/security/AdminOnlyAccess'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { AdminDashboardTabs } from './AdminDashboardTabs'
import { RefactoredSecuritySuite } from './RefactoredSecuritySuite'
import RefactoredAdminTools from './RefactoredAdminTools'
import { SupremeControlSuite } from './SupremeControlSuite'
import { UserIsolationSystem } from './UserIsolationSystem'
import { AIEngineCapabilities } from './AIEngineCapabilities'
import { ChatSecurityPanel } from './ChatSecurityPanel'
import UltimateSecurity from './UltimateSecurity'

export function SecureAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          🛡️ SECURE ADMIN COMMAND CENTER 🛡️
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Ultimate control and protection for the GAiA ecosystem
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="tools">Admin Tools</TabsTrigger>
          <TabsTrigger value="control">Supreme Control</TabsTrigger>
          <TabsTrigger value="isolation">User Control</TabsTrigger>
          <TabsTrigger value="ai">AI Engine</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AdminDashboardTabs />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <UltimateSecurity />
          <RefactoredSecuritySuite />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <RefactoredAdminTools />
        </TabsContent>

        <TabsContent value="control" className="space-y-6">
          <SupremeControlSuite />
        </TabsContent>

        <TabsContent value="isolation" className="space-y-6">
          <UserIsolationSystem />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIEngineCapabilities />
          <ChatSecurityPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
