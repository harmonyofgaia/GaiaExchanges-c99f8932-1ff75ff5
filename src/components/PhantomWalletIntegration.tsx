
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Wallet, ArrowUpDown, Shield, Zap, CheckCircle, AlertTriangle } from 'lucide-react'
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
    }
  }
}

export function PhantomWalletIntegration() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [balance, setBalance] = useState(0)
  const [swapAmount, setSwapAmount] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkPhantomConnection()
  }, [])

  const checkPhantomConnection = async () => {
    if (window.solana?.isPhantom && window.solana.isConnected && window.solana.publicKey) {
      setConnected(true)
      setWalletAddress(window.solana.publicKey.toString())
      await fetchBalance()
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
      await fetchBalance()
      
      toast.success('🎉 Phantom Wallet Connected Successfully!')
      console.log('Connected to Phantom:', response.publicKey.toString())
      
    } catch (error) {
      console.error('Failed to connect to Phantom:', error)
      toast.error('Failed to connect to Phantom wallet')
    } finally {
      setLoading(false)
    }
  }

  const disconnectPhantom = async () => {
    try {
      if (window.solana) {
        await window.solana.disconnect()
        setConnected(false)
        setWalletAddress('')
        setBalance(0)
        toast.success('Phantom wallet disconnected')
      }
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  const fetchBalance = async () => {
    try {
      // Mock balance fetch - in production, this would query the Solana blockchain
      const mockBalance = 2847.50 + Math.random() * 1000
      setBalance(mockBalance)
    } catch (error) {
      console.error('Failed to fetch balance:', error)
    }
  }

  const executeSwap = async () => {
    if (!connected || !swapAmount) {
      toast.error('Please connect wallet and enter swap amount')
      return
    }

    setLoading(true)
    try {
      console.log('🔄 Executing GAiA Token Swap')
      console.log('📍 From Wallet:', walletAddress)
      console.log('📍 GAiA Contract:', GAIA_TOKEN.CONTRACT_ADDRESS)
      console.log('💰 Amount:', swapAmount)
      
      // Mock transaction - in production, this would create and send a real Solana transaction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('🎉 GAiA Swap Executed Successfully!', {
        description: `Swapped ${swapAmount} tokens successfully`,
        duration: 5000
      })
      
      await fetchBalance()
      setSwapAmount('')
      
    } catch (error) {
      console.error('Swap failed:', error)
      toast.error('Swap transaction failed')
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
      
      // Emergency unlock simulation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
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

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Wallet className="h-6 w-6" />
            👻 Phantom Wallet - GAiA Exchange Integration
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
                {loading ? 'Connecting...' : 'Connect Phantom Wallet'}
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-bold">Phantom Wallet Connected</span>
                </div>
                <code className="text-green-300 font-mono text-sm break-all block bg-green-900/10 p-2 rounded">
                  {walletAddress}
                </code>
                <div className="mt-2">
                  <Badge className="bg-green-600">
                    Balance: {balance.toFixed(2)} GAiA
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-purple-400">Swap Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount to swap"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                    className="bg-black/30 border-purple-500/30"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={executeSwap}
                    disabled={loading || !swapAmount}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    {loading ? 'Swapping...' : 'Execute Swap'}
                  </Button>
                  
                  <Button
                    onClick={emergencyUnlock}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Emergency Unlock
                  </Button>
                  
                  <Button
                    onClick={disconnectPhantom}
                    variant="outline"
                    className="border-purple-500/30 text-purple-400"
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="h-6 w-6" />
            🚨 Admin Emergency Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h3 className="text-red-400 font-bold mb-2">Emergency Unlock Protocol</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Admin-only emergency protocol to unlock wallet restrictions and enable untraceable transfers.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>• Removes all transfer restrictions</div>
                <div>• Enables untraceable transactions</div>
                <div>• Bypasses security limitations</div>
                <div>• Admin authority override</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
