import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface GoogleRecoveryStepProps {
  onComplete: () => void;
}

export function GoogleRecoveryStep({ onComplete }: GoogleRecoveryStepProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);

    // Simulate Google Authenticator verification
    setTimeout(() => {
      if (verificationCode.length === 6) {
        toast.success("✅ Google Verification Complete!", {
          description: "Authenticator code verified successfully",
        });
        onComplete();
      } else {
        toast.error("❌ Invalid verification code", {
          description: "Please enter a valid 6-digit code",
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <Card className="bg-green-900/30 border border-green-500/30">
      <CardContent className="p-4">
        <div className="text-center space-y-4">
          <QrCode className="h-8 w-8 text-green-400 mx-auto" />
          <h4 className="font-bold text-green-400">Google Authenticator</h4>
          <p className="text-sm text-muted-foreground">
            Enter your 6-digit authenticator code
          </p>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="000000"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(
                  e.target.value.replace(/\D/g, "").slice(0, 6),
                )
              }
              className="text-center text-lg font-mono"
              maxLength={6}
            />

            <Button
              onClick={handleVerify}
              disabled={verificationCode.length !== 6 || isVerifying}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              {isVerifying ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
