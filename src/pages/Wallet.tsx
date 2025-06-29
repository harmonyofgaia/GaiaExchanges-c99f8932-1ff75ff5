
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Send, Download, Eye, Shield, TrendingUp } from 'lucide-react'
import { WalletEnhancementEngine } from '@/components/WalletEnhancementEngine'

const WalletPage = () => {
  const wallets = [
    {
      id: 'gaia-main',
      currency: 'GAIA',
      balance: 15420.87,
      usdValue: 23156.45,
      change24h: 12.5,
      address: '0x742d35Cc9bf6ba4dC95C6...8D9f45A3B2c1'
    },
    {
      id: 'eth-wallet',
      currency: 'ETH',
      balance: 2.45,
      usdValue: 5890.32,
      change24h: -2.1,
      address: '0x8ba1f109551bD432803012...4B7C4c0d9A1'
    },
    {
      id: 'btc-wallet',
      currency: 'BTC',
      balance: 0.15,
      usdValue: 6750.00,
      change24h: 8.3,
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            💎 GAIA WALLET HUB
          </h1>
          <p className="text-muted-foreground">
            Secure multi-currency wallet with dragon protection
          </p>
        </div>

        {/* Wallet Enhancement Engine */}
        <div className="mb-8">
          <WalletEnhancementEngine />
        </div>

        {/* Wallet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Wallet className="h-5 w-5" />
                  {wallet.currency} Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {wallet.balance.toFixed(4)} {wallet.currency}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    ${wallet.usdValue.toLocaleString()}
                  </div>
                  <Badge 
                    className={
                      wallet.change24h >= 0 
                        ? 'bg-green-600 text-white' 
                        : 'bg-red-600 text-white'
                    }
                  >
                    {wallet.change24h >= 0 ? '+' : ''}{wallet.change24h}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Address:</div>
                  <div className="text-xs bg-black/30 p-2 rounded font-mono">
                    {wallet.address}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-3 w-3 mr-1" />
                    Send
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Download className="h-3 w-3 mr-1" />
                    Receive
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dragon Protection Status */}
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="pt-6 text-center">
            <Shield className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Dragon Wallet Protection</h3>
            <p className="text-muted-foreground">
              All wallets are protected by quantum-level dragon security
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WalletPage
