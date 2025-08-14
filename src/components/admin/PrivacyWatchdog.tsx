import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Eye,
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Database,
  Users,
  Settings,
  Trash2,
  Download,
  FileText,
  Clock,
  MapPin,
  UserX,
  Key,
  Fingerprint,
  Activity,
  RefreshCw,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

interface PrivacyEvent {
  id: string;
  type:
    | "data_access"
    | "login_attempt"
    | "data_export"
    | "permission_change"
    | "gdpr_request"
    | "breach_attempt";
  user_id: string;
  username: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "pending" | "resolved" | "investigating" | "blocked";
  timestamp: Date;
  ip_address: string;
  location: string;
  metadata: Record<string, any>;
}

interface DataAccess {
  id: string;
  user_id: string;
  username: string;
  data_type: string;
  accessed_fields: string[];
  purpose: string;
  access_level: "read" | "write" | "delete";
  timestamp: Date;
  authorized_by: string;
  retention_period: string;
}

interface PrivacyMetrics {
  total_users_protected: number;
  privacy_events_today: number;
  data_requests_processed: number;
  gdpr_compliance_score: number;
  unauthorized_access_blocked: number;
  data_retention_active: boolean;
  encryption_status: "active" | "partial" | "inactive";
  audit_trail_complete: boolean;
}

interface GDPRRequest {
  id: string;
  user_id: string;
  username: string;
  request_type: "access" | "correction" | "deletion" | "portability" | "restriction";
  status: "submitted" | "processing" | "completed" | "rejected";
  submission_date: Date;
  completion_date?: Date;
  description: string;
  processing_notes: string;
}

