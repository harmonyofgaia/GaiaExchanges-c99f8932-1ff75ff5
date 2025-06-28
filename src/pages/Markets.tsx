
import { GaiasExchange } from '@/components/GaiasExchange'
import { InvestorScoutingSystem } from '@/components/InvestorScoutingSystem'
import { FullyFunctionalExchange } from '@/components/FullyFunctionalExchange'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Markets = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="exchange" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exchange">Live Exchange</TabsTrigger>
          <TabsTrigger value="investors">Investor Scouting</TabsTrigger>
          <TabsTrigger value="platform">Full Platform</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exchange" className="space-y-6">
          <FullyFunctionalExchange />
        </TabsContent>
        
        <TabsContent value="investors" className="space-y-6">
          <InvestorScoutingSystem />
        </TabsContent>
        
        <TabsContent value="platform" className="space-y-6">
          <GaiasExchange />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Markets
