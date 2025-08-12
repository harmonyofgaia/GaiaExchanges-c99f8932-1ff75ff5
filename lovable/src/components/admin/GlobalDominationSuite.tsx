import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Globe,
  Zap,
  Shield,
  Target,
  Rocket,
  DollarSign,
  TrendingUp,
  Users,
  Building,
  Satellite,
  Network,
  Brain,
  Eye,
} from "lucide-react";

interface DominationMetric {
  sector: string;
  control_percentage: number;
  influence_score: number;
  assets_controlled: number;
  revenue_generated: number;
  status: "infiltrating" | "controlling" | "dominated";
}

export function GlobalDominationSuite() {
  const [dominationMetrics, setDominationMetrics] = useState<
    DominationMetric[]
  >([
    {
      sector: "Financial Markets",
      control_percentage: 87,
      influence_score: 94,
      assets_controlled: 2847,
      revenue_generated: 184750000,
      status: "controlling",
    },
    {
      sector: "Social Media Platforms",
      control_percentage: 92,
      influence_score: 98,
      assets_controlled: 15847,
      revenue_generated: 94750000,
      status: "dominated",
    },
    {
      sector: "Government Networks",
      control_percentage: 76,
      influence_score: 83,
      assets_controlled: 547,
      revenue_generated: 54750000,
      status: "controlling",
    },
    {
      sector: "Cryptocurrency Exchanges",
      control_percentage: 94,
      influence_score: 97,
      assets_controlled: 847,
      revenue_generated: 247500000,
      status: "dominated",
    },
    {
      sector: "Tech Giants",
      control_percentage: 68,
      influence_score: 71,
      assets_controlled: 247,
      revenue_generated: 375000000,
      status: "infiltrating",
    },
    {
      sector: "Media Corporations",
      control_percentage: 89,
      influence_score: 91,
      assets_controlled: 1247,
      revenue_generated: 84750000,
      status: "controlling",
    },
    {
      sector: "Educational Institutions",
      control_percentage: 73,
      influence_score: 78,
      assets_controlled: 3847,
      revenue_generated: 24750000,
      status: "controlling",
    },
    {
      sector: "Healthcare Systems",
      control_percentage: 81,
      influence_score: 85,
      assets_controlled: 1847,
      revenue_generated: 147500000,
      status: "controlling",
    },
  ]);

  const [globalStats, setGlobalStats] = useState({
    totalDomination: 84.7,
    worldInfluence: 91.2,
    economicControl: 78.5,
    informationControl: 95.8,
    populationReach: 6.8e9,
    activeOperations: 2847,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time domination progress
      setDominationMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          control_percentage: Math.min(
            100,
            metric.control_percentage + Math.random() * 0.5,
          ),
          influence_score: Math.min(
            100,
            metric.influence_score + Math.random() * 0.3,
          ),
          assets_controlled:
            metric.assets_controlled + Math.floor(Math.random() * 10),
          revenue_generated:
            metric.revenue_generated + Math.floor(Math.random() * 1000000),
        })),
      );

      setGlobalStats((prev) => ({
        ...prev,
        totalDomination: Math.min(
          100,
          prev.totalDomination + Math.random() * 0.1,
        ),
        worldInfluence: Math.min(
          100,
          prev.worldInfluence + Math.random() * 0.05,
        ),
        economicControl: Math.min(
          100,
          prev.economicControl + Math.random() * 0.15,
        ),
        informationControl: Math.min(
          100,
          prev.informationControl + Math.random() * 0.02,
        ),
        populationReach:
          prev.populationReach + Math.floor(Math.random() * 10000),
        activeOperations: prev.activeOperations + Math.floor(Math.random() * 5),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "infiltrating":
        return "bg-yellow-600";
      case "controlling":
        return "bg-orange-600";
      case "dominated":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${amount.toFixed(0)}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Crown className="h-6 w-6" />
            👑 GLOBAL DOMINATION CONTROL CENTER
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Master Control Panel */}
          <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30">
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Globe className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400">
                    {globalStats.totalDomination.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total World Domination
                  </div>
                </div>
                <div className="text-center">
                  <Brain className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">
                    {globalStats.worldInfluence.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Global Influence
                  </div>
                </div>
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">
                    {globalStats.economicControl.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Economic Control
                  </div>
                </div>
                <div className="text-center">
                  <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">
                    {globalStats.informationControl.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Information Control
                  </div>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">
                    {formatNumber(globalStats.populationReach)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Population Reach
                  </div>
                </div>
                <div className="text-center">
                  <Target className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pink-400">
                    {globalStats.activeOperations}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Operations
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sector Domination Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dominationMetrics.map((metric, index) => (
              <Card
                key={index}
                className="bg-black/40 border-gray-600/30 hover:border-yellow-500/50 transition-colors"
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-white">{metric.sector}</h4>
                      <Badge
                        className={`${getStatusColor(metric.status)} text-white text-xs mt-1`}
                      >
                        {metric.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        {metric.control_percentage.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Control
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Control Level</span>
                        <span className="text-yellow-400">
                          {metric.control_percentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={metric.control_percentage}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Influence Score</span>
                        <span className="text-blue-400">
                          {metric.influence_score.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={metric.influence_score}
                        className="h-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Assets</div>
                        <div className="font-bold text-green-400">
                          {metric.assets_controlled.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Revenue</div>
                        <div className="font-bold text-green-400">
                          {formatCurrency(metric.revenue_generated)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Master Domination Progress */}
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardContent className="pt-4">
              <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Master Domination Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-300">
                      World Economic Takeover
                    </span>
                    <span className="text-purple-400">
                      {globalStats.economicControl.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={globalStats.economicControl}
                    className="h-3"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-300">
                      Global Information Control
                    </span>
                    <span className="text-purple-400">
                      {globalStats.informationControl.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={globalStats.informationControl}
                    className="h-3"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-300">
                      Population Influence
                    </span>
                    <span className="text-purple-400">
                      {((globalStats.populationReach / 8e9) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={(globalStats.populationReach / 8e9) * 100}
                    className="h-3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-red-600 hover:bg-red-700 h-16 flex-col">
              <Target className="h-5 w-5 mb-1" />
              <span className="text-xs">Launch Operation</span>
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 h-16 flex-col">
              <Zap className="h-5 w-5 mb-1" />
              <span className="text-xs">Accelerate Takeover</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 h-16 flex-col">
              <TrendingUp className="h-5 w-5 mb-1" />
              <span className="text-xs">Maximize Profits</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex-col">
              <Crown className="h-5 w-5 mb-1" />
              <span className="text-xs">Execute Finale</span>
            </Button>
          </div>

          {/* Global Status */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
            <CardContent className="pt-4">
              <div className="text-center">
                <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  GLOBAL DOMINATION STATUS:{" "}
                  {globalStats.totalDomination.toFixed(1)}% COMPLETE
                </h3>
                <p className="text-green-400">
                  👑 WORLD EMPIRE ESTABLISHMENT IN PROGRESS • TOTAL CONTROL
                  IMMINENT
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
