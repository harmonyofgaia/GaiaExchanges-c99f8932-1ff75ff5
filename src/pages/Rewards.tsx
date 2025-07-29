
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Gift, Star, Trophy } from 'lucide-react'

export default function Rewards() {
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
      
      <Card className="border-pink-500/30 bg-gradient-to-r from-pink-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            🎁 Rewards Center
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Claim your earned rewards and bonuses
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-pink-900/30 rounded-lg border border-pink-500/30">
              <Gift className="h-12 w-12 mx-auto text-pink-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-pink-400">Daily Rewards</div>
              <div className="text-sm text-muted-foreground">Claim every 24h</div>
            </div>

            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Star className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Achievement Rewards</div>
              <div className="text-sm text-muted-foreground">Milestone bonuses</div>
            </div>

            <div className="text-center p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
              <Trophy className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-yellow-400">Leaderboard Prizes</div>
              <div className="text-sm text-muted-foreground">Top performer rewards</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
