import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, Vault } from "lucide-react";
import { toast } from "sonner";

interface AdminCredentialsFormProps {
  loginType: "system" | "vault";
  onLoginSuccess: () => void;
}

export function AdminCredentialsForm({
  loginType,
  onLoginSuccess,
}: AdminCredentialsFormProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validCredentials =
        loginType === "system"
          ? { username: "Synatic", password: "Freedom!oul19922323" }
          : { username: "Synatic", password: "dolphin1992" };

      if (
        credentials.username === validCredentials.username &&
        credentials.password === validCredentials.password
      ) {
        const logType = loginType === "system" ? "SYSTEM" : "VAULT";
        console.log(
          `🛡️ ${logType} ADMIN ACCESS GRANTED - QUANTUM CONTROL ACTIVE`,
        );
        console.log("👑 ADMIN SYNATIC - SUPREME CONTROLLER");
        console.log("🚫 NO OTHER MACHINE OR CREATOR CAN ACCESS THIS SYSTEM");
        console.log("⚡ ULTIMATE PROTECTION PROTOCOLS ACTIVATED");

        onLoginSuccess();

        const successMessage =
          loginType === "system"
            ? "👑 SUPREME ADMIN ACCESS GRANTED!"
            : "🏦 VAULT ADMIN ACCESS GRANTED!";

        const description =
          loginType === "system"
            ? "Quantum system control activated - Ultimate admin powers unlocked"
            : "Community vault control activated - Investment oversight unlocked";

        toast.success(successMessage, {
          description,
          duration: 5000,
        });
      } else {
        const errorMessage =
          loginType === "system"
            ? "🚫 SYSTEM ACCESS DENIED"
            : "🚫 VAULT ACCESS DENIED";

        toast.error(errorMessage, {
          description: "Invalid admin credentials - Quantum protection active",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Security Error", {
        description: "Protection activated - All attempts logged",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      setCredentials({ username: "", password: "" });
    }
  };

  const isSystem = loginType === "system";
  const icon = isSystem ? Shield : Vault;
  const title = isSystem ? "Supreme System Control" : "Vault Control Access";
  const subtitle = isSystem
    ? "Ultimate admin control • All features • Maximum authority"
    : "Investment oversight • Vault management • Community funds";
  const buttonText = isSystem
    ? "ACCESS SUPREME CONTROL"
    : "ACCESS VAULT CONTROL";
  const gradientFrom = isSystem ? "from-blue-600" : "from-emerald-600";
  const gradientTo = isSystem ? "to-purple-600" : "to-green-600";
  const gradientFromHover = isSystem
    ? "hover:from-blue-700"
    : "hover:from-emerald-700";
  const gradientToHover = isSystem
    ? "hover:to-purple-700"
    : "hover:to-green-700";

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3
          className={`text-xl font-bold ${isSystem ? "text-blue-400" : "text-emerald-400"}`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${isSystem ? "text-blue-300" : "text-emerald-300"}`}
        >
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${loginType}-username`} className="text-green-300">
            {isSystem ? "System Admin Username" : "Vault Admin Username"}
          </Label>
          <Input
            id={`${loginType}-username`}
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, username: e.target.value }))
            }
            className="bg-black/40 border-green-500/30 text-green-400"
            placeholder={`Enter ${loginType} admin username...`}
            autoComplete="off"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${loginType}-password`} className="text-green-300">
            {isSystem ? "Quantum Password" : "Vault Password"}
          </Label>
          <div className="relative">
            <Input
              id={`${loginType}-password`}
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="bg-black/40 border-green-500/30 text-green-400 pr-10"
              placeholder={`Enter ${loginType} password...`}
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
          className={`w-full bg-gradient-to-r ${gradientFrom} ${gradientTo} ${gradientFromHover} ${gradientToHover} text-white font-bold py-3`}
        >
          {React.createElement(icon, { className: "h-5 w-5 mr-2" })}
          {isLoading
            ? `${isSystem ? "Quantum" : "Vault"} Verification...`
            : buttonText}
        </Button>
      </form>
    </div>
  );
}
