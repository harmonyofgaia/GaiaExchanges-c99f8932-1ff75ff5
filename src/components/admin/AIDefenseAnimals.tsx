import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Eye, 
  Zap, 
  Activity, 
  AlertTriangle, 
  Target,
  Wifi,
  Brain,
  Heart,
  Clock,
  Globe,
  Sword,
  Mountain
} from 'lucide-react'
import { toast } from 'sonner'

interface DefenseAnimal {
  id: string
  name: string
  type: 'bear' | 'eagle' | 'wolf'
  emoji: string
  status: 'active' | 'patrolling' | 'hunting' | 'resting'
  location: string
  threats_detected: number
  threats_neutralized: number
  energy: number
  experience: number
  special_abilities: string[]
  last_action: string
  timestamp: Date
}

interface ThreatAlert {
  id: string
  type: 'intrusion' | 'malware' | 'ddos' | 'unauthorized_access' | 'data_breach'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  source: string
  detected_by: string
  status: 'detected' | 'investigating' | 'neutralized' | 'contained'
  timestamp: Date
}

export function AIDefenseAnimals() {
  const [defenseAnimals, setDefenseAnimals] = useState<DefenseAnimal[]>([])
  const [threatAlerts, setThreatAlerts] = useState<ThreatAlert[]>([])
  const [systemStatus, setSystemStatus] = useState({
    overallSecurity: 95,
    activeAnimals: 0,
    threatsBlocked: 0,
    systemUptime: '99.9%'
  })

  useEffect(() => {
    // Initialize AI Defense Animals
    const animals: DefenseAnimal[] = [
      {
        id: 'bear-001',
        name: 'Kodiak Guardian',
        type: 'bear',
        emoji: '🐻',
        status: 'patrolling',
        location: 'Network Perimeter',
        threats_detected: 47,
        threats_neutralized: 44,
        energy: 85,
        experience: 920,
        special_abilities: ['Brute Force Protection', 'DDoS Absorption', 'Heavy Firewall'],
        last_action: 'Blocked suspicious IP range',
        timestamp: new Date()
      },
      {
        id: 'eagle-001',
        name: 'Sky Watcher',
        type: 'eagle',
        emoji: '🦅',
        status: 'hunting',
        location: 'Data Streams',
        threats_detected: 73,
        threats_neutralized: 69,
        energy: 92,
        experience: 1250,
        special_abilities: ['High-Speed Scanning', 'Pattern Recognition', 'Aerial Surveillance'],
        last_action: 'Intercepted malware packet',
        timestamp: new Date()
      },
      {
        id: 'wolf-001',
        name: 'Alpha Pack Leader',
        type: 'wolf',
        emoji: '🐺',
        status: 'active',
        location: 'User Sessions',
        threats_detected: 35,
        threats_neutralized: 33,
        energy: 78,
        experience: 780,
        special_abilities: ['Pack Coordination', 'Stealth Tracking', 'Session Protection'],
        last_action: 'Detected unauthorized login attempt',
        timestamp: new Date()
      }
    ]

    const threats: ThreatAlert[] = [
      {
        id: 'threat-001',
        type: 'intrusion',
        severity: 'high',
        description: 'Unauthorized access attempt from suspicious IP',
        source: '192.168.45.123',
        detected_by: 'Kodiak Guardian',
        status: 'neutralized',
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: 'threat-002',
        type: 'malware',
        severity: 'critical',
        description: 'Malicious payload detected in data stream',
        source: 'External API',
        detected_by: 'Sky Watcher',
        status: 'contained',
        timestamp: new Date(Date.now() - 600000)
      },
      {
        id: 'threat-003',
        type: 'unauthorized_access',
        severity: 'medium',
        description: 'Unusual session behavior detected',
        source: 'User Session 7834',
        detected_by: 'Alpha Pack Leader',
        status: 'investigating',
        timestamp: new Date(Date.now() - 120000)
      }
    ]

    setDefenseAnimals(animals)
    setThreatAlerts(threats)
    setSystemStatus({
      overallSecurity: 95,
      activeAnimals: animals.filter(a => a.status !== 'resting').length,
      threatsBlocked: animals.reduce((sum, a) => sum + a.threats_neutralized, 0),
      systemUptime: '99.9%'
    })

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDefenseAnimals(prev => prev.map(animal => ({
        ...animal,
        energy: Math.max(20, animal.energy + (Math.random() > 0.7 ? -5 : 2)),
        threats_detected: animal.threats_detected + (Math.random() > 0.8 ? 1 : 0),
        threats_neutralized: animal.threats_neutralized + (Math.random() > 0.9 ? 1 : 0),
        status: Math.random() > 0.9 ? 
          (['active', 'patrolling', 'hunting'] as const)[Math.floor(Math.random() * 3)] 
          : animal.status,
        last_action: Math.random() > 0.85 ? 
          ['Scanning network traffic', 'Analyzing user behavior', 'Monitoring API calls', 'Checking firewall rules'][Math.floor(Math.random() * 4)]
          : animal.last_action,
        timestamp: new Date()
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const deployAnimal = (animalId: string) => {
    setDefenseAnimals(prev => prev.map(animal => 
      animal.id === animalId 
        ? { ...animal, status: 'hunting', energy: Math.min(100, animal.energy + 10) }
        : animal
    ))
    
    const animal = defenseAnimals.find(a => a.id === animalId)
    toast.success(`🛡️ ${animal?.name} deployed for enhanced protection!`, {
      description: `${animal?.emoji} Now actively hunting for threats`,
      duration: 3000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-500/50 text-green-400'
      case 'hunting': return 'border-red-500/50 text-red-400'
      case 'patrolling': return 'border-blue-500/50 text-blue-400'
      case 'resting': return 'border-gray-500/50 text-gray-400'
      default: return 'border-yellow-500/50 text-yellow-400'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500/50 text-red-400'
      case 'high': return 'border-orange-500/50 text-orange-400'
      case 'medium': return 'border-yellow-500/50 text-yellow-400'
      case 'low': return 'border-green-500/50 text-green-400'
      default: return 'border-gray-500/50 text-gray-400'
    }
  }

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'intrusion': return <Shield className="h-4 w-4" />
      case 'malware': return <Zap className="h-4 w-4" />
      case 'ddos': return <Activity className="h-4 w-4" />
      case 'unauthorized_access': return <Eye className="h-4 w-4" />
      case 'data_breach': return <AlertTriangle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-5 w-5" />
            AI Defense Animals - Automated Threat Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{systemStatus.overallSecurity}%</div>
              <div className="text-sm text-muted-foreground">Security Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{systemStatus.activeAnimals}</div>
              <div className="text-sm text-muted-foreground">Active Animals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{systemStatus.threatsBlocked}</div>
              <div className="text-sm text-muted-foreground">Threats Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{systemStatus.systemUptime}</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="animals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="animals">🐻 Defense Animals</TabsTrigger>
          <TabsTrigger value="threats">⚠️ Threat Monitor</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="animals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {defenseAnimals.map((animal) => (
              <Card key={animal.id} className="border-blue-500/20 bg-black/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <span className="text-2xl">{animal.emoji}</span>
                      {animal.name}
                    </CardTitle>
                    <Badge variant="outline" className={getStatusColor(animal.status)}>
                      {animal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Energy</span>
                      <span>{animal.energy}%</span>
                    </div>
                    <Progress value={animal.energy} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Detected</div>
                      <div className="font-bold text-red-400">{animal.threats_detected}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Neutralized</div>
                      <div className="font-bold text-green-400">{animal.threats_neutralized}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3" />
                      <span className="text-muted-foreground">{animal.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3" />
                      <span className="text-muted-foreground">{animal.last_action}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium">Special Abilities:</div>
                    <div className="flex flex-wrap gap-1">
                      {animal.special_abilities.map((ability, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-purple-500/50 text-purple-400">
                          {ability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => deployAnimal(animal.id)} 
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={animal.status === 'hunting'}
                  >
                    <Sword className="h-4 w-4 mr-2" />
                    {animal.status === 'hunting' ? 'Currently Hunting' : 'Deploy for Hunt'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <div className="space-y-4">
            {threatAlerts.map((threat) => (
              <Card key={threat.id} className="border-red-500/20 bg-black/20">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getThreatIcon(threat.type)}
                        <h3 className="font-semibold text-white">{threat.description}</h3>
                        <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                          {threat.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>Source: {threat.source}</div>
                        <div>Detected by: {threat.detected_by}</div>
                        <div>Type: {threat.type}</div>
                        <div>Time: {threat.timestamp.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-500/50 text-red-400">
                        <Shield className="h-3 w-3 mr-1" />
                        Block
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-400">Threat Detection Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Intrusion Attempts</span>
                    <span className="font-bold text-red-400">↑ 15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Malware Blocked</span>
                    <span className="font-bold text-green-400">↓ 8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>DDoS Attacks</span>
                    <span className="font-bold text-blue-400">→ 2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Overall Security</span>
                    <span className="font-bold text-green-400">↑ 5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Animal Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {defenseAnimals.map((animal) => (
                    <div key={animal.id} className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span>{animal.emoji}</span>
                        <span>{animal.name}</span>
                      </span>
                      <span className="font-bold text-green-400">
                        {Math.round((animal.threats_neutralized / animal.threats_detected) * 100)}% Success
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}