export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  animationUrl?: string;
  externalUrl?: string;
  attributes: NFTAttribute[];
  properties: NFTProperties;
  collection?: string;
  creator: string;
  royalties: number; // Percentage
}

export interface NFTAttribute {
  traitType: string;
  value: string | number;
  displayType?: 'number' | 'boost_number' | 'boost_percentage' | 'date';
  rarity?: number;
}

export interface NFTProperties {
  category: 'art' | 'collectible' | 'music' | 'video' | 'utility' | 'gaming' | 'virtual_real_estate';
  tags: string[];
  edition?: {
    current: number;
    total: number;
  };
  unlockableContent?: boolean;
  isAnimated: boolean;
  fileType: string;
  fileSize: number;
}

export interface NFT {
  id: string;
  tokenId: string;
  contractAddress: string;
  blockchain: 'ethereum' | 'solana' | 'polygon' | 'gaiachain';
  metadata: NFTMetadata;
  owner: string;
  creator: string;
  price?: number;
  currency: string;
  isListed: boolean;
  listingId?: string;
  createdAt: Date;
  lastTransferred: Date;
  transactionHistory: NFTTransaction[];
}

export interface NFTTransaction {
  id: string;
  type: 'mint' | 'transfer' | 'sale' | 'auction' | 'burn';
  from: string;
  to: string;
  price?: number;
  currency?: string;
  timestamp: Date;
  transactionHash: string;
}

export interface NFTListing {
  id: string;
  nftId: string;
  seller: string;
  price: number;
  currency: string;
  listingType: 'fixed_price' | 'auction' | 'dutch_auction';
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  bids?: Bid[];
}

export interface Bid {
  id: string;
  listingId: string;
  bidder: string;
  amount: number;
  currency: string;
  timestamp: Date;
  isActive: boolean;
}

export interface VirtualWorld {
  id: string;
  name: string;
  description: string;
  creator: string;
  isPublic: boolean;
  maxUsers: number;
  currentUsers: number;
  landParcels: VirtualLand[];
  assets: WorldAsset[];
  config: WorldConfiguration;
  createdAt: Date;
}

export interface VirtualLand {
  id: string;
  worldId: string;
  coordinates: { x: number; y: number; z: number };
  size: { width: number; height: number; depth: number };
  owner: string;
  price?: number;
  isForSale: boolean;
  isDeveloped: boolean;
  assets: LandAsset[];
  permissions: LandPermissions;
}

export interface LandAsset {
  id: string;
  type: 'building' | 'decoration' | 'interactive' | 'nft_display';
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  modelUrl: string;
  metadata: any;
  nftId?: string;
}

export interface LandPermissions {
  canBuild: string[];
  canVisit: string[];
  canInteract: string[];
  isPublic: boolean;
}

export interface WorldConfiguration {
  physics: {
    enabled: boolean;
    gravity: number;
    collisionDetection: boolean;
  };
  lighting: {
    ambientLight: string;
    directionalLight: string;
    shadows: boolean;
  };
  environment: {
    skybox: string;
    fog: boolean;
    weather: 'clear' | 'rain' | 'snow' | 'cloudy';
  };
  audio: {
    enabled: boolean;
    backgroundMusic?: string;
    spatialAudio: boolean;
  };
}

export interface Avatar {
  id: string;
  userId: string;
  name: string;
  appearance: AvatarAppearance;
  wearables: NFTWearable[];
  animations: AvatarAnimation[];
  isActive: boolean;
}

export interface AvatarAppearance {
  bodyType: 'humanoid' | 'animal' | 'fantasy' | 'robot';
  skinColor: string;
  hairColor: string;
  eyeColor: string;
  height: number;
  proportions: {
    head: number;
    torso: number;
    arms: number;
    legs: number;
  };
}

export interface NFTWearable {
  nftId: string;
  slotType: 'head' | 'torso' | 'legs' | 'feet' | 'accessory' | 'weapon';
  modelUrl: string;
  isEquipped: boolean;
  stats?: WearableStats;
}

export interface WearableStats {
  rarity: number;
  power: number;
  defense: number;
  speed: number;
  special?: Record<string, number>;
}

export interface AvatarAnimation {
  name: string;
  type: 'idle' | 'walk' | 'run' | 'jump' | 'dance' | 'emote';
  url: string;
  duration: number;
  isLoop: boolean;
}

// Service Interfaces
export interface INFTMarketplaceService {
  createNFT(metadata: NFTMetadata, file: File): Promise<NFT>;
  listNFT(nftId: string, price: number, currency: string, listingType: NFTListing['listingType']): Promise<NFTListing>;
  buyNFT(listingId: string): Promise<NFTTransaction>;
  placeBid(listingId: string, amount: number): Promise<Bid>;
  getNFTs(filters?: NFTFilters): Promise<NFT[]>;
  getUserNFTs(userId: string): Promise<NFT[]>;
  transferNFT(nftId: string, toAddress: string): Promise<NFTTransaction>;
}

export interface IMetaverseService {
  createWorld(config: Partial<VirtualWorld>): Promise<VirtualWorld>;
  joinWorld(worldId: string, avatarId: string): Promise<boolean>;
  leaveWorld(worldId: string): Promise<void>;
  updateAvatar(avatarId: string, updates: Partial<Avatar>): Promise<Avatar>;
  interactWithObject(objectId: string, interaction: string): Promise<any>;
  sendMessage(worldId: string, message: string): Promise<void>;
}

export interface IVirtualRealEstateService {
  purchaseLand(worldId: string, coordinates: { x: number; y: number }): Promise<VirtualLand>;
  developLand(landId: string, assets: LandAsset[]): Promise<VirtualLand>;
  rentLand(landId: string, tenant: string, duration: number, price: number): Promise<any>;
  getLandListings(): Promise<VirtualLand[]>;
  transferLand(landId: string, newOwner: string): Promise<boolean>;
}

export interface NFTFilters {
  category?: NFTProperties['category'];
  priceRange?: { min: number; max: number };
  blockchain?: NFT['blockchain'];
  creator?: string;
  collection?: string;
  tags?: string[];
}