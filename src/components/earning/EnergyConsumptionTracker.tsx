import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import {
  Zap,
  Home,
  TrendingDown,
  Battery,
  Sun,
  Wind,
  Gauge,
  Target,
  Calendar,
  Award,
} from "lucide-react";

export function EnergyConsumptionTracker() {
  const [energyType, setEnergyType] = useState("");
  const [currentUsage, setCurrentUsage] = useState("");
  const [previousUsage, setPreviousUsage] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [energySource, setEnergySource] = useState("");
  const { addActivity, loading } = useEarningActivities("user-123");

  const [liveData, setLiveData] = useState({
    currentPower: 3.2,
    dailyUsage: 24.7,
    efficiency: 87,
    co2Emissions: 12.3,
    costSavings: 45.6,
  });

  const [monthlyStats] = useState({
    totalReduction: 156.8,
    efficiencyGain: 23.5,
    renewablePercent: 78,
    costSaved: 234.5,
    co2Reduced: 89.4,
    tokensEarned: 567,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        currentPower: 2.5 + Math.random() * 2,
        dailyUsage: prev.dailyUsage + (Math.random() - 0.5) * 0.1,
        efficiency: Math.min(100, Math.max(70, prev.efficiency + (Math.random() - 0.5) * 2)),
        co2Emissions: prev.co2Emissions + (Math.random() - 0.5) * 0.2,
        costSavings: prev.costSavings + Math.random() * 0.1,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [recentEfforts] = useState([
    {
      id: "1",
      action: "LED Bulb Replacement",
      reduction: 45.6,
      timeframe: "monthly",
      savings: 23.5,
      tokens: 91,
      date: "2024-02-05",
    },
    {
      id: "2",
      action: "Smart Thermostat Usage",
      reduction: 78.3,
      timeframe: "weekly",
      savings: 34.2,
      tokens: 156,
      date: "2024-02-01",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!energyType || !currentUsage || !previousUsage || !timeframe) {
      toast.error("Please fill in all required fields");
      return;
    }

    const reductionAmount = parseFloat(previousUsage) - parseFloat(currentUsage);
    const reductionPercent = (reductionAmount / parseFloat(previousUsage)) * 100;

    if (reductionAmount <= 0) {
      toast.error("Current usage must be less than previous usage to earn rewards");
      return;
    }

    const timeframeMult = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const sourceMult = {
      renewable: 2.0,
      mixed_grid: 1.5,
      natural_gas: 1.2,
      oil: 1.0,
      coal: 0.8,
    };

    const basePoints = reductionAmount * 10;
    const timeframeBonus =
      basePoints * (timeframeMult[timeframe as keyof typeof timeframeMult] || 1);
    const sourceBonus = energySource
      ? timeframeBonus * (sourceMult[energySource as keyof typeof sourceMult] || 1)
      : timeframeBonus;
    const efficiencyBonus = reductionPercent > 20 ? sourceBonus * 1.5 : sourceBonus;

    const totalPoints = Math.floor(efficiencyBonus);
    const tokens = Math.floor(totalPoints * 0.4);

    const activity = {
      id: Date.now().toString(),
      type: "energy_reduction",
      title: "Energy Consumption Reduction",
      amount: totalPoints,
      timestamp: new Date(),
      description: `Reduced ${energyType} by ${reductionAmount.toFixed(1)}kWh (${reductionPercent.toFixed(1)}% reduction)`,
      status: "completed" as const,
      pointsEarned: totalPoints,
      tokensEarned: tokens,
      verified: true,
      metadata: {
        energyType,
        currentUsage: parseFloat(currentUsage),
        previousUsage: parseFloat(previousUsage)
        reductionAmount,
        reductionPercent,
        timeframe,
        energySource,
      },
    };

    addActivity(activity);
    toast.success(
      `⚡ Energy reduction recorded! +${totalPoints} points earned for ${reductionPercent.toFixed(1)}% efficiency gain!`
    );
    setEnergyType("");
    setCurrentUsage("");
    setPreviousUsage("");
    setTimeframe("");
    setEnergySource("");
  };

  return (
    <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Zap className="h-6 w-6" />⚡ Energy Consumption & Efficiency Tracker
          <Badge className="bg-yellow-600">Live Monitoring</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Live Energy Dashboard */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
            <Gauge className="h-5 w-5" />⚡ Real-Time Energy Monitoring
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
              <div className="text-xl font-bold text-yellow-400">
                {liveData.currentPower.toFixed(1)}kW
              </div>
              <div className="text-xs text-muted-foreground">Current Usage</div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <div
                  className="bg-yellow-400 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${(liveData.currentPower / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">
                {liveData.dailyUsage.toFixed(1)}kWh
              </div>
              <div className="text-xs text-muted-foreground">Today's Usage</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <div className="text-xl font-bold text-green-400">
                {liveData.efficiency.toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Efficiency</div>
              <Progress value={liveData.efficiency} className="mt-2 h-1" />
            </div>
            <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/20">
              <div className="text-xl font-bold text-red-400">
                {liveData.co2Emissions.toFixed(1)}kg
              </div>
              <div className="text-xs text-muted-foreground">CO2 Today</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">
                ${liveData.costSavings.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">Saved Today</div>
            </div>
          </div>
        </div>

        {/* Monthly Impact Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-orange-400">📊 This Month's Impact</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">{monthlyStats.totalReduction}</div>
              <div className="text-xs text-muted-foreground">kWh Reduced</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <div className="text-xl font-bold text-green-400">{monthlyStats.efficiencyGain}%</div>
              <div className="text-xs text-muted-foreground">Efficiency +</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">
                {monthlyStats.renewablePercent}%
              </div>
              <div className="text-xs text-muted-foreground">Renewable</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
              <div className="text-xl font-bold text-yellow-400">${monthlyStats.costSaved}</div>
              <div className="text-xs text-muted-foreground">Money Saved</div>
            </div>
            <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/20">
              <div className="text-xl font-bold text-red-400">{monthlyStats.co2Reduced}kg</div>
              <div className="text-xs text-muted-foreground">CO2 Reduced</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">{monthlyStats.tokensEarned}</div>
              <div className="text-xs text-muted-foreground">GAiA Earned</div>
            </div>
          </div>
        </div>

        {/* Recent Efficiency Improvements */}
        <div className="space-y-3">
          <h4 className="font-semibold text-yellow-400 flex items-center gap-2">
            <Award className="h-4 w-4" />
            🏆 Recent Energy Savings
          </h4>
          {recentEfforts.map((effort) => (
            <div
              key={effort.id}
              className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/20"
            >
              <div className="flex items-center gap-3">
                <TrendingDown className="h-5 w-5 text-green-400" />
                <div>
                  <div className="font-medium text-yellow-300">{effort.action}</div>
                  <div className="text-sm text-muted-foreground">
                    -{effort.reduction}kWh {effort.timeframe} • ${effort.savings} saved •{" "}
                    {effort.date}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-yellow-400">+{effort.tokens} GAiA</div>
                <Badge className="bg-green-600">Verified</Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Record Energy Reduction */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg border border-yellow-500/20"
        >
          <h4 className="font-semibold text-yellow-400 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Record Energy Efficiency Improvement
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Energy Type</label>
              <Select value={energyType} onValueChange={setEnergyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select energy category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electricity">⚡ Electricity</SelectItem>
                  <SelectItem value="heating">🔥 Heating</SelectItem>
                  <SelectItem value="cooling">❄️ Cooling/AC</SelectItem>
                  <SelectItem value="hot_water">🚿 Hot Water</SelectItem>
                  <SelectItem value="lighting">💡 Lighting</SelectItem>
                  <SelectItem value="appliances">📱 Appliances</SelectItem>
                  <SelectItem value="total_home">🏠 Total Home Usage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timeframe</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Comparison period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">📅 Daily (1x)</SelectItem>
                  <SelectItem value="weekly">📅 Weekly (7x)</SelectItem>
                  <SelectItem value="monthly">📅 Monthly (30x)</SelectItem>
                  <SelectItem value="yearly">📅 Yearly (365x)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Previous Usage (kWh)</label>
              <Input
                type="number"
                step="0.1"
                value={previousUsage}
                onChange={(e) => setPreviousUsage(e.target.value)}
                placeholder="Before improvement"
                min="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Usage (kWh)</label>
              <Input
                type="number"
                step="0.1"
                value={currentUsage}
                onChange={(e) => setCurrentUsage(e.target.value)}
                placeholder="After improvement"
                min="0"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Energy Source (Optional)</label>
              <Select value={energySource} onValueChange={setEnergySource}>
                <SelectTrigger>
                  <SelectValue placeholder="Your energy source for bonus multiplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renewable">🌞 100% Renewable (2x multiplier)</SelectItem>
                  <SelectItem value="mixed_grid">⚡ Mixed Grid (1.5x multiplier)</SelectItem>
                  <SelectItem value="natural_gas">🔥 Natural Gas (1.2x multiplier)</SelectItem>
                  <SelectItem value="oil">🛢️ Oil (1x multiplier)</SelectItem>
                  <SelectItem value="coal">⚫ Coal (0.8x multiplier)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {previousUsage && currentUsage && (
            <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {(
                    ((parseFloat(previousUsage) - parseFloat(currentUsage)) /
                      parseFloat(previousUsage)) *
                    100
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-sm text-green-300">Reduction Achieved</div>
                <div className="text-xs text-muted-foreground">
                  Saved {(parseFloat(previousUsage) - parseFloat(currentUsage)).toFixed(1)} kWh
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {loading ? "Recording..." : "⚡ Record Energy Efficiency (+10 pts per kWh saved)"}
          </Button>
        </form>

        <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
          <p className="text-sm text-yellow-300">
            💡 <strong>Efficiency Master:</strong> Large percentage reductions earn 1.5x bonus!
            Renewable energy sources provide multiplied rewards for sustainable living!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
