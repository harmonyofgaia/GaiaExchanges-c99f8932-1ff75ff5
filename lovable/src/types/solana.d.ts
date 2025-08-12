
export interface PhantomProvider {
  isPhantom: boolean;
  publicKey: {
    toString(): string;
  };
  connect(): Promise<{ publicKey: { toString(): string } }>;
  disconnect(): Promise<void>;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}
