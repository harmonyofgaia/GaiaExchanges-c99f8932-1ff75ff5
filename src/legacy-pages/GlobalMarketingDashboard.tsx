import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobalMarketingEngine } from "@/components/marketing/GlobalMarketingEngine";
import { GlobalSEOOptimizer } from "@/components/seo/GlobalSEOOptimizer";
import { InvestorAcquisitionSystem } from "@/components/investor/InvestorAcquisitionSystem";
import { AppStoreLinks } from "@/components/AppStoreLinks";

const GlobalMarketingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gold-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            🚀 Global Marketing & Investor Acquisition
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Making Culture of Harmony #1 Worldwide - Finding 20 Investors × €100 in 1 Hour
          </p>
          <p className="text-sm text-green-400 mt-2">
            🌟 "Seeds Will Form Into Music" - Building Path of Global Success Together! 🌟
          </p>
        </div>

        <Tabs defaultValue="marketing" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger
              value="marketing"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              🚀 Global Marketing
            </TabsTrigger>
            <TabsTrigger
              value="investors"
              className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400"
            >
              💰 Investor Hunter
            </TabsTrigger>
            <TabsTrigger
              value="seo"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              🔍 SEO Optimizer
            </TabsTrigger>
            <TabsTrigger
              value="platforms"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              📱 Platform Access
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketing" className="space-y-6 mt-6">
            <GlobalMarketingEngine />
          </TabsContent>

          <TabsContent value="investors" className="space-y-6 mt-6">
            <InvestorAcquisitionSystem />
          </TabsContent>

          <TabsContent value="seo" className="space-y-6 mt-6">
            <GlobalSEOOptimizer />
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6 mt-6">
            <AppStoreLinks />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GlobalMarketingDashboard;
