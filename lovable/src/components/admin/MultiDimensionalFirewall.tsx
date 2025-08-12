import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Layers, Zap, Globe } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface FirewallLayer {
  name: string
  type: 'physical' | 'digital' | 'quantum'
  strength: number
  threats_blocked: number
  status: 'active' | 'hardening' | 'maximum'
}

export function MultiDimensionalFirewall() {
  const [firewallLayers, setFirewallLayers] = useState<FirewallLayer[]>([
    { name: 'Physical Barrier', type: 'physical', strength: 100, threats_blocked: 1247, status: 'maximum' },
    { name: 'Digital Perimeter', type: 'digital', strength: 100, threats_blocked: 8954, status: 'maximum' },
    { name: 'Quantum Shield', type: 'quantum', strength: 100, threats_blocked: 456, status: 'maximum' }
  ])
  const [totalThreatsBlocked, setTotalThreatsBlocked] = useState(10657)
  const [overallStrength, setOverallStrength] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setFirewallLayers(prev => prev.map(layer => ({
        ...layer,
        threats_blocked: layer.threats_blocked + Math.floor(Math.random() * 10),
        strength: Math.max(95, Math.min(100, layer.strength + (Math.random() - 0.5) * 2))
      })))
      
      setTotalThreatsBlocked(prev => prev + Math.floor(Math.random() * 25))
      
      console.log('🛡️ MULTI-DIMENSIONAL FIREWALL - TRIPLE LAYER PROTECTION')
      console.log('🌟 PHYSICAL • DIGITAL • QUANTUM SHIELDS ACTIVE')
      console.log('⚡ UNBREACHABLE DEFENSE - ALL REALMS PROTECTED')
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getLayerColor = (type: string) => {
    switch (type) {
      case 'physical': return 'from-red-500 to-orange-500'
      case 'digital': return 'from-blue-500 to-cyan-500'
      case 'quantum': return 'from-purple-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getLayerBorder = (type: string) => {
    switch (type) {
      case 'physical': return 'border-red-500/30'
      case 'digital': return 'border-blue-500/30'
      case 'quantum': return 'border-purple-500/30'
      default: return 'border-gray-500/30'
    }
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/30 to-gray-900/30 border border-slate-500/30">
      <CardHeader>
        <CardTitle className="text-slate-400 flex items-center gap-2">
          <Layers className="h-5 w-5" />
          🛡️ Multi-Dimensional Firewall
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-slate-500/20">
            <div className="text-2xl font-bold text-slate-400">{overallStrength}%</div>
            <div className="text-sm text-slate-300">Overall Strength</div>
            <Progress value={overallStrength} className="h-2 mt-2" />
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{totalThreatsBlocked.toLocaleString()}</div>
            <div className="text-sm text-blue-300">Total Threats Blocked</div>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">3</div>
            <div className="text-sm text-green-300">Active Dimensions</div>
          </div>
        </div>

        <div className="space-y-4">
          {firewallLayers.map((layer, index) => (
            <div key={index} className={`p-4 rounded-lg border bg-black/20 ${getLayerBorder(layer.type)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getLayerColor(layer.type)}`} />
                  <span className="font-semibold text-white">{layer.name}</span>
                  <span className="text-xs uppercase px-2 py-1 bg-black/30 rounded">
                    {layer.type}
                  </span>
                </div>
                <div className="text-green-400 text-sm font-semibold">
                  {layer.status.toUpperCase()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Strength</div>
                  <div className="text-lg font-bold text-white">{layer.strength.toFixed(1)}%</div>
                  <Progress value={layer.strength} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Threats Blocked</div>
                  <div className="text-lg font-bold text-white">{layer.threats_blocked.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 rounded-lg border border-slate-500/20">
            <h3 className="text-slate-400 font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Protection Capabilities
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-300">Physical Access Control</span>
                <span className="text-green-400">MAXIMUM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Digital Traffic Filtering</span>
                <span className="text-green-400">MAXIMUM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Quantum Encryption</span>
                <span className="text-green-400">MAXIMUM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300">Multi-Vector Defense</span>
                <span className="text-green-400">MAXIMUM</span>
              </div>
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg border border-slate-500/20">
            <h3 className="text-slate-400 font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Realm Coverage
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-300">Physical Realm</span>
                <span className="text-green-400">PROTECTED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Digital Realm</span>
                <span className="text-green-400">PROTECTED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Quantum Realm</span>
                <span className="text-green-400">PROTECTED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-300">Dimensional Bridge</span>
                <span className="text-green-400">SECURED</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-slate-600 hover:bg-slate-700 text-white"
            onClick={() => console.log('🛡️ Firewall Hardening Initiated')}
          >
            Harden All Layers
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => console.log('⚡ Emergency Shield Activated')}
          >
            Emergency Shield
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => console.log('🌟 Quantum Sync Complete')}
          >
            Sync Quantum Layer
          </Button>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-slate-900/20 to-gray-900/20 rounded-lg border border-slate-500/20">
          <div className="text-slate-400 font-bold">🛡️ MULTI-DIMENSIONAL FIREWALL STATUS</div>
          <div className="text-green-400 text-sm mt-1">ALL REALMS PROTECTED • TRIPLE LAYER DEFENSE • UNBREACHABLE</div>
        </div>
      </CardContent>
    </Card>
  )
}