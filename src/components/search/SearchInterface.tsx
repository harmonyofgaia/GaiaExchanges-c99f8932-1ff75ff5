
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface SearchInterfaceProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: () => void
  isSearching: boolean
}

export function SearchInterface({ searchQuery, setSearchQuery, handleSearch, isSearching }: SearchInterfaceProps) {
  return (
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
  )
}
