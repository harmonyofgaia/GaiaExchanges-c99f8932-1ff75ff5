
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Play, 
  Pause, 
  Music, 
  Users, 
  Calendar,
  MapPin,
  Search,
  Heart,
  Share2,
  Volume2
} from 'lucide-react'

interface LiveShow {
  id: string
  artist: string
  venue: string
  date: string
  time: string
  genre: string
  viewers: number
  isLive: boolean
  thumbnail: string
  description: string
}

const ArtistStreaming = () => {
  const [liveShows] = useState<LiveShow[]>([
    {
      id: '1',
      artist: 'Queen',
      venue: 'Wembley Stadium 1986',
      date: '1986-07-12',
      time: '20:00',
      genre: 'Rock',
      viewers: 45230,
      isLive: true,
      thumbnail: '/api/placeholder/400/300',
      description: 'Historic performance at Wembley Stadium'
    },
    {
      id: '2',
      artist: 'Michael Jackson',
      venue: 'Motown 25th Anniversary',
      date: '1983-03-25',
      time: '21:00',
      genre: 'Pop',
      viewers: 38750,
      isLive: true,
      thumbnail: '/api/placeholder/400/300',
      description: 'Legendary moonwalk debut performance'
    },
    {
      id: '3',
      artist: 'Bob Dylan',
      venue: 'Newport Folk Festival 1965',
      date: '1965-07-25',
      time: '19:30',
      genre: 'Folk',
      viewers: 22100,
      isLive: false,
      thumbnail: '/api/placeholder/400/300',
      description: 'The controversial electric performance'
    },
    {
      id: '4',
      artist: 'The Beatles',
      venue: 'Shea Stadium 1965',
      date: '1965-08-15',
      time: '20:30',
      genre: 'Rock',
      viewers: 55890,
      isLive: true,
      thumbnail: '/api/placeholder/400/300',
      description: 'Groundbreaking stadium concert'
    },
    {
      id: '5',
      artist: 'Jimi Hendrix',
      venue: 'Woodstock 1969',
      date: '1969-08-18',
      time: '09:00',
      genre: 'Rock',
      viewers: 41200,
      isLive: false,
      thumbnail: '/api/placeholder/400/300',
      description: 'Iconic Star-Spangled Banner performance'
    },
    {
      id: '6',
      artist: 'Pink Floyd',
      venue: 'Live at Pompeii 1972',
      date: '1972-10-04',
      time: '18:00',
      genre: 'Progressive Rock',
      viewers: 33400,
      isLive: true,
      thumbnail: '/api/placeholder/400/300',
      description: 'Surreal performance in ancient amphitheater'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  const genres = ['all', 'Rock', 'Pop', 'Folk', 'Progressive Rock']

  const filteredShows = liveShows.filter(show => {
    const matchesSearch = show.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         show.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || show.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
          🎵 LIVE ARTIST STREAMING - HISTORIC PERFORMANCES
        </h1>
        <p className="text-center text-muted-foreground text-lg">
          Experience legendary performances from music history in real-time
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artists or venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 bg-background border border-input rounded-md"
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre === 'all' ? 'All Genres' : genre}
            </option>
          ))}
        </select>
      </div>

      {/* Live Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShows.map((show) => (
          <Card key={show.id} className="border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-t-lg flex items-center justify-center">
                <Music className="h-16 w-16 text-purple-400" />
              </div>
              {show.isLive && (
                <Badge className="absolute top-2 left-2 bg-red-600 text-white animate-pulse">
                  🔴 LIVE
                </Badge>
              )}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                <Users className="h-3 w-3 text-white" />
                <span className="text-white text-xs">{show.viewers.toLocaleString()}</span>
              </div>
            </div>
            
            <CardContent className="pt-4">
              <h3 className="font-bold text-lg text-purple-400 mb-2">{show.artist}</h3>
              <p className="text-sm text-muted-foreground mb-2">{show.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{show.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(show.date).toLocaleDateString()} at {show.time}</span>
                </div>
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                  {show.genre}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  size="sm"
                >
                  {show.isLive ? (
                    <>
                      <Volume2 className="h-4 w-4 mr-2" />
                      Watch Live
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Watch Recording
                    </>
                  )}
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

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-purple-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {liveShows.filter(s => s.isLive).length}
            </div>
            <div className="text-sm text-muted-foreground">Live Shows</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {liveShows.reduce((sum, show) => sum + show.viewers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Viewers</div>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {new Set(liveShows.map(s => s.genre)).size}
            </div>
            <div className="text-sm text-muted-foreground">Genres</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">24/7</div>
            <div className="text-sm text-muted-foreground">Streaming</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ArtistStreaming
