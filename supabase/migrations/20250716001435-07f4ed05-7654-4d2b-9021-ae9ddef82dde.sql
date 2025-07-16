
-- Create media library table for admin file storage
CREATE TABLE public.admin_media_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  storage_bucket TEXT NOT NULL DEFAULT 'admin-media',
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  is_background_music BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Create storage bucket for admin media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-media',
  'admin-media',
  false,
  52428800, -- 50MB limit
  ARRAY['audio/mpeg', 'audio/wav', 'audio/ogg', 'video/mp4', 'video/webm', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']
);

-- Enable RLS on admin media library
ALTER TABLE public.admin_media_library ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access only
CREATE POLICY "Admin can manage media library" 
  ON public.admin_media_library 
  FOR ALL 
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

-- Create storage policies for admin media bucket
CREATE POLICY "Admin can upload to admin-media bucket"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'admin-media' AND
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can view admin-media bucket"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'admin-media' AND
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can update admin-media bucket"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'admin-media' AND
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can delete from admin-media bucket"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'admin-media' AND
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create admin metrics table for persistent data
CREATE TABLE public.admin_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL UNIQUE,
  metric_value NUMERIC NOT NULL DEFAULT 0,
  metric_type TEXT NOT NULL DEFAULT 'counter',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Insert initial admin metrics
INSERT INTO public.admin_metrics (metric_name, metric_value, metric_type) VALUES
('total_users', 125847, 'counter'),
('active_users', 48750, 'gauge'),
('total_transactions', 2847593, 'counter'),
('server_uptime', 99.99, 'percentage'),
('security_threats', 0, 'counter'),
('system_load', 23.5, 'percentage'),
('growth_rate', 156.7, 'percentage'),
('community_score', 94.2, 'score');

-- Enable RLS on admin metrics
ALTER TABLE public.admin_metrics ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access to metrics
CREATE POLICY "Admin can manage metrics" 
  ON public.admin_metrics 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to update metrics
CREATE OR REPLACE FUNCTION public.update_admin_metric(
  p_metric_name TEXT,
  p_new_value NUMERIC,
  p_increment BOOLEAN DEFAULT false
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_increment THEN
    INSERT INTO public.admin_metrics (metric_name, metric_value, last_updated)
    VALUES (p_metric_name, p_new_value, now())
    ON CONFLICT (metric_name) 
    DO UPDATE SET 
      metric_value = admin_metrics.metric_value + p_new_value,
      last_updated = now();
  ELSE
    INSERT INTO public.admin_metrics (metric_name, metric_value, last_updated)
    VALUES (p_metric_name, p_new_value, now())
    ON CONFLICT (metric_name) 
    DO UPDATE SET 
      metric_value = p_new_value,
      last_updated = now();
  END IF;
END;
$$;
