'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

interface TimeSyncProps {
  systemTime: {
    hour: number
    minute: number
    date: string
  }
}

export function TimeSync({ systemTime }: TimeSyncProps) {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    // Only run on client side to avoid SSR issues
    if (typeof window === 'undefined') return

    // Set and maintain system time for all secure-admin processes
    const updateTime = () => {
      const timeString = `${systemTime.hour.toString().padStart(2, '0')}:${systemTime.minute.toString().padStart(2, '0')}`
      setCurrentTime(`${timeString} | ${systemTime.date}`)
      
      // Log time sync for security monitoring
      console.log(`[TIME-SYNC] Secure admin time: ${timeString}, Date: ${systemTime.date}`)
    }

    updateTime()
    
    // Update time display every second while maintaining the fixed system time
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [systemTime])

  // Time sync runs in background - no visible UI elements
  return null
}