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
import { TreePine } from "lucide-react";

export function TreePlantingActions() {
  const [treeType, setTreeType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const { addActivity, loading } = useEarningActivities("user-123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!treeType || !quantity || !location) {
      toast.error("Please fill in all fields");
      return;
    }

    const points = parseInt(quantity) * 50;
    const tokens = parseInt(quantity) * 10;

    const activity = {
      id: Date.now().toString(),
      type: "tree_planting",
      title: "Tree Planting Initiative",
      amount: points,
      timestamp: new Date(),
      description: `Planted ${quantity} ${treeType} trees at ${location}`,
      status: "completed" as const,
      pointsEarned: points,
      tokensEarned: tokens,
      verified: true,
      metadata: { treeType, quantity: parseInt(quantity), location },
    };

    addActivity(activity);
    toast.success(`Tree planting recorded! +${points} points earned for ${quantity} trees`);
    setTreeType("");
    setQuantity("");
    setLocation("");
  };

  return (
    <Card className="border-green-500/30 bg-green-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <TreePine className="h-5 w-5" />
          🌳 Tree Planting Initiative
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tree Type</label>
            <Select value={treeType} onValueChange={setTreeType}>
              <SelectTrigger>
                <SelectValue placeholder="Select tree type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oak">Oak</SelectItem>
                <SelectItem value="pine">Pine</SelectItem>
                <SelectItem value="maple">Maple</SelectItem>
                <SelectItem value="fruit_tree">Fruit Tree</SelectItem>
                <SelectItem value="native_species">Native Species</SelectItem>
                <SelectItem value="mangrove">Mangrove</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Trees</label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="How many trees?"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Park, forest, community area..."
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? "Recording..." : "🌳 Record Tree Planting (+50 Points per Tree)"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
          <p className="text-sm text-green-300">
            💡 <strong>Impact:</strong> Each tree planted captures 22kg CO2 annually and supports
            biodiversity!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
