
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Shield, Zap, Eye, Lock, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface DefenseCreature {
  id: string
  name: string
  type: 'guardian' | 'sentinel' | 'protector' | 'watcher' | 'barrier'
  position: string
  strength: number
  alertLevel: 'low' | 'medium' | 'high' | 'critical'
  threatsBlocked: number
  isActive: boolean
  specialPower: string
}

export function DefenseWallCreatures() {
  const [creatures, setCreatures] = useState<DefenseCreature[]>([
    {
      id: '1',
      name: 'Quantum Guardian',
      type: 'guardian',
      position: 'North Wall',
      strength: 95,
      alertLevel: 'high',
      threatsBlocked: 1247,
      isActive: true,
      specialPower: 'Quantum Shield Generation'
    },
    {
      id: '2',
      name: 'Cyber Sentinel',
      type: 'sentinel',
      position: 'East Tower',
      strength: 87,
      alertLevel: 'medium',
      threatsBlocked: 892,
      isActive: true,
      specialPower: 'Digital Threat Detection'
    },
    {
      id: '3',
      name: 'Mystic Protector',
      type: 'protector',
      position: 'South Gate',
      strength: 92,
      alertLevel: 'low',
      threatsBlocked: 634,
      isActive: true,
      specialPower: 'Mystical Barrier Creation'
    },
    {
      id: '4',
      name: 'Storm Watcher',
      type: 'watcher',
      position: 'West Perimeter',
      strength: 78,
      alertLevel: 'medium',
      threatsBlocked: 445,
      isActive: true,
      specialPower: 'Weather Manipulation'
    },
    {
      id: '5',
      name: 'Crystal Barrier',
      type: 'barrier',
      position: 'Central Core',
      strength: 100,
      alertLevel: 'critical',
      threatsBlocked: 2847,
      isActive: true,
      specialPower: 'Impenetrable Force Field'
    }
  ])

  const [totalThreatsBlocked, setTotalThreatsBlocked] = useState(0)
  const [wallIntegrity, setWallIntegrity] = useState(98.7)

  useEffect(() => {
    // Calculate total threats blocked
    const total = creatures.reduce((sum, creature) => sum + creature.threatsBlocked, 0)
    setTotalThreatsBlocked(total)

    // Simulate defense activity
    const defenseInterval = setInterval(() => {
      setCreatures(prev => prev.map(creature => {
        if (creature.isActive && Math.random() > 0.6) {
          const newThreats = Math.floor(Math.random() * 5) + 1
          const strengthChange = (Math.random() - 0.5) * 2
          
          return {
            ...creature,
            threatsBlocked: creature.threatsBlocked + newThreats,
            strength: Math.max(70, Math.min(100, creature.strength + strengthChange)),
            alertLevel: Math.random() > 0.8 ? 'high' : creature.alertLevel
          }
        }
        return creature
      }))

      // Update wall integrity
      setWallIntegrity(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.4) * 0.1)))

      // Random defense notifications
      if (Math.random() > 0.7) {
        const defenseMessages = [
          '🛡️ Quantum Guardian deflected massive cyber attack!',
          '⚡ Cyber Sentinel neutralized malware infiltration!',
          '🔮 Mystic Protector blocked unauthorized access!',
          '🌪️ Storm Watcher repelled coordinated breach attempt!',
          '💎 Crystal Barrier absorbed quantum disruption attack!'
        ]
        
        const message = defenseMessages[Math.floor(Math.random() * defenseMessages.length)]
        toast.success('🛡️ Defense Success!', {
          description: message,
          duration: 3000
        })
      }
    }, 4000)

    return () => clearInterval(defenseInterval)
  }, [])

  const getCreatureEmoji = (type: DefenseCreature['type']) => {
    const emojis = {
      guardian: '🛡️',
      sentinel: '👁️',
      protector: '🔮',
      watcher: '🌪️',
      barrier: '💎'
    }
    return emojis[type]
  }

  const getAlertColor = (level: DefenseCreature['alertLevel']) => {
    const colors = {
      low: 'bg-green-600',
      medium: 'bg-yellow-600',
      high: 'bg-orange-600',
      critical: 'bg-red-600'
    }
    return colors[level]
  }

  return (
    <div className="space-y-6">
      {/* Defense Overview */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-center text-red-400">
            🏰 DEFENSE WALL CREATURE ARMY - ULTIMATE PROTECTION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-red-900/30 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{creatures.length}</div>
              <div className="text-sm text-muted-foreground">Active Defenders</div>
            </div>
            <div className="p-4 bg-orange-900/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">{totalThreatsBlocked.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Threats Blocked</div>
            </div>
            <div className="p-4 bg-yellow-900/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{wallIntegrity.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Wall Integrity</div>
            </div>
            <div className="p-4 bg-green-900/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {creatures.filter(c => c.isActive).length}
              </div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wall Integrity Display */}
      <Card className="border-blue-500/30 bg-blue-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-6 w-6" />
            🏰 Defense Wall Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-400">Overall Wall Integrity</span>
                <span className="text-blue-400">{wallIntegrity.toFixed(1)}%</span>
              </div>
              <Progress value={wallIntegrity} className="h-4" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {creatures.map((creature) => (
                <div key={creature.id} className="text-center p-2 bg-black/20 rounded">
                  <div className="text-lg">{getCreatureEmoji(creature.type)}</div>
                  <div className="text-xs font-medium">{creature.position}</div>
                  <div className="text-xs text-muted-foreground">{creature.strength}%</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Creature Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creatures.map((creature) => (
          <Card key={creature.id} className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCreatureEmoji(creature.type)}</span>
                  <div>
                    <div className="text-purple-400">{creature.name}</div>
                    <div className="text-sm text-muted-foreground">{creature.position}</div>
                  </div>
                </div>
                <Badge className={`${getAlertColor(creature.alertLevel)} ${creature.alertLevel === 'critical' ? 'animate-pulse' : ''}`}>
                  {creature.alertLevel.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Strength</span>
                  <span className="text-green-400">{creature.strength}%</span>
                </div>
                <Progress value={creature.strength} className="h-2" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Threats Blocked</span>
                  <span className="text-red-400">{creature.threatsBlocked.toLocaleString()}</span>
                </div>
                <div className="text-xs text-purple-400">Power: {creature.specialPower}</div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Eye className="h-3 w-3 mr-1" />
                  Monitor
                </Button>
                <Button size="sm" variant="outline">
                  <Zap className="h-3 w-3 mr-1" />
                  Boost
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Status: {creature.isActive ? '🟢 Active' : '🔴 Offline'}
              </div>
            </CardContent>
          </Card>    
        ))}
      </div>

      {/* Defense Protocols */}
      <Card className="border-green-500/30 bg-green-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Lock className="h-6 w-6" />
            🔒 Active Defense Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-green-400">Automated Defenses:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Quantum threat detection and neutralization</li>
                <li>• Real-time barrier strength adjustment</li>
                <li>• Coordinated creature response protocols</li>
                <li>• Self-healing wall infrastructure</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-orange-400">Emergency Protocols:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Critical alert escalation system</li>
                <li>• Creature power boost capabilities</li>
                <li>• Backup defender summoning</li>
                <li>• Fortress mode activation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
