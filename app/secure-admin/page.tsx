
'use client'

import { useState, useEffect } from 'react'
import { SecureVaultLogin } from '@/components/admin/SecureVaultLogin'
import { DynamicBreachDefenseSystem, DynamicSecurityMiddleware, DynamicTimeSync } from './components/DynamicSecurityComponent'

// Set system time to 11:14, 24-07-2025 for all secure-admin processes
const SYSTEM_TIME = {
  hour: 11,
  minute: 14,
  date: '24-07-2025'
}

export default function SecureAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [securityLayers, setSecurityLayers] = useState({
    authentication: false,
    rbac: false,
    mfa: false,
    intrusion: false
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Only initialize on client side
    setIsClient(true)
    
    // Initialize system time synchronization
    const initTimeSync = () => {
      console.log(`[SECURE-ADMIN] System time synchronized to ${SYSTEM_TIME.hour}:${SYSTEM_TIME.minute}, ${SYSTEM_TIME.date}`)
    }
    initTimeSync()
  }, [])

  const handleAuthentication = (authenticated: boolean) => {
    setIsAuthenticated(authenticated)
    if (authenticated) {
      // Initialize 4-step breach defense system
      setSecurityLayers(prev => ({ ...prev, authentication: true }))
    }
  }

  const handleSecurityLayerActivation = (layer: keyof typeof securityLayers) => {
    setSecurityLayers(prev => ({ ...prev, [layer]: true }))
  }

  // Don't render security components during SSR
  if (!isClient) {
    return <SecureVaultLogin onAuthentication={handleAuthentication} />
  }

  if (!isAuthenticated) {
    return (
      <>
        <DynamicTimeSync systemTime={SYSTEM_TIME} />
        <DynamicBreachDefenseSystem 
          layers={securityLayers}
          onLayerActivation={handleSecurityLayerActivation}
        />
        <DynamicSecurityMiddleware systemTime={SYSTEM_TIME} isAuthenticated={false} />
        <SecureVaultLogin onAuthentication={handleAuthentication} />
      </>
    )
  }

  // When authenticated, show only security components without dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
      <DynamicTimeSync systemTime={SYSTEM_TIME} />
      <DynamicBreachDefenseSystem 
        layers={securityLayers}
        onLayerActivation={handleSecurityLayerActivation}
        authenticated={true}
      />
      <DynamicSecurityMiddleware systemTime={SYSTEM_TIME} isAuthenticated={true} />
      
      {/* Simple authenticated state indicator */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🛡️ SECURE ADMIN ACCESS GRANTED
          </h1>
          <p className="text-green-300">
            Quantum security protocols active • System time: {SYSTEM_TIME.hour}:{SYSTEM_TIME.minute}, {SYSTEM_TIME.date}
          </p>
        </div>
      </div>
    </div>
  )
}
