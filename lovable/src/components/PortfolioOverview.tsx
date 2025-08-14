import { Wallet, TrendingUp, DollarSign, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const portfolioData = {
  totalValue: 125432.67,
  totalChange: 3456.78,
  totalChangePercent: 2.84,
  holdings: [
    {
      symbol: "BTC",
      name: "Bitcoin",
      amount: 2.5634,
      value: 110873.21,
      change: 2.34,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      amount: 45.67,
      value: 116121.43,
      change: -1.87,
    },
    {
      symbol: "ADA",
      name: "Cardano",
      amount: 12500,
      value: 5292.5,
      change: 4.56,
    },
    {
      symbol: "SOL",
      name: "Solana",
      amount: 98.3,
      value: 9712.11,
      change: -3.21,
    },
  ],
};

export function PortfolioOverview() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-green-400";
    if (change < 0) return "text-red-400";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers">
              {formatCurrency(portfolioData.totalValue)}
            </div>
            <div
              className={`text-xs flex items-center gap-1 ${getPriceChangeColor(portfolioData.totalChange)}`}
            >
              <TrendingUp className="h-3 w-3" />+{formatCurrency(portfolioData.totalChange)} (
              {portfolioData.totalChangePercent}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Change</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400 mono-numbers">
              +{portfolioData.totalChangePercent}%
            </div>
            <p className="text-xs text-muted-foreground">Portfolio performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assets</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers">{portfolioData.holdings.length}</div>
            <p className="text-xs text-muted-foreground">Different cryptocurrencies</p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Your Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioData.holdings.map((holding) => {
              const percentage = ((holding.value / portfolioData.totalValue) * 100).toFixed(1);

              return (
                <div
                  key={holding.symbol}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{holding.symbol}</span>
                    </div>
                    <div>
                      <div className="font-medium">{holding.name}</div>
                      <div className="text-sm text-muted-foreground mono-numbers">
                        {holding.amount.toFixed(4)} {holding.symbol}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium mono-numbers">{formatCurrency(holding.value)}</div>
                    <div className={`text-sm ${getPriceChangeColor(holding.change)}`}>
                      {holding.change > 0 ? "+" : ""}
                      {holding.change.toFixed(2)}%
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium">{percentage}%</div>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
