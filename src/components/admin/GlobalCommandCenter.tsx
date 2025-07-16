
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Globe, 
  Command, 
  Shield, 
  Zap, 
  Activity, 
  Settings, 
  Target,
  Satellite,
  Radar,
  Lock,
  Eye,
  Brain,
  Database
} from 'lucide-react'
import { toast } from 'sonner'

export function GlobalCommandCenter() {
  const [globalStatus, setGlobalStatus] = useState('OPERATIONAL')
  const [commandsExecuted, setCommandsExecuted] = useState(2847593)
  const [networkCoverage, setNetworkCoverage] = useState(99.7)
  const [activeMissions, setActiveMissions] = useState(47)

  const handleGlobalCommand = (command: string) => {
    setCommandsExecuted(prev => prev + 1)
    toast.success(`🌍 Global command "${command}" executed successfully!`)
  }

  return (
    <div className="space-y-6">
      {/* Global Command Header */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Globe className="h-6 w-6" />
            🌍 GLOBAL COMMAND CENTER - SUPREME CONTROL INTERFACE
          </CardTitle>
          <p className="text-muted-foreground">
            Ultimate global control system with real-time command execution and infinite reach
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-900/30 border border-red-500/20 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{globalStatus}</div>
              <div className="text-sm text-muted-foreground">Global Status</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">{commandsExecuted.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Commands Executed</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 border border-yellow-500/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{networkCoverage}%</div>
              <div className="text-sm text-muted-foreground">Network Coverage</div>
            </div>  
            <div className="text-center p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{activeMissions}</div>
              <div className="text-sm text-muted-foreground">Active Missions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="command-console" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="command-console">⌨️ Command Console</TabsTrigger>
          <TabsTrigger value="global-network">🌐 Global Network</TabsTrigger>
          <TabsTrigger value="mission-control">🎯 Mission Control</TabsTrigger>
          <TabsTrigger value="surveillance">👁️ Surveillance</TabsTrigger>
          <TabsTrigger value="system-control">⚙️ System Control</TabsTrigger>
        </TabsList>

        <TabsContent value="command-console">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">⌨️ Global Command Terminal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-32 bg-black/40 rounded p-3 font-mono text-sm overflow-y-auto">
                  <div className="text-green-400">GAIA GLOBAL COMMAND SYSTEM v2.0</div>
                  <div className="text-blue-400">System Status: OPERATIONAL</div>
                  <div className="text-yellow-400">Network Reach: GLOBAL</div>
                  <div className="text-purple-400">Security Level: MAXIMUM</div>
                  <div className="text-green-400">Ready for commands...</div>
                  <div className="text-white">$&gt; _</div>
                </div>
                
                <div className="flex gap-2">
                  <Input placeholder="Enter global command..." className="flex-1 font-mono" />
                  <Button 
                    onClick={() => handleGlobalCommand('EXECUTE')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Command className="h-4 w-4 mr-2" />
                    Execute
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleGlobalCommand('SYSTEM_SCAN')}
                    className="bg-blue-600 hover:bg-blue-700 text-xs"
                  >
                    System Scan
                  </Button>
                  <Button 
                    onClick={() => handleGlobalCommand('NETWORK_BOOST')}
                    className="bg-purple-600 hover:bg-purple-700 text-xs"
                  >
                    Network Boost
                  </Button>
                  <Button 
                    onClick={() => handleGlobalCommand('SECURITY_MAX')}
                    className="bg-red-600 hover:bg-red-700 text-xs"
                  >
                    Max Security
                  </Button>
                  <Button 
                    onClick={() => handleGlobalCommand('GLOBAL_SYNC')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-xs"
                  >
                    Global Sync
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">📊 Command Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Commands Today:</span>
                    <span className="font-bold text-blue-400">8,947</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-bold text-green-400">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Response Time:</span>
                    <span className="font-bold text-yellow-400">0.047s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Global Reach:</span>
                    <span className="font-bold text-purple-400">247 Countries</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-500/20">
                  <h4 className="font-bold text-blue-400 mb-2">Recent Commands:</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>GLOBAL_OPTIMIZE</span>
                      <Badge className="bg-green-600">SUCCESS</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>NETWORK_EXPAND</span>
                      <Badge className="bg-green-600">SUCCESS</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>SECURITY_UPDATE</span>
                      <Badge className="bg-green-600">SUCCESS</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="global-network">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">🛰️ Satellite Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Satellite className="h-12 w-12 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-cyan-400">247</div>
                  <div className="text-sm text-muted-foreground">Active Satellites</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <Badge className="bg-green-600">GLOBAL</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Signal Strength:</span>
                    <span className="text-green-400 font-bold">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Transmission:</span>
                    <span className="text-blue-400 font-bold">847TB/s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🗼 Ground Stations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>🇺🇸 North America:</span>
                    <Badge className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇪🇺 Europe:</span>
                    <Badge className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇦🇸 Asia Pacific:</span>
                    <Badge className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🌍 Africa:</span>
                    <Badge className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🌎 South America:</span>
                    <Badge className="bg-green-600">ACTIVE</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">📡 Communication Hub</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Radar className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">24/7</div>
                  <div className="text-sm text-muted-foreground">Communication Active</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Encrypted Channels:</span>
                    <span className="text-green-400 font-bold">∞</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Level:</span>
                    <Badge className="bg-red-600">QUANTUM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mission-control">
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">🎯 Active Missions Control Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-orange-400">🚀 High Priority Missions:</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-900/30 rounded border border-red-500/20">
                      <div className="font-bold text-red-400">MISSION ALPHA-247</div>
                      <div className="text-sm text-muted-foreground">Global network expansion - Phase 3</div>
                      <div className="text-xs text-green-400">Status: 89% Complete</div>
                    </div>
                    <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
                      <div className="font-bold text-blue-400">MISSION BETA-156</div>
                      <div className="text-sm text-muted-foreground">Security protocol upgrade</div>
                      <div className="text-xs text-yellow-400">Status: In Progress</div>
                    </div>
                    <div className="p-3 bg-green-900/30 rounded border border-green-500/20">
                      <div className="font-bold text-green-400">MISSION GAMMA-089</div>
                      <div className="text-sm text-muted-foreground">Data processing optimization</div>
                      <div className="text-xs text-green-400">Status: Complete</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-orange-400">📊 Mission Statistics:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-orange-900/30 rounded">
                      <div className="text-xl font-bold text-orange-400">47</div>
                      <div className="text-xs text-muted-foreground">Active Missions</div>
                    </div>
                    <div className="text-center p-3 bg-green-900/30 rounded">
                      <div className="text-xl font-bold text-green-400">2,847</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-blue-900/30 rounded">
                      <div className="text-xl font-bold text-blue-400">99.7%</div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-purple-900/30 rounded">
                      <div className="text-xl font-bold text-purple-400">24/7</div>
                      <div className="text-xs text-muted-foreground">Operations</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surveillance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="text-red-400">👁️ Global Surveillance Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Eye className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-red-400">ACTIVE</div>
                  <div className="text-sm text-muted-foreground">24/7 Global Monitoring</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 h-16 flex-col">
                    <Eye className="h-5 w-5 mb-1" />
                    <span className="text-xs">Live Monitor</span>
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 h-16 flex-col">
                    <Target className="h-5 w-5 mb-1" />
                    <span className="text-xs">Target Scan</span>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex-col">
                    <Brain className="h-5 w-5 mb-1" />
                    <span className="text-xs">AI Analysis</span>
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex-col">
                    <Database className="h-5 w-5 mb-1" />
                    <span className="text-xs">Data Mining</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">🛡️ Security Intelligence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Threat Level:</span>
                    <Badge className="bg-green-600">MINIMAL</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Scans:</span>
                    <span className="text-purple-400 font-bold">24,793</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incidents Detected:</span>
                    <span className="text-green-400 font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span className="text-blue-400 font-bold">0.001s</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-500/20">
                  <h4 className="font-bold text-purple-400 mb-2">Live Alerts:</h4>
                  <div className="h-24 bg-black/20 rounded p-2 text-xs">
                    <div className="text-green-400">✅ All systems nominal</div>
                    <div className="text-green-400">✅ Network security optimal</div>
                    <div className="text-green-400">✅ No threats detected</div>
                    <div className="text-blue-400">📊 Monitoring 247 countries</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system-control">
          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">⚙️ Ultimate System Control Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-yellow-400">🔋 Power Management:</h4>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => handleGlobalCommand('POWER_MAX')}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Maximum Power
                    </Button>
                    <Button 
                      onClick={() => handleGlobalCommand('EFFICIENCY_MODE')}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Efficiency Mode
                    </Button>
                    <Button 
                      onClick={() => handleGlobalCommand('STEALTH_MODE')}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Stealth Mode
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-yellow-400">🌐 Network Control:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Global Bandwidth:</span>
                      <Badge className="bg-blue-600">UNLIMITED</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Server Response:</span>
                      <span className="text-green-400 font-bold">0.001s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Processing:</span>
                      <span className="text-blue-400 font-bold">∞ TB/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Level:</span>
                      <Badge className="bg-red-600">QUANTUM</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-yellow-400">📊 Status Monitor:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-400" />
                      <span className="text-sm">All systems operational</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">Security protocols active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">Global network synchronized</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">Maximum power available</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
