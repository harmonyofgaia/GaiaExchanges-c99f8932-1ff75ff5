/**
 * Core Blockchain Interface
 * Defines the fundamental blockchain operations and state management
 */

export interface BlockchainConfig {
  chainId: string;
  networkName: string;
  protocolVersion: string;
  consensusEngine: ConsensusEngine;
  vmConfig: VirtualMachineConfig;
}

export interface ConsensusEngine {
  type: 'tendermint' | 'substrate' | 'custom';
  blockTime: number; // seconds
  maxBlockSize: number; // bytes
  maxGasPerBlock: number;
  validatorSetSize: number;
}

export interface VirtualMachineConfig {
  evm: {
    enabled: boolean;
    chainId: number;
    gasLimit: number;
  };
  wasm: {
    enabled: boolean;
    maxMemoryPages: number;
    maxCallStackHeight: number;
  };
}

export interface Block {
  height: number;
  hash: string;
  timestamp: Date;
  proposer: string;
  transactions: Transaction[];
  stateRoot: string;
  receiptsRoot: string;
  gasUsed: number;
  gasLimit: number;
}

export interface Transaction {
  hash: string;
  from: string;
  to?: string;
  value: string;
  gas: number;
  gasPrice: string;
  data: string;
  nonce: number;
  signature: Signature;
  status: TransactionStatus;
}

export interface Signature {
  r: string;
  s: string;
  v: number;
  recoveryId?: number;
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  DROPPED = 'dropped'
}

export interface Account {
  address: string;
  balance: string;
  nonce: number;
  codeHash?: string;
  storageRoot?: string;
}

export interface ChainState {
  height: number;
  appHash: string;
  validatorHash: string;
  nextValidatorHash: string;
  consensusHash: string;
  lastResultsHash: string;
}

/**
 * Core Blockchain Service Interface
 */
export interface IBlockchainService {
  // Block operations
  getBlock(height: number): Promise<Block>;
  getLatestBlock(): Promise<Block>;
  getBlockByHash(hash: string): Promise<Block>;
  
  // Transaction operations
  getTransaction(hash: string): Promise<Transaction>;
  submitTransaction(tx: Transaction): Promise<string>;
  estimateGas(tx: Partial<Transaction>): Promise<number>;
  
  // Account operations
  getAccount(address: string): Promise<Account>;
  getBalance(address: string): Promise<string>;
  getNonce(address: string): Promise<number>;
  
  // State operations
  getChainState(): Promise<ChainState>;
  queryState(path: string): Promise<any>;
  
  // Network operations
  getNetworkInfo(): Promise<NetworkInfo>;
  getPeers(): Promise<Peer[]>;
  
  // Events and subscriptions
  subscribeToBlocks(callback: (block: Block) => void): () => void;
  subscribeToTransactions(callback: (tx: Transaction) => void): () => void;
}

export interface NetworkInfo {
  chainId: string;
  networkName: string;
  protocolVersion: string;
  blockHeight: number;
  peerCount: number;
  syncing: boolean;
}

export interface Peer {
  id: string;
  address: string;
  version: string;
  latency: number;
  blockHeight: number;
}