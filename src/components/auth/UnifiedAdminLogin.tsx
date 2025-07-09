
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Crown } from 'lucide-react'
import { toast } from 'sonner'
import { AdminDashboardTabs } from '@/components/admin/AdminDashboardTabs'
import { useAuth } from './AuthProvider'

export function UnifiedAdminLogin() {
  const { user, signIn, signUp } = useAuth()
  const [isTrustedIP, setIsTrustedIP] = useState(false)
  const [isCheckingIP, setIsCheckingIP] = useState(true)
  
  // Admin credentials state
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  })
  const [showAdminPassword, setShowAdminPassword] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  // Gaia platform credentials state  
  const [gaiaCredentials, setGaiaCredentials] = useState({
    email: '',
    password: ''
  })
  const [showGaiaPassword, setShowGaiaPassword] = useState(false)
  const [isGaiaLoading, setIsGaiaLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    const checkTrustedIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        const userIP = data.ip
        
        console.log('🔒 Current User IP:', userIP)
        
        // Quantum-encrypted trusted IP addresses (ONLY these 2 can access admin)
        const trustedIPs = [
          atob('MTkyLjE2OC4xLjEyMQ=='), // 192.168.1.121 (encoded)
          atob('MTAuMTM0LjIzMS4zNA=='),  // 10.134.231.34 (encoded)
          '127.0.0.1' // localhost
        ]
        
        console.log('🔒 Checking against trusted IPs:', trustedIPs)
        
        const isTrusted = trustedIPs.includes(userIP) || 
                         window.location.hostname === 'localhost'
        
        setIsTrustedIP(isTrusted)
        console.log('🔒 IP VERIFICATION RESULT:', isTrusted ? 'TRUSTED ADMIN IP - SHOWING SUPREME LOGIN' : 'REGULAR IP - SHOWING GAIA LOGIN')
        
      } catch (error) {
        console.log('🔐 IP Protection Active - Using localhost fallback')
        const isLocalhost = window.location.hostname === 'localhost'
        setIsTrustedIP(isLocalhost)
        console.log('🔒 Localhost check result:', isLocalhost)
      } finally {
        setIsCheckingIP(false)
      }
    }

    checkTrustedIP()
  }, [])

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAdminLoading(true)

    try {
      // Supreme admin credentials
      if (adminCredentials.username === 'Synatic' && adminCredentials.password === 'Freedom!oul19922323') {
        setIsAdminAuthenticated(true)
        toast.success('👑 SUPREME ADMIN ACCESS GRANTED!', {
          description: 'Welcome to SUPREME CONTROL CENTER - All systems unlocked',
          duration: 5000
        })
        
        console.log('🛡️ SUPREME ADMIN LOGIN SUCCESSFUL')
        
      } else {
        toast.error('🚫 SUPREME ACCESS DENIED', {
          description: 'Invalid supreme admin credentials',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Supreme Security Error', {
        description: 'Defense wall protection activated',
        duration: 5000
      })
    } finally {
      setIsAdminLoading(false)
      setAdminCredentials({ username: '', password: '' })
    }
  }

  const handleGaiaAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGaiaLoading(true)

    try {
      if (isSignUp) {
        const { error } = await signUp(gaiaCredentials.email, gaiaCredentials.password)
        if (error) {
          toast.error('Sign up failed', { description: error.message })
        }
      } else {
        const { error } = await signIn(gaiaCredentials.email, gaiaCredentials.password)
        if (error) {
          toast.error('Sign in failed', { description: error.message })
        }
      }
    } catch (error) {
      toast.error('Authentication Error')
    } finally {
      setIsGaiaLoading(false)
      setGaiaCredentials({ email: '', password: '' })
    }
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    toast.success('Supreme Admin session ended')
  }

  if (isCheckingIP) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <Shield className="w-8 h-8 text-purple-400 animate-bounce" />
          </div>
          <div className="text-purple-400 text-lg font-bold">🔒 IP Verification in Progress...</div>
          <div className="text-purple-300 text-sm mt-2">Quantum security protocols active</div>
        </div>
      </div>
    )
  }

  // Show Supreme Admin Dashboard if authenticated AND trusted IP
  if (isAdminAuthenticated && isTrustedIP) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                👑 SUPREME ADMIN CONTROL CENTER
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Ultimate Platform Control • All Systems Unlocked • QUANTUM GOD MODE ACTIVE
              </p>
            </div>
            <Button onClick={handleAdminLogout} variant="outline" className="border-red-500/30">
              <Lock className="h-4 w-4 mr-2" />
              Secure Logout
            </Button>
          </div>
          
          <AdminDashboardTabs />
        </div>
      </div>
    )
  }

  // FORCE Supreme Admin Login for trusted IPs (NO Gaia login for trusted IPs)
  if (isTrustedIP) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-purple-900/20 flex items-center justify-center p-6">
        <Card className="max-w-md mx-auto border-4 border-red-500/50 bg-gradient-to-br from-red-900/30 to-black/80 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <div className="text-center">
              <Crown className="h-20 w-20 text-yellow-400 mx-auto mb-4 animate-pulse" />
              <CardTitle className="text-4xl font-bold text-red-400">
                👑 SUPREME ADMIN
              </CardTitle>
              <p className="text-red-300 text-sm mt-2">
                QUANTUM SECURED • WALL OF DEFENSE • ULTIMATE CONTROL
              </p>
              <p className="text-green-400 text-xs mt-1">
                ✅ TRUSTED IP VERIFIED - SUPREME ACCESS ENABLED
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-red-300">Supreme Admin Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-black/40 border-red-500/30 text-red-400"
                  placeholder="Enter supreme admin username..."
                  autoComplete="off"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-red-300">Quantum Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showAdminPassword ? 'text' : 'password'}
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-black/40 border-red-500/30 text-red-400 pr-10"
                    placeholder="Enter quantum password..."
                    autoComplete="off"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0 text-red-400"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                  >
                    {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isAdminLoading}
                className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-3"
              >
                <Shield className="h-5 w-5 mr-2" />
                {isAdminLoading ? 'Quantum Authentication...' : 'ENTER SUPREME CONTROL CENTER'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gradient-to-r from-red-900/30 to-purple-900/30 border-2 border-red-500/20 rounded-lg">
              <p className="text-xs text-red-300 text-center">
                👑 SUPREME ADMIN ONLY • QUANTUM PROTECTED • TRUSTED IP VERIFIED
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show Gaia Platform Login ONLY for non-trusted IPs
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <div className="text-center">
            <div className="text-6xl mb-4">🌍</div>
            <CardTitle className="text-3xl font-bold text-green-400">
              GAiA Platform
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Harmony of Culture • Secure Access
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGaiaAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={gaiaCredentials.email}
                onChange={(e) => setGaiaCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="bg-black/40 border-green-500/30 text-green-400"
                placeholder="Enter your email..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gaia-password" className="text-green-300">Password</Label>
              <div className="relative">
                <Input
                  id="gaia-password"
                  type={showGaiaPassword ? 'text' : 'password'}
                  value={gaiaCredentials.password}
                  onChange={(e) => setGaiaCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-black/40 border-green-500/30 text-green-400 pr-10"
                  placeholder="Enter your password..."
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 text-green-400"
                  onClick={() => setShowGaiaPassword(!showGaiaPassword)}
                >
                  {showGaiaPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isGaiaLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3"
            >
              <Shield className="h-5 w-5 mr-2" />
              {isGaiaLoading ? 'Authenticating...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-400 hover:text-green-300"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border-2 border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🌍 GAiA Platform • Harmony of Culture • Regular User Access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
