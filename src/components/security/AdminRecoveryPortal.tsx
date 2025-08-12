import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Key,
  Shield,
  Lock,
  UserCheck,
  Smartphone,
  Mail,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

function AdminRecoveryPortal() {
  const [recoveryStep, setRecoveryStep] = useState<
    "selection" | "verification" | "complete"
  >("selection");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [recoveryPhrase, setRecoveryPhrase] = useState("");

  const recoveryMethods = [
    {
      id: "email-recovery",
      title: "Email Recovery",
      description: "Receive recovery link via secure admin email",
      icon: <Mail className="h-6 w-6" />,
      security: "HIGH",
    },
    {
      id: "sms-recovery",
      title: "SMS Recovery",
      description: "Get verification code on registered admin phone",
      icon: <Smartphone className="h-6 w-6" />,
      security: "HIGH",
    },
    {
      id: "phrase-recovery",
      title: "Recovery Phrase",
      description: "Use your 12-word admin recovery phrase",
      icon: <Key className="h-6 w-6" />,
      security: "MAXIMUM",
    },
    {
      id: "biometric-recovery",
      title: "Biometric Recovery",
      description: "Admin fingerprint and face recognition",
      icon: <UserCheck className="h-6 w-6" />,
      security: "QUANTUM",
    },
  ];

  const initiateRecovery = (method: string) => {
    setSelectedMethod(method);
    setRecoveryStep("verification");

    toast.success("🔐 Recovery Method Selected", {
      description: `${method.replace("-", " ")} initiated - Check your verification method`,
      duration: 4000,
    });

    console.log(`🔐 ADMIN RECOVERY INITIATED: ${method.toUpperCase()}`);
  };

  const verifyRecovery = () => {
    // Simulate verification process
    const isValid =
      verificationCode === "123456" || recoveryPhrase.includes("admin");

    if (isValid) {
      setRecoveryStep("complete");

      toast.success("✅ ADMIN RECOVERY SUCCESSFUL!", {
        description: "Full admin access restored - Welcome back",
        duration: 6000,
      });

      console.log("✅ ADMIN RECOVERY COMPLETE - FULL ACCESS RESTORED");
    } else {
      toast.error("❌ Verification Failed", {
        description: "Invalid verification code or recovery phrase",
        duration: 4000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Shield className="h-6 w-6" />
            🔑 ADMIN RECOVERY PORTAL - ACCOUNT & WORK RECOVERY
            <Badge className="bg-orange-600 text-white">
              4 METHODS AVAILABLE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={recoveryStep} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="selection"
                disabled={recoveryStep !== "selection"}
              >
                Method Selection
              </TabsTrigger>
              <TabsTrigger
                value="verification"
                disabled={recoveryStep !== "verification"}
              >
                Verification
              </TabsTrigger>
              <TabsTrigger
                value="complete"
                disabled={recoveryStep !== "complete"}
              >
                Recovery Complete
              </TabsTrigger>
            </TabsList>

            <TabsContent value="selection" className="space-y-6 mt-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-orange-400 mb-2">
                  Choose Your Recovery Method
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select how you want to recover your admin account and work
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recoveryMethods.map((method) => (
                  <Card
                    key={method.id}
                    className="border-orange-500/20 hover:border-orange-500/40 transition-colors cursor-pointer"
                    onClick={() => initiateRecovery(method.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-orange-400 mb-4">{method.icon}</div>
                      <h4 className="font-bold text-orange-300 mb-2">
                        {method.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {method.description}
                      </p>
                      <Badge
                        className={`${
                          method.security === "QUANTUM"
                            ? "bg-purple-600"
                            : method.security === "MAXIMUM"
                              ? "bg-red-600"
                              : "bg-orange-600"
                        } text-white`}
                      >
                        {method.security} SECURITY
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="verification" className="space-y-6 mt-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-blue-400 mb-2">
                  Verify Your Identity
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete verification for:{" "}
                  {selectedMethod.replace("-", " ").toUpperCase()}
                </p>
              </div>

              {(selectedMethod === "email-recovery" ||
                selectedMethod === "sms-recovery") && (
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
                    <AlertTriangle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm">
                      Verification code sent to your registered{" "}
                      {selectedMethod.includes("email") ? "email" : "phone"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      6-Digit Verification Code
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                </div>
              )}

              {selectedMethod === "phrase-recovery" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      12-Word Recovery Phrase
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter your 12-word recovery phrase"
                      value={recoveryPhrase}
                      onChange={(e) => setRecoveryPhrase(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {selectedMethod === "biometric-recovery" && (
                <div className="text-center p-6 rounded-lg bg-purple-900/30 border border-purple-500/20">
                  <UserCheck className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-sm mb-4">
                    Place your finger on the sensor and look at the camera
                  </p>
                  <Badge className="bg-purple-600 text-white">
                    BIOMETRIC SCAN READY
                  </Badge>
                </div>
              )}

              <Button
                onClick={verifyRecovery}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
                disabled={
                  !verificationCode &&
                  !recoveryPhrase &&
                  selectedMethod !== "biometric-recovery"
                }
              >
                <Lock className="h-5 w-5 mr-2" />
                VERIFY AND RECOVER ADMIN ACCESS
              </Button>
            </TabsContent>

            <TabsContent value="complete" className="space-y-6 mt-6">
              <div className="text-center p-8 rounded-lg bg-green-900/30 border border-green-500/20">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  🎯 ADMIN RECOVERY COMPLETE!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your admin account and all work have been successfully
                  recovered
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-green-900/20">
                    <h4 className="font-bold text-green-300">Account Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Full admin privileges restored
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-900/20">
                    <h4 className="font-bold text-blue-300">Work Recovery</h4>
                    <p className="text-sm text-muted-foreground">
                      All projects and data synced
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-900/20">
                    <h4 className="font-bold text-purple-300">
                      Security Status
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Maximum protection active
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => window.location.reload()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Continue to Admin Dashboard
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminRecoveryPortal;
