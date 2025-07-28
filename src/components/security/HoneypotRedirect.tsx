
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function HoneypotRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const protectRealAdminRoutes = () => {
      // Real admin routes that should be protected
      const realAdminRoutes = ['/admin', '/secure-admin', '/secure-vault']
      const isRealAdminRoute = realAdminRoutes.some(route => location.pathname.includes(route))
      
      if (isRealAdminRoute) {
        // Check if this is a legitimate admin
        const isRealAdmin = sessionStorage.getItem('admin-session-active') === 'true'
        const isAdminBrowser = navigator.userAgent.toLowerCase().includes('firefox')
        
        if (!isRealAdmin || !isAdminBrowser) {
          // This is likely an attacker - redirect to honeypot
          console.log('🚨 POTENTIAL ATTACKER DETECTED - REDIRECTING TO HONEYPOT')
          console.log('🍯 Sending hacker to fake admin page')
          
          // Log the attempt
          const suspiciousActivity = {
            timestamp: new Date().toISOString(),
            attemptedRoute: location.pathname,
            userAgent: navigator.userAgent,
            redirectedToHoneypot: true
          }
          
          const existingLogs = JSON.parse(localStorage.getItem('security-redirects') || '[]')
          existingLogs.push(suspiciousActivity)
          localStorage.setItem('security-redirects', JSON.stringify(existingLogs))
          
          // Redirect to honeypot
          navigate('/admin-login', { replace: true })
          return
        }
        
        console.log('✅ LEGITIMATE ADMIN ACCESS CONFIRMED')
      }
      
      // Also protect against direct admin-login access by real admin
      if (location.pathname === '/admin-login' && sessionStorage.getItem('admin-session-active') === 'true') {
        console.log('👑 REAL ADMIN ACCESSING HONEYPOT - REDIRECTING TO REAL DASHBOARD')
        navigate('/secure-admin', { replace: true })
      }
    }

    protectRealAdminRoutes()
  }, [location, navigate])

  return null
}
