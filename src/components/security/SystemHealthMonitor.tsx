
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

interface SystemHealthLog {
  id: number
  detected_at: string
  issue_type: string
  issue_description: string
  severity: number
  resolved: boolean
}

interface HealthMetrics {
  total_connections: number
  long_queries: number
  blocked_queries: number
  tables_without_pk: number
}

export function SystemHealthMonitor() {
  const [healthLogs, setHealthLogs] = useState<SystemHealthLog[]>([])
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHealthData()
    const interval = setInterval(fetchHealthData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchHealthData = async () => {
    try {
      // Fetch health logs from system_health_logs table
      const { data: logs, error: logsError } = await supabase
        .from('system_health_logs')
        .select('*')
        .order('detected_at', { ascending: false })
        .limit(10)

      if (logsError) throw logsError
      if (logs) setHealthLogs(logs)

      // Fetch current health metrics
      const { data: metrics, error: metricsError } = await supabase
        .rpc('get_system_health')

      if (metricsError) throw metricsError
      if (metrics) {
        setHealthMetrics({
          total_connections: Number(metrics.total_connections) || 0,
          long_queries: Number(metrics.long_queries) || 0,
          blocked_queries: Number(metrics.blocked_queries) || 0,
          tables_without_pk: Number(metrics.tables_without_pk) || 0
        })
      }

      // Log system health metrics
      if (metrics) {
        await supabase
          .from('system_health_logs')
          .insert({
            issue_type: 'system_check',
            issue_description: 'System health metrics recorded',
            severity: 1,
            resolved: true
          })
      }

    } catch (error) {
      console.error('Error fetching health data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: number) => {
    if (severity >= 9) return 'bg-red-500'
    if (severity >= 7) return 'bg-orange-500'
    if (severity >= 5) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getSeverityIcon = (severity: number, resolved: boolean) => {
    if (resolved) return <CheckCircle className="h-4 w-4 text-green-400" />
    if (severity >= 7) return <AlertTriangle className="h-4 w-4 text-red-400" />
    return <Clock className="h-4 w-4 text-yellow-400" />
  }

  if (loading) {
    return (
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <CardContent className="p-6">
          <div className="text-center">Loading system health data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Health Metrics Overview */}
      {healthMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-500/30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400">{healthMetrics.total_connections}</div>
              <div className="text-sm text-muted-foreground">Total Connections</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-400">{healthMetrics.long_queries}</div>
              <div className="text-sm text-muted-foreground">Long Queries</div>
            </CardContent>
          </Card>
          <Card className="border-orange-500/30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-400">{healthMetrics.blocked_queries}</div>
              <div className="text-sm text-muted-foreground">Blocked Queries</div>
            </CardContent>
          </Card>
          <Card className="border-red-500/30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-400">{healthMetrics.tables_without_pk}</div>
              <div className="text-sm text-muted-foreground">Tables w/o PK</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Health Logs */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <AlertTriangle className="h-5 w-5" />
            System Health Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthLogs.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No health logs found
              </div>
            ) : (
              healthLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-700/30"
                >
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(log.severity, log.resolved)}
                    <div>
                      <div className="font-medium">{log.issue_type}</div>
                      <div className="text-sm text-muted-foreground">
                        {log.issue_description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(log.detected_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getSeverityColor(log.severity)} text-white`}>
                      Severity {log.severity}
                    </Badge>
                    {log.resolved && (
                      <Badge className="bg-green-600">Resolved</Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
