import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Gift, 
  Sparkles, 
  Crown, 
  Star, 
  Heart,
  Zap,
  Calendar,
  Users,
  Coins,
  Trophy,
  Rocket,
  Phone,
  Watch,
  Package,
  PartyPopper
} from 'lucide-react'
import { toast } from 'sonner'

interface LegacyProduct {
  id: string
  name: string
  type: 'device' | 'innovation' | 'future'
  description: string
  originalPrice: number
  giftPrice: number
  availability: number
  totalGifted: number
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical'
  icon: any
  benefits: string[]
  nostalgiaFactor: number
}

interface CommunityGift {
  id: string
  recipientType: 'individual' | 'community' | 'animal' | 'project'
  recipientName: string
  giftType: 'legacy-product' | 'funding' | 'special-event' | 'care-package'
  amount: number
  description: string
  timestamp: string
  senderCount: number
  impact: string
}

interface SpecialEvent {
  id: string
  name: string
  description: string
  targetFunding: number
  currentFunding: number
  participantCount: number
  endDate: string
  eventType: 'rescue' | 'celebration' | 'habitat' | 'community'
  rewards: string[]
}

export function CommunityVaultSystem() {
  const [vaultBalance, setVaultBalance] = useState(4826750.50)
  const [dailyContributions, setDailyContributions] = useState(18450.75)
  const [totalMembers, setTotalMembers] = useState(28647)

  const [legacyProducts] = useState<LegacyProduct[]>([
    {
      id: 'legacy_001',
      name: 'GAiA Blackberry Classic',
      type: 'device',
      description: 'The legendary communication device that started the GAiA revolution',
      originalPrice: 599,
      giftPrice: 150,
      availability: 247,
      totalGifted: 1853,
      rarity: 'Legendary',
      icon: Phone,
      benefits: [
        'Secure GAiA Network Access',
        'Nostalgic Physical Keyboard',
        'Lifetime Updates',
        'Collector Status'
      ],
      nostalgiaFactor: 95
    },
    {
      id: 'legacy_002',
      name: 'GAiA Oldtimer Watch',
      type: 'device',
      description: 'Vintage-inspired smartwatch with modern GAiA ecosystem integration',
      originalPrice: 349,
      giftPrice: 89,
      availability: 456,
      totalGifted: 967,
      rarity: 'Epic',
      icon: Watch,
      benefits: [
        'Real-time Animal Tracking',
        'Vintage Analog Design',
        'Solar Charging',
        'Heritage Badge'
      ],
      nostalgiaFactor: 88
    },
    {
      id: 'legacy_003',
      name: 'GAiA Quantum Harmony Pod',
      type: 'future',
      description: 'Next-generation meditation and environmental connection device',
      originalPrice: 1299,
      giftPrice: 325,
      availability: 89,
      totalGifted: 234,
      rarity: 'Mythical',
      icon: Sparkles,
      benefits: [
        'Quantum Meditation',
        'Animal Emotion Sync',
        'Future Tech Preview',
        'Exclusive Access'
      ],
      nostalgiaFactor: 100
    },
    {
      id: 'legacy_004',
      name: 'GAiA Innovation Toolkit',
      type: 'innovation',
      description: 'Complete package of GAiA development tools and resources',
      originalPrice: 799,
      giftPrice: 199,
      availability: 178,
      totalGifted: 556,
      rarity: 'Rare',
      icon: Package,
      benefits: [
        'Developer Resources',
        'API Access',
        'Community Priority',
        'Innovation Badge'
      ],
      nostalgiaFactor: 82
    }
  ])

  const [recentGifts, setRecentGifts] = useState<CommunityGift[]>([
    {
      id: 'gift_001',
      recipientType: 'animal',
      recipientName: 'Luna - Arctic Wolf',
      giftType: 'care-package',
      amount: 2500,
      description: 'Emergency medical care funding',
      timestamp: '2024-01-20T14:30:00Z',
      senderCount: 47,
      impact: 'Life-saving surgery completed successfully'
    },
    {
      id: 'gift_002',
      recipientType: 'community',
      recipientName: 'Wildlife Sanctuary Network',
      giftType: 'legacy-product',
      amount: 1800,
      description: 'GAiA Blackberry devices for field communication',
      timestamp: '2024-01-20T13:15:00Z',
      senderCount: 23,
      impact: '12 sanctuaries now connected to GAiA network'
    },
    {
      id: 'gift_003',
      recipientType: 'individual',
      recipientName: 'Sarah - Wildlife Researcher',
      giftType: 'special-event',
      amount: 750,
      description: 'Research equipment support',
      timestamp: '2024-01-20T12:00:00Z',
      senderCount: 156,
      impact: 'New tiger behavior study launched'
    }
  ])

  const [activeEvents, setActiveEvents] = useState<SpecialEvent[]>([
    {
      id: 'event_001',
      name: 'Global Animal Rescue Day',
      description: 'Community-wide effort to fund emergency rescues worldwide',
      targetFunding: 50000,
      currentFunding: 37850,
      participantCount: 2847,
      endDate: '2024-02-01T00:00:00Z',
      eventType: 'rescue',
      rewards: ['Exclusive NFT Badge', 'Hero Status', 'Priority Access']
    },
    {
      id: 'event_002',
      name: 'Legacy Product Revival Festival',
      description: 'Celebrate GAiA history by gifting vintage products to new members',
      targetFunding: 25000,
      currentFunding: 18200,
      participantCount: 1456,
      endDate: '2024-01-30T00:00:00Z',
      eventType: 'celebration',
      rewards: ['Nostalgia Badge', 'Product Discounts', 'Community Recognition']
    }
  ])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVaultBalance(prev => prev + (Math.random() * 500))
      setDailyContributions(prev => prev + (Math.random() * 100))
      if (Math.random() > 0.8) {
        setTotalMembers(prev => prev + 1)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const sendCommunityGift = (productId: string, recipientType: string, recipientName: string, giftCount: number = 1) => {
    const product = legacyProducts.find(p => p.id === productId)
    if (!product) return

    const totalCost = product.giftPrice * giftCount
    
    if (vaultBalance >= totalCost) {
      const newGift: CommunityGift = {
        id: `gift_${Date.now()}`,
        recipientType: recipientType as any,
        recipientName,
        giftType: 'legacy-product',
        amount: totalCost,
        description: `${giftCount}x ${product.name}`,
        timestamp: new Date().toISOString(),
        senderCount: Math.floor(Math.random() * 50) + 10,
        impact: `${product.name} delivered with love from GAiA community`
      }

      setRecentGifts(prev => [newGift, ...prev.slice(0, 9)])
      setVaultBalance(prev => prev - totalCost)

      toast.success('🎁 Community Gift Sent!', {
        description: `${giftCount}x ${product.name} sent to ${recipientName}`,
        duration: 5000
      })
    } else {
      toast.error('Insufficient Vault Balance', {
        description: 'Community needs more contributions for this gift',
        duration: 3000
      })
    }
  }

  const contributeToEvent = (eventId: string, amount: number) => {
    setActiveEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              currentFunding: event.currentFunding + amount,
              participantCount: event.participantCount + 1
            }
          : event
      )
    )

    setVaultBalance(prev => prev - amount)

    toast.success('🎉 Event Contribution Made!', {
      description: `$${amount} contributed to special event`,
      duration: 5000
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythical': return 'from-purple-600 to-pink-600'
      case 'Legendary': return 'from-yellow-600 to-orange-600'
      case 'Epic': return 'from-blue-600 to-purple-600'
      case 'Rare': return 'from-green-600 to-blue-600'
      default: return 'from-gray-600 to-gray-500'
    }
  }

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'rescue': return 'border-red-500/30 bg-gradient-to-br from-red-900/20 to-orange-900/20'
      case 'celebration': return 'border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20'
      case 'habitat': return 'border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20'
      case 'community': return 'border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20'
      default: return 'border-gray-500/30 bg-gradient-to-br from-gray-900/20 to-gray-800/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Vault Overview */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
            <Gift className="h-6 w-6" />
            🎁 COMMUNITY VAULT FOR MULTI-PURPOSE GIFTS
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Community-powered gift system supporting legacy products, special events, and animal welfare
          </p>
        </CardHeader>
        <CardContent>
          {/* Vault Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/30">
              <Coins className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">${(vaultBalance / 1000000).toFixed(2)}M</div>
              <div className="text-xs text-muted-foreground">Total Vault Balance</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/30">
              <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">${dailyContributions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Daily Contributions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/30">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{totalMembers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Community Members</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="legacy-products" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="legacy-products">📱 Legacy Products</TabsTrigger>
          <TabsTrigger value="special-events">🎉 Special Events</TabsTrigger>
          <TabsTrigger value="recent-gifts">🎁 Recent Gifts</TabsTrigger>
          <TabsTrigger value="gift-center">💝 Gift Center</TabsTrigger>
        </TabsList>

        <TabsContent value="legacy-products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {legacyProducts.map((product) => {
              const Icon = product.icon
              return (
                <Card key={product.id} className={`border-2 bg-gradient-to-br ${getRarityColor(product.rarity)}/20 hover:scale-105 transition-transform duration-300`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Icon className="h-6 w-6" />
                        {product.name}
                      </CardTitle>
                      <Badge className={`bg-gradient-to-r ${getRarityColor(product.rarity)} text-white`}>
                        {product.rarity}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Product Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-black/30 rounded border border-white/10">
                        <div className="text-lg font-bold text-green-400">${product.giftPrice}</div>
                        <div className="text-xs text-muted-foreground">Gift Price</div>
                        <div className="text-xs text-gray-400">Was ${product.originalPrice}</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded border border-white/10">
                        <div className="text-lg font-bold text-blue-400">{product.availability}</div>
                        <div className="text-xs text-muted-foreground">Available</div>
                        <div className="text-xs text-gray-400">{product.totalGifted} gifted</div>
                      </div>
                    </div>

                    {/* Nostalgia Factor */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Nostalgia Factor:</span>
                        <span className="text-yellow-400 font-bold">{product.nostalgiaFactor}%</span>
                      </div>
                      <Progress value={product.nostalgiaFactor} className="h-2" />
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-white">Benefits:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {product.benefits.map((benefit, index) => (
                          <div key={index} className="text-xs text-green-400">
                            ✓ {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gift Actions */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          onClick={() => sendCommunityGift(product.id, 'individual', 'Community Member', 1)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
                        >
                          Gift 1x
                        </Button>
                        <Button 
                          onClick={() => sendCommunityGift(product.id, 'community', 'Wildlife Sanctuary', 3)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xs"
                        >
                          Gift 3x
                        </Button>
                        <Button 
                          onClick={() => sendCommunityGift(product.id, 'project', 'Research Team', 5)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs"
                        >
                          Gift 5x
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="special-events" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeEvents.map((event) => (
              <Card key={event.id} className={`border-2 ${getEventTypeColor(event.eventType)} hover:scale-105 transition-transform duration-300`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <PartyPopper className="h-6 w-6" />
                      {event.name}
                    </CardTitle>
                    <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                      {event.eventType.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Event Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress:</span>
                      <span className="text-green-400 font-bold">
                        {((event.currentFunding / event.targetFunding) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={(event.currentFunding / event.targetFunding) * 100} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${event.currentFunding.toLocaleString()} raised</span>
                      <span>Goal: ${event.targetFunding.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Event Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-black/30 rounded border border-white/10">
                      <Users className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-blue-400">{event.participantCount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Participants</div>
                    </div>
                    <div className="text-center p-3 bg-black/30 rounded border border-white/10">
                      <Calendar className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-yellow-400">
                        {Math.ceil((new Date(event.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                      </div>
                      <div className="text-xs text-muted-foreground">Days Left</div>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-white">Event Rewards:</h4>
                    <div className="space-y-1">
                      {event.rewards.map((reward, index) => (
                        <div key={index} className="text-xs text-gold-400 flex items-center gap-2">
                          <Trophy className="h-3 w-3" />
                          {reward}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contribution Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      onClick={() => contributeToEvent(event.id, 100)}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-xs"
                    >
                      +$100
                    </Button>
                    <Button 
                      onClick={() => contributeToEvent(event.id, 500)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
                    >
                      +$500
                    </Button>
                    <Button 
                      onClick={() => contributeToEvent(event.id, 1000)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs"
                    >
                      +$1000
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent-gifts" className="space-y-6">
          <div className="space-y-4">
            {recentGifts.map((gift) => (
              <Card key={gift.id} className="border-gray-500/30 bg-gradient-to-r from-gray-900/40 to-gray-800/40 hover:scale-105 transition-transform duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Gift className="h-6 w-6 text-purple-400" />
                      <div>
                        <div className="font-bold text-white">${gift.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{gift.giftType.replace('-', ' ')}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-1">
                        {gift.recipientType.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {gift.senderCount} contributors
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-green-400">To:</span> {gift.recipientName}
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-400">Gift:</span> {gift.description}
                    </div>
                    <div className="text-sm">
                      <span className="text-yellow-400">Impact:</span> {gift.impact}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(gift.timestamp).toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gift-center" className="space-y-6">
          <Card className="border-rainbow bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center justify-center text-purple-400">
                <Rocket className="h-6 w-6" />
                🚀 COMMUNITY GIFT CENTER
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Coordinate community gifts, legacy products, and special events
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-red-900/40 to-pink-900/40 rounded-lg border border-red-500/30">
                  <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-red-400 mb-2">Animal Care</h4>
                  <p className="text-sm text-muted-foreground mb-4">Send care packages directly to animals in need</p>
                  <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
                    Send Care
                  </Button>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/30">
                  <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-blue-400 mb-2">Legacy Gifts</h4>
                  <p className="text-sm text-muted-foreground mb-4">Share GAiA legacy products with newcomers</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Gift Legacy
                  </Button>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/30">
                  <PartyPopper className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Special Events</h4>
                  <p className="text-sm text-muted-foreground mb-4">Contribute to community-wide celebrations</p>
                  <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                    Join Event
                  </Button>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/30">
                  <Crown className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-purple-400 mb-2">VIP Gifts</h4>
                  <p className="text-sm text-muted-foreground mb-4">Premium gifts for top contributors</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    VIP Access
                  </Button>
                </div>
              </div>

              {/* Gift Center Stats */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-lg border border-gray-500/30">
                <h4 className="font-bold text-white mb-4 text-center">🎯 Today's Gift Impact</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">$47,250</div>
                    <div className="text-xs text-muted-foreground">Gifts Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">847</div>
                    <div className="text-xs text-muted-foreground">Recipients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">234</div>
                    <div className="text-xs text-muted-foreground">Legacy Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">12</div>
                    <div className="text-xs text-muted-foreground">Special Events</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}