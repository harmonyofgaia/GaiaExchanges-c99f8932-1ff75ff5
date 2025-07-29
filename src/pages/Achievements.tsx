
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Trophy, Medal, Star } from 'lucide-react'

export default function Achievements() {
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
      
      <Card className="border-gold-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            🏆 Achievements
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Track your progress and unlock rewards
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
              <Trophy className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-yellow-400">Trophies</div>
              <div className="text-sm text-muted-foreground">Major milestones</div>
            </div>

            <div className="text-center p-6 bg-orange-900/30 rounded-lg border border-orange-500/30">
              <Medal className="h-12 w-12 mx-auto text-orange-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-orange-400">Medals</div>
              <div className="text-sm text-muted-foreground">Special accomplishments</div>
            </div>

            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Star className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Badges</div>
              <div className="text-sm text-muted-foreground">Skill recognition</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
