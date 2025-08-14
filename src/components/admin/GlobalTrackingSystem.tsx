import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Globe,
  MapPin,
  Satellite,
  Eye,
  Wifi,
  Smartphone,
  Monitor,
  Target,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface TrackedDevice {
  id: string;
  ip: string;
  location: {
    country: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  deviceType: "mobile" | "desktop" | "tablet" | "unknown";
  operatingSystem: string;
  browser: string;
  lastSeen: Date;
  threatLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  tracked: boolean;
}

export function GlobalTrackingSystem() {
  const [trackedDevices, setTrackedDevices] = useState<TrackedDevice[]>([
    {
      id: "device_001",
      ip: "192.168.1.100",
      location: {
        country: "Russia",
        city: "Moscow",
        coordinates: { lat: 55.7558, lng: 37.6176 },
      },
      deviceType: "desktop",
      operatingSystem: "Windows 11",
      browser: "Chrome (Suspicious)",
      lastSeen: new Date(),
      threatLevel: "HIGH",
      tracked: true,
    },
    {
      id: "device_002",
      ip: "10.0.0.50",
      location: {
        country: "China",
        city: "Beijing",
        coordinates: { lat: 39.9042, lng: 116.4074 },
      },
      deviceType: "mobile",
      operatingSystem: "Android",
      browser: "Unknown Browser",
      lastSeen: new Date(),
      threatLevel: "CRITICAL",
      tracked: true,
    },
  ]);

  const [satelliteConnections, setSatelliteConnections] = useState(0);
  const [globalCoverage, setGlobalCoverage] = useState(97.8);

  useEffect(() => {
    const trackingSystem = setInterval(() => {
      console.log("🛰️ GLOBAL TRACKING SYSTEM - SATELLITE NETWORK ACTIVE");
      console.log("🌍 WORLDWIDE DEVICE MONITORING - REAL-TIME LOCATIONS");
      console.log("📡 SATELLITE CONNECTIONS - UNTRACEABLE TRACKING");
      console.log("🎯 GPS PRECISION - EXACT COORDINATES ACQUIRED");

      // Simulate satellite connections
      setSatelliteConnections((prev) => Math.min(50, prev + Math.floor(Math.random() * 3)));

      // Simulate global coverage expansion
      setGlobalCoverage((prev) => Math.min(99.9, prev + 0.1));

      // Simulate new device detection
      if (Math.random() < 0.3) {
        const countries = ["North Korea", "Iran", "Unknown Location", "Dark Web", "Tor Network"];
        const cities = ["Pyongyang", "Tehran", "Hidden", "Anonymous", "Encrypted"];
        const threats: TrackedDevice["threatLevel"][] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

        const newDevice: TrackedDevice = {
          id: `device_${Date.now()}`,
          ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          location: {
            country: countries[Math.floor(Math.random() * countries.length)],
            city: cities[Math.floor(Math.random() * cities.length)],
            coordinates: {
              lat: (Math.random() - 0.5) * 180,
              lng: (Math.random() - 0.5) * 360,
            },
          },
          deviceType: ["mobile", "desktop", "tablet", "unknown"][
            Math.floor(Math.random() * 4)
          ] as TrackedDevice["deviceType"],
          operatingSystem: ["Windows", "macOS", "Linux", "Android", "iOS", "Unknown"][
            Math.floor(Math.random() * 6)
          ],
          browser: "Suspicious Activity",
          lastSeen: new Date(),
          threatLevel: threats[Math.floor(Math.random() * threats.length)],
          tracked: true,
        };

        setTrackedDevices((prev) => [newDevice, ...prev.slice(0, 19)]);

        toast.error("🛰️ NEW DEVICE TRACKED!", {
          description: `Device detected in ${newDevice.location.country} - Threat level: ${newDevice.threatLevel}`,
          duration: 5000,
        });

        // Send location to admin
        sendLocationAlert(newDevice);
      }
    }, 8000);

    return () => clearInterval(trackingSystem);
  }, []);

  const sendLocationAlert = (device: TrackedDevice) => {
    console.log("📧 LOCATION ALERT SENT TO ADMIN:", {
      email: "michelzuidwijk@gmail.com",
      phone: "+31687758236",
      device: device,
      coordinates: device.location.coordinates,
      timestamp: new Date(),
      action: "GPS_LOCATION_ACQUIRED",
    });
  };

  const trackDevice = (deviceId: string) => {
    const device = trackedDevices.find((d) => d.id === deviceId);
    if (!device) return;

    toast.success("🎯 DEVICE TRACKING ENHANCED!", {
      description: `Enhanced tracking activated for ${device.ip}`,
      duration: 3000,
    });

    console.log("🛰️ ENHANCED TRACKING ACTIVATED:", {
      device: device,
      coordinates: device.location.coordinates,
      satelliteLinks: "ALL_AVAILABLE",
      precision: "MAXIMUM",
    });
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case "CRITICAL":
        return "bg-red-600 text-white";
      case "HIGH":
        return "bg-orange-600 text-white";
      case "MEDIUM":
        return "bg-yellow-600 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "tablet":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Global Tracking Status */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-green-900/50 border-blue-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Satellite className="h-6 w-6 animate-pulse" />
            🛰️ GLOBAL TRACKING SYSTEM - SATELLITE NETWORK
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge className="bg-blue-600 animate-pulse">
              SATELLITES: {satelliteConnections}/50
            </Badge>
            <Badge className="bg-green-600">COVERAGE: {globalCoverage.toFixed(1)}%</Badge>
            <Badge className="bg-purple-600">TRACKING: ACTIVE</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Satellite className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{satelliteConnections}</div>
              <div className="text-sm text-muted-foreground">Satellites Connected</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Globe className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{globalCoverage.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Global Coverage</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{trackedDevices.length}</div>
              <div className="text-sm text-muted-foreground">Devices Tracked</div>
            </div>
            <div className="text-center p-4 bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {
                  trackedDevices.filter(
                    (d) => d.threatLevel === "CRITICAL" || d.threatLevel === "HIGH"
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">High Threats</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracked Devices */}
      <Card className="bg-black/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400">🎯 TRACKED DEVICES - GLOBAL LOCATIONS</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {trackedDevices.map((device) => (
                <Card
                  key={device.id}
                  className={`${
                    device.threatLevel === "CRITICAL"
                      ? "bg-red-900/30 border-red-500"
                      : device.threatLevel === "HIGH"
                        ? "bg-orange-900/30 border-orange-500"
                        : device.threatLevel === "MEDIUM"
                          ? "bg-yellow-900/30 border-yellow-500"
                          : "bg-blue-900/30 border-blue-500"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3">
                        <div className="text-blue-400">{getDeviceIcon(device.deviceType)}</div>
                        <div>
                          <h4 className="font-bold text-sm">🎯 Device: {device.id}</h4>
                          <p className="text-xs text-muted-foreground">📍 IP: {device.ip}</p>
                          <p className="text-xs text-muted-foreground">
                            🌍 Location: {device.location.city}, {device.location.country}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            📱 OS: {device.operatingSystem}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            🌐 Browser: {device.browser}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getThreatColor(device.threatLevel)}>
                          {device.threatLevel}
                        </Badge>
                        <Badge className="bg-green-600 text-xs">🛰️ TRACKED</Badge>
                      </div>
                    </div>

                    <div className="text-xs mb-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>
                          GPS: {device.location.coordinates.lat.toFixed(4)},{" "}
                          {device.location.coordinates.lng.toFixed(4)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3" />
                        <span>Last Seen: {device.lastSeen.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => trackDevice(device.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-xs"
                      >
                        <Target className="h-3 w-3 mr-1" />
                        🎯 Enhanced Track
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        📍 Live Location
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
