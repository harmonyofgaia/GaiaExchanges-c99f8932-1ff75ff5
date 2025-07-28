
import React, { createContext, useContext, useState, useEffect } from 'react'

interface StorageFile {
  id: string
  name: string
  size: number
  type: 'image' | 'video' | 'audio' | 'document'
  url: string
  bucket: string
  created_at: string
  metadata?: any
}

interface StorageContextType {
  files: StorageFile[]
  setFiles: (files: StorageFile[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  refreshFiles: () => void
}

const StorageContext = createContext<StorageContextType | undefined>(undefined)

export const useStorage = () => {
  const context = useContext(StorageContext)
  if (context === undefined) {
    throw new Error('useStorage must be used within a StorageProvider')
  }
  return context
}

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<StorageFile[]>([])
  const [loading, setLoading] = useState(false)

  const refreshFiles = () => {
    // This will be used to refresh files from storage
    setLoading(true)
    // Implementation will be added when needed
    setTimeout(() => setLoading(false), 1000)
  }

  const value = {
    files,
    setFiles,
    loading,
    setLoading,
    refreshFiles
  }

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  )
}
