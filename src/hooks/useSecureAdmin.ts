
import { useState, useEffect } from 'react'

interface AdminSession {
  id: string
  timestamp: number
  ip?: string
  timeout?: number // timeout in minutes
}

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null)
  const [isValidating, setIsValidating] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState(2) // Default 2 minutes as required
  const [validationInterval, setValidationInterval] = useState(30000) // Default 30 seconds

  useEffect(() => {
    validateAdminSession()
    
    // Dynamically calculate validation interval based on session timeout
    const calculatedInterval = Math.max(30000, (sessionTimeout * 60 * 1000) / 10) // Minimum 30 seconds or 10% of timeout
    setValidationInterval(calculatedInterval)
    
    // Set up automatic session validation
    const interval = setInterval(validateAdminSession, calculatedInterval)
    return () => clearInterval(interval)
  }, [sessionTimeout])

  const validateAdminSession = () => {
    try {
      const sessionId = localStorage.getItem('gaia-admin-session')
      const sessionExpiry = localStorage.getItem('gaia-admin-expiry')
      const adminActive = sessionStorage.getItem('admin-active')
      const storedTimeout = localStorage.getItem('gaia-admin-timeout')
      
      if (storedTimeout) {
        setSessionTimeout(parseInt(storedTimeout))
      }
      
      if (sessionId && sessionExpiry && adminActive === 'true') {
        const now = Date.now()
        const expiry = parseInt(sessionExpiry)
        
        if (now < expiry) {
          setIsAdmin(true)
          setAdminSession({
            id: sessionId,
            timestamp: now,
            timeout: sessionTimeout
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

      // Create new admin session with current timeout setting
      const sessionId = `admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const expiryTime = Date.now() + (sessionTimeout * 60 * 1000) // timeout in minutes converted to ms
      
      localStorage.setItem('gaia-admin-session', sessionId)
      localStorage.setItem('gaia-admin-expiry', expiryTime.toString())
      localStorage.setItem('gaia-admin-timeout', sessionTimeout.toString())
      sessionStorage.setItem('admin-active', 'true')
      
      setIsAdmin(true)
      setAdminSession({
        id: sessionId,
        timestamp: Date.now(),
        timeout: sessionTimeout
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
    localStorage.removeItem('gaia-admin-timeout')
    localStorage.removeItem('gaia-admin-ip')
    sessionStorage.removeItem('admin-active')
    setIsAdmin(false)
    setAdminSession(null)
  }

  const extendSession = () => {
    if (isAdmin && adminSession) {
      const newExpiryTime = Date.now() + (sessionTimeout * 60 * 1000)
      localStorage.setItem('gaia-admin-expiry', newExpiryTime.toString())
    }
  }

  const updateSessionTimeout = (newTimeout: number) => {
    setSessionTimeout(newTimeout)
    localStorage.setItem('gaia-admin-timeout', newTimeout.toString())
    
    // Update current session expiry if admin is logged in
    if (isAdmin && adminSession) {
      const newExpiryTime = Date.now() + (newTimeout * 60 * 1000)
      localStorage.setItem('gaia-admin-expiry', newExpiryTime.toString())
      setAdminSession({
        ...adminSession,
        timeout: newTimeout
      })
    }
  }

  return {
    isAdmin,
    adminSession,
    isValidating,
    sessionTimeout,
    grantAdminAccess,
    revokeAdminAccess,
    extendSession,
    updateSessionTimeout,
    validateAdminSession
  }
}
