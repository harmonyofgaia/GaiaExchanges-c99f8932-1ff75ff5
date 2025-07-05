
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Eye,
  Zap,
  Shield,
  Globe
} from 'lucide-react'

interface WalletData {
  id: string
  name: string
  address: string
  balance: number
  currency: string
  incoming24h: number
  outgoing24h: number
  transactions: Array<{
    type: 'incoming' | 'outgoing'
    amount: number
    timestamp: string
    hash: string
  }>
}

export default function TransparentWallets() {
  const [wallets, setWallets] = useState<WalletData[]>([
    {
      id: '1',
      name: 'Primary GAiA Wallet',
      address: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
      balance: 2847356.78,
      currency: 'GAiA',
      incoming24h: 125670.50,
      outgoing24h: 89340.25,
      transactions: [
        { type: 'incoming', amount: 5000, timestamp: '2 min ago', hash: 'tx123...abc' },
        { type: 'outgoing', amount: 1250, timestamp: '8 min ago', hash: 'tx456...def' },
        { type: 'incoming', amount: 12500, timestamp: '15 min ago', hash: 'tx789...ghi' }
      ]
    },
    {
      id: '2',
      name: 'Fee Collection Wallet',
      address: 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7',
      balance: 456789.12,
      currency: 'GAiA',
      incoming24h: 67890.30,
      outgoing24h: 23456.70,
      transactions: [
        { type: 'incoming', amount: 2500, timestamp: '5 min ago', hash: 'tx111...222' },
        { type: 'incoming', amount: 850, timestamp: '12 min ago', hash: 'tx333...444' },
        { type: 'outgoing', amount: 3200, timestamp: '18 min ago', hash: 'tx555...666' }
      ]
    },
    {
      id: '3',
      name: 'Community Vault',
      address: '6DAj3dhtwBDv3HY3UYw1ykjHGRLTU7yMKQmCn8bNoTpW',
      balance: 1234567.89,
      currency: 'GAiA',
      incoming24h: 89012.45,
      outgoing24h: 12345.67,
      transactions: [
        { type: 'incoming', amount: 10000, timestamp: '1 min ago', hash: 'tx777...888' },
        { type: 'incoming', amount: 7500, timestamp: '7 min ago', hash: 'tx999...000' },
        { type: 'outgoing', amount: 5000, timestamp: '20 min ago', hash: 'txaaa...bbb' }
      ]
    }
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setWallets(prev => prev.map(wallet => ({
        ...wallet,
        balance: wallet.balance + (Math.random() - 0.5) * 1000,
        incoming24h: wallet.incoming24h + Math.random() * 100,
        outgoing24h: wallet.outgoing24h + Math.random() * 50
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-blue-900/20 p-6">
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px)`
        }}></div>
      </div>

      <div className="container mx-auto max-w-7xl space-y-6 relative z-10">
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              👁️ TRANSPARENT WALLETS MATRIX
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Real-Time Transparency • Live Transaction Monitoring • Complete Visibility
            </p>
          </CardHeader>
        </Card>

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Wallet className="h-6 w-6" />
                  {wallet.name}
                </CardTitle>
                <Badge className="w-fit bg-green-600 animate-pulse">
                  <Eye className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Balance */}
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="text-3xl font-bold text-green-400">
                    {wallet.balance.toLocaleString()} {wallet.currency}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Balance</div>
                </div>

                {/* Address */}
                <div className="p-3 bg-black/30 rounded-lg border border-gray-500/30">
                  <div className="text-xs text-muted-foreground mb-1">Wallet Address:</div>
                  <div className="text-xs text-green-400 font-mono break-all">
                    {wallet.address}
                  </div>
                </div>

                {/* 24h Activity */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-400">Incoming</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">
                      {wallet.incoming24h.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingDown className="h-4 w-4 text-red-400" />
                      <span className="text-xs text-red-400">Outgoing</span>
                    </div>
                    <div className="text-lg font-bold text-red-400">
                      {wallet.outgoing24h.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">⚡ Live Transactions</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {wallet.transactions.map((tx, index) => (
                      <div key={index} className={`p-2 rounded border ${
                        tx.type === 'incoming' 
                          ? 'bg-green-900/20 border-green-500/30' 
                          : 'bg-red-900/20 border-red-500/30'
                      }`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            {tx.type === 'incoming' ? (
                              <TrendingUp className="h-3 w-3 text-green-400" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-400" />
                            )}
                            <span className={`text-xs font-bold ${
                              tx.type === 'incoming' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {tx.type === 'incoming' ? '+' : '-'}{tx.amount.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{tx.timestamp}</span>
                        </div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">
                          {tx.hash}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Status */}
                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-bold text-blue-400">Security Status</span>
                  </div>
                  <Progress value={100} className="h-2 mb-1" />
                  <div className="text-xs text-muted-foreground">Quantum Protected</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Stats */}
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400">🌍 Global Network Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-900/20 rounded-lg">
                <Globe className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {wallets.reduce((sum, w) => sum + w.balance, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Network Value</div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  {wallets.reduce((sum, w) => sum + w.incoming24h, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">24h Incoming</div>
              </div>
              <div className="text-center p-4 bg-red-900/20 rounded-lg">
                <TrendingDown className="h-8 w-8 mx-auto text-red-400 mb-2" />
                <div className="text-2xl font-bold text-red-400">
                  {wallets.reduce((sum, w) => sum + w.outgoing24h, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">24h Outgoing</div>
              </div>
              <div className="text-center p-4 bg-yellow-900/20 rounded-lg">
                <Zap className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-yellow-400">100%</div>
                <div className="text-sm text-muted-foreground">Transparency Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
