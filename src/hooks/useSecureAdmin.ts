
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

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
    checkAdminSession()
  }, [])

  const checkAdminSession = async () => {
    try {
      // Check if there's an existing session token
      const existingToken = localStorage.getItem('secure_admin_token')
      
      if (existingToken) {
        // Validate existing session
        const { data, error } = await supabase.rpc('validate_admin_session', {
          token: existingToken,
          client_ip: await getClientIP()
        })
        
        if (data && !error) {
          setAdminSession({
            isAdmin: true,
            sessionToken: existingToken,
            isValidating: false
          })
          return
        } else {
          localStorage.removeItem('secure_admin_token')
        }
      }
      
      setAdminSession({
        isAdmin: false,
        sessionToken: null,
        isValidating: false
      })
    } catch (error) {
      console.error('Admin session check failed:', error)
      setAdminSession({
        isAdmin: false,
        sessionToken: null,
        isValidating: false
      })
    }
  }

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      // Validate credentials
      if (username !== 'Synatic' || password !== 'Freedom!oul1992') {
        return false
      }

      // Create admin session
      const { data: sessionToken, error } = await supabase.rpc('create_admin_session', {
        client_ip: await getClientIP(),
        client_user_agent: navigator.userAgent,
        client_fingerprint: generateDeviceFingerprint()
      })

      if (error || !sessionToken) {
        console.error('Failed to create admin session:', error)
        return false
      }

      // Store session token securely
      localStorage.setItem('secure_admin_token', sessionToken)
      
      setAdminSession({
        isAdmin: true,
        sessionToken,
        isValidating: false
      })

      return true
    } catch (error) {
      console.error('Admin login failed:', error)
      return false
    }
  }

  const adminLogout = () => {
    localStorage.removeItem('secure_admin_token')
    setAdminSession({
      isAdmin: false,
      sessionToken: null,
      isValidating: false
    })
  }

  return {
    ...adminSession,
    adminLogin,
    adminLogout,
    refreshSession: checkAdminSession
  }
}

// Helper functions
async function getClientIP(): Promise<string> {
  try {
    // In a real application, you would get this from your server
    // For now, return a placeholder
    return '127.0.0.1'
  } catch {
    return '127.0.0.1'
  }
}

function generateDeviceFingerprint(): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText('Admin Security Check', 2, 2)
  }
  
  return btoa(
    navigator.userAgent + 
    navigator.language + 
    screen.width + 'x' + screen.height + 
    new Date().getTimezoneOffset() +
    (canvas.toDataURL() || '')
  )
}
