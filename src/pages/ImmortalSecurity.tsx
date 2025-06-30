
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Eye, Zap } from 'lucide-react'

const ImmortalSecurity = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          🔒 Immortal Security Suite
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Ultimate protection • Multi-layer defense • Quantum-resistant security
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-6 w-6" />
              Defense Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Advanced threat detection with AI-powered defense systems protecting all assets.
            </p>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              <Shield className="h-4 w-4 mr-2" />
              Activate Defense
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Lock className="h-6 w-6" />
              Quantum Encryption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Quantum-resistant encryption algorithms protecting sensitive data and transactions.
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Lock className="h-4 w-4 mr-2" />
              Enable Encryption
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Eye className="h-6 w-6" />
              Surveillance Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              24/7 monitoring with global threat intelligence and real-time response systems.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              Monitor Systems
            </Button>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Zap className="h-6 w-6" />
              Instant Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Lightning-fast automated response to security threats with zero-tolerance policy.
            </p>
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
              <Zap className="h-4 w-4 mr-2" />
              Emergency Protocol
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ImmortalSecurity
