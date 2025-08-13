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
import { Bird } from "lucide-react";

export function WildlifeConservationActions() {
  const [conservationType, setConservationType] = useState("");
  const [speciesHelped, setSpeciesHelped] = useState("");
  const [habitatArea, setHabitatArea] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const { addActivity, loading } = useEarningActivities("user-123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !conservationType ||
      !speciesHelped ||
      !habitatArea ||
      !activityDuration
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const basePoints = {
      habitat_restoration: 100,
      species_monitoring: 75,
      nest_box_installation: 50,
      invasive_species_removal: 80,
      wildlife_corridor_creation: 120,
      pollinator_garden: 60,
    };

    const points =
      (basePoints[conservationType as keyof typeof basePoints] || 50) +
      parseFloat(habitatArea) * 2;
    const tokens = Math.floor(points * 0.25);

    const activity = {
      id: Date.now().toString(),
      type: "wildlife_conservation",
      title: "Wildlife Conservation Action",
      amount: Math.floor(points),
      timestamp: new Date(),
      description: `${conservationType.replace("_", " ")} for ${speciesHelped} covering ${habitatArea}m²`,
      status: "completed" as const,
      pointsEarned: Math.floor(points),
      tokensEarned: tokens,
      verified: true,
      metadata: {
        conservationType,
        speciesHelped,
        habitatArea: parseFloat(habitatArea),
        activityDuration: parseFloat(activityDuration),
      },
    };

    addActivity(activity);
    toast.success(
      `Wildlife conservation recorded! +${Math.floor(points)} points earned for protecting nature`,
    );
    setConservationType("");
    setSpeciesHelped("");
    setHabitatArea("");
    setActivityDuration("");
  };

  return (
    <Card className="border-emerald-500/30 bg-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-400">
          <Bird className="h-5 w-5" />
          🦅 Wildlife Conservation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Conservation Activity
            </label>
            <Select
              value={conservationType}
              onValueChange={setConservationType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select conservation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="habitat_restoration">
                  Habitat Restoration (100 pts)
                </SelectItem>
                <SelectItem value="species_monitoring">
                  Species Monitoring (75 pts)
                </SelectItem>
                <SelectItem value="nest_box_installation">
                  Nest Box Installation (50 pts)
                </SelectItem>
                <SelectItem value="invasive_species_removal">
                  Invasive Species Removal (80 pts)
                </SelectItem>
                <SelectItem value="wildlife_corridor_creation">
                  Wildlife Corridor Creation (120 pts)
                </SelectItem>
                <SelectItem value="pollinator_garden">
                  Pollinator Garden (60 pts)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Species/Wildlife Helped
            </label>
            <Input
              value={speciesHelped}
              onChange={(e) => setSpeciesHelped(e.target.value)}
              placeholder="e.g., Birds, Bees, Butterflies, Local wildlife..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Habitat Area (m²)
            </label>
            <Input
              type="number"
              value={habitatArea}
              onChange={(e) => setHabitatArea(e.target.value)}
              placeholder="Area covered or affected"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Time Invested (hours)
            </label>
            <Input
              type="number"
              step="0.5"
              value={activityDuration}
              onChange={(e) => setActivityDuration(e.target.value)}
              placeholder="Time spent on activity"
              min="0.5"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? "Recording..." : "🦅 Record Wildlife Conservation"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
          <p className="text-sm text-emerald-300">
            💡 <strong>Biodiversity Bonus:</strong> Wildlife conservation
            activities get premium multipliers for protecting endangered
            species!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
