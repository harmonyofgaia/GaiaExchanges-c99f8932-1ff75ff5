
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Volume2, VolumeX, Music, Upload, Play, Pause, SkipForward, SkipBack } from 'lucide-react'
import { toast } from 'sonner'

interface MediaFile {
  id: string
  name: string
  type: 'audio' | 'video'
  format: string
  size: number
  duration?: number
  url: string
  uploadDate: Date
  isActive: boolean
}

export function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<MediaFile | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [playlist, setPlaylist] = useState<MediaFile[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Load playlist from localStorage or admin uploads
  useEffect(() => {
    const loadPlaylist = () => {
      const activeMediaId = localStorage.getItem('activeBackgroundMedia')
      const activeMediaData = localStorage.getItem('activeBackgroundMediaData')
      const storedPlaylist = localStorage.getItem('backgroundMusicPlaylist')
      
      if (storedPlaylist) {
        try {
          const playlistData = JSON.parse(storedPlaylist) as MediaFile[]
          setPlaylist(playlistData)
          
          if (activeMediaId && activeMediaData) {
            const mediaData = JSON.parse(activeMediaData) as MediaFile
            setCurrentTrack(mediaData)
            const trackIndex = playlistData.findIndex(track => track.id === activeMediaId)
            if (trackIndex !== -1) {
              setCurrentTrackIndex(trackIndex)
            }
            setIsLoaded(true)
            console.log('🎵 Background Music Playlist Loaded:', playlistData.length, 'tracks')
          }
        } catch (error) {
          console.log('Error loading playlist:', error)
        }
      }
    }

    loadPlaylist()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'activeBackgroundMedia' || e.key === 'activeBackgroundMediaData' || e.key === 'backgroundMusicPlaylist') {
        loadPlaylist()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('backgroundMediaUpdated', loadPlaylist)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('backgroundMediaUpdated', loadPlaylist)
    }
  }, [])

  // Update audio time
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [currentTrack])

  const toggleMusic = () => {
    const audio = audioRef.current
    
    if (!currentTrack && playlist.length === 0) {
      toast.info('🎵 Upload music files in Admin → Media Library to set background music')
      return
    }

    if (!currentTrack && playlist.length > 0) {
      setCurrentTrack(playlist[0])
      setCurrentTrackIndex(0)
      return
    }

    if (audio) {
      if (isMuted || !isPlaying) {
        audio.src = currentTrack!.url
        audio.volume = volume
        audio.play().then(() => {
          setIsMuted(false)
          setIsPlaying(true)
          console.log('🎵 Playing:', currentTrack!.name)
          toast.success(`🎵 Now playing: ${currentTrack!.name}`)
        }).catch(e => {
          console.log('Audio play prevented by browser:', e)
          toast.error('Unable to play audio - browser restrictions')
        })
      } else {
        audio.pause()
        setIsPlaying(false)
        console.log('⏸️ Music Paused')
      }
    }
  }

  const playNext = () => {
    if (playlist.length === 0) return
    
    const nextIndex = (currentTrackIndex + 1) % playlist.length
    setCurrentTrackIndex(nextIndex)
    setCurrentTrack(playlist[nextIndex])
    
    if (isPlaying) {
      setTimeout(() => {
        const audio = audioRef.current
        if (audio) {
          audio.src = playlist[nextIndex].url
          audio.play()
        }
      }, 100)
    }
    
    toast.success(`⏭️ Next: ${playlist[nextIndex].name}`)
  }

  const playPrevious = () => {
    if (playlist.length === 0) return
    
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1
    setCurrentTrackIndex(prevIndex)
    setCurrentTrack(playlist[prevIndex])
    
    if (isPlaying) {
      setTimeout(() => {
        const audio = audioRef.current
        if (audio) {
          audio.src = playlist[prevIndex].url
          audio.play()
        }
      }, 100)
    }
    
    toast.success(`⏮️ Previous: ${playlist[prevIndex].name}`)
  }

  const handleAudioEnd = () => {
    // Auto-play next track
    playNext()
  }

  const handleAudioError = () => {
    toast.error('Error playing audio file')
    setIsPlaying(false)
    setIsMuted(true)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <>
      {/* Floating Mini Player */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {currentTrack && (
          <Card className="bg-background/95 backdrop-blur-sm border border-primary/20 w-80">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={playPrevious}
                    variant="ghost"
                    size="sm"
                    disabled={playlist.length <= 1}
                  >
                    <SkipBack className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    onClick={toggleMusic}
                    variant={isMuted || !isPlaying ? "outline" : "default"}
                    size="sm"
                  >
                    {isMuted || !isPlaying ? 
                      <Play className="h-3 w-3" /> : 
                      <Pause className="h-3 w-3" />
                    }
                  </Button>
                  
                  <Button
                    onClick={playNext}
                    variant="ghost"
                    size="sm"
                    disabled={playlist.length <= 1}
                  >
                    <SkipForward className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">
                    {currentTrack.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-1 mt-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1"
                  />
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    variant="ghost"
                    size="sm"
                  >
                    {isMuted || volume === 0 ? 
                      <VolumeX className="h-3 w-3" /> : 
                      <Volume2 className="h-3 w-3" />
                    }
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Button
          onClick={toggleMusic}
          variant={isMuted || !isPlaying ? "outline" : "default"}
          size="sm"
          className="bg-background/80 backdrop-blur-sm border-primary/20 self-end"
          title={currentTrack ? currentTrack.name : "No background music selected"}
        >
          {isMuted || !isPlaying ? 
            <VolumeX className="h-4 w-4" /> : 
            <Volume2 className="h-4 w-4" />
          }
        </Button>
      </div>
      
      <audio
        ref={audioRef}
        onEnded={handleAudioEnd}
        onError={handleAudioError}
        preload="metadata"
      />
    </>
  )
}
