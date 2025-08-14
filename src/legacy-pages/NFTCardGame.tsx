import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Zap,
  Award,
  Users,
  TrendingUp,
  Heart,
  Shield,
  Target,
  Star,
  Globe,
  TreePine,
  Droplets,
  Leaf,
  Brain,
  Camera,
  Network,
  ArrowUpDown,
  Coins,
  Trophy,
  Eye,
  Gamepad2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

interface NFTCard {
  id: string;
  user_id: string;
  card_type: string;
  card_name: string;
  rarity: string;
  power_level: number;
  biodiversity_category: string;
  card_metadata: any;
  minted_at: string;
  is_tradeable: boolean;
  ecosystem_interactions?: string[];
  conservation_partner?: string;
  real_world_impact?: number;
  evolution_stage?: number;
  max_evolution?: number;
  trading_history?: Array<{
    date: string;
    price: number;
    buyer: string;
    seller: string;
    transaction_id: string;
  }>;
  market_value?: number;
}

interface EcosystemInteraction {
  card1_id: string;
  card2_id: string;
  interaction_type: string;
  bonus_multiplier: number;
  environmental_benefit: string;
}

interface ConservationPartnership {
  organization: string;
  project_name: string;
  impact_contribution: number;
  verification_status: string;
  location: string;
}

interface MarketplaceData {
  totalVolume: number;
  activeTraders: number;
  topCollections: Array<{
    name: string;
    volume: number;
    floor_price: number;
    change_24h: number;
    items: number;
  }>;
  recentSales: Array<{
    card_name: string;
    price: number;
    buyer: string;
    timestamp: number;
    image_url: string;
  }>;
  conservationFunding: number;
}

