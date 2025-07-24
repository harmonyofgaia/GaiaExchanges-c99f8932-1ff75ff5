'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Eye, Shield, Clock } from 'lucide-react'

interface SecurityEvent {
  id: string
  timestamp: string
  type: 'AUTH' | 'ACCESS' | 'INTRUSION' | 'MFA' | 'SESSION'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  message: string
  ip?: string
  userAgent?: string
}

interface SecurityMiddlewareProps {
  systemTime: {
    hour: number
    minute: number
    date: string
  }
  isAuthenticated: boolean
}

export function SecurityMiddleware({ systemTime, isAuthenticated }: SecurityMiddlewareProps) {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [activeSessions, setActiveSessions] = useState(1)
  const [intrusionAttempts, setIntrusionAttempts] = useState(0)
  const [mfaValidations, setMfaValidations] = useState(0)

  useEffect(() => {
    // Only run on client side to avoid SSR issues
    if (typeof window === 'undefined') return

    if (isAuthenticated) {
      // Initialize security logging
      const initialEvents: SecurityEvent[] = [
        {
          id: '1',
          timestamp: `${systemTime.hour}:${systemTime.minute}:00`,
          type: 'AUTH',
          severity: 'LOW',
          message: 'Admin authentication successful',
          ip: '192.168.1.100'
        },
        {
          id: '2',
          timestamp: `${systemTime.hour}:${systemTime.minute}:01`,
          type: 'MFA',
          severity: 'LOW',
          message: 'Multi-factor authentication validated',
          ip: '192.168.1.100'
        },
        {
          id: '3',
          timestamp: `${systemTime.hour}:${systemTime.minute}:02`,
          type: 'ACCESS',
          severity: 'LOW',
          message: 'Secure admin portal accessed',
          ip: '192.168.1.100'
        },
        {
          id: '4',
          timestamp: `${systemTime.hour}:${systemTime.minute}:03`,
          type: 'SESSION',
          severity: 'LOW',
          message: '4-Step Defense System fully operational',
          ip: '192.168.1.100'
        }
      ]

      setSecurityEvents(initialEvents)
      setMfaValidations(1)

      if (process.env.NODE_ENV === 'production') {
        // Connect to real security monitoring system
        const monitoringInterval = setInterval(async () => {
          try {
            const response = await fetch('/api/security-events'); // Replace with actual API endpoint
            const newEvent: SecurityEvent = await response.json();
            setSecurityEvents(prev => [newEvent, ...prev.slice(0, 9)]); // Keep last 10 events
          } catch (error) {
            console.error('Failed to fetch security events:', error);
          }
        }, 10000);

        return () => clearInterval(monitoringInterval);
      } else {
        // Simulate real-time security monitoring for development
        const monitoringInterval = setInterval(() => {
          const eventTypes = ['SESSION', 'ACCESS', 'AUTH'] as const;
          const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

          const newEvent: SecurityEvent = {
            id: Date.now().toString(),
            timestamp: `${systemTime.hour}:${systemTime.minute}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            type: randomType,
            severity: 'LOW',
            message: `${randomType} validation completed successfully`,
            ip: '192.168.1.100'
          };

          setSecurityEvents(prev => [newEvent, ...prev.slice(0, 9)]); // Keep last 10 events
        }, 10000);

        return () => clearInterval(monitoringInterval);
      }
    }
  }, [isAuthenticated, systemTime])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400 border-red-500/50'
      case 'HIGH': return 'text-orange-400 border-orange-500/50'
      case 'MEDIUM': return 'text-yellow-400 border-yellow-500/50'
      default: return 'text-green-400 border-green-500/50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'AUTH': return <Shield className="h-3 w-3" />
      case 'MFA': return <Eye className="h-3 w-3" />
      case 'INTRUSION': return <AlertTriangle className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  if (!isAuthenticated) return null

  // Security monitoring runs in background - no visible UI elements  
  return null
}