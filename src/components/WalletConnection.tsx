import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Check, AlertCircle, Copy } from "lucide-react";
import { toast } from "sonner";
import { SolanaProvider, WindowWithProviders } from "@/types/ui-types";
import { GAIA_TOKEN } from "@/constants/gaia";

export function WalletConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<SolanaProvider | null>(null);

  useEffect(() => {
    console.log("💰 WALLET CONNECTION - Multi-Wallet Support Active");
    console.log("🔗 GAiA Token Integration:", GAIA_TOKEN.CONTRACT_ADDRESS);

    // Check for existing connection
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const windowWithProviders = window as WindowWithProviders;

      if (windowWithProviders.solana) {
        const solanaProvider = windowWithProviders.solana;
        setProvider(solanaProvider);

        if (solanaProvider.isConnected && solanaProvider.publicKey) {
          setIsConnected(true);
          setWalletAddress(solanaProvider.publicKey.toString());
          console.log("✅ Wallet already connected:", solanaProvider.publicKey.toString());
        }
      }
    } catch (error) {
      console.log("ℹ️ No wallet found or connection check failed");
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);

    try {
      const windowWithProviders = window as WindowWithProviders;

      if (!windowWithProviders.solana) {
        toast.error("Please install Phantom wallet or another Solana wallet");
        setIsConnecting(false);
        return;
      }

      const solanaProvider = windowWithProviders.solana;
      const response = await solanaProvider.connect();

      if (response.publicKey) {
        setProvider(solanaProvider);
        setIsConnected(true);
        setWalletAddress(response.publicKey.toString());

        toast.success("🎉 Wallet Connected Successfully!", {
          description: `Connected to ${response.publicKey.toString().slice(0, 8)}...${response.publicKey.toString().slice(-8)}`,
          duration: 5000,
        });

        console.log("✅ Wallet connected:", response.publicKey.toString());
      }
    } catch (error) {
      console.error("❌ Wallet connection failed:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (provider && provider.disconnect) {
        await provider.disconnect();
      }

      setIsConnected(false);
      setWalletAddress("");
      setProvider(null);

      toast.success("Wallet disconnected successfully");
      console.log("🔌 Wallet disconnected");
    } catch (error) {
      console.error("❌ Wallet disconnect failed:", error);
      toast.error("Failed to disconnect wallet");
    }
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success("Address copied to clipboard!");
    }
  };

  return (
    <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Wallet className="h-5 w-5" />
          💰 Wallet Connection - GAiA Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🔗</div>
            <p className="text-muted-foreground">
              Connect your wallet to access GAiA token features and earn rewards
            </p>
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-medium">Connected</span>
              </div>
              <Badge className="bg-green-600">Active</Badge>
            </div>

            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Wallet Address</div>
                  <div className="font-mono text-sm text-green-400">
                    {`${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}`}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAddress}
                  className="border-green-500/30 text-green-400"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
                <div className="text-lg font-bold text-blue-400">0.00</div>
                <div className="text-sm text-muted-foreground">SOL Balance</div>
              </div>
              <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
                <div className="text-lg font-bold text-green-400">0</div>
                <div className="text-sm text-muted-foreground">GAiA Tokens</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={disconnectWallet}
                variant="outline"
                className="flex-1 border-red-500/30 text-red-400"
              >
                Disconnect
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank")}
              >
                View GAiA Token
              </Button>
            </div>
          </div>
        )}

        {/* Wallet Features */}
        <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
          <h4 className="font-bold text-purple-400 mb-2">🔮 Wallet Features</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>• GAiA token trading and rewards</div>
            <div>• NFT marketplace access</div>
            <div>• Green project funding participation</div>
            <div>• Gaming rewards and tournaments</div>
            <div>• Staking and yield farming</div>
            <div>• Cross-chain bridge access</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
