import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Upload, 
  Music, 
  Image, 
  FileText, 
  Trash2, 
  Play, 
  Pause, 
  Volume2,
  Download,
  Eye,
  Settings
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

export function AdminMediaLibrary() {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [category, setCategory] = useState('general')
  const [isBackgroundMusic, setIsBackgroundMusic] = useState(false)
  
  // Music player state
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch all media files
  const { data: mediaFiles, refetch } = useQuery({
    queryKey: ['admin-media'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_media_library')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    }
  })

  // Audio player effects
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      setIsPlaying(false)
      // Auto-play next track if available
      const musicFiles = mediaFiles?.filter(file => file.is_background_music) || []
      const currentIndex = musicFiles.findIndex(f => f.id === currentTrack?.id)
      if (currentIndex >= 0 && currentIndex < musicFiles.length - 1) {
        playTrack(musicFiles[currentIndex + 1])
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, mediaFiles])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (50MB limit)
      if (file.size > 52428800) {
        toast.error('File size must be under 50MB')
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // Create unique filename
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('admin-media')
        .upload(fileName, selectedFile)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (uploadError) throw uploadError

      // Insert metadata into database
      const { error: dbError } = await supabase
        .from('admin_media_library')
        .insert({
          filename: fileName,
          original_name: selectedFile.name,
          file_type: selectedFile.type.split('/')[0], // 'audio', 'video', 'image', etc.
          file_size: selectedFile.size,
          mime_type: selectedFile.type,
          storage_path: uploadData.path,
          category: category,
          is_background_music: isBackgroundMusic && selectedFile.type.startsWith('audio/')
        })

      if (dbError) throw dbError

      toast.success('🎉 File uploaded successfully!')
      
      // Reset form
      setSelectedFile(null)
      setUploadProgress(0)
      setCategory('general')
      setIsBackgroundMusic(false)
      
      // Refresh data
      refetch()

      // Update persistent audio controls with new playlist
      if (isBackgroundMusic) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('admin-audio-update', {
            detail: { 
              action: 'playlist_update',
              tracks: [...musicFiles, { 
                id: Date.now(), 
                original_name: selectedFile.name,
                storage_path: uploadData.path 
              }]
            }
          }))
        }, 1000)
      }

    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const deleteFile = async (file: any) => {
    if (!confirm(`Are you sure you want to delete "${file.original_name}"?`)) {
      return
    }

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('admin-media')
        .remove([file.storage_path])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('admin_media_library')
        .delete()
        .eq('id', file.id)

      if (dbError) throw dbError

      toast.success('File deleted successfully')
      refetch()

      // Stop playing if it's the current track
      if (currentTrack?.id === file.id) {
        setCurrentTrack(null)
        setIsPlaying(false)
        if (audioRef.current) {
          audioRef.current.pause()
        }
      }

    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete file')
    }
  }

  const playTrack = async (file: any) => {
    if (!file.mime_type.startsWith('audio/')) return

    const audioUrl = supabase.storage.from('admin-media').getPublicUrl(file.storage_path).data.publicUrl

    if (audioRef.current) {
      setCurrentTrack(file)
      audioRef.current.src = audioUrl
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        toast.success(`🎵 Now playing: ${file.original_name}`)
        
        // Broadcast to persistent audio controls
        window.dispatchEvent(new CustomEvent('admin-audio-update', {
          detail: { 
            track: file, 
            action: 'play',
            tracks: musicFiles 
          }
        }))
      } catch (error) {
        console.error('Play error:', error)
        toast.error('Failed to play audio file')
      }
    }
  }

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('Play error:', error)
          toast.error('Failed to play audio')
        }
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'audio': return Music
      case 'image': return Image
      case 'video': return Play
      default: return FileText
    }
  }

  const musicFiles = mediaFiles?.filter(file => file.is_background_music) || []
  const otherFiles = mediaFiles?.filter(file => !file.is_background_music) || []

  return (
    <div className="space-y-6">
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Music Player */}
      {currentTrack && (
        <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Music className="h-6 w-6" />
              🎵 Admin Music Player
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium">{currentTrack.original_name}</h3>
                <p className="text-sm text-muted-foreground">Background Music</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs">{formatTime(currentTime)}</span>
                <Progress
                  value={audioRef.current?.duration ? (currentTime / audioRef.current.duration) * 100 : 0}
                  className="w-32"
                />
                <span className="text-xs">
                  {audioRef.current?.duration ? formatTime(audioRef.current.duration) : '0:00'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Media</TabsTrigger>
          <TabsTrigger value="music">Background Music</TabsTrigger>
          <TabsTrigger value="library">Media Library</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Upload className="h-6 w-6" />
                Upload New Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileSelect}
                  accept="audio/*,video/*,image/*,application/pdf,text/plain"
                  className="bg-black/40 border-green-500/30"
                />
                <p className="text-xs text-muted-foreground">
                  Supported: Audio, Video, Images, PDF, Text (Max 50MB)
                </p>
              </div>

              {selectedFile && (
                <div className="p-4 bg-green-900/30 rounded-lg">
                  <p className="text-green-400">Selected: {selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 bg-black/40 border border-green-500/30 rounded-md"
                  >
                    <option value="general">General</option>
                    <option value="music">Music</option>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="document">Document</option>
                  </select>
                </div>

                {selectedFile?.type.startsWith('audio/') && (
                  <div className="space-y-2">
                    <Label>Background Music</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        checked={isBackgroundMusic}
                        onChange={(e) => setIsBackgroundMusic(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Use as background music</span>
                    </div>
                  </div>
                )}
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {uploading ? 'Uploading...' : 'Upload Media File'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="music">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Music className="h-6 w-6" />
                Background Music Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              {musicFiles.length > 0 ? (
                <div className="space-y-2">
                  {musicFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                        currentTrack?.id === file.id
                          ? 'bg-purple-900/40 border border-purple-500/30'
                          : 'bg-black/20 hover:bg-black/40'
                      }`}
                      onClick={() => playTrack(file)}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 bg-purple-600 text-white"
                      >
                        {currentTrack?.id === file.id && isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <div className="flex-1">
                        <h3 className="font-medium">{file.original_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {(file.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      
                      <Badge className="bg-purple-600">Background Music</Badge>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteFile(file)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No background music uploaded yet. Upload audio files and mark them as background music.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Settings className="h-6 w-6" />
                Complete Media Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              {otherFiles.length > 0 ? (
                <div className="grid gap-4">
                  {otherFiles.map((file) => {
                    const IconComponent = getFileIcon(file.file_type)
                    return (
                      <div key={file.id} className="flex items-center gap-4 p-4 bg-black/20 rounded-lg">
                        <IconComponent className="h-8 w-8 text-blue-400" />
                        
                        <div className="flex-1">
                          <h3 className="font-medium">{file.original_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {file.category} • {(file.file_size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{file.file_type}</Badge>
                          
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteFile(file)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No media files uploaded yet. Use the upload tab to add files.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
