
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { AdminDashboardTabs } from './AdminDashboardTabs'
import { PersistentAdminSession } from './PersistentAdminSession'

export function SecureVaultLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing persistent session on load
  useEffect(() => {
    const checkPersistentSession = () => {
      const session = localStorage.getItem('gaia-admin-session')
      const adminActive = sessionStorage.getItem('admin-active')
      
      if (session && adminActive === 'true') {
        const sessionData = JSON.parse(session)
        const isValid = sessionData.persistent && sessionData.timestamp
        
        if (isValid) {
          setIsAuthenticated(true)
          console.log('🔄 PERSISTENT ADMIN SESSION RESTORED')
          toast.success('🛡️ Admin Session Restored', {
            description: 'Welcome back to GAIA Control Center',
            duration: 3000
          })
        }
      }
    }

    checkPersistentSession()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Stable admin credentials
      if (credentials.username === 'Synatic' && credentials.password === 'Freedom!oul19922323') {
        
        console.log('🛡️ ADMIN ACCESS GRANTED - UNLIMITED SESSION')
        
        // Create persistent session
        localStorage.setItem('gaia-admin-session', JSON.stringify({
          username: credentials.username,
          timestamp: Date.now(),
          persistent: true,
          unlimitedAccess: true
        }))
        
        sessionStorage.setItem('admin-active', 'true')
        
        setIsAuthenticated(true)
        toast.success('🌌 ADMIN VAULT UNLOCKED!', {
          description: 'Persistent session activated - No timeout',
          duration: 5000
        })
      } else {
        toast.error('🚨 ACCESS DENIED', {
          description: 'Invalid credentials',
          duration: 3000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Please try again',
        duration: 3000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('gaia-admin-session')
    sessionStorage.removeItem('admin-active')
    setIsAuthenticated(false)
    toast.success('Logged out successfully')
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
        <PersistentAdminSession />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🌍 GAIA Admin Dashboard
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Persistent Session Active • Community Protection • Global Management
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-green-400">
              🛡️ GAIA Secure Admin
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Persistent Session • No Timeout • Community Protection
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
              <Lock className="h-5 w-5 mr-2" />
              {isLoading ? 'Authenticating...' : 'ACTIVATE PERSISTENT SESSION'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🛡️ PERSISTENT ADMIN SYSTEM • NO TIMEOUT • COMMUNITY PROTECTION
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              Unlimited Session Time • Maximum Security • Global Management
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
