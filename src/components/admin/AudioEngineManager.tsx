
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Upload,
  List,
  Settings,
  BarChart3,
  Radio,
  Headphones,
  Mic,
  Speaker
} from 'lucide-react'
import { toast } from 'sonner'

interface AudioTrack {
  id: string
  title: string
  artist: string
  duration: string
  file_url: string
  is_background: boolean
  plays: number
  uploaded_at: Date
}

export function AudioEngineManager() {
  const [tracks, setTracks] = useState<AudioTrack[]>([])
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    // Sample tracks data
    const sampleTracks: AudioTrack[] = [
      {
        id: '1',
        title: 'GAIA Nature Sounds',
        artist: 'Environmental Audio',
        duration: '3:45',
        file_url: '/audio/nature.mp3',
        is_background: true,
        plays: 1247,
        uploaded_at: new Date(Date.now() - 86400000)
      },
      {
        id: '2',
        title: 'Cosmic Vibrations',
        artist: 'GAIA Studios',
        duration: '4:20',
        file_url: '/audio/cosmic.mp3',
        is_background: false,
        plays: 856,
        uploaded_at: new Date(Date.now() - 172800000)
      }
    ]
    setTracks(sampleTracks)
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadProgress(0)
      
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval)
            toast.success('🎵 Audio track uploaded successfully!')
            
            // Add new track to list
            const newTrack: AudioTrack = {
              id: Date.now().toString(),
              title: file.name.replace(/\.[^/.]+$/, ""),
              artist: 'Admin Upload',
              duration: '0:00',
              file_url: URL.createObjectURL(file),
              is_background: false,
              plays: 0,
              uploaded_at: new Date()
            }
            setTracks(prev => [newTrack, ...prev])
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    toast.success(`🎵 Now playing: ${track.title}`)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const setAsBackground = (track: AudioTrack) => {
    setTracks(prev => prev.map(t => ({
      ...t,
      is_background: t.id === track.id
    })))
    toast.success(`🎵 ${track.title} set as background music`)
  }

  return (
    <div className="space-y-6">
      {/* Audio Engine Header */}
      <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-pink-900/40">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            🎵 AUDIO ENGINE MANAGER
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-purple-300">
              Music Upload • Background Audio • Live Streaming • Admin Control
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-purple-600 animate-pulse">AUDIO ACTIVE</Badge>
              <Badge className="bg-pink-600 animate-pulse">STREAMING READY</Badge>
              <Badge className="bg-blue-600 animate-pulse">ADMIN CONTROL</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Music Player Controls */}
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Music className="h-6 w-6" />
            🎛️ Music Player Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentTrack && (
            <div className="p-4 bg-black/30 rounded-lg border border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-white">{currentTrack.title}</h4>
                  <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
                </div>
                <Badge className="bg-blue-600">
                  {currentTrack.plays} plays
                </Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <Button size="sm" variant="outline">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button onClick={togglePlayPause} className="bg-blue-600 hover:bg-blue-700">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline">
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-2 flex-1">
                  {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm w-8">{volume}</span>
                </div>
              </div>
            </div>
          )}
          
          {!currentTrack && (
            <div className="text-center py-8 text-muted-foreground">
              <Music className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <p>No track selected. Choose a track to play.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Upload className="h-6 w-6" />
            🎵 Upload Music Tracks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-green-500/30 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 mx-auto text-green-400 mb-4" />
            <label htmlFor="audio-upload" className="cursor-pointer">
              <span className="text-lg font-medium text-green-400">Click to upload audio files</span>
              <p className="text-sm text-muted-foreground mt-2">
                Supports MP3, WAV, FLAC formats • Max 50MB per file
              </p>
            </label>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Track Library */}
      <Card className="border-yellow-500/30 bg-yellow-900/20">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <List className="h-6 w-6" />
            🎵 Music Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tracks.map((track) => (
              <div key={track.id} className="flex items-center justify-between p-3 bg-black/30 rounded border border-yellow-500/20">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => playTrack(track)}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <div>
                    <div className="font-medium text-white">{track.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {track.artist} • {track.duration} • {track.plays} plays
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {track.is_background && (
                    <Badge className="bg-green-600">Background</Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAsBackground(track)}
                  >
                    Set as Background
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audio Stats */}
      <Card className="border-cyan-500/30 bg-cyan-900/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-purple-900/30 rounded-lg">
              <Radio className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{tracks.length}</div>
              <div className="text-xs text-muted-foreground">Total Tracks</div>
            </div>
            <div className="p-3 bg-blue-900/30 rounded-lg">
              <Headphones className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {tracks.reduce((sum, track) => sum + track.plays, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Plays</div>
            </div>
            <div className="p-3 bg-green-900/30 rounded-lg">
              <Mic className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">LIVE</div>
              <div className="text-xs text-muted-foreground">Streaming Status</div>
            </div>
            <div className="p-3 bg-yellow-900/30 rounded-lg">
              <Speaker className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{volume}%</div>
              <div className="text-xs text-muted-foreground">System Volume</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
