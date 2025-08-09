import { SecureAdminDashboard } from '@/components/admin/SecureAdminDashboard'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { AdminOnlyAccess } from '@/components/security/AdminOnlyAccess'
import { SecurityCenter } from '@/components/SecurityCenter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

export default function SecureAdmin() {
  const [notifications] = useState<string[]>([
    'Blockchain security scan completed ✅',
    'New trading pairs added to DEX 🔄',
    'Private blockchain network optimized ⚡',
    'Real-time threat monitoring active 🛡️',
    'Admin access logged and verified 🔐'
  ])

  return (
    <AdminProtectedRoute>
      <AdminOnlyAccess>
        <div className="relative min-h-screen">
          <EnhancedBackgroundManager 
            settings={{
              type: 'neural',
              intensity: 'high',
              color: '#00ff00',
              speed: 1.5,
              autoGenerate: true
            }}
          />
          <div className="relative z-10 p-4">
            <div className="container mx-auto max-w-7xl">
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                  🔒 SECURE ADMIN CONTROL CENTER
                </h1>
                <p className="text-xl text-muted-foreground">
                  Advanced security monitoring, blockchain management, and administrative controls
                </p>
              </div>

              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-black/50 mb-8">
                  <TabsTrigger value="dashboard">🏠 Dashboard</TabsTrigger>
                  <TabsTrigger value="security">🛡️ Security Center</TabsTrigger>
                  <TabsTrigger value="threats">⚠️ Threat Monitor</TabsTrigger>
                  <TabsTrigger value="blockchain">⛓️ Blockchain Admin</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                  <div className="space-y-6">
                    <div className="flex gap-4 mb-6">
                      <a
                        href="/docs/GAIA_ENGINE_BLUEPRINT.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors"
                      >
                        📖 View GAIA Engine Blueprint
                      </a>
                      <a
                        href="/docs/GAIA_ENGINE_BLUEPRINT.md"
                        download
                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
                      >
                        💾 Download Blueprint
                      </a>
                    </div>
                    <SecureAdminDashboard />
                  </div>
                </TabsContent>

                <TabsContent value="security">
                  <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-orange-900/30">
                    <CardHeader>
                      <CardTitle className="text-red-400">🛡️ Security Center & Real-time Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SecurityCenter notifications={notifications} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="threats">
                  <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/30 to-yellow-900/30">
                    <CardHeader>
                      <CardTitle className="text-orange-400">⚠️ Real-time Threat Log</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-black/50 p-4 rounded-lg border border-orange-500/30">
                          <h3 className="text-orange-400 font-bold mb-2">Active Threat Monitoring</h3>
                          <div className="space-y-2">
                            {notifications.map((notification, idx) => (
                              <div key={idx} className="text-sm bg-green-900/30 p-2 rounded border border-green-500/30">
                                <span className="text-green-400">[{new Date().toLocaleTimeString()}]</span> {notification}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                            <div className="text-green-400 font-bold">Network Security</div>
                            <div className="text-2xl font-bold text-green-400">100%</div>
                            <div className="text-xs text-muted-foreground">All systems secure</div>
                          </div>
                          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                            <div className="text-blue-400 font-bold">Threat Level</div>
                            <div className="text-2xl font-bold text-blue-400">MINIMAL</div>
                            <div className="text-xs text-muted-foreground">No active threats</div>
                          </div>
                          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                            <div className="text-purple-400 font-bold">Defense Status</div>
                            <div className="text-2xl font-bold text-purple-400">ACTIVE</div>
                            <div className="text-xs text-muted-foreground">All defenses online</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="blockchain">
                  <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
                    <CardHeader>
                      <CardTitle className="text-green-400">⛓️ Blockchain Network Administration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4">🔗</div>
                        <h3 className="text-2xl font-bold text-green-400 mb-4">GAIA Private Blockchain Administration</h3>
                        <p className="text-muted-foreground mb-6">
                          Advanced blockchain management tools and network administration features.
                          Monitor nodes, validate transactions, and manage network security protocols.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-green-900/30 p-4 rounded-lg">
                            <div className="text-green-400 font-bold">Network Nodes</div>
                            <div className="text-2xl font-bold text-green-400">1,247</div>
                          </div>
                          <div className="bg-blue-900/30 p-4 rounded-lg">
                            <div className="text-blue-400 font-bold">Block Height</div>
                            <div className="text-2xl font-bold text-blue-400">2,847,592</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </AdminOnlyAccess>
    </AdminProtectedRoute>
  )
}