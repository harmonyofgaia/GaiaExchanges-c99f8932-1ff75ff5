
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX } from 'lucide-react'

export function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.3
      audio.loop = true
      
      const handleCanPlay = () => {
        setIsLoaded(true)
        console.log('🎵 GAiA Background Music Loaded')
      }
      
      audio.addEventListener('canplaythrough', handleCanPlay)
      
      // Create a synthetic audio for ambient background
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(110, audioContext.currentTime) // A2 note
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      
      if (!isMuted) {
        gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 1)
      }
      
      oscillator.start()
      
      return () => {
        audio?.removeEventListener('canplaythrough', handleCanPlay)
        try {
          oscillator.stop()
          audioContext.close()
        } catch (e) {
          console.log('Audio context cleanup')
        }
      }
    }
  }, [isMuted])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (audio) {
      if (isMuted) {
        audio.play().catch(e => console.log('Audio play prevented by browser'))
        setIsMuted(false)
        console.log('🎵 GAiA Music Started')
      } else {
        audio.pause()
        setIsMuted(true)
        console.log('🔇 GAiA Music Paused')
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleMusic}
        variant={isMuted ? "outline" : "default"}
        size="sm"
        className="bg-background/80 backdrop-blur-sm border-primary/20"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
      
      <audio
        ref={audioRef}
        preload="auto"
        muted={isMuted}
      >
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+TxwmYeBytB2e/OeisEKH/N8N+PQAoUYL" type="audio/wav" />
      </audio>
    </div>
  )
}
