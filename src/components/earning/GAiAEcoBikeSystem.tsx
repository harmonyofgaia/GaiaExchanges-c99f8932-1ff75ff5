
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Bike, 
  MapPin, 
  Timer, 
  Zap, 
  TreePine, 
  TrendingUp,
  Award,
  Users,
  Target
} from 'lucide-react'
import { toast } from 'sonner'

interface BikeSession {
  id: string
  distance: number
  duration: number
  tokensEarned: number
  carbonOffset: number
  route: string
  timestamp: Date
}

export function GAiAEcoBikeSystem() {
  const [currentSession, setCurrentSession] = useState<BikeSession | null>(null)
  const [isRiding, setIsRiding] = useState(false)
  const [distance, setDistance] = useState('')
  const [sessions] = useState<BikeSession[]>([
    {
      id: '1',
      distance: 12.5,
      duration: 45,
      tokensEarned: 25,
      carbonOffset: 2.8,
      route: 'City Center → Park Loop',
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      distance: 8.2,
      duration: 32,
      tokensEarned: 16,
      carbonOffset: 1.9,
      route: 'Home → Office',
      timestamp: new Date(Date.now() - 172800000)
    }
  ])

  const totalDistance = sessions.reduce((sum, session) => sum + session.distance, 0)
  const totalTokens = sessions.reduce((sum, session) => sum + session.tokensEarned, 0)
  const totalCarbonOffset = sessions.reduce((sum, session) => sum + session.carbonOffset, 0)

  const startRide = () => {
    setIsRiding(true)
    setCurrentSession({
      id: Date.now().toString(),
      distance: 0,
      duration: 0,
      tokensEarned: 0,
      carbonOffset: 0,
      route: 'Current Route',
      timestamp: new Date()
    })
    toast.success('🚴 Bike ride started! Start earning GAiA tokens!')
  }

  const endRide = () => {
    if (!distance) {
      toast.error('Please enter the distance traveled')
      return
    }

    const distanceNum = parseFloat(distance)
    const tokens = Math.floor(distanceNum * 2) // 2 tokens per km
    const carbonOffset = distanceNum * 0.23 // 0.23 kg CO2 saved per km
    
    setIsRiding(false)
    setCurrentSession(null)
    setDistance('')
    
    toast.success(`🎉 Ride completed! Earned ${tokens} GAiA tokens and offset ${carbonOffset.toFixed(1)}kg CO2`)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Bike className="h-6 w-6" />
            🚴 GAiA Eco Bike System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{totalDistance.toFixed(1)}</div>
              <div className="text-sm text-blue-300">Total km</div>
            </div>
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{totalTokens}</div>
              <div className="text-sm text-green-300">GAiA Earned</div>
            </div>
            <div className="text-center p-3 bg-emerald-900/20 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">{totalCarbonOffset.toFixed(1)}</div>
              <div className="text-sm text-emerald-300">kg CO2 Saved</div>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{sessions.length}</div>
              <div className="text-sm text-purple-300">Total Rides</div>
            </div>
          </div>

          {/* Current Session or Start Ride */}
          {!isRiding ? (
            <div className="text-center space-y-4">
              <Button 
                onClick={startRide}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Bike className="h-5 w-5 mr-2" />
                Start Eco Bike Ride
              </Button>
              <p className="text-sm text-muted-foreground">
                Earn 2 GAiA tokens per kilometer + carbon offset credits
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="text-lg font-bold text-blue-400 mb-2">🚴 Ride in Progress</div>
                <div className="text-sm text-blue-300">Track your distance and earn tokens!</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Distance Traveled (km)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="Enter distance in kilometers"
                  min="0.1"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={endRide}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Complete Ride
                </Button>
                <Button 
                  onClick={() => {
                    setIsRiding(false)
                    setCurrentSession(null)
                    setDistance('')
                  }}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-900/20"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-400 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Smart Features
              </h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-green-400" />
                  GPS Route Tracking
                </li>
                <li className="flex items-center gap-2">
                  <Timer className="h-3 w-3 text-blue-400" />
                  Real-time Rewards
                </li>
                <li className="flex items-center gap-2">
                  <TreePine className="h-3 w-3 text-emerald-400" />
                  Carbon Offset Calculation
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-purple-400" />
                  Community Challenges
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-green-400 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Earning Bonuses
              </h4>
              <ul className="text-sm space-y-1">
                <li className="text-green-300">• 2x tokens for daily rides</li>
                <li className="text-blue-300">• 3x tokens for eco-routes</li>
                <li className="text-purple-300">• 5x tokens for group rides</li>
                <li className="text-orange-300">• 10x tokens for challenges</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400">Recent Bike Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-900/20 rounded">
                    <Bike className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">{session.route}</div>
                    <div className="text-sm text-muted-foreground">
                      {session.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-blue-400">{session.distance}km</span>
                    <Badge className="bg-green-600">+{session.tokensEarned} GAiA</Badge>
                    <span className="text-emerald-400">{session.carbonOffset}kg CO2</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
