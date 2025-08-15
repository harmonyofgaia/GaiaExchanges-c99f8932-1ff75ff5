// LiveStatsPanel: Visualizes real-time stats from the GAIA Engine
import React, { useEffect, useState } from "react";
import { LiveStats, Stat } from "../liveStats";
import styles from "./LiveStatsPanel.module.css";

interface LiveStatsPanelProps {
  liveStats: LiveStats;
}

export const LiveStatsPanel: React.FC<LiveStatsPanelProps> = ({ liveStats }) => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(liveStats.getRecentStats(10));
    }, 500);
    return () => clearInterval(interval);
  }, [liveStats]);

  return (
  <div className={styles.panel}>
      <h2>Live Stats</h2>
      <ul>
        {stats.map((stat, idx) => (
          <li key={idx}>
            <strong>{stat.key}:</strong> {stat.value} <em>({new Date(stat.timestamp).toLocaleTimeString()})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};
