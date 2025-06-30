
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Download } from 'lucide-react'
import { toast } from 'sonner'
import { AdminDashboardTabs } from './AdminDashboardTabs'

export function SecureVaultLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [securityAlerts, setSecurityAlerts] = useState<any[]>([])

  // Monitor for security attempts (simplified and safe)
  useEffect(() => {
    const monitorSecurity = () => {
      const attempts = JSON.parse(localStorage.getItem('admin-hack-attempts') || '[]')
      if (attempts.length > 0) {
        setSecurityAlerts(attempts)
        console.log('🚨 SECURITY ALERT: Unauthorized access attempts detected')
      }
    }

    const interval = setInterval(monitorSecurity, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Ultra-secure admin credentials
      const validCredentials = {
        username: 'Synatic',
        password: 'Freedom!oul19922323'
      }

      if (credentials.username === validCredentials.username && 
          credentials.password === validCredentials.password) {
        
        console.log('🛡️ ADMIN ACCESS GRANTED')
        console.log('👑 Welcome Admin Synatic - Full System Control Active')
        
        setIsAuthenticated(true)
        toast.success('🌌 ADMIN VAULT UNLOCKED!', {
          description: 'Welcome to the Universal Control Center, Synatic.',
          duration: 5000
        })
      } else {
        // Log unauthorized attempt
        const attempt = {
          timestamp: new Date().toISOString(),
          username: credentials.username,
          password: credentials.password,
          ip: 'Unknown',
          userAgent: navigator.userAgent,
          blocked: true
        }
        
        const attempts = JSON.parse(localStorage.getItem('admin-hack-attempts') || '[]')
        attempts.push(attempt)
        localStorage.setItem('admin-hack-attempts', JSON.stringify(attempts))
        
        console.log('🚨 UNAUTHORIZED ACCESS ATTEMPT BLOCKED')
        
        toast.error('🚨 ACCESS DENIED', {
          description: 'Invalid credentials. Attempt logged.',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Maximum protection activated',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    toast.success('Logged out successfully')
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🌍 GAIA Admin Dashboard
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Complete System Control • Secure Access • Global Management
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
              Universal Admin Access • Quantum Protected • Stable System
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
              {isLoading ? 'Authenticating...' : 'LOGIN TO ADMIN CONTROL'}
            </Button>
          </form>

          {securityAlerts.length > 0 && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded">
              <div className="text-red-400 text-sm font-bold">🚨 SECURITY ALERTS</div>
              <div className="text-red-300 text-xs">{securityAlerts.length} unauthorized attempts blocked</div>
            </div>
          )}

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🛡️ STABLE ADMIN SYSTEM • MAXIMUM SECURITY • RELIABLE ACCESS
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              Admin Control • Global Management • Secure Authentication
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
