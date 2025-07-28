
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Flame, 
  Waves, 
  TreePine, 
  Users, 
  Target, 
  DollarSign,
  AlertTriangle,
  Heart,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'

export function WildfireSandProtection() {
  const [projectStats, setProjectStats] = useState({
    protectedAreas: 15,
    wildfiresPrevented: 23,
    sandDunesRestored: 8,
    volunteersActive: 189,
    fundingRaised: 145000,
    currentFunding: 145000,
    fundingGoal: 500000
  })

  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setProjectStats(prev => ({
        ...prev,
        protectedAreas: prev.protectedAreas + Math.floor(Math.random() * 2),
        volunteersActive: prev.volunteersActive + Math.floor(Math.random() * 5),
        currentFunding: Math.min(prev.fundingGoal, prev.currentFunding + Math.floor(Math.random() * 1000)),
        fundingRaised: prev.fundingRaised + Math.floor(Math.random() * 500)
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = () => {
    setSubscribed(!subscribed)
    toast.success(subscribed ? '💔 Unsubscribed' : '🔥 Subscribed to Wildfire Protection!', {
      description: subscribed 
        ? 'Stopped supporting wildfire sand protection' 
        : 'Now supporting wildfire and sand dune protection efforts',
      duration: 4000
    })
  }

  const fundingPercentage = (projectStats.currentFunding / projectStats.fundingGoal) * 100

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent mb-4">
          🔥 WILDFIRE SAND PROTECTION PLAN
        </h2>
        <p className="text-orange-300 text-lg">
          Advanced wildfire prevention and coastal sand dune restoration • Community Protection Initiative
        </p>
        {subscribed && (
          <Badge className="mt-2 bg-orange-600 text-white">
            <Heart className="h-4 w-4 mr-1 fill-current" />
            ACTIVE SUPPORTER
          </Badge>
        )}
      </div>

      {/* Main Project Card */}
      <Card className={`bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30 transition-all duration-300 ${
        subscribed ? 'ring-2 ring-orange-400/50 shadow-lg shadow-orange-400/20' : ''
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className="bg-red-600 text-white">
              CRITICAL PRIORITY
            </Badge>
            <Badge className="bg-green-600 text-white">
              ACTIVE PROJECT
            </Badge>
          </div>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Wildfire Sand Protection Plan
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-orange-300/90 text-lg">
            Comprehensive protection plan combining wildfire prevention systems with coastal sand dune restoration. 
            Using advanced fire suppression technology and natural barrier creation to protect communities and ecosystems.
          </p>

          {/* Funding Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-orange-400">Funding Progress</span>
              <span className="text-orange-300">
                ${projectStats.currentFunding.toLocaleString()} / ${projectStats.fundingGoal.toLocaleString()} GAiA
              </span>
            </div>
            <Progress value={fundingPercentage} className="h-3" />
            <div className="text-xs text-orange-300/60">
              {fundingPercentage.toFixed(1)}% funded • {Math.round((projectStats.fundingGoal - projectStats.currentFunding) / 1000)}k remaining
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-red-900/30">
              <Shield className="h-6 w-6 text-red-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-red-400">{projectStats.protectedAreas}</div>
              <div className="text-xs text-red-300/80">Protected Areas</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-900/30">
              <Flame className="h-6 w-6 text-orange-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-orange-400">{projectStats.wildfiresPrevented}</div>
              <div className="text-xs text-orange-300/80">Wildfires Prevented</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-900/30">
              <Waves className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-yellow-400">{projectStats.sandDunesRestored}</div>
              <div className="text-xs text-yellow-300/80">Sand Dunes Restored</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <Users className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-400">{projectStats.volunteersActive}</div>
              <div className="text-xs text-green-300/80">Active Volunteers</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <DollarSign className="h-6 w-6 text-blue-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-blue-400">${(projectStats.fundingRaised / 1000).toFixed(0)}k</div>
              <div className="text-xs text-blue-300/80">Total Raised</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30">
              <Globe className="h-6 w-6 text-purple-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-purple-400">87%</div>
              <div className="text-xs text-purple-300/80">Project Progress</div>
            </div>
          </div>

          {/* Project Features */}
          <div className="space-y-4">
            <h4 className="text-orange-400 font-bold flex items-center gap-2">
              <Target className="h-5 w-5" />
              Key Protection Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <Flame className="h-4 w-4" />
                  <span className="font-medium">Wildfire Prevention</span>
                </div>
                <p className="text-sm text-red-300/80">Advanced fire suppression systems and firebreaks</p>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-yellow-400 mb-1">
                  <Waves className="h-4 w-4" />
                  <span className="font-medium">Sand Dune Restoration</span>
                </div>
                <p className="text-sm text-yellow-300/80">Coastal protection and erosion control</p>
              </div>
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                  <TreePine className="h-4 w-4" />
                  <span className="font-medium">Ecosystem Recovery</span>
                </div>
                <p className="text-sm text-green-300/80">Native vegetation restoration and habitat protection</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Community Safety</span>
                </div>
                <p className="text-sm text-blue-300/80">Emergency response and evacuation planning</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleSubscribe}
              className={`flex-1 ${
                subscribed 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
              }`}
            >
              <Heart className={`h-4 w-4 mr-2 ${subscribed ? 'fill-current' : ''}`} />
              {subscribed ? 'Unsubscribe' : 'Subscribe & Support'}
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-400 text-orange-400 hover:bg-orange-900/20"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Report
            </Button>
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-2">
              <Globe className="h-5 w-5" />
              <span className="font-medium">Expected Impact</span>
            </div>
            <p className="text-sm text-orange-300/80 mb-2">
              Protect 50+ coastal communities from wildfire threats, restore 25 km of sand dune barriers, 
              and create sustainable firebreaks covering 10,000 hectares of high-risk areas.
            </p>
            <p className="text-xs text-orange-400/60">
              📍 Location: California Coast • Oregon Dunes • Mediterranean Climate Zones
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related SandProtect Integration */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-teal-900/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Waves className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold text-blue-400">Integrated with SandProtect Initiative</h3>
              <Shield className="h-6 w-6 text-teal-400" />
            </div>
            <p className="text-blue-300/80 mb-4">
              This project works in coordination with our SandProtect marine conservation efforts, 
              creating a comprehensive coastal and fire protection ecosystem.
            </p>
            <Button 
              variant="outline" 
              className="border-blue-400 text-blue-400 hover:bg-blue-900/20"
            >
              <Waves className="h-4 w-4 mr-2" />
              View SandProtect Initiative
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
