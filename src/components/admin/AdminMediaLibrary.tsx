
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  Music, 
  Video, 
  Image, 
  File, 
  Play, 
  Pause, 
  Volume2, 
  Download,
  Trash2,
  Settings,
  Radio
} from 'lucide-react'
import { toast } from 'sonner'

interface MediaFile {
  id: string
  name: string
  type: 'audio' | 'video' | 'image' | 'document'
  format: string
  size: number
  duration?: number
  url: string
  uploadDate: Date
  isActive: boolean
  isBackgroundMusic: boolean
}

export function AdminMediaLibrary() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'Harmony of Gaia - Main Theme.mp3',
      type: 'audio',
      format: 'mp3',
      size: 4567890,
      duration: 245,
      url: '/audio/harmony-main-theme.mp3',
      uploadDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isActive: true,
      isBackgroundMusic: true
    },
    {
      id: '2',
      name: 'Environmental Sounds Collection.wav',
      type: 'audio',
      format: 'wav',
      size: 12345678,
      duration: 180,
      url: '/audio/environmental-sounds.wav',
      uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isActive: true,
      isBackgroundMusic: false
    }
  ])

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    setUploadProgress(0)

    // Process each file
    for (const file of Array.from(files)) {
      console.log('🎵 Uploading:', file.name, file.type, file.size)
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            
            // Add file to media library
            const newFile: MediaFile = {
              id: Date.now().toString() + Math.random(),
              name: file.name,
              type: file.type.startsWith('audio/') ? 'audio' : 
                    file.type.startsWith('video/') ? 'video' :
                    file.type.startsWith('image/') ? 'image' : 'document',
              format: file.name.split('.').pop() || 'unknown',
              size: file.size,
              duration: file.type.startsWith('audio/') ? Math.floor(Math.random() * 300) + 60 : undefined,
              url: URL.createObjectURL(file),
              uploadDate: new Date(),
              isActive: true,
              isBackgroundMusic: false
            }
            
            setMediaFiles(prev => [newFile, ...prev])
            
            toast.success(`✅ ${file.name} uploaded successfully!`, {
              description: 'File is now available in your media library'
            })
            
            return 0
          }
          return prev + Math.random() * 15
        })
      }, 100)
    }
    
    setIsUploading(false)
  }

  const playAudio = (file: MediaFile) => {
    if (file.type !== 'audio') return

    if (currentlyPlaying === file.id) {
      audioRef.current?.pause()
      setCurrentlyPlaying(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = file.url
        audioRef.current.play()
        setCurrentlyPlaying(file.id)
        
        toast.success(`🎵 Now playing: ${file.name}`)
      }
    }
  }

  const setAsBackgroundMusic = (fileId: string) => {
    setMediaFiles(prev => prev.map(file => ({
      ...file,
      isBackgroundMusic: file.id === fileId
    })))

    const selectedFile = mediaFiles.find(f => f.id === fileId)
    if (selectedFile) {
      // Store in localStorage for BackgroundMusic component
      localStorage.setItem('activeBackgroundMedia', fileId)
      localStorage.setItem('activeBackgroundMediaData', JSON.stringify(selectedFile))
      
      // Dispatch custom event to notify BackgroundMusic component
      window.dispatchEvent(new CustomEvent('backgroundMediaUpdated'))
      
      toast.success(`🎵 Set as background music: ${selectedFile.name}`, {
        description: 'This track will now play as background music across the site'
      })
    }
  }

  const deleteFile = (fileId: string) => {
    const file = mediaFiles.find(f => f.id === fileId)
    setMediaFiles(prev => prev.filter(f => f.id !== fileId))
    
    if (currentlyPlaying === fileId) {
      audioRef.current?.pause()
      setCurrentlyPlaying(null)
    }
    
    toast.success(`🗑️ Deleted: ${file?.name}`)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Unknown'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'audio': return Music
      case 'video': return Video
      case 'image': return Image
      default: return File
    }
  }

  const audioFiles = mediaFiles.filter(f => f.type === 'audio')
  const videoFiles = mediaFiles.filter(f => f.type === 'video')
  const imageFiles = mediaFiles.filter(f => f.type === 'image')
  const otherFiles = mediaFiles.filter(f => !['audio', 'video', 'image'].includes(f.type))

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Upload className="h-5 w-5" />
            📁 Media Upload Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading files...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
          
          <div className="flex gap-4">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-green-600 hover:bg-green-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Media Files
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*,video/*,image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            Supported formats: MP3, WAV, OGG, MP4, AVI, JPG, PNG, PDF, DOC
          </p>
        </CardContent>
      </Card>

      {/* Audio Files */}
      {audioFiles.length > 0 && (
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Music className="h-5 w-5" />
              🎵 Audio Files ({audioFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {audioFiles.map(file => {
                const isPlaying = currentlyPlaying === file.id
                return (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border/20">
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => playAudio(file)}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      
                      <div>
                        <div className="font-semibold text-white">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} • {formatDuration(file.duration)} • {file.format.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {file.isBackgroundMusic && (
                        <Badge className="bg-green-600 text-white">
                          <Radio className="h-3 w-3 mr-1" />
                          Background
                        </Badge>
                      )}
                      
                      {isPlaying && (
                        <Badge className="bg-purple-600 text-white animate-pulse">
                          Playing
                        </Badge>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setAsBackgroundMusic(file.id)}
                        className="text-green-400 hover:text-green-300"
                      >
                        <Radio className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteFile(file.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Files */}
      {videoFiles.length > 0 && (
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Video className="h-5 w-5" />
              🎬 Video Files ({videoFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoFiles.map(file => (
                <div key={file.id} className="p-3 bg-muted/10 rounded-lg border border-border/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-white">{file.name}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteFile(file.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)} • {file.format.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">{audioFiles.length}</div>
              <div className="text-sm text-muted-foreground">Audio Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{videoFiles.length}</div>
              <div className="text-sm text-muted-foreground">Video Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{imageFiles.length}</div>
              <div className="text-sm text-muted-foreground">Images</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{mediaFiles.length}</div>
              <div className="text-sm text-muted-foreground">Total Files</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden audio element for playback */}
      <audio 
        ref={audioRef} 
        onEnded={() => setCurrentlyPlaying(null)}
        onError={() => {
          setCurrentlyPlaying(null)
          toast.error('Audio playback error')
        }}
      />
    </div>
  )
}
