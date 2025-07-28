
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Bike, MapPin, Leaf, Trophy, Users, Zap, Globe, Star, Target, Award } from 'lucide-react'

interface BikeStation {
  id: string
  name: string
  location: string
  availableBikes: number
  totalSlots: number
  energyGenerated: number
  carbonOffset: number
  status: 'active' | 'maintenance' | 'offline'
}

interface UserStats {
  totalRides: number
  distanceTraveled: number
  energyGenerated: number
  carbonSaved: number
  tokensEarned: number
  level: number
  achievements: string[]
}

export default function GaiaBikeEcosystem() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const bikeStations: BikeStation[] = [
    {
      id: '1',
      name: 'Green Plaza Hub',
      location: 'Downtown Environmental District',
      availableBikes: 8,
      totalSlots: 12,
      energyGenerated: 245.7,
      carbonOffset: 89.3,
      status: 'active'
    },
    {
      id: '2',
      name: 'Eco Park Station',
      location: 'Central Park North',
      availableBikes: 15,
      totalSlots: 20,
      energyGenerated: 412.8,
      carbonOffset: 156.4,
      status: 'active'
    },
    {
      id: '3',
      name: 'Solar Bridge Point',
      location: 'University Campus',
      availableBikes: 3,
      totalSlots: 16,
      energyGenerated: 678.2,
      carbonOffset: 234.1,
      status: 'maintenance'
    },
    {
      id: '4',
      name: 'Wind Valley Terminal',
      location: 'Renewable Energy Park',
      availableBikes: 22,
      totalSlots: 25,
      energyGenerated: 891.5,
      carbonOffset: 312.7,
      status: 'active'
    }
  ]

  const userStats: UserStats = {
    totalRides: 89,
    distanceTraveled: 234.7,
    energyGenerated: 156.3,
    carbonSaved: 78.9,
    tokensEarned: 1247,
    level: 7,
    achievements: ['Eco Warrior', 'Green Commuter', 'Energy Producer', 'Carbon Saver']
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'maintenance': return 'text-yellow-400'
      case 'offline': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'maintenance': return 'secondary'
      case 'offline': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
            🚴‍♂️ GAIA Bike Ecosystem
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Sustainable Transportation • Energy Generation • Carbon Offsetting
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-green-500/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600/20">
              <Globe className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="stations" className="data-[state=active]:bg-blue-600/20">
              <MapPin className="w-4 h-4 mr-2" />
              Stations
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600/20">
              <Users className="w-4 h-4 mr-2" />
              My Profile
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-yellow-600/20">
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-900/30 to-black/50 border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Bike className="w-5 h-5" />
                    Total Stations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">{bikeStations.length}</div>
                  <p className="text-green-300 text-sm">Active network nodes</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/30 to-black/50 border-blue-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Energy Generated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">2,228 kWh</div>
                  <p className="text-blue-300 text-sm">Clean energy produced</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-black/50 border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Carbon Offset
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">871 kg</div>
                  <p className="text-purple-300 text-sm">CO₂ emissions prevented</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/30 to-black/50 border-yellow-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Active Riders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">1,847</div>
                  <p className="text-yellow-300 text-sm">Community members</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-400" />
                  Ecosystem Map & Real-time Status
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Live view of all GAIA bike stations and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bikeStations.map((station) => (
                    <div 
                      key={station.id} 
                      className="p-4 rounded-lg bg-gray-800/30 border border-gray-600/30 hover:border-green-500/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedStation(station.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white">{station.name}</h3>
                        <Badge variant={getStatusBadgeVariant(station.status)} className="text-xs">
                          {station.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{station.location}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Available Bikes</span>
                          <span className="text-green-400 font-medium">
                            {station.availableBikes}/{station.totalSlots}
                          </span>
                        </div>
                        <Progress 
                          value={(station.availableBikes / station.totalSlots) * 100} 
                          className="h-2 bg-gray-700"
                        />
                        
                        <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                          <div>
                            <span className="text-gray-400">Energy:</span>
                            <span className="text-blue-400 ml-1">{station.energyGenerated} kWh</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Carbon:</span>
                            <span className="text-green-400 ml-1">{station.carbonOffset} kg</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stations" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-500/30">
              <CardHeader>
                <CardTitle className="text-white">Station Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Detailed view and control of all bike stations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bikeStations.map((station) => (
                    <div 
                      key={station.id}
                      className="p-6 rounded-lg bg-gray-800/30 border border-gray-600/30"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{station.name}</h3>
                          <p className="text-gray-400">{station.location}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusBadgeVariant(station.status)} className="mb-2">
                            {station.status.toUpperCase()}
                          </Badge>
                          <p className={`text-sm font-medium ${getStatusColor(station.status)}`}>
                            {station.status === 'active' ? 'Operational' : 
                             station.status === 'maintenance' ? 'Under Maintenance' : 'Offline'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                          <div className="text-2xl font-bold text-green-400">{station.availableBikes}</div>
                          <div className="text-xs text-green-300">Available Bikes</div>
                        </div>
                        <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                          <div className="text-2xl font-bold text-blue-400">{station.totalSlots}</div>
                          <div className="text-xs text-blue-300">Total Slots</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
                          <div className="text-2xl font-bold text-yellow-400">{station.energyGenerated}</div>
                          <div className="text-xs text-yellow-300">kWh Generated</div>
                        </div>
                        <div className="text-center p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                          <div className="text-2xl font-bold text-purple-400">{station.carbonOffset}</div>
                          <div className="text-xs text-purple-300">kg CO₂ Offset</div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                          <MapPin className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                          <Zap className="w-4 h-4 mr-2" />
                          Energy Stats
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-400" />
                    Rider Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">Level {userStats.level}</div>
                    <p className="text-gray-400">Eco Cycling Champion</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Rides</span>
                      <span className="text-white font-semibold">{userStats.totalRides}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Distance Traveled</span>
                      <span className="text-blue-400 font-semibold">{userStats.distanceTraveled} km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Energy Generated</span>
                      <span className="text-yellow-400 font-semibold">{userStats.energyGenerated} kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Carbon Saved</span>
                      <span className="text-green-400 font-semibold">{userStats.carbonSaved} kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">GAIA Tokens Earned</span>
                      <span className="text-purple-400 font-semibold">{userStats.tokensEarned} GAT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {userStats.achievements.map((achievement, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gray-800/30 border border-gray-600/30 text-center">
                        <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm text-white font-medium">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-gold-400" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Top performers in the GAIA Bike Ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: 'EcoRider23', distance: 1247.8, tokens: 8934, level: 12 },
                    { rank: 2, name: 'GreenCommuter', distance: 1156.4, tokens: 8234, level: 11 },
                    { rank: 3, name: 'BikeWarrior', distance: 1089.2, tokens: 7823, level: 10 },
                    { rank: 4, name: 'SustainableSarah', distance: 967.5, tokens: 6945, level: 9 },
                    { rank: 5, name: 'CarbonCrusher', distance: 834.7, tokens: 5978, level: 8 },
                  ].map((rider) => (
                    <div key={rider.rank} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-600/30">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          rider.rank === 1 ? 'bg-yellow-500 text-black' :
                          rider.rank === 2 ? 'bg-gray-400 text-black' :
                          rider.rank === 3 ? 'bg-amber-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {rider.rank}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{rider.name}</h3>
                          <p className="text-gray-400 text-sm">Level {rider.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 font-semibold">{rider.distance} km</div>
                        <div className="text-purple-400 text-sm">{rider.tokens} GAT</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
