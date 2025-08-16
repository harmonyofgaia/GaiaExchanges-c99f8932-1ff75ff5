import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TreePine,
  Waves,
  Recycle,
  Sun,
  Heart,
  Globe,
  Leaf,
  Droplets,
  Wind,
  Mountain,
  Fish,
  Flower2,
} from "lucide-react";

interface ImpactMetrics {
  treesPlanted: number;
  carbonOffset: number;
  oceanCleanup: number;
  renewableEnergy: number;
  wildlifeProtected: number;
  plasticRecycled: number;
  waterSaved: number;
  habitatsRestored: number;
}

interface ImpactProject {
  id: string;
  name: string;
  location: string;
  type: "forest" | "ocean" | "wildlife" | "renewable";
  progress: number;
  funded: number;
  target: number;
  description: string;
  impact: string;
}

export function RealWorldImpactTracker() {
  const [metrics, setMetrics] = useState<ImpactMetrics>({
    treesPlanted: 15847,
    carbonOffset: 2847.5,
    oceanCleanup: 12450,
    renewableEnergy: 5420,
    wildlifeProtected: 892,
    plasticRecycled: 18500,
    waterSaved: 2100000,
    habitatsRestored: 47,
  });

  const [projects, setProjects] = useState<ImpactProject[]>([
    {
      id: "1",
      name: "Amazon Rainforest Restoration",
      location: "Brazil",
      type: "forest",
      progress: 78,
      funded: 78500,
      target: 100000,
      description: "Replanting native trees in deforested areas",
      impact: "2,500 trees planted, 150 hectares restored",
    },
    {
      id: "2",
      name: "Pacific Ocean Cleanup",
      location: "Pacific Ocean",
      type: "ocean",
      progress: 65,
      funded: 65000,
      target: 100000,
      description: "Removing plastic waste from ocean gyres",
      impact: "12,450kg plastic removed, 500 marine animals saved",
    },
    {
      id: "3",
      name: "Solar Farm Initiative",
      location: "Morocco",
      type: "renewable",
      progress: 92,
      funded: 92000,
      target: 100000,
      description: "Building solar panels for clean energy",
      impact: "5.4MW clean energy, 2,847 tons CO2 offset",
    },
    {
      id: "4",
      name: "Coral Reef Protection",
      location: "Great Barrier Reef",
      type: "ocean",
      progress: 45,
      funded: 45000,
      target: 100000,
      description: "Coral restoration and protection program",
      impact: "150 coral colonies restored, 25 species protected",
    },
  ]);

  const [userContribution, setUserContribution] = useState({
    gaiaSpent: 2847,
    treesContributed: 47,
    carbonOffset: 125.5,
    rank: "Eco Warrior",
  });

  useEffect(() => {
    // Simulate real-time impact updates
    const updateInterval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        treesPlanted: prev.treesPlanted + Math.floor(Math.random() * 3),
        carbonOffset: prev.carbonOffset + Math.random() * 0.5,
        oceanCleanup: prev.oceanCleanup + Math.floor(Math.random() * 5),
        plasticRecycled: prev.plasticRecycled + Math.floor(Math.random() * 10)
      }));
    }, 10000);

    return () => clearInterval(updateInterval);
  }, []);

  const getProjectIcon = (type: string) => {
    switch (type) {
      case "forest":
        return <TreePine className="h-5 w-5 text-green-400" />;
      case "ocean":
        return <Waves className="h-5 w-5 text-blue-400" />;
      case "wildlife":
        return <Fish className="h-5 w-5 text-purple-400" />;
      case "renewable":
        return <Sun className="h-5 w-5 text-yellow-400" />;
      default:
        return <Leaf className="h-5 w-5 text-green-400" />;
    }
  };

  const getProjectColor = (type: string) => {
    switch (type) {
      case "forest":
        return "from-green-900/30 to-emerald-900/30 border-green-500/30";
      case "ocean":
        return "from-blue-900/30 to-cyan-900/30 border-blue-500/30";
      case "wildlife":
        return "from-purple-900/30 to-pink-900/30 border-purple-500/30";
      case "renewable":
        return "from-yellow-900/30 to-orange-900/30 border-yellow-500/30";
      default:
        return "from-green-900/30 to-emerald-900/30 border-green-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Impact Header */}
      <Card className="bg-gradient-to-br from-green-900/40 to-blue-900/40 border-2 border-green-500/50">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex items-center justify-center gap-2 text-green-400 text-3xl font-bold mb-2">
              <Globe className="h-8 w-8" />
              🌍 REAL WORLD IMPACT TRACKER
            </div>
            <div className="text-lg text-blue-400">
              Every Game • Every Token • Real Environmental Change
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-green-400 mb-2">
              Your Gaming is Healing the Planet! 🌱
            </div>
            <div className="text-muted-foreground">
              Track the real environmental impact of your gaming activities
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30">
          <CardContent className="pt-6 text-center">
            <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-400">
              {metrics.treesPlanted.toLocaleString()}
            </div>
            <div className="text-sm text-green-300">Trees Planted</div>
            <div className="text-xs text-muted-foreground mt-1">
              +{Math.floor(Math.random() * 5) + 1} today
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30">
          <CardContent className="pt-6 text-center">
            <Waves className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-blue-400">
              {metrics.oceanCleanup.toLocaleString()}
            </div>
            <div className="text-sm text-blue-300">kg Ocean Cleaned</div>
            <div className="text-xs text-muted-foreground mt-1">
              +{Math.floor(Math.random() * 50) + 10}kg today
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30">
          <CardContent className="pt-6 text-center">
            <Wind className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-orange-400">
              {metrics.carbonOffset.toFixed(1)}
            </div>
            <div className="text-sm text-orange-300">Tons CO₂ Offset</div>
            <div className="text-xs text-muted-foreground mt-1">
              +{(Math.random() * 2).toFixed(1)} today
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30">
          <CardContent className="pt-6 text-center">
            <Heart className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-400">{metrics.wildlifeProtected}</div>
            <div className="text-sm text-purple-300">Animals Protected</div>
            <div className="text-xs text-muted-foreground mt-1">
              +{Math.floor(Math.random() * 3) + 1} today
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Personal Impact */}
      <Card className="bg-gradient-to-br from-yellow-900/30 to-green-900/30 border border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <Heart className="h-6 w-6" />
            💫 Your Personal Environmental Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
              <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {userContribution.treesContributed}
              </div>
              <div className="text-sm text-green-300">Trees You've Funded</div>
            </div>

            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <Wind className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {userContribution.carbonOffset}
              </div>
              <div className="text-sm text-blue-300">Tons CO₂ Offset</div>
            </div>

            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <Droplets className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{userContribution.gaiaSpent}</div>
              <div className="text-sm text-purple-300">GAIA for Environment</div>
            </div>

            <div className="text-center p-4 bg-orange-900/30 rounded border border-orange-500/20">
              <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-lg px-4 py-2 mb-2">
                {userContribution.rank}
              </Badge>
              <div className="text-sm text-orange-300">Environmental Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Environmental Projects */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-green-900/30 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Mountain className="h-6 w-6" />
            🌿 Active Environmental Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`bg-gradient-to-br ${getProjectColor(project.type)} border`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getProjectIcon(project.type)}
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </div>
                    <Badge className="bg-gray-600 text-white text-xs">{project.location}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">{project.description}</div>

                  {/* Funding Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Funding Progress:</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{project.funded.toLocaleString()} GAIA raised</span>
                      <span>{project.target.toLocaleString()} GAIA target</span>
                    </div>
                  </div>

                  {/* Real Impact */}
                  <div className="p-3 bg-black/30 rounded border border-border/30">
                    <div className="text-sm font-semibold text-green-400 mb-1">
                      🌟 Real Impact Achieved:
                    </div>
                    <div className="text-xs text-muted-foreground">{project.impact}</div>
                  </div>

                  {/* Live Updates */}
                  {Math.random() > 0.5 && (
                    <div className="p-2 bg-green-900/20 rounded border border-green-500/20">
                      <div className="text-xs text-green-400 font-semibold">🔴 LIVE UPDATE:</div>
                      <div className="text-xs text-muted-foreground">
                        New progress recorded {Math.floor(Math.random() * 60)} minutes ago
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Visualization */}
      <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Globe className="h-6 w-6" />
            🗺️ Global Impact Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🌍</div>
            <div className="text-2xl font-bold text-cyan-400 mb-2">
              Your Gaming is Changing the World!
            </div>
            <div className="text-muted-foreground mb-6">
              Real environmental projects funded by the GAIA gaming community across 47 countries
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-green-900/30 rounded">
                <Flower2 className="h-6 w-6 text-green-400 mx-auto mb-1" />
                <div className="font-bold text-green-400">47</div>
                <div className="text-xs text-muted-foreground">Habitats Restored</div>
              </div>
              <div className="p-3 bg-blue-900/30 rounded">
                <Fish className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                <div className="font-bold text-blue-400">892</div>
                <div className="text-xs text-muted-foreground">Marine Animals Saved</div>
              </div>
              <div className="p-3 bg-yellow-900/30 rounded">
                <Sun className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                <div className="font-bold text-yellow-400">5.4MW</div>
                <div className="text-xs text-muted-foreground">Clean Energy Generated</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
