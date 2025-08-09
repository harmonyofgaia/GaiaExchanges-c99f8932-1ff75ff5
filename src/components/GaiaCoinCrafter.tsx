<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TokenWarfareSystem } from './games/TokenWarfareSystem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Coins, 
  Flame, 
  Factory, 
  TrendingUp, 
=======
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  Flame,
  Factory,
  TrendingUp,
>>>>>>> a99e069 (Resolve all remaining merge conflicts and clean up code)
  Calendar,
  Zap,
  Target,
  Recycle,
  Copy,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import {
  GAIA_TOKEN,
  GAIA_METRICS,
  formatGaiaPrice,
  formatGaiaNumber,
} from "@/constants/gaia";
import { toast } from "sonner";

export function GaiaCoinCrafter() {
<<<<<<< HEAD
  const [monthlyProgress, setMonthlyProgress] = useState(67)
  const [totalCrafted, setTotalCrafted] = useState(245678)
  const [burnedForReinvestment, setBurnedForReinvestment] = useState(12459)
  const [nextCraftingIn, setNextCraftingIn] = useState(13)
  const [activeTab, setActiveTab] = useState('craft')
=======
  const [monthlyProgress, setMonthlyProgress] = useState(67);
  const [totalCrafted, setTotalCrafted] = useState(245678);
  const [burnedForReinvestment, setBurnedForReinvestment] = useState(12459);
  const [nextCraftingIn, setNextCraftingIn] = useState(13);
>>>>>>> a99e069 (Resolve all remaining merge conflicts and clean up code)

  // Auto-update system connected to official token
  useEffect(() => {
    console.log(
      "🏭 GAiA Coin Crafter: Connected to official token address:",
      GAIA_TOKEN.WALLET_ADDRESS,
    );
    const interval = setInterval(() => {
      setMonthlyProgress((prev) => Math.min(prev + 0.15, 100));
      setTotalCrafted((prev) => prev + Math.floor(Math.random() * 12) + 5);
      setBurnedForReinvestment(
        (prev) => prev + Math.floor(Math.random() * 4) + 1,
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const copyOfficialWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS);
    toast.success("Official GAiA Wallet Address Copied!", {
      description: "Connected to official GAiA wallet address",
      duration: 3000,
    });
  };

  const copyOfficialContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS);
    toast.success("Official GAiA Contract Address Copied!", {
      description: "Connected to official GAiA contract address",
      duration: 3000,
    });
  };

  const openOfficialPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank");
    toast.info("🚀 Opening Official GAiA on Pump.fun", {
      description: "Redirecting to official GAiA token page...",
      duration: 3000,
    });
  };

  return (
<<<<<<< HEAD
    <div className="container mx-auto px-4 py-8 space-y-8"
    style={{ 
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
          🏭 GAiA Official Coin Crafter
        </h1>
        <p className="text-xl text-white/80">
          Official GAiA Token Manufacturing & Battle System
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge className="bg-green-600 text-white px-4 py-2">
            ✅ Official GAiA Network
          </Badge>
          <Badge className="bg-orange-600 text-white px-4 py-2">
            🔥 Live Burning Protocol
          </Badge>
          <Badge className="bg-red-600 text-white px-4 py-2">
            ⚔️ Token Warfare Ready
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="craft">Token Crafting</TabsTrigger>
          <TabsTrigger value="warfare">Token Warfare</TabsTrigger>
        </TabsList>

        <TabsContent value="craft" className="space-y-6">
          {/* Official GAiA Token Info */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Coins className="h-6 w-6" />
                🌍 Official GAiA Token - Coin Crafter Connected
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Official Wallet Address */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-bold">Official GAiA Wallet:</span>
                    <div className="flex gap-2">
                      <Button onClick={copyOfficialWalletAddress} variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button onClick={openOfficialPumpFun} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Charts
                      </Button>
                    </div>
                  </div>
                  <code className="text-blue-300 font-mono text-xs break-all block bg-blue-900/10 p-2 rounded">
                    {GAIA_TOKEN.WALLET_ADDRESS}
                  </code>
                </div>

                {/* Official Contract Address */}
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-400 font-bold">Official GAiA Contract:</span>
                    <Button onClick={copyOfficialContractAddress} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <code className="text-purple-300 font-mono text-xs break-all block bg-purple-900/10 p-2 rounded">
                    {GAIA_TOKEN.CONTRACT_ADDRESS}
                  </code>
=======
    <div className="space-y-6">
      {/* Official GAiA Token Info */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Coins className="h-6 w-6" />
            🌍 Official GAiA Token - Coin Crafter Connected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Official Wallet Address */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-bold">
                  Official GAiA Wallet:
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={copyOfficialWalletAddress}
                    variant="outline"
                    size="sm"
                    className="border-blue-500/30 text-blue-400"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    onClick={openOfficialPumpFun}
                    variant="outline"
                    size="sm"
                    className="border-purple-500/30 text-purple-400"
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Charts
                  </Button>
>>>>>>> a99e069 (Resolve all remaining merge conflicts and clean up code)
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{formatGaiaPrice(GAIA_TOKEN.INITIAL_PRICE)}</div>
                  <div className="text-muted-foreground">Official GAiA Price</div>
                </div>
                <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{formatGaiaNumber(GAIA_METRICS.INITIAL_HOLDERS)}</div>
                  <div className="text-muted-foreground">Official Holders</div>
                </div>
                <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
                  <div className="text-lg font-bold text-purple-400">{formatGaiaPrice(GAIA_METRICS.INITIAL_MARKET_CAP)}</div>
                  <div className="text-muted-foreground">Official Market Cap</div>
                </div>
                <div className="text-center p-3 bg-yellow-900/20 rounded border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400">{formatGaiaPrice(GAIA_METRICS.INITIAL_VOLUME)}</div>
                  <div className="text-muted-foreground">Official Volume 24h</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Crafting System - Connected to Official Token */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 relative overflow-hidden">
            <div className="absolute top-4 left-4 opacity-10">
              <img 
                src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
                alt="Gaia Logo"
                className="w-24 h-24 object-contain"
              />
            </div>

<<<<<<< HEAD
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Factory className="h-6 w-6" />
                🏭 OFFICIAL GAiA COIN CRAFTER - Connected to Official Token
              </CardTitle>
              <p className="text-muted-foreground">
                Automatically fills market supply connected to official GAiA token address
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Monthly Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-400">Official Token Crafting Progress</span>
                  <Badge className="bg-purple-600 text-white">
                    {monthlyProgress.toFixed(1)}% Complete
                  </Badge>
                </div>
                
                <Progress value={monthlyProgress} className="h-4" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{totalCrafted.toLocaleString()}</div>
                    <div className="text-muted-foreground">Official Tokens Crafted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{burnedForReinvestment.toLocaleString()}</div>
                    <div className="text-muted-foreground">Burned for Reinvestment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{nextCraftingIn}</div>
                    <div className="text-muted-foreground">Days to Next Craft</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">99.2%</div>
                    <div className="text-muted-foreground">Official System Efficiency</div>
                  </div>
                </div>
              </div>

              {/* Burning & Crafting Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/30 border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-orange-400 flex items-center gap-2">
                      <Flame className="h-5 h-5" />
                      Official Token Burning Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Official GAiA Stream Viewers:</span>
                      <span className="text-orange-400 font-bold">1 GAiA per viewer</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Official Community Trades:</span>
                      <span className="text-orange-400 font-bold">0.15% of volume</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Official NFT Purchases:</span>
                      <span className="text-orange-400 font-bold">7% burn rate</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Official Gaming Rewards:</span>
                      <span className="text-orange-400 font-bold">Enhanced burn</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <Recycle className="h-5 h-5" />
                      Official Token Reinvestment Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Ocean Cleanup:</span>
                      <span className="text-green-400 font-bold">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Forest Restoration:</span>
                      <span className="text-green-400 font-bold">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renewable Energy:</span>
                      <span className="text-green-400 font-bold">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Development:</span>
                      <span className="text-green-400 font-bold">20%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Control Panel */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Force Official Craft
                </Button>
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Flame className="h-4 w-4 mr-2" />
                  Burn Official Tokens
                </Button>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Target className="h-4 w-4 mr-2" />
                  Set Official Targets
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Official Analytics
=======
            {/* Official Contract Address */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-bold">
                  Official GAiA Contract:
                </span>
                <Button
                  onClick={copyOfficialContractAddress}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 text-purple-400"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
>>>>>>> a99e069 (Resolve all remaining merge conflicts and clean up code)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

<<<<<<< HEAD
        <TabsContent value="warfare" className="space-y-8">
          <TokenWarfareSystem />
        </TabsContent>
      </Tabs>
    </div>
  )
}
=======
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
              <div className="text-lg font-bold text-green-400">
                {formatGaiaPrice(GAIA_TOKEN.INITIAL_PRICE)}
              </div>
              <div className="text-muted-foreground">Official GAiA Price</div>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400">
                {formatGaiaNumber(GAIA_METRICS.INITIAL_HOLDERS)}
              </div>
              <div className="text-muted-foreground">Official Holders</div>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400">
                {formatGaiaPrice(GAIA_METRICS.INITIAL_MARKET_CAP)}
              </div>
              <div className="text-muted-foreground">Official Market Cap</div>
            </div>
            <div className="text-center p-3 bg-yellow-900/20 rounded border border-yellow-500/20">
              <div className="text-lg font-bold text-yellow-400">
                {formatGaiaPrice(GAIA_METRICS.INITIAL_VOLUME)}
              </div>
              <div className="text-muted-foreground">Official Volume 24h</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Crafting System - Connected to Official Token */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 relative overflow-hidden">
        <div className="absolute top-4 left-4 opacity-10">
          <img
            src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png"
            alt="Gaia Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Factory className="h-6 w-6" />
            🏭 OFFICIAL GAiA COIN CRAFTER - Connected to Official Token
          </CardTitle>
          <p className="text-muted-foreground">
            Automatically fills market supply connected to official GAiA token
            address
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Monthly Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-400">
                Official Token Crafting Progress
              </span>
              <Badge className="bg-purple-600 text-white">
                {monthlyProgress.toFixed(1)}% Complete
              </Badge>
            </div>

            <Progress value={monthlyProgress} className="h-4" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {totalCrafted.toLocaleString()}
                </div>
                <div className="text-muted-foreground">
                  Official Tokens Crafted
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {burnedForReinvestment.toLocaleString()}
                </div>
                <div className="text-muted-foreground">
                  Burned for Reinvestment
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {nextCraftingIn}
                </div>
                <div className="text-muted-foreground">Days to Next Craft</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">99.2%</div>
                <div className="text-muted-foreground">
                  Official System Efficiency
                </div>
              </div>
            </div>
          </div>

          {/* Burning & Crafting Process */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/30 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <Flame className="h-5 h-5" />
                  Official Token Burning Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Official GAiA Stream Viewers:</span>
                  <span className="text-orange-400 font-bold">
                    1 GAiA per viewer
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Official Community Trades:</span>
                  <span className="text-orange-400 font-bold">
                    0.15% of volume
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Official NFT Purchases:</span>
                  <span className="text-orange-400 font-bold">
                    7% burn rate
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Official Gaming Rewards:</span>
                  <span className="text-orange-400 font-bold">
                    Enhanced burn
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Recycle className="h-5 h-5" />
                  Official Token Reinvestment Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Ocean Cleanup:</span>
                  <span className="text-green-400 font-bold">30%</span>
                </div>
                <div className="flex justify-between">
                  <span>Forest Restoration:</span>
                  <span className="text-green-400 font-bold">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Renewable Energy:</span>
                  <span className="text-green-400 font-bold">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Development:</span>
                  <span className="text-green-400 font-bold">20%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Zap className="h-4 w-4 mr-2" />
              Force Official Craft
            </Button>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              <Flame className="h-4 w-4 mr-2" />
              Burn Official Tokens
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Target className="h-4 w-4 mr-2" />
              Set Official Targets
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Official Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
>>>>>>> a99e069 (Resolve all remaining merge conflicts and clean up code)
