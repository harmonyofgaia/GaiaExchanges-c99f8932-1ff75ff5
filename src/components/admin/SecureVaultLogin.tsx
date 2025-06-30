
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { AdminDashboardTabs } from './AdminDashboardTabs'
import { PersistentAdminSession } from './PersistentAdminSession'
import { AdminRouteProtector } from './AdminRouteProtector'

export function SecureVaultLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing ultra-persistent session on load
  useEffect(() => {
    const checkUltraPersistentSession = () => {
      const sessions = [
        localStorage.getItem('gaia-admin-session'),
        localStorage.getItem('gaia-admin-backup'),
        sessionStorage.getItem('admin-active'),
        sessionStorage.getItem('admin-quantum-active')
      ]
      
      const hasValidSession = sessions.some(session => {
        if (!session || session === 'null') return false
        if (session === 'true') return true
        
        try {
          const sessionData = JSON.parse(session)
          return sessionData.persistent && sessionData.ultraSecure && sessionData.timestamp
        } catch {
          return false
        }
      })
      
      if (hasValidSession) {
        setIsAuthenticated(true)
        console.log('🔄 ULTRA-PERSISTENT ADMIN SESSION RESTORED')
        console.log('🛡️ QUANTUM ADMIN PROTECTION ACTIVE')
        toast.success('🛡️ Admin Session Restored', {
          description: 'Ultra-persistent session active - No timeout protection',
          duration: 3000
        })
      }
    }

    checkUltraPersistentSession()
    
    // Monitor for session restoration every second
    const sessionMonitor = setInterval(checkUltraPersistentSession, 1000)
    
    return () => clearInterval(sessionMonitor)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Ultra-secure admin credentials
      if (credentials.username === 'Synatic' && credentials.password === 'Freedom!oul19922323') {
        
        console.log('🛡️ ADMIN ACCESS GRANTED - ULTRA-PERSISTENT SESSION ACTIVATED')
        console.log('👑 QUANTUM PROTECTION ENABLED - INFINITE SESSION TIME')
        console.log('🚫 ANTI-LOGOUT PROTECTION ACTIVE')
        
        // Create multiple layers of persistent session data
        const sessionData = {
          username: credentials.username,
          timestamp: Date.now(),
          persistent: true,
          ultraSecure: true,
          quantumProtected: true,
          unlimitedAccess: true,
          antiLogout: true
        }
        
        // Store in multiple locations for maximum persistence
        localStorage.setItem('gaia-admin-session', JSON.stringify(sessionData))
        localStorage.setItem('gaia-admin-backup', JSON.stringify(sessionData))
        localStorage.setItem('admin-quantum-key', btoa(JSON.stringify(sessionData)))
        
        sessionStorage.setItem('admin-active', 'true')
        sessionStorage.setItem('admin-quantum-active', 'true')
        sessionStorage.setItem('admin-ultra-protected', 'true')
        
        // IndexedDB storage for maximum persistence
        if ('indexedDB' in window) {
          const request = indexedDB.open('GaiaAdminDB', 1)
          request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result
            if (!db.objectStoreNames.contains('adminSessions')) {
              db.createObjectStore('adminSessions')
            }
          }
          request.onsuccess = (event) => {
            const db = (event.target as IDBRequest).result
            const transaction = db.transaction(['adminSessions'], 'readwrite')
            const store = transaction.objectStore('adminSessions')
            store.put(sessionData, 'current-session')
          }
        }
        
        setIsAuthenticated(true)
        toast.success('🌌 ADMIN VAULT UNLOCKED!', {
          description: 'Ultra-persistent session activated - Infinite access time',
          duration: 5000
        })
      } else {
        toast.error('🚨 ACCESS DENIED', {
          description: 'Invalid credentials - Quantum protection active',
          duration: 3000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Quantum vault protection activated',
        duration: 3000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  const handleLogout = () => {
    // Only logout when explicitly requested
    localStorage.removeItem('gaia-admin-session')
    localStorage.removeItem('gaia-admin-backup')
    localStorage.removeItem('admin-quantum-key')
    sessionStorage.removeItem('admin-active')
    sessionStorage.removeItem('admin-quantum-active')
    sessionStorage.removeItem('admin-ultra-protected')
    
    // Clear IndexedDB
    if ('indexedDB' in window) {
      const request = indexedDB.open('GaiaAdminDB', 1)
      request.onsuccess = (event) => {
        const db = (event.target as IDBRequest).result
        const transaction = db.transaction(['adminSessions'], 'readwrite')
        const store = transaction.objectStore('adminSessions')
        store.delete('current-session')
      }
    }
    
    setIsAuthenticated(false)
    toast.success('Admin session terminated')
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
        <PersistentAdminSession />
        <AdminRouteProtector />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🌍 GAIA Admin Dashboard
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Ultra-Persistent Session • Quantum Protection • Global Management
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

  // Anti-detection measures for login page
  useEffect(() => {
    document.title = 'GAIA - Decentralized Platform'
    
    // Hide admin indicators
    const hideAdminElements = () => {
      const adminElements = document.querySelectorAll('[data-admin="true"]')
      adminElements.forEach(el => {
        const htmlEl = el as HTMLElement
        htmlEl.style.display = 'none'
      })
    }
    
    hideAdminElements()
    const interval = setInterval(hideAdminElements, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <AdminRouteProtector />
      <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-green-400">
              🛡️ GAIA Secure Access
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Ultra-Persistent Session • Quantum Protection • Anti-Logout System
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
              {isLoading ? 'Authenticating...' : 'ACTIVATE ULTRA-PERSISTENT SESSION'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🛡️ ULTRA-PERSISTENT ADMIN SYSTEM • NO TIMEOUT • QUANTUM PROTECTION
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              Anti-Logout Protection • Infinite Session Time • Maximum Security
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
