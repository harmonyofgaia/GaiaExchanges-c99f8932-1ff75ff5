import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Eye, 
  Lightbulb,
  BarChart3,
  Users,
  Globe,
  Sparkles,
  Target,
  BookOpen,
  Cpu,
  Activity
} from 'lucide-react';

export function PsychohistoricalAdmin() {
  const [analysisStats, setAnalysisStats] = useState({
    totalAnalyses: 15847,
    activeModels: 12,
    predictiveAccuracy: 89.7,
    trendsIdentified: 247,
    socialPatterns: 1923,
    behaviorPredictions: 5674
  });

  const [activeAnalyses, setActiveAnalyses] = useState([
    { 
      id: 1, 
      name: "Global Climate Action Trends", 
      type: "Social Movement Analysis", 
      progress: 78,
      accuracy: 92.4,
      timeframe: "6 months",
      subjects: 45000,
      insights: 15
    },
    { 
      id: 2, 
      name: "Environmental Behavior Patterns", 
      type: "Individual Psychology", 
      progress: 45,
      accuracy: 87.9,
      timeframe: "3 months", 
      subjects: 12000,
      insights: 8
    },
    { 
      id: 3, 
      name: "Community Engagement Forecasting", 
      type: "Group Dynamics", 
      progress: 92,
      accuracy: 94.1,
      timeframe: "1 month",
      subjects: 8500,
      insights: 23
    },
    { 
      id: 4, 
      name: "Green Technology Adoption", 
      type: "Innovation Diffusion", 
      progress: 67,
      accuracy: 91.2,
      timeframe: "12 months",
      subjects: 78000,
      insights: 31
    }
  ]);

  const [keyInsights, setKeyInsights] = useState([
    { 
      id: 1, 
      category: "Social Trends", 
      title: "Rising Environmental Consciousness", 
      confidence: 94.7,
      impact: "high",
      description: "Community shows 340% increase in eco-friendly behavior adoption"
    },
    { 
      id: 2, 
      category: "Behavioral Patterns", 
      title: "Collective Action Triggers", 
      confidence: 87.3,
      impact: "critical",
      description: "Identified 7 key factors that drive mass environmental action"
    },
    { 
      id: 3, 
      category: "Future Predictions", 
      title: "Green Technology Tipping Point", 
      confidence: 91.8,
      impact: "high",
      description: "Solar adoption will reach critical mass in next 18 months"
    },
    { 
      id: 4, 
      category: "Community Dynamics", 
      title: "Influence Network Mapping", 
      confidence: 89.4,
      impact: "medium",
      description: "Key influencers driving 67% of community environmental decisions"
    }
  ]);

  const [psychoMetrics, setPsychoMetrics] = useState([
    { metric: "Collective Motivation Index", value: 87.3, trend: "increasing" },
    { metric: "Environmental Anxiety Levels", value: 62.1, trend: "stable" },
    { metric: "Action Readiness Score", value: 91.7, trend: "increasing" },
    { metric: "Community Cohesion", value: 84.2, trend: "increasing" },
    { metric: "Future Optimism Rating", value: 76.8, trend: "fluctuating" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisStats(prev => ({
        ...prev,
        totalAnalyses: prev.totalAnalyses + Math.floor(Math.random() * 5),
        predictiveAccuracy: Math.max(85, Math.min(95, prev.predictiveAccuracy + (Math.random() - 0.5) * 0.5)),
        trendsIdentified: prev.trendsIdentified + Math.floor(Math.random() * 2)
      }));

      setActiveAnalyses(prev => prev.map(analysis => ({
        ...analysis,
        progress: Math.min(100, analysis.progress + Math.floor(Math.random() * 2))
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="default" className="bg-red-600">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{impact}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decreasing':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      case 'stable':
        return <Activity className="h-4 w-4 text-blue-500" />;
      case 'fluctuating':
        return <Activity className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-indigo-400">🔮 Psychohistorical Engine</h2>
          <p className="text-muted-foreground">Advanced Social Psychology & Predictive Analytics</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-indigo-400 border-indigo-400">
            <Brain className="h-4 w-4 mr-2" />
            {analysisStats.activeModels} Active Models
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            <Eye className="h-4 w-4 mr-2" />
            {analysisStats.predictiveAccuracy.toFixed(1)}% Accuracy
          </Badge>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
                <p className="text-2xl font-bold">{analysisStats.totalAnalyses.toLocaleString()}</p>
              </div>
              <BookOpen className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-2xl font-bold">{analysisStats.activeModels}</p>
              </div>
              <Cpu className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">{analysisStats.predictiveAccuracy.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={analysisStats.predictiveAccuracy} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trends Found</p>
                <p className="text-2xl font-bold">{analysisStats.trendsIdentified}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Social Patterns</p>
                <p className="text-2xl font-bold">{analysisStats.socialPatterns.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Predictions</p>
                <p className="text-2xl font-bold">{analysisStats.behaviorPredictions.toLocaleString()}</p>
              </div>
              <Sparkles className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analyses" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analyses">Active Analyses</TabsTrigger>
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="metrics">Psycho-Metrics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="analyses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Running Psychohistorical Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAnalyses.map((analysis) => (
                  <div key={analysis.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{analysis.name}</h3>
                      <Badge variant="outline">{analysis.type}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Timeframe: </span>
                        <span className="font-medium">{analysis.timeframe}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Subjects: </span>
                        <span className="font-medium">{analysis.subjects.toLocaleString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Accuracy: </span>
                        <span className="font-medium">{analysis.accuracy}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Insights: </span>
                        <span className="font-medium">{analysis.insights}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={analysis.progress} className="flex-1" />
                      <span className="text-sm font-medium">{analysis.progress}%</span>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discovered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyInsights.map((insight) => (
                  <div key={insight.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{insight.category}</Badge>
                        {getImpactBadge(insight.impact)}
                      </div>
                      <h3 className="font-semibold mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-muted-foreground">Confidence</div>
                      <div className="text-lg font-bold text-green-600">{insight.confidence}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Psychological Metrics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {psychoMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{metric.metric}</h3>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <Progress value={metric.value} className="mt-2" />
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold">{metric.value.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground capitalize">{metric.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Near-term Predictions (30 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Community Engagement Peak</span>
                      <Badge variant="default" className="bg-green-500">92% Confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Expected surge in environmental activities</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">New User Adoption Wave</span>
                      <Badge variant="default" className="bg-blue-500">87% Confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Projected 35% increase in registrations</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Content Creation Boom</span>
                      <Badge variant="default" className="bg-purple-500">89% Confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Video uploads expected to double</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Long-term Forecasts (6-12 months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Global Movement Emergence</span>
                      <Badge variant="default" className="bg-yellow-600">78% Confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Platform may catalyze worldwide eco-movement</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Technology Breakthrough</span>
                      <Badge variant="default" className="bg-indigo-500">83% Confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Community innovation likely to emerge</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Policy Influence Milestone</span>
                      <Badge variant="default" className="bg-green-600">74% Confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Platform impact on environmental policy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Psychohistorical Engine Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Real-time analysis mode</h3>
                    <p className="text-sm text-muted-foreground">Continuous psychological pattern monitoring</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Predictive modeling</h3>
                    <p className="text-sm text-muted-foreground">Enable future behavior prediction algorithms</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Privacy protection</h3>
                    <p className="text-sm text-muted-foreground">Anonymize all personal data in analyses</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Analysis Depth Level</label>
                  <select className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="moderate">
                    <option value="surface">Surface Level</option>
                    <option value="moderate">Moderate Depth</option>
                    <option value="deep">Deep Analysis</option>
                    <option value="comprehensive">Comprehensive</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Prediction Timeframe (months)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="12" min="1" max="60" />
                </div>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}