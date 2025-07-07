
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  Pause, 
  Search, 
  DollarSign, 
  Users, 
  TrendingUp,
  Globe,
  Video,
  Music,
  Coins
} from 'lucide-react'
import { toast } from 'sonner'

interface Artist {
  id: string
  name: string
  genre: string
  country: string
  isLive: boolean
  viewers: number
  gaiaTokenPrice: number
  totalRaised: number
  streamUrl: string
  description: string
}

export default function LiveArtistPlatform() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [userTokens, setUserTokens] = useState(1500)
  const [currentStream, setCurrentStream] = useState<Artist | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const [liveArtists] = useState<Artist[]>([
    {
      id: '1',
      name: 'Luna Eclipse',
      genre: 'Electronic',
      country: 'Netherlands',
      isLive: true,
      viewers: 2847,
      gaiaTokenPrice: 50,
      totalRaised: 125000,
      streamUrl: 'live-stream-1',
      description: 'Ambient electronic journey for environmental awareness'
    },
    {
      id: '2', 
      name: 'Earth Rhythm Collective',
      genre: 'World Music',
      country: 'Brazil',
      isLive: true,
      viewers: 1923,
      gaiaTokenPrice: 75,
      totalRaised: 89000,
      streamUrl: 'live-stream-2',
      description: 'Traditional rhythms supporting rainforest preservation'
    },
    {
      id: '3',
      name: 'Green Symphony',
      genre: 'Classical',
      country: 'Austria',
      isLive: true,
      viewers: 856,
      gaiaTokenPrice: 100,
      totalRaised: 67000,
      streamUrl: 'live-stream-3',
      description: 'Classical compositions inspired by nature'
    }
  ])

  const genres = ['all', 'Electronic', 'World Music', 'Classical', 'Rock', 'Jazz', 'Folk', 'Hip Hop']

  const filteredArtists = liveArtists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || artist.genre === selectedGenre
    return matchesSearch && matchesGenre && artist.isLive
  })

  const watchStream = (artist: Artist) => {
    if (userTokens >= artist.gaiaTokenPrice) {
      setUserTokens(prev => prev - artist.gaiaTokenPrice)
      setCurrentStream(artist)
      setIsPlaying(true)
      
      toast.success('🎵 Stream Started!', {
        description: `Now watching ${artist.name} - ${artist.gaiaTokenPrice} GAIA tokens deducted`,
        duration: 4000
      })

      console.log('🎵 LIVE STREAM PAYMENT PROCESSED')
      console.log(`💰 GAIA TOKENS: ${artist.gaiaTokenPrice} transferred to artist`)
      console.log(`🌍 SUPPORTING: ${artist.description}`)
    } else {
      toast.error('💰 Insufficient GAIA Tokens!', {
        description: `You need ${artist.gaiaTokenPrice} GAIA tokens to watch this stream`,
        duration: 4000
      })
    }
  }

  const reinvestInCommunity = (artist: Artist, percentage: number) => {
    const reinvestAmount = Math.floor(artist.totalRaised * (percentage / 100))
    
    toast.success('🌍 Community Reinvestment!', {
      description: `${reinvestAmount} GAIA tokens reinvested in environmental projects`,
      duration: 5000
    })

    console.log('🌱 COMMUNITY REINVESTMENT ACTIVATED')
    console.log(`💚 AMOUNT: ${reinvestAmount} GAIA tokens`)
    console.log(`🎯 PURPOSE: Environmental restoration and community growth`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            🎵 GLOBAL LIVE ARTIST PLATFORM
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Watch live performances worldwide • Support artists with GAIA tokens • Community reinvestment
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="live-streams" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live-streams">🔴 Live Streams</TabsTrigger>
          <TabsTrigger value="my-player">📺 My Player</TabsTrigger>
          <TabsTrigger value="reinvestment">🌍 Reinvestment</TabsTrigger>
          <TabsTrigger value="wallet">💰 GAIA Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="live-streams" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artists, genres, or countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 rounded-md border bg-background"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Live Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <Card key={artist.id} className="border-red-500/30 bg-red-900/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-red-400">{artist.name}</CardTitle>
                    <Badge className="bg-red-600 animate-pulse">🔴 LIVE</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{artist.genre} • {artist.country}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-black/30 p-4 rounded-lg aspect-video flex items-center justify-center">
                    <Video className="h-12 w-12 text-purple-400" />
                  </div>
                  
                  <p className="text-sm">{artist.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">👥 Viewers:</div>
                      <div className="text-purple-400 font-bold">{artist.viewers.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">💰 Price:</div>
                      <div className="text-green-400 font-bold">{artist.gaiaTokenPrice} GAIA</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-muted-foreground text-sm">🌍 Total Raised:</div>
                    <div className="text-blue-400 font-bold">{artist.totalRaised.toLocaleString()} GAIA</div>
                  </div>
                  
                  <Button 
                    onClick={() => watchStream(artist)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={userTokens < artist.gaiaTokenPrice}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Watch Stream ({artist.gaiaTokenPrice} GAIA)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-player" className="space-y-6">
          {currentStream ? (
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  🎵 Now Playing: {currentStream.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black/50 p-8 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Music className="h-24 w-24 mx-auto text-purple-400 mb-4 animate-pulse" />
                    <p className="text-xl text-purple-400">{currentStream.name}</p>
                    <p className="text-muted-foreground">{currentStream.genre} • {currentStream.country}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-gray-500/30 bg-gray-900/20">
              <CardContent className="p-12 text-center">
                <Video className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400">No stream selected. Choose a live performance to watch!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reinvestment" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">🌍 Community Reinvestment Program</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Artists and community can choose how raised funds are reinvested for environmental and social impact.
              </p>
              
              {liveArtists.map((artist) => (
                <Card key={artist.id} className="border-blue-500/20 bg-blue-900/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-bold text-blue-400">{artist.name}</h4>
                        <p className="text-sm text-muted-foreground">Total Raised: {artist.totalRaised.toLocaleString()} GAIA</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Button 
                        size="sm"
                        onClick={() => reinvestInCommunity(artist, 25)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        🌱 25% Community Vault
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => reinvestInCommunity(artist, 50)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        🌊 50% Ocean Cleanup
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => reinvestInCommunity(artist, 75)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        🌍 75% Reforestation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Coins className="h-6 w-6" />
                💰 Your GAIA Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-yellow-500/10 rounded-lg">
                <div className="text-4xl font-bold text-yellow-400">{userTokens.toLocaleString()}</div>
                <div className="text-muted-foreground">GAIA Tokens Available</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Buy More GAIA
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4 mr-2" />
                  Earn Through Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
