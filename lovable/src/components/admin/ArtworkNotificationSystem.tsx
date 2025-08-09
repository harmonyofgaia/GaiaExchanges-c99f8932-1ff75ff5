import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send, CheckCircle, AlertCircle, Palette } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NotificationData {
  recipient: string;
  subject: string;
  message: string;
  artworkUrl?: string;
  artworkTitle?: string;
}

export function ArtworkNotificationSystem() {
  const [notificationData, setNotificationData] = useState<NotificationData>({
    recipient: "info@cultureofharmony.net",
    subject: "New Artwork Generated - Culture of Harmony",
    message: "A new artwork has been generated and is ready for review.",
    artworkUrl: "",
    artworkTitle: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [lastSentTime, setLastSentTime] = useState<Date | null>(null);

  const sendArtworkNotification = async () => {
    if (
      !notificationData.recipient ||
      !notificationData.subject ||
      !notificationData.message
    ) {
      toast.error("Missing required fields", {
        description: "Please fill in recipient, subject, and message",
      });
      return;
    }

    setIsSending(true);
    console.log(
      "📧 Sending artwork notification to:",
      notificationData.recipient,
    );

    try {
      const { data, error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            name: "Culture of Harmony System",
            email: notificationData.recipient,
            subject: notificationData.subject,
            message: `${notificationData.message}

${notificationData.artworkTitle ? `Artwork Title: ${notificationData.artworkTitle}` : ""}
${notificationData.artworkUrl ? `Artwork URL: ${notificationData.artworkUrl}` : ""}

Generated automatically by the Culture of Harmony artwork system.

Best regards,
Culture of Harmony Team
🌍 Making the world a better place through sustainable creativity`,
            contactType: "artwork_notification",
          },
        },
      );

      if (error) {
        console.error("❌ Email sending error:", error);
        toast.error("Failed to send notification", {
          description: `Email error: ${error.message}`,
          duration: 5000,
        });
        return;
      }

      console.log("✅ Artwork notification sent successfully:", data);
      setLastSentTime(new Date());

    } catch (error: unknown) {
      console.error('❌ Notification sending failed:', error)
      let message = 'Unknown error';
      if (error && typeof error === 'object' && 'message' in error) {
        message = (error as { message: string }).message;
      }
      toast.error('Notification Failed', {
        description: `Error: ${message}`,
        duration: 5000
      })
    } finally {
      setIsSending(false);
    }
  };

  const testEmailConnection = async () => {
    console.log("🔍 Testing email connection...");

    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            name: "System Test",
            email: "info@cultureofharmony.net",
            subject: "Culture of Harmony - Email System Test",
            message:
              "This is a test email to verify the Resend API connection is working properly.\n\nIf you receive this message, the artwork notification system is ready!",
            contactType: "system_test",
          },
        },
      );

      if (error) {
        throw error;
      }

      toast.success('✅ Email Connection Test Successful!', {
        description: 'Resend API is properly configured',
        duration: 5000
      })
      
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error && typeof error === 'object' && 'message' in error) {
        message = (error as { message: string }).message;
      }
      toast.error('❌ Email Connection Test Failed', {
        description: `Please check Resend API configuration: ${message}`,
        duration: 8000
      })
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Mail className="h-5 w-5" />
          🎨 Artwork Notification System
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Automatic email notifications for new artwork generation to Culture of
          Harmony team
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Email</Label>
            <Input
              id="recipient"
              type="email"
              value={notificationData.recipient}
              onChange={(e) =>
                setNotificationData((prev) => ({
                  ...prev,
                  recipient: e.target.value,
                }))
              }
              placeholder="info@cultureofharmony.net"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              value={notificationData.subject}
              onChange={(e) =>
                setNotificationData((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
              placeholder="New Artwork Generated"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={notificationData.message}
            onChange={(e) =>
              setNotificationData((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
            placeholder="A new artwork has been generated and is ready for review..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="artworkTitle">Artwork Title (Optional)</Label>
            <Input
              id="artworkTitle"
              value={notificationData.artworkTitle}
              onChange={(e) =>
                setNotificationData((prev) => ({
                  ...prev,
                  artworkTitle: e.target.value,
                }))
              }
              placeholder="Generated Artwork Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="artworkUrl">Artwork URL (Optional)</Label>
            <Input
              id="artworkUrl"
              value={notificationData.artworkUrl}
              onChange={(e) =>
                setNotificationData((prev) => ({
                  ...prev,
                  artworkUrl: e.target.value,
                }))
              }
              placeholder="https://example.com/artwork.png"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={sendArtworkNotification}
            disabled={isSending}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </>
            )}
          </Button>

          <Button
            onClick={testEmailConnection}
            disabled={isSending}
            variant="outline"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Test Connection
          </Button>
        </div>

        {lastSentTime && (
          <div className="p-3 bg-green-900/20 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Last notification sent:</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {lastSentTime.toLocaleString()} to {notificationData.recipient}
            </p>
          </div>
        )}

        <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="h-4 w-4 text-blue-400" />
            <h4 className="font-medium text-blue-400">Integration Ready</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            This notification system will automatically send emails when new
            artworks are generated. Perfect for keeping the Culture of Harmony
            team informed about creative outputs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
