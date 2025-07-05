
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  MapPin, 
  Clock, 
  Package, 
  Truck,
  CheckCircle,
  AlertTriangle,
  Eye,
  Shield
} from 'lucide-react'
import { toast } from 'sonner'

interface TrackingResult {
  id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  location: string
  timestamp: string
  description: string
}

export function SearchAndTrack() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [trackingResults, setTrackingResults] = useState<TrackingResult[]>([])
  const [realtimeUpdates, setRealtimeUpdates] = useState(true)

  useEffect(() => {
    if (realtimeUpdates) {
      const interval = setInterval(() => {
        // Simulate real-time tracking updates
        setTrackingResults(prev => prev.map(result => ({
          ...result,
          timestamp: new Date().toLocaleTimeString()
        })))
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [realtimeUpdates])

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query')
      return
    }

    setIsSearching(true)
    
    try {
      // Simulate comprehensive search
      setTimeout(() => {
        const mockResults: TrackingResult[] = [
          {
            id: 'TX001',
            status: 'delivered',
            location: 'Amsterdam, Netherlands',
            timestamp: new Date().toLocaleTimeString(),
            description: 'GAiA Token transaction completed successfully'
          },
          {
            id: 'VT002',
            status: 'processing',
            location: 'Vault Underground Level 2847m',
            timestamp: new Date().toLocaleTimeString(),
            description: 'Community vault deposit being processed'
          },
          {
            id: 'SEC003',
            status: 'shipped',
            location: 'Quantum Security Matrix',
            timestamp: new Date().toLocaleTimeString(),
            description: 'Security protocol update in transit'
          }
        ]
        
        setTrackingResults(mockResults)
        setIsSearching(false)
        
        toast.success('🔍 Search Complete!', {
          description: `Found ${mockResults.length} results for "${searchQuery}"`,
          duration: 5000
        })
      }, 2000)
    } catch (error) {
      setIsSearching(false)
      toast.error('Search failed - Please try again')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'shipped': return <Truck className="h-4 w-4 text-blue-400" />
      case 'processing': return <Package className="h-4 w-4 text-yellow-400" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-600'
      case 'shipped': return 'bg-blue-600'
      case 'processing': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <Card className="border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Search className="h-6 w-6" />
          🔍 ADVANCED SEARCH & TRACK SYSTEM
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Interface */}
        <div className="flex gap-2">
          <Input
            placeholder="Search transactions, vault deposits, security updates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/30 border-blue-500/30 text-blue-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Search className="h-4 w-4 mr-2" />
            {isSearching ? 'SEARCHING...' : 'SEARCH'}
          </Button>
        </div>

        {/* Real-time Updates Toggle */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setRealtimeUpdates(!realtimeUpdates)}
            variant="outline"
            size="sm"
            className={`border-green-500/30 ${realtimeUpdates ? 'bg-green-900/30 text-green-400' : ''}`}
          >
            <Eye className="h-4 w-4 mr-2" />
            Real-time Updates: {realtimeUpdates ? 'ON' : 'OFF'}
          </Button>
        </div>

        {/* Search Progress */}
        {isSearching && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Searching across all systems...</span>
              <span>Processing...</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        )}

        {/* Results */}
        {trackingResults.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-blue-400">🎯 Search Results ({trackingResults.length})</h4>
            {trackingResults.map((result) => (
              <Card key={result.id} className="border border-border/50 bg-card/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span className="font-medium">ID: {result.id}</span>
                    </div>
                    <Badge className={`${getStatusColor(result.status)} text-white`}>
                      {result.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {result.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {result.timestamp}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isSearching && trackingResults.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            <p className="text-sm text-muted-foreground mt-2">Try a different search term</p>
          </div>
        )}

        {/* System Status */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/30">
          <div className="text-center">
            <Shield className="h-5 w-5 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-green-400">SECURE</p>
          </div>
          <div className="text-center">
            <CheckCircle className="h-5 w-5 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-blue-400">ONLINE</p>
          </div>
          <div className="text-center">
            <Eye className="h-5 w-5 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-purple-400">TRACKING</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
