
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Wallet, 
  Shield, 
  Globe, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Link
} from 'lucide-react'

interface Web3State {
  isConnected: boolean
  account: string | null
  chainId: number | null
  balance: string
  isCorrectNetwork: boolean
}

export function Web3Integration() {
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    account: null,
    chainId: null,
    balance: '0',
    isCorrectNetwork: false
  })

  const [isConnecting, setIsConnecting] = useState(false)

  // Check if Web3 is available
  const isWeb3Available = typeof window !== 'undefined' && 'ethereum' in window

  // Connect to MetaMask or other Web3 wallets
  const connectWallet = async () => {
    if (!isWeb3Available) {
      toast.error('Web3 wallet not found', {
        description: 'Please install MetaMask or another Web3 wallet'
      })
      return
    }

    setIsConnecting(true)
    try {
      // Request account access
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length > 0) {
        const account = accounts[0]
        const chainId = await (window as any).ethereum.request({
          method: 'eth_chainId'
        })

        // Get balance
        const balance = await (window as any).ethereum.request({
          method: 'eth_getBalance',
          params: [account, 'latest']
        })

        // Convert hex to decimal and then to ETH
        const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18)

        setWeb3State({
          isConnected: true,
          account,
          chainId: parseInt(chainId, 16),
          balance: balanceInEth.toFixed(4),
          isCorrectNetwork: parseInt(chainId, 16) === 1 // Ethereum mainnet
        })

        toast.success('Wallet Connected!', {
          description: `Connected to ${account.slice(0, 6)}...${account.slice(-4)}`
        })
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      toast.error('Failed to connect wallet', {
        description: 'Please try again or check your wallet'
      })
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWeb3State({
      isConnected: false,
      account: null,
      chainId: null,
      balance: '0',
      isCorrectNetwork: false
    })
    toast.success('Wallet disconnected')
  }

  // Switch to Ethereum mainnet
  const switchToMainnet = async () => {
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }] // Ethereum mainnet
      })
    } catch (error) {
      console.error('Failed to switch network:', error)
      toast.error('Failed to switch network')
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (isWeb3Available) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          // Refresh the connection
          connectWallet()
        }
      }

      const handleChainChanged = () => {
        // Refresh the page when chain changes
        window.location.reload()
      }

      ;(window as any).ethereum.on('accountsChanged', handleAccountsChanged)
      ;(window as any).ethereum.on('chainChanged', handleChainChanged)

      return () => {
        ;(window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged)
        ;(window as any).ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [isWeb3Available])

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Globe className="h-5 w-5" />
          Web3 DApp Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isWeb3Available ? (
          <div className="text-center space-y-4 p-6 border border-orange-500/20 rounded-lg bg-orange-900/20">
            <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-orange-400">Web3 Wallet Required</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Install MetaMask or another Web3 wallet to access DApp features
              </p>
            </div>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Install MetaMask
              </a>
            </Button>
          </div>
        ) : !web3State.isConnected ? (
          <div className="text-center space-y-4">
            <div className="p-6 border border-blue-500/20 rounded-lg bg-blue-900/20">
              <Wallet className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-blue-400">Connect Your Wallet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Connect your Web3 wallet to access trading features
              </p>
            </div>
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flexItems-center justify-between p-4 border border-green-500/20 rounded-lg bg-green-900/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <div className="font-semibold text-green-400">Wallet Connected</div>
                  <div className="text-sm text-muted-foreground">
                    {web3State.account?.slice(0, 6)}...{web3State.account?.slice(-4)}
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/20">
                <div className="text-sm text-muted-foreground">Balance</div>
                <div className="font-semibold">{web3State.balance} ETH</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/20">
                <div className="text-sm text-muted-foreground">Network</div>
                <div className="font-semibold flex items-center gap-2">
                  {web3State.isCorrectNetwork ? (
                    <>
                      <Badge className="bg-green-600 text-white">Ethereum</Badge>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-red-600 text-white">Wrong Network</Badge>
                      <Button size="sm" onClick={switchToMainnet}>
                        Switch
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-cyan-400">Available DApp Features:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" disabled={!web3State.isCorrectNetwork}>
                  <Zap className="h-4 w-4 mr-2" />
                  DEX Trading
                </Button>
                <Button variant="outline" className="justify-start" disabled={!web3State.isCorrectNetwork}>
                  <Shield className="h-4 w-4 mr-2" />
                  Staking
                </Button>
                <Button variant="outline" className="justify-start" disabled={!web3State.isCorrectNetwork}>
                  <Link className="h-4 w-4 mr-2" />
                  Cross-chain Bridge
                </Button>
                <Button variant="outline" className="justify-start" disabled={!web3State.isCorrectNetwork}>
                  <Globe className="h-4 w-4 mr-2" />
                  DeFi Yield
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border/20">
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://dapp.gaiaexchanges.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Launch DApp
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://docs.gaiaexchanges.com/web3" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Web3 Docs
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
