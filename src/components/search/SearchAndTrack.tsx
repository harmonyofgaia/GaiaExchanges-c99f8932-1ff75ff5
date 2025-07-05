
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Search, Eye, Shield, CheckCircle } from 'lucide-react'
import { SearchInterface } from './SearchInterface'
import { SearchResults } from './SearchResults'
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

  return (
    <Card className="border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Search className="h-6 w-6" />
          🔍 ADVANCED SEARCH & TRACK SYSTEM
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SearchInterface 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isSearching={isSearching}
        />

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

        {isSearching && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Searching across all systems...</span>
              <span>Processing...</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        )}

        <SearchResults 
          results={trackingResults}
          searchQuery={searchQuery}
          isSearching={isSearching}
        />

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
