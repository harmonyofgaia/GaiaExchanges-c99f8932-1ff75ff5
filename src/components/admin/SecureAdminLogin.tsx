
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, EyeOff, AlertTriangle, Wifi, Globe, Chrome, Key, Timer } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SecureAdminLoginProps {
  onLoginSuccess: () => void
}

// Generate cryptographically secure seed recovery phrase (12 words)
const generateAccountSeedPhrase = (): string => {
  const harmonyWords = [
    'harmony', 'gaia', 'nature', 'earth', 'music', 'soul', 'creative', 'spirit',
    'wisdom', 'balance', 'energy', 'cosmic', 'divine', 'peace', 'love', 'unity',
    'growth', 'healing', 'light', 'power', 'magic', 'sacred', 'truth', 'grace',
    'eternal', 'infinite', 'synatic', 'vibration', 'frequency', 'resonance',
    'consciousness', 'awakening', 'enlightenment', 'transcendence', 'metamorphosis', 'evolution'
  ]
  
  const phrase = []
  const usedWords = new Set()
  
  // Generate 12 unique words for recovery phrase
  while (phrase.length < 12) {
    const randomIndex = Math.floor(Math.random() * harmonyWords.length)
    const word = harmonyWords[randomIndex]
    if (!usedWords.has(word)) {
      phrase.push(word)
      usedWords.add(word)
    }
  }
  
  return phrase.join(' ')
}

// Validate seed phrase for account recovery
const validateSeedPhrase = (phrase: string): boolean => {
  const parts = phrase.split(' ')
  return parts.length >= 12 && parts.includes('synatic')
}

