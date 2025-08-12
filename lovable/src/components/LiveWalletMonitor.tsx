import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Eye,
  Tv,
} from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  hash: string;
  timestamp: Date;
  from: string;
  to: string;
  status: "confirmed" | "pending";
}

export function LiveWalletMonitor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(2847392.67);
  const [isLive, setIsLive] = useState(true);

  // Vintage TV Matrix Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const matrix = "GAiA♦WALLET♦TRANSACTION♦PUMP♦FUN♦0123456789ABCDEF";
    const matrixArray = matrix.split("");
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      if (!ctx || !canvas) return;

      // Vintage TV effect with scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add vintage TV noise
      if (Math.random() > 0.95) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          2,
          2,
        );
      }

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text =
          matrixArray[Math.floor(Math.random() * matrixArray.length)];

        // Vintage green with slight flicker
        const alpha = 0.8 + Math.random() * 0.2;
        ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Add scanlines for vintage TV effect
      ctx.strokeStyle = "rgba(0, 255, 65, 0.1)";
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    const animationId = setInterval(draw, 50);
    return () => clearInterval(animationId);
  }, []);

  useEffect(() => {
    const generateTransaction = (): Transaction => {
      const isIncoming = Math.random() > 0.5;
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: isIncoming ? "incoming" : "outgoing",
        amount: Math.random() * 50000 + 100,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        timestamp: new Date(),
        from: isIncoming ? `Pump.fun Pool` : GAIA_TOKEN.WALLET_ADDRESS,
        to: isIncoming
          ? GAIA_TOKEN.WALLET_ADDRESS
          : `0x${Math.random().toString(16).substr(2, 40)}`,
        status: Math.random() > 0.2 ? "confirmed" : "pending",
      };
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newTx = generateTransaction();
        setTransactions((prev) => [newTx, ...prev.slice(0, 9)]);

        setBalance((prev) => {
          const change =
            newTx.type === "incoming" ? newTx.amount : -newTx.amount;
          return Math.max(0, prev + change);
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      {/* Vintage TV Frame */}
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black p-8 rounded-3xl shadow-2xl border-8 border-gray-700 relative overflow-hidden">
        {/* TV Screen Bezel */}
        <div className="bg-black p-4 rounded-2xl border-4 border-gray-600 relative overflow-hidden shadow-inner">
          {/* Matrix Background Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-30"
            style={{ filter: "blur(0.5px)" }}
          />

          {/* Screen Content */}
          <div className="relative z-10 bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400 font-mono text-xl">
                <Tv className="h-6 w-6" />
                📺 LIVE GAiA WALLET MONITOR - VINTAGE TERMINAL
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  className={`${isLive ? "bg-green-600 animate-pulse" : "bg-red-600"} text-white font-mono`}
                >
                  {isLive ? "●REC LIVE" : "●OFFLINE"}
                </Badge>
                <Badge className="bg-blue-600 text-white font-mono">
                  PUMP.FUN CONNECTED
                </Badge>
              </div>
              <div className="text-sm text-green-300 font-mono">
                WALLET: {formatAddress(GAIA_TOKEN.WALLET_ADDRESS)}
              </div>
            </CardHeader>

            <CardContent>
              {/* Balance Display with Vintage Style */}
              <div className="mb-6 p-6 bg-black/60 rounded-lg border-2 border-green-500/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-green-400 font-mono uppercase tracking-wider">
                      TOTAL BALANCE
                    </div>
                    <div className="text-4xl font-bold text-green-400 font-mono tracking-wider">
                      {balance.toLocaleString()} {GAIA_TOKEN.SYMBOL}
                    </div>
                    <div className="text-lg text-green-300 font-mono">
                      ≈ ${(balance * 3.12).toLocaleString()} USD
                    </div>
                  </div>
                  <DollarSign className="h-16 w-16 text-green-400 opacity-50" />
                </div>
              </div>

              {/* Live Transaction Feed */}
              <div className="space-y-3">
                <h4 className="font-bold text-green-400 flex items-center gap-2 font-mono">
                  <Clock className="h-4 w-4" />
                  LIVE TRANSACTION FEED
                </h4>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {transactions.map((tx, index) => (
                    <div
                      key={tx.id}
                      className={`p-3 rounded border transition-all duration-500 font-mono ${
                        index === 0
                          ? "border-yellow-500/50 bg-yellow-900/20 animate-pulse"
                          : "border-green-500/30 bg-black/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {tx.type === "incoming" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-400" />
                          )}
                          <span
                            className={`font-bold text-xs ${
                              tx.type === "incoming"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {tx.type === "incoming" ? "[IN]" : "[OUT]"}
                          </span>
                        </div>
                        <Badge
                          className={`text-xs ${
                            tx.status === "confirmed"
                              ? "bg-green-600"
                              : "bg-yellow-600"
                          } text-white font-mono`}
                        >
                          {tx.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-green-300">AMOUNT:</span>
                          <span className="font-bold text-white">
                            {tx.amount.toLocaleString()} {GAIA_TOKEN.SYMBOL}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">FROM:</span>
                          <span className="font-mono text-xs text-blue-300">
                            {formatAddress(tx.from)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">TIME:</span>
                          <span className="text-xs text-cyan-300">
                            {tx.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vintage TV Controls */}
              <div className="mt-6 flex justify-center gap-4">
                <Button
                  onClick={() => setIsLive(!isLive)}
                  className="bg-green-600 hover:bg-green-700 font-mono text-xs"
                >
                  {isLive ? "PAUSE FEED" : "RESUME FEED"}
                </Button>
                <Button
                  variant="outline"
                  className="border-green-500/30 text-green-400 font-mono text-xs"
                  onClick={() => window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank")}
                >
                  VIEW ON PUMP.FUN
                </Button>
              </div>
            </CardContent>
          </div>
        </div>

        {/* TV Brand Label */}
        <div className="absolute bottom-2 right-4 text-gray-400 text-xs font-mono">
          GAiA-VISION™ MODEL 2024
        </div>
      </div>
    </div>
  );
}