export function PrivacyWatchdog() {
  const [privacyEvents, setPrivacyEvents] = useState<PrivacyEvent[]>([]);
  const [dataAccesses, setDataAccesses] = useState<DataAccess[]>([]);
  const [gdprRequests, setGDPRRequests] = useState<GDPRRequest[]>([]);
  const [privacyMetrics, setPrivacyMetrics] = useState<PrivacyMetrics>({
    total_users_protected: 0,
    privacy_events_today: 0,
    data_requests_processed: 0,
    gdpr_compliance_score: 0,
    unauthorized_access_blocked: 0,
    data_retention_active: false,
    encryption_status: "active",
    audit_trail_complete: false,
  });
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    initializePrivacyData();
    initializeMetrics();

    // Real-time monitoring
    const interval = setInterval(() => {
      if (isMonitoring) {
        simulatePrivacyEvent();
        updateMetrics();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const initializePrivacyData = () => {
    const mockEvents: PrivacyEvent[] = [
      {
        id: "event-1",
        type: "data_access",
        user_id: "user-123",
        username: "EcoWarrior2024",
        description: "Accessed personal profile data",
        severity: "low",
        status: "resolved",
        timestamp: new Date(Date.now() - 1800000),
        ip_address: "192.168.1.45",
        location: "New York, USA",
        metadata: { fields: ["email", "username"], purpose: "profile_update" },
      },
      {
        id: "event-2",
        type: "login_attempt",
        user_id: "user-456",
        username: "SolarAdvocate",
        description: "Multiple failed login attempts detected",
        severity: "high",
        status: "investigating",
        timestamp: new Date(Date.now() - 3600000),
        ip_address: "185.234.12.67",
        location: "Unknown",
        metadata: { attempts: 5, blocked: true },
      },
      {
        id: "event-3",
        type: "gdpr_request",
        user_id: "user-789",
        username: "OceanGuardian",
        description: "GDPR data deletion request submitted",
        severity: "medium",
        status: "pending",
        timestamp: new Date(Date.now() - 7200000),
        ip_address: "94.123.45.78",
        location: "London, UK",
        metadata: { request_type: "deletion", data_scope: "all_personal_data" },
      },
      {
        id: "event-4",
        type: "breach_attempt",
        user_id: "unknown",
        username: "Unknown",
        description: "Unauthorized database access attempt",
        severity: "critical",
        status: "blocked",
        timestamp: new Date(Date.now() - 900000),
        ip_address: "45.67.89.123",
        location: "Suspicious",
        metadata: { target: "user_database", method: "sql_injection" },
      },
    ];

    const mockGDPRRequests: GDPRRequest[] = [
      {
        id: "gdpr-1",
        user_id: "user-789",
        username: "OceanGuardian",
        request_type: "deletion",
        status: "processing",
        submission_date: new Date(Date.now() - 7200000),
        description: "Request to delete all personal data from platform",
        processing_notes: "Verifying identity and scope of data deletion",
      },
      {
        id: "gdpr-2",
        user_id: "user-234",
        username: "GreenTransport",
        request_type: "access",
        status: "completed",
        submission_date: new Date(Date.now() - 86400000),
        completion_date: new Date(Date.now() - 3600000),
        description: "Request for copy of all stored personal data",
        processing_notes: "Data package generated and delivered securely",
      },
      {
        id: "gdpr-3",
        user_id: "user-567",
        username: "EcoChampion",
        request_type: "correction",
        status: "submitted",
        submission_date: new Date(Date.now() - 1800000),
        description: "Request to correct inaccurate location data",
        processing_notes: "Initial review pending",
      },
    ];

    const mockDataAccesses: DataAccess[] = [
      {
        id: "access-1",
        user_id: "user-123",
        username: "EcoWarrior2024",
        data_type: "profile_data",
        accessed_fields: ["email", "username", "eco_score"],
        purpose: "profile_viewing",
        access_level: "read",
        timestamp: new Date(Date.now() - 1800000),
        authorized_by: "self",
        retention_period: "30_days",
      },
      {
        id: "access-2",
        user_id: "admin-1",
        username: "Synatic",
        data_type: "user_analytics",
        accessed_fields: ["activity_logs", "login_history"],
        purpose: "security_audit",
        access_level: "read",
        timestamp: new Date(Date.now() - 3600000),
        authorized_by: "admin_privileges",
        retention_period: "7_days",
      },
    ];

    setPrivacyEvents(mockEvents);
    setGDPRRequests(mockGDPRRequests);
    setDataAccesses(mockDataAccesses);
  };

  const initializeMetrics = () => {
    setPrivacyMetrics({
      total_users_protected: 12847,
      privacy_events_today: 156,
      data_requests_processed: 234,
      gdpr_compliance_score: 98.5,
      unauthorized_access_blocked: 45,
      data_retention_active: true,
      encryption_status: "active",
      audit_trail_complete: true,
    });
  };

  const updateMetrics = () => {
    setPrivacyMetrics((prev) => ({
      ...prev,
      privacy_events_today: prev.privacy_events_today + Math.floor(Math.random() * 3),
      unauthorized_access_blocked: prev.unauthorized_access_blocked + (Math.random() > 0.9 ? 1 : 0),
      data_requests_processed: prev.data_requests_processed + (Math.random() > 0.8 ? 1 : 0),
    }));
  };

  const simulatePrivacyEvent = () => {
    if (Math.random() > 0.85) {
      const eventTypes = ["data_access", "login_attempt", "data_export", "permission_change"];
      const severities = ["low", "medium", "high"];
      const randomEvent: PrivacyEvent = {
        id: `event-${Date.now()}`,
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)] as any,
        user_id: `user-${Math.floor(Math.random() * 1000)}`,
        username: `User${Math.floor(Math.random() * 1000)}`,
        description: "Automated privacy event detection",
        severity: severities[Math.floor(Math.random() * severities.length)] as any,
        status: "pending",
        timestamp: new Date(),
        ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
        location: "Real-time Detection",
        metadata: { automated: true },
      };

      setPrivacyEvents((prev) => [randomEvent, ...prev.slice(0, 19)]);
    }
  };

  const resolvePrivacyEvent = (eventId: string) => {
    setPrivacyEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: "resolved" as const } : event
      )
    );

    const event = privacyEvents.find((e) => e.id === eventId);
    toast.success("Privacy event resolved!", {
      description: `${event?.description} has been marked as resolved`,
      duration: 3000,
    });
  };

  const blockPrivacyEvent = (eventId: string) => {
    setPrivacyEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, status: "blocked" as const } : event))
    );

    const event = privacyEvents.find((e) => e.id === eventId);
    toast.success("Privacy threat blocked!", {
      description: `${event?.description} has been blocked and user notified`,
      duration: 3000,
    });
  };

  const processGDPRRequest = (requestId: string, action: "approve" | "reject") => {
    setGDPRRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: action === "approve" ? "completed" : "rejected",
              completion_date: new Date(),
              processing_notes:
                action === "approve"
                  ? "Request processed successfully"
                  : "Request rejected due to insufficient verification",
            }
          : request
      )
    );

    const request = gdprRequests.find((r) => r.id === requestId);
    toast.success(`GDPR request ${action}d!`, {
      description: `${request?.username}'s ${request?.request_type} request has been ${action}d`,
      duration: 3000,
    });
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case "medium":
        return <Eye className="h-4 w-4 text-yellow-400" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Eye className="h-4 w-4 text-gray-400" />;
    }
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
        return "border-green-500/50 text-green-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "blocked":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "investigating":
        return <Search className="h-4 w-4 text-blue-400" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "border-green-500/50 text-green-400";
      case "blocked":
        return "border-red-500/50 text-red-400";
      case "investigating":
        return "border-blue-500/50 text-blue-400";
      case "pending":
        return "border-yellow-500/50 text-yellow-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "data_access":
        return <Database className="h-4 w-4" />;
      case "login_attempt":
        return <Key className="h-4 w-4" />;
      case "data_export":
        return <Download className="h-4 w-4" />;
      case "permission_change":
        return <Settings className="h-4 w-4" />;
      case "gdpr_request":
        return <FileText className="h-4 w-4" />;
      case "breach_attempt":
        return <Shield className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const filteredEvents = privacyEvents.filter(
    (event) => selectedFilter === "all" || event.status === selectedFilter
  );

  return (
    <div className="space-y-6">
      {/* Privacy Metrics Dashboard */}
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-5 w-5" />
            Privacy Watchdog - User & Admin Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {privacyMetrics.total_users_protected.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Users Protected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {privacyMetrics.privacy_events_today}
              </div>
              <div className="text-sm text-muted-foreground">Events Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {privacyMetrics.data_requests_processed}
              </div>
              <div className="text-sm text-muted-foreground">Requests Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {privacyMetrics.gdpr_compliance_score.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">GDPR Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {privacyMetrics.unauthorized_access_blocked}
              </div>
              <div className="text-sm text-muted-foreground">Threats Blocked</div>
            </div>
            <div className="text-center">
              <Badge
                variant="outline"
                className={
                  privacyMetrics.data_retention_active
                    ? "border-green-500/50 text-green-400"
                    : "border-red-500/50 text-red-400"
                }
              >
                {privacyMetrics.data_retention_active ? "Active" : "Inactive"}
              </Badge>
              <div className="text-sm text-muted-foreground">Data Retention</div>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                {privacyMetrics.encryption_status}
              </Badge>
              <div className="text-sm text-muted-foreground">Encryption</div>
            </div>
            <div className="text-center">
              <Badge
                variant="outline"
                className={
                  privacyMetrics.audit_trail_complete
                    ? "border-green-500/50 text-green-400"
                    : "border-yellow-500/50 text-yellow-400"
                }
              >
                {privacyMetrics.audit_trail_complete ? "Complete" : "Partial"}
              </Badge>
              <div className="text-sm text-muted-foreground">Audit Trail</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${isMonitoring ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
                />
                <span className="text-sm text-muted-foreground">
                  Real-time Monitoring: {isMonitoring ? "Active" : "Paused"}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={
                isMonitoring
                  ? "border-red-500/50 text-red-400"
                  : "border-green-500/50 text-green-400"
              }
            >
              {isMonitoring ? (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Pause Monitoring
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 mr-2" />
                  Resume Monitoring
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">🔍 Privacy Events</TabsTrigger>
          <TabsTrigger value="gdpr">📋 GDPR Requests</TabsTrigger>
          <TabsTrigger value="access">👁️ Data Access Log</TabsTrigger>
          <TabsTrigger value="settings">⚙️ Privacy Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          {/* Filters */}
          <Card className="border-gray-500/20">
            <CardContent className="pt-4">
              <div className="flex gap-2 flex-wrap">
                {["all", "pending", "investigating", "resolved", "blocked"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="capitalize"
                  >
                    <Filter className="h-3 w-3 mr-1" />
                    {filter === "all" ? "All Events" : filter}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Events List */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="border-gray-500/20 bg-black/20">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(event.type)}
                        <h3 className="font-semibold text-white">{event.description}</h3>
                        <Badge variant="outline" className={getSeverityColor(event.severity)}>
                          {getSeverityIcon(event.severity)}
                          {event.severity}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(event.status)}>
                          {getStatusIcon(event.status)}
                          {event.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">User</div>
                          <div className="font-medium text-white">{event.username}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">IP Address</div>
                          <div className="font-medium text-blue-400">{event.ip_address}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Location</div>
                          <div className="font-medium text-purple-400">{event.location}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Time</div>
                          <div className="font-medium text-yellow-400">
                            {event.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Type: {event.type.replace("_", " ")} • ID: {event.user_id}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {event.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => resolvePrivacyEvent(event.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => blockPrivacyEvent(event.id)}
                            className="border-red-500/50 text-red-400"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Block
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gdpr" className="space-y-4">
          <div className="space-y-4">
            {gdprRequests.map((request) => (
              <Card key={request.id} className="border-purple-500/20 bg-black/20">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-purple-400" />
                        <h3 className="font-semibold text-white">{request.description}</h3>
                        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                          {request.request_type}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">User</div>
                          <div className="font-medium text-white">{request.username}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Submitted</div>
                          <div className="font-medium text-blue-400">
                            {request.submission_date.toLocaleDateString()}
                          </div>
                        </div>
                        {request.completion_date && (
                          <div>
                            <div className="text-muted-foreground">Completed</div>
                            <div className="font-medium text-green-400">
                              {request.completion_date.toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground mb-2">
                        Processing Notes: {request.processing_notes}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {request.status === "submitted" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => processGDPRRequest(request.id, "approve")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => processGDPRRequest(request.id, "reject")}
                            className="border-red-500/50 text-red-400"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <div className="space-y-4">
            {dataAccesses.map((access) => (
              <Card key={access.id} className="border-green-500/20 bg-black/20">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Database className="h-5 w-5 text-green-400" />
                        <h3 className="font-semibold text-white">
                          {access.data_type.replace("_", " ")}
                        </h3>
                        <Badge variant="outline" className="border-green-500/50 text-green-400">
                          {access.access_level}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">User</div>
                          <div className="font-medium text-white">{access.username}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Purpose</div>
                          <div className="font-medium text-blue-400">
                            {access.purpose.replace("_", " ")}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Authorized By</div>
                          <div className="font-medium text-purple-400">
                            {access.authorized_by.replace("_", " ")}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Retention</div>
                          <div className="font-medium text-yellow-400">
                            {access.retention_period.replace("_", " ")}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white">Accessed Fields:</div>
                        <div className="flex flex-wrap gap-1">
                          {access.accessed_fields.map((field, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-blue-500/50 text-blue-400"
                            >
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground mt-2">
                        Access Time: {access.timestamp.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        Audit Log
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Privacy Protection Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Real-time Monitoring</span>
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Encryption</span>
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      AES-256
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Access Logging</span>
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      Comprehensive
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Retention</span>
                    <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                      GDPR Compliant
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>GDPR Compliance</span>
                      <span>{privacyMetrics.gdpr_compliance_score.toFixed(1)}%</span>
                    </div>
                    <Progress value={privacyMetrics.gdpr_compliance_score} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Privacy by Design</span>
                      <span>96.2%</span>
                    </div>
                    <Progress value={96.2} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>User Consent Management</span>
                      <span>99.1%</span>
                    </div>
                    <Progress value={99.1} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Minimization</span>
                      <span>94.8%</span>
                    </div>
                    <Progress value={94.8} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
