'use client'

import { useState, useEffect } from 'react'
import { SecureVaultLogin } from '@/components/admin/SecureVaultLogin'
import { AdminControlCenter } from './components/AdminControlCenter'
import { BreachDefenseSystem } from './components/BreachDefenseSystem'
import { TimeSync } from './components/TimeSync'

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

  useEffect(() => {
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20">
        <TimeSync systemTime={SYSTEM_TIME} />
        <BreachDefenseSystem 
          layers={securityLayers}
          onLayerActivation={handleSecurityLayerActivation}
        />
        <SecureVaultLogin onAuthentication={handleAuthentication} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
      <TimeSync systemTime={SYSTEM_TIME} />
      <BreachDefenseSystem 
        layers={securityLayers}
        onLayerActivation={handleSecurityLayerActivation}
        authenticated={true}
      />
      <AdminControlCenter 
        systemTime={SYSTEM_TIME}
        securityLayers={securityLayers}
      />
    </div>
  )
}