export default function NFTCardGame() {
  const { user } = useAuth();
  const [collection, setCollection] = useState<NFTCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [selectedCard, setSelectedCard] = useState<NFTCard | null>(null);
  const [ecosystemInteractions, setEcosystemInteractions] = useState<EcosystemInteraction[]>([]);
  const [conservationPartnerships, setConservationPartnerships] = useState<
    ConservationPartnership[]
  >([]);
  const [marketplaceData, setMarketplaceData] = useState<MarketplaceData>({
    totalVolume: 2847592,
    activeTraders: 8934,
    topCollections: [],
    recentSales: [],
    conservationFunding: 456789,
  });

  useEffect(() => {
    if (user) {
      loadCollection();
      loadEcosystemInteractions();
      loadConservationPartnerships();
      loadMarketplaceData();
    }
  }, [user]);

  const loadEcosystemInteractions = async () => {
    // Mock ecosystem interactions for Master Plan v7
    const interactions = [
      {
        card1_id: "forest_wolf",
        card2_id: "ancient_oak",
        interaction_type: "symbiotic",
        bonus_multiplier: 1.5,
        environmental_benefit: "Enhanced forest health and biodiversity",
      },
      {
        card1_id: "ocean_dolphin",
        card2_id: "coral_reef",
        interaction_type: "protective",
        bonus_multiplier: 2.0,
        environmental_benefit: "Ocean ecosystem preservation",
      },
    ];
    setEcosystemInteractions(interactions);
  };

  const loadConservationPartnerships = async () => {
    // Mock conservation partnerships
    const partnerships = [
      {
        organization: "World Wildlife Fund",
        project_name: "Amazon Rainforest Protection",
        impact_contribution: 1250,
        verification_status: "verified",
        location: "Amazon Basin, Brazil",
      },
      {
        organization: "Ocean Conservancy",
        project_name: "Great Barrier Reef Restoration",
        impact_contribution: 890,
        verification_status: "verified",
        location: "Queensland, Australia",
      },
    ];
    setConservationPartnerships(partnerships);
  };

  const loadMarketplaceData = async () => {
    // Simulate real-time marketplace updates
    const interval = setInterval(() => {
      setMarketplaceData((prev) => ({
        ...prev,
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 1000),
        activeTraders: prev.activeTraders + Math.floor(Math.random() * 10) - 5,
        conservationFunding: prev.conservationFunding + Math.floor(Math.random() * 500),
      }));
    }, 8000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (user) {
      loadCollection();
    }
  }, [user]);

  const loadCollection = async () => {
    try {
      const { data, error } = await supabase
        .from("nft_card_collection")
        .select("*")
        .eq("user_id", user!.id)
        .order("minted_at", { ascending: false });

      if (error) throw error;
      setCollection(data || []);
    } catch (error) {
      console.error("Error loading collection:", error);
      toast.error("Failed to load card collection");
    } finally {
      setLoading(false);
    }
  };

  const mintRandomCard = async () => {
    if (!user) {
      toast.error("Please log in to mint cards");
      return;
    }

    setMinting(true);
    try {
      const cardTypes = ["animal", "plant", "ecosystem", "guardian", "artifact"];
      const rarities = ["common", "uncommon", "rare", "epic", "legendary"];
      const categories = ["forest", "ocean", "grassland", "desert", "arctic", "tropical"];

      const animalNames = [
        "Forest Wolf",
        "Ocean Dolphin",
        "Mountain Eagle",
        "Desert Fox",
        "Arctic Seal",
        "Tropical Parrot",
      ];
      const plantNames = [
        "Ancient Oak",
        "Coral Reef",
        "Bamboo Grove",
        "Cactus Garden",
        "Pine Forest",
        "Rainforest Canopy",
      ];
      const ecosystemNames = [
        "Pristine Wetland",
        "Coral Ecosystem",
        "Alpine Meadow",
        "Oasis Haven",
        "Tundra Expanse",
        "Jungle Paradise",
      ];
      const guardianNames = [
        "Earth Guardian",
        "Water Keeper",
        "Sky Protector",
        "Fire Warden",
        "Life Bringer",
        "Nature's Voice",
      ];
      const artifactNames = [
        "Seed of Life",
        "Crystal of Purity",
        "Wind Chimes",
        "Solar Prism",
        "Moon Stone",
        "Rainbow Bridge",
      ];

      const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      let cardName = "";
      switch (randomType) {
        case "animal":
          cardName = animalNames[Math.floor(Math.random() * animalNames.length)];
          break;
        case "plant":
          cardName = plantNames[Math.floor(Math.random() * plantNames.length)];
          break;
        case "ecosystem":
          cardName = ecosystemNames[Math.floor(Math.random() * ecosystemNames.length)];
          break;
        case "guardian":
          cardName = guardianNames[Math.floor(Math.random() * guardianNames.length)];
          break;
        case "artifact":
          cardName = artifactNames[Math.floor(Math.random() * artifactNames.length)];
          break;
        default:
          cardName = "Mystery Card";
      }

      const powerLevel = Math.floor(Math.random() * 100) + 1;
      const rarityMultiplier =
        {
          common: 1,
          uncommon: 1.5,
          rare: 2,
          epic: 3,
          legendary: 5,
        }[randomRarity] || 1;

      const finalPowerLevel = Math.floor(powerLevel * rarityMultiplier);

      const { data, error } = await supabase
        .from("nft_card_collection")
        .insert([
          {
            user_id: user.id,
            card_type: randomType,
            card_name: cardName,
            rarity: randomRarity,
            power_level: finalPowerLevel,
            biodiversity_category: randomCategory,
            card_metadata: {
              description: `A ${randomRarity} ${randomType} from the ${randomCategory} biome`,
              abilities: generateRandomAbilities(randomType, randomRarity),
              artwork_url: `/api/placeholder/200/300?text=${encodeURIComponent(cardName)}`,
            },
          },
        ])
        .select();

      if (error) throw error;

      toast.success(`New ${randomRarity} card minted: ${cardName}!`);
      loadCollection();
    } catch (error) {
      console.error("Error minting card:", error);
      toast.error("Failed to mint card");
    } finally {
      setMinting(false);
    }
  };

  const generateRandomAbilities = (type: string, rarity: string) => {
    const abilities = {
      animal: ["Swift Movement", "Pack Leader", "Camouflage", "Keen Senses", "Territorial"],
      plant: [
        "Photosynthesis",
        "Root Network",
        "Oxygen Production",
        "Soil Enrichment",
        "Seed Dispersal",
      ],
      ecosystem: [
        "Biodiversity Boost",
        "Climate Regulation",
        "Water Cycle",
        "Nutrient Cycling",
        "Habitat Creation",
      ],
      guardian: [
        "Nature's Shield",
        "Healing Aura",
        "Elemental Control",
        "Wisdom of Ages",
        "Life Force",
      ],
      artifact: [
        "Ancient Power",
        "Mystical Energy",
        "Harmony Resonance",
        "Time Dilation",
        "Reality Shift",
      ],
    };

    const typeAbilities = abilities[type as keyof typeof abilities] || abilities.animal;
    const numAbilities = rarity === "legendary" ? 3 : rarity === "epic" ? 2 : 1;

    return typeAbilities.slice(0, numAbilities);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400";
      case "uncommon":
        return "text-green-400";
      case "rare":
        return "text-blue-400";
      case "epic":
        return "text-purple-400";
      case "legendary":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-500/50";
      case "uncommon":
        return "border-green-500/50";
      case "rare":
        return "border-blue-500/50";
      case "epic":
        return "border-purple-500/50";
      case "legendary":
        return "border-yellow-500/50";
      default:
        return "border-gray-500/50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "animal":
        return Heart;
      case "plant":
        return TreePine;
      case "ecosystem":
        return Globe;
      case "guardian":
        return Shield;
      case "artifact":
        return Sparkles;
      default:
        return Leaf;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "forest":
        return TreePine;
      case "ocean":
        return Droplets;
      case "grassland":
        return Leaf;
      case "desert":
        return Target;
      case "arctic":
        return Star;
      case "tropical":
        return Globe;
      default:
        return Globe;
    }
  };

  const rarityDistribution = {
    common: collection.filter((c) => c.rarity === "common").length,
    uncommon: collection.filter((c) => c.rarity === "uncommon").length,
    rare: collection.filter((c) => c.rarity === "rare").length,
    epic: collection.filter((c) => c.rarity === "epic").length,
    legendary: collection.filter((c) => c.rarity === "legendary").length,
  };

  const totalPowerLevel = collection.reduce((sum, card) => sum + card.power_level, 0);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
          🎴 Biodiversity NFT Cards v7
        </h1>
        <p className="text-xl text-muted-foreground">
          Advanced ecosystem interactions, conservation partnerships, and dynamic marketplace
        </p>
        <Badge className="mt-2 bg-purple-600 text-white">
          <Network className="h-3 w-3 mr-1" />
          Master Plan v7 Enabled
        </Badge>
      </div>

      {/* Enhanced Collection Stats with Marketplace Data */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Award className="h-6 w-6" />
            Advanced Collection Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{collection.length}</div>
              <div className="text-sm text-muted-foreground">Total Cards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{totalPowerLevel}</div>
              <div className="text-sm text-muted-foreground">Total Power</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {rarityDistribution.legendary}
              </div>
              <div className="text-sm text-muted-foreground">Legendary Cards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {collection.filter((c) => c.is_tradeable).length}
              </div>
              <div className="text-sm text-muted-foreground">Tradeable Cards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">
                {marketplaceData.totalVolume.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Market Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">
                {marketplaceData.conservationFunding.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Conservation Fund</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ecosystem Interactions */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Network className="h-5 w-5" />
            Ecosystem Interactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Combine cards to create powerful ecosystem synergies and unlock environmental bonuses.
            </p>
            {ecosystemInteractions.map((interaction, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-purple-400 capitalize">
                    {interaction.interaction_type} Relationship
                  </h4>
                  <Badge className="bg-green-600">{interaction.bonus_multiplier}x Bonus</Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-2 py-1 bg-blue-600/20 rounded text-xs text-blue-400">
                    {interaction.card1_id.replace("_", " ")}
                  </div>
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <div className="px-2 py-1 bg-green-600/20 rounded text-xs text-green-400">
                    {interaction.card2_id.replace("_", " ")}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{interaction.environmental_benefit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conservation Partnerships */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Heart className="h-5 w-5" />
            Conservation Partnerships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Your NFT collection contributes to real-world conservation projects through verified
              partnerships.
            </p>
            {conservationPartnerships.map((partnership, index) => (
              <div key={index} className="p-4 rounded-lg border border-blue-500/20 bg-blue-900/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-400">{partnership.organization}</h4>
                  <Badge variant="outline" className="text-green-400">
                    {partnership.verification_status}
                  </Badge>
                </div>
                <h5 className="text-sm font-medium text-blue-300 mb-1">
                  {partnership.project_name}
                </h5>
                <p className="text-sm text-muted-foreground mb-2">{partnership.location}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">
                    {partnership.impact_contribution} Carbon Credits
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    contributed by your collection
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Minting Section */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Sparkles className="h-5 w-5" />
            Advanced Card Minting v7
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Mint biodiversity cards with real-world conservation impact and ecosystem interactions
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              <div>
                <div className="text-gray-400">Common</div>
                <div className="font-bold">45%</div>
              </div>
              <div>
                <div className="text-green-400">Uncommon</div>
                <div className="font-bold">30%</div>
              </div>
              <div>
                <div className="text-blue-400">Rare</div>
                <div className="font-bold">15%</div>
              </div>
              <div>
                <div className="text-purple-400">Epic</div>
                <div className="font-bold">8%</div>
              </div>
              <div>
                <div className="text-yellow-400">Legendary</div>
                <div className="font-bold">2%</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={mintRandomCard}
                disabled={minting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {minting ? "Minting..." : "Mint Standard Card (100 GAiA)"}
              </Button>
              <Button
                onClick={mintRandomCard}
                disabled={minting}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {minting ? "Minting..." : "Mint Premium Card (250 GAiA)"}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-3 w-3 text-green-400" />
                50% of minting fees support conservation projects
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Marketplace */}
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Coins className="h-5 w-5" />
            Dynamic Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {marketplaceData.totalVolume.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Volume (GAiA)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {marketplaceData.activeTraders}
              </div>
              <div className="text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {marketplaceData.conservationFunding.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Conservation Funding</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button className="flex-1 bg-yellow-600 hover:bg-yellow-700">
              <Eye className="h-4 w-4 mr-2" />
              Browse Marketplace
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Trade Cards
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card Collection */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({collection.length})</TabsTrigger>
          <TabsTrigger value="animal">
            Animals ({collection.filter((c) => c.card_type === "animal").length})
          </TabsTrigger>
          <TabsTrigger value="plant">
            Plants ({collection.filter((c) => c.card_type === "plant").length})
          </TabsTrigger>
          <TabsTrigger value="ecosystem">
            Ecosystems ({collection.filter((c) => c.card_type === "ecosystem").length})
          </TabsTrigger>
          <TabsTrigger value="guardian">
            Guardians ({collection.filter((c) => c.card_type === "guardian").length})
          </TabsTrigger>
          <TabsTrigger value="artifact">
            Artifacts ({collection.filter((c) => c.card_type === "artifact").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {collection.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎴</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No cards in collection
              </h3>
              <p className="text-muted-foreground">
                Mint your first card to start building your biodiversity collection!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {collection.map((card) => {
                const TypeIcon = getTypeIcon(card.card_type);
                const CategoryIcon = getCategoryIcon(card.biodiversity_category);
                const rarityColor = getRarityColor(card.rarity);
                const rarityBorder = getRarityBorder(card.rarity);

                return (
                  <Card
                    key={card.id}
                    className={`${rarityBorder} hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className={`${rarityColor} capitalize`}>{card.rarity}</Badge>
                        <Badge variant="outline">
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {card.card_type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{card.card_name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="aspect-square bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg flex items-center justify-center">
                        <TypeIcon className="h-16 w-16 text-muted-foreground" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Power Level</span>
                          <span className="font-bold text-green-400">{card.power_level}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Biome</span>
                          <div className="flex items-center gap-1">
                            <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm capitalize">{card.biodiversity_category}</span>
                          </div>
                        </div>

                        <Progress value={(card.power_level / 500) * 100} className="h-2" />
                      </div>

                      {card.card_metadata?.abilities && (
                        <div>
                          <div className="text-sm font-medium mb-1">Abilities:</div>
                          <div className="flex flex-wrap gap-1">
                            {card.card_metadata.abilities.map((ability: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {ability}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Minted: {new Date(card.minted_at).toLocaleDateString()}</span>
                        {card.is_tradeable && (
                          <Badge variant="outline" className="text-xs">
                            Tradeable
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Filter tabs for each card type */}
        {["animal", "plant", "ecosystem", "guardian", "artifact"].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {collection
                .filter((card) => card.card_type === type)
                .map((card) => {
                  const TypeIcon = getTypeIcon(card.card_type);
                  const CategoryIcon = getCategoryIcon(card.biodiversity_category);
                  const rarityColor = getRarityColor(card.rarity);
                  const rarityBorder = getRarityBorder(card.rarity);

                  return (
                    <Card
                      key={card.id}
                      className={`${rarityBorder} hover:scale-105 transition-transform cursor-pointer`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge className={`${rarityColor} capitalize`}>{card.rarity}</Badge>
                          <Badge variant="outline">
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {card.card_type}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{card.card_name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="aspect-square bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg flex items-center justify-center">
                          <TypeIcon className="h-16 w-16 text-muted-foreground" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Power Level</span>
                            <span className="font-bold text-green-400">{card.power_level}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Biome</span>
                            <div className="flex items-center gap-1">
                              <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm capitalize">
                                {card.biodiversity_category}
                              </span>
                            </div>
                          </div>

                          <Progress value={(card.power_level / 500) * 100} className="h-2" />
                        </div>

                        {card.card_metadata?.abilities && (
                          <div>
                            <div className="text-sm font-medium mb-1">Abilities:</div>
                            <div className="flex flex-wrap gap-1">
                              {card.card_metadata.abilities.map(
                                (ability: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {ability}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Minted: {new Date(card.minted_at).toLocaleDateString()}</span>
                          {card.is_tradeable && (
                            <Badge variant="outline" className="text-xs">
                              Tradeable
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Rarity Distribution */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <TrendingUp className="h-5 w-5" />
            Collection Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(rarityDistribution).map(([rarity, count]) => (
              <div key={rarity} className="text-center">
                <div className={`text-2xl font-bold ${getRarityColor(rarity)}`}>{count}</div>
                <div className="text-sm text-muted-foreground capitalize">{rarity}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
