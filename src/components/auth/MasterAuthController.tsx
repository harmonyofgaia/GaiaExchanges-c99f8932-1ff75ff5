
import { useEffect, useState } from 'react'
import { TrustedIPChecker } from './TrustedIPChecker'
import { UnifiedAdminLogin } from './UnifiedAdminLogin'
import { UserAuthenticationSystem } from './UserAuthenticationSystem'

export function MasterAuthController() {
  const [ipCheckComplete, setIpCheckComplete] = useState(false)
  const [isTrustedIP, setIsTrustedIP] = useState(false)
  const [userIP, setUserIP] = useState('')

  const handleIPCheck = (trusted: boolean, ip: string) => {
    setIsTrustedIP(trusted)
    setUserIP(ip)
    setIpCheckComplete(true)
    
    console.log('🔒 MASTER AUTH CONTROLLER INITIALIZED')
    console.log('🌐 USER IP:', ip)
    console.log('🛡️ TRUST STATUS:', trusted ? 'TRUSTED ADMIN' : 'REGULAR USER')
    
    if (trusted) {
      console.log('👑 ADMIN ACCESS GRANTED - SHOWING ADMIN LOGIN')
    } else {
      console.log('👤 REGULAR USER - SHOWING USER AUTHENTICATION')
    }
  }

  if (!ipCheckComplete) {
    return (
      <>
        <TrustedIPChecker onIPCheck={handleIPCheck} />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-purple-400 rounded-full animate-bounce"></div>
            </div>
            <div className="text-purple-400 text-lg font-bold">🔒 Initializing Security...</div>
          </div>
        </div>
      </>
    )
  }

  // Show admin login for trusted IPs
  if (isTrustedIP) {
    return <UnifiedAdminLogin />
  }

  // Show user authentication for non-trusted IPs
  return <UserAuthenticationSystem />
}
