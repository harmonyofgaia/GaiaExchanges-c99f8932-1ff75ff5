/**
 * Enhanced Hunting Hackers Section with IA-powered track & trace capabilities
 * Features: Real-time threat detection, point/token mechanism, advanced admin tools
 */

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Shield, 
  Crosshair, 
  AlertTriangle, 
  Eye, 
  Zap, 
  Target, 
  Activity,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Globe,
  Lock,
  UserX,
  Bug,
  Wifi,
  Server,
  Settings
} from 'lucide-react'
import { toast } from 'sonner'

interface ThreatData {
  id: string
  ip: string
  country: string
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
  attackType: string
  timestamp: Date
  status: 'active' | 'blocked' | 'monitored'
  attempts: number
  points: number
}

interface AdminPoints {
  total: number
  threatsStopped: number
  bonusPoints: number
  achievements: string[]
}

export function HuntingHackersSection() {
  const [threats, setThreats] = useState<ThreatData[]>([])
  const [activeThreats, setActiveThreats] = useState(0)
  const [adminPoints, setAdminPoints] = useState<AdminPoints>({
    total: 15420,
    threatsStopped: 89,
    bonusPoints: 2340,
    achievements: ['Threat Hunter', 'Network Guardian', 'Cyber Defender', 'IA Master']
  })
  const [trackingQuery, setTrackingQuery] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [defenseLevel, setDefenseLevel] = useState(87)

  // Simulate real-time threat detection
  useEffect(() => {
    const generateThreat = () => {
      const threatTypes = ['SQL Injection', 'DDoS Attack', 'Brute Force', 'Malware', 'Phishing', 'XSS Attack']
      const countries = ['Unknown', 'Russia', 'China', 'North Korea', 'Iran', 'Anonymous']
      const ips = ['192.168.1.', '10.0.0.', '172.16.0.', '203.0.113.', '198.51.100.']
      
      const newThreat: ThreatData = {
        id: Math.random().toString(36).substr(2, 9),
        ip: ips[Math.floor(Math.random() * ips.length)] + Math.floor(Math.random() * 255),
        country: countries[Math.floor(Math.random() * countries.length)],
        threatLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as ThreatData['threatLevel'],
        attackType: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        timestamp: new Date(),
        status: ['active', 'blocked', 'monitored'][Math.floor(Math.random() * 3)] as ThreatData['status'],
        attempts: Math.floor(Math.random() * 50) + 1,
        points: Math.floor(Math.random() * 100) + 10
      }

      setThreats(prev => [newThreat, ...prev.slice(0, 19)]) // Keep last 20 threats
      
      if (newThreat.status === 'active') {
        setActiveThreats(prev => prev + 1)
        toast.error(`🚨 New ${newThreat.threatLevel.toUpperCase()} threat detected!`, {
          description: `${newThreat.attackType} from ${newThreat.country} (${newThreat.ip})`,
          duration: 5000
        })
      }
    }

    // Generate initial threats
    for (let i = 0; i < 10; i++) {
      setTimeout(() => generateThreat(), i * 500)
    }

    // Continue generating threats
    const interval = setInterval(generateThreat, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleBlockThreat = (threatId: string) => {
    setThreats(prev => prev.map(threat => 
      threat.id === threatId 
        ? { ...threat, status: 'blocked' }
        : threat
    ))
    
    const threat = threats.find(t => t.id === threatId)
    if (threat) {
      setAdminPoints(prev => ({
        ...prev,
        total: prev.total + threat.points,
        threatsStopped: prev.threatsStopped + 1
      }))
      
      setActiveThreats(prev => Math.max(0, prev - 1))
      
      toast.success(`✅ Threat Blocked! +${threat.points} points`, {
        description: `${threat.attackType} neutralized`,
        duration: 3000
      })
    }
  }

  const handleIATrack = async () => {
    if (!trackingQuery.trim()) return
    
    setIsScanning(true)
    
    // Simulate IA-powered tracking
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('🎯 IA Tracking Complete', {
      description: `Deep scan results for "${trackingQuery}" are ready`,
      duration: 4000
    })
    
    setIsScanning(false)
    setTrackingQuery('')
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500 border-red-500'
      case 'high': return 'text-orange-500 border-orange-500'
      case 'medium': return 'text-yellow-500 border-yellow-500'
      case 'low': return 'text-green-500 border-green-500'
      default: return 'text-gray-500 border-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-500 bg-red-500/10'
      case 'blocked': return 'text-green-500 bg-green-500/10'
      case 'monitored': return 'text-yellow-500 bg-yellow-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-r from-red-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            <div className="flex items-center justify-center gap-3">
              <Crosshair className="h-8 w-8 text-red-500" />
              🎯 HUNTING HACKERS COMMAND CENTER
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            IA-Powered Threat Detection • Real-Time Tracking • Advanced Defense Matrix
          </p>
        </CardHeader>
      </Card>

      {/* Real-time Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{activeThreats}</div>
            <p className="text-sm text-muted-foreground">Currently tracking</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Admin Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{adminPoints.total.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total earned points</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Threats Stopped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{adminPoints.threatsStopped}</div>
            <p className="text-sm text-muted-foreground">Successfully blocked</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Defense Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">{defenseLevel}%</div>
            <Progress value={defenseLevel} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="threats" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Live Threats
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Crosshair className="h-4 w-4" />
            IA Tracking
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Admin Controls
          </TabsTrigger>
        </TabsList>

        {/* Live Threats Tab */}
        <TabsContent value="threats" className="space-y-4">
          <Alert>
            <Activity className="h-4 w-4" />
            <AlertDescription>
              Real-time threat monitoring is active. All suspicious activities are being tracked and analyzed.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            {threats.slice(0, 10).map((threat) => (
              <Card key={threat.id} className={`border-l-4 ${getThreatLevelColor(threat.threatLevel).replace('text-', 'border-l-')}`}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getThreatLevelColor(threat.threatLevel)}>
                            {threat.threatLevel.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(threat.status)}>
                            {threat.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="font-semibold text-sm mt-1">{threat.attackType}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {threat.country}
                        </div>
                        <div className="flex items-center gap-1">
                          <Wifi className="h-3 w-3" />
                          {threat.ip}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {threat.timestamp.toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {threat.attempts} attempts
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                        +{threat.points} pts
                      </Badge>
                      {threat.status === 'active' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleBlockThreat(threat.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          Block
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* IA Tracking Tab */}
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crosshair className="h-5 w-5 text-blue-500" />
                IA-Powered Deep Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter IP, domain, or threat signature to track..."
                  value={trackingQuery}
                  onChange={(e) => setTrackingQuery(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleIATrack}
                  disabled={isScanning}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isScanning ? (
                    <>
                      <Activity className="h-4 w-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Track & Trace
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-400 text-sm">Global Network Scan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">847</div>
                    <p className="text-xs text-muted-foreground">Active monitors</p>
                  </CardContent>
                </Card>

                <Card className="border-cyan-500/30">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 text-sm">Deep Web Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2M</div>
                    <p className="text-xs text-muted-foreground">Data points analyzed</p>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-orange-400 text-sm">Threat Intelligence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">99.7%</div>
                    <p className="text-xs text-muted-foreground">Accuracy rate</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminPoints.achievements.map((achievement, index) => (
              <Card key={index} className="border-yellow-500/30">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <div>
                      <h3 className="font-semibold text-yellow-400">{achievement}</h3>
                      <p className="text-sm text-muted-foreground">Elite security achievement unlocked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Point Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Threats Neutralized</span>
                  <span className="text-green-400">{adminPoints.threatsStopped * 50} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonus Achievements</span>
                  <span className="text-blue-400">{adminPoints.bonusPoints} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>IA Tracking Success</span>
                  <span className="text-purple-400">3,080 pts</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Points</span>
                  <span className="text-yellow-400">{adminPoints.total.toLocaleString()} pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Controls Tab */}
        <TabsContent value="controls" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400">Emergency Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700" variant="destructive">
                  <Lock className="h-4 w-4 mr-2" />
                  Lockdown All Connections
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <UserX className="h-4 w-4 mr-2" />
                  Ban Suspicious IPs
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Bug className="h-4 w-4 mr-2" />
                  Deploy Countermeasures
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">System Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Server className="h-4 w-4 mr-2" />
                  Enhance Firewall
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Update Defense Matrix
                </Button>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Threat Sync
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}