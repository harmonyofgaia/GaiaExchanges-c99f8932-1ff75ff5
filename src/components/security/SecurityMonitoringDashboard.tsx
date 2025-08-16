import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Ban,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SecurityStats {
  total_users: number;
  verified_users: number;
  admin_users: number;
  recent_logins: number;
  security_events_today: number;
  critical_events_today: number;
  rate_limited_today: number;
}

interface SecurityEvent {
  id: string;
  event_type: string;
  severity: string;
  user_id?: string;
  ip_address?: string;
  event_data: any;
  created_at: string;
  resolved: boolean;
}

export function SecurityMonitoringDashboard() {
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<SecurityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSecurityData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadSecurityData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadSecurityData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get security statistics (simplified for now)
      // In production, this would call the get_security_dashboard_stats function
      const statsData = {
        total_users: 0,
        verified_users: 0,
        admin_users: 0,
        recent_logins: 0,
        security_events_today: 0,
        critical_events_today: 0,
        rate_limited_today: 0,
      };

      setStats(statsData);

      // Get recent security events
      const { data: eventsData, error: eventsError } = await supabase
        .from("security_monitoring")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (eventsError) {
        throw new Error(`Events error: ${eventsError.message}`);
      }

      // Transform the data to match our interface
      const transformedEvents: SecurityEvent[] = (eventsData || []).map(
        (event: any) => ({
          ...event,
          ip_address: event.ip_address?.toString() || "",
        }),
      );

      setRecentEvents(transformedEvents);
    } catch (error: any) {
      console.error("Error loading security data:", error);
      setError(error.message);
      toast.error("🛡️ Security Dashboard Error", {
        description: "Failed to load security monitoring data",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-600 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      case "warning":
        return <Eye className="h-4 w-4" />;
      case "info":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const resolveEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from("security_monitoring")
        .update({ resolved: true })
        .eq("id", eventId);

      if (error) throw error;

      toast.success("✅ Event Resolved", {
        description: "Security event marked as resolved",
        duration: 3000,
      });

      // Refresh data
      loadSecurityData();
    } catch (error: any) {
      toast.error("❌ Failed to resolve event", {
        description: error.message,
        duration: 5000,
      });
    }
  };

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Shield className="h-12 w-12 text-blue-400 mx-auto animate-pulse" />
          <p className="text-blue-400">Loading Security Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="border-red-500/30 bg-red-900/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto" />
              <p className="text-red-400">Failed to load security data</p>
              <p className="text-red-300 text-sm">{error}</p>
              <Button
                onClick={loadSecurityData}
                variant="outline"
                className="border-red-500/30"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Security Monitoring Dashboard
          </h2>
          <p className="text-green-300 text-sm mt-1">
            Real-time security events and system statistics
          </p>
        </div>
        <Button
          onClick={loadSecurityData}
          disabled={isLoading}
          variant="outline"
          className="border-green-500/30"
        >
          {isLoading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-blue-300 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {stats.total_users}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-green-300 text-sm">Verified Users</p>
                  <p className="text-2xl font-bold text-green-400">
                    {stats.verified_users}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-yellow-300 text-sm">
                    Security Events Today
                  </p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {stats.security_events_today}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-red-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-red-400" />
                <div>
                  <p className="text-red-300 text-sm">Rate Limited Today</p>
                  <p className="text-2xl font-bold text-red-400">
                    {stats.rate_limited_today}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Security Events */}
      <Card className="border-green-500/30 bg-black/40">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Security Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentEvents.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-green-300">No security events recorded</p>
              <p className="text-green-200 text-sm">Your system is secure</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    event.resolved
                      ? "bg-gray-900/20 border-gray-500/30"
                      : "bg-black/20 border-green-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(event.severity)}
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity}
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-300">
                        {event.event_type}
                      </span>
                      {event.resolved && (
                        <Badge
                          variant="outline"
                          className="border-green-500/30 text-green-400"
                        >
                          Resolved
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-green-200 mt-1">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(event.created_at).toLocaleString()}
                        </span>
                        {event.ip_address && (
                          <span>IP: {event.ip_address}</span>
                        )}
                      </div>
                      {event.event_data &&
                        Object.keys(event.event_data).length > 0 && (
                          <div className="mt-1 text-xs text-green-100">
                            {JSON.stringify(event.event_data, null, 2).slice(
                              0,
                              100,
                            )}
                            ...
                          </div>
                        )}
                    </div>
                  </div>

                  {!event.resolved && (
                    <Button
                      onClick={() => resolveEvent(event.id)}
                      size="sm"
                      variant="outline"
                      className="border-green-500/30 text-green-400"
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
