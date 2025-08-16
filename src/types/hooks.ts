// Hook-specific types and utilities
import { useCallback, useEffect, useMemo } from 'react';

// Generic hook return types
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
}

// Stable reference utility for useEffect dependencies
export const useStableCallback = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps);
};

// Memoized value with stable dependencies
export const useStableValue = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
};

// Hook dependency helpers for common patterns
export interface UseApiHookOptions {
  immediate?: boolean;
  dependencies?: React.DependencyList;
}

export interface UseFormHookState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// Event handler types for hooks
export type AsyncFunction<T = unknown> = (...args: unknown[]) => Promise<T>;
export type SyncFunction<T = unknown> = (...args: unknown[]) => T;

// Common hook patterns
export interface UseLocalStorageHook<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

export interface UseToggleHook {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

// Effect cleanup function type
export type EffectCleanup = () => void;

// Debounced value hook type
export interface UseDebouncedHook<T> {
  debouncedValue: T;
  isPending: boolean;
}

// File handling hook types
export interface UseFileUploadHook {
  files: File[];
  uploadProgress: number;
  isUploading: boolean;
  upload: (files: FileList) => Promise<void>;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

// Modal hook types
export interface UseModalHook {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// Theme hook types
export interface UseThemeHook {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}