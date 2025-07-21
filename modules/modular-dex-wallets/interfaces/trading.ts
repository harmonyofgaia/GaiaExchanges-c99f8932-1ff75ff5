export interface TradingPair {
  id: string;
  baseAsset: string;
  quoteAsset: string;
  price: number;
  volume24h: number;
  priceChange24h: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  userId: string;
  pair: string;
  type: 'market' | 'limit' | 'stop-loss' | 'take-profit';
  side: 'buy' | 'sell';
  amount: number;
  price?: number;
  stopPrice?: number;
  status: 'pending' | 'filled' | 'cancelled' | 'partial';
  createdAt: Date;
  filledAt?: Date;
  filledAmount: number;
}

export interface Trade {
  id: string;
  pair: string;
  price: number;
  amount: number;
  side: 'buy' | 'sell';
  timestamp: Date;
  fee: number;
  buyerId: string;
  sellerId: string;
}

export interface Wallet {
  id: string;
  userId: string;
  type: 'hot' | 'cold' | 'hardware' | 'external';
  provider: 'metamask' | 'phantom' | 'ledger' | 'gaia' | 'custom';
  address: string;
  balances: AssetBalance[];
  isConnected: boolean;
  lastSync: Date;
}

export interface AssetBalance {
  asset: string;
  symbol: string;
  balance: number;
  lockedBalance: number;
  usdValue: number;
  decimals: number;
}

export interface LiquidityPool {
  id: string;
  name: string;
  tokenA: string;
  tokenB: string;
  reserveA: number;
  reserveB: number;
  totalLiquidity: number;
  apr: number;
  volume24h: number;
  fees24h: number;
  isActive: boolean;
}

export interface LiquidityPosition {
  id: string;
  userId: string;
  poolId: string;
  amount: number;
  share: number;
  entryPrice: number;
  currentValue: number;
  rewards: number;
  createdAt: Date;
}

export interface Portfolio {
  userId: string;
  totalValue: number;
  totalPnL: number;
  totalPnLPercentage: number;
  assets: PortfolioAsset[];
  allocations: AssetAllocation[];
  performance: PerformanceMetrics;
}

export interface PortfolioAsset {
  asset: string;
  symbol: string;
  amount: number;
  value: number;
  percentage: number;
  pnl: number;
  pnlPercentage: number;
}

export interface AssetAllocation {
  category: string;
  percentage: number;
  value: number;
  assets: string[];
}

export interface PerformanceMetrics {
  returns1d: number;
  returns7d: number;
  returns30d: number;
  returns1y: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

// Service Interfaces
export interface ITradingService {
  placeOrder(order: Omit<Order, 'id' | 'createdAt' | 'status' | 'filledAmount'>): Promise<Order>;
  cancelOrder(orderId: string): Promise<boolean>;
  getOrderBook(pair: string): Promise<{ bids: Order[]; asks: Order[] }>;
  getOrders(userId: string, status?: Order['status']): Promise<Order[]>;
  executeTrade(buyOrder: Order, sellOrder: Order): Promise<Trade>;
  getTradingHistory(userId: string, pair?: string): Promise<Trade[]>;
}

export interface IWalletService {
  createWallet(userId: string, type: Wallet['type']): Promise<Wallet>;
  connectWallet(provider: string, address: string): Promise<Wallet>;
  disconnectWallet(walletId: string): Promise<void>;
  getWallets(userId: string): Promise<Wallet[]>;
  getBalance(walletId: string, asset?: string): Promise<AssetBalance[]>;
  transferAssets(fromWallet: string, toWallet: string, asset: string, amount: number): Promise<boolean>;
  syncWallet(walletId: string): Promise<Wallet>;
}

export interface ILiquidityService {
  addLiquidity(poolId: string, userId: string, amountA: number, amountB: number): Promise<LiquidityPosition>;
  removeLiquidity(positionId: string, percentage: number): Promise<boolean>;
  getPools(): Promise<LiquidityPool[]>;
  getPoolInfo(poolId: string): Promise<LiquidityPool>;
  getUserPositions(userId: string): Promise<LiquidityPosition[]>;
  calculateRewards(positionId: string): Promise<number>;
  claimRewards(positionId: string): Promise<boolean>;
}