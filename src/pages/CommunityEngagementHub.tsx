import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, MessageSquare, Trophy, Heart, Globe, Star, Shield, GamepadIcon, Handshake } from 'lucide-react'
import { toast } from 'sonner'

export default function CommunityEngagementHub() {
  const joinSecureChat = () => {
    toast.success('🔒 Secure Chat Access Granted!', {
      description: 'Redirecting to Habbo Tycoon secure chat rooms...',
      duration: 4000
    })
    // In a real app, this would redirect to the game
    window.open('/game', '_blank')
  }

  const requestPartnership = () => {
    toast.info('🤝 Partnership Request', {
      description: 'Redirecting to partnership portal. Admin approval required.',
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🤝 Community Engagement Hub
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Connect, Collaborate, and Create Environmental Impact Together
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Users className="h-3 w-3 mr-1" />
              12.4K Members
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Globe className="h-3 w-3 mr-1" />
              Global Community
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <Shield className="h-3 w-3 mr-1" />
              Secure Chat Available
            </Badge>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
              <GamepadIcon className="h-3 w-3 mr-1" />
              Gaming Community
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Active Members</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12,435</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Discussions</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3,847</div>
              <p className="text-xs text-muted-foreground">Active conversations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Projects</CardTitle>
              <Trophy className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">247</div>
              <p className="text-xs text-muted-foreground">Community initiatives</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-black/50 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Impact Score</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">9.2/10</div>
              <p className="text-xs text-muted-foreground">Community rating</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="community" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="community">🤝 Community</TabsTrigger>
            <TabsTrigger value="secure-chat">🔒 Secure Chat</TabsTrigger>
            <TabsTrigger value="partnerships">🤝 Partnerships</TabsTrigger>
            <TabsTrigger value="gaming">🎮 Gaming Hub</TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-400">Recent Community Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-green-400">Ocean Cleanup Drive</h4>
                        <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">Active</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Organizing beach cleanup events worldwide</p>
                      <Progress value={78} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Progress</span>
                        <span>78%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-blue-400">Urban Forest Project</h4>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">Growing</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Planting trees in urban environments</p>
                      <Progress value={45} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Progress</span>
                        <span>45%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-purple-400">Renewable Energy Hub</h4>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">Planning</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Community solar panel installations</p>
                      <Progress value={12} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Progress</span>
                        <span>12%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400">Community Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Join Discussions
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                      <Trophy className="h-4 w-4 mr-2" />
                      View Leaderboard
                    </Button>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Support Projects
                    </Button>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 justify-start">
                      <Star className="h-4 w-4 mr-2" />
                      Rate & Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="secure-chat" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  🔒 Ultra-Secure Community Chat
                </CardTitle>
                <p className="text-muted-foreground">
                  Join the most secure chat system in Habbo Tycoon - Quantum encrypted, admin-controlled privacy
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-black/30 border-green-500/30">
                    <CardContent className="pt-6 text-center">
                      <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <h3 className="font-bold text-green-400 mb-2">Quantum Encryption</h3>
                      <p className="text-sm text-muted-foreground">Military-grade security with quantum protocols</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/30 border-blue-500/30">
                    <CardContent className="pt-6 text-center">
                      <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <h3 className="font-bold text-blue-400 mb-2">Admin Controlled</h3>
                      <p className="text-sm text-muted-foreground">Full privacy protection under admin oversight</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/30 border-purple-500/30">
                    <CardContent className="pt-6 text-center">
                      <GamepadIcon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <h3 className="font-bold text-purple-400 mb-2">Gaming Integration</h3>
                      <p className="text-sm text-muted-foreground">Seamless chat within Habbo Tycoon gameplay</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center space-y-4">
                  <Button 
                    onClick={joinSecureChat}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    Enter Secure Habbo Tycoon Chat
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    🎮 Chat while playing • 🔒 Complete privacy • 👑 Admin protection
                  </p>
                </div>

                <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
                  <CardContent className="pt-6">
                    <h4 className="font-bold text-green-400 mb-3">🛡️ Your Privacy is Protected:</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• All messages are quantum-encrypted and untraceable</li>
                      <li>• Admin oversight ensures safe community environment</li>
                      <li>• Zero data collection outside secure gaming environment</li>
                      <li>• Real-time security monitoring prevents abuse</li>
                      <li>• Full transparency with community-first approach</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Handshake className="h-6 w-6" />
                  Community Partnership Opportunities
                </CardTitle>
                <p className="text-muted-foreground">
                  Connect with our team for environmental and gaming partnerships
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-black/30 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 text-lg">🌱 Environmental Partnerships</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Green technology collaborations</li>
                        <li>• Renewable energy projects</li>
                        <li>• Conservation initiatives</li>
                        <li>• Educational programs</li>
                      </ul>
                      <Button 
                        onClick={requestPartnership}
                        className="w-full mt-4 bg-green-600 hover:bg-green-700"
                      >
                        Request Environmental Partnership
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-400 text-lg">🎮 Gaming Partnerships</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Game development collaborations</li>
                        <li>• Community event partnerships</li>
                        <li>• Streaming and content creation</li>
                        <li>• Gaming tournament sponsorship</li>
                      </ul>
                      <Button 
                        onClick={requestPartnership}
                        className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                      >
                        Request Gaming Partnership
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
                  <CardContent className="pt-6">
                    <h4 className="font-bold text-yellow-400 mb-3">📞 How to Get in Touch:</h4>
                    <p className="text-gray-300 mb-4">
                      All partnership requests go through our secure admin-managed system. 
                      We review every proposal and respond within 48 hours.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span>Secure, admin-reviewed process</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                        <span>48-hour response guarantee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-purple-400" />
                        <span>Community-first approach</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gaming" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <GamepadIcon className="h-6 w-6" />
                  🎮 Community Gaming Hub
                </CardTitle>
                <p className="text-muted-foreground">
                  Experience the most advanced gaming community with secure chat integration
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-black/30 border-green-500/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl mb-2">🏨</div>
                      <h3 className="font-bold text-green-400 mb-2">Habbo Tycoon</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Virtual real-life building game with secure community chat
                      </p>
                      <Badge className="bg-green-600">🔒 Secure Chat Enabled</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/30 border-blue-500/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl mb-2">🐍➡️🪱</div>
                      <h3 className="font-bold text-blue-400 mb-2">Snake to Worms</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Revolutionary game transition system - Snake blasts into Worms!
                      </p>
                      <Badge className="bg-blue-600">🚀 Transition Ready</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/30 border-purple-500/30">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl mb-2">🎮</div>
                      <h3 className="font-bold text-purple-400 mb-2">Gaming Arena</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Complete gaming ecosystem with community features
                      </p>
                      <Badge className="bg-purple-600">👥 Community Active</Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={joinSecureChat}
                    className="bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg"
                  >
                    <GamepadIcon className="h-5 w-5 mr-2" />
                    Enter Gaming Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
