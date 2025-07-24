
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, Volume2, Heart, Share2, Music, Radio, Users } from 'lucide-react'
import { useState } from 'react'

export default function ArtistStreaming() {
  const [isPlaying, setIsPlaying] = useState(false)

  const featuredArtists = [
    { id: 1, name: "EcoSoul", genre: "Nature Ambient", listeners: 1234, status: "live" },
    { id: 2, name: "Green Harmony", genre: "Environmental Pop", listeners: 856, status: "online" },
    { id: 3, name: "Planet Beats", genre: "Eco Electronic", listeners: 2103, status: "live" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🎭 Artist Streaming Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Stream eco-conscious music and support environmental artists
          </p>
        </div>

        {/* Live Now Section */}
        <Card className="mb-8 border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Radio className="h-6 w-6 animate-pulse" />
              🔴 LIVE NOW
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredArtists.filter(artist => artist.status === 'live').map((artist) => (
                <Card key={artist.id} className="border-red-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-red-400">{artist.name}</h3>
                      <Badge className="bg-red-600 animate-pulse">LIVE</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{artist.genre}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-green-400" />
                      <span className="text-sm">{artist.listeners} listening</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {isPlaying ? 'Pause' : 'Join Live'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Artists */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Music className="h-6 w-6" />
              Featured Eco Artists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredArtists.map((artist) => (
                <Card key={artist.id} className="border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold">{artist.name}</h3>
                      <Badge variant={artist.status === 'live' ? 'destructive' : 'secondary'}>
                        {artist.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{artist.genre}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-green-400" />
                      <span className="text-sm">{artist.listeners} followers</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Streaming Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-500/30 bg-green-900/10">
            <CardContent className="p-4 text-center">
              <Music className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">1,247</div>
              <div className="text-sm text-muted-foreground">Active Streams</div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/30 bg-blue-900/10">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">15,432</div>
              <div className="text-sm text-muted-foreground">Total Listeners</div>
            </CardContent>
          </Card>
          <Card className="border-purple-500/30 bg-purple-900/10">
            <CardContent className="p-4 text-center">
              <Radio className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-muted-foreground">Live Broadcasts</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/30 bg-yellow-900/10">
            <CardContent className="p-4 text-center">
              <Volume2 className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">98%</div>
              <div className="text-sm text-muted-foreground">Audio Quality</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
