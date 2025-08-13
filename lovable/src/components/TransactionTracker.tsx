import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Download,
  ExternalLink,
  Eye,
  Shield,
} from "lucide-react";
import { GAIA_TOKEN, formatGaiaPrice } from "@/constants/gaia";

interface Transaction {
  id: string;
  hash: string;
  type: "received" | "sent" | "burned" | "staked" | "reward" | "ecosystem";
  token: string;
  amount: number;
  from: string;
  to: string;
  timestamp: Date;
  status: "confirmed" | "pending" | "failed";
  gasUsed?: number;
  gasFee?: number;
  blockNumber?: number;
  purpose?: string;
}

const harmonyTransactions: Transaction[] = [
  {
    id: "1",
    hash:
      GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20) +
      "..." +
      GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: "reward",
    token: "GAiA",
    amount: 2847.5,
    from: "Environmental Reward System",
    to: GAIA_TOKEN.WALLET_ADDRESS,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "confirmed",
    gasUsed: 21000,
    gasFee: 0.0001,
    blockNumber: 18450123,
    purpose: "Ocean Cleanup Reward",
  },
  {
    id: "2",
    hash:
      GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20) +
      "..." +
      GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: "burned",
    token: "GAiA",
    amount: 1250.0,
    from: GAIA_TOKEN.WALLET_ADDRESS,
    to: "Harmony Burn Address",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "confirmed",
    gasUsed: 45000,
    gasFee: 0.0002,
    blockNumber: 18449876,
    purpose: "Carbon Offset Burning",
  },
  {
    id: "3",
    hash:
      GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20) +
      "..." +
      GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: "ecosystem",
    token: "GAiA",
    amount: 3750.25,
    from: "Wildlife Conservation Fund",
    to: GAIA_TOKEN.WALLET_ADDRESS,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "confirmed",
    gasUsed: 21000,
    gasFee: 0.00001,
    blockNumber: 18448956,
    purpose: "Rainforest Protection Project",
  },
];

export function TransactionTracker() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(harmonyTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Simulate real-time updates every 5 seconds with Harmony of Gaia data
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🌍 Checking for new Harmony of Gaia transactions...");

      // Add new environmental transaction
      const environmentalActions = [
        "Ocean Cleanup Reward",
        "Carbon Credit Exchange",
        "Renewable Energy Pool",
        "Wildlife Conservation",
        "Ecosystem Restoration",
        "Sustainable Agriculture",
        "Forest Reforestation",
        "Marine Protection",
      ];

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        hash:
          GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20) +
          "..." +
          GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
        type: Math.random() > 0.5 ? "reward" : "ecosystem",
        token: "GAiA",
        amount: Math.random() * 2000 + 500,
        from:
          Math.random() > 0.5
            ? "Environmental Reward System"
            : "Harmony Ecosystem",
        to: GAIA_TOKEN.WALLET_ADDRESS,
        timestamp: new Date(),
        status: "confirmed",
        gasUsed: Math.floor(Math.random() * 50000) + 20000,
        gasFee: Math.random() * 0.001,
        blockNumber: Math.floor(Math.random() * 1000) + 18450000,
        purpose:
          environmentalActions[
            Math.floor(Math.random() * environmentalActions.length)
          ],
      };

      setTransactions((prev) => [newTransaction, ...prev.slice(0, 19)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.purpose?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === "all" || tx.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "failed":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
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

  const formatAmount = (amount: number, token: string) => {
    return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${token}`;
  };

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank");
  };

  return (
    <Card className="border-green-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Eye className="h-5 w-5" />
          🌍 Harmony of Gaia - Complete Transaction History (100% Transparent)
        </CardTitle>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-green-400" />
          <span className="text-green-400">
            Auto-updated every 5 seconds • World's #1 Ecological Project
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GAiA Token Information */}
        <div className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">
                Contract Address
              </div>
              <code className="text-xs text-green-400 break-all">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Official Wallet
              </div>
              <code className="text-xs text-blue-400 break-all">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
            </div>
            <div>
              <Button
                onClick={openPumpFun}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Pump.fun
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by hash, token, address, purpose..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-background border border-input rounded-md text-sm"
            >
              <option value="all">All Types</option>
              <option value="received">Received</option>
              <option value="reward">Rewards</option>
              <option value="ecosystem">Ecosystem</option>
              <option value="sent">Sent</option>
              <option value="burned">Burned</option>
              <option value="staked">Staked</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Transaction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Token/Amount</TableHead>
                <TableHead>From/To</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Block/Gas</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/20">
                  <TableCell className="font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted/50 px-2 py-1 rounded text-xs">
                        {tx.hash.slice(0, 8)}...{tx.hash.slice(-8)}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getTypeColor(tx.type)} border-current`}
                    >
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">
                    <div className="font-semibold">
                      {formatAmount(tx.amount, tx.token)}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="space-y-1">
                      <div className="text-muted-foreground">From:</div>
                      <div className="bg-muted/30 px-1 rounded text-xs">
                        {tx.from.length > 20
                          ? `${tx.from.slice(0, 20)}...`
                          : tx.from}
                      </div>
                      <div className="text-muted-foreground">To:</div>
                      <div className="bg-muted/30 px-1 rounded text-xs">
                        {tx.to.length > 20 ? `${tx.to.slice(0, 20)}...` : tx.to}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <Badge
                      variant="outline"
                      className="text-cyan-400 border-cyan-400/50"
                    >
                      {tx.purpose || "General"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(tx.status)}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono">
                    <div className="space-y-1">
                      <div>Block: {tx.blockNumber}</div>
                      <div>Gas: {tx.gasUsed?.toLocaleString()}</div>
                      <div>Fee: {tx.gasFee} SOL</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>{tx.timestamp.toLocaleDateString()}</div>
                    <div className="text-muted-foreground">
                      {tx.timestamp.toLocaleTimeString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No transactions found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
