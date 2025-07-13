
import { QuantumSearchEngine } from './QuantumSearchEngine'
import { MarketDominationSuite } from './MarketDominationSuite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function SupremeControlSuite() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">🔮 Quantum Search</TabsTrigger>
          <TabsTrigger value="domination">👑 Market Domination</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <QuantumSearchEngine />
        </TabsContent>

        <TabsContent value="domination" className="space-y-6">
          <MarketDominationSuite />
        </TabsContent>
      </Tabs>
    </div>
  )
}
