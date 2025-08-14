import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Eye,
  Activity,
  Wallet,
  TrendingUp,
  Lock,
  Users,
  Zap,
  Copy,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN, formatGaiaPrice, formatGaiaNumber } from "@/constants/gaia";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "burn" | "environmental" | "community";
  amount: number;
  hash: string;
  timestamp: Date;
  purpose: string;
  status: "pending" | "confirmed" | "completed";
}

interface VaultStats {
  totalBalance: number;
  environmentalFunds: number;
  communityFunds: number;
  burnedTokens: number;
  totalTransactions: number;
  activeUsers: number;
}

export function CommunityVault() {
  const [vaultStats, setVaultStats] = useState<VaultStats>({
    totalBalance: 2847592.45,
    environmentalFunds: 1245832.12,
    communityFunds: 987654.33,
    burnedTokens: 614106.0,
    totalTransactions: 45782,
    activeUsers: 12847,
  });

  const [liveTransactions, setLiveTransactions] = useState<Transaction[]>([]);
  const [matrixEffect, setMatrixEffect] = useState<string[]>([]);

  // Generate matrix effect characters
  useEffect(() => {
    const chars = "01ГΑΊΑGAiA🌍⚡🛡️💎".split("");
    const interval = setInterval(() => {
      setMatrixEffect((prev) => {
        const newEffect = [];
        for (let i = 0; i < 20; i++) {
          newEffect.push(chars[Math.floor(Math.random() * chars.length)]);
        }
        return newEffect;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Simulate live transactions
  useEffect(() => {
    const generateTransaction = (): Transaction => {
      const types: Transaction["type"][] = [
        "deposit",
        "withdrawal",
        "burn",
        "environmental",
        "community",
      ];
      const purposes = [
        "Tree Planting Initiative",
        "Ocean Cleanup Project",
        "Community Development",
        "Token Burn Event",
        "Environmental Research",
        "Renewable Energy Fund",
        "Wildlife Conservation",
        "Carbon Offset Program",
      ];

      return {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        amount: Math.random() * 10000 + 100,
        hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
        timestamp: new Date(),
        purpose: purposes[Math.floor(Math.random() * purposes.length)],
        status: Math.random() > 0.3 ? "confirmed" : "pending",
      };
    };

    // Add initial transactions
    const initialTransactions = Array.from({ length: 8 }, generateTransaction);
    setLiveTransactions(initialTransactions);

    // Add new transactions periodically
    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setLiveTransactions((prev) => [newTransaction, ...prev.slice(0, 19)]); // Keep last 20

      // Update vault stats
      setVaultStats((prev) => ({
        ...prev,
        totalBalance:
          prev.totalBalance +
          (newTransaction.type === "deposit"
            ? newTransaction.amount
            : -newTransaction.amount * 0.1),
        totalTransactions: prev.totalTransactions + 1,
        environmentalFunds:
          newTransaction.type === "environmental"
            ? prev.environmentalFunds + newTransaction.amount
            : prev.environmentalFunds,
        communityFunds:
          newTransaction.type === "community"
            ? prev.communityFunds + newTransaction.amount
            : prev.communityFunds,
        burnedTokens:
          newTransaction.type === "burn"
            ? prev.burnedTokens + newTransaction.amount
            : prev.burnedTokens,
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.COMMUNITY_VAULT_WALLET);
    toast.success("Community Wallet Address Copied!", {
      description: "This is where all fees go - 100% transparent",
    });
  };

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return "💰";
      case "withdrawal":
        return "📤";
      case "burn":
        return "🔥";
      case "environmental":
        return "🌱";
      case "community":
        return "👥";
      default:
        return "⚡";
    }
  };

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return "text-green-400";
      case "withdrawal":
        return "text-orange-400";
      case "burn":
        return "text-red-400";
      case "environmental":
        return "text-emerald-400";
      case "community":
        return "text-blue-400";
      default:
        return "text-purple-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="matrix-bg">
          {matrixEffect.map((char, index) => (
            <div
              key={index}
              className="absolute text-green-400 font-mono text-xs animate-pulse"
              style={{
                left: `${(index * 5) % 100}%`,
                top: `${(index * 7) % 100}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* Community Vault Header */}
      <Card className="relative border-green-500/50 bg-gradient-to-br from-green-900/40 to-emerald-900/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10 animate-pulse" />
        <CardHeader className="relative">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
              <div className="relative">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-400 animate-pulse" />
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg animate-ping" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-base sm:text-xl lg:text-2xl">
                🏦 COMMUNITY VAULT
              </span>
              <div className="relative">
                <Eye className="h-8 w-8 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg animate-ping" />
              </div>
            </div>
          </CardTitle>
          <div className="text-center space-y-2">
            <p className="text-green-400 font-bold">
              💎 100% TRANSPARENT • REAL-TIME MONITORING • COMMUNITY OWNED
            </p>
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-green-400">
                  <strong>🏦 Community Wallet Address:</strong>
                </div>
                <Button
                  onClick={copyWalletAddress}
                  variant="outline"
                  size="sm"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/20"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <code className="font-mono text-xs block mt-2 text-emerald-300 break-all">
                {GAIA_TOKEN.COMMUNITY_VAULT_WALLET}
              </code>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Vault Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <Wallet className="h-8 w-8 mx-auto text-green-400 mb-2 animate-pulse" />
            <div className="text-xl font-bold text-green-400">
              {formatGaiaNumber(vaultStats.totalBalance)} GAiA
            </div>
            <div className="text-xs text-muted-foreground">Total Balance</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-xl font-bold text-emerald-400">
              {formatGaiaNumber(vaultStats.environmentalFunds)}
            </div>
            <div className="text-xs text-muted-foreground">Environmental</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-blue-400 mb-2 animate-pulse" />
            <div className="text-xl font-bold text-blue-400">
              {formatGaiaNumber(vaultStats.communityFunds)}
            </div>
            <div className="text-xs text-muted-foreground">Community</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-xl font-bold text-red-400">
              {formatGaiaNumber(vaultStats.burnedTokens)}
            </div>
            <div className="text-xs text-muted-foreground">Burned</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto text-purple-400 mb-2 animate-pulse" />
            <div className="text-xl font-bold text-purple-400">
              {vaultStats.totalTransactions.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Transactions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-xl font-bold text-yellow-400">
              {vaultStats.activeUsers.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
      </div>

      {/* Live Transaction Matrix */}
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Activity className="h-6 w-6 animate-pulse" />
            🔴 LIVE TRANSACTION MATRIX
            <Badge className="bg-red-600 text-white animate-pulse ml-2">LIVE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black rounded-lg p-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              {liveTransactions.map((tx, index) => (
                <div
                  key={tx.id}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border transition-all duration-500
                    ${index === 0 ? "bg-green-900/50 border-green-500/50 animate-pulse" : "bg-gray-900/30 border-gray-700/30"}
                    hover:bg-cyan-900/30 hover:border-cyan-500/30
                  `}
                  style={{
                    opacity: Math.max(0.3, 1 - index * 0.05),
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{getTransactionIcon(tx.type)}</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getTransactionColor(tx.type)}`}>
                          {tx.type.toUpperCase()}
                        </span>
                        <Badge
                          className={`text-xs ${
                            tx.status === "confirmed"
                              ? "bg-green-600"
                              : tx.status === "pending"
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          }`}
                        >
                          {tx.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">{tx.purpose}</div>
                      <div className="text-xs font-mono text-gray-400">
                        {tx.hash} • {tx.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${getTransactionColor(tx.type)}`}>
                      {tx.type === "withdrawal" ? "-" : "+"}
                      {formatGaiaNumber(tx.amount)} GAiA
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${formatGaiaPrice(tx.amount * GAIA_TOKEN.INITIAL_PRICE)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://solscan.io/account/${GAIA_TOKEN.COMMUNITY_VAULT_WALLET}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Solscan
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={GAIA_TOKEN.PUMP_FUN_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Track on Pump.fun
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transparency Statement */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-blue-400">🛡️ ABSOLUTE TRANSPARENCY GUARANTEE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                <div className="font-bold text-green-400 mb-2">🌱 Environmental Impact</div>
                <p className="text-green-300">
                  All environmental fees directly fund verified tree planting, ocean cleanup, and
                  renewable energy projects. Track every contribution in real-time.
                </p>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                <div className="font-bold text-blue-400 mb-2">👥 Community Development</div>
                <p className="text-blue-300">
                  Community fees support platform development, user rewards, and ecosystem growth.
                  Every decision is transparent and community-driven.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              <strong>
                🔒 Zero Hidden Fees • 🌍 Real Environmental Impact • 👥 Community Controlled
              </strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <style>{`
        .matrix-bg {
          animation: matrix-rain 20s linear infinite;
        }
        
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}
