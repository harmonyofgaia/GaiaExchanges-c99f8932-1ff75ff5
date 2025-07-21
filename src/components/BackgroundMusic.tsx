
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
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
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<MediaFile | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Load active background media from localStorage and persist playback state
  useEffect(() => {
    const loadActiveMedia = () => {
      const activeMediaId = localStorage.getItem('activeBackgroundMedia')
      const activeMediaData = localStorage.getItem('activeBackgroundMediaData')
      const savedPlaybackState = localStorage.getItem('backgroundMusicState')
      
      if (activeMediaId && activeMediaData) {
        try {
          const mediaData = JSON.parse(activeMediaData) as MediaFile
          setCurrentTrack(mediaData)
          setIsLoaded(true)
          console.log('🎵 Custom Background Media Loaded:', mediaData.name)
          
          // Restore playback state
          if (savedPlaybackState) {
            const state = JSON.parse(savedPlaybackState)
            setIsPlaying(state.isPlaying)
            setVolume(state.volume || 0.7)
            setCurrentTime(state.currentTime || 0)
            
            // Resume playback if it was playing
            if (state.isPlaying && audioRef.current) {
              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = state.currentTime || 0
                  audioRef.current.volume = state.volume || 0.7
                  audioRef.current.play().catch(console.log)
                }
              }, 1000)
            }
          }
        } catch (error) {
          console.log('Error loading custom background media:', error)
        }
      }
    }

    loadActiveMedia()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'activeBackgroundMedia' || e.key === 'activeBackgroundMediaData') {
        loadActiveMedia()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('backgroundMediaUpdated', loadActiveMedia)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('backgroundMediaUpdated', loadActiveMedia)
    }
  }, [])

  // Save playback state periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTrack && audioRef.current) {
        const state = {
          isPlaying,
          volume,
          currentTime: audioRef.current.currentTime,
          trackId: currentTrack.id
        }
        localStorage.setItem('backgroundMusicState', JSON.stringify(state))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, volume, currentTrack])

  // Update time display
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlayPause = () => {
    const audio = audioRef.current
    
    if (!currentTrack) {
      toast.info('🎵 Upload music files in Admin → Media Library to set background music')
      return
    }

    if (audio) {
      if (!isPlaying) {
        if (!isLoaded || audio.src !== currentTrack.url) {
          audio.src = currentTrack.url
          audio.volume = volume
        }
        
        audio.play().then(() => {
          setIsPlaying(true)
          setIsMuted(false)
          console.log('🎵 Playing:', currentTrack.name)
          toast.success(`🎵 Now playing: ${currentTrack.name}`)
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

  const toggleMute = () => {
    const audio = audioRef.current
    if (audio) {
      audio.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleAudioEnd = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    // Auto-restart for looping
    if (audioRef.current && currentTrack) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.log)
      setIsPlaying(true)
    }
  }

  const handleAudioError = () => {
    toast.error('Error playing audio file')
    setIsPlaying(false)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setIsLoaded(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* Expanded Player */}
      {isExpanded && currentTrack && (
        <div className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg p-4 w-80 mb-2">
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-sm font-medium text-primary truncate">
                🎵 {currentTrack.name}
              </div>
              <div className="text-xs text-muted-foreground">
                Background Music Player
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div 
                className="w-full h-2 bg-secondary rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const progress = (e.clientX - rect.left) / rect.width
                  handleSeek(progress * duration)
                }}
              >
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <Button size="sm" variant="ghost" disabled>
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button onClick={togglePlayPause} size="sm">
                {isPlaying ? 
                  <Pause className="h-4 w-4" /> : 
                  <Play className="h-4 w-4" />
                }
              </Button>
              
              <Button size="sm" variant="ghost" disabled>
                <SkipForward className="h-4 w-4" />
              </Button>
              
              <Button onClick={toggleMute} size="sm" variant="ghost">
                {isMuted ? 
                  <VolumeX className="h-4 w-4" /> : 
                  <Volume2 className="h-4 w-4" />
                }
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Volume2 className="h-3 w-3 text-muted-foreground" />
              <div 
                className="flex-1 h-2 bg-secondary rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const newVolume = (e.clientX - rect.left) / rect.width
                  handleVolumeChange(Math.max(0, Math.min(1, newVolume)))
                }}
              >
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Track Info (when collapsed) */}
      {!isExpanded && currentTrack && (
        <div className="bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg p-2 max-w-48">
          <div className="text-xs text-muted-foreground truncate">
            🎵 {currentTrack.name}
          </div>
          {isPlaying && (
            <div className="text-xs text-green-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          )}
        </div>
      )}
      
      {/* Control Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm border-primary/20"
          title="Expand player"
        >
          <Music className="h-4 w-4" />
        </Button>

        <Button
          onClick={togglePlayPause}
          variant={isPlaying ? "default" : "outline"}
          size="sm"
          className="bg-background/80 backdrop-blur-sm border-primary/20"
          title={currentTrack ? (isPlaying ? 'Pause' : 'Play') : "No background music selected"}
        >
          {isPlaying ? 
            <Pause className="h-4 w-4" /> : 
            <Play className="h-4 w-4" />
          }
        </Button>
      </div>
      
      <audio
        ref={audioRef}
        onEnded={handleAudioEnd}
        onError={handleAudioError}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        preload="metadata"
      />
    </div>
  )
}
