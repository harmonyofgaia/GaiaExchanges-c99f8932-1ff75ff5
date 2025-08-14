import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Settings, UserMinus, UserX, Clock, Ban } from "lucide-react";

export function QuickActionsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-yellow-900/30 border border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5" />
            Issue Warning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Duration (hours)</label>
            <Input type="number" defaultValue={24} min="1" max="168" />
          </div>
          <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
            <Clock className="h-4 w-4 mr-2" />
            Apply Warning
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-orange-900/30 border border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5" />
            Restrict Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Restriction Level (1-5)</label>
            <Input type="number" defaultValue={1} min="1" max="5" />
          </div>
          <Button className="w-full bg-orange-600 hover:bg-orange-700">
            <UserMinus className="h-4 w-4 mr-2" />
            Apply Restriction
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-red-900/30 border border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2 text-lg">
            <UserX className="h-5 w-5" />
            Permanent Ban
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-red-300 mb-4">
            ⚠️ This action is permanent and cannot be undone!
          </div>
          <Button className="w-full bg-red-600 hover:bg-red-700">
            <Ban className="h-4 w-4 mr-2" />
            PERMANENT BAN
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
