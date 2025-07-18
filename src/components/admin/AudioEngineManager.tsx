
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Music, 
  Upload, 
  Play, 
  Pause, 
  Volume2, 
  Settings,
  Headphones,
  Radio,
  Mic,
  Speaker,
  Equalizer,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface AudioTrack {
  id: string
  name: string
  duration: number
  file_size: number
  format: string
  upload_date: Date
  is_background: boolean
  is_active: boolean
  url: string
  category: string
}

export function AudioEngineManager() {
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([])
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState(true)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  useEffect(() => {
    loadAudioTracks()
  }, [])

  const loadAudioTracks = () => {
    // Load existing tracks from localStorage or simulate
    const savedTracks = localStorage.getItem('adminAudioTracks')
    if (savedTracks) {
      try {
        setAudioTracks(JSON.parse(savedTracks))
      } catch (error) {
        console.error('Error loading tracks:', error)
      }
    }

    // Add some default tracks for demonstration
    const defaultTracks: AudioTrack[] = [
      {
        id: '1',
        name: 'Harmony of Gaia Theme',
        duration: 240,
        file_size: 5600000,
        format: 'mp3',
        upload_date: new Date(),
        is_background: true,
        is_active: true,
        url: '/audio/gaia-theme.mp3',
        category: 'ambient'
      },
      {
        id: '2',
        name: 'Peaceful Nature Sounds',
        duration: 180,
        file_size: 4200000,
        format: 'wav',
        upload_date: new Date(Date.now() - 86400000),
        is_background: false,
        is_active: false,
        url: '/audio/nature-sounds.wav',
        category: 'nature'
      }
    ]

    if (!savedTracks) {
      setAudioTracks(defaultTracks)
      localStorage.setItem('adminAudioTracks', JSON.stringify(defaultTracks))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file)
        toast.success(`Audio file selected: ${file.name}`)
      } else {
        toast.error('Please select a valid audio file')
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an audio file')
      return
    }

    setUploading(true)
    
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newTrack: AudioTrack = {
        id: Date.now().toString(),
        name: selectedFile.name.replace(/\.[^/.]+$/, ""),
        duration: 0, // Would be determined by actual audio file
        file_size: selectedFile.size,
        format: selectedFile.type.split('/')[1],
        upload_date: new Date(),
        is_background: false,
        is_active: false,
        url: URL.createObjectURL(selectedFile),
        category: 'uploaded'
      }

      const updatedTracks = [...audioTracks, newTrack]
      setAudioTracks(updatedTracks)
      localStorage.setItem('adminAudioTracks', JSON.stringify(updatedTracks))
      
      setSelectedFile(null)
      toast.success('🎵 Audio track uploaded successfully!')
      
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const setAsBackgroundMusic = (trackId: string) => {
    const updatedTracks = audioTracks.map(track => ({
      ...track,
      is_background: track.id === trackId,
      is_active: track.id === trackId
    }))
    
    setAudioTracks(updatedTracks)
    localStorage.setItem('adminAudioTracks', JSON.stringify(updatedTracks))
    
    const selectedTrack = updatedTracks.find(track => track.id === trackId)
    if (selectedTrack) {
      // Update background music system
      localStorage.setItem('activeBackgroundMedia', trackId)
      localStorage.setItem('activeBackgroundMediaData', JSON.stringify(selectedTrack))
      
      // Create playlist
      const playlist = updatedTracks.filter(track => track.category !== 'uploaded' || track.is_active)
      localStorage.setItem('backgroundMusicPlaylist', JSON.stringify(playlist))
      
      // Trigger update event
      window.dispatchEvent(new CustomEvent('backgroundMediaUpdated'))
      
      toast.success(`🎵 "${selectedTrack.name}" set as background music!`)
    }
  }

  const togglePlayback = (trackId: string) => {
    if (currentlyPlaying === trackId) {
      setCurrentlyPlaying(null)
      toast.info('⏸️ Playback stopped')
    } else {
      setCurrentlyPlaying(trackId)
      const track = audioTracks.find(t => t.id === trackId)
      toast.success(`▶️ Playing: ${track?.name}`)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Music className="h-6 w-6 animate-pulse" />
            🎵 AUDIO ENGINE MANAGER - FULL CONTROL
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge className="bg-green-600 animate-pulse">
              🎵 TRACKS: {audioTracks.length}
            </Badge>
            <Badge className="bg-blue-600 animate-pulse">
              🎶 BACKGROUND: {backgroundMusicEnabled ? 'ENABLED' : 'DISABLED'}
            </Badge>
            <Badge className="bg-purple-600 animate-pulse">
              🔊 ENGINE: ACTIVE
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Upload Section */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Upload className="h-5 w-5" />
            Upload Audio Tracks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 bg-background border border-input rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </p>
            )}
          </div>

          <Button
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {uploading ? (
              <>Uploading... 📤</>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Audio Track
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Audio Engine Controls */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Settings className="h-5 w-5" />
            Audio Engine Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-green-600 hover:bg-green-700 h-16">
              <Speaker className="h-6 w-6 mr-2" />
              Master Volume
            </Button>
            
            <Button className="bg-blue-600 hover:bg-blue-700 h-16">
              <Equalizer className="h-6 w-6 mr-2" />
              Equalizer
            </Button>
            
            <Button className="bg-purple-600 hover:bg-purple-700 h-16">
              <Radio className="h-6 w-6 mr-2" />
              Live Streaming
            </Button>
            
            <Button className="bg-red-600 hover:bg-red-700 h-16">
              <Mic className="h-6 w-6 mr-2" />
              Recording
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Background Music Engine</span>
              <Button
                onClick={() => setBackgroundMusicEnabled(!backgroundMusicEnabled)}
                variant={backgroundMusicEnabled ? "default" : "outline"}
              >
                {backgroundMusicEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Audio Quality</span>
                <span className="text-green-400">HIGH</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engine Performance</span>
                <span className="text-blue-400">OPTIMAL</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Tracks List */}
      <Card className="border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Headphones className="h-5 w-5" />
            Audio Tracks Library ({audioTracks.length} tracks)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {audioTracks.map((track) => (
              <div key={track.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-muted">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => togglePlayback(track.id)}
                    variant="ghost"
                    size="sm"
                  >
                    {currentlyPlaying === track.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <div>
                    <h4 className="font-medium">{track.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {formatDuration(track.duration)} • {formatFileSize(track.file_size)} • {track.format.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {track.is_background && (
                    <Badge className="bg-green-600 text-white">
                      🎵 Background
                    </Badge>
                  )}
                  
                  <Badge variant="outline">
                    {track.category}
                  </Badge>

                  <Button
                    onClick={() => setAsBackgroundMusic(track.id)}
                    variant={track.is_background ? "default" : "outline"}
                    size="sm"
                    disabled={track.is_background}
                  >
                    {track.is_background ? 'Active' : 'Set as Background'}
                  </Button>
                </div>
              </div>
            ))}

            {audioTracks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No audio tracks uploaded yet. Upload your first track above.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audio Engine Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-purple-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {audioTracks.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Tracks</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {formatFileSize(audioTracks.reduce((sum, track) => sum + track.file_size, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Size</div>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {audioTracks.filter(track => track.is_active).length}
            </div>
            <div className="text-sm text-muted-foreground">Active Tracks</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">100%</div>
            <div className="text-sm text-muted-foreground">Engine Health</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
