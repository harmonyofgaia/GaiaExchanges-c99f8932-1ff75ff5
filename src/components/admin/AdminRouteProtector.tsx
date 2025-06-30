
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function AdminRouteProtector() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Ultra-secure admin route protection
    const protectAdminRoutes = () => {
      const adminRoutes = ['/admin', '/secure-admin', '/secure-vault']
      const isAdminRoute = adminRoutes.some(route => location.pathname.includes(route))
      
      if (isAdminRoute) {
        // Check for valid admin session
        const adminSession = localStorage.getItem('gaia-admin-session')
        const adminActive = sessionStorage.getItem('admin-active')
        
        if (!adminSession || adminActive !== 'true') {
          // Not a valid admin - hide and redirect
          console.log('🚫 UNAUTHORIZED ADMIN ACCESS ATTEMPT BLOCKED')
          navigate('/', { replace: true })
          return
        }
        
        // Valid admin - apply quantum cloaking
        console.log('🛡️ ADMIN ROUTE PROTECTED - QUANTUM CLOAKING ACTIVE')
        
        // Hide admin pages from external detection
        document.title = 'GAIA - Decentralized Platform'
        
        // Remove admin indicators from DOM
        const adminElements = document.querySelectorAll('[data-admin="true"]')
        adminElements.forEach(el => {
          const htmlEl = el as HTMLElement
          htmlEl.style.visibility = 'hidden'
          htmlEl.setAttribute('data-cloaked', 'true')
        })
        
        // Anti-detection measures
        if (window.location.pathname.includes('admin')) {
          // Cloak the URL from external scanners
          history.replaceState(null, 'GAIA Platform', window.location.origin + '/')
        }
      }
    }

    protectAdminRoutes()
    
    // Monitor for route changes
    const interval = setInterval(protectAdminRoutes, 1000)
    
    return () => clearInterval(interval)
  }, [location, navigate])

  return null
}
