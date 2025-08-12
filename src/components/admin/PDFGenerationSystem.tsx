
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  Clock,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

interface PDFDocument {
  id: string
  name: string
  category: string
  status: 'generated' | 'updating' | 'error'
  lastUpdated: string
  size: string
  downloadCount: number
}

export function PDFGenerationSystem() {
  const [documents, setDocuments] = useState<PDFDocument[]>([
    {
      id: '1',
      name: 'GAIA Whitepaper v2.0',
      category: 'Technical',
      status: 'generated',
      lastUpdated: '2 hours ago',
      size: '2.4 MB',
      downloadCount: 1247
    },
    {
      id: '2',
      name: 'Exchange Integration Guide',
      category: 'Business',
      status: 'updating',
      lastUpdated: '5 minutes ago',
      size: '1.8 MB',
      downloadCount: 892
    },
    {
      id: '3',
      name: 'Environmental Impact Report',
      category: 'Environmental',
      status: 'generated',
      lastUpdated: '1 hour ago',
      size: '3.2 MB',
      downloadCount: 2156
    },
    {
      id: '4',
      name: 'Legal Compliance Documentation',
      category: 'Legal',
      status: 'generated',
      lastUpdated: '3 hours ago',
      size: '4.1 MB',
      downloadCount: 567
    },
    {
      id: '5',
      name: 'Marketing Strategy Blueprint',
      category: 'Marketing',
      status: 'error',
      lastUpdated: '12 hours ago',
      size: '0 MB',
      downloadCount: 0
    },
    {
      id: '6',
      name: 'Security Audit Report',
      category: 'Security',
      status: 'generated',
      lastUpdated: '30 minutes ago',
      size: '2.7 MB',
      downloadCount: 834
    }
  ])

  const [isGeneratingAll, setIsGeneratingAll] = useState(false)
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true)

  useEffect(() => {
    if (!autoUpdateEnabled) return

    const interval = setInterval(() => {
      // Simulate document updates
      setDocuments(prev => prev.map(doc => {
        if (Math.random() < 0.1) { // 10% chance to update
          return {
            ...doc,
            lastUpdated: 'Just now',
            downloadCount: doc.downloadCount + Math.floor(Math.random() * 5)
          }
        }
        return doc
      }))
    }, 10000) // Every 10 seconds

    return () => clearInterval(interval)
  }, [autoUpdateEnabled])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'generated':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'updating':
        return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated':
        return 'bg-green-600'
      case 'updating':
        return 'bg-blue-600'
      case 'error':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical':
        return 'bg-purple-600'
      case 'business':
        return 'bg-blue-600'
      case 'environmental':
        return 'bg-green-600'
      case 'legal':
        return 'bg-yellow-600'
      case 'marketing':
        return 'bg-orange-600'
      case 'security':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  const downloadPDF = (document: PDFDocument) => {
    if (document.status === 'error') {
      toast.error('❌ Document has errors and cannot be downloaded')
      return
    }

    toast.success(`📄 Downloading ${document.name}...`)
    setDocuments(prev => prev.map(doc => 
      doc.id === document.id 
        ? { ...doc, downloadCount: doc.downloadCount + 1 }
        : doc
    ))

    // Simulate download
    setTimeout(() => {
      toast.success(`✅ ${document.name} downloaded successfully!`)
    }, 2000)
  }

  const regenerateDocument = (document: PDFDocument) => {
    toast.success(`🔄 Regenerating ${document.name}...`)
    setDocuments(prev => prev.map(doc => 
      doc.id === document.id 
        ? { ...doc, status: 'updating' as const }
        : doc
    ))

    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === document.id 
          ? { 
              ...doc, 
              status: 'generated' as const, 
              lastUpdated: 'Just now',
              size: `${(Math.random() * 3 + 1).toFixed(1)} MB`
            }
          : doc
      ))
      toast.success(`✅ ${document.name} regenerated successfully!`)
    }, 5000)
  }

  const generateAllDocuments = () => {
    setIsGeneratingAll(true)
    toast.success('🚀 Generating all documents...')

    setDocuments(prev => prev.map(doc => ({ ...doc, status: 'updating' as const })))

    setTimeout(() => {
      setDocuments(prev => prev.map(doc => ({
        ...doc,
        status: 'generated' as const,
        lastUpdated: 'Just now',
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`
      })))
      setIsGeneratingAll(false)
      toast.success('✅ All documents generated successfully!')
    }, 8000)
  }

  const totalDocuments = documents.length
  const generatedDocuments = documents.filter(doc => doc.status === 'generated').length
  const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloadCount, 0)

  return (
    <div className="space-y-6">
      {/* PDF System Overview */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <FileText className="h-6 w-6" />
            📚 Automated PDF Generation System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{generatedDocuments}/{totalDocuments}</div>
              <div className="text-sm text-muted-foreground">Documents Ready</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{totalDownloads.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-muted-foreground">Auto Updates</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-sm text-muted-foreground">System Health</div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={generateAllDocuments}
              disabled={isGeneratingAll}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isGeneratingAll ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating All...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate All Documents
                </>
              )}
            </Button>
            
            <Button 
              onClick={() => setAutoUpdateEnabled(!autoUpdateEnabled)}
              variant="outline"
              className={`border-green-500/30 ${autoUpdateEnabled ? 'text-green-400' : 'text-gray-400'}`}
            >
              {autoUpdateEnabled ? '✅ Auto-Update ON' : '⏸️ Auto-Update OFF'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Library */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400">📄 Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="border-gray-600/50 bg-gray-900/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm mb-1">{doc.name}</h4>
                      <Badge className={`${getCategoryColor(doc.category)} text-white text-xs mb-2`}>
                        {doc.category}
                      </Badge>
                    </div>
                    {getStatusIcon(doc.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className={`${getStatusColor(doc.status)} text-white text-xs`}>
                        {doc.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Size</span>
                      <span className="text-blue-400">{doc.size}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Downloads</span>
                      <span className="text-green-400">{doc.downloadCount}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Updated</span>
                      <span className="text-gray-400">{doc.lastUpdated}</span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button 
                        onClick={() => downloadPDF(doc)}
                        disabled={doc.status === 'error'}
                        size="sm" 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      
                      <Button 
                        onClick={() => regenerateDocument(doc)}
                        disabled={doc.status === 'updating'}
                        variant="outline" 
                        size="sm" 
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 text-xs"
                      >
                        <RefreshCw className={`h-3 w-3 ${doc.status === 'updating' ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Statistics */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">📊 Generation Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>System Health</span>
                <span className="text-green-400">100%</span>
              </div>
              <Progress value={100} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Documents Generated Today</span>
                <span className="text-blue-400">24/24</span>
              </div>
              <Progress value={100} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Auto-Update Efficiency</span>
                <span className="text-purple-400">98.5%</span>
              </div>
              <Progress value={98.5} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
