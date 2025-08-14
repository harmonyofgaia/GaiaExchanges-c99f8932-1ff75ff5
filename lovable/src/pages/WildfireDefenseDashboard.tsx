import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  AlertTriangle,
  Shield,
  Target,
  Satellite,
  Flame,
  Droplets,
  Wind,
  Thermometer,
  Activity,
  MapPin,
  Radio,
  Battery,
  Wifi,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Eye,
  Bell,
  Users,
  TrendingUp,
  Clock,
  TreePine,
} from "lucide-react";

interface SandCannon {
  id: string;
  name: string;
  location: { lat: number; lng: number; address: string };
  status: "active" | "maintenance" | "offline" | "deployed";
  batteryLevel: number;
  sandLevel: number;
  range: number;
  lastMaintenance: string;
  firesDetected: number;
  firesExtinguished: number;
}

interface FireAlert {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  location: { lat: number; lng: number; address: string };
  detectedAt: string;
  status: "detected" | "responding" | "contained" | "resolved";
  confidence: number;
  estimatedSize: number;
  windSpeed: number;
  temperature: number;
  humidity: number;
  nearestCannons: string[];
}

const WildfireDefenseDashboard = () => {
  const [activeAlerts, setActiveAlerts] = useState<FireAlert[]>([]);
  const [sandCannons, setSandCannons] = useState<SandCannon[]>([]);
  const [selectedCannon, setSelectedCannon] = useState<SandCannon | null>(null);
  const [systemMode, setSystemMode] = useState<"auto" | "manual">("auto");
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Mock data initialization
  useEffect(() => {
    const mockCannons: SandCannon[] = [
      {
        id: "SC-001",
        name: "Redwood Guardian Alpha",
        location: {
          lat: 40.7589,
          lng: -124.0933,
          address: "Humboldt Redwoods State Park, CA",
        },
        status: "active",
        batteryLevel: 87,
        sandLevel: 92,
        range: 500,
        lastMaintenance: "2024-11-15",
        firesDetected: 12,
        firesExtinguished: 11,
      },
      {
        id: "SC-002",
        name: "Sierra Defender Beta",
        location: {
          lat: 37.8651,
          lng: -119.5383,
          address: "Yosemite National Park, CA",
        },
        status: "deployed",
        batteryLevel: 45,
        sandLevel: 34,
        range: 500,
        lastMaintenance: "2024-11-10",
        firesDetected: 8,
        firesExtinguished: 7,
      },
      {
        id: "SC-003",
        name: "Olympic Shield Gamma",
        location: {
          lat: 47.8021,
          lng: -123.6044,
          address: "Olympic National Forest, WA",
        },
        status: "maintenance",
        batteryLevel: 100,
        sandLevel: 100,
        range: 500,
        lastMaintenance: "2024-12-01",
        firesDetected: 3,
        firesExtinguished: 3,
      },
    ];

    const mockAlerts: FireAlert[] = [
      {
        id: "FA-001",
        severity: "high",
        location: {
          lat: 40.7589,
          lng: -124.0933,
          address: "Humboldt Redwoods, Sector 7",
        },
        detectedAt: "2024-12-15T14:23:00Z",
        status: "responding",
        confidence: 94,
        estimatedSize: 0.5,
        windSpeed: 12,
        temperature: 32,
        humidity: 15,
        nearestCannons: ["SC-001"],
      },
      {
        id: "FA-002",
        severity: "medium",
        location: {
          lat: 37.8651,
          lng: -119.5383,
          address: "Yosemite Valley, Trail Ridge",
        },
        detectedAt: "2024-12-15T13:45:00Z",
        status: "detected",
        confidence: 87,
        estimatedSize: 0.2,
        windSpeed: 8,
        temperature: 28,
        humidity: 22,
        nearestCannons: ["SC-002"],
      },
    ];

    setSandCannons(mockCannons);
    setActiveAlerts(mockAlerts);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "deployed":
        return "bg-yellow-500";
      case "maintenance":
        return "bg-blue-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "critical":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleCannonControl = (cannonId: string, action: "deploy" | "recall" | "test") => {
    setSandCannons((cannons) =>
      cannons.map((cannon) =>
        cannon.id === cannonId
          ? {
              ...cannon,
              status:
                action === "deploy" ? "deployed" : action === "recall" ? "active" : cannon.status,
            }
          : cannon
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-10 w-10 text-red-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Wildfire Defense Dashboard</h1>
                <p className="text-lg text-gray-600">
                  Real-time forest protection monitoring & control
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">System Mode:</span>
                <Button
                  variant={systemMode === "auto" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSystemMode("auto")}
                >
                  Auto
                </Button>
                <Button
                  variant={systemMode === "manual" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSystemMode("manual")}
                >
                  Manual
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Bell className={`h-5 w-5 ${alertsEnabled ? "text-red-600" : "text-gray-400"}`} />
                <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
              </div>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              Active Fire Alerts ({activeAlerts.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeAlerts.map((alert) => (
                <Alert key={alert.id} className={`border-2 ${getSeverityColor(alert.severity)}`}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold">{alert.location.address}</div>
                        <div className="text-sm opacity-75">
                          Detected: {new Date(alert.detectedAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Confidence: {alert.confidence}%</div>
                      <div>Size: {alert.estimatedSize} hectares</div>
                      <div>Wind: {alert.windSpeed} km/h</div>
                      <div>Temp: {alert.temperature}°C</div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Button size="sm" variant="destructive">
                        Deploy Response
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cannons">Sand Cannons</TabsTrigger>
            <TabsTrigger value="detection">Detection Network</TabsTrigger>
            <TabsTrigger value="control">Control Center</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Target className="h-8 w-8 text-green-600" />
                    <Badge variant="outline">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {sandCannons.filter((c) => c.status === "active").length}
                  </div>
                  <div className="text-sm text-gray-600">Sand Cannons Online</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <Badge variant="destructive">{activeAlerts.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{activeAlerts.length}</div>
                  <div className="text-sm text-gray-600">Active Alerts</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <TreePine className="h-8 w-8 text-green-600" />
                    <Badge variant="outline">Protected</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">750</div>
                  <div className="text-sm text-gray-600">Hectares Covered</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Flame className="h-8 w-8 text-orange-600" />
                    <Badge variant="outline">Prevented</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {sandCannons.reduce((sum, cannon) => sum + cannon.firesExtinguished, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Fires Extinguished</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Network Connectivity</span>
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Excellent</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Satellite Coverage</span>
                      <div className="flex items-center space-x-2">
                        <Satellite className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">100%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>AI Detection</span>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Response Time</span>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">&lt;30s</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                    Today's Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Threats Detected</span>
                      <span className="font-semibold">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto Responses</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Manual Interventions</span>
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>System Uptime</span>
                      <span className="font-semibold text-green-600">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sand Cannons Tab */}
          <TabsContent value="cannons" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sand Cannon Network</CardTitle>
                    <CardDescription>
                      Monitor and control individual sand cannon installations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sandCannons.map((cannon) => (
                        <div
                          key={cannon.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedCannon?.id === cannon.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedCannon(cannon)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${getStatusColor(cannon.status)}`}
                              ></div>
                              <div>
                                <div className="font-semibold">{cannon.name}</div>
                                <div className="text-sm text-gray-600">{cannon.id}</div>
                              </div>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {cannon.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Battery className="h-4 w-4 text-green-500" />
                              <span>Battery: {cannon.batteryLevel}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Droplets className="h-4 w-4 text-blue-500" />
                              <span>Sand: {cannon.sandLevel}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Target className="h-4 w-4 text-red-500" />
                              <span>Range: {cannon.range}m</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-purple-500" />
                              <span>
                                Fires: {cannon.firesExtinguished}/{cannon.firesDetected}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-gray-500">
                            {cannon.location.address}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                {selectedCannon && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Cannon Control</CardTitle>
                      <CardDescription>{selectedCannon.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            onClick={() => handleCannonControl(selectedCannon.id, "deploy")}
                            disabled={selectedCannon.status === "deployed"}
                            className="w-full"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Deploy
                          </Button>
                          <Button
                            onClick={() => handleCannonControl(selectedCannon.id, "recall")}
                            disabled={selectedCannon.status !== "deployed"}
                            variant="outline"
                            className="w-full"
                          >
                            <Pause className="h-4 w-4 mr-2" />
                            Recall
                          </Button>
                        </div>
                        <Button
                          onClick={() => handleCannonControl(selectedCannon.id, "test")}
                          variant="outline"
                          className="w-full"
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Run Test
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>

                        <div className="pt-4 border-t">
                          <h4 className="font-semibold mb-3">Range Adjustment</h4>
                          <Slider
                            value={[selectedCannon.range]}
                            onValueChange={([value]) => {
                              setSandCannons((cannons) =>
                                cannons.map((cannon) =>
                                  cannon.id === selectedCannon.id
                                    ? { ...cannon, range: value }
                                    : cannon
                                )
                              );
                              setSelectedCannon({
                                ...selectedCannon,
                                range: value,
                              });
                            }}
                            max={1000}
                            min={100}
                            step={50}
                            className="w-full"
                          />
                          <div className="text-sm text-gray-600 mt-1">
                            Range: {selectedCannon.range}m
                          </div>
                        </div>

                        <div className="pt-4 border-t space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Last Maintenance:</span>
                            <span>{selectedCannon.lastMaintenance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Fires Detected:</span>
                            <span>{selectedCannon.firesDetected}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Success Rate:</span>
                            <span>
                              {selectedCannon.firesDetected > 0
                                ? Math.round(
                                    (selectedCannon.firesExtinguished /
                                      selectedCannon.firesDetected) *
                                      100
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Detection Network Tab */}
          <TabsContent value="detection" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Satellite className="h-5 w-5 mr-2 text-blue-600" />
                    Satellite Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Active Satellites</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Coverage</span>
                      <span className="font-semibold text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Resolution</span>
                      <span className="font-semibold">30cm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Update Frequency</span>
                      <span className="font-semibold">15 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Radio className="h-5 w-5 mr-2 text-green-600" />
                    IoT Sensors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Active Sensors</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Temperature</span>
                      <div className="flex items-center space-x-1">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="font-semibold">28°C avg</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Humidity</span>
                      <span className="font-semibold">35% avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Wind Speed</span>
                      <div className="flex items-center space-x-1">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold">12 km/h avg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-purple-600" />
                    AI Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Detection Accuracy</span>
                      <span className="font-semibold text-green-600">99.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>False Positives</span>
                      <span className="font-semibold">&lt;0.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Response Time</span>
                      <span className="font-semibold">12s avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Model Version</span>
                      <span className="font-semibold">v3.2.1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detection Heat Map</CardTitle>
                <CardDescription>
                  Real-time fire risk assessment across monitored regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive heat map would be displayed here</p>
                    <p className="text-sm text-gray-500">
                      Showing fire risk levels across protected areas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Control Center Tab */}
          <TabsContent value="control" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-blue-600" />
                    System Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium block mb-2">Alert Sensitivity</label>
                      <Slider defaultValue={[75]} max={100} step={5} className="w-full" />
                      <div className="text-xs text-gray-500 mt-1">Current: High Sensitivity</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">
                        Auto-Response Threshold
                      </label>
                      <Slider defaultValue={[80]} max={100} step={5} className="w-full" />
                      <div className="text-xs text-gray-500 mt-1">Deploy at 80% confidence</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">
                        Network Scan Frequency
                      </label>
                      <Slider defaultValue={[15]} max={60} min={5} step={5} className="w-full" />
                      <div className="text-xs text-gray-500 mt-1">Every 15 minutes</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <label className="text-sm">Auto Deployment</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <label className="text-sm">Emergency Alerts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <label className="text-sm">Data Logging</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <label className="text-sm">Maintenance Mode</label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                    Emergency Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full" size="lg" variant="destructive">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Deploy All Cannons
                    </Button>

                    <Button className="w-full" size="lg" variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      System Reset
                    </Button>

                    <Button className="w-full" size="lg" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Alert Emergency Services
                    </Button>

                    <Button className="w-full" size="lg" variant="outline">
                      <Radio className="h-4 w-4 mr-2" />
                      Broadcast Warning
                    </Button>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3">Emergency Contacts</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Fire Department:</span>
                          <span className="font-mono">+1-911</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Forest Service:</span>
                          <span className="font-mono">+1-555-FOREST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Emergency Mgmt:</span>
                          <span className="font-mono">+1-555-EMERGENCY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">24s</div>
                  <div className="text-sm text-gray-600">Average</div>
                  <div className="text-xs text-green-600">↓ 12% from last week</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">96.7%</div>
                  <div className="text-sm text-gray-600">Fire Suppression</div>
                  <div className="text-xs text-green-600">↑ 2.1% from last month</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Coverage Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">750</div>
                  <div className="text-sm text-gray-600">Hectares</div>
                  <div className="text-xs text-blue-600">↑ 50 hectares this month</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Cost Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$2.1M</div>
                  <div className="text-sm text-gray-600">Damage Prevented</div>
                  <div className="text-xs text-green-600">This year</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>System performance metrics over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Performance charts would be displayed here</p>
                    <p className="text-sm text-gray-500">
                      Response times, success rates, and system uptime
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WildfireDefenseDashboard;
