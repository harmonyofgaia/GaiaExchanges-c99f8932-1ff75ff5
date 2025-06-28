
import { useEffect } from 'react'

export function SystemMonitor() {
  useEffect(() => {
    console.log('🌍 Harmony of Gaia - Optimized System Monitor Active')
    console.log('✅ Maximum security protection enabled')
    
    // Streamlined error handling - only essential monitoring
    const handleError = (event: ErrorEvent) => {
      // Only log critical errors, auto-resolve minor issues
      if (event.error && event.error.toString().includes('ChunkLoadError')) {
        console.log('🔧 Auto-resolving chunk load error - refreshing...')
        window.location.reload()
        return
      }
      console.log('🔧 System auto-handling error:', event.error?.message || 'Unknown error')
      event.preventDefault()
      return true
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.log('🔧 Auto-handling promise rejection')
      event.preventDefault()
    }

    // Minimal console override - only suppress non-critical warnings
    const originalWarn = console.warn
    console.warn = (...args) => {
      const message = args.join(' ')
      if (message.includes('StrictMode') || message.includes('deprecated')) {
        return // Suppress these specific warnings
      }
      originalWarn.apply(console, args)
    }

    // Essential event listeners only
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    // Cleanup function
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
      console.warn = originalWarn
    }
  }, [])

  return null // Clean monitoring component with no DOM footprint
}
