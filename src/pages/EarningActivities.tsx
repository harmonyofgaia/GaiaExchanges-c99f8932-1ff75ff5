import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Leaf, 
  Droplets, 
  Building2, 
  Bike,
  Users,
  Camera,
  MapPin,
  Trophy,
  Target,
  Zap,
  Star
} from 'lucide-react'

// Import existing components
import { WaterSavingActions } from '@/components/earning/WaterSavingActions'
import { BeeHotelActions } from '@/components/earning/BeeHotelActions'
import { HomeGrownFoodActions } from '@/components/earning/HomeGrownFoodActions'
import { EnvironmentalEducationActions } from '@/components/earning/EnvironmentalEducationActions'

// Import new Phase 1 components
import { InteractiveFoodMap } from '@/components/community/InteractiveFoodMap'
import { GaiaBikeEarning } from '@/components/earning/GaiaBikeEarning'
import { EnhancedBadgeSystem } from '@/components/earning/EnhancedBadgeSystem'
import { PhotoVerificationSystem } from '@/components/earning/PhotoVerificationSystem'

// Import Phase 2 components
import { LocationBasedMissions } from '@/components/community/LocationBasedMissions'
import { CommunityProjectVoting } from '@/components/community/CommunityProjectVoting'
import { TeamChallenges } from '@/components/earning/TeamChallenges'
import { TokenStakingSystem } from '@/components/earning/TokenStakingSystem'

export default function EarningActivities() {
  const userStats = {
    totalPoints: 2847,
    totalTokens: 1456,
    level: 7,
    nextLevelPoints: 3000,
    streak: 12,
    activitiesCompleted: 34
  }

  const progressToNextLevel = (userStats.totalPoints / userStats.nextLevelPoints) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌍 Earning Activities Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Earn GAiA tokens through verified environmental actions • Phase 1 Complete
          </p>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{userStats.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
              <div className="mt-2">
                <Progress value={progressToNextLevel} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  Level {userStats.level} → {userStats.level + 1}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{userStats.totalTokens.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">GAiA Tokens</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{userStats.activitiesCompleted}</div>
              <div className="text-sm text-muted-foreground">Activities Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{userStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Phase 1 Implementation Banner */}
        <Card className="mb-8 border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="h-6 w-6 text-green-400" />
              <Badge className="bg-green-600 text-white">PHASE 1 COMPLETE</Badge>
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-2">🎉 Core Infrastructure Live!</h2>
            <p className="text-green-300">
              Community map, GAiA bike system, enhanced badges, and photo verification now active!
            </p>
          </CardContent>
        </Card>

        {/* Activity Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 h-auto bg-black/50 border border-gray-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
              <Target className="h-4 w-4 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="community-map" className="data-[state=active]:bg-green-600">
              <MapPin className="h-4 w-4 mr-1" />
              Food Map
            </TabsTrigger>
            <TabsTrigger value="gaia-bike" className="data-[state=active]:bg-blue-600">
              <Bike className="h-4 w-4 mr-1" />
              GAiA Bike
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-purple-600">
              <Trophy className="h-4 w-4 mr-1" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="photo-verify" className="data-[state=active]:bg-orange-600">
              <Camera className="h-4 w-4 mr-1" />
              Photo Verify
            </TabsTrigger>
            <TabsTrigger value="missions" className="data-[state=active]:bg-red-600">
              <Target className="h-4 w-4 mr-1" />
              Missions
            </TabsTrigger>
            <TabsTrigger value="voting" className="data-[state=active]:bg-indigo-600">
              <Users className="h-4 w-4 mr-1" />
              Voting
            </TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-pink-600">
              <Users className="h-4 w-4 mr-1" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="staking" className="data-[state=active]:bg-yellow-600">
              <Zap className="h-4 w-4 mr-1" />
              Staking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Activity Cards */}
              <Card className="border-green-500/20 hover:border-green-500/40 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <MapPin className="h-5 w-5" />
                    Community Food Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Register your food growing activities and connect with local growers
                  </p>
                  <Badge className="bg-green-600">+50 Points Registration</Badge>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Bike className="h-5 w-5" />
                    GAiA Bike System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Earn 2 GAiA tokens per km cycled with our eco bike tracking
                  </p>
                  <Badge className="bg-blue-600">2 GAiA/km</Badge>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 hover:border-red-500/40 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Target className="h-5 w-5" />
                    Location Missions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete real-world environmental missions in your area
                  </p>
                  <Badge className="bg-red-600">Up to 300 GAiA</Badge>
                </CardContent>
              </Card>

              <Card className="border-indigo-500/20 hover:border-indigo-500/40 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-400">
                    <Users className="h-5 w-5" />
                    Community Voting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Vote on environmental projects and propose new initiatives
                  </p>
                  <Badge className="bg-indigo-600">+10 GAiA per Vote</Badge>
                </CardContent>
              </Card>

              <Card className="border-pink-500/20 hover:border-pink-500/40 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-pink-400">
                    <Trophy className="h-5 w-5" />
                    Team Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Join teams and compete in environmental challenges
                  </p>
                  <Badge className="bg-pink-600">5000 GAiA Prize Pool</Badge>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/20 hover:border-yellow-500/40 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Zap className="h-5 w-5" />
                    Token Staking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Stake your GAiA tokens to earn rewards and support projects
                  </p>
                  <Badge className="bg-yellow-600">Up to 25% APY</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community-map">
            <InteractiveFoodMap />
          </TabsContent>

          <TabsContent value="gaia-bike">
            <GaiaBikeEarning />
          </TabsContent>

          <TabsContent value="badges">
            <EnhancedBadgeSystem />
          </TabsContent>

          <TabsContent value="photo-verify">
            <PhotoVerificationSystem />
          </TabsContent>

          <TabsContent value="missions">
            <LocationBasedMissions />
          </TabsContent>

          <TabsContent value="voting">
            <CommunityProjectVoting />
          </TabsContent>

          <TabsContent value="teams">
            <TeamChallenges />
          </TabsContent>

          <TabsContent value="staking">
            <TokenStakingSystem />
          </TabsContent>

          <TabsContent value="water">
            <WaterSavingActions />
          </TabsContent>

          <TabsContent value="food">
            <HomeGrownFoodActions />
          </TabsContent>
        </Tabs>

        {/* Phase Status - Updated */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Trophy className="h-6 w-6" />
                Phase 1: Core Infrastructure
                <Badge className="bg-green-600 text-white">COMPLETE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-green-300/80">✅ Community food map</p>
              <p className="text-sm text-green-300/80">✅ GAiA bike system</p>
              <p className="text-sm text-green-300/80">✅ Enhanced badges</p>
              <p className="text-sm text-green-300/80">✅ Photo verification</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Users className="h-6 w-6" />
                Phase 2: Advanced Community
                <Badge className="bg-blue-600 text-white">LIVE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-blue-300/80">🎯 Location-based missions</p>
              <p className="text-sm text-blue-300/80">🗳️ Community project voting</p>
              <p className="text-sm text-blue-300/80">👥 Team challenges</p>
              <p className="text-sm text-blue-300/80">🔒 Token staking system</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Building2 className="h-6 w-6" />
                Phase 3: Business Integration
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">Coming Soon</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-yellow-300/80">🏪 Local business discounts</p>
              <p className="text-sm text-yellow-300/80">🔧 Equipment sharing</p>
              <p className="text-sm text-yellow-300/80">👨‍🏫 Mentor programs</p>
              <p className="text-sm text-yellow-300/80">📊 Regional analytics</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
