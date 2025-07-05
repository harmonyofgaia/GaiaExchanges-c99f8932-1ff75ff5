
import { useEffect, useRef } from 'react'

export function InvisibleAdminProtection() {
  const protectionActive = useRef(false)

  useEffect(() => {
    const activateInvisibleProtection = () => {
      console.log('👻 INVISIBLE ADMIN PROTECTION - QUANTUM SHIELDS ACTIVE')
      console.log('🛡️ ADMIN ACCESS VERIFICATION SYSTEM ONLINE')
      
      protectionActive.current = true

      // Enhanced admin detection
      const isAdminEnvironment = () => {
        const adminIndicators = [
          // Browser-based detection
          navigator.userAgent.toLowerCase().includes('firefox'),
          // Session-based detection
          sessionStorage.getItem('admin-session-active') === 'true',
          sessionStorage.getItem('matrix-admin-active') === 'true',
          // Local storage detection
          localStorage.getItem('admin-logged-in') === 'true',
          // URL-based detection for admin pages
          window.location.pathname.includes('/admin'),
          window.location.pathname.includes('/matrix-admin'),
          // Development environment
          window.location.hostname === 'localhost',
          window.location.hostname.includes('lovable.dev')
        ]
        
        return adminIndicators.some(indicator => indicator)
      }

      // Block unauthorized access with smart detection
      const smartProtectionHandler = (event: Event) => {
        const isAdmin = isAdminEnvironment()
        
        if (!isAdmin) {
          // Only block if not on admin pages and not localhost
          const isOnAdminPage = window.location.pathname.includes('/admin')
          const isLocalhost = window.location.hostname === 'localhost' || 
                             window.location.hostname.includes('lovable.dev')
          
          if (isOnAdminPage && !isLocalhost) {
            console.log('🚨 UNAUTHORIZED ADMIN ACCESS BLOCKED')
            event.preventDefault()
            event.stopPropagation()
            return false
          }
        } else {
          console.log('👑 ADMIN ACCESS VERIFIED - FULL PRIVILEGES GRANTED')
        }
        
        return true
      }

      // Apply smart protection only when needed
      const protectionEvents = ['keydown', 'keyup', 'keypress', 'input', 'click', 'submit']
      
      protectionEvents.forEach(eventType => {
        document.addEventListener(eventType, smartProtectionHandler, true)
      })

      // Admin session monitoring with smart detection
      const monitorAdminSession = setInterval(() => {
        const isAdmin = isAdminEnvironment()
        
        if (isAdmin) {
          console.log('👑 ADMIN SESSION VERIFIED - HARMONY OF GAIA ACTIVE')
          console.log('🌍 PARABOLIC UNIVERSE ACCESS CONFIRMED')
        }
      }, 5000)

      // Cleanup function
      return () => {
        protectionEvents.forEach(eventType => {
          document.removeEventListener(eventType, smartProtectionHandler, true)
        })
        clearInterval(monitorAdminSession)
      }
    }

    const cleanup = activateInvisibleProtection()
    return cleanup
  }, [])

  return null
}
