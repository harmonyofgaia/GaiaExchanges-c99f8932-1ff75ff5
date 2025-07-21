import { useState, useEffect } from 'react';
import { ChainState } from '../interfaces/blockchain';
import { BlockchainService } from '../services/BlockchainService';

export const useBlockchain = () => {
  const [blockchainService] = useState(() => new BlockchainService());
  const [chainState, setChainState] = useState<ChainState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeBlockchain = async () => {
      try {
        setIsLoading(true);
        await blockchainService.initializeChain();
        const state = await blockchainService.getChainStatus();
        setChainState(state);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize blockchain');
      } finally {
        setIsLoading(false);
      }
    };

    initializeBlockchain();
  }, [blockchainService]);

  const refreshChainState = async () => {
    try {
      const state = await blockchainService.getChainStatus();
      setChainState(state);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh chain state');
    }
  };

  return {
    blockchainService,
    chainState,
    isLoading,
    error,
    refreshChainState
  };
};