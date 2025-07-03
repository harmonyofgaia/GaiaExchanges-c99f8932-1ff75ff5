
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Globe, Leaf, Heart, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <UniversalGaiaLogo 
            size="xl" 
            animated={true}
            showText={true}
            className="mx-auto hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            🌍 HARMONY OF GAIA
          </h1>
          <p className="text-2xl text-green-300 max-w-4xl mx-auto">
            "A Strong Creative Open Minded Circuit To Happiness - Seeds Will Form Into Music"
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-green-600 text-white text-lg px-6 py-3">
              <Leaf className="h-4 w-4 mr-2" />
              Environmental First
            </Badge>
            <Badge className="bg-blue-600 text-white text-lg px-6 py-3">
              <Globe className="h-4 w-4 mr-2" />
              Global Impact
            </Badge>
            <Badge className="bg-purple-600 text-white text-lg px-6 py-3">
              <Heart className="h-4 w-4 mr-2" />
              True Souls & Smiles
            </Badge>
            <Badge className="bg-orange-600 text-white text-lg px-6 py-3">
              <Shield className="h-4 w-4 mr-2" />
              Community Protected
            </Badge>
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-green-400">
              🎵 OUR MISSION: SEEDS WILL FORM INTO MUSIC
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xl text-green-300">
              "We Create a New Cult till the End Of the World - A More Impressive Way of Doing Things"
            </p>
            <p className="text-lg text-blue-300">
              "We show you true Souls, True Life, True Smiles - Bringing A Smile to every Soul"
            </p>
            <p className="text-md text-purple-300 italic">
              "Doesn't matter if You're Black Or White - Enjoy this massive Good Vibration"
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/exchange">
            <Card className="border-blue-500/30 bg-blue-900/30 hover:bg-blue-900/40 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">💱</div>
                <h3 className="text-xl font-bold text-blue-400">GAiA Exchange</h3>
                <p className="text-blue-300">Trade & Support Environmental Initiatives</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/landscape-builder">
            <Card className="border-green-500/30 bg-green-900/30 hover:bg-green-900/40 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🌄</div>
                <h3 className="text-xl font-bold text-green-400">Landscape Builder</h3>
                <p className="text-green-300">AI-Powered Environmental Creation</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/transparent-wallet">
            <Card className="border-purple-500/30 bg-purple-900/30 hover:bg-purple-900/40 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold text-purple-400">Transparent Wallet</h3>
                <p className="text-purple-300">100% Community Transparency</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
