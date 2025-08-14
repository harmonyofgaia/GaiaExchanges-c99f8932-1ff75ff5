import { UniversalMarketplace } from "@/components/marketplace/UniversalMarketplace";

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🏪 GAiA MARKETPLACE ECOSYSTEM
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Gaming Items • Eco Products • Digital Assets • Cross-Platform Compatible
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <div className="bg-green-600 px-4 py-2 rounded-lg">
              <span className="text-white font-bold">500+ Items</span>
            </div>
            <div className="bg-blue-600 px-4 py-2 rounded-lg">
              <span className="text-white font-bold">Real Impact</span>
            </div>
            <div className="bg-purple-600 px-4 py-2 rounded-lg">
              <span className="text-white font-bold">GAiA Powered</span>
            </div>
          </div>
        </div>

        <UniversalMarketplace />
      </div>
    </div>
  );
}
