import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Plus, Trash2, Edit, Shield, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export default function TaskReverser() {
  const { user } = useAuth();
  const [newFeature, setNewFeature] = useState({
    name: "",
    description: "",
    category: "general",
    adminOnly: false,
  });

  // Fetch all feature toggles
  const { data: features, refetch } = useQuery({
    queryKey: ["feature-toggles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feature_toggles")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const toggleFeature = async (featureId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("feature_toggles")
        .update({
          is_enabled: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", featureId);

      if (error) throw error;

      toast.success(
        `Feature ${!currentStatus ? "enabled" : "disabled"} successfully`,
      );
      refetch();
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to toggle feature");
    }
  };

  const createFeature = async () => {
    if (!newFeature.name.trim() || !user) {
      toast.error("Please enter a feature name");
      return;
    }

    try {
      const { error } = await supabase.from("feature_toggles").insert({
        feature_name: newFeature.name.toLowerCase().replace(/\s+/g, "_"),
        feature_description: newFeature.description.trim(),
        category: newFeature.category,
        admin_only: newFeature.adminOnly,
        created_by: user.id,
      });

      if (error) throw error;

      toast.success("✨ New feature created successfully!");
      setNewFeature({
        name: "",
        description: "",
        category: "general",
        adminOnly: false,
      });
      refetch();
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Failed to create feature");
    }
  };

  const deleteFeature = async (featureId: string, featureName: string) => {
    if (!confirm(`Are you sure you want to delete "${featureName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("feature_toggles")
        .delete()
        .eq("id", featureId);

      if (error) throw error;

      toast.success("Feature deleted successfully");
      refetch();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete feature");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      media: "bg-purple-600",
      tokens: "bg-yellow-600",
      crypto: "bg-blue-600",
      ai: "bg-green-600",
      rewards: "bg-orange-600",
      admin: "bg-red-600",
      general: "bg-gray-600",
    };
    return colors[category] || "bg-gray-600";
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      admin: Shield,
      ai: Zap,
      general: Settings,
    };
    const IconComponent = icons[category] || Settings;
    return <IconComponent className="h-4 w-4" />;
  };

  const groupedFeatures =
    features?.reduce(
      (acc, feature) => {
        if (!acc[feature.category]) {
          acc[feature.category] = [];
        }
        acc[feature.category].push(feature);
        return acc;
      },
      {} as Record<string, typeof features>,
    ) || {};

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Admin access required for Task Reverser.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
          ⚡ Task Reverser - Feature Control Center
        </h1>
        <p className="text-xl text-muted-foreground">
          Granular control over all system features without full restoration
        </p>
      </div>

      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="features">Feature Management</TabsTrigger>
          <TabsTrigger value="create">Create New Feature</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          {Object.entries(groupedFeatures).map(
            ([category, categoryFeatures]) => (
              <Card
                key={category}
                className="border-orange-500/30 bg-orange-900/20"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400 capitalize">
                    {getCategoryIcon(category)}
                    {category} Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {categoryFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center justify-between p-4 bg-black/40 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium capitalize">
                              {feature.feature_name.replace(/_/g, " ")}
                            </h3>
                            <Badge
                              className={getCategoryColor(feature.category)}
                            >
                              {feature.category}
                            </Badge>
                            {feature.admin_only && (
                              <Badge variant="destructive">Admin Only</Badge>
                            )}
                          </div>
                          {feature.feature_description && (
                            <p className="text-sm text-muted-foreground">
                              {feature.feature_description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={feature.is_enabled}
                              onCheckedChange={() =>
                                toggleFeature(feature.id, feature.is_enabled)
                              }
                            />
                            <Label className="text-sm">
                              {feature.is_enabled ? "ON" : "OFF"}
                            </Label>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              deleteFeature(feature.id, feature.feature_name)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ),
          )}
        </TabsContent>

        <TabsContent value="create">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Plus className="h-6 w-6" />
                Create New Feature Toggle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feature-name">Feature Name *</Label>
                <Input
                  id="feature-name"
                  value={newFeature.name}
                  onChange={(e) =>
                    setNewFeature((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Advanced Analytics, Premium Features..."
                  className="bg-black/40 border-green-500/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feature-description">Description</Label>
                <Textarea
                  id="feature-description"
                  value={newFeature.description}
                  onChange={(e) =>
                    setNewFeature((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe what this feature does..."
                  className="bg-black/40 border-green-500/30"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newFeature.category}
                    onChange={(e) =>
                      setNewFeature((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full p-2 bg-black/40 border border-green-500/30 rounded-md"
                  >
                    <option value="general">General</option>
                    <option value="media">Media</option>
                    <option value="tokens">Tokens</option>
                    <option value="crypto">Crypto</option>
                    <option value="ai">AI</option>
                    <option value="rewards">Rewards</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Access Level</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      checked={newFeature.adminOnly}
                      onCheckedChange={(checked) =>
                        setNewFeature((prev) => ({
                          ...prev,
                          adminOnly: checked,
                        }))
                      }
                    />
                    <Label>Admin Only</Label>
                  </div>
                </div>
              </div>

              <Button
                onClick={createFeature}
                disabled={!newFeature.name.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Feature Toggle
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/40 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {features?.filter((f) => f.is_enabled).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Features
              </div>
            </div>
            <div className="text-center p-4 bg-black/40 rounded-lg">
              <div className="text-2xl font-bold text-red-400">
                {features?.filter((f) => !f.is_enabled).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Disabled Features
              </div>
            </div>
            <div className="text-center p-4 bg-black/40 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {features?.filter((f) => f.admin_only).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Admin Only</div>
            </div>
            <div className="text-center p-4 bg-black/40 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {features?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Features
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
