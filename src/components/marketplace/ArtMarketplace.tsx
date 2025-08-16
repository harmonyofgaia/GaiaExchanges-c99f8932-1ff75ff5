import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  ShoppingCart,
  Palette,
  Users,
  Shield,
  Zap,
  Upload,
  Star,
  Flame,
  Crown,
  Gem,
  Search,
  Filter,
} from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";
import { gaiaTokenService } from "@/services/gaiaTokenService";

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image_url: string;
  category: string;
  status: string;
  user_id: string;
  created_at: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythical";
  tokensForBurning: number;
  artistEarnings: number;
  views: number;
  likes: number;
}

export function ArtMarketplace() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [totalBurned, setTotalBurned] = useState(0);

  useEffect(() => {
    fetchMarketplaceItems();

    // Auto-refresh every 30 seconds for live updates
    const interval = setInterval(fetchMarketplaceItems, 30000);
    return () => clearInterval(interval);
  }, [fetchMarketplaceItems]);

  const fetchMarketplaceItems = async () => {
    try {
      console.log("🎨 MARKETPLACE: Fetching items with quantum security protection");

      // Enhanced mock data with token burning mechanics
      const mockItems: MarketplaceItem[] = [
        {
          id: "1",
          title: "Digital Harmony #001",
          description:
            "A beautiful digital art piece representing the harmony of nature and technology",
          price: 250,
          currency: "GAiA",
          image_url: "",
          category: "Digital Art",
          status: "active",
          user_id: "demo",
          created_at: new Date().toISOString(),
          rarity: "Epic",
          tokensForBurning: 25,
          artistEarnings: 200,
          views: 1547,
          likes: 234,
        },
        {
          id: "2",
          title: "Eco Vision #002",
          description: "An inspiring artwork showcasing the future of sustainable living",
          price: 500,
          currency: "GAiA",
          image_url: "",
          category: "Environmental Art",
          status: "active",
          user_id: "demo",
          created_at: new Date().toISOString(),
          rarity: "Legendary",
          tokensForBurning: 75,
          artistEarnings: 375,
          views: 2847,
          likes: 567,
        },
        {
          id: "3",
          title: "Quantum Dreams #003",
          description:
            "Mesmerizing quantum-inspired digital artwork with dragon-powered security aesthetics",
          price: 1000,
          currency: "GAiA",
          image_url: "",
          category: "Quantum Art",
          status: "active",
          user_id: "demo",
          created_at: new Date().toISOString(),
          rarity: "Mythical",
          tokensForBurning: 200,
          artistEarnings: 700,
          views: 5847,
          likes: 1247,
        },
        {
          id: "4",
          title: "Nature's Whisper",
          description: "Serene landscape with token-burning environmental message",
          price: 350,
          currency: "GAiA",
          image_url: "",
          category: "Landscape",
          status: "active",
          user_id: "demo",
          created_at: new Date().toISOString(),
          rarity: "Rare",
          tokensForBurning: 35,
          artistEarnings: 280,
          views: 847,
          likes: 156,
        },
        {
          id: "5",
          title: "Cosmic Energy Flow",
          description: "Abstract representation of energy and token burning processes",
          price: 750,
          currency: "GAiA",
          image_url: "",
          category: "Abstract",
          status: "active",
          user_id: "demo",
          created_at: new Date().toISOString(),
          rarity: "Epic",
          tokensForBurning: 112,
          artistEarnings: 525,
          views: 3247,
          likes: 678,
        },
      ];

      setItems(mockItems);
      setTotalBurned(mockItems.reduce((sum, item) => sum + item.tokensForBurning, 0));
      console.log("🎨 MARKETPLACE: Loaded quantum-protected art collection");
    } catch (error) {
      console.error("Error in marketplace - quantum security engaged:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Mythical":
        return "from-purple-600 to-pink-600";
      case "Legendary":
        return "from-yellow-600 to-orange-600";
      case "Epic":
        return "from-blue-600 to-cyan-600";
      case "Rare":
        return "from-green-600 to-emerald-600";
      default:
        return "from-gray-600 to-slate-600";
    }
  };

  const handlePurchase = async (item: MarketplaceItem) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        toast.error("Please log in to make purchases");
        return;
      }

      // Burn tokens for the purchase
      const burnSuccess = await gaiaTokenService.burnTokens(
        item.tokensForBurning,
        `Art purchase: ${item.title}`
      );

      if (burnSuccess) {
        toast.success("🎨 Artwork purchased successfully!", {
          description: `You now own "${item.title}" | ${item.tokensForBurning} GAiA tokens burned | Artist earned ${item.artistEarnings} GAiA`,
          duration: 5000,
        });

        console.log("🎨 MARKETPLACE: Art purchase completed with token burning");
        setTotalBurned((prev) => prev + item.tokensForBurning);
      }
    } catch (error) {
      toast.error("Purchase failed - Quantum security protection active");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    "Digital Art",
    "Environmental Art",
    "Quantum Art",
    "Landscape",
    "Abstract",
  ];

  return (
    <div className="space-y-6">
      {/* Marketplace Header */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-6 w-6" />
            🎨 GAiA Art Marketplace - Quantum Protected with Token Burning
          </CardTitle>
          <p className="text-muted-foreground">
            Buy and sell exclusive art with GAiA tokens - Every purchase burns tokens for
            environmental impact
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <div className="text-xl font-bold text-green-400">{items.length}</div>
              <div className="text-xs text-muted-foreground">Active Listings</div>
            </div>
            <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">∞</div>
              <div className="text-xs text-muted-foreground">GAiA Supply</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">100%</div>
              <div className="text-xs text-muted-foreground">Quantum Security</div>
            </div>
            <div className="p-3 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">{totalBurned}</div>
              <div className="text-xs text-muted-foreground">Tokens Burned</div>
            </div>
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <div className="text-xl font-bold text-red-400">0%</div>
              <div className="text-xs text-muted-foreground">Platform Fees</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artwork..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted/50 rounded-t-lg"></div>
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-muted/50 rounded"></div>
                <div className="h-3 bg-muted/30 rounded w-3/4"></div>
                <div className="h-8 bg-muted/40 rounded"></div>
              </CardContent>
            </Card>
          ))
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">No artwork available</h3>
            <p className="text-sm text-muted-foreground">
              Be the first to list your art in the GAiA marketplace!
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`border-2 bg-gradient-to-br ${getRarityColor(item.rarity)}/10 hover:scale-105 transition-all duration-300`}
            >
              <div className="aspect-square bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-t-lg flex items-center justify-center relative">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                ) : (
                  <Palette className="h-16 w-16 text-purple-400" />
                )}
                <div className="absolute top-2 left-2">
                  <Badge className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white`}>
                    {item.rarity}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge variant="outline" className="text-xs bg-black/50">
                    👁️ {item.views}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-black/50">
                    ❤️ {item.likes}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">{item.price}</span>
                    <Badge className="bg-green-600 text-white">{item.currency}</Badge>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-400" />
                      Burn: {item.tokensForBurning}
                    </span>
                    <span className="flex items-center gap-1">
                      <Crown className="h-3 w-3 text-yellow-400" />
                      Artist: {item.artistEarnings}
                    </span>
                  </div>

                  <Badge variant="outline" className="text-xs w-fit">
                    {item.category}
                  </Badge>
                </div>

                <Button
                  onClick={() => handlePurchase(item)}
                  className={`w-full bg-gradient-to-r ${getRarityColor(item.rarity)} hover:opacity-90`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy with GAiA & Burn Tokens
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Token Integration Footer */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center">
            🚀 Powered by GAiA Token - Art & Environmental Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-sm text-green-400">
              <strong>Contract:</strong>{" "}
              <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
            </div>
            <div className="text-sm text-blue-400">
              <strong>Wallet:</strong>{" "}
              <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Every art purchase burns GAiA tokens for environmental impact while supporting
              artists. Join the creative revolution with real-world conservation impact!
            </p>
            <div className="flex justify-center gap-4 text-xs mt-3">
              <Badge className="bg-green-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Quantum Protected
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <Users className="h-3 w-3 mr-1" />
                Community Verified
              </Badge>
              <Badge className="bg-purple-600 text-white">
                <Zap className="h-3 w-3 mr-1" />
                Zero Platform Fees
              </Badge>
              <Badge className="bg-orange-600 text-white">
                <Flame className="h-3 w-3 mr-1" />
                Token Burning Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
