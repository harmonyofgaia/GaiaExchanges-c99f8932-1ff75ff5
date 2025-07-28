
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Radio, 
  Video, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Gift,
  Coins,
  Play,
  Pause,
  Volume2,
  Settings,
  Share2
} from 'lucide-react'
import { toast } from 'sonner'

interface LiveStream {
  id: string
  title: string
  streamer: string
  viewers: number
  category: 'music' | 'video' | 'talk' | 'gaming'
  thumbnail: string
  isLive: boolean
  duration: string
  tags: string[]
}

export function VideoLiveStreaming() {
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'analytics'>('browse')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamTitle, setStreamTitle] = useState('')
  const [streamCategory, setStreamCategory] = useState<'music' | 'video' | 'talk' | 'gaming'>('music')
  const [currentViewers, setCurrentViewers] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(0)

  const [liveStreams] = useState<LiveStream[]>([
    {
      id: '1',
      title: '🎵 Acoustic Sunset Sessions - Original Songs',
      streamer: 'EcoMusician',
      viewers: 234,
      category: 'music',
      thumbnail: '/api/placeholder/320/180',
      isLive: true,
      duration: '2h 15m',
      tags: ['acoustic', 'original', 'sunset']
    },
    {
      id: '2',
      title: '🌱 Building a Sustainable Garden - Live Tutorial',
      streamer: 'GreenThumb92',
      viewers: 156,
      category: 'video',
      thumbnail: '/api/placeholder/320/180',
      isLive: true,
      duration: '1h 32m',
      tags: ['gardening', 'sustainable', 'tutorial']
    },
    {
      id: '3',
      title: '🎮 Gaia Fighter Championship - Live Tournament',
      streamer: 'GameMaster',
      viewers: 89,
      category: 'gaming',
      thumbnail: '/api/placeholder/320/180',
      isLive: true,
      duration: '45m',
      tags: ['gaming', 'tournament', 'gaia']
    }
  ])

  const startStreaming = () => {
    if (!streamTitle.trim()) {
      toast.error('Please enter a stream title')
      return
    }
    
    setIsStreaming(true)
    setCurrentViewers(1)
    toast.success('🔴 Live stream started!', {
      description: `Broadcasting: ${streamTitle}`
    })
    
    // Simulate viewer growth
    const viewerInterval = setInterval(() => {
      setCurrentViewers(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)
    
    // Simulate earnings
    const earningsInterval = setInterval(() => {
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 5) + 1)
    }, 8000)
    
    return () => {
      clearInterval(viewerInterval)
      clearInterval(earningsInterval)
    }
  }

  const stopStreaming = () => {
    setIsStreaming(false)
    toast.success('Stream ended', {
      description: `Total earnings: ${totalEarnings} GAiA tokens`
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-red-400" />
            Live Streaming Platform
            <Badge variant="secondary" className="bg-red-500/20 text-red-400">🔴 Live</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Stream live music, videos, and interact with your audience while earning GAiA tokens
          </p>
        </CardHeader>
      </Card>

      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'browse' ? 'default' : 'outline'}
          onClick={() => setActiveTab('browse')}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Browse Streams
        </Button>
        <Button
          variant={activeTab === 'create' ? 'default' : 'outline'}
          onClick={() => setActiveTab('create')}
          className="flex items-center gap-2"
        >
          <Video className="h-4 w-4" />
          Go Live
        </Button>
        <Button
          variant={activeTab === 'analytics' ? 'default' : 'outline'}
          onClick={() => setActiveTab('analytics')}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Analytics
        </Button>
      </div>

      {activeTab === 'browse' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="border-purple-500/30 hover:border-purple-400 transition-colors">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <Video className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      🔴 LIVE
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      {stream.duration}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {stream.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{stream.streamer}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {stream.viewers}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {stream.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Watch
                    </Button>
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Live Stream</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stream Title</label>
                <Input
                  placeholder="Enter your stream title..."
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={streamCategory} onValueChange={(value: any) => setStreamCategory(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">🎵 Music</SelectItem>
                    <SelectItem value="video">🎥 Video</SelectItem>
                    <SelectItem value="talk">💬 Talk Show</SelectItem>
                    <SelectItem value="gaming">🎮 Gaming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isStreaming ? (
                <Button onClick={startStreaming} className="w-full">
                  <Radio className="h-4 w-4 mr-2" />
                  Start Live Stream
                </Button>
              ) : (
                <div className="space-y-4">
                  <Card className="bg-red-950/20 border-red-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                          <span className="font-medium">LIVE NOW</span>
                        </div>
                        <Badge variant="outline">{currentViewers} viewers</Badge>
                      </div>
                      
                      <h3 className="font-semibold mb-2">{streamTitle}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{totalEarnings}</div>
                          <div className="text-sm text-muted-foreground">GAiA Tokens</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{currentViewers}</div>
                          <div className="text-sm text-muted-foreground">Live Viewers</div>
                        </div>
                      </div>
                      
                      <Button onClick={stopStreaming} variant="destructive" className="w-full">
                        <Pause className="h-4 w-4 mr-2" />
                        End Stream
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">Avg Viewers</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">456</div>
                <div className="text-sm text-muted-foreground">Tokens Earned</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">78</div>
                <div className="text-sm text-muted-foreground">Avg Likes</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <h4 className="font-medium">Stream {i} - Music Session</h4>
                      <p className="text-sm text-muted-foreground">2 days ago • 45 viewers • 1h 23m</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">+25 GAiA</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
