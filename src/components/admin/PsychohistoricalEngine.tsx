
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Globe, 
  TrendingUp, 
  Users, 
  Zap, 
  Eye,
  Target,
  Activity,
  Shield,
  Sparkles,
  BarChart3,
  Calculator,
  Cpu
} from 'lucide-react'

interface PsychohistoricalData {
  prediction_id: string
  scenario: string
  probability: number
  impact_score: number
  timeline: string
  factors: string[]
  confidence: number
}

interface MarketPattern {
  pattern_name: string
  frequency: number
  success_rate: number
  market_conditions: string[]
}

export function PsychohistoricalEngine() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [predictions, setPredictions] = useState<PsychohistoricalData[]>([])
  const [marketPatterns, setMarketPatterns] = useState<MarketPattern[]>([])
  const [analysisDepth, setAnalysisDepth] = useState(85)
  const [webCrawlStatus, setWebCrawlStatus] = useState('idle')

  useEffect(() => {
    // Initialize with mock data
    const mockPredictions: PsychohistoricalData[] = [
      {
        prediction_id: '1',
        scenario: 'GAiA Token Mass Adoption Wave',
        probability: 87.3,
        impact_score: 95,
        timeline: '3-6 months',
        factors: ['Social Media Sentiment', 'Environmental Awareness', 'Crypto Market Recovery'],
        confidence: 92.1
      },
      {
        prediction_id: '2',
        scenario: 'Bicycle Ecosystem Viral Growth',
        probability: 78.9,
        impact_score: 88,
        timeline: '2-4 months',
        factors: ['Health Consciousness', 'Urban Cycling Trends', 'Token Incentives'],
        confidence: 85.4
      },
      {
        prediction_id: '3',
        scenario: 'Living Forest Initiative Expansion',
        probability: 91.2,
        impact_score: 96,
        timeline: '6-12 months',
        factors: ['Climate Change Urgency', 'Food Security Concerns', 'Community Participation'],
        confidence: 94.7
      }
    ]

    const mockPatterns: MarketPattern[] = [
      {
        pattern_name: 'Community Engagement Spike',
        frequency: 0.73,
        success_rate: 89.2,
        market_conditions: ['High Social Activity', 'Positive News Coverage', 'Token Rewards Active']
      },
      {
        pattern_name: 'Ecological Investment Wave',
        frequency: 0.61,
        success_rate: 92.1,
        market_conditions: ['Environmental Events', 'Policy Changes', 'Celebrity Endorsements']
      }
    ]

    setPredictions(mockPredictions)
    setMarketPatterns(mockPatterns)
  }, [])

  const startWebCrawlAnalysis = async () => {
    setIsAnalyzing(true)
    setWebCrawlStatus('crawling')
    
    // Simulate web crawling process
    const crawlSteps = [
      'Scanning environmental news sources...',
      'Analyzing cryptocurrency market data...',
      'Processing social media sentiment...',
      'Evaluating bicycle industry trends...',
      'Computing predictive models...',
      'Generating psychohistorical patterns...'
    ]

    for (let i = 0; i < crawlSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setWebCrawlStatus(crawlSteps[i])
      setAnalysisDepth(prev => Math.min(prev + 15, 100))
    }

    setWebCrawlStatus('analysis_complete')
    setIsAnalyzing(false)
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 90) return 'text-green-400'
    if (probability >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getImpactBadgeColor = (impact: number) => {
    if (impact >= 90) return 'bg-red-600'
    if (impact >= 70) return 'bg-orange-600'
    return 'bg-blue-600'
  }

  return (
    <div className="space-y-6">
      {/* Engine Control Header */}
      <Card className="border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brain className="h-6 w-6 animate-pulse" />
            🧠 PSYCHOHISTORICAL PREDICTION ENGINE
            <Badge className="bg-purple-600 text-white animate-pulse">
              <Cpu className="h-3 w-3 mr-1" />
              ADMIN EXCLUSIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <Calculator className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-400">{analysisDepth}%</div>
              <div className="text-xs text-muted-foreground">Analysis Depth</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-400">24/7</div>
              <div className="text-xs text-muted-foreground">Web Monitoring</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-900/30">
              <Target className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-400">94.7%</div>
              <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30">
              <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-400">∞</div>
              <div className="text-xs text-muted-foreground">Processing Power</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-purple-400">Global Web Analysis Status</h4>
                <p className="text-sm text-muted-foreground">{webCrawlStatus}</p>
              </div>
              <Button
                onClick={startWebCrawlAnalysis}
                disabled={isAnalyzing}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Globe className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Start Deep Web Scan'}
              </Button>
            </div>
            
            {isAnalyzing && (
              <Progress value={analysisDepth} className="h-3" />
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">🔮 Predictions</TabsTrigger>
          <TabsTrigger value="patterns">📊 Market Patterns</TabsTrigger>
          <TabsTrigger value="analysis">🧪 Deep Analysis</TabsTrigger>
          <TabsTrigger value="control">⚙️ Engine Control</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          {predictions.map((prediction) => (
            <Card key={prediction.prediction_id} className="border-border/50">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{prediction.scenario}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getProbabilityColor(prediction.probability)}`}>
                          {prediction.probability}%
                        </div>
                        <div className="text-xs text-muted-foreground">Probability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{prediction.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                      <div className="text-center">
                        <Badge className={`${getImpactBadgeColor(prediction.impact_score)} text-white`}>
                          Impact: {prediction.impact_score}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-purple-400">{prediction.timeline}</div>
                        <div className="text-xs text-muted-foreground">Timeline</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Key Factors:</div>
                      <div className="flex flex-wrap gap-2">
                        {prediction.factors.map((factor, idx) => (
                          <Badge key={idx} className="bg-gray-600/20 text-gray-300">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          {marketPatterns.map((pattern, index) => (
            <Card key={index} className="border-green-500/30">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-green-400">{pattern.pattern_name}</h3>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-600 text-white">
                      Freq: {(pattern.frequency * 100).toFixed(0)}%
                    </Badge>
                    <Badge className="bg-green-600 text-white">
                      Success: {pattern.success_rate}%
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Market Conditions:</div>
                  <div className="flex flex-wrap gap-2">
                    {pattern.market_conditions.map((condition, idx) => (
                      <Badge key={idx} className="bg-orange-500/20 text-orange-400">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Deep Web Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-cyan-400">Sentiment Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Environmental Consciousness</span>
                      <span className="text-green-400">+87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                    <div className="flex justify-between">
                      <span>Cryptocurrency Adoption</span>
                      <span className="text-blue-400">+72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <div className="flex justify-between">
                      <span>Cycling Culture Growth</span>
                      <span className="text-yellow-400">+91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-cyan-400">Market Indicators</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Green Investment Flow</span>
                      <span className="text-green-400">+134%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Engagement</span>
                      <span className="text-purple-400">+89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Token Utility Demand</span>
                      <span className="text-orange-400">+156%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control" className="space-y-4">
          <Card className="border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400">
                <Shield className="inline h-5 w-5 mr-2" />
                Admin-Only Engine Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-red-600 hover:bg-red-700 h-16 flex-col">
                  <Zap className="h-5 w-5 mb-1" />
                  <span className="text-xs">Max Power Mode</span>
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex-col">
                  <Eye className="h-5 w-5 mb-1" />
                  <span className="text-xs">Deep Web Scan</span>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 h-16 flex-col">
                  <BarChart3 className="h-5 w-5 mb-1" />
                  <span className="text-xs">Pattern Analysis</span>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex-col">
                  <Sparkles className="h-5 w-5 mb-1" />
                  <span className="text-xs">Quantum Prediction</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
