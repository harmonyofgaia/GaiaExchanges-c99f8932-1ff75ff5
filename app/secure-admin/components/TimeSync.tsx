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

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge 
        variant="outline" 
        className="border-green-500/50 text-green-400 bg-black/80 backdrop-blur-sm px-3 py-2"
      >
        <Clock className="h-3 w-3 mr-2" />
        <span className="font-mono text-sm">
          SYSTEM: {currentTime}
        </span>
      </Badge>
    </div>
  )
}