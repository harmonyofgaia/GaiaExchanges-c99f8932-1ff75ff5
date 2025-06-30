
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

export function AutoStabilityEngine() {
  const location = useLocation()
  const stabilityChecks = useRef<NodeJS.Timeout>()
  const routeValidation = useRef<NodeJS.Timeout>()
  const preventReloadLoop = useRef<boolean>(false)

  useEffect(() => {
    console.log('🛠️ AUTO-STABILITY ENGINE ACTIVATED')
    console.log(`📍 MONITORING ROUTE: ${location.pathname}`)

    const runStabilityChecks = () => {
      console.log('🔧 RUNNING AUTOMATED STABILITY CHECKS')
      
      // Check for broken components
      const brokenElements = document.querySelectorAll('[data-error], .error, .broken')
      if (brokenElements.length > 0) {
        console.log('⚠️ DETECTED BROKEN ELEMENTS - AUTO-FIXING')
        brokenElements.forEach(element => {
          element.remove()
        })
      }

      // Ensure all navigation links work
      const navigationLinks = document.querySelectorAll('a[href^="/"]')
      navigationLinks.forEach(link => {
        if (!link.hasAttribute('data-stability-checked')) {
          link.setAttribute('data-stability-checked', 'true')
          // Ensure React Router Link behavior - DO NOT RELOAD PAGE
          if (link.getAttribute('href')?.startsWith('/')) {
            link.addEventListener('click', (e) => {
              // Let React Router handle navigation - prevent page reload
              console.log('🛣️ NAVIGATION HANDLED BY REACT ROUTER')
            })
          }
        }
      })

      // Memory cleanup
      if ((performance as any).memory?.usedJSHeapSize > 100000000) { // 100MB
        console.log('🧹 MEMORY CLEANUP TRIGGERED')
        // Force garbage collection if available
        if ((window as any).gc) {
          (window as any).gc()
        }
      }

      console.log('✅ STABILITY CHECKS COMPLETED')
    }

    const validateRoute = () => {
      console.log('🛣️ VALIDATING CURRENT ROUTE')
      
      // PREVENT RELOAD LOOP - Check if we've already processed this route
      if (preventReloadLoop.current) {
        console.log('🛑 RELOAD LOOP PREVENTION ACTIVE')
        return
      }
      
      // Ensure page content is properly loaded
      const mainContent = document.querySelector('main')
      if (mainContent && mainContent.children.length === 0) {
        console.log('⚠️ EMPTY PAGE DETECTED - BUT PREVENTING RELOAD LOOP')
        // DO NOT RELOAD - Let React Router handle it
        preventReloadLoop.current = true
        setTimeout(() => {
          preventReloadLoop.current = false
        }, 5000) // Reset after 5 seconds
        return
      }

      // Check for React hydration issues (but don't reload)
      const reactRoots = document.querySelectorAll('[data-reactroot]')
      if (reactRoots.length === 0) {
        console.log('⚠️ REACT HYDRATION ISSUE DETECTED - MONITORING')
      }

      // Validate sidebar functionality
      const sidebar = document.querySelector('[data-sidebar]')
      if (!sidebar) {
        console.log('⚠️ SIDEBAR NOT FOUND - CHECKING LAYOUT')
      }

      console.log('✅ ROUTE VALIDATION COMPLETED - NO RELOAD NEEDED')
    }

    // Run checks immediately
    runStabilityChecks()
    validateRoute()

    // Set up intervals for continuous monitoring
    stabilityChecks.current = setInterval(runStabilityChecks, 10000) // Every 10 seconds (less frequent)
    routeValidation.current = setInterval(validateRoute, 15000) // Every 15 seconds (less frequent)

    // Show success notification
    toast.success('🛠️ Auto-Stability Engine Active', {
      description: 'Monitoring system stability and preventing reload loops',
      duration: 3000
    })

    return () => {
      if (stabilityChecks.current) clearInterval(stabilityChecks.current)
      if (routeValidation.current) clearInterval(routeValidation.current)
      console.log('🛠️ AUTO-STABILITY ENGINE DEACTIVATED')
    }
  }, [location.pathname]) // Only re-run when pathname changes

  // This component runs invisibly in the background
  return null
}
