import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  Heart,
  Fish,
  TreePine,
  Waves,
  Mountain,
  Flame,
  Shield,
  Star,
  Crown,
  Zap,
  Globe,
  MapPin,
  Camera,
  Home,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";
import { gaiaTokenService } from "@/services/gaiaTokenService";

interface AnimalNFT {
  id: string;
  name: string;
  species: string;
  emoji: string;
  price: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythical";
  conservationImpact: string;
  tokensForConservation: number;
  healthStatus: number;
  location: string;
  liveFeed: boolean;
  currentHabitat: string;
  needsRelocation: boolean;
  targetAmount: number;
  raisedAmount: number;
  ownedBy?: string;
  virtualExploration: boolean;
  gameUpgrades: string[];
  investmentMultiplier: number;
}

export function LiveAnimalNFTs() {
  const [availableNFTs] = useState<AnimalNFT[]>([
    // Mammals
    {
      id: "1",
      name: "Azure Ocean Guardian",
      species: "Blue Whale",
      emoji: "🐋",
      price: 850,
      rarity: "Mythical",
      conservationImpact: "Protects 10,000 sq km of ocean",
      tokensForConservation: 200,
      healthStatus: 95,
      location: "Pacific Ocean Sanctuary",
      liveFeed: true,
      currentHabitat: "Deep Ocean Trench",
      needsRelocation: false,
      targetAmount: 1000,
      raisedAmount: 850,
      virtualExploration: true,
      gameUpgrades: ["Ocean Commander", "Sonar Boost", "Deep Dive"],
      investmentMultiplier: 2.5,
    },
    {
      id: "2",
      name: "Jungle Heart",
      species: "Siberian Tiger",
      emoji: "🐅",
      price: 750,
      rarity: "Legendary",
      conservationImpact: "Protects 5,000 acres of jungle",
      tokensForConservation: 150,
      healthStatus: 90,
      location: "Siberian Wildlife Reserve",
      liveFeed: true,
      currentHabitat: "Deforested Area",
      needsRelocation: true,
      targetAmount: 1200,
      raisedAmount: 350,
      virtualExploration: true,
      gameUpgrades: ["Stealth Master", "Jungle King", "Hunt Precision"],
      investmentMultiplier: 2.2,
    },
    {
      id: "3",
      name: "Ancient Forest Keeper",
      species: "Giant Panda",
      emoji: "🐼",
      price: 650,
      rarity: "Epic",
      conservationImpact: "Saves 1,000 bamboo forests",
      tokensForConservation: 120,
      healthStatus: 87,
      location: "Chinese Bamboo Mountains",
      liveFeed: true,
      currentHabitat: "Bamboo Grove",
      needsRelocation: false,
      targetAmount: 800,
      raisedAmount: 650,
      virtualExploration: true,
      gameUpgrades: ["Bamboo Master", "Peaceful Aura", "Forest Guardian"],
      investmentMultiplier: 1.8,
    },
    {
      id: "4",
      name: "Arctic Spirit",
      species: "Polar Bear",
      emoji: "🐻‍❄️",
      price: 700,
      rarity: "Legendary",
      conservationImpact: "Protects Arctic ice habitat",
      tokensForConservation: 140,
      healthStatus: 88,
      location: "Arctic Circle",
      liveFeed: true,
      currentHabitat: "Melting Ice Shelf",
      needsRelocation: true,
      targetAmount: 900,
      raisedAmount: 500,
      virtualExploration: true,
      gameUpgrades: ["Ice Walker", "Cold Resistance", "Arctic Predator"],
      investmentMultiplier: 2.1,
    },
    {
      id: "5",
      name: "Savanna Thunder",
      species: "African Elephant",
      emoji: "🐘",
      price: 800,
      rarity: "Legendary",
      conservationImpact: "Protects elephant corridors",
      tokensForConservation: 160,
      healthStatus: 92,
      location: "Kenyan Savanna",
      liveFeed: true,
      currentHabitat: "Protected Reserve",
      needsRelocation: false,
      targetAmount: 1000,
      raisedAmount: 800,
      virtualExploration: true,
      gameUpgrades: ["Mighty Charge", "Memory Keeper", "Herd Leader"],
      investmentMultiplier: 2.3,
    },
    // Birds
    {
      id: "6",
      name: "Sky Sovereign",
      species: "Golden Eagle",
      emoji: "🦅",
      price: 450,
      rarity: "Epic",
      conservationImpact: "Preserves 2,500 acres of sky habitat",
      tokensForConservation: 85,
      healthStatus: 92,
      location: "Rocky Mountain Heights",
      liveFeed: true,
      currentHabitat: "Mountain Peak",
      needsRelocation: false,
      targetAmount: 600,
      raisedAmount: 450,
      virtualExploration: true,
      gameUpgrades: ["Sky Dominance", "Sharp Vision", "Wind Master"],
      investmentMultiplier: 1.7,
    },
    {
      id: "7",
      name: "Rainbow Wing Protector",
      species: "Monarch Butterfly",
      emoji: "🦋",
      price: 250,
      rarity: "Rare",
      conservationImpact: "Saves 500 butterfly habitats",
      tokensForConservation: 50,
      healthStatus: 88,
      location: "Mexican Mountain Reserve",
      liveFeed: true,
      currentHabitat: "Polluted Valley",
      needsRelocation: true,
      targetAmount: 400,
      raisedAmount: 180,
      virtualExploration: true,
      gameUpgrades: ["Migration Master", "Pollination Boost", "Color Shift"],
      investmentMultiplier: 1.4,
    },
    {
      id: "8",
      name: "Antarctic Emperor",
      species: "Emperor Penguin",
      emoji: "🐧",
      price: 520,
      rarity: "Epic",
      conservationImpact: "Protects Antarctic colonies",
      tokensForConservation: 100,
      healthStatus: 85,
      location: "Antarctic Ice Sheet",
      liveFeed: true,
      currentHabitat: "Ice Colony",
      needsRelocation: false,
      targetAmount: 700,
      raisedAmount: 520,
      virtualExploration: true,
      gameUpgrades: ["Ice Slide", "Deep Dive", "Colony Leader"],
      investmentMultiplier: 1.9,
    },
    // Marine Life
    {
      id: "9",
      name: "Coral Guardian",
      species: "Great White Shark",
      emoji: "🦈",
      price: 600,
      rarity: "Epic",
      conservationImpact: "Protects coral reef ecosystems",
      tokensForConservation: 110,
      healthStatus: 89,
      location: "Great Barrier Reef",
      liveFeed: true,
      currentHabitat: "Coral Reef",
      needsRelocation: false,
      targetAmount: 750,
      raisedAmount: 600,
      virtualExploration: true,
      gameUpgrades: ["Apex Predator", "Ocean Navigator", "Reef Protector"],
      investmentMultiplier: 2.0,
    },
    {
      id: "10",
      name: "Ocean Wanderer",
      species: "Sea Turtle",
      emoji: "🐢",
      price: 480,
      rarity: "Rare",
      conservationImpact: "Protects nesting beaches",
      tokensForConservation: 90,
      healthStatus: 91,
      location: "Pacific Nesting Beach",
      liveFeed: true,
      currentHabitat: "Protected Beach",
      needsRelocation: false,
      targetAmount: 600,
      raisedAmount: 480,
      virtualExploration: true,
      gameUpgrades: ["Shell Shield", "Navigation Master", "Longevity"],
      investmentMultiplier: 1.6,
    },
    // Primates
    {
      id: "11",
      name: "Forest Wisdom",
      species: "Orangutan",
      emoji: "🦧",
      price: 680,
      rarity: "Legendary",
      conservationImpact: "Saves Borneo rainforest",
      tokensForConservation: 130,
      healthStatus: 86,
      location: "Borneo Rainforest",
      liveFeed: true,
      currentHabitat: "Threatened Forest",
      needsRelocation: true,
      targetAmount: 850,
      raisedAmount: 400,
      virtualExploration: true,
      gameUpgrades: ["Tree Climber", "Tool Master", "Forest Sage"],
      investmentMultiplier: 2.1,
    },
    {
      id: "12",
      name: "Mountain Strength",
      species: "Mountain Gorilla",
      emoji: "🦍",
      price: 720,
      rarity: "Legendary",
      conservationImpact: "Protects mountain forests",
      tokensForConservation: 145,
      healthStatus: 93,
      location: "Virunga Mountains",
      liveFeed: true,
      currentHabitat: "Mountain Forest",
      needsRelocation: false,
      targetAmount: 900,
      raisedAmount: 720,
      virtualExploration: true,
      gameUpgrades: ["Gentle Giant", "Family Leader", "Mountain King"],
      investmentMultiplier: 2.4,
    },
  ]);

  const [myNFTs, setMyNFTs] = useState<AnimalNFT[]>([]);
  const [totalConservationImpact, setTotalConservationImpact] = useState(0);
  const [liveFeeds, setLiveFeeds] = useState<{ [key: string]: string }>({});
  const [exploreMode, setExploreMode] = useState<string | null>(null);

  useEffect(() => {
    // Simulate live feed updates
    const interval = setInterval(() => {
      const feedMessages = [
        "Feeding time - enjoying fresh food",
        "Playing with companions",
        "Resting in natural habitat",
        "Exploring new territory",
        "Healthy and active",
        "Interacting with researchers",
        "Enjoying environmental enrichment",
        "Searching for better habitat",
        "Receiving medical care",
        "Teaching young ones",
      ];

      const newFeeds: { [key: string]: string } = {};
      availableNFTs.forEach((nft) => {
        if (nft.liveFeed) {
          newFeeds[nft.id] = feedMessages[Math.floor(Math.random() * feedMessages.length)];
        }
      });
      setLiveFeeds(newFeeds);
    }, 5000);

    return () => clearInterval(interval);
  }, [availableNFTs]);

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

  const purchaseAnimalNFT = async (nft: AnimalNFT) => {
    try {
      // Burn tokens for conservation
      const burnSuccess = await gaiaTokenService.burnTokens(
        nft.tokensForConservation,
        `Conservation for ${nft.name}`
      );

      if (burnSuccess) {
        setMyNFTs((prev) => [...prev, nft]);
        setTotalConservationImpact((prev) => prev + nft.tokensForConservation);

        toast.success(`🦋 ${nft.name} Adopted!`, {
          description: `${nft.conservationImpact} | ${nft.tokensForConservation} GAiA tokens burned for conservation! Investment multiplier: ${nft.investmentMultiplier}x`,
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Adoption failed - please try again");
    }
  };

  const upgradeInvestment = async (nft: AnimalNFT) => {
    const upgradeAmount = Math.floor(nft.price * 0.5); // 50% of original price for upgrade
    try {
      const burnSuccess = await gaiaTokenService.burnTokens(
        upgradeAmount,
        `Investment upgrade for ${nft.name}`
      );

      if (burnSuccess) {
        toast.success(`💎 Investment Upgraded!`, {
          description: `${nft.name} investment multiplier increased! Burned ${upgradeAmount} GAiA tokens`,
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("Upgrade failed - please try again");
    }
  };

  const exploreHabitat = (nft: AnimalNFT) => {
    setExploreMode(nft.id);
    toast.success(`🌍 Virtual Habitat Exploration Started!`, {
      description: `Exploring ${nft.currentHabitat} with ${nft.name}`,
      duration: 3000,
    });
  };

  const fundRelocation = async (nft: AnimalNFT) => {
    const donationAmount = 50;
    try {
      const burnSuccess = await gaiaTokenService.burnTokens(
        donationAmount,
        `Relocation fund for ${nft.name}`
      );

      if (burnSuccess) {
        toast.success(`💚 Relocation Fund Donation!`, {
          description: `${donationAmount} GAiA tokens burned to help ${nft.name} find a better home!`,
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("Donation failed - please try again");
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Investment Stats */}
      <Card className="border-2 border-pink-500/50 bg-gradient-to-br from-pink-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-pink-400 flex items-center gap-2">
            <Fish className="h-6 w-6" />
            🦋 Live Animal NFT Sanctuary - Real Conservation & Game Investment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{myNFTs.length}</div>
              <div className="text-sm text-muted-foreground">Animals Adopted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{totalConservationImpact}</div>
              <div className="text-sm text-muted-foreground">GAiA Burned for Conservation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{availableNFTs.length}</div>
              <div className="text-sm text-muted-foreground">Animals Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-muted-foreground">Live Feed Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {myNFTs.reduce((sum, nft) => sum + nft.investmentMultiplier, 0).toFixed(1)}x
              </div>
              <div className="text-sm text-muted-foreground">Total Investment Multiplier</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Animal NFTs */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">
            🌍 Living Animal NFT Collection - All Species Available
          </CardTitle>
          <p className="text-muted-foreground">
            Own real animals, upgrade your gaming power, and multiply your investment through
            conservation impact
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {availableNFTs.map((nft) => (
              <Card
                key={nft.id}
                className={`bg-gradient-to-br ${getRarityColor(nft.rarity)}/20 border-2 hover:scale-105 transition-all duration-300 ${
                  exploreMode === nft.id ? "ring-4 ring-cyan-400 animate-pulse" : ""
                }`}
              >
                <CardContent className="p-3 space-y-3">
                  {/* Animal Display */}
                  <div className="relative h-24 bg-gradient-to-br from-black/30 to-gray-900/30 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-4xl animate-pulse">{nft.emoji}</div>
                    <div className="absolute top-1 left-1">
                      <Badge
                        className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white text-xs`}
                      >
                        {nft.rarity}
                      </Badge>
                    </div>
                    {nft.liveFeed && (
                      <div className="absolute top-1 right-1">
                        <div className="flex items-center gap-1 bg-red-600 text-white px-1 py-0.5 rounded text-xs">
                          <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                          LIVE
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1">
                      <Badge className="bg-green-600 text-xs">{nft.investmentMultiplier}x</Badge>
                    </div>
                  </div>

                  {/* Animal Info */}
                  <div>
                    <h4 className="font-bold text-sm text-white">{nft.name}</h4>
                    <p className="text-xs text-muted-foreground">{nft.species}</p>
                    <div className="flex items-center gap-1 text-xs text-blue-400">
                      <MapPin className="h-2 w-2" />
                      {nft.location}
                    </div>
                  </div>

                  {/* Game Upgrades */}
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-purple-400">Game Upgrades:</div>
                    <div className="flex flex-wrap gap-1">
                      {nft.gameUpgrades.slice(0, 2).map((upgrade, index) => (
                        <Badge key={index} className="bg-purple-600 text-xs">
                          {upgrade}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Health Status */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Health:</span>
                      <span className="text-green-400 font-bold">{nft.healthStatus}%</span>
                    </div>
                    <Progress value={nft.healthStatus} className="h-1" />
                  </div>

                  {/* Investment Info */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Investment Multiplier:</span>
                      <span className="text-yellow-400 font-bold">{nft.investmentMultiplier}x</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Conservation Impact:</span>
                      <div className="flex items-center gap-1">
                        <Flame className="h-2 w-2 text-orange-400" />
                        <span className="text-orange-400 font-bold">
                          {nft.tokensForConservation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Purchase */}
                  <div className="space-y-2 pt-1 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{nft.price} GAiA</div>
                      <div className="text-xs text-muted-foreground">Adoption Price</div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => purchaseAnimalNFT(nft)}
                        size="sm"
                        className={`flex-1 bg-gradient-to-r ${getRarityColor(nft.rarity)} hover:opacity-90 text-xs`}
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Adopt
                      </Button>
                      <Button
                        onClick={() => upgradeInvestment(nft)}
                        size="sm"
                        variant="outline"
                        className="border-yellow-500/30 text-xs"
                      >
                        <Zap className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Animal NFTs */}
      {myNFTs.length > 0 && (
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400">🏠 My Animal Sanctuary - Adopted NFTs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {myNFTs.map((nft, index) => (
                <Card key={`owned-${index}`} className="border-green-500/30">
                  <CardContent className="p-3 text-center">
                    <div className="text-3xl mb-1">{nft.emoji}</div>
                    <h4 className="font-bold text-green-400 text-sm">{nft.name}</h4>
                    <p className="text-xs text-muted-foreground">{nft.species}</p>
                    <Badge className="mt-1 bg-green-600 text-xs">
                      Investment: {nft.investmentMultiplier}x
                    </Badge>
                    <div className="mt-1 flex gap-1">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        <Camera className="h-2 w-2 mr-1" />
                        Visit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        <Sparkles className="h-2 w-2 mr-1" />
                        Play
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* GAiA Token Integration */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center">
            🚀 Powered by GAiA Token Conservation & Investment System
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
              Every Animal NFT purchase burns GAiA tokens for real conservation and provides gaming
              upgrades with investment multipliers. Collect all species to maximize your portfolio
              and save the planet!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
