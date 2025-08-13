import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  ArrowUpDown,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Database,
  Network,
  Rocket,
  Star,
  Eye,
  Heart,
  Coins,
  Activity,
  Users,
  Download,
  ExternalLink,
  Bell,
  Lock,
  Cpu,
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  LineChart,
} from "lucide-react";
import { GaiasExchange } from "@/components/GaiasExchange";
import { FullyFunctionalExchange } from "@/components/FullyFunctionalExchange";
import { GaiaFeeManager } from "@/components/GaiaFeeManager";
import { BlockchainStatus } from "@/components/blockchain/BlockchainStatus";
import { LiveTransactionMatrix } from "@/components/LiveTransactionMatrix";
import { TradingInterface } from "@/components/TradingInterface";
import { ChartAnalytics } from "@/components/ChartAnalytics";
import { SecurityCenter } from "@/components/SecurityCenter";
import { GaiaLogo } from "@/components/GaiaLogo";
import { CommunityVault } from "@/components/CommunityVault";
import { toast } from "sonner";
import {
  GAIA_TOKEN,
  GAIA_METRICS,
  formatGaiaPrice,
  formatGaiaNumber,
} from "@/constants/gaia";

// Token configuration for comprehensive trading
const supportedTokens = [
  {
    name: "Harmony of Gaia",
    symbol: "GAiA",
    icon: "/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png",
    fee: 0,
    address: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh",
    price: 1.2847,
    change24h: 12.5,
    volume: 8920000,
    marketCap: 12500000,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    fee: 0.0001,
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    price: 67420.50,
    change24h: 2.3,
    volume: 28500000000,
    marketCap: 1320000000000,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    fee: 0.001,
    address: "0x0000000000000000000000000000000000000000",
    price: 3840.20,
    change24h: -1.2,
    volume: 15200000000,
    marketCap: 462000000000,
  },
  {
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
    fee: 0.00005,
    address: "So11111111111111111111111111111111111111112",
    price: 198.45,
    change24h: 8.7,
    volume: 3200000000,
    marketCap: 94000000000,
  },
  { 
    name: "Cardano", 
    symbol: "ADA", 
    icon: "₳", 
    fee: 0.17, 
    address: "addr1...",
    price: 0.52,
    change24h: -0.8,
    volume: 450000000,
    marketCap: 18300000000,
  },
  { 
    name: "Polkadot", 
    symbol: "DOT", 
    icon: "●", 
    fee: 0.01, 
    address: "1...",
    price: 7.23,
    change24h: 4.2,
    volume: 180000000,
    marketCap: 9800000000,
  },
];

interface BlockchainMetrics {
  health: number;
  transactions: number;
  nodes: number;
  security: number;
  uptime: number;
  volume: number;
  users: number;
  trades: number;
}

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
}

