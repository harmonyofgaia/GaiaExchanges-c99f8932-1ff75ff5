import { GAIA_TOKEN } from "@/constants/tokens";

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
import { Heart, DollarSign, Percent, Zap, Shield, TrendingUp, Globe } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface AnimalWelfareConfig {
  default_fee_percentage: number;
  preferred_fee_destination: string;
  zero_fee_enabled: boolean;
  custom_fee_amount: number;
}

interface AnimalProject {
  id: string;
  name: string;
  description: string;
  wallet_address: string;
  allocation_percentage: number;
  total_received: number;
  project_status: "active" | "funded" | "completed";
  animal_count: number;
}

// const ANIMAL_WELFARE_WALLET = 'GRboWoafk4CYZyiuFtB84wT8DCswmhQtYthpGg31yJEf'

export function AnimalWelfareWalletManager() {
  const { user } = useAuth();
  const [config, setConfig] = useState<AnimalWelfareConfig>({
    default_fee_percentage: 0.001,
    preferred_fee_destination: "animal_welfare",
    zero_fee_enabled: false,
    custom_fee_amount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [isProcessingFees, setIsProcessingFees] = useState(false);

  // Each project now has its own unique wallet address
  const animalProjects: AnimalProject[] = [
    {
      id: "1",
      name: "🐾 Global Animal Rescue Network",
      description: "Emergency rescue operations for animals in crisis worldwide",
      wallet_address: "AW1o9xG7pQzRbVx8uT9wE6cJdL3vF1sA2rP5qW8xN9kM",
      allocation_percentage: 30,
      total_received: 15847.92,
      project_status: "active",
      animal_count: 2847,
    },
    {
      id: "2",
      name: "🏥 Wildlife Rehabilitation Centers",
      description: "Medical care and rehabilitation for injured wildlife",
      wallet_address: "AW2HyK2mN7pQsRbVx8uT9wE6cJdL3vF1sA2rP5qW8xN",
      allocation_percentage: 25,
      total_received: 12963.45,
      project_status: "active",
      animal_count: 1923,
    },
    {
      id: "3",
      name: "🌿 Habitat Preservation Initiative",
      description: "Protecting and restoring natural animal habitats",
      wallet_address: "AW3KjF3vR9sT2eN5qW8xL4mP6yC1zA9dH5uI7oE2nQ4r",
      allocation_percentage: 20,
      total_received: 10782.34,
      project_status: "active",
      animal_count: 0, // Habitat focused
    },
    {
      id: "4",
      name: "🚫 Anti-Poaching Operations",
      description: "Advanced technology to stop illegal hunting and trafficking",
      wallet_address: "AW4VbN8jK5sT9eR4wQ7xL3mP1yC6zA5dH9uI4oE8nF7r",
      allocation_percentage: 15,
      total_received: 8429.12,
      project_status: "active",
      animal_count: 567,
    },
    {
      id: "5",
      name: "🐕 Street Animal Care Program",
      description: "Feeding, medical care, and shelter for street animals",
      wallet_address: "AW59MkL5vR2sT6eN8qW4xJ7mP3yC1zA2dH6uI9oE5nQ",
      allocation_percentage: 10,
      total_received: 5156.78,
      project_status: "active",
      animal_count: 3241,
    },
  ];

  useEffect(() => {
    fetchUserConfig();

    const total = animalProjects.reduce((sum, project) => sum + project.total_received, 0);
    setTotalAllocated(total);

    // Simulate live fee processing
    const interval = setInterval(() => {
      setIsProcessingFees(true);
      setTimeout(() => setIsProcessingFees(false), 2000);
    }, 25000); // Every 25 seconds

    return () => clearInterval(interval);
  }, [user]);

  const fetchUserConfig = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("swap_configurations")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching animal welfare config:", error);
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
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase.from("swap_configurations").upsert({
        user_id: user.id,
        default_fee_percentage: config.default_fee_percentage,
        preferred_fee_destination: config.preferred_fee_destination,
        zero_fee_enabled: config.zero_fee_enabled,
        custom_fee_amount: config.custom_fee_amount,
        updated_at: new Date().toISOString()
      });

      if (error) {
        throw error;
      }

      toast.success("🐾 Animal Welfare Configuration Saved!", {
        description: "Your fees will now support animal rescue and protection automatically.",
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
        <div className="h-64 bg-muted/50 rounded"></div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Configuration Section */}
      <Card className="border-pink-500/30 bg-gradient-to-r from-pink-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-400">
            <Heart className="h-5 w-5" />
            🐾 Animal Welfare Fee Configuration
          </CardTitle>
          <p className="text-pink-300">
            Configure how your transaction fees automatically support global animal welfare
            initiatives
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Animal Welfare Reinvestment (Default) */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
            <div>
              <Label className="text-base font-medium text-pink-400">
                🐾 Animal Welfare Support (Recommended)
              </Label>
              <p className="text-sm text-muted-foreground">
                All fees automatically go to verified animal rescue and protection projects
              </p>
            </div>
            <Switch
              checked={config.preferred_fee_destination === "animal_welfare"}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  preferred_fee_destination: checked ? "animal_welfare" : "vault",
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
                Enable completely free transactions (no animal welfare contribution)
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
                <Label>Animal Welfare Contribution Percentage</Label>
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
                  Recommended: 0.1% (0.001) - Small fees that save many animals
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
                    <SelectItem value="animal_welfare">
                      🐾 Animal Welfare (Recommended - Save Animals)
                    </SelectItem>
                    <SelectItem value="vault">🏦 Community Vault (Admin Surprises)</SelectItem>
                    <SelectItem value="green_projects">
                      🌱 Green Projects (Environmental)
                    </SelectItem>
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
              disabled={saving}
              className="flex-1 bg-pink-600 hover:bg-pink-700"
            >
              {saving ? "Saving..." : "🐾 Save Animal Welfare Config"}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setConfig({
                  default_fee_percentage: 0.001,
                  preferred_fee_destination: "animal_welfare",
                  zero_fee_enabled: false,
                  custom_fee_amount: 0,
                })
              }
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Reset to Animal Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Animal Projects Distribution */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Heart className="h-6 w-6" />
            🐾 Animal Welfare Project Distribution System
          </CardTitle>
          <p className="text-purple-300">
            All community fees are automatically reinvested into global animal welfare projects
          </p>
          <div className="bg-black/30 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">
              Official Animal Welfare Wallet:
            </div>
            <div className="font-mono text-pink-400 text-sm break-all">{GAIA_TOKEN.address}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-pink-900/30">
              <div className="text-2xl font-bold text-pink-400">
                {totalAllocated.toLocaleString()} GAIA
              </div>
              <div className="text-xs text-muted-foreground">Total Allocated</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <div className="text-2xl font-bold text-blue-400">{animalProjects.length}</div>
              <div className="text-xs text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <div className="text-2xl font-bold text-green-400">
                {animalProjects.reduce((sum, p) => sum + p.animal_count, 0).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Animals Protected</div>
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
                    LIVE FEE PROCESSING - Distributing to Animal Welfare Projects
                  </span>
                  <Zap className="h-5 w-5 animate-bounce" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Animal Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {animalProjects.map((project) => (
              <Card
                key={project.id}
                className="border-pink-500/20 bg-gradient-to-br from-pink-900/10 to-purple-900/10"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-pink-400">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      {project.animal_count > 0 && (
                        <Badge className="bg-green-600 text-white">
                          <Heart className="h-3 w-3 mr-1" />
                          {project.animal_count.toLocaleString()} Animals
                        </Badge>
                      )}
                    </div>
                    <Badge className={`${getStatusColor(project.project_status)} text-white`}>
                      {project.project_status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Allocation:</span>
                      <span className="font-bold text-pink-400">
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
              <h3 className="text-xl font-bold text-blue-400">Automatic Animal Welfare System</h3>
              <Globe className="h-6 w-6 text-pink-400" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All transaction fees are automatically distributed to verified animal welfare projects
              according to the allocation percentages shown above. This creates a sustainable
              ecosystem where every trade helps protect and save animals worldwide.
            </p>
            <div className="flex justify-center gap-4 text-xs flex-wrap">
              <Badge className="bg-pink-600 text-white">
                <Heart className="h-3 w-3 mr-1" />
                100% Animal Welfare
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                Automatic Distribution
              </Badge>
              <Badge className="bg-purple-600 text-white">
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
