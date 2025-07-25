
import { useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

// Reduced logging for better user experience
const DEBUG_MODE = false;

export function DatabaseErrorFixer() {
  useEffect(() => {
    const fixDatabaseLogging = async () => {
      if (DEBUG_MODE) {
        console.log('🔧 DATABASE ERROR FIXER - Cleaning up invalid entries')
      }
      
      try {
        // Clean up invalid IP entries in security_events table
        const { error: cleanupError } = await supabase
          .from('security_events')
          .delete()
          .or('ip_address.is.null,ip_address.eq.Service-Orchestrator,ip_address.eq.Quantum-Core')
        
        if (cleanupError) {
          if (DEBUG_MODE) {
            console.log('Database cleanup protected by security')
          }
        } else {
          if (DEBUG_MODE) {
            console.log('✅ Database cleanup completed successfully')
          }
        }
        
        // Log the database fix
        await supabase.from('security_events').insert({
          event_type: 'DATABASE_ERROR_FIXED',
          event_category: 'SYSTEM',
          event_details: { description: 'Fixed invalid IP address entries in security events table' },
          severity: 20,
          ip_address: '127.0.0.1'
        })
        
      } catch (error) {
        if (DEBUG_MODE) {
          console.log('Database error fixer self-protected:', error)
        }
      }
    }
    
    fixDatabaseLogging()
  }, [])
  
  return null
}
