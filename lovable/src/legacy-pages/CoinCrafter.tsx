import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hammer, Zap, Coins, Settings } from "lucide-react";
import { useState } from "react";
import { CoinCrafterIllustration } from "@/components/CoinCrafterIllustration";

const CoinCrafter = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900/20 via-red-900/20 to-yellow-900/20">
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <CoinCrafterIllustration />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Hammer className="h-6 w-6" />
                  Token Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="My Environmental Token"
                    className="bg-black/30 border-orange-500/30"
                  />
                </div>

                <div>
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    placeholder="MET"
                    className="bg-black/30 border-orange-500/30"
                  />
                </div>

                <div>
                  <Label htmlFor="totalSupply">Total Supply</Label>
                  <Input
                    id="totalSupply"
                    value={totalSupply}
                    onChange={(e) => setTotalSupply(e.target.value)}
                    placeholder="1000000"
                    type="number"
                    className="bg-black/30 border-orange-500/30"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Hammer className="h-4 w-4 mr-2" />
                  Craft Token
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Zap className="h-6 w-6" />
                  Crafting Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-red-400 mb-2">
                    Advanced Features
                  </h3>
                  <p className="text-muted-foreground">
                    Configure advanced token properties
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Token Economics
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30"
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Supply Management
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Advanced Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinCrafter;
