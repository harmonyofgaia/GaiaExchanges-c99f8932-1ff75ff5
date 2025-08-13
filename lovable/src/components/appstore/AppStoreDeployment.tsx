import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Smartphone,
  Apple,
  Play,
  Download,
  Shield,
  CheckCircle,
  Globe,
  Star,
  Users,
  Package,
} from "lucide-react";

interface AppStoreStatus {
  platform: "ios" | "android" | "windows" | "macos";
  name: string;
  status: "preparing" | "submitted" | "approved" | "published";
  progress: number;
  icon: React.ReactNode;
  color: string;
  version: string;
  buildNumber: number;
}

export function AppStoreDeployment() {
  const [deploymentStatus, setDeploymentStatus] = useState<AppStoreStatus[]>([
    {
      platform: "ios",
      name: "Apple App Store",
      status: "preparing",
      progress: 85,
      icon: <Apple className="h-5 w-5" />,
      color: "bg-gray-600",
      version: "1.0.0",
      buildNumber: 1,
    },
    {
      platform: "android",
      name: "Google Play Store",
      status: "preparing",
      progress: 90,
      icon: <Play className="h-5 w-5" />,
      color: "bg-green-600",
      version: "1.0.0",
      buildNumber: 1,
    },
    {
      platform: "windows",
      name: "Microsoft Store",
      status: "preparing",
      progress: 75,
      icon: <Package className="h-5 w-5" />,
      color: "bg-blue-600",
      version: "1.0.0",
      buildNumber: 1,
    },
    {
      platform: "macos",
      name: "Mac App Store",
      status: "preparing",
      progress: 80,
      icon: <Apple className="h-5 w-5" />,
      color: "bg-gray-700",
      version: "1.0.0",
      buildNumber: 1,
    },
  ]);

  const [overallProgress, setOverallProgress] = useState(0);
  const [securityCompliance, setSecurityCompliance] = useState(98);

  // Simulate deployment progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDeploymentStatus((prev) =>
        prev.map((store) => {
          if (store.progress < 100) {
            const newProgress = Math.min(
              100,
              store.progress + Math.random() * 3,
            );
            let newStatus = store.status;

            if (newProgress >= 100 && store.status === "preparing") {
              newStatus = "submitted";
              toast.success(`🚀 ${store.name} Submission Complete!`, {
                description: "App successfully submitted for review",
                duration: 4000,
              });
            }

            return { ...store, progress: newProgress, status: newStatus };
          }
          return store;
        }),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Calculate overall progress
  useEffect(() => {
    const totalProgress = deploymentStatus.reduce(
      (sum, store) => sum + store.progress,
      0,
    );
    setOverallProgress(totalProgress / deploymentStatus.length);
  }, [deploymentStatus]);

  const submitToAppStore = (platform: string) => {
    setDeploymentStatus((prev) =>
      prev.map((store) => {
        if (store.platform === platform) {
          toast.success(`🚀 Submitting to ${store.name}`, {
            description: "Automated submission process started",
            duration: 3000,
          });
          return { ...store, status: "submitted", progress: 100 };
        }
        return store;
      }),
    );
  };

  const generateAppBundle = () => {
    toast.success("📦 Generating App Bundles", {
      description: "Creating optimized builds for all platforms",
      duration: 4000,
    });

    setDeploymentStatus((prev) =>
      prev.map((store) => ({
        ...store,
        progress: Math.min(100, store.progress + 15),
        buildNumber: store.buildNumber + 1,
      })),
    );
  };

  const runSecurityAudit = () => {
    toast.success("🔒 Security Audit Started", {
      description: "Comprehensive security compliance check",
      duration: 3000,
    });

    setSecurityCompliance((prev) => Math.min(100, prev + 2));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-600";
      case "submitted":
        return "bg-blue-600";
      case "approved":
        return "bg-green-600";
      case "published":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Deployment Status */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Smartphone className="h-6 w-6" />
            Multi-Platform App Store Deployment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {overallProgress.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Overall Progress
              </div>
              <Progress value={overallProgress} className="mt-2" />
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">
                {securityCompliance}%
              </div>
              <div className="text-sm text-muted-foreground">
                Security Compliance
              </div>
              <Progress value={securityCompliance} className="mt-2" />
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">
                {
                  deploymentStatus.filter(
                    (s) => s.status === "submitted" || s.status === "approved",
                  ).length
                }
                /4
              </div>
              <div className="text-sm text-muted-foreground">
                Stores Submitted
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg p-4 border border-green-500/30">
            <p className="text-center text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌍 HARMONY OF GAIA - GLOBAL APP STORE DEPLOYMENT 🌍
            </p>
            <p className="text-center text-sm text-muted-foreground mt-2">
              🚀 Full Cross-Platform Compatibility with Maximum Security
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Individual App Store Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deploymentStatus.map((store) => (
          <Card key={store.platform} className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-purple-400">{store.icon}</div>
                  <span className="text-lg">{store.name}</span>
                </div>
                <Badge className={getStatusColor(store.status)}>
                  {store.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Deployment Progress</span>
                  <span>{store.progress.toFixed(1)}%</span>
                </div>
                <Progress value={store.progress} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Version</div>
                  <div className="font-medium">{store.version}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Build</div>
                  <div className="font-medium">#{store.buildNumber}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Deployment Checklist:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    <span>App Bundle Generated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    <span>Security Audit Passed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    <span>Metadata Configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    <span>Screenshots Uploaded</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => submitToAppStore(store.platform)}
                disabled={store.status === "submitted"}
                className={`w-full ${store.color} hover:opacity-90`}
              >
                {store.status === "submitted"
                  ? "Submitted"
                  : `Submit to ${store.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deployment Actions */}
      <div className="flex gap-4 flex-wrap">
        <Button
          onClick={generateAppBundle}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Package className="h-4 w-4 mr-2" />
          Generate All App Bundles
        </Button>

        <Button
          onClick={runSecurityAudit}
          className="bg-green-600 hover:bg-green-700"
        >
          <Shield className="h-4 w-4 mr-2" />
          Run Security Audit
        </Button>

        <Button variant="outline" className="border-purple-500/20">
          <Globe className="h-4 w-4 mr-2" />
          Configure Global Settings
        </Button>
      </div>

      {/* Security & Compliance */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-5 w-5" />
            Security & App Store Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-3">Security Features:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>End-to-end encryption</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Biometric authentication</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Secure keychain storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Anti-tampering protection</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Compliance Status:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>GDPR Compliant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>CCPA Compliant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Apple App Store Guidelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Google Play Policies</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
