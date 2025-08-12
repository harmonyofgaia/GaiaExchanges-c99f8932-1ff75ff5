import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  MapPin,
  Wallet,
  Eye,
  TreePine,
  Globe,
  Zap,
  Star,
  Shield,
  Camera,
  Headphones,
} from "lucide-react";
import { toast } from "sonner";
import { AnimalNFTMarketplace } from "./AnimalNFTMarketplace";
import { AnimalVRExperience } from "./AnimalVRExperience";
import { AnimalWalletManager } from "./AnimalWalletManager";
import { LiveAnimalTracker } from "./LiveAnimalTracker";
import { GlobalRelocationMap } from "./GlobalRelocationMap";

interface RealAnimal {
  id: string;
  name: string;
  species: string;
  emoji: string;
  currentLocation: string;
  cageType: string;
  walletAddress: string;
  nftTokenId: string;
  fundingGoal: number;
  currentFunding: number;
  urgencyLevel: "low" | "medium" | "high" | "critical";
  story: string;
  images: string[];
  caretaker: string;
  lastUpdate: string;
  vrAvailable: boolean;
  adoptionReady: boolean;
}

export function AnimalWelfareHub() {
  const [animals, setAnimals] = useState<RealAnimal[]>([
    {
      id: "1",
      name: "Maya",
      species: "Bengal Tiger",
      emoji: "🐅",
      currentLocation: "Wildlife Sanctuary, India",
      cageType: "Rehabilitation Enclosure",
      walletAddress: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh",
      nftTokenId: "MAYA_TIGER_001",
      fundingGoal: 25000,
      currentFunding: 18750,
      urgencyLevel: "high",
      story:
        "Maya was rescued from illegal captivity. She needs specialized care and a larger habitat to prepare for potential release.",
      images: ["/api/placeholder/400/300"],
      caretaker: "Dr. Sarah Wildlife Center",
      lastUpdate: "2 hours ago",
      vrAvailable: true,
      adoptionReady: false,
    },
    {
      id: "2",
      name: "Charlie",
      species: "Rescued Elephant",
      emoji: "🐘",
      currentLocation: "Elephant Sanctuary, Kenya",
      cageType: "Open Range Enclosure",
      walletAddress: "4HyK2mN7pQsRbVx8uT9wE6cJdL3vF1sA2rP5qW8xN9kM",
      nftTokenId: "CHARLIE_ELEPHANT_002",
      fundingGoal: 45000,
      currentFunding: 32100,
      urgencyLevel: "medium",
      story:
        "Charlie lost his family to poaching. He's learning to trust humans again and needs ongoing therapy and care.",
      images: ["/api/placeholder/400/300"],
      caretaker: "Kenya Wildlife Foundation",
      lastUpdate: "1 hour ago",
      vrAvailable: true,
      adoptionReady: true,
    },
    {
      id: "3",
      name: "Luna",
      species: "Arctic Wolf",
      emoji: "🐺",
      currentLocation: "Arctic Conservation Center, Alaska",
      cageType: "Climate-Controlled Habitat",
      walletAddress: "7KjF3vR9sT2eN5qW8xL4mP6yC1zA9dH5uI7oE2nQ4rK",
      nftTokenId: "LUNA_WOLF_003",
      fundingGoal: 15000,
      currentFunding: 4200,
      urgencyLevel: "critical",
      story:
        "Luna was found injured during harsh winter conditions. She needs immediate medical care and rehabilitation.",
      images: ["/api/placeholder/400/300"],
      caretaker: "Arctic Wildlife Rescue",
      lastUpdate: "30 minutes ago",
      vrAvailable: false,
      adoptionReady: false,
    },
  ]);

  const [userContributions, setUserContributions] = useState(0);
  const [totalAnimalsHelped, setTotalAnimalsHelped] = useState(127);

  const contributeToAnimal = (animalId: string, amount: number) => {
    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === animalId
          ? { ...animal, currentFunding: animal.currentFunding + amount }
          : animal,
      ),
    );
    setUserContributions((prev) => prev + amount);

    toast.success(`💝 Contributed ${amount} GAiA tokens to help the animal!`, {
      description: `Your contribution goes directly to the animal's dedicated wallet.`,
      duration: 4000,
    });
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "critical":
        return "border-red-500/50 bg-red-900/20";
      case "high":
        return "border-orange-500/50 bg-orange-900/20";
      case "medium":
        return "border-yellow-500/50 bg-yellow-900/20";
      case "low":
        return "border-green-500/50 bg-green-900/20";
      default:
        return "border-gray-500/50 bg-gray-900/20";
    }
  };

  const getUrgencyBadgeColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-orange-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-green-400">
            🐾 GAiA ANIMAL WELFARE - REAL LIVES, REAL IMPACT
          </CardTitle>
          <p className="text-center text-xl text-green-300">
            Every Animal in Captivity Gets Its Own Wallet • Own NFT • Own Goal •
            VR Rehabilitation • Global Relocation
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
              <div className="text-3xl font-bold text-green-400">
                {totalAnimalsHelped}
              </div>
              <div className="text-sm text-muted-foreground">
                Animals Helped
              </div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400">
                {userContributions}
              </div>
              <div className="text-sm text-muted-foreground">
                Your Contributions
              </div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400">
                {animals.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Cases</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400">
                {animals.filter((a) => a.vrAvailable).length}
              </div>
              <div className="text-sm text-muted-foreground">VR Available</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="rescue-animals" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="rescue-animals">🆘 Rescue Animals</TabsTrigger>
          <TabsTrigger value="nft-marketplace">🏪 NFT Marketplace</TabsTrigger>
          <TabsTrigger value="vr-experience">🥽 VR Experience</TabsTrigger>
          <TabsTrigger value="animal-wallets">💰 Animal Wallets</TabsTrigger>
          <TabsTrigger value="live-tracking">📡 Live Tracking</TabsTrigger>
          <TabsTrigger value="global-relocation">🌍 Global Map</TabsTrigger>
        </TabsList>

        <TabsContent value="rescue-animals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {animals.map((animal) => (
              <Card
                key={animal.id}
                className={`${getUrgencyColor(animal.urgencyLevel)} border-2`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{animal.emoji}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {animal.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {animal.species}
                        </p>
                        <Badge
                          className={`${getUrgencyBadgeColor(animal.urgencyLevel)} mt-1`}
                        >
                          {animal.urgencyLevel.toUpperCase()} PRIORITY
                        </Badge>
                      </div>
                    </div>
                    {animal.adoptionReady && (
                      <Badge className="bg-green-600">
                        <Heart className="h-3 w-3 mr-1" />
                        READY FOR RELEASE
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm">{animal.story}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span>{animal.currentLocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span>{animal.caretaker}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Funding Progress</span>
                        <span className="font-bold">
                          {animal.currentFunding.toLocaleString()} /{" "}
                          {animal.fundingGoal.toLocaleString()} GAiA
                        </span>
                      </div>
                      <Progress
                        value={
                          (animal.currentFunding / animal.fundingGoal) * 100
                        }
                        className="h-3"
                      />
                    </div>

                    <div className="bg-black/30 p-3 rounded border border-green-500/20">
                      <div className="text-xs text-muted-foreground mb-1">
                        Dedicated Animal Wallet:
                      </div>
                      <div className="font-mono text-xs text-green-400 break-all">
                        {animal.walletAddress}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        NFT Token: {animal.nftTokenId}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => contributeToAnimal(animal.id, 100)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        Contribute 100 GAiA
                      </Button>

                      {animal.vrAvailable && (
                        <Button
                          variant="outline"
                          className="border-purple-500/50"
                          size="sm"
                        >
                          <Headphones className="h-4 w-4 mr-2" />
                          VR Visit
                        </Button>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last update: {animal.lastUpdate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nft-marketplace">
          <AnimalNFTMarketplace />
        </TabsContent>

        <TabsContent value="vr-experience">
          <AnimalVRExperience animals={animals} />
        </TabsContent>

        <TabsContent value="animal-wallets">
          <AnimalWalletManager animals={animals} />
        </TabsContent>

        <TabsContent value="live-tracking">
          <LiveAnimalTracker animals={animals} />
        </TabsContent>

        <TabsContent value="global-relocation">
          <GlobalRelocationMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}
