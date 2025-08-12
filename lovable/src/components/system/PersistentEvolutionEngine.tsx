import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface EvolutionMetrics {
  totalSystemPower: number;
  evolutionRate: number;
  offlineGrowthMultiplier: number;
  lastActiveTimestamp: number;
  sessionsCompleted: number;
  powerLevels: {
    blockchain: number;
    animalRescue: number;
    gpsTracking: number;
    landscapeBuilder: number;
    adminControl: number;
    securityEngine: number;
    quantumCore: number;
    aiIntelligence: number;
  };
}

export function PersistentEvolutionEngine() {
  const [metrics, setMetrics] = useState<EvolutionMetrics>(() => {
    const saved = localStorage.getItem("gaia_evolution_metrics");
    return saved
      ? JSON.parse(saved)
      : {
          totalSystemPower: 1000,
          evolutionRate: 1.001,
          offlineGrowthMultiplier: 2.0,
          lastActiveTimestamp: Date.now(),
          sessionsCompleted: 0,
          powerLevels: {
            blockchain: 100,
            animalRescue: 100,
            gpsTracking: 100,
            landscapeBuilder: 100,
            adminControl: 100,
            securityEngine: 100,
            quantumCore: 100,
            aiIntelligence: 100,
          },
        };
  });

  const evolutionInterval = useRef<NodeJS.Timeout>(undefined);
  const startTime = useRef(Date.now());

  useEffect(() => {
    console.log("🚀 PERSISTENT EVOLUTION ENGINE - ALWAYS ACTIVE GROWTH");

    // Calculate offline growth when returning
    const calculateOfflineGrowth = () => {
      const currentTime = Date.now();
      const offlineTime = currentTime - metrics.lastActiveTimestamp;
      const offlineHours = offlineTime / (1000 * 60 * 60);

      if (offlineHours > 0.1) {
        // More than 6 minutes offline
        const offlineGrowth =
          Math.pow(metrics.evolutionRate, offlineHours * 60) *
          metrics.offlineGrowthMultiplier;

        setMetrics((prev) => ({
          ...prev,
          totalSystemPower: prev.totalSystemPower * offlineGrowth,
          powerLevels: {
            blockchain: prev.powerLevels.blockchain * offlineGrowth,
            animalRescue: prev.powerLevels.animalRescue * offlineGrowth,
            gpsTracking: prev.powerLevels.gpsTracking * offlineGrowth,
            landscapeBuilder: prev.powerLevels.landscapeBuilder * offlineGrowth,
            adminControl: prev.powerLevels.adminControl * offlineGrowth,
            securityEngine: prev.powerLevels.securityEngine * offlineGrowth,
            quantumCore: prev.powerLevels.quantumCore * offlineGrowth,
            aiIntelligence: prev.powerLevels.aiIntelligence * offlineGrowth,
          },
          lastActiveTimestamp: currentTime,
        }));

        console.log(
          `🌟 OFFLINE GROWTH: ${offlineHours.toFixed(1)} hours = ${(offlineGrowth * 100 - 100).toFixed(1)}% power increase`,
        );
        toast.success("🚀 System Evolved While Offline!", {
          description: `${offlineHours.toFixed(1)} hours of growth applied - All systems stronger!`,
          duration: 8000,
        });
      }
    };

    calculateOfflineGrowth();
    startTime.current = Date.now();
  }, []);

  // Continuous evolution every second
  useEffect(() => {
    const evolveSystem = () => {
      setMetrics((prev) => {
        const newMetrics = {
          ...prev,
          totalSystemPower: prev.totalSystemPower * prev.evolutionRate,
          evolutionRate: Math.min(1.01, prev.evolutionRate * 1.0001), // Evolution rate itself evolves
          powerLevels: {
            blockchain: prev.powerLevels.blockchain * prev.evolutionRate,
            animalRescue: prev.powerLevels.animalRescue * prev.evolutionRate,
            gpsTracking: prev.powerLevels.gpsTracking * prev.evolutionRate,
            landscapeBuilder:
              prev.powerLevels.landscapeBuilder * prev.evolutionRate,
            adminControl: prev.powerLevels.adminControl * prev.evolutionRate,
            securityEngine:
              prev.powerLevels.securityEngine * prev.evolutionRate,
            quantumCore: prev.powerLevels.quantumCore * prev.evolutionRate,
            aiIntelligence:
              prev.powerLevels.aiIntelligence * prev.evolutionRate,
          },
          lastActiveTimestamp: Date.now(),
        };

        // Save to localStorage every evolution
        localStorage.setItem(
          "gaia_evolution_metrics",
          JSON.stringify(newMetrics),
        );

        return newMetrics;
      });
    };

    evolutionInterval.current = setInterval(evolveSystem, 1000); // Every second

    return () => {
      if (evolutionInterval.current) clearInterval(evolutionInterval.current);
    };
  }, []);

  // Page visibility handling for offline growth
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("🔄 TAB VISIBLE - CHECKING FOR OFFLINE GROWTH");
        const currentTime = Date.now();
        const offlineTime = currentTime - metrics.lastActiveTimestamp;

        if (offlineTime > 5000) {
          // More than 5 seconds
          const growthBonus = Math.pow(1.001, offlineTime / 1000);
          setMetrics((prev) => ({
            ...prev,
            totalSystemPower: prev.totalSystemPower * growthBonus,
            lastActiveTimestamp: currentTime,
          }));

          console.log("📈 TAB RETURN BONUS APPLIED");
        }
      } else {
        console.log("🌙 TAB HIDDEN - OFFLINE GROWTH MODE ACTIVATED");
        setMetrics((prev) => ({
          ...prev,
          lastActiveTimestamp: Date.now(),
        }));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [metrics.lastActiveTimestamp]);

  // Milestone notifications
  useEffect(() => {
    const powerMilestones = [1000, 5000, 10000, 50000, 100000, 500000, 1000000];
    const currentMilestone = powerMilestones.find(
      (m) =>
        metrics.totalSystemPower >= m && metrics.totalSystemPower < m * 1.1,
    );

    if (currentMilestone && metrics.totalSystemPower % 1000 < 10) {
      toast.success("🌟 SYSTEM MILESTONE REACHED!", {
        description: `Total System Power: ${Math.floor(metrics.totalSystemPower).toLocaleString()}`,
        duration: 6000,
      });
    }
  }, [metrics.totalSystemPower]);

  // Background logging for monitoring
  useEffect(() => {
    if (Math.floor(metrics.totalSystemPower) % 100 < 2) {
      console.log("📊 EVOLUTION STATUS:");
      console.log(
        `🔥 Total Power: ${Math.floor(metrics.totalSystemPower).toLocaleString()}`,
      );
      console.log(
        `⚡ Evolution Rate: ${((metrics.evolutionRate - 1) * 100).toFixed(4)}% per second`,
      );
      console.log(
        `🌍 GPS Tracking: ${Math.floor(metrics.powerLevels.gpsTracking).toLocaleString()}`,
      );
      console.log(
        `🦎 Animal Rescue: ${Math.floor(metrics.powerLevels.animalRescue).toLocaleString()}`,
      );
      console.log(
        `⛓️ Blockchain: ${Math.floor(metrics.powerLevels.blockchain).toLocaleString()}`,
      );
      console.log(
        `🏔️ Landscape Builder: ${Math.floor(metrics.powerLevels.landscapeBuilder).toLocaleString()}`,
      );
      console.log(
        `👑 Admin Control: ${Math.floor(metrics.powerLevels.adminControl).toLocaleString()}`,
      );
    }
  }, [metrics]);

  return {
    metrics,
    isEvolving: true,
    neverStops: true,
    growsOffline: true,
    getGrowthRate: () =>
      ((metrics.evolutionRate - 1) * 100).toFixed(4) + "% per second",
    getTotalPower: () => Math.floor(metrics.totalSystemPower).toLocaleString(),
    getUptime: () => Math.floor((Date.now() - startTime.current) / 1000),
  };
}
