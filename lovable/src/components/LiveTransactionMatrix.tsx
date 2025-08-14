import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Shield, Activity } from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";

interface MatrixTransaction {
  id: string;
  hash: string;
  type: "received" | "sent" | "burned" | "staked" | "reward" | "ecosystem";
  amount: number;
  timestamp: Date;
  status: "confirmed" | "pending";
  from: string;
  to: string;
  purpose?: string;
}

const mockTransactions: MatrixTransaction[] = [
  {
    id: "1",
    hash: GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20) + "..." + GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: "reward",
    amount: 2847.5,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "confirmed",
    from: "Environmental Reward System",
    to: GAIA_TOKEN.WALLET_ADDRESS,
    purpose: "Ocean Cleanup Reward",
  },
  {
    id: "2",
    hash: GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20) + "..." + GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: "burned",
    amount: 1250.0,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "confirmed",
    from: GAIA_TOKEN.WALLET_ADDRESS,
    to: "Carbon Offset Burning Address",
    purpose: "Carbon Offset Burning",
  },
  {
    id: "3",
    hash: GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20) + "..." + GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: "ecosystem",
    amount: 1875.25,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "confirmed",
    from: "Wildlife Conservation Fund",
    to: GAIA_TOKEN.WALLET_ADDRESS,
    purpose: "Rainforest Protection",
  },
];

export function LiveTransactionMatrix() {
  const [transactions, setTransactions] = useState<MatrixTransaction[]>(mockTransactions);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const environmentalActions = [
        "Ocean Cleanup Reward",
        "Carbon Credit Exchange",
        "Renewable Energy Pool",
        "Wildlife Conservation",
        "Ecosystem Restoration",
        "Sustainable Agriculture",
      ];

      const newTransaction: MatrixTransaction = {
        id: Date.now().toString(),
        hash:
          GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20) + "..." + GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
        type: Math.random() > 0.5 ? "reward" : "ecosystem",
        amount: Math.random() * 2000 + 500,
        timestamp: new Date(),
        status: "confirmed",
        from: Math.random() > 0.5 ? "Environmental Reward System" : "Harmony Ecosystem",
        to: GAIA_TOKEN.WALLET_ADDRESS,
        purpose: environmentalActions[Math.floor(Math.random() * environmentalActions.length)],
      };

      setTransactions((prev) => [newTransaction, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "received":
        return "text-green-400";
      case "reward":
        return "text-emerald-400";
      case "ecosystem":
        return "text-cyan-400";
      case "sent":
        return "text-blue-400";
      case "burned":
        return "text-orange-400";
      case "staked":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          🔥 LIVE TRANSACTION MATRIX - FULL TRANSPARENCY
        </CardTitle>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-green-400" />
          <span className="text-green-400">Real-time GAiA transactions • 100% Transparent</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-black/40 border border-green-500/20 rounded-lg p-4">
          <div className="text-green-400 text-sm font-mono mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            LIVE MATRIX FEED
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {transactions.map((tx, index) => (
              <div
                key={tx.id}
                className={`text-xs font-mono ${getTransactionColor(tx.type)} bg-black/20 p-2 rounded border border-current/20`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${getTransactionColor(tx.type)} border-current text-xs`}
                    >
                      {tx.type.toUpperCase()}
                    </Badge>
                    <span className="text-white">{tx.amount.toFixed(2)} GAiA</span>
                  </div>
                  <span className="text-gray-400">{tx.timestamp.toLocaleTimeString()}</span>
                </div>
                <div className="text-gray-400 mt-1">
                  {tx.purpose} • {tx.hash.slice(0, 16)}...
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
          <div className="text-sm text-cyan-300 space-y-1 text-center">
            <div>🔗 Connected to: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20)}...</div>
            <div>💼 Community Wallet: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 20)}...</div>
            <div>🌍 100% Transparent • Real-time Updates • Community First</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
