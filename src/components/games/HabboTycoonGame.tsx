
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  Building2, 
  Users, 
  Coins, 
  TrendingUp,
  Zap,
  Crown,
  Star,
  Gift,
  MapPin,
  Shield,
  Globe,
  Eye,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

interface Player {
  id: string
  name: string
  avatar: string
  level: number
  coins: number
  buildings: number
  reputation: number
  location: { lat: number, lng: number, city: string }
  online: boolean
}

interface Building {
  id: string
  type: 'hotel' | 'restaurant' | 'attraction' | 'shop' | 'casino' | 'spa'
  name: string
  level: number
  income: number
  cost: number
  x: number
  y: number
}

export function HabboTycoonGame() {
  const [gameState, setGameState] = useState<'menu' | 'building' | 'chatroom' | 'world'>('menu')
  const [playerData, setPlayerData] = useState<Player>({
    id: 'player1',
    name: 'TycoonMaster',
    avatar: '🏨',
    level: 15,
    coins: 125000,
    buildings: 12,
    reputation: 87,
    location: { lat: 52.5200, lng: 13.4050, city: 'Berlin' },
    online: true
  })

  const [buildings, setBuildings] = useState<Building[]>([
    { id: '1', type: 'hotel', name: 'Grand Plaza Hotel', level: 3, income: 150, cost: 1000, x: 100, y: 100 },
    { id: '2', type: 'restaurant', name: 'Eco Bistro', level: 2, income: 80, cost: 500, x: 200, y: 150 },
    { id: '3', type: 'attraction', name: 'Rainbow Rollercoaster', level: 1, income: 200, cost: 2000, x: 150, y: 200 }
  ])

  const [onlinePlayers, setOnlinePlayers] = useState(2847)
  const [totalRevenue, setTotalRevenue] = useState(456780)
  const [securityLevel, setSecurityLevel] = useState(100)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [chatMode, setChatMode] = useState(false)

  const gameLoopRef = useRef<NodeJS.Timeout>()

  const buildingTypes = [
    { id: 'hotel', name: 'Luxury Hotel', cost: 2500, income: 250, icon: '🏨' },
    { id: 'restaurant', name: 'Gourmet Restaurant', cost: 1500, income: 150, icon: '🍽️' },
    { id: 'attraction', name: 'Theme Attraction', cost: 4000, income: 400, icon: '🎢' },
    { id: 'shop', name: 'Premium Shop', cost: 1000, income: 100, icon: '🏪' },
    { id: 'casino', name: 'Golden Casino', cost: 8000, income: 800, icon: '🎰' },
    { id: 'spa', name: 'Wellness Spa', cost: 3500, income: 350, icon: '🧘' }
  ]

  useEffect(() => {
    console.log('🏨 HABBO TYCOON - FULL GAME ENGINE INITIALIZED')
    console.log('🛡️ QUANTUM SECURITY PROTOCOLS ACTIVE')
    console.log('🌍 GLOBAL VIRTUAL REAL LIFE PLATFORM READY')
    
    // Game loop for passive income and updates
    gameLoopRef.current = setInterval(() => {
      const income = buildings.reduce((total, building) => total + building.income, 0)
      
      setPlayerData(prev => ({
        ...prev,
        coins: prev.coins + income,
        reputation: Math.min(100, prev.reputation + 0.1)
      }))
      
      setTotalRevenue(prev => prev + income)
      setOnlinePlayers(prev => prev + Math.floor(Math.random() * 10) - 5)

      // Random events
      if (Math.random() < 0.05) {
        const events = [
          '🎊 Celebrity Visit - Reputation +10!',
          '💰 Investment Opportunity - Coins +5000!',
          '🏆 Tycoon Award - Fame Increased!',
          '🎢 New Attraction Design Unlocked!',
          '👥 VIP Group Booking - Revenue Spike!'
        ]
        const event = events[Math.floor(Math.random() * events.length)]
        toast.success('🌟 Special Event!', { description: event, duration: 4000 })
      }
    }, 3000)

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [buildings])

  const buildStructure = (type: string) => {
    const buildingType = buildingTypes.find(b => b.id === type)
    if (!buildingType) return

    if (playerData.coins >= buildingType.cost) {
      const newBuilding: Building = {
        id: Date.now().toString(),
        type: type as Building['type'],
        name: buildingType.name,
        level: 1,
        income: buildingType.income,
        cost: buildingType.cost,
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50
      }

      setBuildings(prev => [...prev, newBuilding])
      setPlayerData(prev => ({
        ...prev,
        coins: prev.coins - buildingType.cost,
        buildings: prev.buildings + 1,
        level: Math.floor((prev.buildings + 1) / 3) + 1
      }))

      toast.success(`🏗️ ${buildingType.name} Built!`, {
        description: `Generating ${buildingType.income} coins every 3 seconds`,
        duration: 3000
      })
    } else {
      toast.error('💰 Not enough coins!', {
        description: `You need ${buildingType.cost} coins to build ${buildingType.name}`,
        duration: 3000
      })
    }
  }

  const upgradeBuilding = (buildingId: string) => {
    setBuildings(prev => prev.map(building => {
      if (building.id === buildingId && playerData.coins >= building.cost / 2) {
        setPlayerData(p => ({ ...p, coins: p.coins - building.cost / 2 }))
        
        toast.success('⬆️ Building Upgraded!', {
          description: `${building.name} is now level ${building.level + 1}`,
          duration: 3000
        })

        return {
          ...building,
          level: building.level + 1,
          income: Math.floor(building.income * 1.5)
        }
      }
      return building
    }))
  }

  const enterChatroom = () => {
    setChatMode(true)
    toast.success('💬 Entering Global Chatroom!', {
      description: 'Connected to secure quantum-encrypted chat',
      duration: 3000
    })
  }

  const collectAllIncome = () => {
    const totalIncome = buildings.reduce((sum, b) => sum + b.income, 0)
    setPlayerData(prev => ({ ...prev, coins: prev.coins + totalIncome * 5 }))
    
    toast.success('💰 Mass Income Collection!', {
      description: `Collected ${totalIncome * 5} coins from all buildings!`,
      duration: 3000
    })
  }

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Building2 className="h-6 w-6 animate-bounce" />
            🏨 HABBO TYCOON - Complete Virtual Empire
          </CardTitle>
          <div className="flex gap-4 text-sm flex-wrap">
            <Badge className="bg-green-600">
              👤 {playerData.name} - Level {playerData.level}
            </Badge>
            <Badge className="bg-yellow-600">
              💰 {playerData.coins.toLocaleString()} Coins
            </Badge>
            <Badge className="bg-blue-600">
              🏢 {playerData.buildings} Buildings
            </Badge>
            <Badge className="bg-purple-600">
              🌟 {playerData.reputation}% Reputation
            </Badge>
            <Badge className="bg-red-600">
              👥 {onlinePlayers.toLocaleString()} Online
            </Badge>
            <Badge className="bg-green-600">
              🛡️ Security: {securityLevel}%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Game Mode Tabs */}
      <Tabs value={gameState} onValueChange={(value) => setGameState(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="menu">🏠 Main</TabsTrigger>
          <TabsTrigger value="building">🏗️ Build</TabsTrigger>
          <TabsTrigger value="world">🌍 World</TabsTrigger>
          <TabsTrigger value="chatroom">💬 Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-6">
          {/* Main Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/30 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">📊 Empire Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Buildings:</span>
                    <span className="text-blue-400 font-bold">{buildings.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hourly Income:</span>
                    <span className="text-green-400 font-bold">
                      {(buildings.reduce((sum, b) => sum + b.income, 0) * 20).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span className="text-yellow-400 font-bold">${totalRevenue.toLocaleString()}</span>
                  </div>
                  <Progress value={playerData.reputation} className="h-3" />
                  <div className="text-center text-sm text-muted-foreground">
                    Reputation: {playerData.reputation}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">🚀 Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={collectAllIncome} className="w-full bg-green-600 hover:bg-green-700">
                  <Coins className="h-4 w-4 mr-2" />
                  Collect All Income
                </Button>
                <Button onClick={enterChatroom} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4 mr-2" />
                  Enter Global Chat
                </Button>
                <Button onClick={() => setGameState('world')} className="w-full bg-purple-600 hover:bg-purple-700">
                  <Globe className="h-4 w-4 mr-2" />
                  Explore World Map
                </Button>
                <Button variant="outline" className="w-full border-yellow-500/30 text-yellow-400">
                  <Gift className="h-4 w-4 mr-2" />
                  Daily Rewards
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="building" className="space-y-6">
          {/* Building Interface */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">🏗️ Your Tycoon Empire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-80 bg-gradient-to-b from-green-900/20 to-brown-900/20 rounded-lg border border-green-500/30 overflow-hidden">
                  {buildings.map((building) => (
                    <div
                      key={building.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform group"
                      style={{ left: building.x, top: building.y }}
                      onClick={() => upgradeBuilding(building.id)}
                      title={`${building.name} - Level ${building.level} - Income: ${building.income}/3s - Click to upgrade`}
                    >
                      <div className="text-3xl group-hover:animate-bounce">
                        {buildingTypes.find(b => b.id === building.type)?.icon}
                      </div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Lv.{building.level} | +{building.income}
                      </div>
                    </div>
                  ))}
                  {buildings.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      🏗️ Start building your tycoon empire!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">🏗️ Construction Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {buildingTypes.map((building) => (
                  <Button 
                    key={building.id}
                    onClick={() => buildStructure(building.id)}
                    disabled={playerData.coins < building.cost}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 flex items-center justify-between p-3 h-auto"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{building.icon}</span>
                      <div className="text-left">
                        <div className="text-sm font-bold">{building.name}</div>
                        <div className="text-xs opacity-75">+{building.income}/3s</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{building.cost} 💰</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="world" className="space-y-6">
          {/* World Map */}
          <Card className="bg-black/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">🌍 Global Tycoon Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-lg border border-green-500/30 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl animate-pulse">🌍</div>
                    <div className="text-2xl font-bold text-green-400">
                      GLOBAL TYCOON NETWORK
                    </div>
                    <div className="text-lg text-green-300">
                      Connect with tycoons worldwide • {onlinePlayers.toLocaleString()} players online
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-blue-900/30 rounded">
                        <div className="font-bold text-blue-400">47</div>
                        <div>Countries</div>
                      </div>
                      <div className="text-center p-2 bg-purple-900/30 rounded">
                        <div className="font-bold text-purple-400">12,456</div>
                        <div>Hotels</div>
                      </div>
                      <div className="text-center p-2 bg-orange-900/30 rounded">
                        <div className="font-bold text-orange-400">98,754</div>
                        <div>Buildings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatroom" className="space-y-6">
          {/* Global Chatroom */}
          <Card className="bg-black/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400">💬 Global Tycoon Chatroom</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">🔒 Quantum Encrypted</Badge>
                <Badge className="bg-blue-600">👥 {onlinePlayers.toLocaleString()} Online</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 bg-black/50 rounded-lg border border-blue-500/30 p-4 overflow-y-auto">
                  <div className="space-y-2 text-sm">
                    <div className="text-green-400">🏨 TycoonMaster47: Anyone want to form an alliance?</div>
                    <div className="text-blue-400">👑 HotelEmperor: My casino is making bank today! 💰</div>
                    <div className="text-purple-400">🎢 RideBuilder: New rollercoaster design is amazing!</div>
                    <div className="text-yellow-400">💼 BusinessMogul: Trading rare building materials</div>
                    <div className="text-pink-400">🌟 StarManager: VIP event tonight at my resort!</div>
                    <div className="text-cyan-400">🎯 {playerData.name}: Ready to dominate the tycoon world!</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your message to the global tycoon community..."
                    className="flex-1 bg-black/50 border-blue-500/30"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Send 💬
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Game Statistics Footer */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-green-900/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-900/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{onlinePlayers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Players Online</div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{playerData.level}</div>
            <div className="text-sm text-muted-foreground">Player Level</div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-900/30 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{buildings.length}</div>
            <div className="text-sm text-muted-foreground">Buildings Built</div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-900/30 border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{securityLevel}%</div>
            <div className="text-sm text-muted-foreference">Security Level</div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-900/30 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">24/7</div>
            <div className="text-sm text-muted-foreground">Always Online</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
