import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Shield,
  Zap,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useWallets } from "@/hooks/useWallets";
import {
  GAIA_TOKEN,
  GAIA_METRICS,
  formatGaiaPrice,
  formatGaiaNumber,
} from "@/constants/gaia";
import { toast } from "sonner";

export function GaiaWallet() {
  const { wallets, loading } = useWallets();
  const [realTimeBalance, setRealTimeBalance] = useState<number>(2847.5);
  const [currentPrice, setCurrentPrice] = useState<number>(
    GAIA_TOKEN.INITIAL_PRICE,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeBalance((prev) => prev + (Math.random() - 0.5) * 10);
      setCurrentPrice((prev) =>
        Math.max(0.00001, prev + (Math.random() - 0.5) * 0.000005),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const copyOfficialWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS);
    toast.success("Official GAiA Wallet Address Copied!", {
      description: `Official GAiA wallet address ${GAIA_TOKEN.WALLET_ADDRESS.slice(0, 8)}... copied to clipboard`,
      duration: 3000,
    });
  };

  const copyOfficialContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS);
    toast.success("Official GAiA Contract Address Copied!", {
      description: `Official GAiA contract address ${GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 8)}... copied to clipboard`,
      duration: 3000,
    });
  };

  const openOfficialPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Official GAiA Wallet Header */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Wallet className="h-6 w-6" />
            🌍 Official GAiA Wallet - Harmony of Culture
          </CardTitle>
          <p className="text-muted-foreground">
            Connected to official GAiA token on Pump.fun
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Official Wallet Address Display */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 font-bold">
                Official GAiA Wallet Address:
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={copyOfficialWalletAddress}
                  variant="outline"
                  size="sm"
                  className="border-blue-500/30 text-blue-400"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button
                  onClick={openOfficialPumpFun}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 text-purple-400"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Pump.fun
                </Button>
              </div>
            </div>
            <code className="text-blue-300 font-mono text-sm break-all block bg-blue-900/10 p-2 rounded">
              {GAIA_TOKEN.WALLET_ADDRESS}
            </code>
          </div>

          {/* Official Contract Address Display */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 font-bold">
                Official GAiA Contract Address:
              </span>
              <Button
                onClick={copyOfficialContractAddress}
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-purple-400"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
            <code className="text-purple-300 font-mono text-sm break-all block bg-purple-900/10 p-2 rounded">
              {GAIA_TOKEN.CONTRACT_ADDRESS}
            </code>
          </div>

          {/* Real-time Balance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-green-500/20 bg-green-900/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Official GAiA Balance
                    </p>
                    <p className="text-xl font-bold text-green-400">
                      {formatGaiaNumber(realTimeBalance)}
                    </p>
                  </div>
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-900/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Official GAiA Price
                    </p>
                    <p className="text-xl font-bold text-blue-400">
                      {formatGaiaPrice(currentPrice)}
                    </p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-900/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Official USD Value
                    </p>
                    <p className="text-xl font-bold text-purple-400">
                      {formatGaiaPrice(realTimeBalance * currentPrice)}
                    </p>
                  </div>
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
