
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Sword, 
  Flame, 
  Zap, 
  Crown, 
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Target
} from 'lucide-react'
import { toast } from 'sonner'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'

interface PrehistoricCreature {
  id: string
  name: string
  type: 'defender' | 'attacker' | 'support' | 'hybrid'
  species: string
  era: string
  sprite: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical' | 'Divine'
  stats: {
    attack: number
    defense: number
    speed: number
    intelligence: number
    loyalty: number
    antiScam: number
  }
  abilities: string[]
  description: string
  defenseCapabilities: string[]
  cost: number
  isActive: boolean
  createdBy: 'ai' | 'admin'
}

export function PrehistoricCreaturesManager() {
  const { isAdmin } = useSecureAdmin()
  const [creatures, setCreatures] = useState<PrehistoricCreature[]>([])
  const [selectedType, setSelectedType] = useState<string>('all')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (isAdmin) {
      loadPrehistoricCreatures()
    }
  }, [isAdmin])

  const loadPrehistoricCreatures = () => {
    const prehistoricArmy: PrehistoricCreature[] = [
      {
        id: 'trex-guardian',
        name: 'T-Rex Security Guardian',
        type: 'defender',
        species: 'Tyrannosaurus Rex',
        era: 'Cretaceous',
        sprite: '🦖',
        rarity: 'Divine',
        stats: { attack: 100, defense: 95, speed: 75, intelligence: 85, loyalty: 100, antiScam: 95 },
        abilities: ['Wallet Protection', 'Scam Detection', 'Threat Elimination', 'Territory Defense'],
        description: 'Ultimate guardian against crypto scams and wallet thieves',
        defenseCapabilities: ['Phishing Protection', 'Malware Detection', 'Fake Token Recognition', 'Social Engineering Defense'],
        cost: 10000,
        isActive: true,
        createdBy: 'ai'
      },
      {
        id: 'stego-shield',
        name: 'Stegosaurus Shield Master',
        type: 'defender',
        species: 'Stegosaurus',
        era: 'Jurassic',
        sprite: '🦕',
        rarity: 'Legendary',
        stats: { attack: 70, defense: 100, speed: 60, intelligence: 90, loyalty: 95, antiScam: 90 },
        abilities: ['Armor Plating', 'Data Encryption', 'Firewall Generation', 'Privacy Shield'],
        description: 'Impenetrable defense against data breaches and privacy attacks',
        defenseCapabilities: ['Information Protection', 'Identity Security', 'Transaction Safety', 'Personal Data Shielding'],
        cost: 7500,
        isActive: true,
        createdBy: 'ai'
      },
      {
        id: 'raptor-hunter',
        name: 'Velociraptor Scam Hunter',
        type: 'attacker',
        species: 'Velociraptor',
        era: 'Cretaceous',
        sprite: '🦴',
        rarity: 'Epic',
        stats: { attack: 95, defense: 75, speed: 100, intelligence: 95, loyalty: 90, antiScam: 100 },
        abilities: ['Pack Hunting', 'Swift Strike', 'Scammer Tracking', 'Intelligence Gathering'],
        description: 'Elite hunter that tracks down and eliminates crypto scammers',
        defenseCapabilities: ['Scammer Identification', 'Fraud Prevention', 'Quick Response', 'Network Security'],
        cost: 5000,
        isActive: true,
        createdBy: 'ai'
      },
      {
        id: 'ptero-scout',
        name: 'Pteranodon Sky Scout',
        type: 'support',
        species: 'Pteranodon',
        era: 'Cretaceous',
        sprite: '🦅',
        rarity: 'Rare',
        stats: { attack: 60, defense: 65, speed: 100, intelligence: 85, loyalty: 85, antiScam: 80 },
        abilities: ['Aerial Surveillance', 'Early Warning', 'Network Monitoring', 'Threat Detection'],
        description: 'High-altitude surveillance against incoming threats',
        defenseCapabilities: ['Network Scanning', 'Threat Assessment', 'Early Warning System', 'Communication Security'],
        cost: 3000,
        isActive: true,
        createdBy: 'ai'
      },
      {
        id: 'ankylo-tank',
        name: 'Ankylosaurus Security Tank',
        type: 'defender',
        species: 'Ankylosaurus',
        era: 'Cretaceous',
        sprite: '🛡️',
        rarity: 'Legendary',
        stats: { attack: 80, defense: 100, speed: 50, intelligence: 75, loyalty: 100, antiScam: 85 },
        abilities: ['Immovable Defense', 'Threat Absorption', 'Counter Attack', 'Fortress Mode'],
        description: 'Unbreakable defense against the strongest attacks',
        defenseCapabilities: ['DDoS Protection', 'System Hardening', 'Attack Absorption', 'Secure Foundation'],
        cost: 8000,
        isActive: true,
        createdBy: 'ai'
      },
      {
        id: 'spinosaur-aqua',
        name: 'Spinosaurus Aqua Defender',
        type: 'hybrid',
        species: 'Spinosaurus',
        era: 'Cretaceous',
        sprite: '🐊',
        rarity: 'Mythical',
        stats: { attack: 90, defense: 85, speed: 80, intelligence: 90, loyalty: 95, antiScam: 90 },
        abilities: ['Aquatic Dominance', 'Dual Environment', 'Adaptive Defense', 'Cross-Platform Security'],
        description: 'Versatile defender for land and water-based threats',
        defenseCapabilities: ['Multi-Platform Defense', 'Adaptive Security', 'Cross-Chain Protection', 'Versatile Response'],
        cost: 9000,
        isActive: true,
        createdBy: 'ai'
      }
    ]
    
    setCreatures(prehistoricArmy)
  }

  const generateNewCreature = async () => {
    setIsGenerating(true)
    
    const species = ['Allosaurus', 'Brachiosaurus', 'Triceratops', 'Diplodocus', 'Carnotaurus', 'Parasaurolophus']
    const eras = ['Triassic', 'Jurassic', 'Cretaceous']
    const types = ['defender', 'attacker', 'support', 'hybrid']
    const rarities = ['Rare', 'Epic', 'Legendary', 'Mythical']
    const sprites = ['🦴', '🦕', '🦖', '🐲', '🛡️', '⚡', '🔥', '💎']
    
    const randomSpecies = species[Math.floor(Math.random() * species.length)]
    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomRarity = rarities[Math.floor(Math.random() * rarities.length)]
    
    const newCreature: PrehistoricCreature = {
      id: `creature-${Date.now()}`,
      name: `${randomSpecies} Guardian`,
      type: randomType as any,
      species: randomSpecies,
      era: eras[Math.floor(Math.random() * eras.length)],
      sprite: sprites[Math.floor(Math.random() * sprites.length)],
      rarity: randomRarity as any,
      stats: {
        attack: Math.floor(Math.random() * 100) + 50,
        defense: Math.floor(Math.random() * 100) + 50,
        speed: Math.floor(Math.random() * 100) + 50,
        intelligence: Math.floor(Math.random() * 100) + 50,
        loyalty: Math.floor(Math.random() * 100) + 50,
        antiScam: Math.floor(Math.random() * 100) + 50
      },
      abilities: ['Security Protocol', 'Threat Detection', 'Defense Matrix', 'Anti-Scam Shield'],
      description: `AI-generated ${randomSpecies} specialized in crypto security and user protection`,
      defenseCapabilities: ['Wallet Security', 'Scam Prevention', 'Data Protection', 'Network Defense'],
      cost: Math.floor(Math.random() * 5000) + 2000,
      isActive: true,
      createdBy: 'ai'
    }
    
    setCreatures(prev => [newCreature, ...prev])
    setIsGenerating(false)
    
    toast.success('🦖 New Prehistoric Guardian Created!', {
      description: `${newCreature.name} joins the defense army`,
      duration: 4000
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Divine': return 'from-purple-600 via-pink-600 to-yellow-600'
      case 'Mythical': return 'from-purple-600 to-pink-600'
      case 'Legendary': return 'from-yellow-600 to-orange-600'
      case 'Epic': return 'from-blue-600 to-cyan-600'
      case 'Rare': return 'from-green-600 to-emerald-600'
      default: return 'from-gray-600 to-slate-600'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'defender': return 'bg-blue-600'
      case 'attacker': return 'bg-red-600'
      case 'support': return 'bg-green-600'
      case 'hybrid': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  const filteredCreatures = creatures.filter(creature => 
    selectedType === 'all' || creature.type === selectedType
  )

  if (!isAdmin) {
    return (
      <Card className="border-2 border-red-500/50">
        <CardContent className="p-8 text-center">
          <Crown className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-400">Admin Access Required</h3>
          <p className="text-muted-foreground">Prehistoric Creatures Manager requires admin privileges</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Shield className="h-6 w-6" />
            🦖 PREHISTORIC DEFENSE ARMY MANAGEMENT
          </CardTitle>
          <p className="text-muted-foreground">
            Create and manage prehistoric creatures to defend against scams, malware, and crypto threats
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">{creatures.filter(c => c.type === 'defender').length}</div>
              <div className="text-xs text-muted-foreground">Defenders</div>
            </div>
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <div className="text-xl font-bold text-red-400">{creatures.filter(c => c.type === 'attacker').length}</div>
              <div className="text-xs text-muted-foreground">Attackers</div>
            </div>
            <div className="p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <div className="text-xl font-bold text-green-400">{creatures.filter(c => c.type === 'support').length}</div>
              <div className="text-xs text-muted-foreground">Support</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">{creatures.filter(c => c.type === 'hybrid').length}</div>
              <div className="text-xs text-muted-foreground">Hybrid</div>
            </div>
            <div className="p-3 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">{creatures.reduce((sum, c) => sum + c.stats.antiScam, 0)}</div>
              <div className="text-xs text-muted-foreground">Total Anti-Scam</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card className="border-green-500/30">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <Button
              onClick={generateNewCreature}
              disabled={isGenerating}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isGenerating ? 'Creating...' : 'Generate Creature'}
            </Button>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="defender">Defenders</option>
              <option value="attacker">Attackers</option>
              <option value="support">Support</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Creatures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreatures.map((creature) => (
          <Card key={creature.id} className={`border-2 bg-gradient-to-br ${getRarityColor(creature.rarity)}/20 hover:scale-105 transition-all`}>
            <CardContent className="p-4 space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">{creature.sprite}</div>
                <h3 className="font-bold text-white text-lg">{creature.name}</h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge className={getTypeColor(creature.type)}>
                    {creature.type.toUpperCase()}
                  </Badge>
                  <Badge className={`bg-gradient-to-r ${getRarityColor(creature.rarity)} text-white`}>
                    {creature.rarity}
                  </Badge>
                </div>
              </div>
              
              <div className="text-center space-y-1">
                <div className="text-sm text-cyan-400">{creature.species}</div>
                <div className="text-xs text-muted-foreground">{creature.era} Era</div>
                <div className="text-xs text-muted-foreground">{creature.description}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-1 text-xs">
                <div className="text-center">
                  <div className="text-red-400 font-bold">{creature.stats.attack}</div>
                  <div className="text-muted-foreground">ATK</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold">{creature.stats.defense}</div>
                  <div className="text-muted-foreground">DEF</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">{creature.stats.speed}</div>
                  <div className="text-muted-foreground">SPD</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-bold">{creature.stats.intelligence}</div>
                  <div className="text-muted-foreground">INT</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold">{creature.stats.loyalty}</div>
                  <div className="text-muted-foreground">LOY</div>
                </div>
                <div className="text-center">
                  <div className="text-orange-400 font-bold">{creature.stats.antiScam}</div>
                  <div className="text-muted-foreground">A-S</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-yellow-400 font-bold">Abilities:</div>
                <div className="flex flex-wrap gap-1">
                  {creature.abilities.slice(0, 2).map(ability => (
                    <Badge key={ability} variant="outline" className="text-xs">
                      {ability}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-xs text-orange-400 font-bold">Defense Capabilities:</div>
                <div className="flex flex-wrap gap-1">
                  {creature.defenseCapabilities.slice(0, 2).map(capability => (
                    <Badge key={capability} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold">{creature.cost} GAIA</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    Deploy
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Statement */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold text-red-400 mb-4">🛡️ DEFENSE ARMY MISSION</h3>
          <p className="text-lg text-muted-foreground mb-4">
            We are creating a formidable army of prehistoric guardians to protect our community against:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-red-900/30 rounded border border-red-500/20">
              <Shield className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-red-400 font-bold">Crypto Scams</div>
            </div>
            <div className="p-3 bg-orange-900/30 rounded border border-orange-500/20">
              <Zap className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-orange-400 font-bold">Malware Attacks</div>
            </div>
            <div className="p-3 bg-purple-900/30 rounded border border-purple-500/20">
              <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-purple-400 font-bold">Wallet Thieves</div>
            </div>
            <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-blue-400 font-bold">Bad Actors</div>
            </div>
          </div>
          <p className="text-green-400 font-bold text-lg mt-4">
            🦖 Together we build an unstoppable defense force! 🛡️
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
