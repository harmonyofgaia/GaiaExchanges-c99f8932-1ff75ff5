
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Send, Receive, History, Shield, Zap, DollarSign } from 'lucide-react'

const WalletPage = () => {
  const [balance, setBalance] = useState({
    gaia: 15750.25,
    usd: 51187.31,
    btc: 1.2567,
    eth: 18.45
  })

  const [transactions] = useState([
    { id: '1', type: 'receive', amount: 500, currency: 'GAIA', date: '2024-01-15', status: 'completed' },
    { id: '2', type: 'send', amount: 250, currency: 'GAIA', date: '2024-01-14', status: 'completed' },
    { id: '3', type: 'receive', amount: 1000, currency: 'GAIA', date: '2024-01-13', status: 'completed' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => ({
        ...prev,
        gaia: prev.gaia + (Math.random() - 0.5) * 10,
        usd: prev.usd + (Math.random() - 0.5) * 50
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            💰 GAIA WALLET
          </h1>
          <p className="text-xl text-muted-foreground">
            Your secure dragon-protected cryptocurrency wallet
          </p>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-green-500/30 bg-green-900/30">
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-green-400">{balance.gaia.toFixed(2)}</div>
              <div className="text-sm text-green-300">GAIA Tokens</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/30">
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-blue-400">${balance.usd.toFixed(2)}</div>
              <div className="text-sm text-blue-300">USD Value</div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-orange-900/30">
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{balance.btc.toFixed(4)}</div>
              <div className="text-sm text-orange-300">Bitcoin</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/30">
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{balance.eth.toFixed(2)}</div>
              <div className="text-sm text-purple-300">Ethereum</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Wallet className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Send GAIA
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Receive className="h-4 w-4 mr-2" />
                Receive GAIA
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Trade Tokens
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <History className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/20 rounded">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'receive' ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {tx.type === 'receive' ? <Receive className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium">
                          {tx.type === 'receive' ? 'Received' : 'Sent'} {tx.amount} {tx.currency}
                        </div>
                        <div className="text-sm text-muted-foreground">{tx.date}</div>
                      </div>
                    </div>
                    <Badge className="bg-green-600">
                      {tx.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Status */}
        <Card className="mt-8 border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="h-8 w-8 text-red-400" />
                <h3 className="text-2xl font-bold text-red-400">Dragon Protection Active</h3>
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
              <p className="text-muted-foreground">
                Your wallet is protected by quantum-level dragon security with full body armor encryption.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WalletPage
