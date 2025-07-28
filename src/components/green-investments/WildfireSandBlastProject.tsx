
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Zap, Target, Users, TreePine, AlertTriangle } from 'lucide-react'

export function WildfireSandBlastProject() {
  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-6 w-6" />
              🔥 Forest Shield Sand Cannon Defense System
            </CardTitle>
            <Badge className="bg-red-600 text-white animate-pulse">
              FUTURE PROJECT
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-red-300/90 text-lg">
            Revolutionary wildfire defense system using automated sand blast cannons 
            with AI detection to protect 10 million hectares of forest worldwide
          </p>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-red-800/30 rounded-lg">
              <Shield className="h-6 w-6 text-red-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-red-400">10,000</div>
              <div className="text-xs text-red-300/80">Sand Cannons Planned</div>
            </div>
            <div className="text-center p-3 bg-orange-800/30 rounded-lg">
              <TreePine className="h-6 w-6 text-orange-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-orange-400">10M</div>
              <div className="text-xs text-orange-300/80">Hectares Protected</div>
            </div>
            <div className="text-center p-3 bg-yellow-800/30 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-yellow-400">99.5%</div>
              <div className="text-xs text-yellow-300/80">Detection Accuracy</div>
            </div>
            <div className="text-center p-3 bg-green-800/30 rounded-lg">
              <Target className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-green-400">$650M</div>
              <div className="text-xs text-green-300/80">Total Investment</div>
            </div>
          </div>

          {/* Implementation Phases */}
          <div className="space-y-3">
            <h4 className="text-red-400 font-bold">Implementation Timeline</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-300">Phase 1: R&D & Prototyping</span>
                <span className="text-xs text-red-400">Q1-Q2 2025</span>
              </div>
              <Progress value={15} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-300">Phase 2: Pilot Programs</span>
                <span className="text-xs text-orange-400">Q3-Q4 2025</span>
              </div>
              <Progress value={0} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-300">Phase 3: Global Expansion</span>
                <span className="text-xs text-yellow-400">2026-2027</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-800/20 rounded-lg p-4">
              <h5 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                AI Fire Detection
              </h5>
              <p className="text-sm text-red-300/80">
                Real-time satellite monitoring with 30-second response time
              </p>
            </div>
            <div className="bg-orange-800/20 rounded-lg p-4">
              <h5 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Automated Sand Cannons
              </h5>
              <p className="text-sm text-orange-300/80">
                500-1000m range with 10,000kg sand capacity per unit
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 bg-red-600 hover:bg-red-700">
              <Target className="h-4 w-4 mr-2" />
              Join Future Investment
            </Button>
            <Button variant="outline" className="border-red-400 text-red-400">
              <Users className="h-4 w-4 mr-2" />
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
