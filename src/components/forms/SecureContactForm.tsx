import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Send, Shield } from "lucide-react";
import {
  validateEmail,
  validateTextInput,
  rateLimiter,
  generateCSRFToken,
} from "@/utils/inputSanitization";

export function SecureContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [csrfToken] = useState(() => generateCSRFToken());

  // Honeypot field to catch bots
  const [honeypot, setHoneypot] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate name
    const nameValidation = validateTextInput(formData.name, {
      required: true,
      minLength: 2,
      maxLength: 100,
    });
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error!;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!;
    }

    // Validate subject
    const subjectValidation = validateTextInput(formData.subject, {
      required: true,
      minLength: 5,
      maxLength: 200,
    });
    if (!subjectValidation.isValid) {
      newErrors.subject = subjectValidation.error!;
    }

    // Validate message
    const messageValidation = validateTextInput(formData.message, {
      required: true,
      minLength: 10,
      maxLength: 2000,
    });
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.error!;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot detection - honeypot field should be empty
    if (honeypot) {
      toast.error("Suspicious activity detected");
      return;
    }

    // Rate limiting check
    const userIP = "user"; // In a real app, you'd get the actual IP
    if (!rateLimiter.isAllowed(userIP, 3, 300000)) {
      // 3 attempts per 5 minutes
      const remainingTime = rateLimiter.getRemainingTime(userIP, 300000);
      toast.error(
        `Too many attempts. Please wait ${Math.ceil(remainingTime / 60000)} minutes.`,
      );
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission - in a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Message sent successfully! We'll get back to you soon.", {
        description:
          "Thank you for contacting us. Your message has been received.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-green-500/30 bg-gradient-to-br from-green-900/20 to-black/70 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="h-8 w-8 text-green-400" />
          <Shield className="h-6 w-6 text-green-400" />
        </div>
        <CardTitle className="text-2xl text-green-400">Get in Touch</CardTitle>
        <p className="text-green-300 text-sm">
          Send us a secure message and we'll respond as soon as possible
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <div className="hidden">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* CSRF Token */}
          <input type="hidden" name="csrf_token" value={csrfToken} />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-green-300">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-black/30 border-green-500/30 text-green-400"
                placeholder="Your full name"
                required
                sanitize={true}
                maxLength={100}
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-300">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-black/30 border-green-500/30 text-green-400"
                placeholder="your@email.com"
                required
                maxLength={254}
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-green-300">
              Subject *
            </Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className="bg-black/30 border-green-500/30 text-green-400"
              placeholder="What's this about?"
              required
              sanitize={true}
              maxLength={200}
            />
            {errors.subject && (
              <p className="text-red-400 text-sm">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-green-300">
              Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="bg-black/30 border-green-500/30 text-green-400 min-h-[120px]"
              placeholder="Tell us more about your inquiry..."
              required
              sanitize={true}
              maxLength={2000}
            />
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message}</p>
            )}
            <div className="text-right text-green-300 text-xs">
              {formData.message.length}/2000 characters
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3"
          >
            <Send className="h-5 w-5 mr-2" />
            {isSubmitting ? "Sending Message..." : "Send Secure Message"}
          </Button>

          <div className="text-center text-green-300 text-xs space-y-1">
            <p>🔒 Your message is protected by advanced security measures</p>
            <p>We respect your privacy and will never share your information</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
