import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Shield,
  Star,
  Globe,
  Camera,
  ShoppingCart,
  Gamepad2,
  Hammer,
  TreePine,
  MapPin,
  AlertTriangle,
  Users,
  Zap,
  Award,
  Target,
} from "lucide-react";
import { AnimalRescueNFT } from "@/components/nft/AnimalRescueNFT";
import { MinecraftLandscapeBuilder } from "@/components/MinecraftLandscapeBuilder";
import { VirtualLandscapeCreator } from "@/components/landscapes/VirtualLandscapeCreator";
import { RealTimeAnimalTracker } from "@/components/RealTimeAnimalTracker";
import { AnimalWelfareWalletManager } from "@/components/animal-welfare/AnimalWelfareWalletManager";
import { AnimalNFTMarketplace } from "@/components/animal-welfare/AnimalNFTMarketplace";
import { RealAnimalDatabase } from "@/components/animal-welfare/RealAnimalDatabase";
import { GlobalAnimalRescue } from "@/components/animal-welfare/GlobalAnimalRescue";
import { LiveAnimalCameras } from "@/components/animal-welfare/LiveAnimalCameras";
import { AnimalConservationProjects } from "@/components/animal-welfare/AnimalConservationProjects";
import { AnimalWelfareAnalytics } from "@/components/animal-welfare/AnimalWelfareAnalytics";
import { toast } from "sonner";

export default function AnimalWelfare() {
  const [activeAnimals, setActiveAnimals] = useState(247);
  const [tokensRaised, setTokensRaised] = useState(1547820);
  const [globalRescues, setGlobalRescues] = useState(12847);
  const [sanctuariesSupported, setSanctuariesSupported] = useState(89);
  const [liveCameras, setLiveCameras] = useState(156);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnimals(prev => prev + Math.floor(Math.random() * 3));
      setTokensRaised(prev => prev + Math.floor(Math.random() * 100));
      setGlobalRescues(prev => prev + Math.floor(Math.random() * 2));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const launchIntoGame = (gameName: string) => {
    toast.success(`🎮 Launching into ${gameName}!`, {
      description: "Your animal NFTs will provide special abilities in-game",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-8">
        {/* Enhanced Header with Global Stats */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🌍 GLOBAL ANIMAL WELFARE ECOSYSTEM
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Real Animals • Global Rescue • Live Conservation • NFT Integration • Gaming Connected
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
              <Badge className="bg-green-600 p-3 text-center">
                <div className="flex flex-col items-center">
                  <Heart className="h-5 w-5 mb-1" />
                  <span className="text-lg font-bold">{activeAnimals.toLocaleString()}</span>
                  <span className="text-xs">Animals Protected</span>
                </div>
              </Badge>
              <Badge className="bg-blue-600 p-3 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="h-5 w-5 mb-1" />
                  <span className="text-lg font-bold">{tokensRaised.toLocaleString()}</span>
                  <span className="text-xs">GAiA Raised</span>
                </div>
              </Badge>
              <Badge className="bg-purple-600 p-3 text-center">
                <div className="flex flex-col items-center">
                  <Globe className="h-5 w-5 mb-1" />
                  <span className="text-lg font-bold">{globalRescues.toLocaleString()}</span>
                  <span className="text-xs">Global Rescues</span>
                </div>
              </Badge>
              <Badge className="bg-orange-600 p-3 text-center">
                <div className="flex flex-col items-center">
                  <TreePine className="h-5 w-5 mb-1" />
                  <span className="text-lg font-bold">{sanctuariesSupported}</span>
                  <span className="text-xs">Sanctuaries</span>
                </div>
              </Badge>
              <Badge className="bg-red-600 p-3 text-center">
                <div className="flex flex-col items-center">
                  <Camera className="h-5 w-5 mb-1" />
                  <span className="text-lg font-bold">{liveCameras}</span>
                  <span className="text-xs">Live Cameras</span>
                </div>
              </Badge>
              <Badge className="bg-pink-600 p-3 text-center">
                <div className="flex flex-col items-center">
                  <Star className="h-5 w-5 mb-1" />
                  <span className="text-lg font-bold">24/7</span>
                  <span className="text-xs">Active Monitoring</span>
                </div>
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced Main Tabs */}
        <Tabs defaultValue="rescue" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 gap-1">
            <TabsTrigger value="rescue" className="text-xs">🆘 Rescue</TabsTrigger>
            <TabsTrigger value="global" className="text-xs">🌍 Global</TabsTrigger>
            <TabsTrigger value="database" className="text-xs">🦎 Database</TabsTrigger>
            <TabsTrigger value="cameras" className="text-xs">📹 Live Cams</TabsTrigger>
            <TabsTrigger value="conservation" className="text-xs">🌿 Projects</TabsTrigger>
            <TabsTrigger value="marketplace" className="text-xs">🏪 NFT Market</TabsTrigger>
            <TabsTrigger value="vr" className="text-xs">🥽 VR</TabsTrigger>
            <TabsTrigger value="gaming" className="text-xs">🎮 Gaming</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">📊 Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="rescue" className="space-y-6">
            <AnimalRescueNFT />
          </TabsContent>

          <TabsContent value="global" className="space-y-6">
            <GlobalAnimalRescue />
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <RealAnimalDatabase />
          </TabsContent>

          <TabsContent value="cameras" className="space-y-6">
            <LiveAnimalCameras />
          </TabsContent>

          <TabsContent value="conservation" className="space-y-6">
            <AnimalConservationProjects />
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

          <TabsContent value="analytics" className="space-y-6">
            <AnimalWelfareAnalytics />
          </TabsContent>

          {/* Wallet Section - Always Visible */}
          <Card className="border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 mt-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                💰 Animal Welfare Funding Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimalWelfareWalletManager />
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
