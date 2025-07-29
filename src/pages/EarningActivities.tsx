
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

// Import all earning components
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
import { EcosystemIntegration } from '@/components/earning/EcosystemIntegration'
import { MentorshipProgram } from '@/components/earning/MentorshipProgram'

export default function EarningActivities() {
  const [activePhase, setActivePhase] = useState('phase1')

  const phaseData = [
    {
      id: 'phase1',
      title: 'Phase 1: Foundation',
      subtitle: 'Core earning mechanisms',
      status: 'completed',
      progress: 100,
      color: 'from-green-900/20 to-emerald-900/20',
      borderColor: 'border-green-500/30',
      components: [
        { name: 'GAiA Eco Bike Earning System', icon: Zap, emoji: '🚴', status: 'active' },
        { name: 'Enhanced Badge & Achievement System', icon: Trophy, emoji: '🏆', status: 'active' },
        { name: 'Photo Verification System', icon: Camera, emoji: '📸', status: 'active' },
        { name: 'Community Food Growers Map', icon: MapPin, emoji: '🌱', status: 'active' }
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Community',
      subtitle: 'Social engagement features',
      status: 'completed',
      progress: 100,
      color: 'from-blue-900/20 to-cyan-900/20',
      borderColor: 'border-blue-500/30',
      components: [
        { name: 'Location-Based Missions', icon: Target, emoji: '📍', status: 'active' },
        { name: 'Community Project Voting', icon: Vote, emoji: '🗳️', status: 'active' },
        { name: 'Team Challenges', icon: Users, emoji: '🏆', status: 'active' },
        { name: 'Token Staking System', icon: Lock, emoji: '🔒', status: 'active' }
      ]
    },
    {
      id: 'phase3',
      title: 'Phase 3: Advanced',
      subtitle: 'Sophisticated mechanics',
      status: 'completed',
      progress: 100,
      color: 'from-purple-900/20 to-pink-900/20',
      borderColor: 'border-purple-500/30',
      components: [
        { name: 'Advanced Token Mechanics', icon: Coins, emoji: '💎', status: 'active' },
        { name: 'Community Governance', icon: Crown, emoji: '🏛️', status: 'active' },
        { name: 'Ecosystem Integration', icon: Globe, emoji: '🌐', status: 'active' },
        { name: 'Mentorship Program', icon: GraduationCap, emoji: '🎓', status: 'active' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAiA Earning Activities
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete environmental activities and earn GAiA tokens while making a positive impact on our planet
          </p>
        </div>

        {/* Phase Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phaseData.map((phase) => (
            <Card 
              key={phase.id}
              className={`cursor-pointer transition-all duration-300 border-2 ${
                activePhase === phase.id 
                  ? `${phase.borderColor} bg-gradient-to-br ${phase.color} scale-105 shadow-xl` 
                  : 'border-gray-500/20 hover:border-green-500/30 hover:scale-102 shadow-md'
              }`}
              onClick={() => setActivePhase(phase.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-green-400">{phase.title}</h3>
                  <Badge className={phase.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}>
                    {phase.status === 'completed' ? '✅ Complete' : '🚧 Active'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Progress value={phase.progress} className="h-3" />
                  <div className="text-sm text-muted-foreground text-center">
                    {phase.components.length} components • {phase.progress}% complete
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {phase.components.map((component, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs bg-black/20 rounded-lg p-2">
                      <span className="text-base">{component.emoji}</span>
                      <span className="truncate">{component.name.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Phase Content */}
        <Tabs value={activePhase} onValueChange={setActivePhase} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-14">
            <TabsTrigger value="phase1" className="text-base font-medium">
              🔰 Phase 1: Foundation
            </TabsTrigger>
            <TabsTrigger value="phase2" className="text-base font-medium">
              🏘️ Phase 2: Community
            </TabsTrigger>
            <TabsTrigger value="phase3" className="text-base font-medium">
              🚀 Phase 3: Advanced
            </TabsTrigger>
          </TabsList>

          {/* Phase 1 Content */}
          <TabsContent value="phase1" className="space-y-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-400 mb-3">🔰 Phase 1: Foundation Systems</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Core earning mechanisms and basic community features to get you started on your environmental journey
              </p>
            </div>
            
            <div className="space-y-12">
              <GaiaBikeEarning />
              <EnhancedBadgeSystem />
              <PhotoVerificationSystem />
              <InteractiveFoodMap />
            </div>
          </TabsContent>

          {/* Phase 2 Content */}
          <TabsContent value="phase2" className="space-y-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-400 mb-3">🏘️ Phase 2: Community Engagement</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced community features and collaborative activities to amplify your environmental impact
              </p>
            </div>
            
            <div className="space-y-12">
              <LocationBasedMissions />
              <CommunityProjectVoting />
              <TeamChallenges />
              <TokenStakingSystem />
            </div>
          </TabsContent>

          {/* Phase 3 Content */}
          <TabsContent value="phase3" className="space-y-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-purple-400 mb-3">🚀 Phase 3: Advanced Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sophisticated token mechanics and governance systems for experienced eco-warriors
              </p>
            </div>
            
            <div className="space-y-12">
              <AdvancedTokenMechanics />
              <CommunityGovernance />
              <EcosystemIntegration />
              <MentorshipProgram />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Stats */}
        <Card className="border-2 border-green-500/30 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-green-400 mb-4">🌟 Your GAiA Journey Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                  <div className="text-3xl font-bold text-green-400 mb-1">2,450</div>
                  <div className="text-sm text-muted-foreground">Total GAiA Earned</div>
                </div>
                <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                  <div className="text-3xl font-bold text-blue-400 mb-1">12</div>
                  <div className="text-sm text-muted-foreground">Components Active</div>
                </div>
                <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-400 mb-1">3/3</div>
                  <div className="text-sm text-muted-foreground">Phases Complete</div>
                </div>
                <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">⭐⭐⭐</div>
                  <div className="text-sm text-muted-foreground">Eco Rating</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                <p className="text-green-300 text-center">
                  🎉 <strong>Congratulations!</strong> You've unlocked all earning activities. Keep making a difference! 🌱
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
