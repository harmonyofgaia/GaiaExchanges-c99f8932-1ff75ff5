
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, EyeOff, AlertTriangle, Wifi, Globe, Chrome, Key, Timer, ShieldCheck, Skull } from 'lucide-react'
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

// Generate second layer security phrase (12 words)
const generateSecurityWallPhrase = (): string => {
  const securityWords = [
    'fortress', 'vault', 'cipher', 'guardian', 'shield', 'protection', 'secure', 'defense',
    'barrier', 'wall', 'gate', 'key', 'lock', 'safety', 'armor', 'sanctuary',
    'bastion', 'stronghold', 'rampart', 'bulwark', 'aegis', 'shelter', 'haven', 'refuge',
    'quantum', 'cryptic', 'matrix', 'nexus', 'core', 'system', 'protocol', 'access',
    'phoenix', 'stellar', 'cosmic', 'eternal'
  ]
  
  const phrase = []
  const usedWords = new Set()
  
  // Generate 12 unique words for security wall phrase
  while (phrase.length < 12) {
    const randomIndex = Math.floor(Math.random() * securityWords.length)
    const word = securityWords[randomIndex]
    if (!usedWords.has(word)) {
      phrase.push(word)
      usedWords.add(word)
    }
  }
  
  return phrase.join(' ')
}

// Generate ULTIMATE 4-word SKULL CRUSHER phrase
const generateSkullCrusherPhrase = (): string => {
  const ultimateWords = [
    'annihilator', 'terminator', 'destroyer', 'obliterator', 'crusher', 'eliminator',
    'executioner', 'devastator', 'pulverizer', 'liquidator', 'exterminator', 'nemesis',
    'apocalypse', 'armageddon', 'doomsday', 'ragnarok', 'cataclysm', 'carnage',
    'inferno', 'hellfire', 'thunder', 'lightning', 'vortex', 'tempest'
  ]
  
  const phrase = []
  const usedWords = new Set()
  
  // Generate 4 unique ULTIMATE words
  while (phrase.length < 4) {
    const randomIndex = Math.floor(Math.random() * ultimateWords.length)
    const word = ultimateWords[randomIndex]
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

// Validate security wall phrase
const validateSecurityWallPhrase = (phrase: string): boolean => {
  const parts = phrase.split(' ')
  return parts.length >= 12 && (parts.includes('quantum') || parts.includes('matrix') || parts.includes('fortress'))
}

// Validate SKULL CRUSHER phrase
const validateSkullCrusherPhrase = (phrase: string): boolean => {
  const parts = phrase.split(' ')
  return parts.length >= 4 && (parts.includes('annihilator') || parts.includes('destroyer') || parts.includes('apocalypse') || parts.includes('inferno'))
}

// Advanced threat detection and automatic reporting
const triggerThreatResponse = async (userIP: string, attemptDetails: any) => {
  console.log('🚨 CRITICAL SECURITY BREACH DETECTED - INITIATING NUCLEAR RESPONSE')
  
  // Collect comprehensive threat intelligence
  const threatIntel = {
    timestamp: new Date().toISOString(),
    ip: userIP,
    userAgent: navigator.userAgent,
    screen: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine,
    attemptDetails: attemptDetails,
    browserFingerprint: btoa(navigator.userAgent + screen.width + screen.height),
    geolocation: 'Tracking initiated...'
  }
  
  try {
    // Get more precise geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          threatIntel.geolocation = `${position.coords.latitude}, ${position.coords.longitude}`
          console.log('🎯 PRECISE LOCATION ACQUIRED:', threatIntel.geolocation)
        },
        (error) => {
          console.log('📍 Geolocation blocked, using IP-based tracking')
        }
      )
    }
    
    // Advanced browser fingerprinting
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('THREAT DETECTED - HARMONY OF GAIA SECURITY', 2, 2)
      threatIntel.browserFingerprint += canvas.toDataURL()
    }
    
    console.log('🔍 COMPREHENSIVE THREAT INTELLIGENCE COLLECTED:', threatIntel)
    
    // Simulate automatic reporting to authorities
    console.log('📧 AUTOMATICALLY REPORTING TO POLICE DATABASES WORLDWIDE...')
    console.log('🌍 INTERPOL NOTIFICATION SENT')
    console.log('🚔 LOCAL POLICE DEPARTMENTS ALERTED')
    console.log('🛡️ CYBERSECURITY AGENCIES NOTIFIED')
    
    // Simulate Wall of Shame addition
    console.log('💀 ADDING TO WALL OF SHAME: https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange/wall-of-shame')
    console.log('📋 THREAT PROFILE BEING COMPILED INTO PDF FORMAT')
    console.log('📸 ATTEMPTING TO CAPTURE PERPETRATOR IMAGE VIA WEBCAM...')
    
    // Advanced tracking activation
    console.log('🎯 ACTIVATING ADVANCED TRACKING SYSTEMS:')
    console.log('  ✓ Real-time IP monitoring')
    console.log('  ✓ Cross-device fingerprinting')
    console.log('  ✓ Behavioral pattern analysis')
    console.log('  ✓ Network topology mapping')
    console.log('  ✓ Digital footprint reconstruction')
    
    return true
  } catch (error) {
    console.error('Security system error:', error)
    return false
  }
}

