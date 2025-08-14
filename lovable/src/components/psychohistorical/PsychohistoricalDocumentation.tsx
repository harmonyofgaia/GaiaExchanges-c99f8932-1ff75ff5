import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  FileText,
  Bell,
  Download,
  Share,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Archive,
  Edit3,
  Send,
  Heart,
  Star,
  Award,
  Zap,
  Activity,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

interface DocumentationEntry {
  id: string;
  title: string;
  type:
    | "solution_guide"
    | "impact_report"
    | "best_practices"
    | "failure_analysis"
    | "research_findings";
  content: string;
  author: "AI System" | "Community" | "Expert Panel";
  generatedAt: Date;
  lastUpdated: Date;
  views: number;
  helpfulVotes: number;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
}

interface CommunityAlert {
  id: string;
  type: "threat_warning" | "opportunity" | "milestone" | "insight" | "implementation_ready";
  severity: "info" | "low" | "medium" | "high" | "critical";
  title: string;
  message: string;
  details: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  affectedCommunities: string[];
  relatedSolutions: string[];
}

interface KnowledgePattern {
  id: string;
  pattern: string;
  description: string;
  frequency: number;
  successRate: number;
  applicableSolutions: number;
  environmentalImpact: string;
  discoveredAt: Date;
  confidence: number;
}

interface GlobalInsight {
  id: string;
  title: string;
  summary: string;
  dataPoints: number;
  confidence: number;
  impact: "high" | "medium" | "low";
  category: string;
  generatedAt: Date;
  affectedRegions: string[];
  recommendedActions: string[];
}

