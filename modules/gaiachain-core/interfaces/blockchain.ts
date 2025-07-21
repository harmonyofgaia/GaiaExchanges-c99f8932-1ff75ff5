export interface Block {
  hash: string;
  previousHash: string;
  timestamp: number;
  transactions: Transaction[];
  nonce: number;
  difficulty: number;
  validator: string;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  timestamp: number;
  signature: string;
  data?: any;
}

export interface ChainState {
  height: number;
  latestBlockHash: string;
  totalTransactions: number;
  activeValidators: number;
  networkHashRate: number;
  difficulty: number;
}

export interface ConsensusProposal {
  blockHash: string;
  proposer: string;
  timestamp: number;
  votes: Vote[];
  status: 'pending' | 'approved' | 'rejected';
}

export interface Vote {
  validator: string;
  blockHash: string;
  decision: boolean;
  timestamp: number;
  signature: string;
}

export interface NetworkPeer {
  id: string;
  address: string;
  port: number;
  version: string;
  lastSeen: number;
  status: 'connected' | 'disconnected' | 'syncing';
}

export interface ValidatorInfo {
  address: string;
  stake: number;
  performance: number;
  reputation: number;
  lastActive: number;
  isActive: boolean;
}

export interface BlockchainConfig {
  networkId: string;
  genesisHash: string;
  chainId: number;
  consensusAlgorithm: string;
  blockTime: number;
  maxBlockSize: number;
  minFee: number;
}

// Core blockchain service interface
export interface IBlockchainService {
  initializeChain(): Promise<void>;
  validateTransaction(transaction: Transaction): Promise<boolean>;
  processBlock(block: Block): Promise<boolean>;
  getChainStatus(): Promise<ChainState>;
  getBlock(hash: string): Promise<Block | null>;
  getTransaction(id: string): Promise<Transaction | null>;
}

// Consensus service interface
export interface IConsensusService {
  startConsensus(): Promise<void>;
  stopConsensus(): Promise<void>;
  proposeBlock(block: Block): Promise<ConsensusProposal>;
  validateProposal(proposal: ConsensusProposal): Promise<boolean>;
  reachAgreement(proposal: ConsensusProposal): Promise<boolean>;
}

// Network service interface
export interface INetworkService {
  connectToPeers(): Promise<void>;
  broadcastTransaction(transaction: Transaction): Promise<void>;
  broadcastBlock(block: Block): Promise<void>;
  syncWithNetwork(): Promise<void>;
  getPeers(): Promise<NetworkPeer[]>;
}