
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Play, Pause, Volume2, Users, Eye, Heart, Share2, MessageCircle, Star } from 'lucide-react'

export const ArtistStreamingPlatform = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState('')

  const liveStreams = [
    {
      id: 'eco-music-live',
      title: 'Eco Music Live Session',
      artist: 'GreenBeats',
      viewers: 1234,
      category: 'Music',
      thumbnail: '/placeholder-music.jpg',
      isLive: true,
      tags: ['Environmental', 'Acoustic', 'Live']
    },
    {
      id: 'nature-sounds',
      title: 'Rainforest Sounds for Meditation',
      artist: 'NatureSounds',
      viewers: 567,
      category: 'Ambient',
      thumbnail: '/placeholder-forest.jpg',
      isLive: true,
      tags: ['Meditation', 'Nature', 'Relaxation']
    },
    {
      id: 'ocean-waves',
      title: 'Ocean Waves & Whale Songs',
      artist: 'OceanVibes',
      viewers: 890,
      category: 'Nature',
      thumbnail: '/placeholder-ocean.jpg',
      isLive: true,
      tags: ['Ocean', 'Whales', 'Peaceful']
    }
  ]

  const featuredChannels = [
    {
      id: 'harmony-gaia',
      name: 'Harmony of Gaia',
      subscribers: 45267,
      description: 'Environmental music and nature sounds',
      avatar: '/placeholder-channel.jpg',
      verified: true
    },
    {
      id: 'eco-artists',
      name: 'Eco Artists Collective',
      subscribers: 23456,
      description: 'Supporting environmental artists worldwide',
      avatar: '/placeholder-eco.jpg',
      verified: true
    },
    {
      id: 'nature-symphony',
      name: 'Nature Symphony',
      subscribers: 12345,
      description: 'Natural soundscapes and environmental awareness',
      avatar: '/placeholder-nature.jpg',
      verified: false
    }
  ]

  const handlePlayPause = (streamId: string) => {
    setCurrentlyPlaying(currentlyPlaying === streamId ? null : streamId)
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle sending chat message
      setChatMessage('')
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Platform Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎵 Artist Streaming Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover and support environmental artists and creators
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Streams */}
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                Live Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveStreams.map((stream) => (
                  <Card key={stream.id} className="bg-purple-900/10 border-purple-500/20">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <div className="w-32 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                          {stream.isLive && (
                            <Badge className="absolute -top-2 -right-2 bg-red-600 text-white">
                              LIVE
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-semibold text-purple-400">{stream.title}</h3>
                            <p className="text-sm text-muted-foreground">{stream.artist}</p>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {stream.viewers} viewers
                            </div>
                            <Badge variant="outline">{stream.category}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {stream.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => handlePlayPause(stream.id)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            {currentlyPlaying === stream.id ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Heart className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Channels */}
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Star className="h-5 w-5" />
                Featured Channels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredChannels.map((channel) => (
                  <div key={channel.id} className="flex items-center gap-4 p-4 bg-purple-900/10 rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={channel.avatar} />
                      <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-purple-400">{channel.name}</h3>
                        {channel.verified && (
                          <Badge className="bg-blue-600 text-white">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{channel.description}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Users className="h-3 w-3" />
                        {channel.subscribers.toLocaleString()} subscribers
                      </div>
                    </div>
                    
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Subscribe
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Chat */}
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <MessageCircle className="h-5 w-5" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 bg-gray-900/20 rounded-lg p-3 overflow-y-auto">
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="font-semibold text-green-400">EcoFan123:</span>
                      <span className="text-muted-foreground">Love this music! 🌱</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold text-blue-400">NatureLover:</span>
                      <span className="text-muted-foreground">So peaceful and inspiring</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold text-purple-400">GreenHeart:</span>
                      <span className="text-muted-foreground">Thanks for supporting the environment!</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Controls */}
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Volume2 className="h-5 w-5" />
                Audio Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button size="sm" variant="outline">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-semibold text-purple-400">Now Playing</p>
                  <p className="text-xs text-muted-foreground">Eco Music Live Session</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
