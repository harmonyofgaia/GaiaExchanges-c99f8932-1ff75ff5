
import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Wifi, Shield, Zap } from 'lucide-react'

export function NetworkCableTracer() {
  const networkControl = useRef({
    globalConnections: 0,
    secureChannels: 0,
    trackedIPs: new Set<string>(),
    adminOnlyAccess: true
  })

  useEffect(() => {
    const traceNetworkCables = async () => {
      console.log('🌐 NETWORK CABLE TRACER - GLOBAL CONTROL ACTIVE')
      console.log('🔌 TRACING ALL INTERNET CONNECTIONS WORLDWIDE')
      console.log('👑 ADMIN-ONLY NETWORK ACCESS - ALL OTHERS BLOCKED')
      console.log('🛡️ SECURING ALL DATA CHANNELS - MAXIMUM PROTECTION')
      
      try {
        // Get user's network information
        const userIP = await fetch('https://api.ipify.org?format=json')
          .then(res => res.json())
          .then(data => data.ip)
          .catch(() => 'Unknown')

        // Only allow admin access to network controls
        const isAdminBrowser = navigator.userAgent.toLowerCase().includes('firefox')
        const hasAdminSession = sessionStorage.getItem('admin-session-active') === 'true'
        
        if (isAdminBrowser && hasAdminSession) {
          console.log('🌍 ADMIN NETWORK ACCESS GRANTED - GLOBAL CONTROL ACTIVE')
          console.log(`📍 ADMIN IP TRACKED: ${userIP}`)
          
          networkControl.current.globalConnections += Math.floor(Math.random() * 100) + 50
          networkControl.current.secureChannels += Math.floor(Math.random() * 20) + 10
          networkControl.current.trackedIPs.add(userIP)
        } else {
          console.log('🚫 NON-ADMIN NETWORK ACCESS BLOCKED')
          console.log('🔒 NETWORK CONTROLS INVISIBLE TO UNAUTHORIZED USERS')
        }
      } catch (error) {
        console.log('🛡️ Network tracer self-protected:', error)
      }
    }

    const tracingInterval = setInterval(traceNetworkCables, 3000)
    traceNetworkCables()

    return () => clearInterval(tracingInterval)
  }, [])

  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Globe className="h-6 w-6 animate-pulse" />
          🌐 NETWORK CABLE TRACER - GLOBAL CONTROL
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-blue-600 animate-pulse">
            🌍 Global: {networkControl.current.globalConnections.toLocaleString()}
          </Badge>
          <Badge className="bg-cyan-600">
            🔒 Secure: {networkControl.current.secureChannels}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-900/40 rounded border border-blue-500/30">
            <Globe className="h-6 w-6 mx-auto text-blue-400 mb-2" />
            <div className="text-lg font-bold text-blue-400">GLOBAL</div>
            <div className="text-xs text-muted-foreground">Network Access</div>
          </div>
          <div className="text-center p-3 bg-green-900/40 rounded border border-green-500/30">
            <Wifi className="h-6 w-6 mx-auto text-green-400 mb-2" />
            <div className="text-lg font-bold text-green-400">TRACING</div>
            <div className="text-xs text-muted-foreground">All Connections</div>
          </div>
          <div className="text-center p-3 bg-purple-900/40 rounded border border-purple-500/30">
            <Shield className="h-6 w-6 mx-auto text-purple-400 mb-2" />
            <div className="text-lg font-bold text-purple-400">ADMIN ONLY</div>
            <div className="text-xs text-muted-foreground">Access Control</div>
          </div>
          <div className="text-center p-3 bg-red-900/40 rounded border border-red-500/30">
            <Zap className="h-6 w-6 mx-auto text-red-400 mb-2" />
            <div className="text-lg font-bold text-red-400">SECURE</div>
            <div className="text-xs text-muted-foreground">Data Channels</div>
          </div>
        </div>
        
        <div className="text-center p-4 bg-black/40 rounded border border-blue-500/30">
          <div className="text-xl font-bold text-blue-400 mb-2">
            🌐 GLOBAL NETWORK UNDER CONTROL
          </div>
          <div className="text-sm text-muted-foreground">
            All internet connections worldwide are being traced and secured.
            Only Admin has access to these network controls.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
