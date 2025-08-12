import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Sparkles, Shield, Trophy } from "lucide-react";

export default function NFTGreenAnimals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center gap-3">
              <Coins className="h-12 w-12 text-green-400 animate-pulse" />
              🦋 NFT Green Animals Collection
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Collect, Trade, and Protect Digital Wildlife
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-green-600">🌱 Conservation</Badge>
              <Badge className="bg-blue-600">💎 Rare Collections</Badge>
              <Badge className="bg-purple-600">✨ Unique Artwork</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Rare Species
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Collect NFTs of endangered species and contribute to their
                conservation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/50 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Conservation Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Each NFT purchase directly funds real-world conservation
                efforts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Breeding System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Breed your digital animals to create unique combinations and
                traits.
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/50 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Coins className="h-6 w-6" />
                Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trade your collection with other conservationists in our secure
                marketplace.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
