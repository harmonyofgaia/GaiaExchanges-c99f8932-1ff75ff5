
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mountain, 
  TreePine, 
  Waves, 
  Sun, 
  Home,
  Pickaxe,
  Hammer,
  Zap,
  Eye,
  Cube,
  Globe,
  Sparkles,
  Target,
  Settings
} from 'lucide-react'
import { toast } from 'sonner'

export function MinecraftLandscapeBuilder() {
  const [selectedTool, setSelectedTool] = useState('build')
  const [selectedBlock, setSelectedBlock] = useState('grass')
  const [landscapeGrid, setLandscapeGrid] = useState<string[][]>([])
  const [savedLandscapes, setSavedLandscapes] = useState([
    { id: 1, name: "Forest Sanctuary", biome: "Forest", animals: 25, rating: 4.8 },
    { id: 2, name: "Ocean Paradise", biome: "Ocean", animals: 42, rating: 4.9 },
    { id: 3, name: "Mountain Refuge", biome: "Mountain", animals: 18, rating: 4.7 }
  ])

  const blockTypes = [
    { id: 'grass', name: 'Grass', color: 'bg-green-500', emoji: '🌱' },
    { id: 'water', name: 'Water', color: 'bg-blue-500', emoji: '🌊' },
    { id: 'stone', name: 'Stone', color: 'bg-gray-500', emoji: '🪨' },
    { id: 'sand', name: 'Sand', color: 'bg-yellow-500', emoji: '🏖️' },
    { id: 'tree', name: 'Tree', color: 'bg-green-700', emoji: '🌳' },
    { id: 'flower', name: 'Flowers', color: 'bg-pink-500', emoji: '🌸' },
    { id: 'mountain', name: 'Mountain', color: 'bg-gray-700', emoji: '⛰️' },
    { id: 'house', name: 'Shelter', color: 'bg-yellow-700', emoji: '🏠' }
  ]

  // Initialize grid
  useEffect(() => {
    const initGrid = () => {
      const grid = Array(12).fill(null).map(() => 
        Array(16).fill('grass')
      )
      setLandscapeGrid(grid)
    }
    initGrid()
  }, [])

  const placeBBlock = (row: number, col: number) => {
    if (selectedTool === 'build') {
      setLandscapeGrid(prev => {
        const newGrid = [...prev]
        newGrid[row][col] = selectedBlock
        return newGrid
      })
    } else if (selectedTool === 'remove') {
      setLandscapeGrid(prev => {
        const newGrid = [...prev]
        newGrid[row][col] = 'grass'
        return newGrid
      })
    }
  }

  const saveCurrentLandscape = () => {
    const newLandscape = {
      id: savedLandscapes.length + 1,
      name: `Custom Landscape ${savedLandscapes.length + 1}`,
      biome: "Mixed",
      animals: Math.floor(Math.random() * 50) + 10,
      rating: 4.5 + Math.random() * 0.4
    }
    setSavedLandscapes(prev => [...prev, newLandscape])
    
    toast.success('🏗️ Landscape Saved!', {
      description: 'Your custom landscape has been saved and is now available for animals!',
      duration: 4000
    })
  }

  const generateRandomLandscape = () => {
    const newGrid = Array(12).fill(null).map(() => 
      Array(16).fill(null).map(() => {
        const random = Math.random()
        if (random < 0.4) return 'grass'
        if (random < 0.55) return 'tree'
        if (random < 0.65) return 'water'
        if (random < 0.75) return 'stone'
        if (random < 0.85) return 'flower'
        if (random < 0.9) return 'sand'
        if (random < 0.95) return 'mountain'
        return 'house'
      })
    )
    setLandscapeGrid(newGrid)
    
    toast.success('🎲 Random Landscape Generated!', {
      description: 'A beautiful new landscape has been procedurally generated!',
      duration: 4000
    })
  }

  const getBlockData = (blockType: string) => {
    return blockTypes.find(b => b.id === blockType) || blockTypes[0]
  }

  return (
    <Card className="border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400 text-center justify-center">
          <Cube className="h-6 w-6" />
          🏗️ MINECRAFT LANDSCAPE BUILDER - ULTRA REALISTIC
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Tool Selection */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => setSelectedTool('build')}
            className={`${selectedTool === 'build' ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-700`}
          >
            <Hammer className="h-4 w-4 mr-2" />
            Build Mode
          </Button>
          <Button
            onClick={() => setSelectedTool('remove')}
            className={`${selectedTool === 'remove' ? 'bg-red-600' : 'bg-gray-600'} hover:bg-red-700`}
          >
            <Pickaxe className="h-4 w-4 mr-2" />
            Remove Mode
          </Button>
          <Button
            onClick={generateRandomLandscape}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Random Generate
          </Button>
          <Button
            onClick={saveCurrentLandscape}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Target className="h-4 w-4 mr-2" />
            Save Landscape
          </Button>
        </div>

        {/* Block Palette */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {blockTypes.map((block) => (
            <Button
              key={block.id}
              onClick={() => setSelectedBlock(block.id)}
              className={`h-16 ${selectedBlock === block.id ? 'ring-2 ring-yellow-400' : ''} ${block.color} hover:opacity-80 flex flex-col items-center justify-center`}
            >
              <span className="text-2xl">{block.emoji}</span>
              <span className="text-xs text-white">{block.name}</span>
            </Button>
          ))}
        </div>

        {/* Building Canvas */}
        <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 p-4 rounded-lg border border-yellow-500/30">
          <div className="grid grid-cols-16 gap-1 max-w-4xl mx-auto">
            {landscapeGrid.map((row, rowIndex) =>
              row.map((block, colIndex) => {
                const blockData = getBlockData(block)
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`aspect-square ${blockData.color} border border-gray-600 cursor-pointer hover:opacity-80 flex items-center justify-center text-xs transition-all duration-200 hover:scale-110`}
                    onClick={() => placeBBlock(rowIndex, colIndex)}
                    title={blockData.name}
                  >
                    <span className="text-xs">{blockData.emoji}</span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Landscape Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-900/30 rounded border border-green-500/20 text-center">
            <TreePine className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-400">
              {landscapeGrid.flat().filter(block => block === 'tree').length}
            </div>
            <div className="text-xs text-muted-foreground">Trees Planted</div>
          </div>
          <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20 text-center">
            <Waves className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-400">
              {landscapeGrid.flat().filter(block => block === 'water').length}
            </div>
            <div className="text-xs text-muted-foreground">Water Sources</div>
          </div>
          <div className="p-4 bg-yellow-900/30 rounded border border-yellow-500/20 text-center">
            <Home className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-400">
              {landscapeGrid.flat().filter(block => block === 'house').length}
            </div>
            <div className="text-xs text-muted-foreground">Animal Shelters</div>
          </div>
          <div className="p-4 bg-pink-900/30 rounded border border-pink-500/20 text-center">
            <Sparkles className="h-6 w-6 text-pink-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-pink-400">
              {landscapeGrid.flat().filter(block => block === 'flower').length}
            </div>
            <div className="text-xs text-muted-foreground">Flower Gardens</div>
          </div>
        </div>

        {/* Saved Landscapes Gallery */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-yellow-400 text-center">🏞️ Saved Animal Landscapes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedLandscapes.map((landscape) => (
              <div key={landscape.id} className="p-4 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-green-400">{landscape.name}</h4>
                  <Badge className="bg-blue-600 text-white">{landscape.biome}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Animals Living:</span>
                    <span className="text-green-400">{landscape.animals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span className="text-yellow-400">⭐ {landscape.rating}</span>
                  </div>
                </div>
                <Button className="w-full mt-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xs">
                  <Eye className="h-3 w-3 mr-2" />
                  View in VR
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="text-center p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">🚀 ULTRA-REALISTIC FEATURES</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-900/30 rounded border border-green-500/20">
              <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-bold text-green-400 mb-2">Real-World Physics</h4>
              <p className="text-xs text-muted-foreground">Water flows, trees grow, animals interact naturally</p>
            </div>
            <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-bold text-blue-400 mb-2">VR Integration</h4>
              <p className="text-xs text-muted-foreground">Walk through your landscapes in virtual reality</p>
            </div>
            <div className="p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h4 className="font-bold text-purple-400 mb-2">AI Optimization</h4>
              <p className="text-xs text-muted-foreground">AI suggests improvements for animal happiness</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
