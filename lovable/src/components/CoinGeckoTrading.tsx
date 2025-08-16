import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp } from "lucide-react";
import { GAIA_TOKEN, formatGaiaPrice } from "@/constants/gaia";

interface CoinData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
}

export function CoinGeckoTrading() {
  const [coins, setCoins] = useState<CoinData[]>([
    {
      name: "Harmony of Gaia",
      symbol: "GAiA",
      price: GAIA_TOKEN.INITIAL_PRICE,
      change24h: 5.67,
      volume: 8750000,
      marketCap: 12345678,
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 43250.67,
      change24h: 2.34,
      volume: 15420000000,
      marketCap: 847000000000,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 2543.21,
      change24h: -1.87,
      volume: 8750000000,
      marketCap: 305000000000,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev) =>
        prev.map((coin) => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
          change24h: coin.change24h + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const openCoinGecko = () => {
    window.open("https://www.coingecko.com/en/coins/harmony-of-gaia", "_blank");
  };

  return (
    <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <TrendingUp className="h-6 w-6" />
          CoinGecko Market Data
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            onClick={openCoinGecko}
            variant="outline"
            size="sm"
            className="border-yellow-500/30 text-yellow-400"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View on CoinGecko
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {coins.map((coin, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-500/30 hover:border-yellow-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {coin.symbol === "GAiA" ? (
                    <img
                      src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png"
                      alt="Harmony of Gaia"
                      className="w-8 h-8"
                    />
                  ) : coin.symbol === "BTC" ? (
                    "₿"
                  ) : (
                    "♦️"
                  )}
                </div>
                <div>
                  <div className="font-bold text-white">{coin.name}</div>
                  <div className="text-sm text-gray-400">{coin.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">
                  {coin.symbol === "GAiA"
                    ? formatGaiaPrice(coin.price)
                    : `$${coin.price.toLocaleString()}`}
                </div>
                <Badge
                  className={`${coin.change24h >= 0 ? "bg-green-600" : "bg-red-600"} text-white`}
                >
                  {coin.change24h >= 0 ? "+" : ""}
                  {coin.change24h.toFixed(2)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
