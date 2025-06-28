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
  Link,
  Sword,
  Hammer,
  Mountain,
  Eye,
  Star,
  Crown,
  Gem,
  Sparkles,
  Gamepad2,
  Coins,
  ShoppingCart,
  Lock,
  Unlock
} from 'lucide-react'

interface Web3State {
  isConnected: boolean
  account: string | null
  chainId: number | null
  balance: string
  isCorrectNetwork: boolean
  gaiaTokens: number
  unlockedSecrets: string[]
  ownedTools: string[]
  powerLevel: number
}

interface GameItem {
  id: string
  name: string
  type: 'weapon' | 'tool' | 'landscape' | 'secret' | 'armor'
  price: number
  rarity: 'common' | 'rare' | 'legendary' | 'mythical' | 'quantum'
  description: string
  icon: any
  unlocked: boolean
  powerBoost: number
}

export function Web3Integration() {
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    account: null,
    chainId: null,
    balance: '0',
    isCorrectNetwork: false,
    gaiaTokens: 12500,
    unlockedSecrets: ['quantum_realm', 'time_portal'],
    ownedTools: ['harmony_builder', 'coral_restorer', 'forest_guardian'],
    powerLevel: 47
  })

  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Enhanced gaming items for Harmony of Gaia
  const gameItems: GameItem[] = [
    {
      id: 'quantum_harmonizer',
      name: 'Quantum Harmonizer',
      type: 'weapon',
      price: 500,
      rarity: 'quantum',
      description: 'Transcends reality to heal damaged ecosystems across dimensions',
      icon: Zap,
      unlocked: false,
      powerBoost: 100
    },
    {
      id: 'coral_symphony_wand',
      name: 'Coral Symphony Wand',
      type: 'tool',
      price: 250,
      rarity: 'legendary',
      description: 'Creates underwater music that attracts marine life to coral reefs',
      icon: Sparkles,
      unlocked: true,
      powerBoost: 75
    },
    {
      id: 'gaia_armor_set',
      name: 'Gaia Guardian Armor',
      type: 'armor',
      price: 750,
      rarity: 'mythical',
      description: 'Forged from recycled ocean plastic and blessed by nature spirits',
      icon: Shield,
      unlocked: false,
      powerBoost: 90
    },
    {
      id: 'infinite_landscape_brush',
      name: 'Infinite Landscape Brush',
      type: 'landscape',
      price: 300,
      rarity: 'rare',
      description: 'Paint unlimited worlds where animals roam free',
      icon: Mountain,
      unlocked: true,
      powerBoost: 60
    },
    {
      id: 'secret_dimensional_key',
      name: 'Dimensional Gateway Key',
      type: 'secret',
      price: 1000,
      rarity: 'quantum',
      description: 'Unlocks hidden dimensions where extinct species live again',
      icon: Eye,
      unlocked: false,
      powerBoost: 150
    },
    {
      id: 'harmony_sword_of_liberation',
      name: 'Sword of Animal Liberation',
      type: 'weapon',
      price: 600,
      rarity: 'legendary',
      description: 'Cuts through the chains of captivity across all realities',
      icon: Sword,
      unlocked: false,
      powerBoost: 85
    },
    {
      id: 'cosmic_building_hammer',
      name: 'Cosmic Building Hammer',
      type: 'tool',
      price: 400,
      rarity: 'rare',
      description: 'Constructs sanctuaries that exist in multiple dimensions',
      icon: Hammer,
      unlocked: false,
      powerBoost: 70
    },
    {
      id: 'quantum_crown_of_empathy',
      name: 'Crown of Universal Empathy',
      type: 'secret',
      price: 1500,
      rarity: 'quantum',
      description: 'Feel the emotions of every living being across the cosmos',
      icon: Crown,
      unlocked: false,
      powerBoost: 200
    }
  ]

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
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length > 0) {
        const account = accounts[0]
        const chainId = await (window as any).ethereum.request({
          method: 'eth_chainId'
        })

        const balance = await (window as any).ethereum.request({
          method: 'eth_getBalance',
          params: [account, 'latest']
        })

        const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18)

        setWeb3State(prev => ({
          ...prev,
          isConnected: true,
          account,
          chainId: parseInt(chainId, 16),
          balance: balanceInEth.toFixed(4),
          isCorrectNetwork: parseInt(chainId, 16) === 1
        }))

        toast.success('🎮 Gaming Wallet Connected!', {
          description: `Welcome to Harmony of Gaia Universe! ${account.slice(0, 6)}...${account.slice(-4)}`
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

  const purchaseItem = async (item: GameItem) => {
    if (!web3State.isConnected) {
      toast.error('Connect Wallet First', {
        description: 'Please connect your Web3 wallet to purchase items'
      })
      return
    }

    if (web3State.gaiaTokens < item.price) {
      toast.error('Insufficient GAIA Tokens', {
        description: `You need ${item.price} GAIA tokens but only have ${web3State.gaiaTokens}`
      })
      return
    }

    // Simulate purchase
    setWeb3State(prev => ({
      ...prev,
      gaiaTokens: prev.gaiaTokens - item.price,
      ownedTools: [...prev.ownedTools, item.id],
      powerLevel: prev.powerLevel + item.powerBoost / 10
    }))

    // Mark item as unlocked
    const updatedItems = gameItems.map(i => 
      i.id === item.id ? { ...i, unlocked: true } : i
    )

    toast.success(`🎮 ${item.name} Acquired!`, {
      description: `Power increased by ${item.powerBoost}! Your journey in Harmony of Gaia grows stronger!`
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'quantum': return 'from-purple-600 to-cyan-600'
      case 'mythical': return 'from-red-600 to-orange-600'
      case 'legendary': return 'from-yellow-600 to-amber-600'
      case 'rare': return 'from-blue-600 to-cyan-600'
      default: return 'from-gray-600 to-gray-700'
    }
  }

  const filteredItems = selectedCategory === 'all' 
    ? gameItems 
    : gameItems.filter(item => item.type === selectedCategory)

  // Disconnect wallet
  const disconnectWallet = () => {
    setWeb3State({
      isConnected: false,
      account: null,
      chainId: null,
      balance: '0',
      isCorrectNetwork: false,
      gaiaTokens: 0,
      unlockedSecrets: [],
      ownedTools: [],
      powerLevel: 0
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
    <div className="space-y-6">
      {/* Enhanced Gaming Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 via-cyan-900/30 to-green-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Gamepad2 className="h-6 w-6 text-purple-400" />
            <div className="text-3xl">🎮 HARMONY OF GAIA - QUANTUM GAMING DAPP</div>
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-cyan-400">🌍 Build • Create • Liberate • Transcend Reality</div>
            <div className="flex justify-center gap-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
                Power Level: {web3State.powerLevel}
              </Badge>
              <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <Coins className="h-4 w-4 mr-1" />
                {web3State.gaiaTokens} GAIA
              </Badge>
              <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                Tools Owned: {web3State.ownedTools.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Wallet Connection Status */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Wallet className="h-5 w-5" />
            Quantum Gaming Wallet Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isWeb3Available ? (
            <div className="text-center space-y-4 p-6 border border-orange-500/20 rounded-lg bg-orange-900/20">
              <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-orange-400">Gaming Wallet Required</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Install MetaMask or another Web3 wallet to access Harmony of Gaia gaming features
                </p>
              </div>
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Install Gaming Wallet
                </a>
              </Button>
            </div>
          ) : !web3State.isConnected ? (
            <div className="text-center space-y-4">
              <div className="p-6 border border-blue-500/20 rounded-lg bg-blue-900/20">
                <Gamepad2 className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-blue-400">Connect Gaming Wallet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect your Web3 wallet to access Harmony of Gaia universe
                </p>
              </div>
              <Button 
                onClick={connectWallet} 
                disabled={isConnecting}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-3 px-6"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnecting ? 'Connecting to Universe...' : '🚀 Connect Gaming Wallet'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-green-500/20 rounded-lg bg-green-900/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="font-semibold text-green-400">🎮 Gaming Wallet Connected</div>
                    <div className="text-sm text-muted-foreground">
                      {web3State.account?.slice(0, 6)}...{web3State.account?.slice(-4)}
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => setWeb3State(prev => ({ ...prev, isConnected: false }))}>
                  Disconnect
                </Button>
              </div>

              {/* Gaming Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
                  <div className="text-sm text-muted-foreground">Power Level</div>
                  <div className="font-semibold text-purple-400 text-2xl">{web3State.powerLevel}</div>
                </div>
                <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/20">
                  <div className="text-sm text-muted-foreground">GAIA Balance</div>
                  <div className="font-semibold text-green-400 text-2xl">{web3State.gaiaTokens}</div>
                </div>
                <div className="p-3 rounded-lg bg-cyan-900/20 border border-cyan-500/20">
                  <div className="text-sm text-muted-foreground">ETH Balance</div>
                  <div className="font-semibold text-cyan-400 text-2xl">{web3State.balance}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gaming Item Categories */}
      {web3State.isConnected && (
        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <ShoppingCart className="h-5 w-5" />
              🛡️ Harmony of Gaia - Quantum Item Store
            </CardTitle>
            <div className="flex flex-wrap gap-2 mt-4">
              {['all', 'weapon', 'tool', 'landscape', 'armor', 'secret'].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white" 
                    : "border-purple-500/30 text-purple-400 hover:bg-purple-900/20"
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className={`p-6 rounded-lg border bg-gradient-to-br ${getRarityColor(item.rarity)}/10 border-${item.rarity === 'quantum' ? 'purple' : item.rarity === 'legendary' ? 'yellow' : 'blue'}-500/20`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getRarityColor(item.rarity)}/20`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <Badge className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white text-xs`}>
                          {item.rarity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    {item.unlocked ? (
                      <Badge className="bg-green-600 text-white">
                        <Unlock className="h-3 w-3 mr-1" />
                        OWNED
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-600 text-white">
                        <Lock className="h-3 w-3 mr-1" />
                        LOCKED
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Price:</span>
                      <span className="text-yellow-400 font-bold">{item.price} GAIA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Power Boost:</span>
                      <span className="text-green-400 font-bold">+{item.powerBoost}</span>
                    </div>
                  </div>
                  
                  {!item.unlocked && (
                    <Button 
                      onClick={() => purchaseItem(item)}
                      disabled={web3State.gaiaTokens < item.price}
                      className={`w-full bg-gradient-to-r ${getRarityColor(item.rarity)} hover:opacity-80 text-white font-bold`}
                    >
                      <Coins className="h-4 w-4 mr-2" />
                      Purchase for {item.price} GAIA
                    </Button>
                  )}
                  
                  {item.unlocked && (
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold"
                      disabled
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Already Owned
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quantum Gaming Features */}
      {web3State.isConnected && (
        <Card className="border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400 text-center justify-center">
              <Sparkles className="h-6 w-6" />
              ⚡ QUANTUM GAMING FEATURES - BEYOND REALITY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
                <h4 className="text-xl font-bold text-purple-400 mb-4">🌌 Dimensional Building</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create infinite landscapes across multiple realities where animals roam free
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Mountain className="h-4 w-4 mr-2" />
                  Launch Landscape Builder
                </Button>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-900/30 to-cyan-900/30 rounded-lg border border-green-500/30">
                <h4 className="text-xl font-bold text-green-400 mb-4">🐋 Animal Liberation</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Free animals from captivity across all dimensions using quantum tools
                </p>
                <Button className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Start Liberation Mission
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
