
import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Video, 
  Radio, 
  Users, 
  Eye, 
  MessageCircle, 
  Share2, 
  Settings,
  Play,
  Pause,
  Volume2,
  Maximize,
  Heart,
  Coins
} from 'lucide-react'

interface LiveStream {
  id: string
  title: string
  streamer: string
  viewers: number
  category: 'music' | 'environmental' | 'educational' | 'community'
  thumbnail: string
  isLive: boolean
  duration?: string
  gaiaEarned: number
}

export function VideoLiveStreaming() {
  const [activeTab, setActiveTab] = useState("browse")
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamTitle, setStreamTitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("music")
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Mock live streams data
  const [liveStreams] = useState<LiveStream[]>([
    {
      id: '1',
      title: '🎵 Ocean Sounds & Sustainable Living Discussion',
      streamer: 'EcoMusicMaven',
      viewers: 247,
      category: 'music',
      thumbnail: '/placeholder-stream.jpg',
      isLive: true,
      gaiaEarned: 125
    },
    {
      id: '2',
      title: '🌱 Forest Conservation Project Live Update',
      streamer: 'GreenGuardian',
      viewers: 189,
      category: 'environmental',
      thumbnail: '/placeholder-stream.jpg',
      isLive: true,
      gaiaEarned: 89
    },
    {
      id: '3',
      title: '🎸 Acoustic Performance for Climate Awareness',
      streamer: 'SustainableStrings',
      viewers: 356,
      category: 'music',
      thumbnail: '/placeholder-stream.jpg',
      isLive: true,
      gaiaEarned: 210
    }
  ])

  const [featuredStream, setFeaturedStream] = useState<LiveStream | null>(liveStreams[0])

  const startStream = async () => {
    if (!streamTitle.trim()) return
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      
      setIsStreaming(true)
    } catch (error) {
      console.error('Error starting stream:', error)
    }
  }

  const stopStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }

  const categories = [
    { value: 'music', label: '🎵 Music & Performance', color: 'text-purple-400' },
    { value: 'environmental', label: '🌱 Environmental', color: 'text-green-400' },
    { value: 'educational', label: '📚 Educational', color: 'text-blue-400' },
    { value: 'community', label: '👥 Community', color: 'text-orange-400' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Radio className="h-8 w-8 text-purple-400 animate-pulse" />
            <div>
              <h2 className="text-2xl font-bold text-purple-400">📡 GAiA Live Streaming</h2>
              <p className="text-purple-300">Stream music performances, environmental talks, and earn GAiA tokens live</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-red-500/30">
          <CardContent className="p-4 text-center">
            <Radio className="h-8 w-8 text-red-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-bold text-red-400">{liveStreams.filter(s => s.isLive).length}</div>
            <div className="text-xs text-muted-foreground">Live Now</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/30">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{liveStreams.reduce((acc, s) => acc + s.viewers, 0).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Viewers</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/30">
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">247</div>
            <div className="text-xs text-muted-foreground">Streamers</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{liveStreams.reduce((acc, s) => acc + s.gaiaEarned, 0).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">GAiA Earned Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Browse Streams
          </TabsTrigger>
          <TabsTrigger value="stream" className="flex items-center gap-2">
            <Radio className="h-4 w-4" />
            Go Live
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Featured Stream */}
          {featuredStream && (
            <Card className="border-red-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-red-400 animate-pulse" />
                  Featured Live Stream
                  <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <Play className="h-16 w-16 text-white opacity-50" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Play className="h-4 w-4 mr-1" />
                        Watch Live
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4 mr-1" />
                        Follow
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{featuredStream.title}</h3>
                      <p className="text-muted-foreground">by {featuredStream.streamer}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-blue-400" />
                        <span>{featuredStream.viewers.toLocaleString()} watching</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        <span>{featuredStream.gaiaEarned} GAiA earned</span>
                      </div>
                    </div>
                    <div>
                      <Badge variant="secondary" className={categories.find(c => c.value === featuredStream.category)?.color}>
                        {categories.find(c => c.value === featuredStream.category)?.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Live Streams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="border-gray-700 hover:border-purple-500/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="aspect-video bg-black rounded-lg relative flex items-center justify-center">
                      <Play className="h-8 w-8 text-white opacity-50" />
                      {stream.isLive && (
                        <Badge variant="destructive" className="absolute top-2 left-2 animate-pulse">
                          LIVE
                        </Badge>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {stream.viewers} viewers
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-2">{stream.title}</h4>
                      <p className="text-sm text-muted-foreground">{stream.streamer}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={categories.find(c => c.value === stream.category)?.color}>
                        {categories.find(c => c.value === stream.category)?.label.split(' ')[0]}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-yellow-400">
                        <Coins className="h-3 w-3" />
                        {stream.gaiaEarned}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stream" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stream Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Start Your Live Stream
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Stream Title</label>
                  <Input
                    placeholder="🎵 Your amazing stream title..."
                    value={streamTitle}
                    onChange={(e) => setStreamTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-background"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  {!isStreaming ? (
                    <Button 
                      onClick={startStream}
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={!streamTitle.trim()}
                    >
                      <Radio className="h-4 w-4 mr-2" />
                      Go Live
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopStream}
                      variant="destructive"
                      className="w-full"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Stream
                    </Button>
                  )}
                </div>

                <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
                  <h4 className="font-bold text-green-400 mb-2">💰 Earning Potential</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Base streaming: 10 GAiA/hour</div>
                    <div>• Viewer bonus: +1 GAiA per 10 viewers</div>
                    <div>• Engagement bonus: up to +50 GAiA/hour</div>
                    <div>• Music performance: +25% bonus</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stream Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Stream Preview
                  {isStreaming && <Badge variant="destructive" className="animate-pulse">LIVE</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover rounded-lg"
                    style={{ display: isStreaming ? 'block' : 'none' }}
                  />
                  {!isStreaming && (
                    <div className="text-center">
                      <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Camera preview will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-blue-500/30">
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">2.4K</div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
            
            <Card className="border-green-500/30">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">456</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-500/30">
              <CardContent className="p-4 text-center">
                <Radio className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">24</div>
                <div className="text-xs text-muted-foreground">Streams</div>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-500/30">
              <CardContent className="p-4 text-center">
                <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">1,247</div>
                <div className="text-xs text-muted-foreground">GAiA Earned</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>📊 Streaming Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Your streaming analytics and performance metrics will be displayed here. 
                  Track your audience growth, engagement rates, and GAiA token earnings over time.
                </p>
                
                <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                  <h4 className="font-bold text-blue-400 mb-2">🚀 Phase 2 Coming Soon</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Real-time analytics dashboard</div>
                    <div>• Audience engagement heatmaps</div>
                    <div>• Revenue tracking & projections</div>
                    <div>• Performance optimization tips</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
