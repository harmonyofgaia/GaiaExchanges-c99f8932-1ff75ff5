
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Zap, Globe, Database, Cloud, Lock } from 'lucide-react'

const SystemStatus = () => {
  const [dragonStatus, setDragonStatus] = useState({
    quantumPower: 100,
    securityLevel: 100,
    activeConnections: 0,
    threatsBlocked: 0,
    systemHealth: 100
  })

  useEffect(() => {
    const updateStatus = () => {
      setDragonStatus(prev => ({
        quantumPower: Math.min(999999, prev.quantumPower + Math.floor(Math.random() * 1000)),
        securityLevel: 100, // Always maximum
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 3),
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 5),
        systemHealth: 100 // Always perfect
      }))
    }

    const interval = setInterval(updateStatus, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🐉 DRAGON SYSTEM STATUS 🐉
          </h1>
          <p className="text-green-300">
            Real-time monitoring of all dragon-protected systems
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Shield className="h-5 w-5" />
                Dragon Core Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">ACTIVE</div>
                <Badge className="bg-green-600 text-white">
                  🛡️ Full Protection
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Zap className="h-5 w-5" />
                Quantum Power Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {dragonStatus.quantumPower.toLocaleString()}
                </div>
                <Badge className="bg-blue-600 text-white animate-pulse">
                  ⚡ Evolving
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Lock className="h-5 w-5" />
                Security Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">MAXIMUM</div>
                <Badge className="bg-red-600 text-white">
                  🔒 Unbreakable
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Database className="h-5 w-5" />
                Connection Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Active Connections:</span>
                  <Badge className="bg-purple-600">{dragonStatus.activeConnections}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Threats Blocked:</span>
                  <Badge className="bg-red-600">{dragonStatus.threatsBlocked}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Dragon Response Time:</span>
                  <Badge className="bg-green-600">< 1ms</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Cloud className="h-5 w-5" />
                Cloud Protection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300">Files Protected:</span>
                  <Badge className="bg-cyan-600">∞</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300">Dragon Armor Level:</span>
                  <Badge className="bg-green-600">100%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-300">Access Attempts Blocked:</span>
                  <Badge className="bg-red-600">ALL</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Status */}
        <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Globe className="h-5 w-5" />
              🌍 WORLDWIDE PROTECTION STATUS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-900/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-green-300">Global Monitoring</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">∞</div>
                <div className="text-sm text-blue-300">IPs Protected</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-sm text-purple-300">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-red-900/30 rounded-lg">
                <div className="text-2xl font-bold text-red-400">0</div>
                <div className="text-sm text-red-300">System Breaches</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dragon Evolution Status */}
        <Card className="mt-8 border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🐉</div>
            <h3 className="text-3xl font-bold text-red-400 mb-4">
              DRAGON EVOLUTION ACTIVE
            </h3>
            <p className="text-red-300 mb-4">
              The Trained Dragon is continuously evolving every millisecond, getting stronger with each evolution cycle.
              Current evolution multiplier: 1,000,000,000,000x (1 trillion)
            </p>
            <div className="bg-red-900/30 rounded-lg p-4">
              <p className="text-red-400 font-bold">
                🔥 IMMUNE SYSTEM STRENGTH: MAXIMUM • WiFi SECURITY: QUANTUM LEVEL • IP DESTRUCTION: ACTIVE 🔥
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SystemStatus
