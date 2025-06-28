
import { useState, useEffect } from 'react'

interface AdminSession {
  isAdmin: boolean
  sessionToken: string | null
  isValidating: boolean
}

export function useSecureAdmin() {
  const [adminSession, setAdminSession] = useState<AdminSession>({
    isAdmin: false,
    sessionToken: null,
    isValidating: true
  })

  useEffect(() => {
    // Check for valid admin session
    const adminToken = localStorage.getItem('secure_admin_token')
    const adminIP = localStorage.getItem('admin_verified_ip')
    const sessionExpiry = localStorage.getItem('admin_session_expiry')
    
    if (adminToken && adminIP && sessionExpiry) {
      const now = new Date().getTime()
      if (now < parseInt(sessionExpiry)) {
        // Valid session exists
        setAdminSession({
          isAdmin: true,
          sessionToken: adminToken,
          isValidating: false
        })
      } else {
        // Session expired
        localStorage.removeItem('secure_admin_token')
        localStorage.removeItem('admin_verified_ip')
        localStorage.removeItem('admin_session_expiry')
        setAdminSession({
          isAdmin: false,
          sessionToken: null,
          isValidating: false
        })
      }
    } else {
      // No valid session
      setAdminSession({
        isAdmin: false,
        sessionToken: null,
        isValidating: false
      })
    }
  }, [])

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Credentials are validated in the SecureAdminLogin component
    return username === 'Synatic' && password === 'Synatic!oul1992'
  }

  const adminLogout = () => {
    localStorage.removeItem('secure_admin_token')
    localStorage.removeItem('admin_verified_ip')
    localStorage.removeItem('admin_session_expiry')
    setAdminSession({
      isAdmin: false,
      sessionToken: null,
      isValidating: false
    })
  }

  const refreshSession = () => {
    // Extend session by 24 hours
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000)
    localStorage.setItem('admin_session_expiry', expiry.toString())
  }

  return {
    ...adminSession,
    adminLogin,
    adminLogout,
    refreshSession
  }
}
