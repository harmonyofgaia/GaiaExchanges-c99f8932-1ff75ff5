
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, Satellite, MapPin, Users, CheckCircle } from 'lucide-react'
export default function PlanetCleaning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
<div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 Planet Cleaning
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Master Plan v7: Verified Cleanup Activities with Satellite Monitoring
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Satellite className="h-3 w-3 mr-1" />
              Satellite Verified
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Globe className="h-3 w-3 mr-1" />
              Global Impact
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">2,847</div>
              <div className="text-muted-foreground">Areas Cleaned</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Satellite className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">45.7K</div>
              <div className="text-muted-foreground">Tons Waste Removed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">89,124</div>
              <div className="text-muted-foreground">Active Cleaners</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">98.9%</div>
              <div className="text-muted-foreground">Verification Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Satellite className="h-5 w-5" />
                Satellite Verification System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Advanced satellite monitoring verifies cleanup activities in real-time, ensuring accurate tracking and reward distribution.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                    <div className="font-medium text-green-400 mb-1">Real-time Monitoring</div>
                    <div className="text-sm text-muted-foreground">24/7 satellite surveillance of cleanup zones</div>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                    <div className="font-medium text-blue-400 mb-1">IoT Sensor Integration</div>
                    <div className="text-sm text-muted-foreground">Ground sensors validate cleanup completion</div>
                  </div>
                  <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                    <div className="font-medium text-purple-400 mb-1">Blockchain Rewards</div>
                    <div className="text-sm text-muted-foreground">Automatic GAiA token distribution upon verification</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Global Impact Mapping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Interactive global map showing cleanup progress and environmental recovery across the planet.
                </p>
                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-500/20">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <div className="text-lg font-bold text-blue-400 mb-2">Interactive Map</div>
                    <div className="text-sm text-muted-foreground">
                      View real-time cleanup activities worldwide
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  Explore Global Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/20">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Join the Global Cleanup Movement
            </h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Make a verified impact on our planet while earning GAiA tokens through satellite-monitored cleanup activities.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-12 py-6 text-xl"
            >
              <Globe className="h-6 w-6 mr-3" />
              Start Cleaning
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
