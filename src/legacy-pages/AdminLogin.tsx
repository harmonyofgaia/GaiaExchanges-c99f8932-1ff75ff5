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
    // Get client IP information with allowlist validation
    const getClientInfo = async () => {
      try {
        // Simulate getting client IP (in production, this would be from a service)
        // Use a fixed test IP (not in allowlist). In production, obtain client IP securely.
        const ip = "192.168.1.200";
        setClientIP(ip);
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
      // IP allowlist for admin access (specific allowed IPs)
      const allowedIPs = ["192.168.1.1", "192.168.1.100"];
      const isIPAllowed = allowedIPs.includes(clientIP);

      // Enhanced admin credentials check (username-based, case insensitive)
      if (
        credentials.username.toLowerCase() === "synatic" &&
        credentials.password === ADMIN_PASSWORD &&
        isPasswordComplex(credentials.password)
      ) {
        if (!isIPAllowed) {
          toast.error("🚫 IP Access Restricted", {
            description: `Your IP ${clientIP} is not in the admin allowlist. Contact administrator.`,
            duration: 5000,
          });
          setIsLoading(false);
          return;
        }

        // Grant admin access for allowed IPs
        const accessGranted = grantAdminAccess();
        if (accessGranted) {
          // Store admin IP for allowlist tracking (not exclusivity)
          localStorage.setItem("gaia-admin-ip", clientIP);
          
          setIsAuthenticated(true);
          toast.success("🌍 Admin Access Granted!", {
            description: `Welcome to GAIA Admin Dashboard - Authorized IP: ${clientIP}`,
            duration: 3000,
          });
          // Redirect to admin dashboard after successful login
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          toast.error("🚫 Admin Access Failed", {
            description: "Unable to create admin session",
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
    // Clear admin IP tracking (but don't block future access)
    localStorage.removeItem("gaia-admin-ip");
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
                  Authorized IP: {clientIP}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-500/50 text-blue-400"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Admin Session
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
              🌍 GAIA Admin Login
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Secure Admin Access • IP Allowlist Protected • Username Authentication
            </p>

            {/* IP and Session Status */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs">
                <Globe className="h-3 w-3 text-blue-400" />
                <span className="text-blue-300">Your IP: {clientIP}</span>
              </div>
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
              🛡️ Secure Admin Portal • IP Allowlist Protected • Username Authentication
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Username-based secure access</div>
              <div>• IP allowlist protection (192.168.1.1, 192.168.1.100)</div>
              <div>• Cross-browser compatibility enabled</div>
              <div>• Local session management</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
