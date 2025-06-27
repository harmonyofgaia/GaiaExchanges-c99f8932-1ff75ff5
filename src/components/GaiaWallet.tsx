
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Wallet, Send, QrCode, History, Shield, Leaf, Eye } from 'lucide-react'

const walletData = {
  gaiaBalance: 15750.25,
  usdValue: 47250.75,
  stakingRewards: 0, // No staking available
  transactions: [
    { type: 'received', amount: 1250, from: 'Environmental Reward', time: '2 hours ago', hash: '0x742d35cc6c' },
    { type: 'burned', amount: 500, to: 'Ocean Cleanup', time: '1 day ago', hash: '0x9f4e8c2a1b' },
    { type: 'received', amount: 2000, from: 'Token Purchase', time: '3 days ago', hash: '0x1a2b3c4d5e' },
    { type: 'burned', amount: 750, to: 'Reforestation', time: '5 days ago', hash: '0x6f7g8h9i0j' }
  ]
}

export function GaiaWallet() {
  const [sendAmount, setSendAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  const formatGaia = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleSend = () => {
    console.log('Sending GAiA:', { amount: sendAmount, to: recipientAddress })
    // Here you would integrate with the GAiA network
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'received': return '↓'
      case 'sent': return '↑'
      case 'burned': return '🔥'
      default: return '•'
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'received': return 'text-green-400'
      case 'sent': return 'text-blue-400'
      case 'burned': return 'text-orange-400'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Leaf className="h-5 w-5" />
            Harmony of Gaia Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold mono-numbers text-green-400">
              {formatGaia(walletData.gaiaBalance)} GAiA
            </div>
            <div className="text-xl text-muted-foreground mono-numbers">
              ≈ {formatUSD(walletData.usdValue)}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" className="border-green-500/20 text-green-400">
              <Shield className="h-3 w-3 mr-1" />
              Eco-Secured
            </Badge>
            <Badge variant="outline" className="border-blue-500/20 text-blue-400">
              <Eye className="h-3 w-3 mr-1" />
              Transparent
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Actions */}
      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send GAiA</TabsTrigger>
          <TabsTrigger value="receive">Receive</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send GAiA Tokens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-sm text-yellow-400">
                  <strong>Note:</strong> Staking is not available. GAiA tokens are designed for direct environmental impact through our burning and reinvestment system.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Recipient Address</label>
                  <Input
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="0x... or GAiA address"
                    className="mono-numbers"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (GAiA)</label>
                  <Input
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.00"
                    className="mono-numbers"
                  />
                  <div className="text-sm text-muted-foreground mt-1">
                    Available: {formatGaia(walletData.gaiaBalance)} GAiA
                  </div>
                </div>
                
                <Button 
                  onClick={handleSend}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!sendAmount || !recipientAddress}
                >
                  Send GAiA Tokens
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receive">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Receive GAiA Tokens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mx-auto">
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Your GAiA Wallet Address</p>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm break-all">0x742d35Cc6cF3B4C4e6A7D8E9F0A1B2C3D4E5F6789ABC</code>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Copy Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletData.transactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`text-lg ${getTransactionColor(tx.type)}`}>
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {tx.type === 'received' ? `From: ${tx.from}` : `To: ${tx.to}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-medium mono-numbers ${getTransactionColor(tx.type)}`}>
                        {tx.type === 'received' ? '+' : '-'}{formatGaia(tx.amount)} GAiA
                      </div>
                      <div className="text-sm text-muted-foreground">{tx.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
