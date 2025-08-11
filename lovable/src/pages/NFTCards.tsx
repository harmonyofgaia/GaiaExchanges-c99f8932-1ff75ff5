import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Zap,
  Crown,
  Star,
  TrendingUp,
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

interface NFTCard {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythical";
  type: "creature" | "environment" | "power" | "artifact";
  power: number;
  price: number;
  image: string;
  description: string;
  abilities: string[];
  owned: boolean;
  creator: string;
}

export default function NFTCards() {
  const [cards, setCards] = useState<NFTCard[]>([]);
  const [myCards, setMyCards] = useState<NFTCard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock NFT cards data
    const mockCards: NFTCard[] = [
      {
        id: "1",
        name: "Forest Guardian Dragon",
        rarity: "legendary",
        type: "creature",
        power: 950,
        price: 2500,
        image: "🐉",
        description:
          "A majestic dragon that protects ancient forests from destruction",
        abilities: ["Forest Shield", "Nature's Wrath", "Healing Aura"],
        owned: false,
        creator: "EcoArtist_Prime",
      },
      {
        id: "2",
        name: "Solar Crystal Phoenix",
        rarity: "mythical",
        type: "creature",
        power: 1200,
        price: 5000,
        image: "🔥",
        description:
          "Reborn from solar energy, this phoenix brings renewable power",
        abilities: ["Solar Flare", "Rebirth", "Energy Surge", "Light Shield"],
        owned: true,
        creator: "SolarMaster99",
      },
      {
        id: "3",
        name: "Ocean Depths Whale",
        rarity: "epic",
        type: "creature",
        power: 750,
        price: 1800,
        image: "🐋",
        description:
          "Guardian of the ocean depths, keeper of marine biodiversity",
        abilities: ["Tidal Wave", "Deep Dive", "Marine Healing"],
        owned: false,
        creator: "AquaDefender",
      },
      {
        id: "4",
        name: "Wind Temple Sanctuary",
        rarity: "rare",
        type: "environment",
        power: 500,
        price: 800,
        image: "🏛️",
        description: "A mystical temple powered by eternal winds",
        abilities: ["Wind Barrier", "Energy Generation"],
        owned: true,
        creator: "TempleBuilder",
      },
      {
        id: "5",
        name: "Earth Crystal Core",
        rarity: "epic",
        type: "artifact",
        power: 650,
        price: 1500,
        image: "💎",
        description:
          "The heart of the earth's power, crystallized into pure energy",
        abilities: ["Earth Shake", "Crystal Shield", "Power Amplify"],
        owned: false,
        creator: "CrystalCrafter",
      },
      {
        id: "6",
        name: "Lightning Storm Spirit",
        rarity: "rare",
        type: "power",
        power: 600,
        price: 950,
        image: "⚡",
        description: "Harnesses the raw power of thunderstorms",
        abilities: ["Lightning Strike", "Storm Shield"],
        owned: true,
        creator: "StormWeaver",
      },
    ];

    setTimeout(() => {
      setCards(mockCards);
      setMyCards(mockCards.filter((card) => card.owned));
      setLoading(false);
    }, 1500);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-600";
      case "rare":
        return "bg-blue-600";
      case "epic":
        return "bg-purple-600";
      case "legendary":
        return "bg-orange-600";
      case "mythical":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "creature":
        return "🦄";
      case "environment":
        return "🌍";
      case "power":
        return "⚡";
      case "artifact":
        return "🏺";
      default:
        return "❓";
    }
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRarity =
      selectedRarity === "all" || card.rarity === selectedRarity;
    const matchesType = selectedType === "all" || card.type === selectedType;
    return matchesSearch && matchesRarity && matchesType;
  });

  const purchaseCard = (card: NFTCard) => {
    toast.success(`Purchased ${card.name}!`, {
      description: `Added to your collection for ${card.price} GAIA tokens`,
    });
    // Update card ownership
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, owned: true } : c)),
    );
    setMyCards((prev) => [...prev, { ...card, owned: true }]);
  };

  const createCard = () => {
    toast.success("NFT Card Creator opened!", {
      description: "Design your own eco-themed NFT card",
    });
  };

  const CardComponent = ({ card }: { card: NFTCard }) => (
    <Card
      className={`border-2 ${
        card.rarity === "mythical"
          ? "border-red-500/50 bg-gradient-to-br from-red-900/30 to-purple-900/30"
          : card.rarity === "legendary"
            ? "border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-yellow-900/30"
            : card.rarity === "epic"
              ? "border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30"
              : card.rarity === "rare"
                ? "border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30"
                : "border-gray-500/50 bg-gradient-to-br from-gray-900/30 to-slate-900/30"
      } hover:scale-105 transition-transform cursor-pointer`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge
            className={`${getRarityColor(card.rarity)} text-white text-xs`}
          >
            {card.rarity.toUpperCase()}
          </Badge>
          <div className="text-2xl">{getTypeIcon(card.type)}</div>
        </div>
        <CardTitle className="text-lg">{card.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Card Image */}
        <div className="aspect-square bg-gradient-to-b from-sky-200 to-ground-200 rounded-lg flex items-center justify-center text-8xl">
          {card.image}
        </div>

        {/* Card Stats */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="font-bold text-yellow-400">{card.power}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded-full" />
            <span className="font-bold text-green-400">{card.price}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{card.description}</p>

        {/* Abilities */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Abilities:</div>
          <div className="flex flex-wrap gap-1">
            {card.abilities.map((ability, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ability}
              </Badge>
            ))}
          </div>
        </div>

        {/* Creator */}
        <div className="text-xs text-muted-foreground">
          Created by: {card.creator}
        </div>

        {/* Action Button */}
        {card.owned ? (
          <Badge className="w-full justify-center bg-green-600">
            <Heart className="h-4 w-4 mr-2" />
            Owned
          </Badge>
        ) : (
          <Button
            onClick={() => purchaseCard(card)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin text-6xl">🃏</div>
          <h2 className="text-2xl font-bold text-primary">
            Loading NFT Cards...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              🃏 GAIA NFT CARDS 🃏
            </CardTitle>
            <div className="text-center space-y-2">
              <p className="text-xl text-muted-foreground">
                Collect, trade, and battle with eco-powered NFT cards
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-purple-600">🎨 Unique Art</Badge>
                <Badge className="bg-blue-600">⚔️ Battle Ready</Badge>
                <Badge className="bg-green-600">🌱 Eco-Themed</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-blue-900/30 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Sparkles className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {cards.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Cards</div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/30 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {myCards.length}
              </div>
              <div className="text-sm text-muted-foreground">My Collection</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-900/30 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">847</div>
              <div className="text-sm text-muted-foreground">Total Power</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Crown className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">3</div>
              <div className="text-sm text-muted-foreground">Rare Cards</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="marketplace" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger value="marketplace">🛒 Marketplace</TabsTrigger>
              <TabsTrigger value="collection">💎 My Collection</TabsTrigger>
              <TabsTrigger value="create">🎨 Create</TabsTrigger>
            </TabsList>

            <Button
              onClick={createCard}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create NFT
            </Button>
          </div>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Filters */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search cards..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md nftcards-select-bg"
                  >
                    <option value="all">All Rarities</option>
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                    <option value="mythical">Mythical</option>
                  </select>

                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md nftcards-select-bg"
                  >
                    <option value="all">All Types</option>
                    <option value="creature">Creature</option>
                    <option value="environment">Environment</option>
                    <option value="power">Power</option>
                    <option value="artifact">Artifact</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCards.map((card) => (
                <CardComponent key={card.id} card={card} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collection" className="space-y-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Heart className="h-6 w-6" />
                  My Collection ({myCards.length} cards)
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myCards.map((card) => (
                <CardComponent key={card.id} card={card} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Plus className="h-6 w-6" />
                  Create Your NFT Card
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="space-y-4">
                  <div className="text-6xl">🎨</div>
                  <h3 className="text-2xl font-bold">
                    Card Creator Coming Soon!
                  </h3>
                  <p className="text-muted-foreground">
                    Design your own eco-themed NFT cards with our advanced
                    creation tools
                  </p>
                  <Button
                    onClick={createCard}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Open Card Creator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
