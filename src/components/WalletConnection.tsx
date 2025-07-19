
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Wallet, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Coins,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

interface WalletInfo {
  address: string
  balance: string
  chainId: string
  isConnected: boolean
}

export function WalletConnection() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [supportedWallets] = useState([
    {
      name: 'MetaMask',
      id: 'metamask',
      icon: '🦊',
      available: typeof window !== 'undefined' && window.ethereum?.isMetaMask,
      installed: typeof window !== 'undefined' && window.ethereum?.isMetaMask
    },
    {
      name: 'Trust Wallet',
      id: 'trust',
      icon: '🛡️',
      available: typeof window !== 'undefined' && window.ethereum?.isTrust,
      installed: typeof window !== 'undefined' && window.ethereum?.isTrust
    },
    {
      name: 'Coinbase Wallet',
      id: 'coinbase',
      icon: '💰',
      available: typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet,
      installed: typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet
    },
    {
      name: 'WalletConnect',
      id: 'walletconnect',
      icon: '🔗',
      available: true,
      installed: true
    }
  ])

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          await updateWalletInfo(accounts[0])
        }
      } catch (error) {
        console.log('Wallet connection check failed:', error)
      }
    }
  }

  const updateWalletInfo = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      })
      
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      })

      setWallet({
        address,
        balance: (parseInt(balance, 16) / 1e18).toFixed(4),
        chainId,
        isConnected: true
      })

      toast.success('🔗 Wallet Connected Successfully!', {
        description: `Connected to ${address.substring(0, 6)}...${address.substring(38)}`
      })
    } catch (error) {
      console.error('Failed to update wallet info:', error)
    }
  }

  const connectWallet = async (walletId: string) => {
    if (!window.ethereum) {
      toast.error('No Web3 wallet detected')
      return
    }

    setIsConnecting(true)
    
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      
      if (accounts.length > 0) {
        await updateWalletInfo(accounts[0])
        
        // Add GAIA token to wallet
        await addGaiaToken()
      }
    } catch (error: any) {
      toast.error('Connection failed', {
        description: error.message || 'Failed to connect wallet'
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const addGaiaToken = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: GAIA_TOKEN.CONTRACT_ADDRESS,
            symbol: 'GAIA',
            decimals: 18,
            image: 'https://gaiaexchanges.net/logo.png'
          }
        }
      })
      
      toast.success('🌍 GAIA Token Added!', {
        description: 'GAIA token has been added to your wallet'
      })
    } catch (error) {
      console.log('Failed to add GAIA token:', error)
    }
  }

  const disconnectWallet = () => {
    setWallet(null)
    toast.info('Wallet disconnected')
  }

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address)
      toast.success('Address copied to clipboard')
    }
  }

  const openEtherscan = () => {
    if (wallet?.address) {
      window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')
    }
  }

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Wallet className="h-5 w-5" />
          🔗 Multi-Wallet Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* GAIA Token Info */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Coins className="h-5 w-5 text-green-400" />
            <h4 className="font-semibold text-green-400">Official GAIA Token</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contract:</span>
              <code className="text-green-400 font-mono text-xs">
                {GAIA_TOKEN.CONTRACT_ADDRESS.substring(0, 20)}...
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Website:</span>
              <a 
                href={GAIA_TOKEN.OFFICIAL_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                gaiaexchanges.net ↗
              </a>
            </div>
          </div>
        </div>

        {/* Wallet Status */}
        {wallet ? (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-semibold">Wallet Connected</span>
              </div>
              <Button
                onClick={disconnectWallet}
                variant="outline"
                size="sm"
                className="text-red-400 hover:text-red-300"
              >
                Disconnect
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Address:</span>
                <div className="flex items-center gap-2">
                  <code className="text-white font-mono text-sm">
                    {wallet.address.substring(0, 6)}...{wallet.address.substring(38)}
                  </code>
                  <Button onClick={copyAddress} variant="ghost" size="sm">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button onClick={openEtherscan} variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">ETH Balance:</span>
                <span className="text-white font-semibold">{wallet.balance} ETH</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Network:</span>
                <Badge className="bg-blue-600 text-white">
                  {wallet.chainId === '0x1' ? 'Ethereum Mainnet' : `Chain ${wallet.chainId}`}
                </Badge>
              </div>
            </div>
            
            <Button
              onClick={addGaiaToken}
              className="w-full mt-4 bg-green-600 hover:bg-green-700"
            >
              <Coins className="h-4 w-4 mr-2" />
              Add GAIA Token to Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-muted-foreground">
              <Wallet className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Connect your wallet to access GAIA features</p>
            </div>
            
            {/* Wallet Options */}
            <div className="grid grid-cols-2 gap-3">
              {supportedWallets.map((walletOption) => (
                <Button
                  key={walletOption.id}
                  onClick={() => connectWallet(walletOption.id)}
                  disabled={!walletOption.available || isConnecting}
                  variant="outline"
                  className="h-auto py-3 flex-col gap-2"
                >
                  <span className="text-2xl">{walletOption.icon}</span>
                  <span className="text-sm">{walletOption.name}</span>
                  {!walletOption.installed && (
                    <Badge variant="secondary" className="text-xs">
                      Not Installed
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
            
            {isConnecting && (
              <div className="text-center">
                <div className="animate-spin h-6 w-6 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Connecting wallet...</p>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div className="text-sm">
              <h5 className="font-semibold text-yellow-400 mb-1">Getting Started</h5>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Install MetaMask or another Web3 wallet</li>
                <li>• Connect your wallet to access GAIA features</li>
                <li>• Add GAIA token to track your balance</li>
                <li>• Visit gaiaexchanges.net for trading</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Add TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isConnected(): boolean
      isMetaMask?: boolean
      isTrust?: boolean
      isCoinbaseWallet?: boolean
      request(request: { method: string; params?: any[] }): Promise<any>
    }
  }
}
