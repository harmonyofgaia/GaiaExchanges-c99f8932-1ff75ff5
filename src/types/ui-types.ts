
// UI Component Types - Replaces any types in UI components
import { LucideIcon } from 'lucide-react'

// Icon component type for React components that expect Lucide icons
export type IconComponent = LucideIcon

// Generic React component props
export interface BaseComponentProps {
  className?: string
  id?: string
}

// Tool/Item interfaces for marketplaces and inventories
export interface Tool {
  id: string
  name: string
  price: number
  description: string
  icon?: string
  category?: string
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface Landscape {
  id: string
  name: string
  price: number
  description: string
  image?: string
  category?: string
  biome?: string
}

// Exchange status types
export enum ExchangeStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Completed = 'completed',
  Error = 'error',
  Maintenance = 'maintenance',
}

// Auto apply status types - Updated to match component usage
export type AutoApplyStatus = 'completed' | 'in-progress' | 'pending' | 'failed' | 'queued'

// Exchange interface
export interface Exchange {
  id: string
  name: string
  status: ExchangeStatus
  lastUpdate: Date
  autoApplyStatus: AutoApplyStatus
  [key: string]: unknown // For additional properties
}

// Exchange listing interface for multi-exchange system
export interface ExchangeListing {
  id: string
  name: string
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'DeFi' | 'DEX'
  status: 'pending' | 'listed' | 'documenting' | 'contacting' | 'reviewing'
  autoApplyStatus: AutoApplyStatus
  lastUpdate: Date
  progress: number
  estimatedTime: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  description?: string
}

// Search result interface for GaiaIA
export interface SearchResult {
  id: string
  type: string
  title: string
  status: string
  timestamp: Date
  source?: string
  data?: string
  confidence?: number
}

// Chat message interface for video chat
export interface ChatMessage {
  id: string
  content: string
  sender: string
  user: string
  type: string
  timestamp: string
  reactions?: string[]
  replyingTo?: any
}

// Subscription interface
export interface Subscription {
  id: string
  subscribedAt: Date
  isActive: boolean
  tier: string
}

// Form event handlers
export type FormEventHandler = (event: React.FormEvent<HTMLFormElement>) => void
export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
export type ClickEventHandler = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void

// Generic callback types
export type VoidCallback = () => void
export type ValueCallback<T> = (value: T) => void
export type ErrorCallback = (error: Error) => void

// Item type for landscape builder
export type ItemType = 'tree' | 'building' | 'mountain' | 'water' | 'decoration' | 'creature' | 'vegetation' | 'weapon' | 'tool' | 'artifact'

// Action parameters interface
export interface ActionParameters {
  action: string
  target?: string
  value?: any
  [key: string]: any
}

// Action log entry interface
export interface ActionLogEntry {
  id: string
  timestamp: Date
  parameters: ActionParameters
  status: 'cancelled' | 'success' | 'error'
  result?: string
  error?: string
}
