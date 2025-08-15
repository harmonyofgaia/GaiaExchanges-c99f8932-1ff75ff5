import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Scan,
  RefreshCw,
  Download,
  Eye,
  Settings,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SecurityScanResults {
  vulnerabilities?: Array<{
    type: string;
    severity: string;
    description: string;
  }>;
  performance_issues?: Array<{
    table: string;
    issue: string;
    recommendation: string;
  }>;
  compliance_checks?: Array<{
    standard: string;
    status: string;
    details: string;
  }>;
}

interface SecurityScan {
  id: string;
  scan_type: string;
  scan_results: SecurityScanResults;
  issues_found: number;
  critical_issues: number;
  high_issues: number;
  medium_issues: number;
  low_issues: number;
  compliance_score: number;
  scan_duration_ms: number;
  created_at: string;
  created_by: string;
}

interface ThreatData {
  ip_patterns?: string[];
  user_agent_anomalies?: string[];
  geographic_flags?: Array<{
    country: string;
    risk_score: number;
  }>;
  behavioral_indicators?: string[];
}

interface ThreatIntelligence {
  id: string;
  threat_type: string;
  threat_data: ThreatData;
  severity_level: string;
  ip_address: string | null;
  user_agent: string | null;
  geolocation: unknown;
  detected_at: string;
  resolved_at: string | null;
  status: string;
}

export function SecurityDashboard() {
  const [scans, setScans] = useState<SecurityScan[]>([]);
  const [threats, setThreats] = useState<ThreatIntelligence[]>([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    loadSecurityData();
  }, [loadSecurityData]);

  const loadSecurityData = async () => {
    setLoading(true);
    try {
      // Load security scans
      const { data: scanData, error: scanError } = await supabase
        .from("security_scans")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (!scanError && scanData) {
        const typedScans = scanData.map((scan) => ({
          ...scan,
          scan_results: (scan.scan_results as unknown) || {},
        })) as SecurityScan[];
        setScans(typedScans);
      }

      // Load threat intelligence
      const { data: threatData, error: threatError } = await supabase
        .from("threat_intelligence")
        .select("*")
        .order("detected_at", { ascending: false })
        .limit(10);

      if (!threatError && threatData) {
        const typedThreats = threatData.map((threat) => ({
          ...threat,
          threat_data: (threat.threat_data as unknown) || {},
          ip_address: (threat.ip_address as string) || null,
          user_agent: (threat.user_agent as string) || null,
          geolocation: threat.geolocation as unknown,
        })) as ThreatIntelligence[];
        setThreats(typedThreats);
      }
    } catch (error) {
      console.error("Error loading security data:", error);
    } finally {
      setLoading(false);
    }
  };

  const runSecurityScan = async () => {
    setScanning(true);
    try {
      const { data, error } = await supabase.functions.invoke("security-monitor", {
        body: { action: "full_scan" },
      });

      if (error) {
        console.error("Security scan error:", error);
      } else {
        console.log("Security scan completed:", data);
        await loadSecurityData();
      }
    } catch (error) {
      console.error("Error running security scan:", error);
    } finally {
      setScanning(false);
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "text-red-400";
      case "high":
        return "text-orange-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            🛡️ Security Monitoring Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-red-900/50 rounded-lg border-2 border-red-500/50">
              <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-red-400">
                {scans.reduce((sum, scan) => sum + scan.critical_issues, 0)}
              </div>
              <div className="text-sm text-red-300">Critical Issues</div>
            </div>

            <div className="text-center p-4 bg-orange-900/50 rounded-lg border-2 border-orange-500/50">
              <XCircle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-orange-400">
                {scans.reduce((sum, scan) => sum + scan.high_issues, 0)}
              </div>
              <div className="text-sm text-orange-300">High Priority</div>
            </div>

            <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-green-400">
                {scans.length > 0 ? Math.round(scans[0]?.compliance_score || 0) : 0}%
              </div>
              <div className="text-sm text-green-300">Compliance Score</div>
            </div>

            <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
              <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-blue-400">{threats.length}</div>
              <div className="text-sm text-blue-300">Active Threats</div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button
              onClick={runSecurityScan}
              disabled={scanning}
              className="bg-red-600 hover:bg-red-700"
            >
              {scanning ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Scan className="h-4 w-4 mr-2" />
              )}
              {scanning ? "Scanning..." : "Run Security Scan"}
            </Button>

            <Button onClick={loadSecurityData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>

          <Tabs defaultValue="scans" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scans">Security Scans</TabsTrigger>
              <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="scans" className="space-y-4">
              {scans.map((scan) => (
                <Card key={scan.id} className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{scan.scan_type}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={getComplianceColor(scan.compliance_score)}>
                          {scan.compliance_score}% Compliant
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(scan.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        Critical: <span className="text-red-400">{scan.critical_issues}</span>
                      </div>
                      <div>
                        High: <span className="text-orange-400">{scan.high_issues}</span>
                      </div>
                      <div>
                        Medium: <span className="text-yellow-400">{scan.medium_issues}</span>
                      </div>
                      <div>
                        Low: <span className="text-blue-400">{scan.low_issues}</span>
                      </div>
                    </div>
                    <Progress value={scan.compliance_score} className="mt-2 h-2" />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="threats" className="space-y-4">
              {threats.map((threat) => (
                <Card key={threat.id} className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{threat.threat_type}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(threat.severity_level)}>
                          {threat.severity_level}
                        </Badge>
                        <Badge
                          className={threat.status === "active" ? "bg-red-600" : "bg-green-600"}
                        >
                          {threat.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      IP: {threat.ip_address || "Unknown"} | Detected:{" "}
                      {new Date(threat.detected_at).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="bg-black/30">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Security Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Auto-remediation</span>
                      <Badge className="bg-green-600">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Real-time monitoring</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Threat detection</span>
                      <Badge className="bg-green-600">Enhanced</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
