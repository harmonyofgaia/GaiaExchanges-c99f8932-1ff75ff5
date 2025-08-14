import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Smartphone,
  Apple,
  Monitor,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface AppStore {
  name: string;
  platform: "iOS" | "Android" | "Windows" | "Web";
  status: "live" | "pending" | "review" | "rejected";
  downloads: number;
  rating: number;
  lastUpdate: string;
  version: string;
}

interface DeploymentMetrics {
  totalDownloads: number;
  activeUsers: number;
  crashRate: number;
  performance: number;
}

export function MobileAppDeployment() {
  const [appStores, setAppStores] = useState<AppStore[]>([
    {
      name: "Apple App Store",
      platform: "iOS",
      status: "live",
      downloads: 125847,
      rating: 4.8,
      lastUpdate: "2 days ago",
      version: "2.1.0",
    },
    {
      name: "Google Play Store",
      platform: "Android",
      status: "live",
      downloads: 247659,
      rating: 4.7,
      lastUpdate: "1 day ago",
      version: "2.1.0",
    },
    {
      name: "Microsoft Store",
      platform: "Windows",
      status: "pending",
      downloads: 15678,
      rating: 4.6,
      lastUpdate: "5 days ago",
      version: "2.0.5",
    },
    {
      name: "PWA (Web App)",
      platform: "Web",
      status: "live",
      downloads: 89234,
      rating: 4.9,
      lastUpdate: "6 hours ago",
      version: "2.1.1",
    },
  ]);

  const [deploymentMetrics, setDeploymentMetrics] = useState<DeploymentMetrics>({
    totalDownloads: 478418,
    activeUsers: 89234,
    crashRate: 0.02,
    performance: 98.5,
  });

  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setDeploymentMetrics((prev) => ({
        ...prev,
        totalDownloads: prev.totalDownloads + Math.floor(Math.random() * 50),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        performance: Math.max(95, prev.performance + (Math.random() - 0.5) * 2),
      }));

      setAppStores((prev) =>
        prev.map((store) => ({
          ...store,
          downloads: store.downloads + Math.floor(Math.random() * 20),
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case "review":
        return <Clock className="h-4 w-4 text-blue-400" />;
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-600";
      case "pending":
        return "bg-yellow-600";
      case "review":
        return "bg-blue-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "iOS":
        return <Apple className="h-5 w-5" />;
      case "Android":
        return <Smartphone className="h-5 w-5" />;
      case "Windows":
        return <Monitor className="h-5 w-5" />;
      case "Web":
        return <Zap className="h-5 w-5" />;
      default:
        return <Smartphone className="h-5 w-5" />;
    }
  };

  const deployToAllStores = () => {
    setIsDeploying(true);
    toast.success("🚀 Deploying to all app stores...");

    setAppStores((prev) =>
      prev.map((store) => ({
        ...store,
        status: store.status === "rejected" ? "pending" : store.status,
      }))
    );

    setTimeout(() => {
      setAppStores((prev) =>
        prev.map((store) => ({
          ...store,
          status: "live" as const,
          version: "2.1.2",
          lastUpdate: "Just now",
        }))
      );
      setIsDeploying(false);
      toast.success("✅ Successfully deployed to all app stores!");
    }, 8000);
  };

  const updateApp = (storeName: string) => {
    toast.success(`🔄 Updating ${storeName}...`);
    setAppStores((prev) =>
      prev.map((store) =>
        store.name === storeName ? { ...store, status: "pending" as const } : store
      )
    );

    setTimeout(() => {
      setAppStores((prev) =>
        prev.map((store) =>
          store.name === storeName
            ? {
                ...store,
                status: "live" as const,
                version: "2.1.2",
                lastUpdate: "Just now",
              }
            : store
        )
      );
      toast.success(`✅ ${storeName} updated successfully!`);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Deployment Overview */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Smartphone className="h-6 w-6" />
            📱 Mobile App Deployment System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {deploymentMetrics.totalDownloads.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {deploymentMetrics.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {deploymentMetrics.crashRate}%
              </div>
              <div className="text-sm text-muted-foreground">Crash Rate</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">
                {deploymentMetrics.performance}%
              </div>
              <div className="text-sm text-muted-foreground">Performance</div>
            </div>
          </div>

          <Button
            onClick={deployToAllStores}
            disabled={isDeploying}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isDeploying ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Deploy to All Stores
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* App Store Status */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400">🏪 App Store Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appStores.map((store, index) => (
              <Card key={index} className="border-gray-600/50 bg-gray-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(store.platform)}
                      <span className="font-bold text-white">{store.name}</span>
                    </div>
                    {getStatusIcon(store.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className={`${getStatusColor(store.status)} text-white text-xs`}>
                        {store.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Downloads</span>
                      <span className="text-green-400">{store.downloads.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="text-yellow-400">{store.rating} ⭐</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Version</span>
                      <span className="text-blue-400">{store.version}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Update</span>
                      <span className="text-gray-400">{store.lastUpdate}</span>
                    </div>

                    <Button
                      onClick={() => updateApp(store.name)}
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Update App
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Platform Optimization */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">🌐 Cross-Platform Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>iOS Performance</span>
                <span className="text-green-400">98.5%</span>
              </div>
              <Progress value={98.5} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Android Performance</span>
                <span className="text-blue-400">97.2%</span>
              </div>
              <Progress value={97.2} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Windows Performance</span>
                <span className="text-purple-400">95.8%</span>
              </div>
              <Progress value={95.8} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Web App Performance</span>
                <span className="text-orange-400">99.1%</span>
              </div>
              <Progress value={99.1} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
