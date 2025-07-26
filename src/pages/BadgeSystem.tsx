import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Award, Star, Crown, Zap, Trophy, Target, Leaf, Heart } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { gaiaTokenService } from '@/services/gaiaTokenService'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface BadgeData {
  id: string
  name: string
  description: string
  category: 'environmental' | 'community' | 'economic' | 'innovation' | 'leadership'
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  icon: string
  gaiaReward: number
  requirements: string[]
  progress: number
  maxProgress: number
  earned: boolean
  earnedDate?: Date
  stakingBonus: number // % bonus for staking when badge is earned
}

interface UserStats {
  totalBadges: number
  gaiaEarned: number
  stakingBonus: number
  level: number
  experience: number
  rank: string
}

export default function BadgeSystem() {
  const [badges, setBadges] = useState<BadgeData[]>([
    {
      id: '1',
      name: 'Eco Warrior',
      description: 'Complete 10 environmental missions',
      category: 'environmental',
      rarity: 'common',
      icon: '🌍',
      gaiaReward: 50,
      requirements: ['Complete 10 eco missions', 'Plant 5 trees', 'Clean 2 beaches'],
      progress: 7,
      maxProgress: 10,
      earned: false,
      stakingBonus: 5
    },
    {
      id: '2',
      name: 'Green Pioneer',
      description: 'First to adopt 3 sustainable technologies',
      category: 'innovation',
      rarity: 'rare',
      icon: '🚀',
      gaiaReward: 200,
      requirements: ['Install solar panels', 'Create bee hotel', 'Set up water storage'],
      progress: 2,
      maxProgress: 3,
      earned: false,
      stakingBonus: 15
    },
    {
      id: '3',
      name: 'Community Leader',
      description: 'Inspire 50 people to join environmental causes',
      category: 'leadership',
      rarity: 'epic',
      icon: '👑',
      gaiaReward: 500,
      requirements: ['Refer 50 users', 'Lead 10 community projects', 'Mentor 5 newbies'],
      progress: 15,
      maxProgress: 50,
      earned: false,
      stakingBonus: 25
    },
    {
      id: '4',
      name: 'Carbon Neutral Champion',
      description: 'Offset 1000kg of CO2 through platform activities',
      category: 'environmental',
      rarity: 'legendary',
      icon: '🌟',
      gaiaReward: 1000,
      requirements: ['Offset 1000kg CO2', 'Complete carbon audit', 'Maintain neutral status for 6 months'],
      progress: 650,
      maxProgress: 1000,
      earned: false,
      stakingBonus: 50
    },
    {
      id: '5',
      name: 'First Steps',
      description: 'Complete your first environmental action',
      category: 'environmental',
      rarity: 'common',
      icon: '🌱',
      gaiaReward: 10,
      requirements: ['Complete first mission'],
      progress: 1,
      maxProgress: 1,
      earned: true,
      earnedDate: new Date('2024-01-15'),
      stakingBonus: 2
    }
  ])

  const [userStats, setUserStats] = useState<UserStats>({
    totalBadges: 1,
    gaiaEarned: 10,
    stakingBonus: 2,
    level: 1,
    experience: 150,
    rank: 'Eco Novice'
  })

  const [userGaiaBalance, setUserGaiaBalance] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchBalance = async () => {
      const tokenData = await gaiaTokenService.fetchLiveTokenData()
      setUserGaiaBalance(1250) // Simulated user balance
    }
    fetchBalance()
  }, [])

  const validateBadgeProgress = async (badgeId: string) => {
    try {
      console.log(`Validating progress for badge ${badgeId}`)
      console.log(`Contract: ${GAIA_TOKEN.CONTRACT_ADDRESS}`)
      console.log(`Wallet: ${GAIA_TOKEN.WALLET_ADDRESS}`)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setBadges(prev => prev.map(badge => {
        if (badge.id === badgeId && badge.progress >= badge.maxProgress && !badge.earned) {
          // Badge earned!
          setUserStats(prevStats => ({
            ...prevStats,
            totalBadges: prevStats.totalBadges + 1,
            gaiaEarned: prevStats.gaiaEarned + badge.gaiaReward,
            stakingBonus: prevStats.stakingBonus + badge.stakingBonus,
            experience: prevStats.experience + badge.gaiaReward * 2
          }))
          
          setUserGaiaBalance(prev => prev + badge.gaiaReward)
          
          toast.success(`Badge Earned: ${badge.name}!`, {
            description: `You've earned ${badge.gaiaReward} GAIA tokens and ${badge.stakingBonus}% staking bonus!`
          })
          
          return {
            ...badge,
            earned: true,
            earnedDate: new Date()
          }
        }
        return badge
      }))
    } catch (error) {
      toast.error('Badge validation failed')
    }
  }

  const stakeBadge = async (badgeId: string, stakingAmount: number) => {
    const badge = badges.find(b => b.id === badgeId)
    if (!badge || !badge.earned) {
      toast.error('Badge not earned yet or not found')
      return
    }

    if (userGaiaBalance < stakingAmount) {
      toast.error('Insufficient GAIA tokens for staking')
      return
    }

    try {
      console.log(`Staking ${stakingAmount} GAIA on badge ${badge.name}`)
      console.log(`Bonus rate: ${badge.stakingBonus}%`)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const bonusAmount = Math.floor(stakingAmount * (badge.stakingBonus / 100))
      const totalReward = stakingAmount + bonusAmount
      
      setUserGaiaBalance(prev => prev - stakingAmount + totalReward)
      
      toast.success(`Badge staking successful!`, {
        description: `Staked ${stakingAmount} GAIA, earned ${bonusAmount} bonus (${badge.stakingBonus}% rate)`
      })
    } catch (error) {
      toast.error('Staking failed')
    }
  }

  const getRarityColor = (rarity: BadgeData['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400/20'
      case 'uncommon': return 'text-green-400 border-green-400/20'
      case 'rare': return 'text-blue-400 border-blue-400/20'
      case 'epic': return 'text-purple-400 border-purple-400/20'
      case 'legendary': return 'text-yellow-400 border-yellow-400/20'
      default: return 'text-gray-400 border-gray-400/20'
    }
  }

  const getCategoryIcon = (category: BadgeData['category']) => {
    switch (category) {
      case 'environmental': return <Leaf className="h-4 w-4" />
      case 'community': return <Heart className="h-4 w-4" />
      case 'economic': return <Zap className="h-4 w-4" />
      case 'innovation': return <Star className="h-4 w-4" />
      case 'leadership': return <Crown className="h-4 w-4" />
      default: return <Award className="h-4 w-4" />
    }
  }

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory)

  const categories = ['all', 'environmental', 'community', 'economic', 'innovation', 'leadership']

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🏆 Badge Achievement System
          </h1>
          <p className="text-xl text-muted-foreground">
            Earn badges for environmental actions and unlock GAIA staking bonuses
          </p>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Badges Earned</p>
                  <p className="text-2xl font-bold text-purple-400">{userStats.totalBadges}</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GAIA from Badges</p>
                  <p className="text-2xl font-bold text-yellow-400">{userStats.gaiaEarned}</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Staking Bonus</p>
                  <p className="text-2xl font-bold text-green-400">{userStats.stakingBonus}%</p>
                </div>
                <Star className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Rank</p>
                  <p className="text-lg font-bold text-blue-400">{userStats.rank}</p>
                </div>
                <Crown className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="badges">Badge Collection</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            <TabsTrigger value="staking">Badge Staking</TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className="capitalize"
                >
                  {category === 'all' ? 'All Badges' : category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBadges.map((badge) => (
                <Card key={badge.id} className={`${getRarityColor(badge.rarity)} ${badge.earned ? 'bg-green-500/5' : ''}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{badge.icon}</span>
                        <span className={badge.earned ? 'text-green-400' : ''}>{badge.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(badge.category)}
                        <Badge variant="outline" className={`capitalize ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {badge.description}
                    </p>

                    {!badge.earned && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{badge.progress}/{badge.maxProgress}</span>
                        </div>
                        <Progress value={(badge.progress / badge.maxProgress) * 100} />
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Requirements:</h4>
                      <ul className="text-xs space-y-1">
                        {badge.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className={badge.earned ? 'text-green-400' : 'text-muted-foreground'}>
                              {badge.earned ? '✓' : '•'}
                            </span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">GAIA Reward</p>
                        <p className="font-bold text-yellow-400">{badge.gaiaReward}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Staking Bonus</p>
                        <p className="font-bold text-green-400">{badge.stakingBonus}%</p>
                      </div>
                    </div>

                    {badge.earned ? (
                      <div className="text-center">
                        <Badge className="bg-green-600">
                          Earned {badge.earnedDate?.toLocaleDateString()}
                        </Badge>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => validateBadgeProgress(badge.id)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={badge.progress < badge.maxProgress}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        {badge.progress >= badge.maxProgress ? 'Claim Badge' : 'Check Progress'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {badges.filter(b => !b.earned).map((badge) => (
                  <div key={badge.id} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{badge.icon}</span>
                        <span className="font-bold">{badge.name}</span>
                      </div>
                      <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{badge.progress}/{badge.maxProgress} ({Math.round((badge.progress / badge.maxProgress) * 100)}%)</span>
                      </div>
                      <Progress value={(badge.progress / badge.maxProgress) * 100} />
                    </div>

                    <div className="mt-3 space-y-1">
                      {badge.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">
                            {index < badge.progress ? '✓' : '○'}
                          </span>
                          <span className={index < badge.progress ? 'text-green-400' : 'text-muted-foreground'}>
                            {req}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staking" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {badges.filter(b => b.earned).map((badge) => (
                <Card key={badge.id} className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-xl">{badge.icon}</span>
                      <span className="text-green-400">{badge.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <h4 className="font-bold text-green-400 mb-2">Staking Benefits</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Bonus Rate:</span>
                          <span className="font-bold text-green-400">{badge.stakingBonus}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min. Stake:</span>
                          <span>50 GAIA</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lock Period:</span>
                          <span>30 days</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => stakeBadge(badge.id, 50)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={userGaiaBalance < 50}
                        size="sm"
                      >
                        Stake 50 GAIA
                      </Button>
                      <Button 
                        onClick={() => stakeBadge(badge.id, 100)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={userGaiaBalance < 100}
                        size="sm"
                      >
                        Stake 100 GAIA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}