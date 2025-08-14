import { SwapInterface } from "./exchange/SwapInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, TrendingUp, Copy } from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";
import { useGaiaTokenData } from "@/hooks/useGaiaTokenData";
import { TokenDataDisplay } from "@/components/TokenDataDisplay";

export function FullyFunctionalExchange() {
  const { tokenData, hasRealData } = useGaiaTokenData();

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS);
    toast.success("Community Wallet Address Copied!", {
      description: "This is where all fees go - 100% transparent",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-6 w-6" />
            🌱 GAiA Investment Exchange - For Believers, Not Traders
          </CardTitle>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-2">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <Shield className="h-5 w-5" />
              🚫 STAKING REMOVED - NO GAMBLING ALLOWED
            </div>
            <p className="text-red-300 text-sm mt-1">
              We permanently removed staking to prevent gambling and ensure long-term stability.
              GAiA is for believers, not speculators.
            </p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-400">
                <strong>🏦 All Fees Go to Community Wallet:</strong>
                <code className="font-mono text-xs block mt-1 break-all">
                  {GAIA_TOKEN.WALLET_ADDRESS}
                </code>
              </div>
              <Button
                onClick={copyWalletAddress}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardContent className="pt-6">
          <h3 className="text-purple-400 font-bold text-xl mb-4 text-center">
            🛡️ STABILITY OVER SPECULATION - COMMUNITY OVER PROFIT
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
              <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-bold text-green-400">For Believers</h4>
              <p className="text-green-300 text-sm">Long-term environmental advocates</p>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-bold text-blue-400">Stable Forever</h4>
              <p className="text-blue-300 text-sm">No gambling, no speculation</p>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
              <TrendingUp className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <h4 className="font-bold text-orange-400">Pure Investment</h4>
              <p className="text-orange-300 text-sm">Environmental impact focus</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TokenDataDisplay showFullDetails={true} />

      <SwapInterface title="Long-term Investment Portal" />
    </div>
  );
}
