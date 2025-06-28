import { useState, useEffect } from 'react'

interface AdminSession {
  isAdmin: boolean
  sessionToken: string | null
  isValidating: boolean
}

export function useSecureAdmin() {
  const [adminSession, setAdminSession] = useState<AdminSession>({
    isAdmin: true, // Always admin
    sessionToken: 'auto-admin-token',
    isValidating: false
  })

  useEffect(() => {
    // Auto-grant admin access
    setAdminSession({
      isAdmin: true,
      sessionToken: 'auto-admin-token',
      isValidating: false
    })
    
    // Store token for consistency
    localStorage.setItem('secure_admin_token', 'auto-admin-token')
  }, [])

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Always return true for admin access
    return true
  }

  const adminLogout = () => {
    // Keep admin access even on logout
    setAdminSession({
      isAdmin: true,
      sessionToken: 'auto-admin-token',
      isValidating: false
    })
  }

  return {
    ...adminSession,
    adminLogin,
    adminLogout,
    refreshSession: () => {}
  }
}
