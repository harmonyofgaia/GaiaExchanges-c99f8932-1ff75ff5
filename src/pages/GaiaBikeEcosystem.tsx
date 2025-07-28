import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Bike, MapPin, Trophy, Users, Leaf, Zap } from 'lucide-react'

export default function GaiaBikeEcosystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🚴 GAIA Bike Ecosystem
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Revolutionizing urban mobility with sustainable biking solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Bike className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-muted-foreground">Active Bikers</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">89</div>
              <div className="text-muted-foreground">Bike Stations</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">456</div>
              <div className="text-muted-foreground">Missions Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <Leaf className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">2,456 kg</div>
              <div className="text-muted-foreground">CO₂ Reduced</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bike className="h-5 w-5 text-green-400" />
                Eco-Friendly Rides
              </CardTitle>
              <Badge className="bg-green-600">Active</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Join the green revolution with our electric bikes and reduce your carbon footprint
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Distance Covered</span>
                  <span className="text-green-400 font-bold">12,456 km</span>
                </div>
                <Progress value={75} className="w-full" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CO₂ Reduction</span>
                  <span className="text-orange-400 font-bold">234 kg</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Bike className="h-4 w-4 mr-2" />
                Start Riding
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="h-5 w-5 text-blue-400" />
                Rewards & Missions
              </CardTitle>
              <Badge className="bg-blue-600">New</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Earn GAiA tokens by completing biking missions and contributing to a greener planet
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Missions Completed</span>
                  <span className="text-purple-400 font-bold">456</span>
                </div>
                <Progress value={45} className="w-full" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GAiA Earned</span>
                  <span className="text-green-400 font-bold">1,234 GAiA</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Trophy className="h-4 w-4 mr-2" />
                View Missions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
