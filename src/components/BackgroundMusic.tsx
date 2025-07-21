
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX, Music, Upload } from 'lucide-react'
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

  const toggleMusic = () => {
    const audio = audioRef.current
    
    if (!currentTrack) {
      toast.info('🎵 Upload music files in Admin → Media Library to set background music')
      return
    }

    if (audio) {
      if (isMuted || !isPlaying) {
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
        setIsMuted(true)
        setIsPlaying(false)
        console.log('🔇 Music Paused')
      }
    }
  }

  const handleAudioEnd = () => {
    setIsPlaying(false)
    setIsMuted(true)
    // Optionally restart the track for looping
    if (audioRef.current && currentTrack) {
      audioRef.current.currentTime = 0
    }
  }

  const handleAudioError = () => {
    toast.error('Error playing audio file')
    setIsPlaying(false)
    setIsMuted(true)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {currentTrack && (
        <div className="bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg p-2 max-w-48">
          <div className="text-xs text-muted-foreground truncate">
            🎵 {currentTrack.name}
          </div>
        </div>
      )}
      
      <Button
        onClick={toggleMusic}
        variant={isMuted || !isPlaying ? "outline" : "default"}
        size="sm"
        className="bg-background/80 backdrop-blur-sm border-primary/20"
        title={currentTrack ? currentTrack.name : "No background music selected"}
      >
        {isMuted || !isPlaying ? 
          <VolumeX className="h-4 w-4" /> : 
          <Volume2 className="h-4 w-4" />
        }
      </Button>
      
      <audio
        ref={audioRef}
        onEnded={handleAudioEnd}
        onError={handleAudioError}
        loop
        preload="metadata"
      />
    </div>
  )
}
