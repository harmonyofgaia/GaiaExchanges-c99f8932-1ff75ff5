import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, ExternalLink, Copy, Shield, Zap } from 'lucide-react'
import { toast } from 'sonner'

export function PhantomWalletIntegration() {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(0)

  // Define fetchAllAccounts before using it
  const fetchAllAccounts = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect()
        setAccount(response.publicKey.toString())
        setConnected(true)
        // Simulate balance fetch
        setBalance(Math.random() * 100)
      }
    } catch (error) {
      console.error('Error fetching accounts:', error)
    }
  }

  useEffect(() => {
    // Check if Phantom is installed
    if (window.solana && window.solana.isPhantom) {
      console.log('Phantom wallet detected')
      fetchAllAccounts()
    }
  }, [])

  const connectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect()
        setAccount(response.publicKey.toString())
        setConnected(true)
        toast.success('Phantom Wallet Connected!', {
          description: `Account ${response.publicKey.toString().slice(0, 8)}... connected`,
          duration: 3000
        })
      } else {
        toast.error('Phantom Wallet not detected!', {
          description: 'Please install Phantom Wallet to connect',
          duration: 5000
        })
      }
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error)
      toast.error('Connection Failed', {
        description: 'Could not connect to Phantom Wallet. Please try again.',
        duration: 5000
      })
    }
  }

  const disconnectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        await window.solana.disconnect()
        setConnected(false)
        setAccount(null)
        toast.info('Phantom Wallet Disconnected', {
          description: 'You have disconnected from Phantom Wallet',
          duration: 3000
        })
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom wallet:', error)
      toast.error('Disconnection Failed', {
        description: 'Could not disconnect from Phantom Wallet. Please try again.',
        duration: 5000
      })
    }
  }

  const copyAccountAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
      toast.success('Account Address Copied!', {
        description: `Account address ${account.slice(0, 8)}... copied to clipboard`,
        duration: 3000
      })
    } else {
      toast.error('No Account Connected', {
        description: 'Connect your Phantom Wallet to copy the account address',
        duration: 3000
      })
    }
  }

  const openInExplorer = () => {
    if (account) {
      const explorerUrl = `https://solscan.io/account/${account}`
      window.open(explorerUrl, '_blank')
    } else {
      toast.error('No Account Connected', {
        description: 'Connect your Phantom Wallet to view in explorer',
        duration: 3000
      })
    }
  }

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Wallet className="h-6 w-6" />
          👻 Phantom Wallet Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">
              Status: {connected ? 'Connected' : 'Disconnected'}
            </p>
            <p className="text-xl font-bold text-white">
              Account: {account ? `${account.slice(0, 8)}...` : 'Not Connected'}
            </p>
            <p className="text-green-400">
              Balance: {balance.toFixed(2)} SOL
            </p>
          </div>
          <Badge className="bg-blue-600 text-white">
            <Shield className="h-3 w-3 mr-1" />
            Secured by Phantom
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          {!connected ? (
            <Button onClick={connectWallet} className="bg-purple-600 hover:bg-purple-700">
              <Zap className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <Button onClick={disconnectWallet} variant="outline" className="border-purple-500/30 text-purple-400">
              Disconnect
            </Button>
          )}
          <Button onClick={copyAccountAddress} variant="secondary">
            <Copy className="h-4 w-4 mr-2" />
            Copy Address
          </Button>
          <Button onClick={openInExplorer} variant="secondary">
            <ExternalLink className="h-4 w-4 mr-2" />
            View in Explorer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
