import React from 'react';
import { useBlockchain } from '../hooks/useBlockchain';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { Badge } from '../../../src/components/ui/badge';
import { Loader2 } from 'lucide-react';

export const BlockchainStatus: React.FC = () => {
  const { chainState, isLoading, error, refreshChainState } = useBlockchain();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Initializing GaiaChain...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!chainState) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          GaiaChain Status
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Block Height</label>
            <div className="text-2xl font-bold">{chainState.height.toLocaleString()}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Total Transactions</label>
            <div className="text-2xl font-bold">{chainState.totalTransactions.toLocaleString()}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Active Validators</label>
            <div className="text-2xl font-bold">{chainState.activeValidators}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Network Hash Rate</label>
            <div className="text-2xl font-bold">{(chainState.networkHashRate / 1000000).toFixed(1)}M H/s</div>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-500">Latest Block Hash</label>
          <div className="text-sm font-mono bg-gray-100 p-2 rounded mt-1">
            {chainState.latestBlockHash}
          </div>
        </div>
        
        <button 
          onClick={refreshChainState}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Status
        </button>
      </CardContent>
    </Card>
  );
};