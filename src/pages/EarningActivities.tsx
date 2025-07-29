import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Droplets, 
  Sprout, 
  Home as HomeIcon, 
  BookOpen, 
  Users, 
  Briefcase,
  Star,
  MapPin,
  Trophy,
  Camera,
  Target,
  Vote,
  Coins,
  Store,
  GraduationCap,
  Bike
} from 'lucide-react'

// Import Phase components
import { InteractiveFoodMap } from '@/components/community/InteractiveFoodMap'
import { EnhancedBadgeSystem } from '@/components/earning/EnhancedBadgeSystem'
import { PhotoVerificationSystem } from '@/components/earning/PhotoVerificationSystem'
import { LocationBasedMissions } from '@/components/community/LocationBasedMissions'
import { CommunityProjectVoting } from '@/components/community/CommunityProjectVoting'
import { TeamChallenges } from '@/components/earning/TeamChallenges'
import { TokenStakingSystem } from '@/components/earning/TokenStakingSystem'
import { AdvancedTokenMechanics } from '@/components/earning/AdvancedTokenMechanics'
import { CommunityGovernance } from '@/components/community/CommunityGovernance'
import { EcosystemIntegration } from '@/components/earning/EcosystemIntegration'
import { MentorshipProgram } from '@/components/earning/MentorshipProgram'
import { GaiaBikeEarning } from '@/components/earning/GaiaBikeEarning'

// Keep existing imports
import { useEarningActivities, useUserProfile } from '@/hooks/useEarningSystem'

const EarningActivities = () => {
  const userId = 'demo-user'
  const { activities, recordWaterSaving, recordBeeHotel, recordEnvironmentalEducation, recordHomeGrownFood, processReferral, recordSkillBasedWork } = useEarningActivities(userId)
  const { profile, stats } = useUserProfile(userId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            GAiA Earning Activities
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Earn GAiA tokens for positive environmental actions • Multi-phase ecosystem • Community driven
          </p>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <Badge className="bg-green-600 text-white">Phase 1: ✅ Complete</Badge>
            <Badge className="bg-blue-600 text-white">Phase 2: ✅ Complete</Badge>
            <Badge className="bg-purple-600 text-white">Phase 3: ✅ Complete</Badge>
          </div>
        </div>

        {/* User Stats Overview */}
        <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">Your GAiA Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-green-900/30">
                <div className="text-2xl font-bold text-green-400">{stats.totalPoints}</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-900/30">
                <div className="text-2xl font-bold text-blue-400">{stats.totalTokens}</div>
                <div className="text-xs text-muted-foreground">GAiA Tokens</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-900/30">
                <div className="text-2xl font-bold text-purple-400">Level {stats.level}</div>
                <div className="text-xs text-muted-foreground">Current Level</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-orange-900/30">
                <div className="text-2xl font-bold text-orange-400">{stats.streak} days</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="phase1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="phase1" className="text-green-400">
              🌱 Phase 1: Foundation
            </TabsTrigger>
            <TabsTrigger value="phase2" className="text-blue-400">
              🚀 Phase 2: Community
            </TabsTrigger>
            <TabsTrigger value="phase3" className="text-purple-400">
              💎 Phase 3: Ecosystem
            </TabsTrigger>
          </TabsList>

          {/* PHASE 1: Foundation Features */}
          <TabsContent value="phase1" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <MapPin className="h-5 w-5" />
                    🗺️ Interactive Food Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InteractiveFoodMap />
                </CardContent>
              </Card>

              <Card className="border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Bike className="h-5 w-5" />
                    🚴 GAiA Bike Earning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GaiaBikeEarning />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Trophy className="h-5 w-5" />
                    🏆 Enhanced Badge System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedBadgeSystem />
                </CardContent>
              </Card>

              <Card className="border-orange-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Camera className="h-5 w-5" />
                    📸 Photo Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PhotoVerificationSystem />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PHASE 2: Community Features */}
          <TabsContent value="phase2" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-indigo-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-400">
                    <Target className="h-5 w-5" />
                    🎯 Location-Based Missions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationBasedMissions />
                </CardContent>
              </Card>

              <Card className="border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Vote className="h-5 w-5" />
                    🗳️ Community Project Voting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CommunityProjectVoting />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-red-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Users className="h-5 w-5" />
                    👥 Team Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TeamChallenges />
                </CardContent>
              </Card>

              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Coins className="h-5 w-5" />
                    💰 Token Staking System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenStakingSystem />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PHASE 3: Ecosystem Features */}
          <TabsContent value="phase3" className="space-y-6">
            <AdvancedTokenMechanics />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CommunityGovernance />
              <MentorshipProgram />
            </div>
            
            <EcosystemIntegration />
          </TabsContent>
        </Tabs>

        {/* Traditional Earning Activities (Legacy) */}
        <Card className="mt-8 border-gray-500/30">
          <CardHeader>
            <CardTitle className="text-gray-400">📋 Traditional Earning Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-5 w-5 text-blue-400" />
                  <span className="font-medium">Water Conservation</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Save water through various methods</p>
                <div className="text-blue-400 font-bold">10-50 GAiA per action</div>
              </div>

              <div className="p-4 rounded-lg border border-green-500/20 bg-green-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Sprout className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Home Grown Food</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Grow and share your own food</p>
                <div className="text-green-400 font-bold">20-100 GAiA per harvest</div>
              </div>

              <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <HomeIcon className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">Bee Hotels</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Create habitats for beneficial insects</p>
                <div className="text-yellow-400 font-bold">25-75 GAiA per hotel</div>
              </div>

              <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Environmental Education</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Learn and teach about sustainability</p>
                <div className="text-purple-400 font-bold">15-60 GAiA per course</div>
              </div>

              <div className="p-4 rounded-lg border border-red-500/20 bg-red-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-red-400" />
                  <span className="font-medium">Referral Program</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Bring friends to the ecosystem</p>
                <div className="text-red-400 font-bold">50+ GAiA per referral</div>
              </div>

              <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-orange-400" />
                  <span className="font-medium">Skill-Based Work</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Use your skills for eco projects</p>
                <div className="text-orange-400 font-bold">Variable GAiA per task</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EarningActivities
