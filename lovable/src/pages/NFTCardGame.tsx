import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Plus,
  Trophy,
  Shuffle,
  Crown,
  Leaf,
  Fish,
  Mountain,
  TreePine,
  Flower2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { NFTCard } from "@/types/ui-types";
import { parseJsonField } from "@/types/ui-types";

export default function NFTCardGame() {
  const [collection, setCollection] = useState<NFTCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<NFTCard | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [userStats, setUserStats] = useState({
    totalCards: 0,
    rareCards: 0,
    powerLevel: 0,
    tradingScore: 0,
  });

  const loadCollection = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from("nft_card_collection")
        .select("*")
        .eq("user_id", user.user.id)
        .order("minted_at", { ascending: false });

      if (error) throw error;

      if (data) {
        // Map database data to NFTCard interface
        const mappedCards: NFTCard[] = data.map((dbCard) => ({
          id: dbCard.id,
          card_name: dbCard.card_name,
          card_type: dbCard.card_type,
          rarity: dbCard.rarity,
          power_level: dbCard.power_level,
          biodiversity_category: dbCard.biodiversity_category || "",
          user_id: dbCard.user_id,
          minted_at: dbCard.minted_at,
          is_tradeable: dbCard.is_tradeable,
          card_metadata: parseJsonField(dbCard.card_metadata, {
            image_url: "",
            description: "",
            traits: [],
            conservation_info: "",
            abilities: [],
          }),
        }));

        setCollection(mappedCards);

        // Update user stats
        const totalCards = mappedCards.length;
        const rareCards = mappedCards.filter((card) =>
          ["rare", "epic", "legendary"].includes(card.rarity),
        ).length;
        const powerLevel = mappedCards.reduce(
          (sum, card) => sum + card.power_level,
          0,
        );

        setUserStats({
          totalCards,
          rareCards,
          powerLevel,
          tradingScore: Math.floor(powerLevel / 10),
        });
      }
    } catch (error) {
      console.error("Error loading collection:", error);
      toast.error("Failed to load your collection");
    }
  };

  useEffect(() => {
    loadCollection();
  }, []);

  const generateNewCard = async () => {
    try {
      setIsGenerating(true);
      setGenerationProgress(0);

      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        toast.error("Please log in to generate cards");
        return;
      }

      // Simulate generation progress
      const progressSteps = [
        "Scanning global biodiversity data...",
        "Analyzing ecosystem health...",
        "Generating unique card attributes...",
        "Creating conservation metadata...",
        "Minting NFT card...",
      ];

      for (let i = 0; i < progressSteps.length; i++) {
        toast.info(progressSteps[i]);
        setGenerationProgress(((i + 1) / progressSteps.length) * 100);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // Generate random card attributes
      const cardTypes = [
        "creature",
        "habitat",
        "conservation",
        "ecosystem",
        "climate",
      ];
      const rarities = ["common", "rare", "epic", "legendary", "mythical"];
      const rarityWeights = [50, 30, 15, 4, 1]; // Percentage chances
      const biodiversityCategories = [
        "marine",
        "forest",
        "grassland",
        "wetland",
        "tundra",
        "desert",
      ];

      // Weighted rarity selection
      const randomValue = Math.random() * 100;
      let cumulativeWeight = 0;
      let selectedRarity = "common";

      for (let i = 0; i < rarities.length; i++) {
        cumulativeWeight += rarityWeights[i];
        if (randomValue <= cumulativeWeight) {
          selectedRarity = rarities[i];
          break;
        }
      }

      const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      const biodiversityCategory =
        biodiversityCategories[
          Math.floor(Math.random() * biodiversityCategories.length)
        ];
      const powerLevel =
        Math.floor(Math.random() * 100) +
        (selectedRarity === "legendary"
          ? 80
          : selectedRarity === "epic"
            ? 60
            : selectedRarity === "rare"
              ? 40
              : 20);

      const cardNames = {
        creature: [
          "Azure Whale",
          "Golden Eagle",
          "Red Panda",
          "Arctic Fox",
          "Monarch Butterfly",
        ],
        habitat: [
          "Coral Reef Paradise",
          "Ancient Forest",
          "Mountain Peak",
          "Desert Oasis",
          "Wetland Sanctuary",
        ],
        conservation: [
          "Wildlife Protector",
          "Ocean Guardian",
          "Forest Keeper",
          "Climate Champion",
          "Species Savior",
        ],
        ecosystem: [
          "Symbiotic Network",
          "Carbon Cycle",
          "Pollination Hub",
          "Nutrient Flow",
          "Biodiversity Web",
        ],
        climate: [
          "Solar Harmony",
          "Rain Cycle",
          "Wind Patterns",
          "Temperature Balance",
          "Seasonal Rhythm",
        ],
      };

      const cardName =
        cardNames[cardType as keyof typeof cardNames][
          Math.floor(
            Math.random() *
              cardNames[cardType as keyof typeof cardNames].length,
          )
        ];

      const newCardData = {
        user_id: user.user.id,
        card_name: cardName,
        card_type: cardType,
        rarity: selectedRarity,
        power_level: powerLevel,
        biodiversity_category: biodiversityCategory,
        is_tradeable: true,
        card_metadata: {
          image_url: `https://images.unsplash.com/400x600/?${cardType},${biodiversityCategory}`,
          description: `A ${selectedRarity} ${cardType} card representing the ${biodiversityCategory} ecosystem. This card embodies the spirit of ${cardName} with ${powerLevel} power level.`,
          traits: [
            { trait_type: "Ecosystem", value: biodiversityCategory },
            { trait_type: "Type", value: cardType },
            { trait_type: "Rarity", value: selectedRarity },
            { trait_type: "Power Level", value: powerLevel.toString() },
          ],
          conservation_info: `This card supports conservation efforts in ${biodiversityCategory} ecosystems and helps raise awareness about ${cardName}.`,
          abilities:
            selectedRarity === "legendary"
              ? ["Ultimate Power", "Ecosystem Dominance"]
              : selectedRarity === "epic"
                ? ["Enhanced Abilities", "Rare Traits"]
                : selectedRarity === "rare"
                  ? ["Special Skills"]
                  : [],
        },
      };

      const { data, error } = await supabase
        .from("nft_card_collection")
        .insert(newCardData)
        .select()
        .single();

      if (error) throw error;

      toast.success(`New ${selectedRarity} card generated: ${cardName}!`);
      loadCollection(); // Reload collection
    } catch (error) {
      console.error("Error generating card:", error);
      toast.error("Failed to generate new card");
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "mythical":
        return "from-purple-500 to-pink-500";
      case "legendary":
        return "from-yellow-400 to-orange-500";
      case "epic":
        return "from-purple-400 to-blue-500";
      case "rare":
        return "from-blue-400 to-green-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case "creature":
        return <Fish className="h-5 w-5" />;
      case "habitat":
        return <TreePine className="h-5 w-5" />;
      case "conservation":
        return <Crown className="h-5 w-5" />;
      case "ecosystem":
        return <Leaf className="h-5 w-5" />;
      case "climate":
        return <Mountain className="h-5 w-5" />;
      default:
        return <Flower2 className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            ✨ NFT Biodiversity Card Game
          </h1>
          <p className="text-xl text-purple-300">
            Collect, Trade & Protect Nature's Wonders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-900/30 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Total Cards</p>
                  <p className="text-2xl font-bold text-white">
                    {userStats.totalCards}
                  </p>
                </div>
                <Sparkles className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Rare Cards</p>
                  <p className="text-2xl font-bold text-white">
                    {userStats.rareCards}
                  </p>
                </div>
                <Crown className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Power Level</p>
                  <p className="text-2xl font-bold text-white">
                    {userStats.powerLevel}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-900/30 border-amber-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-300 text-sm">Trading Score</p>
                  <p className="text-2xl font-bold text-white">
                    {userStats.tradingScore}
                  </p>
                </div>
                <Shuffle className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generate Card Section */}
        <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Plus className="h-6 w-6" />
              Generate New Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Use AI to generate unique biodiversity cards with real
              conservation data and stunning visuals.
            </p>

            {isGenerating && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Generating your unique card...</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>
            )}

            <Button
              onClick={generateNewCard}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? "Generating..." : "Generate New Card"}
            </Button>
          </CardContent>
        </Card>

        {/* Card Collection */}
        <Tabs defaultValue="collection" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="collection">My Collection</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="battles">Card Battles</TabsTrigger>
          </TabsList>

          <TabsContent value="collection">
            <Card>
              <CardHeader>
                <CardTitle>Your NFT Card Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {collection.map((card) => (
                    <Card
                      key={card.id}
                      className={`bg-gradient-to-br ${getRarityColor(card.rarity)} p-1 cursor-pointer transform transition-transform hover:scale-105`}
                      onClick={() => setSelectedCard(card)}
                    >
                      <div className="bg-gray-900 rounded-lg p-4 h-full">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            className={`bg-gradient-to-r ${getRarityColor(card.rarity)}`}
                          >
                            {card.rarity.toUpperCase()}
                          </Badge>
                          {getCardIcon(card.card_type)}
                        </div>

                        <div className="mb-3">
                          <img
                            src={card.card_metadata.image_url}
                            alt={card.card_name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>

                        <h3 className="font-bold text-white mb-1">
                          {card.card_name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {card.card_metadata.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-purple-300">Power:</span>
                            <span className="text-white font-bold ml-1">
                              {card.power_level}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {card.biodiversity_category}
                          </Badge>
                        </div>

                        {card.card_metadata.abilities &&
                          card.card_metadata.abilities.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-green-400">
                                Abilities:{" "}
                                {card.card_metadata.abilities.join(", ")}
                              </p>
                            </div>
                          )}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace">
            <Card>
              <CardHeader>
                <CardTitle>NFT Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Marketplace coming soon! Trade your cards with other
                  collectors.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="battles">
            <Card>
              <CardHeader>
                <CardTitle>Card Battles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Battle system coming soon! Use your cards to compete and earn
                  rewards.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Card Detail Modal */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card
              className={`bg-gradient-to-br ${getRarityColor(selectedCard.rarity)} p-1 max-w-md w-full`}
            >
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedCard.card_name}
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCard(null)}
                    className="text-white hover:bg-white/10"
                  >
                    ×
                  </Button>
                </div>

                <img
                  src={selectedCard.card_metadata.image_url}
                  alt={selectedCard.card_name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Badge
                      className={`bg-gradient-to-r ${getRarityColor(selectedCard.rarity)}`}
                    >
                      {selectedCard.rarity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{selectedCard.card_type}</Badge>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {selectedCard.card_metadata.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-purple-300">Power Level</p>
                      <p className="text-xl font-bold text-white">
                        {selectedCard.power_level}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-green-300">Ecosystem</p>
                      <p className="text-sm text-white">
                        {selectedCard.biodiversity_category}
                      </p>
                    </div>
                  </div>

                  {selectedCard.card_metadata.abilities &&
                    selectedCard.card_metadata.abilities.length > 0 && (
                      <div>
                        <p className="text-sm text-amber-300">
                          Special Abilities
                        </p>
                        <p className="text-sm text-white">
                          {selectedCard.card_metadata.abilities.join(", ")}
                        </p>
                      </div>
                    )}

                  <div>
                    <p className="text-sm text-blue-300">Conservation Info</p>
                    <p className="text-sm text-white">
                      {selectedCard.card_metadata.conservation_info}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-xs text-muted-foreground">
                      Minted:{" "}
                      {new Date(selectedCard.minted_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
