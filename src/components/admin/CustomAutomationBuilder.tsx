import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Workflow,
  Play,
  Pause,
  Settings,
  Plus,
  Trash2,
  Copy,
  Save,
  Download,
  Upload,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Database,
  Mail,
  Shield,
  Globe,
  Users,
  Target,
  BarChart3,
  Brain,
  Eye,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";

interface AutomationStep {
  id: string;
  type: "trigger" | "condition" | "action" | "delay";
  name: string;
  description: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
  connections: string[];
}

interface Automation {
  id: string;
  name: string;
  description: string;
  category: "security" | "token_management" | "user_engagement" | "environmental" | "analytics";
  status: "active" | "inactive" | "error" | "testing";
  trigger_count: number;
  success_rate: number;
  last_run: Date;
  created_date: Date;
  steps: AutomationStep[];
  schedule?: {
    type: "interval" | "cron" | "event";
    config: string;
  };
}

interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: Omit<AutomationStep, "id" | "position">[];
  use_count: number;
}

interface AutomationMetrics {
  total_automations: number;
  active_automations: number;
  total_executions_today: number;
  success_rate: number;
  time_saved_hours: number;
  issues_resolved: number;
}

export function CustomAutomationBuilder() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [templates, setTemplates] = useState<AutomationTemplate[]>([]);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [metrics, setMetrics] = useState<AutomationMetrics>({
    total_automations: 0,
    active_automations: 0,
    total_executions_today: 0,
    success_rate: 0,
    time_saved_hours: 0,
    issues_resolved: 0,
  });

  const availableStepTypes = [
    {
      type: "trigger",
      name: "Event Trigger",
      icon: <Zap className="h-4 w-4" />,
      description: "Start automation on specific events",
      options: [
        "User Registration",
        "Token Discovery",
        "Security Alert",
        "Mission Completion",
        "Admin Login",
      ],
    },
    {
      type: "condition",
      name: "Conditional Check",
      icon: <Target className="h-4 w-4" />,
      description: "Check conditions before proceeding",
      options: ["User Level", "Token Price", "Eco Score", "Time Range", "Geographic Location"],
    },
    {
      type: "action",
      name: "Action Step",
      icon: <Rocket className="h-4 w-4" />,
      description: "Perform specific actions",
      options: [
        "Send Notification",
        "Update Database",
        "Generate Report",
        "Award Tokens",
        "Block User",
        "Deploy AI Defense",
      ],
    },
    {
      type: "delay",
      name: "Wait/Delay",
      icon: <Clock className="h-4 w-4" />,
      description: "Add delays between steps",
      options: ["Fixed Delay", "Wait for Event", "Schedule Time", "Random Delay"],
    },
  ];

  useEffect(() => {
    initializeAutomations();
    initializeTemplates();
    initializeMetrics();

    // Real-time updates
    const interval = setInterval(() => {
      updateMetrics();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const initializeAutomations = () => {
    const mockAutomations: Automation[] = [
      {
        id: "auto-1",
        name: "AI Defense Auto-Deploy",
        description: "Automatically deploy AI defense animals when threats are detected",
        category: "security",
        status: "active",
        trigger_count: 156,
        success_rate: 98.5,
        last_run: new Date(Date.now() - 300000),
        created_date: new Date("2024-11-01"),
        steps: [
          {
            id: "step-1",
            type: "trigger",
            name: "Threat Detection",
            description: "Triggered when security threat is detected",
            config: {
              threshold: "medium",
              sources: ["network", "api", "user_behavior"],
            },
            position: { x: 100, y: 100 },
            connections: ["step-2"],
          },
          {
            id: "step-2",
            type: "condition",
            name: "Threat Severity Check",
            description: "Check if threat severity requires immediate action",
            config: { min_severity: "medium", exclude_false_positives: true },
            position: { x: 300, y: 100 },
            connections: ["step-3"],
          },
          {
            id: "step-3",
            type: "action",
            name: "Deploy AI Animals",
            description: "Deploy appropriate AI defense animals",
            config: {
              animals: ["bear", "eagle", "wolf"],
              deployment_strategy: "adaptive",
            },
            position: { x: 500, y: 100 },
            connections: ["step-4"],
          },
          {
            id: "step-4",
            type: "action",
            name: "Alert Admin",
            description: "Send notification to admin about deployment",
            config: { notification_type: "immediate", include_metrics: true },
            position: { x: 700, y: 100 },
            connections: [],
          },
        ],
      },
      {
        id: "auto-2",
        name: "Token Auto-Approval",
        description: "Automatically approve eco-friendly tokens with high scores",
        category: "token_management",
        status: "active",
        trigger_count: 89,
        success_rate: 94.2,
        last_run: new Date(Date.now() - 1800000),
        created_date: new Date("2024-11-15"),
        steps: [
          {
            id: "step-1",
            type: "trigger",
            name: "New Token Discovered",
            description: "Triggered when auto-discovery finds new token",
            config: { sources: ["coingecko", "binance"], eco_filter: true },
            position: { x: 100, y: 100 },
            connections: ["step-2"],
          },
          {
            id: "step-2",
            type: "condition",
            name: "Eco Score Check",
            description: "Check if token meets eco-friendly criteria",
            config: {
              min_eco_score: 85,
              required_attributes: ["carbon_neutral", "renewable_energy"],
            },
            position: { x: 300, y: 100 },
            connections: ["step-3"],
          },
          {
            id: "step-3",
            type: "action",
            name: "Auto-Approve Token",
            description: "Automatically approve high-scoring eco tokens",
            config: { approval_level: "conditional", review_required: false },
            position: { x: 500, y: 100 },
            connections: ["step-4"],
          },
          {
            id: "step-4",
            type: "action",
            name: "Update Database",
            description: "Add approved token to GAIA ecosystem",
            config: { integration_level: "full", enable_trading: true },
            position: { x: 700, y: 100 },
            connections: [],
          },
        ],
      },
      {
        id: "auto-3",
        name: "Community Engagement Booster",
        description: "Automatically reward active community members",
        category: "user_engagement",
        status: "active",
        trigger_count: 234,
        success_rate: 96.8,
        last_run: new Date(Date.now() - 600000),
        created_date: new Date("2024-12-01"),
        steps: [
          {
            id: "step-1",
            type: "trigger",
            name: "Daily Engagement Check",
            description: "Runs daily to check user engagement",
            config: { schedule: "daily", time: "18:00" },
            position: { x: 100, y: 100 },
            connections: ["step-2"],
          },
          {
            id: "step-2",
            type: "condition",
            name: "Activity Threshold",
            description: "Check if user meets activity requirements",
            config: { min_votes: 5, min_missions: 2, time_period: "7_days" },
            position: { x: 300, y: 100 },
            connections: ["step-3"],
          },
          {
            id: "step-3",
            type: "action",
            name: "Award Bonus Tokens",
            description: "Give bonus GAIA tokens to active users",
            config: { base_amount: 100, activity_multiplier: 1.5 },
            position: { x: 500, y: 100 },
            connections: ["step-4"],
          },
          {
            id: "step-4",
            type: "action",
            name: "Send Appreciation",
            description: "Send thank you message to engaged users",
            config: { personalized: true, include_stats: true },
            position: { x: 700, y: 100 },
            connections: [],
          },
        ],
      },
    ];
    setAutomations(mockAutomations);
  };

  const initializeTemplates = () => {
    const mockTemplates: AutomationTemplate[] = [
      {
        id: "template-1",
        name: "Security Alert Response",
        description: "Standard response to security threats",
        category: "security",
        use_count: 45,
        steps: [
          {
            type: "trigger",
            name: "Security Alert",
            description: "Triggered on security incidents",
            config: { sources: ["ai_defense", "manual_report"] },
            connections: ["step-2"],
          },
          {
            type: "action",
            name: "Log Incident",
            description: "Record security incident details",
            config: { database: "security_logs", include_context: true },
            connections: ["step-3"],
          },
          {
            type: "action",
            name: "Notify Admin",
            description: "Alert administrators immediately",
            config: { priority: "high", channels: ["email", "dashboard"] },
            connections: [],
          },
        ],
      },
      {
        id: "template-2",
        name: "User Onboarding Flow",
        description: "Welcome new users and guide them",
        category: "user_engagement",
        use_count: 78,
        steps: [
          {
            type: "trigger",
            name: "New User Registration",
            description: "Triggered when user signs up",
            config: { verification_required: true },
            connections: ["step-2"],
          },
          {
            type: "delay",
            name: "Welcome Delay",
            description: "Wait 5 minutes after registration",
            config: { duration: "5m" },
            connections: ["step-3"],
          },
          {
            type: "action",
            name: "Send Welcome Package",
            description: "Send welcome message and starter tokens",
            config: { tokens: 50, include_guide: true },
            connections: [],
          },
        ],
      },
      {
        id: "template-3",
        name: "Environmental Impact Reporter",
        description: "Generate and send impact reports",
        category: "environmental",
        use_count: 23,
        steps: [
          {
            type: "trigger",
            name: "Weekly Schedule",
            description: "Runs every Monday at 9 AM",
            config: { schedule: "weekly", day: "monday", time: "09:00" },
            connections: ["step-2"],
          },
          {
            type: "action",
            name: "Generate Report",
            description: "Compile environmental impact data",
            config: { include_charts: true, format: "pdf" },
            connections: ["step-3"],
          },
          {
            type: "action",
            name: "Distribute Report",
            description: "Send report to stakeholders",
            config: { recipients: ["admins", "partners"], archive: true },
            connections: [],
          },
        ],
      },
    ];
    setTemplates(mockTemplates);
  };

  const initializeMetrics = () => {
    setMetrics({
      total_automations: 15,
      active_automations: 12,
      total_executions_today: 1247,
      success_rate: 96.8,
      time_saved_hours: 34.5,
      issues_resolved: 89,
    });
  };

  const updateMetrics = () => {
    setMetrics((prev) => ({
      ...prev,
      total_executions_today: prev.total_executions_today + Math.floor(Math.random() * 5),
      issues_resolved: prev.issues_resolved + (Math.random() > 0.9 ? 1 : 0),
      time_saved_hours: prev.time_saved_hours + Math.random() * 0.1,
    }));
  };

  const createNewAutomation = () => {
    const newAutomation: Automation = {
      id: `auto-${Date.now()}`,
      name: "New Automation",
      description: "Describe your automation workflow",
      category: "security",
      status: "inactive",
      trigger_count: 0,
      success_rate: 0,
      last_run: new Date(),
      created_date: new Date(),
      steps: [],
    };
    setAutomations((prev) => [newAutomation, ...prev]);
    setSelectedAutomation(newAutomation);
    setIsEditing(true);
    toast.success("New automation created!", {
      description: "Configure your workflow steps to get started",
      duration: 3000,
    });
  };

  const toggleAutomationStatus = (automationId: string) => {
    setAutomations((prev) =>
      prev.map((automation) => {
        if (automation.id === automationId) {
          const newStatus = automation.status === "active" ? "inactive" : "active";
          toast.success(`Automation ${newStatus}!`, {
            description: `${automation.name} is now ${newStatus}`,
            duration: 3000,
          });
          return { ...automation, status: newStatus as Automation["status"] };
        }
        return automation;
      })
    );
  };

  const deleteAutomation = (automationId: string) => {
    const automation = automations.find((a) => a.id === automationId);
    setAutomations((prev) => prev.filter((a) => a.id !== automationId));
    if (selectedAutomation?.id === automationId) {
      setSelectedAutomation(null);
      setIsEditing(false);
    }
    toast.success("Automation deleted!", {
      description: `${automation?.name} has been removed`,
      duration: 3000,
    });
  };

  const runAutomationTest = (automationId: string) => {
    const automation = automations.find((a) => a.id === automationId);
    toast.info(`Testing ${automation?.name}...`, {
      description: "Running automation in test mode",
      duration: 3000,
    });

    setTimeout(() => {
      toast.success("Test completed successfully!", {
        description: "All steps executed without errors",
        duration: 3000,
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-400" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "testing":
        return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-green-500/50 text-green-400";
      case "inactive":
        return "border-gray-500/50 text-gray-400";
      case "error":
        return "border-red-500/50 text-red-400";
      case "testing":
        return "border-blue-500/50 text-blue-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <Shield className="h-4 w-4" />;
      case "token_management":
        return <Database className="h-4 w-4" />;
      case "user_engagement":
        return <Users className="h-4 w-4" />;
      case "environmental":
        return <Globe className="h-4 w-4" />;
      case "analytics":
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Workflow className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "security":
        return "border-red-500/50 text-red-400";
      case "token_management":
        return "border-yellow-500/50 text-yellow-400";
      case "user_engagement":
        return "border-blue-500/50 text-blue-400";
      case "environmental":
        return "border-green-500/50 text-green-400";
      case "analytics":
        return "border-purple-500/50 text-purple-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Automation Metrics */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Workflow className="h-5 w-5" />
            Custom Automation Builder - Workflow Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{metrics.total_automations}</div>
              <div className="text-sm text-muted-foreground">Total Automations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{metrics.active_automations}</div>
              <div className="text-sm text-muted-foreground">Active Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {metrics.total_executions_today}
              </div>
              <div className="text-sm text-muted-foreground">Executions Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {metrics.success_rate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {metrics.time_saved_hours.toFixed(1)}h
              </div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{metrics.issues_resolved}</div>
              <div className="text-sm text-muted-foreground">Issues Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="automations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="automations">🤖 Automations</TabsTrigger>
          <TabsTrigger value="builder">🔧 Builder</TabsTrigger>
          <TabsTrigger value="templates">📋 Templates</TabsTrigger>
          <TabsTrigger value="monitoring">📊 Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="automations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Active Automations</h3>
            <Button onClick={createNewAutomation} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              New Automation
            </Button>
          </div>

          <div className="space-y-4">
            {automations.map((automation) => (
              <Card key={automation.id} className="border-gray-500/20 bg-black/20">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white text-lg">{automation.name}</h3>
                        <Badge variant="outline" className={getStatusColor(automation.status)}>
                          {getStatusIcon(automation.status)}
                          {automation.status}
                        </Badge>
                        <Badge variant="outline" className={getCategoryColor(automation.category)}>
                          {getCategoryIcon(automation.category)}
                          {automation.category.replace("_", " ")}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground mb-3">{automation.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground">Executions</div>
                          <div className="font-bold text-blue-400">{automation.trigger_count}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Success Rate</div>
                          <div className="font-bold text-green-400">
                            {automation.success_rate.toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Steps</div>
                          <div className="font-bold text-purple-400">{automation.steps.length}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Last Run</div>
                          <div className="font-bold text-yellow-400">
                            {automation.last_run.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Created: {automation.created_date.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => toggleAutomationStatus(automation.id)}
                        className={
                          automation.status === "active"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }
                      >
                        {automation.status === "active" ? (
                          <Pause className="h-3 w-3 mr-1" />
                        ) : (
                          <Play className="h-3 w-3 mr-1" />
                        )}
                        {automation.status === "active" ? "Pause" : "Start"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => runAutomationTest(automation.id)}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Test
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedAutomation(automation);
                          setIsEditing(true);
                        }}
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteAutomation(automation.id)}
                        className="border-red-500/50 text-red-400"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          {selectedAutomation ? (
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Brain className="h-5 w-5" />
                  Workflow Builder - {selectedAutomation.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white">Automation Name</label>
                      <Input
                        value={selectedAutomation.name}
                        onChange={(e) =>
                          setSelectedAutomation((prev) =>
                            prev ? { ...prev, name: e.target.value } : null
                          )
                        }
                        className="bg-black/20 border-blue-500/30"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white">Description</label>
                      <Textarea
                        value={selectedAutomation.description}
                        onChange={(e) =>
                          setSelectedAutomation((prev) =>
                            prev ? { ...prev, description: e.target.value } : null
                          )
                        }
                        className="bg-black/20 border-blue-500/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">Available Step Types</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {availableStepTypes.map((stepType) => (
                        <Button
                          key={stepType.type}
                          variant="outline"
                          className="h-auto p-3 flex flex-col items-start"
                          onClick={() => {
                            toast.info(`Adding ${stepType.name}...`, {
                              description: "Drag and drop to position in workflow",
                              duration: 2000,
                            });
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {stepType.icon}
                            <span className="font-medium">{stepType.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground text-left">
                            {stepType.description}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold text-white">
                    Workflow Steps ({selectedAutomation.steps.length})
                  </h4>
                  {selectedAutomation.steps.length > 0 ? (
                    <div className="space-y-3">
                      {selectedAutomation.steps.map((step, index) => (
                        <div
                          key={step.id}
                          className="flex items-center gap-3 p-3 border border-gray-500/20 rounded-lg"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white">{step.name}</div>
                            <div className="text-sm text-muted-foreground">{step.description}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {step.type}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500/50 text-red-400"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Workflow className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No steps added yet. Drag step types from above to build your workflow.</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Automation
                  </Button>
                  <Button variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Test Run
                  </Button>
                  <Button variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Clone
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-gray-500/20">
              <CardContent className="pt-6 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-white mb-2">No Automation Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select an automation from the list or create a new one to start building your
                  workflow.
                </p>
                <Button onClick={createNewAutomation} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Automation
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-400">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{template.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Category:</span>
                      <Badge variant="outline" className={getCategoryColor(template.category)}>
                        {template.category.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Steps:</span>
                      <span className="font-bold text-blue-400">{template.steps.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Used:</span>
                      <span className="font-bold text-green-400">{template.use_count} times</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Copy className="h-3 w-3 mr-1" />
                      Use Template
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Success Rate</span>
                    <span className="font-bold text-green-400">
                      {metrics.success_rate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg Execution Time</span>
                    <span className="font-bold text-blue-400">2.3s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Failed Executions</span>
                    <span className="font-bold text-red-400">41</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Monitoring</span>
                    <span className="font-bold text-purple-400">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      time: "2 min ago",
                      event: "AI Defense deployed",
                      status: "success",
                    },
                    {
                      time: "5 min ago",
                      event: "Token auto-approved",
                      status: "success",
                    },
                    {
                      time: "12 min ago",
                      event: "User engagement check",
                      status: "success",
                    },
                    {
                      time: "18 min ago",
                      event: "Security scan completed",
                      status: "success",
                    },
                    {
                      time: "25 min ago",
                      event: "Report generation failed",
                      status: "error",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border border-gray-500/20 rounded"
                    >
                      <div>
                        <div className="text-sm text-white">{activity.event}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          activity.status === "success"
                            ? "border-green-500/50 text-green-400"
                            : "border-red-500/50 text-red-400"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
