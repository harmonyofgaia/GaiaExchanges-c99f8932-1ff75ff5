// UI Component Types - Enhanced with all features
import { LucideIcon } from "lucide-react";

// Icon component type for React components that expect Lucide icons
export type IconComponent = LucideIcon;

// Generic React component props
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

// Tool/Item interfaces for marketplaces and inventories
export interface Tool {
  id: string;
  name: string;
  price: number;
  description: string;
  icon?: string;
  category?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  price: number;
  description: string;
  icon?: string;
  category?: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
}

export interface Landscape {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
  biome?: string;
}

export interface LandscapeItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
  biome?: string;
}

// Revenue Agreement with bonus percentage
export interface RevenueAgreement {
  id: string;
  name: string;
  percentage: number;
  bonusPercentage?: number;
  description: string;
  isActive: boolean;
}

// GAiA Bike Ecosystem Types
export interface BikeSession {
  id: string;
  user_id: string;
  bike_type: "gaia_bike" | "regular_bike";
  start_time: string;
  end_time: string | null;
  distance: number;
  tokens_earned: number;
  start_location: { lat: number; lng: number };
  route_data: unknown;
  status: string;
  eco_impact: number;
}

export interface FoodPlace {
  id: string;
  name: string;
  description: string;
  location_data: {
    lat: number;
    lng: number;
    address: string;
    accessibility_score: number;
    distance?: number;
  };
  food_types: string[];
  tokens_accepted: boolean;
  is_active: boolean;
  verified: boolean;
  owner_id: string;
  forest_layer: number;
  created_at: string;
  updated_at: string;
}

// Green Projects
export interface GreenProject {
  id: string;
  title: string;
  description: string;
  funding_goal: number;
  current_funding: number;
  project_type: string;
  carbon_impact_target: number | null;
  biodiversity_score: number | null;
  verification_status: string | null;
  smart_contract_address: string | null;
  satellite_verified: boolean;
  governance_score: number;
  community_votes: number;
  verification_method: string;
  project_data: {
    location?: string;
    area_covered?: number;
    species_count?: number;
    timeline?: string;
    technical_specs?: Record<string, unknown>;
    environmental_metrics?: Record<string, number>;
  };
}

// Eco Mission Types
export interface EcoMission {
  id: string;
  title: string;
  description: string;
  mission_type: string;
  difficulty_level: number;
  tokens_reward: number;
  carbon_impact: number;
  status: string;
  user_id: string;
  created_at: string;
  completed_at: string | null;
  completion_data: {
    evidence_photos?: string[];
    location_verified?: boolean;
    impact_measured?: number;
    peer_verified?: boolean;
    notes?: string;
  };
}

// NFT Card Game Types
export interface NFTCard {
  id: string;
  card_name: string;
  card_type: string;
  rarity: string;
  power_level: number;
  biodiversity_category: string;
  user_id: string;
  minted_at: string;
  is_tradeable: boolean;
  card_metadata: {
    image_url: string;
    description: string;
    traits: { trait_type: string; value: string }[];
    conservation_info?: string;
    abilities?: string[];
  };
}

// AI Insight Types
export interface AIInsight {
  type: string;
  message: string;
  confidence: number;
  actionable: boolean;
  action?: string;
}

// Exchange status types
export enum ExchangeStatus {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
  Completed = "completed",
  Error = "error",
  Maintenance = "maintenance",
}

// Auto apply status types
export type AutoApplyStatus =
  | "completed"
  | "in-progress"
  | "pending"
  | "failed"
  | "queued";

// Exchange interface
export interface Exchange {
  id: string;
  name: string;
  status: ExchangeStatus;
  lastUpdate: Date;
  autoApplyStatus: AutoApplyStatus;
  [key: string]: unknown;
}

