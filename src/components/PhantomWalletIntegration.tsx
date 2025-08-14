import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  ArrowUpDown,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Users,
  Repeat,
  Crown,
  Send,
  DollarSign,
  ExternalLink,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";

// Type definitions for Phantom wallet
interface PhantomTransaction {
  signature: string;
  feePayer: string;
  instructions: Array<{
    programId: string;
    keys: Array<{ pubkey: string; isSigner: boolean; isWritable: boolean }>;
    data: Buffer;
  }>;
}

interface PhantomRequestOptions {
  method: string;
  params?: Record<string, unknown>;
}

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      signAndSendTransaction: (transaction: PhantomTransaction) => Promise<{ signature: string }>;
      publicKey?: { toString: () => string };
      isConnected: boolean;
      request: (options: PhantomRequestOptions) => Promise<unknown>;
    };
  }
}

interface WalletAccount {
  address: string;
  balance: number;
  tokens: TokenBalance[];
  name: string;
  isImported?: boolean;
}

interface TokenBalance {
  symbol: string;
  balance: number;
  mint: string;
  decimals: number;
}

export function PhantomWalletIntegration() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedFromAccount, setSelectedFromAccount] = useState("");
  const [selectedToAccount, setSelectedToAccount] = useState("");
  const [selectedFromToken, setSelectedFromToken] = useState("");
  const [selectedToToken, setSelectedToToken] = useState("");
  const [swapAmount, setSwapAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);

  // Your imported wallet address
  const IMPORTED_WALLET = "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstACh";

  const fetchAllAccounts = useCallback(async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        setAccount(response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
        setConnected(true);
        // Simulate balance fetch
        setBalance(Math.random() * 100);

        // Updated to use the correct GAiA wallet address
        const mockAccounts: WalletAccount[] = [
          {
            address: GAIA_TOKEN.WALLET_ADDRESS,
            balance: 2847.5,
            name: "Official GAiA Wallet",
            tokens: [
              {
                symbol: "SOL",
                balance: 15.67,
                mint: "So11111111111111111111111111111111111111112",
                decimals: 9,
              },
              {
                symbol: "GAiA",
                balance: 2847.5,
                mint: GAIA_TOKEN.CONTRACT_ADDRESS,
                decimals: 9,
              },
              {
                symbol: "USDC",
                balance: 1250.0,
                mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                decimals: 6,
              },
              {
                symbol: "RAY",
                balance: 89.34,
                mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
                decimals: 6,
              },
            ],
          },
          {
            address: IMPORTED_WALLET,
            balance: 847.92,
            name: "Official GAiA Imported Wallet",
            isImported: true,
            tokens: [
              {
                symbol: "SOL",
                balance: 847.92,
                mint: "So11111111111111111111111111111111111111112",
                decimals: 9,
              },
              {
                symbol: "GAiA",
                balance: 15678.45,
                mint: GAIA_TOKEN.CONTRACT_ADDRESS,
                decimals: 9,
              },
              {
                symbol: "USDC",
                balance: 2456.78,
                mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                decimals: 6,
              },
              {
                symbol: "USDT",
                balance: 1890.12,
                mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
                decimals: 6,
              },
            ],
          },
        ];
        setAccounts(mockAccounts);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }, []);

  useEffect(() => {
    // Check if Phantom is installed
    if (window.solana && window.solana.isPhantom) {
      console.log("Phantom wallet detected");
      fetchAllAccounts();
    }
  }, [fetchAllAccounts]);

  const connectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        setAccount(response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
        setConnected(true);
        toast.success("Phantom Wallet Connected!", {
          description: `Account ${response.publicKey.toString().slice(0, 8)}... connected`,
          duration: 3000,
        });
        await fetchAllAccounts();
      } else {
        toast.error("Phantom Wallet not detected!", {
          description: "Please install Phantom Wallet to connect",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error);
      toast.error("Connection Failed", {
        description: "Could not connect to Phantom Wallet. Please try again.",
        duration: 5000,
      });
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        await window.solana.disconnect();
        setConnected(false);
        setAccount(null);
        setWalletAddress("");
        setAccounts([]);
        toast.info("Phantom Wallet Disconnected", {
          description: "You have disconnected from Phantom Wallet",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error disconnecting from Phantom wallet:", error);
      toast.error("Disconnection Failed", {
        description: "Could not disconnect from Phantom Wallet. Please try again.",
        duration: 5000,
      });
    }
  };

  const copyAccountAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast.success("Account Address Copied!", {
        description: `Account address ${account.slice(0, 8)}... copied to clipboard`,
        duration: 3000,
      });
    } else {
      toast.error("No Account Connected", {
        description: "Connect your Phantom Wallet to copy the account address",
        duration: 3000,
      });
    }
  };

  const openInExplorer = () => {
    if (account) {
      const explorerUrl = `https://solscan.io/account/${account}`;
      window.open(explorerUrl, "_blank");
    } else {
      toast.error("No Account Connected", {
        description: "Connect your Phantom Wallet to view in explorer",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Wallet className="h-6 w-6" />
          👻 Phantom Wallet Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">
              Status: {connected ? "Connected" : "Disconnected"}
            </p>
            <p className="text-xl font-bold text-white">
              Account: {account ? `${account.slice(0, 8)}...` : "Not Connected"}
            </p>
            <p className="text-green-400">Balance: {balance.toFixed(2)} SOL</p>
          </div>
          <Badge className="bg-blue-600 text-white">
            <Shield className="h-3 w-3 mr-1" />
            Secured by Phantom
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          {!connected ? (
            <Button onClick={connectWallet} className="bg-purple-600 hover:bg-purple-700">
              <Zap className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <Button
              onClick={disconnectWallet}
              variant="outline"
              className="border-purple-500/30 text-purple-400"
            >
              Disconnect
            </Button>
          )}
          <Button onClick={copyAccountAddress} variant="secondary">
            <Copy className="h-4 w-4 mr-2" />
            Copy Address
          </Button>
          <Button onClick={openInExplorer} variant="secondary">
            <ExternalLink className="h-4 w-4 mr-2" />
            View in Explorer
          </Button>
        </div>

        {/* Enhanced features when connected */}
        {connected && accounts.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-400">GAiA Wallet Accounts</h3>
            <div className="grid gap-4">
              {accounts.map((walletAccount, index) => (
                <Card key={index} className="bg-gray-800/50 border-green-500/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-green-300">{walletAccount.name}</h4>
                        <p className="text-sm text-gray-400">
                          {walletAccount.address.slice(0, 8)}...
                          {walletAccount.address.slice(-6)}
                        </p>
                      </div>
                      {walletAccount.isImported && (
                        <Badge className="bg-orange-600 text-white">Imported</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {walletAccount.tokens.map((token, tokenIndex) => (
                        <div key={tokenIndex} className="bg-gray-700/50 rounded p-2 text-center">
                          <div className="text-xs text-gray-400">{token.symbol}</div>
                          <div className="text-sm font-semibold text-white">
                            {token.balance.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
