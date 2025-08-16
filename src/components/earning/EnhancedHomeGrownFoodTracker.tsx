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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import {
  Carrot,
  Camera,
  MapPin,
  Calendar,
  Scale,
  Leaf,
  Sun,
  Droplets,
  Award,
  Star,
  TrendingUp,
} from "lucide-react";

export function EnhancedHomeGrownFoodTracker() {
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [growingMethod, setGrowingMethod] = useState("");
  const [harvestWeight, setHarvestWeight] = useState("");
  const [notes, setNotes] = useState("");
  const { recordHomeGrownFood, loading } = useEarningActivities("user-123");

  const [gardenStats] = useState({
    totalHarvests: 47,
    totalWeight: 89.3,
    varietiesGrown: 23,
    seasonalStreak: 8,
    waterSaved: 1240,
    co2Offset: 156.7,
  });

  const [currentCrops] = useState([
    {
      id: "1",
      name: "Cherry Tomatoes",
      planted: "2024-01-15",
      stage: "flowering",
      expectedHarvest: "2024-03-01",
      method: "container_garden",
      health: 92,
    },
    {
      id: "2",
      name: "Lettuce Mix",
      planted: "2024-01-20",
      stage: "mature",
      expectedHarvest: "2024-02-10",
      method: "hydroponic",
      health: 88,
    },
    {
      id: "3",
      name: "Herbs Collection",
      planted: "2024-01-10",
      stage: "harvest_ready",
      expectedHarvest: "Ready now",
      method: "windowsill",
      health: 95,
    },
  ]);

  const [recentHarvests] = useState([
    {
      id: "1",
      crop: "Spinach",
      weight: 2.3,
      date: "2024-02-05",
      method: "organic_soil",
      earnings: 46,
      photos: 3,
    },
    {
      id: "2",
      crop: "Carrots",
      weight: 1.8,
      date: "2024-02-03",
      method: "raised_bed",
      earnings: 36,
      photos: 5,
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cropType || !quantity || !growthStage || !growingMethod) {
      toast.error("Please fill in all required fields");
      return;
    }

    const stageMultipliers = {
      seedling: 0.5,
      growing: 1.0,
      flowering: 1.2,
      fruiting: 1.5,
      harvest_ready: 2.0,
      harvested: 2.5,
    };

    const methodMultipliers = {
      organic_soil: 1.5,
      hydroponic: 1.8,
      aquaponic: 2.0,
      permaculture: 2.2,
      container_garden: 1.3,
      raised_bed: 1.4,
      windowsill: 1.2,
      greenhouse: 1.6,
    };

    const basePoints = parseFloat(quantity) * 20;
    const stageBonus =
      basePoints * (stageMultipliers[growthStage as keyof typeof stageMultipliers] || 1);
    const methodBonus =
      stageBonus * (methodMultipliers[growingMethod as keyof typeof methodMultipliers] || 1);
    const weightBonus = harvestWeight ? parseFloat(harvestWeight) * 10 : 0;

    const totalPoints = Math.floor(methodBonus + weightBonus);

    try {
      await recordHomeGrownFood({
        foodType: cropType,
        quantity: parseFloat(quantity)
        growthStage,
        growingMethod,
        harvestWeight: harvestWeight ? parseFloat(harvestWeight) : 0,
        notes,
        organic: true,
        photoVerified: true,
      });

      toast.success(
        `🥕 Home grown food recorded! +${totalPoints} points earned for sustainable growing!`
      );
      setCropType("");
      setQuantity("");
      setGrowthStage("");
      setGrowingMethod("");
      setHarvestWeight("");
      setNotes("");
    } catch (error) {
      toast.error("Failed to record home grown food activity");
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "seedling":
        return "bg-green-600";
      case "growing":
        return "bg-blue-600";
      case "flowering":
        return "bg-yellow-600";
      case "fruiting":
        return "bg-orange-600";
      case "harvest_ready":
        return "bg-red-600";
      case "harvested":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-400";
    if (health >= 75) return "text-yellow-400";
    if (health >= 60) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/20 via-green-900/20 to-yellow-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Carrot className="h-6 w-6" />
          🥕 Enhanced Home Grown Food Tracker
          <Badge className="bg-orange-600">Garden Master</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Garden Impact Dashboard */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-orange-400">🌱 Your Garden Impact</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">{gardenStats.totalHarvests}</div>
              <div className="text-xs text-muted-foreground">Harvests</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <div className="text-xl font-bold text-green-400">{gardenStats.totalWeight}kg</div>
              <div className="text-xs text-muted-foreground">Total Grown</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
              <div className="text-xl font-bold text-yellow-400">{gardenStats.varietiesGrown}</div>
              <div className="text-xs text-muted-foreground">Varieties</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">{gardenStats.seasonalStreak}</div>
              <div className="text-xs text-muted-foreground">Season Streak</div>
            </div>
            <div className="text-center p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/20">
              <div className="text-xl font-bold text-cyan-400">{gardenStats.waterSaved}L</div>
              <div className="text-xs text-muted-foreground">Water Saved</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">{gardenStats.co2Offset}kg</div>
              <div className="text-xs text-muted-foreground">CO2 Offset</div>
            </div>
          </div>
        </div>

        {/* Current Crops Growing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            🌿 Currently Growing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCrops.map((crop) => (
              <div
                key={crop.id}
                className="p-4 bg-green-900/20 rounded-lg border border-green-500/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-green-300">{crop.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      {crop.method.replace("_", " ")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getHealthColor(crop.health)}`}>
                      {crop.health}%
                    </div>
                    <div className="text-xs text-muted-foreground">Health</div>
                  </div>
                </div>

                <Badge className={getStageColor(crop.stage)}>{crop.stage.replace("_", " ")}</Badge>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Planted:</span>
                    <span>{new Date(crop.planted).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Harvest:</span>
                    <span className="text-yellow-400">{crop.expectedHarvest}</span>
                  </div>
                </div>

                <Progress value={crop.health} className="mt-3 h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Harvests */}
        <div className="space-y-3">
          <h4 className="font-semibold text-orange-400 flex items-center gap-2">
            <Award className="h-4 w-4" />
            🏆 Recent Harvest Success
          </h4>
          {recentHarvests.map((harvest) => (
            <div
              key={harvest.id}
              className="flex items-center justify-between p-3 bg-orange-900/20 rounded-lg border border-orange-500/20"
            >
              <div className="flex items-center gap-3">
                <Scale className="h-5 w-5 text-orange-400" />
                <div>
                  <div className="font-medium text-orange-300">{harvest.crop}</div>
                  <div className="text-sm text-muted-foreground">
                    {harvest.weight}kg • {harvest.method.replace("_", " ")} • {harvest.photos}{" "}
                    photos
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-yellow-400">+{harvest.earnings} GAiA</div>
                <div className="text-xs text-muted-foreground">{harvest.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Track New Growth/Harvest */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-gradient-to-r from-orange-900/20 to-green-900/20 rounded-lg border border-orange-500/20"
        >
          <h4 className="font-semibold text-orange-400 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Record Garden Activity
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Crop Type</label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder="What are you growing?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomatoes">🍅 Tomatoes</SelectItem>
                  <SelectItem value="lettuce">🥬 Lettuce</SelectItem>
                  <SelectItem value="herbs">🌿 Herbs</SelectItem>
                  <SelectItem value="carrots">🥕 Carrots</SelectItem>
                  <SelectItem value="peppers">🌶️ Peppers</SelectItem>
                  <SelectItem value="spinach">🥬 Spinach</SelectItem>
                  <SelectItem value="beans">🫘 Beans</SelectItem>
                  <SelectItem value="cucumber">🥒 Cucumber</SelectItem>
                  <SelectItem value="berries">🫐 Berries</SelectItem>
                  <SelectItem value="microgreens">🌱 Microgreens</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Plant Quantity</label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Number of plants"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Growth Stage</label>
              <Select value={growthStage} onValueChange={setGrowthStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Current stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seedling">🌱 Seedling (0.5x)</SelectItem>
                  <SelectItem value="growing">🌿 Growing (1x)</SelectItem>
                  <SelectItem value="flowering">🌸 Flowering (1.2x)</SelectItem>
                  <SelectItem value="fruiting">🍎 Fruiting (1.5x)</SelectItem>
                  <SelectItem value="harvest_ready">🏆 Ready to Harvest (2x)</SelectItem>
                  <SelectItem value="harvested">✅ Harvested (2.5x)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Growing Method</label>
              <Select value={growingMethod} onValueChange={setGrowingMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="How are you growing?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic_soil">🌱 Organic Soil (1.5x)</SelectItem>
                  <SelectItem value="hydroponic">💧 Hydroponic (1.8x)</SelectItem>
                  <SelectItem value="aquaponic">🐟 Aquaponic (2x)</SelectItem>
                  <SelectItem value="permaculture">🌍 Permaculture (2.2x)</SelectItem>
                  <SelectItem value="container_garden">🪴 Container Garden (1.3x)</SelectItem>
                  <SelectItem value="raised_bed">📦 Raised Bed (1.4x)</SelectItem>
                  <SelectItem value="windowsill">🪟 Windowsill (1.2x)</SelectItem>
                  <SelectItem value="greenhouse">🏠 Greenhouse (1.6x)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Harvest Weight (kg) - Optional
              </label>
              <Input
                type="number"
                step="0.1"
                value={harvestWeight}
                onChange={(e) => setHarvestWeight(e.target.value)}
                placeholder="Weight if harvested"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photo Verification</label>
              <Button
                type="button"
                variant="outline"
                className="w-full border-green-500 text-green-400"
              >
                <Camera className="h-4 w-4 mr-2" />
                Add Photos (+bonus points)
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Growing Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about your growing experience, challenges, or tips..."
              className="min-h-[80px]"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {loading ? "Recording..." : "🥕 Record Garden Activity"}
          </Button>
        </form>

        <div className="p-4 bg-gradient-to-r from-orange-500/10 to-green-500/10 rounded-lg border border-orange-500/20">
          <p className="text-sm text-orange-300">
            💡 <strong>Garden Master Bonus:</strong> Different growing methods and stages earn
            different multipliers! Photo verification and detailed tracking earn the highest
            rewards!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
