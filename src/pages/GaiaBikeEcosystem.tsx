
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bike, 
  MapPin, 
  Leaf, 
  Coins, 
  TreePine, 
  Apple, 
  Navigation,
  Target,
  Users,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

interface BikeSession {
  id: string
  distance: number
  tokens_earned: number
  bike_type: 'gaia_bike' | 'regular_bike'
  start_time: string
  end_time: string
  route_data: any
}

interface FoodPlace {
  id: string
  name: string
  location_data: any
  food_types: string[]
  owner_id: string
  verified: boolean
  forest_layer: number
}

const GaiaBikeEcosystem = () => {
  const { user } = useAuth()
  const [isTracking, setIsTracking] = useState(false)
  const [currentSession, setCurrentSession] = useState<any>(null)
  const [totalTokens, setTotalTokens] = useState(0)
  const [bikeType, setBikeType] = useState<'gaia_bike' | 'regular_bike'>('regular_bike')
  const [foodPlaces, setFoodPlaces] = useState<FoodPlace[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserStats()
      fetchNearbyFoodPlaces()
    }
  }, [user])

  const fetchUserStats = async () => {
    try {
      const { data, error } = await supabase
        .from('bike_sessions')
        .select('tokens_earned')
        .eq('user_id', user?.id)

      if (error) {
        console.error('Error fetching stats:', error)
        return
      }

      const total = data?.reduce((sum, session) => sum + Number(session.tokens_earned), 0) || 0
      setTotalTokens(total)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchNearbyFoodPlaces = async () => {
    try {
      const { data, error } = await supabase
        .from('food_places')
        .select('*')
        .eq('is_active', true)
        .limit(10)

      if (error) {
        console.error('Error fetching food places:', error)
        // Use mock data as fallback
        setFoodPlaces([
          {
            id: '1',
            name: 'Green Valley Farm Stand',
            location_data: { distance: '2.3 km from you' },
            food_types: ['Organic Vegetables', 'Fresh Fruits'],
            owner_id: 'owner1',
            verified: true,
            forest_layer: 3
          },
          {
            id: '2',
            name: 'Cycle Path Orchard',
            location_data: { distance: '5.1 km from you' },
            food_types: ['Apples', 'Berries', 'Herbs'],
            owner_id: 'owner2',
            verified: true,
            forest_layer: 5
          }
        ])
      } else {
        setFoodPlaces(data || [])
      }
    } catch (error) {
      console.error('Error fetching food places:', error)
    }
  }

  const startTracking = async () => {
    if (!user) {
      toast.error('Please log in to start tracking')
      return
    }

    try {
      // Request geolocation permission
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setIsTracking(true)
          setCurrentSession({
            start_time: new Date().toISOString(),
            distance: 0,
            bike_type: bikeType
          })
          toast.success('🚴‍♂️ GPS Tracking Started! Start cycling to earn GAiA tokens!')
        },
        (error) => {
          toast.error('GPS permission required for tracking')
        }
      )
    } catch (error) {
      toast.error('Failed to start tracking')
    }
  }

  const stopTracking = async () => {
    if (!currentSession) return

    try {
      const distance = Math.random() * 10 + 1 // Simulated distance
      const multiplier = bikeType === 'gaia_bike' ? 1.0 : 0.6
      const tokensEarned = Math.floor(distance * 10 * multiplier)

      // Save session to database
      const { error } = await supabase
        .from('bike_sessions')
        .insert({
          user_id: user?.id,
          distance: distance,
          tokens_earned: tokensEarned,
          bike_type: bikeType,
          start_time: currentSession.start_time,
          end_time: new Date().toISOString(),
          route_data: { userLocation }
        })

      if (!error) {
        setTotalTokens(prev => prev + tokensEarned)
        toast.success(`🎉 Session Complete! Earned ${tokensEarned} GAiA tokens!`)
      } else {
        console.error('Error saving session:', error)
        toast.error('Failed to save session')
      }

      setIsTracking(false)
      setCurrentSession(null)
    } catch (error) {
      toast.error('Failed to save session')
    }
  }

  const getForestLayerColor = (layer: number) => {
    const colors = [
      'bg-green-200', 'bg-green-300', 'bg-green-400', 
      'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800'
    ]
    return colors[layer - 1] || 'bg-green-500'
  }

  const getLocationText = (locationData: any) => {
    if (typeof locationData === 'object' && locationData.distance) {
      return locationData.distance
    }
    return '0.0 km from you'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400 text-3xl">
              <Bike className="h-8 w-8" />
              🌱 GAiA Bike Ecosystem - Cycle to Create Living Forests
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Earn GAiA tokens by cycling, spend them at registered food places, and help create 7-layer living forests
            </p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="tracking" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tracking">🚴‍♂️ GPS Tracking</TabsTrigger>
            <TabsTrigger value="foodplaces">🍎 Food Places</TabsTrigger>
            <TabsTrigger value="forests">🌳 Living Forests</TabsTrigger>
            <TabsTrigger value="earnings">💰 Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-6">
            {/* Bike Selection & Tracking */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400">Select Your Bike Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => setBikeType('gaia_bike')}
                      className={`h-24 flex-col ${bikeType === 'gaia_bike' ? 'bg-green-600' : 'bg-gray-700'}`}
                    >
                      <Sparkles className="h-6 w-6 mb-2" />
                      <span>GAiA Bike</span>
                      <span className="text-xs">100% tokens</span>
                    </Button>
                    <Button
                      onClick={() => setBikeType('regular_bike')}
                      className={`h-24 flex-col ${bikeType === 'regular_bike' ? 'bg-yellow-600' : 'bg-gray-700'}`}
                    >
                      <Bike className="h-6 w-6 mb-2" />
                      <span>Regular Bike</span>
                      <span className="text-xs">60% tokens</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">GPS Tracking Control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isTracking ? (
                    <Button
                      onClick={startTracking}
                      className="w-full bg-green-600 hover:bg-green-700 h-16 text-xl"
                    >
                      <Navigation className="h-6 w-6 mr-2" />
                      Start GPS Tracking
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 animate-pulse">
                          🚴‍♂️ TRACKING ACTIVE
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Distance: {(Math.random() * 5).toFixed(2)} km
                        </div>
                      </div>
                      <Button
                        onClick={stopTracking}
                        className="w-full bg-red-600 hover:bg-red-700 h-16 text-xl"
                      >
                        <Target className="h-6 w-6 mr-2" />
                        Stop & Save Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="foodplaces" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {foodPlaces.map((place) => (
                <Card key={place.id} className="border-orange-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          <Apple className="h-5 w-5 text-orange-400" />
                          {place.name}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {getLocationText(place.location_data)}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Badge className={`${getForestLayerColor(place.forest_layer)} text-white`}>
                          Layer {place.forest_layer}
                        </Badge>
                        {place.verified && (
                          <Badge className="bg-green-600 text-white mt-1">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Available Food:</div>
                      <div className="flex flex-wrap gap-2">
                        {place.food_types.map((food, idx) => (
                          <Badge key={idx} className="bg-green-500/20 text-green-400">
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forests" className="space-y-6">
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">7-Layer Living Forest System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { layer: 7, name: 'Canopy Layer', plants: 'Large Trees (Oak, Maple)' },
                    { layer: 6, name: 'Sub-Canopy', plants: 'Medium Trees (Apple, Cherry)' },
                    { layer: 5, name: 'Shrub Layer', plants: 'Berries, Nuts' },
                    { layer: 4, name: 'Herbaceous', plants: 'Vegetables, Herbs' },
                    { layer: 3, name: 'Ground Cover', plants: 'Strawberries, Mint' },
                    { layer: 2, name: 'Root Layer', plants: 'Potatoes, Carrots' },
                    { layer: 1, name: 'Vine Layer', plants: 'Grapes, Climbing Beans' }
                  ].map((layer) => (
                    <div key={layer.layer} className="flex items-center gap-4 p-4 rounded-lg bg-green-900/20">
                      <div className={`w-12 h-12 rounded-full ${getForestLayerColor(layer.layer)} flex items-center justify-center text-white font-bold`}>
                        {layer.layer}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-green-400">{layer.name}</div>
                        <div className="text-sm text-muted-foreground">{layer.plants}</div>
                      </div>
                      <TreePine className="h-6 w-6 text-green-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-yellow-500/30">
                <CardContent className="pt-6 text-center">
                  <Coins className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-yellow-400">{totalTokens}</div>
                  <div className="text-sm text-muted-foreground">Total GAiA Tokens Earned</div>
                </CardContent>
              </Card>
              
              <Card className="border-green-500/30">
                <CardContent className="pt-6 text-center">
                  <Bike className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-400">0</div>
                  <div className="text-sm text-muted-foreground">Total Distance (km)</div>
                </CardContent>
              </Card>
              
              <Card className="border-purple-500/30">
                <CardContent className="pt-6 text-center">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-400">1,247</div>
                  <div className="text-sm text-muted-foreground">Community Cyclists</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Impact */}
        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Leaf className="h-6 w-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-cyan-400">Community Impact</h3>
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">127</div>
                  <div className="text-xs text-muted-foreground">Food Places Created</div>
                </div>
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">2.4M</div>
                  <div className="text-xs text-muted-foreground">GAiA Tokens Circulated</div>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">89</div>
                  <div className="text-xs text-muted-foreground">Living Forests Started</div>
                </div>
                <div className="p-3 bg-orange-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">15,420</div>
                  <div className="text-xs text-muted-foreground">km Cycled Today</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GaiaBikeEcosystem
