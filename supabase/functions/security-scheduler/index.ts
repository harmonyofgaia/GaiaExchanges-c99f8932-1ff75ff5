import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get current time and determine what scans to run
    const now = new Date();
    const hour = now.getHours();

    const tasks = [];

    // Run comprehensive scan every 6 hours
    if (hour % 6 === 0) {
      tasks.push(runSecurityScan(supabaseClient, "comprehensive"));
    }

    // Run threat detection every hour
    if (hour % 1 === 0) {
      tasks.push(runThreatDetection(supabaseClient));
    }

    // Run performance scan every 12 hours
    if (hour % 12 === 0) {
      tasks.push(runPerformanceScan(supabaseClient));
    }

    // Weekly compliance report on Sunday at midnight
    if (now.getDay() === 0 && hour === 0) {
      tasks.push(generateWeeklyReport(supabaseClient));
    }

    const results = await Promise.all(tasks);

    return new Response(
      JSON.stringify({
        success: true,
        tasksExecuted: results.length,
        results: results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Security scheduler error:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});

async function runSecurityScan(supabaseClient: unknown, scanType: string) {
  try {
    // Call the security monitor function
    const response = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/security-monitor`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scanType }),
    });

    const result = await response.json();
    return { task: "security_scan", success: response.ok, result };
  } catch (error) {
    console.error("Error running security scan:", error);
    return { task: "security_scan", success: false, error: error.message };
  }
}

async function runThreatDetection(supabaseClient: unknown) {
  try {
    // Simulate threat intelligence gathering
    const threats = await gatherThreatIntelligence(supabaseClient);

    // Store new threats
    if (threats.length > 0) {
      await supabaseClient.from("threat_intelligence").insert(threats);
    }

    return {
      task: "threat_detection",
      success: true,
      threatsFound: threats.length,
    };
  } catch (error) {
    console.error("Error running threat detection:", error);
    return { task: "threat_detection", success: false, error: error.message };
  }
}

async function runPerformanceScan(supabaseClient: unknown) {
  try {
    // Simulate performance monitoring
    const performanceMetrics = {
      avg_response_time: 150,
      active_connections: 45,
      slow_queries: 2,
      index_usage: 98.5,
    };

    return {
      task: "performance_scan",
      success: true,
      metrics: performanceMetrics,
    };
  } catch (error) {
    console.error("Error running performance scan:", error);
    return { task: "performance_scan", success: false, error: error.message };
  }
}

async function generateWeeklyReport(supabaseClient: unknown) {
  try {
    // Call the weekly report function
    const response = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/functions/v1/weekly-security-report`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return { task: "weekly_report", success: response.ok, result };
  } catch (error) {
    console.error("Error generating weekly report:", error);
    return { task: "weekly_report", success: false, error: error.message };
  }
}

async function gatherThreatIntelligence(supabaseClient: unknown) {
  // Simulate threat intelligence from various sources
  const threats = [];

  // Mock suspicious activity detection
  if (Math.random() < 0.1) {
    // 10% chance of detecting a threat
    threats.push({
      threat_type: "suspicious_login",
      threat_data: {
        ip: "192.168.1.100",
        user_agent: "Suspicious Bot",
        login_attempts: 5,
      },
      severity_level: "medium",
      ip_address: "192.168.1.100",
      user_agent: "Suspicious Bot",
      geolocation: { country: "Unknown", city: "Unknown" },
      status: "active",
    });
  }

  if (Math.random() < 0.05) {
    // 5% chance of high severity threat
    threats.push({
      threat_type: "brute_force_attack",
      threat_data: {
        ip: "10.0.0.1",
        attempts: 50,
        time_window: "5 minutes",
      },
      severity_level: "high",
      ip_address: "10.0.0.1",
      user_agent: "Automated Attack Tool",
      geolocation: { country: "Unknown", city: "Unknown" },
      status: "active",
    });
  }

  return threats;
}
