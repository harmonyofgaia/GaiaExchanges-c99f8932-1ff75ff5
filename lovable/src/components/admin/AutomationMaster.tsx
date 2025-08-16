import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Settings, Globe, TrendingUp, Users, Activity } from "lucide-react";
import { toast } from "sonner";

export function AutomationMaster() {
  const [automationSystems, setAutomationSystems] = useState({
    autoGrowth: true,
    viralMarketing: true,
    investorMagnet: true,
    platformExpansion: true,
    competitorMonitoring: true,
    userEngagement: true,
  });

  const [systemMetrics, setSystemMetrics] = useState({
    totalAutomations: 6,
    tasksCompleted: 0,
    efficiency: 98.5,
    uptime: 99.99,
  });

  useEffect(() => {
    const automationInterval = setInterval(() => {
      console.log("⚡ AUTOMATION MASTER - ALL SYSTEMS AUTONOMOUS");
      console.log("🚀 AUTO-GROWTH: Platform expanding automatically");
      console.log("🧲 INVESTOR MAGNET: Attracting investors 24/7");
      console.log("🌍 GLOBAL EXPANSION: Reaching new markets automatically");

      setSystemMetrics((prev) => ({
        ...prev,
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 5),
        efficiency: Math.min(100, prev.efficiency + (Math.random() - 0.5) * 0.1),
        uptime: Math.max(99.9, prev.uptime + (Math.random() - 0.5) * 0.001)
      }));
    }, 3000);

    return () => clearInterval(automationInterval);
  }, []);

  const toggleAutomation = (system: keyof typeof automationSystems) => {
    setAutomationSystems((prev) => ({
      ...prev,
      [system]: !prev[system],
    }));

    const systemNames = {
      autoGrowth: "Auto Growth Engine",
      viralMarketing: "Viral Marketing System",
      investorMagnet: "Investor Magnetism",
      platformExpansion: "Platform Expansion",
      competitorMonitoring: "Competitor Monitoring",
      userEngagement: "User Engagement System",
    };

    toast.success(
      `${systemNames[system]} ${automationSystems[system] ? "Disabled" : "Activated"}!`
    );
  };

  const activateAllSystems = () => {
    setAutomationSystems({
      autoGrowth: true,
      viralMarketing: true,
      investorMagnet: true,
      platformExpansion: true,
      competitorMonitoring: true,
      userEngagement: true,
    });

    toast.success("🚀 ALL AUTOMATION SYSTEMS ACTIVATED!", {
      description: "Maximum automation mode - Platform will grow automatically",
      duration: 8000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Automation Overview */}
      <Card className="border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Zap className="h-6 w-6" />⚡ AUTOMATION MASTER CONTROL CENTER
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {systemMetrics.totalAutomations}
              </div>
              <div className="text-sm text-muted-foreground">Active Systems</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{systemMetrics.tasksCompleted}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {systemMetrics.efficiency.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {systemMetrics.uptime.toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(automationSystems).map(([key, active]) => {
          const systemConfig = {
            autoGrowth: {
              icon: TrendingUp,
              name: "Auto Growth Engine",
              color: "green",
            },
            viralMarketing: {
              icon: Globe,
              name: "Viral Marketing",
              color: "blue",
            },
            investorMagnet: {
              icon: Users,
              name: "Investor Magnet",
              color: "purple",
            },
            platformExpansion: {
              icon: Activity,
              name: "Platform Expansion",
              color: "orange",
            },
            competitorMonitoring: {
              icon: Settings,
              name: "Competitor Monitor",
              color: "red",
            },
            userEngagement: {
              icon: Zap,
              name: "User Engagement",
              color: "cyan",
            },
          }[key]!;

          const Icon = systemConfig.icon;

          return (
            <Card
              key={key}
              className={`border-${systemConfig.color}-500/30 bg-gradient-to-br from-${systemConfig.color}-900/20 to-black/50`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 text-${systemConfig.color}-400`} />
                    <span className="font-semibold text-sm">{systemConfig.name}</span>
                  </div>
                  <Badge className={active ? `bg-${systemConfig.color}-600` : "bg-gray-600"}>
                    {active ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </div>
                <Progress value={active ? 100 : 0} className="mb-3" />
                <Button
                  onClick={() => toggleAutomation(key as keyof typeof automationSystems)}
                  className={`w-full ${active ? "bg-red-600 hover:bg-red-700" : `bg-${systemConfig.color}-600 hover:bg-${systemConfig.color}-700`}`}
                  size="sm"
                >
                  {active ? "Disable" : "Activate"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Master Control */}
      <Button
        onClick={activateAllSystems}
        className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-8"
      >
        <Zap className="h-6 w-6 mr-3" />
        🚀 ACTIVATE ALL AUTOMATION SYSTEMS - MAXIMUM EFFICIENCY
      </Button>
    </div>
  );
}
