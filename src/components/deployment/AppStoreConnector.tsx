import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Store,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Shield,
  Globe,
  Smartphone,
} from "lucide-react";

interface AppStore {
  id: string;
  name: string;
  platform: string;
  status: "connected" | "pending" | "disconnected" | "reviewing";
  appId?: string;
  storeUrl?: string;
  lastUpdate: Date;
  version: string;
  rating: number;
  downloads: string;
  icon: string;
}

export function AppStoreConnector() {
  const [stores, setStores] = useState<AppStore[]>([
    {
      id: "google-play",
      name: "Google Play Store",
      platform: "Android",
      status: "connected",
      appId: "net.cultureofharmony.gaiaexchanges",
      storeUrl: "https://play.google.com/store/apps/details?id=net.cultureofharmony.gaiaexchanges",
      lastUpdate: new Date("2024-06-25"),
      version: "2.1.0",
      rating: 4.8,
      downloads: "500K+",
      icon: "🤖",
    },
    {
      id: "apple-app-store",
      name: "Apple App Store",
      platform: "iOS",
      status: "reviewing",
      appId: "1234567890",
      storeUrl: "https://apps.apple.com/app/gaia-exchanges/id1234567890",
      lastUpdate: new Date("2024-06-24"),
      version: "2.1.0",
      rating: 4.9,
      downloads: "250K+",
      icon: "🍎",
    },
    {
      id: "microsoft-store",
      name: "Microsoft Store",
      platform: "Windows",
      status: "pending",
      lastUpdate: new Date("2024-06-20"),
      version: "2.1.0",
      rating: 4.7,
      downloads: "100K+",
      icon: "🪟",
    },
    {
      id: "mac-app-store",
      name: "Mac App Store",
      platform: "macOS",
      status: "connected",
      appId: "9876543210",
      storeUrl: "https://apps.apple.com/app/gaia-exchanges-mac/id9876543210",
      lastUpdate: new Date("2024-06-23"),
      version: "2.1.0",
      rating: 4.8,
      downloads: "75K+",
      icon: "💻",
    },
    {
      id: "snap-store",
      name: "Snap Store",
      platform: "Linux",
      status: "connected",
      appId: "gaia-exchanges",
      storeUrl: "https://snapcraft.io/gaia-exchanges",
      lastUpdate: new Date("2024-06-22"),
      version: "2.1.0",
      rating: 4.6,
      downloads: "25K+",
      icon: "🐧",
    },
    {
      id: "chrome-web-store",
      name: "Chrome Web Store",
      platform: "Web Extension",
      status: "connected",
      appId: "abcdefghijklmnopqrstuvwxyz",
      storeUrl:
        "https://chrome.google.com/webstore/detail/gaia-exchanges/abcdefghijklmnopqrstuvwxyz",
      lastUpdate: new Date("2024-06-26"),
      version: "2.1.0",
      rating: 4.7,
      downloads: "1M+",
      icon: "🌐",
    },
  ]);

  const [deploymentProgress, setDeploymentProgress] = useState<Record<string, number>>({});
  const [isDeploying, setIsDeploying] = useState<Record<string, boolean>>({});

  // Auto-check store status every 30 seconds
  useEffect(() => {
    const checkStoreStatus = async () => {
      console.log("🔍 Checking app store connections...");

      // Simulate store status checks
      setStores((prev) =>
        prev.map((store) => {
          // Randomly update some statuses for demonstration
          if (Math.random() < 0.1) {
            if (store.status === "pending" && Math.random() > 0.5) {
              toast.success(`${store.name} Connected!`, {
                description: `🎉 Gaia's Exchanges is now live on ${store.name}`,
                duration: 5000,
              });
              return { ...store, status: "connected" as const };
            }
            if (store.status === "reviewing" && Math.random() > 0.7) {
              toast.success(`${store.name} Approved!`, {
                description: `✅ App review completed successfully`,
                duration: 5000,
              });
              return { ...store, status: "connected" as const };
            }
          }
          return store;
        })
      );
    };

    const statusInterval = setInterval(checkStoreStatus, 30000);
    return () => clearInterval(statusInterval);
  }, []);

  const handleConnect = async (store: AppStore) => {
    console.log(`🚀 Connecting to ${store.name}`);

    setIsDeploying((prev) => ({ ...prev, [store.id]: true }));
    setDeploymentProgress((prev) => ({ ...prev, [store.id]: 0 }));

    try {
      // Simulate deployment process
      const steps = [
        "Preparing app bundle...",
        "Running security checks...",
        "Uploading to store...",
        "Submitting for review...",
        "Awaiting approval...",
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDeploymentProgress((prev) => ({
          ...prev,
          [store.id]: ((i + 1) / steps.length) * 100,
        }));

        toast.info(steps[i], {
          description: `${store.name} deployment progress`,
          duration: 2000,
        });
      }

      // Update store status
      setStores((prev) =>
        prev.map((s) =>
          s.id === store.id
            ? {
                ...s,
                status: store.platform === "iOS" ? "reviewing" : "pending",
              }
            : s
        )
      );

      toast.success(`${store.name} Deployment Complete!`, {
        description: `🎯 App submitted successfully`,
        duration: 5000,
      });
    } catch (error) {
      console.error(`❌ Deployment failed for ${store.name}:`, error);
      toast.error(`Deployment Failed: ${store.name}`, {
        description: "Please check configuration and try again",
        duration: 5000,
      });
    } finally {
      setIsDeploying((prev) => ({ ...prev, [store.id]: false }));
      setDeploymentProgress((prev) => ({ ...prev, [store.id]: 0 }));
    }
  };

  const handleOpenStore = (store: AppStore) => {
    if (store.storeUrl) {
      window.open(store.storeUrl, "_blank", "noopener,noreferrer");
      toast.success(`Opening ${store.name}`, {
        description: `🔗 Gaia's Exchanges on ${store.platform}`,
        duration: 3000,
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case "reviewing":
        return <Clock className="h-4 w-4 text-blue-400" />;
      case "disconnected":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-600";
      case "pending":
        return "bg-yellow-600";
      case "reviewing":
        return "bg-blue-600";
      case "disconnected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Store className="h-5 w-5" />
          App Store Deployment & Connection Status
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time monitoring of Gaia's Exchanges across all major app stores
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stores.map((store) => (
            <Card key={store.id} className="border-border/50 bg-muted/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{store.icon}</div>
                    <div>
                      <h3 className="font-semibold text-sm">{store.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {store.platform}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(store.status)}
                    <Badge className={`${getStatusColor(store.status)} text-white text-xs`}>
                      {store.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="font-semibold">{store.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span className="font-semibold">⭐ {store.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Downloads:</span>
                    <span className="font-semibold">{store.downloads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span className="font-semibold">{store.lastUpdate.toLocaleDateString()}</span>
                  </div>
                </div>

                {isDeploying[store.id] && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Deploying...</span>
                      <span>{Math.round(deploymentProgress[store.id] || 0)}%</span>
                    </div>
                    <Progress value={deploymentProgress[store.id] || 0} />
                  </div>
                )}

                <div className="flex gap-2">
                  {store.status === "disconnected" ? (
                    <Button
                      onClick={() => handleConnect(store)}
                      disabled={isDeploying[store.id]}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      {isDeploying[store.id] ? "Deploying..." : "Connect"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleOpenStore(store)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      size="sm"
                      disabled={!store.storeUrl}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Store
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-500/20">
          <div className="text-center space-y-3">
            <h4 className="font-semibold text-green-400">🌍 Global Distribution Status</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Security Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>190+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-purple-400" />
                <span>Multi-Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-400" />
                <span>Auto-Updates</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              🎵 "Seeds Will Form Into Music" - Culture of Harmony reaching every device worldwide
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
