import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, EyeOff, Crown, Globe } from "lucide-react";
import { toast } from "sonner";
import { AdminDashboardTabs } from "./AdminDashboardTabs";

export function SecureVaultLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Admin credentials check
      if (
        credentials.username === "Synatic" &&
        credentials.password === "Freedom!oul19922323"
      ) {
        // Set admin session
        localStorage.setItem("gaia-admin-session", `admin-${Date.now()}`);
        localStorage.setItem(
          "gaia-admin-expiry",
          (Date.now() + 24 * 60 * 60 * 1000).toString(),
        );
        sessionStorage.setItem("admin-active", "true");

        setIsAuthenticated(true);
        toast.success("🌍 GAIA Admin Access Granted!", {
          description: "Welcome to the Ultimate Control Center",
          duration: 5000,
        });
      } else {
        toast.error("🚫 Access Denied", {
          description: "Invalid admin credentials",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Login Error", {
        description: "Please try again",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      setCredentials({ username: "", password: "" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("gaia-admin-session");
    localStorage.removeItem("gaia-admin-expiry");
    sessionStorage.removeItem("admin-active");
    setIsAuthenticated(false);
    toast.success("🚪 Admin session terminated", {
      description: "System secured",
      duration: 3000,
    });
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🌍 GAIA Admin Dashboard
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Ultimate Control Center • Secure Access • Global Management
              </p>
              <div className="flex gap-4 mt-4">
                <Badge
                  variant="outline"
                  className="border-green-500/50 text-green-400"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Global Admin
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-500/50 text-blue-400"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Vault Access
                </Badge>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/30"
            >
              <Lock className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <AdminDashboardTabs />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-green-400">
              🌍 GAIA VAULT ACCESS
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Secure Admin Portal • Quantum Protection • Ultimate Control
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-green-300">
                Admin Username
              </Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="bg-black/30 border-green-500/30 text-green-400"
                placeholder="Admin username..."
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-300">
                Vault Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="bg-black/30 border-green-500/30 text-green-400 pr-10"
                  placeholder="Vault password..."
                  autoComplete="off"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 text-green-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3"
            >
              <Lock className="h-5 w-5 mr-2" />
              {isLoading ? "Verifying Access..." : "ENTER GAIA VAULT"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              👑 GAIA ADMIN • QUANTUM PROTECTED • ULTIMATE CONTROL
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
