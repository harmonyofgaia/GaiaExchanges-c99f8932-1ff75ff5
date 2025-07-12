
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, TrendingUp, Music } from 'lucide-react'
import { Link } from 'react-router-dom'

export const CallToAction = () => {
  return (
    <Card className="border-4 border-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-red-900/30 mb-8 relative overflow-hidden">
      {/* Animated abstract background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl animate-spin" style={{ animationDuration: '10s' }} />
      </div>
      
      <CardContent className="pt-12 pb-12 text-center relative z-10">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6 relative">
          🚀 JOIN THE ETERNAL REVOLUTION
        </h2>
        <p className="text-2xl text-muted-foreground mb-8">
          Experience the future of secure, dragon-protected digital ecosystems
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link to="/gaia-fighter-game">
            <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-xl px-12 py-4 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
              <Gamepad2 className="h-6 w-6 mr-2 relative z-10" />
              <span className="relative z-10">Start Epic Gaming</span>
            </Button>
          </Link>
          <Link to="/gaias-exchange">
            <Button variant="outline" className="border-2 border-green-500 text-green-400 hover:bg-green-500/10 text-xl px-12 py-4 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent group-hover:from-green-400/10 transition-all duration-300" />
              <TrendingUp className="h-6 w-6 mr-2 relative z-10" />
              <span className="relative z-10">Trade GAiA Tokens</span>
            </Button>
          </Link>
          <Link to="/artist-streaming">
            <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-xl px-12 py-4 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
              <Music className="h-6 w-6 mr-2 relative z-10" />
              <span className="relative z-10">Live Artists</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
