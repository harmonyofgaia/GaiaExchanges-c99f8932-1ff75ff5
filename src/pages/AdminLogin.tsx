
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, EyeOff, Globe, Users, AlertTriangle, Skull } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [clientIP, setClientIP] = useState('')
  const [attemptCount, setAttemptCount] = useState(0)
  const [isHoneypot, setIsHoneypot] = useState(true)

  useEffect(() => {
    // Initialize decoy system
    const initializeDecoy = () => {
      console.log('🍯 HONEYPOT ADMIN DECOY INITIALIZED')
      console.log('🕷️ TRAPPING UNAUTHORIZED ACCESS ATTEMPTS')
      console.log('👻 REAL ADMIN PAGES COMPLETELY HIDDEN')
      
      // Simulate getting client IP for tracking
      const fakeIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      setClientIP(fakeIP)

      // Track all visitors to this decoy page
      const visitCount = localStorage.getItem('decoy-admin-visits') || '0'
      const newCount = parseInt(visitCount) + 1
      localStorage.setItem('decoy-admin-visits', newCount.toString())
      
      console.log(`🚨 INTRUDER VISIT #${newCount} TO DECOY ADMIN PAGE`)
      console.log('🛡️ REAL ADMIN COMPLETELY PROTECTED AND INVISIBLE')
    }

    initializeDecoy()

    // Monitor for suspicious behavior
    const monitorSuspiciousActivity = setInterval(() => {
      console.log('👁️ MONITORING DECOY PAGE - TRACKING ALL INTRUDERS')
      console.log('🔒 REAL ADMIN PAGES REMAIN COMPLETELY HIDDEN')
      
      // Log any attempt to access this fake admin
      if (Math.random() < 0.1) {
        console.log('🚨 SUSPICIOUS ACTIVITY DETECTED ON DECOY')
        console.log('💀 ATTACKER TRAPPED IN HONEYPOT SYSTEM')
      }
    }, 5000)

    return () => clearInterval(monitorSuspiciousActivity)
  }, [])

  const handleFakeLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAttemptCount(prev => prev + 1)

    // Log attacker attempt
    console.log(`🚨 FAKE ADMIN LOGIN ATTEMPT #${attemptCount + 1}`)
    console.log('💀 ATTACKER CREDENTIALS:', credentials.username, credentials.password)
    console.log('🕷️ HONEYPOT SUCCESSFULLY TRAPPING INTRUDER')
    console.log('🛡️ REAL ADMIN REMAINS COMPLETELY SAFE AND HIDDEN')

    // Store attacker data for analysis
    const attackerData = {
      timestamp: Date.now(),
      ip: clientIP,
      username: credentials.username,
      password: credentials.password,
      attempt: attemptCount + 1
    }
    
    const existingAttacks = JSON.parse(localStorage.getItem('honeypot-attacks') || '[]')
    existingAttacks.push(attackerData)
    localStorage.setItem('honeypot-attacks', JSON.stringify(existingAttacks))

    // Always fail with realistic error messages to waste attacker time
    setTimeout(() => {
      const fakeErrors = [
        '🚫 Access Denied - Invalid Credentials',
        '⚠️ Account Locked - Too Many Attempts',
        '🔒 System Maintenance - Try Later',
        '❌ Authentication Failed - Contact Support',
        '🚨 Suspicious Activity Detected',
        '⛔ Network Timeout - Server Unreachable',
        '🔐 Multi-Factor Authentication Required',
        '💀 Security Breach Detected - Account Suspended'
      ]
      
      const randomError = fakeErrors[Math.floor(Math.random() * fakeErrors.length)]
      
      toast.error(randomError, {
        description: `Attempt #${attemptCount + 1} failed. IP: ${clientIP}`,
        duration: 5000
      })

      // Increase delay with each attempt to frustrate attackers
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
      
      // Fake "security measures"
      if (attemptCount >= 3) {
        toast.error('🚨 MAXIMUM ATTEMPTS EXCEEDED', {
          description: 'Account temporarily locked. Please wait 24 hours.',
          duration: 10000
        })
      }
    }, Math.min(2000 + (attemptCount * 1000), 10000)) // Increasing delays
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-gray-900 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Skull className="h-12 w-12 text-red-400 mx-auto mb-4 animate-pulse" />
            <CardTitle className="text-2xl font-bold text-red-400">
              🚨 ADMIN SYSTEM ACCESS
            </CardTitle>
            <p className="text-red-300 text-sm mt-2">
              Administrative Portal • Restricted Access • High Security
            </p>
            
            {/* Fake security indicators */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs">
                <Globe className="h-3 w-3 text-yellow-400" />
                <span className="text-yellow-300">Tracking IP: {clientIP}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <AlertTriangle className="h-3 w-3 text-orange-400" />
                <span className="text-orange-300">Attempts: {attemptCount}/10</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <Shield className="h-3 w-3 text-green-400" />
                <span className="text-green-300">Security Level: MAXIMUM</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFakeLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-red-300">Administrator Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="bg-black/40 border-red-500/30 text-red-400"
                placeholder="Enter admin username..."
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-red-300">Administrator Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-black/40 border-red-500/30 text-red-400 pr-10"
                  placeholder="Enter admin password..."
                  autoComplete="off"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 text-red-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3"
            >
              <Lock className="h-5 w-5 mr-2" />
              {isLoading ? `Authenticating... ${Math.ceil((2000 + (attemptCount * 1000)) / 1000)}s` : 'Access Admin Dashboard'}
            </Button>
          </form>

          {/* Fake security warnings to make it look authentic */}
          <div className="mt-6 space-y-3">
            <div className="p-3 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/20 rounded-lg">
              <p className="text-xs text-red-300 text-center mb-2">
                ⚠️ RESTRICTED ADMINISTRATIVE ACCESS PORTAL
              </p>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• All access attempts are logged and monitored</div>
                <div>• Unauthorized access is a federal crime</div>
                <div>• Multi-layer security verification required</div>
                <div>• System administrators will be notified of breaches</div>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-yellow-900/30 to-red-900/30 border border-yellow-500/20 rounded-lg">
              <p className="text-xs text-yellow-300 text-center">
                🔍 Active Monitoring: All activities tracked • IP Geolocation enabled • Forensic logging active
              </p>
            </div>
          </div>

          {/* Hidden message for console logging */}
          <div style={{ display: 'none' }} data-honeypot="true">
            🍯 This is a honeypot decoy admin page designed to trap attackers.
            The real admin system is completely hidden and secure.
            All attempts here are logged for security analysis.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
