
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Zap, Globe, Activity } from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

const SystemStatus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌟 GALAXY SYSTEM STATUS
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Real-Time Monitoring • Quantum Defense • Universal Coverage
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
                <Shield className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-green-400">ACTIVE</div>
                <div className="text-sm text-muted-foreground">Quantum Defense</div>
                <Badge className="bg-green-600 mt-2">100% Operational</Badge>
              </div>

              <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <Zap className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-blue-400">SUPREME</div>
                <div className="text-sm text-muted-foreground">Dragon Power</div>
                <Badge className="bg-blue-600 mt-2">Immortal Status</Badge>
              </div>

              <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <Globe className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-purple-400">GLOBAL</div>
                <div className="text-sm text-muted-foreground">Network Coverage</div>
                <Badge className="bg-purple-600 mt-2">Worldwide Active</Badge>
              </div>

              <div className="text-center p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                <Activity className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-yellow-400">999M+</div>
                <div className="text-sm text-muted-foreground">Active Processes</div>
                <Badge className="bg-yellow-600 mt-2">Peak Performance</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SystemStatus
