import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Create admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action } = await req.json();

    switch (action) {
      case "cleanup_security_tables": {
        // Clean up old security records
        const { data: cleanupResult, error } = await supabase
          .rpc("cleanup_security_tables");

        if (error) {
          console.error("Security cleanup error:", error);
          return new Response(
            JSON.stringify({
              success: false,
              error: "Security cleanup failed",
              details: error.message,
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        return new Response(
          JSON.stringify({
            success: true,
            cleaned_records: cleanupResult,
            message: `Cleaned up ${cleanupResult} expired security records`,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      case "security_health_check": {
        // Perform comprehensive security health check
        const healthChecks = [];

        // Check for unresolved critical incidents
        const { data: criticalIncidents, error: incidentsError } = await supabase
          .from("security_incidents")
          .select("count")
          .eq("resolved", false)
          .eq("severity", "critical");

        if (!incidentsError) {
          healthChecks.push({
            check: "critical_incidents",
            status: criticalIncidents.length === 0 ? "PASS" : "FAIL",
            details: `${criticalIncidents.length} unresolved critical incidents`,
          });
        }

        // Check for rate limit violations in last hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const { data: rateLimitViolations, error: rateLimitError } = await supabase
          .from("rate_limits")
          .select("count")
          .not("blocked_until", "is", null)
          .gte("updated_at", oneHourAgo);

        if (!rateLimitError) {
          healthChecks.push({
            check: "rate_limit_violations",
            status: rateLimitViolations.length < 10 ? "PASS" : "WARN",
            details: `${rateLimitViolations.length} rate limit violations in last hour`,
          });
        }

        // Check for high-risk security events
        const { data: highRiskEvents, error: eventsError } = await supabase
          .from("security_audit_logs")
          .select("count")
          .gte("risk_score", 8)
          .gte("created_at", oneHourAgo);

        if (!eventsError) {
          healthChecks.push({
            check: "high_risk_events",
            status: highRiskEvents.length < 5 ? "PASS" : "WARN",
            details: `${highRiskEvents.length} high-risk events in last hour`,
          });
        }

        // Check for expired admin sessions
        const { data: expiredSessions, error: sessionsError } = await supabase
          .from("admin_security_sessions")
          .select("count")
          .eq("is_active", true)
          .lt("expires_at", new Date().toISOString());

        if (!sessionsError) {
          healthChecks.push({
            check: "expired_admin_sessions",
            status: expiredSessions.length === 0 ? "PASS" : "WARN",
            details: `${expiredSessions.length} expired but still active admin sessions`,
          });
        }

        const overallStatus = healthChecks.every(check => check.status === "PASS") 
          ? "HEALTHY" 
          : healthChecks.some(check => check.status === "FAIL") 
            ? "CRITICAL" 
            : "WARNING";

        return new Response(
          JSON.stringify({
            success: true,
            overall_status: overallStatus,
            checks: healthChecks,
            timestamp: new Date().toISOString(),
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      case "emergency_lockdown": {
        // Emergency lockdown: disable all admin sessions and create incident
        const { error: lockdownError } = await supabase
          .from("admin_security_sessions")
          .update({ is_active: false })
          .eq("is_active", true);

        if (lockdownError) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Emergency lockdown failed",
              details: lockdownError.message,
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        // Create emergency incident
        const { error: incidentError } = await supabase
          .from("security_incidents")
          .insert([{
            incident_type: "emergency_lockdown",
            severity: "critical",
            details: {
              triggered_by: "security_cleanup_function",
              timestamp: new Date().toISOString(),
              reason: "Emergency lockdown initiated"
            }
          }]);

        return new Response(
          JSON.stringify({
            success: true,
            message: "Emergency lockdown completed",
            actions_taken: [
              "All admin sessions deactivated",
              "Emergency incident logged"
            ]
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: "Invalid action" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
    }
  } catch (error) {
    console.error("Security cleanup function error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});