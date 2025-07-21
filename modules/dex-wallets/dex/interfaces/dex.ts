/**
 * DEX Interface Specifications
 * Defines the core trading and liquidity management interfaces
 */

export interface TradingPair {
  baseToken: string;
  quoteToken: string;
  tickSize: string;
  minOrderSize: string;
  maxOrderSize: string;
}

export interface Order {
  id?: string;
  userId: string;
  pair: TradingPair;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop' | 'stop_limit';
  amount: string;
  price?: string;
  stopPrice?: string;
  timeInForce: 'GTC' | 'IOC' | 'FOK';
  status: 'pending' | 'open' | 'filled' | 'cancelled' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderBook {
  pair: TradingPair;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  timestamp: Date;
}

export interface OrderBookEntry {
  price: string;
  amount: string;
  count: number;
}

export interface Trade {
  id: string;
  pair: TradingPair;
  price: string;
  amount: string;
  side: 'buy' | 'sell';
  maker: string;
  taker: string;
  timestamp: Date;
  fees: {
    maker: string;
    taker: string;
  };
}

export interface LiquidityParams {
  pair: TradingPair;
  amountA: string;
  amountB: string;
  priceRange: {
    lower: string;
    upper: string;
  };
  feeTier: number;
}

export interface LiquidityPosition {
  id: string;
  owner: string;
  pair: TradingPair;
  liquidity: string;
  priceRange: {
    lower: string;
    upper: string;
  };
  fees: {
    collected: string;
    pending: string;
  };
  createdAt: Date;
}

export interface SwapParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOutMin: string;
  recipient: string;
  deadline: number;
  slippageTolerance: number;
}

export interface SwapRoute {
  path: string[];
  amounts: string[];
  fees: string[];
  priceImpact: string;
  estimatedGas: string;
}

/**
 * Core DEX Interface
 */
export interface IDEX {
  // Order management
  placeOrder(order: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<string>;
  cancelOrder(orderId: string): Promise<void>;
  cancelAllOrders(userId: string, pair?: TradingPair): Promise<void>;
  getOrder(orderId: string): Promise<Order>;
  getUserOrders(userId: string, filters?: OrderFilters): Promise<Order[]>;
  
  // Market data
  getOrderBook(pair: TradingPair, depth?: number): Promise<OrderBook>;
  getTicker(pair: TradingPair): Promise<Ticker>;
  getTrades(pair: TradingPair, limit?: number): Promise<Trade[]>;
  getCandles(pair: TradingPair, interval: string, limit?: number): Promise<Candle[]>;
  
  // Liquidity management (AMM)
  addLiquidity(params: LiquidityParams): Promise<string>;
  removeLiquidity(positionId: string, percentage: number): Promise<void>;
  getLiquidityPositions(owner: string): Promise<LiquidityPosition[]>;
  
  // Swapping
  getSwapQuote(params: SwapParams): Promise<SwapQuote>;
  executeSwap(params: SwapParams): Promise<string>;
  findBestRoute(tokenIn: string, tokenOut: string, amountIn: string): Promise<SwapRoute>;
  
  // Trading utilities
  estimateGas(operation: string, params: any): Promise<string>;
  getMinimumReceived(swapParams: SwapParams): Promise<string>;
  calculatePriceImpact(pair: TradingPair, amount: string, side: 'buy' | 'sell'): Promise<string>;
}

export interface OrderFilters {
  pair?: TradingPair;
  status?: Order['status'];
  side?: Order['side'];
  type?: Order['type'];
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface Ticker {
  pair: TradingPair;
  lastPrice: string;
  priceChange24h: string;
  priceChangePercent24h: string;
  high24h: string;
  low24h: string;
  volume24h: string;
  quoteVolume24h: string;
  timestamp: Date;
}

export interface Candle {
  timestamp: Date;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface SwapQuote {
  route: SwapRoute;
  expectedOutput: string;
  minimumOutput: string;
  priceImpact: string;
  fees: string;
  gasEstimate: string;
  validUntil: Date;
}