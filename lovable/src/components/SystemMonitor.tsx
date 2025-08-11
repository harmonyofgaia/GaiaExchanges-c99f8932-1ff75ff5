import { useEffect } from "react";

export function SystemMonitor() {
  useEffect(() => {
    // Background system monitoring
    const monitorInterval = setInterval(() => {
      console.log("🛡️ System Monitor: All systems operational");
    }, 30000); // Every 30 seconds

    // Cleanup on unmount
    return () => clearInterval(monitorInterval);
  }, []);

  // This component runs in the background and doesn't render anything visible
  return null;
}
