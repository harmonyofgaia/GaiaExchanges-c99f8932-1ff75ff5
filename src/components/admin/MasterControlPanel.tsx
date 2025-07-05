
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Settings, 
  Zap, 
  Shield, 
  Database,
  Server,
  Network,
  Lock,
  Eye,
  Crown,
  Flame
} from 'lucide-react'
import { toast } from 'sonner'

export function MasterControlPanel() {
  const [systemPower, setSystemPower] = useState(100)
  const [securityLevel, setSecurityLevel] = useState(100)
  const [performance, setPerformance] = useState(95.8)

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance(prev => Math.min(100, prev + (Math.random() - 0.5) * 0.2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSystemBoost = () => {
    toast.success('⚡ QUANTUM BOOST ACTIVATED!', {
      description: '10x Performance multiplier engaged - All systems optimized',
      duration: 5000
    })
  }

  const handleSecurityUpgrade = () => {
    toast.success('🛡️ SECURITY MATRIX UPGRADED!', {
      description: 'Wall of Defense enhanced to maximum protection level',
      duration: 5000
    })
  }

  const handleSystemOptimization = () => {
    toast.success('🚀 SYSTEM OPTIMIZATION COMPLETE!', {
      description: 'All components running at peak efficiency',
      duration: 5000
    })
  }

  return (
    <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Crown className="h-6 w-6" />
          👑 MASTER CONTROL PANEL
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{systemPower}%</div>
            <div className="text-sm text-green-300">System Power</div>
            <Progress value={systemPower} className="mt-2 h-2" />
          </div>

          <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30">
            <Shield className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400">{securityLevel}%</div>
            <div className="text-sm text-red-300">Security Level</div>
            <Progress value={securityLevel} className="mt-2 h-2" />
          </div>

          <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
            <Settings className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{performance.toFixed(1)}%</div>
            <div className="text-sm text-blue-300">Performance</div>
            <Progress value={performance} className="mt-2 h-2" />
          </div>
        </div>

        {/* Master Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={handleSystemBoost}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4"
          >
            <Zap className="h-5 w-5 mr-2" />
            QUANTUM BOOST
          </Button>

          <Button 
            onClick={handleSecurityUpgrade}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4"
          >
            <Shield className="h-5 w-5 mr-2" />
            SECURITY MATRIX
          </Button>

          <Button 
            onClick={handleSystemOptimization}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4"
          >
            <Settings className="h-5 w-5 mr-2" />
            OPTIMIZE ALL
          </Button>
        </div>

        {/* System Components Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="text-center p-2 bg-green-900/20 rounded border border-green-500/20">
            <Server className="h-4 w-4 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-green-400">SERVER</p>
            <Badge className="bg-green-600 text-xs">ONLINE</Badge>
          </div>
          <div className="text-center p-2 bg-blue-900/20 rounded border border-blue-500/20">
            <Database className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-blue-400">DATABASE</p>
            <Badge className="bg-blue-600 text-xs">ACTIVE</Badge>
          </div>
          <div className="text-center p-2 bg-purple-900/20 rounded border border-purple-500/20">
            <Network className="h-4 w-4 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-purple-400">NETWORK</p>
            <Badge className="bg-purple-600 text-xs">SECURE</Badge>
          </div>
          <div className="text-center p-2 bg-red-900/20 rounded border border-red-500/20">
            <Lock className="h-4 w-4 text-red-400 mx-auto mb-1" />
            <p className="text-xs text-red-400">ENCRYPTION</p>
            <Badge className="bg-red-600 text-xs">MAX</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
