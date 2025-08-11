import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Settings,
  Eye,
  EyeOff,
  Shield,
  Leaf,
  Flame,
  Heart,
  DollarSign,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface WalletConnection {
  id: string;
  project_name: string;
  wallet_address: string;
  allocation_percentage: number;
  category: "green_projects" | "burning" | "community" | "humanity";
  status: "active" | "inactive";
  description: string;
  last_transaction?: string;
  total_received: number;
}

export function WalletConnectionManager() {
  const [walletConnections, setWalletConnections] = useState<
    WalletConnection[]
  >([
    {
      id: "1",
      project_name: "Global Reforestation Initiative",
      wallet_address: "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh",
      allocation_percentage: 25,
      category: "green_projects",
      status: "active",
      description: "Tree planting and forest restoration worldwide",
      total_received: 12547.89,
    },
    {
      id: "2",
      project_name: "Solar Energy Communities",
      wallet_address: "4HyK2mN7pQsRbVx8uT9wE6cJdL3vF1sA2rP5qW8xN9kM",
      allocation_percentage: 20,
      category: "green_projects",
      status: "active",
      description: "Solar panel installations in underserved areas",
      total_received: 8963.45,
    },
    {
      id: "3",
      project_name: "Token Burning Mechanism",
      wallet_address: "9MkL5vR2sT6eN8qW4xJ7mP3yC1zA2dH6uI9oE5nQ1rK",
      allocation_percentage: 15,
      category: "burning",
      status: "active",
      description: "Automatic token burning to reduce supply",
      total_received: 6782.34,
    },
    {
      id: "4",
      project_name: "Community Development Fund",
      wallet_address: "2VbN8jK5sT9eR4wQ7xL3mP1yC6zA5dH9uI4oE8nF7rK",
      allocation_percentage: 15,
      category: "community",
      status: "active",
      description: "Community growth and development initiatives",
      total_received: 5429.12,
    },
    {
      id: "5",
      project_name: "Humanity Aid Network",
      wallet_address: "3CdH8jK2sT5eR9wQ6xL4mP7yV1zA3dN5uI8oE4nF2rK",
      allocation_percentage: 12,
      category: "humanity",
      status: "active",
      description: "Global humanitarian aid and disaster relief",
      total_received: 4156.78,
    },
    {
      id: "6",
      project_name: "Ocean Cleanup Technology",
      wallet_address: "7KjF3vR9sT2eN5qW8xL4mP6yC1zA9dH5uI7oE2nQ4rK",
      allocation_percentage: 13,
      category: "green_projects",
      status: "active",
      description: "Advanced systems for removing plastic from oceans",
      total_received: 3894.56,
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<WalletConnection>>({});
  const [showAddresses, setShowAddresses] = useState<{
    [key: string]: boolean;
  }>({});

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "green_projects":
        return <Leaf className="h-4 w-4" />;
      case "burning":
        return <Flame className="h-4 w-4" />;
      case "community":
        return <DollarSign className="h-4 w-4" />;
      case "humanity":
        return <Heart className="h-4 w-4" />;
      default:
        return <Wallet className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "green_projects":
        return "bg-green-600";
      case "burning":
        return "bg-orange-600";
      case "community":
        return "bg-blue-600";
      case "humanity":
        return "bg-pink-600";
      default:
        return "bg-gray-600";
    }
  };

  const startEdit = (connection: WalletConnection) => {
    setEditingId(connection.id);
    setEditData(connection);
  };

  const saveEdit = () => {
    if (!editingId || !editData) return;

    setWalletConnections((prev) =>
      prev.map((conn) =>
        conn.id === editingId ? { ...conn, ...editData } : conn,
      ),
    );

    toast.success("🔒 ADMIN: Wallet Connection Updated", {
      description: `Updated ${editData.project_name} - Changes applied immediately`,
      duration: 4000,
    });

    setEditingId(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const toggleAddressVisibility = (id: string) => {
    setShowAddresses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateAllocation = (id: string, percentage: number) => {
    const total =
      walletConnections
        .filter((w) => w.id !== id)
        .reduce((sum, w) => sum + w.allocation_percentage, 0) + percentage;

    if (total > 100) {
      toast.error("Total allocation cannot exceed 100%");
      return;
    }

    setWalletConnections((prev) =>
      prev.map((conn) =>
        conn.id === id ? { ...conn, allocation_percentage: percentage } : conn,
      ),
    );
  };

  const totalAllocation = walletConnections.reduce(
    (sum, w) => sum + w.allocation_percentage,
    0,
  );
  const totalReceived = walletConnections.reduce(
    (sum, w) => sum + w.total_received,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            🔒 ADMIN WALLET CONNECTION MANAGER
            <Badge className="bg-red-600 text-white animate-pulse">
              INVISIBLE TO OUTSIDERS
            </Badge>
          </CardTitle>
          <p className="text-red-300">
            Full control over all wallet connections, reinvestment flows, and
            burning processes
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <div className="text-2xl font-bold text-green-400">
                {walletConnections.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Active Connections
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <div className="text-2xl font-bold text-blue-400">
                {totalAllocation}%
              </div>
              <div className="text-xs text-muted-foreground">
                Total Allocation
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30">
              <div className="text-2xl font-bold text-purple-400">
                {totalReceived.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Total GAIA Distributed
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-900/30">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-xs text-muted-foreground">Admin Control</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Connections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {walletConnections.map((connection) => (
          <Card
            key={connection.id}
            className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-emerald-900/10"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${getCategoryColor(connection.category)}`}
                  >
                    {getCategoryIcon(connection.category)}
                  </div>
                  <div>
                    {editingId === connection.id ? (
                      <Input
                        value={editData.project_name || ""}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            project_name: e.target.value,
                          }))
                        }
                        className="font-bold text-sm"
                      />
                    ) : (
                      <h3 className="font-bold text-sm text-green-400">
                        {connection.project_name}
                      </h3>
                    )}
                    {editingId === connection.id ? (
                      <Input
                        value={editData.description || ""}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="text-xs mt-1"
                      />
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {connection.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      connection.status === "active"
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }
                  >
                    {connection.status.toUpperCase()}
                  </Badge>
                  {editingId === connection.id ? (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={saveEdit}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(connection)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Allocation:
                  </span>
                  {editingId === connection.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editData.allocation_percentage || 0}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            allocation_percentage:
                              parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-16 text-xs"
                      />
                      <span className="text-xs">%</span>
                    </div>
                  ) : (
                    <span className="font-bold text-green-400">
                      {connection.allocation_percentage}%
                    </span>
                  )}
                </div>

                <div className="bg-green-500/20 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${connection.allocation_percentage}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Received:
                  </span>
                  <span className="font-bold">
                    {connection.total_received.toLocaleString()} GAIA
                  </span>
                </div>

                <div className="bg-black/30 p-3 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-muted-foreground">
                      Wallet Address:
                    </Label>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleAddressVisibility(connection.id)}
                      className="h-6 w-6 p-0"
                    >
                      {showAddresses[connection.id] ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  {editingId === connection.id ? (
                    <Input
                      value={editData.wallet_address || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          wallet_address: e.target.value,
                        }))
                      }
                      className="font-mono text-xs"
                    />
                  ) : (
                    <div className="font-mono text-xs text-green-400 break-all">
                      {showAddresses[connection.id]
                        ? connection.wallet_address
                        : `${connection.wallet_address.slice(0, 8)}...${connection.wallet_address.slice(-8)}`}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Actions */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400">
            🚀 Admin Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-green-600 hover:bg-green-700">
              Add New Project
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Export Connections
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Backup Settings
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Emergency Stop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
