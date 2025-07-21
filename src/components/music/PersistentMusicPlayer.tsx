
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react'

interface Track {
  id: string
  title: string
  artist: string
  url: string
  duration: number
}

export function PersistentMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState([70])
  const [currentTime, setCurrentTime] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playlist: Track[] = [
    {
      id: '1',
      title: 'GAIA Harmony',
      artist: 'Nature Sounds',
      url: '/audio/nature-harmony.mp3',
      duration: 180
    },
    {
      id: '2',
      title: 'Digital Dreams',
      artist: 'Cyber Ambient',
      url: '/audio/digital-dreams.mp3',
      duration: 240
    },
    {
      id: '3',
      title: 'Green Evolution',
      artist: 'Eco Music',
      url: '/audio/green-evolution.mp3',
      duration: 200
    }
  ]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => nextTrack()

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('ended', handleEnded)
    audio.volume = volume[0] / 100

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
    setCurrentTime(0)
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
    setCurrentTime(0)
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Floating Music Icon */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="rounded-full h-12 w-12 bg-purple-600 hover:bg-purple-700 shadow-lg"
        >
          <Music className="h-6 w-6" />
        </Button>
      </div>

      {/* Music Player Panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50">
          <Card className="w-80 bg-black/90 backdrop-blur-md border border-purple-500/30">
            <CardContent className="p-4">
              {/* Track Info */}
              <div className="text-center mb-4">
                <h4 className="font-bold text-white">{playlist[currentTrack].title}</h4>
                <p className="text-sm text-purple-400">{playlist[currentTrack].artist}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={[currentTime]}
                  max={playlist[currentTrack].duration}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = value[0]
                      setCurrentTime(value[0])
                    }
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(playlist[currentTrack].duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-4 mb-4">
                <Button size="sm" variant="ghost" onClick={prevTrack}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={togglePlay} className="bg-purple-600 hover:bg-purple-700">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={nextTrack}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  className="flex-1"
                  onValueChange={setVolume}
                />
              </div>

              {/* Hidden Audio Element */}
              <audio
                ref={audioRef}
                src={playlist[currentTrack].url}
                preload="metadata"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
