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
export type ExchangeStatus = 'active' | 'inactive' | 'pending' | 'completed' | 'error' | 'maintenance'

// Auto apply status types  
export type AutoApplyStatus = 'completed' | 'in-progress' | 'pending' | 'failed'

// Exchange interface
export interface Exchange {
  id: string
  name: string
  status: ExchangeStatus
  lastUpdate: Date
  autoApplyStatus: AutoApplyStatus
  [key: string]: unknown // For additional properties
}

// Form event handlers
export type FormEventHandler = (event: React.FormEvent<HTMLFormElement>) => void
export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
export type ClickEventHandler = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void

// Generic callback types
export type VoidCallback = () => void
export type ValueCallback<T> = (value: T) => void
export type ErrorCallback = (error: Error) => void