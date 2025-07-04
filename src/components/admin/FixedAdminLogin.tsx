import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Crown, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface FixedAdminLoginProps {
  onLoginSuccess: () => void
}

export function FixedAdminLogin({ onLoginSuccess }: FixedAdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [showRecovery, setShowRecovery] = useState(false)
  const [recoveryStep, setRecoveryStep] = useState(1)
  const [recoveryCode, setRecoveryCode] = useState('')

  // Original admin credentials (restored)
  const validCredentials = {
    username: 'Synatic',
    password: 'harmonyquantumvaultaccess'
  }

  // Recovery passwords (keeping the same ones)
  const recoveryPasswords = [
    '246810', // Step 1
    '135791', // Step 2  
    '369258', // Step 3
    '147852'  // Step 4
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check for valid admin credentials
      if (credentials.username === validCredentials.username && 
          credentials.password === validCredentials.password) {
        
        console.log('👑 ADMIN ACCESS GRANTED - ORIGINAL CREDENTIALS VERIFIED')
        console.log('🛡️ QUANTUM VAULT ACCESS RESTORED')
        console.log('🌌 MASTER MATRIX CONTROL ACTIVATED')
        
        toast.success('👑 ADMIN ACCESS RESTORED!', {
          description: 'Welcome back to the Master Control System',
          duration: 5000
        })
        
        // Set admin session
        sessionStorage.setItem('admin-session-active', 'true')
        sessionStorage.setItem('admin-verified', 'true')
        sessionStorage.setItem('admin-email', 'michelzuidwijk@gmail.com')
        localStorage.setItem('admin-logged-in', 'true')
        
        onLoginSuccess()
        setLoginAttempts(0)
      } else {
        setLoginAttempts(prev => prev + 1)
        
        if (loginAttempts >= 6) { // After 7 attempts (0-6), show recovery
          setShowRecovery(true)
          toast.error('🚨 SECURITY BREACH DETECTED!', {
            description: 'Multiple failed attempts - Recovery system activated',
            duration: 8000
          })
          console.log('🚨 SECURITY WALL BREACHED - ACTIVATING 4-STEP RECOVERY')
        } else {
          toast.error('❌ Invalid Credentials', {
            description: `Attempt ${loginAttempts + 1}/7 - Recovery after 7 failed attempts`,
            duration: 5000
          })
        }
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Quantum protection system activated',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      // Clear sensitive data
      setCredentials({ username: '', password: '' })
    }
  }

  const handleRecoveryStep = () => {
    const expectedCode = recoveryPasswords[recoveryStep - 1]
    
    if (recoveryCode === expectedCode) {
      if (recoveryStep === 4) { // All 4 steps completed
        toast.success('🛡️ SECURITY RECOVERY COMPLETE!', {
          description: 'All 4 recovery steps verified - Access granted',
          duration: 5000
        })
        
        console.log('✅ 4-STEP RECOVERY COMPLETED SUCCESSFULLY')
        console.log('🔒 QUANTUM VAULT SECURITY RESTORED')
        console.log('👑 ADMIN ACCESS RE-ESTABLISHED')
        
        // Grant admin access
        sessionStorage.setItem('admin-session-active', 'true')
        sessionStorage.setItem('admin-verified', 'true')
        sessionStorage.setItem('admin-email', 'michelzuidwijk@gmail.com')
        localStorage.setItem('admin-logged-in', 'true')
        
        onLoginSuccess()
        setShowRecovery(false)
        setRecoveryStep(1)
      } else {
        setRecoveryStep(prev => prev + 1)
        toast.success(`✅ Recovery Step ${recoveryStep} Verified!`, {
          description: `Proceeding to step ${recoveryStep + 1}/4`,
          duration: 3000
        })
      }
      setRecoveryCode('')
    } else {
      toast.error('❌ Invalid Recovery Code', {
        description: `Step ${recoveryStep}/4 failed - Try again`,
        duration: 5000
      })
      setRecoveryCode('')
    }
  }

  if (showRecovery) {
    return (
      <Card className="max-w-md mx-auto border-red-500/30 bg-gradient-to-br from-red-900/30 to-black/70 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4 animate-pulse" />
            <CardTitle className="flex items-center justify-center gap-2 text-red-400 text-2xl">
              <Shield className="h-6 w-6" />
              SECURITY RECOVERY MODE
            </CardTitle>
            <p className="text-red-300 text-sm mt-2">
              BREACH DETECTED • 4-STEP RECOVERY REQUIRED
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-red-400">
                Recovery Step {recoveryStep}/4
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter recovery password for step {recoveryStep}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recovery-code" className="text-red-300">Recovery Code</Label>
              <Input
                id="recovery-code"
                type="text"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                className="bg-black/30 border-red-500/30 text-red-400 text-center"
                placeholder="Enter recovery code..."
                autoComplete="off"
              />
            </div>

            <Button 
              onClick={handleRecoveryStep}
              disabled={!recoveryCode}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3"
            >
              <Lock className="h-5 w-5 mr-2" />
              VERIFY STEP {recoveryStep}
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/20 rounded-lg">
            <p className="text-xs text-red-300 text-center">
              🚨 SECURITY BREACH DETECTED • RECOVERY MODE ACTIVE
            </p>
            <p className="text-xs text-orange-300 text-center mt-1">
              Complete all 4 steps to restore admin access
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto border-green-500/30 bg-gradient-to-br from-green-900/30 to-black/70 backdrop-blur-sm">
      <CardHeader>
        <div className="text-center">
          <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-2xl">
            <Shield className="h-6 w-6" />
            MASTER ADMIN ACCESS
          </CardTitle>
          <p className="text-green-300 text-sm mt-2">
            QUANTUM VAULT • ORIGINAL CREDENTIALS RESTORED
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
              className="bg-black/30 border-green-500/30 text-green-400"
              placeholder="Enter admin username..."
              autoComplete="off"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-300">Master Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="bg-black/30 border-green-500/30 text-green-400 pr-10"
                placeholder="Enter master password..."
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
            {isLoading ? 'VERIFYING ACCESS...' : 'ENTER MASTER SYSTEM'}
          </Button>
        </form>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          Attempts: {loginAttempts}/7 • Recovery activates after 7 failed attempts
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
          <p className="text-xs text-green-300 text-center">
            👑 ORIGINAL CREDENTIALS RESTORED • QUANTUM PROTECTED
          </p>
          <p className="text-xs text-blue-300 text-center mt-1">
            Master Control • Invisible Matrix • Global Command
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
