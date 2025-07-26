
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Rocket, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  GitBranch,
  Database,
  Globe,
  Shield,
  Zap,
  Activity,
  Settings,
  Eye
} from 'lucide-react'
import { toast } from 'sonner'

interface DeploymentStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'success' | 'error'
  progress: number
  duration: string
  description: string
}

export function DeploymentAutomation() {
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    {
      id: 'pre-checks',
      name: 'Pre-deployment Checks',
      status: 'success',
      progress: 100,
      duration: '0:45',
      description: 'Security validation, dependency analysis, code quality checks'
    },
    {
      id: 'build',
      name: 'Build & Optimization',
      status: 'success', 
      progress: 100,
      duration: '2:14',
      description: 'Compile TypeScript, optimize assets, generate production build'
    },
    {
      id: 'testing',
      name: 'Automated Testing',
      status: 'success',
      progress: 100,
      duration: '1:32',
      description: 'Unit tests, integration tests, e2e testing, security scans'
    },
    {
      id: 'database',
      name: 'Database Migration',
      status: 'running',
      progress: 75,
      duration: '0:28',
      description: 'Apply schema updates, data migrations, security policies'
    },
    {
      id: 'deployment',
      name: 'Production Deployment',
      status: 'pending',
      progress: 0,
      duration: '--',
      description: 'Deploy to production, configure load balancers, update DNS'
    },
    {
      id: 'verification',
      name: 'Post-deployment Verification',
      status: 'pending',
      progress: 0,
      duration: '--',
      description: 'Health checks, performance monitoring, smoke tests'
    }
  ])

  const [deploymentMetrics, setDeploymentMetrics] = useState({
    totalDeployments: 47,
    successRate: 98.5,
    averageTime: '4:23',
    uptime: 99.97,
    lastDeploy: '2 hours ago'
  })

  useEffect(() => {
    // Simulate deployment progress
    const interval = setInterval(() => {
      setDeploymentSteps(prev => 
        prev.map(step => {
          if (step.status === 'running' && step.progress < 100) {
            const newProgress = Math.min(100, step.progress + Math.random() * 5)
            if (newProgress === 100) {
              toast.success(`✅ ${step.name} completed successfully!`, {
                description: step.description,
                duration: 3000
              })
              return { ...step, progress: newProgress, status: 'success' as const }
            }
            return { ...step, progress: newProgress }
          } else if (step.status === 'success') {
            // Check if next step should start
            const currentIndex = prev.findIndex(s => s.id === step.id)
            const nextStep = prev[currentIndex + 1]
            if (nextStep && nextStep.status === 'pending') {
              const updatedSteps = [...prev]
              updatedSteps[currentIndex + 1] = { ...nextStep, status: 'running' }
              return updatedSteps[currentIndex]
            }
          }
          return step
        })
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'running': return <Clock className="h-5 w-5 text-blue-400 animate-spin" />
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />
      case 'pending': return <Clock className="h-5 w-5 text-gray-400" />
      default: return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-600'
      case 'running': return 'bg-blue-600'
      case 'error': return 'bg-red-600'
      case 'pending': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  const startNewDeployment = () => {
    setDeploymentSteps(prev => 
      prev.map((step, index) => ({
        ...step,
        status: index === 0 ? 'running' : 'pending',
        progress: index === 0 ? 0 : 0
      }))
    )
    
    toast.success('🚀 New deployment started!', {
      description: 'Automated CI/CD pipeline initiated with full security checks.',
      duration: 5000
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-blue-400">
            🚀 GAIA DEPLOYMENT AUTOMATION
          </CardTitle>
          <p className="text-center text-lg text-blue-300">
            Continuous Integration • Automated Deployment • Zero-Downtime Updates
          </p>
        </CardHeader>
      </Card>

      {/* Deployment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Rocket className="h-5 w-5 text-green-400" />
              <span className="font-bold text-green-400">Deployments</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{deploymentMetrics.totalDeployments}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <span className="font-bold text-blue-400">Success Rate</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{deploymentMetrics.successRate}%</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="font-bold text-purple-400">Avg Time</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{deploymentMetrics.averageTime}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-orange-400" />
              <span className="font-bold text-orange-400">Uptime</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">{deploymentMetrics.uptime}%</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-700/30 to-gray-600/30 border-gray-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-gray-400" />
              <span className="font-bold text-gray-400">Last Deploy</span>
            </div>
            <div className="text-lg font-bold text-gray-400">{deploymentMetrics.lastDeploy}</div>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Pipeline */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-blue-400">🔄 Deployment Pipeline Status</CardTitle>
            <Button 
              onClick={startNewDeployment}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Start New Deployment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deploymentSteps.map((step, index) => (
              <Card key={step.id} className="border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(step.status)}
                      <div>
                        <h4 className="font-semibold">{step.name}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(step.status)}>
                        {step.status.toUpperCase()}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Duration: {step.duration}
                      </div>
                    </div>
                  </div>

                  {step.status === 'running' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="text-blue-400">{step.progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={step.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Status */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">🏗️ Infrastructure Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Database className="h-6 w-6 text-green-400" />
                <h4 className="font-semibold text-green-400">Database Cluster</h4>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">Operational</div>
              <div className="text-sm text-muted-foreground">3 nodes active • Auto-scaling enabled</div>
            </div>
            
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-6 w-6 text-blue-400" />
                <h4 className="font-semibold text-blue-400">CDN Network</h4>
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">Global</div>
              <div className="text-sm text-muted-foreground">15 edge locations • 99.9% uptime</div>
            </div>
            
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-purple-400" />
                <h4 className="font-semibold text-purple-400">Security Layer</h4>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">Protected</div>
              <div className="text-sm text-muted-foreground">WAF active • DDoS protection</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring & Alerts */}
      <Card className="border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400">📊 Real-time Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
              <Activity className="h-6 w-6 mx-auto text-orange-400 mb-2" />
              <div className="text-lg font-bold text-orange-400">98ms</div>
              <div className="text-xs text-muted-foreground">Response Time</div>
            </div>
            
            <div className="text-center p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
              <Zap className="h-6 w-6 mx-auto text-cyan-400 mb-2" />
              <div className="text-lg font-bold text-cyan-400">1.2K</div>
              <div className="text-xs text-muted-foreground">Requests/min</div>
            </div>
            
            <div className="text-center p-3 bg-green-900/20 rounded-lg border border-green-500/30">
              <CheckCircle className="h-6 w-6 mx-auto text-green-400 mb-2" />
              <div className="text-lg font-bold text-green-400">100%</div>
              <div className="text-xs text-muted-foreground">Health Status</div>
            </div>
            
            <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <Eye className="h-6 w-6 mx-auto text-blue-400 mb-2" />
              <div className="text-lg font-bold text-blue-400">24/7</div>
              <div className="text-xs text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
