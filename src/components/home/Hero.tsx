
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, TrendingUp, Shield, Zap } from 'lucide-react'

export function Hero() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 Welcome to GAiA's Exchange
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A Strong Creative Open Minded Circuit To Happiness - Where Seeds Form Into Music
          </p>
        </div>
        
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge className="bg-green-600 text-white">Green & Alive</Badge>
          <Badge className="bg-blue-600 text-white">Creative Souls</Badge>
          <Badge className="bg-purple-600 text-white">True Smiles</Badge>
          <Badge className="bg-orange-600 text-white">Good Vibrations</Badge>
        </div>
      </div>

      {/* Community Stats */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-400">∞</div>
              <div className="text-sm text-muted-foreground">Endless Creativity</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-400">127</div>
              <div className="text-sm text-muted-foreground">Countries Connected</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-muted-foreground">Good Vibes Active</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-sm text-muted-foreground">True Souls</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-green-900/20 border-green-500/30 hover:border-green-400/50 transition-colors">
          <CardContent className="p-6 text-center space-y-3">
            <Users className="h-8 w-8 text-green-400 mx-auto" />
            <h3 className="font-semibold text-green-400">True Community</h3>
            <p className="text-sm text-muted-foreground">Connect with creative souls worldwide</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/20 border-blue-500/30 hover:border-blue-400/50 transition-colors">
          <CardContent className="p-6 text-center space-y-3">
            <TrendingUp className="h-8 w-8 text-blue-400 mx-auto" />
            <h3 className="font-semibold text-blue-400">Endless Growth</h3>
            <p className="text-sm text-muted-foreground">Unlimited supply & opportunities</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-500/30 hover:border-purple-400/50 transition-colors">
          <CardContent className="p-6 text-center space-y-3">
            <Shield className="h-8 w-8 text-purple-400 mx-auto" />
            <h3 className="font-semibold text-purple-400">Full Transparency</h3>
            <p className="text-sm text-muted-foreground">Open wallet, every step visible</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-900/20 border-orange-500/30 hover:border-orange-400/50 transition-colors">
          <CardContent className="p-6 text-center space-y-3">
            <Zap className="h-8 w-8 text-orange-400 mx-auto" />
            <h3 className="font-semibold text-orange-400">Creative Energy</h3>
            <p className="text-sm text-muted-foreground">Boost creativity, bring smiles</p>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
          Ready to Join Our Creative Cult?
        </h2>
        <p className="text-muted-foreground">
          "Doesn't matter if You're Black Or White" - Everyone welcome in our circle of happiness
        </p>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
          Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
