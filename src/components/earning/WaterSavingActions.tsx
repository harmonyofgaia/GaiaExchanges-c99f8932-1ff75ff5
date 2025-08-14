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
import { Droplets } from "lucide-react";

export function WaterSavingActions() {
  const [actionType, setActionType] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const { recordWaterSaving, loading } = useEarningActivities("user-123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!actionType || !waterAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await recordWaterSaving({
        amount: parseInt(waterAmount),
        actionType,
        duration: 30,
        verified: true,
      });

      const points = Math.floor(parseInt(waterAmount) * 0.1);
      toast.success(`Water saving recorded! +${points} points earned`);
      setActionType("");
      setWaterAmount("");
    } catch (error) {
      toast.error("Failed to record water saving action");
    }
  };

  return (
    <Card className="border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Droplets className="h-5 w-5" />
          💧 Water Conservation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Conservation Method</label>
            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select conservation method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rain_collection">Rain Water Collection</SelectItem>
                <SelectItem value="greywater_reuse">Greywater Reuse</SelectItem>
                <SelectItem value="low_flow_fixtures">Low-Flow Fixtures</SelectItem>
                <SelectItem value="leak_repair">Leak Repair</SelectItem>
                <SelectItem value="drought_resistant_plants">Drought-Resistant Plants</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Water Saved (Liters)</label>
            <Input
              type="number"
              value={waterAmount}
              onChange={(e) => setWaterAmount(e.target.value)}
              placeholder="Enter amount in liters"
              min="1"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? "Recording..." : "💧 Record Water Saving"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
          <p className="text-sm text-blue-300">
            💡 <strong>Earning:</strong> 0.1 points per liter saved + bonus tokens for verified
            actions
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
