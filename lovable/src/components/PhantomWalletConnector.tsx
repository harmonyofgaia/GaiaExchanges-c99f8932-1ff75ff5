import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Star,
  Crown,
  Sparkles,
  Eye,
  Link,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import {
  GAIA_TOKEN,
  GAIA_METRICS,
  formatGaiaPrice,
  formatGaiaNumber,
} from "@/constants/gaia";

export function PhantomWalletConnector() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [matrixEffect, setMatrixEffect] = useState<
    Array<{ id: number; char: string; x: number; y: number }>
  >([]);

  // Matrix rain effect for the wallet display
  useEffect(() => {
    const generateMatrixRain = () => {
      const chars = ["$", "G", "A", "I", "A", "♦", "♠", "♣", "♥", "0", "1"];
      const newEffect = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setMatrixEffect(newEffect);
    };

    generateMatrixRain();
    const interval = setInterval(generateMatrixRain, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate wallet balance updates
  useEffect(() => {
    if (isConnected) {
      const updateBalance = () => {
        setWalletBalance((prev) => prev + Math.random() * 100);
      };

      const interval = setInterval(updateBalance, 3000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const connectPhantomWallet = () => {
    // Simulate wallet connection to official GAiA
    setIsConnected(true);
    setWalletBalance(12847.5);

    toast.success("🦅 Phantom Connected to Official GAiA!", {
      description: `Connected to GAiA wallet: ${GAIA_TOKEN.WALLET_ADDRESS}`,
      duration: 5000,
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletBalance(0);

    toast.info("👋 GAiA Wallet Disconnected", {
      description: "Official GAiA wallet has been safely disconnected.",
      duration: 3000,
    });
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS);
    toast.success("📋 Official GAiA Address Copied!", {
      description: "GAiA wallet address copied to clipboard",
      duration: 2000,
    });
  };

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS);
    toast.success("📋 GAiA Contract Copied!", {
      description: "GAiA contract address copied to clipboard",
      duration: 2000,
    });
  };

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank");
    toast.info("🚀 Opening GAiA on Pump.fun", {
      description: "Redirecting to official GAiA token page...",
      duration: 3000,
    });
  };

  return (
    <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30 mb-8 relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {matrixEffect.map((drop) => (
          <div
            key={drop.id}
            className="absolute text-green-400 font-mono text-lg animate-pulse"
            style={{
              left: `${drop.x}%`,
              top: `${drop.y}%`,
              animationDelay: `${drop.id * 0.1}s`,
              animationDuration: "2s",
            }}
          >
            {drop.char}
          </div>
        ))}
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
          <Wallet className="h-6 w-6" />
          👻 PHANTOM WALLET - OFFICIAL GAiA INTEGRATION
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {!isConnected ? (
          /* Connection Interface */
          <div className="text-center space-y-6">
            {/* Official GAiA Token Info */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-bold mb-2">
                🌍 Connecting to Official GAiA Token
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Symbol:</span>
                  <span className="text-green-400 font-bold">
                    {GAIA_TOKEN.SYMBOL}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initial Price:</span>
                  <span className="text-blue-400 font-bold">
                    {formatGaiaPrice(GAIA_TOKEN.INITIAL_PRICE)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <span className="text-purple-400 font-bold">
                    {formatGaiaPrice(GAIA_METRICS.INITIAL_MARKET_CAP)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/30">
              <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                Connect to Official GAiA
              </h3>
              <p className="text-muted-foreground mb-6">
                Connect your Phantom wallet to the official GAiA token for
                seamless trading
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-900/30 rounded border border-green-500/20">
                  <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h4 className="font-bold text-green-400 mb-2">Secure</h4>
                  <p className="text-xs text-muted-foreground">
                    Bank-level encryption
                  </p>
                </div>
                <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20">
                  <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="font-bold text-blue-400 mb-2">Fast</h4>
                  <p className="text-xs text-muted-foreground">
                    Instant transactions
                  </p>
                </div>
                <div className="p-4 bg-yellow-900/30 rounded border border-yellow-500/20">
                  <Globe className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <h4 className="font-bold text-yellow-400 mb-2">Global</h4>
                  <p className="text-xs text-muted-foreground">
                    Worldwide access
                  </p>
                </div>
              </div>

              <Button
                onClick={connectPhantomWallet}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-4 px-8 text-lg animate-pulse"
              >
                <Wallet className="h-6 w-6 mr-2" />
                🚀 CONNECT TO OFFICIAL GAiA
              </Button>
            </div>
          </div>
        ) : (
          /* Connected Wallet Interface */
          <div className="space-y-6">
            {/* Wallet Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600 rounded-full">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-400">
                    Connected to Official GAiA
                  </h3>
                  <Badge className="bg-green-600 text-white mt-1">ACTIVE</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={openPumpFun}
                  variant="outline"
                  className="border-purple-500/30 text-purple-400"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Pump.fun
                </Button>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="border-red-500/30 text-red-400"
                >
                  Disconnect
                </Button>
              </div>
            </div>

            {/* Wallet Balance Display */}
            <div className="p-6 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/30 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute text-yellow-400 text-2xl animate-bounce"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    $
                  </span>
                ))}
              </div>

              <div className="relative z-10 text-center">
                <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                  {formatGaiaPrice(walletBalance)}
                </h3>
                <p className="text-muted-foreground mb-4">Total GAiA Balance</p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-green-900/30 rounded border border-green-500/20">
                    <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-1" />
                    <div className="text-sm font-bold text-green-400">
                      +15.8%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      24h Change
                    </div>
                  </div>
                  <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
                    <Star className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                    <div className="text-sm font-bold text-blue-400">247</div>
                    <div className="text-xs text-muted-foreground">
                      NFTs Owned
                    </div>
                  </div>
                  <div className="p-3 bg-purple-900/30 rounded border border-purple-500/20">
                    <Sparkles className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                    <div className="text-sm font-bold text-purple-400">
                      1,847
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Animals Helped
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official GAiA Addresses */}
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-cyan-400 mb-2">
                      Official GAiA Wallet
                    </h4>
                    <code className="text-sm text-muted-foreground font-mono bg-black/20 px-2 py-1 rounded block">
                      {GAIA_TOKEN.WALLET_ADDRESS}
                    </code>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={copyWalletAddress}
                      variant="outline"
                      size="sm"
                      className="border-cyan-500/30 text-cyan-400"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={openPumpFun}
                      variant="outline"
                      size="sm"
                      className="border-purple-500/30 text-purple-400"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-purple-400 mb-2">
                      GAiA Contract Address
                    </h4>
                    <code className="text-sm text-muted-foreground font-mono bg-black/20 px-2 py-1 rounded block">
                      {GAIA_TOKEN.CONTRACT_ADDRESS}
                    </code>
                  </div>
                  <Button
                    onClick={copyContractAddress}
                    variant="outline"
                    size="sm"
                    className="border-purple-500/30 text-purple-400"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex flex-col items-center py-6">
                <Zap className="h-6 w-6 mb-2" />
                <span className="text-sm">Buy NFTs</span>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex flex-col items-center py-6">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm">Trade</span>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex flex-col items-center py-6">
                <Star className="h-6 w-6 mb-2" />
                <span className="text-sm">Stake</span>
              </Button>
              <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 flex flex-col items-center py-6">
                <Crown className="h-6 w-6 mb-2" />
                <span className="text-sm">Rewards</span>
              </Button>
            </div>
          </div>
        )}

        {/* Matrix Integration Info */}
        <div className="text-center p-4 bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-lg border border-green-500/20">
          <h4 className="font-bold text-green-400 mb-2">
            🌐 OFFICIAL GAiA INTEGRATION
          </h4>
          <p className="text-sm text-muted-foreground">
            Connected to the official GAiA token on Pump.fun with real-time
            matrix-style visualizations, seamless trading, and instant
            environmental impact tracking.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
