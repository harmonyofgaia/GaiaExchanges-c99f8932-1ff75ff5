import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SecurityEvent {
  id: string;
  user_id?: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  ip_address?: string | null;
  user_agent?: string;
  success: boolean;
  details: Record<string, any>;
  risk_score: number;
  created_at: string;
}

interface SecurityIncident {
  id: string;
  incident_type: string;
  severity: string;
  user_id?: string;
  ip_address?: string | null;
  user_agent?: string;
  details: Record<string, any>;
  resolved: boolean;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
}

export function useSecurityMonitoring() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      const [eventsResponse, incidentsResponse] = await Promise.all([
        supabase
          .from("security_audit_logs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100),
        supabase
          .from("security_incidents")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

      if (eventsResponse.error) throw eventsResponse.error;
      if (incidentsResponse.error) throw incidentsResponse.error;

      setEvents((eventsResponse.data || []) as SecurityEvent[]);
      setIncidents((incidentsResponse.data || []) as SecurityIncident[]);
    } catch (error) {
      console.error("Failed to load security data:", error);
      toast.error("Failed to load security monitoring data");
    } finally {
      setLoading(false);
    }
  };

  const logSecurityEvent = async (
    action: string,
    details: Record<string, any> = {},
    riskScore: number = 0
  ): Promise<void> => {
    try {
      const { error } = await supabase.rpc("log_security_event", {
        p_user_id: (await supabase.auth.getUser()).data.user?.id,
        p_action: action,
        p_details: details,
        p_ip_address: null, // In production, capture real IP
        p_risk_score: riskScore,
      });

      if (error) throw error;

      // Reload events to show the new one
      await loadSecurityData();
    } catch (error) {
      console.error("Failed to log security event:", error);
    }
  };

  const createSecurityIncident = async (
    incidentType: string,
    severity: "low" | "medium" | "high" | "critical",
    details: Record<string, any> = {}
  ): Promise<void> => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      
      const { error } = await supabase.from("security_incidents").insert([
        {
          incident_type: incidentType,
          severity,
          user_id: user?.id,
          ip_address: null, // In production, capture real IP
          user_agent: navigator.userAgent,
          details,
        },
      ]);

      if (error) throw error;

      toast.warning(`Security incident reported: ${incidentType}`);
      await loadSecurityData();
    } catch (error) {
      console.error("Failed to create security incident:", error);
      toast.error("Failed to report security incident");
    }
  };

  const resolveIncident = async (incidentId: string): Promise<void> => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      
      const { error } = await supabase
        .from("security_incidents")
        .update({
          resolved: true,
          resolved_at: new Date().toISOString(),
          resolved_by: user?.id,
        })
        .eq("id", incidentId);

      if (error) throw error;

      toast.success("Security incident resolved");
      await loadSecurityData();
    } catch (error) {
      console.error("Failed to resolve incident:", error);
      toast.error("Failed to resolve security incident");
    }
  };

  const checkRateLimit = async (
    identifier: string,
    actionType: string,
    maxAttempts: number = 5,
    windowMinutes: number = 60
  ): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc("check_rate_limit", {
        p_identifier: identifier,
        p_action_type: actionType,
        p_max_attempts: maxAttempts,
        p_window_minutes: windowMinutes,
      });

      if (error) throw error;
      
      if (!data) {
        await createSecurityIncident(
          "rate_limit_exceeded",
          "medium",
          { identifier, actionType, maxAttempts, windowMinutes }
        );
      }

      return data;
    } catch (error) {
      console.error("Failed to check rate limit:", error);
      return false;
    }
  };

  return {
    events,
    incidents,
    loading,
    logSecurityEvent,
    createSecurityIncident,
    resolveIncident,
    checkRateLimit,
    refreshData: loadSecurityData,
  };
}