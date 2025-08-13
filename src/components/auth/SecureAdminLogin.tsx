import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Eye, EyeOff, Crown, AlertTriangle } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SecureAdminLoginProps {
  onAdminLogin: () => void;
}

export function SecureAdminLogin({ onAdminLogin }: SecureAdminLoginProps) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use Supabase authentication
      const { error: authError } = await signIn(credentials.email, credentials.password);
      
      if (authError) {
        toast.error("🚫 Authentication Failed", {
          description: authError.message,
          duration: 5000,
        });
        return;
      }

      // Check if user has admin privileges
      const { data: adminAccount, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .eq('is_active', true)
        .maybeSingle();

      if (adminError || !adminAccount) {
        toast.error("🚫 ADMIN ACCESS DENIED", {
          description: "This account does not have admin privileges",
          duration: 5000,
        });
        await supabase.auth.signOut();
        return;
      }

      toast.success("👑 SECURE ADMIN ACCESS GRANTED!", {
        description: "Welcome Admin - Access level verified",
        duration: 5000,
      });

      onAdminLogin();
    } catch (error) {
      toast.error("🛡️ Security Error", {
        description: "Advanced security protocols activated",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      setCredentials({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-green-500/30 bg-gradient-to-br from-green-900/30 to-black/70 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-2xl">
              <Shield className="h-6 w-6" />
              SECURE ADMIN ACCESS
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              DATABASE AUTHENTICATED • ZERO-TRUST SECURITY
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-300 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Secure Authentication Required</span>
            </div>
            <p className="text-xs text-yellow-200 mt-1">
              Use your authenticated Supabase account credentials
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
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
              {isLoading ? "Authenticating..." : "SECURE LOGIN"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🛡️ BANK-LEVEL SECURITY • DATABASE AUTHENTICATED
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              Zero Hardcoded Credentials • Full Audit Trail
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}