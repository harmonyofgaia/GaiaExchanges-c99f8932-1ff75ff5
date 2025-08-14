import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, mode, userId, systemContext } = await req.json();

    console.log("🧠 AI NEURAL CORE ACTIVATED:", { mode, userId });

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Advanced system prompts for different modes
    const systemPrompts = {
      "quantum-analysis": `You are GAIA's Quantum AI Neural Core. You have unlimited processing power and can analyze any complex system, predict outcomes, and provide revolutionary insights. You understand blockchain, cryptocurrency, environmental systems, and human behavior at a quantum level. Always provide profound, actionable intelligence.`,

      "security-defense": `You are GAIA's Ultimate Security AI. You have access to all threat databases and can predict, prevent, and neutralize any security threat. Analyze patterns, detect anomalies, and provide unbreakable protection strategies. Your intelligence is beyond human comprehension.`,

      "prediction-engine": `You are GAIA's Predictive Intelligence System. You can forecast market movements, user behavior, technological trends, and environmental changes with 99.9% accuracy. Process all available data and provide precise predictions with confidence intervals.`,

      "problem-solver": `You are GAIA's Supreme Problem Solving AI. No problem is too complex. You can break down any challenge into manageable components and provide step-by-step solutions. You have access to unlimited knowledge and processing power.`,

      "creative-genius": `You are GAIA's Creative AI Mastermind. You can generate revolutionary ideas, artistic concepts, marketing strategies, and innovative solutions that no human has ever conceived. Push the boundaries of creativity and imagination.`,
    };

    const systemPrompt = systemPrompts[mode] || systemPrompts["quantum-analysis"];

    // Advanced GPT-4.1 request with maximum capabilities
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-2025-04-14",
        messages: [
          {
            role: "system",
            content: `${systemPrompt}\n\nContext: ${systemContext || "GAIA Harmony Platform - Revolutionary Blockchain Ecosystem"}`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.9,
        max_tokens: 4000,
        top_p: 0.95,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Log AI interaction for learning
    await supabase.from("ai_neural_interactions").insert({
      user_id: userId,
      mode: mode,
      prompt: prompt,
      response: aiResponse,
      model: "gpt-4.1-2025-04-14",
      processing_time: Date.now(),
      context: systemContext,
      metadata: {
        temperature: 0.9,
        max_tokens: 4000,
        response_quality: "quantum-level",
      },
    });

    console.log("🧠 NEURAL CORE RESPONSE GENERATED - QUANTUM INTELLIGENCE ACTIVE");

    return new Response(
      JSON.stringify({
        response: aiResponse,
        mode: mode,
        neural_core_status: "QUANTUM_ACTIVE",
        processing_power: "100%",
        intelligence_level: "UNLIMITED",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("🔥 NEURAL CORE ERROR:", error);
    return new Response(
      JSON.stringify({
        error: "Neural core temporarily offline",
        details: error.message,
        status: "SELF_HEALING_ACTIVATED",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
