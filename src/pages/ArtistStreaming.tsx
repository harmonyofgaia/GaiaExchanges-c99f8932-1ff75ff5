
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Shuffle, 
  Repeat,
  Music,
  Radio,
  Users,
  Heart,
  Share2
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

interface Track {
  id: string
  title: string
  artist: string
  url: string
  duration: number
  cover?: string
  genre?: string
}

export default function ArtistStreaming() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch background music from admin media library
  const { data: tracks } = useQuery({
    queryKey: ['background-music'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_media_library')
        .select('*')
        .eq('is_background_music', true)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Transform admin media to track format
      return data.map(item => ({
        id: item.id,
        title: item.original_name.replace(/\.[^/.]+$/, ''), // Remove file extension
        artist: 'GAIA Artist',
        url: supabase.storage.from(item.storage_bucket).getPublicUrl(item.storage_path).data.publicUrl,
        duration: 0, // Would need to be calculated from metadata
        genre: item.category
      })) as Track[]
    }
  })

  // Sample live shows data
  const liveShows = [
    {
      id: '1',
      title: 'GAIA Harmony Live Session',
      artist: 'Various Artists',
      viewers: 1247,
      status: 'live',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Eco Beats & Nature Sounds',
      artist: 'Green Sound Collective',
      viewers: 892,
      status: 'live',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Meditation & Ambient Music',
      artist: 'Earth Harmony',
      viewers: 654,
      status: 'starting_soon',
      thumbnail: '/api/placeholder/300/200'
    }
  ]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0
        audio.play()
      } else {
        playNext()
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [isRepeating, tracks])

  const playTrack = async (track: Track) => {
    if (audioRef.current) {
      setCurrentTrack(track)
      audioRef.current.src = track.url
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        toast.success(`🎵 Now playing: ${track.title}`)
      } catch (error) {
        console.error('Play error:', error)
        toast.error('Failed to play track')
      }
    }
  }

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('Play error:', error)
          toast.error('Failed to play track')
        }
      }
    }
  }

  const playNext = () => {
    if (!tracks || !currentTrack) return
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id)
    let nextIndex = currentIndex + 1
    
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * tracks.length)
    } else if (nextIndex >= tracks.length) {
      nextIndex = 0
    }
    
    playTrack(tracks[nextIndex])
  }

  const playPrevious = () => {
    if (!tracks || !currentTrack) return
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id)
    let prevIndex = currentIndex - 1
    
    if (prevIndex < 0) {
      prevIndex = tracks.length - 1
    }
    
    playTrack(tracks[prevIndex])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const seekTo = (percentage: number) => {
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (percentage / 100) * audioRef.current.duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hidden audio element */}
        <audio ref={audioRef} />

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            🎭 GAIA Artist Streaming Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Live shows, music streaming, and community connection
          </p>
        </div>

        {/* Live Shows Section */}
        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Radio className="h-6 w-6" />
              🔴 Live Shows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {liveShows.map((show) => (
                <div key={show.id} className="space-y-3">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div className="absolute top-3 left-3 z-20">
                      <Badge className={show.status === 'live' ? 'bg-red-600 animate-pulse' : 'bg-yellow-600'}>
                        {show.status === 'live' ? '🔴 LIVE' : '⏰ Soon'}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <h3 className="font-medium text-white mb-1">{show.title}</h3>
                      <p className="text-sm text-gray-300">{show.artist}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-red-400">{show.viewers} viewers</span>
                      </div>
                    </div>
                    <Button
                      className="absolute inset-0 bg-transparent hover:bg-white/10 border-0 z-30"
                      onClick={() => {
                        setIsLive(true)
                        toast.success(`Joining ${show.title}...`)
                      }}
                    >
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Music Player */}
        {currentTrack && (
          <Card className="border-purple-500/30 bg-purple-900/20 sticky bottom-4 z-40">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{currentTrack.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={isShuffled ? 'text-purple-400' : ''}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" onClick={playPrevious}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  
                  <Button variant="ghost" size="sm" onClick={playNext}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRepeating(!isRepeating)}
                    className={isRepeating ? 'text-purple-400' : ''}
                  >
                    <Repeat className="h-4 w-4" />
                  </Button>
                </div>

                {/* Progress & Volume */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(currentTime)}
                    </span>
                    <Progress
                      value={audioRef.current?.duration ? (currentTime / audioRef.current.duration) * 100 : 0}
                      className="flex-1 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const percentage = ((e.clientX - rect.left) / rect.width) * 100
                        seekTo(percentage)
                      }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {audioRef.current?.duration ? formatTime(audioRef.current.duration) : '0:00'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-16"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Music Library */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Music className="h-6 w-6" />
              GAIA Music Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tracks && tracks.length > 0 ? (
              <div className="space-y-2">
                {tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                      currentTrack?.id === track.id
                        ? 'bg-purple-900/40 border border-purple-500/30'
                        : 'bg-black/20 hover:bg-black/40'
                    }`}
                    onClick={() => playTrack(track)}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full text-white font-medium">
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{track.title}</h3>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                    
                    {track.genre && (
                      <Badge variant="outline">{track.genre}</Badge>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No music available yet. Admin can upload tracks to the media library.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Artist Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🎤 Become an Artist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Join our platform as a verified artist and share your music with the GAIA community.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Apply as Artist
              </Button>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">💰 Earn GAIA Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Artists earn GAIA tokens from streams, live shows, and community engagement.
              </p>
              <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
