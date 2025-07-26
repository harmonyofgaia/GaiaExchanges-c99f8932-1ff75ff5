
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Upload, Users, Star, Coins, Trophy } from 'lucide-react'

// Import video exchange components
import {
  VideoPersonalChannels,
  VideoUploadSystem,
  InteractiveVideoPlayer,
  VideoChatEngine,
  VideoSubscriptionSystem,
  VideoPointsTokensSystem,
  VideoLeaderboards,
  VideoChallengesEvents,
  VideoAdminControl,
  VideoSecurityCompliance
} from '@/components/video-exchange'

export default function VideoExchange() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            GAiA Video Exchange Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share environmental stories, connect with eco-warriors, and earn rewards through creative video content
          </p>
        </div>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="player">Player</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscribe</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaders</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Play className="h-5 w-5" />
                    Videos Shared
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">12,847</div>
                  <p className="text-sm text-muted-foreground">Environmental content</p>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Users className="h-5 w-5" />
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">45,623</div>
                  <p className="text-sm text-muted-foreground">Community members</p>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Coins className="h-5 w-5" />
                    Tokens Earned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">2.4M</div>
                  <p className="text-sm text-muted-foreground">GAiA tokens distributed</p>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Trophy className="h-5 w-5" />
                    Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">127</div>
                  <p className="text-sm text-muted-foreground">Active challenges</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">Platform Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Personal Channels</h3>
                    <p className="text-sm text-muted-foreground">Create and manage your eco-content channels</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Interactive Player</h3>
                    <p className="text-sm text-muted-foreground">Engage with videos through comments and reactions</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Reward System</h3>
                    <p className="text-sm text-muted-foreground">Earn tokens and points for quality content</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Community Chat</h3>
                    <p className="text-sm text-muted-foreground">Connect with other environmental advocates</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Challenges & Events</h3>
                    <p className="text-sm text-muted-foreground">Participate in eco-friendly competitions</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Secure Platform</h3>
                    <p className="text-sm text-muted-foreground">GDPR compliant with advanced security</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="channels">
            <VideoPersonalChannels />
          </TabsContent>

          <TabsContent value="upload">
            <VideoUploadSystem />
          </TabsContent>

          <TabsContent value="player">
            <InteractiveVideoPlayer />
          </TabsContent>

          <TabsContent value="chat">
            <VideoChatEngine />
          </TabsContent>

          <TabsContent value="subscriptions">
            <VideoSubscriptionSystem />
          </TabsContent>

          <TabsContent value="rewards">
            <VideoPointsTokensSystem />
          </TabsContent>

          <TabsContent value="leaderboard">
            <VideoLeaderboards />
          </TabsContent>

          <TabsContent value="events">
            <VideoChallengesEvents />
          </TabsContent>

          <TabsContent value="admin">
            <VideoAdminControl />
            <div className="mt-6">
              <VideoSecurityCompliance />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
