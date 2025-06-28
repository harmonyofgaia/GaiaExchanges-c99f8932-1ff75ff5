
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Heart, 
  Coins, 
  MapPin, 
  Target, 
  Zap,
  TreePine,
  Butterfly,
  Apple,
  Globe,
  TrendingUp,
  Wallet,
  Camera,
  Activity,
  Home,
  Utensils,
  Sparkles,
  Star,
  Crown,
  Shield,
  Rocket,
  Eye,
  Brain,
  Atom,
  Mountain,
  Waves,
  Sun,
  Moon
} from 'lucide-react'
import { toast } from 'sonner'
import { MinecraftLandscapeBuilder } from '@/components/MinecraftLandscapeBuilder'
import { PhantomWalletConnector } from '@/components/PhantomWalletConnector'
import { RealTimeAnimalTracker } from '@/components/RealTimeAnimalTracker'

const AnimalNFTCommunity = () => {
  const [animalNFTs, setAnimalNFTs] = useState([
    {
      id: 1,
      name: "Thunder - The Majestic Eagle",
      species: "Golden Eagle",
      location: "Rocky Mountain Sanctuary, Colorado",
      currentHome: "Flight Rehabilitation Center - Dome 7",
      walletBalance: 2847.50,
      energyLevel: 95,
      healthStatus: "Excellent",
      moodLevel: 88,
      hungerLevel: 25,
      lastFed: "2 hours ago",
      rescueProgress: 78,
      releaseGoal: 15000,
      memories: [
        "First successful flight after wing injury recovery",
        "Learned to hunt with mentor eagle 'Storm'",
        "Built trust with caretaker Sarah after 3 months"
      ],
      emotions: {
        happiness: 85,
        trust: 92,
        excitement: 78,
        calmness: 88
      },
      investors: 342,
      totalInvested: 28475.50,
      rarity: "Legendary",
      level: 47,
      experience: 18750,
      nextLevelXP: 20000
    },
    {
      id: 2,
      name: "Luna - The Gentle Wolf",
      species: "Arctic Wolf",
      location: "Canadian Wildlife Preserve, Yukon",
      currentHome: "Pack Integration Habitat - Zone 3",
      walletBalance: 1923.75,
      energyLevel: 87,
      healthStatus: "Good",
      moodLevel: 76,
      hungerLevel: 15,
      lastFed: "45 minutes ago",
      rescueProgress: 65,
      releaseGoal: 22000,
      memories: [
        "Rescued from illegal captivity at 6 months old",
        "First howl with the sanctuary pack",
        "Successful integration with alpha female 'Aurora'"
      ],
      emotions: {
        happiness: 79,
        trust: 68,
        excitement: 82,
        calmness: 91
      },
      investors: 258,
      totalInvested: 19237.50,
      rarity: "Epic",
      level: 34,
      experience: 12400,
      nextLevelXP: 15000
    },
    {
      id: 3,
      name: "Coral - The Ocean Guardian",
      species: "Sea Turtle",
      location: "Marine Life Sanctuary, Hawaii",
      currentHome: "Rehabilitation Pool - Section A",
      walletBalance: 3456.80,
      energyLevel: 72,
      healthStatus: "Recovering",
      moodLevel: 68,
      hungerLevel: 35,
      lastFed: "1 hour ago",
      rescueProgress: 45,
      releaseGoal: 18500,
      memories: [
        "Rescued from plastic entanglement",
        "First successful dive to 30 feet",
        "Recognized volunteers by their swimming patterns"
      ],
      emotions: {
        happiness: 71,
        trust: 85,
        excitement: 65,
        calmness: 94
      },
      investors: 467,
      totalInvested: 34568.00,
      rarity: "Mythical",
      level: 52,
      experience: 24100,
      nextLevelXP: 28000
    }
  ])

  const [investmentGoals] = useState([
    {
      id: 1,
      title: "7-Layer Forest Restoration",
      description: "Create multi-layered forest ecosystems with canopy, understory, shrub, herbaceous, moss, root, and fungal layers",
      targetAmount: 500000,
      currentAmount: 287450,
      progress: 57,
      impact: "50,000 trees planted, 200 species habitat created",
      timeRemaining: "8 months",
      category: "Forest Restoration"
    },
    {
      id: 2,
      title: "Bee & Butterfly Paradise Gardens",
      description: "Design specialized pollinator havens with native flowering plants and nesting sites",
      targetAmount: 150000,
      currentAmount: 98750,
      progress: 66,
      impact: "12 bee colonies established, 500+ butterfly species supported",
      timeRemaining: "4 months",
      category: "Pollinator Protection"
    },
    {
      id: 3,
      title: "Wild Fruit Tree Corridors",
      description: "Plant food-bearing trees to create wildlife corridors and feeding stations",
      targetAmount: 75000,
      currentAmount: 45620,
      progress: 61,
      impact: "2,500 fruit trees planted, 15 wildlife corridors established",
      timeRemaining: "6 months",
      category: "Wildlife Corridors"
    }
  ])

  const [globalStats, setGlobalStats] = useState({
    totalAnimalsRescued: 15847,
    totalInvestors: 89650,
    totalInvested: 12847500.75,
    animalsReleased: 3456,
    sanctuariesBuilt: 127,
    forestsRestored: 45,
    liveViewers: 24789
  })

  const [matrixRain, setMatrixRain] = useState<Array<{id: number, x: number, y: number, char: string}>>([])

  // Matrix rain effect for wallet display
  useEffect(() => {
    const createMatrixRain = () => {
      const chars = ['0', '1', '$', 'G', 'A', 'I', 'A', '♦', '♣', '♠', '♥']
      const newRain = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        char: chars[Math.floor(Math.random() * chars.length)]
      }))
      setMatrixRain(newRain)
    }

    createMatrixRain()
    const interval = setInterval(createMatrixRain, 3000)
    return () => clearInterval(interval)
  }, [])

  // Real-time updates simulation
  useEffect(() => {
    const updateLiveData = () => {
      setAnimalNFTs(prev => prev.map(animal => ({
        ...animal,
        energyLevel: Math.max(60, Math.min(100, animal.energyLevel + Math.floor(Math.random() * 6 - 3))),
        walletBalance: animal.walletBalance + (Math.random() * 50),
        emotions: {
          happiness: Math.max(60, Math.min(100, animal.emotions.happiness + Math.floor(Math.random() * 6 - 3))),
          trust: Math.max(60, Math.min(100, animal.emotions.trust + Math.floor(Math.random() * 4 - 2))),
          excitement: Math.max(60, Math.min(100, animal.emotions.excitement + Math.floor(Math.random() * 8 - 4))),
          calmness: Math.max(60, Math.min(100, animal.emotions.calmness + Math.floor(Math.random() * 4 - 2)))
        }
      })))

      setGlobalStats(prev => ({
        ...prev,
        totalInvested: prev.totalInvested + (Math.random() * 1000),
        liveViewers: prev.liveViewers + Math.floor(Math.random() * 20 - 10)
      }))
    }

    const interval = setInterval(updateLiveData, 5000)
    return () => clearInterval(interval)
  }, [])

  const investInAnimal = (animalId: number, amount: number) => {
    setAnimalNFTs(prev => prev.map(animal => 
      animal.id === animalId 
        ? { 
            ...animal, 
            walletBalance: animal.walletBalance + amount,
            totalInvested: animal.totalInvested + amount,
            investors: animal.investors + 1
          }
        : animal
    ))

    toast.success('🦅 Investment Successful!', {
      description: `Invested $${amount} in animal welfare. Watch their progress in real-time!`,
      duration: 5000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-green-900/20 to-blue-900/20 relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        {matrixRain.map((drop) => (
          <div
            key={drop.id}
            className="absolute text-green-400 font-mono text-sm animate-pulse"
            style={{
              left: `${drop.x}%`,
              top: `${drop.y}%`,
              animationDelay: `${drop.id * 0.2}s`,
              animationDuration: '3s'
            }}
          >
            {drop.char}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        
        {/* Impressive Header with Animations */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-green-600/20 rounded-3xl blur-3xl animate-pulse"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-4xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
              🌍 ANIMAL NFT LIVING COMMUNITY
            </h1>
            <p className="text-2xl text-muted-foreground mt-4 animate-slide-in-right">
              🦅 Real Animals • Real Lives • Real Impact • Living Wallets
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-lg px-6 py-3 animate-scale-in">
                <Globe className="h-5 w-5 mr-2" />
                LIVE GLOBALLY
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg px-6 py-3 animate-scale-in">
                <Eye className="h-5 w-5 mr-2" />
                {globalStats.liveViewers.toLocaleString()} WATCHING
              </Badge>
            </div>
          </div>
        </div>

        {/* Global Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30 animate-fade-in">
            <CardContent className="pt-4 text-center">
              <Heart className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{globalStats.totalAnimalsRescued.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Animals Rescued</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 animate-fade-in">
            <CardContent className="pt-4 text-center">
              <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{globalStats.totalInvestors.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Global Investors</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 animate-fade-in">
            <CardContent className="pt-4 text-center">
              <Coins className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">${(globalStats.totalInvested / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-muted-foreground">Total Invested</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30 animate-fade-in">
            <CardContent className="pt-4 text-center">
              <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{globalStats.animalsReleased.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Released to Wild</div>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 animate-fade-in">
            <CardContent className="pt-4 text-center">
              <Home className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{globalStats.sanctuariesBuilt}</div>
              <div className="text-xs text-muted-foreground">Sanctuaries Built</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-teal-900/30 animate-fade-in">
            <CardContent className="pt-4 text-center">
              <TreePine className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{globalStats.forestsRestored}</div>
              <div className="text-xs text-muted-foreground">Forests Restored</div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-pink-900/30 animate-fade-in">
            <CardContent className="pt-4 text-center">
              <Eye className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{globalStats.liveViewers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Live Viewers</div>
            </CardContent>
          </Card>
        </div>

        {/* Phantom Wallet Connector */}
        <PhantomWalletConnector />

        {/* Animal NFTs with Living Wallets */}
        <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
              <Heart className="h-6 w-6" />
              🦅 LIVING ANIMAL NFTs - WITH REAL EMOTIONS & MEMORIES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {animalNFTs.map((animal) => (
                <div key={animal.id} className="relative">
                  {/* Animal NFT Card */}
                  <div className="p-6 border-2 border-gradient-to-r from-green-500/50 to-blue-500/50 rounded-xl bg-gradient-to-br from-green-900/20 to-blue-900/20 space-y-6 hover:scale-105 transition-transform duration-300">
                    
                    {/* Animal Header */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Crown className="h-6 w-6 text-yellow-400" />
                        <Badge className={`${
                          animal.rarity === 'Legendary' ? 'bg-gradient-to-r from-yellow-600 to-orange-600' :
                          animal.rarity === 'Mythical' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                          'bg-gradient-to-r from-blue-600 to-cyan-600'
                        } text-white`}>
                          {animal.rarity}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-green-400">{animal.name}</h3>
                      <p className="text-muted-foreground">{animal.species}</p>
                      <div className="flex items-center justify-center gap-2 text-sm text-cyan-400">
                        <MapPin className="h-4 w-4" />
                        {animal.location}
                      </div>
                    </div>

                    {/* Living Wallet */}
                    <div className="p-4 bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg border border-green-500/30 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <span key={i} className="absolute text-green-400 text-xs animate-pulse" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.3}s`
                          }}>$</span>
                        ))}
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-green-400" />
                            <span className="font-bold text-green-400">Living Wallet</span>
                          </div>
                          <Badge className="bg-green-600 text-white">GROWING</Badge>
                        </div>
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          ${animal.walletBalance.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Investors: {animal.investors} | Total: ${animal.totalInvested.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Real-Time Emotions & Status */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-900/30 rounded border border-blue-500/20">
                          <Zap className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                          <div className="text-lg font-bold text-blue-400">{animal.energyLevel}%</div>
                          <div className="text-xs text-muted-foreground">Energy</div>
                          <Progress value={animal.energyLevel} className="mt-2 h-2" />
                        </div>
                        <div className="text-center p-3 bg-green-900/30 rounded border border-green-500/20">
                          <Heart className="h-5 w-5 text-green-400 mx-auto mb-1" />
                          <div className="text-lg font-bold text-green-400">{animal.moodLevel}%</div>
                          <div className="text-xs text-muted-foreground">Mood</div>
                          <Progress value={animal.moodLevel} className="mt-2 h-2" />
                        </div>
                      </div>

                      {/* Emotional State */}
                      <div className="p-3 bg-purple-900/30 rounded border border-purple-500/20">
                        <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Real-Time Emotions
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span>😊 Happy:</span>
                            <span className="text-green-400">{animal.emotions.happiness}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>🤝 Trust:</span>
                            <span className="text-blue-400">{animal.emotions.trust}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>⚡ Excited:</span>
                            <span className="text-yellow-400">{animal.emotions.excitement}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>😌 Calm:</span>
                            <span className="text-cyan-400">{animal.emotions.calmness}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Living Status */}
                      <div className="p-3 bg-cyan-900/30 rounded border border-cyan-500/20">
                        <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          Current Living Situation
                        </h4>
                        <div className="text-sm space-y-1">
                          <div className="text-cyan-400">{animal.currentHome}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Utensils className="h-3 w-3" />
                            Last fed: {animal.lastFed}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Activity className="h-3 w-3" />
                            Health: {animal.healthStatus}
                          </div>
                        </div>
                      </div>

                      {/* Release Progress */}
                      <div className="p-3 bg-yellow-900/30 rounded border border-yellow-500/20">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-yellow-400 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Release Progress
                          </h4>
                          <span className="text-yellow-400 text-sm">{animal.rescueProgress}%</span>
                        </div>
                        <Progress value={animal.rescueProgress} className="mb-2 h-3" />
                        <div className="text-xs text-muted-foreground">
                          Goal: ${animal.releaseGoal.toLocaleString()} | Remaining: ${(animal.releaseGoal - animal.walletBalance).toFixed(0)}
                        </div>
                      </div>

                      {/* Memories */}
                      <div className="p-3 bg-pink-900/30 rounded border border-pink-500/20">
                        <h4 className="font-bold text-pink-400 mb-2 flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Precious Memories
                        </h4>
                        <div className="space-y-1">
                          {animal.memories.slice(0, 2).map((memory, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              • {memory}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Investment Actions */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          onClick={() => investInAnimal(animal.id, 50)}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xs"
                        >
                          +$50
                        </Button>
                        <Button 
                          onClick={() => investInAnimal(animal.id, 100)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
                        >
                          +$100
                        </Button>
                        <Button 
                          onClick={() => investInAnimal(animal.id, 500)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs"
                        >
                          +$500
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Goals with Subgroups */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-teal-900/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400 text-center justify-center">
              <Target className="h-6 w-6" />
              🌱 GLOBAL INVESTMENT GOALS & SUBGROUPS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {investmentGoals.map((goal) => (
                <div key={goal.id} className="p-6 bg-gradient-to-br from-green-900/40 to-blue-900/40 rounded-lg border border-green-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-green-400">{goal.title}</h3>
                    <Badge className="bg-green-600 text-white">{goal.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress:</span>
                      <span className="text-green-400 font-bold">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${goal.currentAmount.toLocaleString()} raised</span>
                      <span>Goal: ${goal.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
                    <div className="text-xs font-bold text-blue-400 mb-1">Real Impact:</div>
                    <div className="text-xs text-muted-foreground">{goal.impact}</div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-yellow-400">⏱️ {goal.timeRemaining} remaining</span>
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xs px-4 py-1">
                      INVEST NOW
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Animal Tracker */}
        <RealTimeAnimalTracker />

        {/* Minecraft Landscape Builder */}
        <MinecraftLandscapeBuilder />

        {/* Mission Statement */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-900/30 via-green-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-8">
            <h3 className="text-4xl font-bold text-purple-400 mb-6">🌍 THE MOST POWERFUL GAME EVER CREATED</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Experience real animals with real emotions, memories, and living wallets. Every investment creates 
              tangible impact across multiple realities. Build landscapes, save lives, and witness the future 
              of gaming where virtual actions create real-world change.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="p-6 bg-gradient-to-br from-green-900/40 to-cyan-900/40 rounded-lg border border-green-500/20">
                <Heart className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-400 mb-2">Living Emotions</h4>
                <p className="text-sm text-muted-foreground">Real animals with genuine feelings and memories</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg border border-blue-500/20">
                <Wallet className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-blue-400 mb-2">Living Wallets</h4>
                <p className="text-sm text-muted-foreground">Every animal has their own growing wallet</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/20">
                <Mountain className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-purple-400 mb-2">Minecraft Building</h4>
                <p className="text-sm text-muted-foreground">Create realistic landscapes for animals</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/20">
                <Rocket className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-yellow-400 mb-2">Global Impact</h4>
                <p className="text-sm text-muted-foreground">Real investments in real animal welfare</p>
              </div>
            </div>
            <p className="text-lg text-green-400 font-bold mt-8">
              🎵 "Seeds Will Form Into Music" - Every click, every investment, creates harmony across infinite dimensions! 🎵
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalNFTCommunity
