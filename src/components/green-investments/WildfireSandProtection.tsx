
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
  Globe,
  Zap,
  Wind
} from 'lucide-react'
import { toast } from 'sonner'

export function WildfireSandProtection() {
  const [projectStats, setProjectStats] = useState({
    sandCannonSites: 12,
    wildfiresPrevented: 47,
    forestsProtected: 25,
    volunteersActive: 234,
    fundingRaised: 275000,
    currentFunding: 275000,
    fundingGoal: 800000,
    sandBlastRange: 2.5, // kilometers
    cannonCapacity: 15000 // liters per blast
  })

  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setProjectStats(prev => ({
        ...prev,
        sandCannonSites: prev.sandCannonSites + Math.floor(Math.random() * 2),
        wildfiresPrevented: prev.wildfiresPrevented + Math.floor(Math.random() * 3),
        volunteersActive: prev.volunteersActive + Math.floor(Math.random() * 8),
        currentFunding: Math.min(prev.fundingGoal, prev.currentFunding + Math.floor(Math.random() * 2000)),
        fundingRaised: prev.fundingRaised + Math.floor(Math.random() * 800)
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = () => {
    setSubscribed(!subscribed)
    toast.success(subscribed ? '💔 Unsubscribed' : '🚀 Subscribed to Sand Blast Defense!', {
      description: subscribed 
        ? 'Stopped supporting sand blast wildfire protection' 
        : 'Now supporting advanced sand blast cannon wildfire defense systems',
      duration: 4000
    })
  }

  const fundingPercentage = (projectStats.currentFunding / projectStats.fundingGoal) * 100

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent mb-4">
          🌊💥 SAND BLAST WILDFIRE DEFENSE SYSTEM
        </h2>
        <p className="text-orange-300 text-lg">
          Revolutionary Sand Blast Cannons • Forest Protection Technology • Advanced Wildfire Prevention
        </p>
        {subscribed && (
          <Badge className="mt-2 bg-orange-600 text-white">
            <Heart className="h-4 w-4 mr-1 fill-current" />
            ACTIVE DEFENDER
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
              🚨 BREAKTHROUGH TECHNOLOGY
            </Badge>
            <Badge className="bg-green-600 text-white">
              ⚡ ACTIVE DEPLOYMENT
            </Badge>
          </div>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Wind className="h-6 w-6" />
            Sand Blast Wildfire Defense System
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h3 className="text-yellow-400 font-bold text-lg mb-3 flex items-center gap-2">
              💥 Revolutionary Sand Blast Technology
            </h3>
            <p className="text-yellow-300/90 text-base leading-relaxed">
              Deploy massive sand blast cannons strategically positioned around high-risk forest areas. 
              When wildfire threats are detected, these powerful cannons fire concentrated sand blasts 
              up to {projectStats.sandBlastRange}km away, creating instant firebreaks and smothering flames 
              before they can spread. Each cannon holds {projectStats.cannonCapacity.toLocaleString()} liters 
              of specialized fire-suppressing sand mixture.
            </p>
          </div>

          {/* Funding Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-orange-400">Sand Blast Cannon Funding</span>
              <span className="text-orange-300">
                ${projectStats.currentFunding.toLocaleString()} / ${projectStats.fundingGoal.toLocaleString()} GAiA
              </span>
            </div>
            <Progress value={fundingPercentage} className="h-3" />
            <div className="text-xs text-orange-300/60">
              {fundingPercentage.toFixed(1)}% funded • ${Math.round((projectStats.fundingGoal - projectStats.currentFunding) / 1000)}k needed for next cannon deployment
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <Wind className="h-6 w-6 text-red-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-red-400">{projectStats.sandCannonSites}</div>
              <div className="text-xs text-red-300/80">Active Cannon Sites</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <Flame className="h-6 w-6 text-orange-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-orange-400">{projectStats.wildfiresPrevented}</div>
              <div className="text-xs text-orange-300/80">Fires Extinguished</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <TreePine className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-400">{projectStats.forestsProtected}</div>
              <div className="text-xs text-green-300/80">Forests Protected</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-blue-400">{projectStats.volunteersActive}</div>
              <div className="text-xs text-blue-300/80">Defense Operators</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Target className="h-6 w-6 text-purple-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-purple-400">{projectStats.sandBlastRange}km</div>
              <div className="text-xs text-purple-300/80">Blast Range</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-yellow-400">{(projectStats.cannonCapacity/1000).toFixed(0)}K</div>
              <div className="text-xs text-yellow-300/80">Liters Per Blast</div>
            </div>
          </div>

          {/* Technology Features */}
          <div className="space-y-4">
            <h4 className="text-orange-400 font-bold flex items-center gap-2">
              <Target className="h-5 w-5" />
              Sand Blast Defense Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <Wind className="h-4 w-4" />
                  <span className="font-medium">Mega Sand Cannons</span>
                </div>
                <p className="text-sm text-red-300/80">High-pressure sand blast systems with 2.5km range</p>
              </div>
              <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-orange-400 mb-1">
                  <Flame className="h-4 w-4" />
                  <span className="font-medium">Fire Detection AI</span>
                </div>
                <p className="text-sm text-orange-300/80">Automated threat detection and rapid response</p>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-yellow-400 mb-1">
                  <Waves className="h-4 w-4" />
                  <span className="font-medium">Special Sand Mix</span>
                </div>
                <p className="text-sm text-yellow-300/80">Fire-suppressing sand with cooling compounds</p>
              </div>
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Forest Barriers</span>
                </div>
                <p className="text-sm text-green-300/80">Instant firebreak creation and protection zones</p>
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
              {subscribed ? 'Stop Defense Support' : 'Support Sand Defense'}
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-400 text-orange-400 hover:bg-orange-900/20"
            >
              <Wind className="h-4 w-4 mr-2" />
              Deploy Cannon
            </Button>
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-2">
              <Globe className="h-5 w-5" />
              <span className="font-medium">Defense Network Impact</span>
            </div>
            <p className="text-sm text-orange-300/80 mb-2">
              Deploy 50+ mega sand blast cannons across high-risk forest zones, creating an automated 
              wildfire defense network capable of instantly suppressing fires within a 2.5km radius. 
              Protect over 100,000 hectares of critical forest habitat.
            </p>
            <p className="text-xs text-orange-400/60">
              📍 Priority Locations: California Forests • Australian Bush • Mediterranean Zones • Amazon Perimeter
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
