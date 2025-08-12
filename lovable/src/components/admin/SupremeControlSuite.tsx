import { UltimateIntelligenceHub } from "./UltimateIntelligenceHub";
import { GlobalDominationSuite } from "./GlobalDominationSuite";
import { MarketDominationSuite } from "./MarketDominationSuite";
import { QuantumSearchEngine } from "./QuantumSearchEngine";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SupremeControlSuite() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="intelligence" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="intelligence">🧠 Intelligence</TabsTrigger>
          <TabsTrigger value="domination">👑 Domination</TabsTrigger>
          <TabsTrigger value="market">📈 Market Control</TabsTrigger>
          <TabsTrigger value="search">🔮 Quantum Search</TabsTrigger>
        </TabsList>

        <TabsContent value="intelligence" className="space-y-6">
          <UltimateIntelligenceHub />
        </TabsContent>

        <TabsContent value="domination" className="space-y-6">
          <GlobalDominationSuite />
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <MarketDominationSuite />
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <QuantumSearchEngine />
        </TabsContent>
      </Tabs>
    </div>
  );
}
