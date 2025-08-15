import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenWarfareSystem } from "./games/TokenWarfareSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  Flame,
  Factory,
  TrendingUp,
  Calendar,
  Zap,
  Target,
  Recycle,
  Copy,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from "@/constants/gaia";
import { toast } from "sonner";
export function GaiaCoinCrafter() {
  const [monthlyProgress, setMonthlyProgress] = useState(67);
  const [totalCrafted, setTotalCrafted] = useState(245678);
  const [burnedForReinvestment, setBurnedForReinvestment] = useState(12459);
  const [nextCraftingIn, setNextCraftingIn] = useState(13);
  const [activeTab, setActiveTab] = useState("craft");

  // Auto-update system connected to official token
  useEffect(() => {
    console.log(
      "🏭 GAiA Coin Crafter: Connected to official token address:",
      GAIA_TOKEN.WALLET_ADDRESS
    );
  }, [log]);

  return (
    <div className="space-y-6">
      {/* Official GAiA Token Info */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Coins className="h-6 w-6" />
            🌍 Official GAiA Token - Coin Crafter Connected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Official Wallet Address */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-bold">Official GAiA Wallet:</span>
                <div className="flex gap-2">
                  {/* <Button onClick={copyOfficialWalletAddress} variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button onClick={openOfficialPumpFun} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Charts
                  </Button> */}
                </div>
              </div>
              <code className="text-blue-300 font-mono text-xs break-all block bg-blue-900/10 p-2 rounded">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
            </div>
            {/* Official Contract Address */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-bold">Official GAiA Contract:</span>
                {/* <Button onClick={copyOfficialContractAddress} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button> */}
              </div>
              <code className="text-purple-300 font-mono text-xs break-all block bg-purple-900/10 p-2 rounded">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
            <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
              <div className="text-lg font-bold text-green-400">
                {formatGaiaPrice(GAIA_TOKEN.INITIAL_PRICE)}
              </div>
              <div className="text-muted-foreground">Official GAiA Price</div>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">
                {formatGaiaNumber(GAIA_METRICS.INITIAL_HOLDERS)}
              </div>
              <div className="text-muted-foreground">Official Holders</div>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">
                {formatGaiaPrice(GAIA_METRICS.INITIAL_MARKET_CAP)}
              </div>
              <div className="text-muted-foreground">Official Market Cap</div>
            </div>
            <div className="text-center p-3 bg-yellow-900/20 rounded border border-yellow-500/20">
              <div className="text-lg font-bold text-yellow-400">
                {formatGaiaPrice(GAIA_METRICS.INITIAL_VOLUME)}
              </div>
              <div className="text-muted-foreground">Official Volume 24h</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
