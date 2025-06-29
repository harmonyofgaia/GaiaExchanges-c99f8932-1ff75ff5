
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  TreePine, 
  Mountain, 
  Waves, 
  Sun, 
  Moon, 
  Cloud, 
  Zap, 
  Flame,
  Snowflake,
  Leaf,
  Star,
  Plus,
  Save,
  Eye,
  Palette,
  Coins,
  Users,
  Trophy,
  Download,
  Upload,
  Share
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

interface LandscapeElement {
  id: string
  type: 'tree' | 'mountain' | 'water' | 'fire' | 'ice' | 'lightning' | 'nature' | 'dragon'
  x: number
  y: number
  size: 'small' | 'medium' | 'large'
  power: number
  animation?: string
}

interface SavedLandscape {
  id: string
  name: string
  creator: string
  elements: LandscapeElement[]
  totalPower: number
  rating: number
  downloads: number
  featured: boolean
}

const LandscapeBuilder = () => {
  const [landscapeName, setLandscapeName] = useState<string>('')
  const [selectedTool, setSelectedTool] = useState<string>('tree')
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [elements, setElements] = useState<LandscapeElement[]>([])
  const [totalPower, setTotalPower] = useState<number>(0)
  const [isBuilding, setIsBuilding] = useState<boolean>(false)
  const [playerTokens, setPlayerTokens] = useState<number>(5847)
  const [viewMode, setViewMode] = useState<'build' | 'gallery'>('build')

  const tools = [
    { id: 'tree', name: 'Ancient Trees', icon: TreePine, color: 'text-green-400', power: 25, cost: 5 },
    { id: 'mountain', name: 'Mystic Mountains', icon: Mountain, color: 'text-gray-400', power: 50, cost: 10 },
    { id: 'water', name: 'Sacred Waters', icon: Waves, color: 'text-blue-400', power: 35, cost: 7 },
    { id: 'fire', name: 'Dragon Fire', icon: Flame, color: 'text-red-400', power: 75, cost: 15 },
    { id: 'ice', name: 'Frozen Crystals', icon: Snowflake, color: 'text-cyan-400', power: 40, cost: 8 },
    { id: 'lightning', name: 'Thunder Strikes', icon: Zap, color: 'text-yellow-400', power: 60, cost: 12 },
    { id: 'nature', name: 'Life Force', icon: Leaf, color: 'text-emerald-400', power: 30, cost: 6 },
    { id: 'dragon', name: 'Dragon Essence', icon: Star, color: 'text-purple-400', power: 100, cost: 25 }
  ]

  const featuredLandscapes: SavedLandscape[] = [
    {
      id: '1',
      name: 'Dragon\'s Sanctuary',
      creator: 'EcoWarrior47',
      elements: [],
      totalPower: 850,
      rating: 4.9,
      downloads: 1247,
      featured: true
    },
    {
      id: '2',
      name: 'Crystal Ocean',
      creator: 'OceanGuardian',
      elements: [],
      totalPower: 620,
      rating: 4.7,
      downloads: 892,
      featured: true
    },
    {
      id: '3',
      name: 'Thunder Valley',
      creator: 'StormMaster',
      elements: [],
      totalPower: 745,
      rating: 4.8,
      downloads: 1156,
      featured: true
    },
    {
      id: '4',
      name: 'Harmony Gardens',
      creator: 'GaiaBuilder',
      elements: [],
      totalPower: 590,
      rating: 4.6,
      downloads: 734,
      featured: false
    }
  ]

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool || !landscapeName.trim()) {
      toast.error('Please enter a landscape name and select a tool first!')
      return
    }

    const tool = tools.find(t => t.id === selectedTool)
    if (!tool) return

    if (playerTokens < tool.cost) {
      toast.error(`Insufficient tokens! Need ${tool.cost} GAIA tokens.`)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    const newElement: LandscapeElement = {
      id: `${selectedTool}-${Date.now()}`,
      type: selectedTool as any,
      x,
      y,
      size: selectedSize,
      power: tool.power * (selectedSize === 'large' ? 1.5 : selectedSize === 'small' ? 0.7 : 1),
      animation: selectedTool === 'fire' ? 'animate-pulse' : selectedTool === 'lightning' ? 'animate-bounce' : undefined
    }

    setElements(prev => [...prev, newElement])
    setTotalPower(prev => prev + newElement.power)
    setPlayerTokens(prev => prev - tool.cost)
    
    toast.success(`Added ${tool.name}!`, {
      description: `Power: +${newElement.power} | Tokens: -${tool.cost} | Total Power: ${totalPower + newElement.power}`,
      duration: 3000
    })
  }

  const removeElement = (elementId: string) => {
    const element = elements.find(e => e.id === elementId)
    if (element) {
      const tool = tools.find(t => t.id === element.type)
      if (tool) {
        setElements(prev => prev.filter(e => e.id !== elementId))
        setTotalPower(prev => prev - element.power)
        setPlayerTokens(prev => prev + Math.floor(tool.cost * 0.5)) // Refund 50%
        toast.success('Element removed! 50% tokens refunded.')
      }
    }
  }

  const clearLandscape = () => {
    const refund = Math.floor(elements.reduce((sum, element) => {
      const tool = tools.find(t => t.id === element.type)
      return sum + (tool ? tool.cost * 0.3 : 0) // 30% refund for clearing
    }, 0))
    
    setElements([])
    setTotalPower(0)
    setPlayerTokens(prev => prev + refund)
    toast.success(`Landscape cleared! ${refund} tokens refunded.`)
  }

  const saveLandscape = () => {
    if (!landscapeName.trim()) {
      toast.error('Please enter a landscape name!')
      return
    }

    if (elements.length === 0) {
      toast.error('Please add some elements to your landscape!')
      return
    }

    const saveCost = Math.max(50, Math.floor(totalPower * 0.1))
    if (playerTokens < saveCost) {
      toast.error(`Insufficient tokens! Need ${saveCost} GAIA tokens to save.`)
      return
    }

    setIsBuilding(true)
    setPlayerTokens(prev => prev - saveCost)
    
    setTimeout(() => {
      toast.success(`🌍 "${landscapeName}" Created!`, {
        description: `Landscape saved with ${elements.length} elements and ${totalPower} total power. Cost: ${saveCost} GAIA tokens.`,
        duration: 5000
      })
      setIsBuilding(false)
    }, 2000)
  }

  const downloadLandscape = (landscape: SavedLandscape) => {
    const downloadCost = 25
    if (playerTokens < downloadCost) {
      toast.error(`Need ${downloadCost} GAIA tokens to download!`)
      return
    }
    
    setPlayerTokens(prev => prev - downloadCost)
    toast.success(`Downloaded "${landscape.name}"!`, {
      description: `Now available in your collection. Cost: ${downloadCost} GAIA tokens.`,
      duration: 3000
    })
  }

  const previewLandscape = () => {
    toast.success('🔮 Landscape Preview Mode', {
      description: `Viewing "${landscapeName}" with ${elements.length} elements in full 3D mode`,
      duration: 3000
    })
  }

  const getElementIcon = (type: string) => {
    const tool = tools.find(t => t.id === type)
    return tool ? tool.icon : TreePine
  }

  const getElementColor = (type: string) => {
    const tool = tools.find(t => t.id === type)
    return tool ? tool.color : 'text-green-400'
  }

  const getBattleRating = (power: number) => {
    if (power > 1000) return { rating: 'Legendary', color: 'text-orange-400' }
    if (power > 700) return { rating: 'Epic', color: 'text-purple-400' }
    if (power > 400) return { rating: 'Rare', color: 'text-blue-400' }
    if (power > 150) return { rating: 'Uncommon', color: 'text-green-400' }
    return { rating: 'Common', color: 'text-gray-400' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-brown-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🏗️ GAIA LANDSCAPE BUILDER & GALLERY
          </h1>
          <p className="text-muted-foreground mb-4">
            Build, share, and explore virtual landscapes for epic battles and exploration
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 max-w-2xl mx-auto mb-6">
            <div className="text-sm text-green-400">
              <strong>Powered by GAIA:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
            </div>
            <div className="text-sm text-blue-400 mt-1">
              <strong>Wallet:</strong> <code className="font-mono text-xs">{GAIA_TOKEN.WALLET_ADDRESS}</code>
            </div>
          </div>
          
          {/* Mode Switch */}
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant={viewMode === 'build' ? 'default' : 'outline'}
              onClick={() => setViewMode('build')}
              className={viewMode === 'build' ? 'bg-green-600' : ''}
            >
              <Palette className="h-4 w-4 mr-2" />
              Builder Mode
            </Button>
            <Button
              variant={viewMode === 'gallery' ? 'default' : 'outline'}
              onClick={() => setViewMode('gallery')}
              className={viewMode === 'gallery' ? 'bg-blue-600' : ''}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Gallery Mode
            </Button>
          </div>
        </div>

        {viewMode === 'build' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tools Panel */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Building Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Landscape Name</label>
                    <Input
                      placeholder="Enter landscape name..."
                      value={landscapeName}
                      onChange={(e) => setLandscapeName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Element Size</label>
                    <div className="grid grid-cols-3 gap-1">
                      {['small', 'medium', 'large'].map((size) => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? 'default' : 'outline'}
                          onClick={() => setSelectedSize(size as any)}
                          className={`text-xs ${selectedSize === size ? 'bg-blue-600' : ''}`}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Tool</label>
                    <div className="grid grid-cols-1 gap-2">
                      {tools.map((tool) => {
                        const IconComponent = tool.icon
                        const canAfford = playerTokens >= tool.cost
                        return (
                          <Button
                            key={tool.id}
                            variant={selectedTool === tool.id ? "default" : "outline"}
                            className={`justify-start ${selectedTool === tool.id ? 'bg-green-600' : ''} ${!canAfford ? 'opacity-50' : ''}`}
                            onClick={() => setSelectedTool(tool.id)}
                            disabled={!canAfford}
                          >
                            <IconComponent className={`h-4 w-4 mr-2 ${tool.color}`} />
                            <span className="text-xs flex-1 text-left">{tool.name}</span>
                            <div className="flex items-center gap-1">
                              <Badge className="text-xs">+{tool.power}</Badge>
                              <Badge className="text-xs bg-yellow-600">
                                <Coins className="h-2 w-2 mr-1" />
                                {tool.cost}
                              </Badge>
                            </div>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Landscape Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Your Tokens:</span>
                    <span className="text-yellow-400 font-bold flex items-center gap-1">
                      <Coins className="h-3 w-3" />
                      {playerTokens}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Elements:</span>
                    <span className="text-green-400 font-bold">{elements.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Power:</span>
                    <span className="text-yellow-400 font-bold">{Math.floor(totalPower)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Battle Rating:</span>
                    <span className={`font-bold ${getBattleRating(totalPower).color}`}>
                      {getBattleRating(totalPower).rating}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button onClick={clearLandscape} variant="outline" className="w-full">
                  Clear All
                </Button>
                <Button onClick={previewLandscape} variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  onClick={saveLandscape} 
                  disabled={isBuilding}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isBuilding ? (
                    <>Building...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Landscape
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Canvas */}
            <div className="lg:col-span-3">
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
                <CardHeader>
                  <CardTitle className="text-green-400">
                    🌍 {landscapeName || 'Unnamed Landscape'} - Canvas
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Click anywhere on the canvas to place your selected tool. Right-click elements to remove them.
                  </p>
                </CardHeader>
                <CardContent>
                  <div 
                    className="relative w-full h-96 bg-gradient-to-b from-sky-900/30 via-green-900/30 to-brown-900/30 border-2 border-dashed border-green-500/30 rounded-lg cursor-crosshair overflow-hidden"
                    onClick={handleCanvasClick}
                  >
                    {/* Background Elements */}
                    <div className="absolute inset-0 opacity-10">
                      <Sun className="absolute top-4 right-4 h-8 w-8 text-yellow-400 animate-pulse" />
                      <Cloud className="absolute top-8 left-1/4 h-6 w-6 text-gray-300" />
                      <Cloud className="absolute top-12 right-1/3 h-4 w-4 text-gray-300" />
                      <Moon className="absolute top-6 left-1/2 h-6 w-6 text-blue-300 opacity-50" />
                    </div>

                    {/* Placed Elements */}
                    {elements.map((element) => {
                      const IconComponent = getElementIcon(element.type)
                      const sizeClass = element.size === 'large' ? 'h-8 w-8' : element.size === 'small' ? 'h-4 w-4' : 'h-6 w-6'
                      return (
                        <div
                          key={element.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                          style={{
                            left: `${element.x}%`,
                            top: `${element.y}%`
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault()
                            removeElement(element.id)
                          }}
                        >
                          <IconComponent 
                            className={`${sizeClass} ${getElementColor(element.type)} drop-shadow-lg ${element.animation || ''}`}
                          />
                        </div>
                      )
                    })}

                    {/* Grid Lines */}
                    <div className="absolute inset-0 opacity-5">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={`v-${i}`} className="absolute bg-white w-px h-full" style={{ left: `${i * 10}%` }} />
                      ))}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={`h-${i}`} className="absolute bg-white h-px w-full" style={{ top: `${i * 12.5}%` }} />
                      ))}
                    </div>

                    {/* Instructions Overlay */}
                    {elements.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Click to place elements</p>
                          <p className="text-sm">Build your mystical landscape</p>
                          <p className="text-xs mt-2">Right-click to remove elements</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Gallery Mode */
          <div className="space-y-6">
            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  🏆 Featured Landscapes Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredLandscapes.map((landscape) => (
                    <Card key={landscape.id} className="border-border/50 hover:border-green-500/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{landscape.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">by {landscape.creator}</p>
                          </div>
                          {landscape.featured && (
                            <Badge className="bg-orange-600 text-white">
                              <Star className="h-2 w-2 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="h-32 bg-gradient-to-b from-sky-900/30 via-green-900/30 to-brown-900/30 rounded border border-border/30 flex items-center justify-center">
                          <div className="text-4xl opacity-50">🌍</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Power:</span>
                            <span className="text-yellow-400 font-bold">{landscape.totalPower}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Rating:</span>
                            <span className="text-green-400 font-bold">⭐ {landscape.rating}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Downloads:</span>
                            <span className="text-blue-400 font-bold">{landscape.downloads}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            onClick={() => downloadLandscape(landscape)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  🌟 Community Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">2,547</div>
                    <div className="text-sm text-muted-foreground">Total Landscapes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">847</div>
                    <div className="text-sm text-muted-foreground">Active Builders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">15,420</div>
                    <div className="text-sm text-muted-foreground">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">98.2%</div>
                    <div className="text-sm text-muted-foreground">User Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default LandscapeBuilder
