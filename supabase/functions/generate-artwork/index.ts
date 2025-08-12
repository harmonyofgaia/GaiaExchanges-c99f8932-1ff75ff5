
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { basePrompt, artworkType, style } = await req.json()
    
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))
    
    // Enhanced prompts for abstract artwork based on user's uploaded references
    const artPrompts = {
      abstract: `${basePrompt}, abstract digital art, vibrant colors, flowing patterns, geometric shapes, modern design, high quality, artistic masterpiece`,
      atmospheric: `${basePrompt}, atmospheric lighting effects, concert stage vibes, dramatic neon glow, purple and green lighting, ethereal mood, professional photography style`,
      nature_fusion: `${basePrompt}, nature-inspired abstract art, organic patterns, natural color palette, environmental harmony, flowing organic shapes, forest atmosphere`,
      architectural: `${basePrompt}, modern architectural art, geometric clean lines, turquoise and pink color palette, minimalist design, structural beauty`,
      concert_vibes: `${basePrompt}, concert atmosphere art, stage lighting effects, vibrant neon colors, crowd silhouettes, musical energy, dynamic composition`,
      cosmic: `${basePrompt}, cosmic abstract art, space-inspired, nebula patterns, stellar colors, universe harmony, ethereal design`,
      geometric: `${basePrompt}, geometric abstract art, mathematical patterns, precise shapes, harmonious composition, modern minimalist`,
      fluid: `${basePrompt}, fluid abstract art, liquid patterns, dynamic flow, color gradients, organic movement, artistic expression`,
      mixed_media: `${basePrompt}, mixed media collage art, textural elements, torn papers, metallic accents, layered composition, artistic depth`
    }

    const selectedPrompt = artPrompts[artworkType] || artPrompts.abstract

    const image = await hf.textToImage({
      inputs: selectedPrompt,
      model: 'black-forest-labs/FLUX.1-schnell',
    })

    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    // Store in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data, error } = await supabase
      .from('generated_artwork')
      .insert({
        prompt: selectedPrompt,
        artwork_type: artworkType,
        style: style,
        image_data: `data:image/png;base64,${base64}`,
        generated_at: new Date().toISOString()
      })
      .select()

    if (error) throw error

    return new Response(
      JSON.stringify({ 
        success: true,
        image: `data:image/png;base64,${base64}`,
        artwork_id: data[0].id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Artwork generation failed', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
