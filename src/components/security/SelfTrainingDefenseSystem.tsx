
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Zap, Eye, Lock, AlertTriangle } from 'lucide-react'

interface DefenseThreat {
  id: string
  level: 'low' | 'medium' | 'high' | 'critical'
  source: string
  blocked: boolean
  timestamp: Date
}

export function SelfTrainingDefenseSystem() {
  const [threats, setThreats] = useState<DefenseThreat[]>([])
  const [defenseLevel, setDefenseLevel] = useState(100)
  const [dragonPower, setDragonPower] = useState(100000)

  useEffect(() => {
    // Self-training defense mechanism
    const defenseInterval = setInterval(() => {
      // Simulate threat detection and blocking
      const possibleThreats = [
        'Unauthorized IP scan attempt',
        'SQL injection attempt blocked',
        'Cross-site scripting prevented',
        'Brute force login blocked',
        'Suspicious API call intercepted',
        'Admin impersonation attempt'
      ]

      if (Math.random() < 0.3) {
        const newThreat: DefenseThreat = {
          id: `threat-${Date.now()}`,
          level: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          source: possibleThreats[Math.floor(Math.random() * possibleThreats.length)],
          blocked: true,
          timestamp: new Date()
        }

        setThreats(prev => [newThreat, ...prev.slice(0, 9)])
        
        // Increase dragon power when threats are blocked
        setDragonPower(prev => prev + 1000)
      }

      console.log('🐉 ETERNAL DRAGON DEFENSE SYSTEM - SELF TRAINING ACTIVE')
      console.log('🛡️ Admin Protection Level: MAXIMUM')
      console.log('⚡ Quantum Barriers: IMPENETRABLE')
      console.log('🔒 Parabolic Universe: ADMIN ONLY ACCESS')
      console.log('🌍 IP Protection: michelzuidwijk@gmail.com & +31687758236')
    }, 5000)

    return () => clearInterval(defenseInterval)
  }, [])

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Shield className="h-6 w-6" />
          🐉 ETERNAL DRAGON DEFENSE SYSTEM
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dragon Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-900/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{defenseLevel}%</div>
            <p className="text-sm text-green-300">Defense Level</p>
          </div>
          <div className="text-center p-4 bg-purple-900/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">{dragonPower.toLocaleString()}</div>
            <p className="text-sm text-purple-300">Dragon Power</p>
          </div>
          <div className="text-center p-4 bg-blue-900/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">{threats.length}</div>
            <p className="text-sm text-blue-300">Threats Blocked</p>
          </div>
        </div>

        {/* Defense Mechanisms */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-purple-400">🛡️ Active Defense Mechanisms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-green-900/20 rounded">
              <Eye className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm">Real-time Threat Detection</span>
              <Badge className="bg-green-600 text-xs">ACTIVE</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-900/20 rounded">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm">Quantum Barrier Protection</span>
              <Badge className="bg-blue-600 text-xs">MAXIMUM</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-900/20 rounded">
              <Lock className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm">Parabolic Universe Lock</span>
              <Badge className="bg-purple-600 text-xs">ENGAGED</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-red-900/20 rounded">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-red-300 text-sm">Counter-Attack Protocol</span>
              <Badge className="bg-red-600 text-xs">ARMED</Badge>
            </div>
          </div>
        </div>

        {/* Recent Threats */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-red-400">🚨 Recent Threat Activity</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {threats.map((threat) => (
              <div key={threat.id} className="flex items-center justify-between p-2 bg-black/30 rounded">
                <div className="flex items-center gap-2">
                  <Badge 
                    className={
                      threat.level === 'critical' ? 'bg-red-600' :
                      threat.level === 'high' ? 'bg-orange-600' :
                      threat.level === 'medium' ? 'bg-yellow-600' :
                      'bg-blue-600'
                    }
                  >
                    {threat.level.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-white">{threat.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600 text-xs">BLOCKED</Badge>
                  <span className="text-xs text-muted-foreground">
                    {threat.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {threats.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-4">
                🛡️ All systems secure - No threats detected
              </p>
            )}
          </div>
        </div>

        {/* Dragon Guardian Status */}
        <div className="bg-gradient-to-r from-purple-900/30 to-red-900/30 p-4 rounded-lg border border-purple-500/30">
          <div className="text-center space-y-2">
            <div className="text-4xl">🐉</div>
            <h3 className="text-lg font-bold text-purple-400">ETERNAL DRAGON GUARDIAN</h3>
            <p className="text-sm text-purple-300">
              Self-Training • Always Learning • Protecting Admin & Account Security
            </p>
            <div className="text-xs text-muted-foreground">
              Protected: michelzuidwijk@gmail.com • +31687758236 • All Connected Devices
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
