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
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import {
  Bus,
  Train,
  Zap,
  MapPin,
  Clock,
  Route,
  Ticket,
  CreditCard,
  Award,
} from "lucide-react";

export function PublicTransportRewards() {
  const [transportType, setTransportType] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [route, setRoute] = useState("");
  const [ticketType, setTicketType] = useState("");
  const { addActivity, loading } = useEarningActivities("user-123");

  const [weeklyStats] = useState({
    totalTrips: 23,
    totalDistance: 287.5,
    co2Saved: 45.8,
    moneySaved: 127.5,
    tokensEarned: 345,
  });

  const [recentTrips] = useState([
    {
      id: "1",
      type: "metro",
      route: "Green Line",
      distance: 12.5,
      tokens: 25,
      date: "2024-02-08",
    },
    {
      id: "2",
      type: "bus",
      route: "Route 42",
      distance: 8.3,
      tokens: 16,
      date: "2024-02-07",
    },
    {
      id: "3",
      type: "train",
      route: "Regional Express",
      distance: 45.2,
      tokens: 90,
      date: "2024-02-06",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!transportType || !distance || !duration || !route) {
      toast.error("Please fill in all fields");
      return;
    }

    const transportMultipliers = {
      bus: 1.5,
      metro: 1.8,
      train: 2.0,
      tram: 1.6,
      ferry: 2.2,
      bicycle_share: 2.5,
      scooter_share: 2.0,
    };

    const ticketMultipliers = {
      monthly_pass: 1.3,
      weekly_pass: 1.2,
      day_pass: 1.1,
      single_ticket: 1.0,
      student_discount: 1.4,
      senior_discount: 1.4,
    };

    const basePoints = parseFloat(distance) * 2;
    const transportBonus =
      basePoints *
      (transportMultipliers[
        transportType as keyof typeof transportMultipliers
      ] || 1);
    const ticketBonus = ticketType
      ? transportBonus *
        (ticketMultipliers[ticketType as keyof typeof ticketMultipliers] || 1)
      : transportBonus;

    const totalPoints = Math.floor(ticketBonus);
    const tokens = Math.floor(totalPoints * 0.4);

    const activity = {
      id: Date.now().toString(),
      type: "public_transport",
      title: "Public Transport Usage",
      amount: totalPoints,
      timestamp: new Date(),
      description: `${transportType} journey on ${route}: ${distance}km in ${duration}min`,
      status: "completed" as const,
      pointsEarned: totalPoints,
      tokensEarned: tokens,
      verified: true,
      metadata: {
        transportType,
        distance: parseFloat(distance),
        duration: parseFloat(duration),
        route,
        ticketType,
      },
    };

    addActivity(activity);
    toast.success(
      `🚌 Public transport trip recorded! +${totalPoints} points earned for choosing sustainable transport!`,
    );
    setTransportType("");
    setDistance("");
    setDuration("");
    setRoute("");
    setTicketType("");
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "metro":
        return "🚇";
      case "bus":
        return "🚌";
      case "train":
        return "🚂";
      case "tram":
        return "🚋";
      case "ferry":
        return "⛴️";
      default:
        return "🚌";
    }
  };

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Bus className="h-6 w-6" />
          🚌 Public Transport Rewards System
          <Badge className="bg-blue-600">Green Commuter</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Transport Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-400">
            📊 Your Green Commuting Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">
                {weeklyStats.totalTrips}
              </div>
              <div className="text-xs text-muted-foreground">
                Trips This Week
              </div>
            </div>
            <div className="text-center p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/20">
              <div className="text-xl font-bold text-cyan-400">
                {weeklyStats.totalDistance}km
              </div>
              <div className="text-xs text-muted-foreground">
                Distance Traveled
              </div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <div className="text-xl font-bold text-green-400">
                {weeklyStats.co2Saved}kg
              </div>
              <div className="text-xs text-muted-foreground">CO2 Saved</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
              <div className="text-xl font-bold text-yellow-400">
                ${weeklyStats.moneySaved}
              </div>
              <div className="text-xs text-muted-foreground">Money Saved</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">
                {weeklyStats.tokensEarned}
              </div>
              <div className="text-xs text-muted-foreground">GAiA Earned</div>
            </div>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="space-y-3">
          <h4 className="font-semibold text-blue-400 flex items-center gap-2">
            <Route className="h-4 w-4" />
            🎫 Recent Green Journeys
          </h4>
          {recentTrips.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-500/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTransportIcon(trip.type)}</span>
                <div>
                  <div className="font-medium text-blue-300">{trip.route}</div>
                  <div className="text-sm text-muted-foreground">
                    {trip.type} • {trip.distance}km • {trip.date}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-yellow-400">
                  +{trip.tokens} GAiA
                </div>
                <Badge className="bg-green-600">Verified</Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Record New Trip */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg border border-blue-500/20"
        >
          <h4 className="font-semibold text-blue-400 flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            Record Public Transport Journey
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Transport Type
              </label>
              <Select value={transportType} onValueChange={setTransportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transport type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bus">🚌 Bus (1.5x multiplier)</SelectItem>
                  <SelectItem value="metro">
                    🚇 Metro/Subway (1.8x multiplier)
                  </SelectItem>
                  <SelectItem value="train">
                    🚂 Train (2x multiplier)
                  </SelectItem>
                  <SelectItem value="tram">
                    🚋 Tram (1.6x multiplier)
                  </SelectItem>
                  <SelectItem value="ferry">
                    ⛴️ Ferry (2.2x multiplier)
                  </SelectItem>
                  <SelectItem value="bicycle_share">
                    🚲 Bike Share (2.5x multiplier)
                  </SelectItem>
                  <SelectItem value="scooter_share">
                    🛴 E-Scooter Share (2x multiplier)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Route/Line
              </label>
              <Input
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="Route name, line number..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Distance (km)
              </label>
              <Input
                type="number"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Journey distance"
                min="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Duration (minutes)
              </label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Journey time"
                min="1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Ticket Type (Optional)
              </label>
              <Select value={ticketType} onValueChange={setTicketType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ticket type for bonus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly_pass">
                    📅 Monthly Pass (1.3x bonus)
                  </SelectItem>
                  <SelectItem value="weekly_pass">
                    📅 Weekly Pass (1.2x bonus)
                  </SelectItem>
                  <SelectItem value="day_pass">
                    📅 Day Pass (1.1x bonus)
                  </SelectItem>
                  <SelectItem value="student_discount">
                    🎓 Student Discount (1.4x bonus)
                  </SelectItem>
                  <SelectItem value="senior_discount">
                    👴 Senior Discount (1.4x bonus)
                  </SelectItem>
                  <SelectItem value="single_ticket">
                    🎫 Single Ticket (1x)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading
              ? "Recording Trip..."
              : "🚌 Record Public Transport Journey (+2 pts per km)"}
          </Button>
        </form>

        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
          <p className="text-sm text-blue-300">
            💡 <strong>Commuter Champion:</strong> Regular public transport use
            earns consistent rewards! Monthly passes and student discounts
            provide bonus multipliers for sustainable commuting!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
