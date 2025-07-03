import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState('')
  const [balance, setBalance] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [disclaimer] = useState(GAIA_TOKEN.DISCLAIMER)

  useEffect(() => {
    // Simulate wallet connection and balance fetch
    if (walletAddress.length === 42) {
      setIsConnected(true)
      // Simulate fetching balance
      setBalance(1234.56)
    } else {
      setIsConnected(false)
      setBalance(0)
    }
  }, [walletAddress])

  const connectWallet = () => {
    if (walletAddress.length === 42) {
      toast.success('Wallet connected successfully!')
      setIsConnected(true)
    } else {
      toast.error('Invalid wallet address')
    }
  }

  const disconnectWallet = () => {
    setWalletAddress('')
    setBalance(0)
    setIsConnected(false)
    toast('Wallet disconnected')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black p-6">
      <div className="container mx-auto max-w-md space-y-6">
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              💼 GAiA Wallet
            </CardTitle>
            <p className="text-center text-muted-foreground mt-2">
              Securely manage your GAiA tokens and transactions
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                disabled={isConnected}
                className="text-sm"
              />
              {!isConnected ? (
                <Button onClick={connectWallet} className="w-full bg-blue-600 hover:bg-blue-700">
                  Connect Wallet
                </Button>
              ) : (
                <>
                  <div className="text-center space-y-2">
                    <Badge className="bg-green-600 text-white text-lg px-4 py-2 rounded">
                      Connected
                    </Badge>
                    <p className="font-mono text-sm break-all">{walletAddress}</p>
                    <p className="text-lg font-bold text-blue-400">
                      Balance: {balance.toLocaleString()} GAiA
                    </p>
                  </div>
                  <Button onClick={disconnectWallet} className="w-full bg-red-600 hover:bg-red-700">
                    Disconnect Wallet
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
          <CardHeader>
            <CardTitle className="text-yellow-400 text-center text-lg font-semibold">
              ⚠️ Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-300 text-sm text-center">
              {disclaimer}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
