
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { VideoStreamingPlatform } from '@/components/VideoStreamingPlatform'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { AdminReverseButton } from '@/components/admin/AdminReverseButton'
import { 
  Music, 
  Upload, 
  Play, 
  Users, 
  DollarSign,
  Video,
  Mic,
  Radio,
  Award,
  Star
} from 'lucide-react'
import { toast } from 'sonner'

export default function ArtistStreaming() {
  const { isAdmin } = useSecureAdmin()
  const [artists, setArtists] = useState([
    {
      id: '1',
      name: 'EcoBeats Producer',
      genre: 'Environmental Ambient',
      followers: 2847,
      monthlyListeners: 12500,
      earnings: 847.32,
      isLive: true,
      avatar: '/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png'
    },
    {
      id: '2', 
      name: 'Gaia Harmony',
      genre: 'Nature Sounds & Meditation',
      followers: 1923,
      monthlyListeners: 8200,
      earnings: 623.18,
      isLive: false,
      avatar: '/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png'
    }
  ])

  const [uploads, setUploads] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(1470.50)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Admin Reverse Button */}
      <AdminReverseButton />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🎵 GAIA ARTIST STREAMING PLATFORM
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Create, Upload, Stream & Earn GAIA Tokens with Environmental Music
        </p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-green-400">{artists.length}</p>
                <p className="text-xs text-muted-foreground">Active Artists</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Music className="h-4 w-4 mr-2 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-blue-400">{uploads}</p>
                <p className="text-xs text-muted-foreground">Total Uploads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-purple-400">{totalEarnings}</p>
                <p className="text-xs text-muted-foreground">GAIA Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Radio className="h-4 w-4 mr-2 text-orange-400" />
              <div>
                <p className="text-2xl font-bold text-orange-400">
                  {artists.filter(a => a.isLive).length}
                </p>
                <p className="text-xs text-muted-foreground">Live Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Artist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {artists.map((artist) => (
          <Card key={artist.id} className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 border-gray-500/30 hover:border-green-500/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <img 
                  src={artist.avatar} 
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg text-white">{artist.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{artist.genre}</p>
                </div>
                {artist.isLive && (
                  <Badge className="bg-red-600 text-white animate-pulse">
                    🔴 LIVE
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Followers:</span>
                <span className="text-blue-400 font-semibold">{artist.followers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Listeners:</span>
                <span className="text-green-400 font-semibold">{artist.monthlyListeners.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GAIA Earned:</span>
                <span className="text-purple-400 font-semibold">{artist.earnings} GAIA</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 mr-2" />
                Listen Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Streaming Platform Integration */}
      <VideoStreamingPlatform />

      {/* Upload Section for Artists */}
      {isAdmin && (
        <Card className="mt-8 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <Upload className="h-5 w-5" />
              🎵 Artist Upload Center (Admin Only)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-yellow-400">Track Title</label>
                <Input placeholder="Enter track title..." className="bg-black/20" />
              </div>
              <div>
                <label className="text-sm font-semibold text-yellow-400">Artist Name</label>
                <Input placeholder="Enter artist name..." className="bg-black/20" />
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Audio
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Video className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
