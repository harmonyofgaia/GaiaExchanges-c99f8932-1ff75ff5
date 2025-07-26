
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Bike, MapPin, Leaf, Coins, Users, TreePine } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { BikeSession, FoodPlace, parseJsonField } from '@/types/ui-types'
import { supabase } from '@/integrations/supabase/client'

interface UserStats {
  totalDistance: number
  tokensEarned: number
  carbonSaved: number
  ridesCompleted: number
}

interface UserRanking {
  rank: number
  username: string
  totalDistance: number
  tokensEarned: number
}

export default function GaiaBikeEcosystem() {
  const [currentSession, setCurrentSession] = useState<BikeSession | null>(null)
  const [userStats, setUserStats] = useState<UserStats>({
    totalDistance: 0,
    tokensEarned: 0,
    carbonSaved: 0,
    ridesCompleted: 0
  })
  const [foodPlaces, setFoodPlaces] = useState<FoodPlace[]>([])
  const [rankings, setRankings] = useState<UserRanking[]>([])
  const [isRiding, setIsRiding] = useState(false)
  const [loading, setLoading] = useState(true)

  // Define functions before useEffect calls them
  const fetchUserStats = async () => {
    try {
      // Mock user stats - in real app, fetch from user profile
      setUserStats({
        totalDistance: 245.7,
        tokensEarned: 1847,
        carbonSaved: 23.4,
        ridesCompleted: 42
      })
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  const fetchBikeSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('bike_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) {
        console.error('Error fetching bike sessions:', error)
        return
      }

      if (data && data.length > 0) {
        const session = data[0]
        const mappedSession: BikeSession = {
          id: session.id,
          user_id: session.user_id,
          bike_type: session.bike_type as 'gaia_bike' | 'regular_bike',
          start_time: session.start_time,
          end_time: session.end_time,
          distance: session.distance,
          tokens_earned: session.tokens_earned,
          start_location: parseJsonField(session.start_location, { lat: 0, lng: 0 }),
          route_data: session.route_data,
          status: session.status,
          eco_impact: session.eco_impact || 0
        }
        setCurrentSession(mappedSession)
      }
    } catch (error) {
      console.error('Error in fetchBikeSessions:', error)
    }
  }

  const fetchFoodPlaces = async () => {
    try {
      const { data, error } = await supabase
        .from('food_places')
        .select('*')
        .eq('tokens_accepted', true)
        .eq('is_active', true)
        .limit(10)

      if (error) {
        console.error('Error fetching food places:', error)
        return
      }

      const mappedPlaces: FoodPlace[] = data?.map(place => ({
        id: place.id,
        name: place.name,
        description: place.description,
        location_data: parseJsonField(place.location_data, {
          lat: 0,
          lng: 0,
          address: '',
          accessibility_score: 0
        }),
        food_types: place.food_types,
        tokens_accepted: place.tokens_accepted,
        is_active: place.is_active,
        verified: place.verified,
        owner_id: place.owner_id,
        forest_layer: place.forest_layer,
        created_at: place.created_at,
        updated_at: place.updated_at
      })) || []

      if (mappedPlaces.length === 0) {
        // Add mock data if no real data available
        const mockPlaces: FoodPlace[] = [
          {
            id: 'mock-1',
            name: 'Green Leaf Cafe',
            description: 'Organic and sustainable dining experience',
            location_data: {
              lat: 40.7128,
              lng: -74.0060,
              address: '123 Eco Street, New York',
              accessibility_score: 95
            },
            food_types: ['Organic', 'Vegan', 'Local'],
            tokens_accepted: true,
            is_active: true,
            verified: true,
            owner_id: 'owner-1',
            forest_layer: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
        setFoodPlaces(mockPlaces)
      } else {
        setFoodPlaces(mappedPlaces)
      }
    } catch (error) {
      console.error('Error in fetchFoodPlaces:', error)
    }
  }

  const fetchRankings = async () => {
    try {
      // Mock rankings data
      const mockRankings: UserRanking[] = [
        { rank: 1, username: 'EcoRider47', totalDistance: 892.3, tokensEarned: 4521 },
        { rank: 2, username: 'GreenCyclist', totalDistance: 756.8, tokensEarned: 3847 },
        { rank: 3, username: 'NatureNav', totalDistance: 634.2, tokensEarned: 3156 }
      ]
      setRankings(mockRankings)
    } catch (error) {
      console.error('Error fetching rankings:', error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([
        fetchUserStats(),
        fetchBikeSessions(),
        fetchFoodPlaces(),
        fetchRankings()
      ])
      setLoading(false)
    }
    
    loadData()
  }, [])

  const startBikeSession = async () => {
    try {
      const newSession = {
        user_id: 'current-user',
        bike_type: 'gaia_bike' as const,
        start_time: new Date().toISOString(),
        start_location: { lat: 40.7128, lng: -74.0060 },
        status: 'active'
      }

      const { data, error } = await supabase
        .from('bike_sessions')
        .insert([{
          ...newSession,
          start_location: JSON.stringify(newSession.start_location)
        }])
        .select()
        .single()

      if (error) {
        console.error('Error starting bike session:', error)
        return
      }

      // Create complete session object for local state
      const completeSession: BikeSession = {
        id: data.id,
        user_id: data.user_id,
        bike_type: data.bike_type as 'gaia_bike' | 'regular_bike',
        start_time: data.start_time,
        end_time: null,
        distance: 0,
        tokens_earned: 0,
        start_location: newSession.start_location,
        route_data: null,
        status: data.status,
        eco_impact: 0
      }

      setCurrentSession(completeSession)
      setIsRiding(true)
    } catch (error) {
      console.error('Error starting session:', error)
    }
  }

  const endBikeSession = async () => {
    if (!currentSession) return

    try {
      const distance = Math.random() * 15 + 2 // Mock distance 2-17 km
      const tokensEarned = Math.floor(distance * 5) // 5 tokens per km
      const ecoImpact = distance * 0.5 // Mock eco impact

      const { error } = await supabase
        .from('bike_sessions')
        .update({
          end_time: new Date().toISOString(),
          distance: distance,
          tokens_earned: tokensEarned,
          eco_impact: ecoImpact,
          status: 'completed'
        })
        .eq('id', currentSession.id)

      if (error) {
        console.error('Error ending bike session:', error)
        return
      }

      // Update user stats
      setUserStats(prev => ({
        totalDistance: prev.totalDistance + distance,
        tokensEarned: prev.tokensEarned + tokensEarned,
        carbonSaved: prev.carbonSaved + ecoImpact,
        ridesCompleted: prev.ridesCompleted + 1
      }))

      setIsRiding(false)
      setCurrentSession(null)
    } catch (error) {
      console.error('Error ending session:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl text-green-400">Loading GAiA Bike Ecosystem...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🚲 GAiA Bike Ecosystem
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Earn GAiA tokens while cycling and contributing to environmental sustainability
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-green-400">{userStats.totalDistance.toFixed(1)} km</div>
                  <div className="text-sm text-muted-foreground">Total Distance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Coins className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">{userStats.tokensEarned.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">GAiA Tokens</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Leaf className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-purple-400">{userStats.carbonSaved.toFixed(1)} kg</div>
                  <div className="text-sm text-muted-foreground">CO₂ Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Bike className="h-8 w-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{userStats.ridesCompleted}</div>
                  <div className="text-sm text-muted-foreground">Rides Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Session */}
        <Card className="mb-8 bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Bike className="h-6 w-6" />
              Current Ride Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isRiding ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-600">ACTIVE RIDE</Badge>
                  <span className="text-green-400">Earning tokens in real-time!</span>
                </div>
                <Button onClick={endBikeSession} className="bg-red-600 hover:bg-red-700">
                  End Ride Session
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">Start a new bike session to earn GAiA tokens while cycling</p>
                <Button onClick={startBikeSession} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Bike className="h-4 w-4 mr-2" />
                  Start New Ride
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Token-Accepting Food Places */}
        <Card className="mb-8 bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TreePine className="h-6 w-6" />
              Token-Accepting Food Places
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodPlaces.map((place) => (
                <Card key={place.id} className="border-green-500/20 bg-green-900/20">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">{place.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{place.description}</p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {place.food_types.map((type, index) => (
                          <Badge key={index} className="bg-green-600 text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span className="text-muted-foreground">{place.location_data.address}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-400 text-xs">✅ Accepts GAiA Tokens</span>
                        {place.verified && (
                          <Badge className="bg-blue-600 text-xs">Verified</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-6 w-6" />
              Community Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rankings.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={
                      user.rank === 1 ? 'bg-yellow-600' :
                      user.rank === 2 ? 'bg-gray-400' :
                      user.rank === 3 ? 'bg-orange-600' : 'bg-gray-600'
                    }>
                      #{user.rank}
                    </Badge>
                    <span className="font-medium text-white">{user.username}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">{user.tokensEarned.toLocaleString()} GAiA</div>
                    <div className="text-sm text-muted-foreground">{user.totalDistance.toFixed(1)} km</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
