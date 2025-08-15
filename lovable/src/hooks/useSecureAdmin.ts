import { useState, useEffect, useCallback } from "react";

interface AdminSession {
  id: string;
  timestamp: number;
  ip?: string;
}

export function useSecureAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    validateAdminSession();
  }, []);

  const validateAdminSession = () => {
    try {
      // Check both new optimized keys and old keys for backward compatibility
      const newSession = localStorage.getItem("gaia-admin") || sessionStorage.getItem("gaia-admin");
      const oldSession = localStorage.getItem("gaia-admin-session");
      const adminActive = sessionStorage.getItem("admin-active");

      let sessionData = null;

      // Try new format first
      if (newSession) {
        try {
          sessionData = JSON.parse(newSession);
        } catch (e) {
          // Invalid JSON, clear it
          localStorage.removeItem("gaia-admin");
          sessionStorage.removeItem("gaia-admin");
        }
      }

      // Fallback to old format
      if (!sessionData && oldSession) {
        const sessionExpiry = localStorage.getItem("gaia-admin-expiry");
        if (sessionExpiry) {
          const now = Date.now();
          const expiry = parseInt(sessionExpiry);

          if (now < expiry) {
            sessionData = { id: oldSession, ts: now, active: true };
          }
        }
      }

      // Check if session is valid
      if (sessionData && (adminActive === "1" || adminActive === "true")) {
        // Session is valid
        setIsAdmin(true);
        setAdminSession({
          id: sessionData.id,
          timestamp: sessionData.ts || Date.now(),
        });
      } else {
        // No valid session
        revokeAdminAccess();
      }
    } catch (error) {
      console.error("Error validating admin session:", error);
      revokeAdminAccess();
    } finally {
      setIsValidating(false);
    }
  };

  const grantAdminAccess = (): boolean => {
    try {
      // Check if another admin session exists (both new and old formats)
      const newSession = localStorage.getItem("gaia-admin") || sessionStorage.getItem("gaia-admin");
      const oldSession = localStorage.getItem("gaia-admin-session");

      if (newSession || oldSession) {
        // Check if existing session is still valid
        const adminActive = sessionStorage.getItem("admin-active");
        if (adminActive === "1" || adminActive === "true") {
          return false; // Another admin already logged in
        }
      }

      // Create new optimized admin session
      const sessionId = `admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const sessionData = {
        id: sessionId,
        ts: Date.now(),
        active: true,
      };

      // Try localStorage first, fallback to sessionStorage
      try {
        localStorage.setItem("gaia-admin", JSON.stringify(sessionData));
      } catch (storageError) {
        console.warn("LocalStorage full, using sessionStorage for admin session");
        sessionStorage.setItem("gaia-admin", JSON.stringify(sessionData));
      }

      sessionStorage.setItem("admin-active", "1");

      setIsAdmin(true);
      setAdminSession({
        id: sessionId,
        timestamp: Date.now(),
      });

      return true;
    } catch (error) {
      console.error("Error granting admin access:", error);
      return false;
    }
  };

  const revokeAdminAccess = () => {
    // Clear both new and old session formats
    localStorage.removeItem("gaia-admin");
    localStorage.removeItem("gaia-admin-session");
    localStorage.removeItem("gaia-admin-expiry");
    sessionStorage.removeItem("gaia-admin");
    sessionStorage.removeItem("admin-active");
    sessionStorage.removeItem("admin-hb");
    setIsAdmin(false);
    setAdminSession(null);
  };

  const extendSession = () => {
    if (isAdmin && adminSession) {
      try {
        const sessionData = {
          id: adminSession.id,
          ts: Date.now(),
          active: true,
        };

        // Try to update localStorage, fallback to sessionStorage
        try {
          localStorage.setItem("gaia-admin", JSON.stringify(sessionData));
        } catch (e) {
          sessionStorage.setItem("gaia-admin", JSON.stringify(sessionData));
        }

        sessionStorage.setItem("admin-active", "1");
      } catch (error) {
        console.error("Error extending session:", error);
      }
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
