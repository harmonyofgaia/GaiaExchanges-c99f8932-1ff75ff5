export enum AdminPermission {
  USER_MANAGEMENT = 'user_management',
  SYSTEM_CONTROL = 'system_control',
  FINANCIAL_OVERSIGHT = 'financial_oversight',
  EMERGENCY_ACCESS = 'emergency_access',
  AUDIT_ACCESS = 'audit_access',
  MODULE_MANAGEMENT = 'module_management',
  SECURITY_MANAGEMENT = 'security_management'
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  permissions: AdminPermission[];
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  mfaEnabled: boolean;
}

export interface AdminSession {
  userId: string;
  token: string;
  expiresAt: Date;
  permissions: AdminPermission[];
  ipAddress: string;
  userAgent: string;
}

export interface SystemHealthStatus {
  overall: 'healthy' | 'warning' | 'critical';
  modules: ModuleHealth[];
  uptime: number;
  memoryUsage: number;
  cpuUsage: number;
  activeUsers: number;
  errorRate: number;
}

export interface ModuleHealth {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  lastChecked: Date;
  errorCount: number;
  responseTime: number;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  details: Record<string, any>;
  result: 'success' | 'failure';
}

export interface UserActivity {
  userId: string;
  username: string;
  lastActive: Date;
  actionsCount: number;
  riskScore: number;
  recentActions: AuditLogEntry[];
}

export interface EmergencyControl {
  id: string;
  name: string;
  description: string;
  type: 'shutdown' | 'restart' | 'lockdown' | 'backup';
  requiredPermissions: AdminPermission[];
  confirmationRequired: boolean;
}

// Service Interfaces
export interface IAdminAuthService {
  authenticate(username: string, password: string, mfaCode?: string): Promise<AdminSession>;
  validateSession(token: string): Promise<boolean>;
  refreshSession(token: string): Promise<AdminSession>;
  revokeSession(token: string): Promise<void>;
  enableMFA(userId: string): Promise<string>; // Returns QR code URL
  verifyMFA(userId: string, code: string): Promise<boolean>;
}

export interface IUserManagementService {
  getUsers(page?: number, limit?: number): Promise<AdminUser[]>;
  getUserById(id: string): Promise<AdminUser | null>;
  updateUserPermissions(userId: string, permissions: AdminPermission[]): Promise<void>;
  suspendUser(userId: string, reason: string): Promise<void>;
  activateUser(userId: string): Promise<void>;
  getUserActivity(userId: string): Promise<UserActivity>;
  bulkUpdateUsers(updates: Partial<AdminUser>[]): Promise<void>;
}

export interface ISystemMonitorService {
  getSystemHealth(): Promise<SystemHealthStatus>;
  getModuleStatus(moduleId?: string): Promise<ModuleHealth[]>;
  restartModule(moduleId: string): Promise<boolean>;
  getPerformanceMetrics(): Promise<Record<string, number>>;
  setMaintenanceMode(enabled: boolean): Promise<void>;
}

export interface IAuditService {
  logAction(action: string, resource: string, userId: string, details?: Record<string, any>): Promise<void>;
  getAuditLogs(filters?: AuditLogFilters): Promise<AuditLogEntry[]>;
  exportAuditLogs(format: 'csv' | 'json', dateRange: DateRange): Promise<Blob>;
}

export interface AuditLogFilters {
  userId?: string;
  action?: string;
  resource?: string;
  dateRange?: DateRange;
  result?: 'success' | 'failure';
}

export interface DateRange {
  start: Date;
  end: Date;
}