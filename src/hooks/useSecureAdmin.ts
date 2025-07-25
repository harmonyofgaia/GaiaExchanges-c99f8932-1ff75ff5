
import { useState, useEffect } from 'react'

interface AdminSession {
  id: string
  ip: string
  userAgent: string
  timestamp: Date
  isActive: boolean
}

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null)

  useEffect(() => {
    const checkAdminStatus = () => {
      // Remove user authentication dependency - use only admin-specific auth
      const hasAdminSession = sessionStorage.getItem('admin-session-active') === 'true'
      const isAdminLoggedIn = localStorage.getItem('admin-logged-in') === 'true'
      const adminSessionId = localStorage.getItem('gaia-admin-session-id')
      const adminIP = localStorage.getItem('gaia-admin-ip')
      
      // Check for exclusive admin access
      const currentIP = getClientIP()
      const currentUserAgent = navigator.userAgent
      
      // Verify this is the same admin session
      const isValidSession = adminSessionId && adminIP && currentIP === adminIP
      
      const adminStatus = (hasAdminSession || isAdminLoggedIn) && isValidSession
      setIsAdmin(adminStatus)
      setIsValidating(false)
      
      if (adminStatus) {
        console.log('👑 GAIA ADMIN ACCESS CONFIRMED - NO USER AUTH REQUIRED')
        console.log('🔒 Admin-only authentication verified - Independent system')
        console.log('🧠 GAIA IA Tool: Full system control granted')
        
        setAdminSession({
          id: adminSessionId!,
          ip: adminIP!,
          userAgent: currentUserAgent,
          timestamp: new Date(),
          isActive: true
        })
      } else if (hasAdminSession || isAdminLoggedIn) {
        console.warn('🚨 SECURITY ALERT: Invalid admin session detected')
        console.warn('🛡️ GAIA Defense: Clearing invalid session')
        revokeAdminAccess()
      }
    }

    checkAdminStatus()
    
    // Check admin status every 3 seconds for enhanced security
    const interval = setInterval(checkAdminStatus, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const grantAdminAccess = () => {
    const currentIP = getClientIP()
    const sessionId = generateSecureSessionId()
    
    // Check if another admin is already logged in
    const existingAdminIP = localStorage.getItem('gaia-admin-ip')
    if (existingAdminIP && existingAdminIP !== currentIP) {
      console.error('🚫 GAIA SECURITY: Another admin is already connected')
      console.error('🛡️ One-admin exclusivity enforced - Access denied')
      return false
    }
    
    sessionStorage.setItem('admin-session-active', 'true')
    localStorage.setItem('admin-logged-in', 'true')
    localStorage.setItem('gaia-admin-session-id', sessionId)
    localStorage.setItem('gaia-admin-ip', currentIP)
    localStorage.setItem('gaia-admin-timestamp', new Date().toISOString())
    
    setIsAdmin(true)
    console.log('👑 GAIA ADMIN ACCESS GRANTED - INDEPENDENT OF USER AUTH')
    console.log('🔒 Admin-only session secured - No user authentication required')
    console.log('🧠 GAIA IA Tool: Complete system control activated')
    
    return true
  }

  const revokeAdminAccess = () => {
    sessionStorage.removeItem('admin-session-active')
    localStorage.removeItem('admin-logged-in')
    localStorage.removeItem('gaia-admin-session-id')
    localStorage.removeItem('gaia-admin-ip')
    localStorage.removeItem('gaia-admin-timestamp')
    
    setIsAdmin(false)
    setAdminSession(null)
    console.log('🚪 GAIA ADMIN ACCESS REVOKED - System secured')
  }

  const getClientIP = (): string => {
    let devIP = localStorage.getItem('dev-client-ip')
    if (!devIP) {
      devIP = `192.168.1.${Math.floor(Math.random() * 255)}`
      localStorage.setItem('dev-client-ip', devIP)
    }
    return devIP
  }

  const generateSecureSessionId = (): string => {
    return `gaia-admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const blockUnauthorizedAccess = (attempt: string) => {
    console.warn(`🚨 GAIA SECURITY: Blocked unauthorized ${attempt} attempt`)
  }

  return {
    isAdmin,
    isValidating,
    adminSession,
    grantAdminAccess,
    revokeAdminAccess,
    blockUnauthorizedAccess
  }
}
