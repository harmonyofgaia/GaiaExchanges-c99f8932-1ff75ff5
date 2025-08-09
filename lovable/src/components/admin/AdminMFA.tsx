import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface AdminMFAProps {
  onMFASuccess: () => void;
}

export function AdminMFA({ onMFASuccess }: AdminMFAProps) {
  const [mfaCode, setMfaCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"sms" | "verify">("sms");

  const sendSMSCode = () => {
    setIsLoading(true);

    // Simulate SMS sending
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
      toast.success("🔐 Security Code Sent!", {
        description: "Check your device +31687758236 for the verification code",
        duration: 6000,
      });
    }, 2000);
  };

  const verifyCode = () => {
    setIsLoading(true);

    // Admin codes for recovery (these would be secure in production)
    const validCodes = ["246810", "135791", "369258", "147852"];

    setTimeout(() => {
      if (validCodes.includes(mfaCode)) {
        toast.success("🛡️ Vault Access Verified!", {
          description: "MFA authentication successful - Admin access granted",
          duration: 5000,
        });
        onMFASuccess();
      } else {
        toast.error("❌ Invalid Code", {
          description: "Security code verification failed",
          duration: 5000,
        });
      }
      setIsLoading(false);
      setMfaCode("");
    }, 2000);
  };

  return (
    <Card className="max-w-md mx-auto border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400 text-center">
          <Smartphone className="h-5 w-5" />
          Multi-Factor Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "sms" ? (
          <>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  Secure Device Verification
                </h3>
                <p className="text-sm text-muted-foreground">
                  We'll send a verification code to your registered device
                </p>
                <p className="text-xs text-blue-300 mt-2">📱 +31687758236</p>
              </div>
            </div>

            <Button
              onClick={sendSMSCode}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              {isLoading ? "Sending Code..." : "Send Security Code"}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="mfa-code" className="text-blue-300">
                Enter Verification Code
              </Label>
              <Input
                id="mfa-code"
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="bg-black/30 border-blue-500/30 text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <Button
              onClick={verifyCode}
              disabled={isLoading || mfaCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isLoading ? "Verifying..." : "Verify & Access"}
            </Button>

            <Button
              onClick={() => setStep("sms")}
              variant="ghost"
              className="w-full text-xs text-muted-foreground"
            >
              Resend Code
            </Button>
          </>
        )}

        <div className="text-xs text-center text-muted-foreground">
          🔐 Advanced security protocols active • All attempts monitored
        </div>
      </CardContent>
    </Card>
  );
}
