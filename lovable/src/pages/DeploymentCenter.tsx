import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Rocket,
  Globe,
  Server,
  Code,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

interface DeploymentStatus {
  stage: string;
  progress: number;
  status: "pending" | "active" | "completed" | "error";
  message: string;
}

export function DeploymentCenter() {
  const [deploymentStages, setDeploymentStages] = useState<DeploymentStatus[]>([
    {
      stage: "Code Compilation",
      progress: 100,
      status: "completed",
      message: "Successfully compiled",
    },
    {
      stage: "Security Scanning",
      progress: 100,
      status: "completed",
      message: "All security checks passed",
    },
    {
      stage: "Testing Suite",
      progress: 85,
      status: "active",
      message: "Running integration tests...",
    },
    {
      stage: "Production Build",
      progress: 0,
      status: "pending",
      message: "Waiting for tests to complete",
    },
    {
      stage: "Live Deployment",
      progress: 0,
      status: "pending",
      message: "Ready to deploy",
    },
  ]);

  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentAssistantActive, setDeploymentAssistantActive] =
    useState(false);

  useEffect(() => {
    console.log("🚀 DEPLOYMENT CENTER - Advanced CI/CD Pipeline Active");
    console.log("🛡️ Security-First Deployment Protocol Engaged");
    console.log("⚡ Automated Quality Assurance Running");

    // Simulate deployment progress updates
    const deploymentInterval = setInterval(() => {
      setDeploymentStages((prev) =>
        prev.map((stage) => {
          if (stage.status === "active" && stage.progress < 100) {
            const newProgress = Math.min(
              stage.progress + Math.random() * 5,
              100,
            );
            const newStatus = newProgress >= 100 ? "completed" : "active";
            const newMessage =
              newProgress >= 100
                ? `${stage.stage} completed successfully`
                : `${stage.stage} in progress... ${newProgress.toFixed(0)}%`;

            return {
              ...stage,
              progress: newProgress,
              status: newStatus,
              message: newMessage,
            };
          }
          return stage;
        }),
      );
    }, 2000);

    return () => clearInterval(deploymentInterval);
  }, []);

  const activateDeploymentAssistant = () => {
    setDeploymentAssistantActive(true);
    toast.success("🤖 Deployment Assistant Activated!", {
      description: "AI-powered deployment monitoring and optimization active",
      duration: 4000,
    });
    console.log("🤖 DEPLOYMENT ASSISTANT - AI Monitoring Activated");
  };

  const startDeployment = async () => {
    setIsDeploying(true);

    try {
      toast.success("🚀 Deployment Initiated!", {
        description: "Advanced deployment pipeline starting...",
        duration: 5000,
      });

      // Simulate deployment process
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Update stages to show deployment progress
      setDeploymentStages((prev) =>
        prev.map((stage, index) => ({
          ...stage,
          progress: index < 3 ? 100 : stage.progress,
          status: index < 3 ? "completed" : stage.status,
        })),
      );

      toast.success("✅ Deployment Successful!", {
        description: "Your application has been deployed to production",
        duration: 6000,
      });
    } catch (error) {
      toast.error("❌ Deployment Failed");
      console.error("Deployment error:", error);
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "active":
        return <Activity className="h-5 w-5 text-blue-400 animate-pulse" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "active":
        return "text-blue-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                🚀 DEPLOYMENT CENTER
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Advanced CI/CD Pipeline • Security-First • AI-Powered Deployment
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="pipeline" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pipeline">🔄 Pipeline</TabsTrigger>
              <TabsTrigger value="monitoring">📊 Monitoring</TabsTrigger>
              <TabsTrigger value="security">🛡️ Security</TabsTrigger>
              <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="pipeline" className="space-y-6">
              {/* Deployment Status */}
              <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Rocket className="h-6 w-6" />
                    🔄 Deployment Pipeline Status
                  </CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Badge
                      className={
                        deploymentAssistantActive
                          ? "bg-green-600 animate-pulse"
                          : "bg-gray-600"
                      }
                    >
                      AI ASSISTANT{" "}
                      {deploymentAssistantActive ? "ACTIVE" : "STANDBY"}
                    </Badge>
                    <Badge className="bg-blue-600">AUTOMATED</Badge>
                    <Badge className="bg-purple-600">SECURE</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deploymentStages.map((stage, index) => (
                    <div
                      key={index}
                      className="p-4 bg-black/20 rounded-lg border border-gray-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(stage.status)}
                          <span
                            className={`font-medium ${getStatusColor(stage.status)}`}
                          >
                            {stage.stage}
                          </span>
                        </div>
                        <Badge
                          className={
                            stage.status === "completed"
                              ? "bg-green-600"
                              : stage.status === "active"
                                ? "bg-blue-600 animate-pulse"
                                : stage.status === "error"
                                  ? "bg-red-600"
                                  : "bg-gray-600"
                          }
                        >
                          {stage.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="mb-2">
                        <Progress value={stage.progress} className="h-2" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stage.message}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Deployment Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400">
                      🤖 AI Deployment Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Activate AI-powered deployment monitoring and optimization
                    </p>
                    <Button
                      onClick={activateDeploymentAssistant}
                      disabled={deploymentAssistantActive}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {deploymentAssistantActive ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Assistant Active
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Activate Assistant
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400">
                      🚀 Deploy to Production
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Deploy your application to production environment
                    </p>
                    <Button
                      onClick={startDeployment}
                      disabled={isDeploying}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isDeploying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Rocket className="h-4 w-4 mr-2" />
                          Deploy Now
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">
                    📊 System Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                    <p className="text-lg">Real-time monitoring dashboard</p>
                    <p className="text-sm">
                      Track performance, uptime, and system health
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-400">
                    🛡️ Security Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Shield className="h-16 w-16 mx-auto mb-4 text-red-400" />
                    <p className="text-lg">Advanced security scanning</p>
                    <p className="text-sm">
                      Vulnerability assessment and protection
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">
                    📈 Deployment Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Code className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                    <p className="text-lg">Performance analytics</p>
                    <p className="text-sm">Deployment metrics and insights</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default DeploymentCenter;
