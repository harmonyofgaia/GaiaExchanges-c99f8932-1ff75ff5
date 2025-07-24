
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
  FileText
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

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
      // Admin credentials verification - Updated credentials
      const isValidAdmin = credentials.username === 'Synatic' && 
                          credentials.password === 'harmonyquantumvaultaccess'
      
      if (isValidAdmin) {
        setIsLoggedIn(true)
        toast.success('👑 GAIA ADMIN ACCESS GRANTED!', {
          description: 'Welcome to the GAIA Control Center',
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

  // Login Screen - Only show if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
        <Card className="max-w-md mx-auto border-green-500/30 bg-gradient-to-br from-green-900/30 to-black/70 backdrop-blur-sm">
          <CardHeader>
            <div className="text-center">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-2xl">
                <Shield className="h-6 w-6" />
                GAIA ADMIN CENTER
              </CardTitle>
              <p className="text-green-300 text-sm mt-2">
                Exclusive Access • Quantum Protected • Ultimate Control
              </p>
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-300">
                  🌍 Official Wallet: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 20)}...
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
                  placeholder="Enter admin username..."
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
                    placeholder="Enter quantum password..."
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
                {isLoading ? 'Verifying Access...' : 'ENTER GAIA ADMIN'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
              <p className="text-xs text-green-300 text-center">
                👑 ADMIN ONLY • QUANTUM PROTECTED • SECURE ACCESS
              </p>
              <p className="text-xs text-blue-300 text-center mt-1">
                Official GAIA Token Control • Harmony of Culture Platform
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard - Show when logged in
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
                    Official Token Management • Quantum Protected • Full Control
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

        {/* Use the existing AdminDashboard component */}
        <AdminDashboard />

        {/* Footer Info */}
        <Card className="mt-6 border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-green-400 font-bold mb-2">
                🛡️ QUANTUM ADMIN PROTECTION ACTIVE
              </p>
              <p className="text-sm text-muted-foreground">
                Official GAIA Token: {GAIA_TOKEN.WALLET_ADDRESS} • Harmony of Culture • Exclusive Access
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
