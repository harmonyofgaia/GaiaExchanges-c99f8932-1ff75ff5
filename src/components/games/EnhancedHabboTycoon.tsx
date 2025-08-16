import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Coins, TrendingUp, Star, Crown, Rocket, Zap } from "lucide-react";
import { toast } from "sonner";

export function EnhancedHabboTycoon() {
  const [tycoonState, setTycoonState] = useState({
    isActive: false,
    hotelEmpire: 1,
    totalRooms: 47,
    dailyVisitors: 15240,
    totalRevenue: 2847590,
    reputation: 98,
    rollercoasters: 8,
    attractions: 23,
    staff: 156,
    expansions: 5,
    planets: 2,
  });

  const [buildingMode, setBuildingMode] = useState("hotel");
  const [dailyGrowth, setDailyGrowth] = useState(0);

  const buildingTypes = [
    {
      id: "hotel",
      name: "Luxury Hotel",
      cost: 50000,
      income: 5000,
      icon: Building2,
    },
    {
      id: "rollercoaster",
      name: "Epic Rollercoaster",
      cost: 150000,
      income: 12000,
      icon: Rocket,
    },
    {
      id: "restaurant",
      name: "Gourmet Restaurant",
      cost: 75000,
      income: 8000,
      icon: Star,
    },
    { id: "spa", name: "Quantum Spa", cost: 200000, income: 18000, icon: Zap },
    {
      id: "casino",
      name: "Galaxy Casino",
      cost: 500000,
      income: 45000,
      icon: Crown,
    },
  ];

  useEffect(() => {
    if (tycoonState.isActive) {
      const businessEngine = setInterval(() => {
        const growth = Math.floor(Math.random() * 1000) + 500;
        setDailyGrowth(growth);

        setTycoonState((prev) => ({
          ...prev,
          dailyVisitors: prev.dailyVisitors + Math.floor(Math.random() * 200),
          totalRevenue: prev.totalRevenue + growth,
          reputation: Math.min(100, prev.reputation + 0.1),
          staff: prev.staff + Math.floor(Math.random() * 5)
        }));

        // Strategic events like RollerCoaster Tycoon
        if (Math.random() < 0.08) {
          const strategicEvents = [
            "🎢 New Rollercoaster Design Unlocked - Visitors +500%!",
            "🏨 Hotel Chain Expansion - New Planet Available!",
            "👥 VIP Celebrity Visit - Reputation Skyrockets!",
            "🎪 Theme Park Merger - Double Your Empire!",
            "🚀 Space Hotel Branch - Interplanetary Tourism!",
            "💰 Investment Opportunity - Triple Revenue!",
            "🌟 Award Ceremony - World's Best Tycoon!",
          ];
          const event = strategicEvents[Math.floor(Math.random() * strategicEvents.length)];
          toast.success("🏆 STRATEGIC EVENT!", {
            description: event,
            duration: 5000,
          });
        }
      }, 2500);

      return () => clearInterval(businessEngine);
    }
  }, [tycoonState.isActive]);

  const startTycoonEmpire = () => {
    setTycoonState((prev) => ({ ...prev, isActive: true }));
    toast.success("🏨 HABBO TYCOON EMPIRE ACTIVATED!", {
      description: "Strategic Business Simulation - Build Your Hotel & Theme Park Empire!",
      duration: 5000,
    });
  };

  const buildAttraction = (type: string) => {
    const building = buildingTypes.find((b) => b.id === type);
    if (building && tycoonState.totalRevenue >= building.cost) {
      setTycoonState((prev) => ({
        ...prev,
        totalRevenue: prev.totalRevenue - building.cost,
        totalRooms: prev.totalRooms + (type === "hotel" ? 10 : 5),
        rollercoasters: prev.rollercoasters + (type === "rollercoaster" ? 1 : 0),
        attractions: prev.attractions + 1,
      }));

      toast.success(`🏗️ ${building.name} Built!`, {
        description: `Generating $${building.income.toLocaleString()} daily income!`,
        duration: 4000,
      });
    } else {
      toast.error("💰 Insufficient Funds!", {
        description: `Need $${building?.cost.toLocaleString()} to build ${building?.name}`,
        duration: 3000,
      });
    }
  };

  return (
    <Card className="border-4 border-pink-500/50 bg-gradient-to-br from-pink-900/40 via-purple-900/40 to-blue-900/40">
      <CardHeader>
        <CardTitle className="text-center text-4xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          🏨 HABBO TYCOON - STRATEGIC EMPIRE BUILDER
        </CardTitle>
        <div className="text-center text-xl text-pink-300 font-bold">
          RollerCoaster Tycoon × Habbo Hotel × Little Big Planet = Ultimate Strategy
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Empire Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-pink-900/50 rounded-lg border-2 border-pink-500/50">
            <Building2 className="h-8 w-8 text-pink-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-black text-pink-400">{tycoonState.hotelEmpire}</div>
            <div className="text-sm text-pink-300">Hotel Empires</div>
          </div>

          <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-bounce" />
            <div className="text-2xl font-black text-blue-400">
              {tycoonState.dailyVisitors.toLocaleString()}
            </div>
            <div className="text-sm text-blue-300">Daily Visitors</div>
          </div>

          <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
            <Coins className="h-8 w-8 text-green-400 mx-auto mb-2 animate-spin" />
            <div className="text-2xl font-black text-green-400">
              ${tycoonState.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-green-300">Total Revenue</div>
          </div>

          <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
            <Rocket className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-black text-purple-400">{tycoonState.rollercoasters}</div>
            <div className="text-sm text-purple-300">Rollercoasters</div>
          </div>

          <div className="text-center p-4 bg-orange-900/50 rounded-lg border-2 border-orange-500/50">
            <Crown className="h-8 w-8 text-orange-400 mx-auto mb-2 animate-bounce" />
            <div className="text-2xl font-black text-orange-400">{tycoonState.reputation}%</div>
            <div className="text-sm text-orange-300">Reputation</div>
          </div>
        </div>

        {/* Strategic Building Interface */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center text-white">🏗️ STRATEGIC CONSTRUCTION</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {buildingTypes.map((building) => {
              const Icon = building.icon;
              return (
                <Button
                  key={building.id}
                  onClick={() => buildAttraction(building.id)}
                  disabled={tycoonState.totalRevenue < building.cost}
                  className="p-4 h-auto flex flex-col items-center gap-2 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-bold text-center">{building.name}</span>
                  <span className="text-xs">${building.cost.toLocaleString()}</span>
                  <Badge className="bg-green-600">+${building.income.toLocaleString()}/day</Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Tycoon Game Canvas */}
        <div className="aspect-video bg-gradient-to-br from-black via-pink-900/30 to-purple-900/30 rounded-lg border-4 border-pink-500/50 relative overflow-hidden">
          {tycoonState.isActive ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-8xl animate-pulse">🏨</div>
                <div className="text-4xl font-black text-pink-400 animate-bounce">
                  TYCOON EMPIRE OPERATIONAL
                </div>
                <div className="text-xl text-pink-300">
                  Daily Growth: +${dailyGrowth.toLocaleString()}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{tycoonState.totalRooms}</div>
                    <div>Total Rooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {tycoonState.attractions}
                    </div>
                    <div>Attractions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{tycoonState.staff}</div>
                    <div>Staff Members</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={startTycoonEmpire}
                className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-black text-2xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                <Building2 className="h-8 w-8 mr-4 animate-bounce" />
                BUILD TYCOON EMPIRE
              </Button>
            </div>
          )}
        </div>

        {/* Strategic Features */}
        <div className="bg-black/50 rounded-lg p-6 border-2 border-pink-500/30">
          <h3 className="text-2xl font-bold text-pink-400 mb-4 text-center">
            🎯 STRATEGIC GAMEPLAY FEATURES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded border border-pink-500/30">
              <div className="text-sm text-pink-300">Multi-Planet</div>
              <div className="text-xs text-pink-400 font-bold">Expansion Ready</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded border border-blue-500/30">
              <div className="text-sm text-blue-300">Online Multiplayer</div>
              <div className="text-xs text-blue-400 font-bold">10,000+ Players</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded border border-green-500/30">
              <div className="text-sm text-green-300">Daily Events</div>
              <div className="text-xs text-green-400 font-bold">Growing Features</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded border border-purple-500/30">
              <div className="text-sm text-purple-300">AI Crafting</div>
              <div className="text-xs text-purple-400 font-bold">New Tools Daily</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-black text-pink-400 mb-2">
            🎮 STRATEGIC MULTIPLAYER EMPIRE BUILDING 🎮
          </div>
          <div className="text-lg text-pink-300">
            Build, Manage, Conquer - The Ultimate Tycoon Experience
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
