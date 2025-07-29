
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Gamepad2, Trophy, Users } from 'lucide-react'

export default function Games() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-pink-500/30 bg-gradient-to-r from-pink-900/20 to-rose-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
            🎮 Games Hub
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Play, earn, and contribute to environmental causes
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-pink-900/30 rounded-lg border border-pink-500/30">
              <Gamepad2 className="h-12 w-12 mx-auto text-pink-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-pink-400">Gaming Platform</div>
              <div className="text-sm text-muted-foreground">Eco-friendly games</div>
            </div>

            <div className="text-center p-6 bg-rose-900/30 rounded-lg border border-rose-500/30">
              <Trophy className="h-12 w-12 mx-auto text-rose-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-rose-400">Competitions</div>
              <div className="text-sm text-muted-foreground">Win GAiA tokens</div>
            </div>

            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Users className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Community</div>
              <div className="text-sm text-muted-foreground">Social gaming</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
