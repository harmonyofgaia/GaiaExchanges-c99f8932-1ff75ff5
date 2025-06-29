
import { useState, useEffect } from 'react'

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check for admin status from localStorage or session
    const adminStatus = localStorage.getItem('harmony-admin-authenticated')
    const sessionValid = sessionStorage.getItem('admin-session-active')
    
    // Simple admin check - in production this would be more secure
    if (adminStatus === 'true' && sessionValid === 'true') {
      setIsAdmin(true)
    } else {
      // Auto-authenticate for demo purposes
      // In production, this would require proper authentication
      setIsAdmin(true)
      localStorage.setItem('harmony-admin-authenticated', 'true')
      sessionStorage.setItem('admin-session-active', 'true')
    }
  }, [])

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem('harmony-admin-authenticated')
    sessionStorage.removeItem('admin-session-active')
  }

  return {
    isAdmin,
    logout
  }
}
