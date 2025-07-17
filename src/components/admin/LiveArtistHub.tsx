
import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Users,
  MessageCircle,
  Heart,
  Share,
  Radio,
  Mic,
  Camera,
  Monitor,
  DollarSign,
  TrendingUp,
  Activity,
  Star,
  Crown,
  Gift,
  Flame,
  StreamIcon,
  Music,
  Video,
  Headphones
} from 'lucide-react'
import { toast } from 'sonner'
import { ArtistStreamingPlatform } from '@/components/ArtistStreamingPlatform'

export function LiveArtistHub() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [viewerCount, setViewerCount] = useState(1247)
  const [activeStreams, setActiveStreams] = useState(4)
  const [totalEarnings, setTotalEarnings] = useState(8947.65)
  const [tokensBurned, setTokensBurned] = useState(1247)

  const handleStartStream = () => {
    setIsStreaming(true)
    toast.success('🎭 Live stream started successfully!')
  }

  const handleStopStream = () => {
    setIsStreaming(false)
    toast.success('📺 Stream ended - Analytics saved')
  }

  return (
    <div className="space-y-6">
      {/* Live Artist Hub Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Radio className="h-6 w-6" />
            🎭 LIVE ARTIST HUB - COMPLETE MANAGEMENT SYSTEM
          </CardTitle>
          <p className="text-muted-foreground">
            Unified artist platform with live streaming, artist management, and complete admin control
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-900/30 border border-red-500/20 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{viewerCount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Live Viewers</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{activeStreams}</div>
              <div className="text-sm text-muted-foreground">Active Streams</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{totalEarnings.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">GAiA Earned</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">{tokensBurned}</div>
              <div className="text-sm text-muted-foreground">Tokens Burned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="live-streaming" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="live-streaming">🎥 Live Streaming</TabsTrigger>
          <TabsTrigger value="artist-platform">🎵 Artist Platform</TabsTrigger>
          <TabsTrigger value="admin-controls">🛡️ Admin Controls</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          <TabsTrigger value="monetization">💰 Monetization</TabsTrigger>
        </TabsList>

        <TabsContent value="live-streaming">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stream Control Panel */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-green-500/30 bg-green-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400">🎛️ Live Stream Control Center</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stream Preview */}
                    <div className="relative bg-black rounded-lg overflow-hidden h-64 flex items-center justify-center">
                      {isStreaming ? (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Radio className="h-8 w-8 text-white animate-pulse" />
                          </div>
                          <div className="text-white text-lg font-bold">LIVE STREAMING</div>
                          <div className="text-red-400">{viewerCount} viewers</div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <Camera className="h-16 w-16 mx-auto mb-4" />
                          <div>Stream Preview - Not Live</div>
                        </div>
                      )}
                      
                      {isStreaming && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-600 text-white animate-pulse">
                            🔴 LIVE
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Stream Controls */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        onClick={isStreaming ? handleStopStream : handleStartStream}
                        className={isStreaming ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                      >
                        {isStreaming ? <Monitor className="h-4 w-4 mr-2" /> : <Camera className="h-4 w-4 mr-2" />}
                        {isStreaming ? 'End Stream' : 'Start Stream'}
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Mic className="h-4 w-4 mr-2" />
                        Audio
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <Button className="bg-yellow-600 hover:bg-yellow-700">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Chat & Stats */}
            <div className="space-y-4">
              <Card className="border-cyan-500/30 bg-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400">💬 Live Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-black/20 rounded p-2 mb-4 overflow-y-auto">
                    <div className="text-sm space-y-1">
                      <div><span className="text-cyan-400">Admin:</span> Welcome to the live show!</div>
                      <div><span className="text-green-400">Fan1:</span> Amazing performance! 🎵</div>
                      <div><span className="text-blue-400">Fan2:</span> Love this song!</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Type message..." className="flex-1" />
                    <Button size="sm">Send</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/30 bg-yellow-900/20">
                <CardHeader>
                  <CardTitle className="text-yellow-400">📈 Live Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="text-yellow-400">2:34:15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Viewers:</span>
                    <span className="text-yellow-400">1,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement:</span>
                    <span className="text-green-400">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Earnings:</span>
                    <span className="text-green-400">247 GAiA</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="artist-platform">
          <ArtistStreamingPlatform />
        </TabsContent>

        <TabsContent value="admin-controls">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="text-red-400">🔥 Stream Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Stream Quality Control
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Users className="h-4 w-4 mr-2" />
                  Viewer Management
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Monitor className="h-4 w-4 mr-2" />
                  Content Moderation
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">⚡ Performance Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Activity className="h-4 w-4 mr-2" />
                  Server Performance
                </Button>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Bandwidth Control
                </Button>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Radio className="h-4 w-4 mr-2" />
                  Network Optimization
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">💎 Revenue Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Payment Processing
                </Button>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Crown className="h-4 w-4 mr-2" />
                  VIP Tier Management
                </Button>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Gift className="h-4 w-4 mr-2" />
                  Reward Distribution
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">📊 Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-900/30 rounded">
                      <div className="text-2xl font-bold text-blue-400">847K</div>
                      <div className="text-xs">Total Views</div>
                    </div>
                    <div className="text-center p-3 bg-green-900/30 rounded">
                      <div className="text-2xl font-bold text-green-400">94.2%</div>
                      <div className="text-xs">Engagement</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded flex items-end justify-center">
                    <div className="text-white text-sm">Analytics Chart Placeholder</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">🎯 Audience Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Top Countries:</span>
                    <div className="text-right">
                      <div className="text-purple-400">🇺🇸 USA (32%)</div>
                      <div className="text-blue-400">🇬🇧 UK (18%)</div>
                      <div className="text-green-400">🇩🇪 Germany (12%)</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Watch Time:</span>
                    <span className="text-purple-400">12:34</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Return Viewers:</span>
                    <span className="text-green-400">67.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monetization">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-gold-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-yellow-400">💰 Revenue Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tips & Donations:</span>
                    <span className="text-green-400">4,847 GAiA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stream Revenue:</span>
                    <span className="text-blue-400">2,156 GAiA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NFT Sales:</span>
                    <span className="text-purple-400">1,943 GAiA</span>
                  </div>
                  <div className="border-t pt-2 font-bold">
                    <div className="flex justify-between">
                      <span>Total Earned:</span>
                      <span className="text-yellow-400">8,946 GAiA</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="text-orange-400">🔥 Token Burning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">1,247</div>
                    <div className="text-sm text-muted-foreground">Tokens Burned for Impact</div>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Flame className="h-4 w-4 mr-2" />
                    Burn More Tokens
                  </Button>
                  <div className="text-xs text-center text-muted-foreground">
                    Environmental impact: 12.47 trees planted
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pink-500/30 bg-pink-900/20">
              <CardHeader>
                <CardTitle className="text-pink-400">🎁 Fan Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    <Gift className="h-4 w-4 mr-2" />
                    Send Rewards
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Crown className="h-4 w-4 mr-2" />
                    VIP Access
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Star className="h-4 w-4 mr-2" />
                    Exclusive Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
