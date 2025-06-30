
import { useState, useEffect } from 'react'

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    const checkAdminStatus = () => {
      const isFirefoxBrowser = navigator.userAgent.toLowerCase().includes('firefox')
      const hasAdminSession = sessionStorage.getItem('admin-session-active') === 'true'
      const isAdminLoggedIn = localStorage.getItem('admin-logged-in') === 'true'
      
      const adminStatus = isFirefoxBrowser && hasAdminSession && isAdminLoggedIn
      setIsAdmin(adminStatus)
      setIsValidating(false)
      
      if (adminStatus) {
        console.log('👑 ADMIN ACCESS CONFIRMED - ALL FEATURES UNLOCKED')
      }
    }

    checkAdminStatus()
    
    // Check admin status every 5 seconds
    const interval = setInterval(checkAdminStatus, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const grantAdminAccess = () => {
    const isFirefoxBrowser = navigator.userAgent.toLowerCase().includes('firefox')
    
    if (isFirefoxBrowser) {
      sessionStorage.setItem('admin-session-active', 'true')
      localStorage.setItem('admin-logged-in', 'true')
      setIsAdmin(true)
      console.log('👑 ADMIN ACCESS GRANTED - GOD MODE ACTIVATED')
    }
  }

  const revokeAdminAccess = () => {
    sessionStorage.removeItem('admin-session-active')
    localStorage.removeItem('admin-logged-in')
    setIsAdmin(false)
    console.log('🚪 ADMIN ACCESS REVOKED')
  }

  return {
    isAdmin,
    isValidating,
    grantAdminAccess,
    revokeAdminAccess
  }
}
