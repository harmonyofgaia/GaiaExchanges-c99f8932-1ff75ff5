import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ComprehensiveDefenseOverview() {
  const [defenseStatus, setDefenseStatus] = useState('active')

  const defenseMetrics = [
    { name: 'Active Shields', value: 12, status: 'operational' },
    { name: 'Threat Detections', value: 847, status: 'monitoring' },
    { name: 'Auto-Responses', value: 23, status: 'active' },
    { name: 'System Health', value: 98, status: 'excellent' }
  ]

  const defenseLayers = [
    { name: 'Perimeter Defense', status: 'active', strength: 95 },
    { name: 'AI Pattern Recognition', status: 'active', strength: 88 },
    { name: 'Behavioral Analysis', status: 'active', strength: 92 },
    { name: 'Quantum Encryption', status: 'active', strength: 97 }
  ]

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            🛡️ Comprehensive Defense Overview
            <Badge variant="outline" className="border-green-500 text-green-400">
              Status: {defenseStatus.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {defenseMetrics.map((metric, index) => (
              <Card key={index} className="border-green-500/20">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.name}</div>
                    <Badge variant="outline" className="mt-2 border-green-500/50 text-green-400">
                      {metric.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400">Defense Layer Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {defenseLayers.map((layer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-blue-400">{layer.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${layer.strength}%` }}
                        ></div>
                      </div>
                      <span className="text-green-400 text-sm">{layer.strength}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button className="bg-green-600 hover:bg-green-700">
              🔄 Refresh Defense Status
            </Button>
            <Button variant="outline" className="border-blue-500 text-blue-400">
              📊 Detailed Analytics
            </Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-400">
              ⚙️ Configure Defenses
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}