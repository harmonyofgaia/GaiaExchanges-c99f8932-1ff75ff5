
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Coins, Video, Bike, Hammer, Mountain, Palette } from 'lucide-react'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            🌍 Welcome to GAiA Universe
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Harmony of Culture • Green Innovation • Sustainable Future
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/virtual-world">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                Enter Virtual World
              </Button>
            </Link>
            <Link to="/gaia-bike-ecosystem">
              <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-4 text-lg">
                Start Earning GAiA
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link to="/virtual-world">
            <Card className="border-blue-500/30 bg-blue-900/20 hover:bg-blue-900/30 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Globe className="h-6 w-6" />
                  Virtual World
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Explore immersive virtual environments and connect with the global community.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/nft-green-animals">
            <Card className="border-green-500/30 bg-green-900/20 hover:bg-green-900/30 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Coins className="h-6 w-6" />
                  NFT Green Animals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Collect unique NFT animals while supporting wildlife conservation efforts.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/video-upload">
            <Card className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Video className="h-6 w-6" />
                  Video Upload & Earn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Share your content and earn GAiA tokens for your creative contributions.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/gaia-bike-ecosystem">
            <Card className="border-yellow-500/30 bg-yellow-900/20 hover:bg-yellow-900/30 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Bike className="h-6 w-6" />
                  GAiA Bike Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Ride, earn tokens, and contribute to a greener planet with our bike ecosystem.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/coin-crafter">
            <Card className="border-orange-500/30 bg-orange-900/20 hover:bg-orange-900/30 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Hammer className="h-6 w-6" />
                  Coin Crafter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Create and customize your own digital tokens in our advanced crafting system.</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/landscape-builder">
            <Card className="border-cyan-500/30 bg-cyan-900/20 hover:bg-cyan-900/30 transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Mountain className="h-6 w-6" />
                  Landscape Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Design and build stunning virtual landscapes and environments.</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30 max-w-4xl mx-auto">
            <CardContent className="pt-8">
              <h2 className="text-3xl font-bold text-green-400 mb-4">
                Join the Green Revolution
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Every action you take in GAiA Universe contributes to a more sustainable future. 
                Earn tokens, save the planet, and be part of the harmony of culture.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/about">
                  <Button variant="outline" className="border-green-500/50 text-green-400">
                    Learn More
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
