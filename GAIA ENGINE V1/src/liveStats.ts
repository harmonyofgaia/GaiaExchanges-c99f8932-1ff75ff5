// Live Stats & Analytics for GAIA Engine
// Tracks and reports real-time engine metrics and analytics

export interface Stat {
  key: string;
  value: number | string;
  timestamp: number;
}

export class LiveStats {
  private stats: Stat[] = [];

  public report(key: string, value: number | string) {
    this.stats.push({ key, value, timestamp: Date.now() });
  }

  public getRecentStats(limit = 10): Stat[] {
    return this.stats.slice(-limit);
  }

  public clear() {
    this.stats = [];
  }
}
