import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, Wave, Eye, Shield, Zap, Globe } from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

export default function SeaGreenPsychohistoricalProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌊 Sea Green Psychohistorical Project
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Predicting and Shaping the Future of Marine Ecosystems
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
                <Brain className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-green-400">AI Analysis</div>
                <div className="text-sm text-muted-foreground">Predictive Modeling</div>
                <Badge className="bg-green-600 mt-2">Deep Insights</Badge>
              </div>

              <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <Wave className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-blue-400">Ocean Data</div>
                <div className="text-sm text-muted-foreground">Real-Time Monitoring</div>
                <Badge className="bg-blue-600 mt-2">Live Updates</Badge>
              </div>

              <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <Eye className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-purple-400">Psychohistory</div>
                <div className="text-sm text-muted-foreground">Future Projections</div>
                <Badge className="bg-purple-600 mt-2">Visionary</Badge>
              </div>

              <div className="text-center p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                <Shield className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-yellow-400">Ecosystem Defense</div>
                <div className="text-sm text-muted-foreground">Protecting Marine Life</div>
                <Badge className="bg-yellow-600 mt-2">Guardian Status</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">AI-Driven Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Using advanced AI to forecast ecological changes and potential threats.
              </p>
              <Progress value={85} className="mt-4" />
              <div className="flex justify-between text-sm mt-2">
                <span>Accuracy</span>
                <span>85%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">Ecosystem Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Strategies for restoring and protecting marine ecosystems.
              </p>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Explore Solutions
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">
            🌊 Shaping a Sustainable Marine Future 🌊
          </div>
          <div className="text-xl text-blue-300">
            Combining AI, data, and psychohistory to protect our oceans.
          </div>
        </div>
      </div>
    </div>
  )
}
