import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Palette,
  Gift,
  DollarSign,
  Zap,
  Crown,
  Sword,
  Shield,
  Gem,
  Star,
  Flame,
  Sparkles,
  Heart,
  Music,
  Camera,
  Gamepad2,
} from "lucide-react";
import { toast } from "sonner";
import { useSecureAdmin } from "@/hooks/useSecureAdmin";

interface CreativeNFT {
  id: string;
  name: string;
  category: "character" | "weapon" | "armor" | "landscape" | "special" | "decoration" | "tool";
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythical" | "Divine";
  price: number;
  image: string;
  description: string;
  distributionMode: "sell" | "gift" | "free" | "gameplay";
  createdBy: "ai" | "admin";
  stats: {
    attack?: number;
    defense?: number;
    speed?: number;
    magic?: number;
    luck?: number;
    charm?: number;
  };
  specialAbilities: string[];
  tags: string[];
  isActive: boolean;
}

export function CreativeNFTGenerator() {
  const { isAdmin } = useSecureAdmin();
  const [nfts, setNfts] = useState<CreativeNFT[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      loadCreativeNFTs();
    }
  }, [isAdmin]);

  const loadCreativeNFTs = () => {
    const creativeNFTs: CreativeNFT[] = [
      // Mythical Characters
      {
        id: "char-001",
        name: "Celestial Dragon Warrior",
        category: "character",
        rarity: "Divine",
        price: 5000,
        image: "🐉",
        description: "Ancient dragon spirit warrior with cosmic powers",
        distributionMode: "sell",
        createdBy: "ai",
        stats: {
          attack: 95,
          defense: 90,
          magic: 100,
          speed: 85,
          luck: 90,
          charm: 95,
        },
        specialAbilities: ["Cosmic Breath", "Dimension Walk", "Time Manipulation"],
        tags: ["dragon", "celestial", "warrior", "cosmic"],
        isActive: true,
      },
      {
        id: "char-002",
        name: "Rainbow Phoenix Mage",
        category: "character",
        rarity: "Mythical",
        price: 3500,
        image: "🔥",
        description: "Colorful phoenix with healing and fire magic",
        distributionMode: "gift",
        createdBy: "ai",
        stats: {
          attack: 70,
          defense: 80,
          magic: 100,
          speed: 95,
          luck: 85,
          charm: 90,
        },
        specialAbilities: ["Phoenix Rebirth", "Rainbow Fire", "Healing Aura"],
        tags: ["phoenix", "rainbow", "mage", "healing"],
        isActive: true,
      },
      {
        id: "char-003",
        name: "Starlight Unicorn Knight",
        category: "character",
        rarity: "Legendary",
        price: 2500,
        image: "🦄",
        description: "Noble unicorn knight blessed by starlight",
        distributionMode: "free",
        createdBy: "ai",
        stats: {
          attack: 80,
          defense: 85,
          magic: 90,
          speed: 90,
          luck: 95,
          charm: 100,
        },
        specialAbilities: ["Starlight Charge", "Purification", "Light Barrier"],
        tags: ["unicorn", "knight", "starlight", "noble"],
        isActive: true,
      },

      // Epic Weapons
      {
        id: "weap-001",
        name: "Quantum Blade of Infinity",
        category: "weapon",
        rarity: "Divine",
        price: 4500,
        image: "⚔️",
        description: "Sword that cuts through dimensions and reality",
        distributionMode: "sell",
        createdBy: "ai",
        stats: { attack: 100, magic: 95, speed: 90, luck: 80 },
        specialAbilities: ["Reality Cut", "Quantum Strike", "Dimensional Slash"],
        tags: ["quantum", "infinity", "blade", "dimensional"],
        isActive: true,
      },
      {
        id: "weap-002",
        name: "Harmony Staff of Dreams",
        category: "weapon",
        rarity: "Mythical",
        price: 3000,
        image: "🪄",
        description: "Magical staff that manifests dreams into reality",
        distributionMode: "gameplay",
        createdBy: "ai",
        stats: { attack: 60, magic: 100, speed: 70, charm: 95 },
        specialAbilities: ["Dream Manifest", "Harmony Wave", "Sleep Spell"],
        tags: ["harmony", "dreams", "staff", "magic"],
        isActive: true,
      },

      // Legendary Armor
      {
        id: "armor-001",
        name: "Crystal Galaxy Armor",
        category: "armor",
        rarity: "Divine",
        price: 4000,
        image: "🛡️",
        description: "Armor made from crystallized galaxy essence",
        distributionMode: "sell",
        createdBy: "ai",
        stats: { defense: 100, magic: 90, speed: 75, luck: 85 },
        specialAbilities: ["Galaxy Shield", "Crystal Regeneration", "Stellar Protection"],
        tags: ["crystal", "galaxy", "armor", "divine"],
        isActive: true,
      },
      {
        id: "armor-002",
        name: "Butterfly Wing Cloak",
        category: "armor",
        rarity: "Legendary",
        price: 2000,
        image: "🦋",
        description: "Ethereal cloak with butterfly wing patterns",
        distributionMode: "gift",
        createdBy: "ai",
        stats: { defense: 70, speed: 100, magic: 80, charm: 95 },
        specialAbilities: ["Flight", "Invisibility", "Nature Blessing"],
        tags: ["butterfly", "wing", "cloak", "ethereal"],
        isActive: true,
      },

      // Special Landscapes
      {
        id: "land-001",
        name: "Floating Crystal Islands",
        category: "landscape",
        rarity: "Mythical",
        price: 6000,
        image: "🏝️",
        description: "Mystical floating islands made of pure crystal",
        distributionMode: "sell",
        createdBy: "ai",
        stats: { magic: 95, luck: 90, charm: 100 },
        specialAbilities: ["Levitation Field", "Crystal Resonance", "Sky Bridge"],
        tags: ["floating", "crystal", "islands", "mystical"],
        isActive: true,
      },
      {
        id: "land-002",
        name: "Aurora Forest of Wonders",
        category: "landscape",
        rarity: "Legendary",
        price: 4500,
        image: "🌲",
        description: "Magical forest illuminated by eternal aurora",
        distributionMode: "free",
        createdBy: "ai",
        stats: { magic: 90, luck: 85, charm: 95 },
        specialAbilities: ["Aurora Light", "Forest Whispers", "Nature Magic"],
        tags: ["aurora", "forest", "wonders", "magical"],
        isActive: true,
      },

      // Special Items & Tools
      {
        id: "special-001",
        name: "Time Manipulation Orb",
        category: "special",
        rarity: "Divine",
        price: 7500,
        image: "🔮",
        description: "Orb that controls the flow of time itself",
        distributionMode: "sell",
        createdBy: "ai",
        stats: { magic: 100, speed: 100, luck: 95 },
        specialAbilities: ["Time Stop", "Time Reverse", "Future Sight"],
        tags: ["time", "manipulation", "orb", "divine"],
        isActive: true,
      },
      {
        id: "deco-001",
        name: "Rainbow Bridge Portal",
        category: "decoration",
        rarity: "Epic",
        price: 1500,
        image: "🌈",
        description: "Beautiful rainbow bridge connecting dimensions",
        distributionMode: "gameplay",
        createdBy: "ai",
        stats: { charm: 100, magic: 70 },
        specialAbilities: ["Portal Travel", "Rainbow Blessing", "Dimensional Bridge"],
        tags: ["rainbow", "bridge", "portal", "dimensional"],
        isActive: true,
      },
    ];
    setNfts(creativeNFTs);
  };

  const generateNewNFT = async () => {
    setIsGenerating(true);

    // Simulate AI generation with Pinterest-inspired creativity
    const categories = ["character", "weapon", "armor", "landscape", "special", "decoration"];
    const rarities = ["Rare", "Epic", "Legendary", "Mythical", "Divine"];
    const themes = [
      "Celestial",
      "Mystical",
      "Quantum",
      "Rainbow",
      "Crystal",
      "Aurora",
      "Cosmic",
      "Divine",
    ];

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const newNFT: CreativeNFT = {
      id: `gen-${Date.now()}`,
      name: `${randomTheme} ${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)}`,
      category: randomCategory as CreativeNFT["category"],
      rarity: randomRarity as CreativeNFT["rarity"],
      price: Math.floor(Math.random() * 5000) + 500,
      image: ["🌟", "✨", "💎", "🔥", "⚡", "🌙", "☀️", "🦄"][Math.floor(Math.random() * 8)],
      description: `AI-generated ${randomTheme.toLowerCase()} ${randomCategory} with unique properties`,
      distributionMode: "sell",
      createdBy: "ai",
      stats: {
        attack: Math.floor(Math.random() * 100),
        defense: Math.floor(Math.random() * 100),
        magic: Math.floor(Math.random() * 100),
        speed: Math.floor(Math.random() * 100),
        luck: Math.floor(Math.random() * 100),
        charm: Math.floor(Math.random() * 100),
      },
      specialAbilities: [`${randomTheme} Power`, "Enhanced Stats", "Special Effect"],
      tags: [randomTheme.toLowerCase(), randomCategory, "ai-generated"],
      isActive: true,
    };

    setNfts((prev) => [newNFT, ...prev]);
    setIsGenerating(false);

    toast.success("🎨 New Creative NFT Generated!", {
      description: `Created ${newNFT.name} with ${newNFT.rarity} rarity`,
      duration: 4000,
    });
  };

  const updateDistributionMode = (nftId: string, mode: "sell" | "gift" | "free" | "gameplay") => {
    setNfts((prev) =>
      prev.map((nft) => (nft.id === nftId ? { ...nft, distributionMode: mode } : nft))
    );

    toast.success("🔄 Distribution Mode Updated!", {
      description: `NFT set to ${mode} mode`,
      duration: 2000,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Divine":
        return "from-purple-600 via-pink-600 to-yellow-600";
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

  const getDistributionIcon = (mode: string) => {
    switch (mode) {
      case "sell":
        return <DollarSign className="h-4 w-4 text-green-400" />;
      case "gift":
        return <Gift className="h-4 w-4 text-red-400" />;
      case "free":
        return <Heart className="h-4 w-4 text-pink-400" />;
      case "gameplay":
        return <Gamepad2 className="h-4 w-4 text-blue-400" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const filteredNFTs = nfts.filter(
    (nft) => selectedCategory === "all" || nft.category === selectedCategory
  );

  if (!isAdmin) {
    return (
      <Card className="border-2 border-red-500/50">
        <CardContent className="p-8 text-center">
          <Crown className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-400">Admin Access Required</h3>
          <p className="text-muted-foreground">Creative NFT Generator requires admin privileges</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Creative Generator Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-6 w-6" />
            🎨 CREATIVE NFT GENERATOR - PINTEREST INSPIRED
          </CardTitle>
          <p className="text-muted-foreground">
            AI-powered creative NFT generation with flexible distribution options
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">{nfts.length}</div>
              <div className="text-xs text-muted-foreground">Total NFTs</div>
            </div>
            <div className="p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <div className="text-xl font-bold text-green-400">
                {nfts.filter((n) => n.distributionMode === "sell").length}
              </div>
              <div className="text-xs text-muted-foreground">For Sale</div>
            </div>
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <div className="text-xl font-bold text-red-400">
                {nfts.filter((n) => n.distributionMode === "gift").length}
              </div>
              <div className="text-xs text-muted-foreground">Gifts</div>
            </div>
            <div className="p-3 rounded-lg bg-pink-900/30 border border-pink-500/20">
              <div className="text-xl font-bold text-pink-400">
                {nfts.filter((n) => n.distributionMode === "free").length}
              </div>
              <div className="text-xs text-muted-foreground">Free</div>
            </div>
            <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">
                {nfts.filter((n) => n.distributionMode === "gameplay").length}
              </div>
              <div className="text-xs text-muted-foreground">Gameplay</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Controls */}
      <Card className="border-green-500/30">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <Button
              onClick={generateNewNFT}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Creative NFT"}
            </Button>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="character">Characters</option>
              <option value="weapon">Weapons</option>
              <option value="armor">Armor</option>
              <option value="landscape">Landscapes</option>
              <option value="special">Special Items</option>
              <option value="decoration">Decorations</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNFTs.map((nft) => (
          <Card
            key={nft.id}
            className={`border-2 bg-gradient-to-br ${getRarityColor(nft.rarity)}/20 hover:scale-105 transition-all`}
          >
            <CardContent className="p-4 space-y-4">
              <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-6xl">{nft.image}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{nft.name}</h4>
                  <Badge className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white`}>
                    {nft.rarity}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground">{nft.description}</p>

                <div className="grid grid-cols-3 gap-1 text-xs">
                  {Object.entries(nft.stats).map(([stat, value]) => (
                    <div key={stat} className="text-center">
                      <div className="text-white font-bold">{value}</div>
                      <div className="text-muted-foreground capitalize">{stat}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {nft.specialAbilities.slice(0, 2).map((ability) => (
                    <Badge key={ability} variant="outline" className="text-xs">
                      {ability}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-bold">{nft.price} GAIA</span>
                  <div className="flex items-center gap-1">
                    {getDistributionIcon(nft.distributionMode)}
                    <span className="text-xs capitalize">{nft.distributionMode}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={nft.distributionMode}
                    onChange={(e) => updateDistributionMode(nft.id, e.target.value as CreativeNFT["distributionMode"])}
                    className="px-2 py-1 bg-muted border border-border rounded text-xs"
                  >
                    <option value="sell">💰 Sell</option>
                    <option value="gift">🎁 Gift</option>
                    <option value="free">💝 Free</option>
                    <option value="gameplay">🎮 Gameplay</option>
                  </select>

                  <Button size="sm" variant="outline" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Feature
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
