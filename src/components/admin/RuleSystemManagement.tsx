import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gavel,
  Shield,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Activity,
  Target,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface Rule {
  id: string;
  name: string;
  description: string;
  category: "security" | "behavior" | "access" | "content" | "system";
  priority: "low" | "medium" | "high" | "critical";
  isActive: boolean;
  enforcement: "warning" | "restriction" | "suspension" | "ban";
  conditions: RuleCondition[];
  assignedTo: RuleAssignment[];
  createdAt: string;
  lastTriggered: string | null;
  violations: number;
  autoEnforcement: boolean;
  schedule: RuleSchedule;
}

interface RuleCondition {
  field: string;
  operator: "equals" | "contains" | "greater_than" | "less_than" | "regex";
  value: string;
}

interface RuleAssignment {
  type: "user" | "role" | "group" | "all";
  targetId?: string;
  targetName: string;
}

interface RuleSchedule {
  isAlwaysActive: boolean;
  activeHours?: string[];
  activeDays?: string[];
  timezone: string;
}

export function RuleSystemManagement() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data initialization
  useEffect(() => {
    const mockRules: Rule[] = [
      {
        id: "1",
        name: "Anti-Spam Protection",
        description: "Prevents spam messages and repeated content posting",
        category: "security",
        priority: "high",
        isActive: true,
        enforcement: "restriction",
        conditions: [
          { field: "message_frequency", operator: "greater_than", value: "10" },
          {
            field: "content_similarity",
            operator: "greater_than",
            value: "85",
          },
        ],
        assignedTo: [{ type: "all", targetName: "All Users" }],
        createdAt: "2024-01-15T10:00:00Z",
        lastTriggered: "2024-01-20T15:30:00Z",
        violations: 23,
        autoEnforcement: true,
        schedule: { isAlwaysActive: true, timezone: "UTC" },
      },
      {
        id: "2",
        name: "Admin Action Logging",
        description: "All admin actions must be logged and monitored 24/7",
        category: "system",
        priority: "critical",
        isActive: true,
        enforcement: "ban",
        conditions: [
          { field: "admin_action", operator: "equals", value: "any" },
        ],
        assignedTo: [{ type: "role", targetName: "Administrators" }],
        createdAt: "2024-01-10T08:00:00Z",
        lastTriggered: null,
        violations: 0,
        autoEnforcement: true,
        schedule: { isAlwaysActive: true, timezone: "UTC" },
      },
      {
        id: "3",
        name: "Content Moderation",
        description: "Inappropriate content detection and removal",
        category: "content",
        priority: "medium",
        isActive: true,
        enforcement: "warning",
        conditions: [
          {
            field: "content_type",
            operator: "contains",
            value: "inappropriate",
          },
        ],
        assignedTo: [{ type: "all", targetName: "All Users" }],
        createdAt: "2024-01-12T12:00:00Z",
        lastTriggered: "2024-01-19T09:45:00Z",
        violations: 7,
        autoEnforcement: false,
        schedule: { isAlwaysActive: true, timezone: "UTC" },
      },
    ];
    setRules(mockRules);
  }, []);

  const handleCreateRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      name: "New Rule",
      description: "",
      category: "security",
      priority: "medium",
      isActive: false,
      enforcement: "warning",
      conditions: [],
      assignedTo: [],
      createdAt: new Date().toISOString(),
      lastTriggered: null,
      violations: 0,
      autoEnforcement: true,
      schedule: { isAlwaysActive: true, timezone: "UTC" },
    };
    setRules([...rules, newRule]);
    setSelectedRule(newRule);
    setIsCreating(true);
    toast.success("New rule created successfully");
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule,
      ),
    );
    const rule = rules.find((r) => r.id === ruleId);
    toast.success(
      `Rule "${rule?.name}" ${rule?.isActive ? "deactivated" : "activated"}`,
    );
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId));
    if (selectedRule?.id === ruleId) {
      setSelectedRule(null);
    }
    toast.success("Rule deleted successfully");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return Shield;
      case "behavior":
        return Users;
      case "access":
        return Eye;
      case "content":
        return AlertTriangle;
      case "system":
        return Activity;
      default:
        return Gavel;
    }
  };

  const filteredRules = rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-amber-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Gavel className="h-6 w-6" />
            🔒 RULE SYSTEM MANAGEMENT 24/7 🔒
          </CardTitle>
          <p className="text-purple-300">
            Comprehensive rule enforcement system with 24/7 monitoring and
            automatic compliance
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {rules.filter((r) => r.isActive).length}
              </div>
              <div className="text-xs text-muted-foreground">Active Rules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {rules.reduce((sum, r) => sum + r.violations, 0)}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Violations
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {rules.filter((r) => r.priority === "critical").length}
              </div>
              <div className="text-xs text-muted-foreground">
                Critical Rules
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {rules.filter((r) => r.autoEnforcement).length}
              </div>
              <div className="text-xs text-muted-foreground">Auto-Enforced</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Rules Overview</TabsTrigger>
          <TabsTrigger value="create">Create Rule</TabsTrigger>
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          <TabsTrigger value="enforcement">Enforcement Log</TabsTrigger>
        </TabsList>

        {/* Rules Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button
              onClick={handleCreateRule}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Rule
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredRules.map((rule) => {
              const CategoryIcon = getCategoryIcon(rule.category);
              return (
                <Card
                  key={rule.id}
                  className="border border-gray-700 hover:border-purple-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CategoryIcon className="h-5 w-5 text-purple-400" />
                        <div>
                          <h3 className="font-semibold text-white">
                            {rule.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {rule.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${getPriorityColor(rule.priority)} text-white`}
                        >
                          {rule.priority.toUpperCase()}
                        </Badge>
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Category
                        </div>
                        <div className="font-medium capitalize">
                          {rule.category}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Enforcement
                        </div>
                        <div className="font-medium capitalize">
                          {rule.enforcement}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Violations
                        </div>
                        <div className="font-medium text-red-400">
                          {rule.violations}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Status
                        </div>
                        <div className="flex items-center gap-1">
                          {rule.isActive ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                          <span className="text-sm">
                            {rule.isActive ? "Active 24/7" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground mb-2">
                        Assigned To:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {rule.assignedTo.map((assignment, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-blue-400 border-blue-400/50"
                          >
                            {assignment.targetName}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRule(rule)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRule(rule.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Create/Edit Rule */}
        <TabsContent value="create" className="space-y-4">
          <RuleCreator
            rule={selectedRule}
            onSave={(rule) => {
              if (selectedRule) {
                setRules(rules.map((r) => (r.id === rule.id ? rule : r)));
              } else {
                setRules([...rules, rule]);
              }
              setSelectedRule(null);
              setIsCreating(false);
              toast.success("Rule saved successfully");
            }}
          />
        </TabsContent>

        {/* Live Monitoring */}
        <TabsContent value="monitoring" className="space-y-4">
          <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/20 to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Activity className="h-5 w-5" />
                Live Rule Monitoring 24/7
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rules
                  .filter((r) => r.isActive)
                  .map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div>
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Monitoring {rule.assignedTo.length} target(s)
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-400">ACTIVE</div>
                        <div className="text-xs text-muted-foreground">
                          {rule.schedule.isAlwaysActive ? "24/7" : "Scheduled"}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enforcement Log */}
        <TabsContent value="enforcement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Rule Enforcement History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-red-500/30 rounded-lg bg-red-900/10">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <div>
                      <div className="font-medium">Anti-Spam Protection</div>
                      <div className="text-sm text-muted-foreground">
                        User exceeded message limit
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-red-400">RESTRICTED</div>
                    <div className="text-xs text-muted-foreground">
                      2 hours ago
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-yellow-500/30 rounded-lg bg-yellow-900/10">
                  <div className="flex items-center gap-3">
                    <Eye className="h-4 w-4 text-yellow-400" />
                    <div>
                      <div className="font-medium">Content Moderation</div>
                      <div className="text-sm text-muted-foreground">
                        Inappropriate content detected
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-yellow-400">WARNING</div>
                    <div className="text-xs text-muted-foreground">
                      5 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Rule Creator Component
