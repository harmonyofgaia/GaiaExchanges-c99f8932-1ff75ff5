import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Settings,
  Activity,
  BarChart3,
  Filter,
  Search,
  FileText,
  Zap,
  Target,
  Users,
  Flag,
  Archive,
  Trash2,
  Edit3,
  Send,
  Bell
} from 'lucide-react'
import { toast } from 'sonner'

interface IdeaForReview {
  id: string
  title: string
  description: string
  category: string
  feasibilityScore: number
  impactScore: number
  riskLevel: 'low' | 'medium' | 'high'
  safetyFlags: string[]
  generatedAt: Date
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  reviewedBy?: string
  reviewNotes?: string
  implementationPriority: number
}

interface SystemAlert {
  id: string
  type: 'security' | 'quality' | 'safety' | 'performance'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  details: string
  timestamp: Date
  resolved: boolean
  source: string
}

interface AdminStats {
  totalIdeasReviewed: number
  approvalRate: number
  averageReviewTime: number
  activeFlagged: number
  systemHealth: number
  securityIncidents: number
}

export function SecurePsychohistoricalAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authCode, setAuthCode] = useState('')
  const [ideasForReview, setIdeasForReview] = useState<IdeaForReview[]>([])
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([])
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalIdeasReviewed: 0,
    approvalRate: 0,
    averageReviewTime: 0,
    activeFlagged: 0,
    systemHealth: 0,
    securityIncidents: 0
  })
  const [activeFilter, setActiveFilter] = useState<string>('all')

  useEffect(() => {
    if (isAuthenticated) {
      initializeAdminData()
      startRealTimeMonitoring()
    }
  }, [isAuthenticated])

  const authenticate = () => {
    // Simple demo authentication - in production this would be much more secure
    if (authCode === 'GAIA2024' || authCode === 'admin') {
      setIsAuthenticated(true)
      toast.success('Authentication successful', {
        description: 'Welcome to the secure admin dashboard'
      })
    } else {
      toast.error('Authentication failed', {
        description: 'Invalid security code'
      })
    }
  }

  const initializeAdminData = () => {
    // Initialize ideas for review
    const ideas: IdeaForReview[] = [
      {
        id: 'review-1',
        title: 'Quantum-Enhanced Solar Panels',
        description: 'Revolutionary solar technology using quantum dots for 300% efficiency improvement',
        category: 'renewable_energy',
        feasibilityScore: 65,
        impactScore: 98,
        riskLevel: 'high',
        safetyFlags: ['requires_expert_review', 'potential_environmental_impact'],
        generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'pending',
        implementationPriority: 9
      },
      {
        id: 'review-2',
        title: 'Atmospheric Carbon Crystallization',
        description: 'Process to convert atmospheric CO2 into solid carbon crystals for storage',
        category: 'conservation',
        feasibilityScore: 45,
        impactScore: 95,
        riskLevel: 'medium',
        safetyFlags: ['unproven_technology', 'requires_validation'],
        generatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: 'flagged',
        implementationPriority: 8
      },
      {
        id: 'review-3',
        title: 'Biodegradable Electronics Initiative',
        description: 'Fully compostable electronic devices to eliminate e-waste',
        category: 'waste_reduction',
        feasibilityScore: 78,
        impactScore: 86,
        riskLevel: 'low',
        safetyFlags: [],
        generatedAt: new Date(Date.now() - 30 * 60 * 1000),
        status: 'pending',
        implementationPriority: 7
      }
    ]
    setIdeasForReview(ideas)

    // Initialize system alerts
    const alerts: SystemAlert[] = [
      {
        id: 'alert-1',
        type: 'security',
        severity: 'medium',
        message: 'Unusual pattern detected in idea generation',
        details: 'AI system generated 47 similar solutions in 10 minutes - possible feedback loop',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        resolved: false,
        source: 'PsychohistoricalEngine'
      },
      {
        id: 'alert-2',
        type: 'quality',
        severity: 'low',
        message: 'Feasibility scores declining',
        details: 'Average feasibility score dropped from 78% to 65% over past 24 hours',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        resolved: false,
        source: 'QualityMonitor'
      },
      {
        id: 'alert-3',
        type: 'performance',
        severity: 'high',
        message: 'Data processing delay detected',
        details: 'Global data streams experiencing 2.3 second average delay',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        resolved: false,
        source: 'DataStreamManager'
      }
    ]
    setSystemAlerts(alerts)

    // Initialize admin stats
    setAdminStats({
      totalIdeasReviewed: 1847,
      approvalRate: 73.2,
      averageReviewTime: 18.5,
      activeFlagged: 23,
      systemHealth: 94.7,
      securityIncidents: 2
    })
  }

  const startRealTimeMonitoring = () => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setAdminStats(prev => ({
        ...prev,
        systemHealth: Math.max(85, Math.min(99, prev.systemHealth + (Math.random() - 0.5) * 2)),
        totalIdeasReviewed: prev.totalIdeasReviewed + Math.floor(Math.random() * 3)
      }))
    }, 10000)

    return () => clearInterval(interval)
  }

  const reviewIdea = (ideaId: string, action: 'approve' | 'reject' | 'flag', notes?: string) => {
    setIdeasForReview(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'flagged',
          reviewedBy: 'Admin',
          reviewNotes: notes || `${action.charAt(0).toUpperCase() + action.slice(1)}ed by administrator`
        }
      }
      return idea
    }))

    const idea = ideasForReview.find(i => i.id === ideaId)
    toast.success(`Idea ${action}ed`, {
      description: `"${idea?.title}" has been ${action}ed`
    })
  }

  const resolveAlert = (alertId: string) => {
    setSystemAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ))
    toast.success('Alert resolved')
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500/50 text-red-400'
      case 'high': return 'border-orange-500/50 text-orange-400'
      case 'medium': return 'border-yellow-500/50 text-yellow-400'
      case 'low': return 'border-blue-500/50 text-blue-400'
      default: return 'border-gray-500/50 text-gray-400'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'border-red-500/50 text-red-400'
      case 'medium': return 'border-yellow-500/50 text-yellow-400'
      case 'low': return 'border-green-500/50 text-green-400'
      default: return 'border-gray-500/50 text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'rejected': return <XCircle className="h-4 w-4 text-red-400" />
      case 'flagged': return <Flag className="h-4 w-4 text-yellow-400" />
      case 'pending': return <Clock className="h-4 w-4 text-blue-400" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md border-blue-500/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-blue-400">
              <Shield className="h-6 w-6" />
              Secure Access Required
            </CardTitle>
            <p className="text-muted-foreground">
              Enter administrator credentials to access the psychohistorical admin dashboard
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Security Code</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-500/50 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50"
                  placeholder="Enter admin code"
                  onKeyPress={(e) => e.key === 'Enter' && authenticate()}
                />
              </div>
            </div>
            <Button onClick={authenticate} className="w-full bg-blue-600 hover:bg-blue-700">
              <Shield className="h-4 w-4 mr-2" />
              Authenticate
            </Button>
            <div className="text-xs text-muted-foreground text-center">
              Demo: Use "GAIA2024" or "admin" as security code
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Admin Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-green-500/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{adminStats.totalIdeasReviewed}</div>
              <div className="text-xs text-muted-foreground">Ideas Reviewed</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{adminStats.approvalRate}%</div>
              <div className="text-xs text-muted-foreground">Approval Rate</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{adminStats.averageReviewTime}m</div>
              <div className="text-xs text-muted-foreground">Avg Review Time</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{adminStats.activeFlagged}</div>
              <div className="text-xs text-muted-foreground">Flagged Items</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-cyan-500/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{adminStats.systemHealth.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">System Health</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-500/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{adminStats.securityIncidents}</div>
              <div className="text-xs text-muted-foreground">Security Incidents</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="review" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="review">Idea Review Queue</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-4">
          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Eye className="h-5 w-5" />
                Generated Ideas Requiring Review
              </CardTitle>
              <div className="flex gap-2 mt-2">
                <Button 
                  variant={activeFilter === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveFilter('all')}
                >
                  All ({ideasForReview.length})
                </Button>
                <Button 
                  variant={activeFilter === 'pending' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveFilter('pending')}
                >
                  Pending ({ideasForReview.filter(i => i.status === 'pending').length})
                </Button>
                <Button 
                  variant={activeFilter === 'flagged' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveFilter('flagged')}
                >
                  Flagged ({ideasForReview.filter(i => i.status === 'flagged').length})
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ideasForReview
                  .filter(idea => activeFilter === 'all' || idea.status === activeFilter)
                  .map((idea) => (
                  <div key={idea.id} className="p-4 rounded-lg bg-black/20 border border-gray-500/20">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-white">{idea.title}</h4>
                          <Badge variant="outline" className={getRiskColor(idea.riskLevel)}>
                            {idea.riskLevel} risk
                          </Badge>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                            Priority: {idea.implementationPriority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{idea.description}</p>
                        
                        {/* Safety Flags */}
                        {idea.safetyFlags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {idea.safetyFlags.map((flag, index) => (
                              <Badge key={index} variant="outline" className="border-orange-500/50 text-orange-400 text-xs">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                {flag.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Feasibility: </span>
                            <span className="font-bold text-green-400">{idea.feasibilityScore}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Impact: </span>
                            <span className="font-bold text-blue-400">{idea.impactScore}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Generated: </span>
                            <span className="font-bold text-purple-400">
                              {Math.floor((Date.now() - idea.generatedAt.getTime()) / 1000 / 60)}m ago
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {getStatusIcon(idea.status)}
                        <span className="text-sm capitalize">{idea.status}</span>
                      </div>
                    </div>

                    {idea.status === 'pending' && (
                      <div className="flex gap-2 pt-3 border-t border-gray-500/20">
                        <Button 
                          size="sm" 
                          onClick={() => reviewIdea(idea.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => reviewIdea(idea.id, 'flag')}
                          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                        >
                          <Flag className="h-4 w-4 mr-1" />
                          Flag for Review
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => reviewIdea(idea.id, 'reject')}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}

                    {idea.reviewNotes && (
                      <div className="mt-3 p-2 bg-black/30 rounded border border-gray-500/20">
                        <div className="text-xs text-muted-foreground">Review Notes:</div>
                        <div className="text-sm text-white">{idea.reviewNotes}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                System Security & Quality Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${
                    alert.resolved ? 'bg-green-900/10 border-green-500/20' : 'bg-black/20 border-gray-500/20'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline" className="border-gray-500/50 text-gray-400">
                            {alert.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {Math.floor((Date.now() - alert.timestamp.getTime()) / 1000 / 60)}m ago
                          </span>
                        </div>
                        <h4 className="font-medium text-white mb-1">{alert.message}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{alert.details}</p>
                        <div className="text-xs text-muted-foreground">Source: {alert.source}</div>
                      </div>
                      
                      <div className="ml-4">
                        {alert.resolved ? (
                          <Badge variant="outline" className="border-green-500/50 text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => resolveAlert(alert.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Activity className="h-5 w-5" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Overall Health</span>
                      <span className="text-sm font-bold text-green-400">{adminStats.systemHealth.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${adminStats.systemHealth}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-black/30 rounded">
                      <div className="font-bold text-blue-400">847</div>
                      <div className="text-muted-foreground">Active Streams</div>
                    </div>
                    <div className="text-center p-2 bg-black/30 rounded">
                      <div className="font-bold text-purple-400">99.7%</div>
                      <div className="text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <BarChart3 className="h-5 w-5" />
                  Processing Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Ideas Generated Today</span>
                    <span className="font-bold text-green-400">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Data Points Processed</span>
                    <span className="font-bold text-blue-400">2.3M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-bold text-purple-400">1.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Queue Length</span>
                    <span className="font-bold text-yellow-400">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}