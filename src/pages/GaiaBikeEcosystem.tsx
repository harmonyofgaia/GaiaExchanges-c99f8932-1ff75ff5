import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Bike, 
  MapPin, 
  Leaf, 
  Coins, 
  Play, 
  Square,
  Trophy,
  Users,
  Timer,
  Route,
  Zap
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface LocationData {
  lat: number
  lng: number
  address: string
  accessibility_score: number
}

interface EcoImpact {
  carbon_offset: number
  calories_burned: number
}

interface RouteData {
  start_location: LocationData
  end_location: LocationData
  eco_impact: EcoImpact
}

interface BikeSession {
  id: string
  user_id: string
  bike_type: 'gaia_bike' | 'regular_bike'
  start_time: string
  end_time?: string
  distance: number
  tokens_earned: number
  route_data: any
  status: string
  start_location?: { lat: number; lng: number }
  eco_impact?: {
    carbon_offset: number
    calories_burned: number
  }
}

interface UserStats {
  total_distance: number
  total_tokens: number
  total_sessions: number
  carbon_offset: number
}

interface BikeStation {
  id: string
  name: string
  location: {
    lat: number
    lng: number
    address: string
    accessibility_score: number
  }
  available_bikes: number
  bike_types: string[]
  status: 'active' | 'maintenance' | 'offline'
}

interface FoodPlace {
  id: string
  name: string
  description: string
  location_data: {
    lat: number
    lng: number
    address: string
    accessibility_score: number
  }
  food_types: string[]
  tokens_accepted: boolean
  verified: boolean
  forest_layer?: number
}

