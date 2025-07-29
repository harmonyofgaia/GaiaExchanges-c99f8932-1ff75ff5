
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Vote, Users, Gavel } from 'lucide-react'

export default function Governance() {
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
      
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
            🏛️ Governance Hub
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Participate in decentralized decision making
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-orange-900/30 rounded-lg border border-orange-500/30">
              <Vote className="h-12 w-12 mx-auto text-orange-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-orange-400">Voting System</div>
              <div className="text-sm text-muted-foreground">Democratic proposals</div>
            </div>

            <div className="text-center p-6 bg-red-900/30 rounded-lg border border-red-500/30">
              <Users className="h-12 w-12 mx-auto text-red-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-red-400">Community Voice</div>
              <div className="text-sm text-muted-foreground">Collective decisions</div>
            </div>

            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Gavel className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Proposals</div>
              <div className="text-sm text-muted-foreground">Submit & vote</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
