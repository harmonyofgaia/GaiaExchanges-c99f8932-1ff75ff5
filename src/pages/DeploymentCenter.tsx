
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Rocket, Server, Globe, Shield, Zap, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

export default function DeploymentCenter() {
  const deploymentStages = [
    { name: "Code Repository", status: "completed", progress: 100, time: "2 min ago" },
    { name: "Build Process", status: "completed", progress: 100, time: "1 min ago" },
    { name: "Security Scan", status: "completed", progress: 100, time: "30 sec ago" },
    { name: "Testing Suite", status: "in-progress", progress: 85, time: "Running..." },
    { name: "Deployment", status: "pending", progress: 0, time: "Waiting..." },
    { name: "DNS Propagation", status: "pending", progress: 0, time: "Waiting..." }
  ]

  const environments = [
    { name: "Development", url: "dev.gaiaexchanges.net", status: "active", uptime: "99.9%" },
    { name: "Staging", url: "staging.gaiaexchanges.net", status: "active", uptime: "99.8%" },
    { name: "Production", url: "www.gaiaexchanges.net", status: "deploying", uptime: "100%" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 p-6">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-8 border-indigo-500/50 bg-gradient-to-r from-indigo-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              🚀 GAiA Deployment Center
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Master Plan v7 - Zero-Downtime Deployment with Einstein Copilot
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-green-600">✅ Auto-Deploy</Badge>
              <Badge className="bg-blue-600">🔍 Security Scanned</Badge>
              <Badge className="bg-purple-600">🤖 AI Assisted</Badge>
              <Badge className="bg-yellow-600">⚡ Zero Downtime</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">247</div>
              <div className="text-sm text-muted-foreground">Successful Deploys</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <Server className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">99.99%</div>
              <div className="text-sm text-muted-foreground">Uptime Record</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">3.2s</div>
              <div className="text-sm text-muted-foreground">Avg Deploy Time</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">0</div>
              <div className="text-sm text-muted-foreground">Security Issues</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-indigo-500/30 bg-indigo-900/20">
            <CardHeader>
              <CardTitle className="text-indigo-400">🔄 Current Deployment Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentStages.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3">
                      {stage.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : stage.status === "in-progress" ? (
                        <div className="h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      ) : stage.status === "pending" ? (
                        <Clock className="h-5 w-5 text-gray-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      )}
                      <div>
                        <div className="font-medium">{stage.name}</div>
                        <div className="text-sm text-muted-foreground">{stage.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={stage.progress} className="w-20 h-2" />
                      <span className="text-sm text-muted-foreground w-12">{stage.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">🌐 Environment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {environments.map((env, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{env.name}</h3>
                      <Badge className={`${
                        env.status === "active" ? "bg-green-600" : 
                        env.status === "deploying" ? "bg-blue-600" : "bg-gray-600"
                      }`}>
                        {env.status === "active" ? "🟢 Active" :
                         env.status === "deploying" ? "🔄 Deploying" : "⏸️ Offline"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">URL:</div>
                        <div className="text-blue-400 font-mono">{env.url}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Uptime:</div>
                        <div className="text-green-400 font-bold">{env.uptime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Rocket className="h-6 w-6" />
                Quick Deploy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Deploy the latest changes to production with one click.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Rocket className="h-4 w-4 mr-2" />
                Deploy to Production
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Security Scan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Run comprehensive security analysis before deployment.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Shield className="h-4 w-4 mr-2" />
                Run Security Scan
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Einstein Copilot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                AI-powered deployment assistance and optimization recommendations.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Zap className="h-4 w-4 mr-2" />
                Ask Einstein
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
