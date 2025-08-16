import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Smartphone,
  Monitor,
  Globe,
  Wifi,
  Cpu,
  Shield,
  CheckCircle,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface PlatformStatus {
  name: string;
  version: string;
  status: "active" | "testing" | "legacy" | "deprecated";
  compatibility: number;
  icon: React.ReactNode;
}

export function CrossPlatformCompatibility() {
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([
    {
      name: "iOS",
      version: "17.0+",
      status: "active",
      compatibility: 100,
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      name: "Android",
      version: "14.0+",
      status: "active",
      compatibility: 100,
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      name: "Windows",
      version: "11/10",
      status: "active",
      compatibility: 100,
      icon: <Monitor className="h-4 w-4" />,
    },
    {
      name: "macOS",
      version: "14.0+",
      status: "active",
      compatibility: 100,
      icon: <Monitor className="h-4 w-4" />,
    },
    {
      name: "Linux",
      version: "Ubuntu 22.04+",
      status: "active",
      compatibility: 98,
      icon: <Monitor className="h-4 w-4" />,
    },
    {
      name: "BlackBerry",
      version: "OS 10.3+",
      status: "legacy",
      compatibility: 85,
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      name: "Web Browsers",
      version: "Modern",
      status: "active",
      compatibility: 100,
      icon: <Globe className="h-4 w-4" />,
    },
  ]);

  const [overallCompatibility, setOverallCompatibility] = useState(0);

  useEffect(() => {
    const totalCompatibility = platforms.reduce((sum, platform) => sum + platform.compatibility, 0);
    const avgCompatibility = totalCompatibility / platforms.length;
    setOverallCompatibility(avgCompatibility);

    const optimizeCompatibility = setInterval(() => {
      setPlatforms((prev) =>
        prev.map((platform) => {
          if (platform.compatibility < 100 && platform.status !== "deprecated") {
            const improvement = Math.min(1, 100 - platform.compatibility);
            return {
              ...platform,
              compatibility: Math.min(100, platform.compatibility + improvement)
            };
          }
          return platform;
        })
      );
    }, 10000);

    return () => clearInterval(optimizeCompatibility);
  }, [platforms]);

  const optimizeForBlackBerry = () => {
    toast.success("🔧 BlackBerry Optimization Started", {
      description: "Implementing legacy system compatibility protocols",
      duration: 3000,
    });

    setPlatforms((prev) =>
      prev.map((platform) => {
        if (platform.name === "BlackBerry") {
          return {
            ...platform,
            compatibility: Math.min(100, platform.compatibility + 15),
            status: platform.compatibility >= 95 ? "active" : "legacy",
          };
        }
        return platform;
      })
    );

    console.log("📱 BlackBerry compatibility optimization completed");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "testing":
        return "bg-yellow-600";
      case "legacy":
        return "bg-orange-600";
      case "deprecated":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 95) return "text-green-400";
    if (compatibility >= 80) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Globe className="h-5 w-5" />
            Universal Platform Compatibility Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {overallCompatibility.toFixed(1)}%
              </div>
              <p className="text-muted-foreground">Overall Compatibility Score</p>
              <Progress value={overallCompatibility} className="mt-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Platform Compatibility Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <div className="text-blue-400">{platform.icon}</div>
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-muted-foreground">{platform.version}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${getCompatibilityColor(platform.compatibility)}`}
                    >
                      {platform.compatibility.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Compatible</div>
                  </div>

                  <Badge className={`${getStatusColor(platform.status)} text-white`}>
                    {platform.status}
                  </Badge>

                  {platform.compatibility >= 95 && (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  {platform.compatibility < 80 && (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 flex-wrap">
        <Button onClick={optimizeForBlackBerry} className="bg-orange-600 hover:bg-orange-700">
          <Smartphone className="h-4 w-4 mr-2" />
          Optimize BlackBerry Support
        </Button>

        <Button variant="outline" className="border-green-500/20">
          <Zap className="h-4 w-4 mr-2" />
          Deploy Universal Build
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Smartphone className="h-5 w-5" />
            BlackBerry Legacy System Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-orange-300">
              Special optimization protocols for BlackBerry OS 10.3+ devices with enhanced security
              and performance adaptations for legacy hardware constraints.
            </p>
            <div className="bg-orange-500/10 p-3 rounded-lg mt-3">
              <div className="text-sm font-medium text-orange-400">Legacy Compatibility Status</div>
              <Progress
                value={platforms.find((p) => p.name === "BlackBerry")?.compatibility || 0}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
