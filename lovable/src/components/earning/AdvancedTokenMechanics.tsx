import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, TrendingUp, Users, Gift, Flame, Target, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface DiscountTier {
  id: string;
  name: string;
  requirement: number;
  discount: number;
  benefits: string[];
}

interface BurnEvent {
  id: string;
  amount: number;
  date: Date;
  reason: string;
  participantCount: number;
}

export function AdvancedTokenMechanics() {
  const [userTokens, setUserTokens] = useState(1250);
  const [stakedTokens, setStakedTokens] = useState(500);
  const [referralEarnings, setReferralEarnings] = useState(245);
  const [discountTier, setDiscountTier] = useState<DiscountTier>({
    id: "2",
    name: "Eco Enthusiast",
    requirement: 1000,
    discount: 15,
    benefits: ["15% discount at partner stores", "Priority support", "Exclusive events"],
  });

  const discountTiers: DiscountTier[] = [
    {
      id: "1",
      name: "Green Starter",
      requirement: 500,
      discount: 10,
      benefits: ["10% discount at partner stores", "Monthly newsletter"],
    },
    {
      id: "2",
      name: "Eco Enthusiast",
      requirement: 1000,
      discount: 15,
      benefits: ["15% discount at partner stores", "Priority support", "Exclusive events"],
    },
    {
      id: "3",
      name: "Planet Protector",
      requirement: 2500,
      discount: 25,
      benefits: ["25% discount at partner stores", "VIP access", "Early product launches"],
    },
    {
      id: "4",
      name: "Earth Guardian",
      requirement: 5000,
      discount: 40,
      benefits: ["40% discount at partner stores", "Personal advisor", "Co-creation opportunities"],
    },
  ];

  const burnEvents: BurnEvent[] = [
    {
      id: "1",
      amount: 50000,
      date: new Date("2024-01-15"),
      reason: "Community Vote: Increase Token Value",
      participantCount: 1250,
    },
    {
      id: "2",
      amount: 25000,
      date: new Date("2024-01-10"),
      reason: "Milestone Achievement: 10K Users",
      participantCount: 890,
    },
  ];

  const stakingRewards = [
    { duration: "30 days", apy: 8, multiplier: 1.2 },
    { duration: "90 days", apy: 12, multiplier: 1.5 },
    { duration: "180 days", apy: 18, multiplier: 2.0 },
    { duration: "365 days", apy: 25, multiplier: 3.0 },
  ];

  const handleClaimReferralBonus = () => {
    setUserTokens((prev) => prev + 50);
    toast.success("🎉 Referral Bonus Claimed!", {
      description: "You earned 50 GAiA tokens from your active referrals!",
      duration: 4000,
    });
  };

  const initiateTokenBurn = () => {
    toast.success("🔥 Token Burn Vote Started!", {
      description: "Your vote to burn 100,000 tokens has been registered. Results in 24 hours!",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Coins className="h-6 w-6" />
            💎 Advanced Token Mechanics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="staking" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="staking">Staking</TabsTrigger>
              <TabsTrigger value="discounts">Discounts</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
              <TabsTrigger value="burning">Token Burns</TabsTrigger>
            </TabsList>

            <TabsContent value="staking" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400">Current Staking</h3>
                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Staked Amount:</span>
                      <span className="text-blue-400 font-bold">{stakedTokens} GAiA</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Current APY:</span>
                      <span className="text-green-400 font-bold">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Earning Multiplier:</span>
                      <span className="text-purple-400 font-bold">2.0x</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-400">Staking Options</h3>
                  {stakingRewards.map((option, index) => (
                    <div
                      key={index}
                      className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{option.duration}</div>
                          <div className="text-sm text-muted-foreground">
                            {option.apy}% APY • {option.multiplier}x multiplier
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Stake
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="discounts" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Your Current Tier</h3>
                  <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-green-400">{discountTier.name}</span>
                      <Badge className="bg-green-600 text-white">
                        {discountTier.discount}% OFF
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {discountTier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Gift className="h-4 w-4 text-green-400" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-4">All Tiers</h3>
                  <div className="space-y-3">
                    {discountTiers.map((tier, index) => (
                      <div
                        key={tier.id}
                        className={`p-3 rounded-lg border ${
                          tier.id === discountTier.id
                            ? "bg-orange-900/30 border-orange-500/20"
                            : "bg-gray-900/30 border-gray-500/20"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{tier.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {tier.requirement} GAiA required
                            </div>
                          </div>
                          <Badge variant="outline">{tier.discount}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="referrals" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20 text-center">
                  <div className="text-2xl font-bold text-yellow-400">12</div>
                  <div className="text-sm text-muted-foreground">Active Referrals</div>
                </div>
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">{referralEarnings}</div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </div>
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/20 text-center">
                  <div className="text-2xl font-bold text-blue-400">50</div>
                  <div className="text-sm text-muted-foreground">Claimable Now</div>
                </div>
              </div>

              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold mb-3">Referral Program Benefits:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-400" />
                    Earn 10% of your referrals' lifetime earnings
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                    Bonus multipliers for highly active referrals
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    Exclusive rewards for referring 25+ users
                  </li>
                </ul>
                <Button
                  onClick={handleClaimReferralBonus}
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  Claim Available Bonus
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="burning" className="space-y-4">
              <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-red-400">Community Token Burns</h3>
                </div>
                <p className="text-sm text-red-300/80 mb-4">
                  The community votes to burn tokens, reducing supply and potentially increasing
                  value for all holders.
                </p>

                <div className="space-y-3 mb-4">
                  {burnEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 bg-red-900/20 rounded border border-red-500/20"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">
                            {event.amount.toLocaleString()} GAiA Burned
                          </div>
                          <div className="text-sm text-muted-foreground">{event.reason}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{event.date.toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.participantCount} voters
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={initiateTokenBurn} className="w-full bg-red-600 hover:bg-red-700">
                  <Flame className="h-4 w-4 mr-2" />
                  Vote for Next Token Burn
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
