
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  VideoSecurityCompliance,
  VideoMusicUploadSystem,
  VideoChannelSubscriptions,
  VideoLiveStreaming
} from '@/components/video-exchange'
import { Video, Users, Upload, MessageCircle, Bell, Coins, Trophy, Calendar, Shield, Lock, Music, Radio } from 'lucide-react'

interface VideoStats {
  totalVideos: number
  totalChannels: number
  totalUsers: number
  totalViews: number
  totalComments: number
  totalSubscriptions: number
  totalPoints: number
  totalTokens: number
  totalMusicTracks: number
  totalMusicPlays: number
  totalLiveStreams: number
  totalLiveViewers: number
}

export function VideoExchangeDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats] = useState<VideoStats>({
    totalVideos: 12547,
    totalChannels: 3421,
    totalUsers: 45678,
    totalViews: 8934567,
    totalComments: 234567,
    totalSubscriptions: 89234,
    totalPoints: 5678901,
    totalTokens: 234567,
    totalMusicTracks: 8945,
    totalMusicPlays: 2345678,
    totalLiveStreams: 247,
    totalLiveViewers: 12456
  })

  const tabs = [
    { value: "overview", label: "Overview", icon: <Video className="h-4 w-4 mb-1" /> },
    { value: "channels", label: "Channels", icon: <Users className="h-4 w-4 mb-1" /> },
    { value: "upload", label: "Upload", icon: <Upload className="h-4 w-4 mb-1" /> },
    { value: "music", label: "Music", icon: <Music className="h-4 w-4 mb-1" /> },
    { value: "streaming", label: "Live Stream", icon: <Radio className="h-4 w-4 mb-1" /> },
    { value: "subscriptions", label: "Subscribe", icon: <Bell className="h-4 w-4 mb-1" /> },
    { value: "player", label: "Player", icon: <Video className="h-4 w-4 mb-1" /> },
    { value: "chat", label: "Chat", icon: <MessageCircle className="h-4 w-4 mb-1" /> },
    { value: "tokens", label: "Tokens", icon: <Coins className="h-4 w-4 mb-1" /> },
    { value: "leaderboards", label: "Leaderboards", icon: <Trophy className="h-4 w-4 mb-1" /> },
    { value: "events", label: "Events", icon: <Calendar className="h-4 w-4 mb-1" /> },
    { value: "admin", label: "Admin", icon: <Shield className="h-4 w-4 mb-1" /> }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Video className="h-8 w-8 text-green-400" />
            <div>
              <h2 className="text-2xl font-bold text-green-400">🎬 GAiA Community Video & Music Exchange</h2>
              <p className="text-green-300">Outstanding Experience Platform • Music & Video Upload • Live Streaming • GAiA Token Earning • Subscription System</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{stats.totalVideos.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Videos</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <Music className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{stats.totalMusicTracks.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Music Tracks</div>
          </CardContent>
        </Card>
        
        <Card className="border-red-500/30">
          <CardContent className="p-4 text-center">
            <Radio className="h-8 w-8 text-red-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-bold text-red-400">{stats.totalLiveStreams.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Live Streams</div>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/30">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{stats.totalChannels.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Channels</div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-500/30">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Users</div>
          </CardContent>
        </Card>
        
        <Card className="border-teal-500/30">
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 text-teal-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-teal-400">{stats.totalViews.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Video Views</div>
          </CardContent>
        </Card>
        
        <Card className="border-pink-500/30">
          <CardContent className="p-4 text-center">
            <Radio className="h-8 w-8 text-pink-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-400">{stats.totalMusicPlays.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Music Plays</div>
          </CardContent>
        </Card>
        
        <Card className="border-violet-500/30">
          <CardContent className="p-4 text-center">
            <Radio className="h-8 w-8 text-violet-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-violet-400">{stats.totalLiveViewers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Live Viewers</div>
          </CardContent>
        </Card>
        
        <Card className="border-cyan-500/30">
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-400">{stats.totalComments.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Comments</div>
          </CardContent>
        </Card>
        
        <Card className="border-rose-500/30">
          <CardContent className="p-4 text-center">
            <Bell className="h-8 w-8 text-rose-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-rose-400">{stats.totalSubscriptions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Subscriptions</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{stats.totalPoints.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </CardContent>
        </Card>
        
        <Card className="border-indigo-500/30">
          <CardContent className="p-4 text-center">
            <Coins className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-400">{stats.totalTokens.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">GAiA Tokens</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className={`grid w-full gap-1 h-auto p-1 text-xs`}
          style={{
            gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
          }}
        >
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="p-2 text-center">
              <div className="flex flex-col items-center">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video & Music Exchange Overview
                <Badge variant="secondary">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The GAiA Community Video & Music Exchange is an outstanding experience platform that combines 
                  video sharing, musical performances, live streaming, and environmental impact. Creators earn real GAiA tokens 
                  for their content while building communities around sustainability and harmony.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-green-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-green-400" />
                        <h4 className="font-semibold text-green-400">Personal Channels</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Customizable channels with upload storage, subscriber management, and analytics.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Music className="h-5 w-5 text-purple-400" />
                        <h4 className="font-semibold text-purple-400">Music Upload & Earning</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Upload musical performances and earn GAiA tokens based on plays and engagement.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-red-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Radio className="h-5 w-5 text-red-400 animate-pulse" />
                        <h4 className="font-semibold text-red-400">Live Streaming</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Stream live music performances and educational content to earn real-time GAiA rewards.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-5 w-5 text-blue-400" />
                        <h4 className="font-semibold text-blue-400">Subscription System</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Follow favorite creators, get notifications, and build communities around content.
                      </p>
                    </CardContent>
                  </Card>
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

        <TabsContent value="music">
          <VideoMusicUploadSystem />
        </TabsContent>

        <TabsContent value="streaming">
          <VideoLiveStreaming />
        </TabsContent>

        <TabsContent value="subscriptions">
          <VideoChannelSubscriptions />
        </TabsContent>

        <TabsContent value="player">
          <InteractiveVideoPlayer />
        </TabsContent>

        <TabsContent value="chat">
          <VideoChatEngine />
        </TabsContent>

        <TabsContent value="tokens">
          <VideoPointsTokensSystem />
        </TabsContent>

        <TabsContent value="leaderboards">
          <VideoLeaderboards />
        </TabsContent>

        <TabsContent value="events">
          <VideoChallengesEvents />
        </TabsContent>

        <TabsContent value="admin">
          <div className="space-y-4">
            <VideoAdminControl />
            <VideoSecurityCompliance />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
