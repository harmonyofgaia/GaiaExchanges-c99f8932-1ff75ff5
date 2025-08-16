import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useSecurityMonitoring } from "@/hooks/useSecurityMonitoring";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

interface SecurityContextType {
  logSecurityEvent: (
    action: string,
    details?: Record<string, any>,
    riskScore?: number,
  ) => Promise<void>;
  createSecurityIncident: (
    type: string,
    severity: "low" | "medium" | "high" | "critical",
    details?: Record<string, any>,
  ) => Promise<void>;
  checkRateLimit: (
    identifier: string,
    actionType: string,
    maxAttempts?: number,
    windowMinutes?: number,
  ) => Promise<boolean>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(
  undefined,
);

interface EnhancedSecurityProviderProps {
  children: ReactNode;
}

export function EnhancedSecurityProvider({
  children,
}: EnhancedSecurityProviderProps) {
  const { logSecurityEvent, createSecurityIncident, checkRateLimit } =
    useSecurityMonitoring();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Log user session start
      logSecurityEvent("user_session_start", { user_id: user.id }, 1);

      // Set up activity monitoring
      const activityEvents = ["click", "keydown", "scroll"];
      let lastActivity = Date.now();

      const handleActivity = () => {
        const now = Date.now();
        // Log if inactive for more than 30 minutes
        if (now - lastActivity > 30 * 60 * 1000) {
          logSecurityEvent(
            "user_activity_resumed",
            {
              inactive_duration: now - lastActivity,
            },
            2,
          );
        }
        lastActivity = now;
      };

      activityEvents.forEach((event) => {
        document.addEventListener(event, handleActivity, { passive: true });
      });

      // Clean up event listeners
      return () => {
        activityEvents.forEach((event) => {
          document.removeEventListener(event, handleActivity);
        });

        // Log session end
        logSecurityEvent(
          "user_session_end",
          {
            session_duration: Date.now() - lastActivity,
          },
          1,
        );
      };
    }
  }, [user, logSecurityEvent]);

  // Monitor for suspicious activity patterns
  useEffect(() => {
    const detectSuspiciousActivity = () => {
      // Check for rapid form submissions (potential bot activity)
      const formSubmissions = document.querySelectorAll("form");
      formSubmissions.forEach((form) => {
        let submitCount = 0;
        let firstSubmit = 0;

        form.addEventListener("submit", () => {
          const now = Date.now();
          if (submitCount === 0) {
            firstSubmit = now;
          }
          submitCount++;

          // More than 5 submissions in 30 seconds
          if (submitCount > 5 && now - firstSubmit < 30000) {
            createSecurityIncident("rapid_form_submission", "high", {
              submission_count: submitCount,
              time_window: now - firstSubmit,
              form_action: form.action,
            });
          }
        });
      });

      // Monitor for console manipulation attempts
      let consoleWarningShown = false;
      const originalConsole = { ...console };

      Object.keys(console).forEach((key) => {
        if (typeof console[key] === "function") {
          console[key] = (...args: any[]) => {
            if (
              !consoleWarningShown &&
              args.some(
                (arg) => typeof arg === "string" && arg.includes("password"),
              )
            ) {
              createSecurityIncident(
                "console_security_manipulation",
                "medium",
                { attempted_command: args.join(" ") },
              );
              consoleWarningShown = true;
              toast.warning("🔒 Security Alert: Console manipulation detected");
            }
            return originalConsole[key](...args);
          };
        }
      });
    };

    detectSuspiciousActivity();
  }, [createSecurityIncident]);

  const value: SecurityContextType = {
    logSecurityEvent,
    createSecurityIncident,
    checkRateLimit,
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useEnhancedSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error(
      "useEnhancedSecurity must be used within an EnhancedSecurityProvider",
    );
  }
  return context;
}
