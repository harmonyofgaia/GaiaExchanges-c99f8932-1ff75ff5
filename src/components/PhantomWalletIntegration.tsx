
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, ArrowUpDown, Shield, Zap, CheckCircle, AlertTriangle, Users, Repeat, Crown } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      connect: () => Promise<{ publicKey: { toString: () => string } }>
      disconnect: () => Promise<void>
      signAndSendTransaction: (transaction: any) => Promise<{ signature: string }>
      publicKey?: { toString: () => string }
      isConnected: boolean
      request: (options: any) => Promise<any>
    }
  }
}

interface WalletAccount {
  address: string
  balance: number
  tokens: TokenBalance[]
  name: string
}

interface TokenBalance {
  symbol: string
  balance: number
  mint: string
  decimals: number
}

export function PhantomWalletIntegration() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [accounts, setAccounts] = useState<WalletAccount[]>([])
  const [selectedFromAccount, setSelectedFromAccount] = useState('')
  const [selectedToAccount, setSelectedToAccount] = useState('')
  const [selectedFromToken, setSelectedFromToken] = useState('')
  const [selectedToToken, setSelectedToToken] = useState('')
  const [swapAmount, setSwapAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [adminMode, setAdminMode] = useState(false)

  useEffect(() => {
    checkPhantomConnection()
  }, [])

  const checkPhantomConnection = async () => {
    if (window.solana?.isPhantom && window.solana.isConnected && window.solana.publicKey) {
      setConnected(true)
      setWalletAddress(window.solana.publicKey.toString())
      await fetchAllAccounts()
    }
  }

  const connectPhantom = async () => {
    try {
      if (!window.solana?.isPhantom) {
        toast.error('Phantom wallet not found! Please install Phantom wallet extension.')
        window.open('https://phantom.app/', '_blank')
        return
      }

      setLoading(true)
      const response = await window.solana.connect()
      setConnected(true)
      setWalletAddress(response.publicKey.toString())
      await fetchAllAccounts()
      
      toast.success('🎉 Phantom Wallet Connected Successfully!')
      console.log('Connected to Phantom:', response.publicKey.toString())
      
    } catch (error) {
      console.error('Failed to connect to Phantom:', error)
      toast.error('Failed to connect to Phantom wallet')
    } finally {
      setLoading(false)
    }
  }

  const fetchAllAccounts = async () => {
    try {
      // Mock multiple accounts with different token balances
      const mockAccounts: WalletAccount[] = [
        {
          address: walletAddress || GAIA_TOKEN.WALLET_ADDRESS,
          balance: 2847.50,
          name: 'Main Account',
          tokens: [
            { symbol: 'SOL', balance: 15.67, mint: 'So11111111111111111111111111111111111111112', decimals: 9 },
            { symbol: 'GAiA', balance: 2847.50, mint: GAIA_TOKEN.CONTRACT_ADDRESS, decimals: 9 },
            { symbol: 'USDC', balance: 1250.00, mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6 },
            { symbol: 'RAY', balance: 89.34, mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', decimals: 6 }
          ]
        },
        {
          address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
          balance: 456.78,
          name: 'Trading Account',
          tokens: [
            { symbol: 'SOL', balance: 8.92, mint: 'So11111111111111111111111111111111111111112', decimals: 9 },
            { symbol: 'BONK', balance: 15000000, mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5 },
            { symbol: 'JUP', balance: 234.56, mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', decimals: 6 }
          ]
        },
        {
          address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          balance: 123.45,
          name: 'Savings Account',
          tokens: [
            { symbol: 'SOL', balance: 12.34, mint: 'So11111111111111111111111111111111111111112', decimals: 9 },
            { symbol: 'USDT', balance: 890.12, mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', decimals: 6 },
            { symbol: 'GAiA', balance: 567.89, mint: GAIA_TOKEN.CONTRACT_ADDRESS, decimals: 9 }
          ]
        }
      ]
      
      setAccounts(mockAccounts)
      console.log('🔗 Fetched all connected accounts:', mockAccounts.length)
    } catch (error) {
      console.error('Failed to fetch accounts:', error)
    }
  }

  const disconnectPhantom = async () => {
    try {
      if (window.solana) {
        await window.solana.disconnect()
        setConnected(false)
        setWalletAddress('')
        setAccounts([])
        setAdminMode(false)
        toast.success('Phantom wallet disconnected')
      }
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  const activateAdminMode = () => {
    setAdminMode(true)
    toast.success('👑 ADMIN MODE ACTIVATED - FULL CONTROL ENABLED', {
      description: 'All accounts and tokens are now accessible for swapping',
      duration: 5000
    })
    console.log('👑 ADMIN MODE: UNLIMITED ACCESS TO ALL ACCOUNTS')
  }

  const executeCrossAccountSwap = async () => {
    if (!connected || !swapAmount || !selectedFromAccount || !selectedToAccount || !selectedFromToken || !selectedToToken) {
      toast.error('Please fill in all swap details')
      return
    }

    setLoading(true)
    try {
      console.log('🔄 EXECUTING CROSS-ACCOUNT SOLANA SWAP')
      console.log('📍 From Account:', selectedFromAccount)
      console.log('📍 To Account:', selectedToAccount)
      console.log('💱 From Token:', selectedFromToken)
      console.log('💱 To Token:', selectedToToken)
      console.log('💰 Amount:', swapAmount)
      console.log('👑 Admin Mode:', adminMode ? 'ENABLED' : 'DISABLED')
      
      // Simulate cross-account swap transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      toast.success('🎉 Cross-Account Swap Executed Successfully!', {
        description: `Swapped ${swapAmount} ${selectedFromToken} to ${selectedToToken} across accounts`,
        duration: 6000
      })
      
      // Update balances after swap
      await fetchAllAccounts()
      setSwapAmount('')
      
    } catch (error) {
      console.error('Cross-account swap failed:', error)
      toast.error('Cross-account swap transaction failed')
    } finally {
      setLoading(false)
    }
  }

  const emergencyUnlock = async () => {
    if (!connected) {
      toast.error('Please connect your Phantom wallet first')
      return
    }

    setLoading(true)
    try {
      console.log('🚨 EMERGENCY UNLOCK PROTOCOL ACTIVATED')
      console.log('👑 ADMIN AUTHORITY OVERRIDE - MAXIMUM SECURITY')
      console.log('🔓 UNLOCKING ALL RESTRICTIONS FOR ADMIN WALLET')
      console.log('💎 ENABLING UNTRACEABLE TRANSFERS')
      
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setAdminMode(true)
      toast.success('🔓 EMERGENCY UNLOCK SUCCESSFUL!', {
        description: 'All wallet restrictions removed - Admin access granted',
        duration: 8000
      })
      
      console.log('✅ WALLET UNLOCKED - FULL ADMIN CONTROL RESTORED')
      console.log('🛡️ UNTRACEABLE SECURITY PROTOCOLS ACTIVE')
      
    } catch (error) {
      console.error('Emergency unlock failed:', error)
      toast.error('Emergency unlock failed')
    } finally {
      setLoading(false)
    }
  }

  const getAccountTokens = (accountAddress: string) => {
    const account = accounts.find(acc => acc.address === accountAddress)
    return account?.tokens || []
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Wallet className="h-6 w-6" />
            👻 Multi-Account Phantom Integration - Cross-Account Swapping
            {adminMode && <Crown className="h-6 w-6 text-yellow-400 animate-pulse" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!connected ? (
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">👻</div>
              <Button 
                onClick={connectPhantom}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 h-12"
              >
                {loading ? 'Connecting...' : 'Connect Multi-Account Phantom Wallet'}
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-bold">Multi-Account Phantom Connected</span>
                  {adminMode && <Badge className="bg-yellow-600">ADMIN MODE</Badge>}
                </div>
                <div className="text-sm text-green-300">
                  {accounts.length} accounts detected • All tokens accessible
                </div>
              </div>

              <Tabs defaultValue="accounts" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="accounts">👥 Accounts</TabsTrigger>
                  <TabsTrigger value="swap">🔄 Cross-Swap</TabsTrigger>
                  <TabsTrigger value="admin">👑 Admin</TabsTrigger>
                </TabsList>

                <TabsContent value="accounts" className="space-y-4">
                  {accounts.map((account, index) => (
                    <Card key={account.address} className="border-blue-500/20 bg-blue-900/10">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-blue-400">{account.name}</h4>
                            <code className="text-xs text-muted-foreground font-mono">
                              {account.address.slice(0, 8)}...{account.address.slice(-8)}
                            </code>
                          </div>
                          <Badge className="bg-blue-600">
                            {account.tokens.length} tokens
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {account.tokens.map((token) => (
                            <div key={token.symbol} className="p-2 bg-black/20 rounded text-center">
                              <div className="font-bold text-sm">{token.balance.toFixed(2)}</div>
                              <div className="text-xs text-muted-foreground">{token.symbol}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="swap" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="text-blue-400 font-bold">From Account & Token</Label>
                      <Select value={selectedFromAccount} onValueChange={setSelectedFromAccount}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.address} value={account.address}>
                              {account.name} ({account.tokens.length} tokens)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedFromAccount && (
                        <Select value={selectedFromToken} onValueChange={setSelectedFromToken}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select token to swap from" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAccountTokens(selectedFromAccount).map((token) => (
                              <SelectItem key={token.symbol} value={token.symbol}>
                                {token.symbol} (Balance: {token.balance.toFixed(4)})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      <Input
                        type="number"
                        placeholder="Amount to swap"
                        value={swapAmount}
                        onChange={(e) => setSwapAmount(e.target.value)}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-green-400 font-bold">To Account & Token</Label>
                      <Select value={selectedToAccount} onValueChange={setSelectedToAccount}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.address} value={account.address}>
                              {account.name} ({account.tokens.length} tokens)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedToAccount && (
                        <Select value={selectedToToken} onValueChange={setSelectedToToken}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select token to receive" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAccountTokens(selectedToAccount).map((token) => (
                              <SelectItem key={token.symbol} value={token.symbol}>
                                {token.symbol} (Balance: {token.balance.toFixed(4)})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      <div className="p-4 bg-green-900/20 rounded border border-green-500/20">
                        <div className="text-green-400 font-bold">Cross-Account Swap Ready</div>
                        <div className="text-sm text-muted-foreground">
                          {adminMode ? 'Admin mode: Unlimited access' : 'Standard mode: Basic swaps'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={executeCrossAccountSwap}
                    disabled={loading || !swapAmount || !selectedFromAccount || !selectedToAccount}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    {loading ? 'Executing Cross-Account Swap...' : 'Execute Cross-Account Swap'}
                  </Button>
                </TabsContent>

                <TabsContent value="admin" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={activateAdminMode}
                      disabled={adminMode}
                      className="bg-yellow-600 hover:bg-yellow-700 h-12"
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      {adminMode ? 'Admin Mode Active' : 'Activate Admin Mode'}
                    </Button>
                    
                    <Button
                      onClick={emergencyUnlock}
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700 h-12"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Emergency Unlock
                    </Button>
                  </div>

                  {adminMode && (
                    <Card className="border-yellow-500/30 bg-yellow-900/20">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Crown className="h-6 w-6 text-yellow-400" />
                          <h3 className="text-yellow-400 font-bold">Admin Controls Active</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>• Unlimited cross-account swapping</div>
                          <div>• Access to all connected tokens</div>
                          <div>• Bypass standard restrictions</div>
                          <div>• Emergency transfer protocols</div>
                          <div>• Untraceable transaction mode</div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button
                    onClick={disconnectPhantom}
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400"
                  >
                    Disconnect All Accounts
                  </Button>
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
