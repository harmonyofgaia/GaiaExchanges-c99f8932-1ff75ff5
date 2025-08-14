import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Crown,
  Sword,
  Shield,
  Wand2,
  Gem,
  Rocket,
  Users,
  DollarSign,
  Settings,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface CraftedItem {
  id: string;
  name: string;
  type: "weapon" | "character" | "tool" | "upgrade" | "power";
  rarity: "Common" | "Epic" | "Legendary" | "Mythic" | "Divine";
  power: number;
  description: string;
  marketPrice: number;
  onMarketplace: boolean;
  createdAt: Date;
}

export default function AdminCraftedTools() {
  const [craftedItems, setCraftedItems] = useState<CraftedItem[]>([
    {
      id: "1",
      name: "Quantum Dragon Sword",
      type: "weapon",
      rarity: "Divine",
      power: 15000,
      description: "Reality-cutting blade forged from quantum crystals",
      marketPrice: 2500,
      onMarketplace: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Aura Guardian Character",
      type: "character",
      rarity: "Mythic",
      power: 12000,
      description: "Mystical protector of environmental realms",
      marketPrice: 1800,
      onMarketplace: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "GPS Omniscience Upgrade",
      type: "upgrade",
      rarity: "Legendary",
      power: 8500,
      description: "Tracks anything across multiple dimensions",
      marketPrice: 3000,
      onMarketplace: true,
      createdAt: new Date(),
    },
  ]);

  const [newItemPrice, setNewItemPrice] = useState<{ [key: string]: string }>({});
  const [adminPower, setAdminPower] = useState(50000);

  useEffect(() => {
    console.log("👑 ADMIN CRAFTED TOOLS MANAGER - SUPREME ACCESS GRANTED");
    console.log("🛠️ AI CREATED TOOLS: VISIBLE AND MANAGEABLE");
    console.log("💎 MARKETPLACE CONTROL: UNLIMITED ADMIN RIGHTS");

    const powerGrowth = setInterval(() => {
      setAdminPower((prev) => prev * 1.001);
    }, 2000);

    return () => clearInterval(powerGrowth);
  }, []);

  const addToMarketplace = (itemId: string) => {
    const price = parseFloat(newItemPrice[itemId]) || 0;
    if (price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setCraftedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, onMarketplace: true, marketPrice: price } : item
      )
    );

    toast.success("🎉 Item Added to Marketplace!", {
      description: `Successfully listed for $${price}`,
      duration: 4000,
    });
  };

  const removeFromMarketplace = (itemId: string) => {
    setCraftedItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, onMarketplace: false } : item))
    );

    toast.success("Item Removed from Marketplace", {
      description: "Item is now private",
      duration: 3000,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Divine":
        return "bg-gradient-to-r from-yellow-400 to-white";
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
      case "weapon":
        return <Sword className="h-5 w-5" />;
      case "character":
        return <Users className="h-5 w-5" />;
      case "tool":
        return <Settings className="h-5 w-5" />;
      case "upgrade":
        return <Zap className="h-5 w-5" />;
      case "power":
        return <Gem className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const filteredItems = (type?: string) => {
    return type ? craftedItems.filter((item) => item.type === type) : craftedItems;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-purple-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400">
            👑 ADMIN CRAFTED TOOLS MANAGER
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Private admin panel to manage all AI-created tools and marketplace listings
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Badge className="bg-yellow-600 animate-pulse">
              ADMIN POWER: {Math.floor(adminPower).toLocaleString()}
            </Badge>
            <Badge className="bg-purple-600">TOTAL ITEMS: {craftedItems.length}</Badge>
            <Badge className="bg-green-600">
              ON MARKETPLACE: {craftedItems.filter((i) => i.onMarketplace).length}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">👑 All Items</TabsTrigger>
          <TabsTrigger value="weapons">⚔️ Weapons</TabsTrigger>
          <TabsTrigger value="characters">👥 Characters</TabsTrigger>
          <TabsTrigger value="tools">🔧 Tools</TabsTrigger>
          <TabsTrigger value="upgrades">⚡ Upgrades</TabsTrigger>
          <TabsTrigger value="marketplace">💰 Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {craftedItems.map((item) => (
              <Card key={item.id} className="border-blue-500/30 bg-blue-900/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <CardTitle className="text-blue-400">{item.name}</CardTitle>
                    </div>
                    <Badge className={getRarityColor(item.rarity)}>{item.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Power: {item.power.toLocaleString()}</span>
                    <span>Type: {item.type}</span>
                  </div>

                  {!item.onMarketplace ? (
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="Enter price ($)"
                        value={newItemPrice[item.id] || ""}
                        onChange={(e) =>
                          setNewItemPrice((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        onClick={() => addToMarketplace(item.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Add to Marketplace
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-center p-2 bg-green-500/20 rounded border border-green-500/30">
                        <span className="text-green-400 font-bold">
                          On Marketplace: ${item.marketPrice}
                        </span>
                      </div>
                      <Button
                        onClick={() => removeFromMarketplace(item.id)}
                        variant="outline"
                        className="w-full"
                      >
                        Remove from Marketplace
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weapons" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems("weapon").map((item) => (
              <Card key={item.id} className="border-red-500/30 bg-red-900/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sword className="h-5 w-5 text-red-400" />
                      <CardTitle className="text-red-400">{item.name}</CardTitle>
                    </div>
                    <Badge className={getRarityColor(item.rarity)}>{item.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="text-sm">
                    <div>Damage: {item.power.toLocaleString()}</div>
                    <div>Status: {item.onMarketplace ? `$${item.marketPrice}` : "Private"}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="characters" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems("character").map((item) => (
              <Card key={item.id} className="border-green-500/30 bg-green-900/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-400" />
                      <CardTitle className="text-green-400">{item.name}</CardTitle>
                    </div>
                    <Badge className={getRarityColor(item.rarity)}>{item.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="text-sm">
                    <div>Stats: {item.power.toLocaleString()}</div>
                    <div>Status: {item.onMarketplace ? `$${item.marketPrice}` : "Private"}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems("tool").map((item) => (
              <Card key={item.id} className="border-purple-500/30 bg-purple-900/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-400" />
                      <CardTitle className="text-purple-400">{item.name}</CardTitle>
                    </div>
                    <Badge className={getRarityColor(item.rarity)}>{item.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="text-sm">
                    <div>Efficiency: {item.power.toLocaleString()}</div>
                    <div>Status: {item.onMarketplace ? `$${item.marketPrice}` : "Private"}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upgrades" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems("upgrade").map((item) => (
              <Card key={item.id} className="border-cyan-500/30 bg-cyan-900/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-cyan-400" />
                      <CardTitle className="text-cyan-400">{item.name}</CardTitle>
                    </div>
                    <Badge className={getRarityColor(item.rarity)}>{item.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="text-sm">
                    <div>Boost: {item.power.toLocaleString()}</div>
                    <div>Status: {item.onMarketplace ? `$${item.marketPrice}` : "Private"}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20 mb-6">
            <CardHeader>
              <CardTitle className="text-green-400">💰 Marketplace Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-500/20 rounded">
                  <div className="text-2xl font-bold text-green-400">
                    {craftedItems.filter((i) => i.onMarketplace).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Items Listed</div>
                </div>
                <div className="text-center p-4 bg-blue-500/20 rounded">
                  <div className="text-2xl font-bold text-blue-400">
                    $
                    {craftedItems
                      .filter((i) => i.onMarketplace)
                      .reduce((sum, i) => sum + i.marketPrice, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Value</div>
                </div>
                <div className="text-center p-4 bg-purple-500/20 rounded">
                  <div className="text-2xl font-bold text-purple-400">
                    {craftedItems.filter((i) => !i.onMarketplace).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Private Items</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {craftedItems
              .filter((item) => item.onMarketplace)
              .map((item) => (
                <Card key={item.id} className="border-yellow-500/30 bg-yellow-900/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <CardTitle className="text-yellow-400">{item.name}</CardTitle>
                      </div>
                      <Badge className="bg-green-600">LISTED</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="text-center p-3 bg-green-500/20 rounded border border-green-500/30">
                      <div className="text-2xl font-bold text-green-400">${item.marketPrice}</div>
                      <div className="text-sm text-muted-foreground">Market Price</div>
                    </div>
                    <Button
                      onClick={() => removeFromMarketplace(item.id)}
                      variant="outline"
                      className="w-full"
                    >
                      Remove from Marketplace
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
