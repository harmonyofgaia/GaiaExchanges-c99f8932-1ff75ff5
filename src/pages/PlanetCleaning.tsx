import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, TreePine, Droplets, Wind, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function PlanetCleaning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 Planet Cleaning Initiatives
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Explore and support global initiatives dedicated to cleaning and preserving our planet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ocean Cleanup */}
          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Droplets className="h-5 w-5 text-blue-400" />
                Ocean Cleanup Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Removing plastic and debris from the ocean to protect marine life.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plastic Removed</span>
                  <span className="text-blue-400 font-bold">12,500 tons</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Marine Life Saved</span>
                  <span className="text-green-400 font-bold">4,200+ species</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Support Initiative
              </Button>
            </CardContent>
          </Card>

          {/* Reforestation */}
          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TreePine className="h-5 w-5 text-green-400" />
                Amazon Reforestation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Planting trees in the Amazon rainforest to restore biodiversity and combat climate change.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Trees Planted</span>
                  <span className="text-green-400 font-bold">500,000+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CO2 Absorbed</span>
                  <span className="text-green-400 font-bold">8,000 tons/year</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700">
                Join Reforestation
              </Button>
            </CardContent>
          </Card>

          {/* Air Purification */}
          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wind className="h-5 w-5 text-cyan-400" />
                Global Air Purification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Deploying advanced air filters in urban areas to improve air quality.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Air Filters Installed</span>
                  <span className="text-cyan-400 font-bold">2,500+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">PM2.5 Reduction</span>
                  <span className="text-cyan-400 font-bold">35% average</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                Clean the Air
              </Button>
            </CardContent>
          </Card>

          {/* Community Cleanup */}
          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-purple-400" />
                Local Community Cleanups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Organizing community-based cleanup events to remove litter and waste.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Events Organized</span>
                  <span className="text-purple-400 font-bold">150+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Volunteers Involved</span>
                  <span className="text-purple-400 font-bold">5,000+</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Join a Cleanup
              </Button>
            </CardContent>
          </Card>

          {/* Global Awareness */}
          <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="h-5 w-5 text-orange-400" />
                Environmental Awareness Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Raising awareness about environmental issues through educational campaigns.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">People Reached</span>
                  <span className="text-orange-400 font-bold">1,000,000+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Campaigns Launched</span>
                  <span className="text-orange-400 font-bold">25+</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700">
                Spread Awareness
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
