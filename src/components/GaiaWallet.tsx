import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Wallet, Send, QrCode, History, Shield, Leaf, Eye, ExternalLink, Globe } from 'lucide-react'

const walletData = {
  connectedAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
  burningWalletAddress: '7BurningSystemWalletAddressForTransparency123',
  gaiaBalance: 15750.25,
  usdValue: 47250.75,
  stakingRewards: 0,
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
      {/* Wallet Header with Connected Address */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Leaf className="h-5 w-5" />
            Harmony of Gaia Wallet - Connected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Main Wallet Address:</span>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(walletData.connectedAddress)}>
                Copy
              </Button>
            </div>
            <code className="text-xs break-all text-green-400 font-mono">{walletData.connectedAddress}</code>
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-muted-foreground">Burning System Wallet:</span>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(walletData.burningWalletAddress)}>
                Copy
              </Button>
            </div>
            <code className="text-xs break-all text-orange-400 font-mono">{walletData.burningWalletAddress}</code>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold mono-numbers text-green-400">
              {formatGaia(walletData.gaiaBalance)} GAiA
            </div>
            <div className="text-xl text-muted-foreground mono-numbers">
              ≈ {formatUSD(walletData.usdValue)}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <Badge variant="outline" className="border-green-500/20 text-green-400">
              <Shield className="h-3 w-3 mr-1" />
              Eco-Secured
            </Badge>
            <Badge variant="outline" className="border-blue-500/20 text-blue-400">
              <Eye className="h-3 w-3 mr-1" />
              Transparent
            </Badge>
            <Badge variant="outline" className="border-purple-500/20 text-purple-400">
              <Globe className="h-3 w-3 mr-1" />
              DEXScreener Listed
            </Badge>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://sites.google.com/view/culture-of-harmony/harmony-of-gaia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm underline flex items-center gap-1"
            >
              Culture of Harmony Website <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-sm underline flex items-center gap-1"
            >
              Pump.fun Chart <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-400">Contact & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Official Email:</span>
              <a href="mailto:info@cultureofharmony.net" className="text-blue-400 hover:text-blue-300">
                info@cultureofharmony.net
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Official Phone:</span>
              <a href="tel:+31687758236" className="text-blue-400 hover:text-blue-300">
                +31687758236
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Support Hours:</span>
              <span className="text-green-400">24/7 Available</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Response Time:</span>
              <span className="text-green-400">Within 1 Hour</span>
            </div>
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
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-blue-400">
                  <strong>Zero-Fee Transfers:</strong> We always find the cheapest or zero-cost transfer methods for our transparent community.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Recipient Address</label>
                  <Input
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Enter recipient wallet address"
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
                  Send GAiA Tokens (Zero Fee)
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
                    <code className="text-sm break-all">{walletData.connectedAddress}</code>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigator.clipboard.writeText(walletData.connectedAddress)}
                >
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

  function formatGaia(amount: number) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  function formatUSD(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  function handleSend() {
    console.log('Sending GAiA:', { amount: sendAmount, to: recipientAddress })
  }

  function getTransactionIcon(type: string) {
    switch (type) {
      case 'received': return '↓'
      case 'sent': return '↑'
      case 'burned': return '🔥'
      default: return '•'
    }
  }

  function getTransactionColor(type: string) {
    switch (type) {
      case 'received': return 'text-green-400'
      case 'sent': return 'text-blue-400'
      case 'burned': return 'text-orange-400'
      default: return 'text-muted-foreground'
    }
  }
}
