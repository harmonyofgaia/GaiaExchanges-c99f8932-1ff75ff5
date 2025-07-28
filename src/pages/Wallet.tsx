
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet as WalletIcon, DollarSign, ArrowUpRight } from 'lucide-react'

export default function Wallet() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-green-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            💰 Gaia Wallet
          </h1>
          <p className="text-xl text-muted-foreground">
            Secure storage for your Gaia tokens and eco-investments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <WalletIcon className="h-5 w-5" />
                Token Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400 mb-2">1,250.00 GAIA</div>
              <p className="text-muted-foreground">Current token balance</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <DollarSign className="h-5 w-5" />
                Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-2">$3,750.00</div>
              <div className="flex items-center text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+12.5% this month</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
