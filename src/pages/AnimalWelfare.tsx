
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { 
  Heart, 
  Shield, 
  Users, 
  Leaf,
  MapPin,
  Wallet,
  Eye,
  Headphones,
  Radio,
  Globe,
  Star,
  Zap,
  Camera,
  TreePine,
  Copy,
  Play
} from 'lucide-react'
import { toast } from 'sonner'

interface RealAnimal {
  id: string
  name: string
  species: string
  emoji: string
  currentLocation: string
  country: string
  cageType: string
  walletAddress: string
  nftTokenId: string
  fundingGoal: number
  currentFunding: number
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  story: string
  healthStatus: number
  caretaker: string
  lastUpdate: string
  vrAvailable: boolean
  adoptionReady: boolean
  liveTracking: boolean
  carbonOffset: number
  rescueDate: string
  age: number
  weight: string
}

export default function AnimalWelfare() {
  const [animals, setAnimals] = useState<RealAnimal[]>([
    {
      id: '1',
      name: 'Maya',
      species: 'Bengal Tiger',
      emoji: '🐅',
      currentLocation: 'Wildlife Sanctuary, India',
      country: 'India',
      cageType: 'Rehabilitation Enclosure - 2000 sq meters',
      walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
      nftTokenId: 'MAYA_TIGER_001',
      fundingGoal: 25000,
      currentFunding: 18750,
      urgencyLevel: 'high',
      story: 'Maya was rescued from illegal captivity after her mother was killed by poachers. She has trauma from human contact but is slowly learning to trust again. She needs specialized veterinary care for her injured paw and psychological rehabilitation to prepare for potential release into a protected reserve.',
      healthStatus: 72,
      caretaker: 'Dr. Sarah Wildlife Center & Team',
      lastUpdate: '2 hours ago',
      vrAvailable: true,
      adoptionReady: false,
      liveTracking: true,
      carbonOffset: 12.5,
      rescueDate: '2023-08-15',
      age: 3,
      weight: '140 kg'
    },
    {
      id: '2',
      name: 'Charlie',
      species: 'African Elephant',
      emoji: '🐘',
      currentLocation: 'Elephant Sanctuary, Kenya',
      country: 'Kenya',
      cageType: 'Open Range Enclosure - 5000 sq meters',
      walletAddress: '4HyK2mN7pQsRbVx8uT9wE6cJdL3vF1sA2rP5qW8xN9kM',
      nftTokenId: 'CHARLIE_ELEPHANT_002',
      fundingGoal: 45000,
      currentFunding: 32100,
      urgencyLevel: 'medium',
      story: 'Charlie is an orphaned elephant calf whose family was killed in a poaching incident. He was found dehydrated and traumatized. He\'s learning to socialize with other elephants and needs ongoing psychological support and specialized nutrition to develop properly.',
      healthStatus: 85,
      caretaker: 'Kenya Wildlife Foundation',
      lastUpdate: '1 hour ago',
      vrAvailable: true,
      adoptionReady: true,
      liveTracking: true,
      carbonOffset: 28.3,
      rescueDate: '2023-06-20',
      age: 2,
      weight: '800 kg'
    },
    {
      id: '3',
      name: 'Luna',
      species: 'Arctic Wolf',
      emoji: '🐺',
      currentLocation: 'Arctic Conservation Center, Alaska',
      country: 'USA',
      cageType: 'Climate-Controlled Habitat - 3000 sq meters',
      walletAddress: '7KjF3vR9sT2eN5qW8xL4mP6yC1zA9dH5uI7oE2nQ4rK',
      nftTokenId: 'LUNA_WOLF_003',
      fundingGoal: 15000,
      currentFunding: 4200,
      urgencyLevel: 'critical',
      story: 'Luna was found injured and separated from her pack during harsh winter conditions. She has frostbite damage to her paws and needs immediate medical care, physical therapy, and gradual reintroduction to pack dynamics.',
      healthStatus: 45,
      caretaker: 'Arctic Wildlife Rescue',
      lastUpdate: '30 minutes ago',
      vrAvailable: false,
      adoptionReady: false,
      liveTracking: true,
      carbonOffset: 8.7,
      rescueDate: '2023-11-02',
      age: 4,
      weight: '35 kg'
    },
    {
      id: '4',
      name: 'Rio',
      species: 'Jaguar',
      emoji: '🐆',
      currentLocation: 'Amazon Rescue Center, Brazil',
      country: 'Brazil',
      cageType: 'Rainforest Simulation - 4000 sq meters',
      walletAddress: '9XpL5mK8vC2fN7rW3qA6dF1sH4yT9jE5uI8oP2nQ7rM',
      nftTokenId: 'RIO_JAGUAR_004',
      fundingGoal: 35000,
      currentFunding: 28900,
      urgencyLevel: 'medium',
      story: 'Rio was rescued from deforestation activities where his habitat was destroyed. He\'s adapting well but needs extensive territory to roam and hunt. Preparing for release into protected Amazon reserve.',
      healthStatus: 88,
      caretaker: 'Amazon Wildlife Preservation',
      lastUpdate: '45 minutes ago',
      vrAvailable: true,
      adoptionReady: true,
      liveTracking: true,
      carbonOffset: 22.1,
      rescueDate: '2023-05-10',
      age: 5,
      weight: '68 kg'
    }
  ])

  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)
  const [donationAmount, setDonationAmount] = useState('')
  const [userContributions, setUserContributions] = useState(2450)
  const [totalAnimalsHelped, setTotalAnimalsHelped] = useState(127)
  const [globalStats, setGlobalStats] = useState({
    totalRescued: 3247,
    totalReleased: 1892,
    activeCases: 1355,
    countriesActive: 67,
    totalFunding: 2840000,
    carbonOffset: 15420
  })

  const contributeToAnimal = (animalId: string, amount: number) => {
    if (amount <= 0 || amount > userContributions) return
    
    setAnimals(prev => 
      prev.map(animal => 
        animal.id === animalId 
          ? { ...animal, currentFunding: animal.currentFunding + amount }
          : animal
      )
    )
    setUserContributions(prev => prev - amount)
    
    const animal = animals.find(a => a.id === animalId)
    toast.success(`💝 Contributed ${amount} GAiA tokens to ${animal?.name}!`, {
      description: `Your contribution goes directly to ${animal?.name}'s dedicated wallet for care and rehabilitation.`,
      duration: 4000
    })
  }

  const copyWalletAddress = (address: string, animalName: string) => {
    navigator.clipboard.writeText(address)
    toast.success(`📋 Copied ${animalName}'s wallet address!`, {
      description: 'Send GAiA tokens directly to this animal.',
      duration: 3000
    })
  }

  const startVRSession = (animalId: string, animalName: string) => {
    toast.success(`🥽 Starting VR session with ${animalName}!`, {
      description: 'Experience life through their eyes and explore potential release habitats.',
      duration: 4000
    })
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical': return 'border-red-500/50 bg-red-900/20'
      case 'high': return 'border-orange-500/50 bg-orange-900/20'
      case 'medium': return 'border-yellow-500/50 bg-yellow-900/20'
      case 'low': return 'border-green-500/50 bg-green-900/20'
      default: return 'border-gray-500/50 bg-gray-900/20'
    }
  }

  const getUrgencyBadgeColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAnimals(prev => prev.map(animal => ({
        ...animal,
        lastUpdate: 'Just now',
        currentFunding: animal.currentFunding + Math.random() * 50
      })))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-6">
        {/* Main Header */}
        <Card className="mb-8 border-2 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center gap-3">
              <Heart className="h-12 w-12 text-green-400 animate-pulse" />
              🐾 GAiA ANIMAL WELFARE - REAL LIVES, REAL IMPACT
            </CardTitle>
            <p className="text-center text-xl text-green-300">
              Every Animal Gets • Individual Wallet • Personal NFT • VR Rehabilitation • Live Tracking • Global Release Program
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">{globalStats.totalRescued.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Rescued</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">{globalStats.totalReleased.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Successfully Released</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400">{globalStats.activeCases.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Active Cases</div>
              </div>
              <div className="text-center p-4 bg-orange-900/30 rounded border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-400">{globalStats.countriesActive}</div>
                <div className="text-xs text-muted-foreground">Countries</div>
              </div>
              <div className="text-center p-4 bg-yellow-900/30 rounded border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-400">${(globalStats.totalFunding / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-muted-foreground">Total Funding</div>
              </div>
              <div className="text-center p-4 bg-teal-900/30 rounded border border-teal-500/20">
                <div className="text-2xl font-bold text-teal-400">{globalStats.carbonOffset.toLocaleString()}t</div>
                <div className="text-xs text-muted-foreground">CO2 Offset</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Stats */}
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-400">{userContributions.toLocaleString()} GAiA</div>
                <div className="text-sm text-muted-foreground">Your Available Tokens</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{totalAnimalsHelped}</div>
                <div className="text-sm text-muted-foreground">Animals You've Helped</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="rescue-animals" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="rescue-animals">🆘 Rescue Animals</TabsTrigger>
            <TabsTrigger value="individual-wallets">💰 Animal Wallets</TabsTrigger>
            <TabsTrigger value="vr-rehabilitation">🥽 VR Rehabilitation</TabsTrigger>
            <TabsTrigger value="live-tracking">📡 Live Tracking</TabsTrigger>
            <TabsTrigger value="global-impact">🌍 Global Impact</TabsTrigger>
          </TabsList>

          {/* Rescue Animals Tab */}
          <TabsContent value="rescue-animals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {animals.map((animal) => (
                <Card key={animal.id} className={`${getUrgencyColor(animal.urgencyLevel)} border-2`}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Animal Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-5xl">{animal.emoji}</div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{animal.name}</h3>
                            <p className="text-muted-foreground">{animal.species}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge className={`${getUrgencyBadgeColor(animal.urgencyLevel)} text-xs`}>
                                {animal.urgencyLevel.toUpperCase()} PRIORITY
                              </Badge>
                              {animal.liveTracking && (
                                <Badge className="bg-blue-600 text-xs animate-pulse">
                                  <Radio className="h-2 w-2 mr-1" />
                                  LIVE
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-yellow-400">
                            {animal.currentFunding.toLocaleString()} GAiA
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Goal: {animal.fundingGoal.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Animal Details */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-blue-400" />
                          <span className="text-xs">{animal.currentLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-3 w-3 text-green-400" />
                          <span className="text-xs">Age: {animal.age} years</span>
                        </div>
                        <div className="text-xs">Weight: {animal.weight}</div>
                        <div className="text-xs">Rescued: {animal.rescueDate}</div>
                      </div>

                      {/* Story */}
                      <div className="bg-black/30 p-3 rounded">
                        <p className="text-sm">{animal.story}</p>
                      </div>

                      {/* Health & Progress */}
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Health Status</span>
                            <span className="text-green-400">{animal.healthStatus}%</span>
                          </div>
                          <Progress value={animal.healthStatus} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Funding Progress</span>
                            <span className="text-blue-400">
                              {((animal.currentFunding / animal.fundingGoal) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={(animal.currentFunding / animal.fundingGoal) * 100} className="h-2" />
                        </div>
                      </div>

                      {/* Wallet Info */}
                      <div className="bg-green-900/30 p-3 rounded border border-green-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-green-400 font-semibold">🔐 Dedicated Wallet</div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyWalletAddress(animal.walletAddress, animal.name)}
                            className="h-6 text-xs"
                          >
                            <Copy className="h-2 w-2 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="font-mono text-xs text-green-300 break-all mb-1">
                          {animal.walletAddress}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          NFT: {animal.nftTokenId} | Caretaker: {animal.caretaker}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex gap-1">
                          <Input
                            type="number"
                            placeholder="Amount"
                            value={selectedAnimal === animal.id ? donationAmount : ''}
                            onChange={(e) => {
                              setSelectedAnimal(animal.id)
                              setDonationAmount(e.target.value)
                            }}
                            className="h-8 text-xs"
                          />
                          <Button 
                            onClick={() => {
                              const amount = parseInt(donationAmount) || 100
                              contributeToAnimal(animal.id, amount)
                              setDonationAmount('')
                            }}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs"
                          >
                            <Wallet className="h-3 w-3 mr-1" />
                            Fund
                          </Button>
                        </div>
                        
                        <div className="flex gap-1">
                          {animal.vrAvailable && (
                            <Button 
                              onClick={() => startVRSession(animal.id, animal.name)}
                              variant="outline" 
                              size="sm"
                              className="border-purple-500/50 text-xs flex-1"
                            >
                              <Headphones className="h-3 w-3 mr-1" />
                              VR
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-blue-500/50 text-xs flex-1"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Live
                          </Button>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last update: {animal.lastUpdate} | CO2 offset: {animal.carbonOffset}t
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Individual Wallets Tab */}
          <TabsContent value="individual-wallets" className="space-y-6">
            <Card className="border-yellow-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Wallet className="h-6 w-6" />
                  💰 Individual Animal Wallet System
                </CardTitle>
                <p className="text-muted-foreground">
                  Every rescued animal has its own blockchain wallet. 100% transparent funding directly to animal care.
                </p>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {animals.map((animal) => (
                <Card key={animal.id} className="border-green-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{animal.emoji}</div>
                        <div>
                          <h3 className="font-bold text-lg">{animal.name}</h3>
                          <p className="text-muted-foreground text-sm">{animal.species} • {animal.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-green-400">
                          {animal.currentFunding.toLocaleString()} GAiA
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Goal: {animal.fundingGoal.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <Progress 
                      value={(animal.currentFunding / animal.fundingGoal) * 100} 
                      className="h-3 mb-4" 
                    />

                    <div className="bg-black/40 p-4 rounded border border-green-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-green-400">🔐 Blockchain Wallet</div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyWalletAddress(animal.walletAddress, animal.name)}
                        >
                          <Copy className="h-3 w-3 mr-2" />
                          Copy Address
                        </Button>
                      </div>
                      <div className="font-mono text-xs text-green-300 break-all mb-3">
                        {animal.walletAddress}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">NFT Token:</span>
                          <div className="font-mono text-blue-400">{animal.nftTokenId}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Habitat:</span>
                          <div className="text-white">{animal.cageType}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Caretaker:</span>
                          <div className="text-white">{animal.caretaker}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20 mt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400">100% Transparent Usage</span>
                      </div>
                      <p className="text-xs text-blue-300">
                        All transactions recorded on blockchain • Used exclusively for food, medical care, 
                        habitat improvement, and release preparation • Real-time spending reports available
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* VR Rehabilitation Tab */}
          <TabsContent value="vr-rehabilitation" className="space-y-6">
            <Card className="border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Headphones className="h-6 w-6" />
                  🥽 VR Habitat Exploration & Psychological Rehabilitation
                </CardTitle>
                <p className="text-muted-foreground">
                  Help animals explore potential release habitats through VR and support their psychological recovery.
                </p>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {animals.filter(animal => animal.vrAvailable).map((animal) => (
                <Card key={animal.id} className="border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{animal.emoji}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{animal.name}</h3>
                          <p className="text-muted-foreground">{animal.species}</p>
                          <Badge className="bg-purple-600 mt-1">
                            <Eye className="h-3 w-3 mr-1" />
                            VR Ready
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-purple-900/30 p-4 rounded border border-purple-500/20">
                        <h4 className="font-semibold mb-2">🌍 Available VR Experiences:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Explore natural habitat options in their native region</li>
                          <li>• Virtual walks through potential release sites</li>
                          <li>• Experience current environment improvements</li>
                          <li>• Psychological rehabilitation through nature therapy</li>
                          <li>• Practice hunting and survival skills safely</li>
                        </ul>
                      </div>

                      {animal.adoptionReady && (
                        <div className="bg-green-900/30 p-3 rounded border border-green-500/20">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-green-400" />
                            <span className="text-sm font-semibold text-green-400">
                              Ready for Release Planning
                            </span>
                          </div>
                          <p className="text-xs text-green-300 mt-1">
                            Help scout the perfect release location through immersive VR exploration!
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={() => startVRSession(animal.id, animal.name)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Headphones className="h-4 w-4 mr-2" />
                        Start VR Session with {animal.name}
                      </Button>

                      <div className="text-xs text-muted-foreground text-center">
                        🥽 VR headset required • Compatible with Meta Quest, PSVR2, HTC Vive
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Tracking Tab */}
          <TabsContent value="live-tracking" className="space-y-6">
            <Card className="border-red-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Radio className="h-6 w-6" />
                  📡 24/7 Real-Time Animal Monitoring System
                </CardTitle>
                <p className="text-muted-foreground">
                  Live GPS tracking, vital signs monitoring, behavior analysis, and environmental data for all animals.
                </p>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {animals.filter(animal => animal.liveTracking).map((animal) => (
                <Card key={animal.id} className="border-blue-500/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{animal.emoji}</div>
                          <div>
                            <h3 className="font-bold text-lg">{animal.name}</h3>
                            <p className="text-muted-foreground text-sm">{animal.species}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-600 animate-pulse">
                          <Radio className="h-3 w-3 mr-1" />
                          LIVE
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-red-900/20 p-3 rounded border border-red-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="h-3 w-3 text-red-400" />
                            <span className="text-xs text-red-400">Heart Rate</span>
                          </div>
                          <div className="text-lg font-bold">{45 + Math.floor(Math.random() * 20)} BPM</div>
                        </div>

                        <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-3 w-3 text-blue-400" />
                            <span className="text-xs text-blue-400">Location</span>
                          </div>
                          <div className="text-sm font-bold">Active in habitat</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Activity Level</span>
                          <span className="text-green-400">{65 + Math.floor(Math.random() * 30)}%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                          <Camera className="h-4 w-4 mr-2" />
                          Live Camera
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-purple-500/50">
                          <Play className="h-4 w-4 mr-2" />
                          Data Feed
                        </Button>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        📊 Tracking: GPS • Heart rate • Temperature • Activity • Stress levels • Sleep patterns
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Global Impact Tab */}
          <TabsContent value="global-impact" className="space-y-6">
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Globe className="h-6 w-6" />
                  🌍 Global Wildlife Conservation Impact
                </CardTitle>
                <p className="text-muted-foreground">
                  Track the worldwide impact of GAiA Animal Welfare across all continents and species.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
                    <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-green-400">2,847</div>
                    <div className="text-sm text-muted-foreground">Habitats Protected</div>
                  </div>
                  <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
                    <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-blue-400">156,000</div>
                    <div className="text-sm text-muted-foreground">Global Supporters</div>
                  </div>
                  <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
                    <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-purple-400">${globalStats.totalFunding.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Direct Funding</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-900/30 rounded border border-yellow-500/20">
                    <Leaf className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-yellow-400">{globalStats.carbonOffset}t</div>
                    <div className="text-sm text-muted-foreground">CO2 Offset</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-900/10">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-purple-400 mb-6 text-center">🌟 Success Stories & Releases</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Thunder', species: 'Golden Eagle', status: 'Successfully Released', location: 'Montana Wilderness', date: '2024-01-15' },
                    { name: 'Marina', species: 'Sea Turtle', status: 'Ocean Release', location: 'Pacific Ocean', date: '2024-01-08' },
                    { name: 'Rex', species: 'Gray Wolf', status: 'Pack Reintegration', location: 'Yellowstone', date: '2023-12-20' }
                  ].map((success, index) => (
                    <div key={index} className="bg-green-900/20 p-4 rounded border border-green-500/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-green-400">{success.name} - {success.species}</h4>
                          <p className="text-sm text-green-300">{success.status}</p>
                          <p className="text-xs text-muted-foreground">{success.location} • {success.date}</p>
                        </div>
                        <Badge className="bg-green-600">
                          <Star className="h-3 w-3 mr-1" />
                          SUCCESS
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
