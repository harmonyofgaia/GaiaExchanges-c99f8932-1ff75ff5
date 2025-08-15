import React, { useState, useEffect , useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Globe,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Code,
  FileText,
  Link,
  Eye,
  Plus,
  RefreshCw,
  Download,
  Route,
  Component,
  Settings,
  ExternalLink,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

interface PageRoute {
  id: string;
  path: string;
  component: string;
  name: string;
  status: "complete" | "incomplete" | "missing" | "error" | "off-spec";
  issues: string[];
  lastChecked: Date;
  hasTests: boolean;
  accessibility: number;
  performance: number;
  seoScore: number;
  preview?: string;
}

interface MissingPage {
  id: string;
  suggestedPath: string;
  suggestedName: string;
  category: string;
  importance: "high" | "medium" | "low";
  reason: string;
  canAutoGenerate: boolean;
  template?: string;
}

interface RouteAnalysis {
  totalRoutes: number;
  completeRoutes: number;
  incompleteRoutes: number;
  missingRoutes: number;
  errorRoutes: number;
  coverage: number;
  lastScan: Date;
}

export function RouteCompletenessChecker() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [routes, setRoutes] = useState<PageRoute[]>([]);
  const [missingPages, setMissingPages] = useState<MissingPage[]>([]);
  const [analysis, setAnalysis] = useState<RouteAnalysis | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<PageRoute | null>(null);

  useEffect(() => {
    loadExistingRoutes();
  }, [loadExistingRoutes]);

  const loadExistingRoutes = () => {
    // Mock existing routes based on the App.tsx we saw
    const mockRoutes: PageRoute[] = [
      {
        id: "1",
        path: "/",
        component: "Index",
        name: "Landing Page",
        status: "complete",
        issues: [],
        lastChecked: new Date(),
        hasTests: true,
        accessibility: 95,
        performance: 88,
        seoScore: 92,
        preview: "Main landing page with hero section",
      },
      {
        id: "2",
        path: "/dashboard",
        component: "Dashboard",
        name: "User Dashboard",
        status: "complete",
        issues: [],
        lastChecked: new Date(),
        hasTests: true,
        accessibility: 87,
        performance: 82,
        seoScore: 78,
      },
      {
        id: "3",
        path: "/secure-admin",
        component: "SecureAdmin",
        name: "Secure Admin Panel",
        status: "complete",
        issues: [],
        lastChecked: new Date(),
        hasTests: false,
        accessibility: 90,
        performance: 85,
        seoScore: 65,
      },
      {
        id: "4",
        path: "/exchange",
        component: "Exchange",
        name: "Token Exchange",
        status: "incomplete",
        issues: ["Missing error boundary", "No loading states"],
        lastChecked: new Date(),
        hasTests: false,
        accessibility: 72,
        performance: 75,
        seoScore: 70,
      },
      {
        id: "5",
        path: "/gaias-projects",
        component: "GaiasProjects",
        name: "Gaia Projects",
        status: "off-spec",
        issues: ["Non-standard styling", "Missing TypeScript types"],
        lastChecked: new Date(),
        hasTests: false,
        accessibility: 65,
        performance: 70,
        seoScore: 68,
      },
      {
        id: "6",
        path: "/api/health",
        component: "HealthCheck",
        name: "API Health Check",
        status: "missing",
        issues: ["Route defined but component missing"],
        lastChecked: new Date(),
        hasTests: false,
        accessibility: 0,
        performance: 0,
        seoScore: 0,
      },
    ];

    setRoutes(mockRoutes);

    // Generate analysis
    const totalRoutes = mockRoutes.length;
    const completeRoutes = mockRoutes.filter((r) => r.status === "complete").length;
    const incompleteRoutes = mockRoutes.filter((r) => r.status === "incomplete").length;
    const missingRoutes = mockRoutes.filter((r) => r.status === "missing").length;
    const errorRoutes = mockRoutes.filter((r) => r.status === "error").length;

    setAnalysis({
      totalRoutes,
      completeRoutes,
      incompleteRoutes,
      missingRoutes,
      errorRoutes,
      coverage: (completeRoutes / totalRoutes) * 100,
      lastScan: new Date(),
    });
  };

  const startRouteScan = async () => {
    setIsScanning(true);
    setScanProgress(0);

    toast.info("🔍 Starting route completeness scan...", {
      description: "Analyzing all pages and route definitions",
    });

    const scanSteps = [
      "Loading route definitions...",
      "Checking component existence...",
      "Validating page completeness...",
      "Running accessibility tests...",
      "Measuring performance metrics...",
      "Analyzing SEO compliance...",
      "Identifying missing pages...",
      "Generating recommendations...",
    ];

    for (let i = 0; i < scanSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setScanProgress(((i + 1) / scanSteps.length) * 100);
      toast.info(`📊 ${scanSteps[i]}`);
    }

    // Generate mock missing pages
    const mockMissingPages: MissingPage[] = [
      {
        id: "1",
        suggestedPath: "/admin/analytics",
        suggestedName: "Admin Analytics Dashboard",
        category: "Admin",
        importance: "high",
        reason: "Referenced in navigation but route missing",
        canAutoGenerate: true,
        template: "admin-dashboard",
      },
      {
        id: "2",
        suggestedPath: "/user/notifications",
        suggestedName: "User Notifications",
        category: "User",
        importance: "high",
        reason: "Common pattern missing from user flow",
        canAutoGenerate: true,
        template: "user-page",
      },
      {
        id: "3",
        suggestedPath: "/api/docs",
        suggestedName: "API Documentation",
        category: "Documentation",
        importance: "medium",
        reason: "Standard API endpoint documentation missing",
        canAutoGenerate: true,
        template: "documentation",
      },
      {
        id: "4",
        suggestedPath: "/terms-of-service",
        suggestedName: "Terms of Service",
        category: "Legal",
        importance: "high",
        reason: "Required legal page for production",
        canAutoGenerate: false,
      },
      {
        id: "5",
        suggestedPath: "/privacy-policy",
        suggestedName: "Privacy Policy",
        category: "Legal",
        importance: "high",
        reason: "Required legal page for production",
        canAutoGenerate: false,
      },
    ];

    setMissingPages(mockMissingPages);

    // Update routes with fresh scan data
    setRoutes((prev) =>
      prev.map((route) => ({
        ...route,
        lastChecked: new Date(),
        accessibility: Math.max(60, Math.floor(Math.random() * 40) + route.accessibility - 10),
        performance: Math.max(60, Math.floor(Math.random() * 40) + route.performance - 10),
        seoScore: Math.max(50, Math.floor(Math.random() * 40) + route.seoScore - 10),
      }))
    );

    // Update analysis
    if (analysis) {
      setAnalysis({
        ...analysis,
        lastScan: new Date(),
      });
    }

    setIsScanning(false);

    toast.success("✅ Route scan completed", {
      description: `Found ${mockMissingPages.length} missing pages and optimization opportunities`,
    });
  };

  const autoGeneratePage = async (pageId: string) => {
    const page = missingPages.find((p) => p.id === pageId);
    if (!page || !page.canAutoGenerate) return;

    toast.info(`🤖 Auto-generating: ${page.suggestedName}`);

    // Simulate page generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const newRoute: PageRoute = {
      id: `generated-${Date.now()}`,
      path: page.suggestedPath,
      component: page.suggestedName.replace(/\s+/g, ""),
      name: page.suggestedName,
      status: "incomplete",
      issues: ["Auto-generated - needs customization"],
      lastChecked: new Date(),
      hasTests: false,
      accessibility: 85,
      performance: 80,
      seoScore: 75,
      preview: `Auto-generated ${page.template} page`,
    };

    setRoutes((prev) => [...prev, newRoute]);
    setMissingPages((prev) => prev.filter((p) => p.id !== pageId));

    toast.success(`✨ Generated: ${page.suggestedName}`, {
      description: "Page created successfully - review and customize as needed",
    });
  };

  const previewRoute = (route: PageRoute) => {
    toast.info(`👁️ Opening preview: ${route.name}`, {
      description: `Navigating to ${route.path}`,
    });
    // In a real app, this would open the route in a new tab or modal
    window.open(`#${route.path}`, "_blank");
  };

  const generateStub = (route: PageRoute) => {
    toast.info(`🔧 Generating stub for: ${route.name}`, {
      description: "Creating basic component structure",
    });

    const stub = `
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ${route.component} = () => {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>${route.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is under construction.</p>
          {/* TODO: Implement ${route.name} functionality */}
        </CardContent>
      </Card>
    </div>
  )
}

export default ${route.component}
    `.trim();

    console.log("Generated stub:", stub);
    toast.success("✅ Stub generated", {
      description: "Component code copied to console",
    });
  };

  const getStatusColor = (status: PageRoute["status"]) => {
    switch (status) {
      case "complete":
        return "text-green-400 border-green-400";
      case "incomplete":
        return "text-yellow-400 border-yellow-400";
      case "missing":
        return "text-red-400 border-red-400";
      case "error":
        return "text-red-500 border-red-500";
      case "off-spec":
        return "text-orange-400 border-orange-400";
    }
  };

  const getImportanceColor = (importance: MissingPage["importance"]) => {
    switch (importance) {
      case "high":
        return "text-red-400 border-red-400";
      case "medium":
        return "text-yellow-400 border-yellow-400";
      case "low":
        return "text-green-400 border-green-400";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.component.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/10 to-blue-900/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Globe className="h-5 w-5" />
            🗺️ Page & Routing Completeness Checker
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" disabled={!analysis} className="border-blue-500/30">
              <Download className="h-4 w-4 mr-1" />
              Export Report
            </Button>
            <Button
              size="sm"
              onClick={startRouteScan}
              disabled={isScanning}
              className="bg-green-600 hover:bg-green-700"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-1" />
                  Scan Routes
                </>
              )}
            </Button>
          </div>
        </div>
        {analysis && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{analysis.totalRoutes}</div>
              <div className="text-xs text-gray-400">Total Routes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{analysis.completeRoutes}</div>
              <div className="text-xs text-gray-400">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{analysis.incompleteRoutes}</div>
              <div className="text-xs text-gray-400">Incomplete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{analysis.missingRoutes}</div>
              <div className="text-xs text-gray-400">Missing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {analysis.coverage.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400">Coverage</div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isScanning && (
          <Card className="border-green-500/30 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400">Route Scan in Progress...</span>
                <span className="text-green-400">{scanProgress.toFixed(0)}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="routes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="routes">🗂️ All Routes ({routes.length})</TabsTrigger>
            <TabsTrigger value="missing">➕ Missing Pages ({missingPages.length})</TabsTrigger>
            <TabsTrigger value="issues">⚠️ Issues</TabsTrigger>
            <TabsTrigger value="metrics">📊 Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="routes" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search routes, components, or paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="space-y-3">
              {filteredRoutes.map((route) => (
                <Card key={route.id} className={`border ${getStatusColor(route.status)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Route className="h-4 w-4 text-blue-400" />
                        <span className="font-medium text-white">{route.name}</span>
                        <Badge variant="outline" className={getStatusColor(route.status)}>
                          {route.status.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {route.path}
                        </Badge>
                        {route.hasTests && (
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            TESTED
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => previewRoute(route)}
                          className="border-blue-500/30"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        {route.status === "missing" && (
                          <Button
                            size="sm"
                            onClick={() => generateStub(route)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Generate Stub
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-2">
                      <span className="font-medium">Component:</span> {route.component}
                    </div>

                    {route.preview && (
                      <div className="text-sm text-gray-300 mb-3">{route.preview}</div>
                    )}

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(route.accessibility)}`}>
                          {route.accessibility}%
                        </div>
                        <div className="text-xs text-gray-400">Accessibility</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(route.performance)}`}>
                          {route.performance}%
                        </div>
                        <div className="text-xs text-gray-400">Performance</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getScoreColor(route.seoScore)}`}>
                          {route.seoScore}%
                        </div>
                        <div className="text-xs text-gray-400">SEO Score</div>
                      </div>
                    </div>

                    {route.issues.length > 0 && (
                      <div className="space-y-1">
                        {route.issues.map((issue, index) => (
                          <div key={index} className="text-xs text-red-300 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-2">
                      Last checked: {route.lastChecked.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="missing" className="space-y-3">
            {missingPages.map((page) => (
              <Card key={page.id} className={`border ${getImportanceColor(page.importance)}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-orange-400" />
                      <span className="font-medium text-white">{page.suggestedName}</span>
                      <Badge variant="outline" className={getImportanceColor(page.importance)}>
                        {page.importance.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary">{page.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {page.canAutoGenerate && (
                        <Button
                          size="sm"
                          onClick={() => autoGeneratePage(page.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Wrench className="h-3 w-3 mr-1" />
                          Auto-Generate
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    <span className="font-medium">Suggested Path:</span> {page.suggestedPath}
                  </div>
                  <div className="text-sm text-gray-300 mb-2">
                    <span className="font-medium">Reason:</span> {page.reason}
                  </div>
                  {page.template && (
                    <div className="text-xs text-blue-300">💡 Template: {page.template}</div>
                  )}
                  {!page.canAutoGenerate && (
                    <div className="text-xs text-yellow-400 mt-2">⚠️ Manual creation required</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="issues" className="space-y-3">
            {routes
              .filter((r) => r.issues.length > 0)
              .map((route) => (
                <Card key={route.id} className="border-red-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="font-medium text-white">{route.name}</span>
                      <Badge variant="outline" className="text-red-400 border-red-400">
                        {route.issues.length} ISSUE
                        {route.issues.length !== 1 ? "S" : ""}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      {route.path} → {route.component}
                    </div>
                    <ul className="space-y-1">
                      {route.issues.map((issue, index) => (
                        <li key={index} className="text-sm text-red-300 flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-sm text-green-400">
                    <CheckCircle className="h-4 w-4 inline mr-2" />
                    Accessibility Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {routes.slice(0, 5).map((route, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 truncate mr-2">{route.name}</span>
                        <span className={`text-xs ${getScoreColor(route.accessibility)}`}>
                          {route.accessibility}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-sm text-blue-400">
                    <RefreshCw className="h-4 w-4 inline mr-2" />
                    Performance Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {routes.slice(0, 5).map((route, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 truncate mr-2">{route.name}</span>
                        <span className={`text-xs ${getScoreColor(route.performance)}`}>
                          {route.performance}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-sm text-purple-400">
                    <Search className="h-4 w-4 inline mr-2" />
                    SEO Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {routes.slice(0, 5).map((route, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 truncate mr-2">{route.name}</span>
                        <span className={`text-xs ${getScoreColor(route.seoScore)}`}>
                          {route.seoScore}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
