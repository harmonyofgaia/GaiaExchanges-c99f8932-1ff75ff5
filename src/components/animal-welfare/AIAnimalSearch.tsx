import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Brain, 
  Heart, 
  Wallet, 
  MapPin, 
  Clock, 
  Shield, 
  Zap,
  Star,
  Eye,
  Camera,
  Activity,
  AlertTriangle,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

interface CagedAnimal {
  id: string
  name: string
  species: string
  location: string
  cageCondition: 'Critical' | 'Poor' | 'Fair' | 'Good'
  timeInCage: number // days
  urgencyLevel: number // 1-10
  walletAddress: string
  nftCardId: string
  aiDiscoveryTime: string
  rescueFunding: number
  rescueGoal: number
  emotions: {
    sadness: number
    hope: number
    fear: number
    trust: number
  }
  healthStatus: string
  lastUpdated: string
  imageUrl: string
  rescueProgress: number
}

export function AIAnimalSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<CagedAnimal[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [totalDiscovered, setTotalDiscovered] = useState(847)
  const [totalRescued, setTotalRescued] = useState(329)
  const [searchFilters, setSearchFilters] = useState({
    urgencyLevel: '',
    species: '',
    location: ''
  })

  // Simulated AI-discovered caged animals database
  const aiDiscoveredAnimals: CagedAnimal[] = [
    {
      id: 'ca_001',
      name: 'Luna',
      species: 'Wolf',
      location: 'Illegal Breeding Facility, Romania',
      cageCondition: 'Critical',
      timeInCage: 847,
      urgencyLevel: 10,
      walletAddress: '0x742d35CC6Bb53D8d01F5eF3F',
      nftCardId: 'GAIA_RESCUE_001',
      aiDiscoveryTime: '2024-01-15T10:30:00Z',
      rescueFunding: 2450.75,
      rescueGoal: 8500,
      emotions: {
        sadness: 95,
        hope: 15,
        fear: 88,
        trust: 12
      },
      healthStatus: 'Malnourished, needs immediate medical attention',
      lastUpdated: '2024-01-20T14:30:00Z',
      imageUrl: '/placeholder-wolf.jpg',
      rescueProgress: 29
    },
    {
      id: 'ca_002',
      name: 'Sunny',
      species: 'Elephant',
      location: 'Tourist Exploitation Center, Thailand',
      cageCondition: 'Poor',
      timeInCage: 1200,
      urgencyLevel: 9,
      walletAddress: '0x8a9b7c6d5e4f3a2b1c0d9e8f',
      nftCardId: 'GAIA_RESCUE_002',
      aiDiscoveryTime: '2024-01-10T08:15:00Z',
      rescueFunding: 12800.50,
      rescueGoal: 25000,
      emotions: {
        sadness: 89,
        hope: 25,
        fear: 76,
        trust: 18
      },
      healthStatus: 'Foot infections, depression symptoms',
      lastUpdated: '2024-01-20T16:45:00Z',
      imageUrl: '/placeholder-elephant.jpg',
      rescueProgress: 51
    },
    {
      id: 'ca_003',
      name: 'Freedom',
      species: 'Tiger',
      location: 'Private Collection, Vietnam',
      cageCondition: 'Critical',
      timeInCage: 623,
      urgencyLevel: 10,
      walletAddress: '0x1f2e3d4c5b6a7890abcdef12',
      nftCardId: 'GAIA_RESCUE_003',
      aiDiscoveryTime: '2024-01-12T12:00:00Z',
      rescueFunding: 18750.25,
      rescueGoal: 35000,
      emotions: {
        sadness: 92,
        hope: 8,
        fear: 95,
        trust: 5
      },
      healthStatus: 'Severe stress, pacing behavior, needs immediate relocation',
      lastUpdated: '2024-01-20T18:20:00Z',
      imageUrl: '/placeholder-tiger.jpg',
      rescueProgress: 54
    }
  ]

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalDiscovered(prev => prev + Math.floor(Math.random() * 3))
      if (Math.random() > 0.7) {
        setTotalRescued(prev => prev + 1)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const performAISearch = async () => {
    setIsSearching(true)
    
    // Simulate AI search process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    let results = aiDiscoveredAnimals
    
    if (searchQuery) {
      results = results.filter(animal => 
        animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (searchFilters.urgencyLevel) {
      results = results.filter(animal => animal.urgencyLevel >= parseInt(searchFilters.urgencyLevel))
    }

    if (searchFilters.species) {
      results = results.filter(animal => 
        animal.species.toLowerCase().includes(searchFilters.species.toLowerCase())
      )
    }

    if (searchFilters.location) {
      results = results.filter(animal => 
        animal.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      )
    }

    setSearchResults(results)
    setIsSearching(false)

    toast.success('🤖 AI Search Complete!', {
      description: `Found ${results.length} animals needing rescue assistance`,
      duration: 5000
    })
  }

  const fundAnimalRescue = (animalId: string, amount: number) => {
    setSearchResults(prev => 
      prev.map(animal => 
        animal.id === animalId 
          ? { 
              ...animal, 
              rescueFunding: animal.rescueFunding + amount,
              rescueProgress: Math.min(100, ((animal.rescueFunding + amount) / animal.rescueGoal) * 100),
              emotions: {
                ...animal.emotions,
                hope: Math.min(100, animal.emotions.hope + 5),
                trust: Math.min(100, animal.emotions.trust + 3)
              }
            }
          : animal
      )
    )

    toast.success('💝 Rescue Funding Sent!', {
      description: `$${amount} sent to help rescue this animal. They can feel your support!`,
      duration: 5000
    })
  }

  const getUrgencyColor = (level: number) => {
    if (level >= 9) return 'bg-red-600'
    if (level >= 7) return 'bg-orange-600'
    if (level >= 5) return 'bg-yellow-600'
    return 'bg-green-600'
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Critical': return 'bg-red-600'
      case 'Poor': return 'bg-orange-600'
      case 'Fair': return 'bg-yellow-600'
      case 'Good': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Search Header */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
            <Brain className="h-6 w-6" />
            🤖 AI-POWERED CAGED ANIMAL SEARCH SYSTEM
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Advanced AI scanning system discovering animals in need across the globe 24/7
          </p>
        </CardHeader>
        <CardContent>
          {/* Global Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/30">
              <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{totalDiscovered.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">AI Discovered</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/30">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{totalRescued.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Successfully Rescued</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-900/40 to-pink-900/40 rounded-lg border border-red-500/30">
              <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{(totalDiscovered - totalRescued).toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Awaiting Rescue</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/30">
              <Activity className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-xs text-muted-foreground">AI Monitoring</div>
            </div>
          </div>

          {/* Search Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search by name, species, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/50 border-purple-500/30"
                />
              </div>
              <div>
                <Input
                  placeholder="Min urgency level (1-10)"
                  value={searchFilters.urgencyLevel}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, urgencyLevel: e.target.value }))}
                  className="bg-black/50 border-purple-500/30"
                />
              </div>
              <div>
                <Input
                  placeholder="Species filter"
                  value={searchFilters.species}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, species: e.target.value }))}
                  className="bg-black/50 border-purple-500/30"
                />
              </div>
              <div>
                <Input
                  placeholder="Location filter"
                  value={searchFilters.location}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-black/50 border-purple-500/30"
                />
              </div>
            </div>
            
            <Button 
              onClick={performAISearch}
              disabled={isSearching}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSearching ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  AI SCANNING GLOBALLY...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  🤖 ACTIVATE AI SEARCH
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {searchResults.map((animal) => (
            <Card key={animal.id} className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-orange-900/20 hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-red-400">{animal.name}</CardTitle>
                  <Badge className={`${getUrgencyColor(animal.urgencyLevel)} text-white`}>
                    URGENCY {animal.urgencyLevel}/10
                  </Badge>
                </div>
                <p className="text-muted-foreground">{animal.species}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Location & Cage Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-red-400" />
                    <span className="text-red-400">{animal.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-orange-400" />
                    <span>Caged for {animal.timeInCage} days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4" />
                    <Badge className={`${getConditionColor(animal.cageCondition)} text-white text-xs`}>
                      {animal.cageCondition} Condition
                    </Badge>
                  </div>
                </div>

                {/* Blockchain Wallet */}
                <div className="p-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 font-bold">Individual Blockchain Wallet</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {animal.walletAddress}
                  </div>
                  <div className="text-xs text-blue-400 mt-1">
                    NFT Card ID: {animal.nftCardId}
                  </div>
                </div>

                {/* Emotional State */}
                <div className="p-3 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Emotional State
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>😢 Sadness:</span>
                      <span className="text-red-400">{animal.emotions.sadness}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🌟 Hope:</span>
                      <span className="text-yellow-400">{animal.emotions.hope}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>😰 Fear:</span>
                      <span className="text-orange-400">{animal.emotions.fear}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🤝 Trust:</span>
                      <span className="text-green-400">{animal.emotions.trust}%</span>
                    </div>
                  </div>
                </div>

                {/* Health Status */}
                <div className="p-3 bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-lg border border-red-500/30">
                  <h4 className="font-bold text-red-400 mb-2">Health Status</h4>
                  <p className="text-xs text-muted-foreground">{animal.healthStatus}</p>
                </div>

                {/* Rescue Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rescue Progress:</span>
                    <span className="text-green-400 font-bold">{animal.rescueProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={animal.rescueProgress} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${animal.rescueFunding.toLocaleString()} raised</span>
                    <span>Goal: ${animal.rescueGoal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Funding Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    onClick={() => fundAnimalRescue(animal.id, 100)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xs"
                  >
                    +$100
                  </Button>
                  <Button 
                    onClick={() => fundAnimalRescue(animal.id, 500)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
                  >
                    +$500
                  </Button>
                  <Button 
                    onClick={() => fundAnimalRescue(animal.id, 1000)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs"
                  >
                    +$1000
                  </Button>
                </div>

                {/* AI Discovery Info */}
                <div className="text-xs text-muted-foreground border-t border-gray-700 pt-2">
                  <div className="flex items-center gap-2">
                    <Brain className="h-3 w-3 text-purple-400" />
                    <span>AI Discovered: {new Date(animal.aiDiscoveryTime).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {searchResults.length === 0 && !isSearching && (
        <Card className="border-gray-500/30 bg-gradient-to-r from-gray-900/30 to-gray-800/30">
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Start AI Search</h3>
            <p className="text-muted-foreground">
              Use the AI search system above to discover animals in need of rescue assistance
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}