
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { UserPlus, Gift, Share } from 'lucide-react'

export default function Referrals() {
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
      
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-teal-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            👥 Referral Program
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Invite friends and earn rewards together
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
              <UserPlus className="h-12 w-12 mx-auto text-cyan-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-cyan-400">Invite Friends</div>
              <div className="text-sm text-muted-foreground">Share your code</div>
            </div>

            <div className="text-center p-6 bg-teal-900/30 rounded-lg border border-teal-500/30">
              <Gift className="h-12 w-12 mx-auto text-teal-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-teal-400">Earn Rewards</div>
              <div className="text-sm text-muted-foreground">Both get bonuses</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <Share className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Track Progress</div>
              <div className="text-sm text-muted-foreground">Monitor referrals</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
