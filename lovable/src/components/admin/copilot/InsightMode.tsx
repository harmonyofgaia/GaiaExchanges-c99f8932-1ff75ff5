import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Eye, EyeOff, Activity, AlertTriangle, CheckCircle, 
  Clock, Database, Network, Cpu, BarChart3, Terminal,
  Play, Pause, RefreshCw, Settings, Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface InsightModeProps {
  children: React.ReactNode
  toolName: string
  toolId: string
}

interface LogEntry {
  id: string
  timestamp: Date
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  source: string
}

interface StatMetric {
  name: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'stable'
  status?: 'good' | 'warning' | 'error'
}

export function InsightMode({ children, toolName, toolId }: InsightModeProps) {
  const [insightActive, setInsightActive] = useState(false)
  const [realTimeStats, setRealTimeStats] = useState<StatMetric[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [errors, setErrors] = useState<LogEntry[]>([])
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)

  // Define updateRealTimeData using useCallback to ensure it's defined before use
  const updateRealTimeData = useCallback(() => {
    // Simulate real-time stats
    const mockStats: StatMetric[] = [
      {
        name: 'Active Sessions',
        value: 120,
        change: 5,
        trend: 'up',
        status: 'good'
      },
      {
        name: 'CPU Usage',
        value: '25%',
        change: -3,
        trend: 'down',
        status: 'good'
      },
      {
        name: 'Memory Usage',
        value: '35%',
        change: 2,
        trend: 'up',
        status: 'good'
      },
      {
        name: 'Response Time',
        value: '75ms',
        change: -5,
        trend: 'down',
        status: 'good'
      },
      {
        name: 'Database Queries',
        value: 300,
        change: 15,
        trend: 'up',
        status: 'good'
      }
    ]
    setRealTimeStats(mockStats)

    // Add new log entry
    const logLevels: ('info' | 'warn' | 'error' | 'debug')[] = ['info', 'warn', 'error', 'debug']
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level: logLevels[Math.floor(Math.random() * logLevels.length)],
      message: `${toolName} operation completed - ${Math.random() > 0.5 ? 'Success' : 'Processing'}`,
      source: toolId
    }

    setLogs(prev => [newLog, ...prev].slice(0, 50))

    if (newLog.level === 'error') {
      setErrors(prev => [newLog, ...prev].slice(0, 20))
    }
  }, [toolName, toolId])

  // Simulate real-time data updates
  useEffect(() => {
    if (!insightActive || !isAutoRefresh) return

    const interval = setInterval(() => {
      updateRealTimeData()
    }, 2000)

    return () => clearInterval(interval)
  }, [insightActive, isAutoRefresh, updateRealTimeData])

  const toggleInsightMode = () => {
    setInsightActive(!insightActive)
    if (!insightActive) {
      updateRealTimeData()
      toast.success(`🔍 Insight Mode activated for ${toolName}`, {
        description: 'Real-time monitoring and debugging active'
      })
    } else {
      toast.info(`👁️ Insight Mode deactivated for ${toolName}`)
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'good': return 'text-green-400 border-green-400'
      case 'warning': return 'text-yellow-400 border-yellow-400'
      case 'error': return 'text-red-400 border-red-400'
      default: return 'text-blue-400 border-blue-400'
    }
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      default: return '➡️'
    }
  }

  return (
    <div className="space-y-4">
      {/* Insight Mode Toggle */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className={`h-5 w-5 ${insightActive ? 'text-green-400' : 'text-gray-400'}`} />
              <div>
                <h3 className="font-semibold text-purple-400">🔍 Einstein Insight Mode</h3>
                <p className="text-sm text-gray-400">
                  {insightActive ? 'Real-time monitoring active' : 'Click to enable deep insights'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {insightActive && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                  className="border-blue-500/30"
                >
                  {isAutoRefresh ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isAutoRefresh ? 'Pause' : 'Resume'}
                </Button>
              )}
              <Button
                size="sm"
                onClick={toggleInsightMode}
                className={insightActive ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}
              >
                {insightActive ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {insightActive ? 'Disable' : 'Enable'} Insights
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insight Dashboard */}
      {insightActive && (
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Activity className="h-5 w-5" />
              🧠 Deep Insights: {toolName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="stats">📊 Real-Time Stats</TabsTrigger>
                <TabsTrigger value="logs">📝 Activity Logs</TabsTrigger>
                <TabsTrigger value="errors">⚠️ Error Monitor</TabsTrigger>
                <TabsTrigger value="debug">🐛 Debug Info</TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {realTimeStats.map((stat, index) => (
                    <Card key={index} className={`border ${getStatusColor(stat.status)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">{stat.name}</span>
                          <span>{getTrendIcon(stat.trend)}</span>
                        </div>
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        {stat.change !== undefined && (
                          <div className={`text-xs ${stat.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stat.change >= 0 ? '+' : ''}{stat.change}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="logs" className="space-y-2">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {logs.map((log) => (
                    <Card key={log.id} className="border-gray-700/50">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={log.level === 'error' ? 'destructive' : 'secondary'}>
                              {log.level.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-gray-300">{log.message}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="errors" className="space-y-2">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {errors.length === 0 ? (
                    <Card className="border-green-500/30">
                      <CardContent className="p-4 text-center">
                        <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <p className="text-green-400">No errors detected</p>
                      </CardContent>
                    </Card>
                  ) : (
                    errors.map((error) => (
                      <Card key={error.id} className="border-red-500/50">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                            <span className="text-sm text-red-300">{error.message}</span>
                            <span className="text-xs text-gray-500 ml-auto">
                              {error.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="debug" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-sm text-blue-400">
                        <Database className="h-4 w-4 inline mr-2" />
                        Database Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Connection Pool:</span>
                        <span className="text-xs text-green-400">Active (8/10)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Query Cache:</span>
                        <span className="text-xs text-green-400">85% Hit Rate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Transactions/sec:</span>
                        <span className="text-xs text-green-400">45.2</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-sm text-green-400">
                        <Network className="h-4 w-4 inline mr-2" />
                        Network Health
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Latency:</span>
                        <span className="text-xs text-green-400">32ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Throughput:</span>
                        <span className="text-xs text-green-400">2.4 MB/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Packet Loss:</span>
                        <span className="text-xs text-green-400">0.01%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Original Tool Content */}
      <div className="relative">
        {insightActive && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-purple-600/80 text-white">
              <Activity className="h-3 w-3 mr-1" />
              Insights Active
            </Badge>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
