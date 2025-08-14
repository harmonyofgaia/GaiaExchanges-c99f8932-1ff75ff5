import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock, TrendingUp, Calendar, Coins } from "lucide-react";
import { toast } from "sonner";

interface StakingPool {
  id: string;
  name: string;
  duration: number;
  apy: number;
  minStake: number;
  totalStaked: number;
  maxCapacity: number;
  userStaked: number;
  lockPeriod: number;
  multiplier: number;
}

export function TokenStakingSystem() {
  const [userBalance] = useState(1250);
  const [stakingPools] = useState<StakingPool[]>([
    {
      id: "1",
      name: "Eco Starter Pool",
      duration: 30,
      apy: 8,
      minStake: 100,
      totalStaked: 45000,
      maxCapacity: 100000,
      userStaked: 500,
      lockPeriod: 30,
      multiplier: 1.2,
    },
    {
      id: "2",
      name: "Green Growth Pool",
      duration: 90,
      apy: 15,
      minStake: 500,
      totalStaked: 120000,
      maxCapacity: 200000,
      userStaked: 0,
      lockPeriod: 90,
      multiplier: 1.8,
    },
    {
      id: "3",
      name: "Climate Champion Pool",
      duration: 365,
      apy: 25,
      minStake: 1000,
      totalStaked: 80000,
      maxCapacity: 150000,
      userStaked: 0,
      lockPeriod: 365,
      multiplier: 3.0,
    },
  ]);

  const stakeTokens = (poolId: string, amount: number) => {
    toast.success(`Successfully staked ${amount} GAiA tokens!`, {
      description: "Your tokens are now earning rewards. Check back daily!",
      duration: 4000,
    });
  };

  const unstakeTokens = (poolId: string) => {
    toast.success("Tokens unstaked successfully!", {
      description: "Your tokens and rewards have been returned to your wallet.",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Lock className="h-6 w-6" />
            🔒 Token Staking System
            <Badge className="bg-purple-600">Phase 2</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-purple-400">{userBalance}</div>
                <div className="text-sm text-muted-foreground">Available GAiA</div>
              </div>
              <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/20 text-center">
                <div className="text-2xl font-bold text-green-400">500</div>
                <div className="text-sm text-muted-foreground">Currently Staked</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/20 text-center">
                <div className="text-2xl font-bold text-blue-400">12.5</div>
                <div className="text-sm text-muted-foreground">Rewards Earned</div>
              </div>
            </div>

            {/* Staking Pools */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-400">Available Staking Pools</h3>

              {stakingPools.map((pool) => {
                const poolUtilization = (pool.totalStaked / pool.maxCapacity) * 100;
                const userHasStake = pool.userStaked > 0;

                return (
                  <Card key={pool.id} className="border-purple-500/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-purple-400">{pool.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {pool.duration} day lock period • {pool.apy}% APY
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-purple-600 mb-2">
                            {pool.multiplier}x Multiplier
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            Min: {pool.minStake} GAiA
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Pool Utilization</span>
                          <span>
                            {pool.totalStaked.toLocaleString()} /{" "}
                            {pool.maxCapacity.toLocaleString()} GAiA
                          </span>
                        </div>
                        <Progress value={poolUtilization} className="h-2" />
                      </div>

                      {userHasStake && (
                        <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20 mb-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-green-400">
                                Your Stake: {pool.userStaked} GAiA
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Earning {((pool.userStaked * pool.apy) / 365).toFixed(2)} GAiA/day
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => unstakeTokens(pool.id)}
                            >
                              <Unlock className="h-4 w-4 mr-1" />
                              Unstake
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => stakeTokens(pool.id, pool.minStake)}
                          disabled={userBalance < pool.minStake}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Stake {pool.minStake} GAiA
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => stakeTokens(pool.id, pool.minStake * 2)}
                          disabled={userBalance < pool.minStake * 2}
                        >
                          Stake {pool.minStake * 2} GAiA
                        </Button>
                      </div>

                      <div className="mt-3 p-3 bg-purple-900/10 rounded border border-purple-500/20">
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-300">
                            Projected earnings:{" "}
                            {((pool.minStake * pool.apy * pool.multiplier) / 100).toFixed(0)}{" "}
                            GAiA/year
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