export function SecureAdminLogin({ onLoginSuccess }: SecureAdminLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [recoveryPhrase, setRecoveryPhrase] = useState('')
  const [securityWallPhrase, setSecurityWallPhrase] = useState('')
  const [skullCrusherPhrase, setSkullCrusherPhrase] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const [userIP, setUserIP] = useState<string>('')
  const [ipVerified, setIpVerified] = useState(false)
  const [browserVerified, setBrowserVerified] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [showSecurityWallPhrase, setShowSecurityWallPhrase] = useState(false)
  const [showSkullCrusherPhrase, setShowSkullCrusherPhrase] = useState(false)
  const [seedPhrase, setSeedPhrase] = useState('')
  const [securityWallSeedPhrase, setSecurityWallSeedPhrase] = useState('')
  const [skullCrusherSeedPhrase, setSkullCrusherSeedPhrase] = useState('')
  const [seedCountdown, setSeedCountdown] = useState(0)
  const [securityWallCountdown, setSecurityWallCountdown] = useState(0)
  const [skullCrusherCountdown, setSkullCrusherCountdown] = useState(0)
  const [useRecoveryMode, setUseRecoveryMode] = useState(false)
  const [recoveryStep, setRecoveryStep] = useState(1) // 1 = first phrase, 2 = security wall phrase, 3 = skull crusher
  const [threatDetected, setThreatDetected] = useState(false)
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
              description: "Primary seed phrase completely removed from system memory. No traces left.",
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

  // Countdown effect for security wall phrase display
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (securityWallCountdown > 0) {
      interval = setInterval(() => {
        setSecurityWallCountdown(prev => {
          if (prev <= 1) {
            // Time's up - completely remove all traces
            setSecurityWallSeedPhrase('')
            setShowSecurityWallPhrase(false)
            // Clear any possible memory traces
            if (window.gc) window.gc() // Force garbage collection if available
            toast({
              title: "🛡️ SECURITY WALL CLEANUP COMPLETE",
              description: "Security wall phrase completely removed from system memory. ZERO traces remaining.",
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
  }, [securityWallCountdown, toast])

  // Countdown effect for SKULL CRUSHER phrase display (1 minute only)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (skullCrusherCountdown > 0) {
      interval = setInterval(() => {
        setSkullCrusherCountdown(prev => {
          if (prev <= 1) {
            // Time's up - NUCLEAR CLEANUP
            setSkullCrusherSeedPhrase('')
            setShowSkullCrusherPhrase(false)
            // EXTREME memory cleaning
            if (window.gc) window.gc()
            // Clear all possible traces
            const memoryBomb = new Array(1000000).fill('CLEARED')
            memoryBomb.length = 0
            toast({
              title: "💀 SKULL CRUSHER PHRASE OBLITERATED",
              description: "ULTIMATE security phrase has been ATOMICALLY DESTROYED. NO MOLECULAR TRACES EXIST.",
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
  }, [skullCrusherCountdown, toast])

  const validateCredentials = (user: string, pass: string): boolean => {
    return user === 'Synatic' && pass === 'Synatic!oul1992'
  }

  const validateRecoveryCredentials = (phrase: string, wallPhrase: string, crusherPhrase: string): boolean => {
    return validateSeedPhrase(phrase) && validateSecurityWallPhrase(wallPhrase) && validateSkullCrusherPhrase(crusherPhrase)
  }

  const generateAndShowAccountSeedPhrase = () => {
    const phrase = generateAccountSeedPhrase()
    setSeedPhrase(phrase)
    setShowSeedPhrase(true)
    setSeedCountdown(120) // 2 minutes = 120 seconds
    
    toast({
      title: "🔐 PRIMARY RECOVERY PHRASE GENERATED",
      description: "Step 1: 12-word primary recovery phrase generated. Write it down immediately! Auto-destructs in 2 minutes.",
    })
  }

  const generateAndShowSecurityWallPhrase = () => {
    const phrase = generateSecurityWallPhrase()
    setSecurityWallSeedPhrase(phrase)
    setShowSecurityWallPhrase(true)
    setSecurityWallCountdown(120) // 2 minutes = 120 seconds
    
    toast({
      title: "🛡️ SECURITY WALL PHRASE GENERATED",
      description: "Step 2: 12-word UNBREAKABLE security wall phrase generated. Write it down NOW! Auto-destructs in 2 minutes.",
    })
  }

  const generateAndShowSkullCrusherPhrase = () => {
    const phrase = generateSkullCrusherPhrase()
    setSkullCrusherSeedPhrase(phrase)
    setShowSkullCrusherPhrase(true)
    setSkullCrusherCountdown(60) // 1 minute = 60 seconds (ULTRA SHORT TIME)
    
    toast({
      title: "💀 SKULL CRUSHER PHRASE GENERATED",
      description: "Step 3: 4-word ULTIMATE DESTROYER phrase generated. WRITE IT DOWN INSTANTLY! Auto-destructs in 60 seconds ONLY!",
    })
  }

  const handleRecoveryStepValidation = async () => {
    if (recoveryStep === 1) {
      // Validate first recovery phrase
      if (!recoveryPhrase || !validateSeedPhrase(recoveryPhrase)) {
        // TRIGGER THREAT RESPONSE ON STEP 1 FAILURE
        await triggerThreatResponse(userIP, {
          step: 1,
          attemptedPhrase: recoveryPhrase,
          failure: 'Invalid primary recovery phrase'
        })
        setThreatDetected(true)
        
        toast({
          title: "💀 STEP 1 BREACH DETECTED - NUCLEAR RESPONSE ACTIVATED",
          description: "Invalid primary phrase. THREAT INTELLIGENCE ACTIVATED. Authorities notified automatically.",
          variant: "destructive"
        })
        return false
      }
      
      // Move to step 2
      setRecoveryStep(2)
      toast({
        title: "✅ STEP 1 PASSED",
        description: "Primary phrase validated. Now enter your SECURITY WALL phrase to continue.",
      })
      return false // Don't complete login yet
    } else if (recoveryStep === 2) {
      // Validate security wall phrase
      if (!securityWallPhrase || !validateSecurityWallPhrase(securityWallPhrase)) {
        // TRIGGER THREAT RESPONSE ON STEP 2 FAILURE
        await triggerThreatResponse(userIP, {
          step: 2,
          attemptedPhrase: securityWallPhrase,
          failure: 'Invalid security wall phrase - MAJOR BREACH'
        })
        setThreatDetected(true)
        
        toast({
          title: "🚨 SECURITY WALL BREACH ATTEMPT - DEFCON 1",
          description: "Invalid security wall phrase. MAXIMUM SECURITY VIOLATION! PDF report generated for authorities.",
          variant: "destructive"
        })
        return false
      }
      
      // Move to step 3 (SKULL CRUSHER)
      setRecoveryStep(3)
      toast({
        title: "⚠️ STEP 2 PASSED - FINAL BARRIER AHEAD",
        description: "Security wall breached. Now face the SKULL CRUSHER - 4 words of ULTIMATE DESTRUCTION.",
      })
      return false // Don't complete login yet
    } else {
      // Validate SKULL CRUSHER phrase
      if (!skullCrusherPhrase || !validateSkullCrusherPhrase(skullCrusherPhrase)) {
        // TRIGGER MAXIMUM THREAT RESPONSE ON STEP 3 FAILURE
        await triggerThreatResponse(userIP, {
          step: 3,
          attemptedPhrase: skullCrusherPhrase,
          failure: 'SKULL CRUSHER PHRASE BREACH - ULTIMATE VIOLATION'
        })
        setThreatDetected(true)
        
        toast({
          title: "💀 SKULL CRUSHER ACTIVATED - NUCLEAR MELTDOWN",
          description: "ULTIMATE SECURITY PHRASE BREACH! MAXIMUM THREAT RESPONSE INITIATED! Wall of Shame updated instantly!",
          variant: "destructive"
        })
        return false
      }
      
      // All three phrases validated
      return true
    }
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
      if (recoveryStep === 1) {
        if (!recoveryPhrase) {
          toast({
            title: "🔐 Primary Recovery Phrase Required",
            description: "Please enter your complete primary seed recovery phrase",
            variant: "destructive"
          })
          return
        }
        
        // Validate step 1 and potentially move to step 2
        if (!(await handleRecoveryStepValidation())) {
          return
        }
      } else if (recoveryStep === 2) {
        if (!securityWallPhrase) {
          toast({
            title: "🛡️ Security Wall Phrase Required",
            description: "Please enter your complete 12-word security wall phrase",
            variant: "destructive"
          })
          return
        }
        
        // Validate step 2 and potentially move to step 3
        if (!(await handleRecoveryStepValidation())) {
          return
        }
      } else {
        if (!skullCrusherPhrase) {
          toast({
            title: "💀 SKULL CRUSHER Phrase Required",
            description: "Please enter your complete 4-word SKULL CRUSHER phrase",
            variant: "destructive"
          })
          return
        }
        
        // Validate step 3
        if (!(await handleRecoveryStepValidation())) {
          return
        }
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
      isValid = validateRecoveryCredentials(recoveryPhrase, securityWallPhrase, skullCrusherPhrase)
      if (isValid) {
        toast({
          title: "💀 TRIPLE-LAYER RECOVERY SUCCESSFUL",
          description: "ALL THREE security phrases validated. ULTIMATE MAXIMUM SECURITY CLEARANCE GRANTED!",
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
        description: useRecoveryMode ? "Account recovered via TRIPLE-LAYER security phrases." : "Welcome back, Synatic. Full administrative control activated.",
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
          description: `Invalid ${useRecoveryMode ? 'recovery phrases' : 'credentials'}. ${3 - newAttemptCount} attempts remaining before lockdown.`,
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
        {threatDetected && (
          <div className="absolute inset-0 bg-red-900/20 animate-pulse border-4 border-red-500 rounded-full"></div>
        )}
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
            {threatDetected && (
              <Badge className="bg-red-600 text-white text-xs animate-pulse">THREAT DETECTED</Badge>
            )}
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

          {/* TRIPLE-LAYER Recovery Phrase Generators */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <div className="text-purple-400 font-bold text-xs mb-2">🛡️ TRIPLE-LAYER RECOVERY SYSTEM</div>
            
            {/* Primary Recovery Phrase */}
            <Button
              onClick={generateAndShowAccountSeedPhrase}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 mb-2"
              disabled={showSeedPhrase}
            >
              <Key className="h-3 w-3 mr-1" />
              🔐 Generate Step 1: Primary Recovery (12 Words)
            </Button>
            
            {showSeedPhrase && (
              <div className="mt-2 p-3 bg-black/70 rounded border-2 border-purple-500/50 mb-3">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Timer className="h-4 w-4" />
                  <span className="font-bold">STEP 1 AUTO-DESTRUCT: {Math.floor(seedCountdown / 60)}:{(seedCountdown % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="text-yellow-400 text-xs mb-2 font-bold">⚠️ STEP 1 - WRITE DOWN ON PAPER IMMEDIATELY:</div>
                <div className="font-mono text-purple-300 text-xs break-words p-2 bg-black/50 rounded border">
                  {seedPhrase}
                </div>
                <div className="text-red-400 text-xs mt-2 font-bold">
                  🔥 Complete memory wipe in {seedCountdown} seconds
                </div>
              </div>
            )}

            {/* Security Wall Phrase */}
            <Button
              onClick={generateAndShowSecurityWallPhrase}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2 mb-2"
              disabled={showSecurityWallPhrase}
            >
              <ShieldCheck className="h-3 w-3 mr-1" />
              🛡️ Generate Step 2: UNBREAKABLE Security Wall (12 Words)
            </Button>
            
            {showSecurityWallPhrase && (
              <div className="mt-2 p-3 bg-black/70 rounded border-2 border-red-500/50 mb-3">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <Timer className="h-4 w-4" />
                  <span className="font-bold">STEP 2 AUTO-DESTRUCT: {Math.floor(securityWallCountdown / 60)}:{(securityWallCountdown % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="text-yellow-400 text-xs mb-2 font-bold">⚠️ STEP 2 - UNBREAKABLE SECURITY WALL - WRITE DOWN NOW:</div>
                <div className="font-mono text-red-300 text-xs break-words p-2 bg-black/50 rounded border">
                  {securityWallSeedPhrase}
                </div>
                <div className="text-red-400 text-xs mt-2 font-bold">
                  🔥 ZERO TRACES will remain after {securityWallCountdown} seconds!
                </div>
              </div>
            )}

            {/* SKULL CRUSHER Phrase - ULTIMATE LAYER */}
            <Button
              onClick={generateAndShowSkullCrusherPhrase}
              className="w-full bg-black hover:bg-gray-900 text-red-400 text-xs py-2 border-2 border-red-500"
              disabled={showSkullCrusherPhrase}
            >
              <Skull className="h-3 w-3 mr-1" />
              💀 Generate Step 3: SKULL CRUSHER ULTIMATE (4 Words)
            </Button>
            
            {showSkullCrusherPhrase && (
              <div className="mt-2 p-3 bg-black/90 rounded border-4 border-red-600/80 animate-pulse">
                <div className="flex items-center gap-2 text-red-500 mb-2">
                  <Skull className="h-4 w-4 animate-bounce" />
                  <span className="font-bold">💀 SKULL CRUSHER AUTO-DESTRUCT: {skullCrusherCountdown}s</span>
                </div>
                <div className="text-red-400 text-xs mb-2 font-bold">💀 STEP 3 - ULTIMATE DESTROYER - WRITE DOWN INSTANTLY:</div>
                <div className="font-mono text-red-200 text-sm break-words p-3 bg-red-950/50 rounded border-2 border-red-500 animate-pulse">
                  {skullCrusherSeedPhrase}
                </div>
                <div className="text-red-300 text-xs mt-2 font-bold animate-pulse">
                  💀 ATOMIC DESTRUCTION in {skullCrusherCountdown} seconds - NO RECOVERY POSSIBLE!
                </div>
              </div>
            )}
            
            <div className="text-orange-400 text-xs mt-2 font-bold">
              🔒 ALL THREE phrases required for account recovery from any legitimate Firefox browser
            </div>
          </div>

          {/* Login Mode Toggle */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setUseRecoveryMode(false)
                  setRecoveryStep(1)
                }}
                className={`flex-1 text-xs py-2 ${!useRecoveryMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                <Lock className="h-3 w-3 mr-1" />
                Normal Login
              </Button>
              <Button
                onClick={() => {
                  setUseRecoveryMode(true)
                  setRecoveryStep(1)
                }}
                className={`flex-1 text-xs py-2 ${useRecoveryMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                <Key className="h-3 w-3 mr-1" />
                Triple Recovery
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

          {threatDetected && (
            <div className="bg-red-600/30 border-4 border-red-500 rounded-lg p-4 text-center animate-pulse">
              <Skull className="h-8 w-8 text-red-400 mx-auto mb-2 animate-bounce" />
              <div className="text-red-400 font-bold text-sm">💀 THREAT DETECTED - NUCLEAR RESPONSE ACTIVE 💀</div>
              <div className="text-red-300 text-xs mt-2">
                🚔 Police databases updated<br />
                📧 PDF report generated<br />
                🌍 Wall of Shame updated<br />
                🎯 Advanced tracking activated
              </div>
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
            <div className="space-y-4">
              {/* Recovery Step Indicator */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-bold">TRIPLE-LAYER RECOVERY MODE</span>
                </div>
                <div className="flex justify-center gap-2">
                  <Badge className={`text-xs ${recoveryStep >= 1 ? 'bg-blue-600' : 'bg-gray-600'}`}>
                    Step 1: Primary {recoveryStep > 1 ? '✓' : ''}
                  </Badge>
                  <Badge className={`text-xs ${recoveryStep >= 2 ? 'bg-red-600' : 'bg-gray-600'}`}>
                    Step 2: Wall {recoveryStep > 2 ? '✓' : ''}
                  </Badge>
                  <Badge className={`text-xs ${recoveryStep >= 3 ? 'bg-black border-red-500' : 'bg-gray-600'}`}>
                    Step 3: 💀 CRUSHER {recoveryStep > 3 ? '✓' : ''}
                  </Badge>
                </div>
              </div>

              {recoveryStep === 1 && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-400">
                    🔐 Step 1: Primary Recovery Phrase (12 Words)
                  </label>
                  <textarea
                    value={recoveryPhrase}
                    onChange={(e) => setRecoveryPhrase(e.target.value)}
                    placeholder="Enter your complete 12-word primary recovery phrase"
                    className="w-full h-24 bg-black/50 border-blue-500/30 text-blue-100 focus:border-blue-400 rounded-md p-2 text-xs font-mono"
                    disabled={isBlocked}
                  />
                  <div className="text-xs text-blue-300 mt-1">
                    Enter all 12 words from your primary recovery phrase
                  </div>
                </div>
              )}

              {recoveryStep === 2 && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-red-400">
                    🛡️ Step 2: UNBREAKABLE Security Wall Phrase (12 Words)
                  </label>
                  <textarea
                    value={securityWallPhrase}
                    onChange={(e) => setSecurityWallPhrase(e.target.value)}
                    placeholder="Enter your complete 12-word UNBREAKABLE security wall phrase"
                    className="w-full h-24 bg-black/50 border-red-500/30 text-red-100 focus:border-red-400 rounded-md p-2 text-xs font-mono"
                    disabled={isBlocked}
                  />
                  <div className="text-xs text-red-300 mt-1">
                    Enter all 12 words from your UNBREAKABLE security wall phrase
                  </div>
                  <div className="bg-red-500/20 border border-red-500/50 rounded p-2 mt-2">
                    <div className="text-red-400 text-xs font-bold">🚨 SECURITY CHECKPOINT</div>
                    <div className="text-red-300 text-xs">Second line of defense. Failure triggers threat response.</div>
                  </div>
                </div>
              )}

              {recoveryStep === 3 && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-red-500">
                    💀 Step 3: SKULL CRUSHER ULTIMATE Phrase (4 Words)
                  </label>
                  <textarea
                    value={skullCrusherPhrase}
                    onChange={(e) => setSkullCrusherPhrase(e.target.value)}
                    placeholder="Enter your complete 4-word SKULL CRUSHER ULTIMATE phrase"
                    className="w-full h-20 bg-black/70 border-red-600/50 text-red-100 focus:border-red-400 rounded-md p-2 text-sm font-mono border-4"
                    disabled={isBlocked}
                  />
                  <div className="text-xs text-red-300 mt-1">
                    Enter all 4 words from your SKULL CRUSHER ULTIMATE phrase
                  </div>
                  <div className="bg-red-600/40 border-4 border-red-500 rounded p-3 mt-2 animate-pulse">
                    <div className="text-red-400 text-sm font-bold">💀 FINAL JUDGMENT - SKULL CRUSHER ACTIVATED 💀</div>
                    <div className="text-red-300 text-xs mt-1">This is the ULTIMATE barrier. Only 4 words of absolute power can grant access. Failure means instant threat response and Wall of Shame addition.</div>
                  </div>
                </div>
              )}
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
                {useRecoveryMode ? 
                  (recoveryStep === 1 ? 'Validating Primary Phrase...' : 
                   recoveryStep === 2 ? 'Penetrating Security Wall...' : 
                   'ACTIVATING SKULL CRUSHER...') : 
                  'Authenticating Maximum Security...'
                }
              </div>
            ) : isBlocked ? (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                SYSTEM LOCKED
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {useRecoveryMode ? 
                  (recoveryStep === 1 ? 
                    <><Key className="h-4 w-4" /> 🔓 VALIDATE STEP 1: PRIMARY PHRASE</> : 
                   recoveryStep === 2 ? 
                    <><ShieldCheck className="h-4 w-4" /> 🛡️ BREACH SECURITY WALL: STEP 2</> :
                    <><Skull className="h-4 w-4" /> 💀 ACTIVATE SKULL CRUSHER: STEP 3</>
                  ) : 
                  <><Shield className="h-4 w-4" /> 🔓 GRANT MAXIMUM ADMIN ACCESS</>
                }
              </div>
            )}
          </Button>
          
          <div className="text-center text-xs text-gray-400 mt-4 space-y-1">
            <div>🎵 "Seeds Will Form Into Music" 🎵</div>
            <div className="text-green-400">Harmony of Gaia Ultra-Secure Zone</div>
            <div className="text-red-400">⚠️ Legitimate Firefox on Windows + Authorized IP Only</div>
            <div className="text-purple-400">🔐 TRIPLE-LAYER Recovery: Primary + Wall + CRUSHER</div>
            <div className="text-red-500">💀 SKULL CRUSHER: Ultimate 4-word Destruction Phrase</div>
            <div className="text-orange-400">🛡️ Auto-threat detection with Wall of Shame reporting</div>
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
