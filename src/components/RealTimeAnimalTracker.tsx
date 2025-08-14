import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Heart,
  Activity,
  Camera,
  Satellite,
  Globe,
  Eye,
  Zap,
  Target,
  Navigation,
  Radio,
  Signal,
  Radar,
  Monitor,
} from "lucide-react";

export function RealTimeAnimalTracker() {
  const [trackedAnimals, setTrackedAnimals] = useState([
    {
      id: 1,
      name: "Thunder",
      species: "Golden Eagle",
      location: { lat: 39.7392, lng: -104.9903, name: "Rocky Mountains, CO" },
      status: "Flying",
      heartRate: 180,
      altitude: 850,
      speed: 45,
      lastUpdate: "2 seconds ago",
      batteryLevel: 87,
      signalStrength: 95,
    },
    {
      id: 2,
      name: "Luna",
      species: "Arctic Wolf",
      location: {
        lat: 64.0685,
        lng: -139.0686,
        name: "Yukon Territory, Canada",
      },
      status: "Resting",
      heartRate: 65,
      temperature: -12,
      speed: 0,
      lastUpdate: "5 seconds ago",
      batteryLevel: 73,
      signalStrength: 88,
    },
    {
      id: 3,
      name: "Coral",
      species: "Sea Turtle",
      location: { lat: 21.3099, lng: -157.8581, name: "Pacific Ocean, Hawaii" },
      status: "Swimming",
      heartRate: 28,
      depth: 25,
      speed: 12,
      lastUpdate: "1 second ago",
      batteryLevel: 91,
      signalStrength: 76,
    },
  ]);

  const [globalTracking, setGlobalTracking] = useState({
    totalAnimalsTracked: 15847,
    activeSatellites: 12,
    dataPointsPerSecond: 2847,
    globalCoverage: 94.7,
    uptime: 99.98,
  });

  // Real-time updates
  useEffect(() => {
    const updateTracking = () => {
      setTrackedAnimals((prev) =>
        prev.map((animal) => ({
          ...animal,
          heartRate: Math.max(20, animal.heartRate + Math.floor(Math.random() * 20 - 10)),
          speed: Math.max(0, animal.speed + Math.floor(Math.random() * 10 - 5)),
          batteryLevel: Math.max(
            60,
            Math.min(100, animal.batteryLevel + Math.floor(Math.random() * 4 - 2))
          ),
          signalStrength: Math.max(
            70,
            Math.min(100, animal.signalStrength + Math.floor(Math.random() * 6 - 3))
          ),
          location: {
            ...animal.location,
            lat: animal.location.lat + (Math.random() * 0.01 - 0.005),
            lng: animal.location.lng + (Math.random() * 0.01 - 0.005),
          },
        }))
      );

      setGlobalTracking((prev) => ({
        ...prev,
        dataPointsPerSecond: prev.dataPointsPerSecond + Math.floor(Math.random() * 100 - 50),
        globalCoverage: Math.max(90, Math.min(100, prev.globalCoverage + Math.random() * 2 - 1)),
      }));
    };

    const interval = setInterval(updateTracking, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400 text-center justify-center">
          <Satellite className="h-6 w-6" />
          🛰️ REAL-TIME ANIMAL TRACKING NETWORK
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Global Tracking Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 bg-green-900/30 rounded border border-green-500/20 text-center">
            <Globe className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-400">
              {globalTracking.totalAnimalsTracked.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Animals Tracked</div>
          </div>
          <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20 text-center">
            <Satellite className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-400">{globalTracking.activeSatellites}</div>
            <div className="text-xs text-muted-foreground">Active Satellites</div>
          </div>
          <div className="p-4 bg-purple-900/30 rounded border border-purple-500/20 text-center">
            <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-400">
              {globalTracking.dataPointsPerSecond.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Data Points/sec</div>
          </div>
          <div className="p-4 bg-cyan-900/30 rounded border border-cyan-500/20 text-center">
            <Radar className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-cyan-400">
              {globalTracking.globalCoverage.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Global Coverage</div>
          </div>
          <div className="p-4 bg-yellow-900/30 rounded border border-yellow-500/20 text-center">
            <Monitor className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-400">{globalTracking.uptime}%</div>
            <div className="text-xs text-muted-foreground">Network Uptime</div>
          </div>
        </div>

        {/* Live Animal Tracking */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400 text-center">📡 LIVE ANIMAL MONITORING</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trackedAnimals.map((animal) => (
              <div
                key={animal.id}
                className="p-6 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-cyan-500/30 space-y-4"
              >
                {/* Animal Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400">{animal.name}</h4>
                    <p className="text-sm text-muted-foreground">{animal.species}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <Badge className="bg-green-600 text-white text-xs">LIVE</Badge>
                  </div>
                </div>

                {/* Location */}
                <div className="p-3 bg-green-900/30 rounded border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span className="font-bold text-green-400">Current Location</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{animal.location.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Lat: {animal.location.lat.toFixed(4)}, Lng: {animal.location.lng.toFixed(4)}
                  </div>
                </div>

                {/* Vital Signs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span className="text-sm">Heart Rate</span>
                    </div>
                    <span className="text-red-400 font-bold">{animal.heartRate} BPM</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">Speed</span>
                    </div>
                    <span className="text-blue-400 font-bold">
                      {animal.speed} {animal.species === "Sea Turtle" ? "knots" : "mph"}
                    </span>
                  </div>

                  {animal.altitude && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">Altitude</span>
                      </div>
                      <span className="text-purple-400 font-bold">{animal.altitude} ft</span>
                    </div>
                  )}

                  {animal.depth && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm">Depth</span>
                      </div>
                      <span className="text-cyan-400 font-bold">{animal.depth} ft</span>
                    </div>
                  )}

                  {animal.temperature && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="text-yellow-400 font-bold">{animal.temperature}°C</span>
                    </div>
                  )}
                </div>

                {/* Device Status */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Battery Level:</span>
                    <span className="text-green-400">{animal.batteryLevel}%</span>
                  </div>
                  <Progress value={animal.batteryLevel} className="h-2" />

                  <div className="flex justify-between text-xs">
                    <span>Signal Strength:</span>
                    <span className="text-blue-400">{animal.signalStrength}%</span>
                  </div>
                  <Progress value={animal.signalStrength} className="h-2" />
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400">{animal.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-500/30 text-cyan-400"
                    >
                      <Camera className="h-3 w-3 mr-1" />
                      View Cam
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/30 text-blue-400"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                  </div>
                </div>

                {/* Last Update */}
                <div className="text-xs text-muted-foreground text-center pt-2 border-t border-cyan-500/20">
                  <Radio className="h-3 w-3 inline mr-1" />
                  Last update: {animal.lastUpdate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Satellite Network Visualization */}
        <div className="p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/20">
          <h3 className="text-xl font-bold text-purple-400 text-center mb-6">
            🛰️ GLOBAL SATELLITE NETWORK
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="p-3 bg-blue-900/30 rounded border border-blue-500/20 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Satellite className="h-5 w-5 text-blue-400" />
                  <Signal className="h-3 w-3 text-green-400 ml-1" />
                </div>
                <div className="text-sm font-bold text-blue-400">SAT-{i + 1}</div>
                <div className="text-xs text-muted-foreground">Online</div>
                <div className="text-xs text-green-400">
                  {(85 + Math.random() * 15).toFixed(1)}% Signal
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="text-center p-6 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg border border-green-500/20">
          <h3 className="text-2xl font-bold text-green-400 mb-4">
            🚀 ADVANCED TRACKING TECHNOLOGY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-bold text-blue-400 mb-2">Global Coverage</h4>
              <p className="text-xs text-muted-foreground">
                24/7 monitoring across all continents and oceans
              </p>
            </div>
            <div className="p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <Activity className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h4 className="font-bold text-purple-400 mb-2">Real-Time Health</h4>
              <p className="text-xs text-muted-foreground">
                Heart rate, movement, and behavioral pattern analysis
              </p>
            </div>
            <div className="p-4 bg-cyan-900/30 rounded border border-cyan-500/20">
              <Eye className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <h4 className="font-bold text-cyan-400 mb-2">Live Video Feed</h4>
              <p className="text-xs text-muted-foreground">
                HD camera feeds from every tracked animal
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
