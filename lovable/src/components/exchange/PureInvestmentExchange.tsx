
import { SwapInterface } from './SwapInterface'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Heart, TrendingUp, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'
import { TokenDataDisplay } from '@/components/TokenDataDisplay'

export function PureInvestmentExchange() {
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('Community Wallet Address Copied!', {
      description: 'This is where all fees go - completely transparent'
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-6 w-6" />
            🌱 Pure Investment Exchange - For Believers, Not Traders
          </CardTitle>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-bold mb-2">🏦 All Fees Go to Community Wallet:</h3>
            <div className="flex items-center justify-between">
              <code className="text-blue-300 font-mono text-sm break-all bg-blue-900/10 p-2 rounded flex-1 mr-2">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
              <Button 
                onClick={copyWalletAddress}
                variant="outline" 
                size="sm"
                className="border-blue-500/30 text-blue-400"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardContent className="pt-6">
          <h3 className="text-purple-400 font-bold text-xl mb-4 text-center">
            🛡️ STABLE FOREVER - NO STAKING, NO GAMBLING
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-green-400 font-bold">✅ We Welcome:</h4>
              <ul className="text-green-300 text-sm space-y-1">
                <li>• Long-term believers</li>
                <li>• Environmental advocates</li>
                <li>• Community builders</li>
                <li>• Stable investors</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-red-400 font-bold">❌ Not Welcome:</h4>
              <ul className="text-red-300 text-sm space-y-1">
                <li>• Daily traders</li>
                <li>• Quick profit seekers</li>
                <li>• Speculators</li>
                <li>• Stakers/Gamblers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <TokenDataDisplay showFullDetails={true} />

      <SwapInterface 
        title="Long-term Investment Portal" 
        showHeader={true}
      />
    </div>
  )
}
