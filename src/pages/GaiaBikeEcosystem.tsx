import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MapPin, 
  Bike, 
  Leaf, 
  Trophy, 
  Users, 
  Route,
  Play,
  Stop,
  Battery,
  Zap
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { BikeSession, FoodPlace } from '@/types/ui-types'
import { parseJsonField } from '@/types/ui-types'

export default function GaiaBikeEcosystem() {
  const [currentSession, setCurrentSession] = useState<BikeSession | null>(null)
  const [userStats, setUserStats] = useState({
    totalDistance: 0,
    totalTokens: 0,
    totalSessions: 0,
    carbonOffset: 0,
    rank: 0
  })
  const [nearbyPlaces, setNearbyPlaces] = useState<FoodPlace[]>([])
  const [isTracking, setIsTracking] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchUserStats = async () => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) return

      const { data: sessions, error } = await supabase
        .from('bike_sessions')
        .select('*')
        .eq('user_id', user.user.id)

      if (error) throw error

      if (sessions) {
        const totalDistance = sessions.reduce((sum, session) => sum + (session.distance || 0), 0)
        const totalTokens = sessions.reduce((sum, session) => sum + (session.tokens_earned || 0), 0)
        const carbonOffset = totalDistance * 0.2 // Approximate carbon offset
        
        setUserStats({
          totalDistance,
          totalTokens,
          totalSessions: sessions.length,
          carbonOffset,
          rank: Math.floor(totalTokens / 100) + 1
        })

        // Set current session if there's an active one
        const activeSession = sessions.find(session => !session.end_time)
        if (activeSession) {
          // Map database fields to BikeSession interface
          const mappedSession: BikeSession = {
            id: activeSession.id,
            user_id: activeSession.user_id,
            bike_type: activeSession.bike_type as 'gaia_bike' | 'regular_bike',
            start_time: activeSession.start_time,
            end_time: activeSession.end_time,
            distance: activeSession.distance,
            tokens_earned: activeSession.tokens_earned,
            start_location: parseJsonField(activeSession.route_data, { lat: 0, lng: 0 }),
            route_data: activeSession.route_data,
            status: 'active', // Default status since not in DB
            eco_impact: Math.floor(activeSession.distance * 0.2) // Calculate eco impact
          }
          setCurrentSession(mappedSession)
          setIsTracking(true)
        }
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
      toast.error('Failed to load user statistics')
    }
  }

  useEffect(() => {
    fetchUserStats()
    fetchNearbyPlaces()
  }, [])

  const startBikeSession = async (bikeType: 'gaia_bike' | 'regular_bike') => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) {
        toast.error('Please log in to start a bike session')
        return
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const startLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        const { data, error } = await supabase
          .from('bike_sessions')
          .insert({
            user_id: user.user.id,
            bike_type: bikeType,
            start_time: new Date().toISOString(),
            distance: 0,
            tokens_earned: 0,
            route_data: startLocation
          })
          .select()
          .single()

        if (error) throw error

        // Create BikeSession object with all required properties
        const newSession: BikeSession = {
          id: data.id,
          user_id: data.user_id,
          bike_type: data.bike_type as 'gaia_bike' | 'regular_bike',
          start_time: data.start_time,
          end_time: null,
          distance: 0,
          tokens_earned: 0,
          start_location: startLocation,
          route_data: startLocation,
          status: 'active',
          eco_impact: 0
        }

        setCurrentSession(newSession)
        setIsTracking(true)
        
        // Start tracking interval
        intervalRef.current = setInterval(updateSessionData, 10000) // Update every 10 seconds
        
        toast.success(`${bikeType === 'gaia_bike' ? 'GAiA' : 'Regular'} bike session started!`)
      }, (error) => {
        console.error('Geolocation error:', error)
        toast.error('Unable to get your location')
      })
    } catch (error) {
      console.error('Error starting bike session:', error)
      toast.error('Failed to start bike session')
    }
  }

  const endBikeSession = async () => {
    if (!currentSession) return

    try {
      const finalDistance = currentSession.distance + Math.random() * 2 // Simulate some final distance
      const tokensEarned = Math.floor(finalDistance * (currentSession.bike_type === 'gaia_bike' ? 10 : 5))

      const { error } = await supabase
        .from('bike_sessions')
        .update({
          end_time: new Date().toISOString(),
          distance: finalDistance,
          tokens_earned: tokensEarned
        })
        .eq('id', currentSession.id)

      if (error) throw error

      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      setCurrentSession(null)
      setIsTracking(false)
      
      // Award tokens for environmental impact
      await supabase
        .from('environmental_impact')
        .insert({
          user_id: currentSession.user_id,
          action_type: 'bike_ride',
          carbon_offset: finalDistance * 0.2,
          description: `${finalDistance.toFixed(2)}km bike ride with ${currentSession.bike_type}`
        })

      toast.success(`Session ended! Earned ${tokensEarned} GAiA tokens`)
      fetchUserStats() // Refresh stats
    } catch (error) {
      console.error('Error ending bike session:', error)
      toast.error('Failed to end bike session')
    }
  }

  const updateSessionData = () => {
    if (currentSession) {
      // Simulate distance increase
      const distanceIncrease = Math.random() * 0.1
      const updatedSession = {
        ...currentSession,
        distance: currentSession.distance + distanceIncrease,
        eco_impact: Math.floor((currentSession.distance + distanceIncrease) * 0.2)
      }
      setCurrentSession(updatedSession)
    }
  }

  const fetchNearbyPlaces = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { data, error } = await supabase
          .from('food_places')
          .select('*')
          .eq('is_active', true)
          .eq('tokens_accepted', true)
          .limit(10)

        if (error) throw error

        if (data) {
          // Map the data to FoodPlace interface with proper type handling
          const mappedPlaces: FoodPlace[] = data.map(place => ({
            id: place.id,
            name: place.name,
            description: place.description || '',
            location_data: {
              lat: 0, // Default values since we can't access the JSON structure
              lng: 0,
              address: '',
              accessibility_score: 0
            },
            food_types: place.food_types || [],
            tokens_accepted: place.tokens_accepted,
            is_active: place.is_active,
            verified: place.verified,
            owner_id: place.owner_id,
            forest_layer: place.forest_layer || 1,
            created_at: place.created_at,
            updated_at: place.updated_at
          }))

          setNearbyPlaces(mappedPlaces)
        }
      }, (error) => {
        console.error('Geolocation error:', error)
        // Fetch places without location filtering
        fetchPlacesWithoutLocation()
      })
    } catch (error) {
      console.error('Error fetching nearby places:', error)
      toast.error('Failed to load nearby places')
    }
  }

  const fetchPlacesWithoutLocation = async () => {
    try {
      const { data, error } = await supabase
        .from('food_places')
        .select('*')
        .eq('is_active', true)
        .eq('tokens_accepted', true)
        .limit(10)

      if (error) throw error

      if (data) {
        const mappedPlaces: FoodPlace[] = data.map(place => ({
          id: place.id,
          name: place.name,
          description: place.description || '',
          location_data: {
            lat: 0,
            lng: 0,
            address: '',
            accessibility_score: 0
          },
          food_types: place.food_types || [],
          tokens_accepted: place.tokens_accepted,
          is_active: place.is_active,
          verified: place.verified,
          owner_id: place.owner_id,
          forest_layer: place.forest_layer || 1,
          created_at: place.created_at,
          updated_at: place.updated_at
        }))

        setNearbyPlaces(mappedPlaces)
      }
    } catch (error) {
      console.error('Error fetching places:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🚴‍♀️ GAiA Bike Ecosystem
          </h1>
          <p className="text-xl text-green-300">Pedal for the Planet, Earn While You Ride</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-green-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Total Distance</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalDistance.toFixed(1)} km</p>
                </div>
                <Route className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/30 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">GAiA Tokens</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalTokens}</p>
                </div>
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Sessions</p>
                  <p className="text-2xl font-bold text-white">{userStats.totalSessions}</p>
                </div>
                <Bike className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-900/30 border-amber-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-300 text-sm">Carbon Offset</p>
                  <p className="text-2xl font-bold text-white">{userStats.carbonOffset.toFixed(1)} kg</p>
                </div>
                <Leaf className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Session */}
        {currentSession ? (
          <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Bike className="h-6 w-6" />
                Active Session - {currentSession.bike_type === 'gaia_bike' ? 'GAiA Bike' : 'Regular Bike'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-2xl font-bold text-green-400">{currentSession.distance.toFixed(2)} km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Eco Impact</p>
                  <p className="text-2xl font-bold text-blue-400">{currentSession.eco_impact} points</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {new Date().getTime() - new Date(currentSession.start_time).getTime() > 0 
                      ? Math.floor((new Date().getTime() - new Date(currentSession.start_time).getTime()) / 60000) 
                      : 0} min
                  </p>
                </div>
              </div>
              <Button 
                onClick={endBikeSession}
                className="bg-red-600 hover:bg-red-700"
              >
                <Stop className="h-4 w-4 mr-2" />
                End Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gray-900/30 border-gray-500/30">
            <CardHeader>
              <CardTitle className="text-white">Start Your Eco-Ride</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Choose your bike type and start earning GAiA tokens while helping the environment!
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => startBikeSession('gaia_bike')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start GAiA Bike (10 tokens/km)
                </Button>
                <Button 
                  onClick={() => startBikeSession('regular_bike')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Regular Bike (5 tokens/km)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Nearby Token-Accepting Places */}
        <Card className="bg-purple-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <MapPin className="h-6 w-6" />
              Nearby Token-Accepting Places
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyPlaces.map((place) => (
                <Card key={place.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-2">{place.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{place.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {place.food_types.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    {place.verified && (
                      <Badge className="bg-green-600">
                        ✓ Verified
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
