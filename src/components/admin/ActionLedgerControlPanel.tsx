import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { 
  Activity, 
  History, 
  Settings, 
  RotateCcw, 
  Play, 
  Pause, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Database,
  Shield,
  Zap,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

// Constants
const REAL_TIME_INTERVAL_MS = 5000 // 5 seconds
const ONE_HOUR_IN_MS = 60 * 60 * 1000 // 1 hour in milliseconds

interface ActionLog {
  id: string
  timestamp: string
  user: string
  action: string
  category: 'security' | 'user' | 'system' | 'database' | 'deployment'
  status: 'success' | 'error' | 'pending' | 'reversed'
  description: string
  reversible: boolean
  impact: 'low' | 'medium' | 'high' | 'critical'
}

export function ActionLedgerControlPanel() {
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
  const [autoRollbackEnabled, setAutoRollbackEnabled] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      user: 'Admin',
      action: 'USER_PERMISSION_UPDATE',
      category: 'security',
      status: 'success',
      description: 'Updated user permissions for enhanced access control',
      reversible: true,
      impact: 'medium'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      user: 'System',
      action: 'DATABASE_BACKUP',
      category: 'database',
      status: 'success',
      description: 'Automated database backup completed successfully',
      reversible: false,
      impact: 'low'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      user: 'Admin',
      action: 'SECURITY_PROTOCOL_CHANGE',
      category: 'security',
      status: 'success',
      description: 'Enhanced quantum security protocols activated',
      reversible: true,
      impact: 'high'
    }
  ])

  const [systemMetrics] = useState({
    totalActions: 1247,
    todayActions: 23,
    reversibleActions: 845,
    criticalActions: 12,
    systemHealth: 98.7,
    activeControls: 15
  })

  useEffect(() => {
    if (isRealTimeEnabled) {
      const interval = setInterval(() => {
        // Simulate real-time action monitoring
        const newAction: ActionLog = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          user: 'System',
          action: 'REAL_TIME_MONITOR',
          category: 'system',
          status: 'success',
          description: 'Real-time system monitoring check completed',
          reversible: false,
          impact: 'low'
        }
        setActionLogs(prev => [newAction, ...prev.slice(0, 19)]) // Keep last 20 logs
      }, REAL_TIME_INTERVAL_MS)

      return () => clearInterval(interval)
    }
  }, [isRealTimeEnabled])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="h-4 w-4" />
      case 'user': return <User className="h-4 w-4" />
      case 'system': return <Settings className="h-4 w-4" />
      case 'database': return <Database className="h-4 w-4" />
      case 'deployment': return <Zap className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-900/30'
      case 'error': return 'text-red-400 bg-red-900/30'
      case 'pending': return 'text-yellow-400 bg-yellow-900/30'
      case 'reversed': return 'text-blue-400 bg-blue-900/30'
      default: return 'text-gray-400 bg-gray-900/30'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-400 bg-red-900/30'
      case 'high': return 'text-orange-400 bg-orange-900/30'
      case 'medium': return 'text-yellow-400 bg-yellow-900/30'
      case 'low': return 'text-green-400 bg-green-900/30'
      default: return 'text-gray-400 bg-gray-900/30'
    }
  }

  const handleReverseAction = (actionId: string) => {
    setActionLogs(prev => 
      prev.map(log => 
        log.id === actionId 
          ? { ...log, status: 'reversed' as const }
          : log
      )
    )
    toast.success('🔄 Action successfully reversed', {
      description: 'System state has been restored to previous configuration'
    })
  }

  const handleEmergencyRollback = () => {
    toast.warning('⚠️ Emergency rollback initiated', {
      description: 'All reversible actions from the last hour are being rolled back'
    })
    setActionLogs(prev => 
      prev.map(log => {
        const actionTime = new Date(log.timestamp).getTime()
        const oneHourAgo = Date.now() - ONE_HOUR_IN_MS
        return actionTime > oneHourAgo && log.reversible
          ? { ...log, status: 'reversed' as const }
          : log
      })
    )
  }

  const filteredLogs = actionLogs.filter(log => {
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Activity className="h-6 w-6" />
            📋 Action Ledger & Control Panel
          </CardTitle>
          <p className="text-muted-foreground">
            Real-time action monitoring with reversible controls and system rollback capabilities
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="p-3 bg-green-900/20 rounded-lg text-center">
              <div className="text-xl font-bold text-green-400">{systemMetrics.totalActions}</div>
              <div className="text-xs text-muted-foreground">Total Actions</div>
            </div>
            <div className="p-3 bg-blue-900/20 rounded-lg text-center">
              <div className="text-xl font-bold text-blue-400">{systemMetrics.todayActions}</div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
            <div className="p-3 bg-yellow-900/20 rounded-lg text-center">
              <div className="text-xl font-bold text-yellow-400">{systemMetrics.reversibleActions}</div>
              <div className="text-xs text-muted-foreground">Reversible</div>
            </div>
            <div className="p-3 bg-red-900/20 rounded-lg text-center">
              <div className="text-xl font-bold text-red-400">{systemMetrics.criticalActions}</div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
            <div className="p-3 bg-purple-900/20 rounded-lg text-center">
              <div className="text-xl font-bold text-purple-400">{systemMetrics.systemHealth}%</div>
              <div className="text-xs text-muted-foreground">Health</div>
            </div>
            <div className="p-3 bg-cyan-900/20 rounded-lg text-center">
              <div className="text-xl font-bold text-cyan-400">{systemMetrics.activeControls}</div>
              <div className="text-xs text-muted-foreground">Active Controls</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="actions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="actions" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Action Log
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Real-time Controls
          </TabsTrigger>
          <TabsTrigger value="rollback" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Rollback Center
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Live Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Actions</Label>
                  <Input
                    id="search"
                    placeholder="Search by action, user, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Filter Category</Label>
                  <select
                    id="category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md"
                  >
                    <option value="all">All Categories</option>
                    <option value="security">Security</option>
                    <option value="user">User Management</option>
                    <option value="system">System</option>
                    <option value="database">Database</option>
                    <option value="deployment">Deployment</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 border border-border rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(log.category)}
                            <span className="font-medium">{log.action}</span>
                            <Badge className={getStatusColor(log.status)}>
                              {log.status}
                            </Badge>
                            <Badge className={getImpactColor(log.impact)}>
                              {log.impact}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{log.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {log.user}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {log.reversible && log.status === 'success' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReverseAction(log.id)}
                              className="text-blue-400 border-blue-500/30 hover:bg-blue-900/20"
                            >
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Reverse
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Real-time Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="realtime">Enable Real-time Monitoring</Label>
                  <Switch
                    id="realtime"
                    checked={isRealTimeEnabled}
                    onCheckedChange={setIsRealTimeEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autorollback">Auto-rollback on Critical Errors</Label>
                  <Switch
                    id="autorollback"
                    checked={autoRollbackEnabled}
                    onCheckedChange={setAutoRollbackEnabled}
                  />
                </div>
                <Button className="w-full" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh System Status
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authentication Status</span>
                    <Badge className="text-green-400 bg-green-900/30">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quantum Encryption</span>
                    <Badge className="text-green-400 bg-green-900/30">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Logging</span>
                    <Badge className="text-green-400 bg-green-900/30">Active</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Scan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rollback" className="space-y-4">
          <Card className="border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Rollback Center
              </CardTitle>
              <p className="text-muted-foreground">
                Critical system rollback controls - Use with extreme caution
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/20"
                  onClick={handleEmergencyRollback}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Rollback Last Hour
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-500/30 text-orange-400 hover:bg-orange-900/20"
                  onClick={() => toast.warning('Feature requires admin confirmation')}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Rollback Last 24h
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-900/20"
                  onClick={() => toast.error('Emergency protocol requires dual authorization')}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Reset
                </Button>
              </div>
              <Card className="bg-red-900/10 border-red-500/20">
                <CardContent className="p-4">
                  <p className="text-sm text-red-400 mb-2">⚠️ Important Safety Information:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Only reversible actions can be rolled back</li>
                    <li>• Emergency rollback affects all changes in the specified timeframe</li>
                    <li>• All rollback actions are logged and auditable</li>
                    <li>• Critical operations require dual administrator approval</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 text-sm">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">98.7%</div>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-muted-foreground">All systems operational</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 text-sm">Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">12</div>
                <div className="flex items-center gap-2 mt-2">
                  <User className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-muted-foreground">Admin sessions active</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 text-sm">Security Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">Maximum</div>
                <div className="flex items-center gap-2 mt-2">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span className="text-xs text-muted-foreground">Quantum protected</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-cyan-400">Live System Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-1 text-sm font-mono">
                  <div className="text-green-400">[{new Date().toLocaleTimeString()}] System health check: OK</div>
                  <div className="text-blue-400">[{new Date(Date.now() - 30000).toLocaleTimeString()}] Security scan completed: No threats detected</div>
                  <div className="text-yellow-400">[{new Date(Date.now() - 60000).toLocaleTimeString()}] Database backup initiated</div>
                  <div className="text-green-400">[{new Date(Date.now() - 90000).toLocaleTimeString()}] Real-time monitoring: Active</div>
                  <div className="text-purple-400">[{new Date(Date.now() - 120000).toLocaleTimeString()}] Quantum encryption: Verified</div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}