
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertTriangle, Bug, TrendingDown, RefreshCw, CheckCircle } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface ErrorAggregate {
  error_type: string
  total_count: number
  first_occurrence: string
  last_occurrence: string
}

interface ErrorTrend {
  error_trend: any
}

export function ErrorTrackingDashboard() {
  const [errorAggregates, setErrorAggregates] = useState<ErrorAggregate[]>([])
  const [errorTrends, setErrorTrends] = useState<ErrorTrend[]>([])
  const [selectedTimeWindow, setSelectedTimeWindow] = useState('24 hours')
  const [selectedSeverity, setSelectedSeverity] = useState('WARNING')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadErrorData()
  }, [selectedTimeWindow, selectedSeverity])

  const loadErrorData = async () => {
    setLoading(true)
    try {
      // Load error aggregates with correct parameter names
      const { data: aggregates, error: aggError } = await supabase
        .rpc('aggregate_errors', {
          p_time_window: selectedTimeWindow,
          p_min_severity: selectedSeverity
        })
      
      if (aggError) throw aggError
      setErrorAggregates(aggregates || [])

      // Load error trends
      const days = selectedTimeWindow === '24 hours' ? 1 : selectedTimeWindow === '7 days' ? 7 : 30
      const { data: trends, error: trendError } = await supabase
        .rpc('analyze_error_trends', { p_days: days })
      
      if (trendError) throw trendError
      setErrorTrends(trends || [])

    } catch (error: any) {
      console.error('Error loading error data:', error)
      toast.error(`Failed to load error data: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const runAutoResolution = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.rpc('auto_resolve_errors')
      if (error) throw error

      await supabase.rpc('log_comprehensive_security_event', {
        p_event_type: 'AUTO_RESOLUTION_RUN',
        p_severity: 'INFO',
        p_event_details: { action: 'auto_resolve_errors' }
      })

      toast.success('Auto-resolution completed successfully')
      loadErrorData()
    } catch (error: any) {
      console.error('Error running auto-resolution:', error)
      toast.error(`Auto-resolution failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const trackTestError = async () => {
    try {
      const { data, error } = await supabase.rpc('track_error', {
        p_error_type: 'TEST_ERROR',
        p_error_message: 'Test error for dashboard validation',
        p_error_context: { source: 'admin_dashboard', test: true },
        p_severity_level: 'INFO'
      })

      if (error) throw error

      toast.success('Test error tracked successfully')
      loadErrorData()
    } catch (error: any) {
      console.error('Error tracking test error:', error)
      toast.error(`Failed to track test error: ${error.message}`)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL': return 'destructive'
      case 'ERROR': return 'destructive'
      case 'WARNING': return 'default'
      case 'INFO': return 'secondary'
      default: return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Error Tracking Dashboard</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedTimeWindow} onValueChange={setSelectedTimeWindow}>
            <SelectTrigger className="w-32 bg-black/30 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24 hours">24 Hours</SelectItem>
              <SelectItem value="7 days">7 Days</SelectItem>
              <SelectItem value="30 days">30 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-32 bg-black/30 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INFO">Info+</SelectItem>
              <SelectItem value="WARNING">Warning+</SelectItem>
              <SelectItem value="ERROR">Error+</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={loadErrorData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-black/70">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-400 text-sm">
              <AlertTriangle className="h-4 w-4" />
              Total Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {errorAggregates.reduce((sum, err) => sum + err.total_count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              In the last {selectedTimeWindow}
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-black/70">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-yellow-400 text-sm">
              <Bug className="h-4 w-4" />
              Error Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {errorAggregates.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique error types
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-black/70">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-green-400 text-sm">
              <TrendingDown className="h-4 w-4" />
              Resolution Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Active</div>
            <p className="text-xs text-muted-foreground">
              System monitoring
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Bug className="h-5 w-5" />
              Error Aggregates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {errorAggregates.map((error, index) => (
                <div
                  key={index}
                  className="p-3 bg-black/30 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      {error.error_type}
                    </span>
                    <Badge variant="destructive">
                      {error.total_count}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>First: {new Date(error.first_occurrence).toLocaleString()}</div>
                    <div>Last: {new Date(error.last_occurrence).toLocaleString()}</div>
                  </div>
                </div>
              ))}
              {errorAggregates.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No errors found for the selected criteria
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-black/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <TrendingDown className="h-5 w-5" />
              Error Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={runAutoResolution}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Run Auto-Resolution
            </Button>
            
            <Button
              onClick={trackTestError}
              disabled={loading}
              variant="outline"
              className="w-full border-gray-600"
            >
              <Bug className="h-4 w-4 mr-2" />
              Track Test Error
            </Button>

            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Error Trends</h4>
              {errorTrends.map((trend, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  <pre>{JSON.stringify(trend.error_trend, null, 2)}</pre>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
