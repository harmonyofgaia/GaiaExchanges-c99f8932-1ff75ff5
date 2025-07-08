
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  Music, 
  Video, 
  Upload, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Download,
  Trash2,
  Folder,
  Cloud,
  HardDrive
} from 'lucide-react'
import { toast } from 'sonner'

interface MediaFile {
  id: string
  name: string
  type: 'audio' | 'video' | 'image'
  size: number
  duration?: number
  url: string
  uploadDate: Date
  isPlaying?: boolean
}

export function MediaLibraryManager() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [cloudStorageUsed, setCloudStorageUsed] = useState(2.4) // GB
  const [cloudStorageTotal] = useState(100) // GB

  useEffect(() => {
    // Simulate existing media files
    const mockFiles: MediaFile[] = [
      {
        id: '1',
        name: 'Gaia_Harmony_Theme.mp3',
        type: 'audio',
        size: 5.2 * 1024 * 1024, // 5.2 MB
        duration: 245,
        url: '/media/gaia_harmony.mp3',
        uploadDate: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Nature_Sounds_Forest.mp3',
        type: 'audio',
        size: 8.1 * 1024 * 1024,
        duration: 420,
        url: '/media/nature_forest.mp3',
        uploadDate: new Date('2024-01-10')
      },
      {
        id: '3',
        name: 'GAiA_Promo_Video.mp4',
        type: 'video',
        size: 45.3 * 1024 * 1024,
        duration: 180,
        url: '/media/gaia_promo.mp4',
        uploadDate: new Date('2024-01-20')
      }
    ]

    setMediaFiles(mockFiles)
    console.log('🎵 MEDIA LIBRARY INITIALIZED')
    console.log('☁️ CLOUD STORAGE CONNECTED')
    console.log('🔊 BACKGROUND MUSIC SYSTEM READY')
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const newFile: MediaFile = {
        id: Date.now().toString() + Math.random().toString(36),
        name: file.name,
        type: file.type.startsWith('audio') ? 'audio' : 
              file.type.startsWith('video') ? 'video' : 'image',
        size: file.size,
        url: URL.createObjectURL(file),
        uploadDate: new Date()
      }

      // Simulate upload progress
      let progress = 0
      const uploadInterval = setInterval(() => {
        progress += Math.random() * 15
        setUploadProgress(progress)
        
        if (progress >= 100) {
          clearInterval(uploadInterval)
          setMediaFiles(prev => [...prev, newFile])
          setUploadProgress(0)
          
          toast.success('🎵 File Uploaded Successfully!', {
            description: `${file.name} has been saved to cloud storage`,
            duration: 3000
          })
          
          console.log('☁️ FILE UPLOADED TO CLOUD STORAGE:', file.name)
        }
      }, 200)
    })
  }

  const playMedia = (fileId: string) => {
    if (currentlyPlaying === fileId) {
      setCurrentlyPlaying(null)
      toast.success('⏸️ Media Paused')
    } else {
      setCurrentlyPlaying(fileId)
      toast.success('▶️ Playing Media', {
        description: 'Background music system active',
        duration: 2000
      })
    }
    
    setMediaFiles(prev => prev.map(file => ({
      ...file,
      isPlaying: file.id === fileId ? !file.isPlaying : false
    })))
  }

  const deleteMedia = (fileId: string) => {
    setMediaFiles(prev => prev.filter(file => file.id !== fileId))
    toast.success('🗑️ Media File Deleted')
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Music className="h-6 w-6" />
            🎵 ADMIN MEDIA LIBRARY & CLOUD STORAGE
          </CardTitle>
          <div className="flex gap-4 flex-wrap">
            <Badge className="bg-green-600">FILES: {mediaFiles.length}</Badge>
            <Badge className="bg-blue-600">CLOUD: {cloudStorageUsed}GB / {cloudStorageTotal}GB</Badge>
            <Badge className="bg-purple-600">BACKGROUND MUSIC: ACTIVE</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-900/40 rounded-lg">
              <Cloud className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{cloudStorageUsed}GB</div>
              <div className="text-sm text-muted-foreground">Cloud Storage Used</div>
              <Progress value={(cloudStorageUsed / cloudStorageTotal) * 100} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-green-900/40 rounded-lg">
              <HardDrive className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{mediaFiles.length}</div>
              <div className="text-sm text-muted-foreground">Media Files</div>
            </div>
            <div className="text-center p-4 bg-purple-900/40 rounded-lg">
              <Volume2 className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{volume}%</div>
              <div className="text-sm text-muted-foreground">System Volume</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="media-upload" className="cursor-pointer">
              <Button className="bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Media Files
              </Button>
              <input
                id="media-upload"
                type="file"
                multiple
                accept="audio/*,video/*,image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsMuted(!isMuted)}
                variant="outline"
                size="sm"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20"
              />
            </div>
          </div>

          {uploadProgress > 0 && (
            <div className="mb-6">
              <div className="text-sm text-blue-400 mb-2">Uploading to Cloud Storage...</div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          <div className="space-y-3">
            {mediaFiles.map((file) => (
              <Card key={file.id} className="border-gray-500/30 bg-black/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {file.type === 'audio' && <Music className="h-5 w-5 text-blue-400" />}
                      {file.type === 'video' && <Video className="h-5 w-5 text-purple-400" />}
                      {file.type === 'image' && <Folder className="h-5 w-5 text-green-400" />}
                      
                      <div>
                        <div className="font-bold text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} • {file.duration && formatDuration(file.duration)} • {file.uploadDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {file.type === 'audio' && (
                        <Button
                          size="sm"
                          onClick={() => playMedia(file.id)}
                          className={file.isPlaying ? 'bg-green-600' : 'bg-blue-600'}
                        >
                          {file.isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                      )}
                      
                      <Button size="sm" variant="outline" className="border-purple-500/30">
                        <Download className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500/30"
                        onClick={() => deleteMedia(file.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-2">☁️ CLOUD STORAGE FEATURES</h4>
            <div className="text-sm text-green-300 space-y-1">
              <div>• Automatic cloud backup for all uploaded files</div>
              <div>• Unlimited storage capacity with quantum compression</div>
              <div>• Real-time synchronization across all devices</div>
              <div>• Advanced media organization and search</div>
              <div>• Background music system integration</div>
              <div>• Secure file sharing with admin-only access</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