const GaiaBikeEcosystem = () => {
  const [currentSession, setCurrentSession] = useState<BikeSession | null>(null)
  const [userStats, setUserStats] = useState<UserStats>({
    total_distance: 0,
    total_tokens: 0,
    total_sessions: 0,
    carbon_offset: 0
  })
  const [nearbyStations, setNearbyStations] = useState<BikeStation[]>([])
  const [foodPlaces, setFoodPlaces] = useState<FoodPlace[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUserStats = async () => {
    try {
      const { data: sessions, error } = await supabase
        .from('bike_sessions')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)

      if (error) throw error

      if (sessions) {
        const stats = sessions.reduce((acc, session) => {
          return {
            total_distance: acc.total_distance + (session.distance || 0),
            total_tokens: acc.total_tokens + (session.tokens_earned || 0),
            total_sessions: acc.total_sessions + 1,
            carbon_offset: acc.carbon_offset + ((session.route_data as any)?.eco_impact?.carbon_offset || 0)
          }
        }, { total_distance: 0, total_tokens: 0, total_sessions: 0, carbon_offset: 0 })
        
        setUserStats(stats)

        // Check for active session
        const activeSession = sessions.find(s => !s.end_time)
        if (activeSession) {
          setCurrentSession({
            ...activeSession,
            start_location: (activeSession.route_data as any)?.start_location || { lat: 0, lng: 0 },
            status: activeSession.end_time ? 'completed' : 'active',
            eco_impact: (activeSession.route_data as any)?.eco_impact || { carbon_offset: 0, calories_burned: 0 }
          })
        }
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
      toast.error('Failed to load bike statistics')
    }
  }

  useEffect(() => {
    fetchUserStats()
    fetchNearbyStations()
    fetchFoodPlaces()
  }, [])

  const fetchNearbyStations = async () => {
    // Mock data for bike stations since we don't have a table for it
    const mockStations: BikeStation[] = [
      {
        id: '1',
        name: 'Central Park Station',
        location: {
          lat: 40.7829,
          lng: -73.9654,
          address: 'Central Park, NYC',
          accessibility_score: 9
        },
        available_bikes: 12,
        bike_types: ['gaia_bike', 'regular_bike'],
        status: 'active'
      },
      {
        id: '2', 
        name: 'Brooklyn Bridge Station',
        location: {
          lat: 40.7061,
          lng: -73.9969,
          address: 'Brooklyn Bridge, NYC',
          accessibility_score: 8
        },
        available_bikes: 8,
        bike_types: ['regular_bike'],
        status: 'active'
      }
    ]
    
    setNearbyStations(mockStations)
  }

  const fetchFoodPlaces = async () => {
    try {
      const { data, error } = await supabase
        .from('food_places')
        .select('*')
        .eq('is_active', true)
        .eq('tokens_accepted', true)

      if (error) throw error

      if (data) {
        const formattedPlaces: FoodPlace[] = data.map(place => ({
          ...place,
          location_data: place.location_data as FoodPlace['location_data']
        }))
        setFoodPlaces(formattedPlaces)
      }
    } catch (error) {
      console.error('Error fetching food places:', error)
    }
  }

  const startBikeSession = async (bikeType: 'gaia_bike' | 'regular_bike') => {
    if (currentSession && !currentSession.end_time) {
      toast.error('You already have an active bike session!')
      return
    }

    setIsLoading(true)
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error('User not authenticated')

      // Get current location (mock for now)
      const startLocation = { lat: 40.7829, lng: -73.9654 }
      
      const newSession = {
        user_id: user.id,
        bike_type: bikeType,
        start_time: new Date().toISOString(),
        start_location: startLocation,
        status: 'active',
        id: crypto.randomUUID()
      }

      const { data, error } = await supabase
        .from('bike_sessions')
        .insert([{
          user_id: newSession.user_id,
          bike_type: newSession.bike_type,
          start_time: newSession.start_time,
          route_data: { start_location: startLocation },
          distance: 0,
          tokens_earned: 0
        }])
        .select()
        .single()

      if (error) throw error

      setCurrentSession({
        ...data,
        status: 'active',
        start_location: startLocation,
        eco_impact: { carbon_offset: 0, calories_burned: 0 }
      })
      
      toast.success('Bike session started! Happy riding! 🚴‍♂️')
    } catch (error) {
      console.error('Error starting bike session:', error)
      toast.error('Failed to start bike session')
    } finally {
      setIsLoading(false)
    }
  }

  const endBikeSession = async () => {
    if (!currentSession) return

    setIsLoading(true)
    try {
      const endTime = new Date().toISOString()
      const mockDistance = Math.random() * 10 + 2 // 2-12 km
      const tokensEarned = Math.floor(mockDistance * 10) // 10 tokens per km
      const carbonOffset = mockDistance * 0.21 // kg CO2 saved per km

      const { error } = await supabase
        .from('bike_sessions')
        .update({
          end_time: endTime,
          distance: mockDistance,
          tokens_earned: tokensEarned,
          route_data: {
            ...currentSession.route_data,
            end_location: { lat: 40.7829, lng: -73.9654 },
            eco_impact: { carbon_offset: carbonOffset, calories_burned: mockDistance * 50 }
          }
        })
        .eq('id', currentSession.id)

      if (error) throw error

      setCurrentSession(null)
      await fetchUserStats() // Refresh stats
      
      toast.success(`Session completed! You earned ${tokensEarned} GAIA tokens and saved ${carbonOffset.toFixed(2)} kg CO2! 🌱`)
    } catch (error) {
      console.error('Error ending bike session:', error)
      toast.error('Failed to end bike session')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-cyan-900/20 p-6">
      
      
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            🚴‍♂️ GAIA BIKE ECOSYSTEM
          </h1>
          <p className="text-xl text-muted-foreground">
            Ride Green • Earn Tokens • Save the Planet
          </p>
        </div>

        {/* User Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-green-400 text-sm">
                <Route className="h-4 w-4" />
                Total Distance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-300">
                {userStats.total_distance.toFixed(1)} km
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-cyan-400 text-sm">
                <Coins className="h-4 w-4" />
                GAIA Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-300">
                {userStats.total_tokens.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-indigo-900/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-blue-400 text-sm">
                <Timer className="h-4 w-4" />
                Total Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-300">
                {userStats.total_sessions}
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-green-900/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-emerald-400 text-sm">
                <Leaf className="h-4 w-4" />
                CO₂ Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-300">
                {userStats.carbon_offset.toFixed(1)} kg
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Session or Start Options */}
        {currentSession && currentSession.status === 'active' ? (
          <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Zap className="h-5 w-5 animate-pulse" />
                Active Ride Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold capitalize">
                    {currentSession.bike_type.replace('_', ' ')} Session
                  </p>
                  <p className="text-muted-foreground">
                    Started: {new Date(currentSession.start_time).toLocaleTimeString()}
                  </p>
                </div>
                <Badge className="bg-green-600 text-white animate-pulse">
                  ACTIVE
                </Badge>
              </div>
              
              <Button 
                onClick={endBikeSession}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                <Square className="h-4 w-4 mr-2" />
                End Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-cyan-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Bike className="h-5 w-5" />
                Start Your Eco Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => startBikeSession('gaia_bike')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6"
                  size="lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start GAIA Bike (+50% Tokens)
                </Button>
                
                <Button 
                  onClick={() => startBikeSession('regular_bike')}
                  disabled={isLoading}
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/20 p-6"
                  size="lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Regular Bike
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Nearby Bike Stations */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <MapPin className="h-5 w-5" />
              Nearby Bike Stations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyStations.map((station) => (
                <div key={station.id} className="p-4 border border-blue-500/20 rounded-lg bg-blue-900/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-blue-300">{station.name}</h3>
                    <Badge variant={station.status === 'active' ? 'default' : 'secondary'}>
                      {station.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {station.location.address}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-400">
                      {station.available_bikes} bikes available
                    </span>
                    <div className="flex gap-1">
                      {station.bike_types.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Token-Accepting Food Places */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Users className="h-5 w-5" />
              GAIA Token Accepted Here
            </CardTitle>
          </CardHeader>
          <CardContent>
            {foodPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {foodPlaces.map((place) => (
                  <div key={place.id} className="p-4 border border-purple-500/20 rounded-lg bg-purple-900/20">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-purple-300">{place.name}</h3>
                      {place.verified && (
                        <Badge className="bg-green-600 text-white text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {place.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {place.food_types.slice(0, 2).map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <Badge className="bg-cyan-600 text-white text-xs">
                        GAIA Tokens
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No token-accepting food places found in your area yet. 
                <br />
                Help us grow the ecosystem! 🌱
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GaiaBikeEcosystem
