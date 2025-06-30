import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'

export function PersistentAdminSession() {
  const { user } = useAuth()
  const [sessionActive, setSessionActive] = useState(false)

  useEffect(() => {
    // Create persistent admin session that doesn't timeout
    const createPersistentSession = () => {
      if (user) {
        // Store persistent admin session
        localStorage.setItem('gaia-admin-session', JSON.stringify({
          userId: user.id,
          email: user.email,
          timestamp: Date.now(),
          persistent: true
        }))
        
        sessionStorage.setItem('admin-active', 'true')
        setSessionActive(true)
        
        console.log('🛡️ PERSISTENT ADMIN SESSION ACTIVATED')
        console.log('👑 UNLIMITED SESSION TIME - NO TIMEOUT')
      }
    }

    // Keep session alive continuously
    const keepSessionAlive = () => {
      if (user) {
        const session = localStorage.getItem('gaia-admin-session')
        if (session) {
          // Refresh session timestamp
          const sessionData = JSON.parse(session)
          sessionData.timestamp = Date.now()
          localStorage.setItem('gaia-admin-session', JSON.stringify(sessionData))
          
          // Keep browser session active
          sessionStorage.setItem('admin-heartbeat', Date.now().toString())
          
          console.log('💗 ADMIN SESSION HEARTBEAT - STAYING ALIVE')
        }
      }
    }

    createPersistentSession()
    
    // Keep session alive every 5 seconds
    const interval = setInterval(keepSessionAlive, 5000)
    
    // Prevent page unload from killing session
    const handleBeforeUnload = () => {
      keepSessionAlive()
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [user])

  return null // This is a background service component
}
