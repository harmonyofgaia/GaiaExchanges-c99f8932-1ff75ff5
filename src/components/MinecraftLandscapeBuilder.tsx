
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
  Box,
  Globe,
  Sparkles,
  Target,
  Settings
} from 'lucide-react'
import { toast } from 'sonner'
import { AgeLandscapeSelector } from './AgeLandscapeSelector'

export function MinecraftLandscapeBuilder() {
  const [selectedTool, setSelectedTool] = useState('build')
  const [selectedBlock, setSelectedBlock] = useState('grass')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('')
  const [landscapeGrid, setLandscapeGrid] = useState<string[][]>([])
  const [savedLandscapes, setSavedLandscapes] = useState([
    { id: 1, name: "Forest Sanctuary", biome: "Forest", animals: 25, rating: 4.8, ageGroup: "children" },
    { id: 2, name: "Ocean Paradise", biome: "Ocean", animals: 42, rating: 4.9, ageGroup: "teens" },
    { id: 3, name: "Mountain Refuge", biome: "Mountain", animals: 18, rating: 4.7, ageGroup: "adults" }
  ])

  const getBlockTypesForAgeGroup = (ageGroup: string) => {
    const baseBlocks = [
      { id: 'grass', name: 'Grass', color: 'bg-green-500', emoji: '🌱' },
      { id: 'water', name: 'Water', color: 'bg-blue-500', emoji: '🌊' },
      { id: 'tree', name: 'Tree', color: 'bg-green-700', emoji: '🌳' },
      { id: 'flower', name: 'Flowers', color: 'bg-pink-500', emoji: '🌸' }
    ]

    switch (ageGroup) {
      case 'children':
        return [
          ...baseBlocks,
          { id: 'rainbow', name: 'Rainbow', color: 'bg-gradient-to-r from-red-500 to-purple-500', emoji: '🌈' },
          { id: 'playground', name: 'Playground', color: 'bg-yellow-600', emoji: '🎠' },
          { id: 'candy', name: 'Candy', color: 'bg-pink-600', emoji: '🍭' }
        ]
      case 'teens':
        return [
          ...baseBlocks,
          { id: 'stone', name: 'Stone', color: 'bg-gray-500', emoji: '🪨' },
          { id: 'adventure', name: 'Adventure', color: 'bg-orange-600', emoji: '⚔️' },
          { id: 'castle', name: 'Castle', color: 'bg-gray-700', emoji: '🏰' },
          { id: 'treasure', name: 'Treasure', color: 'bg-yellow-500', emoji: '💎' }
        ]
      case 'young_adults':
        return [
          ...baseBlocks,
          { id: 'stone', name: 'Stone', color: 'bg-gray-500', emoji: '🪨' },
          { id: 'sand', name: 'Sand', color: 'bg-yellow-500', emoji: '🏖️' },
          { id: 'university', name: 'University', color: 'bg-blue-700', emoji: '🎓' },
          { id: 'lab', name: 'Laboratory', color: 'bg-cyan-600', emoji: '🔬' },
          { id: 'library', name: 'Library', color: 'bg-brown-600', emoji: '📚' }
        ]
      case 'adults':
        return [
          ...baseBlocks,
          { id: 'stone', name: 'Stone', color: 'bg-gray-500', emoji: '🪨' },
          { id: 'sand', name: 'Sand', color: 'bg-yellow-500', emoji: '🏖️' },
          { id: 'mountain', name: 'Mountain', color: 'bg-gray-700', emoji: '⛰️' },
          { id: 'house', name: 'Shelter', color: 'bg-yellow-700', emoji: '🏠' },
          { id: 'skyscraper', name: 'Skyscraper', color: 'bg-gray-800', emoji: '🏢' },
          { id: 'factory', name: 'Factory', color: 'bg-red-700', emoji: '🏭' },
          { id: 'space', name: 'Space Station', color: 'bg-purple-800', emoji: '🚀' }
        ]
      default:
        return baseBlocks
    }
  }

  const blockTypes = getBlockTypesForAgeGroup(selectedAgeGroup)

  // Initialize grid
  useEffect(() => {
    const initGrid = () => {
      const grid = Array(12).fill(null).map(() => 
        Array(16).fill('grass')
      )
      setLandscapeGrid(grid)
    }
    initGrid()
  }, [selectedAgeGroup])

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
      name: `${selectedAgeGroup.charAt(0).toUpperCase() + selectedAgeGroup.slice(1)} Landscape ${savedLandscapes.length + 1}`,
      biome: "Mixed",
      animals: Math.floor(Math.random() * 50) + 10,
      rating: 4.5 + Math.random() * 0.4,
      ageGroup: selectedAgeGroup
    }
    setSavedLandscapes(prev => [...prev, newLandscape])
    
    toast.success('🏗️ Landscape Saved!', {
      description: `Your ${selectedAgeGroup} landscape has been saved and is now available for animals!`,
      duration: 4000
    })
  }

  const generateRandomLandscape = () => {
    const availableBlocks = blockTypes.map(b => b.id)
    const newGrid = Array(12).fill(null).map(() => 
      Array(16).fill(null).map(() => {
        const random = Math.random()
        if (selectedAgeGroup === 'children') {
          if (random < 0.4) return 'grass'
          if (random < 0.6) return 'flower'
          if (random < 0.8) return 'tree'
          if (random < 0.9) return 'rainbow'
          return 'playground'
        } else if (selectedAgeGroup === 'teens') {
          if (random < 0.3) return 'grass'
          if (random < 0.5) return 'tree'
          if (random < 0.65) return 'stone'
          if (random < 0.8) return 'adventure'
          if (random < 0.9) return 'castle'
          return 'treasure'
        } else {
          return availableBlocks[Math.floor(Math.random() * availableBlocks.length)]
        }
      })
    )
    setLandscapeGrid(newGrid)
    
    toast.success('🎲 Age-Appropriate Landscape Generated!', {
      description: `A beautiful ${selectedAgeGroup} landscape has been created!`,
      duration: 4000
    })
  }

  const getBlockData = (blockType: string) => {
    return blockTypes.find(b => b.id === blockType) || blockTypes[0]
  }

  if (!selectedAgeGroup) {
    return <AgeLandscapeSelector onAgeGroupSelect={setSelectedAgeGroup} />
  }

  return (
    <Card className="border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400 text-center justify-center">
          <Box className="h-6 w-6" />
          🏗️ AGE-SPECIFIC LANDSCAPE BUILDER - {selectedAgeGroup.toUpperCase()}
        </CardTitle>
        <div className="text-center">
          <Button 
            onClick={() => setSelectedAgeGroup('')} 
            className="bg-gray-600 hover:bg-gray-700 text-sm"
          >
            Change Age Group
          </Button>
        </div>
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
            disabled={!selectedAgeGroup}
          >
            <Zap className="h-4 w-4 mr-2" />
            Generate Age-Appropriate
          </Button>
          <Button
            onClick={saveCurrentLandscape}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            disabled={!selectedAgeGroup}
          >
            <Target className="h-4 w-4 mr-2" />
            Save Landscape
          </Button>
        </div>

        {/* Age-Specific Block Palette */}
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

        {/* Age-Specific Stats */}
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
              {landscapeGrid.flat().filter(block => ['house', 'playground', 'castle', 'university'].includes(block)).length}
            </div>
            <div className="text-xs text-muted-foreground">Structures</div>
          </div>
          <div className="p-4 bg-pink-900/30 rounded border border-pink-500/20 text-center">
            <Sparkles className="h-6 w-6 text-pink-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-pink-400">
              {landscapeGrid.flat().filter(block => ['flower', 'rainbow', 'treasure'].includes(block)).length}
            </div>
            <div className="text-xs text-muted-foreground">Special Items</div>
          </div>
        </div>

        {/* Age-Filtered Landscapes Gallery */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-yellow-400 text-center">🏞️ {selectedAgeGroup.toUpperCase()} Landscapes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedLandscapes
              .filter(landscape => landscape.ageGroup === selectedAgeGroup)
              .map((landscape) => (
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
                    <span className="text-yellow-400">⭐ {landscape.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Group:</span>
                    <span className="text-purple-400 capitalize">{landscape.ageGroup}</span>
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
      </CardContent>
    </Card>
  )
}
