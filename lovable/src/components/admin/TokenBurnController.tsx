import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Shield, AlertTriangle, TrendingDown } from "lucide-react";
import { toast } from "sonner";

export function TokenBurnController() {
  const [burnAmount, setBurnAmount] = useState("");
  const [totalBurned, setTotalBurned] = useState(2847536);
  const [burnRate, setBurnRate] = useState(1.2);
  const [isBurning, setIsBurning] = useState(false);
  const [deflationRate, setDeflationRate] = useState(3.7);

  const executeBurn = async () => {
    if (!burnAmount || parseFloat(burnAmount) <= 0) {
      toast.error("Please enter a valid burn amount");
      return;
    }

    setIsBurning(true);
    toast.info(`🔥 Initiating burn of ${burnAmount} GAIA tokens...`);

    // Simulate burn process
    setTimeout(() => {
      const burnValue = parseFloat(burnAmount);
      setTotalBurned((prev) => prev + burnValue);
      setBurnRate((prev) => prev + 0.1);
      setDeflationRate((prev) => prev + 0.2);
      setBurnAmount("");
      setIsBurning(false);

      toast.success(`🔥 Successfully burned ${burnAmount} GAIA tokens!`, {
        description: "Token supply has been permanently reduced",
      });
    }, 3000);
  };

  const emergencyBurn = () => {
    toast.warning("⚠️ Emergency burn protocol activated!", {
      description: "This will burn 1% of total supply",
    });

    setIsBurning(true);
    setTimeout(() => {
      setTotalBurned((prev) => prev + 100000);
      setBurnRate((prev) => prev + 0.5);
      setIsBurning(false);
      toast.success("Emergency burn completed successfully");
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-red-900/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Flame className="h-6 w-6" />
            🔥 Token Burn Control Center
            <Badge className="bg-red-600 text-white animate-pulse">
              ADMIN ONLY
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Burn Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-orange-900/20 rounded-lg text-center">
              <Flame className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">
                {totalBurned.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Burned</div>
            </div>
            <div className="p-4 bg-red-900/20 rounded-lg text-center">
              <TrendingDown className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{burnRate}%</div>
              <div className="text-sm text-muted-foreground">Burn Rate</div>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-lg text-center">
              <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {deflationRate}%
              </div>
              <div className="text-sm text-muted-foreground">
                Deflation Rate
              </div>
            </div>
            <div className="p-4 bg-yellow-900/20 rounded-lg text-center">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">97.3M</div>
              <div className="text-sm text-muted-foreground">
                Remaining Supply
              </div>
            </div>
          </div>

          {/* Burn Progress */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Monthly Burn Target</span>
              <span>68.4% Complete</span>
            </div>
            <Progress value={68.4} className="h-3" />
          </div>

          {/* Manual Burn Controls */}
          <Card className="border-orange-500/30 bg-orange-900/10">
            <CardHeader>
              <CardTitle className="text-orange-400 text-lg">
                Manual Token Burn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Enter burn amount"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="flex-1"
                  disabled={isBurning}
                />
                <Button
                  onClick={executeBurn}
                  disabled={isBurning || !burnAmount}
                  className="bg-red-600 hover:bg-red-700 min-w-[120px]"
                >
                  <Flame className="h-4 w-4 mr-2" />
                  {isBurning ? "Burning..." : "Execute Burn"}
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                ⚠️ Warning: Token burns are permanent and irreversible
              </div>
            </CardContent>
          </Card>

          {/* Emergency Controls */}
          <Card className="border-red-600/50 bg-red-900/20">
            <CardHeader>
              <CardTitle className="text-red-400 text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Burn Protocol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Emergency burn will immediately burn 1% of total token supply to
                combat inflation or market manipulation.
              </p>
              <Button
                onClick={emergencyBurn}
                disabled={isBurning}
                className="bg-red-700 hover:bg-red-800 w-full"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                {isBurning
                  ? "Emergency Burn in Progress..."
                  : "Activate Emergency Burn"}
              </Button>
            </CardContent>
          </Card>

          {/* Burn History */}
          <Card className="border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-gray-400 text-lg">
                Recent Burn History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { amount: "50,000", date: "2 hours ago", type: "Manual" },
                  { amount: "25,000", date: "1 day ago", type: "Automated" },
                  { amount: "100,000", date: "3 days ago", type: "Emergency" },
                  { amount: "75,000", date: "1 week ago", type: "Manual" },
                ].map((burn, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-900/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Flame className="h-4 w-4 text-orange-400" />
                      <span className="font-medium">{burn.amount} GAIA</span>
                      <Badge variant="outline" className="text-xs">
                        {burn.type}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {burn.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
