import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, ExternalLink } from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";
import { toast } from "sonner";

interface MatrixChar {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

interface MatrixWalletDisplayProps {
  walletAddress: string;
  label: string;
}

export function MatrixWalletDisplay({ walletAddress, label }: MatrixWalletDisplayProps) {
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [matrixChars, setMatrixChars] = useState<MatrixChar[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Initialize matrix characters
    const chars = [];
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 50; i++) {
      chars.push({
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setMatrixChars(chars);

    if (!isAnimating) return;

    const interval = setInterval(() => {
      setMatrixChars((prev) =>
        prev.map((char) => ({
          ...char,
          y: (char.y + char.speed) % 100,
          char:
            Math.random() < 0.1
              ? matrixChars[Math.floor(Math.random() * matrixChars.length)]
              : char.char,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet Address Copied!", {
      description: `${label} copied to clipboard`,
      duration: 3000,
    });
  };

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS);
    toast.success("Contract Address Copied!", {
      description: "GAiA contract address copied to clipboard",
      duration: 3000,
    });
  };

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank");
  };

  const formatAddress = (address: string) => {
    if (showFullAddress) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/30">
      {/* Matrix Background */}
      <div className="absolute inset-0 overflow-hidden">
        {matrixChars.map((char, index) => (
          <div
            key={index}
            className="absolute text-green-400 font-mono text-sm pointer-events-none"
            style={{
              left: `${char.x}%`,
              top: `${char.y}%`,
              opacity: char.opacity,
              transform: "translateY(-50%)",
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-green-400">
          <span className="text-2xl">🌐</span>
          MATRIX WALLET DISPLAY - Official GAiA Addresses
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            onClick={openPumpFun}
            variant="outline"
            size="sm"
            className="border-purple-500/30 text-purple-400"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View on PumpFun
          </Button>
          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            variant="outline"
            size="sm"
            className="border-green-500/30 text-green-400"
          >
            {isAnimating ? "Pause Matrix" : "Start Matrix"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {/* Wallet Address Display */}
        <div className="p-4 bg-black/40 rounded-lg border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-bold">{label}</span>
              <Badge className="bg-green-600 text-white">OFFICIAL</Badge>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowFullAddress(!showFullAddress)}
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400"
              >
                {showFullAddress ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
              <Button
                onClick={copyWalletAddress}
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="font-mono text-green-300 text-sm bg-black/30 p-2 rounded border border-green-500/20">
            {formatAddress(walletAddress)}
          </div>
        </div>

        {/* Official Contract Address */}
        <div className="p-4 bg-black/40 rounded-lg border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-bold">Official GAiA Contract:</span>
              <Badge className="bg-blue-600 text-white">VERIFIED</Badge>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowFullAddress(!showFullAddress)}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400"
              >
                {showFullAddress ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
              <Button
                onClick={copyContractAddress}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="font-mono text-blue-300 text-sm bg-black/30 p-2 rounded border border-blue-500/20">
            {formatAddress(GAIA_TOKEN.CONTRACT_ADDRESS)}
          </div>
        </div>

        {/* Network Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
            <div className="text-lg font-bold text-purple-400">
              {GAIA_TOKEN.NETWORK || "Solana"}
            </div>
            <div className="text-muted-foreground">Network</div>
          </div>
          <div className="text-center p-3 bg-yellow-900/20 rounded border border-yellow-500/20">
            <div className="text-lg font-bold text-yellow-400">LIVE</div>
            <div className="text-muted-foreground">Status</div>
          </div>
          <div className="text-center p-3 bg-cyan-900/20 rounded border border-cyan-500/20">
            <div className="text-lg font-bold text-cyan-400">100%</div>
            <div className="text-muted-foreground">Verified</div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">🔒 Security Notice</h4>
          <p className="text-sm text-green-300">
            These are the official verified addresses for the Harmony of Gaia (GAiA) token. Always
            verify addresses before making transactions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
