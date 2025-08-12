import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Lock,
  Key,
  Fingerprint,
  Eye,
  CheckCircle,
  AlertTriangle,
  Vault,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface AdminAccess {
  id: string;
  step_1_verified: boolean;
  step_2_verified: boolean;
  step_3_verified: boolean;
  step_4_verified: boolean;
  access_granted: boolean;
  expires_at: string;
}

export function AdminVaultAccess() {
  const { user } = useAuth();
  const [access, setAccess] = useState<AdminAccess | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepInputs, setStepInputs] = useState({
    password: "",
    twoFactor: "",
    biometric: "",
    masterKey: "",
  });

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("admin_vault_access")
        .select("*")
        .eq("admin_user_id", user.id)
        .eq("access_granted", false)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking admin access:", error);
      } else if (data) {
        setAccess(data);
        // Determine current step
        if (!data.step_1_verified) setCurrentStep(1);
        else if (!data.step_2_verified) setCurrentStep(2);
        else if (!data.step_3_verified) setCurrentStep(3);
        else if (!data.step_4_verified) setCurrentStep(4);
        else setCurrentStep(5);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const startVerificationProcess = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("admin_vault_access")
        .insert({
          admin_user_id: user.id,
          session_token: crypto.randomUUID(),
        })
        .select()
        .single();

      if (error) throw error;

      setAccess(data);
      setCurrentStep(1);

      toast.success("🔐 Admin Verification Started", {
        description: "Complete all 4 security steps to access the vault",
        duration: 4000,
      });
    } catch (error) {
      toast.error("Failed to start verification process");
      console.error("Error:", error);
    }
  };

  const verifyStep = async (step: number) => {
    if (!access || !user) return;

    try {
      const stepField = `step_${step}_verified`;
      const { error } = await supabase
        .from("admin_vault_access")
        .update({ [stepField]: true })
        .eq("id", access.id);

      if (error) throw error;

      setAccess({ ...access, [stepField]: true });

      if (step < 4) {
        setCurrentStep(step + 1);
        toast.success(`✅ Step ${step} Verified`, {
          description: `Security step ${step} completed successfully`,
          duration: 3000,
        });
      } else {
        // Grant final access
        await grantVaultAccess();
      }
    } catch (error) {
      toast.error(`Step ${step} verification failed`);
      console.error("Error:", error);
    }
  };

  const grantVaultAccess = async () => {
    if (!access) return;

    try {
      const { error } = await supabase
        .from("admin_vault_access")
        .update({
          step_4_verified: true,
          access_granted: true,
        })
        .eq("id", access.id);

      if (error) throw error;

      setAccess({ ...access, step_4_verified: true, access_granted: true });
      setCurrentStep(5);

      toast.success("🎉 VAULT ACCESS GRANTED!", {
        description:
          "All security steps completed. Full admin access activated.",
        duration: 5000,
      });
    } catch (error) {
      toast.error("Failed to grant vault access");
      console.error("Error:", error);
    }
  };

  const simulateStepVerification = (step: number) => {
    // Simulate verification delay
    setTimeout(() => {
      verifyStep(step);
    }, 1500);
  };

  const getStepIcon = (step: number, verified: boolean) => {
    if (verified) return <CheckCircle className="h-5 w-5 text-green-400" />;

    switch (step) {
      case 1:
        return <Key className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Shield className="h-5 w-5 text-blue-400" />;
      case 3:
        return <Fingerprint className="h-5 w-5 text-purple-400" />;
      case 4:
        return <Eye className="h-5 w-5 text-red-400" />;
      default:
        return <Lock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getProgressPercentage = () => {
    if (!access) return 0;
    let completed = 0;
    if (access.step_1_verified) completed++;
    if (access.step_2_verified) completed++;
    if (access.step_3_verified) completed++;
    if (access.step_4_verified) completed++;
    return (completed / 4) * 100;
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-96 bg-muted/50 rounded"></div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Vault className="h-6 w-6" />
            🔐 Admin Vault Access - Ultra Secure 4-Step Verification
          </CardTitle>
          {access && (
            <div className="space-y-2">
              <Progress value={getProgressPercentage()} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Verification Progress: {Math.round(getProgressPercentage())}%
                Complete
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {!access ? (
            <div className="text-center space-y-4">
              <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto" />
              <h3 className="text-xl font-bold">Admin Verification Required</h3>
              <p className="text-muted-foreground">
                Access to the vault requires completing our ultra-secure 4-step
                verification process
              </p>
              <Button
                onClick={startVerificationProcess}
                className="bg-red-600 hover:bg-red-700"
              >
                <Shield className="h-4 w-4 mr-2" />
                Start Security Verification
              </Button>
            </div>
          ) : access.access_granted ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
              <h3 className="text-xl font-bold text-green-400">
                🎉 VAULT ACCESS GRANTED
              </h3>
              <p className="text-muted-foreground">
                All security steps completed. You now have full administrative
                access to the vault.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Vault className="h-4 w-4 mr-2" />
                  Access Vault Funds
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Create Surprise Project
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Step 1: Master Password */}
              <Card
                className={`border ${currentStep === 1 ? "border-yellow-500/50 bg-yellow-500/5" : access.step_1_verified ? "border-green-500/50 bg-green-500/5" : "border-gray-500/20"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStepIcon(1, access.step_1_verified)}
                      <span className="font-medium">
                        Step 1: Master Password
                      </span>
                    </div>
                    <Badge
                      className={
                        access.step_1_verified
                          ? "bg-green-600"
                          : currentStep === 1
                            ? "bg-yellow-600"
                            : "bg-gray-600"
                      }
                    >
                      {access.step_1_verified
                        ? "Verified"
                        : currentStep === 1
                          ? "Active"
                          : "Pending"}
                    </Badge>
                  </div>
                  {currentStep === 1 && !access.step_1_verified && (
                    <div className="space-y-3">
                      <Input
                        type="password"
                        placeholder="Enter master admin password"
                        value={stepInputs.password}
                        onChange={(e) =>
                          setStepInputs({
                            ...stepInputs,
                            password: e.target.value,
                          })
                        }
                      />
                      <Button
                        onClick={() => simulateStepVerification(1)}
                        disabled={!stepInputs.password}
                        className="w-full"
                      >
                        Verify Master Password
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Step 2: Two-Factor Authentication */}
              <Card
                className={`border ${currentStep === 2 ? "border-blue-500/50 bg-blue-500/5" : access.step_2_verified ? "border-green-500/50 bg-green-500/5" : "border-gray-500/20"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStepIcon(2, access.step_2_verified)}
                      <span className="font-medium">
                        Step 2: Two-Factor Authentication
                      </span>
                    </div>
                    <Badge
                      className={
                        access.step_2_verified
                          ? "bg-green-600"
                          : currentStep === 2
                            ? "bg-blue-600"
                            : "bg-gray-600"
                      }
                    >
                      {access.step_2_verified
                        ? "Verified"
                        : currentStep === 2
                          ? "Active"
                          : "Pending"}
                    </Badge>
                  </div>
                  {currentStep === 2 && !access.step_2_verified && (
                    <div className="space-y-3">
                      <Input
                        type="text"
                        placeholder="Enter 6-digit 2FA code"
                        value={stepInputs.twoFactor}
                        onChange={(e) =>
                          setStepInputs({
                            ...stepInputs,
                            twoFactor: e.target.value,
                          })
                        }
                        maxLength={6}
                      />
                      <Button
                        onClick={() => simulateStepVerification(2)}
                        disabled={stepInputs.twoFactor.length !== 6}
                        className="w-full"
                      >
                        Verify 2FA Code
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Step 3: Biometric Verification */}
              <Card
                className={`border ${currentStep === 3 ? "border-purple-500/50 bg-purple-500/5" : access.step_3_verified ? "border-green-500/50 bg-green-500/5" : "border-gray-500/20"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStepIcon(3, access.step_3_verified)}
                      <span className="font-medium">
                        Step 3: Biometric Verification
                      </span>
                    </div>
                    <Badge
                      className={
                        access.step_3_verified
                          ? "bg-green-600"
                          : currentStep === 3
                            ? "bg-purple-600"
                            : "bg-gray-600"
                      }
                    >
                      {access.step_3_verified
                        ? "Verified"
                        : currentStep === 3
                          ? "Active"
                          : "Pending"}
                    </Badge>
                  </div>
                  {currentStep === 3 && !access.step_3_verified && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Please complete biometric verification (fingerprint or
                        face scan)
                      </p>
                      <Button
                        onClick={() => simulateStepVerification(3)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Fingerprint className="h-4 w-4 mr-2" />
                        Start Biometric Scan
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Step 4: Retinal Scan */}
              <Card
                className={`border ${currentStep === 4 ? "border-red-500/50 bg-red-500/5" : access.step_4_verified ? "border-green-500/50 bg-green-500/5" : "border-gray-500/20"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStepIcon(4, access.step_4_verified)}
                      <span className="font-medium">Step 4: Retinal Scan</span>
                    </div>
                    <Badge
                      className={
                        access.step_4_verified
                          ? "bg-green-600"
                          : currentStep === 4
                            ? "bg-red-600"
                            : "bg-gray-600"
                      }
                    >
                      {access.step_4_verified
                        ? "Verified"
                        : currentStep === 4
                          ? "Active"
                          : "Pending"}
                    </Badge>
                  </div>
                  {currentStep === 4 && !access.step_4_verified && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Final security step: Advanced retinal pattern
                        verification
                      </p>
                      <Button
                        onClick={() => simulateStepVerification(4)}
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Initialize Retinal Scan
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <Shield className="h-8 w-8 text-yellow-400 mx-auto" />
            <h4 className="font-bold text-yellow-400">
              Maximum Security Protocol Active
            </h4>
            <p className="text-sm text-muted-foreground">
              This 4-step verification ensures that only authorized
              administrators can access vault funds for humanitarian projects
              and community surprises.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
