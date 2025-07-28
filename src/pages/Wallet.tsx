
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Shield, Zap } from 'lucide-react'

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-blue-500/50 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center gap-3">
              <Wallet className="h-12 w-12 text-blue-400 animate-pulse" />
              💼 GAiA Wallet
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Secure Multi-Chain Eco Wallet
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-blue-600">💼 Wallet</Badge>
              <Badge className="bg-purple-600">🔒 Secure</Badge>
              <Badge className="bg-green-600">🌱 Eco-Friendly</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-500/50 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Multi-Chain Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Store and manage GAiA tokens across multiple blockchain networks.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Advanced Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Bank-level security with biometric authentication and hardware wallet support.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Instant Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Lightning-fast transactions with minimal environmental impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
