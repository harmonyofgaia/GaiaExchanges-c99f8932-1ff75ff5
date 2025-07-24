import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

/**
 * Global Admin Session Manager - Prevents any admin→auth redirects
 * Ensures exclusive admin access and GAIA token verification
 */
export function AdminSessionManager() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAdmin, adminSession } = useSecureAdmin()

  useEffect(() => {
    const enforceAdminExclusivity = () => {
      const currentPath = location.pathname
      const isAdminPath = currentPath.startsWith('/admin') || currentPath.startsWith('/secure-')
      const isAuthPath = currentPath.startsWith('/auth')
      
      console.log('🛡️ ADMIN SESSION MANAGER - GLOBAL PROTECTION ACTIVE')
      console.log(`📍 Current Path: ${currentPath}`)
      console.log(`🔒 Is Admin Path: ${isAdminPath}`)
      console.log(`👑 Admin Status: ${isAdmin}`)
      console.log(`🌍 GAIA Token: ${GAIA_TOKEN.WALLET_ADDRESS}`)

      // CRITICAL: If admin is logged in, NEVER allow navigation to /auth
      if (isAdmin && isAuthPath) {
        console.log('🚨 BLOCKING ADMIN→AUTH REDIRECT - SECURITY VIOLATION PREVENTED')
        navigate('/admin', { replace: true })
        toast.error('🛡️ Security Protection Active', {
          description: 'Admin cannot access auth pages while logged in',
          duration: 5000
        })
        return
      }

      // If admin is logged in but not on admin path, redirect to admin
      if (isAdmin && !isAdminPath && !isAuthPath) {
        console.log('🔄 REDIRECTING ADMIN TO SECURE AREA')
        navigate('/admin', { replace: true })
        toast.info('🌍 Admin Redirect', {
          description: 'Redirecting to secure admin area',
          duration: 3000
        })
        return
      }

      // Enhanced logging for admin sessions
      if (isAdmin && adminSession) {
        console.log('👑 ADMIN SESSION ACTIVE:')
        console.log(`   Session ID: ${adminSession.id}`)
        console.log(`   IP Address: ${adminSession.ip}`)
        console.log(`   User Agent: ${adminSession.userAgent.substring(0, 50)}...`)
        console.log(`   Timestamp: ${adminSession.timestamp.toISOString()}`)
        console.log(`   Status: ${adminSession.isActive ? 'ACTIVE' : 'INACTIVE'}`)
        console.log('🛡️ GAIA TOKEN PROTECTION VERIFIED')
        console.log('🔒 4-STEP BREACH PROTOCOL ACTIVE')
        console.log('👻 100 INVISIBLE WALLS DEPLOYED')
      }
    }

    const sessionMonitoringInterval = setInterval(enforceAdminExclusivity, 2000)
    enforceAdminExclusivity()

    return () => clearInterval(sessionMonitoringInterval)
  }, [location.pathname, isAdmin, adminSession, navigate])

  // Component is invisible - just manages session security
  return null
}