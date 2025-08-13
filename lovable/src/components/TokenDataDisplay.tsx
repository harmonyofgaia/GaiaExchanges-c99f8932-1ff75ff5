import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useGaiaTokenData } from "@/hooks/useGaiaTokenData";
import { GAIA_TOKEN } from "@/constants/gaia";

interface TokenDataDisplayProps {
  showFullDetails?: boolean;
  autoRefresh?: boolean;
}

export function TokenDataDisplay({
  showFullDetails = false,
  autoRefresh = true,
}: TokenDataDisplayProps) {
  const { tokenData, isLoading, error, refetch, hasRealData } =
    useGaiaTokenData(autoRefresh);

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank", "noopener,noreferrer");
  };

  if (isLoading && !tokenData) {
    return (
      <Card className="border-yellow-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Loading GAIA token data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !tokenData || !hasRealData) {
    return (
      <Card className="border-red-500/30 bg-red-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <XCircle className="h-5 w-5" />
            GAIA Token Data Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-500/30 bg-orange-900/10">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-300">
              {error ||
                tokenData?.error ||
                "Unable to fetch live GAIA token data"}
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm">
            <div>
              <strong>Contract:</strong>{" "}
              <code className="text-blue-400">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
            </div>
            <div>
              <strong>Wallet:</strong>{" "}
              <code className="text-blue-400">{GAIA_TOKEN.WALLET_ADDRESS}</code>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={refetch}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Retry
            </Button>
            <Button onClick={openPumpFun} size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Pump.fun
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-500/30 bg-green-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <CheckCircle className="h-5 w-5" />
          Live GAIA Token Data
          <Badge className="bg-green-600 text-white">LIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="text-xl font-bold text-green-400">
              ${tokenData.price.toFixed(6)}
            </div>
            <div
              className={`text-xs ${tokenData.priceChange24h >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {tokenData.priceChange24h >= 0 ? "+" : ""}
              {tokenData.priceChange24h.toFixed(2)}%
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="text-xl font-bold text-blue-400">
              ${tokenData.marketCap.toLocaleString()}
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">24h Volume</div>
            <div className="text-xl font-bold text-purple-400">
              ${tokenData.volume24h.toLocaleString()}
            </div>
          </div>
        </div>

        {showFullDetails && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
            <div>
              <div className="text-sm text-muted-foreground">Holders</div>
              <div className="text-lg font-bold">
                {tokenData.holders.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Transactions</div>
              <div className="text-lg font-bold">
                {tokenData.transactions24h.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            Updated: {new Date(tokenData.lastUpdated).toLocaleTimeString()}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={refetch}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button onClick={openPumpFun} size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Pump.fun
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
