
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Battery, Zap, Leaf, Users, Trophy, TrendingUp, Clock } from 'lucide-react'

const GaiaBikeEcosystem = () => {
  const [selectedStation, setSelectedStation] = useState(null)

  const bikeStations = [
    { id: 1, name: "Central Park Hub", location: "Downtown", bikesAvailable: 12, batteryLevel: 85, greenPoints: 2340 },
    { id: 2, name: "University Campus", location: "Education District", bikesAvailable: 8, batteryLevel: 72, greenPoints: 1890 },
    { id: 3, name: "Shopping Center", location: "Commercial Zone", bikesAvailable: 15, batteryLevel: 91, greenPoints: 3120 },
    { id: 4, name: "Beach Front", location: "Coastal Area", bikesAvailable: 6, batteryLevel: 68, greenPoints: 1456 }
  ]

  const userStats = {
    totalRides: 127,
    greenPointsEarned: 4560,
    co2Saved: 23.4,
    caloriesBurned: 12890,
    rank: 42
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Gaia Bike Ecosystem
        </h1>
        <p className="text-muted-foreground text-lg">
          Sustainable transportation powered by renewable energy and community engagement
        </p>
      </div>

      {/* User Dashboard */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Your Eco-Cycling Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{userStats.totalRides}</div>
              <div className="text-sm text-muted-foreground">Total Rides</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{userStats.greenPointsEarned}</div>
              <div className="text-sm text-muted-foreground">Green Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{userStats.co2Saved}kg</div>
              <div className="text-sm text-muted-foreground">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{userStats.caloriesBurned}</div>
              <div className="text-sm text-muted-foreground">Calories Burned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">#{userStats.rank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="stations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stations">Bike Stations</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="stations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bikeStations.map((station) => (
              <Card key={station.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedStation(station)}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{station.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {station.location}
                      </CardDescription>
                    </div>
                    <Badge variant={station.bikesAvailable > 10 ? "default" : "secondary"}>
                      {station.bikesAvailable} bikes
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Battery Level</span>
                    <Progress value={station.batteryLevel} className="flex-1" />
                    <span className="text-sm font-medium">{station.batteryLevel}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Leaf className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Green Points: {station.greenPoints}</span>
                    </div>
                    <Button size="sm">
                      <Zap className="h-4 w-4 mr-1" />
                      Reserve Bike
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>Exchange your green points for exciting rewards</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Free Coffee</h3>
                <p className="text-sm text-muted-foreground">Partner café discount</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">500 points</Badge>
                  <Button size="sm">Redeem</Button>
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Tree Planting</h3>
                <p className="text-sm text-muted-foreground">Plant a tree in your name</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">1,000 points</Badge>
                  <Button size="sm">Redeem</Button>
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Bike Upgrade</h3>
                <p className="text-sm text-muted-foreground">Premium bike access</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">2,500 points</Badge>
                  <Button size="sm">Redeem</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Challenges</CardTitle>
              <CardDescription>Complete challenges to earn bonus points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Weekly Distance Challenge</h3>
                  <Badge>50km Goal</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Ride 50km this week for bonus points</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: 32.5km</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Green Route Explorer</h3>
                  <Badge variant="secondary">Exploration</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Visit 5 different bike stations</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: 3/5 stations</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  Personal Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">23.4kg</div>
                    <div className="text-sm text-muted-foreground">CO₂ Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">127</div>
                    <div className="text-sm text-muted-foreground">Car Trips Avoided</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Goal</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">2,340kg</div>
                    <div className="text-sm text-muted-foreground">Total CO₂ Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">1,267</div>
                    <div className="text-sm text-muted-foreground">Active Riders</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-400">🌱 23 Trees Worth of Impact!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GaiaBikeEcosystem
