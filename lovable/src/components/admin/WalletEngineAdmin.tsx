
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, Send, Download, Settings, Shield, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

export function WalletEngineAdmin() {
  const [selectedWallet, setSelectedWallet] = useState('main')
  const [transferAmount, setTransferAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  const wallets = [
    {
      id: 'main',
      name: 'Main Treasury',
      balance: '15,847,293.45',
      currency: 'GAIA',
      address: '0x742d35Cc6A4C3e2f...',
      status: 'active'
    },
    {
      id: 'rewards',
      name: 'Rewards Pool',
      balance: '8,432,156.78',
      currency: 'GAIA',
      address: '0x8e4f9c1A2B3d5E7F...',
      status: 'active'
    },
    {
      id: 'burn',
      name: 'Burn Wallet',
      balance: '2,847,536.12',
      currency: 'GAIA',
      address: '0x1a2b3c4d5e6f7890...',
      status: 'locked'
    },
    {
      id: 'dev',
      name: 'Development Fund',
      balance: '3,245,789.33',
      currency: 'GAIA',
      address: '0x9f8e7d6c5b4a3928...',
      status: 'active'
    }
  ]

  const executeTransfer = () => {
    if (!transferAmount || !recipientAddress) {
      toast.error('Please fill in all transfer details')
      return
    }

    toast.info(`Initiating transfer of ${transferAmount} GAIA...`)
    
    setTimeout(() => {
      toast.success('Transfer completed successfully!', {
        description: `${transferAmount} GAIA sent to ${recipientAddress.slice(0, 10)}...`
      })
      setTransferAmount('')
      setRecipientAddress('')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            💰 Wallet Engine Administration
            <Badge className="bg-green-600 text-white">SECURE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
              <TabsTrigger value="monitor">Monitor</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Total Balance */}
              <Card className="border-blue-500/30 bg-blue-900/10">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      30,372,775.68 GAIA
                    </div>
                    <div className="text-lg text-muted-foreground">Total Treasury Balance</div>
                    <Badge className="mt-2 bg-green-600">+2.3% (24h)</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wallets.map((wallet) => (
                  <Card key={wallet.id} className="border-gray-700/50 hover:border-green-500/50 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{wallet.name}</h3>
                          <p className="text-sm text-muted-foreground">{wallet.address}</p>
                        </div>
                        <Badge className={`${
                          wallet.status === 'active' ? 'bg-green-600' : 
                          wallet.status === 'locked' ? 'bg-red-600' : 'bg-yellow-600'
                        }`}>
                          {wallet.status}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-green-400">
                        {wallet.balance} {wallet.currency}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Receive
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transfer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-400">Transfer Tokens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">From Wallet</label>
                    <select className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded-md">
                      {wallets.filter(w => w.status === 'active').map(wallet => (
                        <option key={wallet.id} value={wallet.id}>
                          {wallet.name} - {wallet.balance} GAIA
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Recipient Address</label>
                    <Input
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Amount</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={executeTransfer}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Execute Transfer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitor" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">47</div>
                    <div className="text-sm text-muted-foreground">Today's Transactions</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-400">100%</div>
                    <div className="text-sm text-muted-foreground">Security Score</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Wallet className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-400">4</div>
                    <div className="text-sm text-muted-foreground">Active Wallets</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-400">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { type: 'send', amount: '1,000', to: '0x1234...', time: '2 min ago' },
                      { type: 'receive', amount: '5,500', from: '0x5678...', time: '15 min ago' },
                      { type: 'send', amount: '750', to: '0x9abc...', time: '1 hour ago' },
                      { type: 'receive', amount: '12,000', from: '0xdef0...', time: '3 hours ago' }
                    ].map((tx, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-900/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          {tx.type === 'send' ? (
                            <Send className="h-4 w-4 text-red-400" />
                          ) : (
                            <Download className="h-4 w-4 text-green-400" />
                          )}
                          <div>
                            <div className="font-medium">
                              {tx.type === 'send' ? 'Sent' : 'Received'} {tx.amount} GAIA
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {tx.type === 'send' ? 'To' : 'From'}: {tx.type === 'send' ? tx.to : tx.from}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{tx.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-400">Wallet Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-900/30 rounded-lg">
                    <div>
                      <h3 className="font-medium">Multi-Signature Required</h3>
                      <p className="text-sm text-muted-foreground">Require multiple signatures for large transfers</p>
                    </div>
                    <Badge className="bg-green-600">ENABLED</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-900/30 rounded-lg">
                    <div>
                      <h3 className="font-medium">Auto-Lock Feature</h3>
                      <p className="text-sm text-muted-foreground">Automatically lock wallets after inactivity</p>
                    </div>
                    <Badge className="bg-green-600">ENABLED</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-900/30 rounded-lg">
                    <div>
                      <h3 className="font-medium">Transaction Limits</h3>
                      <p className="text-sm text-muted-foreground">Daily transfer limits are active</p>
                    </div>
                    <Badge className="bg-blue-600">CONFIGURED</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
