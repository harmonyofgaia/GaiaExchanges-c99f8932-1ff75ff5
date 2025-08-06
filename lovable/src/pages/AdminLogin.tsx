
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, EyeOff, Globe, AlertTriangle, Skull } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attackerIP, setAttackerIP] = useState('')
  const [attemptCount, setAttemptCount] = useState(0)

  useEffect(() => {
    // Log the attacker's presence
    const logAttackerAccess = () => {
      const attackerData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        referrer: document.referrer || 'Direct Access',
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      }
      
      setAttackerIP(attackerData.ip)
      
      console.log('🚨 HONEYPOT TRIGGERED - ATTACKER DETECTED!')
      console.log('👹 HACKER FELL INTO THE TRAP')
      console.log('📊 Attacker Data:', attackerData)
      
      // Store attacker data
      const existingLogs = JSON.parse(localStorage.getItem('honeypot-logs') || '[]')
      existingLogs.push(attackerData)
      localStorage.setItem('honeypot-logs', JSON.stringify(existingLogs))
      
      // Alert the real admin (invisible)
      if (sessionStorage.getItem('admin-session-active') === 'true') {
        console.log('👑 REAL ADMIN NOTIFIED - ATTACKER IN HONEYPOT')
      }
    }

    logAttackerAccess()
  }, [])

  const handleFakeLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAttemptCount(prev => prev + 1)

    // Log every attempt
    console.log(`🚨 FAKE LOGIN ATTEMPT #${attemptCount + 1}`)
    console.log('👹 HACKER CREDENTIALS:', credentials)
    console.log('🕷️ COLLECTING INTELLIGENCE ON ATTACKER')

    // Store attempt data
    const attemptData = {
      timestamp: new Date().toISOString(),
      attempt: attemptCount + 1,
      username: credentials.username,
      password: credentials.password,
      ip: attackerIP
    }
    
    const existingAttempts = JSON.parse(localStorage.getItem('honeypot-attempts') || '[]')
    existingAttempts.push(attemptData)
    localStorage.setItem('honeypot-attempts', JSON.stringify(existingAttempts))

    // Always show fake loading and then rejection
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))

    // Various fake error messages to confuse attackers
    const fakeErrors = [
      '🚫 Invalid Admin Credentials',
      '⚠️ Account Temporarily Locked',
      '🔒 Two-Factor Authentication Required',
      '❌ Access Denied - Insufficient Privileges',
      '🛡️ Security Token Expired',
      '⛔ IP Address Not Whitelisted',
      '🚨 Suspicious Activity Detected',
      '🔐 VPN Access Blocked',
      '💀 Nice Try, Hacker'
    ]

    const randomError = fakeErrors[Math.floor(Math.random() * fakeErrors.length)]
    
    toast.error(randomError, {
      description: `Login attempt #${attemptCount + 1} failed. IP: ${attackerIP}`,
      duration: 5000
    })

    setIsLoading(false)
    setCredentials({ username: '', password: '' })

    // Fake progressive security measures
    if (attemptCount >= 2) {
      toast.error('🚨 Multiple Failed Attempts Detected', {
        description: 'Security team has been notified. Account monitoring active.',
        duration: 8000
      })
    }

    if (attemptCount >= 4) {
      toast.error('🛡️ Advanced Security Protocol Activated', {
        description: 'IP logging initiated. Legal action may be pursued.',
        duration: 10000
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-gray-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-red-400">
              🛡️ GAIA Admin Portal
            </CardTitle>
            <p className="text-red-300 text-sm mt-2">
              Secure Administrative Access • High Security Zone
            </p>
            
            {/* Fake status indicators */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs">
                <Globe className="h-3 w-3 text-blue-400" />
                <span className="text-blue-300">Detected IP: {attackerIP}</span>
              </div>
              {attemptCount > 0 && (
                <div className="flex items-center justify-center gap-2 text-xs">
                  <AlertTriangle className="h-3 w-3 text-yellow-400" />
                  <span className="text-yellow-300">Failed Attempts: {attemptCount}</span>
                </div>
              )}
              {attemptCount > 3 && (
                <div className="flex items-center justify-center gap-2 text-xs">
                  <Skull className="h-3 w-3 text-red-400" />
                  <span className="text-red-300">⚠️ Security Alert Active</span>
                </div>
              )}
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
              {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/20 rounded-lg">
            <p className="text-xs text-red-300 text-center mb-2">
              🛡️ Secure Admin Portal • Monitored Access • Protected Environment
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Unauthorized access attempts are logged</div>
              <div>• All admin activities are monitored</div>
              <div>• Multi-factor authentication required</div>
              {attemptCount > 2 && <div className="text-red-400">• ⚠️ Suspicious activity detected</div>}
            </div>
          </div>

          {/* Fake security badges */}
          <div className="mt-4 flex justify-center gap-2">
            <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
              SSL Secured
            </Badge>
            <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs">
              Bank Level
            </Badge>
            <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
              ISO 27001
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
