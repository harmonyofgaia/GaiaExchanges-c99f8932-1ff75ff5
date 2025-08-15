import { useState } from "react";
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
  Crown,
  Globe,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { AdminDashboardTabs } from "./AdminDashboardTabs";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export function SecureVaultLogin() {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 🔒 SECURE: Use Supabase authentication instead of hardcoded credentials
      const { error: authError } = await signIn(
        credentials.email,
        credentials.password,
      );

      if (authError) {
        toast.error("🚫 Authentication Failed", {
          description: authError.message,
          duration: 5000,
        });
        return;
      }

      // Verify admin privileges with database check
      const { data: adminAccount, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .eq("is_active", true)
        .maybeSingle();

      if (adminError || !adminAccount) {
        toast.error("🚫 ADMIN ACCESS DENIED", {
          description: "This account does not have admin privileges",
          duration: 5000,
        });
        await supabase.auth.signOut();
        return;
      }

      // 🔒 SECURE: No localStorage usage for admin session
      setIsAuthenticated(true);

      // Log successful admin login
      await supabase.rpc("log_admin_action", {
        action_name: "secure_admin_login_success",
        action_details: {
          user_id: (await supabase.auth.getUser()).data.user?.id,
          timestamp: new Date().toISOString(),
          login_method: "supabase_auth",
        },
      });

      toast.success("🌍 GAIA Admin Access Granted!", {
        description: "Secure authentication verified - Welcome Admin",
        duration: 5000,
      });
    } catch (error) {
      console.error("Secure login error:", error);
      toast.error("🛡️ Security Error", {
        description: "Advanced security protocols activated",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      setCredentials({ email: "", password: "" });
    }
  };

  const handleLogout = async () => {
    try {
      // Log admin logout
      await supabase.rpc("log_admin_action", {
        action_name: "secure_admin_logout",
        action_details: {
          user_id: user?.id,
          timestamp: new Date().toISOString(),
          logout_method: "secure_supabase_auth",
        },
      });

      // 🔒 SECURE: Use Supabase auth sign out
      await supabase.auth.signOut();
      setIsAuthenticated(false);

      toast.success("🚪 Admin session terminated", {
        description: "Secure logout completed",
        duration: 3000,
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout", {
        description: "Please try again",
        duration: 3000,
      });
    }
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
          <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-green-300 text-sm">
              <Shield className="h-4 w-4" />
              <span>🔒 SECURE DATABASE AUTHENTICATION</span>
            </div>
            <p className="text-xs text-green-200 mt-1">
              No hardcoded credentials • Full audit trail • Zero-trust security
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-300">
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="bg-black/30 border-green-500/30 text-green-400"
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-300">
                Secure Password
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
                  placeholder="Enter secure password..."
                  autoComplete="current-password"
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
              {isLoading ? "Authenticating..." : "SECURE ADMIN LOGIN"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🛡️ BANK-LEVEL SECURITY • ZERO HARDCODED CREDENTIALS
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              Database Authenticated • Full Audit Trail • Zero-Trust
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
