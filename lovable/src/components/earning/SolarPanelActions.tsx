import { useState } from "react";
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
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import { Sun } from "lucide-react";

export function SolarPanelActions() {
  const [panelType, setPanelType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [monthlyGeneration, setMonthlyGeneration] = useState("");
  const { addActivity, loading } = useEarningActivities("user-123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!panelType || !capacity || !monthlyGeneration) {
      toast.error("Please fill in all fields");
      return;
    }

    const points =
      parseFloat(capacity) * 20 + parseFloat(monthlyGeneration) * 0.5;
    const tokens = Math.floor(points * 0.2);

    const activity = {
      id: Date.now().toString(),
      type: "solar_panel",
      title: "Solar Panel Installation",
      amount: Math.floor(points),
      timestamp: new Date(),
      description: `${capacity}kW ${panelType} system generating ${monthlyGeneration}kWh/month`,
      status: "completed" as const,
      pointsEarned: Math.floor(points),
      tokensEarned: tokens,
      verified: true,
      metadata: {
        panelType,
        capacity: parseFloat(capacity),
        monthlyGeneration: parseFloat(monthlyGeneration),
      },
    };

    addActivity(activity);
    toast.success(
      `Solar installation recorded! +${Math.floor(points)} points earned`,
    );
    setPanelType("");
    setCapacity("");
    setMonthlyGeneration("");
  };

  return (
    <Card className="border-yellow-500/30 bg-yellow-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Sun className="h-5 w-5" />
          ☀️ Solar Panel Installation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Panel Type</label>
            <Select value={panelType} onValueChange={setPanelType}>
              <SelectTrigger>
                <SelectValue placeholder="Select panel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monocrystalline">Monocrystalline</SelectItem>
                <SelectItem value="polycrystalline">Polycrystalline</SelectItem>
                <SelectItem value="thin_film">Thin Film</SelectItem>
                <SelectItem value="bifacial">Bifacial</SelectItem>
                <SelectItem value="perovskite">Perovskite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              System Capacity (kW)
            </label>
            <Input
              type="number"
              step="0.1"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter system capacity"
              min="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Monthly Generation (kWh)
            </label>
            <Input
              type="number"
              value={monthlyGeneration}
              onChange={(e) => setMonthlyGeneration(e.target.value)}
              placeholder="Average monthly generation"
              min="1"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {loading ? "Recording..." : "☀️ Record Solar Installation"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
          <p className="text-sm text-yellow-300">
            💡 <strong>Bonus:</strong> Solar installations qualify for premium
            GAiA multipliers and renewable energy badges!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
