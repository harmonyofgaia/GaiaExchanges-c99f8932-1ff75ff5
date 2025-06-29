
import { AnimatedCoinCrafting } from '@/components/AnimatedCoinCrafting'
import { GaiaCoinCrafter } from '@/components/GaiaCoinCrafter'
import { MatrixWalletDisplay } from '@/components/MatrixWalletDisplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Copy, TrendingUp } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

const CoinCrafter = () => {
  const exchangeLinks = [
    {
      name: 'PumpFun',
      url: GAIA_TOKEN.PUMP_FUN_URL,
      icon: '🚀',
      status: 'Live',
      color: 'bg-purple-600'
    },
    {
      name: 'Uniswap',
      url: `https://app.uniswap.org/swap?outputCurrency=${GAIA_TOKEN.CONTRACT_ADDRESS}`,
      icon: '🦄',
      status: 'Listed',
      color: 'bg-pink-600'
    },
    {
      name: 'Coinbase',
      url: `https://www.coinbase.com/price/gaia-token`,
      icon: '💙',
      status: 'Pending',
      color: 'bg-blue-600'
    },
    {
      name: 'Revolut',
      url: `https://www.revolut.com/crypto/gaia`,
      icon: '💰',
      status: 'Applied',
      color: 'bg-green-600'
    },
    {
      name: 'Zengo',
      url: `https://zengo.com/token/gaia`,
      icon: '🔐',
      status: 'In Review',
      color: 'bg-orange-600'
    }
  ]

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('GAiA Contract Address Copied!', {
      description: 'Ready to paste on any exchange platform',
      duration: 3000
    })
  }

  const openExchange = (exchange: typeof exchangeLinks[0]) => {
    window.open(exchange.url, '_blank')
    toast.info(`Opening ${exchange.name}`, {
      description: `Redirecting to ${exchange.name} for GAiA token...`,
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900/20 via-red-900/20 to-yellow-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent mb-4">
            🔥 HARMONY OF GAIA COIN CRAFTER
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Craft and forge GAiA tokens with dragon fire - Listed on all major exchanges
          </p>
          
          {/* Exchange Listings */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <TrendingUp className="h-6 w-6" />
                🌍 GAiA Token Exchange Listings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-bold">Official GAiA Contract:</span>
                  <Button onClick={copyContractAddress} variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <code className="text-blue-300 font-mono text-xs break-all block bg-blue-900/10 p-2 rounded">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {exchangeLinks.map((exchange) => (
                  <Card key={exchange.name} className="bg-black/30 border-gray-500/30 hover:border-gray-400/50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{exchange.icon}</div>
                      <h3 className="font-bold text-white mb-2">{exchange.name}</h3>
                      <Badge className={`${exchange.color} text-white mb-3`}>
                        {exchange.status}
                      </Badge>
                      <Button 
                        onClick={() => openExchange(exchange)}
                        variant="outline" 
                        size="sm" 
                        className="w-full border-gray-500/30 text-gray-300 hover:bg-gray-800/50"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Trade GAiA
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <MatrixWalletDisplay />
          <AnimatedCoinCrafting />
          <GaiaCoinCrafter />
        </div>
      </div>
    </div>
  )
}

export default CoinCrafter
