
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Activity, Cpu, Database, Globe, Zap, TrendingUp } from 'lucide-react'

interface PerformanceMetrics {
  timestamp: string
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkThroughput: number
  responseTime: number
  activeConnections: number
}

export function PerformanceMonitoringDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([])
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceMetrics>({
    timestamp: new Date().toISOString(),
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkThroughput: 0,
    responseTime: 0,
    activeConnections: 0
  })

  useEffect(() => {
    const generateMetrics = () => {
      const now = new Date()
      const newMetric: PerformanceMetrics = {
        timestamp: now.toISOString(),
        cpuUsage: Math.random() * 30 + 20, // 20-50%
        memoryUsage: Math.random() * 20 + 40, // 40-60%
        diskUsage: Math.random() * 10 + 30, // 30-40%
        networkThroughput: Math.random() * 1000 + 500, // 500-1500 MB/s
        responseTime: Math.random() * 100 + 50, // 50-150ms
        activeConnections: Math.floor(Math.random() * 500) + 1000 // 1000-1500
      }

      setCurrentMetrics(newMetric)
      setMetrics(prev => [...prev.slice(-29), newMetric]) // Keep last 30 points

      console.log('📊 Performance metrics updated:', newMetric)
    }

    generateMetrics()
    const interval = setInterval(generateMetrics, 3000)

    return () => clearInterval(interval)
  }, [])

  const getHealthStatus = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return { status: 'critical', color: 'text-red-400 bg-red-900/30' }
    if (value >= thresholds.warning) return { status: 'warning', color: 'text-yellow-400 bg-yellow-900/30' }
    return { status: 'healthy', color: 'text-green-400 bg-green-900/30' }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Activity className="h-6 w-6" />
          Performance Monitoring Dashboard
          <Badge className="bg-purple-600 animate-pulse">REAL-TIME</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">CPU Usage</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {currentMetrics.cpuUsage.toFixed(1)}%
            </div>
            <Progress value={currentMetrics.cpuUsage} className="h-2" />
            <Badge className={getHealthStatus(currentMetrics.cpuUsage, { warning: 70, critical: 90 }).color}>
              {getHealthStatus(currentMetrics.cpuUsage, { warning: 70, critical: 90 }).status.toUpperCase()}
            </Badge>
          </div>

          <div className="bg-green-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-semibold">Memory Usage</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {currentMetrics.memoryUsage.toFixed(1)}%
            </div>
            <Progress value={currentMetrics.memoryUsage} className="h-2" />
            <Badge className={getHealthStatus(currentMetrics.memoryUsage, { warning: 80, critical: 95 }).color}>
              {getHealthStatus(currentMetrics.memoryUsage, { warning: 80, critical: 95 }).status.toUpperCase()}
            </Badge>
          </div>

          <div className="bg-purple-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">Network</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {currentMetrics.networkThroughput.toFixed(0)} MB/s
            </div>
            <Progress value={(currentMetrics.networkThroughput / 2000) * 100} className="h-2" />
            <Badge className="text-purple-400 bg-purple-900/30">ACTIVE</Badge>
          </div>

          <div className="bg-yellow-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Response Time</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {currentMetrics.responseTime.toFixed(0)}ms
            </div>
            <Progress value={(currentMetrics.responseTime / 200) * 100} className="h-2" />
            <Badge className={getHealthStatus(currentMetrics.responseTime, { warning: 150, critical: 300 }).color}>
              {getHealthStatus(currentMetrics.responseTime, { warning: 150, critical: 300 }).status.toUpperCase()}
            </Badge>
          </div>

          <div className="bg-cyan-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Disk Usage</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {currentMetrics.diskUsage.toFixed(1)}%
            </div>
            <Progress value={currentMetrics.diskUsage} className="h-2" />
            <Badge className={getHealthStatus(currentMetrics.diskUsage, { warning: 80, critical: 95 }).color}>
              {getHealthStatus(currentMetrics.diskUsage, { warning: 80, critical: 95 }).status.toUpperCase()}
            </Badge>
          </div>

          <div className="bg-red-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-red-400" />
              <span className="text-red-400 font-semibold">Connections</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {currentMetrics.activeConnections}
            </div>
            <Progress value={(currentMetrics.activeConnections / 2000) * 100} className="h-2" />
            <Badge className="text-red-400 bg-red-900/30">ACTIVE</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-black/40 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-lg">CPU & Memory Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      stroke="#9CA3AF"
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151' 
                      }}
                    />
                    <Line type="monotone" dataKey="cpuUsage" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="memoryUsage" stroke="#10B981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-lg">Network & Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      stroke="#9CA3AF"
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151' 
                      }}
                    />
                    <Area type="monotone" dataKey="responseTime" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
