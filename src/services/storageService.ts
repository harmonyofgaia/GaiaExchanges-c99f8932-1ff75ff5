
import { supabase } from '@/integrations/supabase/client'

export interface StorageFile {
  id: string
  name: string
  size: number
  type: 'image' | 'video' | 'audio' | 'document'
  url: string
  bucket: string
  created_at: string
  metadata?: any
}

export const storageService = {
  // Get all files from a specific bucket
  async getFiles(bucketName: string): Promise<StorageFile[]> {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('', { limit: 100, offset: 0 })

    if (error) {
      console.error('Error fetching files:', error)
      return []
    }

    return data.map(file => ({
      id: file.id || file.name,
      name: file.name,
      size: file.metadata?.size || 0,
      type: this.getFileType(file.name),
      url: supabase.storage.from(bucketName).getPublicUrl(file.name).data.publicUrl,
      bucket: bucketName,
      created_at: file.created_at || new Date().toISOString(),
      metadata: file.metadata
    }))
  },

  // Upload a file to storage
  async uploadFile(bucketName: string, file: File): Promise<{ success: boolean; error?: string }> {
    const fileName = `${Date.now()}-${file.name}`
    
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  },

  // Delete a file from storage
  async deleteFile(bucketName: string, fileName: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([fileName])

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  },

  // Determine file type based on extension
  getFileType(fileName: string): 'image' | 'video' | 'audio' | 'document' {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) return 'image'
    if (['mp4', 'mov', 'avi', 'webm'].includes(ext || '')) return 'video'
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext || '')) return 'audio'
    return 'document'
  }
}
