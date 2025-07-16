
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
  Music
} from 'lucide-react'
import { toast } from 'sonner'
import { ArtistStreamingPlatform } from '@/components/ArtistStreamingPlatform'
import { LiveArtistShow } from './LiveArtistShow'

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
            🎭 LIVE ARTIST HUB - COMPLETE ENTERTAINMENT CONTROL CENTER
          </CardTitle>
          <p className="text-muted-foreground">
            Integrated artist streaming platform with live shows, artist platform, token burning, and earnings management
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
          <TabsTrigger value="admin-controls">🎛️ Admin Controls</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          <TabsTrigger value="monetization">💰 Monetization</TabsTrigger>
        </TabsList>

        <TabsContent value="live-streaming">
          <LiveArtistShow />
        </TabsContent>

        <TabsContent value="artist-platform">
          <ArtistStreamingPlatform />
        </TabsContent>

        <TabsContent value="admin-controls">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stream Management */}
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🎛️ Stream Management Center</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleStartStream}
                    className="bg-green-600 hover:bg-green-700 h-16 flex-col"
                  >
                    <Camera className="h-6 w-6 mb-2" />
                    <span className="text-xs">Start All Streams</span>
                  </Button>
                  <Button 
                    onClick={handleStopStream}
                    className="bg-red-600 hover:bg-red-700 h-16 flex-col"
                  >
                    <Monitor className="h-6 w-6 mb-2" />
                    <span className="text-xs">Stop All Streams</span>
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex-col">
                    <Mic className="h-6 w-6 mb-2" />
                    <span className="text-xs">Audio Control</span>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex-col">
                    <Settings className="h-6 w-6 mb-2" />
                    <span className="text-xs">Stream Settings</span>
                  </Button>
                </div>

                <div className="p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
                  <h4 className="font-bold text-green-400 mb-2">Stream Quality Settings:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Resolution:</span>
                      <Badge className="bg-blue-600">4K</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Frame Rate:</span>
                      <Badge className="bg-green-600">60 FPS</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Bitrate:</span>
                      <Badge className="bg-purple-600">8000 kbps</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Latency:</span>
                      <Badge className="bg-yellow-600">Ultra Low</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">👥 User & Content Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded">
                    <span>Active Moderators:</span>
                    <span className="font-bold text-blue-400">24</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-900/30 rounded">
                    <span>Chat Messages/min:</span>
                    <span className="font-bold text-green-400">847</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-900/30 rounded">
                    <span>Content Reports:</span>
                    <span className="font-bold text-purple-400">0</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button className="bg-yellow-600 hover:bg-yellow-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat Control
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Content Filter
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Crown className="h-4 w-4 mr-2" />
                    VIP Access
                  </Button>
                </div>
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
                    <div className="text-white text-sm">Analytics Chart Visualization</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Peak Concurrent Viewers:</span>
                      <span className="text-blue-400 font-bold">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Session:</span>
                      <span className="text-green-400 font-bold">12:34</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue per Stream:</span>
                      <span className="text-yellow-400 font-bold">247 GAiA</span>
                    </div>
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
                  <div className="flex justify-between">
                    <span>Mobile Users:</span>
                    <span className="text-blue-400">43.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Desktop Users:</span>
                    <span className="text-yellow-400">56.8%</span>
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
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Withdraw Earnings
                  </Button>
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
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Burn Rate:</span>
                      <span className="text-orange-400">5%/stream</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impact Score:</span>
                      <span className="text-green-400">247</span>
                    </div>
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
                  
                  <div className="pt-3 border-t border-pink-500/20">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Rewards:</span>
                        <span className="text-pink-400">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VIP Members:</span>
                        <span className="text-purple-400">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loyalty Points:</span>
                        <span className="text-blue-400">2,847</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
