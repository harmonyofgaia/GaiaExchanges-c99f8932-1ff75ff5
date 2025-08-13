
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, X } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export function PersistentMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [playlist, setPlaylist] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Load active background media and create persistent player
    const loadActiveMedia = () => {
      const activeMediaId = localStorage.getItem('activeBackgroundMedia')
      const activeMediaData = localStorage.getItem('activeBackgroundMediaData')
      
      if (activeMediaId && activeMediaData) {
        try {
          const mediaData = JSON.parse(activeMediaData)
          if (mediaData.type === 'audio') {
            setCurrentTrack(mediaData)
            setIsVisible(true)
            console.log('🎵 Persistent Music Player Loaded:', mediaData.name)
          }
        } catch (error) {
          console.log('Error loading persistent music:', error)
        }
      }
    }

    loadActiveMedia()

    // Listen for media changes
    const handleMediaChange = () => {
      loadActiveMedia()
    }

    window.addEventListener('storage', handleMediaChange)
    window.addEventListener('backgroundMediaUpdated', handleMediaChange)

    return () => {
      window.removeEventListener('storage', handleMediaChange)
      window.removeEventListener('backgroundMediaUpdated', handleMediaChange)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      if (playlist.length > 1) {
        playNext()
      } else {
        setIsPlaying(false)
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateTime)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [playlist, currentIndex])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.src = currentTrack.url
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0]
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const playNext = () => {
    if (playlist.length > 1) {
      const nextIndex = (currentIndex + 1) % playlist.length
      setCurrentIndex(nextIndex)
      setCurrentTrack(playlist[nextIndex])
    }
  }

  const playPrevious = () => {
    if (playlist.length > 1) {
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
      setCurrentIndex(prevIndex)
      setCurrentTrack(playlist[prevIndex])
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const closePlayer = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
    }
    setIsVisible(false)
    setIsPlaying(false)
    localStorage.removeItem('activeBackgroundMedia')
    localStorage.removeItem('activeBackgroundMediaData')
  }

  if (!isVisible || !currentTrack) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-black/90 backdrop-blur-md border-purple-500/30">
        <CardContent className="p-4">
          {/* Track Info */}
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-purple-400 truncate">
                  {currentTrack.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Now Playing • Background Music
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={closePlayer}
                className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={playPrevious}
                className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={togglePlay}
                className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={playNext}
                className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleMute}
                className="h-6 w-6 p-0 text-purple-400 hover:text-purple-300"
              >
                {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </Button>
              <div className="w-16">
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        loop={false}
        preload="metadata"
      />
    </div>
  )
}
