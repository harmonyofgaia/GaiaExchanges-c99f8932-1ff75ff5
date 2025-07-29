
import { useEffect, useState } from 'react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { toast } from 'sonner'

export function PersistentAdminSession() {
  const { isAdmin, adminSession } = useSecureAdmin()
  const [sessionActive, setSessionActive] = useState(false)

  useEffect(() => {
    // Create ultra-persistent admin session with quota management
    const createUltraPersistentSession = () => {
      if (isAdmin && adminSession) {
        try {
          // Lightweight session data to prevent quota issues
          const sessionData = {
            sessionId: adminSession.id,
            timestamp: adminSession.timestamp,
            persistent: true
          }
          
          // Clear old data first to prevent quota exceeded
          const keysToClean = ['gaia-admin-backup', 'admin-quantum-key']
          keysToClean.forEach(key => {
            try {
              localStorage.removeItem(key)
            } catch (e) {
              // Ignore cleanup errors
            }
          })
          
          // Store only essential data
          localStorage.setItem('gaia-admin-session', JSON.stringify(sessionData))
          sessionStorage.setItem('admin-active', 'true')
          
          setSessionActive(true)
          console.log('🛡️ ADMIN SESSION ACTIVATED')
        } catch (error) {
          console.warn('Storage quota exceeded, using minimal session')
          // Fallback: only use sessionStorage
          try {
            sessionStorage.setItem('admin-active', 'true')
            setSessionActive(true)
          } catch (e) {
            console.error('Critical: Cannot create admin session')
          }
        }
      }
    }

    // Simplified heartbeat to prevent quota issues
    const multiLayerHeartbeat = () => {
      if (isAdmin && adminSession) {
        try {
          const sessions = [
            localStorage.getItem('gaia-admin-session'),
            sessionStorage.getItem('admin-active')
          ]
          
          if (sessions.some(s => s)) {
            // Update timestamp only if storage allows
            const sessionData = {
              sessionId: adminSession.id,
              timestamp: Date.now(),
              persistent: true
            }
            
            localStorage.setItem('gaia-admin-session', JSON.stringify(sessionData))
            sessionStorage.setItem('admin-active', 'true')
            sessionStorage.setItem('admin-heartbeat', Date.now().toString())
            
            console.log('💗 ADMIN HEARTBEAT ACTIVE')
          }
        } catch (error) {
          // If localStorage fails, use sessionStorage only
          try {
            sessionStorage.setItem('admin-active', 'true')
          } catch (e) {
            console.warn('Storage quota exceeded, session may be limited')
          }
        }
      }
    }

    createUltraPersistentSession()
    
    // Reduced heartbeat frequency to prevent quota issues
    const interval1 = setInterval(multiLayerHeartbeat, 10000) // Every 10 seconds
    const interval2 = setInterval(multiLayerHeartbeat, 30000) // Every 30 seconds
    
    // Prevent any kind of session loss
    const preventLogout = () => {
      multiLayerHeartbeat()
    }
    
    // Listen for all possible session loss events
    window.addEventListener('beforeunload', preventLogout)
    window.addEventListener('pagehide', preventLogout)
    window.addEventListener('visibilitychange', preventLogout)
    window.addEventListener('focus', preventLogout)
    window.addEventListener('blur', preventLogout)
    document.addEventListener('click', preventLogout)
    document.addEventListener('keydown', preventLogout)
    
    // Navigation protection
    const protectNavigation = () => {
      if (sessionStorage.getItem('admin-active') === 'true') {
        multiLayerHeartbeat()
      }
    }
    
    // Monitor for navigation changes
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    
    history.pushState = function(...args) {
      protectNavigation()
      return originalPushState.apply(this, args)
    }
    
    history.replaceState = function(...args) {
      protectNavigation()
      return originalReplaceState.apply(this, args)
    }
    
    window.addEventListener('popstate', protectNavigation)
    
    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
      window.removeEventListener('beforeunload', preventLogout)
      window.removeEventListener('pagehide', preventLogout)
      window.removeEventListener('visibilitychange', preventLogout)
      window.removeEventListener('focus', preventLogout)
      window.removeEventListener('blur', preventLogout)
      document.removeEventListener('click', preventLogout)
      document.removeEventListener('keydown', preventLogout)
      window.removeEventListener('popstate', protectNavigation)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [isAdmin, adminSession])

  return null // Background service component
}
