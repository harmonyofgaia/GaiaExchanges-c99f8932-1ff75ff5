import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import { TransparentWalletDashboard } from '@/components/wallet/TransparentWalletDashboard'
import { Shield, Eye, DollarSign, Activity } from 'lucide-react'

export default function TransparentWallet() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🛡️ Transparent Wallet
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Full transparency and security for your GAiA assets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Secure</div>
              <div className="text-muted-foreground">Transactions</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Visible</div>
              <div className="text-muted-foreground">Asset Tracking</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Valuable</div>
              <div className="text-muted-foreground">GAiA Holdings</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Active</div>
              <div className="text-muted-foreground">Real-Time Updates</div>
            </CardContent>
          </Card>
        </div>

        <TransparentWalletDashboard />
      </div>
    </div>
  )
}

