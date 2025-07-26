
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

// Wallet provider interfaces
interface EthereumProvider {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isTrust?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

interface SolanaProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
}

interface WindowWithProviders extends Window {
  ethereum?: EthereumProvider;
  solana?: SolanaProvider;
  solflare?: unknown;
}

interface WalletInfo {
  name: string
  id: string
  icon: string
  installed: boolean
  connected: boolean
  address?: string
  balance?: string
}

export function WalletConnection() {
  const [wallets, setWallets] = useState<WalletInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkWallets()
  }, [])

  const checkWallets = () => {
    const walletList: WalletInfo[] = [
      {
        name: 'MetaMask',
        id: 'metamask',
        icon: '🦊',
        installed: !!(window as WindowWithProviders).ethereum?.isMetaMask,
        connected: false
      },
      {
        name: 'WalletConnect',
        id: 'walletconnect',
        icon: '🔗',
        installed: true, // WalletConnect is always available
        connected: false
      },
      {
        name: 'Coinbase Wallet',
        id: 'coinbase',
        icon: '🔵',
        installed: !!(window as WindowWithProviders).ethereum?.isCoinbaseWallet,
        connected: false
      },
      {
        name: 'Trust Wallet',
        id: 'trust',
        icon: '🛡️',
        installed: !!(window as WindowWithProviders).ethereum?.isTrust,
        connected: false
      },
      {
        name: 'Phantom',
        id: 'phantom',
        icon: '👻',
        installed: !!(window as WindowWithProviders).solana?.isPhantom,
        connected: false
      },
      {
        name: 'Solflare',
        id: 'solflare',
        icon: '☀️',
        installed: !!(window as WindowWithProviders).solflare,
        connected: false
      }
    ]

    setWallets(walletList)
  }

  const connectWallet = async (wallet: WalletInfo) => {
    if (!wallet.installed && wallet.id !== 'walletconnect') {
      toast.error(`${wallet.name} is not installed. Please install it first.`)
      return
    }

    setIsLoading(true)

    try {
      let address = ''
      let balance = ''

      switch (wallet.id) {
        case 'metamask':
          if ((window as WindowWithProviders).ethereum) {
            const accounts = await (window as WindowWithProviders).ethereum!.request({
              method: 'eth_requestAccounts'
            }) as string[]
            address = accounts[0]
            
            const balanceWei = await (window as WindowWithProviders).ethereum!.request({
              method: 'eth_getBalance',
              params: [address, 'latest']
            }) as string
            balance = (parseInt(balanceWei, 16) / 10**18).toFixed(4) + ' ETH'
          }
          break

        case 'coinbase':
          if ((window as WindowWithProviders).ethereum?.isCoinbaseWallet) {
            const accounts = await (window as WindowWithProviders).ethereum!.request({
              method: 'eth_requestAccounts'
            }) as string[]
            address = accounts[0]
            balance = '--- ETH'
          }
          break

        case 'phantom':
          if ((window as WindowWithProviders).solana?.isPhantom) {
            const response = await (window as WindowWithProviders).solana!.connect()
            address = response.publicKey.toString()
            balance = '--- SOL'
          }
          break

        case 'walletconnect':
          // For demo purposes - in real app you'd use WalletConnect SDK
          toast.info('WalletConnect integration would be implemented here with QR code scanner')
          return

        default:
          toast.info(`${wallet.name} connection logic would be implemented here`)
          return
      }

      // Update wallet state
      setWallets(prev => prev.map(w => 
        w.id === wallet.id 
          ? { ...w, connected: true, address, balance }
          : { ...w, connected: false } // Disconnect others for demo
      ))

      toast.success(`🎉 Connected to ${wallet.name}!`, {
        description: `Address: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      })

    } catch (error) {
      console.error('Wallet connection error:', error)
      toast.error(`Failed to connect to ${wallet.name}`)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = (wallet: WalletInfo) => {
    setWallets(prev => prev.map(w => 
      w.id === wallet.id 
        ? { ...w, connected: false, address: undefined, balance: undefined }
        : w
    ))
    toast.success(`Disconnected from ${wallet.name}`)
  }

  const connectedWallet = wallets.find(w => w.connected)

  return (
    <Card className="border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Wallet className="h-6 w-6" />
          Multi-Wallet Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectedWallet ? (
          <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{connectedWallet.icon}</span>
                  <span className="font-medium text-green-400">{connectedWallet.name}</span>
                  <Badge className="bg-green-600">Connected</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {connectedWallet.address?.substring(0, 6)}...
                  {connectedWallet.address?.substring(connectedWallet.address.length - 4)}
                </p>
                {connectedWallet.balance && (
                  <p className="text-sm font-medium">{connectedWallet.balance}</p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => disconnectWallet(connectedWallet)}
              >
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 font-medium">No wallet connected</p>
            <p className="text-sm text-muted-foreground">
              Connect your wallet to access GAIA token features
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`p-4 rounded-lg border ${
                wallet.connected
                  ? 'border-green-500/50 bg-green-900/20'
                  : wallet.installed
                  ? 'border-blue-500/30 bg-blue-900/10'
                  : 'border-gray-500/30 bg-gray-900/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{wallet.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{wallet.name}</span>
                      {wallet.connected && <CheckCircle className="h-4 w-4 text-green-400" />}
                      {!wallet.installed && wallet.id !== 'walletconnect' && (
                        <AlertCircle className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {wallet.connected
                        ? 'Connected'
                        : wallet.installed || wallet.id === 'walletconnect'
                        ? 'Available'
                        : 'Not Installed'
                      }
                    </p>
                  </div>
                </div>
                
                {wallet.connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnectWallet(wallet)}
                  >
                    Disconnect
                  </Button>
                ) : wallet.installed || wallet.id === 'walletconnect' ? (
                  <Button
                    size="sm"
                    onClick={() => connectWallet(wallet)}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Connect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const urls: Record<string, string> = {
                        metamask: 'https://metamask.io/download/',
                        coinbase: 'https://www.coinbase.com/wallet',
                        trust: 'https://trustwallet.com/download',
                        phantom: 'https://phantom.app/download'
                      }
                      window.open(urls[wallet.id], '_blank')
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Install
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
          <h4 className="font-medium text-purple-400 mb-2">🌍 GAIA Token Integration</h4>
          <p className="text-sm text-muted-foreground">
            Once connected, your wallet will integrate with GAIA token earning system, 
            fuel discount rewards, and all ecosystem features.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
