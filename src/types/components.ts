// Comprehensive component type definitions
import React from 'react';

// Generic component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Event handler types
export type ClickHandler = (event: React.MouseEvent) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type SubmitHandler = (event: React.FormEvent) => void;

// Media and file types
export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'document';
  size: number;
  metadata?: Record<string, unknown>;
}

// NFT and marketplace types
export interface NFTItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  creator: string;
  owner: string;
  metadata: Record<string, unknown>;
}

export interface MarketplaceProps extends BaseComponentProps {
  items: NFTItem[];
  onPurchase?: (item: NFTItem) => void;
  onFilter?: (filters: Record<string, unknown>) => void;
}

// Game component types
export interface GameState {
  score: number;
  level: number;
  isPlaying: boolean;
  timeRemaining?: number;
}

export interface GameComponentProps extends BaseComponentProps {
  gameState: GameState;
  onGameEnd?: (score: number) => void;
  onScoreUpdate?: (score: number) => void;
}

// Admin component types
export interface AdminPanelProps extends BaseComponentProps {
  userRole: 'admin' | 'moderator' | 'user';
  permissions: string[];
  onAction?: (action: string, data?: unknown) => void;
}

// Form and input types
export interface FormFieldProps extends BaseComponentProps {
  label: string;
  value: string | number;
  onChange: ChangeHandler;
  error?: string;
  required?: boolean;
}

// Data display types
export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  formatter?: (value: unknown) => React.ReactNode;
}

export interface DataTableProps extends BaseComponentProps {
  data: Array<Record<string, unknown>>;
  columns: DataTableColumn[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  loading?: boolean;
}

// Chart and analytics types
export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface ChartProps extends BaseComponentProps {
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'pie' | 'area';
  title?: string;
  height?: number;
}

// Modal and dialog types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType;
  children?: NavItem[];
}

export interface NavigationProps extends BaseComponentProps {
  items: NavItem[];
  currentPath: string;
  onNavigate?: (path: string) => void;
}