export function PsychohistoricalDocumentation() {
  const [documentationEntries, setDocumentationEntries] = useState<DocumentationEntry[]>([]);
  const [communityAlerts, setCommunityAlerts] = useState<CommunityAlert[]>([]);
  const [knowledgePatterns, setKnowledgePatterns] = useState<KnowledgePattern[]>([]);
  const [globalInsights, setGlobalInsights] = useState<GlobalInsight[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    initializeDocumentation();
    initializeCommunityAlerts();
    initializeKnowledgePatterns();
    initializeGlobalInsights();
    startRealTimeUpdates();
  }, []);

  const initializeDocumentation = () => {
    const docs: DocumentationEntry[] = [
      {
        id: "doc-1",
        title: "Implementing Ocean Plastic Collection Networks",
        type: "solution_guide",
        content:
          "Comprehensive guide for establishing automated ocean plastic collection systems using AI-guided autonomous vessels...",
        author: "AI System",
        generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
        views: 2847,
        helpfulVotes: 189,
        category: "Ocean Conservation",
        tags: ["plastic-cleanup", "automation", "marine-protection"],
        status: "published",
      },
      {
        id: "doc-2",
        title: "Q3 2024 Global Environmental Impact Report",
        type: "impact_report",
        content:
          "Detailed analysis of environmental improvements achieved through community-driven initiatives across 47 countries...",
        author: "AI System",
        generatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
        views: 5627,
        helpfulVotes: 423,
        category: "Impact Assessment",
        tags: ["quarterly-report", "global-impact", "metrics"],
        status: "published",
      },
      {
        id: "doc-3",
        title: "Best Practices for Community Solar Adoption",
        type: "best_practices",
        content:
          "Evidence-based strategies for accelerating solar panel adoption in residential communities, based on analysis of 156 successful implementations...",
        author: "Community",
        generatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),
        views: 3421,
        helpfulVotes: 267,
        category: "Renewable Energy",
        tags: ["solar-energy", "community-adoption", "best-practices"],
        status: "published",
      },
      {
        id: "doc-4",
        title: "Analysis of Failed Atmospheric Carbon Capture Attempts",
        type: "failure_analysis",
        content:
          "Comprehensive examination of 23 failed carbon capture projects to identify common failure patterns and prevention strategies...",
        author: "Expert Panel",
        generatedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000),
        views: 1892,
        helpfulVotes: 145,
        category: "Carbon Management",
        tags: ["carbon-capture", "failure-analysis", "lessons-learned"],
        status: "published",
      },
    ];
    setDocumentationEntries(docs);
  };

  const initializeCommunityAlerts = () => {
    const alerts: CommunityAlert[] = [
      {
        id: "alert-1",
        type: "threat_warning",
        severity: "high",
        title: "Coral Bleaching Event Predicted",
        message: "AI models predict severe coral bleaching in Great Barrier Reef within 45 days",
        details:
          "Temperature anomaly patterns indicate 87% probability of widespread bleaching. Immediate intervention recommended.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        actionRequired: true,
        affectedCommunities: ["Australia", "Pacific Islands", "Marine Conservation Groups"],
        relatedSolutions: ["coral-protection-protocols", "temperature-mitigation-systems"],
      },
      {
        id: "alert-2",
        type: "opportunity",
        severity: "medium",
        title: "Renewable Energy Investment Window",
        message:
          "Optimal conditions detected for solar/wind infrastructure development in 12 regions",
        details:
          "Economic and environmental factors align for 18-month investment opportunity with projected 340% ROI.",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: false,
        actionRequired: false,
        affectedCommunities: ["North America", "Europe", "Southeast Asia"],
        relatedSolutions: ["distributed-renewable-networks", "community-energy-cooperatives"],
      },
      {
        id: "alert-3",
        type: "milestone",
        severity: "info",
        title: "Ocean Cleanup Milestone Achieved",
        message: "1 Million Tons of Plastic Removed from Pacific Ocean",
        details:
          "Global community efforts have successfully removed 1,000,000 tons of plastic waste from ocean systems.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        actionRequired: false,
        affectedCommunities: ["Global"],
        relatedSolutions: ["automated-cleanup-systems", "plastic-processing-facilities"],
      },
      {
        id: "alert-4",
        type: "implementation_ready",
        severity: "medium",
        title: "Biodegradable Electronics Ready for Deployment",
        message: "AI-generated electronics solution has passed all validation tests",
        details:
          "Community validation complete. 94% feasibility rating. Ready for pilot implementation in 6 locations.",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        read: false,
        actionRequired: true,
        affectedCommunities: ["Tech Communities", "Environmental Groups", "Manufacturing Sectors"],
        relatedSolutions: ["biodegradable-electronics", "e-waste-reduction"],
      },
    ];
    setCommunityAlerts(alerts);
  };

  const initializeKnowledgePatterns = () => {
    const patterns: KnowledgePattern[] = [
      {
        id: "pattern-1",
        pattern: "Community-First Implementation Strategy",
        description:
          "Environmental solutions achieve 73% higher success rates when community education precedes technical deployment",
        frequency: 89,
        successRate: 87.3,
        applicableSolutions: 247,
        environmentalImpact: "2.3x improvement in long-term sustainability",
        discoveredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        confidence: 94.7,
      },
      {
        id: "pattern-2",
        pattern: "Seasonal Implementation Timing",
        description:
          "Solar installations completed in Q2 show 34% better performance than those completed in Q4",
        frequency: 156,
        successRate: 92.1,
        applicableSolutions: 89,
        environmentalImpact: "15.7% increase in energy generation efficiency",
        discoveredAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        confidence: 91.2,
      },
      {
        id: "pattern-3",
        pattern: "Cross-Solution Synergy Effects",
        description:
          "Combining waste reduction with renewable energy projects increases overall impact by 45%",
        frequency: 67,
        successRate: 95.8,
        applicableSolutions: 134,
        environmentalImpact: "45% multiplicative improvement in environmental outcomes",
        discoveredAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        confidence: 88.9,
      },
    ];
    setKnowledgePatterns(patterns);
  };

  const initializeGlobalInsights = () => {
    const insights: GlobalInsight[] = [
      {
        id: "insight-1",
        title: "Arctic Ice Recovery Acceleration Detected",
        summary:
          "AI analysis reveals 23% faster ice reformation rates in regions with active marine protection programs",
        dataPoints: 2847592,
        confidence: 96.3,
        impact: "high",
        category: "Climate Recovery",
        generatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        affectedRegions: ["Arctic Ocean", "Northern Canada", "Greenland", "Northern Alaska"],
        recommendedActions: [
          "Scale marine protection programs",
          "Increase cold water circulation projects",
          "Implement ice-preserving technologies",
        ],
      },
      {
        id: "insight-2",
        title: "Urban Air Quality Breakthrough Pattern",
        summary:
          "Cities implementing integrated green transportation and vertical farming show 67% greater air quality improvement",
        dataPoints: 1562934,
        confidence: 93.8,
        impact: "high",
        category: "Urban Environment",
        generatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        affectedRegions: ["Global Urban Centers", "Major Cities", "Metropolitan Areas"],
        recommendedActions: [
          "Promote integrated urban planning",
          "Expand vertical farming initiatives",
          "Accelerate green transportation adoption",
        ],
      },
    ];
    setGlobalInsights(insights);
  };

  const startRealTimeUpdates = () => {
    const interval = setInterval(() => {
      // Simulate new alerts
      if (Math.random() > 0.95) {
        const newAlert: CommunityAlert = {
          id: `alert-${Date.now()}`,
          type: "insight",
          severity: "info",
          title: "New Pattern Discovered",
          message: "AI has identified a new environmental improvement pattern",
          details:
            "Analysis of recent data reveals emerging trends in community renewable energy adoption.",
          timestamp: new Date(),
          read: false,
          actionRequired: false,
          affectedCommunities: ["Global"],
          relatedSolutions: ["renewable-energy-systems"],
        };
        setCommunityAlerts((prev) => [newAlert, ...prev]);
        toast.success("New community alert received!");
      }
    }, 15000);

    return () => clearInterval(interval);
  };

  const markAlertAsRead = (alertId: string) => {
    setCommunityAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert))
    );
  };

  const voteHelpful = (docId: string) => {
    setDocumentationEntries((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, helpfulVotes: doc.helpfulVotes + 1 } : doc))
    );
    toast.success("Thank you for your feedback!");
  };

  const downloadDocument = (doc: DocumentationEntry) => {
    toast.success(`Downloaded: ${doc.title}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500/50 text-red-400";
      case "high":
        return "border-orange-500/50 text-orange-400";
      case "medium":
        return "border-yellow-500/50 text-yellow-400";
      case "low":
        return "border-blue-500/50 text-blue-400";
      case "info":
        return "border-cyan-500/50 text-cyan-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "threat_warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "opportunity":
        return <Sparkles className="h-4 w-4" />;
      case "milestone":
        return <Award className="h-4 w-4" />;
      case "insight":
        return <TrendingUp className="h-4 w-4" />;
      case "implementation_ready":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getDocTypeColor = (type: string) => {
    switch (type) {
      case "solution_guide":
        return "border-green-500/50 text-green-400";
      case "impact_report":
        return "border-blue-500/50 text-blue-400";
      case "best_practices":
        return "border-purple-500/50 text-purple-400";
      case "failure_analysis":
        return "border-orange-500/50 text-orange-400";
      case "research_findings":
        return "border-cyan-500/50 text-cyan-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <Card className="border-red-500/20 bg-gradient-to-r from-red-900/10 to-yellow-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Bell className="h-5 w-5" />
            Active Community Alerts
            <Badge variant="outline" className="border-red-500/50 text-red-400">
              {communityAlerts.filter((a) => !a.read).length} unread
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["threat_warning", "opportunity", "milestone", "implementation_ready"].map((type) => {
              const count = communityAlerts.filter((a) => a.type === type).length;
              return (
                <div
                  key={type}
                  className="text-center p-3 bg-black/20 rounded-lg border border-gray-500/20"
                >
                  <div className="flex items-center justify-center mb-2">
                    {getAlertIcon(type)}
                    <span className="ml-2 text-sm capitalize">{type.replace("_", " ")}</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">{count}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Community Alerts</TabsTrigger>
          <TabsTrigger value="documentation">Living Documentation</TabsTrigger>
          <TabsTrigger value="patterns">Knowledge Patterns</TabsTrigger>
          <TabsTrigger value="insights">Global Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Bell className="h-5 w-5" />
                Real-Time Community Alert Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.read
                        ? "bg-black/10 border-gray-500/20"
                        : "bg-black/20 border-gray-500/40"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-lg ${getSeverityColor(alert.severity)} border`}
                        >
                          {getAlertIcon(alert.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{alert.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-purple-500/50 text-purple-400"
                            >
                              {alert.type.replace("_", " ")}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.floor((Date.now() - alert.timestamp.getTime()) / 1000 / 60)}m
                              ago
                            </span>
                          </div>
                        </div>
                      </div>
                      {!alert.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAlertAsRead(alert.id)}
                          className="border-blue-500/50 text-blue-400"
                        >
                          Mark Read
                        </Button>
                      )}
                    </div>

                    <p className="text-white mb-2">{alert.message}</p>
                    <p className="text-sm text-muted-foreground mb-3">{alert.details}</p>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Affected Communities:{" "}
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {alert.affectedCommunities.map((community, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-green-500/50 text-green-400"
                            >
                              <Users className="h-3 w-3 mr-1" />
                              {community}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {alert.relatedSolutions.length > 0 && (
                        <div>
                          <span className="text-sm text-muted-foreground">Related Solutions: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {alert.relatedSolutions.map((solution, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-blue-500/50 text-blue-400"
                              >
                                <Zap className="h-3 w-3 mr-1" />
                                {solution.replace("-", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {alert.actionRequired && (
                      <div className="mt-3 pt-3 border-t border-gray-500/20">
                        <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Action Required
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <BookOpen className="h-5 w-5" />
                Automated Knowledge Base
              </CardTitle>
              <div className="flex gap-2 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-500/50 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentationEntries.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-white">{doc.title}</h4>
                          <Badge variant="outline" className={getDocTypeColor(doc.type)}>
                            <FileText className="h-3 w-3 mr-1" />
                            {doc.type.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{doc.content}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {doc.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-cyan-500/50 text-cyan-400"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Author: </span>
                            <span className="text-white">{doc.author}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Views: </span>
                            <span className="text-blue-400">{doc.views.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Helpful: </span>
                            <span className="text-green-400">{doc.helpfulVotes}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Updated: </span>
                            <span className="text-purple-400">
                              {Math.floor(
                                (Date.now() - doc.lastUpdated.getTime()) / 1000 / 60 / 60
                              )}
                              h ago
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-500/20">
                      <Button
                        size="sm"
                        onClick={() => downloadDocument(doc)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => voteHelpful(doc.id)}
                        className="border-green-500/50 text-green-400"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        Helpful
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/50 text-purple-400"
                      >
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <BarChart3 className="h-5 w-5" />
                AI-Discovered Knowledge Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {knowledgePatterns.map((pattern) => (
                  <div
                    key={pattern.id}
                    className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-2">{pattern.pattern}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{pattern.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Success Rate</div>
                            <div className="font-bold text-green-400">{pattern.successRate}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Frequency</div>
                            <div className="font-bold text-blue-400">{pattern.frequency}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Solutions</div>
                            <div className="font-bold text-purple-400">
                              {pattern.applicableSolutions}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Confidence</div>
                            <div className="font-bold text-yellow-400">{pattern.confidence}%</div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-3 rounded-lg">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Environmental Impact: </span>
                            <span className="font-bold text-green-400">
                              {pattern.environmentalImpact}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Discovered{" "}
                      {Math.floor(
                        (Date.now() - pattern.discoveredAt.getTime()) / 1000 / 60 / 60 / 24
                      )}{" "}
                      days ago
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Globe className="h-5 w-5" />
                Global Environmental Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 rounded-lg bg-black/20 border border-gray-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-white">{insight.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              insight.impact === "high"
                                ? "border-red-500/50 text-red-400"
                                : insight.impact === "medium"
                                  ? "border-yellow-500/50 text-yellow-400"
                                  : "border-blue-500/50 text-blue-400"
                            }
                          >
                            {insight.impact} impact
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{insight.summary}</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Data Points</div>
                            <div className="font-bold text-blue-400">
                              {(insight.dataPoints / 1000000).toFixed(1)}M
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Confidence</div>
                            <div className="font-bold text-green-400">{insight.confidence}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Generated</div>
                            <div className="font-bold text-purple-400">
                              {Math.floor(
                                (Date.now() - insight.generatedAt.getTime()) / 1000 / 60 / 60
                              )}
                              h ago
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-muted-foreground">
                              Affected Regions:{" "}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {insight.affectedRegions.map((region, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs border-green-500/50 text-green-400"
                                >
                                  <Globe className="h-3 w-3 mr-1" />
                                  {region}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-sm text-muted-foreground">
                              Recommended Actions:{" "}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {insight.recommendedActions.map((action, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs border-blue-500/50 text-blue-400"
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {action}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
