
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/integrations/supabase/client'
import { 
  Upload, 
  File, 
  Music, 
  Video, 
  Image, 
  FileText, 
  Trash2, 
  Download, 
  Play,
  Pause,
  Search,
  Filter,
  Database
} from 'lucide-react'
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
  const [files, setFiles] = useState<MediaFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

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
      setFiles(data || [])
    } catch (error) {
      console.error('Error loading media files:', error)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('admin-media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Save file metadata to database
      const { error: dbError } = await supabase
        .from('admin_media_library')
        .insert({
          filename: fileName,
          original_name: file.name,
          file_type: file.type.split('/')[0],
          file_size: file.size,
          mime_type: file.type,
          storage_path: filePath,
          category: 'general',
          tags: [],
          is_background_music: file.type.startsWith('audio/'),
          is_active: true
        })

      if (dbError) throw dbError

      toast.success('File uploaded successfully!')
      loadMediaFiles()
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload file')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
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

      toast.success('File deleted successfully!')
      loadMediaFiles()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete file')
    }
  }

  const getFileIcon = (fileType: string, mimeType: string) => {
    switch (fileType) {
      case 'audio': return <Music className="h-4 w-4 text-green-400" />
      case 'video': return <Video className="h-4 w-4 text-blue-400" />
      case 'image': return <Image className="h-4 w-4 text-purple-400" />
      case 'text': return <FileText className="h-4 w-4 text-yellow-400" />
      default: return <File className="h-4 w-4 text-gray-400" />
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Database className="h-6 w-6" />
            📁 ADMIN MEDIA STORAGE CENTER
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-blue-500/30 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Upload Files</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here or click to browse
            </p>
            <Input
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="max-w-xs mx-auto"
              accept="audio/*,video/*,image/*,.pdf,.txt,.doc,.docx"
            />
            {isUploading && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                <p className="text-sm text-blue-400 mt-2">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/30 border-blue-500/30"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 bg-black/30 border-blue-500/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="images">Images</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="bg-black/30 border-gray-600/30 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.file_type, file.mime_type)}
                      <span className="font-medium text-white truncate flex-1">
                        {file.original_name}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-1 h-6 w-6 border-green-500/30 text-green-400"
                        onClick={() => {
                          const url = supabase.storage.from('admin-media').getPublicUrl(file.storage_path).data.publicUrl
                          window.open(url, '_blank')
                        }}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-1 h-6 w-6 border-red-500/30 text-red-400"
                        onClick={() => deleteFile(file.id, file.storage_path)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="text-blue-400">{formatFileSize(file.file_size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge className="bg-purple-600 text-xs">{file.file_type.toUpperCase()}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge className="bg-blue-600 text-xs">{file.category}</Badge>
                    </div>
                    {file.is_background_music && (
                      <Badge className="bg-green-600 text-xs w-full justify-center">
                        Background Music
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400">No files found</h3>
              <p className="text-muted-foreground">Upload some files to get started</p>
            </div>
          )}

          {/* Statistics */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{files.length}</div>
                  <div className="text-sm text-muted-foreground">Total Files</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {files.filter(f => f.file_type === 'audio').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Audio Files</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {files.filter(f => f.file_type === 'video').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Video Files</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {formatFileSize(files.reduce((acc, f) => acc + f.file_size, 0))}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Size</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
