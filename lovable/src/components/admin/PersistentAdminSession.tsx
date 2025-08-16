import { useEffect, useState, useCallback} from "react";
import { useSecureAdmin } from "@/hooks/useSecureAdmin";
import { toast } from "sonner";

export function PersistentAdminSession() {
  const { isAdmin, adminSession } = useSecureAdmin();
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    // Optimized session management to prevent storage quota issues
    const createOptimizedSession = () => {
      if (isAdmin && adminSession) {
        try {
          // Clear any large data that might cause quota issues
          const keysToClean = [
            "gaia-admin-backup",
            "admin-quantum-key",
            "admin-mega-data",
            "admin-logs",
            "admin-cache",
            "admin-temp-data",
          ];

          keysToClean.forEach((key) => {
            try {
              localStorage.removeItem(key);
              sessionStorage.removeItem(key);
            } catch (e) {
              // Ignore cleanup errors
            }
          });

          // Use minimal session data only
          const essentialData = {
            id: adminSession.id,
            ts: Date.now(),
            active: true,
          };

          // Try localStorage first, fallback to sessionStorage
          try {
            localStorage.setItem("gaia-admin", JSON.stringify(essentialData));
          } catch (storageError) {
            // If localStorage fails, use sessionStorage only
            console.warn("LocalStorage full, using sessionStorage");
            sessionStorage.setItem("gaia-admin", JSON.stringify(essentialData));
          }

          // Always set session flag
          sessionStorage.setItem("admin-active", "1");
          setSessionActive(true);

          console.log("🛡️ ADMIN SESSION OPTIMIZED");
        } catch (error) {
          console.warn("Storage optimization failed, using minimal session");
          // Emergency fallback - minimal data only
          try {
            sessionStorage.setItem("admin-active", "1");
            setSessionActive(true);
          } catch (e) {
            console.error("Critical: Cannot create any admin session");
          }
        }
      }
    };

    // Optimized heartbeat - minimal storage usage
    const optimizedHeartbeat = () => {
      if (isAdmin && adminSession) {
        try {
          // Only update if session exists
          const hasLocalSession = localStorage.getItem("gaia-admin");
          const hasSessionSession = sessionStorage.getItem("admin-active");

          if (hasLocalSession || hasSessionSession) {
            // Minimal update
            const essentialData = {
              id: adminSession.id,
              ts: Date.now(),
              active: true,
            };

            // Try to maintain localStorage, fallback to sessionStorage
            try {
              if (hasLocalSession) {
                localStorage.setItem("gaia-admin", JSON.stringify(essentialData));
              }
            } catch (e) {
              // If localStorage fails, clear it and use sessionStorage
              try {
                localStorage.removeItem("gaia-admin");
              } catch (clearError) {
                // Ignore
              }
            }

            // Always maintain sessionStorage
            sessionStorage.setItem("admin-active", "1");
            sessionStorage.setItem("admin-hb", Date.now().toString());

            console.log("💗 ADMIN HEARTBEAT OPTIMIZED");
          }
        } catch (error) {
          // Emergency fallback
          try {
            sessionStorage.setItem("admin-active", "1");
          } catch (e) {
            console.warn("Storage critically full, session may be unstable");
          }
        }
      }
    };

    createOptimizedSession();

    // Optimized intervals - less frequent to reduce storage stress
    const interval1 = setInterval(optimizedHeartbeat, 15000); // Every 15 seconds
    const interval2 = setInterval(optimizedHeartbeat, 45000); // Every 45 seconds

    // Prevent session loss with optimized callbacks
    const preventLogout = () => {
      optimizedHeartbeat();
    };

    // Listen for all possible session loss events
    window.addEventListener("beforeunload", preventLogout);
    window.addEventListener("pagehide", preventLogout);
    window.addEventListener("visibilitychange", preventLogout);
    window.addEventListener("focus", preventLogout);
    window.addEventListener("blur", preventLogout);
    document.addEventListener("click", preventLogout);
    document.addEventListener("keydown", preventLogout);

    // Navigation protection with optimized callbacks
    const protectNavigation = () => {
      if (sessionStorage.getItem("admin-active") === "1") {
        optimizedHeartbeat();
      }
    };

    // Monitor for navigation changes
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      protectNavigation();
      return originalPushState.apply(this, args);
    };

    history.replaceState = function (...args) {
      protectNavigation();
      return originalReplaceState.apply(this, args);
    };

    window.addEventListener("popstate", protectNavigation);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      window.removeEventListener("beforeunload", preventLogout);
      window.removeEventListener("pagehide", preventLogout);
      window.removeEventListener("visibilitychange", preventLogout);
      window.removeEventListener("focus", preventLogout);
      window.removeEventListener("blur", preventLogout);
      document.removeEventListener("click", preventLogout);
      document.removeEventListener("keydown", preventLogout);
      window.removeEventListener("popstate", protectNavigation);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [isAdmin, adminSession]);

  return null; // Background service component
}
