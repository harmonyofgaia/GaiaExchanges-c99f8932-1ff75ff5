import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChatSecurityPanel() {
  return (
    <Card className="bg-purple-900/30 border border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400">🔒 Secure Chat Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">✅ Chat Security Active</h4>
          <ul className="text-sm space-y-1 text-green-300">
            <li>• All messages encrypted and untraceable</li>
            <li>• Admin-only access to chat logs for moderation</li>
            <li>• Automatic bad habit pattern detection</li>
            <li>• Real-time security monitoring</li>
            <li>• Zero message storage outside secure vault</li>
          </ul>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="font-medium text-red-400 mb-2">🛡️ Admin Privileges</h4>
          <p className="text-sm text-red-300">
            Only admin accounts can access chat logs for security purposes. All access is logged and
            audited for maximum transparency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
