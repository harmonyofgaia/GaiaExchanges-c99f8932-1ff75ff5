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
  Gem,
  Factory,
  Truck,
  Wrench
} from 'lucide-react'
import { toast } from 'sonner'
import { AgeLandscapeSelector } from './AgeLandscapeSelector'

interface DrillingResult {
  material: string
  quantity: number
  gaiaReward: number
  rarity: string
}

interface AdvancedMachine {
  id: string
  name: string
  cost: number
  power: number
  efficiency: number
  specialAbility: string
  emoji: string
  tier: 'basic' | 'advanced' | 'quantum' | 'ultimate'
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
  const [ownedMachines, setOwnedMachines] = useState<Set<string>>(new Set())
  const [dailyUpdatesEnabled, setDailyUpdatesEnabled] = useState(true)
  const [savedLandscapes, setSavedLandscapes] = useState([
    { id: 1, name: "Forest Sanctuary", biome: "Forest", animals: 25, rating: 4.8, ageGroup: "children" },
    { id: 2, name: "Ocean Paradise", biome: "Ocean", animals: 42, rating: 4.9, ageGroup: "teens" },
    { id: 3, name: "Mountain Refuge", biome: "Mountain", animals: 18, rating: 4.7, ageGroup: "adults" },
    { id: 4, name: "Deep Sea Mining Zone", biome: "Underwater", animals: 15, rating: 4.6, ageGroup: "adults" },
    { id: 5, name: "Quantum Mining Facility", biome: "Underwater", animals: 8, rating: 4.9, ageGroup: "adults" }
  ])

  // Enhanced heavy machines with different tiers and abilities
  const heavyMachines: AdvancedMachine[] = [
    { id: 'basic_drill', name: 'Basic Drill', cost: 10, power: 1, efficiency: 50, specialAbility: 'None', emoji: '⛏️', tier: 'basic' },
    { id: 'hydraulic_drill', name: 'Hydraulic Drill', cost: 25, power: 2, efficiency: 65, specialAbility: 'Water Drilling', emoji: '🔧', tier: 'basic' },
    { id: 'diamond_drill', name: 'Diamond Drill', cost: 50, power: 3, efficiency: 80, specialAbility: 'Hard Rock Penetration', emoji: '💎', tier: 'advanced' },
    { id: 'quantum_drill', name: 'Quantum Drill', cost: 100, power: 5, efficiency: 95, specialAbility: 'Quantum Tunneling', emoji: '⚡', tier: 'advanced' },
    { id: 'mega_excavator', name: 'Mega Excavator', cost: 200, power: 8, efficiency: 90, specialAbility: 'Large Area Mining', emoji: '🚛', tier: 'quantum' },
    { id: 'plasma_bore', name: 'Plasma Bore', cost: 350, power: 12, efficiency: 98, specialAbility: 'Plasma Cutting', emoji: '🔥', tier: 'quantum' },
    { id: 'quantum_harvester', name: 'Quantum Harvester', cost: 500, power: 15, efficiency: 99, specialAbility: 'Multi-Dimensional Mining', emoji: '🌌', tier: 'ultimate' },
    { id: 'gaia_extractor', name: 'Gaia Extractor Supreme', cost: 1000, power: 25, efficiency: 100, specialAbility: 'Pure Gaia Energy Extraction', emoji: '🌟', tier: 'ultimate' }
  ]

