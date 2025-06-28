
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { artworkId, imageData, artworkType, prompt } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Convert base64 to blob
    const base64Data = imageData.split(',')[1];
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    // Generate unique filename
    const fileName = `artwork-${artworkId}-${Date.now()}.png`;
    const filePath = `generated-artwork/${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('artwork-files')
      .upload(filePath, binaryData, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('artwork-files')
      .getPublicUrl(filePath);

    // Update database with cloud URL
    const { error: updateError } = await supabase
      .from('generated_artwork')
      .update({ 
        cloud_url: publicUrl,
        cloud_path: filePath,
        updated_at: new Date().toISOString()
      })
      .eq('id', artworkId);

    if (updateError) {
      console.error('Database update error:', updateError);
    }

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "Harmony of Gaia <onboarding@resend.dev>",
      to: ["info@cultureofharmony.net"],
      subject: `🎨 New Artwork Generated - ${artworkType.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e3a8a 0%, #059669 100%); color: white;">
          <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
            <h1 style="color: #34d399; margin-bottom: 20px; text-align: center;">
              🌍 New Artwork Generated Successfully!
            </h1>
            
            <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #60a5fa; margin-bottom: 15px;">Artwork Details:</h2>
              <p><strong>ID:</strong> ${artworkId}</p>
              <p><strong>Type:</strong> ${artworkType}</p>
              <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Prompt:</strong> ${prompt}</p>
            </div>
            
            <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
              <h2 style="color: #34d399; margin-bottom: 15px;">Download Links:</h2>
              <div style="margin: 15px 0;">
                <a href="${publicUrl}" 
                   style="display: inline-block; background: linear-gradient(45deg, #10b981, #059669); 
                          color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; 
                          font-weight: bold; margin: 5px;">
                  📥 Download Artwork
                </a>
              </div>
              <p style="font-size: 12px; color: #d1d5db; margin-top: 10px;">
                Cloud URL: ${publicUrl}
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; background: rgba(16,185,129,0.2); border-radius: 10px;">
              <h3 style="color: #fbbf24; margin-bottom: 10px;">
                🎨 Your Creative AI Assistant
              </h3>
              <p style="font-size: 14px; color: #d1d5db;">
                This artwork is now permanently stored in the cloud and ready for NFT minting,<br>
                downloading, or sharing with the world.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Artwork saved and email sent:", { publicUrl, emailResponse });

    return new Response(JSON.stringify({ 
      success: true,
      cloudUrl: publicUrl,
      filePath: filePath,
      emailSent: emailResponse.id ? true : false
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Error in save-artwork-to-cloud function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
