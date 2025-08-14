import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingUp, Users, Handshake, Target, Gift } from "lucide-react";
import { RevenueAgreement } from "@/types/ui-types";
import { toast } from "sonner";

export function FlexibleRevenueAgreements() {
  const [agreements, setAgreements] = useState<RevenueAgreement[]>([
    {
      id: "agreement-1",
      name: "GAiA Token Revenue Share",
      percentage: 15,
      bonusPercentage: 5,
      description: "Revenue sharing from GAiA token ecosystem",
      isActive: true,
    },
    {
      id: "agreement-2",
      name: "Green Projects Fund",
      percentage: 20,
      bonusPercentage: 8,
      description: "Percentage of green project funding",
      isActive: true,
    },
  ]);

  const [newAgreement, setNewAgreement] = useState<RevenueAgreement>({
    id: "",
    name: "",
    percentage: 10,
    bonusPercentage: 0,
    description: "",
    isActive: false,
  });

  const [totalRevenue, setTotalRevenue] = useState(250000);
  const [monthlyGrowth, setMonthlyGrowth] = useState(12.5);

  useEffect(() => {
    console.log("💰 FLEXIBLE REVENUE AGREEMENTS - PARTNERSHIP ENGINE ACTIVE");
    console.log("🤝 Creating Mutual Benefit Partnerships");
    console.log("📈 Revenue Growth Tracking Engaged");

    // Simulate revenue updates
    const revenueInterval = setInterval(() => {
      setTotalRevenue((prev) => prev * (1 + (Math.random() - 0.3) * 0.001));
      setMonthlyGrowth((prev) => prev + (Math.random() - 0.5) * 0.1);
    }, 5000);

    return () => clearInterval(revenueInterval);
  }, []);

  const createAgreement = () => {
    if (!newAgreement.name.trim()) {
      toast.error("Please enter agreement name");
      return;
    }

    const agreement: RevenueAgreement = {
      ...newAgreement,
      id: `agreement-${Date.now()}`,
      isActive: true,
    };

    setAgreements((prev) => [...prev, agreement]);
    setNewAgreement({
      id: "",
      name: "",
      percentage: 10,
      bonusPercentage: 0,
      description: "",
      isActive: false,
    });

    toast.success("✅ Revenue Agreement Created!", {
      description: `${agreement.name} - ${agreement.percentage}% base + ${agreement.bonusPercentage}% bonus`,
      duration: 4000,
    });
  };

  const toggleAgreement = (id: string) => {
    setAgreements((prev) =>
      prev.map((agreement) =>
        agreement.id === id ? { ...agreement, isActive: !agreement.isActive } : agreement
      )
    );
  };

  const calculateRevenue = (agreement: RevenueAgreement) => {
    const baseRevenue = (totalRevenue * agreement.percentage) / 100;
    const bonusRevenue = agreement.bonusPercentage
      ? (totalRevenue * agreement.bonusPercentage) / 100
      : 0;
    return baseRevenue + bonusRevenue;
  };

  const totalActivePercentage = agreements
    .filter((a) => a.isActive)
    .reduce((sum, a) => sum + a.percentage + (a.bonusPercentage || 0), 0);

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Handshake className="h-6 w-6" />
            💰 FLEXIBLE REVENUE AGREEMENTS - Partnership Engine
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-green-600 animate-pulse">ACTIVE PARTNERSHIPS</Badge>
            <Badge className="bg-blue-600">REVENUE GROWING</Badge>
            <Badge className="bg-purple-600">MUTUAL BENEFITS</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <DollarSign className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <TrendingUp className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{monthlyGrowth.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Monthly Growth</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <Target className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {totalActivePercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Total Allocation</div>
            </div>
          </div>

          {/* Active Agreements */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold text-white">Active Revenue Agreements</h3>
            {agreements.map((agreement) => (
              <Card
                key={agreement.id}
                className={`border-2 ${agreement.isActive ? "border-green-500/30 bg-green-900/10" : "border-gray-500/30 bg-gray-900/10"}`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{agreement.name}</h4>
                      <p className="text-sm text-muted-foreground">{agreement.description}</p>
                    </div>
                    <Button
                      onClick={() => toggleAgreement(agreement.id)}
                      variant={agreement.isActive ? "default" : "outline"}
                      size="sm"
                      className={agreement.isActive ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {agreement.isActive ? "Active" : "Inactive"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
                      <div className="text-sm text-muted-foreground">Base Percentage</div>
                      <div className="text-xl font-bold text-blue-400">{agreement.percentage}%</div>
                    </div>
                    <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
                      <div className="text-sm text-muted-foreground">Bonus Percentage</div>
                      <div className="text-xl font-bold text-purple-400">
                        {agreement.bonusPercentage || 0}%
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
                      <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                      <div className="text-xl font-bold text-green-400">
                        ${agreement.isActive ? calculateRevenue(agreement).toLocaleString() : "0"}
                      </div>
                    </div>
                  </div>

                  {agreement.isActive && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Revenue Share Progress</span>
                        <span>
                          {(agreement.percentage + (agreement.bonusPercentage || 0)).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={agreement.percentage + (agreement.bonusPercentage || 0)}
                        className="h-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create New Agreement */}
          <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Create New Revenue Agreement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Agreement Name</label>
                  <Input
                    value={newAgreement.name}
                    onChange={(e) =>
                      setNewAgreement((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="e.g., Strategic Partnership Revenue"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={newAgreement.description}
                    onChange={(e) =>
                      setNewAgreement((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Agreement description"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Base Percentage: {newAgreement.percentage}%
                  </label>
                  <Slider
                    value={[newAgreement.percentage]}
                    onValueChange={([value]) =>
                      setNewAgreement((prev) => ({
                        ...prev,
                        percentage: value,
                      }))
                    }
                    max={50}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Bonus Percentage: {newAgreement.bonusPercentage}%
                  </label>
                  <Slider
                    value={[newAgreement.bonusPercentage || 0]}
                    onValueChange={([value]) =>
                      setNewAgreement((prev) => ({
                        ...prev,
                        bonusPercentage: value,
                      }))
                    }
                    max={20}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Estimated Monthly Revenue</div>
                    <div className="text-2xl font-bold text-green-400">
                      $
                      {(
                        (totalRevenue *
                          (newAgreement.percentage + (newAgreement.bonusPercentage || 0))) /
                        100
                      ).toLocaleString()}
                    </div>
                  </div>
                  <Gift className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <Button
                onClick={createAgreement}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
                disabled={!newAgreement.name.trim()}
              >
                <Handshake className="h-4 w-4 mr-2" />
                Create Revenue Agreement
              </Button>
            </CardContent>
          </Card>

          {/* Partnership Benefits */}
          <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🤝 Partnership Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-bold text-white">For Partners:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Guaranteed revenue sharing</li>
                    <li>• Performance-based bonuses</li>
                    <li>• Growth participation rewards</li>
                    <li>• Priority project access</li>
                    <li>• Exclusive token allocations</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-white">For GAiA Ecosystem:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Strategic partnerships</li>
                    <li>• Expanded market reach</li>
                    <li>• Shared resources & expertise</li>
                    <li>• Risk distribution</li>
                    <li>• Accelerated growth</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
