
import { CommunityDocumentGenerator } from '@/components/CommunityDocumentGenerator'
import { EnhancedMultiExchangeSystem } from '@/components/EnhancedMultiExchangeSystem'
import { WorkingDownloadLinks } from '@/components/downloads/WorkingDownloadLinks'
import { InvestorOutreachSystem } from '@/components/marketing/InvestorOutreachSystem'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const EnhancedDownloads = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-emerald-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            COMMUNITY RESOURCES & GLOBAL DOMINATION
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Generate documents, dominate exchanges, accelerate growth & download apps
          </p>
          <p className="text-sm text-green-400 mt-2">
            🌍 Breaking all barriers • 100X faster growth • Maximum security • Lions + Dolphins Power
          </p>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="documents" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              📄 Community Documents
            </TabsTrigger>
            <TabsTrigger value="exchanges" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🌍 Global Exchange Listings
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🚀 Marketing & Investors
            </TabsTrigger>
            <TabsTrigger value="downloads" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              📱 App Downloads
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="space-y-6 mt-6">
            <CommunityDocumentGenerator />
          </TabsContent>
          
          <TabsContent value="exchanges" className="space-y-6 mt-6">
            <EnhancedMultiExchangeSystem />
          </TabsContent>
          
          <TabsContent value="marketing" className="space-y-6 mt-6">
            <InvestorOutreachSystem />
          </TabsContent>
          
          <TabsContent value="downloads" className="space-y-6 mt-6">
            <WorkingDownloadLinks />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default EnhancedDownloads
