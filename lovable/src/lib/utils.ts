import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Enhanced popup control for production
export const isProduction = process.env.NODE_ENV === "production";

// Toast configuration for reduced popups
export const toastConfig = {
  disabled: false, // Allow important notifications
  position: "bottom-right" as const,
  duration: 2000, // Shorter duration
  maxToasts: 1, // Only one toast at a time
  criticalOnly: true, // Only show critical notifications
};

// Helper function to determine if notification should show
export const shouldShowNotification = (
  priority: "low" | "medium" | "high" | "critical" = "medium",
): boolean => {
  if (toastConfig.criticalOnly) {
    return priority === "critical" || priority === "high";
  }
  return true;
};
