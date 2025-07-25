import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Upload, Video, FileVideo, Zap, Tags, Globe, Eye, EyeOff, 
  Lock, Heart, Leaf, Music, Gamepad2, Palette, Target, Play
} from 'lucide-react'

interface UploadFile {
  id: string
  file: File
  name: string
  size: number
  progress: number
  status: 'uploading' | 'transcoding' | 'processing' | 'complete' | 'error'
  thumbnail?: string
  duration?: string
}

interface VideoMetadata {
  title: string
  description: string
  tags: string[]
  genre: string
  mood: string
  project: string
  visibility: 'public' | 'unlisted' | 'private'
  greenProject: string
  impactCategory: string
}

export function VideoUploadSystem() {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [currentMetadata, setCurrentMetadata] = useState<VideoMetadata>({
    title: '',
    description: '',
    tags: [],
    genre: '',
    mood: '',
    project: '',
    visibility: 'public',
    greenProject: '',
    impactCategory: ''
  })
  const [newTag, setNewTag] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const genres = [
    'Educational', 'Documentary', 'Music', 'Art', 'Nature', 'Technology', 
    'Lifestyle', 'Tutorial', 'Vlog', 'Environmental', 'Science', 'Travel'
  ]

  const moods = [
    'Inspirational', 'Peaceful', 'Energetic', 'Thoughtful', 'Uplifting', 
    'Meditative', 'Educational', 'Entertaining', 'Motivational', 'Calming'
  ]

  const projects = [
    'Reforestation', 'Ocean Cleanup', 'Renewable Energy', 'Wildlife Conservation', 
    'Sustainable Living', 'Climate Action', 'Biodiversity', 'Clean Water', 
    'Green Technology', 'Community Gardens'
  ]

  const impactCategories = [
    'Carbon Reduction', 'Biodiversity', 'Water Conservation', 'Waste Reduction',
    'Renewable Energy', 'Education', 'Community Building', 'Wildlife Protection'
  ]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter(file => 
      isValidVideoFile(file)
    )
    handleFileUpload(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        isValidVideoFile(file)
      )
      handleFileUpload(files)
    }
  }

  const handleFileUpload = (files: File[]) => {
    const newUploads = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading' as const
    }))

    setUploadFiles(prev => [...prev, ...newUploads])

    // Simulate upload process
    newUploads.forEach(upload => {
      simulateUpload(upload.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (file.progress < 100) {
            return { ...file, progress: file.progress + Math.random() * 10 }
          } else {
            clearInterval(interval)
            // Move to transcoding phase
            setTimeout(() => {
              setUploadFiles(prev => prev.map(f => 
                f.id === fileId ? { ...f, status: 'transcoding' } : f
              ))
              // Then to complete
              setTimeout(() => {
                setUploadFiles(prev => prev.map(f => 
                  f.id === fileId ? { 
                    ...f, 
                    status: 'complete',
                    thumbnail: '/api/placeholder/320/180',
                    duration: '12:34'
                  } : f
                ))
              }, 2000)
            }, 1000)
            return { ...file, progress: 100, status: 'processing' }
          }
        }
        return file
      }))
    }, 100)
  }

  const addTag = () => {
    if (newTag.trim() && !currentMetadata.tags.includes(newTag.trim())) {
      setCurrentMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCurrentMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Upload className="h-8 w-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-blue-400">Seamless Video Upload System</h2>
              <p className="text-blue-300">Drag-and-drop with instant transcoding and environmental impact tagging</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-muted-foreground/25 hover:border-blue-500/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop videos here</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your video files, or click to browse
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <FileVideo className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>Supported formats: MP4, MOV, AVI, MKV (Max 2GB per file)</p>
                <p>Features: Instant transcoding, HD preview, automatic optimization</p>
              </div>
            </CardContent>
          </Card>

          {/* Upload Queue */}
          {uploadFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Upload Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadFiles.map((file) => (
                  <div key={file.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        <span className="font-medium truncate">{file.name}</span>
                        <Badge variant={
                          file.status === 'complete' ? 'default' :
                          file.status === 'error' ? 'destructive' : 'secondary'
                        }>
                          {file.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    
                    {file.status !== 'complete' && (
                      <Progress value={file.progress} className="h-2" />
                    )}

                    {file.status === 'complete' && file.thumbnail && (
                      <div className="flex items-center gap-4 p-3 bg-green-900/20 border border-green-500/30 rounded">
                        <img 
                          src={file.thumbnail} 
                          alt="Video thumbnail"
                          className="w-16 h-9 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-green-600">Ready to Publish</Badge>
                            <span className="text-sm text-muted-foreground">
                              Duration: {file.duration}
                            </span>
                          </div>
                          <p className="text-sm text-green-400">
                            ✅ Transcoding complete • HD preview ready
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Video Metadata */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="h-5 w-5" />
                Video Details & Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="categorization">Tags & Genre</TabsTrigger>
                  <TabsTrigger value="impact">Green Impact</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={currentMetadata.title}
                      onChange={(e) => setCurrentMetadata(prev => ({
                        ...prev,
                        title: e.target.value
                      }))}
                      placeholder="Enter an engaging title..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={currentMetadata.description}
                      onChange={(e) => setCurrentMetadata(prev => ({
                        ...prev,
                        description: e.target.value
                      }))}
                      placeholder="Describe your video and its environmental impact..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Visibility</label>
                    <Select
                      value={currentMetadata.visibility}
                      onValueChange={(value: any) => setCurrentMetadata(prev => ({
                        ...prev,
                        visibility: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Public - Anyone can watch
                          </div>
                        </SelectItem>
                        <SelectItem value="unlisted">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Unlisted - Only with link
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Private - Only you
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="categorization" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Genre</label>
                    <Select
                      value={currentMetadata.genre}
                      onValueChange={(value) => setCurrentMetadata(prev => ({
                        ...prev,
                        genre: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre..." />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map(genre => (
                          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mood</label>
                    <Select
                      value={currentMetadata.mood}
                      onValueChange={(value) => setCurrentMetadata(prev => ({
                        ...prev,
                        mood: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mood..." />
                      </SelectTrigger>
                      <SelectContent>
                        {moods.map(mood => (
                          <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button onClick={addTag} size="sm">Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentMetadata.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-red-600"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="impact" className="space-y-4">
                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-5 w-5 text-green-400" />
                      <h4 className="font-semibold text-green-400">Environmental Impact</h4>
                    </div>
                    <p className="text-sm text-green-300">
                      Dedicate proceeds and impact points to green/social projects instantly
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Green Project</label>
                    <Select
                      value={currentMetadata.greenProject}
                      onValueChange={(value) => setCurrentMetadata(prev => ({
                        ...prev,
                        greenProject: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project to support..." />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project} value={project}>{project}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Impact Category</label>
                    <Select
                      value={currentMetadata.impactCategory}
                      onValueChange={(value) => setCurrentMetadata(prev => ({
                        ...prev,
                        impactCategory: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select impact category..." />
                      </SelectTrigger>
                      <SelectContent>
                        {impactCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Proceed Dedication</span>
                      <Badge className="bg-green-600">100% to Project</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      All earnings from this video will be automatically donated to your selected green project.
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6">
                <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600">
                  <Play className="h-4 w-4 mr-2" />
                  Publish Video
                </Button>
                <Button variant="outline">
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}