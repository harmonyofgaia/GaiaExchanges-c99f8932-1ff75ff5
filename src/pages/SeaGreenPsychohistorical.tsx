
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Brain, Zap, Globe, Shield, AlertTriangle, TrendingUp, Users, Target } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function SeaGreenPsychohistorical() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-teal-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            🧠 Sea Green Psychohistorical Project
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Advanced AI-Powered Environmental Future Prediction & Solution Generation
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-teal-500/50 text-teal-400">
              <Brain className="h-3 w-3 mr-1" />
              AI Predictions
            </Badge>
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Globe className="h-3 w-3 mr-1" />
              Global Analysis
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Zap className="h-3 w-3 mr-1" />
              Real-time Processing
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-teal-900/20 to-black/50 border-teal-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-teal-400">Prediction Accuracy</CardTitle>
              <Brain className="h-4 w-4 text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">87.3%</div>
              <p className="text-xs text-muted-foreground">Environmental forecasting</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Solutions Generated</CardTitle>
              <Zap className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,247</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Active Implementations</CardTitle>
              <Target className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">234</div>
              <p className="text-xs text-muted-foreground">Solutions in progress</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Community Impact</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">45K</div>
              <p className="text-xs text-muted-foreground">Lives improved</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-teal-900/20 to-black/50 border-teal-500/20">
            <CardHeader>
              <CardTitle className="text-teal-400">Psychohistorical Analysis Engine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-teal-900/20 rounded-lg border border-teal-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-teal-400">Climate Pattern Analysis</h4>
                    <Badge variant="outline" className="border-teal-500/30 text-teal-400 text-xs">Active</Badge>
                  </div>
                  <Progress value={89} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">Processing global climate data streams</p>
                </div>

                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-green-400">Ecosystem Modeling</h4>
                    <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">Learning</Badge>
                  </div>
                  <Progress value={76} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">Biodiversity trend prediction models</p>
                </div>

                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-blue-400">Social Impact Forecasting</h4>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">Analyzing</Badge>
                  </div>
                  <Progress value={63} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">Community behavior pattern analysis</p>
                </div>

                <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-purple-400">Technology Integration</h4>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">Optimizing</Badge>
                  </div>
                  <Progress value={94} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">Green tech adoption predictions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">AI-Generated Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-green-400">Ocean Plastic Harvesting</h4>
                    <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">High Impact</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">AI-designed autonomous cleanup vessels for microplastic removal</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Feasibility: 94%</span>
                    <span className="text-green-400">Implementation: Ready</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-blue-400">Urban Carbon Capture</h4>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">Medium Impact</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Building-integrated CO₂ absorption systems</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Feasibility: 78%</span>
                    <span className="text-blue-400">Implementation: Planning</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-purple-400">Ecosystem Regeneration</h4>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">Critical Impact</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Biome restoration through species reintroduction algorithms</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Feasibility: 67%</span>
                    <span className="text-purple-400">Implementation: Research</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-red-900/20 to-black/50 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Environmental Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-2 bg-red-900/30 rounded border border-red-500/30">
                <div className="text-sm font-medium text-red-400">Critical Deforestation Alert</div>
                <div className="text-xs text-muted-foreground">Amazon Basin - Immediate action required</div>
              </div>
              <div className="p-2 bg-orange-900/30 rounded border border-orange-500/30">
                <div className="text-sm font-medium text-orange-400">Ocean Temperature Rise</div>
                <div className="text-xs text-muted-foreground">Pacific Region - Monitoring escalated</div>
              </div>
              <div className="p-2 bg-yellow-900/30 rounded border border-yellow-500/30">
                <div className="text-sm font-medium text-yellow-400">Biodiversity Decline</div>
                <div className="text-xs text-muted-foreground">Southeast Asia - Intervention planned</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Positive Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-2 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-sm font-medium text-green-400">Renewable Energy Growth</div>
                <div className="text-xs text-muted-foreground">Global adoption up 23% this quarter</div>
              </div>
              <div className="p-2 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-sm font-medium text-blue-400">Ocean Cleanup Success</div>
                <div className="text-xs text-muted-foreground">Mediterranean recovery ahead of schedule</div>
              </div>
              <div className="p-2 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-sm font-medium text-purple-400">Community Engagement</div>
                <div className="text-xs text-muted-foreground">Participation rates reaching new highs</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 justify-start">
                <Brain className="h-4 w-4 mr-2" />
                View Predictions
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <Zap className="h-4 w-4 mr-2" />
                Generate Solutions
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Target className="h-4 w-4 mr-2" />
                Implementation Queue
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <Users className="h-4 w-4 mr-2" />
                Community Voting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
