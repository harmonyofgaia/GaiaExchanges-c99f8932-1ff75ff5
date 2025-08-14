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
import { Home, Leaf } from "lucide-react";

export function BeeHotelActions() {
  const [hotelType, setHotelType] = useState("");
  const [location, setLocation] = useState("");
  const { recordBeeHotel, loading } = useEarningActivities("user-123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hotelType || !location) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await recordBeeHotel({
        hotelType,
        location,
        size: "medium",
        installDate: new Date(),
        occupancyRate: 75,
        maintenanceDone: true,
        educationalContent: true,
      });

      toast.success("Bee hotel action recorded! +25 points earned");
      setHotelType("");
      setLocation("");
    } catch (error) {
      toast.error("Failed to record bee hotel action");
    }
  };

  return (
    <Card className="border-yellow-500/30 bg-yellow-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Home className="h-5 w-5" />
          🐝 Bee Hotel Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Hotel Type</label>
            <Select value={hotelType} onValueChange={setHotelType}>
              <SelectTrigger>
                <SelectValue placeholder="Select hotel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bamboo">Bamboo Tubes</SelectItem>
                <SelectItem value="wood_block">Wood Block</SelectItem>
                <SelectItem value="clay">Clay Tubes</SelectItem>
                <SelectItem value="mixed_materials">Mixed Materials</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Garden, park, balcony..."
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {loading ? "Recording..." : "🏠 Record Bee Hotel Action (+25 Points)"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
          <p className="text-sm text-yellow-300">
            💡 <strong>Tip:</strong> Regular bee hotel maintenance supports local pollinator
            populations and earns you GAiA tokens!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
