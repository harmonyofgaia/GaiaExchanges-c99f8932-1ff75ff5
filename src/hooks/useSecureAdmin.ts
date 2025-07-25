
import { useState, useEffect } from 'react'

interface AdminSession {
  id: string
  timestamp: number
  ip?: string
}

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null)
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    validateAdminSession()
  }, [])

  const validateAdminSession = () => {
    try {
      const sessionId = localStorage.getItem('gaia-admin-session')
      const sessionExpiry = localStorage.getItem('gaia-admin-expiry')
      const adminActive = sessionStorage.getItem('admin-active')
      
      if (sessionId && sessionExpiry && adminActive === 'true') {
        const now = Date.now()
        const expiry = parseInt(sessionExpiry)
        
        if (now < expiry) {
          setIsAdmin(true)
          setAdminSession({
            id: sessionId,
            timestamp: now
          })
        } else {
          // Session expired
          revokeAdminAccess()
        }
      }
    } catch (error) {
      console.error('Error validating admin session:', error)
      revokeAdminAccess()
    } finally {
      setIsValidating(false)
    }
  }

  const grantAdminAccess = (): boolean => {
    try {
      // Check if another admin session exists
      const existingSession = localStorage.getItem('gaia-admin-session')
      if (existingSession) {
        const sessionExpiry = localStorage.getItem('gaia-admin-expiry')
        if (sessionExpiry && Date.now() < parseInt(sessionExpiry)) {
          return false // Another admin already logged in
        }
      }

      // Create new admin session
      const sessionId = `admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      
      localStorage.setItem('gaia-admin-session', sessionId)
      localStorage.setItem('gaia-admin-expiry', expiryTime.toString())
      sessionStorage.setItem('admin-active', 'true')
      
      setIsAdmin(true)
      setAdminSession({
        id: sessionId,
        timestamp: Date.now()
      })
      
      return true
    } catch (error) {
      console.error('Error granting admin access:', error)
      return false
    }
  }

  const revokeAdminAccess = () => {
    localStorage.removeItem('gaia-admin-session')
    localStorage.removeItem('gaia-admin-expiry')
    sessionStorage.removeItem('admin-active')
    setIsAdmin(false)
    setAdminSession(null)
  }

  const extendSession = () => {
    if (isAdmin && adminSession) {
      const newExpiryTime = Date.now() + (24 * 60 * 60 * 1000)
      localStorage.setItem('gaia-admin-expiry', newExpiryTime.toString())
    }
  }

  return {
    isAdmin,
    adminSession,
    isValidating,
    grantAdminAccess,
    revokeAdminAccess,
    extendSession,
    validateAdminSession
  }
}
