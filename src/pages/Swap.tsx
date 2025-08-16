import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  Zap,
  Shield,
  Clock,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Wallet,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  icon: string;
}

export default function Swap() {
  const [fromToken, setFromToken] = useState<Token>({
    symbol: "ETH",
    name: "Ethereum",
    balance: 2.5,
    price: 2500,
    icon: "⚡",
  });

  const [toToken, setToToken] = useState<Token>({
    symbol: "GAIA",
    name: "GAiA Token",
    balance: 0,
    price: 0.00085432,
    icon: "🌱",
  });

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [isSwapping, setIsSwapping] = useState(false);

  const availableTokens: Token[] = [
    { symbol: "ETH", name: "Ethereum", balance: 2.5, price: 2500, icon: "⚡" },
    {
      symbol: "GAIA",
      name: "GAiA Token",
      balance: 125000,
      price: 0.00085432,
      icon: "🌱",
    },
    { symbol: "USDT", name: "Tether USD", balance: 1000, price: 1, icon: "💵" },
    { symbol: "USDC", name: "USD Coin", balance: 500, price: 1, icon: "💎" },
    { symbol: "BTC", name: "Bitcoin", balance: 0.1, price: 45000, icon: "₿" },
  ];

  const calculateSwapAmount = (amount: string, from: Token, to: Token) => {
    if (!amount || isNaN(parseFloat(amount))) return "";
    const fromValue = parseFloat(amount) * from.price;
    const toTokenAmount = fromValue / to.price;
    return toTokenAmount.toFixed(8);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateSwapAmount(value, fromToken, toToken));
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount("");
    setToAmount("");
  };

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) {
      toast.error("Please enter swap amounts");
      return;
    }

    setIsSwapping(true);
    toast.loading("Processing swap...", { duration: 2000 });

    setTimeout(() => {
      setIsSwapping(false);
      toast.success(
        `Successfully swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}!`
      );
      setFromAmount("");
      setToAmount("");
    }, 2000);
  };

  const TokenSelector = ({
    token,
    onSelect,
    label,
  }: {
    token: Token;,
    onSelect: (token: Token) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">{label}</label>
      <Select
        onValueChange={(value) => {
          const selectedToken = availableTokens.find((t) => t.symbol === value);
          if (selectedToken) onSelect(selectedToken);
        }}
      >
        <SelectTrigger className="bg-black/20">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{token.icon}</span>
              <div>
                <div className="font-semibold">{token.symbol}</div>
                <div className="text-xs text-muted-foreground">
                  Balance: {token.balance.toLocaleString()}
                </div>
              </div>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableTokens.map((t) => (
            <SelectItem key={t.symbol} value={t.symbol}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.icon}</span>
                <div>
                  <div className="font-semibold">{t.symbol}</div>
                  <div className="text-xs text-muted-foreground">{t.name}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-sm">{t.balance.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">${t.price.toFixed(4)}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              🔄 GAiA Token Swap
            </CardTitle>
            <div className="text-center space-y-2">
              <p className="text-xl text-muted-foreground">
                Instant, secure, and zero-fee token swaps powered by dragon technology
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-blue-600">⚡ Instant Swaps</Badge>
                <Badge className="bg-green-600">🔥 Zero Fees</Badge>
                <Badge className="bg-purple-600">🛡️ Dragon Secure</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Swap Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <ArrowUpDown className="h-6 w-6" />
                  Token Swap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* From Token */}
                <div className="space-y-4">
                  <TokenSelector token={fromToken} onSelect={setFromToken} label="From" />
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      className="text-2xl font-bold h-16 pr-20"
                    />
                    <Button
                      onClick={() => handleFromAmountChange(fromToken.balance.toString())}
                      size="sm"
                      variant="outline"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      MAX
                    </Button>
                  </div>
                  {fromAmount && (
                    <div className="text-sm text-muted-foreground">
                      ≈ ${(parseFloat(fromAmount) * fromToken.price).toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleSwapTokens}
                    size="lg"
                    variant="outline"
                    className="rounded-full w-12 h-12 p-0"
                  >
                    <ArrowUpDown className="h-6 w-6" />
                  </Button>
                </div>

                {/* To Token */}
                <div className="space-y-4">
                  <TokenSelector token={toToken} onSelect={setToToken} label="To" />
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    readOnly
                    className="text-2xl font-bold h-16 bg-gray-800/50"
                  />
                  {toAmount && (
                    <div className="text-sm text-muted-foreground">
                      ≈ ${(parseFloat(toAmount) * toToken.price).toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Swap Details */}
                {fromAmount && toAmount && (
                  <Card className="bg-black/20 border-gray-500/20">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Exchange Rate:</span>
                        <span>
                          1 {fromToken.symbol} ={" "}
                          {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)}{" "}
                          {toToken.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Slippage Tolerance:</span>
                        <span className="text-green-400">{slippage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Network Fee:</span>
                        <span className="text-green-400">$0.00 (FREE)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Estimated Time:</span>
                        <span>~15 seconds</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Swap Button */}
                <Button
                  onClick={handleSwap}
                  disabled={!fromAmount || !toAmount || isSwapping}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSwapping ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Swapping...
                    </>
                  ) : (
                    <>
                      <ArrowUpDown className="h-5 w-5 mr-2" />
                      Swap Tokens
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card className="bg-card/50 border-gray-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Slippage Tolerance
                  </label>
                  <div className="flex gap-2">
                    {["0.1", "0.5", "1.0"].map((value) => (
                      <Button
                        key={value}
                        onClick={() => setSlippage(value)}
                        size="sm"
                        variant={slippage === value ? "default" : "outline"}
                        className="flex-1"
                      >
                        {value}%
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card className="bg-card/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-blue-400">
                  <Wallet className="h-5 w-5" />
                  Your Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableTokens
                  .filter((t) => t.balance > 0)
                  .map((token) => (
                    <div
                      key={token.symbol}
                      className="flex items-center justify-between p-2 bg-black/20 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{token.icon}</span>
                        <div>
                          <div className="font-semibold text-sm">{token.symbol}</div>
                          <div className="text-xs text-muted-foreground">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {token.balance.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${(token.balance * token.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
              <CardContent className="p-4">
                <h3 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Features
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🐲</div>
                    <span>Dragon-level protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg">⚡</div>
                    <span>Quantum-resistant encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🔒</div>
                    <span>Non-custodial swaps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🌍</div>
                    <span>Decentralized execution</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-green-900/30 border-green-500/30">
            <CardContent className="p-4 text-center">
              <ArrowUpDown className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">24,567</div>
              <div className="text-xs text-muted-foreground">Total Swaps</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-900/30 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">$2.1M</div>
              <div className="text-xs text-muted-foreground">24h Volume</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">12s</div>
              <div className="text-xs text-muted-foreground">Avg Swap Time</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-900/30 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-xs text-muted-foreground">Security Score</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
