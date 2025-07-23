
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Crown, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { Navbar } from '@/components/Navbar'

// Import all the admin components from both systems
import { AdminDashboard } from '@/components/admin/AdminDashboard'
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

function SecureAdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { grantAdminAccess } = useSecureAdmin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Enhanced admin credentials check - consolidated from both systems
      if (credentials.username === 'Synatic' && credentials.password === 'Freedom!oul19922323') {
        const accessGranted = grantAdminAccess()
        if (accessGranted) {
          toast.success('🌍 GAIA VAULT ACCESS GRANTED!', {
            description: 'Welcome to the Ultimate Secure Admin Control Center',
            duration: 5000
          })
        } else {
          toast.error('🚫 Admin Access Blocked', {
            description: 'Another admin session is active',
            duration: 3000
          })
        }
      } else {
        toast.error('🚫 VAULT ACCESS DENIED', {
          description: 'Invalid admin credentials - Quantum protection active',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Vault protection system activated',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Crown className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-green-400">
              🌍 GAIA SECURE ADMIN ACCESS
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Quantum Vault Security Portal • Ultimate Admin Control • All Features Integrated
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-green-300">Admin Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="bg-black/40 border-green-500/30 text-green-400"
                placeholder="Enter admin username..."
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-300">Vault Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-black/40 border-green-500/30 text-green-400 pr-10"
                  placeholder="Enter vault password..."
                  autoComplete="off"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 text-green-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3"
            >
              <Lock className="h-5 w-5 mr-2" />
              {isLoading ? 'Verifying Vault Access...' : 'ENTER SECURE ADMIN'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center mb-2">
              🛡️ Quantum Vault Protected • All Admin Features • Consolidated Security
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Secure admin portal with complete system control</div>
              <div>• All legacy admin features fully integrated</div>
              <div>• Advanced quantum protection active</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SecureAdminDashboard() {
  const { revokeAdminAccess } = useSecureAdmin()

  const handleLogout = () => {
    revokeAdminAccess()
    toast.success('🚪 Secure admin session terminated - System secured', {
      description: 'All administrative controls have been disabled',
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-4 space-y-4 max-w-full overflow-x-hidden">
        {/* Admin Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-400" />
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    🚀 GAiA SECURE ADMIN CONTROL CENTER
                  </h2>
                  <p className="text-lg lg:text-xl text-muted-foreground">
                    Ultimate administrative suite for GAiA ecosystem management • All Features Integrated
                  </p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
                <LogOut className="h-4 w-4 mr-2" />
                Secure Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="unified-dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-16 gap-1 h-auto p-1 text-xs">
            <TabsTrigger value="unified-dashboard" className="p-2 text-center">
              <div className="flex flex-col items-center">
                <span>🏠</span>
                <span className="hidden sm:inline">Unified Dashboard</span>
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
            <TabsContent value="unified-dashboard" className="mt-0">
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
          </div>
        </Tabs>
      </div>
    </div>
  )
}

const SecureAdmin = () => {
  const { isAdmin } = useSecureAdmin()

  if (isAdmin) {
    return <SecureAdminDashboard />
  }

  return <SecureAdminLogin />
}

export default SecureAdmin
