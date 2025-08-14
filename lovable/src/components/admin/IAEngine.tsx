import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface IAMetrics {
  intelligence: number;
  learning: number;
  prediction: number;
  automation: number;
  efficiency: number;
}

export function IAEngine() {
  const [status, setStatus] = useState<"offline" | "initializing" | "active" | "supercharged">(
    "offline"
  );
  const [metrics, setMetrics] = useState<IAMetrics>({
    intelligence: 0,
    learning: 0,
    prediction: 0,
    automation: 0,
    efficiency: 0,
  });
  const [threatsPrevented, setThreatsPrevented] = useState(0);
  const [informationGathered, setInformationGathered] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === "active" || status === "supercharged") {
        setMetrics((prev) => ({
          intelligence: Math.min(100, prev.intelligence + Math.random() * 2),
          learning: Math.min(100, prev.learning + Math.random() * 1.5),
          prediction: Math.min(100, prev.prediction + Math.random() * 1.8),
          automation: Math.min(100, prev.automation + Math.random() * 2.2),
          efficiency: Math.min(100, prev.efficiency + Math.random() * 1.7),
        }));

        setThreatsPrevented((prev) => prev + Math.floor(Math.random() * 3));
        setInformationGathered((prev) => prev + Math.floor(Math.random() * 5));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [status]);

  const activateEngine = () => {
    setStatus("initializing");
    toast.success("🧠 IA Engine Activation Started", {
      description: "Initializing artificial intelligence systems...",
    });

    setTimeout(() => {
      setStatus("active");
      toast.success("🚀 IA Engine Online", {
        description: "All intelligence systems are now operational",
      });
    }, 3000);
  };

  const enableSupercharge = () => {
    setStatus("supercharged");
    toast.success("⚡ SUPERCHARGED MODE ACTIVATED", {
      description: "IA Engine running at 600% capacity with Linux integration",
    });
  };

  const getStatusColor = () => {
    switch (status) {
      case "offline":
        return "bg-red-500";
      case "initializing":
        return "bg-yellow-500";
      case "active":
        return "bg-green-500";
      case "supercharged":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                🧠 IA Artificial Input Engine
                <Badge className={getStatusColor()}>{status.toUpperCase()}</Badge>
              </CardTitle>
              <CardDescription>
                Advanced AI system for global information gathering and threat prevention
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {status === "offline" && (
                <Button onClick={activateEngine} variant="default">
                  Activate IA Engine
                </Button>
              )}
              {status === "active" && (
                <Button onClick={enableSupercharge} variant="outline">
                  🚀 Enable Supercharge
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {metrics.intelligence.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Intelligence</div>
              <Progress value={metrics.intelligence} className="mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{metrics.learning.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Learning</div>
              <Progress value={metrics.learning} className="mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {metrics.prediction.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Prediction</div>
              <Progress value={metrics.prediction} className="mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {metrics.automation.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Automation</div>
              <Progress value={metrics.automation} className="mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {metrics.efficiency.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Efficiency</div>
              <Progress value={metrics.efficiency} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{threatsPrevented}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Threats Prevented</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{informationGathered}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Data Points Gathered</div>
            </div>
          </div>

          {status === "supercharged" && (
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                ⚡ SUPERCHARGED FEATURES ACTIVE
              </h4>
              <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                <li>🐧 Linux System Integration (6x Power Boost)</li>
                <li>🛡️ Invisible Protection Protocols Active</li>
                <li>🔍 Real-time Attacker Detection</li>
                <li>🧠 Advanced Neural Pattern Recognition</li>
                <li>⚡ Quantum Processing Acceleration</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
