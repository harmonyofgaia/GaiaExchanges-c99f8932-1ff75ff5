import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Headphones,
  Wifi,
  Settings,
  Eye,
  Volume2,
  Gamepad2,
  Zap,
  Monitor,
} from "lucide-react";
import { toast } from "sonner";

interface VRConnectionManagerProps {
  onConnectionChange: (connected: boolean) => void;
  isConnected: boolean;
}

export function VRConnectionManager({
  onConnectionChange,
  isConnected,
}: VRConnectionManagerProps) {
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connecting" | "connected"
  >("disconnected");
  const [vrSettings, setVrSettings] = useState({
    resolution: "2160p",
    refreshRate: 90,
    trackingEnabled: true,
    hapticFeedback: true,
    audioEnhanced: true,
    environmentalEffects: true,
  });

  const vrDevices = [
    { name: "Meta Quest 3", status: "Available", compatibility: 100 },
    { name: "PlayStation VR2", status: "Available", compatibility: 95 },
    { name: "HTC Vive Pro", status: "Available", compatibility: 90 },
    { name: "Oculus Rift S", status: "Available", compatibility: 85 },
    { name: "Windows Mixed Reality", status: "Available", compatibility: 80 },
  ];

  const connectToVR = async () => {
    setConnectionStatus("connecting");

    // Simulate VR connection process
    toast.info("🥽 Initializing VR Connection...", {
      description: "Scanning for available VR devices",
      duration: 2000,
    });

    setTimeout(() => {
      setConnectionStatus("connected");
      onConnectionChange(true);
      toast.success("🎮 VR Connected Successfully!", {
        description: "Welcome to the GAiA Virtual World in VR!",
        duration: 4000,
      });
    }, 3000);
  };

  const disconnectVR = () => {
    setConnectionStatus("disconnected");
    onConnectionChange(false);
    toast.info("🥽 VR Disconnected", {
      description: "Returned to standard view mode",
      duration: 2000,
    });
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-400";
      case "connecting":
        return "text-yellow-400";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* VR Connection Header */}
      <Card className="border-2 border-pink-500/50 bg-gradient-to-br from-pink-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-400">
            <Headphones className="h-6 w-6" />
            🥽 VR Connection Manager - Immersive Eco-Gaming
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <div className={`text-2xl font-bold ${getStatusColor()}`}>
                {connectionStatus.toUpperCase()}
              </div>
              <div className="text-sm text-muted-foreground">VR Status</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {vrSettings.resolution}
              </div>
              <div className="text-sm text-muted-foreground">Resolution</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">
                {vrSettings.refreshRate}Hz
              </div>
              <div className="text-sm text-muted-foreground">Refresh Rate</div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            {connectionStatus === "disconnected" && (
              <Button
                onClick={connectToVR}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                size="lg"
              >
                <Headphones className="h-5 w-5 mr-2" />
                🥽 Connect to VR
              </Button>
            )}

            {connectionStatus === "connecting" && (
              <div className="text-center space-y-4">
                <div className="animate-spin text-4xl">🥽</div>
                <p className="text-yellow-400">Connecting to VR...</p>
                <Progress value={65} className="w-64" />
              </div>
            )}

            {connectionStatus === "connected" && (
              <Button onClick={disconnectVR} variant="destructive" size="lg">
                <Zap className="h-5 w-5 mr-2" />
                🔌 Disconnect VR
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* VR Device Compatibility */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Monitor className="h-5 w-5" />
            🎮 Compatible VR Devices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vrDevices.map((device, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <Headphones className="h-6 w-6 text-purple-400" />
                  <div>
                    <h4 className="font-bold">{device.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {device.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Compatibility</div>
                    <Progress
                      value={device.compatibility}
                      className="w-24 h-2"
                    />
                  </div>
                  <Badge className="bg-green-600 text-white">
                    {device.compatibility}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* VR Settings */}
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Settings className="h-5 w-5" />
            ⚙️ VR Experience Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Motion Tracking</label>
                  <p className="text-xs text-muted-foreground">
                    Full body movement detection
                  </p>
                </div>
                <Switch
                  checked={vrSettings.trackingEnabled}
                  onCheckedChange={(checked) =>
                    setVrSettings((prev) => ({
                      ...prev,
                      trackingEnabled: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Haptic Feedback</label>
                  <p className="text-xs text-muted-foreground">
                    Touch and vibration responses
                  </p>
                </div>
                <Switch
                  checked={vrSettings.hapticFeedback}
                  onCheckedChange={(checked) =>
                    setVrSettings((prev) => ({
                      ...prev,
                      hapticFeedback: checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Enhanced Audio</label>
                  <p className="text-xs text-muted-foreground">
                    3D spatial audio effects
                  </p>
                </div>
                <Switch
                  checked={vrSettings.audioEnhanced}
                  onCheckedChange={(checked) =>
                    setVrSettings((prev) => ({
                      ...prev,
                      audioEnhanced: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Environmental Effects
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Weather and particle effects
                  </p>
                </div>
                <Switch
                  checked={vrSettings.environmentalEffects}
                  onCheckedChange={(checked) =>
                    setVrSettings((prev) => ({
                      ...prev,
                      environmentalEffects: checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* VR Features Preview */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-4 border border-purple-500/20">
            <h4 className="font-bold text-purple-400 mb-3">
              🌟 VR Experience Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Immersive 360° environments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Hand gesture interactions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Real-time token burning visualization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Multi-player VR environments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Environmental impact feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Virtual animal interactions</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
