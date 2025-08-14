import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { artworkId, imageData, artworkType, prompt } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Convert base64 to blob
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `artwork-${artworkId}-${timestamp}.png`;
    const filePath = `generated/${filename}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("artwork-files")
      .upload(filePath, imageBuffer, {
        contentType: "image/png",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("artwork-files").getPublicUrl(filePath);

    // Update database record with cloud storage info
    const { error: updateError } = await supabase
      .from("generated_artwork")
      .update({
        cloud_url: urlData.publicUrl,
        cloud_path: filePath,
        file_size: imageBuffer.length,
        storage_metadata: {
          filename: filename,
          content_type: "image/png",
          uploaded_at: new Date().toISOString(),
          artwork_type: artworkType,
          prompt_preview: prompt.substring(0, 100),
        },
      })
      .eq("id", artworkId);

    if (updateError) {
      console.error("Database update error:", updateError);
      throw new Error(`Database update failed: ${updateError.message}`);
    }

    // Send success email notification
    try {
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({
          to: "info@cultureofharmony.net",
          subject: "🎨 New Artwork Saved to Cloud Storage",
          html: `
            <h2>🎨 New Artwork Successfully Saved</h2>
            <p><strong>Artwork ID:</strong> ${artworkId}</p>
            <p><strong>Type:</strong> ${artworkType}</p>
            <p><strong>File Size:</strong> ${(imageBuffer.length / 1024).toFixed(2)} KB</p>
            <p><strong>Cloud Path:</strong> ${filePath}</p>
            <p><strong>Saved At:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Prompt Preview:</strong> ${prompt.substring(0, 200)}...</p>
            <hr>
            <p>Access your artwork collection in the Admin Dashboard.</p>
          `,
        }),
      });
    } catch (emailError) {
      console.log("Email notification failed:", emailError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Artwork saved to cloud storage successfully",
        cloud_url: urlData.publicUrl,
        file_path: filePath,
        file_size: imageBuffer.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Cloud save error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to save artwork to cloud",
        details: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