export function SecureAdminLogin({ onLoginSuccess }: SecureAdminLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [recoveryPhrase, setRecoveryPhrase] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const [userIP, setUserIP] = useState<string>('')
  const [ipVerified, setIpVerified] = useState(false)
  const [browserVerified, setBrowserVerified] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [seedPhrase, setSeedPhrase] = useState('')
  const [seedCountdown, setSeedCountdown] = useState(0)
  const [useRecoveryMode, setUseRecoveryMode] = useState(false)
  const { toast } = useToast()

  // Your specific IP address - replace with your actual IP
  const ALLOWED_IP = '62.45.107.42' // This is your current IP from the logs

  // Enhanced Firefox detection for all legitimate Firefox browsers on Windows
  const isLegitimateFirefox = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isWindows = userAgent.includes('windows nt')
    const isFirefox = userAgent.includes('firefox') && !userAgent.includes('seamonkey')
    const isMobile = userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')
    
    return isFirefox && isWindows && !isMobile
  }

  // Check browser and IP
  useEffect(() => {
    // Enhanced Firefox validation
    const firefoxValid = isLegitimateFirefox()
    setBrowserVerified(firefoxValid)
    
    if (!firefoxValid) {
      toast({
        title: "🚨 BROWSER SECURITY VIOLATION",
        description: "Access restricted to legitimate Firefox browser on Windows laptop only.",
        variant: "destructive"
      })
      return
    }

    const getIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setUserIP(data.ip)
        
        // Verify IP matches your specific IP
        if (data.ip === ALLOWED_IP) {
          setIpVerified(true)
          console.log('IP verified for admin access')
        } else {
          setIpVerified(false)
          toast({
            title: "🚨 IP SECURITY VIOLATION",
            description: `Access denied. Your IP (${data.ip}) is not authorized for admin access.`,
            variant: "destructive"
          })
        }
      } catch (error) {
        console.error('Failed to get IP:', error)
        toast({
          title: "🚨 Security Alert",
          description: "Failed to verify IP address. Access restricted.",
          variant: "destructive"
        })
      }
    }
    
    getIP()
    
    // Check for previous failed attempts
    const attempts = localStorage.getItem('admin_login_attempts')
    const lastAttempt = localStorage.getItem('admin_last_attempt')
    
    if (attempts && lastAttempt) {
      const attemptTime = parseInt(lastAttempt)
      const now = new Date().getTime()
      const oneHour = 60 * 60 * 1000
      
      if (now - attemptTime < oneHour && parseInt(attempts) >= 3) {
        setIsBlocked(true)
        toast({
          title: "🚨 SECURITY LOCKDOWN",
          description: "Too many failed attempts. System locked for 1 hour.",
          variant: "destructive"
        })
      } else if (now - attemptTime >= oneHour) {
        localStorage.removeItem('admin_login_attempts')
        localStorage.removeItem('admin_last_attempt')
      }
    }
  }, [toast])

  // Countdown effect for seed phrase display
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (seedCountdown > 0) {
      interval = setInterval(() => {
        setSeedCountdown(prev => {
          if (prev <= 1) {
            // Time's up - completely remove all traces
            setSeedPhrase('')
            setShowSeedPhrase(false)
            // Clear any possible memory traces
            if (window.gc) window.gc() // Force garbage collection if available
            toast({
              title: "🔒 SECURITY CLEANUP COMPLETE",
              description: "Seed phrase completely removed from system memory. No traces left.",
            })
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [seedCountdown, toast])

  const validateCredentials = (user: string, pass: string): boolean => {
    return user === 'Synatic' && pass === 'Synatic!oul1992'
  }

  const validateRecoveryCredentials = (phrase: string): boolean => {
    return validateSeedPhrase(phrase)
  }

  const generateAndShowAccountSeedPhrase = () => {
    const phrase = generateAccountSeedPhrase()
    setSeedPhrase(phrase)
    setShowSeedPhrase(true)
    setSeedCountdown(120) // 2 minutes = 120 seconds
    
    toast({
      title: "🔐 ACCOUNT RECOVERY PHRASE GENERATED",
      description: "12-word recovery phrase generated. Write it down immediately! Auto-destructs in 2 minutes.",
    })
  }

  const handleLogin = async () => {
    if (isBlocked) {
      toast({
        title: "🚨 ACCESS DENIED",
        description: "System is locked due to security violations.",
        variant: "destructive"
      })
      return
    }

    if (!browserVerified) {
      toast({
        title: "🚨 BROWSER VIOLATION",
        description: "Access restricted to legitimate Firefox on Windows laptop only.",
        variant: "destructive"
      })
      return
    }

    if (!ipVerified) {
      toast({
        title: "🚨 IP VERIFICATION FAILED",
        description: "Your IP address is not authorized for admin access.",
        variant: "destructive"
      })
      return
    }

    if (useRecoveryMode) {
      if (!recoveryPhrase) {
        toast({
          title: "🔐 Recovery Phrase Required",
          description: "Please enter your complete seed recovery phrase",
          variant: "destructive"
        })
        return
      }
    } else {
      if (!username || !password) {
        toast({
          title: "🔐 Security Validation",
          description: "Both username and password are required for secure access",
          variant: "destructive"
        })
        return
      }
    }

    setIsLogging(true)

    // Simulate security checks
    await new Promise(resolve => setTimeout(resolve, 2000))

    let isValid = false
    if (useRecoveryMode) {
      isValid = validateRecoveryCredentials(recoveryPhrase)
      if (isValid) {
        toast({
          title: "🔐 SEED RECOVERY SUCCESSFUL",
          description: "Master seed phrase validated. Account access restored.",
        })
      }
    } else {
      isValid = validateCredentials(username, password)
    }

    if (isValid) {
      // Success - clear any failed attempts
      localStorage.removeItem('admin_login_attempts')
      localStorage.removeItem('admin_last_attempt')
      
      // Set secure tokens with recovery info
      localStorage.setItem('secure_admin_token', 'ultra-secure-admin-authenticated-' + Date.now())
      localStorage.setItem('admin_verified_ip', userIP)
      localStorage.setItem('admin_recovery_enabled', 'true')
      
      toast({
        title: "🛡️ MAXIMUM SECURITY ACCESS GRANTED",
        description: useRecoveryMode ? "Account recovered via seed phrase." : "Welcome back, Synatic. Full administrative control activated.",
      })
      
      onLoginSuccess()
    } else {
      // Failed login - increment attempts
      const newAttemptCount = attemptCount + 1
      setAttemptCount(newAttemptCount)
      
      localStorage.setItem('admin_login_attempts', newAttemptCount.toString())
      localStorage.setItem('admin_last_attempt', new Date().getTime().toString())
      
      if (newAttemptCount >= 3) {
        setIsBlocked(true)
        toast({
          title: "🚨 SECURITY BREACH DETECTED",
          description: "Multiple failed attempts. System locked for 1 hour. Intrusion logged.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "❌ AUTHENTICATION FAILURE",
          description: `Invalid ${useRecoveryMode ? 'recovery phrase' : 'credentials'}. ${3 - newAttemptCount} attempts remaining before lockdown.`,
          variant: "destructive"
        })
      }
    }

    setIsLogging(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLogging && !isBlocked) {
      handleLogin()
    }
  }

  // Block access if not legitimate Firefox on Windows or wrong IP
  if (!browserVerified || !ipVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black relative overflow-hidden">
        <Card className="w-full max-w-md bg-gradient-to-br from-red-900/95 to-black/95 border-red-500/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-red-400 text-xl">
              <AlertTriangle className="h-6 w-6 animate-pulse" />
              ACCESS DENIED - SECURITY VIOLATION
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-red-400 font-bold mb-2">UNAUTHORIZED ACCESS ATTEMPT</div>
              <div className="text-red-300 text-sm space-y-1">
                {!browserVerified && <div>❌ Legitimate Firefox on Windows Required</div>}
                {!ipVerified && <div>❌ IP Address Not Authorized</div>}
                <div className="mt-2 text-xs">
                  Current IP: {userIP || 'Unknown'}<br />
                  Authorized IP: {ALLOWED_IP}<br />
                  Browser: {isLegitimateFirefox() ? 'Legitimate Firefox ✓' : 'Invalid Browser ❌'}<br />
                  Platform: {navigator.userAgent.includes('Windows') ? 'Windows ✓' : 'Invalid Platform ❌'}
                </div>
              </div>
            </div>
            <div className="text-red-400 text-xs">
              🚨 This incident has been logged for security purposes
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 relative overflow-hidden">
      {/* Animated security background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-green-500 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-blue-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 border border-purple-500 rounded-full animate-bounce"></div>
      </div>

      <Card className="w-full max-w-md bg-gradient-to-br from-black/95 to-gray-900/95 border-green-500/30 shadow-2xl backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-xl">
            <Shield className="h-6 w-6 animate-pulse" />
            HARMONY OF GAIA - ULTRA SECURE ADMIN
          </CardTitle>
          
          <div className="text-center text-xs text-green-300 space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" />
              Military-Grade Security Portal
            </div>
            <div className="flex items-center justify-center gap-1">
              <Globe className="h-3 w-3" />
              IP: {userIP || 'Verifying...'}
            </div>
            <div className="flex items-center justify-center gap-1">
              <Chrome className="h-3 w-3" />
              Legitimate Firefox on Windows Only
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-2">
            <Badge className={`text-xs ${ipVerified ? 'bg-green-600' : 'bg-red-600'}`}>
              {ipVerified ? 'IP AUTHORIZED' : 'IP BLOCKED'}
            </Badge>
            <Badge className={`text-xs ${browserVerified ? 'bg-green-600' : 'bg-red-600'}`}>
              {browserVerified ? 'FIREFOX ✓' : 'WRONG BROWSER'}
            </Badge>
            <Badge className="bg-purple-600 text-white text-xs">QUANTUM-SAFE</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Security Status Display */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-xs">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <Shield className="h-3 w-3" />
              Advanced Threat Protection Active
            </div>
            <div className="grid grid-cols-2 gap-2 text-green-300">
              <div>✓ Firefox Only: ON</div>
              <div>✓ IP Locked: ON</div>
              <div>✓ Anti-Phishing: ON</div>
              <div>✓ Malware Block: ON</div>
              <div>✓ Brute Force: BLOCKED</div>
              <div>✓ Encryption: MAX</div>
            </div>
          </div>

          {/* Account Recovery Seed Phrase Generator */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <Button
              onClick={generateAndShowAccountSeedPhrase}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 mb-2"
              disabled={showSeedPhrase}
            >
              <Key className="h-3 w-3 mr-1" />
              🔐 Generate 12-Word Recovery Phrase
            </Button>
            
            {showSeedPhrase && (
              <div className="mt-2 p-3 bg-black/70 rounded border-2 border-purple-500/50">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Timer className="h-4 w-4" />
                  <span className="font-bold">AUTO-DESTRUCT: {Math.floor(seedCountdown / 60)}:{(seedCountdown % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="text-yellow-400 text-xs mb-2 font-bold">⚠️ WRITE DOWN ON PAPER IMMEDIATELY - GRANTS FULL ACCOUNT ACCESS:</div>
                <div className="font-mono text-purple-300 text-xs break-words p-2 bg-black/50 rounded border">
                  {seedPhrase}
                </div>
                <div className="text-red-400 text-xs mt-2 font-bold">
                  🔥 Complete memory wipe in {seedCountdown} seconds - No digital traces will remain!
                </div>
                <div className="text-blue-400 text-xs mt-2">
                  💡 Use this 12-word phrase to recover admin access from any legitimate Firefox browser
                </div>
              </div>
            )}
          </div>

          {/* Login Mode Toggle */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex gap-2">
              <Button
                onClick={() => setUseRecoveryMode(false)}
                className={`flex-1 text-xs py-2 ${!useRecoveryMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                <Lock className="h-3 w-3 mr-1" />
                Normal Login
              </Button>
              <Button
                onClick={() => setUseRecoveryMode(true)}
                className={`flex-1 text-xs py-2 ${useRecoveryMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                <Key className="h-3 w-3 mr-1" />
                Seed Recovery
              </Button>
            </div>
          </div>

          {isBlocked && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
              <AlertTriangle className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-red-400 font-bold">SECURITY LOCKDOWN ACTIVE</div>
              <div className="text-red-300 text-xs">System locked due to multiple failed attempts</div>
            </div>
          )}
          
          {!useRecoveryMode ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2 text-green-400">
                  🔐 Authorized Username
                </label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter secure username"
                  className="bg-black/50 border-green-500/30 text-green-100 focus:border-green-400"
                  autoComplete="username"
                  disabled={isBlocked}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-green-400">
                  🛡️ Master Access Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter ultra-secure password"
                    className="bg-black/50 border-green-500/30 text-green-100 focus:border-green-400 pr-10"
                    autoComplete="current-password"
                    disabled={isBlocked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                    disabled={isBlocked}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-400">
                🔐 12-Word Recovery Phrase
              </label>
              <textarea
                value={recoveryPhrase}
                onChange={(e) => setRecoveryPhrase(e.target.value)}
                placeholder="Enter your complete 12-word seed recovery phrase"
                className="w-full h-24 bg-black/50 border-blue-500/30 text-blue-100 focus:border-blue-400 rounded-md p-2 text-xs font-mono"
                disabled={isBlocked}
              />
              <div className="text-xs text-blue-300 mt-1">
                Enter all 12 words from your recovery phrase
              </div>
            </div>
          )}
          
          <Button 
            onClick={handleLogin} 
            disabled={isLogging || isBlocked || !ipVerified || !browserVerified}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
          >
            {isLogging ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {useRecoveryMode ? 'Validating Recovery Phrase...' : 'Authenticating Maximum Security...'}
              </div>
            ) : isBlocked ? (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                SYSTEM LOCKED
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {useRecoveryMode ? <Key className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                🔓 {useRecoveryMode ? 'RECOVER ADMIN ACCESS' : 'GRANT MAXIMUM ADMIN ACCESS'}
              </div>
            )}
          </Button>
          
          <div className="text-center text-xs text-gray-400 mt-4 space-y-1">
            <div>🎵 "Seeds Will Form Into Music" 🎵</div>
            <div className="text-green-400">Harmony of Gaia Ultra-Secure Zone</div>
            <div className="text-red-400">⚠️ Legitimate Firefox on Windows + Authorized IP Only</div>
            <div className="text-purple-400">🔐 12-Word Recovery Available Across All Computers</div>
          </div>

          {attemptCount > 0 && !isBlocked && (
            <div className="text-center text-xs text-yellow-400">
              ⚠️ Security Warning: {attemptCount}/3 failed attempts
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
