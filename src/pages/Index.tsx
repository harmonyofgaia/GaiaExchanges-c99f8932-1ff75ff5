
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/Navbar'
import { LiveTransactionMatrix } from '@/components/LiveTransactionMatrix'
import { TokenDataDisplay } from '@/components/TokenDataDisplay'
import { Link } from 'react-router-dom'
import { Leaf, Heart, Shield, Globe, TrendingUp, Eye } from 'lucide-react'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <Card className="border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌍 Harmony of Gaia
            </CardTitle>
            <p className="text-center text-2xl text-muted-foreground mt-4">
              World's Most Transparent Environmental Token • Complete Community Trust
            </p>
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                <Leaf className="h-4 w-4 mr-2" />
                Environmental Focus
              </Badge>
              <Badge className="bg-blue-600 text-white text-lg px-4 py-2">
                <Eye className="h-4 w-4 mr-2" />
                100% Transparent
              </Badge>
              <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
                <Heart className="h-4 w-4 mr-2" />
                Community First
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Live Transaction Matrix - Full Transparency */}
        <LiveTransactionMatrix />

        {/* Token Data Display */}
        <TokenDataDisplay showFullDetails={true} />

        {/* Mission Statement */}
        <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-green-900/20">
          <CardContent className="pt-6 text-center space-y-4">
            <h2 className="text-3xl font-bold text-cyan-400">
              🌱 Our Mission: Heal the Planet Together
            </h2>
            <p className="text-xl text-cyan-300 max-w-4xl mx-auto">
              "We Are a Strong Creative Open Minded Circuit To Happiness. Seeds Will Form Into Music. 
              Enjoy This Massive Good Vibration. We Create a New Cult Till the End Of the World."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 bg-green-900/30 rounded-lg">
                <Globe className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <h3 className="font-bold text-green-400">Global Impact</h3>
                <p className="text-sm text-green-300">Environmental projects worldwide</p>
              </div>
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <Shield className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <h3 className="font-bold text-blue-400">Complete Trust</h3>
                <p className="text-sm text-blue-300">100% transparent operations</p>
              </div>
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <Heart className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <h3 className="font-bold text-purple-400">Community Love</h3>
                <p className="text-sm text-purple-300">Built for believers, not traders</p>
              </div>
              <div className="p-4 bg-orange-900/30 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto text-orange-400 mb-2" />
                <h3 className="font-bold text-orange-400">Stable Growth</h3>
                <p className="text-sm text-orange-300">Long-term sustainable value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardContent className="pt-6 text-center space-y-6">
            <h2 className="text-4xl font-bold text-green-400">
              💎 Join the Environmental Revolution
            </h2>
            <p className="text-xl text-green-300">
              Every transaction helps heal our planet • Every holder makes a difference
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/wallet">
                <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                  <Eye className="h-5 w-5 mr-2" />
                  View Transparent Wallet
                </Button>
              </Link>
              <Link to="/exchange">
                <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trade GAiA Token
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
