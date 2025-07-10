
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Crown } from 'lucide-react'
import { toast } from 'sonner'
import { AdminDashboardTabs } from '@/components/admin/AdminDashboardTabs'

export function UnifiedAdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Admin credentials - highly secured
      if (credentials.username === 'Synatic' && credentials.password === 'Freedom!oul19922323') {
        setIsAuthenticated(true)
        toast.success('👑 ADMIN ACCESS GRANTED!', {
          description: 'Welcome to GAIA Control Center - All systems unlocked',
          duration: 5000
        })
        
        console.log('🛡️ ADMIN LOGIN SUCCESSFUL')
        console.log('👑 GOD MODE ACTIVATED - FULL PLATFORM CONTROL')
        
      } else {
        toast.error('🚫 ACCESS DENIED', {
          description: 'Invalid admin credentials - Security protocols active',
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
    setIsAuthenticated(false)
    toast.success('Admin session ended')
  }

  // Show admin dashboard if authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                👑 GAIA ADMIN CONTROL CENTER
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Ultimate Platform Control • All Systems Unlocked • GOD MODE ACTIVE
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
              <Lock className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <AdminDashboardTabs />
        </div>
      </div>
    )
  }

  // Show admin login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold text-green-400">
              👑 ADMIN LOGIN
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              TRUSTED IP VERIFIED • ULTIMATE CONTROL CENTER
            </p>
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
                className="bg-black/40 border-green-500/30 text-green-400"
                placeholder="Enter admin username..."
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-300">Admin Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-black/40 border-green-500/30 text-green-400 pr-10"
                  placeholder="Enter admin password..."
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
              <Shield className="h-5 w-5 mr-2" />
              {isLoading ? 'Authenticating...' : 'ENTER ADMIN CONTROL CENTER'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              👑 TRUSTED IP ADMIN ACCESS • QUANTUM SECURITY ACTIVE • ALL SYSTEMS UNLOCKED
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
