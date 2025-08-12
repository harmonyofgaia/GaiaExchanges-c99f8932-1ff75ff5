import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  Settings,
  Database,
  Palette,
  Shield,
} from "lucide-react";

interface Task {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "blocked";
  priority: "high" | "medium" | "low";
  dependencies?: string[];
}

export function TaskTracker() {
  const [tasks] = useState<Task[]>([
    // COMPLETED TASKS
    {
      id: "1",
      category: "Design",
      title: "Custom Harmony of Gaia Logo",
      description:
        "Create brand new NFT marketplace logo with Culture of Harmony designs",
      status: "completed",
      priority: "high",
    },
    {
      id: "2",
      category: "Wallet",
      title: "Phantom Wallet Integration",
      description: "Connect phantom wallet address from approved admin",
      status: "completed",
      priority: "high",
    },
    {
      id: "3",
      category: "Token System",
      title: "Token Burning Circle with Robot",
      description: "Metallic Digital Robot scraping 1000 new coins daily",
      status: "completed",
      priority: "high",
    },
    {
      id: "4",
      category: "Tools",
      title: "Investor Adjustment Tools",
      description:
        "Full adjustment tools for making project interesting to investors",
      status: "completed",
      priority: "high",
    },
    {
      id: "5",
      category: "Landscaping",
      title: "Enhanced Landscaping Tools",
      description: "More powerful landscaping tools than any other platform",
      status: "completed",
      priority: "high",
    },
    {
      id: "6",
      category: "NFTs",
      title: "Living NFT Experience",
      description: "Movie-like experience where you can walk with living NFTs",
      status: "completed",
      priority: "high",
    },
    {
      id: "7",
      category: "UI/UX",
      title: "Compact Layout Design",
      description: "Smaller layout for easy overview and quick NFT discovery",
      status: "completed",
      priority: "medium",
    },
    {
      id: "8",
      category: "NFTs",
      title: "Living Animated NFTs",
      description: "NFTs that live and come alive on the page with emotions",
      status: "completed",
      priority: "high",
    },
    {
      id: "9",
      category: "Landscaping",
      title: "Age-Based Landscape Groups",
      description: "Divide landscapes into age groups: 0-12, 13-16, 17-22, 23+",
      status: "completed",
      priority: "medium",
    },

    // PENDING TASKS
    {
      id: "10",
      category: "Database",
      title: "Fix Supabase Functions Parameters",
      description:
        "4 issues to find and solve with detect functions parameters not set",
      status: "blocked",
      priority: "high",
      dependencies: ["Need specific error details from user"],
    },
    {
      id: "11",
      category: "Content",
      title: "Implement Impressive Visual Designs",
      description: "Add right impressive designs to NFT projects as described",
      status: "pending",
      priority: "medium",
    },
    {
      id: "12",
      category: "Integration",
      title: "Web Research & Updates",
      description:
        "Check web and update tools/landscaping to stay ahead of competition",
      status: "pending",
      priority: "medium",
    },
    {
      id: "13",
      category: "Economy",
      title: "Dynamic Coin Value System",
      description:
        "Implement system where higher coin value = fewer buyers for balance",
      status: "pending",
      priority: "high",
    },
    {
      id: "14",
      category: "Marketing",
      title: "Prevent Marketing Stagnation",
      description:
        "Ensure continuous marketing flow and prevent project stalling",
      status: "pending",
      priority: "high",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-400" />;
      case "blocked":
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default:
        return <Target className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "in-progress":
        return "bg-blue-600";
      case "blocked":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      default:
        return "bg-green-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Design":
        return <Palette className="h-4 w-4" />;
      case "Database":
        return <Database className="h-4 w-4" />;
      case "Tools":
        return <Settings className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.status]) acc[task.status] = [];
      acc[task.status].push(task);
      return acc;
    },
    {} as Record<string, Task[]>,
  );

  return (
    <Card className="border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400 text-center justify-center">
          <Target className="h-6 w-6" />
          📋 PROJECT TASK TRACKER - HARMONY OF GAIA
        </CardTitle>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">
            {completedTasks} / {totalTasks} Tasks Completed
          </div>
          <Progress value={completionPercentage} className="h-4 mb-2" />
          <div className="text-cyan-400">
            {completionPercentage}% Project Complete
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([status, statusTasks]) => (
            <div key={status}>
              <h3 className="text-xl font-bold text-white mb-4 capitalize flex items-center gap-2">
                {getStatusIcon(status)}
                {status.replace("-", " ")} ({statusTasks.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {statusTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(task.category)}
                        <Badge className="bg-purple-600 text-white text-xs">
                          {task.category}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          className={`${getStatusColor(task.status)} text-white text-xs`}
                        >
                          {task.status}
                        </Badge>
                        <Badge
                          className={`${getPriorityColor(task.priority)} text-white text-xs`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <h4 className="font-bold text-white mb-2">{task.title}</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      {task.description}
                    </p>
                    {task.dependencies && (
                      <div className="text-xs text-yellow-400">
                        ⚠️ Blocked: {task.dependencies.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg border border-red-500/30">
          <h3 className="text-2xl font-bold text-red-400 mb-4">
            🚨 URGENT: Supabase Issues Need Attention
          </h3>
          <p className="text-gray-300 mb-4">
            There are 4 Supabase function parameter issues that need to be
            resolved. Please provide specific error messages or details about
            these issues so they can be fixed.
          </p>
          <div className="text-yellow-400">
            📝 Note: Without specific error details, these issues cannot be
            resolved.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
