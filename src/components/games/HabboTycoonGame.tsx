
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Users, 
  Coins, 
  TrendingUp,
  Zap,
  Crown,
  Star,
  Gift
} from 'lucide-react'
import { toast } from 'sonner'

export function HabboTycoonGame() {
  const [gameStats, setGameStats] = useState({
    coins: 15000,
    visitors: 247,
    rooms: 12,
    popularity: 85
  })

  const [buildings, setBuildings] = useState([
    { id: 1, name: 'Eco Café', cost: 500, income: 50, owned: true },
    { id: 2, name: 'Green Garden', cost: 1000, income: 100, owned: true },
    { id: 3, name: 'Solar Panel Array', cost: 2500, income: 250, owned: false },
    { id: 4, name: 'Wind Farm', cost: 5000, income: 500, owned: false },
    { id: 5, name: 'Recycling Center', cost: 7500, income: 750, owned: false }
  ])

  const handlePurchase = (building: typeof buildings[0]) => {
    if (gameStats.coins >= building.cost) {
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - building.cost,
        visitors: prev.visitors + Math.floor(building.income / 10)
      }))
      
      setBuildings(prev =>
        prev.map(b => b.id === building.id ? { ...b, owned: true } : b)
      )
      
      toast.success('🏢 Building Purchased!', {
        description: `${building.name} is now generating income and environmental impact!`
      })
    } else {
      toast.error('💰 Insufficient Funds!', {
        description: `You need ${building.cost - gameStats.coins} more GAiA coins!`
      })
    }
  }

  const collectIncome = () => {
    const totalIncome = buildings
      .filter(b => b.owned)
      .reduce((sum, b) => sum + b.income, 0)
    
    setGameStats(prev => ({
      ...prev,
      coins: prev.coins + totalIncome
    }))
    
    toast.success('💰 Income Collected!', {
      description: `Earned ${totalIncome} GAiA coins from your eco-friendly empire!`
    })
  }

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Building2 className="h-6 w-6" />
            🏨 Habbo Tycoon - Build Your Eco Empire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-yellow-900/20 rounded-lg">
              <Coins className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{gameStats.coins}</div>
              <div className="text-sm text-muted-foreground">GAiA Coins</div>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded-lg">
              <Users className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{gameStats.visitors}</div>
              <div className="text-sm text-muted-foreground">Daily Visitors</div>
            </div>
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <Building2 className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{gameStats.rooms}</div>
              <div className="text-sm text-muted-foreground">Buildings</div>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded-lg">
              <Star className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{gameStats.popularity}%</div>
              <div className="text-sm text-muted-foreground">Popularity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buildings Shop */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">🏪 Eco Building Shop</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildings.map((building) => (
              <Card key={building.id} className={`border ${building.owned ? 'border-green-500/30 bg-green-900/20' : 'border-gray-500/30'}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {building.name}
                    {building.owned && <Badge className="bg-green-600">OWNED</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Cost:</span>
                      <span className="text-yellow-400">{building.cost} coins</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Income:</span>
                      <span className="text-green-400">{building.income}/hour</span>
                    </div>
                    <Button
                      onClick={() => handlePurchase(building)}
                      disabled={building.owned || gameStats.coins < building.cost}
                      className={`w-full ${
                        building.owned 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                    >
                      {building.owned ? 'OWNED' : 'PURCHASE'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="border-blue-500/30">
        <CardContent className="pt-6">
          <div className="flex gap-4 justify-center">
            <Button
              onClick={collectIncome}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Collect Income
            </Button>
            <Button variant="outline" className="border-purple-500/30">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Buildings
            </Button>
            <Button variant="outline" className="border-yellow-500/30">
              <Gift className="h-4 w-4 mr-2" />
              Daily Bonus
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
