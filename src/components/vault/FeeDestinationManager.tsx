import { useState, useEffect } from "react";
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
import { Settings, DollarSign, Percent, Zap, Leaf } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { GreenProjectWalletManager } from "./GreenProjectWalletManager";

interface SwapConfig {
  default_fee_percentage: number;
  preferred_fee_destination: string;
  zero_fee_enabled: boolean;
  custom_fee_amount: number;
}

export function FeeDestinationManager() {
  const { user } = useAuth();
  const [config, setConfig] = useState<SwapConfig>({
    default_fee_percentage: 0.001,
    preferred_fee_destination: "green_projects",
    zero_fee_enabled: false,
    custom_fee_amount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserConfig();
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
        console.error("Error fetching user config:", error);
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
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      toast.success("🌍 Green Project Configuration Saved!", {
        description:
          "Your fees will now support environmental projects automatically.",
        duration: 4000,
      });
    } catch (error) {
      toast.error("Failed to save configuration");
      console.error("Error saving config:", error);
    } finally {
      setSaving(false);
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
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Leaf className="h-5 w-5" />
            🌍 Green Project Fee Configuration
          </CardTitle>
          <p className="text-green-300">
            Configure how your transaction fees automatically support global
            environmental initiatives
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Green Project Reinvestment (Default) */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div>
              <Label className="text-base font-medium text-green-400">
                🌱 Green Project Reinvestment (Recommended)
              </Label>
              <p className="text-sm text-muted-foreground">
                All fees automatically go to verified environmental projects -
                helping save our planet
              </p>
            </div>
            <Switch
              checked={config.preferred_fee_destination === "green_projects"}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  preferred_fee_destination: checked
                    ? "green_projects"
                    : "vault",
                  zero_fee_enabled: false,
                })
              }
            />
          </div>

          {/* Zero Fee Option */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div>
              <Label className="text-base font-medium text-blue-400">
                Zero Fee Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable completely free transactions (no environmental
                contribution)
              </p>
            </div>
            <Switch
              checked={config.zero_fee_enabled}
              onCheckedChange={(checked) =>
                setConfig({ ...config, zero_fee_enabled: checked })
              }
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
                  Recommended: 0.1% (0.001) - Ultra low fees that make a big
                  environmental impact
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
                    <SelectItem value="vault">
                      🏦 Community Vault (Admin Surprises)
                    </SelectItem>
                    <SelectItem value="burning">
                      🔥 Token Burning (Increase Value)
                    </SelectItem>
                    <SelectItem value="humanity">
                      ❤️ Humanity Fund (Global Aid)
                    </SelectItem>
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
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {saving ? "Saving..." : "🌍 Save Green Configuration"}
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
              <Leaf className="h-4 w-4" />
              Reset to Green Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Green Project Distribution */}
      <GreenProjectWalletManager />

      {/* Configuration Preview */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400">Current Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="font-medium">Fee Mode:</div>
              <div className="text-sm text-muted-foreground">
                {config.zero_fee_enabled
                  ? "🎉 Zero Fee (FREE)"
                  : `🌱 ${(config.default_fee_percentage * 100).toFixed(4)}% for Environment`}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="font-medium">Destination:</div>
              <div className="text-sm text-muted-foreground">
                {config.preferred_fee_destination === "green_projects" &&
                  "🌱 Green Projects"}
                {config.preferred_fee_destination === "vault" &&
                  "🏦 Community Vault"}
                {config.preferred_fee_destination === "burning" &&
                  "🔥 Token Burning"}
                {config.preferred_fee_destination === "humanity" &&
                  "❤️ Humanity Fund"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
