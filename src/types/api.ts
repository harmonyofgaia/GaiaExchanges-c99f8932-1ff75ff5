// API and service response types

// Generic API response structure
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: number;
}

// Paginated response
export interface PaginatedResponse<T = unknown> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Authentication types
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface UserSession {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  sessionId: string;
  expiresAt: number;
}

// Database entity types
export interface DatabaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  version?: number;
}

// File upload types
export interface FileUploadRequest {
  file: File;
  bucket?: string;
  path?: string;
  metadata?: Record<string, unknown>;
}

export interface FileUploadResponse {
  fileId: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResponse<T = unknown> {
  results: T[];
  totalResults: number;
  searchTime: number;
  facets?: Record<string, Array<{ value: string; count: number }>>;
}

// Analytics and metrics
export interface MetricData {
  name: string;
  value: number;
  unit?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsReport {
  reportId: string;
  title: string;
  metrics: MetricData[];
  dateRange: {
    from: string;
    to: string;
  };
  generatedAt: string;
}

// Notification types
export interface NotificationPayload {
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

// Webhook and event types
export interface WebhookEvent {
  eventId: string;
  eventType: string;
  source: string;
  payload: Record<string, unknown>;
  timestamp: string;
  signature?: string;
}

// Configuration types
export interface ServiceConfig {
  endpoint: string;
  apiKey?: string;
  timeout: number;
  retryAttempts: number;
  headers?: Record<string, string>;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
  requestId?: string;
}

// Batch operation types
export interface BatchOperation<T = unknown> {
  operationType: 'create' | 'update' | 'delete';
  items: T[];
}

export interface BatchOperationResult {
  successCount: number;
  failureCount: number;
  errors: Array<{
    index: number;
    error: string;
  }>;
}