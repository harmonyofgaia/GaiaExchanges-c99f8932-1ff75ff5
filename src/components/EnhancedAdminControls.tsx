import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Activity,
  Globe,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminProtectedRoute } from "@/components/auth/AdminProtectedRoute";

function EnhancedAdminControlsContent() {
  const [securityLevel, setSecurityLevel] = useState("maximum");
  const [autoSecurityUpdates, setAutoSecurityUpdates] = useState(true);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);
  const [adminOnlyMode, setAdminOnlyMode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const { toast } = useToast();

  const securityMetrics = [
    { name: "Firewall Status", status: "Active", level: "Maximum" },
    { name: "DDoS Protection", status: "Active", level: "Enterprise" },
    { name: "Intrusion Detection", status: "Active", level: "Real-time" },
    { name: "Wallet Security", status: "Active", level: "Military-grade" },
    { name: "Transaction Monitoring", status: "Active", level: "24/7" },
    { name: "Scam Prevention", status: "Active", level: "AI-powered" },
  ];

  const recentTransactions = [
    {
      id: "1",
      type: "Swap",
      amount: "1,250 GAiA",
      status: "Completed",
      reversible: true,
    },
    {
      id: "2",
      type: "Burn",
      amount: "500 GAiA",
      status: "Completed",
      reversible: false,
    },
    {
      id: "3",
      type: "Swap",
      amount: "2,100 BTC",
      status: "Pending",
      reversible: true,
    },
    {
      id: "4",
      type: "Transfer",
      amount: "850 GAiA",
      status: "Completed",
      reversible: true,
    },
  ];

  const handleEmergencyStop = () => {
    setMaintenanceMode(true);
    toast({
      title: "Emergency Stop Activated",
      description: "All trading has been suspended. Only admin access is available.",
      variant: "destructive",
    });
  };

  const handleReverseTransaction = (transactionId: string) => {
    toast({
      title: "Transaction Reversal Initiated",
      description: `Transaction ${transactionId} will be reversed within 2 weeks as per admin privileges.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Admin Status Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Shield className="h-5 w-5" />
            Enhanced Admin Control System - Gaia's Exchanges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <p className="text-sm text-muted-foreground">System Security</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <p className="text-sm text-muted-foreground">Monitoring Active</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">0</div>
              <p className="text-sm text-muted-foreground">Security Threats</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">Admin</div>
              <p className="text-sm text-muted-foreground">Full Control</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="security">Security Center</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Control</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitor</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Controls</TabsTrigger>
          <TabsTrigger value="settings">Admin Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Advanced Security Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {securityMetrics.map((metric, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{metric.name}</h4>
                        <Badge className="bg-green-600 text-xs">{metric.status}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Level: <span className="text-green-400">{metric.level}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Auto Security Updates</label>
                      <p className="text-xs text-muted-foreground">
                        Automatically update security protocols
                      </p>
                    </div>
                    <Switch
                      checked={autoSecurityUpdates}
                      onCheckedChange={setAutoSecurityUpdates}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Real-time Threat Monitoring</label>
                      <p className="text-xs text-muted-foreground">
                        Monitor for suspicious activities 24/7
                      </p>
                    </div>
                    <Switch checked={realTimeMonitoring} onCheckedChange={setRealTimeMonitoring} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Admin-Only Mode</label>
                      <p className="text-xs text-muted-foreground">Restrict access to admin only</p>
                    </div>
                    <Switch checked={adminOnlyMode} onCheckedChange={setAdminOnlyMode} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Transaction Control & Reversal System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-yellow-400 mb-2">
                    Admin Privilege: 2-Week Transaction Reversal
                  </h4>
                  <p className="text-sm text-yellow-300">
                    As admin, you have the exclusive ability to reverse transactions within 2 weeks,
                    even after blockchain confirmation. This system is for fraud protection and user
                    security.
                  </p>
                </div>

                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium">{tx.type}</div>
                          <div className="text-sm text-muted-foreground">ID: {tx.id}</div>
                        </div>
                        <div>
                          <div className="font-medium">{tx.amount}</div>
                          <div className="text-sm text-muted-foreground">{tx.status}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={tx.status === "Completed" ? "default" : "secondary"}>
                          {tx.status}
                        </Badge>
                        {tx.reversible && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReverseTransaction(tx.id)}
                          >
                            Reverse
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time System Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Network Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>System Health:</span>
                      <span className="text-green-400">Optimal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users:</span>
                      <span className="text-blue-400">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transactions/Hour:</span>
                      <span className="text-blue-400">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Server Load:</span>
                      <span className="text-green-400">12%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Security Alerts</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Blocked Attacks:</span>
                      <span className="text-green-400">847 today</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Suspicious Activities:</span>
                      <span className="text-yellow-400">0 active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Firewall Status:</span>
                      <span className="text-green-400">Maximum</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Security Scan:</span>
                      <span className="text-green-400">2 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Control Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-medium text-red-400 mb-2">Emergency Controls</h4>
                <p className="text-sm text-red-300 mb-4">
                  These controls should only be used in emergency situations. They will immediately
                  affect all users and transactions on the platform.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="destructive"
                    onClick={handleEmergencyStop}
                    disabled={maintenanceMode}
                    className="w-full"
                  >
                    {maintenanceMode ? "Emergency Mode Active" : "Emergency Stop All Trading"}
                  </Button>
                  {maintenanceMode && (
                    <Button
                      variant="outline"
                      onClick={() => setMaintenanceMode(false)}
                      className="w-full"
                    >
                      Resume Normal Operations
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Maintenance Mode</label>
                  <p className="text-xs text-muted-foreground">
                    Block all user access except admin
                  </p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Security Level</label>
                  <select
                    value={securityLevel}
                    onChange={(e) => setSecurityLevel(e.target.value)}
                    className="w-full p-2 rounded-lg bg-muted border border-border"
                  >
                    <option value="standard">Standard Security</option>
                    <option value="enhanced">Enhanced Security</option>
                    <option value="maximum">Maximum Security</option>
                    <option value="military">Military-Grade Security</option>
                  </select>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-400 mb-2">Admin Wallet Address</h4>
                  <div className="font-mono text-sm bg-muted/50 p-2 rounded break-all">
                    ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7
                  </div>
                  <p className="text-xs text-blue-300 mt-2">
                    This wallet has full administrative privileges over Gaia's Exchanges
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-green-400 mb-2">Current Privileges</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Full system access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Transaction reversal rights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Security configuration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Emergency controls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Token management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>User management</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function EnhancedAdminControls() {
  return (
    <AdminProtectedRoute>
      <EnhancedAdminControlsContent />
    </AdminProtectedRoute>
  );
}
