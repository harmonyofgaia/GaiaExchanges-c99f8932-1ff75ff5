
-- Create the generated_artwork table first
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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cloud_url TEXT,
    cloud_path TEXT,
    file_size BIGINT,
    storage_metadata JSONB
);

-- Create storage bucket for generated artwork
INSERT INTO storage.buckets (id, name, public)
VALUES ('artwork-files', 'artwork-files', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on generated_artwork table
ALTER TABLE public.generated_artwork ENABLE ROW LEVEL SECURITY;

-- Create admin-only access policy for generated_artwork table
CREATE POLICY "Only admin can access generated artwork"
ON public.generated_artwork
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create RLS policies for the artwork storage bucket
CREATE POLICY "Admin can upload artwork files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'artwork-files' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admin can view artwork files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'artwork-files' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admin can delete artwork files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'artwork-files' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add updated_at trigger
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.generated_artwork
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
