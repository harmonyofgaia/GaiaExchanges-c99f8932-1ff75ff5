-- Animal Welfare Database Schema for Live Cams, VR, NFTs, and Gaming

-- Live Animal Cameras Table
CREATE TABLE public.live_animal_cameras (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  camera_name TEXT NOT NULL,
  location TEXT NOT NULL,
  country TEXT NOT NULL,
  animal_species TEXT NOT NULL,
  stream_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  camera_metadata JSONB DEFAULT '{}',
  conservation_partner TEXT,
  viewers_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Animal NFT Collection Table
CREATE TABLE public.animal_nfts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nft_token_id TEXT NOT NULL UNIQUE,
  animal_name TEXT NOT NULL,
  species TEXT NOT NULL,
  location TEXT NOT NULL,
  camera_id UUID REFERENCES public.live_animal_cameras(id),
  owner_id UUID,
  price DECIMAL(18, 9) DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')) DEFAULT 'common',
  special_abilities JSONB DEFAULT '[]',
  conservation_impact DECIMAL(18, 9) DEFAULT 0,
  image_url TEXT,
  metadata JSONB DEFAULT '{}',
  is_for_sale BOOLEAN DEFAULT false,
  gaming_stats JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- VR Experiences Table
CREATE TABLE public.vr_animal_experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  experience_name TEXT NOT NULL,
  animal_species TEXT NOT NULL,
  location TEXT NOT NULL,
  experience_type TEXT CHECK (experience_type IN ('habitat_tour', 'feeding_session', 'migration_journey', 'conservation_mission')) NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5) DEFAULT 1,
  vr_asset_url TEXT,
  preview_image_url TEXT,
  description TEXT,
  price_gaia DECIMAL(18, 9) DEFAULT 0,
  participants_count INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  conservation_partner TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Animal Conservation Activities
CREATE TABLE public.animal_conservation_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  activity_type TEXT CHECK (activity_type IN ('camera_watching', 'nft_purchase', 'vr_experience', 'donation', 'game_participation')) NOT NULL,
  animal_nft_id UUID REFERENCES public.animal_nfts(id),
  camera_id UUID REFERENCES public.live_animal_cameras(id),
  vr_experience_id UUID REFERENCES public.vr_animal_experiences(id),
  tokens_earned DECIMAL(18, 9) DEFAULT 0,
  conservation_impact DECIMAL(18, 9) DEFAULT 0,
  activity_data JSONB DEFAULT '{}',
  status TEXT CHECK (status IN ('pending', 'completed', 'verified')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Gaming Integration Stats
CREATE TABLE public.animal_gaming_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  animal_nft_id UUID REFERENCES public.animal_nfts(id),
  game_name TEXT NOT NULL,
  stats JSONB DEFAULT '{}',
  achievements JSONB DEFAULT '[]',
  last_played TIMESTAMP WITH TIME ZONE DEFAULT now(),
  total_playtime_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.live_animal_cameras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.animal_nfts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vr_animal_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.animal_conservation_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.animal_gaming_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Live Animal Cameras
CREATE POLICY "Anyone can view active cameras" ON public.live_animal_cameras
  FOR SELECT USING (is_active = true);

-- RLS Policies for Animal NFTs
CREATE POLICY "Anyone can view animal NFTs" ON public.animal_nfts
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own NFT purchases" ON public.animal_nfts
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own NFTs" ON public.animal_nfts
  FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for VR Experiences
CREATE POLICY "Anyone can view VR experiences" ON public.vr_animal_experiences
  FOR SELECT USING (true);

-- RLS Policies for Conservation Activities
CREATE POLICY "Users can view their own activities" ON public.animal_conservation_activities
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own activities" ON public.animal_conservation_activities
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own activities" ON public.animal_conservation_activities
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for Gaming Stats
CREATE POLICY "Users can manage their own gaming stats" ON public.animal_gaming_stats
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- Create indexes for better performance
CREATE INDEX idx_animal_cameras_species ON public.live_animal_cameras(animal_species);
CREATE INDEX idx_animal_cameras_location ON public.live_animal_cameras(location);
CREATE INDEX idx_animal_nfts_species ON public.animal_nfts(species);
CREATE INDEX idx_animal_nfts_owner ON public.animal_nfts(owner_id);
CREATE INDEX idx_animal_nfts_for_sale ON public.animal_nfts(is_for_sale);
CREATE INDEX idx_conservation_activities_user ON public.animal_conservation_activities(user_id);
CREATE INDEX idx_conservation_activities_type ON public.animal_conservation_activities(activity_type);
CREATE INDEX idx_gaming_stats_user ON public.animal_gaming_stats(user_id);

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_live_animal_cameras_updated_at
    BEFORE UPDATE ON public.live_animal_cameras
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_animal_nfts_updated_at
    BEFORE UPDATE ON public.animal_nfts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vr_animal_experiences_updated_at
    BEFORE UPDATE ON public.vr_animal_experiences
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_animal_gaming_stats_updated_at
    BEFORE UPDATE ON public.animal_gaming_stats
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();