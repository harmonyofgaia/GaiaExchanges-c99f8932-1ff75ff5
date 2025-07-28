
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { Leaf, Globe, Zap, Crown, GamepadIcon, Coins } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌍 GAIA ECOSYSTEM
          </h1>
          <p className="text-2xl text-muted-foreground mb-6">
            Seeds Will Form Into Music - A Creative Circuit To Happiness
          </p>
          <p className="text-lg text-green-400 mb-8">
            Building the Future of Green Innovation & Creative Expression
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="border-green-500/50 text-green-400 text-lg px-4 py-2">
              <Leaf className="h-4 w-4 mr-2" />
              Environmental Focus
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400 text-lg px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Global Impact
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400 text-lg px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Innovation Powered
            </Badge>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link to="/gaming">
            <Card className="border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30 transition-all cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <GamepadIcon className="h-6 w-6" />
                  Gaming Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experience the ultimate Gaia Fighter Game with environmental themes and rewards
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/token-mining">
            <Card className="border-gold-500/30 bg-yellow-900/20 hover:bg-yellow-900/30 transition-all cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Coins className="h-6 w-6" />
                  Token Mining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mine Gaia Coins and contribute to the sustainable future of our planet
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin">
            <Card className="border-red-500/30 bg-red-900/20 hover:bg-red-900/30 transition-all cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Crown className="h-6 w-6" />
                  Admin Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access the secure admin dashboard for system management and control
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Vision Statement */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-green-400">
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xl text-muted-foreground">
              "We Are a Strong Creative Open Minded Circuit To Happiness"
            </p>
            <p className="text-lg text-blue-300">
              A Lot of Grooves and Styles and Businesses And Ideas Are Involved in This Green And Alive Story
            </p>
            <p className="text-lg text-purple-300">
              We Will Not Make You Only Be Surprised but We Show You True Souls, True Life, True Smiles
            </p>
            <p className="text-xl font-bold text-green-400">
              "Doesn't Matter if You're Black Or White" - Creating Unity Through Innovation
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