export default function Exchange() {
  const [activeInterface, setActiveInterface] = useState("unified");
  const [selectedPair, setSelectedPair] = useState("GAiA/USDT");
  const [tradeAmount, setTradeAmount] = useState("");
  const [tradePrice, setTradePrice] = useState("");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");

  const interfaceOptions = [
    { id: "unified", icon: "🌿", name: "Unified Hub", color: "emerald" },
    { id: "analytics", icon: "📊", name: "Analytics", color: "yellow" },
    { id: "blockchain", icon: "⛓️", name: "Blockchain", color: "green" },
    { id: "trading", icon: "💹", name: "Trading", color: "blue" },
    { id: "security", icon: "🛡️", name: "Security", color: "red" },
  ];

  const [metrics, setMetrics] = useState<BlockchainMetrics>({
    health: 98.7,
    transactions: 2847592,
    nodes: 120,
    security: 99.9,
    uptime: 99.99,
    volume: 1000000,
    users: 50000,
    trades: 100000,
  });

  const [marketData, setMarketData] = useState<MarketData[]>(
    supportedTokens.map(token => ({
      symbol: token.symbol,
      price: token.price || 0,
      change24h: token.change24h || 0,
      volume: token.volume || 0,
      marketCap: token.marketCap || 0,
    }))
  );

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        transactions: prev.transactions + Math.floor(Math.random() * 10) + 1,
        volume: prev.volume + Math.floor(Math.random() * 10000),
      }));

      setMarketData(prev => prev.map(data => ({
        ...data,
        price: data.price * (1 + (Math.random() - 0.5) * 0.001),
        change24h: data.change24h + (Math.random() - 0.5) * 0.1,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTrade = () => {
    if (!tradeAmount || !tradePrice) {
      toast.error("Please enter amount and price");
      return;
    }

    toast.success(`${tradeType.toUpperCase()} order placed: ${tradeAmount} ${selectedPair.split('/')[0]} at ${tradePrice}`);
    setTradeAmount("");
    setTradePrice("");
  };

  const renderUnifiedHub = () => (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Live Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.slice(0, 6).map((token, index) => (
                <div key={token.symbol} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                      {supportedTokens[index]?.icon || token.symbol[0]}
                    </div>
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-sm text-muted-foreground">{supportedTokens[index]?.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${token.price.toFixed(token.symbol === 'GAiA' ? 4 : 2)}</div>
                    <div className={`text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              Quick Trade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Trading Pair</label>
              <select 
                value={selectedPair} 
                onChange={(e) => setSelectedPair(e.target.value)}
                className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded-lg"
              >
                <option value="GAiA/USDT">GAiA/USDT</option>
                <option value="GAiA/BTC">GAiA/BTC</option>
                <option value="GAiA/ETH">GAiA/ETH</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Amount</label>
              <Input 
                type="number" 
                placeholder="0.00" 
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Price</label>
              <Input 
                type="number" 
                placeholder="0.00" 
                value={tradePrice}
                onChange={(e) => setTradePrice(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={tradeType === 'buy' ? 'default' : 'outline'}
                onClick={() => setTradeType('buy')}
                className="flex-1"
              >
                Buy
              </Button>
              <Button 
                variant={tradeType === 'sell' ? 'default' : 'outline'}
                onClick={() => setTradeType('sell')}
                className="flex-1"
              >
                Sell
              </Button>
            </div>
            <Button onClick={handleTrade} className="w-full bg-green-600 hover:bg-green-700">
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Status */}
      <BlockchainStatus />

      {/* Core Exchange Components */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GaiasExchange />
        <FullyFunctionalExchange />
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GaiaFeeManager />
        <CommunityVault />
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <ChartAnalytics />
      <LiveTransactionMatrix />
      
      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-yellow-400" />
              Volume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>24h Volume</span>
                <span className="font-bold">{formatGaiaNumber(metrics.volume)}</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="text-sm text-muted-foreground">
                +15% from yesterday
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Users</span>
                <span className="font-bold">{formatGaiaNumber(metrics.users)}</span>
              </div>
              <Progress value={60} className="h-2" />
              <div className="text-sm text-muted-foreground">
                +8% from last week
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              Trading Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Trades</span>
                <span className="font-bold">{formatGaiaNumber(metrics.trades)}</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="text-sm text-muted-foreground">
                +22% from last month
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBlockchain = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Network Health", value: metrics.health, icon: Heart, color: "text-red-400" },
          { label: "Total Transactions", value: metrics.transactions, icon: Database, color: "text-blue-400" },
          { label: "Active Nodes", value: metrics.nodes, icon: Network, color: "text-green-400" },
          { label: "Security Score", value: metrics.security, icon: Shield, color: "text-purple-400" },
        ].map((metric, index) => (
          <Card key={index} className="bg-gradient-to-br from-gray-900/30 to-slate-900/30 border-gray-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">
                    {metric.label.includes('Health') || metric.label.includes('Security') 
                      ? `${metric.value}%` 
                      : formatGaiaNumber(metric.value)
                    }
                  </p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <LiveTransactionMatrix />
      <BlockchainStatus />
    </div>
  );

  const renderTrading = () => (
    <div className="space-y-6">
      <TradingInterface />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GaiasExchange />
        <FullyFunctionalExchange />
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <SecurityCenter notifications={[]} />
      
      {/* Security Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-400" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Security Score</span>
                <Badge variant="default" className="bg-green-600">
                  {metrics.security}%
                </Badge>
              </div>
              <Progress value={metrics.security} className="h-2" />
              <div className="text-sm text-muted-foreground">
                All systems secure
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-400" />
              Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>System Uptime</span>
                <Badge variant="default" className="bg-green-600">
                  {metrics.uptime}%
                </Badge>
              </div>
              <Progress value={metrics.uptime} className="h-2" />
              <div className="text-sm text-muted-foreground">
                99.99% availability
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-400" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Response Time</span>
                <Badge variant="default" className="bg-green-600">
                  &lt;50ms
                </Badge>
              </div>
              <Progress value={95} className="h-2" />
              <div className="text-sm text-muted-foreground">
                Optimal performance
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <GaiaLogo size="xl" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              GAIA'S PRIVATE EXCHANGE
            </h1>
            <Rocket className="h-12 w-12 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            The world's most advanced ecological blockchain exchange. Trade sustainably, earn rewards, and help heal our planet. 🌍✨
          </p>
        </div>

        {/* Interface Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {interfaceOptions.map((option) => (
            <Button
              key={option.id}
              variant={activeInterface === option.id ? "default" : "outline"}
              onClick={() => setActiveInterface(option.id)}
              className={`flex items-center gap-2 ${
                activeInterface === option.id 
                  ? `bg-${option.color}-600 hover:bg-${option.color}-700` 
                  : ''
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              {option.name}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {activeInterface === "unified" && renderUnifiedHub()}
          {activeInterface === "analytics" && renderAnalytics()}
          {activeInterface === "blockchain" && renderBlockchain()}
          {activeInterface === "trading" && renderTrading()}
          {activeInterface === "security" && renderSecurity()}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: "Total Volume", value: formatGaiaPrice(metrics.volume), icon: DollarSign },
            { label: "Total Users", value: formatGaiaNumber(metrics.users), icon: Users },
            { label: "Live Transactions", value: formatGaiaNumber(metrics.transactions), icon: Activity },
            { label: "Active Nodes", value: metrics.nodes.toString(), icon: Network },
            { label: "Security", value: `${metrics.security}%`, icon: Shield },
            { label: "Uptime", value: `${metrics.uptime}%`, icon: TrendingUp },
          ].map((stat, index) => (
            <Card key={index} className="text-center bg-gradient-to-br from-gray-900/30 to-slate-900/30 border-gray-500/30">
              <CardContent className="p-4">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-green-400" />
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="font-bold text-lg">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}