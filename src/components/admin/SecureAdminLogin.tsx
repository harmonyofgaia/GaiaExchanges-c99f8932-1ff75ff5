
import { useState, useEffect } from 'react'
import { AdminLogin } from './AdminLogin'
import { AdminMFA } from './AdminMFA'
import { AdminRecoverySystem } from './AdminRecoverySystem'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, LogOut, RefreshCw, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

export function SecureAdminLogin() {
  const [showRecovery, setShowRecovery] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)
  const [credentialsVisible, setCredentialsVisible] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutTimer, setLockoutTimer] = useState(0)
  const { isAdmin, grantAdminAccess, revokeAdminAccess } = useSecureAdmin()

  // Check for existing failed attempts in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('admin_failed_attempts')
    const storedTime = localStorage.getItem('admin_lockout_time')
    
    if (stored) {
      const attempts = parseInt(stored)
      setFailedAttempts(attempts)
      
      if (attempts >= 7 && storedTime) {
        const lockTime = parseInt(storedTime)
        const now = Date.now()
        const timePassed = now - lockTime
        const lockDuration = 30 * 60 * 1000 // 30 minutes
        
        if (timePassed < lockDuration) {
          setIsLocked(true)
          setLockoutTimer(Math.ceil((lockDuration - timePassed) / 1000))
        } else {
          // Reset after lockout period
          resetFailedAttempts()
        }
      }
    }
  }, [])

  // Lockout timer countdown
  useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => {
        setLockoutTimer(prev => {
          if (prev <= 1) {
            setIsLocked(false)
            resetFailedAttempts()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [lockoutTimer])

  const resetFailedAttempts = () => {
    setFailedAttempts(0)
    localStorage.removeItem('admin_failed_attempts')
    localStorage.removeItem('admin_lockout_time')
  }

  const incrementFailedAttempts = () => {
    const newAttempts = failedAttempts + 1
    setFailedAttempts(newAttempts)
    localStorage.setItem('admin_failed_attempts', newAttempts.toString())
    
    if (newAttempts >= 7) {
      setIsLocked(true)
      setLockoutTimer(30 * 60) // 30 minutes
      localStorage.setItem('admin_lockout_time', Date.now().toString())
      
      toast.error('🚨 SECURITY LOCKOUT ACTIVATED', {
        description: 'Too many failed attempts. 4-Step Recovery required after cooldown.',
        duration: 10000
      })
    } else {
      toast.error(`❌ Login Failed (${newAttempts}/7 attempts)`, {
        description: `${7 - newAttempts} attempts remaining before security lockout`,
        duration: 5000
      })
    }
  }

  const handleDirectLogin = (username: string, password: string) => {
    if (isLocked) {
      toast.error('🔒 System Locked', {
        description: 'Please wait for cooldown or use 4-Step Recovery'
      })
      return false
    }

    const validCredentials = {
      user: 'Synatic',
      pass: 'harmonyquantumvaultaccess'
    }
    
    if (username === validCredentials.user && password === validCredentials.pass) {
      resetFailedAttempts() // Reset on successful login
      grantAdminAccess()
      toast.success('🌍 GAIA Vault Access Granted!', {
        description: 'Quantum vault security verified - all systems operational',
        duration: 5000
      })
      return true
    }
    
    incrementFailedAttempts()
    return false
  }

  const handleRecoveryComplete = () => {
    resetFailedAttempts()
    setIsLocked(false)
    setShowRecovery(false)
    grantAdminAccess()
    toast.success('🔐 Admin Access Recovered!', {
      description: '4-Step verification completed successfully',
      duration: 5000
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // If user is already admin, show admin controls
  if (isAdmin) {
    return (
      <Card className="border-green-500/50 bg-green-900/30">
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-400 mb-2">Admin Access Active</h2>
          <p className="text-green-300 mb-4">You have full administrative privileges</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={revokeAdminAccess} variant="outline" className="border-red-500/30 text-red-400">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show 4-Step Recovery if triggered
  if (showRecovery) {
    return (
      <AdminRecoverySystem 
        onRecoveryComplete={handleRecoveryComplete}
        onBack={() => setShowRecovery(false)}
      />
    )
  }

  // Show lockout screen
  if (isLocked && lockoutTimer > 0) {
    return (
      <Card className="border-red-500/50 bg-red-900/30">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-400 mb-2">🚨 SECURITY LOCKOUT</h2>
          <p className="text-red-300 mb-4">Too many failed login attempts detected</p>
          <div className="text-3xl font-bold text-red-400 mb-4">{formatTime(lockoutTimer)}</div>
          <p className="text-sm text-muted-foreground mb-6">Wait for cooldown or use 4-Step Recovery</p>
          <Button 
            onClick={() => setShowRecovery(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            4-Step Recovery Access
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Show regular login
  return (
    <div className="space-y-6">
      {failedAttempts > 0 && (
        <Card className="border-yellow-500/50 bg-yellow-900/30">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-300">
              {failedAttempts}/7 failed attempts • {7 - failedAttempts} remaining
            </p>
          </CardContent>
        </Card>
      )}
      
      <AdminLogin onLoginSuccess={handleDirectLogin} />
      
      {failedAttempts >= 5 && (
        <Card className="border-orange-500/50 bg-orange-900/30">
          <CardContent className="p-4 text-center">
            <p className="text-orange-300 text-sm">
              ⚠️ Approaching lockout threshold. 4-Step Recovery will be required after 7 failed attempts.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
