-- Create admin media library table if not exists
CREATE TABLE IF NOT EXISTS public.admin_media_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_background_music BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_media_library ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access only
CREATE POLICY "Admin can manage all media" 
ON public.admin_media_library 
FOR ALL 
USING (auth.uid() IN (
  SELECT user_id FROM public.admin_users WHERE is_active = true
));

-- Create storage bucket for admin media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('admin-media', 'admin-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Admin can upload media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'admin-media' AND auth.uid() IN (
  SELECT user_id FROM public.admin_users WHERE is_active = true
));

CREATE POLICY "Admin can view media" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'admin-media' AND auth.uid() IN (
  SELECT user_id FROM public.admin_users WHERE is_active = true
));

CREATE POLICY "Admin can delete media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'admin-media' AND auth.uid() IN (
  SELECT user_id FROM public.admin_users WHERE is_active = true
));

-- Create function to update timestamps with proper search path
CREATE OR REPLACE FUNCTION public.update_admin_media_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = '';

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_admin_media_updated_at
BEFORE UPDATE ON public.admin_media_library
FOR EACH ROW
EXECUTE FUNCTION public.update_admin_media_updated_at();