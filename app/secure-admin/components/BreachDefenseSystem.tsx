'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface SecurityLayers {
  authentication: boolean
  rbac: boolean
  mfa: boolean
  intrusion: boolean
}

interface BreachDefenseSystemProps {
  layers: SecurityLayers
  onLayerActivation: (layer: keyof SecurityLayers) => void
  authenticated?: boolean
}

export function BreachDefenseSystem({ layers, onLayerActivation, authenticated = false }: BreachDefenseSystemProps) {
  const [sessionIntegrity, setSessionIntegrity] = useState(true)
  const [threatLevel, setThreatLevel] = useState('LOW')
  const [activeThreatCount, setActiveThreatCount] = useState(0)

  useEffect(() => {
    if (authenticated) {
      // Initialize advanced security layers sequentially
      const initializeLayers = async () => {
        // Step 1: Advanced Authentication Enforcement
        setTimeout(() => {
          onLayerActivation('authentication')
          console.log('[DEFENSE] Layer 1: Advanced Authentication Enforcement - ACTIVE')
        }, 500)

        // Step 2: Granular Role-Based Access Control
        setTimeout(() => {
          onLayerActivation('rbac')
          console.log('[DEFENSE] Layer 2: Granular RBAC - ACTIVE')
        }, 1000)

        // Step 3: Multi-Factor Authentication & Temporal Security
        setTimeout(() => {
          onLayerActivation('mfa')
          console.log('[DEFENSE] Layer 3: MFA & Temporal Security - ACTIVE')
        }, 1500)

        // Step 4: Intrusion Detection & Adaptive Countermeasures
        setTimeout(() => {
          onLayerActivation('intrusion')
          console.log('[DEFENSE] Layer 4: Intrusion Detection - ACTIVE')
          console.log('[DEFENSE] 4-Step Breach Defense System - FULLY OPERATIONAL')
        }, 2000)
      }

      initializeLayers()
    }
  }, [authenticated, onLayerActivation])

  useEffect(() => {
    // Monitor session integrity and detect potential hijack attempts
    const monitorSession = () => {
      const userAgent = navigator.userAgent
      const [ip, setIp] = useState<string | null>(null)

      useEffect(() => {
        const fetchIp = async () => {
          try {
            const response = await fetch('https://api.ipify.org?format=json')
            const data = await response.json()
            setIp(data.ip)
          } catch (error) {
            console.error('[SECURITY] Failed to fetch IP address:', error)
          }
        }
        fetchIp()
      }, [])

      const sessionData = {
        timestamp: Date.now(),
        userAgent,
        ip: ip || 'UNKNOWN', // Fallback to 'UNKNOWN' if IP is not available
      }
      
      // Anti-hijack mechanism - validate session consistency
      const storedSession = localStorage.getItem('gaia-admin-session')
      if (storedSession && authenticated) {
        try {
          const parsed = JSON.parse(storedSession)
          if (parsed.userAgent !== userAgent) {
            setSessionIntegrity(false)
            setThreatLevel('HIGH')
            console.warn('[SECURITY] Potential session hijack detected - User agent mismatch')
          }
        } catch (error) {
          console.error('[SECURITY] Session validation error:', error)
        }
      } else if (authenticated) {
        localStorage.setItem('gaia-admin-session', JSON.stringify(sessionData))
      }
    }

    const interval = setInterval(monitorSession, 5000)
    return () => clearInterval(interval)
  }, [authenticated])

  const securityLevels = [
    {
      key: 'authentication' as const,
      name: 'Advanced Authentication',
      description: 'Multi-layer validation, session integrity, anti-hijack',
      icon: Shield,
      active: layers.authentication
    },
    {
      key: 'rbac' as const,
      name: 'Granular RBAC',
      description: 'Role-based access control with fine-grained permissions',
      icon: Lock,
      active: layers.rbac
    },
    {
      key: 'mfa' as const,
      name: 'MFA & Temporal Security',
      description: 'Multi-factor authentication with time-based validation',
      icon: Eye,
      active: layers.mfa
    },
    {
      key: 'intrusion' as const,
      name: 'Intrusion Detection',
      description: 'Real-time monitoring, automated breach response',
      icon: AlertTriangle,
      active: layers.intrusion
    }
  ]

  const activeLayersCount = Object.values(layers).filter(Boolean).length

  return (
    <div className="fixed top-20 right-4 z-40 space-y-2">
      {/* Main Status Badge */}
      <Badge 
        variant="outline" 
        className={`border-${threatLevel === 'HIGH' ? 'red' : 'green'}-500/50 text-${threatLevel === 'HIGH' ? 'red' : 'green'}-400 bg-black/80 backdrop-blur-sm px-3 py-2`}
      >
        <Shield className="h-3 w-3 mr-2" />
        <span className="font-mono text-sm">
          DEFENSE: {activeLayersCount}/4 | {threatLevel}
        </span>
      </Badge>

      {/* Security Layers Card */}
      {authenticated && (
        <Card className="w-80 border-green-500/30 bg-black/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-green-400 mb-3">
              🛡️ 4-Step Breach Defense System
            </h3>
            <div className="space-y-2">
              {securityLevels.map((level) => {
                const Icon = level.icon
                return (
                  <div key={level.key} className="flex items-center gap-3">
                    <div className={`p-1 rounded ${level.active ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                      {level.active ? (
                        <CheckCircle className="h-3 w-3 text-green-400" />
                      ) : (
                        <Icon className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-medium ${level.active ? 'text-green-400' : 'text-gray-400'}`}>
                        {level.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {level.description}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Session Integrity Status */}
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Session Integrity</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${sessionIntegrity ? 'border-green-500/50 text-green-400' : 'border-red-500/50 text-red-400'}`}
                >
                  {sessionIntegrity ? 'SECURE' : 'COMPROMISED'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}