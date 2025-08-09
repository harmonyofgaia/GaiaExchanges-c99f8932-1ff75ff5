import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Database,
  TrendingUp,
  Zap,
  Globe,
  Activity,
  Eye,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb,
  Waves,
  TreePine,
  Wind,
  Droplets,
  Target,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface DataStream {
  id: string;
  name: string;
  type: "environmental" | "economic" | "social" | "technological";
  status: "active" | "processing" | "error";
  lastUpdate: Date;
  dataPoints: number;
  accuracy: number;
  impact: "high" | "medium" | "low";
}

interface PredictionModel {
  id: string;
  name: string;
  category: string;
  accuracy: number;
  confidence: number;
  timeframe: string;
  status: "active" | "training" | "validating";
  predictions: number;
  lastRun: Date;
}

interface GeneratedIdea {
  id: string;
  title: string;
  description: string;
  category:
    | "conservation"
    | "renewable_energy"
    | "waste_reduction"
    | "innovation";
  feasibilityScore: number;
  impactScore: number;
  resourceRequirement: "low" | "medium" | "high";
  timeToImplement: string;
  predictedBenefit: string;
  generatedAt: Date;
  status: "new" | "reviewed" | "approved" | "implementing";
}

export function PsychohistoricalEngine() {
  const [dataStreams, setDataStreams] = useState<DataStream[]>([]);
  const [predictionModels, setPredictionModels] = useState<PredictionModel[]>(
    [],
  );
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    isScanning: false,
    isGenerating: false,
    totalDataPoints: 0,
    activePredictions: 0,
    dailyIdeas: 0,
  });

  useEffect(() => {
    initializeDataStreams();
    initializePredictionModels();
    initializeGeneratedIdeas();
    startRealTimeUpdates();
  }, []);

  const initializeDataStreams = () => {
    const streams: DataStream[] = [
      {
        id: "climate-1",
        name: "Global Climate Monitoring",
        type: "environmental",
        status: "active",
        lastUpdate: new Date(),
        dataPoints: 2847629,
        accuracy: 94.2,
        impact: "high",
      },
      {
        id: "ocean-1",
        name: "Ocean Health Tracking",
        type: "environmental",
        status: "active",
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
        dataPoints: 1592847,
        accuracy: 91.7,
        impact: "high",
      },
      {
        id: "energy-1",
        name: "Renewable Energy Markets",
        type: "economic",
        status: "processing",
        lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
        dataPoints: 892637,
        accuracy: 88.4,
        impact: "medium",
      },
      {
        id: "social-1",
        name: "Environmental Behavior Patterns",
        type: "social",
        status: "active",
        lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
        dataPoints: 456789,
        accuracy: 85.9,
        impact: "medium",
      },
      {
        id: "tech-1",
        name: "Green Technology Innovation",
        type: "technological",
        status: "active",
        lastUpdate: new Date(Date.now() - 3 * 60 * 1000),
        dataPoints: 234567,
        accuracy: 92.1,
        impact: "high",
      },
    ];
    setDataStreams(streams);
  };

  const initializePredictionModels = () => {
    const models: PredictionModel[] = [
      {
        id: "model-1",
        name: "Climate Impact Forecasting",
        category: "Environmental Crisis Prevention",
        accuracy: 87.3,
        confidence: 94.1,
        timeframe: "6-12 months",
        status: "active",
        predictions: 1247,
        lastRun: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        id: "model-2",
        name: "Resource Scarcity Prediction",
        category: "Sustainability Planning",
        accuracy: 83.7,
        confidence: 89.5,
        timeframe: "1-3 years",
        status: "active",
        predictions: 892,
        lastRun: new Date(Date.now() - 8 * 60 * 1000),
      },
      {
        id: "model-3",
        name: "Green Innovation Opportunity Detection",
        category: "Technology Development",
        accuracy: 91.2,
        confidence: 96.3,
        timeframe: "3-6 months",
        status: "training",
        predictions: 634,
        lastRun: new Date(Date.now() - 25 * 60 * 1000),
      },
    ];
    setPredictionModels(models);
  };

  const initializeGeneratedIdeas = () => {
    const ideas: GeneratedIdea[] = [
      {
        id: "idea-1",
        title: "Algae-Based Carbon Capture Pods",
        description:
          "Develop floating algae cultivation systems for ocean carbon sequestration",
        category: "conservation",
        feasibilityScore: 82,
        impactScore: 94,
        resourceRequirement: "high",
        timeToImplement: "18-24 months",
        predictedBenefit: "2.5M tons CO₂ annually",
        generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "new",
      },
      {
        id: "idea-2",
        title: "Community Micro-Wind Networks",
        description:
          "Distributed small-scale wind turbines for neighborhood energy independence",
        category: "renewable_energy",
        feasibilityScore: 76,
        impactScore: 88,
        resourceRequirement: "medium",
        timeToImplement: "12-18 months",
        predictedBenefit: "40% energy independence",
        generatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: "reviewed",
      },
      {
        id: "idea-3",
        title: "AI-Optimized Waste Sorting Hubs",
        description:
          "Machine learning-powered automated waste processing centers",
        category: "waste_reduction",
        feasibilityScore: 91,
        impactScore: 85,
        resourceRequirement: "medium",
        timeToImplement: "6-12 months",
        predictedBenefit: "85% recycling efficiency",
        generatedAt: new Date(Date.now() - 30 * 60 * 1000),
        status: "approved",
      },
    ];
    setGeneratedIdeas(ideas);
  };

  const startRealTimeUpdates = () => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setSystemStatus((prev) => ({
        ...prev,
        totalDataPoints:
          prev.totalDataPoints + Math.floor(Math.random() * 1000),
        activePredictions:
          prev.activePredictions + Math.floor(Math.random() * 5),
        dailyIdeas: prev.dailyIdeas + Math.floor(Math.random() * 3),
      }));

      // Update data stream last update times
      setDataStreams((prev) =>
        prev.map((stream) => ({
          ...stream,
          lastUpdate: Math.random() > 0.7 ? new Date() : stream.lastUpdate,
          dataPoints: stream.dataPoints + Math.floor(Math.random() * 1000),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  };

  const triggerDataScan = () => {
    setSystemStatus((prev) => ({ ...prev, isScanning: true }));
    toast.success("Global data scan initiated", {
      description: "Scanning environmental data from 847 sources worldwide",
    });

    setTimeout(() => {
      setSystemStatus((prev) => ({ ...prev, isScanning: false }));
      toast.success("Data scan complete", {
        description: "Processed 2.3M new data points",
      });
    }, 3000);
  };

  const generateNewIdeas = () => {
    setSystemStatus((prev) => ({ ...prev, isGenerating: true }));
    toast.success("AI idea generation started", {
      description: "Analyzing patterns to generate environmental solutions",
    });

    setTimeout(() => {
      const newIdea: GeneratedIdea = {
        id: `idea-${Date.now()}`,
        title: "Biodegradable Plastic from Seaweed Extract",
        description:
          "Revolutionary plastic alternative using abundant ocean seaweed resources",
        category: "innovation",
        feasibilityScore: 79,
        impactScore: 92,
        resourceRequirement: "medium",
        timeToImplement: "8-15 months",
        predictedBenefit: "60% plastic waste reduction",
        generatedAt: new Date(),
        status: "new",
      };

      setGeneratedIdeas((prev) => [newIdea, ...prev]);
      setSystemStatus((prev) => ({
        ...prev,
        isGenerating: false,
        dailyIdeas: prev.dailyIdeas + 1,
      }));

      toast.success("New environmental solution generated!", {
        description: newIdea.title,
      });
    }, 4000);
  };

  const getStreamIcon = (type: string) => {
    switch (type) {
      case "environmental":
        return <TreePine className="h-4 w-4" />;
      case "economic":
        return <BarChart3 className="h-4 w-4" />;
      case "social":
        return <Users className="h-4 w-4" />;
      case "technological":
        return <Zap className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getStreamColor = (type: string) => {
    switch (type) {
      case "environmental":
        return "border-green-500/50 text-green-400";
      case "economic":
        return "border-blue-500/50 text-blue-400";
      case "social":
        return "border-purple-500/50 text-purple-400";
      case "technological":
        return "border-yellow-500/50 text-yellow-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "processing":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      case "training":
        return "text-blue-400";
      case "validating":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "conservation":
        return <TreePine className="h-4 w-4" />;
      case "renewable_energy":
        return <Zap className="h-4 w-4" />;
      case "waste_reduction":
        return <Wind className="h-4 w-4" />;
      case "innovation":
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-400">
              Global Data Scanning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-400" />
                <span className="text-lg font-bold text-green-400">
                  {(systemStatus.totalDataPoints + 5247839).toLocaleString()}
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-green-500/50 text-green-400"
              >
                Active
              </Badge>
            </div>
            <Button
              onClick={triggerDataScan}
              disabled={systemStatus.isScanning}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {systemStatus.isScanning ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Scanning Global Data...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Initiate Data Scan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-400">
              AI Idea Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-400" />
                <span className="text-lg font-bold text-blue-400">
                  {systemStatus.dailyIdeas + 47} today
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-blue-500/50 text-blue-400"
              >
                Generating
              </Badge>
            </div>
            <Button
              onClick={generateNewIdeas}
              disabled={systemStatus.isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {systemStatus.isGenerating ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate New Ideas
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Streams Monitoring */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Waves className="h-5 w-5" />
            Global Data Streams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataStreams.map((stream) => (
              <div
                key={stream.id}
                className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-gray-500/20"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-black/30 border ${getStreamColor(stream.type)}`}
                  >
                    {getStreamIcon(stream.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{stream.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {stream.dataPoints.toLocaleString()} data points
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(
                          (Date.now() - stream.lastUpdate.getTime()) /
                            1000 /
                            60,
                        )}
                        m ago
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-medium ${getStatusColor(stream.status)}`}
                  >
                    {stream.accuracy}% accuracy
                  </div>
                  <Badge
                    variant="outline"
                    className={`mt-1 ${getStreamColor(stream.type)}`}
                  >
                    {stream.impact} impact
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prediction Models */}
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <TrendingUp className="h-5 w-5" />
            Active Prediction Models
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {predictionModels.map((model) => (
              <div
                key={model.id}
                className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white mb-1">
                      {model.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {model.category}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(model.status)} border-current`}
                  >
                    {model.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Accuracy
                    </div>
                    <div className="font-bold text-green-400">
                      {model.accuracy}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Confidence
                    </div>
                    <div className="font-bold text-blue-400">
                      {model.confidence}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Predictions
                    </div>
                    <div className="font-bold text-purple-400">
                      {model.predictions}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Timeframe
                    </div>
                    <div className="font-bold text-yellow-400">
                      {model.timeframe}
                    </div>
                  </div>
                </div>
                <Progress value={model.accuracy} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generated Ideas */}
      <Card className="border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Lightbulb className="h-5 w-5" />
            Recently Generated Environmental Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generatedIdeas.map((idea) => (
              <div
                key={idea.id}
                className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-white">{idea.title}</h4>
                      <Badge
                        variant="outline"
                        className="border-cyan-500/50 text-cyan-400"
                      >
                        {getCategoryIcon(idea.category)}
                        {idea.category.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {idea.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Feasibility:{" "}
                        </span>
                        <span className="font-bold text-green-400">
                          {idea.feasibilityScore}%
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impact: </span>
                        <span className="font-bold text-blue-400">
                          {idea.impactScore}%
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Resources:{" "}
                        </span>
                        <span className="font-bold text-purple-400">
                          {idea.resourceRequirement}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Timeline:{" "}
                        </span>
                        <span className="font-bold text-yellow-400">
                          {idea.timeToImplement}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <Badge
                      variant="outline"
                      className={
                        idea.status === "approved"
                          ? "border-green-500/50 text-green-400"
                          : idea.status === "reviewed"
                            ? "border-blue-500/50 text-blue-400"
                            : "border-yellow-500/50 text-yellow-400"
                      }
                    >
                      {idea.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-2">
                      Generated{" "}
                      {Math.floor(
                        (Date.now() - idea.generatedAt.getTime()) / 1000 / 60,
                      )}
                      m ago
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-3 rounded-lg">
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Predicted Benefit:{" "}
                    </span>
                    <span className="font-bold text-green-400">
                      {idea.predictedBenefit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
