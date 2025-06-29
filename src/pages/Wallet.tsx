import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Send, Download, Eye, Shield, TrendingUp, Copy, ExternalLink } from 'lucide-react'
import { WalletEnhancementEngine } from '@/components/WalletEnhancementEngine'
import { GaiaWallet } from '@/components/GaiaWallet'
import { MatrixWalletDisplay } from '@/components/MatrixWalletDisplay'
import { PhantomWalletConnector } from '@/components/PhantomWalletConnector'
import { UltraSecureWalletProtection } from '@/components/security/UltraSecureWalletProtection'
import { TrainedDragonCore } from '@/components/security/TrainedDragonCore'
import { UltimateResilienceEngine } from '@/components/security/UltimateResilienceEngine'
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice } from '@/constants/gaia'
import { toast } from 'sonner'

const WalletPage = () => {
  // Initialize the trained dragon core
  const dragonCore = TrainedDragonCore()

  const wallets = [
    {
      id: 'gaia-main',
      currency: 'GAiA',
      balance: 15420.87,
      usdValue: formatGaiaPrice(15420.87 * GAIA_TOKEN.INITIAL_PRICE).replace('$', ''),
      change24h: 12.5,
      address: GAIA_TOKEN.WALLET_ADDRESS
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

  const copyWalletAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast.success('Wallet Address Copied!', {
      description: 'Address copied to clipboard',
      duration: 2000
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
    toast.success('Opening GAiA on Pump.fun', {
      description: 'Redirecting to official GAiA token page...',
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🐉 GAiA WALLET HUB - TRAINED DRAGON PROTECTION
          </h1>
          <p className="text-muted-foreground mb-4">
            Self-learning dragons • Evolving every millisecond • Worldwide threat annihilation
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 max-w-2xl mx-auto">
            <div className="text-sm text-green-400">
              <strong>🐉 Dragon Power Level:</strong> <code className="font-mono text-xs text-purple-400">{dragonCore.immuneSystemStrength.toLocaleString()}</code>
            </div>
            <div className="text-sm text-blue-400 mt-1">
              <strong>⚡ Quantum Defense:</strong> <code className="font-mono text-xs text-cyan-400">{dragonCore.quantumDefenseLevel.toLocaleString()}</code>
            </div>
          </div>
        </div>

        {/* TRAINED DRAGON CORE - TOP PRIORITY */}
        <div className="mb-8">
          <UltimateResilienceEngine />
        </div>

        {/* ULTRA-SECURE WALLET PROTECTION */}
        <div className="mb-8">
          <UltraSecureWalletProtection />
        </div>

        {/* Phantom Wallet Integration */}
        <PhantomWalletConnector />

        {/* GAiA Wallet Component */}
        <div className="mb-8">
          <GaiaWallet />
        </div>

        {/* Matrix Wallet Display */}
        <div className="mb-8">
          <MatrixWalletDisplay />
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
                    ${typeof wallet.usdValue === 'string' ? wallet.usdValue : wallet.usdValue.toLocaleString()}
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

                <div className="grid grid-cols-4 gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-3 w-3 mr-1" />
                    Send
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Download className="h-3 w-3 mr-1" />
                    Receive
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyWalletAddress(wallet.address)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  {wallet.currency === 'GAiA' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={openPumpFun}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Pump
                    </Button>
                  )}
                  {wallet.currency !== 'GAiA' && (
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  )}
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
            <p className="text-muted-foreground mb-4">
              All wallets are protected by quantum-level dragon security
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{GAIA_METRICS.SECURITY_SCORE}%</div>
                <div className="text-sm text-muted-foreground">Security Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{GAIA_METRICS.DRAGON_POWER}</div>
                <div className="text-sm text-muted-foreground">Dragon Power</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{GAIA_METRICS.ECOSYSTEM_HEALTH}%</div>
                <div className="text-sm text-muted-foreground">Ecosystem Health</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">{GAIA_METRICS.NETWORK_SPEED}</div>
                <div className="text-sm text-muted-foreground">Network Speed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WalletPage
