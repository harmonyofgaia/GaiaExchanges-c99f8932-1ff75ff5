import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const elevenLabsApiKey = Deno.env.get("ELEVENLABS_API_KEY");
const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice, mode, userId } = await req.json();

    console.log("🎤 AI VOICE QUANTUM SYSTEM ACTIVATED:", { voice, mode });

    // Advanced voice configurations for different AI personalities
    const voiceConfigs = {
      "neural-assistant": {
        voice_id: "EXAVITQu4vr4xnSDxMaL", // Bella - Professional
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.85,
          style: 0.6,
        },
      },
      "quantum-advisor": {
        voice_id: "pNInz6obpgDQGcFmaJgB", // Adam - Authoritative
        model_id: "eleven_turbo_v2",
        voice_settings: {
          stability: 0.85,
          similarity_boost: 0.9,
          style: 0.8,
        },
      },
      "security-ai": {
        voice_id: "TxGEqnHWrfWFTfGW9XjX", // Josh - Serious
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.9,
          similarity_boost: 0.95,
          style: 0.4,
        },
      },
      "creative-genius": {
        voice_id: "XrExE9yKIg1WjnnlVkGX", // Matilda - Creative
        model_id: "eleven_turbo_v2",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.75,
          style: 0.9,
        },
      },
    };

    const config = voiceConfigs[voice] || voiceConfigs["neural-assistant"];

    // Generate speech with ElevenLabs
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${config.voice_id}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": elevenLabsApiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: config.model_id,
        voice_settings: config.voice_settings,
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioArrayBuffer = await response.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioArrayBuffer)));

    // Log voice interaction
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("ai_voice_interactions").insert({
      user_id: userId,
      text: text,
      voice_type: voice,
      mode: mode,
      voice_id: config.voice_id,
      model_id: config.model_id,
      audio_duration: Math.floor(text.length / 10), // Estimate
      created_at: new Date().toISOString(),
    });

    console.log("🎤 QUANTUM VOICE GENERATED - NEURAL AUDIO ACTIVE");

    return new Response(
      JSON.stringify({
        audio_base64: audioBase64,
        voice_type: voice,
        mode: mode,
        model_id: config.model_id,
        quantum_voice_status: "ACTIVE",
        neural_audio_quality: "MAXIMUM",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("🔥 VOICE QUANTUM ERROR:", error);
    return new Response(
      JSON.stringify({
        error: "Voice quantum system temporarily offline",
        details: error.message,
        status: "NEURAL_HEALING_ACTIVE",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
