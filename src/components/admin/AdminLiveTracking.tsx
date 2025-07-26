import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { OmniscientGPSEngine } from '@/components/tracking/OmniscientGPSEngine'
import { Shield, Crown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function AdminLiveTracking() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 flex items-center justify-center gap-3">
            <Crown className="h-10 w-10 text-yellow-400" />
            🛰️ Admin Live Tracking Command Center
            <Shield className="h-10 w-10 text-green-400" />
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Secure Admin Access • Omniscient GPS tracking with quantum-level accuracy and global coverage
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Shield className="h-3 w-3 mr-1" />
              Admin Only
            </Badge>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
              <Crown className="h-3 w-3 mr-1" />
              Vault Access
            </Badge>
          </div>
        </CardHeader>
      </Card>
      
      <OmniscientGPSEngine />
    </div>
  )
}