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
import { RotateCcw } from "lucide-react";

export function RecyclingActions() {
  const [materialType, setMaterialType] = useState("");
  const [weight, setWeight] = useState("");
  const [recyclingCenter, setRecyclingCenter] = useState("");
  const { addActivity, loading } = useEarningActivities("user-123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!materialType || !weight || !recyclingCenter) {
      toast.error("Please fill in all fields");
      return;
    }

    const multipliers: { [key: string]: number } = {
      plastic: 3,
      glass: 2,
      metal: 5,
      paper: 1.5,
      electronics: 10,
      batteries: 15,
      organic: 2,
    };

    const points = parseFloat(weight) * (multipliers[materialType] || 2);
    const tokens = Math.floor(points * 0.15);

    const activity = {
      id: Date.now().toString(),
      type: "recycling",
      title: "Recycling Activity",
      amount: Math.floor(points),
      timestamp: new Date(),
      description: `Recycled ${weight}kg of ${materialType} at ${recyclingCenter}`,
      status: "completed" as const,
      pointsEarned: Math.floor(points),
      tokensEarned: tokens,
      verified: true,
      metadata: { materialType, weight: parseFloat(weight), recyclingCenter },
    };

    addActivity(activity);
    toast.success(`Recycling recorded! +${Math.floor(points)} points earned`);
    setMaterialType("");
    setWeight("");
    setRecyclingCenter("");
  };

  return (
    <Card className="border-cyan-500/30 bg-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <RotateCcw className="h-5 w-5" />
          ♻️ Recycling Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Material Type
            </label>
            <Select value={materialType} onValueChange={setMaterialType}>
              <SelectTrigger>
                <SelectValue placeholder="Select material type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plastic">Plastic (3x multiplier)</SelectItem>
                <SelectItem value="glass">Glass (2x multiplier)</SelectItem>
                <SelectItem value="metal">Metal (5x multiplier)</SelectItem>
                <SelectItem value="paper">Paper (1.5x multiplier)</SelectItem>
                <SelectItem value="electronics">
                  Electronics (10x multiplier)
                </SelectItem>
                <SelectItem value="batteries">
                  Batteries (15x multiplier)
                </SelectItem>
                <SelectItem value="organic">
                  Organic Waste (2x multiplier)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Weight (kg)
            </label>
            <Input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight of recycled material"
              min="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Recycling Location
            </label>
            <Input
              value={recyclingCenter}
              onChange={(e) => setRecyclingCenter(e.target.value)}
              placeholder="Recycling center, facility name..."
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {loading ? "Recording..." : "♻️ Record Recycling Activity"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
          <p className="text-sm text-cyan-300">
            💡 <strong>Circular Economy:</strong> Different materials have
            different point multipliers based on environmental impact!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
