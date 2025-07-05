
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, CheckCircle, Truck, Package, AlertTriangle } from 'lucide-react'

interface TrackingResult {
  id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  location: string
  timestamp: string
  description: string
}

interface SearchResultsProps {
  results: TrackingResult[]
  searchQuery: string
  isSearching: boolean
}

export function SearchResults({ results, searchQuery, isSearching }: SearchResultsProps) {
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

  if (results.length > 0) {
    return (
      <div className="space-y-4">
        <h4 className="font-bold text-blue-400">🎯 Search Results ({results.length})</h4>
        {results.map((result) => (
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
    )
  }

  if (!isSearching && results.length === 0 && searchQuery) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
        <p className="text-sm text-muted-foreground mt-2">Try a different search term</p>
      </div>
    )
  }

  return null
}
