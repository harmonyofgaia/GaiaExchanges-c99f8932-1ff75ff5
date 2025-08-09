import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Star,
  Globe,
  Camera,
  ShoppingCart,
  Gamepad2,
  Hammer,
<<<<<<< HEAD
  TreePine
} from 'lucide-react'
import { AnimalRescueNFT } from '@/components/nft/AnimalRescueNFT'
import { MinecraftLandscapeBuilder } from '@/components/MinecraftLandscapeBuilder'
import { VirtualLandscapeCreator } from '@/components/landscapes/VirtualLandscapeCreator'
import { RealTimeAnimalTracker } from '@/components/RealTimeAnimalTracker'
import { AnimalWelfareWalletManager } from '@/components/animal-welfare/AnimalWelfareWalletManager'
import { AnimalNFTMarketplace } from '@/components/animal-welfare/AnimalNFTMarketplace'
import { RealAnimalDatabase } from '@/components/animal-welfare/RealAnimalDatabase'
import { toast } from 'sonner'
=======
  TreePine,
} from "lucide-react";
import { AnimalRescueNFT } from "@/components/nft/AnimalRescueNFT";
import { MinecraftLandscapeBuilder } from "@/components/MinecraftLandscapeBuilder";
import { VirtualLandscapeCreator } from "@/components/landscapes/VirtualLandscapeCreator";
import { RealTimeAnimalTracker } from "@/components/RealTimeAnimalTracker";
import { AnimalWelfareWalletManager } from "@/components/animal-welfare/AnimalWelfareWalletManager";
import { AnimalNFTMarketplace } from "@/components/animal-welfare/AnimalNFTMarketplace";
import { toast } from "sonner";
>>>>>>> 7d6f23b (Resolve all remaining rebase conflicts, mark deleted files, and continue)

export default function AnimalWelfare() {
  const [activeAnimals, setActiveAnimals] = useState(247);
  const [tokensRaised, setTokensRaised] = useState(1547820);

  const launchIntoGame = (gameName: string) => {
    toast.success(`🎮 Launching into ${gameName}!`, {
      description: "Your animal NFTs will provide special abilities in-game",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🐾 ANIMAL WELFARE & NFT ECOSYSTEM
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Real Animals • Real Impact • NFT Integration • Gaming Connected
            </p>
            <div className="flex justify-center gap-4 flex-wrap mt-4">
              <Badge className="bg-green-600">
                <Heart className="h-4 w-4 mr-1" />
                {activeAnimals} Animals Protected
              </Badge>
              <Badge className="bg-blue-600">
                <Shield className="h-4 w-4 mr-1" />
                {tokensRaised.toLocaleString()} GAiA Raised
              </Badge>
              <Badge className="bg-purple-600">
                <Star className="h-4 w-4 mr-1" />
                NFT Powered
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="rescue" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="rescue">🆘 Animal Rescue</TabsTrigger>
            <TabsTrigger value="database">🦎 Real Animals</TabsTrigger>
            <TabsTrigger value="cameras">📹 Live Cameras</TabsTrigger>
            <TabsTrigger value="vr">🥽 VR Experience</TabsTrigger>
            <TabsTrigger value="marketplace">🏪 NFT Marketplace</TabsTrigger>
            <TabsTrigger value="gaming">🎮 Gaming</TabsTrigger>
            <TabsTrigger value="wallet">💰 Wallet & Fees</TabsTrigger>
          </TabsList>

          <TabsContent value="rescue" className="space-y-6">
            <AnimalRescueNFT />
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <RealAnimalDatabase />
          </TabsContent>

          <TabsContent value="cameras" className="space-y-6">
            <RealTimeAnimalTracker />
          </TabsContent>

          <TabsContent value="vr" className="space-y-6">
            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">
                  🥽 Virtual Reality Animal Experiences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Immersive VR experiences coming soon!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <AnimalNFTMarketplace />
          </TabsContent>

          <TabsContent value="gaming" className="space-y-6">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Gamepad2 className="h-6 w-6" />
                  🎮 Gaming Integration Hub
                </CardTitle>
                <p className="text-muted-foreground">
                  Use your animal contributions in various games and earn
                  rewards for conservation
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => launchIntoGame("Worms Arena")}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    🐛 Launch Worms Game
                  </Button>
                  <Button
                    onClick={() => launchIntoGame("GAiA Fantasy")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    ⚔️ Enter GAiA Fantasy
                  </Button>
                  <Button
                    onClick={() => launchIntoGame("Virtual World")}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    🌍 Virtual World
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <AnimalWelfareWalletManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
