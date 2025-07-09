
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Shield, Zap, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletConnectionModal({ isOpen, onClose }: WalletConnectionModalProps) {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const wallets = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect using MetaMask wallet',
      supported: ['ETH', 'GAIA', 'BNB'],
      color: 'bg-orange-600'
    },
    {
      name: 'Phantom',
      icon: '👻',
      description: 'Connect using Phantom wallet',
      supported: ['SOL', 'GAIA'],
      color: 'bg-purple-600'
    },
    {
      name: 'Solflare',
      icon: '☀️',
      description: 'Connect using Solflare wallet',
      supported: ['SOL', 'GAIA'],
      color: 'bg-yellow-600'
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Connect using WalletConnect protocol',
      supported: ['ETH', 'GAIA', 'BNB', 'MATIC'],
      color: 'bg-blue-600'
    },
    {
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Connect using Trust Wallet',
      supported: ['ETH', 'BNB', 'GAIA'],
      color: 'bg-cyan-600'
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Connect using Coinbase Wallet',
      supported: ['ETH', 'GAIA', 'USDC'],
      color: 'bg-indigo-600'
    }
  ]

  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true)
    
    try {
      // Simulate wallet connection process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setConnectedWallet(walletName)
      toast.success(`🔗 ${walletName} Connected Successfully!`, {
        description: 'Your wallet is now connected to GAiA Platform',
        duration: 5000
      })
      
      console.log(`🔗 ${walletName} WALLET CONNECTED`)
      console.log('🛡️ QUANTUM SECURITY PROTOCOLS ACTIVATED')
      
    } catch (error) {
      toast.error('Connection Failed', {
        description: 'Please try again or use a different wallet',
        duration: 3000
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    setConnectedWallet(null)
    toast.info('Wallet Disconnected', {
      description: 'Your wallet has been safely disconnected',
      duration: 3000
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-400">
            🔗 Connect Your Wallet to GAiA Platform
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Connect your wallet to access trading, swapping, and premium features
          </p>
        </DialogHeader>

        {connectedWallet ? (
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                ✅ {connectedWallet} Connected!
              </h3>
              <p className="text-green-300 mb-4">
                Your wallet is securely connected to GAiA Platform
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={onClose}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Start Trading
                </Button>
                <Button 
                  onClick={handleDisconnect}
                  variant="outline"
                  className="border-red-500/30"
                >
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wallets.map((wallet) => (
              <Card key={wallet.name} className="border-purple-500/20 bg-gray-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${wallet.color} flex items-center justify-center text-2xl`}>
                      {wallet.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{wallet.name}</h3>
                      <p className="text-sm text-muted-foreground">{wallet.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {wallet.supported.map((token) => (
                      <Badge key={token} className="bg-blue-600 text-xs">
                        {token}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => handleWalletConnect(wallet.name)}
                    disabled={isConnecting}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    {isConnecting ? 'Connecting...' : `Connect ${wallet.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-green-400" />
            <h4 className="font-bold text-green-400">🛡️ Quantum Security Features</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-300">
            <div>• Multi-signature protection</div>
            <div>• Quantum encryption protocols</div>
            <div>• Advanced fraud detection</div>
            <div>• Secure transaction routing</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
