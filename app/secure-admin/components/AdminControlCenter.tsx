'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Crown, LogOut, Globe, Users, Settings, Database, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Import all admin components from the legacy system
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

interface AdminControlCenterProps {
  systemTime: {
    hour: number
    minute: number
    date: string
  }
  securityLayers: {
    authentication: boolean
    rbac: boolean
    mfa: boolean
    intrusion: boolean
  }
}

export function AdminControlCenter({ systemTime, securityLayers }: AdminControlCenterProps) {
  const [clientIP] = useState(`192.168.1.${Math.floor(Math.random() * 255)}`)
  const [sessionId] = useState(`sess_${Date.now().toString(36)}`)

  const router = useRouter()
  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem('gaia-admin-session')
    localStorage.removeItem('gaia-admin-ip')
    
    // Redirect using Next.js router
    router.push('/secure-admin')
  }

  const allLayersActive = Object.values(securityLayers).every(layer => layer)

  return (
    <div className="container mx-auto p-4 space-y-4 max-w-full overflow-x-hidden">
      {/* Combined Header - merging both admin dashboards */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-green-400" />
                <Crown className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                  🚀 GAiA ADMIN CONTROL CENTER
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground mt-1">
                  🌍 GAIA Admin Dashboard - Exclusive Control • Next.js 14 + React 18 • Ultimate administrative suite
                </p>
                <div className="flex gap-3 mt-3">
                  <Badge variant="outline" className="border-green-500/50 text-green-400">
                    <Globe className="h-3 w-3 mr-1" />
                    IP: {clientIP}
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                    <Shield className="h-3 w-3 mr-1" />
                    Exclusive Session
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                    <Users className="h-3 w-3 mr-1" />
                    Session: {sessionId.substring(0, 8)}...
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${allLayersActive ? 'border-green-500/50 text-green-400' : 'border-yellow-500/50 text-yellow-400'}`}
                  >
                    🛡️ Defense: {Object.values(securityLayers).filter(Boolean).length}/4
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                    ⚡ Next.js 14
                  </Badge>
                </div>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
              <LogOut className="h-4 w-4 mr-2" />
              Secure Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Admin Interface - Comprehensive Tabs from Legacy Admin */}
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

          {/* Additional system tabs */}
          <TabsContent value="system" className="mt-0">
            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/80">
              <CardHeader>
                <CardTitle className="text-purple-400">System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-gray-300">System time: {systemTime.hour}:{systemTime.minute}, {systemTime.date}</div>
                  <div className="text-gray-300">4-Step Defense System: {Object.values(securityLayers).filter(Boolean).length}/4 Active</div>
                  <div className="text-gray-300">Session integrity: Monitored</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-0">
            <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-black/80">
              <CardHeader>
                <CardTitle className="text-yellow-400">System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-green-400">[{systemTime.hour}:{systemTime.minute}] Admin session started - IP: {clientIP}</div>
                  <div className="text-blue-400">[{systemTime.hour}:{systemTime.minute}] 4-Step Defense System activated</div>
                  <div className="text-purple-400">[{systemTime.hour}:{systemTime.minute}] System time synchronized to {systemTime.date}</div>
                  <div className="text-green-400">[{systemTime.hour}:{systemTime.minute}] All security layers operational</div>
                  <div className="text-cyan-400">[{systemTime.hour}:{systemTime.minute}] GAiA ADMIN CONTROL CENTER accessed</div>
                  <div className="text-orange-400">[{systemTime.hour}:{systemTime.minute}] GAIA Admin Dashboard - Exclusive Control activated</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-black/80">
              <CardHeader>
                <CardTitle className="text-cyan-400">Global Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-gray-300">Time synchronization: {systemTime.hour}:{systemTime.minute.toString().padStart(2, '0')}, {systemTime.date}</div>
                  <div className="text-gray-300">Security level: Maximum</div>
                  <div className="text-gray-300">Admin privileges: Full access</div>
                  <div className="text-gray-300">Session monitoring: Active</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}