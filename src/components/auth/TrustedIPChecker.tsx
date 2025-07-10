
import { useEffect, useState } from 'react'

interface TrustedIPCheckerProps {
  onIPCheck: (isTrusted: boolean, userIP: string) => void
}

export function TrustedIPChecker({ onIPCheck }: TrustedIPCheckerProps) {
  useEffect(() => {
    const checkTrustedIP = async () => {
      try {
        console.log('🔒 CHECKING TRUSTED IP ACCESS')
        
        // Get user's IP address
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        const userIP = data.ip
        
        console.log('🌐 USER IP:', userIP)
        
        // Your trusted IPs - add your actual IPs here
        const trustedIPs = [
          '10.13.125.207', // Your Redmi tablet
          '192.168.1.100', // Your laptop
          '192.168.1.101', // Backup device
          '127.0.0.1',     // localhost
        ]
        
        // Check if current IP is in trusted list
        const isTrusted = trustedIPs.includes(userIP) || 
                         userIP.startsWith('192.168.') ||
                         userIP.startsWith('10.') ||
                         window.location.hostname === 'localhost'
        
        console.log('🛡️ TRUST STATUS:', isTrusted ? 'TRUSTED ADMIN' : 'REGULAR USER')
        
        onIPCheck(isTrusted, userIP)
        
      } catch (error) {
        console.log('⚠️ IP check failed, checking localhost')
        const isLocalhost = window.location.hostname === 'localhost'
        onIPCheck(isLocalhost, 'localhost')
      }
    }

    checkTrustedIP()
  }, [onIPCheck])

  return null
}
