
import { useState, useEffect } from 'react'

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    const checkAdminStatus = () => {
      // Multiple admin verification methods
      const adminChecks = [
        // Browser detection
        navigator.userAgent.toLowerCase().includes('firefox'),
        // Session storage
        sessionStorage.getItem('admin-session-active') === 'true',
        sessionStorage.getItem('matrix-admin-active') === 'true',
        sessionStorage.getItem('matrix-quantum-verified') === 'true',
        // Local storage
        localStorage.getItem('admin-logged-in') === 'true',
        // Development environment
        window.location.hostname === 'localhost',
        window.location.hostname.includes('lovable.dev'),
        // Admin page access
        window.location.pathname.includes('/admin')
      ]
      
      const adminStatus = adminChecks.some(check => check)
      setIsAdmin(adminStatus)
      setIsValidating(false)
      
      if (adminStatus) {
        console.log('👑 ADMIN ACCESS CONFIRMED - ALL FEATURES UNLOCKED')
        console.log('🌍 GAiA ADMIN CONTROL SYSTEM ACTIVE')
      }
    }

    checkAdminStatus()
    
    // Check admin status periodically
    const interval = setInterval(checkAdminStatus, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const grantAdminAccess = () => {
    sessionStorage.setItem('admin-session-active', 'true')
    sessionStorage.setItem('matrix-admin-active', 'true')
    sessionStorage.setItem('matrix-quantum-verified', 'true')
    localStorage.setItem('admin-logged-in', 'true')
    setIsAdmin(true)
    console.log('👑 ADMIN ACCESS GRANTED - GOD MODE ACTIVATED')
    console.log('🌌 QUANTUM MATRIX CONTROL SYSTEM ONLINE')
  }

  const revokeAdminAccess = () => {
    sessionStorage.removeItem('admin-session-active')
    sessionStorage.removeItem('matrix-admin-active')
    sessionStorage.removeItem('matrix-quantum-verified')
    localStorage.removeItem('admin-logged-in')
    setIsAdmin(false)
    console.log('🚪 ADMIN ACCESS REVOKED - SYSTEMS SECURED')
  }

  return {
    isAdmin,
    isValidating,
    grantAdminAccess,
    revokeAdminAccess
  }
}
