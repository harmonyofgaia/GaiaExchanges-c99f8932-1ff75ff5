import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  HardDrive,
  RotateCcw,
  Shield,
  Laptop,
  Smartphone,
  Monitor,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface RecoveryDevice {
  id: string;
  name: string;
  type: "laptop" | "desktop" | "mobile";
  lastAccess: Date;
  recoveryReady: boolean;
  dataSync: number;
}

export function CloudRecoverySystem() {
  const [recoveryDevices, setRecoveryDevices] = useState<RecoveryDevice[]>([
    {
      id: "device-1",
      name: "Admin Laptop Primary",
      type: "laptop",
      lastAccess: new Date(Date.now() - 3600000),
      recoveryReady: true,
      dataSync: 100,
    },
    {
      id: "device-2",
      name: "Admin Desktop Backup",
      type: "desktop",
      lastAccess: new Date(Date.now() - 7200000),
      recoveryReady: true,
      dataSync: 98.5,
    },
    {
      id: "device-3",
      name: "Admin Mobile Emergency",
      type: "mobile",
      lastAccess: new Date(Date.now() - 1800000),
      recoveryReady: true,
      dataSync: 95.2,
    },
    {
      id: "device-4",
      name: "Secondary Laptop",
      type: "laptop",
      lastAccess: new Date(Date.now() - 86400000),
      recoveryReady: false,
      dataSync: 87.1,
    },
  ]);

  const [recoverySettings, setRecoverySettings] = useState({
    autoSync: true,
    emergencyBackup: true,
    crossDeviceRecovery: true,
    quantumEncryption: true,
  });

  const [recoveryStats, setRecoveryStats] = useState({
    totalDevices: 4,
    readyDevices: 3,
    totalDataMirrored: 750, // GB
    lastFullSync: new Date(),
  });

  const initiateDeviceRecovery = (deviceId: string) => {
    console.log(`🔄 INITIATING DEVICE RECOVERY - DEVICE: ${deviceId}`);

    setRecoveryDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              recoveryReady: true,
              dataSync: 100,
              lastAccess: new Date(),
            }
          : device,
      ),
    );

    toast.success("🔄 Device Recovery Initiated!", {
      description: "All admin data synced and recovered to selected device",
      duration: 5000,
    });

    setRecoveryStats((prev) => ({
      ...prev,
      readyDevices: prev.readyDevices + 1,
      lastFullSync: new Date(),
    }));
  };

  const performFullSystemRecovery = () => {
    console.log("🚨 FULL SYSTEM RECOVERY INITIATED - ALL DEVICES");

    setRecoveryDevices((prev) =>
      prev.map((device) => ({
        ...device,
        recoveryReady: true,
        dataSync: 100,
        lastAccess: new Date(),
      })),
    );

    toast.success("🎯 FULL SYSTEM RECOVERY COMPLETE!", {
      description:
        "All devices synchronized with latest admin data and settings",
      duration: 8000,
    });

    setRecoveryStats((prev) => ({
      ...prev,
      readyDevices: prev.totalDevices,
      lastFullSync: new Date(),
    }));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "laptop":
        return <Laptop className="h-6 w-6" />;
      case "desktop":
        return <Monitor className="h-6 w-6" />;
      case "mobile":
        return <Smartphone className="h-6 w-6" />;
      default:
        return <HardDrive className="h-6 w-6" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate continuous device monitoring and sync
      setRecoveryDevices((prev) =>
        prev.map((device) => ({
          ...device,
          dataSync: Math.max(
            85,
            Math.min(100, device.dataSync + (Math.random() - 0.3) * 2),
          ),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Recovery System Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <RotateCcw className="h-6 w-6" />
            🔄 CLOUD RECOVERY SYSTEM - 4 DEVICE PROTECTION
            <Badge className="bg-green-600 text-white animate-pulse">
              ALWAYS READY
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recovery Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {recoveryStats.readyDevices}
              </div>
              <div className="text-sm text-muted-foreground">Ready Devices</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <HardDrive className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {recoveryStats.totalDataMirrored}GB
              </div>
              <div className="text-sm text-muted-foreground">Data Mirrored</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Shield className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">QUANTUM</div>
              <div className="text-sm text-muted-foreground">Encryption</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <RotateCcw className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">24/7</div>
              <div className="text-sm text-muted-foreground">Auto Sync</div>
            </div>
          </div>

          <Button
            onClick={performFullSystemRecovery}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-16"
          >
            <RotateCcw className="h-6 w-6 mr-2" />
            🚨 PERFORM FULL SYSTEM RECOVERY - ALL DEVICES
          </Button>
        </CardContent>
      </Card>

      {/* Device Recovery Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Admin Device Recovery Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recoveryDevices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border"
              >
                <div className="flex items-center gap-4">
                  <div className="text-blue-400">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Last Access: {device.lastAccess.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">Data Sync:</span>
                      <Progress value={device.dataSync} className="w-20 h-2" />
                      <span className="text-xs">
                        {device.dataSync.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className={`${
                      device.recoveryReady ? "bg-green-600" : "bg-orange-600"
                    } text-white`}
                  >
                    {device.recoveryReady ? "READY" : "SYNCING"}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => initiateDeviceRecovery(device.id)}
                    disabled={device.recoveryReady}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Recover
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Settings */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-400">
            🔧 Recovery Configuration Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(recoverySettings).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20"
              >
                <div>
                  <div className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {key === "autoSync" &&
                      "Automatically sync data across all devices"}
                    {key === "emergencyBackup" &&
                      "Create emergency backups during recovery"}
                    {key === "crossDeviceRecovery" &&
                      "Enable recovery from any admin device"}
                    {key === "quantumEncryption" &&
                      "Use quantum-resistant encryption for all data"}
                  </div>
                </div>
                <Badge className={value ? "bg-green-600" : "bg-red-600"}>
                  {value ? "ENABLED" : "DISABLED"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
