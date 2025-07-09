
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Music,
  Shuffle,
  Repeat
} from 'lucide-react'

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const playlist = [
    { title: 'GAiA Theme', artist: 'Harmony Collective', duration: '3:45' },
    { title: 'Eco Warriors', artist: 'Green Sound', duration: '4:12' },
    { title: 'Digital Dreams', artist: 'Cyber Nature', duration: '3:28' },
    { title: 'Virtual Paradise', artist: 'GAiA Orchestra', duration: '5:01' },
    { title: 'Quantum Vibes', artist: 'Future Beats', duration: '3:33' }
  ]

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    console.log('🎵 Music Player:', isPlaying ? 'Paused' : 'Playing', playlist[currentTrack].title)
  }

  const skipForward = () => {
    const nextTrack = (currentTrack + 1) % playlist.length
    setCurrentTrack(nextTrack)
    console.log('⏭️ Next Track:', playlist[nextTrack].title)
  }

  const skipBackward = () => {
    const prevTrack = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1
    setCurrentTrack(prevTrack)
    console.log('⏮️ Previous Track:', playlist[prevTrack].title)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled)
    console.log('🔀 Shuffle:', !isShuffled ? 'ON' : 'OFF')
  }

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating)
    console.log('🔁 Repeat:', !isRepeating ? 'ON' : 'OFF')
  }

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          if (newTime >= 180) { // 3 minutes simulation
            if (isRepeating) {
              return 0
            } else {
              skipForward()
              return 0
            }
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, isRepeating, currentTrack])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 border-purple-500/30 bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Music className="h-5 w-5 text-purple-400" />
          <div className="flex-1">
            <div className="text-sm font-bold text-purple-400">{playlist[currentTrack].title}</div>
            <div className="text-xs text-muted-foreground">{playlist[currentTrack].artist}</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleShuffle}
            className={`${isShuffled ? 'text-purple-400' : 'text-muted-foreground'} hover:text-purple-300`}
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          
          <Button size="sm" variant="ghost" onClick={skipBackward} className="text-purple-400 hover:text-purple-300">
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            onClick={togglePlayPause}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-10 h-10"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button size="sm" variant="ghost" onClick={skipForward} className="text-purple-400 hover:text-purple-300">
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleRepeat}
            className={`${isRepeating ? 'text-purple-400' : 'text-muted-foreground'} hover:text-purple-300`}
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-3">
          <Slider
            value={[currentTime]}
            max={180}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{playlist[currentTrack].duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={toggleMute} className="text-purple-400 hover:text-purple-300">
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  )
}
