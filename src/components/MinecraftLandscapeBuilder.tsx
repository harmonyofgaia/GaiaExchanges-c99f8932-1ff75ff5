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
  Settings,
  Drill,
  Coins,
  Gem
} from 'lucide-react'
import { toast } from 'sonner'
import { AgeLandscapeSelector } from './AgeLandscapeSelector'

interface DrillingResult {
  material: string
  quantity: number
  gaiaReward: number
  rarity: string
}

export function MinecraftLandscapeBuilder() {
  const [selectedTool, setSelectedTool] = useState('build')
  const [selectedBlock, setSelectedBlock] = useState('grass')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('')
  const [landscapeGrid, setLandscapeGrid] = useState<string[][]>([])
  const [landscapeType, setLandscapeType] = useState<'surface' | 'underwater'>('surface')
  const [selectedMachine, setSelectedMachine] = useState<string>('')
  const [totalGaiaEarned, setTotalGaiaEarned] = useState(0)
  const [discoveredMaterials, setDiscoveredMaterials] = useState<DrillingResult[]>([])
  const [savedLandscapes, setSavedLandscapes] = useState([
    { id: 1, name: "Forest Sanctuary", biome: "Forest", animals: 25, rating: 4.8, ageGroup: "children" },
    { id: 2, name: "Ocean Paradise", biome: "Ocean", animals: 42, rating: 4.9, ageGroup: "teens" },
    { id: 3, name: "Mountain Refuge", biome: "Mountain", animals: 18, rating: 4.7, ageGroup: "adults" },
    { id: 4, name: "Deep Sea Mining Zone", biome: "Underwater", animals: 15, rating: 4.6, ageGroup: "adults" }
  ])

  const heavyMachines = [
    { id: 'basic_drill', name: 'Basic Drill', cost: 10, power: 1, emoji: '⛏️' },
    { id: 'hydraulic_drill', name: 'Hydraulic Drill', cost: 25, power: 2, emoji: '🔧' },
    { id: 'diamond_drill', name: 'Diamond Drill', cost: 50, power: 3, emoji: '💎' },
    { id: 'quantum_drill', name: 'Quantum Drill', cost: 100, power: 5, emoji: '⚡' }
  ]

  const groundMaterials = [
    { name: 'Gold', rarity: 'Legendary', gaiaValue: 1.0, chance: 0.05, emoji: '🏆' },
    { name: 'Silver', rarity: 'Epic', gaiaValue: 0.5, chance: 0.1, emoji: '🥈' },
    { name: 'Copper', rarity: 'Rare', gaiaValue: 0.2, chance: 0.2, emoji: '🟤' },
    { name: 'Iron', rarity: 'Common', gaiaValue: 0.1, chance: 0.3, emoji: '⚫' },
    { name: 'Coal', rarity: 'Common', gaiaValue: 0.05, chance: 0.4, emoji: '⚫' },
    { name: 'Gems', rarity: 'Epic', gaiaValue: 0.8, chance: 0.08, emoji: '💎' },
    { name: 'Crystals', rarity: 'Rare', gaiaValue: 0.3, chance: 0.15, emoji: '🔮' }
  ]

  const getBlockTypesForAgeGroup = (ageGroup: string) => {
    const surfaceBlocks = [
      { id: 'grass', name: 'Grass', color: 'bg-green-500', emoji: '🌱' },
      { id: 'water', name: 'Water', color: 'bg-blue-500', emoji: '🌊' },
      { id: 'tree', name: 'Tree', color: 'bg-green-700', emoji: '🌳' },
      { id: 'flower', name: 'Flowers', color: 'bg-pink-500', emoji: '🌸' }
    ]

    const underwaterBlocks = [
      { id: 'deep_water', name: 'Deep Water', color: 'bg-blue-800', emoji: '🌊' },
      { id: 'coral', name: 'Coral', color: 'bg-orange-500', emoji: '🪸' },
      { id: 'seaweed', name: 'Seaweed', color: 'bg-green-600', emoji: '🌿' },
      { id: 'sand', name: 'Sand', color: 'bg-yellow-600', emoji: '🏖️' },
      { id: 'rock', name: 'Rock', color: 'bg-gray-600', emoji: '🪨' },
      { id: 'drilling_site', name: 'Drilling Site', color: 'bg-yellow-800', emoji: '⛏️' }
    ]

    const baseBlocks = landscapeType === 'underwater' ? underwaterBlocks : surfaceBlocks

    switch (ageGroup) {
      case 'children':
        return [
          ...baseBlocks,
          { id: 'rainbow', name: 'Rainbow', color: 'bg-gradient-to-r from-red-500 to-purple-500', emoji: '🌈' },
          { id: 'playground', name: 'Playground', color: 'bg-yellow-600', emoji: '🎠' }
        ]
      case 'teens':
        return [
          ...baseBlocks,
          { id: 'adventure', name: 'Adventure', color: 'bg-orange-600', emoji: '⚔️' },
          { id: 'treasure', name: 'Treasure', color: 'bg-yellow-500', emoji: '💎' }
        ]
      case 'adults':
        return [
          ...baseBlocks,
          { id: 'house', name: 'Shelter', color: 'bg-yellow-700', emoji: '🏠' },
          { id: 'factory', name: 'Factory', color: 'bg-red-700', emoji: '🏭' },
          { id: 'space', name: 'Space Station', color: 'bg-purple-800', emoji: '🚀' }
        ]
      default:
        return baseBlocks
    }
  }

  const blockTypes = getBlockTypesForAgeGroup(selectedAgeGroup)

  useEffect(() => {
    const initGrid = () => {
      const grid = Array(12).fill(null).map(() => 
        Array(16).fill(landscapeType === 'underwater' ? 'deep_water' : 'grass')
      )
      setLandscapeGrid(grid)
    }
    initGrid()
  }, [selectedAgeGroup, landscapeType])

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
        newGrid[row][col] = landscapeType === 'underwater' ? 'deep_water' : 'grass'
        return newGrid
      })
    } else if (selectedTool === 'drill' && selectedMachine) {
      performDrilling(row, col)
    }
  }

  const performDrilling = (row: number, col: number) => {
    const machine = heavyMachines.find(m => m.id === selectedMachine)
    if (!machine) return

    // Check if it's a valid drilling location
    const currentBlock = landscapeGrid[row][col]
    if (currentBlock !== 'sand' && currentBlock !== 'rock' && currentBlock !== 'drilling_site') {
      toast.error('❌ Cannot drill here! Need sand, rock, or drilling site.')
      return
    }

    // Simulate drilling based on machine power
    const drillResults: DrillingResult[] = []
    const drillAttempts = machine.power

    for (let i = 0; i < drillAttempts; i++) {
      const randomMaterial = groundMaterials.find(material => 
        Math.random() < material.chance * (machine.power * 0.2)
      )

      if (randomMaterial) {
        const quantity = Math.floor(Math.random() * 3) + 1
        const gaiaReward = randomMaterial.gaiaValue * quantity
        
        drillResults.push({
          material: randomMaterial.name,
          quantity,
          gaiaReward,
          rarity: randomMaterial.rarity
        })
      }
    }

    if (drillResults.length > 0) {
      const totalReward = drillResults.reduce((sum, result) => sum + result.gaiaReward, 0)
      setTotalGaiaEarned(prev => prev + totalReward)
      setDiscoveredMaterials(prev => [...prev, ...drillResults])

      // Mark the drilling site
      setLandscapeGrid(prev => {
        const newGrid = [...prev]
        newGrid[row][col] = 'drilling_site'
        return newGrid
      })

      toast.success(`⛏️ Drilling Success!`, {
        description: `Found: ${drillResults.map(r => `${r.quantity}x ${r.material}`).join(', ')} | Earned: ${totalReward.toFixed(2)} GAIA`,
        duration: 5000
      })
    } else {
      toast.error('💔 No materials found. Try a more powerful drill!')
    }
  }

  const purchaseMachine = (machineId: string) => {
    const machine = heavyMachines.find(m => m.id === machineId)
    if (!machine) return

    if (totalGaiaEarned >= machine.cost) {
      setTotalGaiaEarned(prev => prev - machine.cost)
      setSelectedMachine(machineId)
      toast.success(`🚛 Purchased ${machine.name}!`, {
        description: `Drilling power: ${machine.power}x | Cost: ${machine.cost} GAIA`,
        duration: 4000
      })
    } else {
      toast.error(`❌ Not enough GAIA! Need ${machine.cost}, have ${totalGaiaEarned.toFixed(2)}`)
    }
  }

  const saveCurrentLandscape = () => {
    const newLandscape = {
      id: savedLandscapes.length + 1,
      name: `${landscapeType} ${selectedAgeGroup.charAt(0).toUpperCase() + selectedAgeGroup.slice(1)} Landscape ${savedLandscapes.length + 1}`,
      biome: landscapeType === 'underwater' ? 'Underwater' : 'Mixed',
      animals: Math.floor(Math.random() * 50) + 10,
      rating: 4.5 + Math.random() * 0.4,
      ageGroup: selectedAgeGroup
    }
    setSavedLandscapes(prev => [...prev, newLandscape])
    
    toast.success('🏗️ Landscape Saved!', {
      description: `Your ${landscapeType} ${selectedAgeGroup} landscape has been saved!`,
      duration: 4000
    })
  }

  const generateRandomLandscape = () => {
    const availableBlocks = blockTypes.map(b => b.id)
    const newGrid = Array(12).fill(null).map(() => 
      Array(16).fill(null).map(() => {
        const random = Math.random()
        if (landscapeType === 'underwater') {
          if (random < 0.4) return 'deep_water'
          if (random < 0.6) return 'coral'
          if (random < 0.8) return 'seaweed'
          if (random < 0.9) return 'sand'
          return 'rock'
        } else {
          return availableBlocks[Math.floor(Math.random() * availableBlocks.length)]
        }
      })
    )
    setLandscapeGrid(newGrid)
    
    toast.success(`🎲 ${landscapeType} Landscape Generated!`, {
      description: `A beautiful ${landscapeType} ${selectedAgeGroup} landscape has been created!`,
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
          🏗️ LANDSCAPE BUILDER - {selectedAgeGroup.toUpperCase()}
        </CardTitle>
        <div className="text-center space-y-2">
          <Button 
            onClick={() => setSelectedAgeGroup('')} 
            className="bg-gray-600 hover:bg-gray-700 text-sm mr-2"
          >
            Change Age Group
          </Button>
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setLandscapeType('surface')}
              className={`${landscapeType === 'surface' ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-700 text-sm`}
            >
              🏞️ Surface
            </Button>
            <Button
              onClick={() => setLandscapeType('underwater')}
              className={`${landscapeType === 'underwater' ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-blue-700 text-sm`}
            >
              🌊 Underwater
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* GAIA Balance */}
        <div className="text-center p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/20">
          <div className="text-2xl font-bold text-green-400 flex items-center justify-center gap-2">
            <Coins className="h-6 w-6" />
            {totalGaiaEarned.toFixed(2)} GAIA Tokens
          </div>
          <p className="text-sm text-muted-foreground">Earned from drilling operations</p>
        </div>

        {/* Heavy Machines Shop */}
        {landscapeType === 'underwater' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400 text-center">🚛 Heavy Drilling Machines</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {heavyMachines.map((machine) => (
                <Card key={machine.id} className={`${selectedMachine === machine.id ? 'border-green-500 bg-green-900/20' : 'border-gray-600'} cursor-pointer`}>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{machine.emoji}</div>
                    <h4 className="font-bold text-sm">{machine.name}</h4>
                    <div className="text-xs text-muted-foreground">Power: {machine.power}x</div>
                    <div className="text-xs text-yellow-400">Cost: {machine.cost} GAIA</div>
                    <Button
                      onClick={() => purchaseMachine(machine.id)}
                      className="w-full mt-2 text-xs"
                      disabled={totalGaiaEarned < machine.cost}
                    >
                      {selectedMachine === machine.id ? 'Owned' : 'Buy'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

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
          {landscapeType === 'underwater' && (
            <Button
              onClick={() => setSelectedTool('drill')}
              className={`${selectedTool === 'drill' ? 'bg-orange-600' : 'bg-gray-600'} hover:bg-orange-700`}
              disabled={!selectedMachine}
            >
              <Drill className="h-4 w-4 mr-2" />
              Drill Mode
            </Button>
          )}
          <Button
            onClick={generateRandomLandscape}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={!selectedAgeGroup}
          >
            <Zap className="h-4 w-4 mr-2" />
            Generate {landscapeType}
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
        <div className={`${landscapeType === 'underwater' ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40' : 'bg-gradient-to-br from-blue-900/20 to-green-900/20'} p-4 rounded-lg border border-yellow-500/30`}>
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

        {/* Discovered Materials */}
        {discoveredMaterials.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400 text-center">⛏️ Discovered Materials</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {groundMaterials.map((material) => {
                const discovered = discoveredMaterials.filter(d => d.material === material.name)
                const totalQuantity = discovered.reduce((sum, d) => sum + d.quantity, 0)
                const totalValue = discovered.reduce((sum, d) => sum + d.gaiaReward, 0)
                
                if (totalQuantity === 0) return null
                
                return (
                  <Card key={material.name} className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/20">
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl mb-1">{material.emoji}</div>
                      <h4 className="font-bold text-sm">{material.name}</h4>
                      <div className="text-xs text-muted-foreground">Qty: {totalQuantity}</div>
                      <div className="text-xs text-green-400">Value: {totalValue.toFixed(2)} GAIA</div>
                      <Badge className={`mt-1 text-xs ${material.rarity === 'Legendary' ? 'bg-yellow-600' : material.rarity === 'Epic' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                        {material.rarity}
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-900/30 rounded border border-green-500/20 text-center">
            <TreePine className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-400">
              {landscapeGrid.flat().filter(block => block === 'tree' || block === 'seaweed').length}
            </div>
            <div className="text-xs text-muted-foreground">Plants</div>
          </div>
          <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20 text-center">
            <Waves className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-400">
              {landscapeGrid.flat().filter(block => block === 'water' || block === 'deep_water').length}
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
          <div className="p-4 bg-orange-900/30 rounded border border-orange-500/20 text-center">
            <Drill className="h-6 w-6 text-orange-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-400">
              {landscapeGrid.flat().filter(block => block === 'drilling_site').length}
            </div>
            <div className="text-xs text-muted-foreground">Drilling Sites</div>
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
