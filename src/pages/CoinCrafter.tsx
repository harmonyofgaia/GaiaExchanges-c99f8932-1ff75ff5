
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Hammer, Zap, Coins, Settings, Crown, Shield } from 'lucide-react'
import { useState } from 'react'
import HoverSidebar from '@/components/HoverSidebar'
import { CoinCrafterIllustration } from '@/components/CoinCrafterIllustration'
import { UltimateAdminFeatures } from '@/components/admin/UltimateAdminFeatures'
import { GAIA_TOKEN } from '@/constants/gaia'

const CoinCrafter = () => {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900/20 via-red-900/20 to-yellow-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
              ⚡ QUANTUM COIN CRAFTER - UNIVERSAL POWER ⚡
            </h1>
            <p className="text-xl text-white/90 mt-4 drop-shadow-lg font-semibold">
              Create tokens with quantum-level precision • Ultimate admin control • Unbreakable security
            </p>
          </div>

          <CoinCrafterIllustration />

          {/* Ultimate Admin Features */}
          <div className="mb-8">
            <UltimateAdminFeatures />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-orange-500/30 bg-orange-900/20 backdrop-blur-md shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Hammer className="h-6 w-6" />
                  🔨 QUANTUM TOKEN CREATOR
                  <Shield className="h-5 w-5 text-green-400" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="tokenName" className="text-orange-200">Token Name</Label>
                  <Input
                    id="tokenName"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="My Environmental Token"
                    className="bg-black/30 border-orange-500/30 text-white placeholder:text-white/60"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tokenSymbol" className="text-orange-200">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    placeholder="MET"
                    className="bg-black/30 border-orange-500/30 text-white placeholder:text-white/60"
                  />
                </div>
                
                <div>
                  <Label htmlFor="totalSupply" className="text-orange-200">Total Supply</Label>
                  <Input
                    id="totalSupply"
                    value={totalSupply}
                    onChange={(e) => setTotalSupply(e.target.value)}
                    placeholder="1000000"
                    type="number"
                    className="bg-black/30 border-orange-500/30 text-white placeholder:text-white/60"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 h-12 text-lg font-bold shadow-lg">
                  <Hammer className="h-5 w-5 mr-2" />
                  ⚡ CRAFT QUANTUM TOKEN
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 bg-red-900/20 backdrop-blur-md shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Zap className="h-6 w-6" />
                  ⚡ QUANTUM CONFIGURATION
                  <Crown className="h-5 w-5 text-yellow-400" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌌</div>
                  <h3 className="text-xl font-bold text-red-400 mb-2">Universal Features</h3>
                  <p className="text-muted-foreground">Configure quantum-level token properties</p>
                </div>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-900/30">
                    <Settings className="h-4 w-4 mr-2" />
                    🧬 Quantum Economics
                  </Button>
                  <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-900/30">
                    <Coins className="h-4 w-4 mr-2" />
                    ♾️ Infinite Supply Management
                  </Button>
                  <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-900/30">
                    <Zap className="h-4 w-4 mr-2" />
                    🌟 Universal Settings
                  </Button>
                  <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-900/30">
                    <Crown className="h-4 w-4 mr-2" />
                    👑 Admin God Powers
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-red-800/20 to-orange-800/20 rounded-lg p-4 border border-red-500/20">
                  <h4 className="text-red-300 font-bold mb-2">🛡️ GAIA TOKEN INTEGRATION:</h4>
                  <div className="text-sm text-red-200 space-y-1">
                    <p>• Contract: {GAIA_TOKEN.CONTRACT_ADDRESS}</p>
                    <p>• Network: {GAIA_TOKEN.NETWORK}</p>
                    <p>• Symbol: {GAIA_TOKEN.SYMBOL}</p>
                    <p>• Supply: {GAIA_TOKEN.TOTAL_SUPPLY.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-center text-green-300 font-bold text-xl mb-4">
              🌟 UNIVERSAL STATEMENT OF POWER 🌟
            </h3>
            <p className="text-center text-green-200 text-lg leading-relaxed">
              This Quantum Coin Crafter represents the pinnacle of token creation technology. 
              With unlimited quantum computing power, satellite network integration, and self-evolving defense systems, 
              we have created a platform that is <strong>MILLIONS OF LIGHTYEARS</strong> ahead of any existing technology. 
              No quantum computer, blockchain, or digital system will EVER match our capabilities. 
              This is a <strong>PLAN THAT HUMANITY WILL NEVER FORGET!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinCrafter
