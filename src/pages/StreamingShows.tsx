
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Search,
  Clock,
  Users,
  Heart,
  Share2,
  Download,
  Star,
  Calendar,
  Music,
  Film,
  Tv,
  Radio
} from 'lucide-react'
import { toast } from 'sonner'

interface StreamingContent {
  id: string
  title: string
  category: 'documentary' | 'party' | 'event' | 'music' | 'lifestyle'
  decade: '70s' | '80s' | '90s'
  description: string
  duration: string
  rating: number
  views: number
  thumbnail: string
  featured: boolean
  addedDate: string
}

export default function StreamingShows() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [streamingContent] = useState<StreamingContent[]>([
    {
      id: '1',
      title: '🎬 The Golden Age of Detroit - Motor City Dreams',
      category: 'documentary',
      decade: '70s',
      description: 'Experience the automotive revolution and the soul of Detroit in the 1970s. Classic cars, Motown music, and the American dream.',
      duration: '1h 45m',
      rating: 4.8,
      views: 15420,
      thumbnail: '/api/placeholder/300/200',
      featured: true,
      addedDate: '2024-01-15'
    },
    {
      id: '2',
      title: '🌈 Disco Fever - Studio 54 Chronicles',
      category: 'party',
      decade: '70s',
      description: 'The legendary nightclub that defined an era. Fashion, music, and the spirit of the 70s party scene.',
      duration: '2h 12m',
      rating: 4.9,
      views: 23100,
      thumbnail: '/api/placeholder/300/200',
      featured: true,
      addedDate: '2024-01-14'
    },
    {
      id: '3',
      title: '🎸 Rock & Roll Paradise - 80s Concert Culture',
      category: 'music',
      decade: '80s',
      description: 'Live concerts from the greatest bands of the 80s. Experience the energy and passion of live rock music.',
      duration: '3h 20m',
      rating: 4.7,
      views: 18750,
      thumbnail: '/api/placeholder/300/200',
      featured: false,
      addedDate: '2024-01-13'
    },
    {
      id: '4',
      title: '🏠 Simple Living - The Art of Being Content',
      category: 'lifestyle',
      decade: '70s',
      description: 'How people lived simpler, happier lives in the 70s. Community, family values, and genuine connections.',
      duration: '1h 30m',
      rating: 4.6,
      views: 12300,
      thumbnail: '/api/placeholder/300/200',
      featured: true,
      addedDate: '2024-01-12'
    },
    {
      id: '5',
      title: '🚗 Classic Cars & Freedom - Highway Culture',
      category: 'documentary',
      decade: '80s',
      description: 'The golden age of American automobiles and the culture of freedom they represented.',
      duration: '2h 05m',
      rating: 4.8,
      views: 19800,
      thumbnail: '/api/placeholder/300/200',
      featured: false,
      addedDate: '2024-01-11'
    },
    {
      id: '6',
      title: '🎉 Block Parties & Community - Neighborhood Spirit',
      category: 'event',
      decade: '70s',
      description: 'The beautiful tradition of community gatherings and how they brought people together.',
      duration: '1h 15m',
      rating: 4.5,
      views: 9600,
      thumbnail: '/api/placeholder/300/200',
      featured: false,
      addedDate: '2024-01-10'
    }
  ])

  const categories = [
    { id: 'all', label: '🌟 All Content', count: streamingContent.length },
    { id: 'documentary', label: '🎬 Documentaries', count: streamingContent.filter(c => c.category === 'documentary').length },
    { id: 'party', label: '🎉 Party & Events', count: streamingContent.filter(c => c.category === 'party' || c.category === 'event').length },
    { id: 'music', label: '🎵 Music & Concerts', count: streamingContent.filter(c => c.category === 'music').length },
    { id: 'lifestyle', label: '🏡 Lifestyle & Culture', count: streamingContent.filter(c => c.category === 'lifestyle').length }
  ]

  const filteredContent = streamingContent.filter(content => {
    const matchesCategory = selectedCategory === 'all' || 
      content.category === selectedCategory ||
      (selectedCategory === 'party' && (content.category === 'party' || content.category === 'event'))
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePlay = (contentId: string, title: string) => {
    setIsPlaying(contentId)
    toast.success(`🎬 Now Playing: ${title}`)
  }

  const handlePause = () => {
    setIsPlaying(null)
    toast.info('⏸️ Playback Paused')
  }

  // Simulate auto-discovery of new content
  useEffect(() => {
    const interval = setInterval(() => {
      const discoveryMessages = [
        "🔍 Scanning web for new 70s documentaries...",
        "🎬 Found: 'Woodstock Memories' - Adding to collection",
        "🚗 Discovered: 'Muscle Car Dynasty' documentary",
        "🎵 New find: 'Vinyl Revolution' - The Record Store Culture",
        "🏠 Added: 'Suburban Dreams - 70s Family Life'"
      ]
      const randomMessage = discoveryMessages[Math.floor(Math.random() * discoveryMessages.length)]
      console.log(`🤖 Auto-Discovery System: ${randomMessage}`)
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-green-900/10 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <Card className="mb-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Film className="h-8 w-8 text-purple-400 animate-pulse" />
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                  🎬 GAiA Streaming Universe
                </span>
                <Tv className="h-8 w-8 text-blue-400 animate-pulse" />
              </div>
              <p className="text-lg text-muted-foreground">
                Rediscover the Golden Age • 70s & 80s Collection • Auto-Updated Daily
              </p>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Search & Discovery Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-5 w-5 text-green-400" />
                <span className="font-semibold text-green-400">Content Search</span>
              </div>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for documentaries, parties, music..."
                className="bg-black/20"
              />
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="h-5 w-5 text-cyan-400 animate-pulse" />
                <span className="font-semibold text-cyan-400">Auto-Discovery Active</span>
              </div>
              <div className="text-sm text-muted-foreground">
                🌐 Scanning web daily for new 70s/80s content
              </div>
              <Badge className="mt-2 bg-cyan-600">
                ✅ {streamingContent.length} Items Curated
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <Card className="mb-6 border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Content */}
        <Card className="mb-6 border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Star className="h-6 w-6 animate-pulse" />
              🌟 Featured This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {streamingContent.filter(content => content.featured).map((content) => (
                <Card key={content.id} className="border-red-500/20 hover:border-red-400/40 transition-all">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-lg mb-3 flex items-center justify-center">
                      <Play className="h-12 w-12 text-red-400" />
                    </div>
                    <h3 className="font-bold mb-2 text-red-400">{content.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${content.decade === '70s' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                        {content.decade}
                      </Badge>
                      <Badge variant="outline">
                        <Star className="h-3 w-3 mr-1" />
                        {content.rating}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {content.duration}
                      </span>
                      <Button 
                        size="sm"
                        onClick={() => handlePlay(content.id, content.title)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((content) => (
            <Card key={content.id} className="border-blue-500/20 hover:border-blue-400/40 transition-all hover:scale-105">
              <CardContent className="p-4">
                <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg mb-3 flex items-center justify-center relative">
                  {isPlaying === content.id ? (
                    <Button
                      onClick={handlePause}
                      className="absolute inset-0 w-full h-full bg-black/20 hover:bg-black/40"
                    >
                      <Pause className="h-12 w-12 text-white" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePlay(content.id, content.title)}
                      className="absolute inset-0 w-full h-full bg-black/20 hover:bg-black/40"
                    >
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  )}
                </div>
                
                <h3 className="font-bold mb-2 text-blue-400">{content.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className={`${content.decade === '70s' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                    {content.decade}
                  </Badge>
                  <Badge variant="outline" className="text-yellow-400">
                    {content.category.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    <Star className="h-3 w-3 mr-1" />
                    {content.rating}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {content.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {content.views.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Watch
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="border-green-500/30 bg-green-900/10">
            <CardContent className="p-4 text-center">
              <Film className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{streamingContent.length}</div>
              <div className="text-sm text-muted-foreground">Total Shows</div>
            </CardContent>
          </Card>
          <Card className="border-purple-500/30 bg-purple-900/10">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">Daily</div>
              <div className="text-sm text-muted-foreground">New Discoveries</div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/30 bg-blue-900/10">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">89K+</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/30 bg-yellow-900/10">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">4.7★</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
