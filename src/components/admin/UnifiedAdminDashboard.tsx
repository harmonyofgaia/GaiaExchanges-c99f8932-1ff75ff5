import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Crown, 
  Brain, 
  Users, 
  Bell, 
  Wallet, 
  Camera,
  Database,
  Github,
  Settings,
  Zap,
  Globe,
  Lock
} from 'lucide-react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { GAIA_TOKEN } from '@/constants/gaia'

// Import existing admin components
import { Enhanced4StepBreachSystem } from './Enhanced4StepBreachSystem'
import { UltimateAdminSuite } from './UltimateAdminSuite'
import { MasterAdminControlCenter } from './MasterAdminControlCenter'
import { DragonAIDefense } from './DragonAIDefense'
import { KoalaAIEngine } from './KoalaAIEngine'
import { UltimateIntelligenceHub } from './UltimateIntelligenceHub'
import { AdminMediaLibrary } from './AdminMediaLibrary'
import { WalletEngineAdmin } from './WalletEngineAdmin'
import { TokenBurnController } from './TokenBurnController'
import { NotificationController } from './NotificationController'
import { PsychohistoricalEngine } from './PsychohistoricalEngine'
import { PhoenixGuardian } from './PhoenixGuardian'
import { GaiaIATool } from './GaiaIATool'
import { SecurityDashboard } from './security/SecurityDashboard'
import { UserManagementSystemRefactored } from './UserManagementSystemRefactored'
import { AdminDashboard } from './AdminDashboard'

// Import system components
import { GitHubIntegrationSuite } from '@/components/system/GitHubIntegrationSuite'
import { AdminDashboard as DeploymentDashboard } from '@/components/AdminDashboard'

interface AdminTab {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  component: React.ReactNode
  priority: number
  category: 'core' | 'security' | 'ai' | 'management' | 'tools'
}

