import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, Settings, Edit3, Heart, Play, Eye, MessageCircle, 
  Share2, BarChart3, Calendar, Globe, Star, Leaf 
} from 'lucide-react'

interface Channel {
  id: string
  username: string
  displayName: string
  avatar: string
  banner: string
  description: string
  subscribers: number
  totalViews: number
  totalVideos: number
  joinDate: string
  socialLinks: {
    twitter?: string
    instagram?: string
    website?: string
  }
  greenImpactScore: number
  badges: string[]
}

interface ChannelVideo {
  id: string
  title: string
  thumbnail: string
  views: number
  likes: number
  duration: string
  uploadDate: string
  visibility: 'public' | 'unlisted' | 'private'
  greenImpact: number
}

export function VideoPersonalChannels() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  
  const [sampleChannels] = useState<Channel[]>([
    {
      id: '1',
      username: 'eco_warrior_sarah',
      displayName: 'Sarah\'s Little Heaven',
      avatar: '/api/placeholder/64/64',
      banner: '/api/placeholder/800/200',
      description: 'Dedicated to sharing sustainable living tips and beautiful nature content. Every view helps plant trees! 🌱',
      subscribers: 15420,
      totalViews: 234567,
      totalVideos: 127,
      joinDate: '2023-01-15',
      socialLinks: {
        twitter: '@eco_sarah',
        instagram: '@sustainable_sarah',
        website: 'https://sarahsgreenliving.com'
      },
      greenImpactScore: 8750,
      badges: ['🌱 Eco Champion', '💚 Green Heart', '🏆 Top Creator', '⭐ Verified']
    },
    {
      id: '2',
      username: 'ocean_guardian_mike',
      displayName: 'Ocean Conservation Hub',
      avatar: '/api/placeholder/64/64',
      banner: '/api/placeholder/800/200',
      description: 'Marine biologist sharing underwater adventures and conservation efforts. Protecting our oceans one video at a time! 🌊',
      subscribers: 28934,
      totalViews: 567890,
      totalVideos: 89,
      joinDate: '2022-08-22',
      socialLinks: {
        twitter: '@ocean_mike',
        website: 'https://oceanconservation.org'
      },
      greenImpactScore: 12340,
      badges: ['🌊 Ocean Protector', '🐋 Marine Expert', '🏆 Top Creator', '⭐ Verified']
    }
  ])

  const [sampleVideos] = useState<ChannelVideo[]>([
    {
      id: '1',
      title: '10 Simple Ways to Reduce Plastic Waste',
      thumbnail: '/api/placeholder/320/180',
      views: 45678,
      likes: 3421,
      duration: '12:34',
      uploadDate: '2024-01-15',
      visibility: 'public',
      greenImpact: 850
    },
    {
      id: '2',
      title: 'My Zero-Waste Kitchen Tour',
      thumbnail: '/api/placeholder/320/180',
      views: 23456,
      likes: 1890,
      duration: '8:45',
      uploadDate: '2024-01-10',
      visibility: 'public',
      greenImpact: 620
    },
    {
      id: '3',
      title: 'DIY Eco-Friendly Cleaning Products',
      thumbnail: '/api/placeholder/320/180',
      views: 12345,
      likes: 876,
      duration: '15:22',
      uploadDate: '2024-01-05',
      visibility: 'unlisted',
      greenImpact: 430
    }
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-green-400" />
            <div>
              <h2 className="text-2xl font-bold text-green-400">Personal Channels - "Little Heaven"</h2>
              <p className="text-green-300">Customizable channel pages with environmental impact tracking</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleChannels.map((channel) => (
                <Card 
                  key={channel.id} 
                  className={`cursor-pointer transition-all hover:border-green-500/50 ${
                    selectedChannel?.id === channel.id ? 'border-green-500/70 bg-green-900/10' : ''
                  }`}
                  onClick={() => setSelectedChannel(channel)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={channel.avatar} />
                        <AvatarFallback>{channel.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{channel.displayName}</h4>
                        <p className="text-sm text-muted-foreground">@{channel.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {channel.subscribers.toLocaleString()} subs
                          </Badge>
                          <Badge variant="outline" className="text-xs text-green-400">
                            <Leaf className="h-3 w-3 mr-1" />
                            {channel.greenImpactScore}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Create New Channel
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Channel Details */}
        <div className="lg:col-span-2">
          {selectedChannel ? (
            <div className="space-y-6">
              {/* Channel Banner & Info */}
              <Card>
                <div 
                  className="h-48 bg-cover bg-center rounded-t-lg relative"
                  style={{ backgroundImage: `url(${selectedChannel.banner})` }}
                >
                  <div className="absolute inset-0 bg-black/50 rounded-t-lg" />
                  <div className="absolute top-4 right-4">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={selectedChannel.avatar} />
                      <AvatarFallback className="text-2xl">
                        {selectedChannel.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-3">
                          <Input 
                            defaultValue={selectedChannel.displayName}
                            placeholder="Channel display name"
                          />
                          <Textarea 
                            defaultValue={selectedChannel.description}
                            placeholder="Channel description"
                            rows={3}
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold">{selectedChannel.displayName}</h3>
                            {selectedChannel.badges.map((badge, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-muted-foreground mb-4">{selectedChannel.description}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">
                            {selectedChannel.subscribers.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Subscribers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            {selectedChannel.totalViews.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Total Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-400">
                            {selectedChannel.totalVideos}
                          </div>
                          <div className="text-xs text-muted-foreground">Videos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {selectedChannel.greenImpactScore.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Green Impact</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Channel Content Tabs */}
              <Tabs defaultValue="videos" className="w-full">
                <TabsList>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="playlists">Playlists</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="social">Social Links</TabsTrigger>
                </TabsList>

                <TabsContent value="videos" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleVideos.map((video) => (
                      <Card key={video.id} className="hover:border-green-500/50 transition-colors">
                        <div className="relative">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          <Badge 
                            className={`absolute top-2 left-2 text-xs ${
                              video.visibility === 'public' ? 'bg-green-600' :
                              video.visibility === 'unlisted' ? 'bg-orange-600' : 'bg-red-600'
                            }`}
                          >
                            {video.visibility}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 line-clamp-2">{video.title}</h4>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {video.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {video.likes.toLocaleString()}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs text-green-400">
                              <Leaf className="h-3 w-3 mr-1" />
                              +{video.greenImpact}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">{video.uploadDate}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="playlists">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Create Your First Playlist</h3>
                      <p className="text-muted-foreground mb-4">
                        Organize your videos into themed collections for better discovery
                      </p>
                      <Button>
                        <Calendar className="h-4 w-4 mr-2" />
                        Create Playlist
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Channel Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-blue-500/30">
                          <CardContent className="p-4 text-center">
                            <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-blue-400">47.2K</div>
                            <div className="text-xs text-muted-foreground">Views (30 days)</div>
                            <div className="text-xs text-green-400 mt-1">↗ +23%</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-purple-500/30">
                          <CardContent className="p-4 text-center">
                            <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-purple-400">1.2K</div>
                            <div className="text-xs text-muted-foreground">New Subscribers</div>
                            <div className="text-xs text-green-400 mt-1">↗ +18%</div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-green-500/30">
                          <CardContent className="p-4 text-center">
                            <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-green-400">2,847</div>
                            <div className="text-xs text-muted-foreground">Green Impact Points</div>
                            <div className="text-xs text-green-400 mt-1">↗ +31%</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="social">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="h-5 w-5" />
                        Social Links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <Input 
                            placeholder="Twitter @username"
                            defaultValue={selectedChannel.socialLinks.twitter}
                          />
                          <Input 
                            placeholder="Instagram @username"
                            defaultValue={selectedChannel.socialLinks.instagram}
                          />
                          <Input 
                            placeholder="Website URL"
                            defaultValue={selectedChannel.socialLinks.website}
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedChannel.socialLinks.twitter && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">Twitter</Badge>
                              <span className="text-blue-400">{selectedChannel.socialLinks.twitter}</span>
                            </div>
                          )}
                          {selectedChannel.socialLinks.instagram && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">Instagram</Badge>
                              <span className="text-pink-400">{selectedChannel.socialLinks.instagram}</span>
                            </div>
                          )}
                          {selectedChannel.socialLinks.website && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">Website</Badge>
                              <span className="text-blue-400">{selectedChannel.socialLinks.website}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a Channel</h3>
                <p className="text-muted-foreground">
                  Choose a channel from the list to view and manage its content
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}