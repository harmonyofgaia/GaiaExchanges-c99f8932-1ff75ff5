
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Shuffle, Repeat, Music, Headphones } from 'lucide-react'
import { useState } from 'react'

export default function MusicPlatform() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [progress, setProgress] = useState([32])

  const playlists = [
    { id: 1, name: "Eco Chill", songs: 24, duration: "1h 45m", category: "ambient" },
    { id: 2, name: "Green Beats", songs: 18, duration: "58m", category: "electronic" },
    { id: 3, name: "Nature Sounds", songs: 32, duration: "2h 15m", category: "nature" }
  ]

  const currentTrack = {
    title: "Forest Meditation",
    artist: "EcoSoul",
    album: "Natural Harmony",
    duration: "4:32"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-green-900/10 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            🎵 Music Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover and stream eco-conscious music
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player */}
          <div className="lg:col-span-2">
            <Card className="border-purple-500/30 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Music className="h-6 w-6" />
                  Now Playing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <Music className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{currentTrack.title}</h3>
                    <p className="text-muted-foreground">{currentTrack.artist}</p>
                    <p className="text-sm text-muted-foreground">{currentTrack.album}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-6">
                  <Slider
                    value={progress}
                    onValueChange={setProgress}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1:28</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button variant="ghost" size="sm">
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Repeat className="h-4 w-4" />
                  </Button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Tracks */}
            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Headphones className="h-6 w-6" />
                  Featured Eco Tracks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded flex items-center justify-center">
                          <Music className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Ocean Waves {i + 1}</p>
                          <p className="text-sm text-muted-foreground">Nature Sounds</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">3:45</span>
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Playlists */}
          <div>
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Music className="h-6 w-6" />
                  Your Playlists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {playlists.map((playlist) => (
                    <Card key={playlist.id} className="border-gray-700 cursor-pointer hover:border-green-500/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{playlist.name}</h4>
                          <Badge variant="outline">{playlist.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {playlist.songs} songs • {playlist.duration}
                        </p>
                        <Button size="sm" className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Play
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-yellow-500/30 mt-6">
              <CardHeader>
                <CardTitle className="text-yellow-400">Listening Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Hours Listened</span>
                  <span className="font-bold">247h</span>
                </div>
                <div className="flex justify-between">
                  <span>Favorite Genre</span>
                  <span className="font-bold">Ambient</span>
                </div>
                <div className="flex justify-between">
                  <span>Playlists Created</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Tokens Earned</span>
                  <span className="font-bold text-green-400">1,234 GAIA</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
