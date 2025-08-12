import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Coins,
  TrendingUp,
  Zap,
  Shield,
  Award,
  Gamepad2,
  Factory,
  Hammer,
  Users,
  Target,
  Flame,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";
import { GaiaCoinCrafter } from "@/components/GaiaCoinCrafter";

export default function CoinCrafter() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [gaiaRequired, setGaiaRequired] = useState(500);
  const [userGaiaBalance] = useState(1250);
  const [createdTokens, setCreatedTokens] = useState(23);

  const createCustomToken = () => {
    if (!tokenName || !tokenSymbol || !totalSupply) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (userGaiaBalance < gaiaRequired) {
      toast.error("Insufficient GAiA tokens required for token creation");
      return;
    }

    toast.success(`🎮 Custom Token "${tokenName}" Created!`, {
      description: `${gaiaRequired} GAiA spent • Ready for Gaia Fantasy Game tactics`,
      duration: 5000,
    });

    setCreatedTokens((prev) => prev + 1);
  };

  const customTokens = [
    {
      name: "DragonFire Token",
      symbol: "DFIRE",
      supply: "10,000",
      tactics: "Fire Magic",
      gaiaSpent: 500,
    },
    {
      name: "Forest Guardian",
      symbol: "FGRD",
      supply: "25,000",
      tactics: "Nature Defense",
      gaiaSpent: 750,
    },
    {
      name: "Lightning Strike",
      symbol: "LSTK",
      supply: "5,000",
      tactics: "Thunder Attacks",
      gaiaSpent: 400,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
          🏭 GAiA TOKEN ECOSYSTEM
        </h1>
        <p className="text-muted-foreground mt-2">
          Create custom game tokens • Stabilize GAiA supply • Power your Gaia
          Fantasy tactics
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create Tokens</TabsTrigger>
          <TabsTrigger value="portfolio">My Tokens</TabsTrigger>
          <TabsTrigger value="stabilizer">GAiA Forge</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          {/* GAiA Balance Display */}
          <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Coins className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">
                      {userGaiaBalance.toLocaleString()} GAiA
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Your Balance
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-600 text-white">
                  Connected to Official GAiA
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Custom Token Creator */}
            <Card className="border-2 border-purple-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Gamepad2 className="h-6 w-6" />
                  Custom Game Token Factory
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Create tokens for your Gaia Fantasy character tactics
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token-name">Token Name</Label>
                  <Input
                    id="token-name"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="e.g., Lightning Warrior Token"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-symbol">Symbol</Label>
                  <Input
                    id="token-symbol"
                    value={tokenSymbol}
                    onChange={(e) =>
                      setTokenSymbol(e.target.value.toUpperCase())
                    }
                    placeholder="e.g., LWAR"
                    maxLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-supply">Supply for Game</Label>
                  <Input
                    id="total-supply"
                    value={totalSupply}
                    onChange={(e) => setTotalSupply(e.target.value)}
                    placeholder="e.g., 10000"
                    type="number"
                  />
                </div>

                <Separator />

                <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-purple-400">
                      GAiA Required:
                    </span>
                    <span className="text-2xl font-bold text-purple-400">
                      {gaiaRequired}
                    </span>
                  </div>
                  <div className="text-xs text-purple-300/80">
                    • Only usable in Gaia Fantasy Exchange • Powers character
                    tactics & abilities • Enhances gameplay strategies
                  </div>
                </div>

                <Button
                  onClick={createCustomToken}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                  disabled={userGaiaBalance < gaiaRequired}
                >
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  🎮 Create Game Token ({gaiaRequired} GAiA)
                </Button>
              </CardContent>
            </Card>

            {/* Token Features */}
            <Card className="border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  ⚡ Game Token Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-900/20 rounded-lg">
                    <div className="font-bold text-blue-400 mb-2">
                      🎯 Tactical Advantages
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Custom character abilities</li>
                      <li>• Enhanced combat strategies</li>
                      <li>• Exclusive weapon unlocks</li>
                      <li>• Special skill combinations</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-900/20 rounded-lg">
                    <div className="font-bold text-green-400 mb-2">
                      🔒 Exchange Integration
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Trade only in Gaia Fantasy Exchange</li>
                      <li>• Connect with other players</li>
                      <li>• Build tactical token collections</li>
                      <li>• Secure GAiA-powered transactions</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-900/20 rounded-lg">
                    <div className="font-bold text-purple-400 mb-2">
                      💎 Rarity System
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Common: 100-500 GAiA cost</li>
                      <li>• Rare: 500-1000 GAiA cost</li>
                      <li>• Epic: 1000-2500 GAiA cost</li>
                      <li>• Legendary: 2500+ GAiA cost</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid gap-4">
            {customTokens.map((token, index) => (
              <Card
                key={index}
                className="border border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Gamepad2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold">{token.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {token.symbol}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className="bg-purple-600 mb-2">
                        {token.tactics}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Supply: {token.supply}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      GAiA Invested:
                    </span>
                    <span className="font-bold text-green-400">
                      {token.gaiaSpent}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stabilizer" className="space-y-6">
          <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/20 to-yellow-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Factory className="h-6 w-6" />
                🔥 GAiA SUPPLY FORGE - "The Eternal Stabilizer"
              </CardTitle>
              <p className="text-orange-300">
                Automated GAiA token creation and burning system that maintains
                perfect supply balance
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <Badge className="bg-orange-600 text-white text-lg px-4 py-2">
                  <Hammer className="h-5 w-5 mr-2" />
                  ETERNAL STABILIZER ACTIVE
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-orange-400 mb-2 flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    The Eternal Stabilizer Concept
                  </h4>
                  <p className="text-orange-300/90 mb-3">
                    An autonomous AI-powered forge that continuously monitors
                    GAiA token supply and demand. When demand increases, it
                    mints new tokens. When supply exceeds demand, it burns
                    excess tokens. This ensures GAiA always maintains stable
                    value for the ecosystem.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-green-900/20 rounded">
                      <div className="text-2xl font-bold text-green-400">∞</div>
                      <div className="text-sm text-muted-foreground">
                        Eternal Operation
                      </div>
                    </div>
                    <div className="text-center p-3 bg-blue-900/20 rounded">
                      <div className="text-2xl font-bold text-blue-400">
                        99.9%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Stability Rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Include the existing GAiA Coin Crafter component */}
          <GaiaCoinCrafter />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  🎮 Game Token Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Game Tokens Created</span>
                    <span className="font-bold">{createdTokens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GAiA Spent on Tokens</span>
                    <span className="font-bold text-green-400">12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active in Gaia Fantasy</span>
                    <span className="font-bold">{createdTokens - 3}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-orange-400">
                  🔥 Stabilizer Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tokens Minted Today</span>
                    <span className="font-bold text-green-400">+8,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens Burned Today</span>
                    <span className="font-bold text-red-400">-5,891</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Supply Change</span>
                    <span className="font-bold text-blue-400">+2,343</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
