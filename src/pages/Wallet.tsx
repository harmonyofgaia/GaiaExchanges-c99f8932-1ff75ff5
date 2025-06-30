
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wallet as WalletIcon, Shield, TrendingUp } from 'lucide-react'

const Wallet = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          💰 GAiA Wallet
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Secure wallet for GAiA tokens • Multi-layer protection • Real environmental impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <WalletIcon className="h-5 w-5" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400 mb-2">0 GAiA</div>
            <p className="text-sm text-muted-foreground">Connect your wallet to see balance</p>
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Shield className="h-5 w-5" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400 mb-2">Maximum</div>
            <p className="text-sm text-muted-foreground">Multi-signature protection active</p>
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              Security Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <TrendingUp className="h-5 w-5" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400 mb-2">1,247 Trees</div>
            <p className="text-sm text-muted-foreground">Planted through token burns</p>
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
              View Impact
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Wallet
