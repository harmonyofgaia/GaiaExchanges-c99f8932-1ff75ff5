import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building, Zap, Trophy, Users, MapPin, Heart } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { gaiaTokenService } from '@/services/gaiaTokenService'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface BeeHotelData {
  id: string
  name: string
  location: string
  capacity: number
  occupancy: number
  beeSpecies: string[]
  gaiaTokensEarned: number
  status: 'active' | 'building' | 'planning'
  pollinationRadius: number
  biodiversityScore: number
}

export default function BeeHotel() {
  const [beeHotels, setBeeHotels] = useState<BeeHotelData[]>([
    {
      id: '1',
      name: 'Garden Paradise Hotel',
      location: 'Berlin, Germany',
      capacity: 200,
      occupancy: 145,
      beeSpecies: ['Mason Bee', 'Leafcutter Bee', 'Solitary Bee'],
      gaiaTokensEarned: 450,
      status: 'active',
      pollinationRadius: 2.5,
      biodiversityScore: 85
    },
    {
      id: '2', 
      name: 'Urban Pollinator Hub',
      location: 'New York, USA',
      capacity: 150,
      occupancy: 98,
      beeSpecies: ['Mason Bee', 'Mining Bee'],
      gaiaTokensEarned: 280,
      status: 'active',
      pollinationRadius: 1.8,
      biodiversityScore: 72
    }
  ])
  
  const [userGaiaBalance, setUserGaiaBalance] = useState(0)
  const [isStaking, setIsStaking] = useState(false)

  useEffect(() => {
    // Simulate fetching GAIA balance
    const fetchBalance = async () => {
      const tokenData = await gaiaTokenService.fetchLiveTokenData()
      setUserGaiaBalance(1250) // Simulated user balance
    }
    fetchBalance()
  }, [])

  const handleStakeTokens = async (hotelId: string, amount: number) => {
    setIsStaking(true)
    try {
      // Integrate with GAIA token staking
      console.log(`Staking ${amount} GAIA tokens to bee hotel ${hotelId}`)
      console.log(`Contract: ${GAIA_TOKEN.CONTRACT_ADDRESS}`)
      console.log(`Wallet: ${GAIA_TOKEN.WALLET_ADDRESS}`)
      
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate blockchain transaction
      
      toast.success(`Successfully staked ${amount} GAIA tokens!`, {
        description: 'Your tokens are now earning bee hotel rewards'
      })
      
      setUserGaiaBalance(prev => prev - amount)
    } catch (error) {
      toast.error('Staking failed', {
        description: 'Please try again later'
      })
    } finally {
      setIsStaking(false)
    }
  }

  const handleCreateBeeHotel = async () => {
    const stakingAmount = 100
    if (userGaiaBalance < stakingAmount) {
      toast.error('Insufficient GAIA tokens', {
        description: `You need ${stakingAmount} GAIA tokens to create a bee hotel`
      })
      return
    }

    try {
      await handleStakeTokens('new', stakingAmount)
      
      const newHotel: BeeHotelData = {
        id: Date.now().toString(),
        name: 'My Bee Hotel',
        location: 'Your Location',
        capacity: 50,
        occupancy: 0,
        beeSpecies: [],
        gaiaTokensEarned: 0,
        status: 'building',
        pollinationRadius: 0.5,
        biodiversityScore: 0
      }
      
      setBeeHotels(prev => [...prev, newHotel])
      toast.success('Bee hotel creation started!', {
        description: 'Your bee hotel is being built with GAIA token funding'
      })
    } catch (error) {
      console.error('Failed to create bee hotel:', error)
    }
  }

  const getTotalEarnings = () => {
    return beeHotels.reduce((total, hotel) => total + hotel.gaiaTokensEarned, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-green-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            🏨 Bee Hotel Network
          </h1>
          <p className="text-xl text-muted-foreground">
            Create pollinator habitats and earn GAIA tokens through biodiversity conservation
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Hotels</p>
                  <p className="text-2xl font-bold text-yellow-400">{beeHotels.length}</p>
                </div>
                <Building className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GAIA Earned</p>
                  <p className="text-2xl font-bold text-orange-400">{getTotalEarnings()}</p>
                </div>
                <Zap className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bee Species</p>
                  <p className="text-2xl font-bold text-green-400">
                    {new Set(beeHotels.flatMap(hotel => hotel.beeSpecies)).size}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GAIA Balance</p>
                  <p className="text-2xl font-bold text-blue-400">{userGaiaBalance}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="hotels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hotels">My Bee Hotels</TabsTrigger>
            <TabsTrigger value="create">Create Hotel</TabsTrigger>
            <TabsTrigger value="global">Global Network</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {beeHotels.map((hotel) => (
                <Card key={hotel.id} className="border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-yellow-400">{hotel.name}</span>
                      <Badge variant={hotel.status === 'active' ? 'default' : 'secondary'}>
                        {hotel.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {hotel.location}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Occupancy</span>
                        <span>{hotel.occupancy}/{hotel.capacity}</span>
                      </div>
                      <Progress value={(hotel.occupancy / hotel.capacity) * 100} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">GAIA Earned</p>
                        <p className="font-bold text-yellow-400">{hotel.gaiaTokensEarned}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Biodiversity Score</p>
                        <p className="font-bold text-green-400">{hotel.biodiversityScore}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Bee Species:</p>
                      <div className="flex flex-wrap gap-1">
                        {hotel.beeSpecies.map((species) => (
                          <Badge key={species} variant="outline" className="text-xs">
                            {species}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleStakeTokens(hotel.id, 50)}
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      disabled={isStaking}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Stake 50 GAIA for Expansion
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-400">Create New Bee Hotel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <Building className="h-24 w-24 text-orange-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Start Your Bee Hotel</h3>
                    <p className="text-muted-foreground">
                      Stake 100 GAIA tokens to create a new bee hotel and start earning rewards
                      through pollinator conservation.
                    </p>
                  </div>
                  
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <h4 className="font-bold text-orange-400 mb-2">Benefits:</h4>
                    <ul className="text-sm space-y-1 text-left">
                      <li>• Earn GAIA tokens through bee occupancy</li>
                      <li>• Increase local biodiversity scores</li>
                      <li>• Support pollinator populations</li>
                      <li>• Contribute to ecosystem restoration</li>
                      <li>• Join the global bee hotel network</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleCreateBeeHotel}
                    className="bg-orange-600 hover:bg-orange-700"
                    disabled={isStaking || userGaiaBalance < 100}
                    size="lg"
                  >
                    <Building className="h-5 w-5 mr-2" />
                    Create Bee Hotel (100 GAIA)
                  </Button>
                  
                  {userGaiaBalance < 100 && (
                    <p className="text-sm text-red-400">
                      Insufficient GAIA balance. You need 100 GAIA tokens.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="global" className="space-y-6">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Global Bee Hotel Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <Users className="h-16 w-16 text-green-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Connected Worldwide</h3>
                    <p className="text-muted-foreground mb-4">
                      Join thousands of bee hotels worldwide creating pollinator habitats
                      and earning GAIA tokens through conservation.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <p className="text-2xl font-bold text-green-400">2,847</p>
                      <p className="text-sm text-muted-foreground">Active Hotels</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-2xl font-bold text-blue-400">15,230</p>
                      <p className="text-sm text-muted-foreground">Bee Species Supported</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <p className="text-2xl font-bold text-yellow-400">892K</p>
                      <p className="text-sm text-muted-foreground">GAIA Tokens Earned</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}