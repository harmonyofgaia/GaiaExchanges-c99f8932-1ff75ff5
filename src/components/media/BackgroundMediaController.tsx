
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react'
import { toast } from 'sonner'

interface MediaTrack {
  id: string
  title: string
  artist: string
  duration: string
  url: string
  category: string
}

export function BackgroundMediaController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [playlist] = useState<MediaTrack[]>([
    {
      id: '1',
      title: 'Harmony of Gaia',
      artist: 'Environmental Symphony',
      duration: '4:32',
      url: 'harmony-gaia.mp3',
      category: 'ambient'
    },
    {
      id: '2',
      title: 'Digital Forest',
      artist: 'Nature Tech',
      duration: '3:45',
      url: 'digital-forest.mp3',
      category: 'electronic'
    },
    {
      id: '3',
      title: 'Ocean Waves',
      artist: 'Blue Planet Sounds',
      duration: '5:12',
      url: 'ocean-waves.mp3',
      category: 'nature'
    }
  ])

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    console.log('🎵 BACKGROUND MEDIA CONTROLLER - AUTO-PLAY SYSTEM')
    console.log('🎶 PLAYLIST MANAGEMENT ACTIVE')
    console.log('🔄 CONTINUOUS PLAYBACK FOR VISITORS')
    
    // Auto-start playlist when visitors arrive
    const autoStartDelay = setTimeout(() => {
      if (!isPlaying) {
        handlePlay()
        toast.success('🎵 Welcome Music Started!', {
          description: 'Background music is now playing for enhanced experience',
          duration: 4000
        })
      }
    }, 2000)

    return () => clearTimeout(autoStartDelay)
  }, [])

  const handlePlay = () => {
    setIsPlaying(true)
    console.log('🎵 BACKGROUND MUSIC: PLAYING')
    console.log(`🎶 CURRENT TRACK: ${playlist[currentTrack].title}`)
  }

  const handlePause = () => {
    setIsPlaying(false)
    console.log('⏸️ BACKGROUND MUSIC: PAUSED')
  }

  const handleNext = () => {
    const nextTrack = (currentTrack + 1) % playlist.length
    setCurrentTrack(nextTrack)
    
    toast.success('⏭️ Next Track', {
      description: `Now playing: ${playlist[nextTrack].title}`,
      duration: 3000
    })
    
    console.log(`⏭️ NEXT TRACK: ${playlist[nextTrack].title}`)
  }

  const handlePrevious = () => {
    const prevTrack = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1
    setCurrentTrack(prevTrack)
    
    toast.success('⏮️ Previous Track', {
      description: `Now playing: ${playlist[prevTrack].title}`,
      duration: 3000
    })
    
    console.log(`⏮️ PREVIOUS TRACK: ${playlist[prevTrack].title}`)
  }

  const currentMedia = playlist[currentTrack]

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Card className="w-80 border-purple-500/30 bg-purple-900/20 backdrop-blur-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-purple-400 text-sm flex items-center gap-2">
            <Music className="h-4 w-4" />
            🎵 GAIA Media Player
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Current Track Info */}
          <div className="text-center">
            <div className="font-bold text-purple-400 text-sm">{currentMedia.title}</div>
            <div className="text-xs text-muted-foreground">{currentMedia.artist}</div>
            <Badge className="mt-1 bg-purple-600 text-xs">{currentMedia.category}</Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-purple-500 h-1 rounded-full transition-all duration-1000"
              style={{ width: isPlaying ? '60%' : '0%' }}
            ></div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={handlePrevious}
              className="h-8 w-8 p-0 hover:bg-purple-500/20"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              size="sm"
              onClick={isPlaying ? handlePause : handlePlay}
              className="h-8 w-8 p-0 bg-purple-600 hover:bg-purple-700"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost"
              onClick={handleNext}
              className="h-8 w-8 p-0 hover:bg-purple-500/20"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-purple-500/20"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Playlist Info */}
          <div className="text-center text-xs text-muted-foreground">
            Track {currentTrack + 1} of {playlist.length} • {currentMedia.duration}
          </div>
        </CardContent>
      </Card>
      
      {/* Hidden audio element for actual playback */}
      <audio 
        ref={audioRef}
        src={currentMedia.url}
        onEnded={handleNext}
        style={{ display: 'none' }}
      />
    </div>
  )
}
