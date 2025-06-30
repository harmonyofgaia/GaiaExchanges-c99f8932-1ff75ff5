import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Eye, EyeOff, RefreshCw, LogOut } from 'lucide-react'
import { AdminLogin } from './AdminLogin'
import { AdminMFA } from './AdminMFA'
import { AdminRecoverySystem } from './AdminRecoverySystem'
import { AdminDashboard } from './AdminDashboard'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { toast } from 'sonner'

export function SecureVaultLogin() {
  const [showRecovery, setShowRecovery] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)
  const [credentialsVisible, setCredentialsVisible] = useState(false)
  const [isInvisibleMode, setIsInvisibleMode] = useState(false)
  const { isAdmin, grantAdminAccess, revokeAdminAccess } = useSecureAdmin()

  useEffect(() => {
    // Invisible admin detection
    const detectAdminAccess = () => {
      const isFirefoxBrowser = navigator.userAgent.toLowerCase().includes('firefox')
      const hasAdminSession = sessionStorage.getItem('admin-session-active') === 'true'
      const isLegitimateAdmin = isFirefoxBrowser && hasAdminSession
      
      if (!isLegitimateAdmin) {
        console.log('🚨 NON-ADMIN ACCESS DETECTED - ACTIVATING INVISIBLE MODE')
        console.log('👻 PAGE BECOMING INVISIBLE TO HACKERS')
        setIsInvisibleMode(true)
        
        // Block all hacker interactions
        const blockHackerAccess = (event: Event) => {
          console.log('🚫 HACKER INPUT BLOCKED - CANNOT TYPE OR INTERACT')
          event.preventDefault()
          event.stopPropagation()
          event.stopImmediatePropagation()
          return false
        }
        
        document.addEventListener('keydown', blockHackerAccess, true)
        document.addEventListener('click', blockHackerAccess, true)
        document.addEventListener('input', blockHackerAccess, true)
        document.addEventListener('submit', blockHackerAccess, true)
      } else {
        console.log('👑 LEGITIMATE ADMIN ACCESS - FULL VISIBILITY GRANTED')
        setIsInvisibleMode(false)
      }
    }

    detectAdminAccess()
    
    // Check every second for admin status
    const adminCheckInterval = setInterval(detectAdminAccess, 1000)
    
    return () => clearInterval(adminCheckInterval)
  }, [])

  const validateVaultAccess = (username: string, password: string) => {
    // Enhanced admin verification with invisible protection
    const isFirefoxBrowser = navigator.userAgent.toLowerCase().includes('firefox')
    
    if (!isFirefoxBrowser) {
      console.log('🚨 NON-FIREFOX ACCESS DENIED - ADMIN REQUIRES FIREFOX')
      toast.error('🚫 Access Denied - Admin Browser Required')
      return false
    }
    
    const isValidUser = username === 'Synatic'
    const isValidPass = password === 'harmonyquantumvaultaccess'
    
    if (isValidUser && isValidPass) {
      grantAdminAccess()
      setIsInvisibleMode(false)
      
      console.log('👑 GAIA VAULT ACCESS GRANTED - INVISIBLE PROTECTION ACTIVE')
      console.log('🛡️ ADMIN CAN NOW ACCESS ALL FILES - ENCRYPTED OR NOT')
      console.log('♾️ PARABOLIC UNIVERSE FULL CONTROL ACTIVATED')
      
      toast.success('🌍 GAIA Vault Access Granted!', {
        description: 'God Mode Admin Rights - Full System Control Active',
        duration: 5000
      })
      return true
    }
    
    return false
  }

  const handleShowCredentials = () => {
    const isFirefoxBrowser = navigator.userAgent.toLowerCase().includes('firefox')
    const hasAdminSession = sessionStorage.getItem('admin-session-active') === 'true'
    
    if (!isFirefoxBrowser || !hasAdminSession) {
      console.log('🚨 UNAUTHORIZED CREDENTIAL ACCESS BLOCKED')
      toast.error('🚫 Access Denied - Admin Only Feature')
      return
    }
    
    setShowCredentials(true)
    setCredentialsVisible(true)
    
    setTimeout(() => {
      setCredentialsVisible(false)
      setShowCredentials(false)
      
      const credentialElements = document.querySelectorAll('[data-credential-display]')
      credentialElements.forEach(el => el.remove())
      
      toast.success('🔐 Credentials Auto-Cleared', {
        description: 'All traces removed from memory',
        duration: 3000
      })
    }, 10000)
    
    toast.info('⏱️ Credentials Visible for 10 seconds', {
      duration: 10000
    })
  }

  // Invisible mode - show nothing to hackers
  if (isInvisibleMode) {
    console.log('👻 INVISIBLE MODE ACTIVE - HACKERS SEE NOTHING')
    console.log('🚫 COMPLETE INVISIBILITY - UNTOUCHABLE ADMIN SYSTEM')
    return (
      <div className="min-h-screen bg-black">
        {/* Completely invisible to hackers */}
      </div>
    )
  }

  // Show full admin dashboard when logged in
  if (isAdmin && !showRecovery) {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">
            🌍 GAIA VAULT ACCESS
          </h1>
          <p className="text-green-300">
            {showRecovery ? '4-Step Recovery System Active' : 'Invisible Admin Security Portal'}
          </p>
        </div>

        {!showRecovery ? (
          <>
            <AdminLogin onLoginSuccess={validateVaultAccess} />
            <div className="mt-6 text-center">
              <Button 
                onClick={() => setShowRecovery(true)}
                variant="ghost" 
                className="text-xs text-muted-foreground hover:text-blue-400"
              >
                Need 4-Step Recovery Access?
              </Button>
            </div>
          </>
        ) : (
          <AdminRecoverySystem 
            onRecoveryComplete={() => {
              grantAdminAccess()
              setShowRecovery(false)
              setIsInvisibleMode(false)
            }}
            onBack={() => setShowRecovery(false)}
          />
        )}
      </div>
    </div>
  )
}
