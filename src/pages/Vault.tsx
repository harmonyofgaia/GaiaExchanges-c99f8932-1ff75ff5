
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Shield, Lock, Gem } from 'lucide-react'

export default function Vault() {
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
      
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            🏦 Secure Vault
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Ultra-secure storage for your digital assets
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Shield className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Military Grade</div>
              <div className="text-sm text-muted-foreground">Quantum encryption</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <Lock className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Multi-Signature</div>
              <div className="text-sm text-muted-foreground">Advanced protection</div>
            </div>

            <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
              <Gem className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-green-400">Asset Storage</div>
              <div className="text-sm text-muted-foreground">Secure holdings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
