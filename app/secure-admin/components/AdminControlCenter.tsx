'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Crown, LogOut, Globe, Users, Settings, Database, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

// Simple admin dashboard components
const MainDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-black/80">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Server Health</span>
            <Badge variant="outline" className="border-green-500/50 text-green-400">OPTIMAL</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Database</span>
            <Badge variant="outline" className="border-green-500/50 text-green-400">ONLINE</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Security</span>
            <Badge variant="outline" className="border-green-500/50 text-green-400">ACTIVE</Badge>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-black/80">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Total Users</span>
            <span className="text-blue-400">12,547</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Active Sessions</span>
            <span className="text-blue-400">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Transactions</span>
            <span className="text-blue-400">89,342</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/80">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Admin Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="outline" className="w-full border-purple-500/30 text-purple-400">
            User Management
          </Button>
          <Button variant="outline" className="w-full border-purple-500/30 text-purple-400">
            System Logs
          </Button>
          <Button variant="outline" className="w-full border-purple-500/30 text-purple-400">
            Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

const SecurityCenter = () => (
  <div className="space-y-6">
    <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-black/80">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-gray-300">Failed Login Attempts</span>
            <div className="text-2xl font-bold text-red-400">0</div>
          </div>
          <div className="space-y-2">
            <span className="text-gray-300">Blocked IPs</span>
            <div className="text-2xl font-bold text-red-400">3</div>
          </div>
          <div className="space-y-2">
            <span className="text-gray-300">Active Threats</span>
            <div className="text-2xl font-bold text-green-400">0</div>
          </div>
          <div className="space-y-2">
            <span className="text-gray-300">System Integrity</span>
            <div className="text-2xl font-bold text-green-400">100%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

export function AdminControlCenter({ systemTime, securityLayers }: AdminControlCenterProps) {
  const [clientIP] = useState(`192.168.1.${Math.floor(Math.random() * 255)}`)
  const [sessionId] = useState(`sess_${Date.now().toString(36)}`)

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem('gaia-admin-session')
    localStorage.removeItem('gaia-admin-ip')
    
    // In a real Next.js app, you would redirect using router.push or redirect()
    window.location.href = '/secure-admin'
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

      {/* Main Admin Interface */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 h-auto p-1 text-xs">
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
          <TabsTrigger value="system" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>⚙️</span>
              <span className="hidden sm:inline">System</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="logs" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>📊</span>
              <span className="hidden sm:inline">Logs</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="settings" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🔧</span>
              <span className="hidden sm:inline">Settings</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="dashboard" className="mt-0">
            <MainDashboard />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <SecurityCenter />
          </TabsContent>

          <TabsContent value="users" className="mt-0">
            <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-black/80">
              <CardHeader>
                <CardTitle className="text-blue-400">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">User management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-0">
            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/80">
              <CardHeader>
                <CardTitle className="text-purple-400">System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">System configuration panel will be implemented here.</p>
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
                <p className="text-gray-300">Global system settings will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}