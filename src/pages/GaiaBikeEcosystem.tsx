
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Bike, 
  Leaf, 
  Zap, 
  MapPin, 
  Trophy,
  Battery,
  Route,
  Timer,
  Target,
  Award,
  Play,
  Square
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { BikeSession } from '@/types/ui-types'
import { useEcoIntegration } from '@/services/ecoIntegration'

export default function GaiaBikeEcosystem() {
  const [isRiding, setIsRiding] = useState(false)
  const [currentSession, setCurrentSession] = useState<BikeSession | null>(null)
  const [totalDistance, setTotalDistance] = useState(127.5)
  const [totalTokens, setTotalTokens] = useState(3840)
  const [carbonSaved, setCarbonSaved] = useState(23.8)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [bikeSessions, setBikeSessions] = useState<BikeSession[]>([])
  
  const { userProfile, recordBikeActivity } = useEcoIntegration()

  useEffect(() => {
    console.log('🚴 GAIA BIKE ECOSYSTEM - SUSTAINABLE TRANSPORT REVOLUTION')
    console.log('🌱 ECO-FRIENDLY MOBILITY: UNLIMITED ENVIRONMENTAL IMPACT')
    
    // Load bike sessions
    loadBikeSessions()
    
    // Simulate battery and stats updates
    const updateInterval = setInterval(() => {
      if (isRiding) {
        setTotalDistance(prev => prev + 0.1)
        setTotalTokens(prev => prev + Math.floor(Math.random() * 5))
        setCarbonSaved(prev => prev + 0.02)
        setBatteryLevel(prev => Math.max(20, prev - 0.5))
      }
    }, 3000)

    return () => clearInterval(updateInterval)
  }, [isRiding])

  const loadBikeSessions = async () => {
    try {
      const { data: sessions, error } = await supabase
        .from('bike_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error

      if (sessions && sessions.length > 0) {
        // Transform the database data to match BikeSession interface
        const transformedSessions: BikeSession[] = sessions.map(session => ({
          id: session.id,
          user_id: session.user_id,
          bike_type: (session.bike_type === 'gaia_bike' || session.bike_type === 'regular_bike') 
            ? session.bike_type 
            : 'gaia_bike' as const,
          start_time: session.start_time,
          end_time: session.end_time,
          distance: session.distance,
          tokens_earned: session.tokens_earned,
          start_location: session.route_data ? 
            (typeof session.route_data === 'object' && session.route_data !== null && 'lat' in session.route_data && 'lng' in session.route_data ? 
              { lat: (session.route_data as any).lat, lng: (session.route_data as any).lng } : 
              { lat: 0, lng: 0 }) : 
            { lat: 0, lng: 0 },
          route_data: session.route_data,
          status: 'completed',
          eco_impact: 2.3
        }))

        setBikeSessions(transformedSessions)
        
        // Set current session if there's an active one
        const activeSession = transformedSessions.find(session => session.status === 'active')
        if (activeSession) {
          setCurrentSession(activeSession)
          setIsRiding(true)
        }
      }
    } catch (error) {
      console.error('Error loading bike sessions:', error)
    }
  }

  const startRide = async () => {
    try {
      setIsRiding(true)
      
      // Create new session with proper typing
      const newSession: BikeSession = {
        id: `session-${Date.now()}`,
        user_id: 'current-user',
        bike_type: 'gaia_bike' as const,
        start_time: new Date().toISOString(),
        end_time: null,
        distance: 0,
        tokens_earned: 0,
        start_location: { lat: 40.7128, lng: -74.0060 },
        route_data: {
          start_location: { lat: 40.7128, lng: -74.0060 }
        },
        status: 'active',
        eco_impact: 0
      }

      setCurrentSession(newSession)
      
      toast.success('🚴 Ride Started!', {
        description: 'GAIA Bike activated - earning eco-tokens and saving carbon!',
        duration: 4000
      })
    } catch (error) {
      console.error('Error starting ride:', error)
      toast.error('Failed to start ride')
    }
  }

  const endRide = async () => {
    if (!currentSession) return

    try {
      setIsRiding(false)
      
      const rideDistance = Math.random() * 15 + 5 // 5-20km
      const rideTokens = Math.floor(rideDistance * 15)
      const rideCarbonSaved = rideDistance * 0.184

      // Update session with proper typing
      const completedSession: BikeSession = {
        ...currentSession,
        end_time: new Date().toISOString(),
        distance: rideDistance,
        tokens_earned: rideTokens,
        status: 'completed',
        eco_impact: rideCarbonSaved
      }

      setCurrentSession(completedSession)
      setBikeSessions(prev => [completedSession, ...prev])
      
      // Update totals
      setTotalDistance(prev => prev + rideDistance)
      setTotalTokens(prev => prev + rideTokens)
      setCarbonSaved(prev => prev + rideCarbonSaved)
      
      // Record in eco integration system
      recordBikeActivity(rideDistance, 45) // Assume 45 minutes average
      
      toast.success('🎉 Ride Completed!', {
        description: `Earned ${rideTokens} GAIA tokens and saved ${rideCarbonSaved.toFixed(2)}kg CO2!`,
        duration: 6000
      })
    } catch (error) {
      console.error('Error ending ride:', error)
      toast.error('Failed to end ride')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            🚴 GAIA BIKE ECOSYSTEM
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Revolutionizing sustainable transport with blockchain rewards
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Badge className="bg-green-600">DISTANCE: {totalDistance.toFixed(1)}km</Badge>
            <Badge className="bg-blue-600">TOKENS: {totalTokens.toLocaleString()}</Badge>
            <Badge className="bg-emerald-600">CO2 SAVED: {carbonSaved.toFixed(1)}kg</Badge>
            <Badge className={`${batteryLevel > 50 ? 'bg-green-600' : 'bg-orange-600'}`}>
              BATTERY: {batteryLevel}%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="ride" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ride">🚴 Active Ride</TabsTrigger>
          <TabsTrigger value="stats">📊 Statistics</TabsTrigger>
          <TabsTrigger value="history">📚 History</TabsTrigger>
          <TabsTrigger value="rewards">🏆 Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="ride" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Bike className="h-6 w-6" />
                  GAIA Bike Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Battery Level</span>
                  <span className="font-bold">{batteryLevel}%</span>
                </div>
                <Progress value={batteryLevel} className="w-full" />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <Badge className={isRiding ? 'bg-green-600' : 'bg-gray-600'}>
                      {isRiding ? 'RIDING' : 'PARKED'}
                    </Badge>
                  </div>
                  
                  {currentSession && (
                    <>
                      <div className="flex items-center justify-between">
                        <span>Current Distance:</span>
                        <span className="font-bold">{currentSession.distance.toFixed(1)}km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tokens Earned:</span>
                        <span className="font-bold">{currentSession.tokens_earned}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  {!isRiding ? (
                    <Button onClick={startRide} className="w-full bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      START RIDE
                    </Button>
                  ) : (
                    <Button onClick={endRide} className="w-full bg-red-600 hover:bg-red-700">
                      <Square className="h-4 w-4 mr-2" />
                      END RIDE
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Live Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-center text-blue-300">
                    {isRiding ? (
                      <div className="space-y-2">
                        <div className="animate-pulse text-lg">🗺️ TRACKING ACTIVE</div>
                        <div>Route optimization enabled</div>
                        <div>Real-time carbon impact calculation</div>
                      </div>
                    ) : (
                      <div>Start a ride to enable live tracking</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/30 bg-emerald-900/20">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2">
                  <Leaf className="h-6 w-6" />
                  Eco Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="text-emerald-300 text-sm space-y-1">
                      <div>🌱 Trees Equivalent: {Math.floor(carbonSaved / 0.5)}</div>
                      <div>🏭 Carbon Offset: {carbonSaved.toFixed(1)}kg CO2</div>
                      <div>⚡ Energy Saved: {(totalDistance * 0.15).toFixed(1)}kWh</div>
                      <div>🏃 Calories Burned: {Math.floor(totalDistance * 45)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardContent className="p-4 text-center">
                <Route className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="text-2xl font-bold text-green-400">{totalDistance.toFixed(0)}km</div>
                <div className="text-sm text-muted-foreground">Total Distance</div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-400">{totalTokens.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">GAIA Tokens</div>
              </CardContent>
            </Card>
            
            <Card className="border-emerald-500/30 bg-emerald-900/20">
              <CardContent className="p-4 text-center">
                <Leaf className="h-8 w-8 mx-auto text-emerald-400 mb-2" />
                <div className="text-2xl font-bold text-emerald-400">{carbonSaved.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">kg CO2 Saved</div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <div className="text-2xl font-bold text-purple-400">{userProfile.greenLevel}</div>
                <div className="text-sm text-muted-foreground">Eco Level</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">Recent Bike Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {bikeSessions.length > 0 ? (
                <div className="space-y-4">
                  {bikeSessions.map((session) => (
                    <div key={session.id} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bike className="h-4 w-4 text-blue-400" />
                          <span className="font-semibold text-blue-300">
                            {session.bike_type === 'gaia_bike' ? '🚴 GAIA Bike' : '🚲 Regular Bike'}
                          </span>
                        </div>
                        <Badge className="bg-green-600 text-xs">
                          {session.distance.toFixed(1)}km
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-300">
                        <div>
                          <Timer className="h-3 w-3 inline mr-1" />
                          {new Date(session.start_time).toLocaleDateString()}
                        </div>
                        <div>
                          <Zap className="h-3 w-3 inline mr-1" />
                          {session.tokens_earned} tokens
                        </div>
                        <div>
                          <Leaf className="h-3 w-3 inline mr-1" />
                          {session.eco_impact.toFixed(2)}kg CO2
                        </div>
                        <div>
                          <Target className="h-3 w-3 inline mr-1" />
                          {session.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No bike sessions recorded yet. Start your first ride!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  Daily Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-300">Ride 10km today</span>
                    <Badge className="bg-yellow-600">500 tokens</Badge>
                  </div>
                  <Progress value={65} className="w-full" />
                  <div className="text-xs text-yellow-400 mt-1">6.5km / 10km</div>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-300">Save 2kg CO2</span>
                    <Badge className="bg-yellow-600">300 tokens</Badge>
                  </div>
                  <Progress value={80} className="w-full" />
                  <div className="text-xs text-yellow-400 mt-1">1.6kg / 2kg</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProfile.badges.slice(0, 3).map((badge) => (
                    <div key={badge.id} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{badge.iconUrl}</span>
                          <div>
                            <div className="font-semibold text-purple-300">{badge.name}</div>
                            <div className="text-xs text-purple-400">{badge.description}</div>
                          </div>
                        </div>
                        {badge.earned && (
                          <Badge className="bg-purple-600 text-xs">Earned</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
