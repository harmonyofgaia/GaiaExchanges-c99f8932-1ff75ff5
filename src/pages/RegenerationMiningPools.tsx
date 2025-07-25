import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Pickaxe, 
  TreePine, 
  Leaf, 
  Coins, 
  Zap, 
  Users, 
  TrendingUp,
  Droplets,
  Wind,
  Sun,
  Mountain,
  Recycle,
  Shield,
  Heart,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

interface MiningPool {
  id: string;
  name: string;
  type: 'forest' | 'ocean' | 'solar' | 'wind' | 'carbon' | 'biodiversity';
  description: string;
  totalStaked: number;
  apy: number;
  participants: number;
  impactMetrics: {
    treesPlanted?: number;
    carbonOffset?: number;
    renewableEnergyGenerated?: number;
    biodiversityProtected?: number;
  };
  minStake: number;
  lockPeriod: number; // days
  rewardsTokenType: string;
  status: 'active' | 'full' | 'pending';
}

const RegenerationMiningPools: React.FC = () => {
  const [miningPools, setMiningPools] = useState<MiningPool[]>([]);
  const [userStakes, setUserStakes] = useState<Record<string, number>>({});
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize with sample mining pools
    const samplePools: MiningPool[] = [
      {
        id: 'forest-regeneration',
        name: 'Forest Regeneration Pool',
        type: 'forest',
        description: 'Stake tokens to fund reforestation projects worldwide. Earn TREE tokens while contributing to carbon sequestration.',
        totalStaked: 1500000,
        apy: 12.5,
        participants: 2340,
        impactMetrics: {
          treesPlanted: 45780,
          carbonOffset: 12400
        },
        minStake: 100,
        lockPeriod: 90,
        rewardsTokenType: 'TREE',
        status: 'active'
      },
      {
        id: 'ocean-cleanup',
        name: 'Ocean Cleanup Mining',
        type: 'ocean',
        description: 'Support ocean cleanup initiatives and marine ecosystem restoration through staking.',
        totalStaked: 890000,
        apy: 15.2,
        participants: 1120,
        impactMetrics: {
          carbonOffset: 8900,
          biodiversityProtected: 150
        },
        minStake: 250,
        lockPeriod: 120,
        rewardsTokenType: 'OCEAN',
        status: 'active'
      },
      {
        id: 'solar-farms',
        name: 'Solar Energy Mining Pool',
        type: 'solar',
        description: 'Fund solar farm development and earn returns from clean energy generation.',
        totalStaked: 2100000,
        apy: 18.7,
        participants: 3450,
        impactMetrics: {
          renewableEnergyGenerated: 15600, // kWh
          carbonOffset: 18900
        },
        minStake: 500,
        lockPeriod: 180,
        rewardsTokenType: 'SOLAR',
        status: 'active'
      },
      {
        id: 'wind-energy',
        name: 'Wind Power Collective',
        type: 'wind',
        description: 'Participate in wind energy projects and receive rewards from sustainable power generation.',
        totalStaked: 1750000,
        apy: 16.8,
        participants: 2890,
        impactMetrics: {
          renewableEnergyGenerated: 22400,
          carbonOffset: 16700
        },
        minStake: 300,
        lockPeriod: 150,
        rewardsTokenType: 'WIND',
        status: 'active'
      },
      {
        id: 'carbon-capture',
        name: 'Carbon Capture Technology Pool',
        type: 'carbon',
        description: 'Support advanced carbon capture and storage technologies for maximum climate impact.',
        totalStaked: 3200000,
        apy: 22.4,
        participants: 4120,
        impactMetrics: {
          carbonOffset: 35600
        },
        minStake: 1000,
        lockPeriod: 365,
        rewardsTokenType: 'CARBON',
        status: 'active'
      },
      {
        id: 'biodiversity-protection',
        name: 'Biodiversity Protection Fund',
        type: 'biodiversity',
        description: 'Preserve endangered species habitats and earn rewards from conservation success.',
        totalStaked: 980000,
        apy: 14.3,
        participants: 1567,
        impactMetrics: {
          biodiversityProtected: 280,
          treesPlanted: 12900
        },
        minStake: 200,
        lockPeriod: 120,
        rewardsTokenType: 'BIO',
        status: 'active'
      }
    ];

    setMiningPools(samplePools);
    
    // Load user stakes from localStorage
    const savedStakes = localStorage.getItem('userStakes');
    if (savedStakes) {
      setUserStakes(JSON.parse(savedStakes));
    }
  }, []);

  const getPoolIcon = (type: string) => {
    switch (type) {
      case 'forest': return TreePine;
      case 'ocean': return Droplets;
      case 'solar': return Sun;
      case 'wind': return Wind;
      case 'carbon': return Recycle;
      case 'biodiversity': return Heart;
      default: return Leaf;
    }
  };

  const getPoolColor = (type: string) => {
    switch (type) {
      case 'forest': return 'text-green-500';
      case 'ocean': return 'text-blue-500';
      case 'solar': return 'text-yellow-500';
      case 'wind': return 'text-cyan-500';
      case 'carbon': return 'text-gray-500';
      case 'biodiversity': return 'text-purple-500';
      default: return 'text-green-500';
    }
  };

  const handleStake = async (poolId: string) => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error('Please enter a valid stake amount');
      return;
    }

    const pool = miningPools.find(p => p.id === poolId);
    if (!pool) return;

    if (parseFloat(stakeAmount) < pool.minStake) {
      toast.error(`Minimum stake amount is ${pool.minStake} tokens`);
      return;
    }

    setLoading(true);

    try {
      // Simulate staking transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newStakeAmount = (userStakes[poolId] || 0) + parseFloat(stakeAmount);
      const updatedStakes = { ...userStakes, [poolId]: newStakeAmount };
      
      setUserStakes(updatedStakes);
      localStorage.setItem('userStakes', JSON.stringify(updatedStakes));
      
      // Update pool stats
      setMiningPools(pools => pools.map(p => 
        p.id === poolId 
          ? { ...p, totalStaked: p.totalStaked + parseFloat(stakeAmount), participants: p.participants + 1 }
          : p
      ));

      toast.success(
        `Successfully staked ${stakeAmount} tokens in ${pool.name}!`,
        {
          description: `You're now earning ${pool.apy}% APY while supporting ${pool.type} regeneration.`
        }
      );

      setStakeAmount('');
      setSelectedPool(null);
    } catch (error) {
      toast.error('Staking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateRewards = (poolId: string) => {
    const pool = miningPools.find(p => p.id === poolId);
    const stake = userStakes[poolId];
    if (!pool || !stake) return 0;
    
    return (stake * pool.apy) / PERCENTAGE_DIVISOR / DAYS_PER_YEAR; // Daily rewards
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Pickaxe className="text-green-400" />
            Regeneration Mining Pools
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Stake your tokens in environmental regeneration projects and earn rewards while making a positive impact on the planet. 
            Each mining pool funds real-world initiatives for carbon reduction, renewable energy, and ecosystem restoration.
          </p>
        </div>

        <Tabs defaultValue="active-pools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="active-pools">Active Pools</TabsTrigger>
            <TabsTrigger value="my-stakes">My Stakes</TabsTrigger>
            <TabsTrigger value="impact-metrics">Impact Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="active-pools" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {miningPools.filter(pool => pool.status === 'active').map((pool) => {
                const IconComponent = getPoolIcon(pool.type);
                const iconColor = getPoolColor(pool.type);
                
                return (
                  <Card key={pool.id} className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconComponent className={`w-5 h-5 ${iconColor}`} />
                        {pool.name}
                      </CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {pool.apy}% APY
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm">{pool.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Total Staked</span>
                          <div className="font-semibold">{pool.totalStaked.toLocaleString()} tokens</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Participants</span>
                          <div className="font-semibold">{pool.participants.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Min Stake</span>
                          <div className="font-semibold">{pool.minStake} tokens</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Lock Period</span>
                          <div className="font-semibold">{pool.lockPeriod} days</div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          Impact Metrics
                        </h4>
                        <div className="space-y-1 text-xs">
                          {pool.impactMetrics.treesPlanted && (
                            <div className="flex justify-between">
                              <span>Trees Planted:</span>
                              <span className="text-green-400">{pool.impactMetrics.treesPlanted.toLocaleString()}</span>
                            </div>
                          )}
                          {pool.impactMetrics.carbonOffset && (
                            <div className="flex justify-between">
                              <span>Carbon Offset:</span>
                              <span className="text-green-400">{pool.impactMetrics.carbonOffset.toLocaleString()} tons</span>
                            </div>
                          )}
                          {pool.impactMetrics.renewableEnergyGenerated && (
                            <div className="flex justify-between">
                              <span>Energy Generated:</span>
                              <span className="text-yellow-400">{pool.impactMetrics.renewableEnergyGenerated.toLocaleString()} kWh</span>
                            </div>
                          )}
                          {pool.impactMetrics.biodiversityProtected && (
                            <div className="flex justify-between">
                              <span>Species Protected:</span>
                              <span className="text-purple-400">{pool.impactMetrics.biodiversityProtected}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedPool(pool.id)}
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        Stake in Pool
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="my-stakes" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(userStakes).map(([poolId, amount]) => {
                const pool = miningPools.find(p => p.id === poolId);
                if (!pool || amount === 0) return null;

                const dailyRewards = calculateRewards(poolId);
                const IconComponent = getPoolIcon(pool.type);
                const iconColor = getPoolColor(pool.type);

                return (
                  <Card key={poolId} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconComponent className={`w-5 h-5 ${iconColor}`} />
                        {pool.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-400 text-sm">Staked Amount</span>
                          <div className="font-semibold text-lg">{amount.toLocaleString()} tokens</div>
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm">Daily Rewards</span>
                          <div className="font-semibold text-lg text-green-400">
                            {dailyRewards.toFixed(4)} {pool.rewardsTokenType}
                          </div>
                        </div>
                      </div>
                      
                      <Progress 
                        value={(amount / pool.totalStaked) * 100} 
                        className="h-2"
                      />
                      
                      <div className="text-xs text-gray-400">
                        Your share: {((amount / pool.totalStaked) * 100).toFixed(2)}% of total pool
                      </div>

                      <Button variant="outline" className="w-full">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Claim Rewards
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              
              {Object.keys(userStakes).length === 0 && (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <Pickaxe className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">No Active Stakes</h3>
                    <p className="text-gray-400 mb-4">
                      Start staking in regeneration mining pools to earn rewards while supporting environmental projects.
                    </p>
                    <Button onClick={() => document.querySelector('[value="active-pools"]')?.click()}>
                      Browse Pools
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="impact-metrics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
                <CardContent className="p-6 text-center">
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <div className="text-2xl font-bold">
                    {miningPools.reduce((total, pool) => total + (pool.impactMetrics.treesPlanted || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Trees Planted</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
                <CardContent className="p-6 text-center">
                  <Recycle className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <div className="text-2xl font-bold">
                    {miningPools.reduce((total, pool) => total + (pool.impactMetrics.carbonOffset || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Tons CO₂ Offset</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <div className="text-2xl font-bold">
                    {miningPools.reduce((total, pool) => total + (pool.impactMetrics.renewableEnergyGenerated || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">kWh Clean Energy</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <div className="text-2xl font-bold">
                    {miningPools.reduce((total, pool) => total + (pool.impactMetrics.biodiversityProtected || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-300">Species Protected</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Staking Modal */}
        {selectedPool && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
              <CardHeader>
                <CardTitle>Stake in {miningPools.find(p => p.id === selectedPool)?.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Stake Amount</label>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Enter amount to stake"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500"
                    min={miningPools.find(p => p.id === selectedPool)?.minStake}
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Minimum: {miningPools.find(p => p.id === selectedPool)?.minStake} tokens
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedPool(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleStake(selectedPool)}
                    disabled={loading}
                  >
                    {loading ? 'Staking...' : 'Stake Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegenerationMiningPools;