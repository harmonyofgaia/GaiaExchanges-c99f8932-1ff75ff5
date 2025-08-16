import { useState, useEffect, useRef, useCallback} from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MatrixTransaction {
  id: string;
  hash: string;
  type: "received" | "sent" | "burned" | "staked";
  amount: number;
  timestamp: Date;
  status: "confirmed" | "pending";
  from: string;
  to: string;
}

const mockTransactions: MatrixTransaction[] = [
  {
    id: "1",
    hash: "0x742d35cc6c8f1a16ca1b6c8e9f3d2a5b1e7c4d8f9a2b3c5e6f8d1a4b7c9e2f5a8",
    type: "received",
    amount: 1250.5,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "confirmed",
    from: "Environmental Reward System",
    to: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFL",
  },
  {
    id: "2",
    hash: "0x9f4e8c2a1b5d7f3e6a8c4b9e2f1d5a7c3e6f8a1b4d7c9e2f5a8b1c4e7f9a2b5d",
    type: "burned",
    amount: 500.0,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "confirmed",
    from: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFL",
    to: "Ocean Cleanup Burning Address",
  },
  {
    id: "3",
    hash: "0x1a2b3c4d5e6f7a8b9c1d2e3f4a5b6c7d8e9f1a2b3c4d5e6f7a8b9c1d2e3f4a5b",
    type: "sent",
    amount: 750.25,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "pending",
    from: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFL",
    to: "Community Wallet",
  },
];

export function MatrixTransactionWallet() {
  const [transactions, setTransactions] = useState<MatrixTransaction[]>(mockTransactions);
  const [matrixCode, setMatrixCode] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate matrix-style falling code effect
  useEffect(() => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
    const interval = setInterval(() => {
      const newCode = Array.from(
        { length: 50 },
        () => chars[Math.floor(Math.random() * chars.length)]
      );
      setMatrixCode(newCode);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Matrix canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    const matrix = "01GAiABURN";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff41";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const animationId = setInterval(draw, 35);
    return () => clearInterval(animationId);
  }, []);

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "received":
        return "text-green-400";
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
    <div className="relative">
      {/* Abstract Background Layers */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/20" />
        <div className="absolute inset-0 bg-[url('/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-green-500/5 to-blue-500/10" />
      </div>

      <Card className="relative bg-black/80 backdrop-blur-md border-green-500/30 overflow-hidden">
        <CardContent className="p-6">
          {/* Wallet Illustration */}
          <div className="relative mb-6">
            <div className="flex items-center justify-center">
              {/* Open Wallet Visualization */}
              <div className="relative w-96 h-64 mx-auto">
                {/* Wallet Base */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl shadow-2xl transform perspective-1000 rotate-x-12">
                  {/* Wallet Interior */}
                  <div className="absolute inset-4 bg-gradient-to-br from-black to-gray-800 rounded-xl">
                    {/* Matrix Canvas */}
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full rounded-xl opacity-60"
                    />

                    {/* Transaction Display Area */}
                    <div className="absolute inset-2 bg-black/50 rounded-lg p-2 overflow-hidden">
                      <div className="text-green-400 text-xs font-mono mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        LIVE TRANSACTION MATRIX
                      </div>

                      {/* Scrolling Transaction Feed */}
                      <div className="space-y-1 max-h-40 overflow-hidden">
                        {transactions.map((tx, index) => (
                          <div
                            key={tx.id}
                            className={`text-xs font-mono ${getTransactionColor(tx.type)} animate-fade-in opacity-80`}
                            style={{
                              animationDelay: `${index * 0.2}s`,
                              filter: "drop-shadow(0 0 2px currentColor)",
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">[{tx.type.toUpperCase()}]</span>
                              <span>{tx.amount} GAiA</span>
                              <span className="text-gray-600">→</span>
                              <span className="truncate max-w-20">{tx.hash.slice(0, 8)}...</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Wallet Edges & Details */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-t-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 rounded-b-2xl" />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/20 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse delay-500" />
                <div className="absolute top-1/2 -right-6 w-4 h-4 bg-purple-400/20 rounded-full animate-pulse delay-1000" />
              </div>
            </div>
          </div>

          {/* Matrix Transaction Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              Live Transaction Matrix
            </h3>

            {transactions.map((tx, index) => (
              <div
                key={tx.id}
                className="relative group bg-black/40 border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`${getTransactionColor(tx.type)} border-current`}
                      >
                        {tx.type.toUpperCase()}
                      </Badge>
                      <code className="text-xs text-gray-400 font-mono">
                        {tx.hash.slice(0, 16)}...
                      </code>
                    </div>
                    <div className="text-sm text-gray-300">
                      {tx.type === "received" ? "From" : "To"}:{" "}
                      {tx.type === "received" ? tx.from : tx.to}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-lg font-bold font-mono ${getTransactionColor(tx.type)}`}>
                      {tx.type === "received" ? "+" : "-"}
                      {tx.amount} GAiA
                    </div>
                    <div className="text-xs text-gray-400">{tx.timestamp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
