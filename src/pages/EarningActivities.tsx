
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Zap, 
  Trophy, 
  Camera, 
  MapPin, 
  Target,
  Vote,
  Users,
  Lock,
  Coins,
  Crown,
  Globe,
  GraduationCap,
  Star,
  CheckCircle
} from 'lucide-react'

// Import existing components
import { GaiaBikeEarning } from '@/components/earning/GaiaBikeEarning'
import { EnhancedBadgeSystem } from '@/components/earning/EnhancedBadgeSystem'
import { PhotoVerificationSystem } from '@/components/earning/PhotoVerificationSystem'
import { LocationBasedMissions } from '@/components/community/LocationBasedMissions'
import { CommunityProjectVoting } from '@/components/community/CommunityProjectVoting'
import { TeamChallenges } from '@/components/earning/TeamChallenges'
import { TokenStakingSystem } from '@/components/earning/TokenStakingSystem'
import { AdvancedTokenMechanics } from '@/components/earning/AdvancedTokenMechanics'
import { CommunityGovernance } from '@/components/community/CommunityGovernance'
import { InteractiveFoodMap } from '@/components/community/InteractiveFoodMap'

// Create missing components inline for now - we'll extract them later
import { EcosystemIntegration } from '@/components/earning/EcosystemIntegration'
import { MentorshipProgram } from '@/components/earning/MentorshipProgram'

export default function EarningActivities() {
  const [activePhase, setActivePhase] = useState('phase1')

  const phaseData = [
    {
      id: 'phase1',
      title: 'Phase 1: Foundation',
      status: 'completed',
      progress: 100,
      components: [
        { name: 'GAiA Eco Bike Earning System', icon: Zap, status: 'active' },
        { name: 'Enhanced Badge & Achievement System', icon: Trophy, status: 'active' },
        { name: 'Photo Verification System', icon: Camera, status: 'active' },
        { name: 'Community Food Growers Map', icon: MapPin, status: 'active' }
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Community',
      status: 'completed',
      progress: 100,
      components: [
        { name: 'Location-Based Missions', icon: Target, status: 'active' },
        { name: 'Community Project Voting', icon: Vote, status: 'active' },
        { name: 'Team Challenges', icon: Users, status: 'active' },
        { name: 'Token Staking System', icon: Lock, status: 'active' }
      ]
    },
    {
      id: 'phase3',
      title: 'Phase 3: Advanced',
      status: 'completed',
      progress: 100,
      components: [
        { name: 'Advanced Token Mechanics', icon: Coins, status: 'active' },
        { name: 'Community Governance', icon: Crown, status: 'active' },
        { name: 'Ecosystem Integration', icon: Globe, status: 'active' },
        { name: 'Mentorship Program', icon: GraduationCap, status: 'active' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAiA Earning Activities
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete environmental activities and earn GAiA tokens while making a positive impact
          </p>
        </div>

        {/* Phase Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {phaseData.map((phase) => (
            <Card 
              key={phase.id}
              className={`cursor-pointer transition-all border-2 ${
                activePhase === phase.id 
                  ? 'border-green-500/50 bg-green-900/20' 
                  : 'border-gray-500/20 hover:border-green-500/30'
              }`}
              onClick={() => setActivePhase(phase.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-400">{phase.title}</h3>
                  <Badge className={phase.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}>
                    {phase.status === 'completed' ? '✅ Complete' : '🚧 Active'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={phase.progress} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {phase.components.length} components • {phase.progress}% complete
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Phase Content */}
        <Tabs value={activePhase} onValueChange={setActivePhase} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="phase1" className="text-sm">
              🔰 Phase 1: Foundation
            </TabsTrigger>
            <TabsTrigger value="phase2" className="text-sm">
              🏘️ Phase 2: Community
            </TabsTrigger>
            <TabsTrigger value="phase3" className="text-sm">
              🚀 Phase 3: Advanced
            </TabsTrigger>
          </TabsList>

          {/* Phase 1 Content */}
          <TabsContent value="phase1" className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-400 mb-2">🔰 Phase 1: Foundation Systems</h2>
              <p className="text-muted-foreground">Core earning mechanisms and basic community features</p>
            </div>
            
            <GaiaBikeEarning />
            <EnhancedBadgeSystem />
            <PhotoVerificationSystem />
            <InteractiveFoodMap />
          </TabsContent>

          {/* Phase 2 Content */}
          <TabsContent value="phase2" className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-blue-400 mb-2">🏘️ Phase 2: Community Engagement</h2>
              <p className="text-muted-foreground">Advanced community features and collaborative activities</p>
            </div>
            
            <LocationBasedMissions />
            <CommunityProjectVoting />
            <TeamChallenges />
            <TokenStakingSystem />
          </TabsContent>

          {/* Phase 3 Content */}
          <TabsContent value="phase3" className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-400 mb-2">🚀 Phase 3: Advanced Features</h2>
              <p className="text-muted-foreground">Sophisticated token mechanics and governance systems</p>
            </div>
            
            <AdvancedTokenMechanics />
            <CommunityGovernance />
            <EcosystemIntegration />
            <MentorshipProgram />
          </TabsContent>
        </Tabs>

        {/* Footer Stats */}
        <Card className="border-2 border-green-500/20 bg-gradient-to-r from-green-900/10 to-blue-900/10">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-green-400">🌟 Your GAiA Journey Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">2,450</div>
                  <div className="text-sm text-muted-foreground">Total GAiA Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">12</div>
                  <div className="text-sm text-muted-foreground">Components Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">3/3</div>
                  <div className="text-sm text-muted-foreground">Phases Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">⭐⭐⭐</div>
                  <div className="text-sm text-muted-foreground">Eco Rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
