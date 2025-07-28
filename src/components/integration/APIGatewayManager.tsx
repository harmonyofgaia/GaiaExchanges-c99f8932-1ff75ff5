
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Globe, Shield, Zap, Activity, AlertTriangle, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface APIEndpoint {
  id: string
  name: string
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  status: 'active' | 'inactive' | 'error'
  responseTime: number
  requestsPerMinute: number
  errorRate: number
  rateLimit: number
}

export function APIGatewayManager() {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([])
  const [globalStats, setGlobalStats] = useState({
    totalRequests: 0,
    activeEndpoints: 0,
    averageResponseTime: 0,
    errorRate: 0
  })

  useEffect(() => {
    // Initialize API endpoints
    const initialEndpoints: APIEndpoint[] = [
      {
        id: 'api_001',
        name: 'User Authentication',
        path: '/api/auth/login',
        method: 'POST',
        status: 'active',
        responseTime: 120,
        requestsPerMinute: 45,
        errorRate: 0.2,
        rateLimit: 100
      },
      {
        id: 'api_002',
        name: 'Trading Data',
        path: '/api/trading/data',
        method: 'GET',
        status: 'active',
        responseTime: 85,
        requestsPerMinute: 200,
        errorRate: 0.1,
        rateLimit: 500
      },
      {
        id: 'api_003',
        name: 'Portfolio Management',
        path: '/api/portfolio/balance',
        method: 'GET',
        status: 'active',
        responseTime: 95,
        requestsPerMinute: 150,
        errorRate: 0.3,
        rateLimit: 300
      },
      {
        id: 'api_004',
        name: 'Transaction History',
        path: '/api/transactions/history',
        method: 'GET',
        status: 'active',
        responseTime: 200,
        requestsPerMinute: 80,
        errorRate: 0.5,
        rateLimit: 200
      }
    ]

    setEndpoints(initialEndpoints)

    // Real-time updates
    const updateInterval = setInterval(() => {
      setEndpoints(prev => prev.map(endpoint => ({
        ...endpoint,
        responseTime: endpoint.responseTime + (Math.random() - 0.5) * 20,
        requestsPerMinute: Math.max(0, endpoint.requestsPerMinute + Math.floor((Math.random() - 0.5) * 10)),
        errorRate: Math.max(0, Math.min(5, endpoint.errorRate + (Math.random() - 0.5) * 0.2))
      })))

      // Update global stats
      setGlobalStats(prev => ({
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 100) + 50,
        activeEndpoints: initialEndpoints.filter(e => e.status === 'active').length,
        averageResponseTime: initialEndpoints.reduce((acc, e) => acc + e.responseTime, 0) / initialEndpoints.length,
        errorRate: initialEndpoints.reduce((acc, e) => acc + e.errorRate, 0) / initialEndpoints.length
      }))

      console.log('🌐 API Gateway metrics updated')
    }, 5000)

    return () => clearInterval(updateInterval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/30'
      case 'inactive': return 'text-gray-400 bg-gray-900/30'
      case 'error': return 'text-red-400 bg-red-900/30'
      default: return 'text-gray-400 bg-gray-900/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'error': return AlertTriangle
      default: return Activity
    }
  }

  const toggleEndpoint = (id: string) => {
    setEndpoints(prev => prev.map(endpoint => 
      endpoint.id === id 
        ? { ...endpoint, status: endpoint.status === 'active' ? 'inactive' : 'active' }
        : endpoint
    ))
    
    toast.success('Endpoint status updated')
  }

  return (
    <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Globe className="h-6 w-6" />
          API Gateway Management
          <Badge className="bg-cyan-600">MONITORING</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-900/30 rounded-lg">
            <Activity className="h-6 w-6 mx-auto text-blue-400 mb-2" />
            <div className="text-xl font-bold text-blue-400">{globalStats.totalRequests.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Requests</div>
          </div>
          
          <div className="text-center p-3 bg-green-900/30 rounded-lg">
            <CheckCircle className="h-6 w-6 mx-auto text-green-400 mb-2" />
            <div className="text-xl font-bold text-green-400">{globalStats.activeEndpoints}</div>
            <div className="text-xs text-muted-foreground">Active Endpoints</div>
          </div>
          
          <div className="text-center p-3 bg-purple-900/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto text-purple-400 mb-2" />
            <div className="text-xl font-bold text-purple-400">{globalStats.averageResponseTime.toFixed(0)}ms</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
          
          <div className="text-center p-3 bg-red-900/30 rounded-lg">
            <Shield className="h-6 w-6 mx-auto text-red-400 mb-2" />
            <div className="text-xl font-bold text-red-400">{globalStats.errorRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Error Rate</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold">API Endpoints</h4>
          {endpoints.map((endpoint) => {
            const StatusIcon = getStatusIcon(endpoint.status)
            return (
              <div key={endpoint.id} className="p-4 bg-black/40 rounded-lg border border-gray-500/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">{endpoint.name}</div>
                      <div className="text-sm text-gray-400">
                        <Badge className="bg-gray-700 mr-2">{endpoint.method}</Badge>
                        {endpoint.path}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(endpoint.status)}>
                      {endpoint.status.toUpperCase()}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleEndpoint(endpoint.id)}
                      className="border-gray-500/30"
                    >
                      Toggle
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Response Time</div>
                    <div className="text-sm font-bold text-white">{endpoint.responseTime.toFixed(0)}ms</div>
                    <Progress value={(endpoint.responseTime / 300) * 100} className="h-1 mt-1" />
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Requests/Min</div>
                    <div className="text-sm font-bold text-white">{endpoint.requestsPerMinute}</div>
                    <Progress value={(endpoint.requestsPerMinute / endpoint.rateLimit) * 100} className="h-1 mt-1" />
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Error Rate</div>
                    <div className="text-sm font-bold text-white">{endpoint.errorRate.toFixed(1)}%</div>
                    <Progress value={endpoint.errorRate * 10} className="h-1 mt-1" />
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Rate Limit</div>
                    <div className="text-sm font-bold text-white">{endpoint.rateLimit}/min</div>
                    <div className="text-xs text-green-400">Available</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
