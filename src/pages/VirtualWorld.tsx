
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Globe, Users, Gamepad2, TreePine, Zap, Crown, Flame, Eye, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

const VirtualWorld = () => {
  const [worldStats, setWorldStats] = useState({
    activeUsers: 1247,
    worldsCreated: 8392,
    dragonsActive: 25,
    ecosystemHealth: 95,
    creativityIndex: 88,
    gaiaEnergy: 99
  })

  const [isWorldActive, setIsWorldActive] = useState(true)

  useEffect(() => {
    const updateWorldStats = () => {
      setWorldStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10),
        worldsCreated: prev.worldsCreated + Math.floor(Math.random() * 5),
        dragonsActive: prev.dragonsActive + Math.floor(Math.random() * 3),
        ecosystemHealth: Math.min(100, prev.ecosystemHealth + Math.random() * 2),
        creativityIndex: Math.min(100, prev.creativityIndex + Math.random() * 1.5),
        gaiaEnergy: Math.min(100, prev.gaiaEnergy + Math.random() * 0.5)
      }))
    }

    const interval = setInterval(updateWorldStats, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleEnterWorld = () => {
    toast.success('🌍 Entering Official GAiA Virtual World!', {
      description: 'Loading your personalized dragon-powered metaverse experience...',
      duration: 4000
    })
  }

  const handleCreateWorld = () => {
    toast.success('🏗️ World Creation Started!', {
      description: 'Your new Official GAiA world is being crafted with dragon magic...',
      duration: 4000
    })
  }

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('Official GAiA Wallet Address Copied!', {
      description: 'Official GAiA wallet address copied to clipboard',
      duration: 3000
    })
  }

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('Official GAiA Contract Address Copied!', {
      description: 'Official GAiA contract address copied to clipboard',
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            🌍 Official GAiA Virtual World
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Explore infinite landscapes powered by dragon technology and environmental harmony
          </p>
          
          {/* Official GAiA Token Info */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 max-w-4xl mx-auto mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-400">
                    <strong>Official GAiA Wallet:</strong> 
                    <code className="font-mono text-xs block mt-1 break-all">{GAIA_TOKEN.WALLET_ADDRESS}</code>
                  </div>
                  <Button 
                    onClick={copyWalletAddress}
                    variant="outline" 
                    size="sm"
                    className="border-blue-500/30 text-blue-400"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-purple-400">
                    <strong>Official GAiA Contract:</strong> 
                    <code className="font-mono text-xs block mt-1 break-all">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
                  </div>
                  <Button 
                    onClick={copyContractAddress}
                    variant="outline" 
                    size="sm"
                    className="border-purple-500/30 text-purple-400"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button onClick={handleEnterWorld} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg">
              <Globe className="h-5 w-5 mr-2" />
              Enter Virtual World
            </Button>
            <Button onClick={handleCreateWorld} variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-3 text-lg">
              <TreePine className="h-5 w-5 mr-2" />
              Create New World
            </Button>
          </div>
        </div>

        {/* Live World Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{worldStats.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="pt-6 text-center">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{worldStats.worldsCreated.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Worlds Created</div>
            </CardContent>
          </Card>
          
          <Card className="border-red-500/30 bg-red-900/20">
            <CardContent className="pt-6 text-center">
              <Flame className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{worldStats.dragonsActive}</div>
              <div className="text-sm text-muted-foreground">Dragons Active</div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="pt-6 text-center">
              <TreePine className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{worldStats.ecosystemHealth}%</div>
              <div className="text-sm text-muted-foreground">Ecosystem Health</div>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="pt-6 text-center">
              <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{worldStats.creativityIndex}%</div>
              <div className="text-sm text-muted-foreground">Creativity Index</div>
            </CardContent>
          </Card>
          
          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardContent className="pt-6 text-center">
              <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{worldStats.gaiaEnergy}%</div>
              <div className="text-sm text-muted-foreground">GAiA Energy</div>
            </CardContent>
          </Card>
        </div>

        {/* World Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-400">
                <TreePine className="h-6 w-6" />
                Dragon-Powered Landscapes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create infinite worlds with our dragon-powered landscape engine. Build forests, oceans, mountains, and mystical realms using Official GAiA tokens.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>World Generation</span>
                  <span className="text-green-400">Active</span>
                </div>
                <Progress value={95} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Dragon Magic Integration</span>
                  <span className="text-green-400">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-400">
                <Gamepad2 className="h-6 w-6" />
                Environmental Gaming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Play games that help real-world environmental projects. Every action in the virtual world contributes to Earth's healing through Official GAiA token burns.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-green-600 text-white">
                  <TreePine className="h-3 w-3 mr-1" />
                  Eco-Gaming
                </Badge>
                <Badge className="bg-blue-600 text-white">
                  <Globe className="h-3 w-3 mr-1" />
                  Real Impact
                </Badge>
                <Badge className="bg-purple-600 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Dragon Rewards
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Virtual World Preview */}
        <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-center text-cyan-400 text-2xl">
              🌟 Virtual World Preview - Official GAiA Dragon Realm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30 rounded-lg border border-cyan-500/20 flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🐉🌍✨</div>
                <div className="text-xl text-cyan-400 font-bold mb-2">Official GAiA Dragon-Powered Metaverse</div>
                <div className="text-sm text-muted-foreground">
                  Immersive 3D worlds with real environmental impact powered by {GAIA_TOKEN.SYMBOL}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
                <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="font-bold text-green-400">Forest Sanctuaries</div>
                <div className="text-sm text-muted-foreground">Plant virtual trees that fund real reforestation via GAiA burns</div>
              </div>
              
              <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
                <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="font-bold text-blue-400">Ocean Depths</div>
                <div className="text-sm text-muted-foreground">Explore underwater realms while cleaning real oceans via GAiA token burns</div>
              </div>
              
              <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
                <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="font-bold text-purple-400">Sky Kingdoms</div>
                <div className="text-sm text-muted-foreground">Build floating cities powered by renewable energy and GAiA tokens</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VirtualWorld
