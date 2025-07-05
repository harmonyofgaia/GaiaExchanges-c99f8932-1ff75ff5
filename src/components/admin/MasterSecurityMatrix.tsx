
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Eye, 
  Lock, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Flame,
  Crown
} from 'lucide-react'
import { toast } from 'sonner'

interface SecurityThreat {
  id: string
  type: 'blocked' | 'neutralized' | 'monitoring'
  description: string
  timestamp: string
}

export function MasterSecurityMatrix() {
  const [defenseLevel, setDefenseLevel] = useState(100)
  const [activeThreats, setActiveThreats] = useState(0)
  const [blockedAttempts, setBlockedAttempts] = useState(2847)
  const [threats, setThreats] = useState<SecurityThreat[]>([])

  useEffect(() => {
    // Simulate security monitoring
    const interval = setInterval(() => {
      setBlockedAttempts(prev => prev + Math.floor(Math.random() * 3))
      
      // Occasionally add new threat alerts
      if (Math.random() > 0.85) {
        const newThreat: SecurityThreat = {
          id: Date.now().toString(),
          type: 'blocked',
          description: 'Unauthorized access attempt blocked by Wall of Defense',
          timestamp: new Date().toLocaleTimeString()
        }
        setThreats(prev => [newThreat, ...prev.slice(0, 4)])
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const activateMaxDefense = () => {
    setDefenseLevel(100)
    toast.success('🛡️ MAXIMUM DEFENSE ACTIVATED!', {
      description: 'Wall of Defense upgraded to highest protection level',
      duration: 5000
    })
  }

  const clearAllThreats = () => {
    setThreats([])
    setActiveThreats(0)
    toast.success('🔥 ALL THREATS NEUTRALIZED!', {
      description: 'Security matrix cleared - All systems secure',
      duration: 5000
    })
  }

  return (
    <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Shield className="h-6 w-6" />
          🛡️ MASTER SECURITY MATRIX
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30">
            <Shield className="h-8 w-8 text-red-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-bold text-red-400">{defenseLevel}%</div>
            <div className="text-sm text-red-300">Defense Level</div>
            <Progress value={defenseLevel} className="mt-2 h-2" />
          </div>

          <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{blockedAttempts}</div>
            <div className="text-sm text-green-300">Blocked Attempts</div>
          </div>

          <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
            <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{activeThreats}</div>
            <div className="text-sm text-yellow-300">Active Threats</div>
          </div>
        </div>

        {/* Security Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={activateMaxDefense}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4"
          >
            <Shield className="h-5 w-5 mr-2" />
            ACTIVATE MAX DEFENSE
          </Button>

          <Button 
            onClick={clearAllThreats}
            className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 text-white font-bold py-4"
          >
            <Flame className="h-5 w-5 mr-2" />
            NEUTRALIZE ALL THREATS
          </Button>
        </div>

        {/* Real-time Threat Monitor */}
        <div className="space-y-2">
          <h4 className="font-bold text-red-400 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Real-time Security Monitor
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {threats.map((threat) => (
              <div key={threat.id} className="flex items-center gap-2 p-2 rounded bg-card/30 border border-border/30">
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span className="text-xs flex-1">{threat.description}</span>
                <Badge className="bg-green-600 text-xs">{threat.type.toUpperCase()}</Badge>
                <span className="text-xs text-muted-foreground">{threat.timestamp}</span>
              </div>
            ))}
            {threats.length === 0 && (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 text-sm">All systems secure - No active threats</p>
              </div>
            )}
          </div>
        </div>

        {/* Security Layers Status */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 bg-red-900/20 rounded border border-red-500/20">
            <Lock className="h-4 w-4 text-red-400 mx-auto mb-1" />
            <p className="text-xs text-red-400">FIREWALL</p>
            <Badge className="bg-red-600 text-xs">ACTIVE</Badge>
          </div>
          <div className="text-center p-2 bg-orange-900/20 rounded border border-orange-500/20">
            <Eye className="h-4 w-4 text-orange-400 mx-auto mb-1" />
            <p className="text-xs text-orange-400">MONITOR</p>
            <Badge className="bg-orange-600 text-xs">ONLINE</Badge>
          </div>
          <div className="text-center p-2 bg-purple-900/20 rounded border border-purple-500/20">
            <Zap className="h-4 w-4 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-purple-400">QUANTUM</p>
            <Badge className="bg-purple-600 text-xs">SECURED</Badge>
          </div>
          <div className="text-center p-2 bg-yellow-900/20 rounded border border-yellow-500/20">
            <Crown className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-yellow-400">MATRIX</p>
            <Badge className="bg-yellow-600 text-xs">MAX</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
