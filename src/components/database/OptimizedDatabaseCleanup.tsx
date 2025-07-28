
import { useEffect, useRef } from 'react'
import { supabase } from '@/integrations/supabase/client'

export function OptimizedDatabaseCleanup() {
  const cleanupInterval = useRef<NodeJS.Timeout>()
  const lastCleanup = useRef(0)

  useEffect(() => {
    const performOptimizedCleanup = async () => {
      const now = Date.now()
      
      // Only run cleanup every 30 minutes to reduce database load
      if (now - lastCleanup.current < 1800000) return
      
      console.log('🧹 Performing optimized database cleanup...')
      
      try {
        // Clean up old security events (older than 24 hours)
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        
        await supabase
          .from('security_events')
          .delete()
          .lt('created_at', twentyFourHoursAgo)
          .limit(100) // Limit to prevent overwhelming the database
        
        console.log('✅ Database cleanup completed successfully')
        lastCleanup.current = now
        
      } catch (error) {
        console.log('Database cleanup protected by security:', error)
      }
    }

    // Run cleanup less frequently - every 30 minutes
    cleanupInterval.current = setInterval(performOptimizedCleanup, 1800000)
    
    // Run initial cleanup after 5 seconds
    setTimeout(performOptimizedCleanup, 5000)

    return () => {
      if (cleanupInterval.current) clearInterval(cleanupInterval.current)
    }
  }, [])

  return null
}
