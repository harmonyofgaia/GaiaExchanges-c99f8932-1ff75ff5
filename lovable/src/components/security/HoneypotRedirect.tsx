import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function HoneypotRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSecureEnvironment, setIsSecureEnvironment] = useState(true);

  useEffect(() => {
    // Check if we can safely use browser navigation
    const checkSecureEnvironment = () => {
      try {
        // Test if we can access browser history safely
        if (
          typeof window !== "undefined" &&
          window.history &&
          window.history.pushState
        ) {
          return true;
        }
        return false;
      } catch (error) {
        console.warn(
          "🛡️ Browser history access restricted, disabling honeypot redirect",
        );
        return false;
      }
    };

    setIsSecureEnvironment(checkSecureEnvironment());
  }, []);

  useEffect(() => {
    if (!isSecureEnvironment) {
      // If browser environment is restricted, don't perform redirects
      return;
    }

    const protectRealAdminRoutes = () => {
      try {
        // Real admin routes that should be protected
        const realAdminRoutes = ["/admin", "/secure-admin", "/secure-vault"];
        const isRealAdminRoute = realAdminRoutes.some((route) =>
          location.pathname.includes(route),
        );

        if (isRealAdminRoute) {
          // Check if this is a legitimate admin
          const isRealAdmin =
            sessionStorage.getItem("admin-session-active") === "true";
          const isAdminBrowser = navigator.userAgent
            .toLowerCase()
            .includes("firefox");

          if (!isRealAdmin || !isAdminBrowser) {
            // This is likely an attacker - redirect to honeypot
            console.log(
              "🚨 POTENTIAL ATTACKER DETECTED - REDIRECTING TO HONEYPOT",
            );
            console.log("🍯 Sending hacker to fake admin page");

            // Log the attempt
            const suspiciousActivity = {
              timestamp: new Date().toISOString(),
              attemptedRoute: location.pathname,
              userAgent: navigator.userAgent,
              redirectedToHoneypot: true,
            };

            const existingLogs = JSON.parse(
              localStorage.getItem("security-redirects") || "[]",
            );
            existingLogs.push(suspiciousActivity);
            localStorage.setItem(
              "security-redirects",
              JSON.stringify(existingLogs),
            );

            // Safely redirect to honeypot
            setTimeout(() => {
              navigate("/admin-login", { replace: true });
            }, 100);
            return;
          }

          console.log("✅ LEGITIMATE ADMIN ACCESS CONFIRMED");
        }

        // Also protect against direct admin-login access by real admin
        if (
          location.pathname === "/admin-login" &&
          sessionStorage.getItem("admin-session-active") === "true"
        ) {
          console.log(
            "👑 REAL ADMIN ACCESSING HONEYPOT - REDIRECTING TO REAL DASHBOARD",
          );
          setTimeout(() => {
            navigate("/secure-admin", { replace: true });
          }, 100);
        }
      } catch (error) {
        console.warn("🛡️ Navigation security check failed:", error);
      }
    };

    protectRealAdminRoutes();
  }, [location, navigate, isSecureEnvironment]);

  return null;
}
