import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Users,
  Target,
  DollarSign,
  Clock,
  Award,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { GAiAProject } from "@/constants/gaia-projects";

interface ProjectDetailsModalProps {
  project: GAiAProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) {
  if (!project) return null;

  const fundingPercentage =
    project.currentFunding && project.fundingGoal
      ? (project.currentFunding / project.fundingGoal) * 100
      : project.progress;

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

  const handleVisitProject = () => {
    // Navigate to specific project pages for your original projects
    const projectRoutes: { [key: string]: string } = {
      "heart-of-gaia": "/heart-of-gaia",
      "techno-soul-solutions": "/techno-soul-solutions",
    };

    if (projectRoutes[project.id]) {
      window.location.href = projectRoutes[project.id];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-green-900/20 to-emerald-900/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-400 flex items-center gap-2">
            <Heart className="h-6 w-6" />
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Category */}
          <div className="flex items-center gap-4 flex-wrap">
            <Badge className={`${getStatusColor(project.status)} text-white`}>
              {project.status.toUpperCase()}
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {project.category}
            </Badge>
            <div className="flex items-center gap-1 text-orange-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{project.deadline}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-green-300/80 text-lg leading-relaxed">
            {project.description}
          </p>

          {/* Location */}
          {project.location && (
            <div className="flex items-center gap-2 text-blue-400">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
          )}

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-green-400">Funding Progress</span>
              <span className="text-green-300">
                {fundingPercentage.toFixed(1)}%
              </span>
            </div>
            <Progress value={fundingPercentage} className="h-4" />
            {project.currentFunding && project.fundingGoal && (
              <div className="flex justify-between text-sm">
                <span className="text-green-400">
                  ${project.currentFunding.toLocaleString()} raised
                </span>
                <span className="text-blue-400">
                  ${project.fundingGoal.toLocaleString()} goal
                </span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-400">
                {project.participants.toLocaleString()}
              </div>
              <div className="text-xs text-blue-300">Participants</div>
            </div>

            <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <Award className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-400">
                {project.reward}
              </div>
              <div className="text-xs text-purple-300">GAiA Reward</div>
            </div>

            <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
              <Target className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div
                className={`text-xl font-bold ${getImpactColor(project.impact)}`}
              >
                {project.impact}
              </div>
              <div className="text-xs text-orange-300">Impact Level</div>
            </div>

            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
              <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-400">
                ${project.fundingGoal?.toLocaleString() || "N/A"}
              </div>
              <div className="text-xs text-green-300">Funding Goal</div>
            </div>
          </div>

          {/* Expected Impact */}
          {project.expectedImpact && (
            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Target className="h-5 w-5" />
                <span className="font-medium">Expected Impact</span>
              </div>
              <p className="text-emerald-300/80">{project.expectedImpact}</p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-green-400/30 text-green-400"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              size="lg"
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Support This Project
            </Button>

            {["heart-of-gaia", "techno-soul-solutions"].includes(
              project.id,
            ) && (
              <Button
                onClick={handleVisitProject}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Visit Project
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
