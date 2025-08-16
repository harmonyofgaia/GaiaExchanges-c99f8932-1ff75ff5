import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Globe,
  Database,
  MapPin,
  Activity,
  Users,
  Coins,
  TreePine,
  Shield,
  Eye,
  Clock,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface SearchResult {
  id: string;
  type: "user" | "transaction" | "location" | "token" | "project" | "threat";
  title: string;
  description: string;
  location?: string;
  timestamp: Date;
  relevance: number;
  status: "active" | "inactive" | "pending" | "blocked";
  metadata: Record<string, any>;
}

interface RealTimeMetrics {
  totalRecords: number;
  activeScans: number;
  threatsDetected: number;
  locationsTracked: number;
  transactionsMonitored: number;
  lastUpdate: Date;
}

export function SearchAllData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    totalRecords: 0,
    activeScans: 0,
    threatsDetected: 0,
    locationsTracked: 0,
    transactionsMonitored: 0,
    lastUpdate: new Date()
  });
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setRealTimeMetrics((prev) => ({
        totalRecords: prev.totalRecords + Math.floor(Math.random() * 50),
        activeScans: Math.floor(Math.random() * 25) + 10,
        threatsDetected: prev.threatsDetected + Math.floor(Math.random() * 3),
        locationsTracked: prev.locationsTracked + Math.floor(Math.random() * 10),
        transactionsMonitored: prev.transactionsMonitored + Math.floor(Math.random() * 100),
        lastUpdate: new Date()
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);

    try {
      // Simulate comprehensive search across all data
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockResults: SearchResult[] = [
        {
          id: "1",
          type: "user",
          title: `User Profile: ${query}`,
          description: "Environmental activist with 50+ completed missions",
          location: "Global Network",
          timestamp: new Date(),
          relevance: 95,
          status: "active",
          metadata: { ecoScore: 850, missions: 52, tokens: 1250 },
        },
        {
          id: "2",
          type: "transaction",
          title: "Token Transaction",
          description: `GAIA token transfer related to ${query}`,
          location: "Blockchain Network",
          timestamp: new Date(Date.now() - 3600000),
          relevance: 88,
          status: "active",
          metadata: { amount: "500 GAIA", from: "Wallet A", to: "Wallet B" },
        },
        {
          id: "3",
          type: "location",
          title: "Environmental Site",
          description: `Conservation project location matching ${query}`,
          location: "Latitude: 45.123, Longitude: -122.456",
          timestamp: new Date(Date.now() - 7200000),
          relevance: 82,
          status: "active",
          metadata: { project: "Forest Restoration", area: "50 hectares" },
        },
        {
          id: "4",
          type: "project",
          title: "Eco Mission",
          description: `Green project involving ${query}`,
          location: "Community Network",
          timestamp: new Date(Date.now() - 10800000),
          relevance: 76,
          status: "pending",
          metadata: { participants: 25, funding: "$5,000", completion: "65%" },
        },
        {
          id: "5",
          type: "threat",
          title: "Security Alert",
          description: `Potential security threat detected with ${query}`,
          location: "Security Network",
          timestamp: new Date(Date.now() - 1800000),
          relevance: 92,
          status: "blocked",
          metadata: {
            severity: "high",
            action: "blocked",
            source: "automated",
          },
        },
      ];

      setResults(mockResults);
      toast.success(`🔍 Search completed: ${mockResults.length} results found`, {
        description: `Scanned across all GAIA databases and networks`,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Search failed", {
        description: "Please try again",
        duration: 3000,
      });
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4" />;
      case "transaction":
        return <Coins className="h-4 w-4" />;
      case "location":
        return <MapPin className="h-4 w-4" />;
      case "project":
        return <TreePine className="h-4 w-4" />;
      case "threat":
        return <Shield className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-green-500/50 text-green-400";
      case "pending":
        return "border-yellow-500/50 text-yellow-400";
      case "blocked":
        return "border-red-500/50 text-red-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const filteredResults = results.filter(
    (result) => selectedFilter === "all" || result.type === selectedFilter
  );

  return (
    <div className="space-y-6">
      {/* Real-time Metrics Header */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Globe className="h-5 w-5" />
            Search All Data - Real-Time Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {realTimeMetrics.totalRecords.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{realTimeMetrics.activeScans}</div>
              <div className="text-sm text-muted-foreground">Active Scans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {realTimeMetrics.threatsDetected}
              </div>
              <div className="text-sm text-muted-foreground">Threats Detected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {realTimeMetrics.locationsTracked.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Locations Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {realTimeMetrics.transactionsMonitored.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Transactions</div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Last update: {realTimeMetrics.lastUpdate.toLocaleTimeString()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? "border-green-500/50" : "border-gray-500/50"}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
              Auto Refresh: {autoRefresh ? "ON" : "OFF"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Interface */}
      <Card className="border-blue-500/20">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search across all GAIA data: users, transactions, locations, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/20 border-blue-500/30"
                />
              </div>
              <Button
                type="submit"
                disabled={isSearching}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSearching ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Search Filters */}
            <div className="flex gap-2 flex-wrap">
              {["all", "user", "transaction", "location", "project", "threat"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  {filter}
                </Button>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <Card className="border-purple-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Eye className="h-5 w-5" />
                Search Results ({filteredResults.length} found)
              </CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <Card key={result.id} className="border-gray-500/20 bg-black/20">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(result.type)}
                          <h3 className="font-semibold text-white">{result.title}</h3>
                          <Badge variant="outline" className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                            {result.relevance}% match
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{result.description}</p>
                        {result.location && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" />
                            {result.location}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{result.timestamp.toLocaleString()}</span>
                          <span>Type: {result.type}</span>
                          {Object.entries(result.metadata)
                            .slice(0, 2)
                            .map(([key, value]) => (
                              <span key={key}>
                                {key}: {value}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Activity className="h-3 w-3 mr-1" />
                          Track
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Stats */}
      {results.length > 0 && (
        <Card className="border-yellow-500/20">
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-yellow-400">
                  {results.filter((r) => r.type === "user").length}
                </div>
                <div className="text-sm text-muted-foreground">Users Found</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-400">
                  {results.filter((r) => r.type === "transaction").length}
                </div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-400">
                  {results.filter((r) => r.type === "location").length}
                </div>
                <div className="text-sm text-muted-foreground">Locations</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-400">
                  {results.filter((r) => r.type === "threat").length}
                </div>
                <div className="text-sm text-muted-foreground">Threats</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
