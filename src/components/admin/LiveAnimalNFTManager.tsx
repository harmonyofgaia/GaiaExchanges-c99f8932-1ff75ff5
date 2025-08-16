import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Crown,
  Heart,
  DollarSign,
  Activity,
  MapPin,
  Calendar,
  Shield,
  Star,
  Zap,
  Target,
  TrendingUp,
  Settings,
  Wallet,
  Gift,
  Award,
} from "lucide-react";
import { toast } from "sonner";

interface LiveAnimal {
  id: string;
  name: string;
  species: string;
  location: string;
  status: "healthy" | "protected" | "endangered" | "critical";
  nftGenerated: boolean;
  walletAddress: string;
  goalAmount: number;
  currentAmount: number;
  stats: {
    health: number;
    activity: number;
    protection: number;
    popularity: number;
  };
  traits: string[];
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythical";
}

export function LiveAnimalNFTManager() {
  const [animals, setAnimals] = useState<LiveAnimal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<LiveAnimal | null>(null);
  const [goalAmount, setGoalAmount] = useState<number>(1000);

  useEffect(() => {
    // Load registered live animals
    const registeredAnimals: LiveAnimal[] = [
      {
        id: "animal-001",
        name: "Luna the Arctic Fox",
        species: "Arctic Fox",
        location: "Alaska Wildlife Reserve",
        status: "healthy",
        nftGenerated: true,
        walletAddress: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh",
        goalAmount: 2500,
        currentAmount: 1847,
        stats: {
          health: 95,
          activity: 88,
          protection: 92,
          popularity: 76,
        },
        traits: ["White Fur", "Blue Eyes", "Playful", "Protected"],
        rarity: "Legendary",
      },
      {
        id: "animal-002",
        name: "Thunder the Eagle",
        species: "Bald Eagle",
        location: "Yellowstone National Park",
        status: "protected",
        nftGenerated: true,
        walletAddress: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh",
        goalAmount: 3000,
        currentAmount: 2156,
        stats: {
          health: 97,
          activity: 94,
          protection: 89,
          popularity: 92,
        },
        traits: ["Sharp Talons", "Keen Eyesight", "Majestic", "Wild"],
        rarity: "Mythical",
      },
      {
        id: "animal-003",
        name: "Coral the Sea Turtle",
        species: "Green Sea Turtle",
        location: "Great Barrier Reef",
        status: "endangered",
        nftGenerated: false,
        walletAddress: "",
        goalAmount: 1500,
        currentAmount: 567,
        stats: {
          health: 78,
          activity: 65,
          protection: 94,
          popularity: 83,
        },
        traits: ["Ancient Wisdom", "Ocean Navigator", "Peaceful", "Endangered"],
        rarity: "Epic",
      },
    ];
    setAnimals(registeredAnimals);
  }, []);

  const generateNFTForAnimal = (animalId: string) => {
    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === animalId
          ? {
              ...animal,
              nftGenerated: true,
              walletAddress: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh",
            }
          : animal
      )
    );

    toast.success("🎨 NFT Generated Successfully!", {
      description: "Animal NFT created and added to marketplace",
      duration: 4000,
    });
  };

  const updateGoalAmount = (animalId: string, newGoal: number) => {
    setAnimals((prev) =>
      prev.map((animal) => (animal.id === animalId ? { ...animal, goalAmount: newGoal } : animal))
    );

    toast.success("💎 Goal Amount Updated!", {
      description: `New goal set to ${newGoal} GAiA tokens`,
      duration: 3000,
    });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-600";
      case "protected":
        return "bg-blue-600";
      case "endangered":
        return "bg-orange-600";
      case "critical":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-900/30 to-green-900/30">
        <CardHeader>
          <CardTitle className="text-emerald-400 flex items-center gap-2">
            <Heart className="h-6 w-6" />
            🦋 LIVE ANIMAL NFT MANAGER - FULL ADMIN CONTROL
          </CardTitle>
          <p className="text-muted-foreground">
            Generate NFT personages for registered animals with real-life stats, wallets, and goals
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-emerald-900/30 border border-emerald-500/20 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">{animals.length}</div>
              <div className="text-sm text-muted-foreground">Registered Animals</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {animals.filter((a) => a.nftGenerated).length}
              </div>
              <div className="text-sm text-muted-foreground">NFTs Generated</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {animals.reduce((sum, a) => sum + a.currentAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Raised (GAiA)</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 border border-yellow-500/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">
                {animals.reduce((sum, a) => sum + a.goalAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Goals (GAiA)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="animals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="animals">🐾 Live Animals</TabsTrigger>
          <TabsTrigger value="nft-generator">🎨 NFT Generator</TabsTrigger>
          <TabsTrigger value="marketplace">🏪 NFT Marketplace</TabsTrigger>
          <TabsTrigger value="admin-controls">⚙️ Admin Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="animals">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map((animal) => (
              <Card
                key={animal.id}
                className={`border-2 bg-gradient-to-br ${getRarityColor(animal.rarity)}/20 hover:scale-105 transition-all`}
              >
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-white">{animal.name}</h3>
                      <p className="text-sm text-muted-foreground">{animal.species}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`${getStatusColor(animal.status)} text-white`}>
                        {animal.status}
                      </Badge>
                      <Badge
                        className={`bg-gradient-to-r ${getRarityColor(animal.rarity)} text-white`}
                      >
                        {animal.rarity}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400">{animal.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span>Health:</span>
                        <span className="text-green-400">{animal.stats.health}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activity:</span>
                        <span className="text-blue-400">{animal.stats.activity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protection:</span>
                        <span className="text-purple-400">{animal.stats.protection}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Popularity:</span>
                        <span className="text-yellow-400">{animal.stats.popularity}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Funding Progress:</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${(animal.currentAmount / animal.goalAmount) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">{animal.currentAmount} GAiA</span>
                        <span className="text-muted-foreground">
                          Goal: {animal.goalAmount} GAiA
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {animal.traits.slice(0, 3).map((trait) => (
                        <Badge key={trait} variant="outline" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {!animal.nftGenerated ? (
                      <Button
                        onClick={() => generateNFTForAnimal(animal.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Generate NFT
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-xs text-center text-green-400 bg-green-900/20 p-2 rounded">
                          ✅ NFT Generated & Live on Marketplace
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Wallet className="h-3 w-3 mr-1" />
                            Wallet
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-orange-600 hover:bg-orange-700"
                            onClick={() => setSelectedAnimal(animal)}
                          >
                            <Settings className="h-3 w-3 mr-1" />
                            Edit Goal
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nft-generator">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">🎨 NFT Generator Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Batch NFT Generation</h3>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Generate All Missing NFTs
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Activity className="h-4 w-4 mr-2" />
                    Update All Stats
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Award className="h-4 w-4 mr-2" />
                    Distribute Rewards
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Global Settings</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Goal Amount (GAiA):</label>
                    <Input
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(Number(e.target.value))}
                      placeholder="Enter default goal amount"
                    />
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Target className="h-4 w-4 mr-2" />
                    Apply to All Animals
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace">
          <div className="text-center py-8">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-yellow-400">
              Animal NFT Marketplace Integration
            </h3>
            <p className="text-muted-foreground mb-4">
              All generated animal NFTs are automatically available in the GAiA NFT Marketplace
            </p>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Gift className="h-4 w-4 mr-2" />
              View Marketplace
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="admin-controls">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="text-red-400">🔥 Critical Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Emergency Protection
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Activity className="h-4 w-4 mr-2" />
                  Health Monitoring
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Population Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">💰 Financial Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Fund Distribution
                </Button>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet Management
                </Button>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Target className="h-4 w-4 mr-2" />
                  Goal Adjustments
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🌍 Conservation Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Impact Reports
                </Button>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Milestone Tracking
                </Button>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Award className="h-4 w-4 mr-2" />
                  Success Stories
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Goal Adjustment Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">
                Adjust Goal for {selectedAnimal.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">New Goal Amount (GAiA):</label>
                <Input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(Number(e.target.value))}
                  placeholder="Enter new goal amount"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    updateGoalAmount(selectedAnimal.id, goalAmount);
                    setSelectedAnimal(null);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Update Goal
                </Button>
                <Button
                  onClick={() => setSelectedAnimal(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
