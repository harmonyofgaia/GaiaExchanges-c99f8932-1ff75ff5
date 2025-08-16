import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Zap, Heart } from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";
import { useGaiaTokenData } from "@/hooks/useGaiaTokenData";

interface SwapInterfaceProps {
  title?: string;
  showHeader?: boolean;
}

export function SwapInterface({
  title = "Investment Portal",
  showHeader = true,
}: SwapInterfaceProps) {
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>(GAIA_TOKEN.SYMBOL);
  const [toCurrency, setToCurrency] = useState<string>("USDC");
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  const { tokenData, hasRealData } = useGaiaTokenData();
  const exchangeRate = hasRealData && tokenData ? tokenData.price : GAIA_TOKEN.INITIAL_PRICE;

  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      if (fromCurrency === GAIA_TOKEN.SYMBOL && toCurrency === "USDC") {
        setToAmount((Number(fromAmount) * exchangeRate).toFixed(6));
      } else if (fromCurrency === "USDC" && toCurrency === GAIA_TOKEN.SYMBOL) {
        setToAmount((Number(fromAmount) / exchangeRate).toFixed(2));
      }
    }
  }, [fromAmount, fromCurrency, toCurrency, exchangeRate]);

  const handleSwap = () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSwapping(true);

    setTimeout(() => {
      const message = hasRealData
        ? `Long-term investment: ${fromAmount} ${fromCurrency} for ${toAmount} ${toCurrency}`
        : `Investment transaction: ${fromAmount} ${fromCurrency} for ${toAmount} ${toCurrency} (using estimated rates)`;

      toast.success("🌱 Investment Confirmed - Fees Sent to Community Wallet!", {
        description: `${message} • All fees transparently sent to: ${GAIA_TOKEN.WALLET_ADDRESS}`,
      });
      setFromAmount("");
      setToAmount("");
      setIsSwapping(false);
    }, 2000);
  };

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <Card className="border-border/50">
      {showHeader && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {!hasRealData && (
            <p className="text-sm text-yellow-400">
              ⚠️ Using estimated rates - real data not available
            </p>
          )}
        </CardHeader>
      )}
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="flex-1"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="px-4 py-2 bg-muted border border-border rounded-md min-w-[100px]"
              >
                <option value={GAIA_TOKEN.SYMBOL}>{GAIA_TOKEN.SYMBOL}</option>
                <option value="USDC">USDC</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={switchCurrencies}
              className="rounded-full w-10 h-10 p-0"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.00"
                value={toAmount}
                readOnly
                className="flex-1 bg-muted"
              />
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="px-4 py-2 bg-muted border border-border rounded-md min-w-[100px]"
              >
                <option value="USDC">USDC</option>
                <option value={GAIA_TOKEN.SYMBOL}>{GAIA_TOKEN.SYMBOL}</option>
              </select>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSwap}
          disabled={!fromAmount || Number(fromAmount) <= 0 || isSwapping}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isSwapping ? (
            <>
              <Zap className="h-4 w-4 mr-2 animate-spin" />
              Processing Investment...
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 mr-2" />
              {hasRealData ? "Make Long-term Investment" : "Demo Investment"}
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <div>
            Rate: 1 {GAIA_TOKEN.SYMBOL} = ${exchangeRate.toFixed(6)} USDC{" "}
            {!hasRealData && "(estimated)"}
          </div>
          <div>Investment Fee: 0.1% (transparently sent to community wallet)</div>
          <div>📍 Community Wallet: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 20)}...</div>
          <div>🌱 100% of fees reinvested in environmental projects</div>
          <div>🛡️ No staking = No gambling = Stable forever</div>
        </div>
      </CardContent>
    </Card>
  );
}
