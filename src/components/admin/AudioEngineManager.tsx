import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Music, 
  Upload,
  Waves,
  BarChart3,
  Mic,
  Radio,
  Headphones
} from 'lucide-react'

interface AudioFile {
  id: string
  name: string
  url: string
  duration: number
  isPlaying: boolean
}

export function AudioEngineManager() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([])
  const [currentFile, setCurrentFile] = useState<string | null>(null)
  const [volume, setVolume] = useState([0.5])
  const [isRecording, setIsRecording] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file)
      const audio = new Audio(url)
      
      audio.addEventListener('loadedmetadata', () => {
        const newFile: AudioFile = {
          id: Math.random().toString(36),
          name: file.name,
          url,
          duration: audio.duration,
          isPlaying: false
        }
        setAudioFiles(prev => [...prev, newFile])
      })
    })
  }

  const playAudio = (fileId: string) => {
    const file = audioFiles.find(f => f.id === fileId)
    if (!file || !audioRef.current) return

    if (currentFile && currentFile !== fileId) {
      // Stop current audio
      audioRef.current.pause()
      setAudioFiles(prev => prev.map(f => ({ ...f, isPlaying: false })))
    }

    audioRef.current.src = file.url
    audioRef.current.volume = volume[0]
    audioRef.current.play()
    
    setCurrentFile(fileId)
    setAudioFiles(prev => prev.map(f => ({
      ...f,
      isPlaying: f.id === fileId
    })))
  }

  const pauseAudio = (fileId: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setAudioFiles(prev => prev.map(f => ({
      ...f,
      isPlaying: false
    })))
    setCurrentFile(null)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0]
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsRecording(true)
      console.log('🎤 Recording started')
      // Implement recording logic here
    } catch (error) {
      console.error('❌ Recording failed:', error)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    console.log('⏹️ Recording stopped')
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Music className="h-6 w-6" />
            🎵 Advanced Audio Engine Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audio Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-400 font-semibold">Volume Control</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
                <div className="text-center text-sm text-muted-foreground mt-2">
                  {Math.round(volume[0] * 100)}%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-500/30">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Mic className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Recording</span>
                </div>
                <Button 
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isRecording ? '⏹️ Stop Recording' : '🎤 Start Recording'}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-orange-900/20 border-orange-500/30">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="h-5 w-5 text-orange-400" />
                  <span className="text-orange-400 font-semibold">Upload Audio</span>
                </div>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  📁 Upload Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>
          </div>

          {/* Audio Visualizer */}
          <Card className="bg-cyan-900/20 border-cyan-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <Waves className="h-5 w-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">Audio Visualizer</span>
              </div>
              <div className="bg-black/40 p-4 rounded-lg">
                <div className="flex items-end justify-center gap-1 h-20">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-cyan-500 to-blue-500 w-2 rounded-t"
                      style={{
                        height: `${Math.random() * 60 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Files Library */}
          <Card className="bg-gray-900/20 border-gray-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <Headphones className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400 font-semibold">Audio Library</span>
              </div>
              
              {audioFiles.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No audio files uploaded yet. Upload some files to get started!
                </div>
              ) : (
                <div className="space-y-3">
                  {audioFiles.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border/20">
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => file.isPlaying ? pauseAudio(file.id) : playAudio(file.id)}
                        >
                          {file.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <div>
                          <div className="font-semibold text-white">{file.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Duration: {Math.floor(file.duration / 60)}:{Math.floor(file.duration % 60).toString().padStart(2, '0')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.isPlaying && (
                          <Badge className="bg-green-600 text-white animate-pulse">
                            Playing
                          </Badge>
                        )}
                        <Badge variant="outline">Audio</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Equalizer */}
          <Card className="bg-indigo-900/20 border-indigo-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-indigo-400" />
                <span className="text-indigo-400 font-semibold">Advanced Equalizer</span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {['60Hz', '170Hz', '310Hz', '600Hz', '1kHz', '3kHz', '6kHz', '12kHz'].map((freq, i) => (
                  <div key={freq} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{freq}</div>
                    <Slider
                      orientation="vertical"
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className="h-20"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <audio ref={audioRef} onEnded={() => setCurrentFile(null)} />
    </div>
  )
}