
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Target, Trophy, Star, BookOpen, MessageSquare, Calendar, Award } from 'lucide-react'
import { toast } from 'sonner'
import HoverSidebar from '@/components/HoverSidebar'

export function CommunityEngagementHub() {
  const [activeTrainings] = useState([
    { id: 1, title: 'Forest Fire Prevention Basics', progress: 75, participants: 156 },
    { id: 2, title: 'Sand Cannon Operation Training', progress: 45, participants: 89 },
    { id: 3, title: 'Emergency Response Protocol', progress: 90, participants: 203 },
  ])

  const [communityStats] = useState({
    totalMembers: 2847,
    activeProjects: 12,
    completedMissions: 89,
    globalRank: 'Bronze League'
  })

  const joinTraining = (trainingId: number) => {
    toast.success('🎓 Joined Training Program!', {
      description: 'You have been enrolled in the training program',
      duration: 4000
    })
    console.log(`Joined training program: ${trainingId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                🏘️ COMMUNITY ENGAGEMENT HUB
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Training • Coordination • Achievements • Global Leaderboards
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="training" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="training">📚 Training</TabsTrigger>
              <TabsTrigger value="coordination">🤝 Coordination</TabsTrigger>
              <TabsTrigger value="achievements">🏆 Achievements</TabsTrigger>
              <TabsTrigger value="leaderboard">📊 Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="training" className="space-y-6">
              {/* Community Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-green-500/30">
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">{communityStats.totalMembers}</div>
                    <div className="text-sm text-muted-foreground">Total Members</div>
                  </CardContent>
                </Card>
                <Card className="border-blue-500/30">
                  <CardContent className="p-4 text-center">
                    <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-400">{communityStats.activeProjects}</div>
                    <div className="text-sm text-muted-foreground">Active Projects</div>
                  </CardContent>
                </Card>
                <Card className="border-purple-500/30">
                  <CardContent className="p-4 text-center">
                    <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-400">{communityStats.completedMissions}</div>
                    <div className="text-sm text-muted-foreground">Completed Missions</div>
                  </CardContent>
                </Card>
                <Card className="border-yellow-500/30">
                  <CardContent className="p-4 text-center">
                    <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-400">{communityStats.globalRank}</div>
                    <div className="text-sm text-muted-foreground">Global Rank</div>
                  </CardContent>
                </Card>
              </div>

              {/* Training Programs */}
              <Card className="border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400">📚 Active Training Programs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeTrainings.map((training) => (
                    <div key={training.id} className="p-4 bg-black/20 rounded-lg border border-gray-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-blue-400" />
                          <span className="font-medium text-blue-400">{training.title}</span>
                        </div>
                        <Badge className="bg-blue-600">{training.participants} participants</Badge>
                      </div>
                      <div className="mb-3">
                        <Progress value={training.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">Progress: {training.progress}%</p>
                      </div>
                      <Button
                        onClick={() => joinTraining(training.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        Join Training
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coordination" className="space-y-6">
              <Card className="border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400">🤝 Community Coordination</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-green-400" />
                    <p className="text-lg">Community coordination dashboard</p>
                    <p className="text-sm">Manage team activities and collaborative projects</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">🏆 Achievement System</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Award className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                    <p className="text-lg">Track your achievements</p>
                    <p className="text-sm">Earn badges and recognition for your contributions</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">📊 Global Leaderboards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                    <p className="text-lg">Global community rankings</p>
                    <p className="text-sm">See how your community ranks worldwide</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CommunityEngagementHub
