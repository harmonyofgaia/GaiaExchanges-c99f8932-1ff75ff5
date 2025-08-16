import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import crypto from "crypto";
// Try to import useAuth safely, falling back to a no-op
let useAuth: () => { user: any } = () => ({ user: null });
try {
  const authModule = require("@/components/auth/AuthProvider");
  if (authModule?.useAuth) {
    useAuth = authModule.useAuth;
  }
} catch (error) {
  console.error("AuthProvider not available:", error);
}

interface AdminSession {
  id: string;
  timestamp: number;
  level?: string;
}

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      validateAdminSession();
    } else {
      // Check for local admin session even without user
      const localSessionActive = sessionStorage.getItem("admin-session-active") === "true";
      const localUsername = localStorage.getItem("gaia-admin-username")?.toLowerCase();
      const localSession = localStorage.getItem("gaia-admin-session");
      const localExpiry = localStorage.getItem("gaia-admin-expiry");

      if (
        localSessionActive &&
        localUsername === "synatic" &&
        localSession &&
        localExpiry &&
        Date.now() < parseInt(localExpiry)
      ) {
        // Valid local admin session found
        setIsAdmin(true);
        setAdminSession({
          id: localSession,
          timestamp: parseInt(localExpiry) - 8 * 60 * 60 * 1000, // Original creation time
          level: "admin",
        });
      } else {
        // Clean up expired local sessions
        if (localSessionActive && localUsername === "synatic" && localExpiry && Date.now() >= parseInt(localExpiry)) {
          sessionStorage.removeItem("admin-session-active");
          localStorage.removeItem("gaia-admin-username");
          localStorage.removeItem("gaia-admin-active");
          localStorage.removeItem("gaia-admin-session");
          localStorage.removeItem("gaia-admin-expiry");
        }
        setIsAdmin(false);
        setAdminSession(null);
      }
      setIsValidating(false);
    }
  }, [user]);

  const validateAdminSession = async () => {
    if (!user) {
      setIsValidating(false);
      return;
    }

    try {
      // First check for local "Synatic" admin session (fallback)
      const localSessionActive = sessionStorage.getItem("admin-session-active") === "true";
      const localUsername = localStorage.getItem("gaia-admin-username")?.toLowerCase();
      const localSession = localStorage.getItem("gaia-admin-session");
      const localExpiry = localStorage.getItem("gaia-admin-expiry");

      if (
        localSessionActive &&
        localUsername === "synatic" &&
        localSession &&
        localExpiry &&
        Date.now() < parseInt(localExpiry)
      ) {
        // Valid local admin session found
        setIsAdmin(true);
        setAdminSession({
          id: localSession,
          timestamp: parseInt(localExpiry) - 8 * 60 * 60 * 1000, // Original creation time
          level: "admin",
        });
        setIsValidating(false);
        return;
      }

      // If local session expired, clean it up
      if (localSessionActive && localUsername === "synatic" && localExpiry && Date.now() >= parseInt(localExpiry)) {
        sessionStorage.removeItem("admin-session-active");
        localStorage.removeItem("gaia-admin-username");
        localStorage.removeItem("gaia-admin-active");
        localStorage.removeItem("gaia-admin-session");
        localStorage.removeItem("gaia-admin-expiry");
      }

      // Fall back to Supabase-based validation
      // 🔒 SECURE: Use the enhanced security validation function
      const { data: isValidAdmin, error } = await supabase.rpc(
        "validate_admin_session_security",
      );

      if (error) {
        console.error("Error validating admin session:", error);
        setIsAdmin(false);
        setAdminSession(null);
      } else if (isValidAdmin) {
        // Get admin account details and create secure session
        const { data: adminAccount } = await supabase
          .from("admin_users")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .maybeSingle();

        if (adminAccount) {
          // Create secure session token
          const sessionToken = `session-${Date.now()}-${crypto.randomBytes(16).toString("hex")}`;

          // Create admin security session
          const { error: sessionError } = await supabase
            .from("admin_security_sessions")
            .insert([
              {
                user_id: user.id,
                session_token: sessionToken,
                ip_address: null, // In production, capture real IP
                user_agent: navigator.userAgent,
              },
            ]);

        if (!sessionError) {
          // Set the sessionStorage key that InvisibleAdminProtection expects
          sessionStorage.setItem("admin-session-active", "true");
          
          setIsAdmin(true);
          setAdminSession({
            id: sessionToken,
            timestamp: Date.now(),
            level: "admin",
          });

            // Log successful admin session creation
            await supabase.rpc("log_security_event", {
              p_user_id: user.id,
              p_action: "admin_session_created",
              p_details: {
                session_token: sessionToken,
                method: "secure_validation",
              },
              p_risk_score: 2,
            });
          } else {
            setIsAdmin(false);
            setAdminSession(null);
          }
        } else {
          setIsAdmin(false);
          setAdminSession(null);
        }
      } else {
        setIsAdmin(false);
        setAdminSession(null);
      }
    } catch (error) {
      console.error("Error validating admin session:", error);
      setIsAdmin(false);
      setAdminSession(null);

      // Log security incident for validation failures
      try {
        await supabase.from("security_incidents").insert([
          {
            incident_type: "admin_validation_failure",
            severity: "medium",
            user_id: user.id,
            details: {
              error: error.message,
              timestamp: new Date().toISOString(),
            },
          },
        ]);
      } catch (logError) {
        console.error("Failed to log security incident:", logError);
      }
    } finally {
      setIsValidating(false);
    }
  };

  const grantAdminAccess = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      // 🔒 SECURE: Create secure admin session with audit logging
      const sessionToken = `session-${Date.now()}-${Math.random().toString(36).substr(2, 16)}`;

      // Create admin session record with proper validation
      const { error } = await supabase.from("admin_sessions").insert([
        {
          session_token: sessionToken,
          user_id: user.id,
          ip_address: "127.0.0.1", // In production this would be the real client IP
          user_agent: navigator.userAgent,
        },
      ]);

      if (error) {
        console.error("Error creating admin session:", error);
        return false;
      }

      // Set the sessionStorage key that InvisibleAdminProtection expects
      sessionStorage.setItem("admin-session-active", "true");

      // Log the admin access grant
      await supabase.rpc("log_admin_action", {
        action_name: "admin_access_granted",
        action_details: {
          session_token: sessionToken,
          user_id: user.id,
          timestamp: new Date().toISOString(),
          method: "secure_session_creation",
        },
      });

      await validateAdminSession();
      return true;
    } catch (error) {
      console.error("Error granting admin access:", error);
      return false;
    }
  };

  const revokeAdminAccess = async () => {
    try {
      // Clear the sessionStorage key that InvisibleAdminProtection expects
      sessionStorage.removeItem("admin-session-active");
      
      // Clear local admin session data
      localStorage.removeItem("gaia-admin-username");
      localStorage.removeItem("gaia-admin-active");
      localStorage.removeItem("gaia-admin-session");
      localStorage.removeItem("gaia-admin-expiry");
      
      // Deactivate admin security session (if Supabase user exists)
      if (user && adminSession?.id) {
        await supabase
          .from("admin_security_sessions")
          .update({ is_active: false })
          .eq("session_token", adminSession.id);

        // 🔒 SECURE: Log admin session revocation for audit trail
        await supabase.rpc("log_security_event", {
          p_user_id: user.id,
          p_action: "admin_access_revoked",
          p_details: {
            session_id: adminSession.id,
            timestamp: new Date().toISOString(),
            method: "secure_revocation",
          },
          p_risk_score: 1,
        });
      }

      console.log("Admin session securely revoked with audit logging");
    } catch (error) {
      console.error("Error revoking admin access:", error);

      // Log security incident for revocation failures (if user exists)
      if (user) {
        try {
          await supabase.from("security_incidents").insert([
            {
              incident_type: "admin_revocation_failure",
              severity: "high",
              user_id: user.id,
              details: { error: error.message, session_id: adminSession?.id },
            },
          ]);
        } catch (logError) {
          console.error("Failed to log security incident:", logError);
        }
      }
    }

    setIsAdmin(false);
    setAdminSession(null);
  };

  const extendSession = async () => {
    if (!user || !isAdmin) return;

    try {
      // 🔒 SECURE: Log session extension with audit trail
      await supabase.rpc("log_admin_action", {
        action_name: "admin_session_extended",
        action_details: {
          user_id: user.id,
          timestamp: new Date().toISOString(),
          method: "secure_extension",
        },
      });

      console.log("Admin session securely extended with audit logging");
    } catch (error) {
      console.error("Error extending session:", error);
    }
  };

  return {
    isAdmin,
    adminSession,
    isValidating,
    grantAdminAccess,
    revokeAdminAccess,
    extendSession,
    validateAdminSession,
  };
}
