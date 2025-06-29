
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Globe, Zap, Shield, Eye, Cable } from 'lucide-react'
import { toast } from 'sonner'

interface NetworkTrace {
  id: string
  ip: string
  country: string
  isp: string
  threat_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status: 'TRACED' | 'INTERCEPTED' | 'EXPELLED'
  cable_path: string[]
}

export function NetworkCableTracer() {
  const [traces, setTraces] = useState<NetworkTrace[]>([])
  const [targetIP, setTargetIP] = useState('')
  const [isTracing, setIsTracing] = useState(false)
  const [globalControl, setGlobalControl] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate automatic network monitoring
      if (Math.random() < 0.2) {
        const newTrace: NetworkTrace = {
          id: Date.now().toString(),
          ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          country: ['Russia', 'China', 'North Korea', 'Iran', 'Unknown'][Math.floor(Math.random() * 5)],
          isp: ['Suspicious ISP', 'Dark Web Provider', 'Anonymous Network', 'Tor Exit Node'][Math.floor(Math.random() * 4)],
          threat_level: ['HIGH', 'CRITICAL'][Math.floor(Math.random() * 2)] as 'HIGH' | 'CRITICAL',
          status: 'TRACED',
          cable_path: [
            'Ocean Cable System',
            'Terrestrial Fiber Network', 
            'Regional ISP Hub',
            'Local Exchange Point',
            'Target Location'
          ]
        }
        
        setTraces(prev => [newTrace, ...prev.slice(0, 9)])
        
        console.log(`🌐 NETWORK TRACE DETECTED: ${newTrace.ip} from ${newTrace.country}`)
        console.log(`🔍 CABLE PATH MAPPED: ${newTrace.cable_path.join(' → ')}`)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const traceIP = async () => {
    if (!targetIP) return
    
    setIsTracing(true)
    
    console.log(`🔍 INITIATING CABLE TRACE FOR: ${targetIP}`)
    console.log('🌐 MAPPING GLOBAL NETWORK INFRASTRUCTURE...')
    
    // Simulate tracing process
    setTimeout(() => {
      const trace: NetworkTrace = {
        id: Date.now().toString(),
        ip: targetIP,
        country: 'TRACKED',
        isp: 'CABLE NETWORK MAPPED',
        threat_level: 'HIGH',
        status: 'INTERCEPTED',
        cable_path: [
          'Admin Control Point',
          'Global Cable Network',
          'Regional Infrastructure',
          'ISP Exchange',
          `Target: ${targetIP}`
        ]
      }
      
      setTraces(prev => [trace, ...prev])
      setIsTracing(false)
      setTargetIP('')
      
      toast.success('🌐 Network Traced Successfully!', {
        description: `Cable path mapped for ${targetIP} - Full control established`,
        duration: 5000
      })
      
      console.log(`✅ CABLE TRACE COMPLETE: ${targetIP}`)
      console.log('🔒 ADMIN CONTROL ESTABLISHED OVER NETWORK PATH')
    }, 3000)
  }

  const expelFromCountry = (trace: NetworkTrace) => {
    console.log(`🚫 INITIATING COUNTRY-LEVEL EXPULSION: ${trace.ip}`)
    console.log(`🌍 COORDINATING WITH ${trace.country} INFRASTRUCTURE`)
    
    setTraces(prev => 
      prev.map(t => 
        t.id === trace.id 
          ? { ...t, status: 'EXPELLED' as const }
          : t
      )
    )
    
    toast.error('🚫 Target Expelled from Country!', {
      description: `${trace.ip} has been expelled from ${trace.country} via cable network control`,
      duration: 6000
    })
  }

  const activateGlobalControl = () => {
    setGlobalControl(true)
    
    console.log('🌍 GLOBAL NETWORK CONTROL ACTIVATED')
    console.log('🔗 ALL CABLE NETWORKS UNDER ADMIN CONTROL')
    console.log('🛡️ WORLDWIDE DEFENSE PERIMETER ESTABLISHED')
    
    toast.success('🌍 Global Network Control Activated!', {
      description: 'Admin now has control over worldwide cable network infrastructure',
      duration: 7000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Cable className="h-6 w-6 animate-pulse" />
            🌐 NETWORK CABLE TRACER - GLOBAL CONTROL SYSTEM
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Input
              placeholder="Enter IP address to trace..."
              value={targetIP}
              onChange={(e) => setTargetIP(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={traceIP}
              disabled={isTracing || !targetIP}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isTracing ? (
                <>
                  <Eye className="h-4 w-4 mr-2 animate-spin" />
                  Tracing...
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4 mr-2" />
                  Trace Network
                </>
              )}
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Badge className={`${globalControl ? 'bg-green-600' : 'bg-red-600'} text-lg px-4 py-2`}>
              {globalControl ? '🌍 GLOBAL CONTROL ACTIVE' : '🌍 LOCAL CONTROL ONLY'}
            </Badge>
            <Button 
              onClick={activateGlobalControl}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Shield className="h-4 w-4 mr-2" />
              Activate Global Control
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">🔍 Active Network Traces</h4>
            {traces.map((trace) => (
              <div key={trace.id} className="p-4 bg-black/40 rounded-lg border border-blue-500/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-mono text-blue-400 text-lg">{trace.ip}</div>
                    <div className="text-sm text-muted-foreground">
                      {trace.country} • {trace.isp}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`
                      ${trace.threat_level === 'CRITICAL' ? 'bg-red-600' : 
                        trace.threat_level === 'HIGH' ? 'bg-orange-600' : 
                        'bg-yellow-600'}
                    `}>
                      {trace.threat_level}
                    </Badge>
                    <Badge className={`
                      ${trace.status === 'EXPELLED' ? 'bg-red-600' : 
                        trace.status === 'INTERCEPTED' ? 'bg-orange-600' : 
                        'bg-blue-600'}
                    `}>
                      {trace.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">🔗 Cable Network Path:</div>
                  <div className="text-xs font-mono text-green-400">
                    {trace.cable_path.join(' → ')}
                  </div>
                </div>

                {trace.status !== 'EXPELLED' && (
                  <Button 
                    onClick={() => expelFromCountry(trace)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Expel from {trace.country}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
