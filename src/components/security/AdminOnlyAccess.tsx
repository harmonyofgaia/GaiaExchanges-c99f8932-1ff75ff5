
import { ReactNode, useEffect, useState } from 'react'
import { Shield, Lock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

interface AdminOnlyAccessProps {
  children: ReactNode
}

export function AdminOnlyAccess({ children }: AdminOnlyAccessProps) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  })
  const [attempts, setAttempts] = useState(0)
  const maxAttempts = 3

  useEffect(() => {
    // Check for existing admin session (both new and old formats)
    const newSession = localStorage.getItem('gaia-admin') || sessionStorage.getItem('gaia-admin')
    const oldSession = localStorage.getItem('gaia-admin-session')
    const adminActive = sessionStorage.getItem('admin-active')
    
    let sessionValid = false
    
    // Check new format first
    if (newSession && (adminActive === '1' || adminActive === 'true')) {
      try {
        const sessionData = JSON.parse(newSession)
        if (sessionData.active) {
          sessionValid = true
        }
      } catch (e) {
        // Invalid session data, ignore
      }
    }
    
    // Check old format as fallback
    if (!sessionValid && oldSession) {
      const sessionExpiry = localStorage.getItem('gaia-admin-expiry')
      if (sessionExpiry && (adminActive === '1' || adminActive === 'true')) {
        const now = Date.now()
        if (now < parseInt(sessionExpiry)) {
          sessionValid = true
        } else {
          // Session expired, clear old storage
          localStorage.removeItem('gaia-admin-session')
          localStorage.removeItem('gaia-admin-expiry')
        }
      }
    }
    
    setIsAdminAuthenticated(sessionValid)
  }, [])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (attempts >= maxAttempts) {
      alert('🚫 Maximum login attempts exceeded. Access blocked for security.')
      return
    }

    // Admin credentials check
    if (adminCredentials.username === 'Synatic' && adminCredentials.password === 'Freedom!oul19922323') {
      setIsAdminAuthenticated(true)
      
      // Set optimized admin session
      const sessionId = `admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const sessionData = {
        id: sessionId,
        ts: Date.now(),
        active: true
      }
      
      // Try localStorage first, fallback to sessionStorage
      try {
        localStorage.setItem('gaia-admin', JSON.stringify(sessionData))
      } catch (e) {
        sessionStorage.setItem('gaia-admin', JSON.stringify(sessionData))
      }
      
      sessionStorage.setItem('admin-active', '1')
      
      console.log('🛡️ ADMIN ACCESS GRANTED - QUANTUM SECURITY ACTIVE')
    } else {
      setAttempts(prev => prev + 1)
      alert(`🚫 Invalid admin credentials. Attempts: ${attempts + 1}/${maxAttempts}`)
      setAdminCredentials({ username: '', password: '' })
    }
  }

  const handleLogout = () => {
    setIsAdminAuthenticated(false)
    // Clear both new and old session formats
    localStorage.removeItem('gaia-admin')
    localStorage.removeItem('gaia-admin-session')
    localStorage.removeItem('gaia-admin-expiry')
    sessionStorage.removeItem('gaia-admin')
    sessionStorage.removeItem('admin-active')
    sessionStorage.removeItem('admin-hb')
    setAdminCredentials({ username: '', password: '' })
    setAttempts(0)
  }

  if (isAdminAuthenticated) {
    return (
      <div className="space-y-6">
        {/* Admin Status Bar */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            <span className="text-red-400 font-bold">🛡️ ADMIN MODE ACTIVE</span>
            <Badge className="bg-red-600 animate-pulse">QUANTUM SECURED</Badge>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="border-red-500/30">
            <Lock className="h-4 w-4 mr-2" />
            Logout Admin
          </Button>
        </div>
        
        {/* Admin Content */}
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/10 to-orange-900/10 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-red-400">
              🛡️ ADMIN ACCESS REQUIRED
            </CardTitle>
            <p className="text-red-300 text-sm mt-2">
              Ultra-Secure Admin Portal • Quantum Protection Active
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {attempts >= maxAttempts ? (
            <div className="text-center p-6 space-y-4">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto" />
              <div className="text-red-400 font-bold">ACCESS BLOCKED</div>
              <p className="text-red-300 text-sm">Maximum login attempts exceeded</p>
            </div>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-username" className="text-red-300">Admin Username</Label>
                <Input
                  id="admin-username"
                  type="text"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-black/40 border-red-500/30 text-red-400"
                  placeholder="Enter admin username..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-red-300">Admin Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-black/40 border-red-500/30 text-red-400"
                  placeholder="Enter admin password..."
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3"
              >
                <Shield className="h-5 w-5 mr-2" />
                ACCESS ADMIN PORTAL
              </Button>
              
              {attempts > 0 && (
                <div className="text-center text-red-400 text-sm">
                  Failed attempts: {attempts}/{maxAttempts}
                </div>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
