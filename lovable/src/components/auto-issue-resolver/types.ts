export interface Issue {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
  component: string;
  resolved: boolean;
  timestamp: Date;
}

export interface SystemStats {
  systemHealth: number;
  checkInterval: string;
  activeIssues: number;
  securityLevel?: "HIGH" | "MEDIUM" | "LOW";
}
