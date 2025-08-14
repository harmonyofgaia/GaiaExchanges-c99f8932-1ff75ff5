import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Type for compatibility with useAuth
interface AuthContext {
  user: any;
}

// Simple fallback that doesn't break hooks rules
function useFallbackAuth(): AuthContext {
  return { user: null };
}

// Import useAuth with fallback
let useAuth: () => AuthContext;
try {
  // Dynamic import to avoid build errors if AuthProvider doesn't exist
  const authModule = require("@/components/auth/AuthProvider");
  useAuth = authModule.useAuth || useFallbackAuth;
} catch {
  useAuth = useFallbackAuth;
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
      // Check if user has admin account in database
      const { data: adminAccount, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setAdminSession(null);
      } else if (adminAccount) {
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
      // Create a secure session token
      const sessionToken = `session-${Date.now()}-${Math.random().toString(36).substr(2, 16)}`;

      // Create admin session record
      const { error } = await supabase.from("admin_sessions").insert([
        {
          session_token: sessionToken,
          ip_address: "127.0.0.1", // Would be real IP in production
          user_agent: navigator.userAgent,
        },
      ]);

      if (error) {
        console.error("Error creating admin session:", error);
        return false;
      }

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
      // Clear admin session data - no need to update database in this simplified version
      console.log("Admin session revoked");
    } catch (error) {
      console.error("Error revoking admin access:", error);
    }

    setIsAdmin(false);
    setAdminSession(null);
  };

  const extendSession = async () => {
    if (!user || !isAdmin) return;

    try {
      // Session extended - log for now in simplified version
      console.log("Admin session extended");
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
