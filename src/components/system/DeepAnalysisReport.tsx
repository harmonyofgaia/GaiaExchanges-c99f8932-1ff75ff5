
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Code, 
  Shield, 
  Zap,
  Users,
  Database,
  Github,
  ExternalLink,
  Filter,
  TrendingUp
} from 'lucide-react'
import { advancedGitHubAnalyzer, type DeepAnalysisResult, type MissingFeature } from '@/services/advancedGitHubAnalyzer'

export function DeepAnalysisReport() {
  const [analysis, setAnalysis] = useState<DeepAnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')

  const runDeepAnalysis = async () => {
    setLoading(true)
    
    toast.success('🔍 Deep Analysis Started', {
      description: 'Scanning harmonyofgaia/GaiaExchanges-c99f8932 repository...',
      duration: 3000
    })

    try {
      const result = await advancedGitHubAnalyzer.performDeepAnalysis()
      setAnalysis(result)
      
      toast.success('✅ Deep Analysis Complete', {
        description: `Found ${result.totalMissingCount} missing features. Admin login design preserved.`,
        duration: 6000
      })
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error('Analysis Error', {
        description: 'Could not complete analysis. Check console for details.',
        duration: 5000
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredFeatures = analysis?.missingFeatures.filter(feature => {
    const categoryMatch = selectedCategory === 'all' || feature.category === selectedCategory
    const priorityMatch = selectedPriority === 'all' || feature.priority === selectedPriority
    return categoryMatch && priorityMatch
  }) || []

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return <Code className="h-4 w-4" />
      case 'security': return <Shield className="h-4 w-4" />
      case 'performance': return <Zap className="h-4 w-4" />
      case 'integration': return <Database className="h-4 w-4" />
      case 'ui': return <Users className="h-4 w-4" />
      case 'community': return <Users className="h-4 w-4" />
      default: return <Code className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const totalHours = filteredFeatures.reduce((sum, feature) => sum + feature.estimatedHours, 0)

  return (
    <div className="space-y-6">
      {/* Analysis Control */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-400">
            <Github className="h-6 w-6" />
            Deep Repository Analysis
            <Badge className="bg-purple-600">harmonyofgaia/GaiaExchanges-c99f8932</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive analysis with admin login design protection
          </p>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={runDeepAnalysis}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Search className="h-5 w-5 mr-2" />
            {loading ? 'Analyzing Repository...' : '🔍 Run Deep Analysis'}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <>
          {/* Analysis Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-red-900/20 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <div>
                    <div className="text-2xl font-bold text-red-400">{analysis.totalMissingCount}</div>
                    <div className="text-sm text-muted-foreground">Missing Features</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-green-400">{analysis.excludedTasks.length}</div>
                    <div className="text-sm text-muted-foreground">Protected Tasks</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{analysis.scanResult.healthScore}%</div>
                    <div className="text-sm text-muted-foreground">Health Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-900/20 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <div>
                    <div className="text-2xl font-bold text-orange-400">{totalHours}h</div>
                    <div className="text-sm text-muted-foreground">Est. Work</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Tabs defaultValue="missing" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="missing">Missing Features</TabsTrigger>
              <TabsTrigger value="excluded">Protected Tasks</TabsTrigger>
              <TabsTrigger value="summary">Priority Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="missing" className="space-y-4">
              {/* Filters */}
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-black/30 border border-border rounded px-2 py-1"
                  >
                    <option value="all">All Categories</option>
                    <option value="core">Core</option>
                    <option value="security">Security</option>
                    <option value="performance">Performance</option>
                    <option value="integration">Integration</option>
                    <option value="ui">UI/UX</option>
                    <option value="community">Community</option>
                  </select>
                </div>
                
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="bg-black/30 border border-border rounded px-2 py-1"
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Missing Features List */}
              <div className="space-y-3">
                {filteredFeatures.map((feature, index) => (
                  <Card key={index} className={`bg-black/30 border-l-4 ${
                    feature.priority === 'critical' ? 'border-l-red-500' :
                    feature.priority === 'high' ? 'border-l-orange-500' :
                    feature.priority === 'medium' ? 'border-l-yellow-500' :
                    'border-l-green-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getCategoryIcon(feature.category)}
                            <h3 className="font-semibold text-white">{feature.name}</h3>
                            <Badge className={getPriorityColor(feature.priority)}>
                              {feature.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {feature.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {feature.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {feature.estimatedHours}h
                            </span>
                            <span className={`px-2 py-1 rounded ${
                              feature.implementationComplexity === 'simple' ? 'bg-green-600/20 text-green-400' :
                              feature.implementationComplexity === 'moderate' ? 'bg-yellow-600/20 text-yellow-400' :
                              'bg-red-600/20 text-red-400'
                            }`}>
                              {feature.implementationComplexity}
                            </span>
                            {feature.affectsLayout && (
                              <Badge variant="outline" className="text-orange-400 border-orange-400">
                                Layout Impact
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="excluded" className="space-y-4">
              <div className="text-center py-6">
                <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-400 mb-2">Admin Login Design Protected</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The following tasks were excluded to preserve your current admin login design:
                </p>
                
                {analysis.excludedTasks.length > 0 ? (
                  <div className="space-y-2">
                    {analysis.excludedTasks.map((task, index) => (
                      <Card key={index} className="bg-green-900/10 border-green-500/20">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm">{task}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Badge className="bg-green-600">No Admin Login Design Tasks Found - Your Design is Safe!</Badge>
                )}
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-400">Priority Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(analysis.priorityBreakdown).map(([priority, count]) => (
                      <div key={priority} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{priority}</span>
                          <span>{count} features</span>
                        </div>
                        <Progress value={(count / analysis.totalMissingCount) * 100} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-400">Repository Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Issues</span>
                      <span className="font-bold">{analysis.scanResult.issues.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pull Requests</span>
                      <span className="font-bold">{analysis.scanResult.pullRequests.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Score</span>
                      <span className="font-bold text-green-400">{analysis.scanResult.healthScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Scan</span>
                      <span className="text-sm text-muted-foreground">
                        {analysis.scanResult.lastScanTime.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
