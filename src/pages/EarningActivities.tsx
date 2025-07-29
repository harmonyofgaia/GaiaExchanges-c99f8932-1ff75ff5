
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Zap, Trophy, Star, Crown } from 'lucide-react'

// Phase 1 Components
import { GaiaBikeEarning } from '@/components/earning/GaiaBikeEarning'
import { EnhancedBadgeSystem } from '@/components/earning/EnhancedBadgeSystem'
import { PhotoVerificationSystem } from '@/components/earning/PhotoVerificationSystem'
import { InteractiveFoodMap } from '@/components/community/InteractiveFoodMap'

// Phase 2 Components
import { LocationBasedMissions } from '@/components/community/LocationBasedMissions'
import { CommunityProjectVoting } from '@/components/community/CommunityProjectVoting'
import { TeamChallenges } from '@/components/earning/TeamChallenges'
import { TokenStakingSystem } from '@/components/earning/TokenStakingSystem'

// Phase 3 Components
import { AdvancedTokenMechanics } from '@/components/earning/AdvancedTokenMechanics'
import { CommunityGovernance } from '@/components/community/CommunityGovernance'
import { EcosystemIntegration } from '@/components/earning/EcosystemIntegration'
import { MentorshipProgram } from '@/components/earning/MentorshipProgram'

export function EarningActivities() {
  const [activePhase, setActivePhase] = useState("phase1")

  const phases = [
    {
      id: "phase1",
      title: "Phase 1: Foundation",
      description: "Basic earning mechanisms and community features",
      status: "completed",
      color: "bg-green-600",
      icon: Zap
    },
    {
      id: "phase2",
      title: "Phase 2: Community",
      description: "Advanced social features and collaborative earning",
      status: "completed", 
      color: "bg-blue-600",
      icon: Trophy
    },
    {
      id: "phase3",
      title: "Phase 3: Advanced",
      description: "Governance, ecosystem integration, and mentorship",
      status: "completed",
      color: "bg-purple-600",
      icon: Crown
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            💰 GAiA Earning Activities Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete environmental activities and earn GAiA tokens while building a sustainable future
          </p>
        </div>

        {/* Phase Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {phases.map((phase) => {
            const Icon = phase.icon
            return (
              <Card key={phase.id} className={`border-2 transition-all cursor-pointer ${
                activePhase === phase.id 
                  ? 'border-green-500/50 bg-green-500/10 scale-105' 
                  : 'border-gray-700/50 hover:border-green-500/30'
              }`}
              onClick={() => setActivePhase(phase.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="h-8 w-8 text-green-400" />
                  </div>
                  <CardTitle className="text-lg">{phase.title}</CardTitle>
                  <Badge className={`${phase.color} text-white`}>
                    {phase.status.toUpperCase()}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {phase.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Phase Content */}
        <Tabs value={activePhase} onValueChange={setActivePhase} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/20">
            <TabsTrigger value="phase1" className="data-[state=active]:bg-green-600">
              Phase 1
            </TabsTrigger>
            <TabsTrigger value="phase2" className="data-[state=active]:bg-blue-600">
              Phase 2
            </TabsTrigger>
            <TabsTrigger value="phase3" className="data-[state=active]:bg-purple-600">
              Phase 3
            </TabsTrigger>
          </TabsList>

          {/* Phase 1 Content */}
          <TabsContent value="phase1" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 mb-2">🌱 Phase 1: Foundation Systems</h2>
              <p className="text-muted-foreground">Basic earning mechanisms and community building blocks</p>
            </div>
            
            <GaiaBikeEarning />
            <EnhancedBadgeSystem />
            <PhotoVerificationSystem />
            <InteractiveFoodMap />
          </TabsContent>

          {/* Phase 2 Content */}
          <TabsContent value="phase2" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-400 mb-2">🤝 Phase 2: Community Collaboration</h2>
              <p className="text-muted-foreground">Advanced social features and collaborative earning opportunities</p>
            </div>
            
            <LocationBasedMissions />
            <CommunityProjectVoting />
            <TeamChallenges />
            <TokenStakingSystem />
          </TabsContent>

          {/* Phase 3 Content */}
          <TabsContent value="phase3" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-purple-400 mb-2">👑 Phase 3: Advanced Ecosystem</h2>
              <p className="text-muted-foreground">Governance, ecosystem integration, and mentorship programs</p>
            </div>
            
            <AdvancedTokenMechanics />
            <CommunityGovernance />
            <EcosystemIntegration />
            <MentorshipProgram />
          </TabsContent>
        </Tabs>

        {/* Quick Stats Footer */}
        <Card className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border-2 border-green-500/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">12</div>
                <div className="text-sm text-muted-foreground">Earning Methods</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">8</div>
                <div className="text-sm text-muted-foreground">Community Features</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">4</div>
                <div className="text-sm text-muted-foreground">Advanced Systems</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">∞</div>
                <div className="text-sm text-muted-foreground">Impact Potential</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
