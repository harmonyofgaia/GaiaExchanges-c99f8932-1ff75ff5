
import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Video, Image, FileText, CheckCircle, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

export function VideoUploadSystem() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    visibility: 'public'
  })

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return
    
    const validFiles = Array.from(files).filter(file => {
      const isVideo = file.type.startsWith('video/')
      const isValidSize = file.size <= 500 * 1024 * 1024 // 500MB limit
      
      if (!isVideo) {
        toast.error(`${file.name} is not a valid video file`)
        return false
      }
      
      if (!isValidSize) {
        toast.error(`${file.name} exceeds 500MB size limit`)
        return false
      }
      
      return true
    })
    
    setUploadedFiles(prev => [...prev, ...validFiles])
    
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} video(s) ready for upload`)
    }
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files)
  }

  const startUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Please select at least one video file')
      return
    }
    
    if (!videoData.title || !videoData.description || !videoData.category) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          toast.success('Video uploaded successfully!')
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Upload className="h-5 w-5" />
            Upload Environmental Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-green-400/50 transition-colors duration-200"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-semibold mb-2">Drag & Drop Your Videos Here</p>
            <p className="text-muted-foreground mb-4">Or click to browse files (Max 500MB each)</p>
            <input
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              id="video-upload"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <Label htmlFor="video-upload">
              <Button variant="outline" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Select Videos
              </Button>
            </Label>
          </div>

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Selected Videos:</h3>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Video Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Video Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your video title"
                  value={videoData.title}
                  onChange={(e) => setVideoData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={videoData.category} onValueChange={(value) => setVideoData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="climate-action">Climate Action</SelectItem>
                    <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                    <SelectItem value="conservation">Conservation</SelectItem>
                    <SelectItem value="sustainable-living">Sustainable Living</SelectItem>
                    <SelectItem value="green-technology">Green Technology</SelectItem>
                    <SelectItem value="environmental-education">Environmental Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="visibility">Visibility</Label>
                <Select value={videoData.visibility} onValueChange={(value) => setVideoData(prev => ({ ...prev, visibility: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your environmental content..."
                  rows={4}
                  value={videoData.description}
                  onChange={(e) => setVideoData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="climate, renewable, sustainability"
                  value={videoData.tags}
                  onChange={(e) => setVideoData(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* Upload Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" disabled={isUploading}>
              Save as Draft
            </Button>
            <Button 
              onClick={startUpload} 
              disabled={isUploading || uploadedFiles.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isUploading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Upload Videos
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Guidelines */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-blue-400">Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-400">Recommended Content</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Environmental education and awareness
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Sustainable lifestyle tips
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Climate action initiatives
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Renewable energy projects
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-yellow-400">Technical Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Maximum file size: 500MB
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Supported formats: MP4, MOV, AVI
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Recommended resolution: 1080p or higher
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Maximum duration: 30 minutes
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
