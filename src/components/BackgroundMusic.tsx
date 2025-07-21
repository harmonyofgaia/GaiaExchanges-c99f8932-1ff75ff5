
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX, Music, Upload, SkipBack, SkipForward, Play, Pause } from 'lucide-react'
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
          setIsLoaded(true)
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

  // Update time and duration
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      // Auto-loop
      if (currentTrack) {
        audio.currentTime = 0
        audio.play().then(() => setIsPlaying(true)).catch(() => {})
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack])

  const toggleMusic = () => {
    const audio = audioRef.current
    
    if (!currentTrack) {
      toast.info('🎵 Upload music files in Admin → Media Library to set background music')
      return
    }

    if (audio) {
      if (!isPlaying) {
        audio.src = currentTrack.url
        audio.play().then(() => {
          setIsMuted(false)
          setIsPlaying(true)
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
      audio.muted = !audio.muted
      setIsMuted(audio.muted)
    }
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10)
    }
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = Math.min(duration, audio.currentTime + 10)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (audio) {
      const newTime = Number(e.target.value)
      audio.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleAudioError = () => {
    toast.error('Error playing audio file')
    setIsPlaying(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {currentTrack && (
        <div className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg p-3 max-w-64">
          <div className="text-xs text-muted-foreground truncate mb-2">
            🎵 {currentTrack.name}
          </div>
          
          {/* Time and Progress */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <Button
              onClick={skipBackward}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <SkipBack className="h-3 w-3" />
            </Button>
            
            <Button
              onClick={toggleMusic}
              size="sm"
              className="h-8 w-8 p-0"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
            
            <Button
              onClick={skipForward}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <SkipForward className="h-3 w-3" />
            </Button>
            
            <Button
              onClick={toggleMute}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      )}
      
      {!currentTrack && (
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm border-primary/20"
          title="No background music selected - Upload in Admin → Media Library"
        >
          <Music className="h-4 w-4" />
        </Button>
      )}
      
      <audio
        ref={audioRef}
        onError={handleAudioError}
        preload="metadata"
      />
    </div>
  )
}
