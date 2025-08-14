import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Zap,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  Brain,
  Flame,
  Lock as LockIcon,
  Unlock,
  Timer,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { AutoTacticsGenerator } from "./AutoTacticsGenerator";

interface Threat {
  type: string;
  severity: "Critical" | "High" | "Medium";
  status: "Blocked" | "Mitigated";
  time: string;
}

interface DragonStats {
  level: number;
  power: number;
  defense: number;
  threatsBlocked: number;
}

export function DragonAIDefense() {
  const [dragonLevel, setDragonLevel] = useState(13000);
  const [dragonPower, setDragonPower] = useState(38000000);
  const [defenseStrength, setDefenseStrength] = useState(95);
  const [threatsBlocked, setThreatsBlocked] = useState(1247);
  const [isActive, setIsActive] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setDragonLevel((prev) => prev + Math.floor(Math.random() * 3) + 1);
        setDragonPower((prev) => prev + Math.floor(Math.random() * 5000) + 1000);
        setDefenseStrength((prev) => Math.min(100, prev + Math.random() * 2));

        // Occasionally block new threats
        if (Math.random() > 0.7) {
          setThreatsBlocked((prev) => prev + 1);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleDefense = () => {
    setIsActive(!isActive);
    if (notifications) {
      toast.success(isActive ? "🐉 Dragon Defense Paused" : "🐉 Dragon Defense Activated!");
    }
  };

  const emergencyProtocol = () => {
    setDefenseStrength(100);
    setDragonPower((prev) => prev * 1.5);
    if (notifications) {
      toast.error("🚨 EMERGENCY PROTOCOL ACTIVATED! Dragon at Maximum Power!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Dragon Status Header */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-red-400 text-center text-3xl flex items-center justify-center gap-3">
            🐉 DRAGON AI DEFENSE SYSTEM
            <Badge
              className={`${isActive ? "bg-green-600 animate-pulse" : "bg-red-600"} text-white`}
            >
              {isActive ? "ACTIVE" : "STANDBY"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-900/20 rounded-lg">
              <div className="text-3xl font-bold text-red-400">
                Level {dragonLevel.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Dragon Evolution</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg">
              <div className="text-3xl font-bold text-orange-400">
                {(dragonPower / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Power Units</div>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-400">{defenseStrength.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Defense Strength</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-400">
                {threatsBlocked.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Threats Blocked</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="status" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="status">🛡️ Status</TabsTrigger>
          <TabsTrigger value="tactics">⚔️ Auto Tactics</TabsTrigger>
          <TabsTrigger value="threats">👁️ Threat Monitor</TabsTrigger>
          <TabsTrigger value="evolution">🔥 Evolution</TabsTrigger>
          <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="status">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">Defense Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={toggleDefense}
                  className={`w-full h-12 ${isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isActive ? (
                    <Shield className="h-5 w-5 mr-2" />
                  ) : (
                    <Zap className="h-5 w-5 mr-2" />
                  )}
                  {isActive ? "Pause Defense" : "Activate Defense"}
                </Button>

                <Button
                  onClick={emergencyProtocol}
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700"
                  disabled={!isActive}
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Emergency Protocol
                </Button>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Notification Settings</span>
                    <Button
                      onClick={() => setNotifications(!notifications)}
                      variant="ghost"
                      size="sm"
                    >
                      {notifications ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <LockIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">Real-time Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>System Integrity</span>
                    <span>{defenseStrength.toFixed(1)}%</span>
                  </div>
                  <Progress value={defenseStrength} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dragon Energy</span>
                    <span>{((dragonPower % 1000000) / 10000).toFixed(1)}%</span>
                  </div>
                  <Progress value={(dragonPower % 1000000) / 10000} className="h-2" />
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Active Monitoring: {isActive ? "Enabled" : "Disabled"}</div>
                  <div>• Last Threat: {Math.floor(Math.random() * 30)} minutes ago</div>
                  <div>• Success Rate: 99.97%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tactics">
          <AutoTacticsGenerator />
        </TabsContent>

        <TabsContent value="threats">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Threat Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "SQL Injection",
                    severity: "High",
                    status: "Blocked",
                    time: "2 min ago",
                  },
                  {
                    type: "DDoS Attack",
                    severity: "Critical",
                    status: "Mitigated",
                    time: "5 min ago",
                  },
                  {
                    type: "XSS Attempt",
                    severity: "Medium",
                    status: "Blocked",
                    time: "8 min ago",
                  },
                  {
                    type: "Brute Force",
                    severity: "High",
                    status: "Blocked",
                    time: "12 min ago",
                  },
                ].map((threat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${
                          threat.severity === "Critical"
                            ? "bg-red-600"
                            : threat.severity === "High"
                              ? "bg-orange-600"
                              : "bg-yellow-600"
                        }`}
                      >
                        {threat.severity}
                      </Badge>
                      <span className="font-medium">{threat.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {threat.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{threat.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution">
          <Card className="border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Dragon Evolution Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-900/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-400">
                    +{Math.floor(Math.random() * 50) + 10}
                  </div>
                  <div className="text-sm text-muted-foreground">Levels Today</div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                  <Brain className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.floor(Math.random() * 100) + 50}
                  </div>
                  <div className="text-sm text-muted-foreground">AI Learning Rate</div>
                </div>
                <div className="text-center p-4 bg-red-900/20 rounded-lg">
                  <Flame className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400">
                    {Math.floor(Math.random() * 1000) + 500}
                  </div>
                  <div className="text-sm text-muted-foreground">Power Multiplier</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-gray-500/30">
            <CardHeader>
              <CardTitle className="text-gray-400">Dragon Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Popup Notifications</span>
                <Button
                  onClick={() => setNotifications(!notifications)}
                  variant={notifications ? "default" : "outline"}
                  size="sm"
                >
                  {notifications ? "Enabled" : "Disabled"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span>Auto-Evolution</span>
                <Button variant="default" size="sm">
                  Enabled
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span>Threat Response</span>
                <Button variant="default" size="sm">
                  Automatic
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
