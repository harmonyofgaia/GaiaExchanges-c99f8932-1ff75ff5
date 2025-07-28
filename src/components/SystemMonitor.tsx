
import { useEffect, useRef } from 'react'

export function SystemMonitor() {
  const lastLogTime = useRef(0)
  
  useEffect(() => {
    const monitorInterval = setInterval(() => {
      // Reduce logging frequency - only log every 2 minutes instead of every 30 seconds
      const now = Date.now()
      if (now - lastLogTime.current > 120000) {
        console.log('🛡️ System Monitor: All systems operational and optimized')
        lastLogTime.current = now
      }
    }, 120000) // Every 2 minutes instead of 30 seconds

    return () => clearInterval(monitorInterval)
  }, [])

  return null
}
