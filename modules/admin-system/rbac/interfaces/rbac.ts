/**
 * Admin System RBAC Interface
 * Defines role-based access control and permissions management
 */

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  inherits?: string[]; // Role IDs this role inherits from
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Permission {
  id: string;
  resource: string; // e.g., 'blockchain', 'users', 'trading'
  action: string;   // e.g., 'read', 'write', 'delete', 'execute'
  conditions?: PermissionCondition[]; // Optional conditions
}

export interface PermissionCondition {
  field: string;
  operator: 'eq' | 'ne' | 'in' | 'not_in' | 'gt' | 'lt' | 'gte' | 'lte';
  value: any;
}

export interface UserRole {
  userId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  mfaEnabled: boolean;
  biometricEnabled: boolean;
  lastLogin: Date;
  status: 'active' | 'suspended' | 'locked' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthCredentials {
  username: string;
  password: string;
  mfaToken?: string;
  biometricData?: BiometricData;
  deviceFingerprint?: string;
}

export interface BiometricData {
  type: 'fingerprint' | 'face' | 'voice' | 'iris';
  data: string; // Base64 encoded biometric template
  confidence: number; // 0-1 confidence score
}

export interface AuthResult {
  success: boolean;
  userId?: string;
  sessionToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  requiresMFA?: boolean;
  requiresBiometric?: boolean;
  error?: string;
}

export interface SecurityAlert {
  id: string;
  type: 'login_failure' | 'suspicious_activity' | 'permission_violation' | 'system_breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata: Record<string, any>;
  timestamp: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValue?: any;
  newValue?: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  error?: string;
}

export interface SystemMetrics {
  activeUsers: number;
  totalUsers: number;
  failedLogins24h: number;
  securityAlerts: {
    open: number;
    resolved24h: number;
  };
  systemHealth: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  uptime: number;
  lastUpdated: Date;
}

/**
 * Role-Based Access Control Interface
 */
export interface IAdminRBAC {
  // Role management
  createRole(role: Omit<AdminRole, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
  updateRole(roleId: string, updates: Partial<AdminRole>): Promise<void>;
  deleteRole(roleId: string): Promise<void>;
  getRole(roleId: string): Promise<AdminRole>;
  listRoles(filters?: RoleFilters): Promise<AdminRole[]>;
  
  // Permission management
  createPermission(permission: Omit<Permission, 'id'>): Promise<string>;
  updatePermission(permissionId: string, updates: Partial<Permission>): Promise<void>;
  deletePermission(permissionId: string): Promise<void>;
  listPermissions(resource?: string): Promise<Permission[]>;
  
  // User role assignment
  assignRole(userId: string, roleId: string, assignedBy: string, expiresAt?: Date): Promise<void>;
  revokeRole(userId: string, roleId: string): Promise<void>;
  getUserRoles(userId: string): Promise<UserRole[]>;
  
  // Permission checking
  checkPermission(userId: string, resource: string, action: string, context?: any): Promise<boolean>;
  getUserPermissions(userId: string): Promise<Permission[]>;
  checkMultiplePermissions(userId: string, checks: PermissionCheck[]): Promise<PermissionResult[]>;
}

/**
 * Authentication Interface
 */
export interface IAdminAuth {
  // Authentication
  authenticate(credentials: AuthCredentials): Promise<AuthResult>;
  refreshToken(refreshToken: string): Promise<AuthResult>;
  logout(sessionToken: string): Promise<void>;
  validateSession(sessionToken: string): Promise<boolean>;
  
  // Multi-factor authentication
  enableMFA(userId: string, method: MFAMethod): Promise<MFASetupResult>;
  disableMFA(userId: string): Promise<void>;
  verifyMFA(userId: string, token: string): Promise<boolean>;
  generateBackupCodes(userId: string): Promise<string[]>;
  
  // Biometric authentication
  enrollBiometric(userId: string, biometricData: BiometricData): Promise<void>;
  verifyBiometric(userId: string, biometricData: BiometricData): Promise<boolean>;
  removeBiometric(userId: string, biometricType: BiometricData['type']): Promise<void>;
  
  // Security
  lockAccount(userId: string, reason: string, lockedBy: string): Promise<void>;
  unlockAccount(userId: string, unlockedBy: string): Promise<void>;
  resetPassword(userId: string, newPassword: string): Promise<void>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}

/**
 * Admin Dashboard Interface
 */
export interface IAdminDashboard {
  // System metrics
  getSystemMetrics(): Promise<SystemMetrics>;
  getSecurityAlerts(filters?: AlertFilters): Promise<SecurityAlert[]>;
  getAuditLogs(filters?: AuditFilters): Promise<AuditLog[]>;
  
  // User management
  createUser(user: Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
  updateUser(userId: string, updates: Partial<AdminUser>): Promise<void>;
  suspendUser(userId: string, reason: string, suspendedBy: string): Promise<void>;
  reactivateUser(userId: string, reactivatedBy: string): Promise<void>;
  getUserActivity(userId: string, timeframe?: TimeRange): Promise<UserActivity[]>;
  
  // Security monitoring
  createSecurityAlert(alert: Omit<SecurityAlert, 'id' | 'timestamp' | 'resolved'>): Promise<string>;
  resolveSecurityAlert(alertId: string, resolvedBy: string, notes?: string): Promise<void>;
  getSecurityReport(timeframe: TimeRange): Promise<SecurityReport>;
  
  // Audit and compliance
  exportAuditLogs(filters: AuditFilters, format: 'csv' | 'json' | 'pdf'): Promise<string>;
  generateComplianceReport(type: ComplianceReportType, timeframe: TimeRange): Promise<ComplianceReport>;
}

export interface RoleFilters {
  name?: string;
  permissions?: string[];
  createdBy?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface PermissionCheck {
  resource: string;
  action: string;
  context?: any;
}

export interface PermissionResult {
  resource: string;
  action: string;
  allowed: boolean;
  reason?: string;
}

export interface MFAMethod {
  type: 'totp' | 'sms' | 'email' | 'hardware';
  config?: any;
}

export interface MFASetupResult {
  secret?: string;
  qrCode?: string;
  backupCodes?: string[];
}

export interface AlertFilters {
  type?: SecurityAlert['type'];
  severity?: SecurityAlert['severity'];
  resolved?: boolean;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface AuditFilters {
  userId?: string;
  action?: string;
  resource?: string;
  success?: boolean;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface UserActivity {
  timestamp: Date;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
}

export interface SecurityReport {
  timeframe: TimeRange;
  totalAlerts: number;
  alertsByType: Record<string, number>;
  alertsBySeverity: Record<string, number>;
  topThreats: string[];
  recommendations: string[];
}

export interface ComplianceReport {
  type: ComplianceReportType;
  timeframe: TimeRange;
  findings: ComplianceFinding[];
  score: number;
  recommendations: string[];
}

export enum ComplianceReportType {
  SOC2 = 'soc2',
  ISO27001 = 'iso27001',
  GDPR = 'gdpr',
  SOX = 'sox'
}

export interface ComplianceFinding {
  control: string;
  status: 'compliant' | 'non_compliant' | 'partial';
  evidence: string[];
  issues: string[];
  remediation: string[];
}