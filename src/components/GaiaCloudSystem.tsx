import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Zap,
  Globe,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

interface CloudData {
  visibility: number;
  coverage: number;
  type: string;
  height: number;
  weather: string;
  humidity: number;
  temperature: number;
  windSpeed: number;
  gaiaEnergy: number;
}

export function GaiaCloudSystem() {
  const [cloudData, setCloudData] = useState<CloudData>({
    visibility: 85,
    coverage: 65,
    type: "Cumulus",
    height: 2500,
    weather: "Partly Cloudy",
    humidity: 72,
    temperature: 22,
    windSpeed: 15,
    gaiaEnergy: 847,
  });
  const [isCloudVisible, setIsCloudVisible] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCloudData((prev) => ({
        ...prev,
        visibility: Math.max(
          10,
          Math.min(100, prev.visibility + (Math.random() - 0.5) * 5),
        ),
        coverage: Math.max(
          0,
          Math.min(100, prev.coverage + (Math.random() - 0.5) * 3),
        ),
        humidity: Math.max(
          20,
          Math.min(100, prev.humidity + (Math.random() - 0.5) * 2),
        ),
        temperature: Math.max(
          -10,
          Math.min(45, prev.temperature + (Math.random() - 0.5) * 1),
        ),
        windSpeed: Math.max(
          0,
          Math.min(50, prev.windSpeed + (Math.random() - 0.5) * 3),
        ),
        gaiaEnergy: Math.max(
          100,
          Math.min(2000, prev.gaiaEnergy + (Math.random() - 0.5) * 50),
        ),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getCloudIcon = () => {
    if (cloudData.coverage > 80)
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    if (cloudData.coverage > 50)
      return <Cloud className="h-8 w-8 text-gray-400" />;
    return <Sun className="h-8 w-8 text-yellow-400" />;
  };

  const getWeatherDescription = () => {
    if (cloudData.coverage > 80) return "Heavy Clouds";
    if (cloudData.coverage > 60) return "Partly Cloudy";
    if (cloudData.coverage > 30) return "Light Clouds";
    return "Clear Sky";
  };

  const toggleCloudVisibility = () => {
    setIsCloudVisible(!isCloudVisible);
    toast.success(`☁️ Clouds ${!isCloudVisible ? "Visible" : "Hidden"}!`, {
      description: `Cloud visibility set to ${!isCloudVisible ? "ON" : "OFF"}`,
      duration: 2000,
    });
  };

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Cloud className="h-6 w-6" />
          ☁️ GAiA Cloud Visibility System
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge
            className={`${isCloudVisible ? "bg-green-600" : "bg-red-600"} text-white`}
          >
            <Eye className="h-3 w-3 mr-1" />
            {isCloudVisible ? "Visible" : "Hidden"}
          </Badge>
          <Badge className="bg-blue-600 text-white">
            Coverage: {cloudData.coverage.toFixed(1)}%
          </Badge>
          <Badge className="bg-purple-600 text-white">
            Energy: {cloudData.gaiaEnergy}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cloud Visibility Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleCloudVisibility}
            className={`${isCloudVisible ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isCloudVisible ? "Hide Clouds" : "Show Clouds"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setAnimationSpeed(animationSpeed === 1 ? 3 : 1)}
          >
            <Zap className="h-4 w-4 mr-2" />
            Speed: {animationSpeed}x
          </Button>
        </div>

        {/* Cloud Visualization */}
        {isCloudVisible && (
          <div className="relative h-48 bg-gradient-to-t from-green-900/30 to-blue-900/30 rounded-lg border border-cyan-500/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Animated clouds */}
              <div
                className="absolute animate-pulse opacity-80"
                style={{
                  animationDuration: `${4 / animationSpeed}s`,
                  left: `${20 + Math.sin(Date.now() / 2000) * 10}%`,
                  top: "20%",
                }}
              >
                <Cloud className="h-16 w-16 text-white/60" />
              </div>
              <div
                className="absolute animate-pulse opacity-60"
                style={{
                  animationDuration: `${6 / animationSpeed}s`,
                  left: `${60 + Math.cos(Date.now() / 1500) * 15}%`,
                  top: "40%",
                }}
              >
                <Cloud className="h-12 w-12 text-white/40" />
              </div>
              <div
                className="absolute animate-pulse opacity-70"
                style={{
                  animationDuration: `${5 / animationSpeed}s`,
                  left: `${10 + Math.sin(Date.now() / 1800) * 20}%`,
                  top: "60%",
                }}
              >
                <CloudRain className="h-14 w-14 text-blue-300/50" />
              </div>

              {/* Center weather icon */}
              <div className="z-10">{getCloudIcon()}</div>
            </div>

            {/* Visibility overlay */}
            <div
              className="absolute inset-0 bg-gray-800/50 transition-opacity duration-1000"
              style={{ opacity: (100 - cloudData.visibility) / 100 }}
            />
          </div>
        )}

        {/* Weather Data Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Eye className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-cyan-400">
              {cloudData.visibility.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Visibility</div>
            <Progress value={cloudData.visibility} className="h-2 mt-1" />
          </div>

          <div className="text-center">
            <Cloud className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-blue-400">
              {cloudData.coverage.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Coverage</div>
            <Progress value={cloudData.coverage} className="h-2 mt-1" />
          </div>

          <div className="text-center">
            <Thermometer className="h-6 w-6 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold text-red-400">
              {cloudData.temperature.toFixed(1)}°C
            </div>
            <div className="text-sm text-muted-foreground">Temperature</div>
          </div>

          <div className="text-center">
            <Wind className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-green-400">
              {cloudData.windSpeed.toFixed(1)} km/h
            </div>
            <div className="text-sm text-muted-foreground">Wind Speed</div>
          </div>
        </div>

        {/* Additional Weather Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-lg font-bold text-blue-400">
              {cloudData.humidity}%
            </div>
            <div className="text-sm text-muted-foreground">Humidity</div>
          </div>

          <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <Activity className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-lg font-bold text-purple-400">
              {cloudData.gaiaEnergy}
            </div>
            <div className="text-sm text-muted-foreground">GAiA Energy</div>
          </div>
        </div>

        {/* Weather Status */}
        <div className="text-center p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
          <Globe className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
          <h3 className="text-lg font-bold text-cyan-400">
            {getWeatherDescription()}
          </h3>
          <p className="text-sm text-muted-foreground">
            Cloud Type: {cloudData.type}
          </p>
          <p className="text-sm text-muted-foreground">
            Altitude: {cloudData.height}m
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
