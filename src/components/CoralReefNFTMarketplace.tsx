
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Coins, 
  Heart, 
  Eye, 
  ShoppingCart, 
  Waves, 
  Fish,
  Star,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'

export function CoralReefNFTMarketplace() {
  const [availableNFTs, setAvailableNFTs] = useState(1000000)
  const [soldNFTs, setSoldNFTs] = useState(0)
  const [pricePerNFT] = useState(1) // 1 GAiA token = 1 NFT
  const [purchaseAmount, setPurchaseAmount] = useState('')
  const [totalViews, setTotalViews] = useState(1247)

  // Simulate marketplace activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Random sales simulation
      if (Math.random() < 0.3 && availableNFTs > 0) {
        const randomSale = Math.floor(Math.random() * 5) + 1
        setAvailableNFTs(prev => Math.max(0, prev - randomSale))
        setSoldNFTs(prev => prev + randomSale)
        setTotalViews(prev => prev + Math.floor(Math.random() * 20) + 5)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [availableNFTs])

  const handlePurchase = () => {
    const amount = parseInt(purchaseAmount)
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (amount > availableNFTs) {
      toast.error(`Only ${availableNFTs.toLocaleString()} NFTs available`)
      return
    }

    // Simulate purchase
    setAvailableNFTs(prev => prev - amount)
    setSoldNFTs(prev => prev + amount)
    setPurchaseAmount('')
    
    toast.success(`🪸 Successfully purchased ${amount} Coral Reef NFT${amount > 1 ? 's' : ''}!`, {
      description: `Cost: ${amount} GAiA tokens. You're helping restore coral reefs worldwide!`,
      duration: 5000
    })
  }

  return (
    <div className="space-y-6">
      {/* NFT Header */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400 text-center justify-center">
            <div className="text-6xl animate-pulse">🪸</div>
            <div>
              <h2 className="text-3xl">CORAL REEF RESTORATION NFT</h2>
              <p className="text-lg text-cyan-300">Sound Riffs Re Grau dio Collection</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {/* Impressive Coral Reef Logo/Art */}
            <div className="relative bg-gradient-to-b from-cyan-400/20 to-blue-600/20 rounded-lg p-8 border border-cyan-500/30">
              <div className="text-8xl animate-bounce mb-4">🪸</div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse rounded-lg"></div>
              <div className="flex justify-center gap-2 text-4xl">
                <span className="animate-pulse">🐠</span>
                <span className="animate-bounce delay-100">🦈</span>
                <span className="animate-pulse delay-200">🦑</span>
                <span className="animate-bounce delay-300">🐢</span>
                <span className="animate-pulse delay-500">🦭</span>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-2xl font-bold text-cyan-400">🎵 SAVE THE REEF 🎵</h3>
                <p className="text-cyan-300">Underwater Audio Restoration Technology</p>
                <div className="flex justify-center gap-4 text-lg">
                  <span className="animate-pulse">🌊</span>
                  <span className="animate-bounce">🎵</span>
                  <span className="animate-pulse">🪸</span>
                  <span className="animate-bounce">🔊</span>
                  <span className="animate-pulse">🌊</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">{availableNFTs.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Available NFTs</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{soldNFTs.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Sold</div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{pricePerNFT} GAiA</div>
                <div className="text-sm text-muted-foreground">Price Each</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{totalViews.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <ShoppingCart className="h-6 w-6" />
              Purchase Coral Reef NFTs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of NFTs to Purchase</label>
              <Input
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                placeholder="Enter amount..."
                min="1"
                max={availableNFTs}
              />
              <p className="text-sm text-muted-foreground">
                Cost: {purchaseAmount ? parseInt(purchaseAmount) * pricePerNFT : 0} GAiA tokens
              </p>
            </div>
            
            <Button 
              onClick={handlePurchase}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              disabled={!purchaseAmount || parseInt(purchaseAmount) <= 0}
            >
              <Coins className="h-4 w-4 mr-2" />
              Buy Coral Reef NFTs
            </Button>
            
            <div className="text-center text-sm text-cyan-400">
              🪸 Every purchase directly funds coral reef restoration!
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Waves className="h-6 w-6" />
              NFT Benefits & Utility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-sm">Directly funds coral reef restoration</span>
              </div>
              <div className="flex items-center gap-2">
                <Fish className="h-4 w-4 text-cyan-400" />
                <span className="text-sm">Helps marine life return to restored reefs</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-400" />
                <span className="text-sm">Supports global ocean ecosystem recovery</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span className="text-sm">Join exclusive conservation community</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Rare collectible with environmental impact</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-400" />
                <span className="text-sm">Potential value appreciation</span>
              </div>
            </div>
            
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
              <h4 className="font-bold text-cyan-400 mb-2">🎵 Special Features:</h4>
              <div className="text-sm space-y-1">
                <div>• Access to underwater audio recordings</div>
                <div>• Progress updates from reef sites</div>
                <div>• Exclusive marine life photography</div>
                <div>• Community voting on new reef locations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Impact */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Waves className="h-6 w-6" />
            Real-World Impact of Your Purchase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl">🔊</div>
              <h4 className="font-bold text-cyan-400">Audio Technology</h4>
              <p className="text-sm text-muted-foreground">
                Balanced underwater sound signals attract marine life and stimulate coral growth
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">🐠</div>
              <h4 className="font-bold text-blue-400">Marine Life Recovery</h4>
              <p className="text-sm text-muted-foreground">
                Fish and sea creatures return to restored reef areas, rebuilding the ecosystem
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">🌊</div>
              <h4 className="font-bold text-green-400">Ocean Health</h4>
              <p className="text-sm text-muted-foreground">
                Healthy coral reefs protect coastlines and support global ocean biodiversity
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">🎵 "Seeds Will Form Into Music" 🎵</h3>
              <p className="text-muted-foreground">
                Every NFT purchase creates harmony in our oceans, turning the sounds of restoration into the music of life. 
                Your contribution helps rebuild the underwater symphony that nature intended.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
