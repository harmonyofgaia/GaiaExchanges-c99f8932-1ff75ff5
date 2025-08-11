import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactType: string;
  to: string;
  timestamp: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      subject,
      message,
      contactType,
      to,
      timestamp,
    }: ContactEmailRequest = await req.json();

    console.log("Sending contact email:", {
      name,
      email,
      subject,
      contactType,
      to,
    });

    const emailResponse = await resend.emails.send({
      from: "Culture of Harmony <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `[${contactType.toUpperCase()}] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e3a8a 0%, #059669 100%); color: white;">
          <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
            <h1 style="color: #34d399; margin-bottom: 20px; text-align: center;">
              🌍 Culture of Harmony - New Contact Message
            </h1>
            
            <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #60a5fa; margin-bottom: 15px;">Contact Details:</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Contact Type:</strong> ${contactType}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Received:</strong> ${new Date(timestamp).toLocaleString()}</p>
            </div>
            
            <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #34d399; margin-bottom: 15px;">Message:</h2>
              <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; line-height: 1.6;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; background: rgba(16,185,129,0.2); border-radius: 10px;">
              <h3 style="color: #fbbf24; margin-bottom: 10px;">
                🤝 Together We Make The World A Better Place
              </h3>
              <p style="font-size: 14px; color: #d1d5db;">
                This message was sent through the official Culture of Harmony contact system<br>
                from the Harmony of Gaia - Gaia's Exchanges platform.
              </p>
              <p style="font-size: 12px; color: #9ca3af; margin-top: 15px;">
                Reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
