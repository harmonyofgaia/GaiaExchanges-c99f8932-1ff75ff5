import { TokenDataDisplay } from "@/components/TokenDataDisplay";
import { GaiaTokenTracker } from "@/components/GaiaTokenTracker";
import { BlockchainStatus } from "@/components/blockchain/BlockchainStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ExternalLink, CheckCircle, Coins, TrendingUp, Users } from "lucide-react";
import { GAIA_TOKEN, GAIA_METRICS } from "@/constants/gaia";
import { useGaiaTokenData } from "@/hooks/useGaiaTokenData";

export default function GaiaTokenStatus() {
  const { tokenData, isLoading, hasRealData } = useGaiaTokenData(true);

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank", "noopener,noreferrer");
  };

  const openWebsite = () => {
    window.open(GAIA_TOKEN.OFFICIAL_WEBSITE, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            GAiA Token Status Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {GAIA_TOKEN.BRAND_STATEMENT}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge className="bg-green-600">🌍 Harmony of Culture</Badge>
            <Badge className="bg-blue-600">🔒 Verified Official</Badge>
            <Badge className="bg-purple-600">⚡ Live Trading</Badge>
          </div>
        </div>

        {/* Official Token Verification */}
        <Card className="border-green-500/30 bg-green-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Shield className="h-6 w-6" />
              Official GAiA Token Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong>Contract Address:</strong>
                  <code className="bg-gray-800 px-2 py-1 rounded text-blue-400 font-mono">
                    {GAIA_TOKEN.CONTRACT_ADDRESS}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong>Main Community Wallet:</strong>
                  <code className="bg-gray-800 px-2 py-1 rounded text-blue-400 font-mono">
                    {GAIA_TOKEN.WALLET_ADDRESS}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong>Green Investments Wallet:</strong>
                  <code className="bg-gray-800 px-2 py-1 rounded text-green-400 font-mono">
                    {GAIA_TOKEN.GREEN_INVESTMENTS_WALLET}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong>Community Vault Wallet:</strong>
                  <code className="bg-gray-800 px-2 py-1 rounded text-purple-400 font-mono">
                    {GAIA_TOKEN.COMMUNITY_VAULT_WALLET}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong>Animal Welfare Wallet:</strong>
                  <code className="bg-gray-800 px-2 py-1 rounded text-orange-400 font-mono">
                    {GAIA_TOKEN.ANIMAL_WELFARE_WALLET}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong>Token Name:</strong> {GAIA_TOKEN.NAME}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong>Symbol:</strong> {GAIA_TOKEN.SYMBOL}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong>Network:</strong> {GAIA_TOKEN.NETWORK}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={openPumpFun} className="bg-orange-600 hover:bg-orange-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Pump.fun
              </Button>
              <Button onClick={openWebsite} variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Website
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Coins className="h-4 w-4" />
                Current Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                ${tokenData?.price?.toFixed(6) || GAIA_METRICS.CURRENT_PRICE.toFixed(6)}
              </div>
              <div className="text-sm text-muted-foreground">
                {hasRealData ? "Live Price" : "Simulated"}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Market Cap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                $
                {tokenData?.marketCap?.toLocaleString() || GAIA_METRICS.MARKET_CAP.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Holders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">
                {tokenData?.holders?.toLocaleString() || GAIA_METRICS.HOLDERS.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Community Size</div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ecosystem Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">
                {GAIA_METRICS.ECOSYSTEM_HEALTH}%
              </div>
              <div className="text-sm text-muted-foreground">System Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Live Token Data Display */}
        <TokenDataDisplay showFullDetails={true} autoRefresh={true} />

        {/* Comprehensive Token Tracker */}
        <GaiaTokenTracker />

        {/* Blockchain Network Status */}
        <BlockchainStatus />

        {/* Environmental Impact Metrics */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-cyan-900/20">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              🌱 Environmental Impact Measurement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <div className="text-2xl font-bold text-green-400">
                  {GAIA_METRICS.CO2_OFFSET_TOTAL}
                </div>
                <div className="text-sm text-muted-foreground">Tons CO2 Offset</div>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {GAIA_TOKEN.TREES_PLANTED_TOTAL.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Trees Planted</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">
                  {GAIA_METRICS.RENEWABLE_ENERGY_PROJECTS}
                </div>
                <div className="text-sm text-muted-foreground">Energy Projects</div>
              </div>
              <div className="text-center p-4 bg-cyan-500/10 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400">
                  ${GAIA_TOKEN.OCEAN_CLEANUP_CONTRIBUTION.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Ocean Cleanup</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Security & Verification */}
        <Card className="border-red-500/30 bg-red-900/10">
          <CardHeader>
            <CardTitle className="text-red-400">⚠️ Security Notice & Official Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-yellow-300 font-semibold">{GAIA_TOKEN.OFFICIAL_DISCLAIMER}</p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">Always Verify Before Trading:</h4>
                <ul className="text-sm text-red-300 space-y-1">
                  <li>• Contract: {GAIA_TOKEN.CONTRACT_ADDRESS}</li>
                  <li>• Wallet: {GAIA_TOKEN.WALLET_ADDRESS}</li>
                  <li>• Official Website: {GAIA_TOKEN.OFFICIAL_WEBSITE}</li>
                  <li>• Only trust verified sources</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
