import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Waves,
  Eye,
  Database,
  Trash2,
  Shield,
  Zap,
  Activity,
  Globe,
  HardDrive,
  Cloud,
  Lock,
  Unlock,
} from "lucide-react";

interface DataNode {
  id: string;
  source: string;
  type: "encrypted" | "deleted" | "hidden" | "classified";
  size: string;
  timestamp: Date;
  extracted: boolean;
}

export function InvisibleDolphin() {
  const [isActive, setIsActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [dataNodes, setDataNodes] = useState<DataNode[]>([]);
  const [metrics, setMetrics] = useState({
    totalSources: 0,
    encryptedData: 0,
    deletedRecovered: 0,
    hiddenRevealed: 0,
    classifiedAccessed: 0,
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + Math.random() * 3;
          return newProgress > 100 ? 100 : newProgress;
        });

        // Generate new data nodes
        if (Math.random() < 0.4) {
          const newNode: DataNode = {
            id: Math.random().toString(36),
            source: [
              "Government Server",
              "Corporate Database",
              "Military Network",
              "Research Facility",
              "Financial Institution",
              "Cloud Storage",
              "Mobile Device",
              "IoT Network",
            ][Math.floor(Math.random() * 8)],
            type: ["encrypted", "deleted", "hidden", "classified"][
              Math.floor(Math.random() * 4)
            ] as any,
            size: `${(Math.random() * 999 + 1).toFixed(0)}MB`,
            timestamp: new Date(),
            extracted: Math.random() > 0.3,
          };

          setDataNodes((prev) => [newNode, ...prev.slice(0, 19)]);

          if (newNode.extracted) {
            setMetrics((prev) => ({
              totalSources: prev.totalSources + 1,
              encryptedData:
                newNode.type === "encrypted"
                  ? prev.encryptedData + 1
                  : prev.encryptedData,
              deletedRecovered:
                newNode.type === "deleted"
                  ? prev.deletedRecovered + 1
                  : prev.deletedRecovered,
              hiddenRevealed:
                newNode.type === "hidden"
                  ? prev.hiddenRevealed + 1
                  : prev.hiddenRevealed,
              classifiedAccessed:
                newNode.type === "classified"
                  ? prev.classifiedAccessed + 1
                  : prev.classifiedAccessed,
            }));
          }
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const activateDolphin = () => {
    setIsActive(true);
    setScanProgress(0);
    console.log(
      "🐬 INVISIBLE DOLPHIN ACTIVATED - Swimming through all data...",
    );
  };

  const deactivateDolphin = () => {
    setIsActive(false);
    setScanProgress(0);
    console.log("🐬 Dolphin returning to secure waters");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "encrypted":
        return <Lock className="h-4 w-4" />;
      case "deleted":
        return <Trash2 className="h-4 w-4" />;
      case "hidden":
        return <Eye className="h-4 w-4" />;
      case "classified":
        return <Shield className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "encrypted":
        return "text-blue-400";
      case "deleted":
        return "text-red-400";
      case "hidden":
        return "text-purple-400";
      case "classified":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Waves className="h-6 w-6" />
            🐬 Invisible Dolphin Data Extractor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Control Panel */}
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="text-6xl animate-bounce">🐬</div>
              {isActive && (
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping"></div>
              )}
            </div>

            <div className="space-y-2">
              <Button
                onClick={isActive ? deactivateDolphin : activateDolphin}
                className={`px-8 py-3 text-lg font-bold ${
                  isActive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-cyan-600 hover:bg-cyan-700"
                }`}
                disabled={isActive && scanProgress < 100}
              >
                {isActive ? "🛑 Recall Dolphin" : "🐬 Deploy Invisible Dolphin"}
              </Button>

              {isActive && (
                <div className="space-y-2">
                  <div className="text-sm text-cyan-400">
                    Swimming through encrypted networks...
                  </div>
                  <Progress value={scanProgress} className="w-full" />
                  <div className="text-xs text-muted-foreground">
                    {scanProgress.toFixed(1)}% Complete
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardContent className="pt-4 text-center">
                <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  {metrics.encryptedData}
                </div>
                <div className="text-xs text-muted-foreground">
                  Encrypted Cracked
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-900/20 border-red-500/30">
              <CardContent className="pt-4 text-center">
                <Trash2 className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-400">
                  {metrics.deletedRecovered}
                </div>
                <div className="text-xs text-muted-foreground">
                  Deleted Recovered
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/20 border-purple-500/30">
              <CardContent className="pt-4 text-center">
                <Eye className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">
                  {metrics.hiddenRevealed}
                </div>
                <div className="text-xs text-muted-foreground">
                  Hidden Revealed
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-900/20 border-orange-500/30">
              <CardContent className="pt-4 text-center">
                <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">
                  {metrics.classifiedAccessed}
                </div>
                <div className="text-xs text-muted-foreground">
                  Classified Accessed
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Data Feed */}
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="pt-4">
              <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Data Extraction Feed
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {dataNodes.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    Dolphin is resting. Activate to begin data extraction.
                  </div>
                ) : (
                  dataNodes.map((node) => (
                    <div
                      key={node.id}
                      className="flex items-center justify-between p-3 bg-muted/10 rounded border border-border/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className={getTypeColor(node.type)}>
                          {getTypeIcon(node.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {node.source}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {node.timestamp.toLocaleTimeString()} | Size:{" "}
                            {node.size}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${getTypeColor(node.type)} border-current`}
                          variant="outline"
                        >
                          {node.type.toUpperCase()}
                        </Badge>
                        <Badge
                          className={
                            node.extracted ? "bg-green-600" : "bg-yellow-600"
                          }
                        >
                          {node.extracted ? "EXTRACTED" : "PROCESSING"}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Capabilities Overview */}
          <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
            <CardContent className="pt-4">
              <h3 className="text-indigo-400 font-bold mb-4">
                🌊 Dolphin Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Unlock className="h-4 w-4" />
                    Bypass all encryption protocols
                  </div>
                  <div className="flex items-center gap-2 text-blue-300">
                    <Database className="h-4 w-4" />
                    Recover permanently deleted data
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Eye className="h-4 w-4" />
                    Reveal hidden file systems
                  </div>
                  <div className="flex items-center gap-2 text-green-300">
                    <Globe className="h-4 w-4" />
                    Access global network infrastructure
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-orange-300">
                    <Shield className="h-4 w-4" />
                    Penetrate classified systems
                  </div>
                  <div className="flex items-center gap-2 text-red-300">
                    <HardDrive className="h-4 w-4" />
                    Extract from damaged hardware
                  </div>
                  <div className="flex items-center gap-2 text-yellow-300">
                    <Cloud className="h-4 w-4" />
                    Mine cloud storage archives
                  </div>
                  <div className="flex items-center gap-2 text-pink-300">
                    <Zap className="h-4 w-4" />
                    Real-time data monitoring
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="bg-red-900/20 border-red-500/30">
            <CardContent className="pt-4">
              <div className="text-center text-red-300">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold">CLASSIFIED OPERATION</div>
                <div className="text-sm mt-2">
                  This dolphin operates beyond conventional boundaries. Use
                  responsibly.
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
