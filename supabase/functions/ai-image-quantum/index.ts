import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style, size, quality, userId } = await req.json();

    console.log("🎨 AI IMAGE QUANTUM GENERATOR ACTIVATED:", {
      style,
      size,
      quality,
    });

    // Enhanced prompts for different styles
    const styleEnhancements = {
      "neural-matrix": `${prompt}, neural network visualization, digital matrix patterns, quantum computing aesthetics, neon circuitry, futuristic AI brain, glowing data streams, ultra high resolution, 8K detail`,

      "quantum-harmony": `${prompt}, quantum field visualization, harmonic frequency patterns, sacred geometry, environmental consciousness, nature-tech fusion, ethereal glow, spiritual technology, ultra high resolution`,

      "gaia-ecosystem": `${prompt}, Gaia hypothesis visualization, living earth consciousness, ecological networks, bio-digital fusion, environmental harmony, organic technology, life force energy, ultra high resolution`,

      "security-fortress": `${prompt}, impenetrable digital fortress, quantum encryption patterns, security shield visualization, cyber defense matrix, unbreakable protection, military-grade aesthetics, ultra high resolution`,

      "creative-explosion": `${prompt}, explosive creativity, artistic genius manifestation, innovative design breakthrough, revolutionary art, boundless imagination, artistic mastery, ultra high resolution`,
    };

    const enhancedPrompt =
      styleEnhancements[style] ||
      `${prompt}, ultra high resolution, masterpiece quality, professional artwork`;

    // Advanced image generation with GPT-Image-1
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: enhancedPrompt,
        n: 1,
        size: size || "1024x1024",
        quality: quality || "high",
        output_format: "png",
        background: "auto",
      })
    });

    const data = await response.json();

    if (!data.data || !data.data[0]) {
      throw new Error("No image generated");
    }

    const imageBase64 = data.data[0].b64_json;

    // Store in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: insertData, error } = await supabase
      .from("ai_generated_images")
      .insert({
        user_id: userId,
        prompt: prompt,
        enhanced_prompt: enhancedPrompt,
        style: style,
        size: size,
        quality: quality,
        model: "gpt-image-1",
        image_data: `data:image/png;base64,${imageBase64}`,
        generation_time: Date.now(),
        metadata: {
          neural_enhancement: true,
          quantum_processing: true,
          ai_creativity_level: "MAXIMUM",
        },
      })
      .select();

    if (error) throw error;

    console.log("🎨 QUANTUM IMAGE GENERATED - NEURAL CREATIVITY ACTIVE");

    return new Response(
      JSON.stringify({
        image_base64: imageBase64,
        image_url: `data:image/png;base64,${imageBase64}`,
        image_id: insertData[0].id,
        style: style,
        enhanced_prompt: enhancedPrompt,
        quantum_image_status: "GENERATED",
        neural_creativity_level: "UNLIMITED",
        model: "gpt-image-1",
      })
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("🔥 IMAGE QUANTUM ERROR:", error);
    return new Response(
      JSON.stringify({
        error: "Image quantum generator temporarily offline",
        details: error.message,
        status: "NEURAL_CREATIVE_HEALING",
      })
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