  // Enhanced ground materials with more variety and rare finds
  const groundMaterials = [
    { name: 'Quantum Gold', rarity: 'Legendary', gaiaValue: 1.0, chance: 0.02, emoji: '🏆', depth: 'deep' },
    { name: 'Pure Gold', rarity: 'Epic', gaiaValue: 0.8, chance: 0.05, emoji: '🥇', depth: 'medium' },
    { name: 'Silver', rarity: 'Rare', gaiaValue: 0.5, chance: 0.1, emoji: '🥈', depth: 'medium' },
    { name: 'Platinum', rarity: 'Epic', gaiaValue: 0.7, chance: 0.06, emoji: '⚪', depth: 'deep' },
    { name: 'Copper', rarity: 'Common', gaiaValue: 0.2, chance: 0.2, emoji: '🟤', depth: 'shallow' },
    { name: 'Iron', rarity: 'Common', gaiaValue: 0.1, chance: 0.3, emoji: '⚫', depth: 'shallow' },
    { name: 'Coal', rarity: 'Common', gaiaValue: 0.05, chance: 0.4, emoji: '⚫', depth: 'shallow' },
    { name: 'Rare Gems', rarity: 'Legendary', gaiaValue: 1.2, chance: 0.03, emoji: '💎', depth: 'deep' },
    { name: 'Crystals', rarity: 'Rare', gaiaValue: 0.3, chance: 0.15, emoji: '🔮', depth: 'medium' },
    { name: 'Quantum Crystals', rarity: 'Legendary', gaiaValue: 2.0, chance: 0.01, emoji: '🌌', depth: 'deep' },
    { name: 'Gaia Essence', rarity: 'Mythical', gaiaValue: 5.0, chance: 0.005, emoji: '🌟', depth: 'deep' },
    { name: 'Ancient Artifacts', rarity: 'Mythical', gaiaValue: 3.0, chance: 0.008, emoji: '🏺', depth: 'deep' }
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
      { id: 'coral', name: 'Coral Reef', color: 'bg-orange-500', emoji: '🪸' },
      { id: 'seaweed', name: 'Seaweed Forest', color: 'bg-green-600', emoji: '🌿' },
      { id: 'sand', name: 'Ocean Sand', color: 'bg-yellow-600', emoji: '🏖️' },
      { id: 'rock', name: 'Bedrock', color: 'bg-gray-600', emoji: '🪨' },
      { id: 'drilling_site', name: 'Active Drilling Site', color: 'bg-yellow-800', emoji: '⛏️' },
      { id: 'mining_platform', name: 'Mining Platform', color: 'bg-gray-800', emoji: '🏭' },
      { id: 'treasure_chest', name: 'Treasure Chest', color: 'bg-yellow-500', emoji: '📦' }
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

  // Daily updates system
  useEffect(() => {
    if (!dailyUpdatesEnabled) return

    const dailyUpdateInterval = setInterval(() => {
      // Add new machines occasionally
      if (Math.random() < 0.1) {
        const newMachines = [
          { id: 'fusion_drill', name: 'Fusion Drill X1', cost: 750, power: 20, efficiency: 99, specialAbility: 'Nuclear Fusion Power', emoji: '☢️', tier: 'ultimate' as const },
          { id: 'nano_extractor', name: 'Nano Extractor', cost: 1500, power: 30, efficiency: 100, specialAbility: 'Nano-Precision Mining', emoji: '⚛️', tier: 'ultimate' as const }
        ]
        
        if (Math.random() < 0.5) {
          toast.success('🔄 Daily Update: New Advanced Drilling Technology Available!', {
            description: 'Check the Heavy Machines shop for new quantum-powered equipment',
            duration: 8000
          })
        }
      }

      // Update ground material chances based on global mining activity
      groundMaterials.forEach(material => {
        if (Math.random() < 0.05) {
          material.chance = Math.min(material.chance * 1.05, material.chance * 1.2)
        }
      })

      console.log('🔄 Daily Mining Update: Equipment and materials updated')
    }, 24 * 60 * 60 * 1000) // Once per day

    return () => clearInterval(dailyUpdateInterval)
  }, [dailyUpdatesEnabled])

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
      performAdvancedDrilling(row, col)
    }
  }

  const performAdvancedDrilling = (row: number, col: number) => {
    const machine = heavyMachines.find(m => m.id === selectedMachine)
    if (!machine || !ownedMachines.has(selectedMachine)) {
      toast.error('❌ You need to own this machine to use it!')
      return
    }

    // Check if it's a valid drilling location
    const currentBlock = landscapeGrid[row][col]
    const validDrillingBlocks = ['sand', 'rock', 'drilling_site', 'deep_water', 'coral']
    if (!validDrillingBlocks.includes(currentBlock)) {
      toast.error('❌ Cannot drill here! Need valid drilling terrain.')
      return
    }

    // Advanced drilling simulation based on machine tier and power
    const drillResults: DrillingResult[] = []
    const baseAttempts = machine.power
    const bonusAttempts = Math.floor(machine.efficiency / 20)
    const totalAttempts = baseAttempts + bonusAttempts

    // Determine drilling depth based on machine tier
    const availableMaterials = groundMaterials.filter(material => {
      if (machine.tier === 'ultimate') return true
      if (machine.tier === 'quantum' && material.depth !== 'deep') return true
      if (machine.tier === 'advanced' && material.depth === 'shallow') return true
      return material.depth === 'shallow'
    })

    for (let i = 0; i < totalAttempts; i++) {
      // Apply machine's special ability bonuses
      let chanceMultiplier = 1
      if (machine.specialAbility.includes('Quantum')) chanceMultiplier *= 2
      if (machine.specialAbility.includes('Plasma')) chanceMultiplier *= 1.5
      if (machine.specialAbility.includes('Gaia')) chanceMultiplier *= 3

      const materialFound = availableMaterials.find(material => 
        Math.random() < (material.chance * chanceMultiplier * (machine.efficiency / 100))
      )

      if (materialFound) {
        const baseQuantity = Math.floor(Math.random() * 3) + 1
        const bonusQuantity = machine.tier === 'ultimate' ? Math.floor(Math.random() * 2) + 1 : 0
        const quantity = baseQuantity + bonusQuantity
        const gaiaReward = materialFound.gaiaValue * quantity

        drillResults.push({
          material: materialFound.name,
          quantity,
          gaiaReward,
          rarity: materialFound.rarity
        })
      }
    }

    if (drillResults.length > 0) {
      const totalReward = drillResults.reduce((sum, result) => sum + result.gaiaReward, 0)
      setTotalGaiaEarned(prev => prev + totalReward)
      setDiscoveredMaterials(prev => [...prev, ...drillResults])

      // Mark the drilling site and add mining infrastructure
      setLandscapeGrid(prev => {
        const newGrid = [...prev]
        newGrid[row][col] = 'drilling_site'
        
        // Add mining platform nearby for ultimate tier machines
        if (machine.tier === 'ultimate' && Math.random() < 0.3) {
          const adjacentCells = [
            [row-1, col], [row+1, col], [row, col-1], [row, col+1]
          ]
          const validCell = adjacentCells.find(([r, c]) => 
            r >= 0 && r < 12 && c >= 0 && c < 16 && newGrid[r][c] === 'deep_water'
          )
          if (validCell) {
            newGrid[validCell[0]][validCell[1]] = 'mining_platform'
          }
        }
        
        return newGrid
      })

      const rareMaterials = drillResults.filter(r => ['Legendary', 'Mythical'].includes(r.rarity))
      
      toast.success(`⛏️ ${machine.name} - Drilling Success!`, {
        description: `Found: ${drillResults.map(r => `${r.quantity}x ${r.material}`).join(', ')} | Earned: ${totalReward.toFixed(2)} GAIA`,
        duration: rareMaterials.length > 0 ? 10000 : 5000
      })

      if (rareMaterials.length > 0) {
        toast.success(`🌟 RARE DISCOVERY!`, {
          description: `${machine.name} discovered ${rareMaterials.map(r => r.material).join(', ')}! Legendary find!`,
          duration: 8000
        })
      }
    } else {
      toast.warning(`💔 ${machine.name} found no materials this time. Try upgrading your equipment!`)
    }
  }

  const purchaseMachine = (machineId: string) => {
    const machine = heavyMachines.find(m => m.id === machineId)
    if (!machine) return

    if (ownedMachines.has(machineId)) {
      setSelectedMachine(machineId)
      toast.info(`🚛 ${machine.name} selected for drilling operations!`)
      return
    }

    if (totalGaiaEarned >= machine.cost) {
      setTotalGaiaEarned(prev => prev - machine.cost)
      setOwnedMachines(prev => new Set([...prev, machineId]))
      setSelectedMachine(machineId)
      
      toast.success(`🚛 ${machine.name} Purchased!`, {
        description: `Power: ${machine.power}x | Efficiency: ${machine.efficiency}% | Special: ${machine.specialAbility}`,
        duration: 6000
      })
    } else {
      toast.error(`❌ Not enough GAIA! Need ${machine.cost}, have ${totalGaiaEarned.toFixed(2)}`)
    }
  }

  const saveCurrentLandscape = () => {
    const newLandscape = {
      id: savedLandscapes.length + 1,
      name: `${landscapeType} ${selectedAgeGroup.charAt(0).toUpperCase() + selectedAgeGroup.slice(1)} Landscape ${savedLandscapes.length + 1}`,
      biome: landscapeType === 'underwater' ? 'Underwater Mining Zone' : 'Mixed',
      animals: Math.floor(Math.random() * 50) + 10,
      rating: 4.5 + Math.random() * 0.4,
      ageGroup: selectedAgeGroup
    }
    setSavedLandscapes(prev => [...prev, newLandscape])
    
    toast.success('🏗️ Advanced Landscape Saved!', {
      description: `Your ${landscapeType} ${selectedAgeGroup} mining landscape has been saved with all drilling operations!`,
      duration: 4000
    })
  }

  const generateRandomLandscape = () => {
    const availableBlocks = blockTypes.map(b => b.id)
    const newGrid = Array(12).fill(null).map(() => 
      Array(16).fill(null).map(() => {
        const random = Math.random()
        if (landscapeType === 'underwater') {
          if (random < 0.3) return 'deep_water'
          if (random < 0.5) return 'coral'
          if (random < 0.7) return 'seaweed'
          if (random < 0.85) return 'sand'
          if (random < 0.95) return 'rock'
          return 'drilling_site'
        } else {
          return availableBlocks[Math.floor(Math.random() * availableBlocks.length)]
        }
      })
    )
    setLandscapeGrid(newGrid)
    
    toast.success(`🎲 Advanced ${landscapeType} Landscape Generated!`, {
      description: `A beautiful ${landscapeType} ${selectedAgeGroup} landscape with mining opportunities has been created!`,
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
          🏗️ ADVANCED LANDSCAPE BUILDER - {selectedAgeGroup.toUpperCase()}
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
              🌊 Underwater Mining
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
          <p className="text-sm text-muted-foreground">Earned from advanced drilling operations</p>
          <div className="mt-2">
            <Badge className="bg-blue-600 text-white mr-2">
              <Wrench className="h-3 w-3 mr-1" />
              Machines Owned: {ownedMachines.size}
            </Badge>
            <Badge className="bg-purple-600 text-white">
              <Target className="h-3 w-3 mr-1" />
              Daily Updates: {dailyUpdatesEnabled ? 'ON' : 'OFF'}
            </Badge>
          </div>
        </div>

        {/* Enhanced Heavy Machines Shop */}
        {landscapeType === 'underwater' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400 text-center">🚛 Advanced Drilling Machines & Equipment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {heavyMachines.map((machine) => {
                const isOwned = ownedMachines.has(machine.id)
                const isSelected = selectedMachine === machine.id
                
                return (
                  <Card key={machine.id} className={`${
                    isSelected ? 'border-green-500 bg-green-900/20' : 
                    isOwned ? 'border-blue-500 bg-blue-900/20' : 
                    'border-gray-600'
                  } cursor-pointer transition-all duration-200 hover:scale-105`}>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{machine.emoji}</div>
                      <h4 className="font-bold text-sm">{machine.name}</h4>
                      <div className="text-xs space-y-1">
                        <div className="text-muted-foreground">Power: {machine.power}x</div>
                        <div className="text-muted-foreground">Efficiency: {machine.efficiency}%</div>
                        <div className="text-yellow-400">Cost: {machine.cost} GAIA</div>
                        <Badge className={`text-xs ${
                          machine.tier === 'ultimate' ? 'bg-purple-600' :
                          machine.tier === 'quantum' ? 'bg-blue-600' :
                          machine.tier === 'advanced' ? 'bg-orange-600' : 'bg-gray-600'
                        } text-white`}>
                          {machine.tier.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-green-400 mt-1 min-h-8">
                        {machine.specialAbility}
                      </div>
                      <Button
                        onClick={() => purchaseMachine(machine.id)}
                        className="w-full mt-2 text-xs"
                        disabled={!isOwned && totalGaiaEarned < machine.cost}
                      >
                        {isOwned ? (isSelected ? 'Selected' : 'Select') : 'Buy'}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
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
              disabled={!selectedMachine || !ownedMachines.has(selectedMachine)}
            >
              <Drill className="h-4 w-4 mr-2" />
              Advanced Drill Mode
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

        {/* Enhanced Discovered Materials */}
        {discoveredMaterials.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400 text-center">⛏️ Discovered Materials & Resources</h3>
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
                      <div className="text-xs text-blue-400">Depth: {material.depth}</div>
                      <Badge className={`mt-1 text-xs ${
                        material.rarity === 'Mythical' ? 'bg-purple-600' :
                        material.rarity === 'Legendary' ? 'bg-yellow-600' : 
                        material.rarity === 'Epic' ? 'bg-orange-600' : 
                        material.rarity === 'Rare' ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        {material.rarity}
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-900/30 rounded border border-green-500/20 text-center">
            <TreePine className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-400">
              {landscapeGrid.flat().filter(block => ['tree', 'seaweed', 'coral'].includes(block)).length}
            </div>
            <div className="text-xs text-muted-foreground">Nature Elements</div>
          </div>
          <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20 text-center">
            <Waves className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-400">
              {landscapeGrid.flat().filter(block => ['water', 'deep_water'].includes(block)).length}
            </div>
            <div className="text-xs text-muted-foreground">Water Sources</div>
          </div>
          <div className="p-4 bg-yellow-900/30 rounded border border-yellow-500/20 text-center">
            <Factory className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-400">
              {landscapeGrid.flat().filter(block => ['house', 'playground', 'factory', 'mining_platform'].includes(block)).length}
            </div>
            <div className="text-xs text-muted-foreground">Structures</div>
          </div>
          <div className="p-4 bg-orange-900/30 rounded border border-orange-500/20 text-center">
            <Drill className="h-6 w-6 text-orange-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-400">
              {landscapeGrid.flat().filter(block => ['drilling_site', 'treasure_chest'].includes(block)).length}
            </div>
            <div className="text-xs text-muted-foreground">Mining Operations</div>
          </div>
        </div>

        {/* Age-Filtered Landscapes Gallery */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-yellow-400 text-center">🏞️ {selectedAgeGroup.toUpperCase()} Advanced Landscapes</h3>
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
                    <span>Wildlife:</span>
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

        {/* Daily Update Status */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-bold text-purple-400">📅 Daily Mining Updates Active</h3>
              <p className="text-sm text-muted-foreground">
                Your underwater mining landscape receives daily updates with new equipment, 
                improved material discovery rates, and enhanced drilling technologies. 
                The system continuously evolves to provide the best mining experience!
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-green-600 text-white">🔄 Auto-Updates</Badge>
                <Badge className="bg-blue-600 text-white">🚛 New Equipment</Badge>
                <Badge className="bg-yellow-600 text-white">💎 Better Rewards</Badge>
                <Badge className="bg-purple-600 text-white">🌟 Enhanced Experience</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
