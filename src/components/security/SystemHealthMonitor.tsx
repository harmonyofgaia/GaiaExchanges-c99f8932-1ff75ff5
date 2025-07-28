
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Activity, Database, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface HealthMetrics {
  total_connections: number
  long_queries: number
  blocked_queries: number
  tables_without_pk: number
}

interface SystemHealthLog {
  id: string
  total_connections: number
  long_queries: number
  blocked_queries: number
  tables_without_pk: number
  checked_at: string
}

export function SystemHealthMonitor() {
  const [currentHealth, setCurrentHealth] = useState<HealthMetrics | null>(null)
  const [healthHistory, setHealthHistory] = useState<SystemHealthLog[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadHealthHistory()
    runHealthCheck()
  }, [])

  const loadHealthHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('system_health_log')
        .select('*')
        .order('checked_at', { ascending: false })
        .limit(10)
      
      if (error) throw error
      setHealthHistory(data || [])
    } catch (error) {
      console.error('Error loading health history:', error)
    }
  }

  const runHealthCheck = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc('database_health_check')
      if (error) throw error

      // Ensure data matches HealthMetrics interface with proper type casting
      const healthData: HealthMetrics = {
        total_connections: Number(data?.total_connections) || 0,
        long_queries: Number(data?.long_queries) || 0,
        blocked_queries: Number(data?.blocked_queries) || 0,
        tables_without_pk: Number(data?.tables_without_pk) || 0
      }
      setCurrentHealth(healthData)
      
      // Log the health check event - convert to plain object
      await supabase.rpc('log_comprehensive_security_event', {
        p_event_type: 'HEALTH_CHECK_COMPLETED',
        p_severity: 'INFO',
        p_event_details: {
          total_connections: healthData.total_connections,
          long_queries: healthData.long_queries,
          blocked_queries: healthData.blocked_queries,
          tables_without_pk: healthData.tables_without_pk
        }
      })

      toast.success('System health check completed')
      loadHealthHistory()
    } catch (error: any) {
      console.error('Error running health check:', error)
      toast.error(`Health check failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const getHealthStatus = (metrics: HealthMetrics) => {
    if (metrics.blocked_queries > 5 || metrics.long_queries > 10) {
      return { status: 'critical', color: 'red' }
    } else if (metrics.long_queries > 5 || metrics.tables_without_pk > 0) {
      return { status: 'warning', color: 'yellow' }
    } else {
      return { status: 'healthy', color: 'green' }
    }
  }

  const runDatabaseOptimization = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc('fix_performance_issues')
      if (error) throw error

      await supabase.rpc('log_comprehensive_security_event', {
        p_event_type: 'DATABASE_OPTIMIZATION_RUN',
        p_severity: 'INFO',
        p_event_details: data
      })

      toast.success('Database optimization completed')
      runHealthCheck()
    } catch (error: any) {
      console.error('Error running database optimization:', error)
      toast.error(`Optimization failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">System Health Monitor</h2>
        <Button
          onClick={runHealthCheck}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Run Health Check
        </Button>
      </div>

      {currentHealth && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-black/70">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-blue-400 text-sm">
                <Database className="h-4 w-4" />
                Total Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {currentHealth.total_connections}
              </div>
              <Badge variant={currentHealth.total_connections > 50 ? 'destructive' : 'default'}>
                {currentHealth.total_connections > 50 ? 'High' : 'Normal'}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-black/70">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-yellow-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                Long Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {currentHealth.long_queries}
              </div>
              <Badge variant={currentHealth.long_queries > 5 ? 'destructive' : 'default'}>
                {currentHealth.long_queries > 5 ? 'Warning' : 'Good'}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-black/70">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                Blocked Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {currentHealth.blocked_queries}
              </div>
              <Badge variant={currentHealth.blocked_queries > 0 ? 'destructive' : 'default'}>
                {currentHealth.blocked_queries > 0 ? 'Critical' : 'Good'}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/70">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-purple-400 text-sm">
                <Activity className="h-4 w-4" />
                Tables w/o PK
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {currentHealth.tables_without_pk}
              </div>
              <Badge variant={currentHealth.tables_without_pk > 0 ? 'destructive' : 'default'}>
                {currentHealth.tables_without_pk > 0 ? 'Needs Fix' : 'Good'}
              </Badge>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-black/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Database className="h-5 w-5" />
              System Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={runDatabaseOptimization}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Run Database Optimization
            </Button>
            <p className="text-sm text-muted-foreground">
              Automatically fix performance issues, add missing indexes, and optimize database structure.
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-500/30 bg-gradient-to-br from-gray-900/20 to-black/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-400">
              <Activity className="h-5 w-5" />
              Health History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {healthHistory.map((log) => {
                const health = getHealthStatus(log)
                return (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            health.status === 'critical' ? 'destructive' :
                            health.status === 'warning' ? 'default' : 'secondary'
                          }
                        >
                          {health.status}
                        </Badge>
                        <span className="text-sm text-white">
                          C:{log.total_connections} L:{log.long_queries} B:{log.blocked_queries}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.checked_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )
              })}
              {healthHistory.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No health history available
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
