
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Search, Activity, Eye, Lock, Zap } from 'lucide-react'
import { AdvancedSearchSystem } from '@/components/search/AdvancedSearchSystem'
import { CommunityVaultSystem } from '@/components/vault/CommunityVaultSystem'
import { UltimateWalletProtection } from '@/components/security/UltimateWalletProtection'
import { SelfTrainingAnimal } from '@/components/security/SelfTrainingAnimal'
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { InvisibleAvatarTrainer } from '@/components/security/InvisibleAvatarTrainer'
import { SystemHealthMonitor } from '@/components/SystemHealthMonitor'

const Security = () => {
  const systemHealth = SystemHealthMonitor()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <div className="container mx-auto space-y-6">
        {/* Security Header */}
        <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              🛡️ GAiA SECURITY & SEARCH CENTER
            </CardTitle>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600 animate-pulse">
                <Shield className="h-3 w-3 mr-1" />
                ALL SYSTEMS SECURE
              </Badge>
              <Badge className="bg-blue-600">
                <Search className="h-3 w-3 mr-1" />
                SEARCH & TRACK ACTIVE
              </Badge>
              <Badge className="bg-purple-600">
                <Activity className="h-3 w-3 mr-1" />
                LIVE MONITORING
              </Badge>
              <Badge className="bg-red-600 animate-pulse">
                <Lock className="h-3 w-3 mr-1" />
                MAXIMUM PROTECTION
              </Badge>
            </div>
            <p className="text-center text-lg text-muted-foreground mt-4">
              Advanced security monitoring • Real-time tracking • Community vault access
            </p>
          </CardHeader>
        </Card>

        {/* System Health Overview */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              🖥️ System Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {systemHealth.isHealthy ? '✅' : '⚠️'}
                </div>
                <div className="text-sm">System Health</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {systemHealth.quantumProtected ? '🛡️' : '⚠️'}
                </div>
                <div className="text-sm">Quantum Protected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {systemHealth.systemHealth.threats_blocked.toLocaleString()}
                </div>
                <div className="text-sm">Threats Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {systemHealth.systemHealth.uptime}%
                </div>
                <div className="text-sm">System Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {systemHealth.masterSecurityActive ? '🔥' : '⚠️'}
                </div>
                <div className="text-sm">Master Security</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Security Tabs */}
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="search">Search & Track</TabsTrigger>
            <TabsTrigger value="vault">Community Vault</TabsTrigger>
            <TabsTrigger value="protection">Ultimate Protection</TabsTrigger>
            <TabsTrigger value="animals">Self-Training</TabsTrigger>
            <TabsTrigger value="dragon">Eternal Dragon</TabsTrigger>
            <TabsTrigger value="avatars">Invisible Avatars</TabsTrigger>
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <AdvancedSearchSystem />
          </TabsContent>

          <TabsContent value="vault" className="space-y-6">
            <CommunityVaultSystem />
          </TabsContent>

          <TabsContent value="protection" className="space-y-6">
            <UltimateWalletProtection />
          </TabsContent>

          <TabsContent value="animals" className="space-y-6">
            <SelfTrainingAnimal />
          </TabsContent>

          <TabsContent value="dragon" className="space-y-6">
            <EternalDragonDisplay />
          </TabsContent>

          <TabsContent value="avatars" className="space-y-6">
            <InvisibleAvatarTrainer />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  🔍 Live System Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-900/30 rounded-lg">
                    <Zap className="h-12 w-12 text-green-400 mx-auto mb-2 animate-pulse" />
                    <h3 className="font-bold text-green-400 mb-2">REAL-TIME TRACKING</h3>
                    <p className="text-sm text-muted-foreground">
                      All transactions and system activities are monitored in real-time
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                    <Shield className="h-12 w-12 text-blue-400 mx-auto mb-2 animate-pulse" />
                    <h3 className="font-bold text-blue-400 mb-2">THREAT DETECTION</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced AI algorithms detect and neutralize threats instantly
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                    <Lock className="h-12 w-12 text-purple-400 mx-auto mb-2 animate-pulse" />
                    <h3 className="font-bold text-purple-400 mb-2">QUANTUM ENCRYPTION</h3>
                    <p className="text-sm text-muted-foreground">
                      All data is protected with quantum-level encryption
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Status Footer */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-2">🌟 ALL SECURITY SYSTEMS OPERATIONAL</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Badge className="bg-green-600 mb-2">SEARCH & TRACK ✅</Badge>
                  <div className="text-green-300">
                    Advanced search algorithms, real-time tracking, comprehensive monitoring
                  </div>
                </div>
                <div>
                  <Badge className="bg-blue-600 mb-2">COMMUNITY VAULT ✅</Badge>
                  <div className="text-blue-300">
                    Underground secure vault, community fee deposits, quantum protection
                  </div>
                </div>
                <div>
                  <Badge className="bg-purple-600 mb-2">AI PROTECTION ✅</Badge>
                  <div className="text-purple-300">
                    Self-training animals, eternal dragons, invisible avatars
                  </div>
                </div>
                <div>
                  <Badge className="bg-orange-600 mb-2">QUANTUM SECURITY ✅</Badge>
                  <div className="text-orange-300">
                    Ultimate wallet protection, trace cleanup, maximum encryption
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Security
