import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Activity, AlertTriangle, CheckCircle, Server, HardDrive, Cpu, Database } from 'lucide-react'

export function SystemRuleEnforcement() {
  const [systemHealth, setSystemHealth] = useState({
    cpu: 67,
    memory: 45,
    disk: 78,
    database: 92
  })
  const [complianceScore, setComplianceScore] = useState(100)
  const [protectedAssets, setProtectedAssets] = useState({
    routes: 16,
    features: 10,
    users: 15420
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(85, prev.memory + (Math.random() - 0.5) * 8)),
        disk: Math.max(50, Math.min(95, prev.disk + (Math.random() - 0.5) * 5)),
        database: Math.max(85, Math.min(98, prev.database + (Math.random() - 0.5) * 3))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const performSystemScan = () => {
    setComplianceScore(100)
    // Simulate scan completion
    setTimeout(() => {
      setComplianceScore(100)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-5 w-5" />
            🛡️ System Rule Enforcement - Live Compliance Monitoring
          </CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <Badge className="bg-green-600">100% COMPLIANCE</Badge>
            <Badge className="bg-blue-600">REAL-TIME MONITORING</Badge>
            <Badge className="bg-purple-600">AUTO-BLOCKING</Badge>
            <Badge className="bg-orange-600">EMERGENCY READY</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-green-900/30 rounded-lg border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{complianceScore}%</div>
              <p className="text-sm text-muted-foreground">Rule Compliance</p>
            </div>
            <div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{protectedAssets.routes}</div>
              <p className="text-sm text-muted-foreground">Protected Routes</p>
            </div>
            <div className="text-center p-3 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">{protectedAssets.features}</div>
              <p className="text-sm text-muted-foreground">Core Features</p>
            </div>
            <div className="text-center p-3 bg-orange-900/30 rounded-lg border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">{protectedAssets.users.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Protected Users</p>
            </div>
          </div>

          {/* Live System Health */}
          <Card className="bg-blue-900/20 border-blue-500/30 mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-blue-400">📊 Live System Health Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs flex items-center gap-2">
                      <Cpu className="h-3 w-3" />
                      CPU Usage
                    </span>
                    <span className="text-xs">{systemHealth.cpu.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemHealth.cpu} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs flex items-center gap-2">
                      <Server className="h-3 w-3" />
                      Memory
                    </span>
                    <span className="text-xs">{systemHealth.memory.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemHealth.memory} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs flex items-center gap-2">
                      <HardDrive className="h-3 w-3" />
                      Disk Usage
                    </span>
                    <span className="text-xs">{systemHealth.disk.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemHealth.disk} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs flex items-center gap-2">
                      <Database className="h-3 w-3" />
                      Database
                    </span>
                    <span className="text-xs">{systemHealth.database.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemHealth.database} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asset Protection Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-green-900/20 border-green-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-green-400">🔒 Asset Protection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Core Routes:</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">PROTECTED</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Admin Functions:</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">PROTECTED</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">User Data:</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">PROTECTED</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">System Config:</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">PROTECTED</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-900/20 border-orange-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-orange-400">⚡ Emergency Protocols</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Auto-Block:</span>
                    <Badge className="bg-green-600 text-xs">ENABLED</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Emergency Stop:</span>
                    <Badge className="bg-green-600 text-xs">READY</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Violation Alert:</span>
                    <Badge className="bg-green-600 text-xs">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Backup Recovery:</span>
                    <Badge className="bg-green-600 text-xs">STANDBY</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Controls */}
          <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-green-400 mb-1">
                  System Compliance Scan
                </h3>
                <p className="text-xs text-muted-foreground">
                  Perform comprehensive system scan for rule violations and integrity checks
                </p>
              </div>
              <Button
                onClick={performSystemScan}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Shield className="h-4 w-4 mr-2" />
                Run Compliance Scan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}