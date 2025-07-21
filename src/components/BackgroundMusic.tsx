
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react'
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

// Global state for music persistence across pages
const musicState = {
  isPlaying: false,
  currentTime: 0,
  volume: 0.7,
  isMuted: false,
  currentTrack: null as MediaFile | null,
  audioElement: null as HTMLAudioElement | null
}

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(musicState.isPlaying)
  const [isMuted, setIsMuted] = useState(musicState.isMuted)
  const [volume, setVolume] = useState(musicState.volume)
  const [currentTime, setCurrentTime] = useState(musicState.currentTime)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<MediaFile | null>(musicState.currentTrack)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Load active background media from localStorage
  useEffect(() => {
    const loadActiveMedia = () => {
      const activeMediaId = localStorage.getItem('activeBackgroundMedia')
      const activeMediaData = localStorage.getItem('activeBackgroundMediaData')
      
      if (activeMediaId && activeMediaData) {
        try {
          const mediaData = JSON.parse(activeMediaData) as MediaFile
          setCurrentTrack(mediaData)
          musicState.currentTrack = mediaData
          console.log('🎵 Custom Background Media Loaded:', mediaData.name)
        } catch (error) {
          console.log('Error loading custom background media:', error)
        }
      }
    }

    loadActiveMedia()

    // Listen for storage changes (when new media is set as background)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'activeBackgroundMedia' || e.key === 'activeBackgroundMediaData') {
        loadActiveMedia()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events from the same window
    const handleCustomEvent = () => {
      loadActiveMedia()
    }
    
    window.addEventListener('backgroundMediaUpdated', handleCustomEvent)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('backgroundMediaUpdated', handleCustomEvent)
    }
  }, [])

  // Sync with global audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Use global audio element or create new one
    if (!musicState.audioElement) {
      musicState.audioElement = audio
    }

    const updateTime = () => {
      const currentTime = audio.currentTime
      setCurrentTime(currentTime)
      musicState.currentTime = currentTime
    }

    const updateDuration = () => {
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      musicState.isPlaying = false
    }

    const handleCanPlay = () => {
      updateDuration()
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('ended', handleEnded)

    // Restore previous state
    audio.volume = isMuted ? 0 : volume
    if (currentTrack && musicState.isPlaying && !audio.src.includes(currentTrack.url)) {
      audio.src = currentTrack.url
      audio.currentTime = musicState.currentTime
      audio.play().catch(e => console.log('Auto-play prevented:', e))
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, volume, isMuted])

  const toggleMusic = () => {
    const audio = audioRef.current
    
    if (!currentTrack) {
      toast.info('🎵 Upload music files in Admin → Media Library to set background music')
      return
    }

    if (audio) {
      if (!isPlaying) {
        if (!audio.src || !audio.src.includes(currentTrack.url)) {
          audio.src = currentTrack.url
        }
        audio.currentTime = musicState.currentTime
        audio.play().then(() => {
          setIsPlaying(true)
          musicState.isPlaying = true
          console.log('🎵 Playing:', currentTrack.name)
          toast.success(`🎵 Now playing: ${currentTrack.name}`)
        }).catch(e => {
          console.log('Audio play prevented by browser:', e)
          toast.error('Unable to play audio - browser restrictions')
        })
      } else {
        audio.pause()
        setIsPlaying(false)
        musicState.isPlaying = false
        console.log('⏸️ Music Paused')
      }
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    const newMuted = !isMuted
    setIsMuted(newMuted)
    musicState.isMuted = newMuted
    audio.muted = newMuted
    audio.volume = newMuted ? 0 : volume
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    musicState.volume = newVolume
    audio.volume = isMuted ? 0 : newVolume
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Number(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
    musicState.currentTime = newTime
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return
    
    const newTime = Math.min(audio.duration, audio.currentTime + 10)
    audio.currentTime = newTime
    setCurrentTime(newTime)
    musicState.currentTime = newTime
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return
    
    const newTime = Math.max(0, audio.currentTime - 10)
    audio.currentTime = newTime
    setCurrentTime(newTime)
    musicState.currentTime = newTime
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* Expanded Player */}
      {isExpanded && currentTrack && (
        <Card className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg p-4 w-80">
          <CardContent className="p-0 space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-primary truncate">
                🎵 {currentTrack.name}
              </div>
              <div className="text-sm text-muted-foreground">
                Background Music Player
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={skipBackward}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={toggleMusic}
                variant={isPlaying ? "default" : "outline"}
                size="sm"
                className="h-10 w-10 p-0"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button
                onClick={skipForward}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Minimized Controls */}
      <div className="flex gap-2">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm border-primary/20"
          title="Toggle Music Player"
        >
          <Music className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={toggleMusic}
          variant={isPlaying ? "default" : "outline"}
          size="sm"
          className="bg-background/80 backdrop-blur-sm border-primary/20"
          title={currentTrack ? currentTrack.name : "No background music selected"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button
          onClick={toggleMute}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm border-primary/20"
          title="Toggle Mute"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
      
      <audio
        ref={audioRef}
        preload="metadata"
        loop
      />
    </div>
  )
}
