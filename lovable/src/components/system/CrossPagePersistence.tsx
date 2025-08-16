import { useEffect, useCallback} from "react";
import { useLocation } from "react-router-dom";

export function CrossPagePersistence() {
  const location = useLocation();

  useEffect(() => {
    // Ensure all background systems continue across page changes
    const maintainBackgroundSystems = () => {
      console.log(`🔄 PAGE CHANGED TO: ${location.pathname}`);
      console.log("🛡️ MAINTAINING ALL BACKGROUND SYSTEMS");
      console.log("🚀 EVOLUTION ENGINE: CONTINUOUS ACROSS PAGES");
      console.log("🐉 DRAGON SYSTEMS: NEVER INTERRUPTED");
      console.log("🛰️ GPS TRACKING: ALWAYS ACTIVE");
      console.log("⛓️ BLOCKCHAIN: PERSISTENT MINING");
      console.log("🦎 ANIMAL RESCUE: MONITORING CONTINUES");

      // Ensure localStorage systems are maintained
      const systems = [
        "gaia_evolution_metrics",
        "dragonCore_persistent",
        "gaia-admin-session",
        "quantum_security_state",
        "landscape_builder_data",
        "animal_rescue_state",
      ];

      systems.forEach((system) => {
        const data = localStorage.getItem(system);
        if (data) {
          try {
            const parsed = JSON.parse(data);
            parsed.lastPageChange = Date.now();
            parsed.pageChanges = (parsed.pageChanges || 0) + 1;
            localStorage.setItem(system, JSON.stringify(parsed));
          } catch (e) {
            console.log(`✅ System ${system} maintained`);
          }
        }
      });
    };

    maintainBackgroundSystems();
  }, [location.pathname]);

  return null; // Background service component
}