function RuleCreator({
  rule,
  onSave,
}: {
  rule: Rule | null;
  onSave: (rule: Rule) => void;
}) {
  const [formData, setFormData] = useState<Partial<Rule>>({
    name: "",
    description: "",
    category: "security",
    priority: "medium",
    enforcement: "warning",
    isActive: true,
    autoEnforcement: true,
    conditions: [],
    assignedTo: [],
    schedule: { isAlwaysActive: true, timezone: "UTC" },
  });

  useEffect(() => {
    if (rule) {
      setFormData(rule);
    }
  }, [rule]);

  const handleSave = () => {
    const ruleToSave: Rule = {
      id: rule?.id || Date.now().toString(),
      name: formData.name || "Untitled Rule",
      description: formData.description || "",
      category: formData.category || "security",
      priority: formData.priority || "medium",
      enforcement: formData.enforcement || "warning",
      isActive: formData.isActive ?? true,
      autoEnforcement: formData.autoEnforcement ?? true,
      conditions: formData.conditions || [],
      assignedTo: formData.assignedTo || [],
      createdAt: rule?.createdAt || new Date().toISOString(),
      lastTriggered: rule?.lastTriggered || null,
      violations: rule?.violations || 0,
      schedule: formData.schedule || { isAlwaysActive: true, timezone: "UTC" },
    };
    onSave(ruleToSave);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{rule ? "Edit Rule" : "Create New Rule"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Rule Name</label>
            <Input
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter rule name..."
            />
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <Select
              value={formData.category || "security"}
              onValueChange={(value: Rule['category']) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="behavior">Behavior</SelectItem>
                <SelectItem value="access">Access</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe what this rule does..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Priority</label>
            <Select
              value={formData.priority || "medium"}
              onValueChange={(value: Rule['priority']) =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Enforcement</label>
            <Select
              value={formData.enforcement || "warning"}
              onValueChange={(value: Rule['enforcement']) =>
                setFormData({ ...formData, enforcement: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="restriction">Restriction</SelectItem>
                <SelectItem value="suspension">Suspension</SelectItem>
                <SelectItem value="ban">Ban</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isActive ?? true}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
            <label className="text-sm font-medium">Active 24/7</label>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700"
        >
          {rule ? "Update Rule" : "Create Rule"}
        </Button>
      </CardContent>
    </Card>
  );
}
