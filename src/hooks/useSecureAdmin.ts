
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    // Check for existing admin session
    const checkAdminStatus = () => {
      try {
        const adminSession = localStorage.getItem('gaia_admin_session')
        const sessionExpiry = localStorage.getItem('gaia_admin_expiry')
        
        if (adminSession && sessionExpiry) {
          const expiryTime = parseInt(sessionExpiry)
          const currentTime = Date.now()
          
          if (currentTime < expiryTime) {
            // Valid admin session exists
            setIsAdmin(true)
            console.log('🌍 Valid GAIA Admin Session Found')
          } else {
            // Session expired
            localStorage.removeItem('gaia_admin_session')
            localStorage.removeItem('gaia_admin_expiry')
            setIsAdmin(false)
            console.log('🔒 Admin Session Expired')
          }
        } else {
          setIsAdmin(false)
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      } finally {
        setIsValidating(false)
      }
    }

    checkAdminStatus()

    // Check session every 5 minutes
    const interval = setInterval(checkAdminStatus, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const grantAdminAccess = () => {
    try {
      const sessionToken = `gaia_admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      
      localStorage.setItem('gaia_admin_session', sessionToken)
      localStorage.setItem('gaia_admin_expiry', expiryTime.toString())
      
      setIsAdmin(true)
      
      toast.success('🔐 GAIA Admin Access Granted!', {
        description: 'Full vault access activated for 24 hours',
        duration: 5000
      })
    } catch (error) {
      console.error('Error granting admin access:', error)
      toast.error('Failed to grant admin access')
    }
  }

  const revokeAdminAccess = () => {
    try {
      localStorage.removeItem('gaia_admin_session')
      localStorage.removeItem('gaia_admin_expiry')
      setIsAdmin(false)
      
      toast.success('🔒 Admin Session Ended', {
        description: 'Secure logout completed',
        duration: 3000
      })
    } catch (error) {
      console.error('Error revoking admin access:', error)
    }
  }

  return {
    isAdmin,
    isValidating,
    grantAdminAccess,
    revokeAdminAccess
  }
}
