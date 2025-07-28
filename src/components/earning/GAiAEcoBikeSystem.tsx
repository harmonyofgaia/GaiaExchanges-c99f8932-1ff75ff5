
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { Bike, MapPin, Clock, TrendingUp, Award, Zap } from 'lucide-react'

export function GAiAEcoBikeSystem() {
  const [rideType, setRideType] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [bikeType, setBikeType] = useState('')
  const { addActivity, loading } = useEarningActivities('user-123')

  // Mock user bike stats
  const bikeStats = {
    totalRides: 47,
    totalDistance: 234.5,
    co2Saved: 58.6,
    caloriesBurned: 12350,
    currentStreak: 12,
    level: 'Eco Cyclist',
    nextLevelProgress: 75
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!rideType || !distance || !duration || !bikeType) {
      toast.error('Please fill in all fields')
      return
    }

    const distanceNum = parseFloat(distance)
    const durationNum = parseFloat(duration)
    const points = Math.floor(distanceNum * 3 + durationNum * 0.5)
    const tokens = Math.floor(distanceNum * 0.6)
    const co2Saved = distanceNum * 0.25 // kg CO2 saved per km

    const activity = {
      id: Date.now().toString(),
      type: 'gaia_eco_bike',
      title: 'GAiA Eco Bike Ride',
      amount: points,
      timestamp: new Date(),
      description: `${distanceNum}km ${rideType} ride (${durationNum} min) - Saved ${co2Saved.toFixed(2)}kg CO2`,
      status: 'completed' as const,
      pointsEarned: points,
      tokensEarned: tokens,
      verified: true,
      metadata: { 
        rideType, 
        distance: distanceNum, 
        duration: durationNum, 
        bikeType,
        co2Saved 
      }
    }

    addActivity(activity)
    toast.success(`🚲 Eco ride recorded! +${points} points, +${tokens} GAiA tokens earned`, {
      description: `You saved ${co2Saved.toFixed(2)}kg CO2 and earned rewards!`,
      duration: 4000
    })
    
    // Reset form
    setRideType('')
    setDistance('')
    setDuration('')
    setBikeType('')
  }

  return (
    <div className="space-y-6">
      {/* User Stats Card */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Bike className="h-6 w-6" />
            🚲 Your GAiA Eco Bike Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-800/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{bikeStats.totalRides}</div>
              <div className="text-sm text-muted-foreground">Total Rides</div>
            </div>
            <div className="text-center p-3 bg-blue-800/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{bikeStats.totalDistance}km</div>
              <div className="text-sm text-muted-foreground">Distance</div>
            </div>
            <div className="text-center p-3 bg-emerald-800/20 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">{bikeStats.co2Saved}kg</div>
              <div className="text-sm text-muted-foreground">CO2 Saved</div>
            </div>
            <div className="text-center p-3 bg-purple-800/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{bikeStats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Level Progress</span>
              <Badge className="bg-green-600">{bikeStats.level}</Badge>
            </div>
            <Progress value={bikeStats.nextLevelProgress} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {bikeStats.nextLevelProgress}% to Eco Champion
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Record Ride Form */}
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <MapPin className="h-5 w-5" />
            🚴‍♂️ Record Your Eco Ride
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ride Type</label>
                <Select value={rideType} onValueChange={setRideType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ride type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commute">Daily Commute</SelectItem>
                    <SelectItem value="leisure">Leisure Ride</SelectItem>
                    <SelectItem value="exercise">Exercise/Fitness</SelectItem>
                    <SelectItem value="errand">Running Errands</SelectItem>
                    <SelectItem value="delivery">Eco Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Bike Type</label>
                <Select value={bikeType} onValueChange={setBikeType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bike type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular Bike</SelectItem>
                    <SelectItem value="electric">E-Bike</SelectItem>
                    <SelectItem value="mountain">Mountain Bike</SelectItem>
                    <SelectItem value="road">Road Bike</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Distance (km)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="Enter distance"
                  min="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Enter ride duration"
                  min="1"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {loading ? 'Recording...' : '🚲 Record Eco Ride & Earn Rewards'}
            </Button>
          </form>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30 text-center">
              <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <div className="text-sm text-green-300">3 points per km</div>
            </div>
            <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30 text-center">
              <Zap className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <div className="text-sm text-blue-300">0.6 GAiA per km</div>
            </div>
            <div className="p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30 text-center">
              <Award className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-sm text-emerald-300">0.25kg CO2 saved/km</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits & Discounts */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400">🎁 Eco Bike Benefits & Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-purple-300">Active Discounts:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-purple-800/20 rounded">
                  <span>Bike Shop Partners</span>
                  <Badge className="bg-green-600">20% OFF</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-800/20 rounded">
                  <span>Eco Gear & Accessories</span>
                  <Badge className="bg-blue-600">15% OFF</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-800/20 rounded">
                  <span>Bike Maintenance</span>
                  <Badge className="bg-emerald-600">25% OFF</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-purple-300">Rewards Program:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Daily ride bonuses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Weekly challenge rewards</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Distance milestone badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Carbon offset certificates</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
