
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, File, Music, Video, Image, Trash2, Download, Play, Pause } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface MediaFile {
  id: string
  filename: string
  original_name: string
  file_type: string
  file_size: number
  mime_type: string
  storage_path: string
  category: string
  tags: string[]
  is_background_music: boolean
  is_active: boolean
  created_at: string
  metadata: any
}

export function AdminMediaLibrary() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', 'audio', 'video', 'image', 'document', 'background_music']

  useEffect(() => {
    loadMediaFiles()
  }, [])

  const loadMediaFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_media_library')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMediaFiles(data || [])
    } catch (error) {
      console.error('Error loading media files:', error)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        // Generate unique filename
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 15)
        const fileExtension = file.name.split('.').pop()
        const filename = `${timestamp}_${randomString}.${fileExtension}`
        const filePath = `admin/${filename}`

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('admin-media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw uploadError

        // Get file category
        const fileType = file.type.split('/')[0]
        let category = 'document'
        if (fileType === 'audio') category = 'audio'
        else if (fileType === 'video') category = 'video'
        else if (fileType === 'image') category = 'image'

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('admin_media_library')
          .insert({
            filename,
            original_name: file.name,
            file_type: fileType,
            file_size: file.size,
            mime_type: file.type,
            storage_path: filePath,
            category,
            tags: [],
            is_background_music: false,
            is_active: true,
            metadata: {
              uploaded_at: new Date().toISOString(),
              file_extension: fileExtension
            }
          })

        if (dbError) throw dbError

        // Update progress
        setUploadProgress(((i + 1) / files.length) * 100)
      } catch (error) {
        console.error('Error uploading file:', error)
        toast.error(`Failed to upload ${file.name}`)
      }
    }

    setUploading(false)
    loadMediaFiles()
    toast.success(`Successfully uploaded ${files.length} file(s)`)
  }

  const setBackgroundMusic = async (fileId: string) => {
    try {
      // First, unset all current background music
      await supabase
        .from('admin_media_library')
        .update({ is_background_music: false })
        .eq('is_background_music', true)

      // Set the selected file as background music
      const { error } = await supabase
        .from('admin_media_library')
        .update({ is_background_music: true })
        .eq('id', fileId)

      if (error) throw error

      const selectedFile = mediaFiles.find(f => f.id === fileId)
      if (selectedFile) {
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('admin-media')
          .getPublicUrl(selectedFile.storage_path)

        // Store in localStorage for the background music player
        localStorage.setItem('activeBackgroundMedia', fileId)
        localStorage.setItem('activeBackgroundMediaData', JSON.stringify({
          id: fileId,
          name: selectedFile.original_name,
          type: 'audio',
          format: selectedFile.file_type,
          size: selectedFile.file_size,
          url: urlData.publicUrl,
          uploadDate: new Date(selectedFile.created_at),
          isActive: true
        }))

        // Trigger custom event to update background music player
        window.dispatchEvent(new Event('backgroundMediaUpdated'))
      }

      loadMediaFiles()
      toast.success('Background music updated successfully')
    } catch (error) {
      console.error('Error setting background music:', error)
      toast.error('Failed to set background music')
    }
  }

  const deleteFile = async (fileId: string, storagePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('admin-media')
        .remove([storagePath])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('admin_media_library')
        .delete()
        .eq('id', fileId)

      if (dbError) throw dbError

      loadMediaFiles()
      toast.success('File deleted successfully')
    } catch (error) {
      console.error('Error deleting file:', error)
      toast.error('Failed to delete file')
    }
  }

  const downloadFile = async (storagePath: string, originalName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('admin-media')
        .download(storagePath)

      if (error) throw error

      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = originalName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
      toast.error('Failed to download file')
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'audio': return <Music className="h-5 w-5 text-purple-400" />
      case 'video': return <Video className="h-5 w-5 text-blue-400" />
      case 'image': return <Image className="h-5 w-5 text-green-400" />
      default: return <File className="h-5 w-5 text-gray-400" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredFiles = mediaFiles.filter(file => {
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'background_music' ? file.is_background_music : file.category === selectedCategory)
    const matchesSearch = file.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Upload className="h-5 w-5" />
          📁 ADMIN MEDIA LIBRARY - STORAGE CENTER
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-900/10">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">📤 File Upload Center</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                disabled={uploading}
                className="bg-purple-900/20 border-purple-500/30"
                accept="audio/*,video/*,image/*,.pdf,.txt,.doc,.docx"
              />
              <Button
                onClick={() => document.querySelector('input[type="file"]')?.click()}
                disabled={uploading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select Files
              </Button>
            </div>
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress.toFixed(0)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="🔍 Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs bg-purple-900/20 border-purple-500/30"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-lg bg-purple-900/20 border border-purple-500/30 text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? '📂 All Files' : 
                 category === 'background_music' ? '🎵 Background Music' :
                 `📁 ${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </option>
            ))}
          </select>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="border-gray-700 bg-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  {getFileIcon(file.file_type)}
                  <div className="flex gap-1">
                    {file.is_background_music && (
                      <Badge className="bg-green-600 text-white text-xs">
                        🎵 ACTIVE BG
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {file.category.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <h4 className="font-medium text-white mb-2 truncate" title={file.original_name}>
                  {file.original_name}
                </h4>
                
                <div className="text-sm text-gray-400 space-y-1">
                  <div>📏 {formatFileSize(file.file_size)}</div>
                  <div>📅 {new Date(file.created_at).toLocaleDateString()}</div>
                  <div>🏷️ {file.mime_type}</div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadFile(file.storage_path, file.original_name)}
                    className="flex-1"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  
                  {file.file_type === 'audio' && (
                    <Button
                      size="sm"
                      onClick={() => setBackgroundMusic(file.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={file.is_background_music}
                    >
                      <Music className="h-3 w-3" />
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteFile(file.id, file.storage_path)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No files found. Upload some files to get started!</p>
          </div>
        )}

        {/* Storage Stats */}
        <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-3">📊 Storage Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">{mediaFiles.length}</div>
              <div className="text-sm text-gray-400">Total Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {mediaFiles.filter(f => f.file_type === 'audio').length}
              </div>
              <div className="text-sm text-gray-400">Audio Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {mediaFiles.filter(f => f.file_type === 'video').length}
              </div>
              <div className="text-sm text-gray-400">Video Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {formatFileSize(mediaFiles.reduce((sum, f) => sum + f.file_size, 0))}
              </div>
              <div className="text-sm text-gray-400">Total Size</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
