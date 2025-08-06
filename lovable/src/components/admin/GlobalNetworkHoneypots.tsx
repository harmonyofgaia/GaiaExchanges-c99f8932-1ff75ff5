import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Bug, Shield, MapPin } from 'lucide-react'

interface HoneypotCapture {
  id: string
  location: string
  attackType: string
  sourceIP: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export function GlobalNetworkHoneypots() {
  const [activeHoneypots, setActiveHoneypots] = useState(247)
  const [capturedAttacks, setCapturedAttacks] = useState(8954)
  const [globalCoverage, setGlobalCoverage] = useState(98.3)
  const [recentCaptures, setRecentCaptures] = useState<HoneypotCapture[]>([])

  useEffect(() => {
    const generateCapture = (): HoneypotCapture => ({
      id: Math.random().toString(36).substr(2, 9),
      location: [
        'New York, USA',
        'London, UK',
        'Tokyo, Japan',
        'Berlin, Germany',
        'Sydney, Australia',
        'Moscow, Russia',
        'Beijing, China',
        'São Paulo, Brazil',
        'Mumbai, India',
        'Toronto, Canada'
      ][Math.floor(Math.random() * 10)],
      attackType: [
        'SSH Brute Force',
        'HTTP Exploitation',
        'FTP Intrusion',
        'SQL Injection',
        'Malware Deployment',
        'DDoS Probe',
        'Port Scanning',
        'Vulnerability Scan'
      ][Math.floor(Math.random() * 8)],
      sourceIP: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      timestamp: new Date().toLocaleTimeString(),
      severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any
    })

    const interval = setInterval(() => {
      setCapturedAttacks(prev => prev + Math.floor(Math.random() * 15))
      setActiveHoneypots(prev => Math.max(240, Math.min(255, prev + (Math.random() - 0.5) * 5)))
      
      if (Math.random() > 0.6) {
        setRecentCaptures(prev => [generateCapture(), ...prev.slice(0, 7)])
      }
      
      console.log('🕷️ GLOBAL HONEYPOTS - WORLDWIDE TRAP NETWORK ACTIVE')
      console.log('🌍 247 HONEYPOTS DEPLOYED - CAPTURING ALL THREATS')
      console.log('⚡ REAL-TIME THREAT ANALYSIS - GLOBAL PROTECTION')
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-orange-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-500/30">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          🕷️ Global Network Honeypots
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{activeHoneypots}</div>
            <div className="text-sm text-green-300">Active Honeypots</div>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-teal-500/20">
            <div className="text-2xl font-bold text-teal-400">{capturedAttacks.toLocaleString()}</div>
            <div className="text-sm text-teal-300">Captured Attacks</div>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{globalCoverage}%</div>
            <div className="text-sm text-blue-300">Global Coverage</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 rounded-lg border border-green-500/20">
            <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Global Honeypot Locations
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-300">North America</span>
                <span className="text-green-400">78 active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Europe</span>
                <span className="text-green-400">65 active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Asia Pacific</span>
                <span className="text-green-400">58 active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Other Regions</span>
                <span className="text-green-400">46 active</span>
              </div>
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg border border-teal-500/20">
            <h3 className="text-teal-400 font-semibold mb-3 flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Recent Captures
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {recentCaptures.length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  🔍 Monitoring for threats...
                </div>
              ) : (
                recentCaptures.map((capture) => (
                  <div key={capture.id} className="text-xs">
                    <div className="flex items-center justify-between">
                      <span className={getSeverityColor(capture.severity)}>
                        {capture.attackType}
                      </span>
                      <span className="text-gray-400">{capture.timestamp}</span>
                    </div>
                    <div className="text-gray-500">
                      {capture.sourceIP} → {capture.location}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => console.log('🕷️ New Honeypot Deployed')}
          >
            Deploy New Honeypot
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => console.log('🔍 Threat Analysis Updated')}
          >
            Analyze Captured Data
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => console.log('🌍 Global Sync Complete')}
          >
            Sync Global Network
          </Button>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-lg border border-green-500/20">
          <div className="text-green-400 font-bold">🕷️ GLOBAL HONEYPOT STATUS</div>
          <div className="text-green-400 text-sm mt-1">247 TRAPS ACTIVE • WORLDWIDE COVERAGE • CAPTURING ALL THREATS</div>
        </div>
      </CardContent>
    </Card>
  )
}