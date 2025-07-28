
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Star, 
  Clock,
  Eye,
  Heart,
  Play,
  Music,
  Video,
  Sparkles,
  Tag
} from 'lucide-react'
import { toast } from 'sonner'

interface SearchResult {
  id: string
  type: 'video' | 'music' | 'channel' | 'playlist'
  title: string
  creator: string
  thumbnail: string
  views: number
  likes: number
  duration: string
  category: string
  tags: string[]
  uploadDate: Date
  relevanceScore: number
}

interface TrendingTopic {
  id: string
  name: string
  count: number
  growth: number
  category: string
}

export function VideoSearchDiscovery() {
  const [activeTab, setActiveTab] = useState<'search' | 'trending' | 'discover' | 'filters'>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'video' | 'music' | 'channel'>('all')
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular' | 'duration'>('relevance')

  const [trendingTopics] = useState<TrendingTopic[]>([
    { id: '1', name: 'Solar Energy', count: 234, growth: 15, category: 'Technology' },
    { id: '2', name: 'Sustainable Living', count: 189, growth: 22, category: 'Lifestyle' },
    { id: '3', name: 'Climate Action', count: 156, growth: 18, category: 'Environment' },
    { id: '4', name: 'Renewable Resources', count: 143, growth: 12, category: 'Education' },
    { id: '5', name: 'Green Technology', count: 128, growth: 25, category: 'Innovation' }
  ])

  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      type: 'video',
      title: '10 Ways to Reduce Your Carbon Footprint Today',
      creator: 'EcoWarriorSarah',
      thumbnail: '/api/placeholder/320/180',
      views: 15420,
      likes: 892,
      duration: '8:45',
      category: 'Education',
      tags: ['carbon', 'sustainability', 'tips'],
      uploadDate: new Date(Date.now() - 86400000),
      relevanceScore: 0.95
    },
    {
      id: '2',
      type: 'music',
      title: 'Forest Sounds & Nature Meditation',
      creator: 'NatureSoundsMaster',
      thumbnail: '/api/placeholder/320/180',
      views: 8934,
      likes: 567,
      duration: '15:30',
      category: 'Meditation',
      tags: ['nature', 'meditation', 'relaxation'],
      uploadDate: new Date(Date.now() - 172800000),
      relevanceScore: 0.87
    },
    {
      id: '3',
      type: 'video',
      title: 'Building Solar Panels: Complete DIY Guide',
      creator: 'GreenTechMike',
      thumbnail: '/api/placeholder/320/180',
      views: 12678,
      likes: 743,
      duration: '22:15',
      category: 'Technology',
      tags: ['solar', 'diy', 'renewable'],
      uploadDate: new Date(Date.now() - 259200000),
      relevanceScore: 0.91
    }
  ]

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        // Simulate search API call
        const filtered = mockSearchResults.filter(result => 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        setSearchResults(filtered)
        setIsSearching(false)
        
        if (filtered.length > 0) {
          toast.success(`Found ${filtered.length} results for "${searchQuery}"`)
        }
      }, 500)
      
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'music': return <Music className="h-4 w-4" />
      default: return <Play className="h-4 w-4" />
    }
  }

  const sortedResults = [...searchResults].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.uploadDate.getTime() - a.uploadDate.getTime()
      case 'popular':
        return b.views - a.views
      case 'duration':
        return a.duration.localeCompare(b.duration)
      default:
        return b.relevanceScore - a.relevanceScore
    }
  })

  const filteredResults = selectedCategory === 'all' 
    ? sortedResults 
    : sortedResults.filter(result => result.type === selectedCategory)

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-400" />
            Enhanced Search & Discovery
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Smart AI</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Advanced search and content discovery with AI-powered recommendations
          </p>
        </CardHeader>
      </Card>

      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'search' ? 'default' : 'outline'}
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
        <Button
          variant={activeTab === 'trending' ? 'default' : 'outline'}
          onClick={() => setActiveTab('trending')}
          className="flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Trending
        </Button>
        <Button
          variant={activeTab === 'discover' ? 'default' : 'outline'}
          onClick={() => setActiveTab('discover')}
          className="flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Discover
        </Button>
        <Button
          variant={activeTab === 'filters' ? 'default' : 'outline'}
          onClick={() => setActiveTab('filters')}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      {activeTab === 'search' && (
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos, music, channels, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="channel">Channels</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isSearching && (
            <div className="text-center py-8">
              <Search className="h-8 w-8 animate-pulse text-blue-400 mx-auto mb-2" />
              <p className="text-muted-foreground">Searching content...</p>
            </div>
          )}

          {filteredResults.length > 0 && (
            <div className="grid gap-4">
              {filteredResults.map((result) => (
                <Card key={result.id} className="border-purple-500/30 hover:border-purple-400 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-40 h-24 bg-muted rounded-lg flex items-center justify-center">
                        {getTypeIcon(result.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {result.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {result.category}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {(result.relevanceScore * 100).toFixed(0)}% match
                          </div>
                        </div>
                        
                        <h3 className="font-semibold mb-1">{result.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {result.creator}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {result.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {result.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {result.likes.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {result.duration}
                          </div>
                          <span>{result.uploadDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Button className="self-start">
                        <Play className="h-4 w-4 mr-1" />
                        {result.type === 'music' ? 'Listen' : 'Watch'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {searchQuery.length > 2 && filteredResults.length === 0 && !isSearching && (
            <div className="text-center py-8">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              <p className="text-sm text-muted-foreground mt-1">Try different keywords or check trending topics</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'trending' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTopics.map((topic, index) => (
              <Card key={topic.id} className="border-green-500/30 hover:border-green-400 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-400">
                        #{index + 1}
                      </Badge>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      +{topic.growth}%
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-1">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{topic.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {topic.count.toLocaleString()} posts this week
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'discover' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockSearchResults.map((item) => (
                  <div key={item.id} className="p-4 bg-muted rounded-lg">
                    <div className="aspect-video bg-background rounded-lg flex items-center justify-center mb-3">
                      {getTypeIcon(item.type)}
                    </div>
                    <h4 className="font-medium mb-1 line-clamp-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.creator}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {item.views.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Based on Your Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['Renewable Energy', 'Sustainability', 'Climate Action', 'Green Technology', 'Conservation'].map((interest) => (
                  <Badge key={interest} variant="outline" className="cursor-pointer hover:bg-primary/10">
                    <Tag className="h-3 w-3 mr-1" />
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'filters' && (
        <Card>
          <CardHeader>
            <CardTitle>Advanced Search Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3">Content Type</h4>
                <div className="space-y-2">
                  {['Videos', 'Music', 'Live Streams', 'Channels'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Duration</h4>
                <div className="space-y-2">
                  {['Under 5 minutes', '5-20 minutes', '20+ minutes', 'Any duration'].map((duration) => (
                    <label key={duration} className="flex items-center space-x-2">
                      <input type="radio" name="duration" className="rounded" />
                      <span className="text-sm">{duration}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Upload Date</h4>
                <div className="space-y-2">
                  {['Last hour', 'Today', 'This week', 'This month', 'This year'].map((date) => (
                    <label key={date} className="flex items-center space-x-2">
                      <input type="radio" name="date" className="rounded" />
                      <span className="text-sm">{date}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
