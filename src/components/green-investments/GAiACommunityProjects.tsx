import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Leaf,
  Users,
  Target,
  DollarSign,
  Clock,
  Award,
  Heart,
  TrendingUp,
  Globe,
  Brain,
  Microscope,
  Star,
} from "lucide-react";
import { GAIA_PROJECTS } from "@/constants/gaia-projects";
import { ProjectDataRestorer } from "./ProjectDataRestorer";
import { toast } from "sonner";

export function GAiACommunityProjects() {
  const [projects, setProjects] = useState(GAIA_PROJECTS);
  const [subscribedProjects, setSubscribedProjects] = useState<Set<string>>(new Set());
  const [showRestorer, setShowRestorer] = useState(false);
  const [restoredData, setRestoredData] = useState<any>(null);

  // Get featured project (neuroregeneration initiative)
  const featuredProject = projects.find((p) => p.isFeatured);
  const regularProjects = projects.filter((p) => !p.isFeatured);

  useEffect(() => {
    // Simulate live funding updates
    const interval = setInterval(() => {
      setProjects((prev) =>
        prev.map((project) => ({
          ...project,
          currentFunding: project.currentFunding
            ? Math.min(
                project.fundingGoal || 0,
                project.currentFunding + Math.floor(Math.random() * 2000)
              )
            : 0,
          participants: project.participants + Math.floor(Math.random() * 5),
        }))
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (projectId: string, projectTitle: string) => {
    setSubscribedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
        toast.success("💔 Unsubscribed", {
          description: `Stopped supporting ${projectTitle}`,
          duration: 3000,
        });
      } else {
        newSet.add(projectId);
        toast.success("💚 Subscribed!", {
          description: `Now supporting ${projectTitle}`,
          duration: 3000,
        });
      }
      return newSet;
    });
  };

  const handleDataRestored = (data: any) => {
    console.log("🌱 Original GAiA project data restored:", data);
    setRestoredData(data);

    // Parse and integrate the restored project data
    if (data && data.data && Array.isArray(data.data)) {
      toast.success("✨ Project information updated!", {
        description: "Your original GAiA projects have been restored",
        duration: 5000,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "completed":
        return "bg-blue-600";
      case "planning":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Very High":
        return "text-red-400";
      case "High":
        return "text-orange-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const renderFeaturedProject = (project: any) => {
    const fundingPercentage = project.fundingGoal
      ? ((project.currentFunding || 0) / project.fundingGoal) * 100
      : 0;
    const isSubscribed = subscribedProjects.has(project.id);

    return (
      <Card className="bg-gradient-to-br from-purple-900/40 to-green-900/40 border-purple-500/50 shadow-2xl shadow-purple-500/20 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white animate-pulse">
              <Star className="h-4 w-4 mr-1" />
              FEATURED RESEARCH
            </Badge>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600">
                <Brain className="h-3 w-3 mr-1" />
                {project.activeResearchers} Active Researchers
              </Badge>
              <Badge className="bg-orange-600">
                <Clock className="h-3 w-3 mr-1" />
                {project.deadline}
              </Badge>
            </div>
          </div>

          <CardTitle className="text-2xl text-purple-400 flex items-center gap-3">
            {isSubscribed && <Heart className="h-6 w-6 text-red-400 animate-pulse" />}
            <Brain className="h-8 w-8 text-green-400" />
            {project.title}
          </CardTitle>

          <p className="text-purple-300/90 text-lg leading-relaxed">{project.description}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="border-purple-500/50 text-purple-300 bg-purple-900/20"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Research Progress Tracking */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-purple-400 mb-3">
              <Microscope className="h-5 w-5" />
              <span className="font-bold">Live Research Tracking</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.researchPhases?.map((phase: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${index < 2 ? "bg-green-400" : "bg-gray-500"}`}
                  />
                  <span className="text-sm text-purple-300">{phase}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-purple-400/70">
              📊 {project.publicationsPlanned} research publications planned • Continuous updates
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-purple-400 font-medium">Research Funding Progress</span>
              <span className="text-purple-300 font-bold">
                {project.currentFunding?.toLocaleString()} / {project.fundingGoal.toLocaleString()}{" "}
                GAiA
              </span>
            </div>
            <Progress value={fundingPercentage} className="h-3" />
            <div className="text-xs text-purple-300/60">
              {fundingPercentage.toFixed(1)}% funded • Perpetual research commitment
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-1 text-blue-400">
              <Users className="h-4 w-4" />
              {project.participants} participants
            </div>
            <div className="flex items-center gap-1 text-purple-400">
              <TrendingUp className="h-4 w-4" />
              {project.reward} GAiA reward
            </div>
            <div className="flex items-center gap-1 text-orange-400">
              <Target className="h-4 w-4" />
              {project.progress}% complete
            </div>
            <div className={`flex items-center gap-1 ${getImpactColor(project.impact)}`}>
              <Award className="h-4 w-4" />
              {project.impact} Impact
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Globe className="h-5 w-5" />
              <span className="font-medium">Revolutionary Impact Potential</span>
            </div>
            <p className="text-emerald-300/90 mb-2">{project.expectedImpact}</p>
            {project.location && (
              <p className="text-xs text-emerald-400/60">🌍 {project.location}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleSubscribe(project.id, project.title)}
              className={`flex-1 ${
                isSubscribed
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700"
              }`}
              size="lg"
            >
              <Heart className={`h-5 w-5 mr-2 ${isSubscribed ? "fill-current" : ""}`} />
              {isSubscribed ? "Unsubscribe" : "Subscribe & Support Research"}
            </Button>
            <Button
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-900/20"
              size="lg"
            >
              <Brain className="h-5 w-5 mr-2" />
              Research Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderRegularProject = (project: any) => {
    const fundingPercentage = project.fundingGoal
      ? ((project.currentFunding || 0) / project.fundingGoal) * 100
      : 0;
    const isSubscribed = subscribedProjects.has(project.id);

    return (
      <Card
        key={project.id}
        className={`bg-gradient-to-br from-green-900/30 to-purple-900/30 border-green-500/30 transition-all duration-300 hover:scale-105 ${
          isSubscribed ? "ring-2 ring-green-400/50 shadow-lg shadow-green-400/20" : ""
        }`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className={`${getStatusColor(project.status)} text-white`}>
              {project.status.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-orange-400">{project.deadline}</span>
            </div>
          </div>
          <CardTitle className="text-green-400 flex items-center gap-2">
            {isSubscribed && <Heart className="h-5 w-5 text-red-400 animate-pulse" />}
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-green-300/80">{project.description}</p>

          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-purple-500/50 text-purple-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {project.fundingGoal && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Funding Progress</span>
                <span className="text-green-300">
                  {project.currentFunding?.toLocaleString()} /{" "}
                  {project.fundingGoal.toLocaleString()} GAiA
                </span>
              </div>
              <Progress value={fundingPercentage} className="h-2" />
              <div className="text-xs text-green-300/60">
                {fundingPercentage.toFixed(1)}% funded
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-1 text-blue-400">
              <Users className="h-4 w-4" />
              {project.participants} participants
            </div>
            <div className="flex items-center gap-1 text-purple-400">
              <TrendingUp className="h-4 w-4" />
              {project.reward} GAiA reward
            </div>
            <div className="flex items-center gap-1 text-orange-400">
              <Target className="h-4 w-4" />
              {project.progress}% complete
            </div>
            <div className={`flex items-center gap-1 ${getImpactColor(project.impact)}`}>
              <Award className="h-4 w-4" />
              {project.impact} Impact
            </div>
          </div>

          {project.expectedImpact && (
            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Globe className="h-4 w-4" />
                <span className="font-medium">Expected Impact</span>
              </div>
              <p className="text-sm text-emerald-300/80">{project.expectedImpact}</p>
              {project.location && (
                <p className="text-xs text-emerald-400/60 mt-1">📍 {project.location}</p>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => handleSubscribe(project.id, project.title)}
              className={`flex-1 ${
                isSubscribed ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              }`}
              size="sm"
            >
              <Heart className={`h-4 w-4 mr-1 ${isSubscribed ? "fill-current" : ""}`} />
              {isSubscribed ? "Unsubscribe" : "Subscribe & Support"}
            </Button>
            <Button
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-900/20"
              size="sm"
            >
              <Leaf className="h-4 w-4 mr-1" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          🌱 GAiA SOUL PROJECTS - HARMONY ECOSYSTEM
        </h2>
        <p className="text-green-300 text-lg">
          Original creative projects from the Culture of Harmony • Environmental Impact • Community
          Driven
        </p>
        <div className="text-sm text-purple-400 mt-2">
          ✨ Subscribed to {subscribedProjects.size} projects • Supporting Global Harmony
        </div>

        <Button
          onClick={() => setShowRestorer(!showRestorer)}
          className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <Leaf className="h-4 w-4 mr-2" />
          {showRestorer ? "Hide" : "Restore Original Project Data"}
        </Button>
      </div>

      {showRestorer && <ProjectDataRestorer onDataRestored={handleDataRestored} />}

      {restoredData && (
        <Card className="border-emerald-500/50 bg-gradient-to-r from-emerald-900/30 to-green-900/30">
          <CardContent className="pt-4">
            <div className="text-center text-emerald-400">
              <Globe className="h-8 w-8 mx-auto mb-2" />
              <div className="text-lg font-bold">✨ Original Data Successfully Restored!</div>
              <div className="text-sm text-emerald-300/80 mt-1">
                Your authentic GAiA project information is now active
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Featured Project - Neuroregeneration Initiative */}
      {featuredProject && (
        <div>
          <div className="text-center mb-6">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-2 animate-pulse">
              <Star className="h-4 w-4 mr-1" />
              FEATURED BREAKTHROUGH RESEARCH
            </Badge>
            <h3 className="text-2xl font-bold text-purple-400">Bio-Inspired Neuroregeneration</h3>
            <p className="text-muted-foreground mt-2">
              Revolutionary research combining plant biology with human neural recovery
            </p>
          </div>
          {renderFeaturedProject(featuredProject)}
        </div>
      )}

      {/* Regular Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularProjects.map((project) => renderRegularProject(project))}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700"
        >
          <Target className="h-5 w-5 mr-2" />
          Explore All GAiA Soul Projects
        </Button>
      </div>
    </div>
  );
}