// Exchange listing interface
export interface ExchangeListing {
  id: string;
  name: string;
  tier: "Tier 1" | "Tier 2" | "Tier 3" | "DeFi" | "DEX";
  status: "pending" | "listed" | "documenting" | "contacting" | "reviewing";
  autoApplyStatus: AutoApplyStatus;
  lastUpdate: Date;
  progress: number;
  estimatedTime: string;
  priority: "low" | "medium" | "high" | "critical";
  description?: string;
}

// Search result interface
export interface SearchResult {
  id: string;
  type: string;
  title: string;
  status: string;
  timestamp: Date;
  source?: string;
  data?: string;
  confidence?: number;
}

// Chat message interface
export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  user: string;
  type: string;
  timestamp: string;
  reactions?: string[];
  replyingTo?: unknown;
}

// Subscription interface
export interface Subscription {
  id: string;
  subscribedAt: Date;
  isActive: boolean;
  tier: string;
}

// Enhanced Wallet Types
export interface SolanaProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signAndSendTransaction: (transaction: unknown) => Promise<{ signature: string }>;
  publicKey?: { toString: () => string };
  isConnected: boolean;
  request: (options: unknown) => Promise<unknown>;
}

export interface WindowWithProviders extends Window {
  solana?: SolanaProvider;
}

// Form event handlers
export type FormEventHandler = (
  event: React.FormEvent<HTMLFormElement>,
) => void;
export type ChangeEventHandler = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) => void;
export type ClickEventHandler = (
  event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
) => void;

// Generic callback types
export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;
export type ErrorCallback = (error: Error) => void;

// Item type for landscape builder
export type ItemType =
  | "tree"
  | "building"
  | "mountain"
  | "water"
  | "decoration"
  | "creature"
  | "vegetation"
  | "weapon"
  | "tool"
  | "artifact";

// Action parameters interface
export interface ActionParameters {
  action: string;
  target?: string;
  value?: unknown;
  [key: string]: unknown;
}

// Action log entry interface
export interface ActionLogEntry {
  id: string;
  timestamp: Date;
  parameters: ActionParameters;
  status: "cancelled" | "success" | "error";
  result?: string;
  error?: string;
}

// Defense and Security Types
export interface DefenseMetrics {
  quantumEncryptionLevel: number;
  threatsBlocked: number;
  adminProtectionLevel: number;
  systemIntegrity: number;
  communitySecurityScore: number;
  walletsProtected: number;
}

// Attack and Breach Recovery Types
export interface BreachRecoveryStep {
  id: string;
  step: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  recoveryTime: number;
}

// Parabolic and Matrix Types
export interface ParabolicMetrics {
  universeControlLevel: number;
  realityBendingPower: number;
  dimensionalAccess: number;
  quantumComputingPower: number;
}

// Gaming and NFT Types
export interface GameAsset {
  id: string;
  name: string;
  type: "weapon" | "armor" | "creature" | "landscape" | "special";
  rarity: "common" | "rare" | "epic" | "legendary" | "mythical";
  power: number;
  price: number;
  tokenAddress?: string;
}

// Token Earning Mechanisms
export interface TokenEarningActivity {
  id: string;
  activity: string;
  baseReward: number;
  multiplier: number;
  category: "gaming" | "environmental" | "social" | "educational" | "creative";
  requirements: string[];
}

// Party and Event Types
export interface PartyEvent {
  id: string;
  name: string;
  type: "token_party" | "eco_event" | "gaming_tournament" | "social_gathering";
  startTime: Date;
  endTime: Date;
  tokenRewards: number;
  participants: number;
  maxParticipants: number;
  requirements: string[];
}

// Utility functions for type conversion from Supabase Json
export const parseJsonField = <T>(jsonValue: unknown, fallback: T): T => {
  if (!jsonValue) return fallback;
  if (typeof jsonValue === "string") {
    try {
      return JSON.parse(jsonValue) as T;
    } catch {
      return fallback;
    }
  }
  return jsonValue as T;
};
