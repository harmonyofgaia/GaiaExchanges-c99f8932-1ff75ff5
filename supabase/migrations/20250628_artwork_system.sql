
-- Create generated_artwork table
CREATE TABLE IF NOT EXISTS public.generated_artwork (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt TEXT NOT NULL,
    artwork_type TEXT NOT NULL,
    style TEXT NOT NULL,
    image_data TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    downloads INTEGER DEFAULT 0,
    nft_ready BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.generated_artwork ENABLE ROW LEVEL SECURITY;

-- Allow admin access
CREATE POLICY "Admin can manage artwork" ON public.generated_artwork
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_sessions 
            WHERE session_token IS NOT NULL 
            AND expires_at > NOW()
        )
    );

-- Allow public read access for viewing artworks
CREATE POLICY "Public can view artwork" ON public.generated_artwork
    FOR SELECT USING (true);

-- Add updated_at trigger
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.generated_artwork
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
