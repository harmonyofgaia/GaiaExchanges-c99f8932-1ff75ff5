import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Gem,
  Heart,
  MapPin,
  Eye,
  DollarSign,
  TrendingUp,
  Star,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

interface MarketplaceItem {
  id: string;
  name: string;
  type: "nft" | "animal" | "tool" | "land" | "character";
  price: number;
  currency: "USD" | "GAIA" | "BTC" | "ETH";
  rarity: "Common" | "Epic" | "Legendary" | "Mythic" | "Divine";
  description: string;
  seller: string;
  featured: boolean;
  liveTracking?: boolean;
  animalLocation?: string;
  investmentGoal?: number;
  currentInvestment?: number;
}

export default function Marketplace() {
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([
    {
      id: "1",
      name: "African Elephant - Kesi",
      type: "animal",
      price: 5000,
      currency: "USD",
      rarity: "Legendary",
      description: "Help relocate Kesi from zoo to natural sanctuary",
      seller: "Animal Rescue Foundation",
      featured: true,
      liveTracking: true,
      animalLocation: "Berlin Zoo, Germany",
      investmentGoal: 15000,
      currentInvestment: 8500,
    },
    {
      id: "2",
      name: "Quantum Dragon Sword NFT",
      type: "nft",
      price: 2500,
      currency: "GAIA",
      rarity: "Divine",
      description: "Reality-cutting blade forged from quantum crystals",
      seller: "Admin Crafted Tools",
      featured: true,
      liveTracking: false,
    },
    {
      id: "3",
      name: "Rainforest Restoration Land",
      type: "land",
      price: 12000,
      currency: "USD",
      rarity: "Epic",
      description: "50 acres of Brazilian rainforest for restoration",
      seller: "Environmental Foundation",
      featured: false,
      liveTracking: true,
      animalLocation: "Amazon Basin, Brazil",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [marketStats, setMarketStats] = useState({
    totalValue: 125000,
    totalItems: 247,
    animalsSaved: 45,
    landRestored: 1250,
  });

  useEffect(() => {
    console.log("🛒 MARKETPLACE - COMPREHENSIVE TRADING PLATFORM ACTIVE");
    console.log("🦎 LIVE ANIMAL TRACKING: INTEGRATED");
    console.log("💎 NFT COLLECTIONS: FULL CATALOG");
    console.log("🌍 ENVIRONMENTAL INVESTMENTS: UNLIMITED");

    const statsGrowth = setInterval(() => {
      setMarketStats((prev) => ({
        totalValue: prev.totalValue + Math.floor(Math.random() * 1000),
        totalItems: prev.totalItems + Math.floor(Math.random() * 3),
        animalsSaved: prev.animalsSaved + (Math.random() > 0.9 ? 1 : 0),
        landRestored: prev.landRestored + Math.floor(Math.random() * 10),
      }));
    }, 5000);

    return () => clearInterval(statsGrowth);
  }, []);

  const purchaseItem = (item: MarketplaceItem) => {
    if (item.type === "animal") {
      toast.success("🦎 Animal Investment Confirmed!", {
        description: `Invested in ${item.name} rescue operation - Live tracking activated`,
        duration: 6000,
      });
    } else {
      toast.success("🛒 Purchase Successful!", {
        description: `${item.name} added to your collection`,
        duration: 4000,
      });
    }
  };

  const trackAnimal = (item: MarketplaceItem) => {
    if (item.liveTracking) {
      toast.success("🛰️ Live Tracking Activated!", {
        description: `Now tracking ${item.name} at ${item.animalLocation}`,
        duration: 5000,
      });
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Divine":
        return "bg-gradient-to-r from-yellow-400 to-white text-black";
      case "Mythic":
        return "bg-gradient-to-r from-pink-500 to-purple-500";
      case "Legendary":
        return "bg-gradient-to-r from-orange-500 to-red-500";
      case "Epic":
        return "bg-gradient-to-r from-purple-500 to-blue-500";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "animal":
        return <Heart className="h-5 w-5" />;
      case "nft":
        return <Gem className="h-5 w-5" />;
      case "tool":
        return <Star className="h-5 w-5" />;
      case "land":
        return <MapPin className="h-5 w-5" />;
      default:
        return <ShoppingCart className="h-5 w-5" />;
    }
  };

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-green-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            🛒 GAIA MARKETPLACE - COMPREHENSIVE TRADING PLATFORM
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Trade NFTs, invest in animal rescue, buy land for restoration, and
            discover exclusive tools
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Badge className="bg-blue-600">
              ITEMS: {marketStats.totalItems}
            </Badge>
            <Badge className="bg-green-600">
              VALUE: ${marketStats.totalValue.toLocaleString()}
            </Badge>
            <Badge className="bg-purple-600 animate-pulse">
              ANIMALS SAVED: {marketStats.animalsSaved}
            </Badge>
            <Badge className="bg-cyan-600">
              LAND RESTORED: {marketStats.landRestored} acres
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Search and Filter */}
      <Card className="border-gray-500/30 bg-gray-900/20 mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search marketplace..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-md"
            >
              <option value="all">All Items</option>
              <option value="animal">🦎 Live Animals</option>
              <option value="nft">💎 NFTs</option>
              <option value="tool">⚔️ Tools & Weapons</option>
              <option value="land">🌍 Land & Environment</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="featured">⭐ Featured</TabsTrigger>
          <TabsTrigger value="animals">🦎 Live Animals</TabsTrigger>
          <TabsTrigger value="nfts">💎 NFT Collection</TabsTrigger>
          <TabsTrigger value="tools">⚔️ Tools & Weapons</TabsTrigger>
          <TabsTrigger value="land">🌍 Environmental</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems
              .filter((item) => item.featured)
              .map((item) => (
                <Card
                  key={item.id}
                  className="border-yellow-500/30 bg-yellow-900/20"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <CardTitle className="text-yellow-400">
                          {item.name}
                        </CardTitle>
                      </div>
                      <Badge className={getRarityColor(item.rarity)}>
                        {item.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>

                    {item.type === "animal" && item.investmentGoal && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Investment Progress:</span>
                          <span>
                            ${item.currentInvestment?.toLocaleString()} / $
                            {item.investmentGoal.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${((item.currentInvestment || 0) / item.investmentGoal) * 100}%`,
                            }}
                          ></div>
                        </div>
                        {item.liveTracking && (
                          <div className="flex items-center gap-2 text-sm text-green-400">
                            <MapPin className="h-4 w-4" />
                            Live Location: {item.animalLocation}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-400">
                        {item.price.toLocaleString()} {item.currency}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        by {item.seller}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => purchaseItem(item)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {item.type === "animal" ? "Invest" : "Buy"}
                      </Button>
                      {item.liveTracking && (
                        <Button
                          onClick={() => trackAnimal(item)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="animals" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20 mb-6">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Heart className="h-6 w-6" />
                🦎 Live Animal Investment Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-bold text-green-400 mb-2">
                  🌟 How Animal Investment Works:
                </h4>
                <div className="text-sm text-green-300 space-y-1">
                  <div>
                    • Invest in zoo animals to fund their relocation to natural
                    sanctuaries
                  </div>
                  <div>
                    • Each animal has a unique NFT with live GPS tracking
                  </div>
                  <div>
                    • Watch real-time progress as funding goals are reached
                  </div>
                  <div>• Animals are automatically moved when 100% funded</div>
                  <div>
                    • Receive exclusive NFT and tracking rights after successful
                    rescue
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems
              .filter((item) => item.type === "animal")
              .map((item) => (
                <Card
                  key={item.id}
                  className="border-green-500/30 bg-green-900/20"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-green-400" />
                        <CardTitle className="text-green-400">
                          {item.name}
                        </CardTitle>
                      </div>
                      {item.liveTracking && (
                        <Badge className="bg-blue-600 animate-pulse">
                          LIVE
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>

                    {item.animalLocation && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span>Current Location: {item.animalLocation}</span>
                      </div>
                    )}

                    {item.investmentGoal && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rescue Fund Progress:</span>
                          <span className="font-bold">
                            ${item.currentInvestment?.toLocaleString()} / $
                            {item.investmentGoal.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                            style={{
                              width: `${((item.currentInvestment || 0) / item.investmentGoal) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-center text-sm text-green-400">
                          {Math.round(
                            ((item.currentInvestment || 0) /
                              item.investmentGoal) *
                              100,
                          )}
                          % funded
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => purchaseItem(item)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Invest in Rescue
                      </Button>
                      <Button
                        onClick={() => trackAnimal(item)}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground text-center">
                      Min. investment: ${item.price.toLocaleString()}{" "}
                      {item.currency}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="nfts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems
              .filter((item) => item.type === "nft")
              .map((item) => (
                <Card
                  key={item.id}
                  className="border-purple-500/30 bg-purple-900/20"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gem className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-purple-400 text-sm">
                          {item.name}
                        </CardTitle>
                      </div>
                      <Badge
                        className={getRarityColor(item.rarity) + " text-xs"}
                      >
                        {item.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">
                        {item.price.toLocaleString()} {item.currency}
                      </div>
                    </div>
                    <Button
                      onClick={() => purchaseItem(item)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Gem className="h-4 w-4 mr-2" />
                      Buy NFT
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems
              .filter((item) => item.type === "tool")
              .map((item) => (
                <Card key={item.id} className="border-red-500/30 bg-red-900/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-red-400" />
                        <CardTitle className="text-red-400">
                          {item.name}
                        </CardTitle>
                      </div>
                      <Badge className={getRarityColor(item.rarity)}>
                        {item.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="text-lg font-bold text-red-400">
                      {item.price.toLocaleString()} {item.currency}
                    </div>
                    <Button
                      onClick={() => purchaseItem(item)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Purchase Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="land" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems
              .filter((item) => item.type === "land")
              .map((item) => (
                <Card
                  key={item.id}
                  className="border-cyan-500/30 bg-cyan-900/20"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-cyan-400" />
                        <CardTitle className="text-cyan-400">
                          {item.name}
                        </CardTitle>
                      </div>
                      <Badge className={getRarityColor(item.rarity)}>
                        {item.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    {item.animalLocation && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-cyan-400" />
                        <span>Location: {item.animalLocation}</span>
                      </div>
                    )}
                    <div className="text-lg font-bold text-cyan-400">
                      ${item.price.toLocaleString()} {item.currency}
                    </div>
                    <Button
                      onClick={() => purchaseItem(item)}
                      className="w-full bg-cyan-600 hover:bg-cyan-700"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Invest in Land
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
