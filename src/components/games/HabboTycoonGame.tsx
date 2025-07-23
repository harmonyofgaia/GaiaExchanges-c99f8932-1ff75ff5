import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Building2, Users, Zap, Droplets, TreePine, Coins, Trophy, Star, Home, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HotelStats {
  guests: number
  satisfaction: number
  ecoScore: number
  revenue: number
  energyUsage: number
  waterUsage: number
  wasteReduction: number
  level: number
  experience: number
}

interface Room {
  id: string
  type: string
  ecoRating: number
  occupancy: number
  maxCapacity: number
  revenue: number
  features: string[]
}

interface EcoChallenge {
  id: string
  title: string
  description: string
  reward: number
  progress: number
  target: number
  completed: boolean
}

export function HabboTycoonGame() {
  const [hotelStats, setHotelStats] = useState<HotelStats>({
    guests: 45,
    satisfaction: 78,
    ecoScore: 85,
    revenue: 12500,
    energyUsage: 65,
    waterUsage: 42,
    wasteReduction: 73,
    level: 8,
    experience: 1250
  })

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'R001',
      type: 'Eco Solar Suite',
      ecoRating: 95,
      occupancy: 4,
      maxCapacity: 4,
      revenue: 150,
      features: ['Solar Power', 'Recycled Materials', 'Rain Water System']
    },
    {
      id: 'R002',
      type: 'Green Garden Room',
      ecoRating: 88,
      occupancy: 2,
      maxCapacity: 3,
      revenue: 120,
      features: ['Indoor Plants', 'Natural Light', 'Eco Furniture']
    },
    {
      id: 'R003',
      type: 'Wind Energy Loft',
      ecoRating: 92,
      occupancy: 3,
      maxCapacity: 4,
      revenue: 140,
      features: ['Wind Power', 'Smart Thermostat', 'LED Lighting']
    },
    {
      id: 'R004',
      type: 'Standard Room',
      ecoRating: 45,
      occupancy: 1,
      maxCapacity: 2,
      revenue: 80,
      features: ['Basic Amenities']
    }
  ])

  const [ecoChallenges, setEcoChallenges] = useState<EcoChallenge[]>([
    {
      id: 'EC001',
      title: 'Solar Panel Installation',
      description: 'Install solar panels on 5 rooms to reduce energy costs',
      reward: 500,
      progress: 3,
      target: 5,
      completed: false
    },
    {
      id: 'EC002',
      title: 'Guest Satisfaction Hero',
      description: 'Achieve 90% guest satisfaction with eco-friendly practices',
      reward: 750,
      progress: 78,
      target: 90,
      completed: false
    },
    {
      id: 'EC003',
      title: 'Waste Reduction Master',
      description: 'Reduce hotel waste by 80% through recycling programs',
      reward: 300,
      progress: 73,
      target: 80,
      completed: false
    },
    {
      id: 'EC004',
      title: 'Green Building Certified',
      description: 'Achieve an overall eco-score of 95 for your hotel',
      reward: 1000,
      progress: 85,
      target: 95,
      completed: false
    }
  ])

  const [selectedTab, setSelectedTab] = useState('overview')
  const [gameTime, setGameTime] = useState(0)

  useEffect(() => {
    // Simulate real-time game updates
    const gameInterval = setInterval(() => {
      setGameTime(prev => prev + 1)
      
      // Update hotel stats periodically
      if (gameTime % 10 === 0) {
        setHotelStats(prev => ({
          ...prev,
          guests: Math.max(0, prev.guests + Math.floor(Math.random() * 6) - 2),
          satisfaction: Math.min(100, Math.max(0, prev.satisfaction + Math.floor(Math.random() * 4) - 1)),
          revenue: prev.revenue + Math.floor(Math.random() * 100),
          experience: prev.experience + 5
        }))
      }
    }, 1000)

    return () => clearInterval(gameInterval)
  }, [gameTime])

  const upgradeRoom = (roomId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, ecoRating: Math.min(100, room.ecoRating + 10), revenue: room.revenue + 20 }
        : room
    ))
    
    setHotelStats(prev => ({
      ...prev,
      ecoScore: Math.min(100, prev.ecoScore + 2),
      revenue: prev.revenue - 200 // Upgrade cost
    }))
  }

  const completeChallenge = (challengeId: string) => {
    setEcoChallenges(prev => prev.map(challenge =>
      challenge.id === challengeId
        ? { ...challenge, completed: true, progress: challenge.target }
        : challenge
    ))
    
    const challenge = ecoChallenges.find(c => c.id === challengeId)
    if (challenge) {
      setHotelStats(prev => ({
        ...prev,
        revenue: prev.revenue + challenge.reward,
        experience: prev.experience + challenge.reward / 2
      }))
    }
  }

  const getEcoRatingColor = (rating: number) => {
    if (rating >= 90) return 'text-green-400'
    if (rating >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getEcoRatingBadge = (rating: number) => {
    if (rating >= 90) return 'bg-green-600'
    if (rating >= 70) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-emerald-900/20 p-6">
      <div className="container mx-auto space-y-6">
        {/* Game Header */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              🏨 HABBO TYCOON - Environmental Hotel Management
            </CardTitle>
            <p className="text-center text-lg text-green-300">
              Build • Manage • Sustain • Level {hotelStats.level} Hotel Manager
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-900/30 p-3 rounded-lg border border-green-500/30 text-center">
                <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-200">{hotelStats.guests}</div>
                <div className="text-sm text-green-300">Active Guests</div>
              </div>
              
              <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30 text-center">
                <Star className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-200">{hotelStats.satisfaction}%</div>
                <div className="text-sm text-blue-300">Satisfaction</div>
              </div>
              
              <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/30 text-center">
                <TreePine className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-emerald-200">{hotelStats.ecoScore}%</div>
                <div className="text-sm text-emerald-300">Eco Score</div>
              </div>
              
              <div className="bg-yellow-900/30 p-3 rounded-lg border border-yellow-500/30 text-center">
                <Coins className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-yellow-200">${hotelStats.revenue}</div>
                <div className="text-sm text-yellow-300">Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Navigation */}
        <div className="flex justify-center gap-2">
          {[
            { id: 'overview', name: 'Overview', icon: Home },
            { id: 'rooms', name: 'Rooms', icon: Building2 },
            { id: 'challenges', name: 'Eco Challenges', icon: Trophy },
            { id: 'sustainability', name: 'Sustainability', icon: TreePine },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "outline"}
              onClick={() => setSelectedTab(tab.id)}
              className={selectedTab === tab.id ? 
                "bg-green-600 text-white" : 
                "border-green-500/30 text-green-300"
              }
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </Button>
          ))}
        </div>

        {/* Game Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-300">Hotel Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-300">Guest Satisfaction</span>
                    <span className="text-blue-200">{hotelStats.satisfaction}%</span>
                  </div>
                  <Progress value={hotelStats.satisfaction} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-300">Environmental Score</span>
                    <span className="text-green-200">{hotelStats.ecoScore}%</span>
                  </div>
                  <Progress value={hotelStats.ecoScore} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-300">Experience Progress</span>
                    <span className="text-purple-200">{hotelStats.experience}/2000 XP</span>
                  </div>
                  <Progress value={(hotelStats.experience / 2000) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-300">Sustainability Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-900/30 p-3 rounded border border-yellow-500/30">
                    <div className="flex items-center gap-2 text-yellow-300 mb-1">
                      <Zap className="h-4 w-4" />
                      Energy Usage
                    </div>
                    <div className="text-lg font-bold text-yellow-200">{hotelStats.energyUsage}%</div>
                  </div>
                  
                  <div className="bg-blue-900/30 p-3 rounded border border-blue-500/30">
                    <div className="flex items-center gap-2 text-blue-300 mb-1">
                      <Droplets className="h-4 w-4" />
                      Water Usage
                    </div>
                    <div className="text-lg font-bold text-blue-200">{hotelStats.waterUsage}%</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-300">Waste Reduction</span>
                    <span className="text-green-200">{hotelStats.wasteReduction}%</span>
                  </div>
                  <Progress value={hotelStats.wasteReduction} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'rooms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <Card key={room.id} className="border-green-500/30 bg-green-900/20 hover:bg-green-900/30 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-300 text-lg">{room.type}</CardTitle>
                    <Badge className={getEcoRatingBadge(room.ecoRating)}>
                      Eco: {room.ecoRating}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-green-300">Occupancy:</div>
                      <div className="text-green-200 font-bold">{room.occupancy}/{room.maxCapacity}</div>
                    </div>
                    <div>
                      <div className="text-yellow-300">Revenue:</div>
                      <div className="text-yellow-200 font-bold">${room.revenue}/day</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-green-300 text-sm mb-2">Eco Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {room.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-green-500/30 text-green-400">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => upgradeRoom(room.id)}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={hotelStats.revenue < 200}
                  >
                    Upgrade Room ($200)
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {/* Add New Room Card */}
            <Card className="border-dashed border-green-500/50 bg-green-900/10 hover:bg-green-900/20 transition-all cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full p-8">
                <Building2 className="h-12 w-12 text-green-400 mb-4" />
                <div className="text-green-300 text-lg font-bold mb-2">Add New Room</div>
                <div className="text-green-400 text-sm text-center mb-4">
                  Expand your eco-friendly hotel
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Build Room ($500)
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'challenges' && (
          <div className="space-y-4">
            {ecoChallenges.map((challenge) => (
              <Card key={challenge.id} className={`border-purple-500/30 ${challenge.completed ? 'bg-green-900/20' : 'bg-purple-900/20'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-5 w-5 text-purple-400" />
                        <h3 className="text-lg font-bold text-purple-300">{challenge.title}</h3>
                        {challenge.completed && (
                          <Badge className="bg-green-600 text-white">COMPLETED</Badge>
                        )}
                      </div>
                      <p className="text-purple-400 text-sm">{challenge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-300 font-bold">+{challenge.reward} GAIA</div>
                      <div className="text-yellow-400 text-sm">Reward</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Progress</span>
                      <span className="text-purple-200">{challenge.progress}/{challenge.target}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                  </div>
                  
                  {challenge.progress >= challenge.target && !challenge.completed && (
                    <Button 
                      onClick={() => completeChallenge(challenge.id)}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    >
                      Claim Reward
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'sustainability' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <TreePine className="h-5 w-5" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-300 font-bold mb-2">🌱 Real-World Impact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-green-400">Trees Planted:</div>
                      <div className="text-green-200 font-bold">247 trees</div>
                    </div>
                    <div>
                      <div className="text-blue-400">Carbon Offset:</div>
                      <div className="text-blue-200 font-bold">15.2 tonnes CO2</div>
                    </div>
                    <div>
                      <div className="text-yellow-400">Energy Saved:</div>
                      <div className="text-yellow-200 font-bold">8,456 kWh</div>
                    </div>
                    <div>
                      <div className="text-cyan-400">Water Saved:</div>
                      <div className="text-cyan-200 font-bold">12,340 L</div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  View Environmental Certificate
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-blue-300 font-bold mb-2">🏆 Leaderboards</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-400">Global Ranking:</span>
                      <span className="text-blue-200 font-bold">#156 / 10,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-400">Eco Score Rank:</span>
                      <span className="text-green-200 font-bold">#89 / 10,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-400">Local Region:</span>
                      <span className="text-yellow-200 font-bold">#12 / 500</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Global Tournament
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}