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

    const { action, userId, sessionData } = await req.json();

    switch (action) {
      case "validate_admin": {
        // Check if user has admin privileges
        const { data: adminUser, error } = await supabase
          .from("admin_users")
          .select("*")
          .eq("user_id", userId)
          .eq("is_active", true)
          .maybeSingle();

        if (error) {
          console.error("Admin validation error:", error);
          return new Response(
            JSON.stringify({
              success: false,
              error: "Admin validation failed",
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
            isAdmin: !!adminUser,
            adminData: adminUser,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      case "create_session": {
        // Create secure admin session
        const { error } = await supabase.from("admin_sessions").insert([
          {
            session_token: sessionData.token,
            ip_address: sessionData.ip,
            user_agent: sessionData.userAgent,
            expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours
          },
        ]);

        if (error) {
          console.error("Session creation error:", error);
          return new Response(
            JSON.stringify({
              success: false,
              error: "Session creation failed",
              details: error.message,
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "audit_log": {
        // Log admin activity for security audit
        const { error } = await supabase.from("admin_activity_logs").insert([
          {
            user_id: userId,
            action: sessionData.action,
            ip_address: sessionData.ip,
            details: sessionData.details || {},
          },
        ]);

        if (error) {
          console.error("Audit log error:", error);
        }

        return new Response(JSON.stringify({ success: !error }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
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
    console.error("Function error:", error);
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
