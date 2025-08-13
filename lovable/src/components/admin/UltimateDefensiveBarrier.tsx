import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function UltimateDefensiveBarrier() {
  const [barrierStatus, setBarrierStatus] = useState('maximum')

  const barrierLayers = [
    { name: 'Quantum Shield', power: 97, status: 'active' },
    { name: 'Neural Firewall', power: 94, status: 'active' },
    { name: 'Psychic Barrier', power: 89, status: 'active' },
    { name: 'Temporal Lock', power: 92, status: 'active' },
    { name: 'Reality Anchor', power: 96, status: 'active' },
    { name: 'Dimensional Wall', power: 88, status: 'active' }
  ]

  const threatBlocks = [
    { type: 'Malware Attempts', blocked: 1247, rate: '99.8%' },
    { type: 'DDoS Attacks', blocked: 89, rate: '100%' },
    { type: 'SQL Injections', blocked: 456, rate: '100%' },
    { type: 'Brute Force', blocked: 2341, rate: '100%' }
  ]

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            🔮 Ultimate Defensive Barrier System
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              MAXIMUM PROTECTION
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {barrierLayers.map((layer, index) => (
              <Card key={index} className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-400">{layer.name}</div>
                    <div className="text-2xl font-bold text-green-400 mt-2">{layer.power}%</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${layer.power}%` }}
                      ></div>
                    </div>
                    <Badge variant="outline" className="mt-2 border-green-500/50 text-green-400">
                      {layer.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-orange-900/20">
            <CardHeader>
              <CardTitle className="text-red-400">🚫 Threat Neutralization Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {threatBlocks.map((threat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-red-500/20 rounded-lg">
                    <div>
                      <div className="text-red-400 font-semibold">{threat.type}</div>
                      <div className="text-sm text-muted-foreground">Blocked: {threat.blocked}</div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {threat.rate}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button className="bg-purple-600 hover:bg-purple-700">
              ⚡ Boost Barrier Power
            </Button>
            <Button variant="outline" className="border-indigo-500 text-indigo-400">
              🔧 Configure Layers
            </Button>
            <Button variant="outline" className="border-red-500 text-red-400">
              🚨 Emergency Mode
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}