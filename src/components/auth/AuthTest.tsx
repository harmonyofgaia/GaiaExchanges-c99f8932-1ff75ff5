import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, User, Mail, Lock } from "lucide-react";

export function AuthTest() {
  const { user, signUp, signIn, signOut, loading } = useAuth();
  const [testEmail, setTestEmail] = useState("");
  const [testPassword, setTestPassword] = useState("");
  const [testMode, setTestMode] = useState<"login" | "signup">("signup");
  const [testResult, setTestResult] = useState<string>("");
  const [isTestingAuth, setIsTestingAuth] = useState(false);

  const handleAuthTest = async () => {
    setIsTestingAuth(true);
    setTestResult("");

    try {
      if (testMode === "signup") {
        const { error } = await signUp(testEmail, testPassword);
        if (error) {
          setTestResult(`Signup Error: ${error.message}`);
        } else {
          setTestResult("✅ Signup successful! Check email for verification.");
        }
      } else {
        const { error } = await signIn(testEmail, testPassword);
        if (error) {
          setTestResult(`Login Error: ${error.message}`);
        } else {
          setTestResult("✅ Login successful!");
        }
      }
    } catch (error) {
      setTestResult(`Test Error: ${error}`);
    }

    setIsTestingAuth(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-green-700">
          <User className="h-5 w-5" />
          Authentication System Test
        </CardTitle>
        <div className="flex justify-center gap-2 mt-2">
          <Badge className={user ? "bg-green-500" : "bg-red-500"}>
            {user ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {user ? "User Logged In" : "No User Session"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {user ? (
          <div className="text-center space-y-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <div className="text-green-800 font-medium">Welcome!</div>
              <div className="text-green-600 text-sm">{user.email}</div>
            </div>
            <Button
              onClick={signOut}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setTestMode("signup")}
                className={`flex-1 ${testMode === "signup" ? "bg-blue-600" : "bg-gray-400"}`}
              >
                Test Signup
              </Button>
              <Button
                onClick={() => setTestMode("login")}
                className={`flex-1 ${testMode === "login" ? "bg-blue-600" : "bg-gray-400"}`}
              >
                Test Login
              </Button>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="test@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Test password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              onClick={handleAuthTest}
              disabled={isTestingAuth || !testEmail || !testPassword}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isTestingAuth
                ? "Testing..."
                : `Test ${testMode === "signup" ? "Signup" : "Login"}`}
            </Button>

            {testResult && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  testResult.includes("✅")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {testResult}
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-600 text-center space-y-1">
          <div>🔒 Secure authentication via Supabase</div>
          <div>📧 Email verification required for signup</div>
          <div>🌐 Connected to: slheudxfcqqppyphyobq.supabase.co</div>
        </div>
      </CardContent>
    </Card>
  );
}
