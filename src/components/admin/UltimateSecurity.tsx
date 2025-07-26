
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UltimateSecuritySuite } from './UltimateSecuritySuite'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

function UltimateSecurity() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-purple-900/20 to-black">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <Card className="mb-8 border-red-500/50 bg-gradient-to-r from-red-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
              🛡️ ULTIMATE SECURITY FORTRESS
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Admin-Only Access • Quantum-Powered • Dragon-Protected • Unbreakable Defense Matrix
            </p>
          </CardHeader>
        </Card>
        
        <UltimateSecuritySuite />
      </div>
    </div>
  )
}

export default UltimateSecurity
