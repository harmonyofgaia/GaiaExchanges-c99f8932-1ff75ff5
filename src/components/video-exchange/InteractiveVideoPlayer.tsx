import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Settings, Share2, 
  Heart, ThumbsUp, MessageCircle, Users, Zap, Leaf, Gift,
  Eye, Clock, Send, Smile, Star, Award, Trophy, TreePine
} from 'lucide-react'

interface VideoData {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  currentTime: number
  views: number
  likes: number
  dislikes: number
  greenHearts: number
  shares: number
  channel: {
    id: string
    name: string
    avatar: string
    subscribers: number
    verified: boolean
  }
  tags: string[]
  greenImpact: number
  supportedProject: string
}

interface ChatMessage {
  id: string
  user: {
    name: string
    avatar: string
    badge?: string
  }
  message: string
  timestamp: string
  type: 'message' | 'reaction' | 'support'
}

interface LiveUser {
  id: string
  name: string
  avatar: string
  status: 'watching' | 'typing' | 'reacting'
}

export function InteractiveVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [quality, setQuality] = useState('1080p')
  const [showChat, setShowChat] = useState(true)
  const [chatMessage, setChatMessage] = useState('')
  const [activeTab, setActiveTab] = useState('chat')
  const videoRef = useRef<HTMLVideoElement>(null)

  const [videoData] = useState<VideoData>({
    id: '1',
    title: 'Building Sustainable Communities: A Complete Guide to Zero-Waste Living',
    description: 'Join me on this journey to create truly sustainable communities! In this comprehensive guide, I share practical tips, real-world examples, and actionable steps you can take today to reduce your environmental impact.',
    thumbnail: '/api/placeholder/800/450',
    duration: 1245, // seconds
    currentTime: 487,
    views: 47329,
    likes: 3241,
    dislikes: 89,
    greenHearts: 2847,
    shares: 1456,
    channel: {
      id: 'eco_sarah',
      name: 'Sarah\'s Little Heaven',
      avatar: '/api/placeholder/64/64',
      subscribers: 15420,
      verified: true
    },
    tags: ['sustainability', 'zero-waste', 'environmental', 'community', 'green-living'],
    greenImpact: 2847,
    supportedProject: 'Reforestation Initiative'
  })

  const [chatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: { name: 'EcoWarrior_Mike', avatar: '/api/placeholder/32/32', badge: '🌱' },
      message: 'This is exactly what our community needs! Thanks for sharing these practical tips.',
      timestamp: '2 minutes ago',
      type: 'message'
    },
    {
      id: '2',
      user: { name: 'GreenThumb_Lisa', avatar: '/api/placeholder/32/32' },
      message: 'Just donated 50 GAiA tokens to the reforestation project! 🌳',
      timestamp: '1 minute ago',
      type: 'support'
    },
    {
      id: '3',
      user: { name: 'ClimateAction_Tom', avatar: '/api/placeholder/32/32', badge: '💚' },
      message: 'Love the zero-waste kitchen setup! Definitely trying this at home.',
      timestamp: '30 seconds ago',
      type: 'message'
    },
    {
      id: '4',
      user: { name: 'SustainableSue', avatar: '/api/placeholder/32/32' },
      message: '❤️🌱 sent Green Heart reaction',
      timestamp: 'now',
      type: 'reaction'
    }
  ])

  const [liveUsers] = useState<LiveUser[]>([
    { id: '1', name: 'EcoWarrrior_Mike', avatar: '/api/placeholder/32/32', status: 'watching' },
    { id: '2', name: 'GreenThumb_Lisa', avatar: '/api/placeholder/32/32', status: 'typing' },
    { id: '3', name: 'ClimateAction_Tom', avatar: '/api/placeholder/32/32', status: 'watching' },
    { id: '4', name: 'SustainableSue', avatar: '/api/placeholder/32/32', status: 'reacting' }
  ])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const handleReaction = (type: string) => {
    // Add reaction logic here
    console.log(`Reacted with ${type}`)
  }

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      // Add message sending logic here
      console.log('Sending message:', chatMessage)
      setChatMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Play className="h-8 w-8 text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-purple-400">Interactive Video Player</h2>
              <p className="text-purple-300">HD/adaptive streaming with live chat and community features</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-3 space-y-4">
          {/* Main Video */}
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black">
              <img 
                src={videoData.thumbnail} 
                alt={videoData.title}
                className="w-full h-full object-cover"
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group">
                <Button
                  size="lg"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div className="mb-3">
                  <Slider
                    value={[(videoData.currentTime / videoData.duration) * 100]}
                    max={100}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-20"
                      />
                    </div>

                    <span className="text-sm">
                      {formatTime(videoData.currentTime)} / {formatTime(videoData.duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select 
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="bg-black/50 text-white border border-white/20 rounded px-2 py-1 text-sm"
                    >
                      <option value="360p">360p</option>
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                      <option value="auto">Auto</option>
                    </select>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Live Viewer Count */}
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {liveUsers.length} live
                </div>
              </div>
            </div>
          </Card>

          {/* Video Info */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">{videoData.title}</h1>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {formatNumber(videoData.views)} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      2 days ago
                    </span>
                  </div>

                  {/* Reaction Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReaction('like')}
                      className="hover:bg-blue-600/20"
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {formatNumber(videoData.likes)}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReaction('green-heart')}
                      className="hover:bg-green-600/20 text-green-400 border-green-400/30"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      {formatNumber(videoData.greenHearts)}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReaction('share')}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={videoData.channel.avatar} />
                      <AvatarFallback>{videoData.channel.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{videoData.channel.name}</h3>
                        {videoData.channel.verified && (
                          <Badge className="bg-blue-600 text-xs">✓ Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(videoData.channel.subscribers)} subscribers
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button className="bg-red-600 hover:bg-red-700">
                      Subscribe
                    </Button>
                    <Button variant="outline" className="border-green-500/30 text-green-400">
                      <Gift className="h-4 w-4 mr-2" />
                      Support Creator
                    </Button>
                  </div>
                </div>

                {/* Green Impact */}
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-400" />
                      <h4 className="font-semibold text-green-400">Environmental Impact</h4>
                    </div>
                    <Badge className="bg-green-600">
                      +{videoData.greenImpact} impact points
                    </Badge>
                  </div>
                  <p className="text-sm text-green-300 mb-2">
                    Supporting: <strong>{videoData.supportedProject}</strong>
                  </p>
                  <p className="text-xs text-green-300/80">
                    100% of proceeds from this video are donated to environmental restoration projects
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {videoData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <div className="text-sm text-muted-foreground">
                  <p>{videoData.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Live Community</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowChat(!showChat)}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {showChat && (
              <>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                  <TabsList className="grid w-full grid-cols-3 mx-4">
                    <TabsTrigger value="chat" className="text-xs">Chat</TabsTrigger>
                    <TabsTrigger value="reactions" className="text-xs">Reactions</TabsTrigger>
                    <TabsTrigger value="viewers" className="text-xs">Viewers</TabsTrigger>
                  </TabsList>

                  <TabsContent value="chat" className="flex-1 flex flex-col px-4">
                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-3 pr-2">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={msg.user.avatar} />
                                <AvatarFallback className="text-xs">
                                  {msg.user.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{msg.user.name}</span>
                              {msg.user.badge && (
                                <span className="text-xs">{msg.user.badge}</span>
                              )}
                              <span className="text-xs text-muted-foreground ml-auto">
                                {msg.timestamp}
                              </span>
                            </div>
                            <p className={`text-sm ml-8 ${
                              msg.type === 'support' ? 'text-green-400 font-medium' :
                              msg.type === 'reaction' ? 'text-purple-400 italic' : ''
                            }`}>
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="text-sm"
                          onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                        />
                        <Button size="sm" onClick={sendChatMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleReaction('heart')}>
                          ❤️
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReaction('green-heart')}>
                          💚
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReaction('tree')}>
                          🌳
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReaction('star')}>
                          ⭐
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reactions" className="px-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center p-2 bg-blue-900/20 rounded">
                          <div className="text-2xl">👍</div>
                          <div className="text-sm text-blue-400">{videoData.likes}</div>
                        </div>
                        <div className="text-center p-2 bg-green-900/20 rounded">
                          <div className="text-2xl">💚</div>
                          <div className="text-sm text-green-400">{videoData.greenHearts}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground text-center">
                        Recent reactions from the community
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="viewers" className="px-4">
                    <ScrollArea className="h-full">
                      <div className="space-y-2">
                        {liveUsers.map((user) => (
                          <div key={user.id} className="flex items-center gap-2 p-2 rounded hover:bg-muted/50">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="text-xs">
                                {user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {user.status}
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              user.status === 'watching' ? 'bg-green-400' :
                              user.status === 'typing' ? 'bg-yellow-400' : 'bg-purple-400'
                            }`} />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}