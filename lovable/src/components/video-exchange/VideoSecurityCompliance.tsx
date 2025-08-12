import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Shield, UserCheck, FileText, Eye, Database } from "lucide-react";

export function VideoSecurityCompliance() {
  const [verifiedUsers, setVerifiedUsers] = useState(15420);
  const [complianceScore, setComplianceScore] = useState(98.7);

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-400" />
            Security & Compliance
            <Badge variant="secondary">GDPR Compliant</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="security" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-muted rounded-lg text-center">
                  <UserCheck className="h-6 w-6 mx-auto mb-2 text-green-400" />
                  <div className="text-sm text-muted-foreground">
                    Verified Users
                  </div>
                  <div className="text-lg font-bold text-green-400">
                    {verifiedUsers.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-sm text-muted-foreground">
                    Security Score
                  </div>
                  <div className="text-lg font-bold text-blue-400">A+</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <Lock className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-sm text-muted-foreground">
                    Encrypted Videos
                  </div>
                  <div className="text-lg font-bold text-purple-400">100%</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Audit Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Encryption Management
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Privacy Controls</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Retention Policy</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">User Consent Management</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Right to be Forgotten</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-5 w-5 text-green-400" />
                  <div>
                    <h3 className="font-semibold">Compliance Score</h3>
                    <p className="text-sm text-muted-foreground">
                      Overall platform compliance rating
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-2xl font-bold text-green-400">
                      {complianceScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Excellent
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>GDPR Compliance</span>
                    <Badge variant="default">Certified</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>CCPA Compliance</span>
                    <Badge variant="default">Certified</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>COPPA Compliance</span>
                    <Badge variant="default">Certified</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Logs
                </Button>
                <Button size="sm" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  Comprehensive audit logging system tracks all platform
                  activities for security and compliance purposes.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
