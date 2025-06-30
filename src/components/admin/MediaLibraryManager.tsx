import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Upload, 
  Music, 
  Video, 
  Play, 
  Pause, 
  Trash2, 
  Volume2,
  VolumeX,
  Download,
  Eye,
  Settings
} from 'lucide-react'
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

export function MediaLibraryManager() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [activeBackgroundMedia, setActiveBackgroundMedia] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const supportedFormats = {
    audio: ['.mp3', '.wav', '.flac', '.ogg', '.m4a'],
    video: ['.mp4', '.mkv', '.avi', '.webm', '.mov']
  }

  const handleFileUpload = async (files: FileList) => {
    const allowedFormats = [...supportedFormats.audio, ...supportedFormats.video]
    
    Array.from(files).forEach(async (file) => {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      
      if (!allowedFormats.includes(fileExtension)) {
        toast.error(`Unsupported format: ${fileExtension}`)
        return
      }

      const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))
      
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file)
      
      // Simulate upload
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }))
      }

      const mediaFile: MediaFile = {
        id: fileId,
        name: file.name,
        type: file.type.startsWith('video/') ? 'video' : 'audio',
        format: fileExtension,
        size: file.size,
        url: objectUrl,
        uploadDate: new Date(),
        isActive: false
      }

      setMediaFiles(prev => [...prev, mediaFile])
      setUploadProgress(prev => {
        const { [fileId]: removed, ...rest } = prev
        return rest
      })
      
      toast.success(`🎵 ${file.name} uploaded successfully!`)
    })
  }

  const playMedia = (fileId: string) => {
    const file = mediaFiles.find(f => f.id === fileId)
    if (!file) return

    if (currentlyPlaying === fileId) {
      setCurrentlyPlaying(null)
      if (file.type === 'video' && videoRef.current) {
        videoRef.current.pause()
      } else if (audioRef.current) {
        audioRef.current.pause()
      }
    } else {
      setCurrentlyPlaying(fileId)
      if (file.type === 'video' && videoRef.current) {
        videoRef.current.src = file.url
        videoRef.current.play()
      } else if (audioRef.current) {
        audioRef.current.src = file.url
        audioRef.current.play()
      }
    }
  }

  const setAsBackgroundMedia = (fileId: string) => {
    setActiveBackgroundMedia(fileId)
    // Save to localStorage for global access
    localStorage.setItem('activeBackgroundMedia', fileId)
    const file = mediaFiles.find(f => f.id === fileId)
    localStorage.setItem('activeBackgroundMediaData', JSON.stringify(file))
    
    toast.success('🌍 Background media set for entire website!')
  }

  const deleteMedia = (fileId: string) => {
    setMediaFiles(prev => prev.filter(f => f.id !== fileId))
    if (currentlyPlaying === fileId) setCurrentlyPlaying(null)
    if (activeBackgroundMedia === fileId) setActiveBackgroundMedia(null)
    
    toast.success('Media file deleted')
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Music className="h-6 w-6" />
            🎵 Gaia's Harmony Media Library - Ultimate Experience Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-400 mb-2">Drop Your Creative Assets</h3>
              <p className="text-muted-foreground mb-4">
                Upload MP3, WAV, FLAC, MP4, MKV, AVI files to create immersive experiences
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={[...supportedFormats.audio, ...supportedFormats.video].join(',')}
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
              />
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
              
              <div className="mt-4 text-xs text-muted-foreground">
                Supported: {[...supportedFormats.audio, ...supportedFormats.video].join(', ')}
              </div>
            </div>

            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
              <Card className="bg-blue-900/20 border-blue-500/30">
                <CardContent className="pt-4">
                  <h4 className="font-medium text-blue-400 mb-4">Upload Progress</h4>
                  {Object.entries(uploadProgress).map(([fileId, progress]) => (
                    <div key={fileId} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Media</TabsTrigger>
                <TabsTrigger value="audio">Audio Files</TabsTrigger>
                <TabsTrigger value="video">Video Files</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {mediaFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No media files uploaded yet. Start creating your harmony library!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaFiles.map((file) => (
                      <Card key={file.id} className="bg-muted/20 border-green-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            {file.type === 'video' ? 
                              <Video className="h-5 w-5 text-blue-400" /> : 
                              <Music className="h-5 w-5 text-green-400" />
                            }
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{file.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.format}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-1 mb-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => playMedia(file.id)}
                              className="flex-1"
                            >
                              {currentlyPlaying === file.id ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                            </Button>
                            
                            <Button
                              size="sm"
                              variant={activeBackgroundMedia === file.id ? "default" : "outline"}
                              onClick={() => setAsBackgroundMedia(file.id)}
                              className="flex-1"
                            >
                              <Settings className="h-3 w-3" />
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteMedia(file.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>

                          {activeBackgroundMedia === file.id && (
                            <Badge className="w-full bg-green-600 text-white text-xs">
                              🌍 Active Background Media
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="audio">
                {mediaFiles
                  .filter((file) => file.type === 'audio')
                  .map((file) => (
                    <Card key={file.id} className="bg-muted/20 border-green-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Music className="h-5 w-5 text-green-400" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{file.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {file.format}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 mb-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => playMedia(file.id)}
                            className="flex-1"
                          >
                            {currentlyPlaying === file.id ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant={activeBackgroundMedia === file.id ? "default" : "outline"}
                            onClick={() => setAsBackgroundMedia(file.id)}
                            className="flex-1"
                          >
                            <Settings className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMedia(file.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>

                        {activeBackgroundMedia === file.id && (
                          <Badge className="w-full bg-green-600 text-white text-xs">
                            🌍 Active Background Media
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="video">
                {mediaFiles
                  .filter((file) => file.type === 'video')
                  .map((file) => (
                    <Card key={file.id} className="bg-muted/20 border-green-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Video className="h-5 w-5 text-blue-400" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{file.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {file.format}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 mb-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => playMedia(file.id)}
                            className="flex-1"
                          >
                            {currentlyPlaying === file.id ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant={activeBackgroundMedia === file.id ? "default" : "outline"}
                            onClick={() => setAsBackgroundMedia(file.id)}
                            className="flex-1"
                          >
                            <Settings className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMedia(file.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>

                        {activeBackgroundMedia === file.id && (
                          <Badge className="w-full bg-green-600 text-white text-xs">
                            🌍 Active Background Media
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Hidden Media Players */}
      <audio ref={audioRef} onEnded={() => setCurrentlyPlaying(null)} />
      <video ref={videoRef} onEnded={() => setCurrentlyPlaying(null)} className="hidden" />
    </div>
  )
}
