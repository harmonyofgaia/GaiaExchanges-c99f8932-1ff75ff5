
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Globe, 
  Shield, 
  Activity, 
  Target, 
  Network,
  Satellite,
  Command,
  Zap,
  Eye,
  Lock,
  Radio,
  Server
} from 'lucide-react'
import { toast } from 'sonner'

export function GlobalCommandCenter() {
  const [commandStats, setCommandStats] = useState({
    globalNodes: 247,
    activeConnections: 1847,
    networkStrength: 94.7,
    commandsExecuted: 12847,
    securityLevel: 98.2,
    globalCoverage: 89.5
  })

  const [selectedRegion, setSelectedRegion] = useState('global')

  useEffect(() => {
    const interval = setInterval(() => {
      setCommandStats(prev => ({
        ...prev,
        globalNodes: prev.globalNodes + Math.floor(Math.random() * 3),
        activeConnections: Math.floor(Math.random() * 2000 + 1500),
        networkStrength: Math.min(100, prev.networkStrength + Math.random() * 0.5),
        commandsExecuted: prev.commandsExecuted + Math.floor(Math.random() * 10),
        securityLevel: Math.min(100, prev.securityLevel + Math.random() * 0.1),
        globalCoverage: Math.min(100, prev.globalCoverage + Math.random() * 0.2)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const executeGlobalCommand = (command: string) => {
    toast.success('🌍 Global Command Executed!', {
      description: `Command "${command}" executed across all nodes`,
      duration: 5000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/50 bg-gradient-to-r from-cyan-900/40 to-blue-900/40">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            🌍 GLOBAL COMMAND CENTER
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-cyan-300">
              Worldwide Network Control • Global Operations • Command Authority
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-cyan-600 animate-pulse">GLOBAL REACH</Badge>
              <Badge className="bg-blue-600 animate-pulse">COMMAND CONTROL</Badge>
              <Badge className="bg-purple-600 animate-pulse">SECURE NETWORK</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Global Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="p-4 text-center">
            <Globe className="h-8 w-8 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-green-400">{commandStats.globalNodes}</div>
            <div className="text-sm text-muted-foreground">Global Nodes</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <Network className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-blue-400">{commandStats.activeConnections.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Active Connections</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <Satellite className="h-8 w-8 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-purple-400">{commandStats.networkStrength.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Network Strength</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-4 text-center">
            <Command className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{commandStats.commandsExecuted.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Commands Executed</div>
          </CardContent>
        </Card>
        
        <Card className="border-red-500/30 bg-red-900/20">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto text-red-400 mb-2" />
            <div className="text-2xl font-bold text-red-400">{commandStats.securityLevel.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Security Level</div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto text-orange-400 mb-2" />
            <div className="text-2xl font-bold text-orange-400">{commandStats.globalCoverage.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Global Coverage</div>
          </CardContent>
        </Card>
      </div>

      {/* Command Control Panel */}
      <Card className="border-red-500/30 bg-red-900/20">
        <CardHeader>
          <CardTitle className="text-red-400">🎯 Global Command Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => executeGlobalCommand('Network Scan')}
              className="bg-blue-600 hover:bg-blue-700 h-16"
            >
              <Globe className="h-6 w-6 mr-2" />
              🌐 GLOBAL SCAN
            </Button>
            
            <Button 
              onClick={() => executeGlobalCommand('Security Check')}
              className="bg-red-600 hover:bg-red-700 h-16"
            >
              <Shield className="h-6 w-6 mr-2" />
              🛡️ SECURITY CHECK
            </Button>
            
            <Button 
              onClick={() => executeGlobalCommand('Network Boost')}
              className="bg-purple-600 hover:bg-purple-700 h-16"
            >
              <Zap className="h-6 w-6 mr-2" />
              ⚡ NETWORK BOOST
            </Button>
            
            <Button 
              onClick={() => executeGlobalCommand('System Monitor')}
              className="bg-green-600 hover:bg-green-700 h-16"
            >
              <Activity className="h-6 w-6 mr-2" />
              📊 SYSTEM MONITOR
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Network Status Map */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400">🗺️ Global Network Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="text-purple-400 font-bold">🌎 Americas</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>North America</span>
                  <Badge className="bg-green-600">ONLINE</Badge>
                </div>
                <div className="flex justify-between">
                  <span>South America</span>
                  <Badge className="bg-green-600">ONLINE</Badge>
                </div>
                <Progress value={97} className="h-2" />
                <div className="text-xs text-muted-foreground">Coverage: 97%</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-blue-400 font-bold">🌍 Europe & Africa</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Europe</span>
                  <Badge className="bg-green-600">ONLINE</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Africa</span>
                  <Badge className="bg-yellow-600">EXPANDING</Badge>
                </div>
                <Progress value={89} className="h-2" />
                <div className="text-xs text-muted-foreground">Coverage: 89%</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-cyan-400 font-bold">🌏 Asia & Oceania</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Asia</span>
                  <Badge className="bg-green-600">ONLINE</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Oceania</span>
                  <Badge className="bg-green-600">ONLINE</Badge>
                </div>
                <Progress value={93} className="h-2" />
                <div className="text-xs text-muted-foreground">Coverage: 93%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Operations */}
      <Card className="border-orange-500/30 bg-orange-900/20">
        <CardHeader>
          <CardTitle className="text-orange-400">⚡ Advanced Global Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🌍⚡</div>
            <h3 className="text-2xl font-bold text-orange-400">GLOBAL COMMAND AUTHORITY</h3>
            <p className="text-orange-300">
              Complete control over worldwide network operations and command execution
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-orange-400 font-bold">🎯 COMMAND CAPABILITIES:</h4>
                <div className="text-sm space-y-1">
                  <div>✅ Global Network Scanning</div>
                  <div>✅ Remote Node Control</div>
                  <div>✅ Security Enforcement</div>
                  <div>✅ Real-time Monitoring</div>
                  <div>✅ Automated Responses</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-orange-400 font-bold">⚡ NETWORK FEATURES:</h4>
                <div className="text-sm space-y-1">
                  <div>🔴 Emergency Override Protocol</div>
                  <div>🔴 Global Communication Hub</div>
                  <div>🔴 Distributed Command System</div>
                  <div>🔴 Encrypted Command Channels</div>
                  <div>🔴 Multi-Region Coordination</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
