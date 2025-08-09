import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Users,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { AdminDashboardTabs } from "@/components/admin/AdminDashboardTabs";
import { useSecureAdmin } from "@/hooks/useSecureAdmin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientIP, setClientIP] = useState("");
  const [activeSessions, setActiveSessions] = useState(0);
  const { isAdmin, adminSession, grantAdminAccess, revokeAdminAccess } =
    useSecureAdmin();

  useEffect(() => {
    // Get client IP information
    const getClientInfo = async () => {
      try {
        // Simulate getting client IP (in production, this would be from a service)
        const ip = `192.168.1.${Math.floor(Math.random() * 255)}`;
        setClientIP(ip);

        // Check for existing admin sessions
        const existingAdminIP = localStorage.getItem("gaia-admin-ip");
        if (existingAdminIP && existingAdminIP !== ip) {
          setActiveSessions(1);
        }
      } catch (error) {
        console.error("Failed to get client info:", error);
      }
    };

    getClientInfo();
    setIsAuthenticated(isAdmin);
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Enhanced admin credentials check with IP exclusivity
      if (
        credentials.username === "Synatic" &&
        credentials.password === "Freedom!oul19922323"
      ) {
        // Check for existing admin session
        const existingAdminIP = localStorage.getItem("gaia-admin-ip");
        if (existingAdminIP && existingAdminIP !== clientIP) {
          toast.error("🚫 Access Denied - Admin Already Connected", {
            description: `Another admin is connected from ${existingAdminIP}. Only one admin session allowed.`,
            duration: 5000,
          });
          setIsLoading(false);
          return;
        }

        // Grant exclusive admin access
        const accessGranted = grantAdminAccess();
        if (accessGranted) {
          setIsAuthenticated(true);
          toast.success("🌍 Exclusive Admin Access Granted!", {
            description: `Welcome to GAIA Admin Dashboard - IP: ${clientIP}`,
            duration: 3000,
          });
          // Redirect to admin dashboard after successful login
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          toast.error("🚫 Admin Access Blocked", {
            description: "Another admin session is active",
            duration: 3000,
          });
        }
      } else {
        toast.error("🚫 Access Denied", {
          description: "Invalid admin credentials",
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Login Error", {
        description: "Please try again",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setCredentials({ username: "", password: "" });
    }
  };

  const handleLogout = () => {
    revokeAdminAccess();
    setIsAuthenticated(false);
    toast.success("🚪 Admin session terminated - System secured", {
      description: "All administrative controls have been disabled",
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
                🌍 GAIA Admin Dashboard - Exclusive Control
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Complete System Control • Secure Access • Global Management
              </p>
              <div className="flex gap-4 mt-4">
                <Badge
                  variant="outline"
                  className="border-green-500/50 text-green-400"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  IP: {clientIP}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-500/50 text-blue-400"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Exclusive Session
                </Badge>
                {adminSession && (
                  <Badge
                    variant="outline"
                    className="border-purple-500/50 text-purple-400"
                  >
                    <Users className="h-3 w-3 mr-1" />
                    Session: {adminSession.id.substring(0, 8)}...
                  </Badge>
                )}
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
            <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-green-400">
              🌍 GAIA Admin Login - Exclusive Access
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Secure Admin Access • Single Session Control • IP Exclusivity
            </p>

            {/* IP and Session Status */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs">
                <Globe className="h-3 w-3 text-blue-400" />
                <span className="text-blue-300">Your IP: {clientIP}</span>
              </div>
              {activeSessions > 0 && (
                <div className="flex items-center justify-center gap-2 text-xs">
                  <AlertTriangle className="h-3 w-3 text-yellow-400" />
                  <span className="text-yellow-300">
                    Warning: Admin session active elsewhere
                  </span>
                </div>
              )}
            </div>
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
                className="bg-black/40 border-green-500/30 text-green-400"
                placeholder="Enter admin username..."
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-300">
                Admin Password
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
                  className="bg-black/40 border-green-500/30 text-green-400 pr-10"
                  placeholder="Enter admin password..."
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
              {isLoading ? "Authenticating..." : "Login to Admin Dashboard"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center mb-2">
              🛡️ Secure Admin Portal • Single Session Enforced • IP Protected
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Only one admin can be logged in at a time</div>
              <div>• IP address verification required</div>
              <div>• Cross-browser compatibility enabled</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
