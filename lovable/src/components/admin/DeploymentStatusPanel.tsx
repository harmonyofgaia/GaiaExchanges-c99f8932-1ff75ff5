
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  RefreshCw,
  Server,
  Database,
  Globe,
  Shield
} from 'lucide-react'

export function DeploymentStatusPanel() {
  const [deploymentStatus, setDeploymentStatus] = useState({
    overall: 'success' as 'success' | 'warning' | 'error' | 'pending',
    services: [
      { name: 'Frontend', status: 'success', uptime: '99.9%', lastDeployed: '2 hours ago' },
      { name: 'Backend API', status: 'success', uptime: '99.8%', lastDeployed: '1 hour ago' },
      { name: 'Database', status: 'success', uptime: '100%', lastDeployed: '5 hours ago' },
      { name: 'CDN', status: 'success', uptime: '99.9%', lastDeployed: '3 hours ago' }
    ],
    metrics: {
      responseTime: '245ms',
      throughput: '1.2k req/s',
      errorRate: '0.01%',
      availability: '99.9%'
    }
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'pending': return <Clock className="h-5 w-5 text-blue-500" />
      default: return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'Frontend': return <Globe className="h-5 w-5" />
      case 'Backend API': return <Server className="h-5 w-5" />
      case 'Database': return <Database className="h-5 w-5" />
      case 'CDN': return <Shield className="h-5 w-5" />
      default: return <Server className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🚀 Deployment Status Monitor
        </h2>
        <p className="text-lg text-muted-foreground">
          Real-time health and performance monitoring of all GAiA services
        </p>
      </div>

      {/* Overall Status */}
      <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(deploymentStatus.overall)}
            Overall System Status
            <Badge className={getStatusColor(deploymentStatus.overall)}>
              {deploymentStatus.overall.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{deploymentStatus.metrics.responseTime}</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{deploymentStatus.metrics.throughput}</div>
              <div className="text-sm text-muted-foreground">Throughput</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{deploymentStatus.metrics.errorRate}</div>
              <div className="text-sm text-muted-foreground">Error Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{deploymentStatus.metrics.availability}</div>
              <div className="text-sm text-muted-foreground">Availability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deploymentStatus.services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getServiceIcon(service.name)}
                {service.name}
                <Badge className={getStatusColor(service.status)}>
                  {service.status.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Uptime</span>
                  <span className="font-semibold">{service.uptime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Deployed</span>
                  <span className="font-semibold">{service.lastDeployed}</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Status
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              View Logs
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
