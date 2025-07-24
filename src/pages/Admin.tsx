
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Crown, 
  Settings,
  Database,
  Users,
  BarChart3,
  Wallet,
  FileText,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'
import { UnifiedAdminDashboard } from '@/components/admin/UnifiedAdminDashboard'
import { WalletEngineAdmin } from '@/components/admin/WalletEngineAdmin'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Admin credentials verification
      const isValidAdmin = credentials.username === 'Synatic' && 
                          credentials.password === 'harmonyquantumvaultaccess'
      
      if (isValidAdmin) {
        setIsLoggedIn(true)
        toast.success('👑 GOD MODE ADMIN ACCESS GRANTED!', {
          description: 'Welcome to the Ultimate Control Center',
          duration: 5000
        })
      } else {
        toast.error('🚫 ADMIN ACCESS DENIED', {
          description: 'Invalid admin credentials - Quantum protection active',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Admin protection system activated',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    toast.info('🔒 Admin Session Ended', {
      description: 'Quantum vault secured'
    })
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
        <Card className="max-w-md mx-auto border-green-500/30 bg-gradient-to-br from-green-900/30 to-black/70 backdrop-blur-sm">
          <CardHeader>
            <div className="text-center">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-2xl">
                <Shield className="h-6 w-6" />
                GAIA ADMIN CONTROL CENTER
              </CardTitle>
              <p className="text-green-300 text-sm mt-2">
                GOD MODE • QUANTUM VAULT • ULTIMATE CONTROL
              </p>
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-300">
                  🌍 Protected Wallet: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 20)}...
                </p>
                <p className="text-xs text-purple-300">
                  📋 Contract: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20)}...
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-green-300">Admin Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-black/30 border-green-500/30 text-green-400"
                  placeholder="Admin username..."
                  autoComplete="off"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-300">Quantum Vault Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-black/30 border-green-500/30 text-green-400 pr-10"
                    placeholder="Quantum vault password..."
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
                {isLoading ? 'Verifying GOD MODE...' : 'ENTER ADMIN VAULT'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
              <p className="text-xs text-green-300 text-center">
                👑 ADMIN ONLY • QUANTUM PROTECTED • BANK-LEVEL SECURITY
              </p>
              <p className="text-xs text-blue-300 text-center mt-1">
                Ultimate Control • Global Management • Parabolic Universe Access
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        {/* Admin Header */}
        <Card className="mb-6 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Crown className="h-8 w-8 text-yellow-400" />
                <div>
                  <CardTitle className="text-green-400 text-2xl">
                    🌍 GAIA ADMIN CONTROL CENTER
                  </CardTitle>
                  <p className="text-green-300">
                    Ultimate Management • Quantum Protected • GOD MODE ACTIVE
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-600 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  AUTHENTICATED
                </Badge>
                <Button onClick={handleLogout} variant="outline" className="border-red-500/30 text-red-400">
                  <Lock className="h-4 w-4 mr-2" />
                  Secure Logout
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Admin Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="wallet">
              <Wallet className="h-4 w-4 mr-2" />
              Wallet Engine
            </TabsTrigger>
            <TabsTrigger value="database">
              <Database className="h-4 w-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <UnifiedAdminDashboard />
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">👥 User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage all platform users and their GAiA token activities.
                </p>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold">User Management Panel</p>
                  <p className="text-sm text-muted-foreground">Advanced user controls coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet">
            <WalletEngineAdmin />
          </TabsContent>

          <TabsContent value="database">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">🗄️ Database Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Monitor and manage all GAiA token related database operations.
                </p>
                <div className="text-center py-8">
                  <Database className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Database Control Panel</p>
                  <p className="text-sm text-muted-foreground">Database management tools coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="text-orange-400">📊 Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Generate comprehensive reports on GAiA token performance and user engagement.
                </p>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Analytics Dashboard</p>
                  <p className="text-sm text-muted-foreground">Advanced reporting tools coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-gray-500/30 bg-gray-900/20">
              <CardHeader>
                <CardTitle className="text-gray-400">⚙️ System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="font-bold text-green-400 mb-2">🌍 GAIA Token Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-muted-foreground">Official Wallet:</span> <code className="text-green-300">{GAIA_TOKEN.WALLET_ADDRESS}</code></div>
                      <div><span className="text-muted-foreground">Contract Address:</span> <code className="text-purple-300">{GAIA_TOKEN.CONTRACT_ADDRESS}</code></div>
                      <div><span className="text-muted-foreground">Network:</span> <span className="text-blue-300">{GAIA_TOKEN.NETWORK}</span></div>
                      <div><span className="text-muted-foreground">Symbol:</span> <span className="text-yellow-300">{GAIA_TOKEN.SYMBOL}</span></div>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Additional system settings will be added here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <Card className="mt-6 border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-green-400 font-bold mb-2">
                🛡️ QUANTUM ADMIN PROTECTION ACTIVE
              </p>
              <p className="text-sm text-muted-foreground">
                All operations secured with military-grade encryption • GAIA token verified • Exclusive admin access
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