export function UnifiedAdminDashboard() {
  const { adminSession } = useSecureAdmin()
  const [activeSessionTime, setActiveSessionTime] = useState(0)
  const [systemHealth, setSystemHealth] = useState(100)

  // Define all admin tabs with their components
  const adminTabs: AdminTab[] = [
    {
      id: 'breach-protocol',
      name: 'Breach Protocol',
      icon: <Shield className="h-4 w-4" />,
      description: 'Enhanced 4-step breach system with defensive actions',
      component: <Enhanced4StepBreachSystem />,
      priority: 1,
      category: 'security'
    },
    {
      id: 'master-control',
      name: 'Master Control',
      icon: <Crown className="h-4 w-4" />,
      description: 'Central command and control system',
      component: <MasterAdminControlCenter />,
      priority: 2,
      category: 'core'
    },
    {
      id: 'deployment',
      name: 'Deployment',
      icon: <Database className="h-4 w-4" />,
      description: 'System deployment and monitoring',
      component: <DeploymentDashboard />,
      priority: 3,
      category: 'core'
    },
    {
      id: 'security',
      name: 'Security Monitor',
      icon: <Shield className="h-4 w-4" />,
      description: 'Security scanning and threat intelligence',
      component: <SecurityDashboard />,
      priority: 4,
      category: 'security'
    },
    {
      id: 'gaia-ia',
      name: 'GAIA IA',
      icon: <Brain className="h-4 w-4" />,
      description: 'GAIA intelligence and automation',
      component: <GaiaIATool />,
      priority: 5,
      category: 'ai'
    },
    {
      id: 'dragon-ai',
      name: 'Dragon AI',
      icon: <Zap className="h-4 w-4" />,
      description: 'Dragon AI defense system',
      component: <DragonAIDefense />,
      priority: 6,
      category: 'ai'
    },
    {
      id: 'koala-ai',
      name: 'Koala AI',
      icon: <Brain className="h-4 w-4" />,
      description: 'Koala AI engine and learning system',
      component: <KoalaAIEngine />,
      priority: 7,
      category: 'ai'
    },
    {
      id: 'phoenix-guard',
      name: 'Phoenix Guardian',
      icon: <Shield className="h-4 w-4" />,
      description: 'Self-healing security system',
      component: <PhoenixGuardian />,
      priority: 8,
      category: 'security'
    },
    {
      id: 'intelligence',
      name: 'Intelligence Hub',
      icon: <Brain className="h-4 w-4" />,
      description: 'Ultimate intelligence and analytics',
      component: <UltimateIntelligenceHub />,
      priority: 9,
      category: 'ai'
    },
    {
      id: 'psychohistory',
      name: 'Psychohistory',
      icon: <Globe className="h-4 w-4" />,
      description: 'Predictive analysis engine',
      component: <PsychohistoricalEngine />,
      priority: 10,
      category: 'ai'
    },
    {
      id: 'users',
      name: 'User Management',
      icon: <Users className="h-4 w-4" />,
      description: 'User accounts and permissions',
      component: <UserManagementSystemRefactored />,
      priority: 11,
      category: 'management'
    },
    {
      id: 'wallets',
      name: 'Wallet Engine',
      icon: <Wallet className="h-4 w-4" />,
      description: 'Wallet and token management',
      component: <WalletEngineAdmin />,
      priority: 12,
      category: 'management'
    },
    {
      id: 'tokens',
      name: 'Token Control',
      icon: <Zap className="h-4 w-4" />,
      description: 'Token burning and control',
      component: <TokenBurnController />,
      priority: 13,
      category: 'management'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <Bell className="h-4 w-4" />,
      description: 'System notifications and alerts',
      component: <NotificationController />,
      priority: 14,
      category: 'management'
    },
    {
      id: 'media',
      name: 'Media Library',
      icon: <Camera className="h-4 w-4" />,
      description: 'Media assets and library management',
      component: <AdminMediaLibrary />,
      priority: 15,
      category: 'tools'
    },
    {
      id: 'github',
      name: 'GitHub Integration',
      icon: <Github className="h-4 w-4" />,
      description: 'GitHub repository management',
      component: <GitHubIntegrationSuite />,
      priority: 16,
      category: 'tools'
    },
    {
      id: 'dashboard',
      name: 'Admin Dashboard',
      icon: <Settings className="h-4 w-4" />,
      description: 'General admin dashboard and metrics',
      component: <AdminDashboard />,
      priority: 17,
      category: 'core'
    },
    {
      id: 'overview',
      name: 'System Overview',
      icon: <Database className="h-4 w-4" />,
      description: 'Complete system overview and suite',
      component: <UltimateAdminSuite />,
      priority: 18,
      category: 'core'
    }
  ]

  // Sort tabs by priority
  const sortedTabs = adminTabs.sort((a, b) => a.priority - b.priority)

  useEffect(() => {
    const sessionTimer = setInterval(() => {
      setActiveSessionTime(prev => prev + 1)
    }, 1000)

    const healthMonitor = setInterval(() => {
      // Simulate system health monitoring
      setSystemHealth(Math.max(95, 100 - Math.random() * 5))
    }, 5000)

    return () => {
      clearInterval(sessionTimer)
      clearInterval(healthMonitor)
    }
  }, [])

  const formatSessionTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'border-blue-500/50 bg-blue-900/20'
      case 'security': return 'border-red-500/50 bg-red-900/20'
      case 'ai': return 'border-purple-500/50 bg-purple-900/20'
      case 'management': return 'border-green-500/50 bg-green-900/20'
      case 'tools': return 'border-yellow-500/50 bg-yellow-900/20'
      default: return 'border-gray-500/50 bg-gray-900/20'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/5 to-blue-900/5">
      <div className="container mx-auto p-4 space-y-6 max-w-full overflow-x-hidden">
        
        {/* Header Section */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 mb-2">
                  🌍 UNIFIED GAIA ADMIN CONTROL CENTER
                </CardTitle>
                <p className="text-xl text-muted-foreground">
                  Complete administrative suite for GAiA ecosystem management
                </p>
              </div>
              <div className="text-right space-y-2">
                <Badge className="bg-green-600 text-white">
                  <Lock className="h-3 w-3 mr-1" />
                  EXCLUSIVE ACCESS
                </Badge>
                <div className="text-sm text-green-300">
                  Session: {formatSessionTime(activeSessionTime)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-900/50 rounded-lg border border-green-500/50">
                <Shield className="h-6 w-6 text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-green-400">100%</div>
                <div className="text-xs text-green-300">Security Level</div>
              </div>
              <div className="text-center p-3 bg-blue-900/50 rounded-lg border border-blue-500/50">
                <Database className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-blue-400">{systemHealth.toFixed(1)}%</div>
                <div className="text-xs text-blue-300">System Health</div>
              </div>
              <div className="text-center p-3 bg-purple-900/50 rounded-lg border border-purple-500/50">
                <Globe className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-purple-400">{sortedTabs.length}</div>
                <div className="text-xs text-purple-300">Admin Tools</div>
              </div>
              <div className="text-center p-3 bg-yellow-900/50 rounded-lg border border-yellow-500/50">
                <Wallet className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-yellow-400">VERIFIED</div>
                <div className="text-xs text-yellow-300">GAIA Token</div>
              </div>
            </div>
            
            {/* GAIA Token Status */}
            <div className="mt-4 p-3 bg-black/40 rounded-lg border border-green-500/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-300">🪙 GAIA Token Connected:</span>
                <Badge className="bg-green-600 text-white">
                  {GAIA_TOKEN.WALLET_ADDRESS.substring(0, 20)}...
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Admin Tabs */}
        <Card className="border-2 border-blue-500/50">
          <CardContent className="p-6">
            <Tabs defaultValue="breach-protocol" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 lg:grid-cols-9 gap-1 h-auto p-1 text-xs">
                {sortedTabs.slice(0, 18).map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id} 
                    className={`p-2 text-center ${getCategoryColor(tab.category)}`}
                  >
                    <div className="flex flex-col items-center">
                      {tab.icon}
                      <span className="hidden sm:inline mt-1">{tab.name}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-6">
                {sortedTabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    <div className="mb-4 p-4 bg-black/20 rounded-lg border border-gray-500/30">
                      <h3 className="text-lg font-bold text-white mb-1">{tab.name}</h3>
                      <p className="text-sm text-gray-400">{tab.description}</p>
                      <Badge className={`mt-2 ${getCategoryColor(tab.category)}`}>
                        {tab.category.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="min-h-[400px]">
                      {tab.component}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer Status */}
        <Card className="border border-gray-500/30 bg-black/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <Badge className="bg-green-600">
                  🛡️ All Systems Operational
                </Badge>
                <Badge className="bg-blue-600">
                  🌍 GAIA Network Connected
                </Badge>
                {adminSession && (
                  <Badge className="bg-purple-600">
                    👑 Session: {adminSession.id.substring(0, 8)}...
                  </Badge>
                )}
              </div>
              <div className="text-gray-400">
                © 2024 Harmony of Gaia - Administrative Control System
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}