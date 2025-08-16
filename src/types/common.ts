// Common TypeScript interfaces used across the application

// Generic component type for React components with optional props
export type ReactComponentType<T = Record<string, never>> = React.ComponentType<T>;

// Generic event handler type
export type EventHandler<T = Event> = (event: T) => void;

// Generic data record type for unknown JSON-like data
export type DataRecord = Record<string, unknown>;

// Generic API response type
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}

// Generic list response with pagination
export interface ListResponse<T = unknown> {
  items: T[];
  total: number;
  page?: number;
  pageSize?: number;
}

// File/media types
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  created_at?: string;
  metadata?: DataRecord;
}

// User/authentication types
export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  metadata?: DataRecord;
}

// Configuration object type
export interface ConfigObject {
  [key: string]: unknown;
}

// Generic service response
export interface ServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}