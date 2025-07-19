
-- Create video submissions table for user uploads
CREATE TABLE IF NOT EXISTS public.video_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  duration_seconds INTEGER,
  thumbnail_url TEXT,
  storage_path TEXT NOT NULL,
  storage_bucket TEXT DEFAULT 'user-videos',
  mime_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  tokens_earned NUMERIC DEFAULT 0,
  tokens_paid BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id)
);

-- Create video views tracking table
CREATE TABLE IF NOT EXISTS public.video_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES public.video_submissions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  ip_address INET,
  watched_duration_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create video likes table
CREATE TABLE IF NOT EXISTS public.video_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES public.video_submissions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(video_id, user_id)
);

-- Create task reverser settings table
CREATE TABLE IF NOT EXISTS public.feature_toggles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  feature_name TEXT UNIQUE NOT NULL,
  feature_description TEXT,
  is_enabled BOOLEAN DEFAULT true,
  category TEXT DEFAULT 'general',
  admin_only BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create GAIA earning activities table
CREATE TABLE IF NOT EXISTS public.gaia_earning_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  activity_type TEXT NOT NULL,
  activity_description TEXT,
  tokens_earned NUMERIC NOT NULL DEFAULT 0,
  reference_id UUID, -- Can reference video_id, transaction_id, etc.
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all new tables
ALTER TABLE public.video_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_toggles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gaia_earning_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video submissions
CREATE POLICY "Users can view approved videos" ON public.video_submissions
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can insert their own video submissions" ON public.video_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own submissions" ON public.video_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all videos" ON public.video_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for video views
CREATE POLICY "Users can insert video views" ON public.video_views
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own video views" ON public.video_views
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for video likes
CREATE POLICY "Users can manage their own likes" ON public.video_likes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view video likes" ON public.video_likes
  FOR SELECT USING (true);

-- RLS Policies for feature toggles
CREATE POLICY "Admins can manage feature toggles" ON public.feature_toggles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view enabled features" ON public.feature_toggles
  FOR SELECT USING (is_enabled = true AND admin_only = false);

-- RLS Policies for GAIA earning activities
CREATE POLICY "Users can view their own earning activities" ON public.gaia_earning_activities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert earning activities" ON public.gaia_earning_activities
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for user videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-videos',
  'user-videos',
  true,
  524288000, -- 500MB limit
  ARRAY['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for user videos bucket
CREATE POLICY "Users can upload videos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-videos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can view approved videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'user-videos');

CREATE POLICY "Admins can manage all video files" ON storage.objects
  FOR ALL USING (
    bucket_id = 'user-videos' AND
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default feature toggles
INSERT INTO public.feature_toggles (feature_name, feature_description, category, admin_only) VALUES
('video_uploads', 'User video upload system', 'media', false),
('video_earnings', 'GAIA token earnings from videos', 'tokens', false),
('music_player', 'Background music player', 'media', false),
('wallet_integration', 'Multi-wallet connection support', 'crypto', false),
('koala_ai_engine', 'Advanced AI system optimization', 'ai', true),
('gas_station_rewards', 'GAIA to fuel discount system', 'rewards', false),
('admin_media_library', 'Admin media management', 'admin', true),
('task_reverser', 'Feature toggle management', 'admin', true)
ON CONFLICT (feature_name) DO NOTHING;

-- Create function to award GAIA tokens for video submissions
CREATE OR REPLACE FUNCTION award_video_tokens()
RETURNS TRIGGER AS $$
BEGIN
  -- Award tokens when video is approved
  IF NEW.status = 'approved' AND OLD.status != 'approved' AND NOT NEW.tokens_paid THEN
    -- Calculate tokens based on video quality/duration (base 50 tokens + duration bonus)
    NEW.tokens_earned = 50 + COALESCE(NEW.duration_seconds / 10, 0);
    
    -- Insert earning activity
    INSERT INTO public.gaia_earning_activities (
      user_id, 
      activity_type, 
      activity_description, 
      tokens_earned, 
      reference_id, 
      status
    ) VALUES (
      NEW.user_id,
      'video_submission',
      'Video approved: ' || NEW.title,
      NEW.tokens_earned,
      NEW.id,
      'completed'
    );
    
    NEW.tokens_paid = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic token awarding
CREATE TRIGGER trigger_award_video_tokens
  BEFORE UPDATE ON public.video_submissions
  FOR EACH ROW
  EXECUTE FUNCTION award_video_tokens();

-- Create updated_at trigger for video submissions
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.video_submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.feature_toggles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
