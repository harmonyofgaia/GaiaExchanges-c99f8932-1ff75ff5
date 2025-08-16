import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, UserPlus, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { validateEmail, validatePasswordStrength, sanitizeInput } from "./SecurityEnhancedApp";

export function SecureAdminSetup() {
  const { signUp } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingExisting, setIsCheckingExisting] = useState(false);

  const passwordValidation = validatePasswordStrength(credentials.password);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 🔒 SECURITY: Input validation and sanitization
      const sanitizedEmail = sanitizeInput(credentials.email.toLowerCase());
      
      if (!validateEmail(sanitizedEmail)) {
        toast.error("🚫 Invalid Email", {
          description: "Please enter a valid email address",
          duration: 5000,
        });
        return;
      }

      if (!passwordValidation.isValid) {
        toast.error("🚫 Weak Password", {
          description: passwordValidation.issues.join(", "),
          duration: 7000,
        });
        return;
      }

      if (credentials.password !== credentials.confirmPassword) {
        toast.error("🚫 Password Mismatch", {
          description: "Passwords do not match",
          duration: 5000,
        });
        return;
      }

      // Check if admin users already exist
      const { data: existingAdmins, error: checkError } = await supabase
        .from("admin_users")
        .select("user_id")
        .limit(1);

      if (checkError) {
        console.error("Error checking existing admins:", checkError);
        toast.error("🛡️ Security Check Failed", {
          description: "Unable to verify admin status",
          duration: 5000,
        });
        return;
      }

      if (existingAdmins && existingAdmins.length > 0) {
        toast.error("🚫 Admin Already Exists", {
          description: "An admin user already exists in the system",
          duration: 5000,
        });
        return;
      }

      // Create new user account
      const authResult = await signUp(sanitizedEmail, credentials.password);

      if (authResult.error) {
        toast.error("🚫 Account Creation Failed", {
          description: authResult.error.message,
          duration: 5000,
        });
        return;
      }

      // Get user from current auth session since signUp might not return user data immediately
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error("🚫 User Creation Failed", {
          description: "No user data available after signup",
          duration: 5000,
        });
        return;
      }

      // Create initial admin user using the secure function
      const { error: adminError } = await supabase.rpc(
        "create_initial_admin_user",
        {
          admin_email: sanitizedEmail,
          admin_user_id: user.id,
        }
      );

      if (adminError) {
        console.error("Error creating admin user:", adminError);
        toast.error("🚫 Admin Setup Failed", {
          description: adminError.message,
          duration: 5000,
        });
        return;
      }

      toast.success("👑 SECURE ADMIN CREATED!", {
        description: "Initial admin account created successfully. Please check your email to verify your account.",
        duration: 10000,
      });

      // Clear form
      setCredentials({
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.error("Secure admin setup error:", error);
      toast.error("🛡️ Security Setup Error", {
        description: "Advanced security protocols encountered an error",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkExistingAdmins = async () => {
    setIsCheckingExisting(true);
    try {
      const { data: existingAdmins, error } = await supabase
        .from("admin_users")
        .select("user_id")
        .limit(1);

      if (error) {
        toast.error("🛡️ Security Check Failed", {
          description: "Unable to verify admin status",
          duration: 5000,
        });
        return;
      }

      if (existingAdmins && existingAdmins.length > 0) {
        toast.info("ℹ️ Admin Exists", {
          description: "An admin user already exists in the system",
          duration: 5000,
        });
      } else {
        toast.success("✅ No Admin Found", {
          description: "System is ready for initial admin setup",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error checking admins:", error);
      toast.error("🛡️ Check Failed", {
        description: "Unable to verify system status",
        duration: 5000,
      });
    } finally {
      setIsCheckingExisting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-orange-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-red-500/30 bg-gradient-to-br from-red-900/30 to-black/70 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <CardTitle className="flex items-center justify-center gap-2 text-red-400 text-2xl">
              <UserPlus className="h-6 w-6" />
              SECURE ADMIN SETUP
            </CardTitle>
            <p className="text-red-300 text-sm mt-2">
              INITIAL ADMIN ACCOUNT CREATION • ZERO-TRUST SECURITY
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-300 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>One-Time Setup Only</span>
            </div>
            <p className="text-xs text-yellow-200 mt-1">
              This creates the first admin account. Additional admins must be created by existing super admins.
            </p>
          </div>

          <div className="mb-4">
            <Button
              onClick={checkExistingAdmins}
              disabled={isCheckingExisting}
              variant="outline"
              className="w-full border-blue-500/30 text-blue-400"
            >
              {isCheckingExisting ? "Checking..." : "Check System Status"}
            </Button>
          </div>

          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-red-300">
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
                className="bg-black/30 border-red-500/30 text-red-400"
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-red-300">
                Secure Password
              </Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="bg-black/30 border-red-500/30 text-red-400"
                placeholder="Enter strong password..."
                autoComplete="new-password"
                required
              />
              {credentials.password && (
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={passwordValidation.strength === "strong" ? "default" : "destructive"}
                    className={
                      passwordValidation.strength === "strong"
                        ? "bg-green-600"
                        : passwordValidation.strength === "medium"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }
                  >
                    {passwordValidation.strength} password
                  </Badge>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-red-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={credentials.confirmPassword}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="bg-black/30 border-red-500/30 text-red-400"
                placeholder="Confirm password..."
                autoComplete="new-password"
                required
              />
              {credentials.confirmPassword && credentials.password !== credentials.confirmPassword && (
                <p className="text-red-400 text-xs">Passwords do not match</p>
              )}
              {credentials.confirmPassword && credentials.password === credentials.confirmPassword && (
                <div className="flex items-center gap-1 text-green-400 text-xs">
                  <CheckCircle className="h-3 w-3" />
                  <span>Passwords match</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !passwordValidation.isValid || credentials.password !== credentials.confirmPassword}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              {isLoading ? "Creating Secure Admin..." : "CREATE INITIAL ADMIN"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/20 rounded-lg">
            <p className="text-xs text-red-300 text-center">
              🛡️ MAXIMUM SECURITY • DATABASE VALIDATED • FULL AUDIT TRAIL
            </p>
            <p className="text-xs text-orange-300 text-center mt-1">
              Zero Hardcoded Credentials • Enterprise-Grade Protection
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}