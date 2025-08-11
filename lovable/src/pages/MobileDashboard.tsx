import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Smartphone,
  Activity,
  Coins,
  TrendingUp,
  Target,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function MobileDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reward",
      message: "You earned 50 GAIA tokens!",
      time: "2m ago",
    },
    {
      id: 2,
      type: "achievement",
      message: "New badge unlocked: Eco Warrior",
      time: "1h ago",
    },
    {
      id: 3,
      type: "reminder",
      message: "Daily check-in available",
      time: "3h ago",
    },
  ]);

  const quickActions = [
    {
      id: "check-in",
      label: "✅ Daily Check-in",
      color: "bg-green-600",
      action: () => handleDailyCheckIn(),
    },
    {
      id: "scan-receipt",
      label: "🧾 Scan Receipt",
      color: "bg-blue-600",
      action: () => handleScanReceipt(),
    },
    {
      id: "plant-tree",
      label: "🌱 Plant Tree",
      color: "bg-emerald-600",
      action: () => handlePlantTree(),
    },
    {
      id: "share-impact",
      label: "📤 Share Impact",
      color: "bg-purple-600",
      action: () => handleShareImpact(),
    },
  ];

  const stats = {
    totalTokens: 2847,
    todayTokens: 125,
    streak: 14,
    level: 8,
    nextLevelProgress: 68,
    weeklyGoal: 75,
  };

  const handleDailyCheckIn = () => {
    toast.success("✅ Daily check-in completed!", {
      description: "You earned 25 GAIA tokens",
      duration: 3000,
    });
  };

  const handleScanReceipt = () => {
    toast.info("📷 Camera feature coming soon!", {
      description: "Scan receipts to earn eco-points",
      duration: 3000,
    });
  };

  const handlePlantTree = () => {
    toast.success("🌱 Tree planted successfully!", {
      description: "You contributed to reforestation efforts",
      duration: 3000,
    });
  };

  const handleShareImpact = () => {
    toast.success("📤 Impact shared!", {
      description: "Posted to your social networks",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <h1 className="font-bold text-lg">🌍 Gaia Mobile</h1>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r p-4 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold">Navigation</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="space-y-2">
              {[
                "Dashboard",
                "Activities",
                "Rewards",
                "Profile",
                "Settings",
              ].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">👋</div>
              <h2 className="text-xl font-bold mb-1">
                Welcome back, EcoWarrior!
              </h2>
              <p className="text-sm text-muted-foreground">
                You're on a {stats.streak} day streak!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Token Balance */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="pt-4 text-center">
              <Coins className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {stats.totalTokens}
              </div>
              <div className="text-xs text-muted-foreground">Total GAIA</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="pt-4 text-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                +{stats.todayTokens}
              </div>
              <div className="text-xs text-muted-foreground">
                Today's Earnings
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Level {stats.level} Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Next Level</span>
                <span>{stats.nextLevelProgress}%</span>
              </div>
              <Progress value={stats.nextLevelProgress} className="h-2" />
              <div className="text-center text-xs text-muted-foreground">
                850 / 1250 XP to Level {stats.level + 1}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>⚡ Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  onClick={action.action}
                  className={`${action.color} h-20 flex flex-col gap-2 text-white font-medium`}
                >
                  <span className="text-lg">{action.label.split(" ")[0]}</span>
                  <span className="text-xs">
                    {action.label.substring(action.label.indexOf(" ") + 1)}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Environmental Actions</span>
                <span>{stats.weeklyGoal}%</span>
              </div>
              <Progress value={stats.weeklyGoal} className="h-3" />
              <div className="text-center text-xs text-muted-foreground">
                15 / 20 actions completed this week
              </div>
              {stats.weeklyGoal >= 75 && (
                <div className="text-center">
                  <Badge className="bg-green-600">🎯 Almost there!</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-2 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation Space */}
        <div className="h-20" />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
        <div className="grid grid-cols-5 gap-1 p-2">
          {[
            { icon: Activity, label: "Home", active: true },
            { icon: Coins, label: "Earn", active: false },
            { icon: TrendingUp, label: "Impact", active: false },
            { icon: Target, label: "Goals", active: false },
            { icon: Settings, label: "More", active: false },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`h-16 flex flex-col gap-1 text-xs ${
                item.active
                  ? "text-green-400 bg-green-900/20"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
