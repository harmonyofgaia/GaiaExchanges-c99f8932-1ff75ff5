import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  Settings,
  Shield,
  Globe,
  Eye,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Star,
  Database,
} from "lucide-react";
import { toast } from "sonner";

interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change_24h: number;
  market_cap: number;
  volume_24h: number;
  eco_score: number;
  status: "approved" | "pending" | "rejected" | "monitoring";
  source: "coingecko" | "binance" | "manual" | "community";
  added_date: Date;
  last_updated: Date;
  eco_attributes: string[];
  gaia_compatible: boolean;
}

interface AutoDiscoveryMetrics {
  total_discovered: number;
  approved_today: number;
  pending_review: number;
  eco_tokens_found: number;
  last_scan: Date;
  next_scan: Date;
  sources_active: string[];
}

export function TokenAssetManager() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [discoveryMetrics, setDiscoveryMetrics] = useState<AutoDiscoveryMetrics>({
    total_discovered: 0,
    approved_today: 0,
    pending_review: 0,
    eco_tokens_found: 0,
    last_scan: new Date(),
    next_scan: new Date(Date.now() + 3600000),
    sources_active: ["CoinGecko", "Binance", "EcoToken API"],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    initializeTokens();
    initializeMetrics();

    // Real-time updates
    const interval = setInterval(() => {
      updateMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const initializeTokens = () => {
    const mockTokens: Token[] = [
      {
        id: "gaia-1",
        symbol: "GAIA",
        name: "GAIA Token",
        price: 0.0234,
        change_24h: 12.5,
        market_cap: 2340000,
        volume_24h: 89000,
        eco_score: 95,
        status: "approved",
        source: "manual",
        added_date: new Date("2024-01-01"),
        last_updated: new Date(),
        eco_attributes: ["Carbon Offset", "Renewable Energy", "Conservation"],
        gaia_compatible: true,
      },
      {
        id: "eco-2",
        symbol: "ECO",
        name: "EcoChain Token",
        price: 1.23,
        change_24h: -3.2,
        market_cap: 45600000,
        volume_24h: 1200000,
        eco_score: 88,
        status: "approved",
        source: "coingecko",
        added_date: new Date("2024-02-15"),
        last_updated: new Date(),
        eco_attributes: ["Clean Energy", "Sustainability"],
        gaia_compatible: true,
      },
      {
        id: "green-3",
        symbol: "GREEN",
        name: "Green Planet Token",
        price: 0.567,
        change_24h: 8.7,
        market_cap: 12300000,
        volume_24h: 345000,
        eco_score: 92,
        status: "pending",
        source: "binance",
        added_date: new Date(),
        last_updated: new Date(),
        eco_attributes: ["Forest Protection", "Ocean Cleanup"],
        gaia_compatible: true,
      },
      {
        id: "earth-4",
        symbol: "EARTH",
        name: "Earth Guardian Token",
        price: 2.45,
        change_24h: 15.3,
        market_cap: 78900000,
        volume_24h: 2100000,
        eco_score: 90,
        status: "monitoring",
        source: "coingecko",
        added_date: new Date("2024-03-01"),
        last_updated: new Date(),
        eco_attributes: ["Wildlife Protection", "Climate Action"],
        gaia_compatible: true,
      },
      {
        id: "carbon-5",
        symbol: "CARBON",
        name: "Carbon Credit Token",
        price: 0.089,
        change_24h: -1.2,
        market_cap: 5600000,
        volume_24h: 156000,
        eco_score: 85,
        status: "approved",
        source: "community",
        added_date: new Date("2024-02-28"),
        last_updated: new Date(),
        eco_attributes: ["Carbon Trading", "Offset Verification"],
        gaia_compatible: true,
      },
    ];
    setTokens(mockTokens);
  };

  const initializeMetrics = () => {
    setDiscoveryMetrics({
      total_discovered: 247,
      approved_today: 12,
      pending_review: 8,
      eco_tokens_found: 156,
      last_scan: new Date(Date.now() - 1800000), // 30 minutes ago
      next_scan: new Date(Date.now() + 1800000), // 30 minutes from now
      sources_active: ["CoinGecko", "Binance", "EcoToken API", "DeFiPulse"],
    });
  };

  const updateMetrics = () => {
    setDiscoveryMetrics((prev) => ({
      ...prev,
      total_discovered: prev.total_discovered + Math.floor(Math.random() * 3),
      approved_today: prev.approved_today + (Math.random() > 0.9 ? 1 : 0),
      pending_review: Math.max(0, prev.pending_review + (Math.random() > 0.7 ? 1 : -1)),
      eco_tokens_found: prev.eco_tokens_found + (Math.random() > 0.8 ? 1 : 0),
      last_scan: new Date(),
    }));
  };

  const runAutoDiscovery = async () => {
    setIsScanning(true);
    toast.info("🔍 Starting auto-discovery scan...", {
      description: "Scanning CoinGecko, Binance, and other sources for eco-friendly tokens",
      duration: 3000,
    });

    try {
      // Simulate discovery process
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Add newly discovered tokens
      const newTokens: Token[] = [
        {
          id: `discovered-${Date.now()}`,
          symbol: "FOREST",
          name: "Forest Guardian Token",
          price: 0.123,
          change_24h: 5.6,
          market_cap: 3400000,
          volume_24h: 89000,
          eco_score: 87,
          status: "pending",
          source: "coingecko",
          added_date: new Date(),
          last_updated: new Date(),
          eco_attributes: ["Tree Planting", "Deforestation Prevention"],
          gaia_compatible: true,
        },
      ];

      setTokens((prev) => [...newTokens, ...prev]);
      setDiscoveryMetrics((prev) => ({
        ...prev,
        total_discovered: prev.total_discovered + newTokens.length,
        pending_review: prev.pending_review + newTokens.length,
        last_scan: new Date(),
        next_scan: new Date(Date.now() + 3600000),
      }));

      toast.success(`🎉 Discovery complete!`, {
        description: `Found ${newTokens.length} new eco-friendly tokens for review`,
        duration: 5000,
      });
    } catch (error) {
      toast.error("Discovery scan failed", {
        description: "Please try again or check source connections",
        duration: 3000,
      });
    } finally {
      setIsScanning(false);
    }
  };

  const approveToken = (tokenId: string) => {
    setTokens((prev) =>
      prev.map((token) =>
        token.id === tokenId
          ? { ...token, status: "approved" as const, last_updated: new Date() }
          : token
      )
    );

    const token = tokens.find((t) => t.id === tokenId);
    toast.success(`✅ ${token?.symbol} approved!`, {
      description: `${token?.name} is now available in GAIA ecosystem`,
      duration: 3000,
    });
  };

  const rejectToken = (tokenId: string) => {
    setTokens((prev) =>
      prev.map((token) =>
        token.id === tokenId
          ? { ...token, status: "rejected" as const, last_updated: new Date() }
          : token
      )
    );

    const token = tokens.find((t) => t.id === tokenId);
    toast.error(`❌ ${token?.symbol} rejected`, {
      description: `${token?.name} does not meet eco-criteria`,
      duration: 3000,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "monitoring":
        return <Eye className="h-4 w-4 text-blue-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "border-green-500/50 text-green-400";
      case "pending":
        return "border-yellow-500/50 text-yellow-400";
      case "rejected":
        return "border-red-500/50 text-red-400";
      case "monitoring":
        return "border-blue-500/50 text-blue-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const filteredTokens = tokens.filter((token) => {
    const matchesFilter = selectedFilter === "all" || token.status === selectedFilter;
    const matchesSearch =
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Auto-Discovery Metrics */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Database className="h-5 w-5" />
            Token Auto-Discovery System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {discoveryMetrics.total_discovered}
              </div>
              <div className="text-sm text-muted-foreground">Total Discovered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {discoveryMetrics.approved_today}
              </div>
              <div className="text-sm text-muted-foreground">Approved Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {discoveryMetrics.pending_review}
              </div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {discoveryMetrics.eco_tokens_found}
              </div>
              <div className="text-sm text-muted-foreground">Eco Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-400">
                {discoveryMetrics.sources_active.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Sources</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-orange-400">
                {discoveryMetrics.last_scan.toLocaleTimeString()}
              </div>
              <div className="text-sm text-muted-foreground">Last Scan</div>
            </div>
            <div className="text-center">
              <Button
                onClick={runAutoDiscovery}
                disabled={isScanning}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                {isScanning ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
              <div className="text-sm text-muted-foreground mt-1">Manual Scan</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-2">Active Discovery Sources:</div>
            <div className="flex flex-wrap gap-2">
              {discoveryMetrics.sources_active.map((source) => (
                <Badge
                  key={source}
                  variant="outline"
                  className="border-green-500/50 text-green-400"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tokens">🪙 Token Management</TabsTrigger>
          <TabsTrigger value="discovery">🔍 Auto-Discovery</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          {/* Search and Filters */}
          <Card className="border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tokens by name or symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/20 border-blue-500/30"
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Token
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap">
                {["all", "approved", "pending", "monitoring", "rejected"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="capitalize"
                  >
                    {filter === "all" ? "All Tokens" : filter}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Token List */}
          <div className="space-y-4">
            {filteredTokens.map((token) => (
              <Card key={token.id} className="border-gray-500/20 bg-black/20">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-black font-bold">
                          {token.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{token.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-400">{token.symbol}</span>
                            <Badge variant="outline" className={getStatusColor(token.status)}>
                              {getStatusIcon(token.status)}
                              {token.status}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-purple-500/50 text-purple-400"
                            >
                              <Star className="h-3 w-3 mr-1" />
                              Eco Score: {token.eco_score}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground">Price</div>
                          <div className="font-bold text-white">${token.price.toFixed(4)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">24h Change</div>
                          <div
                            className={`font-bold flex items-center gap-1 ${token.change_24h >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {token.change_24h >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {token.change_24h.toFixed(2)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Market Cap</div>
                          <div className="font-bold text-white">
                            ${(token.market_cap / 1000000).toFixed(2)}M
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Volume 24h</div>
                          <div className="font-bold text-white">
                            ${(token.volume_24h / 1000).toFixed(0)}K
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Eco Attributes:</div>
                        <div className="flex flex-wrap gap-1">
                          {token.eco_attributes.map((attr, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-green-500/50 text-green-400"
                            >
                              {attr}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                        <span>Source: {token.source}</span>
                        <span>Added: {token.added_date.toLocaleDateString()}</span>
                        <span>Updated: {token.last_updated.toLocaleTimeString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {token.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => approveToken(token.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectToken(token.id)}
                            className="border-red-500/50 text-red-400"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discovery" className="space-y-4">
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Zap className="h-5 w-5" />
                Automated Token Discovery Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Discovery Sources</h3>
                  <div className="space-y-3">
                    {["CoinGecko", "Binance", "EcoToken API", "DeFiPulse", "CoinMarketCap"].map(
                      (source) => (
                        <div
                          key={source}
                          className="flex items-center justify-between p-3 border border-gray-500/20 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${discoveryMetrics.sources_active.includes(source) ? "bg-green-400" : "bg-gray-400"}`}
                            />
                            <span className="font-medium text-white">{source}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {Math.floor(Math.random() * 50) + 10} tokens/day
                            </Badge>
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Eco-Criteria Filters</h3>
                  <div className="space-y-3">
                    {[
                      "Minimum Eco Score: 75",
                      "Carbon Neutrality: Required",
                      "Renewable Energy: Preferred",
                      "Conservation Focus: High Priority",
                      "Community Governance: Essential",
                    ].map((criteria, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-green-500/20 rounded-lg"
                      >
                        <span className="text-sm text-white">{criteria}</span>
                        <Badge variant="outline" className="border-green-500/50 text-green-400">
                          Active
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Criteria
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Discovery Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Daily Discovery Rate</span>
                    <span className="font-bold text-green-400">↑ 25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Approval Success Rate</span>
                    <span className="font-bold text-blue-400">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Eco Score Average</span>
                    <span className="font-bold text-purple-400">84.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Integration Success</span>
                    <span className="font-bold text-green-400">96%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Token Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      category: "Carbon Credits",
                      count: 45,
                      color: "bg-green-400",
                    },
                    {
                      category: "Renewable Energy",
                      count: 38,
                      color: "bg-blue-400",
                    },
                    {
                      category: "Conservation",
                      count: 32,
                      color: "bg-purple-400",
                    },
                    {
                      category: "Clean Transport",
                      count: 28,
                      color: "bg-yellow-400",
                    },
                    {
                      category: "Sustainable Tech",
                      count: 23,
                      color: "bg-cyan-400",
                    },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-white">{item.category}</span>
                      </div>
                      <Badge variant="outline" className="border-gray-500/50">
                        {item.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="border-orange-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Settings className="h-5 w-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Auto-Discovery Settings</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span>Scan Frequency</span>
                      <Badge variant="outline">Every 30 minutes</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto-Approval Threshold</span>
                      <Badge variant="outline">Eco Score ≥ 90</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Maximum Pending Tokens</span>
                      <Badge variant="outline">100</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Integration Settings</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span>GAIA Compatibility Check</span>
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Real-time Price Updates</span>
                      <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Eco-Score Monitoring</span>
                      <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                        24/7
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Configuration
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
