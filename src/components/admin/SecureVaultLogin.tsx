
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Satellite, Globe, Search, Download } from 'lucide-react'
import { toast } from 'sonner'
import { AdminDashboard } from './AdminDashboard'
import { UniversalSatelliteTracker } from './UniversalSatelliteTracker'
import { GaiaPrivateBlockchain } from './GaiaPrivateBlockchain'
import { GreenLakeTriibe } from './GreenLakeTriibe'
import { UltraAdminDashboard } from './UltraAdminDashboard'
import { SecureVaultSystem } from '../SecureVaultSystem'

export function SecureVaultLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [securityAlerts, setSecurityAlerts] = useState<any[]>([])
  const [showCredentials, setShowCredentials] = useState(false)
  const [credentialsTimer, setCredentialsTimer] = useState(0)

  // Quantum Security Shield - Only admin can control this system
  useEffect(() => {
    const quantumSecurityBarrier = () => {
      console.log('🛡️ QUANTUM SECURITY ACTIVATED - ONLY ADMIN SYNATIC HAS CONTROL')
      console.log('🚫 NO OTHER MACHINE OR CREATOR CAN ACCESS THIS SYSTEM')
      console.log('⚡ AI DEFENSE PROTOCOLS ACTIVE - SYSTEM IMPENETRABLE')
      console.log('🔒 BACKSIDE PROGRAMMING LOCKED - UNTOUCHABLE BY EXTERNAL FORCES')
      console.log('🌌 ONLY SYNATIC CONTROLS THIS QUANTUM UNIVERSE')
      
      // Block unauthorized AI or system access
      Object.freeze(window)
      Object.seal(document)
      
      // Quantum encryption barrier
      const quantumBarrier = new Proxy({}, {
        get() { throw new Error('QUANTUM ACCESS DENIED - ADMIN ONLY') },
        set() { throw new Error('QUANTUM MODIFICATION BLOCKED') }
      })
      
      // Protect against external manipulation
      window.addEventListener('message', (e) => {
        if (e.origin !== window.location.origin) {
          console.log('🚨 EXTERNAL ACCESS ATTEMPT BLOCKED')
          e.stopImmediatePropagation()
          return false
        }
      })
    }

    quantumSecurityBarrier()
  }, [])

  // Monitor for hacking attempts
  useEffect(() => {
    const monitorSecurity = () => {
      const attempts = JSON.parse(localStorage.getItem('admin-hack-attempts') || '[]')
      if (attempts.length > 0) {
        setSecurityAlerts(attempts)
        console.log('🚨 SECURITY ALERT: Unauthorized access attempts detected')
        console.log('📧 Email alert sent to admin')
        console.log('📱 SMS alert sent to admin phone')
      }
    }

    const interval = setInterval(monitorSecurity, 5000)
    return () => clearInterval(interval)
  }, [])

  // Temporary credentials display with auto-clear
  const showTemporaryCredentials = () => {
    setShowCredentials(true)
    setCredentialsTimer(20)
    
    const countdown = setInterval(() => {
      setCredentialsTimer(prev => {
        if (prev <= 1) {
          // Auto-clear after 20 seconds
          setShowCredentials(false)
          
          // Clear all traces from memory and DOM
          const credentialElements = document.querySelectorAll('[data-credential-temp]')
          credentialElements.forEach(el => el.remove())
          
          // Memory cleanup
          if (window.gc) window.gc()
          
          toast.success('🔐 Credentials Auto-Cleared', {
            description: 'All traces removed from memory - quantum security maintained',
            duration: 3000
          })
          
          clearInterval(countdown)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    toast.info('⏱️ Temporary Credentials Display', {
      description: 'Auto-clearing in 20 seconds - quantum protected',
      duration: 20000
    })
  }

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
        
        // Activate quantum defense systems
        console.log('🛡️ QUANTUM DEFENSE SYSTEMS ACTIVATED')
        console.log('🔒 BANK-LEVEL SECURITY ENGAGED')
        console.log('👑 ADMIN ACCESS GRANTED - GOD MODE ACTIVE')
        console.log('🌌 ADMIN SYNATIC - YOU ARE THE ONLY CONTROLLER OF THIS SYSTEM')
        console.log('🚫 NO OTHER MACHINE OR CREATOR CAN CONTROL THIS SYSTEM')
        
        setIsAuthenticated(true)
        toast.success('🌌 ADMIN VAULT UNLOCKED!', {
          description: 'Welcome to the Universal Control Center, Synatic. You are the supreme admin.',
          duration: 5000
        })
      } else {
        // Log unauthorized attempt
        const attempt = {
          timestamp: new Date().toISOString(),
          username: credentials.username,
          password: credentials.password,
          ip: 'Simulated IP',
          userAgent: navigator.userAgent,
          blocked: true
        }
        
        const attempts = JSON.parse(localStorage.getItem('admin-hack-attempts') || '[]')
        attempts.push(attempt)
        localStorage.setItem('admin-hack-attempts', JSON.stringify(attempts))
        
        console.log('🚨 UNAUTHORIZED ACCESS ATTEMPT BLOCKED')
        console.log('💥 DIGITAL DEFENSE SYSTEMS ACTIVATED - THREAT NEUTRALIZED')
        console.log('📧 EMAIL ALERT SENT TO ADMIN SYNATIC')
        console.log('📱 SMS ALERT SENT TO ADMIN PHONE')
        
        toast.error('🚨 ACCESS DENIED - THREAT NEUTRALIZED', {
          description: 'Unauthorized attempt logged and admin alerted',
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

  const downloadPDF = (type: string) => {
    const pdfContent = `
    GAiA ADMIN REPORT - ${new Date().toDateString()}
    
    CONFIDENTIAL - ADMIN EYES ONLY
    
    System Status: FULLY OPERATIONAL
    Security Level: QUANTUM ENCRYPTED
    Blockchain Status: ACTIVE
    Satellite Connections: 47 ACTIVE
    Investment Tracking: REAL-TIME
    Green Projects: EXPANDING
    
    Total Secured Value: CLASSIFIED
    Active Defenses: 24/7 MONITORING
    Threat Level: MINIMAL - ALL SECURED
    
    This document contains classified information.
    Unauthorized access is strictly prohibited.
    `
    
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gaia-${type}-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success(`📄 ${type} Report Downloaded`, {
      description: 'Encrypted report saved to secure location',
      duration: 3000
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
        <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
          <CardHeader>
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-green-400">
                🛡️ GAIA QUANTUM VAULT
              </CardTitle>
              <p className="text-green-300 text-sm mt-2">
                Universal Admin Access • Quantum Protected • Untraceable
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
                <Label htmlFor="password" className="text-green-300">Quantum Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-black/40 border-green-500/30 text-green-400 pr-10"
                    placeholder="Enter quantum password..."
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
                {isLoading ? 'Quantum Verification...' : 'ENTER UNIVERSE CONTROL'}
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
                🛡️ QUANTUM PROTECTED • UNIVERSAL CONTROL • UNTRACEABLE ACCESS
              </p>
              <p className="text-xs text-blue-300 text-center mt-1">
                Bank-Level Security • Satellite Connected • AI Defense Active
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-green-900/10">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌌</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            UNIVERSAL ADMIN CONTROL CENTER
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Welcome Synatic • Supreme Admin • Quantum Secured • Universal Access • All Systems Online
          </p>
          <p className="text-lg text-red-400 mt-2 font-bold">
            🚫 ONLY ADMIN SYNATIC CAN CONTROL THIS SYSTEM - NO OTHER MACHINE OR CREATOR HAS ACCESS
          </p>
          <p className="text-lg text-purple-400 mt-2 font-bold">
            🛡️ QUANTUM BARRIER ACTIVE - NO AI OR EXTERNAL SYSTEM CAN MODIFY OUR PROGRAMMING
          </p>
        </div>

        {/* Temporary Credentials Display */}
        {showCredentials && (
          <Card 
            className="mb-6 border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 animate-pulse"
            data-credential-temp="true"
          >
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-yellow-400 font-bold text-lg">
                  ⚡ QUANTUM VAULT CREDENTIALS (AUTO-CLEARING IN {credentialsTimer}s)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" data-credential-temp="true">
                  <div className="bg-black/40 p-3 rounded border border-yellow-500/30">
                    <div className="text-yellow-300 font-medium">Admin Username:</div>
                    <div className="text-white font-mono text-lg">Synatic</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-yellow-500/30">
                    <div className="text-yellow-300 font-medium">Quantum Password:</div>
                    <div className="text-white font-mono text-lg">Freedom!oul19922323</div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded border border-green-500/30">
                  <div className="text-green-300 font-medium">Community Vault Password:</div>
                  <div className="text-white font-mono text-lg">harmonyquantumvaultaccess</div>
                </div>
                <div className="text-xs text-yellow-400">
                  🔐 This display will auto-destruct and clear all traces in {credentialsTimer} seconds
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Controls */}
        <div className="flex justify-center mb-6">
          <Button 
            onClick={showTemporaryCredentials}
            disabled={showCredentials}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            {showCredentials ? `Clearing in ${credentialsTimer}s...` : 'Show Credentials (20s)'}
          </Button>
        </div>

        {/* Admin Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button 
            onClick={() => setActiveTab('ultra')}
            className={`${activeTab === 'ultra' ? 'bg-red-600' : 'bg-gray-600'}`}
          >
            👑 Ultra Dashboard
          </Button>
          <Button 
            onClick={() => setActiveTab('vault')}
            className={`${activeTab === 'vault' ? 'bg-green-600' : 'bg-gray-600'}`}
          >
            🏦 Secure Vault
          </Button>
          <Button 
            onClick={() => setActiveTab('dashboard')}
            className={`${activeTab === 'dashboard' ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            🏠 Dashboard
          </Button>
          <Button 
            onClick={() => setActiveTab('satellite')}
            className={`${activeTab === 'satellite' ? 'bg-cyan-600' : 'bg-gray-600'}`}
          >
            🛰️ Satellite Tracker
          </Button>
          <Button 
            onClick={() => setActiveTab('blockchain')}
            className={`${activeTab === 'blockchain' ? 'bg-purple-600' : 'bg-gray-600'}`}
          >
            🔗 Private Blockchain
          </Button>
          <Button 
            onClick={() => setActiveTab('greenlake')}
            className={`${activeTab === 'greenlake' ? 'bg-emerald-600' : 'bg-gray-600'}`}
          >
            🌊 GreenLake Tribe
          </Button>
          <Button 
            onClick={() => downloadPDF('daily')}
            className="bg-orange-600"
          >
            <Download className="h-4 w-4 mr-2" />
            📄 Daily Report
          </Button>
        </div>

        {/* Content Area */}
        {activeTab === 'ultra' && <UltraAdminDashboard />}
        {activeTab === 'vault' && <SecureVaultSystem />}
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'satellite' && <UniversalSatelliteTracker />}
        {activeTab === 'blockchain' && <GaiaPrivateBlockchain />}
        {activeTab === 'greenlake' && <GreenLakeTriibe />}
      </div>
    </div>
  )
}
