
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, Download, Plus, CheckCircle, Clock, Search } from 'lucide-react'
import { toast } from 'sonner'

interface DiscoveredContent {
  id: string
  title: string
  source: string
  discovered: string
  status: 'scanning' | 'found' | 'added' | 'reviewing'
  category: string
}

export function AutoDiscoveryService() {
  const [discoveries, setDiscoveries] = useState<DiscoveredContent[]>([])
  const [isScanning, setIsScanning] = useState(false)

  const mockSources = [
    'Archive.org',
    'DocumentaryHeaven',
    'RetroTV Collection',
    'Vintage Music Archives',
    'Classic Car Shows',
    '70s Party Chronicles',
    'Woodstock Archives',
    'Disco Era Collection'
  ]

  const mockDiscoveries = [
    'The Summer of Love - San Francisco 1977',
    'Muscle Cars: The Golden Era',
    'Studio 54: Behind the Velvet Rope',
    'Vinyl Revolution: Record Store Culture',
    'The Last Great American Road Trip',
    'Disco Nights: Dance Floor Memories',
    'Simple Living: Pre-Digital America',
    'Classic Rock Festivals of the 70s'
  ]

  useEffect(() => {
    const scanInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every interval
        const randomTitle = mockDiscoveries[Math.floor(Math.random() * mockDiscoveries.length)]
        const randomSource = mockSources[Math.floor(Math.random() * mockSources.length)]
        
        const newDiscovery: DiscoveredContent = {
          id: Date.now().toString(),
          title: `🎬 ${randomTitle}`,
          source: randomSource,
          discovered: new Date().toLocaleTimeString(),
          status: 'found',
          category: Math.random() > 0.5 ? '70s' : '80s'
        }

        setDiscoveries(prev => [newDiscovery, ...prev.slice(0, 9)]) // Keep last 10
        toast.success(`🔍 New Discovery: ${randomTitle}`)
      }
    }, 45000) // Every 45 seconds

    return () => clearInterval(scanInterval)
  }, [])

  const handleAddContent = (discoveryId: string) => {
    setDiscoveries(prev => prev.map(d => 
      d.id === discoveryId 
        ? { ...d, status: 'added' as const }
        : d
    ))
    toast.success('✅ Content added to streaming library!')
  }

  const startManualScan = () => {
    setIsScanning(true)
    toast.info('🌐 Starting manual web scan...')
    
    setTimeout(() => {
      setIsScanning(false)
      const newDiscoveries = Array(3).fill(null).map((_, i) => ({
        id: `manual-${Date.now()}-${i}`,
        title: `🎬 ${mockDiscoveries[Math.floor(Math.random() * mockDiscoveries.length)]}`,
        source: mockSources[Math.floor(Math.random() * mockSources.length)],
        discovered: new Date().toLocaleTimeString(),
        status: 'found' as const,
        category: Math.random() > 0.5 ? '70s' : '80s'
      }))
      
      setDiscoveries(prev => [...newDiscoveries, ...prev.slice(0, 7)])
      toast.success(`🎯 Manual scan complete! Found ${newDiscoveries.length} new items`)
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scanning': return <Search className="h-4 w-4 animate-spin" />
      case 'found': return <Plus className="h-4 w-4 text-yellow-400" />
      case 'added': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'reviewing': return <Clock className="h-4 w-4 text-blue-400" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-cyan-500/30 bg-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400">🌐 Auto-Discovery Engine</span>
          </div>
          <Button
            onClick={startManualScan}
            disabled={isScanning}
            size="sm"
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {isScanning ? (
              <>
                <Search className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Manual Scan
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground mb-4">
            🔍 Continuously scanning the web for vintage 70s/80s documentaries and content
          </div>
          
          {discoveries.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Discovery engine is active...</p>
              <p className="text-xs">New content will appear here automatically</p>
            </div>
          ) : (
            discoveries.map((discovery) => (
              <div key={discovery.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(discovery.status)}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{discovery.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {discovery.source} • {discovery.discovered}
                    </div>
                  </div>
                  <Badge className={discovery.category === '70s' ? 'bg-purple-600' : 'bg-blue-600'}>
                    {discovery.category}
                  </Badge>
                </div>
                {discovery.status === 'found' && (
                  <Button
                    onClick={() => handleAddContent(discovery.id)}
                    size="sm"
                    className="ml-2 bg-green-600 hover:bg-green-700"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
