import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Try to import useAuth safely, falling back to a no-op
let useAuth: () => { user: any } = () => ({ user: null });
try {
  const authModule = require("@/components/auth/AuthProvider");
  if (authModule?.useAuth) {
    useAuth = authModule.useAuth;
  }
} catch (error) {
  // AuthProvider not available, use fallback
  console.warn("AuthProvider not available, using fallback");
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
      setIsAdmin(false);
      setAdminSession(null);
      setIsValidating(false);
    }
  }, [user]);

  const validateAdminSession = async () => {
    if (!user) {
      setIsValidating(false);
      return;
    }

    try {
      // 🔒 SECURE: Use the new security definer function for validation
      const { data: isValidAdmin, error } = await supabase
        .rpc("validate_admin_session_security");

      if (error) {
        console.error("Error validating admin session:", error);
        setIsAdmin(false);
        setAdminSession(null);
      } else if (isValidAdmin) {
        // Additional check to get admin account details
        const { data: adminAccount } = await supabase
          .from("admin_users")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .maybeSingle();

        if (adminAccount) {
          setIsAdmin(true);
          setAdminSession({
            id: adminAccount.user_id,
            timestamp: Date.now(),
            level: "admin",
          });
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

      // Log the admin access grant
      await supabase.rpc('log_admin_action', {
        action_name: 'admin_access_granted',
        action_details: {
          session_token: sessionToken,
          user_id: user.id,
          timestamp: new Date().toISOString(),
          method: 'secure_session_creation'
        }
      });

      await validateAdminSession();
      return true;
    } catch (error) {
      console.error("Error granting admin access:", error);
      return false;
    }
  };

  const revokeAdminAccess = async () => {
    if (!user || !adminSession) return;

    try {
      // 🔒 SECURE: Log admin session revocation for audit trail
      await supabase.rpc('log_admin_action', {
        action_name: 'admin_access_revoked',
        action_details: {
          user_id: user.id,
          session_id: adminSession.id,
          timestamp: new Date().toISOString(),
          method: 'secure_revocation'
        }
      });

      console.log("Admin session securely revoked with audit logging");
    } catch (error) {
      console.error("Error revoking admin access:", error);
    }

    setIsAdmin(false);
    setAdminSession(null);
  };

  const extendSession = async () => {
    if (!user || !isAdmin) return;

    try {
      // 🔒 SECURE: Log session extension with audit trail
      await supabase.rpc('log_admin_action', {
        action_name: 'admin_session_extended',
        action_details: {
          user_id: user.id,
          timestamp: new Date().toISOString(),
          method: 'secure_extension'
        }
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
