import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, Leaf, Fish } from "lucide-react";

export default function NFTCards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            ✨ NFT Biodiversity Cards
          </h1>
          <p className="text-xl text-muted-foreground">
            Advanced biodiversity NFT ecosystem with dynamic rarity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Leaf className="h-8 w-8 text-green-400" />
                <Badge
                  variant="outline"
                  className="border-green-500/30 text-green-400"
                >
                  Common
                </Badge>
              </div>
              <CardTitle className="text-green-400">Forest Guardian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 h-32 flex items-center justify-center">
                <Leaf className="h-16 w-16 text-green-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Power Level: 45</p>
                <p className="text-sm text-muted-foreground">
                  Trees Protected: 12
                </p>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Mint Card
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Fish className="h-8 w-8 text-blue-400" />
                <Badge
                  variant="outline"
                  className="border-blue-500/30 text-blue-400"
                >
                  Rare
                </Badge>
              </div>
              <CardTitle className="text-blue-400">Ocean Protector</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 h-32 flex items-center justify-center">
                <Fish className="h-16 w-16 text-blue-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Power Level: 78</p>
                <p className="text-sm text-muted-foreground">
                  Ocean Area: 500m²
                </p>
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Mint Card
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Star className="h-8 w-8 text-purple-400" />
                <Badge
                  variant="outline"
                  className="border-purple-500/30 text-purple-400"
                >
                  Epic
                </Badge>
              </div>
              <CardTitle className="text-purple-400">Sky Sentinel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 h-32 flex items-center justify-center">
                <Star className="h-16 w-16 text-purple-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Power Level: 156
                </p>
                <p className="text-sm text-muted-foreground">
                  Air Quality: +25%
                </p>
              </div>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Mint Card
              </Button>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Sparkles className="h-8 w-8 text-yellow-400" />
                <Badge
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-400"
                >
                  Legendary
                </Badge>
              </div>
              <CardTitle className="text-yellow-400">Gaia Avatar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 h-32 flex items-center justify-center">
                <Sparkles className="h-16 w-16 text-yellow-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Power Level: 999
                </p>
                <p className="text-sm text-muted-foreground">
                  Global Impact: ∞
                </p>
              </div>
              <Button
                className="w-full bg-yellow-600 hover:bg-yellow-700"
                size="sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Mint Card
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 text-center">
                Biodiversity Collection Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <h3 className="font-medium text-green-400 mb-1">
                    Dynamic Rarity
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cards evolve based on environmental impact
                  </p>
                </div>
                <div className="text-center">
                  <Star className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-medium text-blue-400 mb-1">
                    Ecosystem Interactions
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cards interact with each other
                  </p>
                </div>
                <div className="text-center">
                  <Leaf className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-medium text-purple-400 mb-1">
                    Conservation Link
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Connected to real conservation efforts
                  </p>
                </div>
                <div className="text-center">
                  <Fish className="h-12 w-12 text-cyan-400 mx-auto mb-2" />
                  <h3 className="font-medium text-cyan-400 mb-1">
                    Trading Marketplace
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Buy, sell, and trade cards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
