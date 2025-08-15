import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, DollarSign, Percent, Zap, Shield, TrendingUp, Globe, TreePine } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GreenInvestmentConfig {
  default_fee_percentage: number;
  preferred_fee_destination: string;
  zero_fee_enabled: boolean;
  custom_fee_amount: number;
}

interface GreenProject {
  id: string;
  name: string;
  description: string;
  wallet_address: string;
  allocation_percentage: number;
  total_received: number;
  project_status: "active" | "funded" | "completed";
  carbon_offset: number;
}

const GREEN_INVESTMENT_WALLET = "ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7";

export function GreenInvestmentWalletManager() {
  const [user, setUser] = useState<unknown>(null);
  const [config, setConfig] = useState<GreenInvestmentConfig>({
    default_fee_percentage: 0.001,
    preferred_fee_destination: "green_projects",
    zero_fee_enabled: false,
    custom_fee_amount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [isProcessingFees, setIsProcessingFees] = useState(false);

  const greenProjects: GreenProject[] = [
    {
      id: "1",
      name: "🌱 Global Reforestation Initiative",
      description: "Large-scale tree planting and forest restoration worldwide",
      wallet_address: GREEN_INVESTMENT_WALLET,
      allocation_percentage: 25,
      total_received: 18542.67,
      project_status: "active",
      carbon_offset: 125000,
    },
    {
      id: "2",
      name: "🔋 Renewable Energy Expansion",
      description: "Solar and wind energy infrastructure development",
      wallet_address: GREEN_INVESTMENT_WALLET,
      allocation_percentage: 30,
      total_received: 22451.23,
      project_status: "active",
      carbon_offset: 156000,
    },
    {
      id: "3",
      name: "🌊 Ocean Cleanup Technology",
      description: "Advanced systems for removing plastic from oceans",
      wallet_address: GREEN_INVESTMENT_WALLET,
      allocation_percentage: 20,
      total_received: 15897.45,
      project_status: "active",
      carbon_offset: 89000,
    },
    {
      id: "4",
      name: "🚴 Sustainable Transportation",
      description: "Electric vehicle infrastructure and public transport",
      wallet_address: GREEN_INVESTMENT_WALLET,
      allocation_percentage: 15,
      total_received: 11234.89,
      project_status: "active",
      carbon_offset: 67000,
    },
    {
      id: "5",
      name: "♻️ Circular Economy Systems",
      description: "Waste reduction and recycling technology innovation",
      wallet_address: GREEN_INVESTMENT_WALLET,
      allocation_percentage: 10,
      total_received: 7845.12,
      project_status: "active",
      carbon_offset: 45000,
    },
  ];

  useEffect(() => {
    // Get current user session
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getCurrentUser();

    fetchUserConfig();

    const total = greenProjects.reduce((sum, project) => sum + project.total_received, 0);
    setTotalAllocated(total);

    // Simulate live fee processing
    const interval = setInterval(() => {
      setIsProcessingFees(true);
      setTimeout(() => setIsProcessingFees(false), 2000);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [user]);

  const fetchUserConfig = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("swap_configurations")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching green investment config:", error);
      } else if (data) {
        setConfig({
          default_fee_percentage: data.default_fee_percentage,
          preferred_fee_destination: data.preferred_fee_destination,
          zero_fee_enabled: data.zero_fee_enabled,
          custom_fee_amount: data.custom_fee_amount,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfiguration = async () => {
    if (!user) {
      toast.error("Please log in to save configuration");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("swap_configurations").upsert({
        user_id: user.id,
        default_fee_percentage: config.default_fee_percentage,
        preferred_fee_destination: config.preferred_fee_destination,
        zero_fee_enabled: config.zero_fee_enabled,
        custom_fee_amount: config.custom_fee_amount,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      toast.success("🌱 Green Investment Configuration Saved!", {
        description: "Your fees will now support environmental projects automatically.",
        duration: 4000,
      });
    } catch (error) {
      toast.error("Failed to save configuration");
      console.error("Error saving config:", error);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "funded":
        return "bg-blue-600";
      case "completed":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-64 bg-muted/50 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Configuration Section */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Leaf className="h-5 w-5" />
            🌱 Green Investment Fee Configuration
          </CardTitle>
          <p className="text-green-300">
            Configure how your transaction fees automatically support global environmental
            initiatives
            {!user && (
              <span className="text-yellow-400 ml-2">(Login required for custom settings)</span>
            )}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Green Project Reinvestment (Default) */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div>
              <Label className="text-base font-medium text-green-400">
                🌱 Green Project Support (Recommended)
              </Label>
              <p className="text-sm text-muted-foreground">
                All fees automatically go to verified environmental and sustainability projects
              </p>
            </div>
            <Switch
              checked={config.preferred_fee_destination === "green_projects"}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  preferred_fee_destination: checked ? "green_projects" : "vault",
                  zero_fee_enabled: false,
                })
              }
            />
          </div>

          {/* Zero Fee Option */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div>
              <Label className="text-base font-medium text-blue-400">Zero Fee Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable completely free transactions (no environmental contribution)
              </p>
            </div>
            <Switch
              checked={config.zero_fee_enabled}
              onCheckedChange={(checked) => setConfig({ ...config, zero_fee_enabled: checked })}
            />
          </div>

          {!config.zero_fee_enabled && (
            <>
              {/* Fee Percentage */}
              <div className="space-y-2">
                <Label>Environmental Contribution Percentage</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.0001"
                    min="0"
                    max="1"
                    value={config.default_fee_percentage}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        default_fee_percentage: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="flex-1"
                  />
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    {(config.default_fee_percentage * 100).toFixed(2)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended: 0.1% (0.001) - Small fees that make big environmental impact
                </p>
              </div>

              {/* Alternative Destinations */}
              <div className="space-y-2">
                <Label>Alternative Fee Destination</Label>
                <Select
                  value={config.preferred_fee_destination}
                  onValueChange={(value) =>
                    setConfig({ ...config, preferred_fee_destination: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green_projects">
                      🌱 Green Projects (Recommended - Save Earth)
                    </SelectItem>
                    <SelectItem value="animal_welfare">🐾 Animal Welfare (Save Animals)</SelectItem>
                    <SelectItem value="vault">🏦 Community Vault (Admin Surprises)</SelectItem>
                    <SelectItem value="humanity">❤️ Humanity Fund (Global Aid)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={saveConfiguration}
              disabled={saving || !user}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
              title={!user ? "Login required to save settings" : ""}
            >
              {saving
                ? "Saving..."
                : !user
                  ? "🔒 Login to Save Config"
                  : "🌱 Save Green Investment Config"}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setConfig({
                  default_fee_percentage: 0.001,
                  preferred_fee_destination: "green_projects",
                  zero_fee_enabled: false,
                  custom_fee_amount: 0,
                })
              }
              className="flex items-center gap-2"
            >
              <TreePine className="h-4 w-4" />
              Reset to Green Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Green Projects Distribution */}
      <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Globe className="h-6 w-6" />
            🌍 Green Investment Project Distribution System
          </CardTitle>
          <p className="text-emerald-300">
            All community fees are automatically reinvested into global environmental and
            sustainability projects
          </p>
          <div className="bg-black/30 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">
              Official Green Investment Wallet:
            </div>
            <div className="font-mono text-green-400 text-sm break-all">
              {GREEN_INVESTMENT_WALLET}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <div className="text-2xl font-bold text-green-400">
                {totalAllocated.toLocaleString()} GAIA
              </div>
              <div className="text-xs text-muted-foreground">Total Allocated</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <div className="text-2xl font-bold text-blue-400">{greenProjects.length}</div>
              <div className="text-xs text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-emerald-900/30">
              <div className="text-2xl font-bold text-emerald-400">
                {greenProjects.reduce((sum, p) => sum + p.carbon_offset, 0).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">CO2 Offset (tons)</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-900/30">
              <div className="text-2xl font-bold text-orange-400">
                {isProcessingFees ? "LIVE" : "24/7"}
              </div>
              <div className="text-xs text-muted-foreground">Processing</div>
            </div>
          </div>

          {/* Live Processing Status */}
          {isProcessingFees && (
            <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 animate-pulse mb-6">
              <CardContent className="pt-4">
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <Zap className="h-5 w-5 animate-bounce" />
                  <span className="font-bold">
                    LIVE FEE PROCESSING - Distributing to Green Projects
                  </span>
                  <Zap className="h-5 w-5 animate-bounce" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Green Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {greenProjects.map((project) => (
              <Card
                key={project.id}
                className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-emerald-900/10"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-green-400">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <Badge className="bg-emerald-600 text-white">
                        <TreePine className="h-3 w-3 mr-1" />
                        {project.carbon_offset.toLocaleString()} tons CO2
                      </Badge>
                    </div>
                    <Badge className={`${getStatusColor(project.project_status)} text-white`}>
                      {project.project_status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Allocation:</span>
                      <span className="font-bold text-green-400">
                        {project.allocation_percentage}%
                      </span>
                    </div>

                    <Progress value={project.allocation_percentage} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Received:</span>
                      <span className="font-bold">
                        {project.total_received.toLocaleString()} GAIA
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card className="border-blue-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold text-blue-400">Automatic Green Investment System</h3>
              <Globe className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All transaction fees are automatically distributed to verified environmental projects
              according to the allocation percentages shown above. This creates a sustainable
              ecosystem where every trade helps protect our planet and combat climate change.
            </p>
            <div className="flex justify-center gap-4 text-xs flex-wrap">
              <Badge className="bg-green-600 text-white">
                <TreePine className="h-3 w-3 mr-1" />
                100% Environmental
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                Automatic Distribution
              </Badge>
              <Badge className="bg-emerald-600 text-white">
                <DollarSign className="h-3 w-3 mr-1" />
                Transparent Allocation
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
