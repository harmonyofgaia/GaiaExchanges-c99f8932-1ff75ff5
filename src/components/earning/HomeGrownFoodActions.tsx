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
import { Carrot } from "lucide-react";

export function HomeGrownFoodActions() {
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const { recordHomeGrownFood, loading } = useEarningActivities("user-123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cropType || !quantity) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await recordHomeGrownFood({
        foodType: cropType,
        quantity: parseFloat(quantity),
        growthDuration: 90,
        organicCertified: true,
        harvestDate: new Date().toISOString(),
        seedsShared: 0,
        knowledgeShared: true,
      });

      toast.success("Home grown food recorded! +20 points earned");
      setCropType("");
      setQuantity("");
    } catch (error) {
      toast.error("Failed to record home grown food");
    }
  };

  return (
    <Card className="border-orange-500/30 bg-orange-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Carrot className="h-5 w-5" />
          🥕 Home Grown Food
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Crop Type</label>
            <Input
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              placeholder="Tomatoes, lettuce, herbs..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Quantity (kg)
            </label>
            <Input
              type="number"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter harvest quantity"
              min="0.1"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {loading ? "Recording..." : "🥕 Record Harvest (+20 Points)"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
          <p className="text-sm text-orange-300">
            💡 <strong>Bonus:</strong> Organic certification and seed sharing
            earn extra tokens!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
