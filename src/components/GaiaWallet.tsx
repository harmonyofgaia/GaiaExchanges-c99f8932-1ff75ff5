import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Wallet, Send, QrCode, History, Shield, Leaf, Eye, ExternalLink, Globe, LogOut } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useWallets } from '@/hooks/useWallets'
import { useTransactions } from '@/hooks/useTransactions'
import { useUserProfile } from '@/hooks/useUserProfile'
import { UltimateWalletProtection } from '@/components/security/UltimateWalletProtection'

export function GaiaWallet() {
  const { user, signOut } = useAuth()
  const { wallets, loading: walletsLoading } = useWallets()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const { profile } = useUserProfile()
  const [sendAmount, setSendAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  const gaiaWallet = wallets.find(w => w.currency === 'GAIA')
  const btcWallet = wallets.find(w => w.currency === 'BTC')
  
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

  const handleSignOut = async () => {
    await signOut()
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'reward': return '↓'
      case 'transfer': return '↑'
      case 'burn': return '🔥'
      default: return '•'
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'reward': return 'text-green-400'
      case 'transfer': return 'text-blue-400'
      case 'burn': return 'text-orange-400'
      default: return 'text-muted-foreground'
    }
  }

  if (walletsLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
          <CardContent className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-green-500/20 rounded w-3/4 mx-auto"></div>
              <div className="h-12 bg-green-500/20 rounded w-1/2 mx-auto"></div>
              <div className="h-6 bg-green-500/20 rounded w-1/3 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Ultimate Wallet Protection - Always First */}
      <UltimateWalletProtection />

      {/* Wallet Header with User Info */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Leaf className="h-5 w-5" />
              Harmony of Gaia Wallet - Maximum Protected
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User Info */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Welcome:</span>
              <Badge variant="outline" className="border-green-500/20 text-green-400">
                {profile?.full_name || user?.email}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Username:</span>
              <span className="text-sm text-green-400">@{profile?.username || 'Not set'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Security Status:</span>
              <Badge variant="outline" className="border-green-500/20 text-green-400">
                🛡️ MAXIMUM PROTECTION ACTIVE
              </Badge>
            </div>
          </div>
          
          {/* Balance Display */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold mono-numbers text-green-400">
              {formatGaia(gaiaWallet?.balance || 0)} GAiA
            </div>
            <div className="text-xl text-muted-foreground mono-numbers">
              ≈ {formatUSD((gaiaWallet?.balance || 0) * 3.00)}
            </div>
            {gaiaWallet?.locked_balance && gaiaWallet.locked_balance > 0 && (
              <div className="text-sm text-yellow-400">
                {formatGaia(gaiaWallet.locked_balance)} GAiA Locked in Staking
              </div>
            )}
          </div>
          
          {/* Wallet Addresses */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">GAIA Wallet:</span>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(user?.id || '')}>
                Copy
              </Button>
            </div>
            <code className="text-xs break-all text-green-400 font-mono block">
              {gaiaWallet?.wallet_address || user?.id}
            </code>
            
            {btcWallet && (
              <>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-muted-foreground">BTC Balance:</span>
                  <span className="text-sm text-orange-400 font-mono">
                    {btcWallet.balance.toFixed(8)} BTC
                  </span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <Badge variant="outline" className="border-green-500/20 text-green-400">
              <Shield className="h-3 w-3 mr-1" />
              Future-Proof Protected
            </Badge>
            <Badge variant="outline" className="border-blue-500/20 text-blue-400">
              <Eye className="h-3 w-3 mr-1" />
              AI Monitored
            </Badge>
            <Badge variant="outline" className="border-purple-500/20 text-purple-400">
              <Globe className="h-3 w-3 mr-1" />
              Quantum Secured
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
                    Available: {formatGaia(gaiaWallet?.balance || 0)} GAiA
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
                    <code className="text-sm break-all">{gaiaWallet?.wallet_address || user?.id}</code>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigator.clipboard.writeText(gaiaWallet?.wallet_address || user?.id || '')}
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
              {transactionsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-20"></div>
                        <div className="h-3 bg-muted rounded w-32"></div>
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-3 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`text-lg ${getTransactionColor(tx.transaction_type)}`}>
                          {getTransactionIcon(tx.transaction_type)}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{tx.transaction_type}</div>
                          <div className="text-sm text-muted-foreground">
                            {tx.from_address ? `From: ${tx.from_address.slice(0, 16)}...` : 'System Transaction'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-medium mono-numbers ${getTransactionColor(tx.transaction_type)}`}>
                          {tx.transaction_type === 'reward' ? '+' : '-'}{formatGaia(tx.amount)} {tx.currency}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(tx.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions found. Start by receiving some GAiA tokens!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
